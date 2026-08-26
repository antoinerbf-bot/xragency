---
kind: external_dependency
name: TanStack Start — React full-stack framework powering routes, SSR, and server entry
slug: tanstack-start
category: external_dependency
category_hints:
  - framework_behavior
scope:
  - "**"
---

The app is built on TanStack Start (React 19 + Vite). Routing uses file-based `src/routes/*` with `__root.tsx` as the root layout and `index.tsx` as the home page; dynamic pages live under `src/routes/services/$serviceId.tsx`. Server entry points are `src/server.ts` and `src/start.ts`, and the router is configured via `src/router.tsx`. Dev/build scripts go through Vite (`vite dev`, `vite build`). When adding new pages, follow the existing file-based route convention under `src/routes/`.
