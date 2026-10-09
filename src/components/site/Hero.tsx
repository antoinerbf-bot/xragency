import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Play,
  Search,
} from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { UI } from "@/lib/copy";
import { Parallax, Reveal } from "./primitives";

function useCountUp(target: number, duration = 1100, delay = 220) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="border-l border-neutral-300/60 dark:border-white/15 pl-4 first:border-l-0 first:pl-0 sm:pl-6">
      <strong className="display-serif block text-3xl tracking-[-.045em] text-neutral-900 dark:text-white sm:text-4xl">
        {useCountUp(value)}
        {suffix}
      </strong>
      <span className="mt-1 block label-mono text-[6px] tracking-[.18em] text-neutral-600 dark:text-white/55 sm:text-[7px]">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="top"
      className="xr-hero relative isolate min-h-[100svh] overflow-hidden border-b border-neutral-200/80 bg-[#f8f6f0] text-[#101114] transition-colors duration-500 dark:border-white/10 dark:bg-[#090a0d] dark:text-white"
    >
      {/* Photo de fond authentique : bureaux parisiens & Tour Eiffel */}
      <div aria-hidden className="absolute inset-0 select-none pointer-events-none">
        <img
          src={XR_HERO_PHOTO}
          alt="XR Agency Creative Studio Paris"
          className="xr-hero-bg absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 opacity-70 brightness-[1.02] contrast-[1.05] dark:opacity-75 dark:brightness-95 dark:contrast-115"
          fetchPriority="high"
        />
        {/* Voile photographique raffiné préservant la netteté des bureaux parisiens et de la Tour Eiffel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f0]/90 via-[#f8f6f0]/60 to-transparent dark:from-[#090a0d]/90 dark:via-[#090a0d]/65 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f0] via-transparent to-[#f8f6f0]/30 dark:from-[#090a0d] dark:via-transparent dark:to-[#090a0d]/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--xr-bg)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col justify-between px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="flex flex-1 items-center">
          <Parallax speed={-0.014} className="w-full">
            <div className="relative z-20 max-w-3xl rounded-[2.5rem] border border-neutral-300/40 bg-white/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-black/35 sm:p-10">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-neutral-400 dark:bg-white/40" />
                  <span className="label-mono text-[8px] tracking-[.28em] text-neutral-600 dark:text-white/60">
                    {t(UI.heroKicker)}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-serif mt-6 max-w-[900px] text-[clamp(2.8rem,5.8vw,6.5rem)] leading-[.92] tracking-[-.055em] text-neutral-900 dark:text-white break-words drop-shadow-sm">
                  <span className="inline-block whitespace-nowrap">{t(UI.heroTitle1)}</span>{" "}
                  <span className="italic font-normal text-neutral-900 dark:text-white inline-block">
                    {t(UI.heroTitleAccent)}
                  </span>
                  <br />
                  <em className="not-italic text-neutral-700 dark:text-white/85">{t(UI.heroTitle2)}</em>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-neutral-800 dark:text-white/80 sm:text-lg">
                  {t(UI.heroLead)}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#quote"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-7 py-3.5 text-[9px] font-bold uppercase tracking-[.14em] text-white shadow-[0_12px_40px_-15px_rgba(0,0,0,.45)] transition duration-300 hover:-translate-y-1 hover:bg-neutral-800 dark:bg-white dark:text-black dark:shadow-[0_12px_40px_-15px_rgba(255,255,255,.4)] dark:hover:bg-neutral-100"
                  >
                    Lancer mon analyse personnalisée
                    <Search className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#quote"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-6 py-3.5 text-[9px] font-bold uppercase tracking-[.13em] text-emerald-600 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:text-white dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-black"
                  >
                    Demander ma maquette gratuite
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#audit"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-300/90 bg-white/80 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[.12em] text-neutral-800 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/[.08] dark:text-white dark:hover:bg-white/[.15]"
                  >
                    Audit de visibilité immédiat
                  </a>
                  <a
                    href="#homepage-services"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-300/80 bg-white/60 px-5 py-3.5 text-[8.5px] font-semibold uppercase tracking-[.12em] text-neutral-700 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/15 dark:bg-white/[.05] dark:text-white/80 dark:hover:bg-white/[.10]"
                  >
                    Nos 7 expertises
                  </a>
                </div>
              </Reveal>

              <Reveal delay={290}>
                <div className="mt-9 grid max-w-2xl grid-cols-3 gap-5 border-y border-neutral-300/70 py-5 dark:border-white/12 sm:mt-10 sm:gap-8">
                  <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                  <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
                  <Stat value={8} suffix="+" label={t(UI.statYears)} />
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label-mono text-[6px] tracking-[.2em] text-neutral-500 dark:text-white/50">
                    WEB · BRAND · SEO · LOCAL · SOCIAL · WEBCARE · ROBOTIQUE
                  </span>
                  <span className="h-px w-8 bg-neutral-300/80 dark:bg-white/15" />
                  <div className="flex gap-1.5">
                    {LANGS.map((lang) => (
                      <span key={lang.code} className="text-sm opacity-80" title={lang.label}>
                        {lang.flag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Parallax>
        </div>

        <Reveal delay={460}>
          <div className="relative z-20 mt-4 flex items-center justify-between border-t border-neutral-300/70 pt-4 dark:border-white/10 sm:mt-2 sm:pt-5">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-white/50">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300/80 dark:border-white/15">
                <ArrowDown className="h-3.5 w-3.5 animate-pulse-soft" />
              </span>
              <span className="label-mono text-[6px] tracking-[.22em]">SCROLLER POUR EXPLORER</span>
            </div>
            <span className="hidden label-mono text-[6px] tracking-[.18em] text-neutral-400 dark:text-white/40 sm:block">
              XRAGENCY / DIGITAL EXPERIENCES
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
