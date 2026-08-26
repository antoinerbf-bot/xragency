---
kind: frontend_style
name: Tailwind CSS v4 + Radix UI Design System with CSS Custom Properties
category: frontend_style
scope:
  - "**"
source_files:
  - src/styles.css
  - components.json
  - package.json
  - src/lib/utils.ts
  - src/components/ui/button.tsx
---

## What system/approach is used

The site uses **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) as the core styling framework, combined with **Radix UI primitives** for accessible, unstyled interactive components. Visual theming is driven entirely by **CSS custom properties** (`--color-*`, `--font-*`, `--radius-*`, etc.) defined in a single stylesheet and exposed to Tailwind through the `@theme inline` block. The project follows the **shadcn/ui** component convention: each primitive lives as a hand-edited React file under `src/components/ui/`, generated via shadcn's CLI configured in `components.json`. Typography utilities and animation classes come from the `tw-animate-css` package.

## Key files and packages

- `src/styles.css` — Single source of truth for design tokens, theme mapping, base styles, custom utilities, keyframes, and animations.
- `components.json` — shadcn/ui configuration: style preset `new-york`, `baseColor: "slate"`, CSS variables enabled, path aliases (`@/components/ui`, `@/lib/utils`, etc.).
- `package.json` — Declares dependencies: `tailwindcss` ^4.2.1, `@tailwindcss/vite` ^4.2.1, `tw-animate-css` ^1.3.4, `class-variance-authority`, `clsx`, `tailwind-merge`, plus every `@radix-ui/react-*` primitive used by the UI layer.
- `src/lib/utils.ts` — Exposes `cn(...)` helper that merges class names via `clsx` + `tailwind-merge`.
- `src/components/ui/*.tsx` — ~60 shadcn-generated primitives (button, dialog, input, form, table, chart, sidebar, etc.), all built on Radix + Tailwind utility classes.
- `vite.config.ts` — Delegates build config to `@lovable.dev/vite-tanstack-config`; Tailwind is injected automatically by that wrapper.

## Architecture and conventions

### Theme tokens are CSS custom properties mapped into Tailwind

`src/styles.css` defines semantic tokens under `:root` (light mode) and `.dark` (dark mode), all using the `oklch()` color function. The comment block explicitly documents the rule: _"All colors MUST use oklch format."_ Each token is then registered in an `@theme inline { ... }` block so it becomes available as a Tailwind utility (e.g. `bg-primary`, `text-card-foreground`, `border-border`). Adding a new semantic color requires two steps documented in the file: add the variable to both `:root` and `.dark`, then register it in `@theme inline`.

### Dark mode via CSS class selector

Dark mode is activated by toggling the `.dark` class on the document root; the custom variant `@custom-variant dark (&:is(.dark *));` makes scoped selectors work inside dark-mode contexts. There is no media-query-based auto dark mode — it is opt-in via class.

### Typography system

Three font families are declared as design tokens:

- `--font-display`: Playfair Display (serif, for headings)
- `--font-sans`: DM Sans (sans-serif, body)
- `--font-mono`: JetBrains Mono (monospace, labels)

Two custom Tailwind utilities expose them: `display-serif` (for display headings) and `label-mono` (small uppercase mono labels). The global `body` defaults to `--font-sans`.

### Radius system

A single `--radius` token (0.75rem) drives a scale of radius tokens (`--radius-sm` through `--radius-4xl`) computed relative to it, ensuring consistent corner radii across the design system.

### Component styling via Class Variance Authority

Every shadcn/ui primitive uses `class-variance-authority` (`cva`) to define variant/size combinations (see `button.tsx` as the canonical example). Variants map to semantic Tailwind tokens (`bg-primary`, `text-destructive-foreground`, etc.) rather than hard-coded colors, so changing the theme updates all variants uniformly. Components merge user-supplied classes through the shared `cn()` helper from `@/lib/utils`.

### Layered CSS organization

`src/styles.css` is organized into Tailwind layers:

- `@layer base` — resets, body typography, smooth scroll.
- `@layer components` — compound component styles like the `.grain::after` noise texture overlay.
- Top-level `@utility` blocks — reusable one-off utilities (`surface-plate`, `text-aurora`, `animate-rise`, `animate-marquee`, `animate-pulse-soft`).
- `@keyframes` — local animation definitions paired with `@utility` wrappers.

### Gradients, shadows, and decorative tokens

Brand-specific tokens (`--gradient-ember`, `--gradient-halo`, `--gradient-aurora`, `--shadow-plate`, `--shadow-ember`) encapsulate the XR Agency visual identity. These are consumed via CSS variables in component styles rather than duplicated inline.

### Responsive strategy

Responsive behavior is handled purely through Tailwind's responsive prefixes (e.g. `md:`, `lg:`) applied directly in component className strings. A `use-mobile` hook in `src/hooks/use-mobile.tsx` provides a JS-side breakpoint check for logic branching, but visual layout changes are CSS-only.

## Conventions and constraints

- **All colors must be `oklch()`** — enforced by the explicit comment in `src/styles.css` design-system header.
- **New semantic colors require dual registration** — add to both `:root` and `.dark` blocks, then register in `@theme inline` (documented procedure in the same file).
- **Theme values are CSS variables, not Tailwind config** — there is no `tailwind.config.js`; customization happens exclusively in `src/styles.css`.
- **UI primitives are shadcn/ui components** — generated under `src/components/ui/` following the `new-york` style preset with `slate` base color; they should be extended via `cva` variants rather than edited raw.
- **Class merging goes through `cn()`** — the `@/lib/utils` helper is the single entry point for combining class names with `clsx` + `tailwind-merge`.
- **Dark mode is class-based** — toggle `.dark` on the root element; no automatic prefers-color-scheme detection is present in the codebase.
- **Animations live in `src/styles.css`** — custom `@keyframes` are paired with `@utility` wrappers (e.g. `animate-rise`, `animate-slow-spin`, `animate-marquee`, `animate-pulse-soft`) and reused via utility classes.
