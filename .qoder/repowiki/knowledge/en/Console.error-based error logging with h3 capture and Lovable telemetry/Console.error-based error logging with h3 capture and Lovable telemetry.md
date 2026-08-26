---
kind: logging_system
name: Console.error-based error logging with h3 capture and Lovable telemetry
category: logging_system
scope:
  - "**"
source_files:
  - src/lib/error-capture.ts
  - src/server.ts
  - src/start.ts
  - src/routes/__root.tsx
  - src/lib/lovable-error-reporting.ts
---

## What system/approach is used

This repository does **not** use a dedicated logging framework (no Winston, Pino, Bunyan, Morgan, or similar). Logging is built on the runtime's native `console` API — specifically `console.error` — augmented by a small in-process capture layer that intercepts `console.error`, global `error`/`unhandledrejection` events, and reconstructs full cause chains for errors that h3 otherwise strips down to an opaque `{"status":500,"unhandled":true}` JSON body. For client-side error reporting, the app forwards caught React boundary errors to Lovable's editor telemetry via `window.__lovableEvents.captureException` and `window.__lovableReportRuntimeError`.

There are no log levels, structured fields, log rotation, sinks, or configuration files for logging. The only "configuration" is hard-coded constants inside `src/lib/error-capture.ts`:

- `CAUSE_DEPTH_LIMIT = 5` — max depth when walking `error.cause` chains
- `DESCRIPTION_LENGTH_LIMIT = 8_000` — truncation length for serialized error descriptions
- `TTL_MS = 5_000` — time-to-live for the last captured error in memory

## Key files and packages

- `src/lib/error-capture.ts` — core of the server-side logging strategy: wraps `console.error`, records the last Error globally, serializes full cause chains via `describeError`, and exposes `consumeLastCapturedError()` so callers can recover stacks that h3 swallowed.
- `src/server.ts` — Nitro/h3 entry point; imports `error-capture` as a side effect, then uses `consumeLastCapturedError()` to re-emit the real stack when h3 returns a generic 500 JSON response.
- `src/start.ts` — TanStack Start bootstrap; installs a request-scoped middleware that catches unhandled errors, calls `console.error(error)`, and renders a 500 error page.
- `src/routes/__root.tsx` — root route defines an `errorComponent` that logs via `console.error` and forwards to Lovable telemetry through `reportLovableError`.
- `src/lib/lovable-error-reporting.ts` — thin client-side helper that sends errors to Lovable's editor preview hooks (`__lovableEvents.captureException`, `__lovableReportRuntimeError`).
- `src/lib/error-page.ts` — referenced by all error paths to render a user-facing HTML 500 page (logging output goes to stderr/console, not to the response).

## Architecture and conventions

1. **Single interception point**: `src/lib/error-capture.ts` is imported at the top of `src/server.ts`. This ensures the `console.error` wrapper and global `error` / `unhandledrejection` listeners are installed before any handler runs.
2. **Error expansion**: When `console.error` receives an `Error`, it walks up to 5 levels of `cause` links, formats each frame as `<name>: <message>` plus any `status`/`statusCode`, joins them with `\ncaused by: `, and truncates to 8 KB. Non-Error arguments pass through unchanged.
3. **Last-error cache**: The most recent captured error is stored in module-scoped state with a timestamp. `consumeLastCapturedError()` reads and clears it within a 5-second TTL, allowing `server.ts` to retrieve the original thrown object even after h3 has already produced a sanitized 500 response.
4. **Centralized error responses**: All three layers (TanStack Start middleware in `start.ts`, the Nitro fetch wrapper in `server.ts`, and the React root `errorComponent`) respond to failures by returning a `Response` with status 500 and an HTML body from `renderErrorPage()`. No application code writes log lines directly into HTTP responses.
5. **Client-side telemetry**: Errors caught by React's root error boundary are logged to `console.error` and additionally reported to Lovable's editor preview via `reportLovableError`, which attaches context like `source: "react_error_boundary"` and `route: window.location.pathname`.
6. **No structured logging**: There are no log levels, no per-request correlation IDs, no JSON log lines, and no external sinks. Everything prints to the process console/stderr.

## Conventions and constraints

- Errors are surfaced exclusively through `console.error`; there is no custom logger abstraction to wrap or swap out.
- Any thrown `Error` (including those wrapped by h3) will be expanded to include its full `cause` chain up to depth 5 before being emitted.
- Captured errors are kept in memory for only 5 seconds after capture; after that `consumeLastCapturedError()` returns `undefined`.
- Client-side errors are forwarded to Lovable's editor telemetry only when running in the browser (`typeof window !== 'undefined'`); server-side code ignores the Lovable hooks.
- Response objects thrown from server functions are specially handled in `reportLovableError`: their message is rendered as `Response ${status}${url ? \` at ${url}\` : ''}`rather than the default`[object Response]` stringification.
- The project contains no log-level configuration, no log rotation, no file/network sinks, and no environment variables controlling verbosity.
