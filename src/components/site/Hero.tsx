import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { Globe } from "./Globe";
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 2000, startDelay = 600) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
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
  const count = useCountUp(value, 1800, delay);
  return (
    <div
      className="bg-card/70 px-5 py-5 backdrop-blur-sm transition-colors hover:bg-accent/40"
      style={{ animation: `ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}
    >
      <dt className="display-serif text-3xl text-primary sm:text-4xl">
        {count}
        {suffix ?? ""}
      </dt>
      <dd className="label-mono mt-1.5 text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

/* ── Trust bar: monogram logos ── */
const TRUST_CLIENTS = [
  { initials: "CL", name: "Clinique Privée" },
  { initials: "MR", name: "Maison Rebuffé" },
  { initials: "HB", name: "Hôtel Boutique" },
  { initials: "JD", name: "Joaillerie Ducale" },
  { initials: "AV", name: "Atelier Végétal" },
  { initials: "NP", name: "Nouvelle Paris" },
  { initials: "SG", name: "Studio Green" },
  { initials: "LV", name: "La Villa" },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[100dvh] overflow-hidden pt-24 sm:pt-28">
      {/* Background ambient video */}
      <Parallax speed={0.12} className="absolute inset-0 -top-[10%] h-[120%]">
        <video
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-40 grayscale contrast-105"
        />
      </Parallax>

      {/* Atmospheric lighting layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 30%, color-mix(in oklab, var(--background) 65%, transparent) 60%, color-mix(in oklab, var(--background) 85%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 60%, transparent) 0%, transparent 45%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-7rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        {/* Top Header Status Bar */}
        <div className="animate-rise flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="label-mono text-xs text-muted-foreground">{t(UI.intelOnline)}</span>
          </div>
          <span className="label-mono text-xs text-muted-foreground">{CONTACT.cities}</span>
        </div>

        {/* Hero Main Content & Signature Globe */}
        <div className="grid items-center gap-12 py-12 lg:grid-cols-12 lg:py-16">
          {/* Left Column: Typography & CTAs */}
          <div className="relative z-10 lg:col-span-7">
            <p
              className="label-mono inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-xs text-primary"
              style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              {t(UI.heroKicker)}
            </p>

            <h1
              className="display-serif mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98]"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 220ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-8 max-w-xl"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 340ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                {t(UI.heroMeta)}
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-4"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 440ms both" }}
            >
              <EmberButton href="#intelligence">{t(UI.ctaAnalysis)}</EmberButton>
              <EmberButton href="#services" variant="ghost">
                {t(UI.ctaContinue)}
              </EmberButton>
              <span className="label-mono text-xs text-muted-foreground/80">
                {t(UI.intelDuration)}
              </span>
            </div>
            <p
              className="label-mono mt-4 text-[10px] text-muted-foreground/50"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 540ms both" }}
            >
              {t(UI.ctaReassurance)}
            </p>
          </div>

          {/* Right Column: Signature Interactive Globe Visual */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <Parallax speed={0.06} className="relative w-full max-w-[540px]">
              <Globe className="aspect-square w-full" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
                <span className="label-mono text-[10px] tracking-wider text-muted-foreground">
                  Réseau International · Paris · Asie · USA
                </span>
              </div>
            </Parallax>
          </div>
        </div>

        {/* Bottom Key Stats Bar — Animated Counters */}
        <div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
            <AnimatedStat value={500} suffix="+" label={t(UI.statProjects)} delay={560} />
            <AnimatedStat value={8} suffix="+" label={t(UI.statYears)} delay={650} />
            <AnimatedStat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={740} />
            <AnimatedStat value={2} suffix="h" label={t(UI.statResponse)} delay={830} />
          </dl>

          {/* Trust Bar — Client Monograms */}
          <div
            className="mt-8"
            style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 950ms both" }}
          >
            <p className="label-mono text-center text-[10px] tracking-widest text-muted-foreground/50">
              {t(UI.trustBarLabel)}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TRUST_CLIENTS.map((c) => (
                <div
                  key={c.initials}
                  className="group flex items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-80"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card/50">
                    <span className="label-mono text-[9px] font-semibold tracking-wider text-muted-foreground">
                      {c.initials}
                    </span>
                  </div>
                  <span className="label-mono hidden text-[10px] text-muted-foreground/70 sm:inline">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="label-mono mt-3 text-center text-[10px] text-muted-foreground/40">
              {t(UI.trustBarClients)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-5 mt-8">
            <span className="label-mono text-xs text-muted-foreground/70">p. 001</span>
            <span className="label-mono hidden text-xs text-muted-foreground/70 md:block">
              Sites · Identité · SEO · Google Maps · Social · IA · Maintenance
            </span>
            <span className="label-mono text-xs text-muted-foreground/70">xragency.vercel.app</span>
          </div>
        </div>
      </div>
    </section>
  );
}
