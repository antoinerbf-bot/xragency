const STARS = Array.from({ length: 90 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.678;
  return {
    x: ((a - Math.floor(a)) * 100).toFixed(2),
    y: ((b - Math.floor(b)) * 100).toFixed(2),
    s: (((a - Math.floor(a)) * 1.6 + 0.4) as number).toFixed(2),
    d: (i * 137) % 4000,
  };
});

export function Globe({ className }: { className?: string }) {
  const meridians = [0.12, 0.35, 0.6, 0.85, 1];
  const parallels = [-0.82, -0.62, -0.4, -0.15, 0.15, 0.4, 0.62, 0.82];

  return (
    <div
      className={
        "pointer-events-none absolute inset-0 flex items-center justify-center " + (className ?? "")
      }
    >
      {/* star field */}
      <div className="absolute inset-0 overflow-hidden">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-foreground/45"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              animationDelay: `${s.d}ms`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute h-[86vmin] w-[86vmin] rounded-full"
        style={{ background: "var(--gradient-ember)", filter: "blur(24px)" }}
      />
      <svg
        viewBox="-118 -118 236 236"
        className="animate-slow-spin h-[82vmin] w-[82vmin] opacity-80"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="globeFill" cx="45%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.18 0 0 / 0.06)" />
            <stop offset="55%" stopColor="oklch(0.18 0 0 / 0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="globeRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.18 0 0 / 0.55)" />
            <stop offset="55%" stopColor="oklch(0.18 0 0 / 0.28)" />
            <stop offset="100%" stopColor="oklch(0.18 0 0 / 0.45)" />
          </linearGradient>
        </defs>
        <circle r="100" fill="url(#globeFill)" stroke="url(#globeRim)" strokeWidth="0.7" />
        <circle r="110" fill="none" stroke="oklch(0.18 0 0 / 0.16)" strokeWidth="0.3" strokeDasharray="2 6" />
        {meridians.map((k, i) => (
          <ellipse
            key={`m${i}`}
            rx={100 * k}
            ry="100"
            fill="none"
            stroke={i % 2 ? "oklch(0.18 0 0 / 0.24)" : "oklch(0.18 0 0 / 0.3)"}
            strokeWidth="0.35"
          />
        ))}
        {parallels.map((p, i) => (
          <ellipse
            key={`p${i}`}
            cy={100 * p}
            rx={100 * Math.sqrt(1 - p * p)}
            ry={100 * Math.sqrt(1 - p * p) * 0.16}
            fill="none"
            stroke={i % 2 ? "oklch(0.18 0 0 / 0.2)" : "oklch(0.18 0 0 / 0.26)"}
            strokeWidth="0.35"
          />
        ))}
        {/* connection arcs */}
        {[
          "M -42 -38 Q 6 -70 64 -8",
          "M -14 46 Q 20 8 64 -8",
          "M -70 14 Q -50 40 -14 46",
          "M 18 -62 Q 48 0 46 52",
        ].map((d, i) => (
          <path
            key={`a${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.18 0 0 / 0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            className="animate-pulse-soft"
            style={{ animationDelay: `${i * 600}ms` }}
          />
        ))}
        {[
          [-42, -38],
          [18, -62],
          [64, -8],
          [-14, 46],
          [46, 52],
          [-70, 14],
        ].map(([x, y], i) => {
          const c =
            i % 3 === 0
              ? "oklch(0.35 0 0)"
              : i % 3 === 1
                ? "oklch(0.5 0 0)"
                : "oklch(0.18 0 0)";
          return (
            <g key={`d${i}`} className="animate-pulse-soft" style={{ animationDelay: `${i * 420}ms` }}>
              <circle cx={x} cy={y} r="5" fill={c} opacity="0.14" />
              <circle cx={x} cy={y} r="1.8" fill={c} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}