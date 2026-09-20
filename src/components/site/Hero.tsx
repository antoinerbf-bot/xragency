import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileImage, ShieldCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton } from "./primitives";

const SECTORS = [
  ["restaurant", "Gastronomie"], ["hospitality", "Hôtellerie"], ["realestate", "Immobilier"],
  ["automotive", "Automobile"], ["fashion", "Mode"], ["jewelry", "Joaillerie"],
] as const;

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.max(1, Math.round(target * (1 - Math.pow(1 - progress, 3)))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => { window.clearTimeout(timer); if (frame) cancelAnimationFrame(frame); };
  }, [target, duration, delay]);
  return value || target;
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const count = useCountUp(value, 1200, delay);
  return <div className="border-r border-white/10 px-4 py-3 last:border-r-0 sm:px-5 sm:py-4">
    <dt className="display-serif text-2xl text-[var(--warm)] sm:text-3xl">{count}{suffix}</dt>
    <dd className="mt-1 text-[11px] leading-4 text-white/55 sm:text-xs">{label}</dd>
  </div>;
}

export function Hero() {
  const { t } = useLang();
  const waUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");
  const chooseSector = (id: string) => {
    window.dispatchEvent(new CustomEvent("xr:sector", { detail: { id } }));
    window.setTimeout(() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  };
  return <section id="top" className="grain relative min-h-[100svh] overflow-hidden bg-[#090a0b] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(180,126,55,.24),transparent_30%),radial-gradient(circle_at_88%_75%,rgba(53,83,110,.22),transparent_28%),linear-gradient(110deg,#070809_0%,rgba(7,8,9,.82)_45%,rgba(7,8,9,.42)_100%)]" />
    <div className="absolute inset-0 overflow-hidden">
      <video className="h-full w-full object-cover opacity-70" src="/media/hero-studio.mp4" autoPlay muted loop playsInline preload="metadata" poster="/media/hero-poster.webp" aria-hidden onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,8,.98)_0%,rgba(6,7,8,.78)_40%,rgba(6,7,8,.30)_72%,rgba(6,7,8,.58)_100%),linear-gradient(0deg,rgba(6,7,8,.88)_0%,transparent_45%,rgba(6,7,8,.30)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(210,154,72,.18),transparent_28%)]" />
    </div>
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-5 pb-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
      <div className="flex flex-1 items-center"><div className="w-full max-w-5xl">
        <div className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5 text-[var(--warm)]" /><span className="text-[11px] font-medium uppercase tracking-[.18em] text-white/75">{t(UI.heroKicker)}</span></div>
        <h1 className="display-serif max-w-4xl text-[clamp(3rem,7.2vw,6.8rem)] leading-[.91] tracking-[-.045em] text-white">{t(UI.heroTitle1)} <em className="not-italic italic text-[var(--warm)]">{t(UI.heroTitleAccent)}</em> {t(UI.heroTitle2)}</h1>
        <div className="mt-6 max-w-2xl"><p className="text-base leading-7 text-white/75 sm:text-lg">{t(UI.heroLead)}</p><p className="mt-2 text-sm text-white/50">{t(UI.heroMeta)}</p></div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <EmberButton href="#quote" className="min-h-12 bg-[var(--warm)] px-7 text-[12px] font-semibold text-black hover:brightness-110">Faire mon devis <ArrowUpRight className="h-4 w-4" /></EmberButton>
          <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 border border-white/20 bg-white/[.04] px-4 py-2 text-[11px] text-white/75 backdrop-blur-xl transition hover:border-[var(--warm)]/60 hover:text-white"><FileImage className="h-3.5 w-3.5 text-[var(--warm)]" />Maquette 200 € · WhatsApp</a>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-white/50"><ShieldCheck className="h-3.5 w-3.5 text-[var(--warm)]" />{t(UI.ctaReassurance)}</div>
        <div className="mt-7 max-w-4xl"><p className="mb-2 text-[11px] uppercase tracking-[.18em] text-white/45">Votre univers</p><div className="flex flex-wrap gap-2">{SECTORS.map(([id, label]) => <button key={id} type="button" onClick={() => chooseSector(id)} className="min-h-11 rounded-full border border-white/15 bg-black/25 px-4 text-sm text-white/75 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[var(--warm)]/70 hover:bg-[var(--warm)]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--warm)]">{label}</button>)}</div></div>
      </div></div>
      <div className="grid grid-cols-2 overflow-hidden border border-white/10 bg-black/35 backdrop-blur-xl sm:grid-cols-4">
        <Stat value={500} suffix="+" label={t(UI.statProjects)} delay={250} /><Stat value={8} suffix="+" label={t(UI.statYears)} delay={350} /><Stat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={450} /><Stat value={2} suffix="h" label={t(UI.statResponse)} delay={550} />
      </div>
    </div>
    <style>{`@media (prefers-reduced-motion: reduce){#top video{display:none}}@media(max-width:640px){#top video{object-position:58% center}}`}</style>
  </section>;
}
