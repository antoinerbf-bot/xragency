import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(appDir, ".output", "server", "index.mjs");

try {
  await import(pathToFileURL(entry).href);
} catch (error) {
  console.error("[XRAGENCY] Failed to start Nitro server:", error);
  throw error;
}
