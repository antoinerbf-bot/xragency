---
kind: dependency_management
name: Bun-based Dependency Management with Lockfile and Release-Age Guard
category: dependency_management
scope:
  - "**"
source_files:
  - package.json
  - bun.lock
  - bunfig.toml
---

## What system/approach is used

This project uses **Bun** as its package manager for dependency resolution, installation, and lockfile management. The manifest is `package.json` (npm-style), while the authoritative resolved dependency tree is stored in a text lockfile named `bun.lock`. There is no `node_modules` committed to version control — dependencies are installed from registries at build time.

The project also ships a `package-lock.json`, but it is not the active resolver; all runtime and dev dependencies declared in `package.json` are mirrored into `bun.lock` under the same names and semver ranges, confirming Bun as the source of truth.

## Key files and packages

- `package.json` — declares all runtime (`dependencies`) and development (`devDependencies`) packages using caret (`^`) semver ranges. Notable groups: TanStack Start ecosystem (`@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/react-query`, `@tanstack/router-plugin`), Radix UI primitives (every `@radix-ui/react-*` component), Tailwind v4 (`tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`), React 19 (`react`, `react-dom`), form/validation (`react-hook-form`, `zod`, `@hookform/resolvers`), and utilities (`clsx`, `class-variance-authority`, `lucide-react`, `sonner`, `recharts`).
- `bun.lock` — Bun's lockfile that pins every transitive dependency to an exact version plus integrity hash. It records the full dependency graph under the `packages` section and mirrors the top-level dependency/devDependency sets.
- `bunfig.toml` — Bun configuration file that enforces supply-chain policy via `minimumReleaseAge = 86400` (24-hour guard) and lists explicit exemptions under `minimumReleaseAgeExcludes` for Lovable-owned packages (`@lovable.dev/*`).
- `vite.config.ts` / `eslint.config.js` / `.prettierrc` — tooling configs that depend on pinned devDependencies but do not themselves manage runtime deps.

## Architecture and conventions

- **Single workspace**: `bun.lock` defines one root workspace (`workspaces: { "": { name: "tanstack_start_ts", ... } }`), meaning there are no sub-packages or monorepo workspaces — all dependencies live at the repo root.
- **Semver ranges, locked resolutions**: `package.json` uses caret ranges (e.g. `^19.2.0`, `^5.101.1`) to allow minor/patch updates, while `bun.lock` pins each resolved package to an exact version and SHA, ensuring reproducible installs across environments.
- **Dev vs runtime separation**: Dependencies are cleanly split between `dependencies` (runtime: React, TanStack, Radix, Tailwind, etc.) and `devDependencies` (tooling: Vite, TypeScript, ESLint, Prettier, Nitro). No production-only packages leak into dev.
- **Private registry usage**: The lockfile shows some `@lovable.dev/*` packages resolved from a private registry URL (`https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/...`), indicating a Google Artifact Registry-backed private npm scope for Lovable tooling. This is reflected in the lockfile entries rather than a global `.npmrc` visible in this snapshot.
- **No vendoring**: There is no `vendor/`, `third_party/`, or checked-in `node_modules`. All third-party code is fetched from npm/Bun registries during install.

## Conventions and constraints

- **Caret ranges only**: All versions in `package.json` use `^` (allowing compatible minor/patch bumps); no tilde (`~`) or exact pinning is used in the manifest.
- **Lockfile is committed**: `bun.lock` is present in the repo root and should be kept in sync with `package.json` changes to guarantee deterministic builds.
- **Supply-chain release-age guard**: `bunfig.toml` enforces a 24-hour minimum release age for new packages (`minimumReleaseAge = 86400`), blocking freshly published packages from being automatically installed. Only packages listed in `minimumReleaseAgeExcludes` bypass this guard — currently restricted to Lovable-owned scopes (`@lovable.dev/*`). Adding new exclusions requires explicit user confirmation per the comment in the config.
- **No private registry overrides in repo**: Aside from the URLs already baked into `bun.lock`, there is no visible `.npmrc`, `.yarnrc`, or `bunfig` registry override in this snapshot; private package access appears to rely on environment-scoped credentials configured outside the repo.
