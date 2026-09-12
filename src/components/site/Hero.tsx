import { ArrowDown, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax } from "./primitives";
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="grain relative min-h-[88dvh] overflow-hidden pt-20 sm:pt-24">
      <Parallax speed={0.1} className="pointer-events-none absolute inset-0 -top-[8%] h-[116%]"><video src={heroLoop.url} autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover opacity-25 grayscale contrast-105" /></Parallax>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--background) 96%, transparent) 0%, color-mix(in oklab, var(--background) 82%, transparent) 58%, color-mix(in oklab, var(--background) 55%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 45%, transparent) 0%, transparent 48%, var(--background) 100%)" }} />
      <div className="relative mx-auto flex min-h-[calc(88dvh-6rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        <div className="flex items-center justify-between border-b border-border/50 pb-3"><div className="flex items-center gap-3"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span><span className="label-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t(UI.intelOnline)}</span></div><span className="label-mono hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">Digital studio · FR / EN / VI</span></div>
        <div className="py-16 sm:py-20 lg:py-24"><Parallax speed={-0.025} className="relative z-10 max-w-5xl"><div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"><Sparkles className="h-3.5 w-3.5 text-primary" /><span className="label-mono text-xs font-medium text-primary">{t(UI.heroKicker)}</span></div><h1 className="display-serif mt-5 max-w-5xl text-[clamp(2.8rem,7vw,6.8rem)] leading-[0.9] tracking-tight">{t(UI.heroTitle1)}<br /><em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}{t(UI.heroTitle2)}</h1><p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t(UI.heroLead)}</p><p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground/65">{t(UI.heroMeta)}</p><div className="mt-9 flex flex-wrap items-center gap-3"><EmberButton href="#quote" className="shadow-lg">{t(UI.ctaAnalysis)}</EmberButton><a href="#homepage-services" className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3.5 text-xs text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary">Voir les 6 expertises<ArrowDown className="h-3.5 w-3.5" /></a></div></Parallax></div>
        <div className="flex items-center justify-between border-t border-border/50 py-4"><span className="label-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">XRAGENCY · Digital studio</span><span className="label-mono hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 sm:block">Design · Technology · Visibility</span><a href="#quote" className="label-mono text-[10px] uppercase tracking-[0.18em] text-primary hover:underline">Commencer →</a></div>
      </div>
    </section>
  );
}
