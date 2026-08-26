---
kind: error_handling
name: "Error Handling: h3 SSR Error Capture, Root Error Component & Lovable Telemetry"
category: error_handling
scope:
  - "**"
source_files:
  - src/lib/error-capture.ts
  - src/lib/error-page.ts
  - src/lib/lovable-error-reporting.ts
  - src/server.ts
  - src/routes/__root.tsx
---

## What system/approach is used

This TanStack Start (Vite/Nitro + h3) marketing site uses a three-layer error-handling strategy:

1. **Server-side capture of swallowed errors** — `src/lib/error-capture.ts` monkey-patches `console.error` and listens to global `error` / `unhandledrejection` events to record the last thrown `Error` in a short-lived TTL cache (`TTL_MS = 5000`). It also expands any logged `Error` into a string that preserves stack traces and up to five levels of `cause` chains, because h3's `HTTPError` serializes to `{"status":500,"unhandled":true,"message":"HTTPError"}` with no stack or cause.
2. **Server fallback rendering** — `src/server.ts` imports `error-capture` at the top so the patch runs before the TanStack server entry loads. It wraps the handler call in try/catch and post-processes every response through `normalizeCatastrophicSsrResponse`, which detects h3's swallowed-500 JSON body and replaces it with a user-friendly HTML page from `src/lib/error-page.ts` while logging the captured error via `consumeLastCapturedError()`.
3. **Client-side root error boundary** — `src/routes/__root.tsx` defines an `errorComponent` for TanStack Router that renders a friendly "This page didn't load" UI, calls `reportLovableError(error, { boundary: 'tanstack_root_error_component' })`, and offers a retry/reset button plus a link home.
4. **Lovable editor telemetry** — `src/lib/lovable-error-reporting.ts` is a thin shim over the Lovable editor's injected `window.__lovableEvents.captureException` and `__lovableReportRuntimeError`. It is a no-op in production (guarded by `typeof window === 'undefined'`), but forwards React-boundary-caught errors (which do not bubble to `window.onerror` in prod React) into the editor preview pipeline, extracting status/URL from thrown `Response` objects.

There are no custom error classes, no centralized error codes, and no middleware-based error transformation beyond the single `server.ts` fetch wrapper.

## Key files and packages

- `src/lib/error-capture.ts` — global `console.error` hook, `error`/`unhandledrejection` listeners, `describeError`, `consumeLastCapturedError`.
- `src/lib/error-page.ts` — static HTML template returned as a 500 response when SSR throws.
- `src/lib/lovable-error-reporting.ts` — client-only reporter for the Lovable editor preview.
- `src/server.ts` — Nitro/h3 fetch adapter; only place that imports `error-capture` and `error-page`; performs the h3-swallowed-500 detection and fallback rendering.
- `src/routes/__root.tsx` — TanStack root route defining `notFoundComponent` (404) and `errorComponent` (runtime JS errors during render/navigation).

## Architecture and conventions

- **Single point of failure handling on the server.** All uncaught SSR exceptions funnel through `server.ts`'s `fetch` wrapper. The code assumes h3 will swallow synchronous and asynchronous throws inside the TanStack handler and convert them into a JSON 500 with `{unhandled:true,message:"HTTPError"}`; the wrapper inspects `response.status < 500` and `content-type` before attempting to parse the body, so non-JSON responses pass through unchanged.
- **Errors are recorded out-of-band, not propagated as typed values.** Because h3 strips the original `Error` object, `error-capture.ts` stores the most recent error in module-scoped state keyed by timestamp and consumed exactly once per request via `consumeLastCapturedError()`. If the TTL expires before consumption, the captured error is discarded.
- **User-facing errors are plain HTML, not JSON.** Both the catch branch and the h3-swallowed path return `new Response(renderErrorPage(), { status: 500, headers: { 'content-type': 'text/html; charset=utf-8' } })`, ensuring the browser always receives a readable page rather than leaking internal stack traces.
- **Client errors are reported to Lovable but otherwise left to the root boundary.** `reportLovableError` is called from the root `errorComponent` with context identifying the boundary name; it does not rethrow or transform the error, so the existing UI remains the source of truth for the end user.
- **No application-level error types or error codes exist.** Errors are passed as `unknown` through the capture/reporting pipeline; callers throw native `Error` instances (or `Response` objects, which the reporter special-cases). There is no domain-specific error class hierarchy.

## Conventions and constraints

- **Import `error-capture` before the TanStack server entry.** `src/server.ts` does this as its first import line; doing so ensures the `console.error` monkey-patch and global event listeners are installed before any framework code can log or throw.
- **Do not rely on try/catch around the TanStack handler for SSR failures.** The comment in `server.ts` explicitly states that h3 swallows in-handler throws into a normal 500 Response and that try/catch alone never fires for those; the response-body inspection path is the authoritative recovery mechanism.
- **Captured errors expire after 5 seconds.** `consumeLastCapturedError` returns `undefined` if more than `TTL_MS` has elapsed since recording, preventing stale errors from being attached to unrelated requests.
- **Cause chains are truncated at depth 5 and descriptions capped at 8000 characters.** `describeError` walks `error.cause` up to `CAUSE_DEPTH_LIMIT` and slices the final string at `DESCRIPTION_LENGTH_LIMIT`, protecting against extremely deep or large error trees.
- **Lovable reporting is client-only and optional.** `reportLovableError` returns immediately when `typeof window === 'undefined'` and only calls `captureException` / `__lovableReportRuntimeError` if the corresponding globals exist, making it safe to ship in production builds where the Lovable editor script is absent.
- **Not-found vs runtime errors are separated by route layer.** A missing URL hits `NotFoundComponent` (a styled 404 JSX page); a thrown exception during rendering or navigation hits `ErrorComponent` (styled 500-like page with retry/reset). These are defined inline in `__root.tsx` rather than imported from a shared module.
