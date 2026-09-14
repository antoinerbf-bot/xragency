export function ThemeVisualFixes() {
  return (
    <style>{`
      /* Keep the dark theme coherent with the warm XR Agency visual system. */
      .dark body {
        background: var(--background);
        color: var(--foreground);
      }

      .dark .surface-plate {
        background: linear-gradient(160deg, oklch(0.20 0.035 265 / 0.96), oklch(0.15 0.035 265 / 0.98));
        border-color: oklch(1 0 0 / 0.10);
        box-shadow: 0 20px 50px -36px oklch(0 0 0 / 0.65);
      }

      .dark .grain::after {
        opacity: 0.025;
      }

      /* Common hard-coded light surfaces from older sections. */
      .dark .bg-white,
      .dark .bg-white\\/95,
      .dark .bg-white\\/90,
      .dark .bg-white\\/80 {
        background-color: var(--card) !important;
      }

      .dark .text-black {
        color: var(--foreground) !important;
      }

      /* Prevent horizontal overflow on narrow phones. */
      html,
      body {
        max-width: 100%;
        overflow-x: hidden;
      }
    `}</style>
  );
}
