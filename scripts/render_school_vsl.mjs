import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const HTML_FILE = path.join(ROOT, "scripts", "school-studio.html");
const ASSETS_DIR = path.join(ROOT, "src", "assets");
const FFMPEG = path.join(ROOT, "scripts", "ffmpeg");
const MUSIC = path.join(ROOT, "public", "videos", "music-inspired.mp3");
const OUT_MP4 = path.join(ROOT, "public", "videos", "xr-school-90j.mp4");
const OUT_POSTER = path.join(ROOT, "public", "videos", "school-poster.jpg");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const FPS = 25;
const DURATION = 42.0;
const TOTAL_FRAMES = Math.round(DURATION * FPS);

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(HTML_FILE).pipe(res);
    return;
  }
  if (url.startsWith("/assets/")) {
    const assetPath = path.join(ASSETS_DIR, path.basename(url));
    if (fs.existsSync(assetPath)) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      fs.createReadStream(assetPath).pipe(res);
      return;
    }
  }
  res.writeHead(404);
  res.end("Not found");
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const url = `http://127.0.0.1:${port}/`;

const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), "xr-school-chrome-"));
const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--mute-audio",
  "--hide-scrollbars",
  "--window-size=1920,1080",
  "--remote-debugging-port=9235",
  `--user-data-dir=${tmpProfile}`,
  url,
], { stdio: "ignore" });

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9235/json/list");
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("Could not connect to Chrome CDP");
}

try {
  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 1;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  };
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const id = seq++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  await cdp("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await new Promise((r) => setTimeout(r, 600));
  await cdp("Runtime.evaluate", {
    awaitPromise: true,
    expression: `Promise.all(Array.from(document.images).map(i => i.complete ? i.decode().catch(()=>{}) : new Promise(res => { i.onload = () => i.decode().catch(()=>{}).finally(res); i.onerror = res; })))`,
  });

  // Save crisp poster at t=1.5s
  await cdp("Runtime.evaluate", { expression: "window.seek(1.5);" });
  await new Promise((r) => setTimeout(r, 100));
  const posterShot = await cdp("Page.captureScreenshot", { format: "jpeg", quality: 92 });
  fs.writeFileSync(OUT_POSTER, Buffer.from(posterShot.data, "base64"));
  console.log("School poster saved to public/videos/school-poster.jpg");

  const ffArgs = [
    "-y",
    "-f", "image2pipe", "-vcodec", "mjpeg", "-framerate", String(FPS), "-i", "pipe:0",
    "-stream_loop", "-1", "-i", MUSIC,
    "-filter_complex", "[0:v]scale=1920:1080,format=yuv420p[vout];[1:a]volume=0.22,afade=t=in:st=0:d=1.2,afade=t=out:st=40:d=2[aout]",
    "-map", "[vout]", "-map", "[aout]",
    "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", String(FPS),
    "-c:a", "aac", "-b:a", "192k",
    "-t", String(DURATION), "-movflags", "+faststart",
    OUT_MP4,
  ];
  const ffmpeg = spawn(FFMPEG, ffArgs, { stdio: ["pipe", "pipe", "pipe"] });
  let errLog = "";
  ffmpeg.stderr.on("data", (d) => { errLog += d.toString(); });

  console.log(`Rendering ${TOTAL_FRAMES} frames for XR School 90j video...`);
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const t = i / FPS;
    await cdp("Runtime.evaluate", { expression: `window.seek(${t.toFixed(4)});` });
    const { data } = await cdp("Page.captureScreenshot", { format: "jpeg", quality: 88 });
    const buf = Buffer.from(data, "base64");
    if (!ffmpeg.stdin.write(buf)) {
      await new Promise((res) => ffmpeg.stdin.once("drain", res));
    }
    if (i % 250 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Frame ${i + 1}/${TOTAL_FRAMES}`);
    }
  }
  ffmpeg.stdin.end();
  const code = await new Promise((res) => ffmpeg.on("close", res));
  if (code !== 0) {
    console.error(errLog);
    process.exit(code);
  }
  console.log(`✅ XR SCHOOL 90J VIDEO RENDERED: public/videos/xr-school-90j.mp4 (${(fs.statSync(OUT_MP4).size / (1024 * 1024)).toFixed(2)} MB)`);
  ws.close();
} finally {
  chrome.kill("SIGKILL");
  server.close();
  try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch {}
}

