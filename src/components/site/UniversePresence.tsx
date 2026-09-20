import { useMemo } from "react";
import pf01 from "@/assets/pf-01-maison-lumiere.jpg";
import pf02 from "@/assets/pf-02-villa-azur.jpg";
import pf03 from "@/assets/pf-03-noir-or.jpg";
import pf04 from "@/assets/pf-04-cabinet-mercier.jpg";
import pf05 from "@/assets/pf-05-elan-studio.jpg";
import pf06 from "@/assets/pf-06-zen-retreat.jpg";
import pf07 from "@/assets/pf-07-lumina-digital.jpg";
import pf08 from "@/assets/pf-08-neo-gear.jpg";

type Mood = "calm" | "focus" | "recommend" | "success";
type Props = { sector?: string; mood?: Mood; step?: number };

const SCENES: Record<string, { image: string; material: string; tone: string }> = {
  restaurant: { image: pf01, material: "or chaud · nuit", tone: "from-amber-300/25 via-black/10 to-black/75" },
  hospitality: { image: pf02, material: "or chaud · nuit", tone: "from-amber-300/25 via-black/10 to-black/75" },
  realestate: { image: pf03, material: "pierre · vert profond", tone: "from-emerald-900/40 via-black/10 to-black/80" },
  automotive: { image: pf08, material: "graphite · filet rouge", tone: "from-red-500/20 via-black/15 to-black/80" },
  fashion: { image: pf05, material: "métal · lumière rasante", tone: "from-slate-200/20 via-black/10 to-black/80" },
  jewelry: { image: pf03, material: "métal · lumière rasante", tone: "from-amber-100/20 via-black/10 to-black/80" },
  beauty: { image: pf06, material: "champagne", tone: "from-amber-100/25 via-black/10 to-black/80" },
  health: { image: pf07, material: "pierre · lumière douce", tone: "from-emerald-400/15 via-black/10 to-black/80" },
  architecture: { image: pf04, material: "pierre · lumière rasante", tone: "from-slate-200/20 via-black/10 to-black/80" },
  construction: { image: pf04, material: "matière · atelier", tone: "from-amber-200/15 via-black/10 to-black/80" },
  legal: { image: pf04, material: "bois · lumière chaude", tone: "from-amber-300/15 via-black/10 to-black/80" },
  finance: { image: pf07, material: "métal · précision", tone: "from-sky-300/15 via-black/10 to-black/80" },
  commerce: { image: pf05, material: "matière · studio", tone: "from-fuchsia-300/15 via-black/10 to-black/80" },
  tourism: { image: pf06, material: "lumière · horizon", tone: "from-cyan-300/15 via-black/10 to-black/80" },
  agency: { image: pf07, material: "écran · atelier", tone: "from-sky-300/15 via-black/10 to-black/80" },
  other: { image: pf07, material: "matière · atelier", tone: "from-primary/20 via-black/10 to-black/80" },
};

export function UniversePresence({ sector, mood = "calm", step = 0 }: Props) {
  const key = Object.keys(SCENES).find((id) => sector?.toLowerCase().startsWith(id)) ?? "other";
  const scene = useMemo(() => SCENES[key], [key]);
  const moodClass = mood === "success" ? "ring-emerald-400/30" : mood === "recommend" ? "ring-primary/40" : mood === "focus" ? "ring-primary/25" : "ring-white/10";
  const label = sector || "Choisissez votre univers";
  return (
    <div className="group relative w-full max-w-[380px]" aria-label={`Plaque d'atelier XR Intelligence — ${label}`}>
      <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-primary/25 bg-black shadow-[0_30px_80px_-45px_rgba(0,0,0,.95)] ring-1 ${moodClass} transition-all duration-500 group-hover:-translate-y-1`}>
        <img src={scene.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className={`absolute inset-0 bg-gradient-to-br ${scene.tone}`} />
        <div className="absolute inset-3 rounded-[1.25rem] border border-amber-200/20" />
        <div className="absolute inset-x-6 top-6 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[.24em] text-white/70">XR / ATELIER</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.65)]" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-60">
          <svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true">
            <path d="M8 29 C18 18 27 19 34 27 C39 33 46 31 50 20" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M25 13 C29 10 34 10 38 13" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/65 p-4 backdrop-blur-md">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[10px] font-semibold tracking-[.18em] text-primary">XR INTELLIGENCE</div>
              <div className="mt-1 truncate text-base font-medium text-white">{label}</div>
              <div className="mt-1 text-xs text-white/60">{scene.material} · étape {String(step + 1).padStart(2, "0")}</div>
            </div>
            <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[9px] uppercase tracking-[.16em] text-emerald-300">en ligne</span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")" }} />
      </div>
    </div>
  );
}
