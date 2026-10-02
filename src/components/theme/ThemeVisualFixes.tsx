export function ThemeVisualFixes() {
  return (
    <style>{`
      .dark body {
        background: #0b0b0b;
        color: #f5f5f5;
      }

      .dark .surface-plate {
        background: linear-gradient(160deg, #191919, #101010);
        border-color: rgba(255,255,255,.10);
        box-shadow: 0 20px 50px -36px rgba(0,0,0,.65);
      }

      .dark .grain::after { opacity: 0.025; }

      .dark .bg-white,
      .dark .bg-white\\/95,
      .dark .bg-white\\/90,
      .dark .bg-white\\/80 {
        background-color: #151515 !important;
      }

      .dark .text-black {
        color: #f5f5f5 !important;
      }

      html,
      body {
        max-width: 100%;
        overflow-x: hidden;
      }
    `}</style>
  );
}
