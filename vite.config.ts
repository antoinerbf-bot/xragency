// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  // The official Netlify TanStack Start plugin owns the Netlify SSR/function
  // wiring. Disable the wrapper's default Nitro target to avoid duplicate
  // server adapters.
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [netlify()],
  },
});
