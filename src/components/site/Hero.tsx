import { Sparkles, ArrowDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax } from "./primitives";
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[92dvh] overflow-hidden pt-20 sm:pt-24">
      <Parallax speed={0.14} className="absolute inset-0 -top-[12%] h-[124%] pointer-events-none">
        <video
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-30 grayscale contrast-105"
        />
      </Parallax>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 28%, color-mix(in oklab, var(--background) 72%, transparent) 58%, color-mix(in oklab, var(--background) 88%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 72%, transparent) 0%, transparent 48%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(92dvh-6.5rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        <div className="animate-rise flex items-center justify-between border-b border-border/50 pb-3.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="label-mono text-xs text-muted-foreground">{t(UI.intelOnline)}</span>
          </div>
          <span className="label-mono hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Digital studio · FR / EN / VI
          </span>
        </div>

        <div className="grid items-center py-14 lg:grid-cols-12 lg:py-20">
          <Parallax speed={-0.03} className="relative z-10 lg:col-span-10">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"
              style={{ animation: "ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="label-mono text-xs font-medium text-primary">{t(UI.heroKicker)}</span>
            </div>

            <h1
              className="display-serif mt-5 max-w-5xl text-[clamp(2.7rem,7vw,6.8rem)] leading-[0.91] tracking-tight"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 200ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-7 max-w-2xl"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground/70 font-mono">
                {t(UI.heroMeta)}
              </p>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-3.5"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 400ms both" }}
            >
              <EmberButton href="#intelligence" className="shadow-lg">
                {t(UI.ctaAnalysis)}
              </EmberButton>
              <a
                href="#homepage-services"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-xs text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                Découvrir les 7 expertises
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </Parallax>
        </div>

        <div
          className="flex items-center justify-between border-t border-border/50 py-4"
          style={{ animation: "ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) 700ms both" }}
        >
          <span className="label-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            XRAGENCY · Digital studio
          </span>
          <span className="label-mono hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 sm:block">
            Design · Technology · Visibility
          </span>
          <a href="#intelligence" className="label-mono text-[10px] uppercase tracking-[0.18em] text-primary hover:underline">
            Commencer l'expérience →
          </a>
        </div>
      </div>
    </section>
  );
}
