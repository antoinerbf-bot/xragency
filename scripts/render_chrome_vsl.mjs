import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import os from "node:os";

const FPS = 25;
const DURATION = 101.04;
const TOTAL_FRAMES = Math.ceil(DURATION * FPS);
const CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FFMPEG_BIN = "./scripts/ffmpeg";
const OUT_MP4 = "public/videos/xr-agency-vsl.mp4";
const OUT_POSTER = "public/videos/vsl-poster.jpg";
const VOICEOVER = "public/videos/xr-vsl-voiceover-v3.mp3";
const SFX = "/tmp/xr_vsl_sfx.wav";
const MUSIC = "public/videos/music-inspired.mp3";
const DEBUG_PORT = 9229;

// 1. Minimal static server for vsl-studio.html + src/assets/*
const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("scripts/vsl-studio.html").pipe(res);
    return;
  }
  if (url.startsWith("/assets/")) {
    const safeName = path.basename(url);
    const fp = path.join("src/assets", safeName);
    if (fs.existsSync(fp)) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      fs.createReadStream(fp).pipe(res);
      return;
    }
  }
  res.writeHead(404);
  res.end("Not found");
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const BASE_URL = `http://127.0.0.1:${port}/`;
console.log(`Studio HTTP server ready at ${BASE_URL}`);

// 2. Launch headless Chrome with clean temp profile
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "xr-chrome-"));
const chrome = spawn(
  CHROME_BIN,
  [
    "--headless=new",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${userDataDir}`,
    "--window-size=1920,1080",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--autoplay-policy=no-user-gesture-required",
    BASE_URL,
  ],
  { stdio: ["ignore", "pipe", "pipe"] }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wait for CDP JSON endpoint
let pageWsUrl = null;
for (let i = 0; i < 40; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const list = await r.json();
    const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
    if (page) {
      pageWsUrl = page.webSocketDebuggerUrl;
      break;
    }
  } catch {}
  await sleep(250);
}

if (!pageWsUrl) {
  chrome.kill();
  server.close();
  throw new Error("Could not connect to headless Chrome CDP.");
}
console.log("Connected to Chrome DevTools:", pageWsUrl);

const ws = new WebSocket(pageWsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res);
  ws.addEventListener("error", rej);
});

let msgId = 1;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const data = JSON.parse(ev.data);
  if (data.id && pending.has(data.id)) {
    const { res, rej } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) rej(new Error(data.error.message));
    else res(data.result);
  }
});

function cdp(method, params = {}) {
  return new Promise((res, rej) => {
    const id = msgId++;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await cdp("Emulation.setDeviceMetricsOverride", {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  mobile: false,
});

// Wait until all <img> inside vsl-studio.html are completely decoded
for (let i = 0; i < 50; i++) {
  const ready = await cdp("Runtime.evaluate", {
    expression: `document.readyState === 'complete' && Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)`,
    returnByValue: true,
  });
  if (ready?.result?.value) break;
  await sleep(150);
}
console.log("All 1080p images decoded & ready inside Chrome.");

// Capture high-res Poster frame at t = 1.8s
await cdp("Runtime.evaluate", { expression: `window.seek(1.8)` });
const posterShot = await cdp("Page.captureScreenshot", {
  format: "jpeg",
  quality: 94,
  fromSurface: true,
});
fs.writeFileSync(OUT_POSTER, Buffer.from(posterShot.data, "base64"));
console.log(`Poster saved to ${OUT_POSTER}`);

// 3. Pipe 25fps frames straight into FFmpeg + master audio mix
const ffmpegArgs = [
  "-y",
  "-f", "image2pipe",
  "-vcodec", "mjpeg",
  "-framerate", String(FPS),
  "-i", "-",
  "-i", VOICEOVER,
  "-i", SFX,
  "-i", MUSIC,
  "-filter_complex",
  "[0:v]scale=1920:1080,format=yuv420p[vout];" +
  "[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,volume=1.10[vo];" +
  "[2:a]aresample=48000,pan=stereo|c0=c0|c1=c0,volume=0.85[sfx];" +
  "[3:a]aresample=48000,volume=0.11,afade=t=in:st=0:d=1.5,afade=t=out:st=97.5:d=3.5[bgm];" +
  "[vo][sfx][bgm]amix=inputs=3:duration=first:dropout_transition=2:normalize=0[aout]",
  "-map", "[vout]",
  "-map", "[aout]",
  "-c:v", "libx264",
  "-preset", "faster",
  "-crf", "19",
  "-pix_fmt", "yuv420p",
  "-c:a", "aac",
  "-b:a", "192k",
  "-movflags", "+faststart",
  "-shortest",
  OUT_MP4,
];

const ff = spawn(FFMPEG_BIN, ffmpegArgs, { stdio: ["pipe", "inherit", "pipe"] });
let ffErr = "";
ff.stderr.on("data", (d) => { ffErr += d.toString(); });

console.log(`Rendering ${TOTAL_FRAMES} frames at ${FPS} fps (${DURATION}s) via headless Chrome -> FFmpeg...`);
const t0 = Date.now();

for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
  const t = (frame / FPS).toFixed(4);
  await cdp("Runtime.evaluate", { expression: `window.seek(${t})` });
  const shot = await cdp("Page.captureScreenshot", {
    format: "jpeg",
    quality: 88,
    fromSurface: true,
  });
  const buf = Buffer.from(shot.data, "base64");
  if (!ff.stdin.write(buf)) {
    await new Promise((r) => ff.stdin.once("drain", r));
  }
  if (frame % 250 === 0 || frame === TOTAL_FRAMES - 1) {
    const pct = (((frame + 1) / TOTAL_FRAMES) * 100).toFixed(1);
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`Frame ${frame + 1}/${TOTAL_FRAMES} (${pct}%) · elapsed ${elapsed}s`);
  }
}

ff.stdin.end();
const exitCode = await new Promise((res) => ff.on("close", res));

ws.close();
chrome.kill();
server.close();
await sleep(300);
try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}

if (exitCode !== 0) {
  console.error("FFmpeg error:", ffErr.slice(-1500));
  process.exit(exitCode);
}

const sz = fs.statSync(OUT_MP4).size;
console.log(`✅ MASTER ANIMATED CHROME VSL RENDERED: ${OUT_MP4} (${(sz / (1024 * 1024)).toFixed(2)} MB)`);
