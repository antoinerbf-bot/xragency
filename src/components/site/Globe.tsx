export function Globe() {
  const meridians = [0.12, 0.35, 0.6, 0.85, 1];
  const parallels = [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className="absolute h-[80vmin] w-[80vmin] rounded-full"
        style={{ background: "var(--gradient-ember)", filter: "blur(10px)" }}
      />
      <svg
        viewBox="-110 -110 220 220"
        className="animate-slow-spin h-[78vmin] w-[78vmin] opacity-70"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="globeFill" cx="45%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.785 0.175 58 / 0.12)" />
            <stop offset="70%" stopColor="oklch(0.785 0.175 58 / 0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle r="100" fill="url(#globeFill)" stroke="oklch(0.785 0.175 58 / 0.35)" strokeWidth="0.4" />
        {meridians.map((k, i) => (
          <ellipse
            key={`m${i}`}
            rx={100 * k}
            ry="100"
            fill="none"
            stroke="oklch(0.785 0.175 58 / 0.22)"
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
            stroke="oklch(0.785 0.175 58 / 0.2)"
            strokeWidth="0.35"
          />
        ))}
        {[
          [-42, -38],
          [18, -62],
          [64, -8],
          [-14, 46],
          [46, 52],
          [-70, 14],
        ].map(([x, y], i) => (
          <circle
            key={`d${i}`}
            cx={x}
            cy={y}
            r="1.6"
            fill={i % 3 === 0 ? "oklch(0.76 0.13 232)" : i % 3 === 1 ? "oklch(0.79 0.14 168)" : "oklch(0.85 0.17 62)"}
            className="animate-pulse-soft"
            style={{ animationDelay: `${i * 420}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}