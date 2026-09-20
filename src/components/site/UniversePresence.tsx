import { useMemo } from "react";

type Props = { sector?: string; mood?: "calm" | "focus" | "recommend" | "success" | string };

const names: Record<string, string> = {
  restaurant: "Gastronomie", hospitality: "Hôtellerie & Resort", realestate: "Immobilier", automotive: "Automobile",
  fashion: "Mode & Accessoires", jewelry: "Joaillerie & Horlogerie", beauty: "Beauté & Spa", health: "Santé",
  architecture: "Architecture & Design", construction: "Construction & Rénovation", legal: "Droit & Expertise",
  finance: "Finance & Patrimoine", commerce: "Commerce & E-commerce", tourism: "Voyage & Expériences",
  agency: "Agence & Studio", other: "Votre activité",
};

const grades: Record<string, string> = {
  restaurant: "from-amber-500/35 via-orange-950/25 to-black", hospitality: "from-sky-500/25 via-stone-700/20 to-black",
  realestate: "from-emerald-500/25 via-stone-700/20 to-black", automotive: "from-red-600/25 via-zinc-800/20 to-black",
  fashion: "from-violet-500/20 via-zinc-900/20 to-black", jewelry: "from-yellow-400/30 via-stone-900/20 to-black",
  beauty: "from-rose-500/20 via-zinc-900/20 to-black", health: "from-cyan-500/20 via-zinc-900/20 to-black",
  architecture: "from-stone-300/20 via-zinc-900/20 to-black", construction: "from-orange-500/20 via-zinc-900/20 to-black",
  legal: "from-slate-400/20 via-zinc-900/20 to-black", finance: "from-emerald-400/20 via-zinc-900/20 to-black",
  commerce: "from-fuchsia-500/20 via-zinc-900/20 to-black", tourism: "from-blue-500/20 via-zinc-900/20 to-black",
  agency: "from-amber-400/20 via-zinc-900/20 to-black", other: "from-amber-400/15 via-zinc-900/20 to-black",
};

export function UniversePresence({ sector, mood = "calm" }: Props) {
  const grade = useMemo(() => grades[sector || "other"] || grades.other, [sector]);
  const label = names[sector || "other"] || names.other;
  return (
    <aside className="relative min-h-[38svh] overflow-hidden rounded-[1.5rem] border border-primary/30 bg-[#090a0b] shadow-[0_30px_90px_-50px_rgba(0,0,0,.95)] lg:min-h-[430px]" aria-label="Prévisualisation de votre univers">
      <div className={`absolute inset-0 bg-gradient-to-br ${grade} transition-all duration-500`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,215,150,.16),transparent_25%),radial-gradient(circle_at_75%_72%,rgba(90,130,170,.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute inset-4 rounded-[1.2rem] border border-primary/35" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono uppercase tracking-[.18em] text-white/55">XR INTELLIGENCE</span>
        <span className="h-2 w-2 rounded-full bg-[var(--warm)] shadow-[0_0_14px_rgba(207,157,78,.9)]" />
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <span className="text-[11px] font-mono uppercase tracking-[.18em] text-[var(--warm)]">{mood}</span>
        <h3 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">{label}</h3>
        <p className="mt-2 max-w-xs text-sm leading-5 text-white/60">Matière, lumière et direction visuelle adaptées à votre univers.</p>
      </div>
    </aside>
  );
}
