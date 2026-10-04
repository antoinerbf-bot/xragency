import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
  path.join(appDir, ".output", "server", "index.mjs"),
  path.join(process.env.HOME || "", ".output", "server", "index.mjs"),
];

const entry = candidates.find((file) => fs.existsSync(file));

if (!entry) {
  console.error("[XRAGENCY] Passenger startup failed: Nitro entry not found.");
  console.error("[XRAGENCY] Checked:", candidates);
  process.exit(1);
}

process.env.NODE_ENV ||= "production";

console.log("[XRAGENCY] Starting Nitro:", entry);

try {
  await import(pathToFileURL(entry).href);
} catch (error) {
  console.error("[XRAGENCY] Failed to start Nitro server:", error);
  process.exitCode = 1;
  throw error;
}
