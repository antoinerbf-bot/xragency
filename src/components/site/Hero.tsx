import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Zap, ArrowRight, ShieldCheck, Globe as GlobeIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax, FloatingBadge } from "./primitives";
import { SurfaceDigital } from "./SurfaceDigital";
import { Hero3D } from "./Hero3D";
// import EarthGlobe from "./EarthGlobe"; // Globe removed per user request
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1600, startDelay = 500) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);

  return value;
}

/* ── Stat card with animated counter ── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const count = useCountUp(value, 1600, delay);
  return (
    <div
      className="bg-card/75 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:bg-accent/40 hover:-translate-y-0.5 cursor-default"
      style={{ animation: `ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}
    >
      <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold tracking-tight">
        {count}
        {suffix ?? ""}
      </dt>
      <dd className="label-mono mt-1 text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[92dvh] overflow-hidden pt-20 sm:pt-24">
      {/* Surface digitale — network / structure / visibility */}
      <div className="pointer-events-none absolute inset-0 bg-background">
        <Hero3D />
        <SurfaceDigital className="opacity-90" />
      </div>
      <Parallax speed={0.08} className="absolute inset-0 -top-[8%] h-[116%] pointer-events-none">
        <video
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-[0.12] grayscale contrast-110 mix-blend-luminosity"
        />
      </Parallax>

      {/* Atmospheric lighting depth layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 30%, color-mix(in oklab, var(--background) 65%, transparent) 60%, color-mix(in oklab, var(--background) 85%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 60%, transparent) 0%, transparent 45%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(92dvh-6.5rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        {/* Top Header Status Bar */}
        <div className="animate-rise flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-border/60 pb-3.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="label-mono text-xs text-muted-foreground">{t(UI.intelOnline)}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="label-mono hidden sm:inline">Paris · Dubaï · Tokyo · New York</span>
            <span className="label-mono rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[10px] text-primary">
              Studio Certifié
            </span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="grid items-center gap-10 py-10 lg:grid-cols-12 lg:py-14">
          {/* Left Column: Typography & CTAs */}
          <Parallax speed={-0.03} className="relative z-10 lg:col-span-8">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"
              style={{ animation: "ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="label-mono text-xs text-primary font-medium">
                {t(UI.heroKicker)}
              </span>
            </div>

            <h1
              className="display-serif mt-5 text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.96] tracking-tight"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 200ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-6 max-w-xl"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80 font-mono">
                {t(UI.heroMeta)}
              </p>
            </div>

            {/* Direct CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 400ms both" }}
            >
              <EmberButton href="#intelligence" className="shadow-lg">
                XR Intelligence — analyser mon activité
                <ArrowRight className="h-3.5 w-3.5" />
              </EmberButton>

              <Link
                to="/work"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-xs text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                Voir nos réalisations
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <span className="label-mono hidden text-xs text-muted-foreground/80 sm:inline">
                {t(UI.intelDuration)}
              </span>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 500ms both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <p className="label-mono text-[11px] text-muted-foreground/70">
                {t(UI.ctaReassurance)} · Pas de reconduction tacite
              </p>
            </div>
          </Parallax>

          {/* Right Column reserved for future visual */}
        </div>

        {/* Bottom Key Stats Bar with Animated Counters */}
        <div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4 shadow-sm">
            <AnimatedStat value={500} suffix="+" label={t(UI.statProjects)} delay={550} />
            <AnimatedStat value={8} suffix="+" label={t(UI.statYears)} delay={630} />
            <AnimatedStat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={710} />
            <AnimatedStat value={2} suffix="h" label={t(UI.statResponse)} delay={790} />
          </dl>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-4 mt-5">
            <span className="label-mono text-xs text-muted-foreground/70">p. 001 · Studio digital premium</span>
            <span className="label-mono hidden text-xs text-muted-foreground/70 md:block">
              Web · Branding · SEO · Google Maps · Social · IA · WebCare
            </span>
            <span className="label-mono text-xs text-primary">XR Intelligence · 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
