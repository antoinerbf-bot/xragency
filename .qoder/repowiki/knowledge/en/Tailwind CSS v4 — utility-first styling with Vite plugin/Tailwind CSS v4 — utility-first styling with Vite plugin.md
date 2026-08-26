---
kind: external_dependency
name: Tailwind CSS v4 — utility-first styling with Vite plugin
slug: tailwind-css-v4
category: external_dependency
category_hints:
  - framework_behavior
scope:
  - "**"
---

Styling uses Tailwind CSS v4 via `@tailwindcss/vite` and `tailwind-merge` for class composition. Global styles live in `src/styles.css`; component classes are applied inline via className strings. When adding new styles, prefer utility classes over custom CSS and use `tw-animate-css` for animations already imported in the project.
