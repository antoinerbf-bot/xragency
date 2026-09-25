import { useId } from "react";

type Props = { service: string; title?: string };

const icons: Record<string, { label: string; accent: string }> = {
  websites: { label: "WEB", accent: "01" },
  branding: { label: "BRAND", accent: "02" },
  seo: { label: "SEO", accent: "03" },
  maps: { label: "MAPS", accent: "04" },
  social: { label: "SOCIAL", accent: "05" },
  maintenance: { label: "WEBCARE", accent: "06" },
  ai: { label: "AI", accent: "07" },
  ecommerce: { label: "COMMERCE", accent: "08" },
  refonte: { label: "REFONTE", accent: "09" },
  ads: { label: "ADS", accent: "10" },
  strategy: { label: "STRATEGY", accent: "11" },
};

export function ServiceIllustration({ service, title }: Props) {
  const uid = useId().replace(/:/g, "");
  const meta = icons[service] ?? icons.websites;
  const gradFill = "url(#" + uid + "-g)";
  const lineStroke = "url(#" + uid + "-line)";

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-border/60 bg-[#0d0d0d] shadow-2xl grain">
      <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label={title ?? meta.label}>
        <defs>
          <radialGradient id={uid + "-g"} cx="70%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#f2a33a" stopOpacity=".28" />
            <stop offset="45%" stopColor="#f2a33a" stopOpacity=".07" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={uid + "-line"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2a33a" stopOpacity=".9" />
            <stop offset="100%" stopColor="#fff" stopOpacity=".18" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="#0d0d0d" />
        <rect width="800" height="600" fill={gradFill} />

        <g opacity=".11" stroke="#fff" strokeWidth="1">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={"h" + i} x1="0" y1={70 + i * 48} x2="800" y2={70 + i * 48} />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={"v" + i} x1={40 + i * 55} y1="0" x2={40 + i * 55} y2="600" />
          ))}
        </g>

        {service === "social" ? (
          <g>
            <rect x="125" y="105" width="550" height="350" rx="24" fill="#151515" stroke="#fff" strokeOpacity=".18" />
            <rect x="155" y="145" width="210" height="18" rx="9" fill="#fff" fillOpacity=".85" />
            <rect x="155" y="185" width="360" height="10" rx="5" fill="#fff" fillOpacity=".16" />
            <rect x="155" y="215" width="280" height="10" rx="5" fill="#fff" fillOpacity=".1" />
            {["Instagram", "Facebook", "TikTok", "LinkedIn"].map((name, i) => (
              <g key={name} transform={"translate(" + (145 + i * 132) + " 275)"}>
                <rect width="108" height="115" rx="14" fill="#1c1c1c" stroke="#f2a33a" strokeOpacity=".5" />
                <circle cx="28" cy="28" r="9" fill="#f2a33a" fillOpacity=".85" />
                <text x="54" y="32" fontSize="9" textAnchor="middle" fontWeight="700" fill="#fff" fillOpacity=".8">
                  {name}
                </text>
                <rect x="16" y="58" width="76" height="7" rx="3.5" fill="#fff" fillOpacity=".25" />
                <rect x="16" y="78" width="55" height="7" rx="3.5" fill="#fff" fillOpacity=".12" />
              </g>
            ))}
            <path d="M575 150 C625 180 640 230 610 265" fill="none" stroke={lineStroke} strokeWidth="4" />
            <circle cx="610" cy="265" r="7" fill="#f2a33a" />
          </g>
        ) : service === "maps" ? (
          <g>
            <path d="M155 125 H645 V475 H155 Z" fill="#141414" stroke="#fff" strokeOpacity=".18" />
            <path
              d="M205 185 C300 140 330 260 425 215 S565 185 600 265 S525 365 590 420"
              fill="none"
              stroke="#fff"
              strokeOpacity=".14"
              strokeWidth="42"
            />
            <path
              d="M180 420 C260 330 310 370 370 300 S500 260 620 165"
              fill="none"
              stroke="#f2a33a"
              strokeOpacity=".75"
              strokeWidth="5"
            />
            {[
              ["A", 250, 330],
              ["B", 410, 290],
              ["C", 555, 215],
            ].map(([l, x, y]) => (
              <g key={String(l)}>
                <circle cx={Number(x)} cy={Number(y)} r="18" fill="#f2a33a" />
                <text x={Number(x)} y={Number(y) + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="#111">
                  {l}
                </text>
              </g>
            ))}
          </g>
        ) : service === "branding" ? (
          <g>
            <rect x="120" y="110" width="560" height="360" rx="22" fill="#141414" stroke="#fff" strokeOpacity=".15" />
            <text x="160" y="200" fontFamily="Georgia, serif" fontSize="72" fill="#fff" fillOpacity=".92">
              Aa
            </text>
            <text x="320" y="185" fontFamily="system-ui" fontSize="28" fontWeight="600" fill="#f2a33a">
              XR
            </text>
            <text x="320" y="220" fontFamily="system-ui" fontSize="14" fill="#fff" fillOpacity=".5" letterSpacing="4">
              IDENTITY SYSTEM
            </text>
            <rect x="160" y="280" width="70" height="70" rx="12" fill="#f2a33a" />
            <rect x="245" y="280" width="70" height="70" rx="12" fill="#1a1a1a" stroke="#fff" strokeOpacity=".25" />
            <rect x="330" y="280" width="70" height="70" rx="12" fill="#f5f0e8" />
            <rect x="415" y="280" width="70" height="70" rx="12" fill="#2a2a2a" stroke="#fff" strokeOpacity=".15" />
            <rect x="160" y="370" width="220" height="12" rx="6" fill="#fff" fillOpacity=".7" />
            <rect x="160" y="395" width="160" height="8" rx="4" fill="#fff" fillOpacity=".2" />
            <rect x="160" y="415" width="190" height="8" rx="4" fill="#fff" fillOpacity=".12" />
          </g>
        ) : service === "maintenance" || service === "webcare" ? (
          <g>
            <rect x="140" y="120" width="520" height="340" rx="22" fill="#141414" stroke="#fff" strokeOpacity=".15" />
            <circle cx="200" cy="190" r="14" fill="#22c55e" />
            <text x="230" y="196" fontSize="16" fill="#fff" fillOpacity=".85" fontWeight="600">
              All systems operational
            </text>
            {[
              ["Uptime", 99.9, 240],
              ["Security", 100, 290],
              ["Backups", 100, 340],
              ["Performance", 98, 390],
            ].map(([label, pct, y]) => (
              <g key={String(label)}>
                <text x="180" y={Number(y)} fontSize="13" fill="#fff" fillOpacity=".55">
                  {label}
                </text>
                <rect x="320" y={Number(y) - 10} width="260" height="10" rx="5" fill="#fff" fillOpacity=".08" />
                <rect
                  x="320"
                  y={Number(y) - 10}
                  width={260 * (Number(pct) / 100)}
                  height="10"
                  rx="5"
                  fill="#f2a33a"
                  fillOpacity=".85"
                />
                <text x="600" y={Number(y)} fontSize="12" fill="#f2a33a" textAnchor="end">
                  {pct}%
                </text>
              </g>
            ))}
          </g>
        ) : service === "ecommerce" ? (
          <g>
            <rect x="110" y="100" width="580" height="380" rx="22" fill="#141414" stroke="#fff" strokeOpacity=".15" />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={"translate(" + (150 + i * 180) + " 150)"}>
                <rect width="150" height="180" rx="16" fill="#1c1c1c" stroke="#fff" strokeOpacity=".12" />
                <rect x="16" y="16" width="118" height="90" rx="10" fill="#2a2a2a" />
                <rect x="16" y="120" width="80" height="8" rx="4" fill="#fff" fillOpacity=".5" />
                <rect x="16" y="138" width="55" height="6" rx="3" fill="#fff" fillOpacity=".2" />
                <rect x="16" y="155" width="50" height="14" rx="7" fill="#f2a33a" fillOpacity=".9" />
              </g>
            ))}
            <path
              d="M180 420 L280 380 L380 400 L500 340 L620 370"
              fill="none"
              stroke={lineStroke}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g>
            <rect x="145" y="125" width="510" height="350" rx="26" fill="#141414" stroke="#fff" strokeOpacity=".18" />
            <path
              d="M185 405 L275 320 L350 355 L455 220 L600 310"
              fill="none"
              stroke={lineStroke}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              ["01", 220, 365],
              ["02", 310, 305],
              ["03", 455, 205],
              ["04", 585, 295],
            ].map(([l, x, y]) => (
              <g key={String(l)}>
                <circle cx={Number(x)} cy={Number(y)} r="9" fill="#f2a33a" />
                <text x={Number(x)} y={Number(y) - 18} textAnchor="middle" fontSize="13" fill="#fff" fillOpacity=".55">
                  {l}
                </text>
              </g>
            ))}
            <rect x="185" y="165" width="160" height="16" rx="8" fill="#fff" fillOpacity=".8" />
            <rect x="185" y="198" width="250" height="9" rx="4.5" fill="#fff" fillOpacity=".12" />
            <rect x="185" y="225" width="190" height="9" rx="4.5" fill="#fff" fillOpacity=".08" />
          </g>
        )}

        <text x="54" y="535" fontSize="13" letterSpacing="4" fill="#fff" fillOpacity=".45">
          {meta.label}
        </text>
        <text x="745" y="535" textAnchor="end" fontSize="13" letterSpacing="3" fill="#f2a33a" fillOpacity=".85">
          {meta.accent}
        </text>
        <circle cx="720" cy="78" r="7" fill="#f2a33a" />
      </svg>
    </div>
  );
}
