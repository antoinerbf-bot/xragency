import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileImage, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import pf07 from "@/assets/pf-07-lumina-digital.jpg";

function useCountUp(target: number, duration = 1400, startDelay = 400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);
  return value;
}

function Stat({ value, suffix, label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  const count = useCountUp(value, 1400, delay);
  return <div className="px-4 py-3 sm:px-5"><div className="display-serif text-xl font-bold text-primary sm:text-2xl">{count}{suffix}</div><div className="mt-0.5 text-sm text-muted-foreground">{label}</div></div>;
}

const HERO_SECTORS = [
  ["restaurant", "Restaurant · café · bar"], ["hospitality", "Hôtel · villa · resort"], ["realestate", "Immobilier · location"],
  ["automotive", "Automobile · mobilité"], ["fashion", "Mode · accessoires"], ["jewelry", "Joaillerie · horlogerie"],
  ["beauty", "Beauté · spa"], ["health", "Santé · médical"], ["architecture", "Architecture · intérieur"],
  ["construction", "Construction · rénovation"], ["legal", "Avocat · droit"], ["finance", "Finance · patrimoine"],
  ["commerce", "Commerce · e-commerce"], ["tourism", "Voyage · tourisme"], ["agency", "Agence · studio"],
] as const;

export function Hero() {
  const { t } = useLang();
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches || "connectionSaveData" in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData));
    update(); mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  const goSector = (id: string) => {
    window.dispatchEvent(new CustomEvent("xr:sector", { detail: id }));
    document.getElementById("quote")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };
  return (
    <section id="top" className="grain relative min-h-[100svh] overflow-hidden pt-20 sm:pt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <img src={pf07} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-35 saturate-[.75]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_15%_45%,hsl(var(--background)/.98)_5%,hsl(var(--background)/.82)_42%,hsl(var(--background)/.45)_72%,hsl(var(--background)/.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/.72),transparent_28%,hsl(var(--background)/.82)_96%)]" />
        <div className="absolute -right-[10%] top-[18%] h-[55vw] w-[55vw] rounded-full bg-primary/[.09] blur-[90px] animate-[ember-pulse_20s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute inset-0 opacity-[.055] [background-image:radial-gradient(rgba(255,255,255,.9)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />
        <video
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster={pf07}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35 mix-blend-screen"
          style={{ pointerEvents: "none", display: reduceMotion ? "none" : "block" }}
          aria-hidden="true"
        >
          <source src="/media/hero-desktop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1500px] flex-col justify-end px-5 pb-5 sm:px-8 sm:pb-7 lg:px-12">
        <Parallax speed={-0.02} className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/45 px-3 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium tracking-[.08em] text-primary">{t(UI.heroKicker)}</span>
          </div>
          <h1 className="display-serif mt-4 max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)] leading-[.91] tracking-[-.045em]">
            {t(UI.heroTitle1)}<br /><em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}{t(UI.heroTitle2)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8">{t(UI.heroLead)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <EmberButton href="#quote" className="px-6 py-3.5">Faire mon devis gratuit <ArrowUpRight className="h-4 w-4" /></EmberButton>
            <a href={CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).")} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/60"><FileImage className="h-4 w-4 text-primary" />Maquette gratuite · 200 €</a>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70"><ShieldCheck className="h-4 w-4 text-primary" /> Audit digital gratuit · valorisation 100 € · sans engagement</div>
        </Parallax>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-background/55 backdrop-blur-md">
          <div className="grid grid-cols-2 divide-x divide-border/50 sm:grid-cols-4 sm:divide-x">
            <Stat value={500} suffix="+" label={t(UI.statProjects)} delay={500} />
            <Stat value={8} suffix="+" label={t(UI.statYears)} delay={580} />
            <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={660} />
            <Stat value={2} suffix="h" label={t(UI.statResponse)} delay={740} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pb-1">
          {HERO_SECTORS.map(([id, label]) => <button key={id} type="button" onClick={() => goSector(id)} className="min-h-[38px] rounded-full border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/75 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/55 hover:text-white">{label}</button>)}
        </div>
      </div>
    </section>
  );
}
