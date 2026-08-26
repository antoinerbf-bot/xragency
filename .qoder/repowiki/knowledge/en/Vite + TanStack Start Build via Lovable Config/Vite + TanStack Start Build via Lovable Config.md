---
kind: build_system
name: Vite + TanStack Start Build via Lovable Config
category: build_system
scope:
  - "**"
source_files:
  - package.json
  - vite.config.ts
  - bunfig.toml
  - tsconfig.json
  - src/server.ts
---

## What system/approach is used

The project builds a TanStack React SSR application with **Vite** as the bundler and build tool. The entire Vite configuration is delegated to the Lovable-supplied preset `@lovable.dev/vite-tanstack-config`, which internally wires:

- `tanstackStart` (TanStack Start plugin),
- `viteReact` (React JSX transform),
- `tailwindcss` (Tailwind v4 via `@tailwindcss/vite`),
- `tsConfigPaths` (`@/*` path alias),
- `nitro` (server-side rendering runtime, defaulting to Cloudflare target),
- `VITE_*` env injection,
- React/TanStack dedupe plugins, error logger, and sandbox detection.

The project uses **Bun** for package management and lockfile generation (`bun.lock`, `bunfig.toml`) but installs dependencies declared in `package.json`/`package-lock.json`. TypeScript compilation is configured with `noEmit: true` — TS is only type-checked; Vite emits JS at build time.

There are no Makefiles, Dockerfiles, CI pipelines, or shell scripts in the repository. Deployment is expected to be driven by the Nitro/Vite build output produced by the npm scripts.

## Key files and packages

- `package.json` — defines the four build-related scripts: `dev` (`vite dev`), `build` (`vite build`), `build:dev` (`vite build --mode development`), `preview` (`vite preview`); declares all runtime and dev dependencies including `@tanstack/react-start`, `vite`, `nitro`, `tailwindcss`, `typescript`, `eslint`, `prettier`.
- `vite.config.ts` — thin wrapper around `defineConfig` from `@lovable.dev/vite-tanstack-config`; overrides only the TanStack Start server entry to point at `src/server.ts`.
- `bunfig.toml` — Bun install policy: `saveTextLockfile = true`, `minimumReleaseAge = 86400` (24-hour supply-chain guard that blocks newly published packages), plus an explicit allowlist of Lovable packages exempted from the age check.
- `tsconfig.json` — sets `target: ES2022`, `jsx: react-jsx`, `module: ESNext`, `moduleResolution: Bundler`, `noEmit: true`, `strict: true`, and maps `@/*` → `./src/*`.
- `src/server.ts` — custom Nitro server entry referenced by the Vite config; wraps the default TanStack Start server.
- `eslint.config.js`, `.prettierrc`, `.prettierignore` — lint/format hooks invoked via `npm run lint` and `npm run format`.

## Architecture and conventions

1. **Single-source-of-truth build config**: All Vite/TanStack/Nitro setup lives inside `@lovable.dev/vite-tanstack-config`. The repo's `vite.config.ts` intentionally contains no manual plugin declarations — comments explicitly warn against adding them manually because duplicates will break the app. New features must be added through the `defineConfig({ tanstackStart: { ... } })` override shape.
2. **Server entry indirection**: The default TanStack Start server entry is replaced by pointing `tanstackStart.server.entry` to `server` (resolving to `src/server.ts`), allowing the project to inject its own SSR error-handling wrapper while keeping the rest of the pipeline unchanged.
3. **No emitted artifacts in source tree**: `tsconfig.json` has `noEmit: true`, so compiled JS never lands under `src/`. Artifacts are produced only by `vite build` into Vite's default `dist/` directory.
4. **Dependency installation via Bun, lockfile via npm**: `bun.lock` exists alongside `package-lock.json`; `bunfig.toml` enforces a 24-hour minimum release age on installed packages to protect against supply-chain risks, with an explicit exception list for Lovable internal packages.
5. **Environment-driven builds**: `build:dev` uses `--mode development` to toggle development-only behavior (e.g., sourcemaps, devtools) through Vite's mode system.
6. **Path alias convention**: The `@/*` alias maps to `./src/*` and is consumed throughout the codebase (e.g., `@/components/...`), enforced by both `tsconfig.json` and the Vite preset's `tsConfigPaths` plugin.

## Conventions and constraints

- **Do not edit `vite.config.ts` beyond the provided override shape** — the file header states that the preset already includes TanStack devtools, `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`, env injection, dedupe, error logging, and sandbox detection, and that adding them manually will cause duplicate-plugin failures.
- **New packages bypassing the supply-chain guard require confirmation** — `bunfig.toml` documents that entries in `minimumReleaseAgeExcludes` must be confirmed with the user before adding.
- **TypeScript is strict**: `strict: true` is enabled; `noUnusedLocals` and `noUnusedParameters` are disabled, but `noFallthroughCasesInSwitch` and `noUncheckedSideEffectImports` are enforced.
- **Build scripts are the only entry points**: `npm run dev`, `npm run build`, `npm run build:dev`, and `npm run preview` are the documented commands; there are no Make targets, shell wrappers, or CI steps in this repo.
- **Lint/format are separate npm tasks**: `eslint .` and `prettier --write .` are invoked independently; no pre-commit hook is present in the repository.
