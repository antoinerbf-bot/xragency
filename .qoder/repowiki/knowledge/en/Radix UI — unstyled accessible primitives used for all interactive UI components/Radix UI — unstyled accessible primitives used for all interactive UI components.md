---
kind: external_dependency
name: Radix UI — unstyled accessible primitives used for all interactive UI components
slug: radix-ui
category: external_dependency
category_hints:
  - framework_behavior
scope:
  - "**"
---

All interactive UI components in `src/components/ui/` (accordion, dialog, dropdown-menu, select, tabs, tooltip, etc.) are built on Radix UI primitives. They provide headless, accessible behavior while styling is handled by Tailwind. When extending or replacing any UI component, preserve the underlying Radix primitive semantics and keyboard/accessibility behavior rather than re-implementing from scratch.
