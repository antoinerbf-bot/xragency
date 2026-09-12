// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    port: 8080,
    strictPort: false,
  },
  base: "/",
  tanstackStart: {
    server: { entry: "server" },
  },
});
