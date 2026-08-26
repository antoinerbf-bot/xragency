The module is split into two sibling folders with no internal dependencies between them.

- `src/lib/` holds pure data and utilities consumed by components:
  - `content.ts` defines typed business models (`Service`, `Plan`, `ServiceStep`, etc.) and exports the full `SERVICES` catalog plus `CONTACT`, all keyed by the `L = Record<'fr'|'en'|'vi', string>` type from `i18n.tsx` so every piece of copy is explicitly localized.
  - `copy.ts` centralizes all user-facing strings as `Record<string, L>` dictionaries grouped by page section (nav, hero, services, pricing, work, faq, contact, footer).
  - `i18n.tsx` implements a React context (`LanguageProvider` + `useLang`) that persists the chosen language in `localStorage`, falls back to `navigator.language`, exposes a `t()` selector and a `formatPrice()` formatter using per-language EUR→USD/VND rates.
  - `utils.ts` re-exports a single `cn(...)` helper composing `clsx` + `tailwind-merge` for conditional class names.
  - Error tooling: `error-capture.ts` monkey-patches `console.error` and listens to global `error` / `unhandledrejection` events to keep the last captured error in memory for 5 seconds, serializing cause chains up to depth 5; `consumeLastCapturedError` lets server code retrieve it. `error-page.ts` renders a minimal static HTML fallback string. `lovable-error-reporting.ts` forwards caught errors to the Lovable editor's `__lovableEvents` / `__lovableReportRuntimeError` hooks when present.
- `src/hooks/use-mobile.tsx` provides `useIsMobile`, a self-contained React hook observing `matchMedia('(max-width: 767px)')` with proper cleanup.

Dependency direction is one-way: `content.ts` and `copy.ts` depend on `i18n.tsx`; nothing in this module depends on application routes or components.
