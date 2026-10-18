import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath, pathToFileURL } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
  path.join(appDir, ".output", "server", "index.mjs"),
  path.join(process.env.HOME || "", ".output", "server", "index.mjs"),
  path.join(process.env.HOME || "", "repositories", "xragency", ".output", "server", "index.mjs"),
];

const entry = candidates.find((file) => fs.existsSync(file));

if (!entry) {
  console.error("[XRAGENCY] Passenger startup failed: Nitro entry not found.");
  console.error("[XRAGENCY] Checked:", candidates);
  process.exit(1);
}

process.env.NODE_ENV ||= "production";

const rawPort = process.env.PORT;
const isPassengerSocket = rawPort && (isNaN(Number(rawPort)) || rawPort.includes("/") || rawPort.includes("\\"));

if (isPassengerSocket) {
  // Passenger provided a unix socket or named pipe
  // Configure Nitro to listen on an internal TCP port
  const internalPort = 3000;
  process.env.NITRO_PORT = String(internalPort);
  process.env.NITRO_HOST = "127.0.0.1";
  delete process.env.PORT;

  console.log(`[XRAGENCY] Passenger socket detected (${rawPort}). Starting Nitro on 127.0.0.1:${internalPort}...`);
  await import(pathToFileURL(entry).href);

  // Create proxy on the Passenger socket
  const proxy = http.createServer((req, res) => {
    const proxyReq = http.request(
      {
        hostname: "127.0.0.1",
        port: internalPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );
    proxyReq.on("error", (err) => {
      console.error("[XRAGENCY] Proxy error:", err.message);
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "text/plain" });
        res.end("Bad Gateway");
      }
    });
    req.pipe(proxyReq);
  });

  proxy.listen(rawPort, () => {
    console.log(`[XRAGENCY] Passenger bridge listening on ${rawPort}`);
  });
} else {
  // Direct execution or standard TCP port
  console.log("[XRAGENCY] Starting Nitro directly:", entry);
  await import(pathToFileURL(entry).href);
}
