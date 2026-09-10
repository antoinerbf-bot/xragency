// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    port: 8080,
    strictPort: false,
  },
  base: "/xragencyai/",
  tanstackStart: {
    server: { entry: "server" },
  },
});
