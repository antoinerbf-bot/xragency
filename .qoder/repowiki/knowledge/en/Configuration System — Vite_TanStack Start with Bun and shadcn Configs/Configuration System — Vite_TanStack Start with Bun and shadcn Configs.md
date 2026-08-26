---
kind: configuration_system
name: Configuration System — Vite/TanStack Start with Bun and shadcn Configs
category: configuration_system
scope:
  - "**"
source_files:
  - vite.config.ts
  - bunfig.toml
  - components.json
  - package.json
  - src/server.ts
  - src/start.ts
  - src/lib/content.ts
  - src/lib/copy.ts
---

## What system/approach is used

This TanStack Start (Vite/Nitro) marketing site uses a minimal, framework-driven configuration approach:

- **Build & dev tooling** are configured via `vite.config.ts`, which delegates almost all behavior to the Lovable-supplied `@lovable.dev/vite-tanstack-config` preset. The preset automatically enables TanStack devtools, `tanstackStart`, `viteReact`, Tailwind CSS, TypeScript path aliases (`@/...`), Nitro server build (default target: Cloudflare), `VITE_*` environment variable injection, React/TanStack dedupe, error logging, and sandbox detection.
- **Runtime entrypoint override**: `vite.config.ts` overrides the bundled server entry so Nitro builds from `src/server.ts` instead of the default, allowing custom SSR error wrapping.
- **Bun runtime config**: `bunfig.toml` controls package installation policy (save lockfile text format, 24-hour minimum release age guard for supply-chain safety, plus explicit excludes for Lovable packages).
- **shadcn/ui component library config**: `components.json` declares the shadcn/ui style (`new-york`), Tailwind integration (CSS file, base color, CSS variables), icon library (Lucide), and path aliases used by the CLI to scaffold components.
- **No `.env` files in the repo**: There are no checked-in `.env`, `.env.local`, or similar files. The codebase does not read `process.env` or `import.meta.env` anywhere except through the Vite preset's documented `VITE_*` injection mechanism. All application content (copy, i18n strings, pricing data) lives in `src/lib/content.ts` / `src/lib/copy.ts` as plain TypeScript modules — effectively acting as an in-code configuration source of truth.

## Key files and packages

- `vite.config.ts` — single source of build/dev configuration; redirects Nitro server entry to `src/server.ts`.
- `bunfig.toml` — Bun install-time policy (lockfile format, minimum release age, exclusions).
- `components.json` — shadcn/ui generator configuration (style, Tailwind setup, aliases).
- `package.json` — scripts (`dev`, `build`, `build:dev`, `preview`, `lint`, `format`) and dependency declarations; no runtime env variables referenced here.
- `src/server.ts` — Nitro server entry that wraps the TanStack Start server entry and normalizes h3-swallowed SSR errors into a rendered HTML error page.
- `src/start.ts` — TanStack Start bootstrap that registers request middleware (global error handler + CSRF protection for `serverFn` handlers) and exports the `startInstance`.
- `src/lib/content.ts`, `src/lib/copy.ts` — in-process configuration/data sources for UI copy and multilingual content.
- `tsconfig.json` — TypeScript path alias configuration (`@/*` → `src/*`).

## Architecture and conventions

1. **Delegated build configuration**: The project intentionally keeps `vite.config.ts` tiny and relies on `@lovable.dev/vite-tanstack-config` to compose plugins, env injection, and targets. Any additional Vite options must be passed through `defineConfig({ vite: { ... } })` per the comment in the file.
2. **Server entry indirection**: The actual Nitro entry is `src/server.ts`, not the default TanStack Start entry. This wrapper imports the real server entry lazily (`getServerEntry`) and intercepts responses to convert h3-swallowed JSON `{ unhandled: true, message: "HTTPError" }` payloads into a user-friendly HTML error page via `renderErrorPage()`.
3. **Request middleware layering**: `src/start.ts` installs two request middlewares in order: a global error middleware that catches thrown errors and returns a 500 HTML response, followed by a CSRF middleware scoped to `handlerType === "serverFn"`. The file explicitly notes that defining `src/start.ts` opts out of TanStack Start's auto-installed defaults, so these are re-added manually.
4. **Environment variables**: No runtime secrets or feature flags are loaded at startup. The only documented env mechanism is Vite's `VITE_*` prefix injection (from the preset comment). Because there are no `.env` files and no `process.env` usage in source, this project currently has no runtime configuration surface beyond what can be injected at build time via `VITE_*` vars.
5. **Content-as-configuration**: Site copy, i18n dictionaries, and pricing data are stored as typed TypeScript modules under `src/lib/` and imported directly by components/routes. This makes content changes version-controlled and type-checked rather than externalized into config files.
6. **Supply-chain guard**: `bunfig.toml` enforces a 24-hour minimum publish age for installed packages, preventing accidental pulls of freshly published (potentially compromised) versions. Only Lovable's own packages are excluded from this guard.

## Conventions and constraints

- **Do not edit the Vite preset directly**: The comment in `vite.config.ts` states that the preset already includes TanStack devtools, `tanstackStart`, `viteReact`, Tailwind, tsConfigPaths, Nitro, `VITE_*` env injection, `@` path alias, React/TanStack dedupe, error logger plugins, and sandbox detection — adding them manually would break the app with duplicate plugins.
- **Server entry must stay at `src/server.ts`**: `vite.config.ts` explicitly sets `tanstackStart.server.entry = "server"`; changing this without updating the config will cause Nitro to rebuild against the wrong entry.
- **CSRF middleware must remain registered**: The comment in `src/start.ts` explains that defining `src/start.ts` opts out of TanStack Start's automatic middleware, so the CSRF middleware for `serverFn` handlers must be kept explicitly.
- **No checked-in secrets or env files**: The absence of any `.env*` files combined with zero `process.env` reads means secrets should not be committed to this repository; if needed, they would be supplied at deploy time to the Nitro runtime.
- **shadcn/ui scaffolding follows `components.json`**: New UI components generated via shadcn/cli will use the declared aliases (`@/components`, `@/lib/utils`, etc.), the `new-york` style, Lucide icons, and Tailwind CSS variables defined there.
