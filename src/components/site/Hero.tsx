import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  MapPinned,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { XR_HERO_PHOTO, XR_PHOTOS } from "@/lib/photography";
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

function DeviceStage() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[680px] items-center justify-center py-6 lg:py-0">
      {/* Halo d'ambiance */}
      <div aria-hidden className="pointer-events-none absolute h-[340px] w-[340px] rounded-full bg-white/5 blur-3xl" />

      {/* Carte principale Web Luxury Showcase */}
      <div className="relative w-full max-w-[620px] transition-all duration-700">
        <div className="overflow-hidden rounded-[1.8rem] border border-neutral-300/80 bg-white/95 p-3 shadow-[0_30px_90px_-25px_rgba(0,0,0,.25)] backdrop-blur-2xl dark:border-white/18 dark:bg-[#121316]/95 dark:shadow-[0_40px_110px_-30px_rgba(0,0,0,.95)] sm:p-4">
          {/* Header de la fenêtre navigateur */}
          <div className="mb-3 flex items-center justify-between border-b border-neutral-200/80 pb-2.5 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 label-mono text-[7px] tracking-[.18em] text-neutral-400 dark:text-white/45">
                XRAGENCY.COM / BESPOKE DIGITAL
              </span>
            </div>
            <span className="label-mono text-[7px] font-bold text-emerald-500">SCORE 100/100</span>
          </div>

          {/* Image principale : site web d'architecture & luxe */}
          <div className="relative overflow-hidden rounded-[1.2rem] bg-black">
            <img
              src={XR_PHOTOS.websites}
              alt="Conception web haut de gamme par XR Agency"
              className="aspect-[16/10] w-full object-cover object-center transition duration-700 hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[6.5px] tracking-[.2em] text-white/70">ARCHITECTURAL WEB DESIGN</span>
                <p className="text-[10.5px] font-semibold text-white">Sites Vitrine, Business & E-commerce sur-mesure</p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 label-mono text-[7px] text-white backdrop-blur-md">
                Dès 499 €
              </span>
            </div>
          </div>

          {/* Mini-barre de synthèse des expertises */}
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-200/80 pt-3 dark:border-white/10">
            <div className="flex items-center gap-2 rounded-xl bg-neutral-100/80 p-2 dark:bg-white/[.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-medium text-neutral-700 dark:text-white/80">SEO #1 Google</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-neutral-100/80 p-2 dark:bg-white/[.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-[8px] font-medium text-neutral-700 dark:text-white/80">Local Maps 5.0★</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-neutral-100/80 p-2 dark:bg-white/[.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span className="text-[8px] font-medium text-neutral-700 dark:text-white/80">IA & Robotique</span>
            </div>
          </div>
        </div>

        {/* Badge satellite Google Maps flottant élégant */}
        <div className="absolute -bottom-5 -right-3 sm:-right-5 z-20 w-[180px] sm:w-[210px] rounded-2xl border border-neutral-300/80 bg-white/95 p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,.3)] backdrop-blur-xl dark:border-white/20 dark:bg-[#15171b]/95">
          <div className="flex items-center gap-2">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
              <img src={XR_PHOTOS.maps} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <MapPinned className="h-3 w-3 text-red-500" />
                <span className="truncate text-[8px] font-bold text-neutral-900 dark:text-white">Google Maps Pack</span>
              </div>
              <span className="mt-0.5 block text-[7px] text-amber-500 font-semibold">5.0 ★★★★★ (Top 1)</span>
              <span className="label-mono text-[6px] text-emerald-500 font-bold">+320% d'appels</span>
            </div>
          </div>
        </div>

        {/* Badge satellite Tournage & Réseaux sociaux */}
        <div className="absolute -top-4 -left-3 sm:-left-5 z-20 flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/95 py-1.5 px-3 shadow-[0_15px_50px_-10px_rgba(0,0,0,.2)] backdrop-blur-xl dark:border-white/20 dark:bg-[#15171b]/95">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="label-mono text-[7px] font-semibold text-neutral-800 dark:text-white/90">
            STUDIO CRÉATIF · PARIS
          </span>
        </div>
      </div>
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
      <div aria-hidden className="absolute inset-0">
        <img
          src={XR_HERO_PHOTO}
          alt="XR Agency Creative Studio Paris"
          className="xr-hero-bg absolute inset-0 h-full w-full object-cover opacity-25 dark:opacity-45 filter brightness-95 contrast-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f0] via-[#f8f6f0]/85 to-[#f8f6f0]/60 dark:from-[#090a0d] dark:via-[#090a0d]/85 dark:to-[#090a0d]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f6f0]/20 to-[#f8f6f0] dark:via-transparent dark:to-[#090a0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(0,0,0,.02),transparent_26%)] dark:bg-[radial-gradient(circle_at_72%_40%,rgba(255,255,255,.08),transparent_26%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--xr-bg)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-8">
          <Parallax speed={-0.014}>
            <div className="relative z-20 max-w-3xl">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-neutral-400 dark:bg-white/40" />
                  <span className="label-mono text-[8px] tracking-[.28em] text-neutral-600 dark:text-white/55">
                    {t(UI.heroKicker)}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-serif mt-6 max-w-[860px] text-[clamp(2.8rem,5.5vw,6.5rem)] leading-[.92] tracking-[-.055em] text-neutral-900 dark:text-white">
                  {t(UI.heroTitle1)}{" "}
                  <span className="italic font-normal text-neutral-900 dark:text-white inline-block">
                    {t(UI.heroTitleAccent)}
                  </span>
                  <br />
                  <em className="not-italic text-neutral-700 dark:text-white/80">{t(UI.heroTitle2)}</em>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-neutral-600 dark:text-white/72 sm:text-lg">
                  {t(UI.heroLead)}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#audit"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-7 py-3.5 text-[9px] font-bold uppercase tracking-[.14em] text-white shadow-[0_12px_40px_-15px_rgba(0,0,0,.45)] transition duration-300 hover:-translate-y-1 hover:bg-neutral-800 dark:bg-white dark:text-black dark:shadow-[0_12px_40px_-15px_rgba(255,255,255,.4)] dark:hover:bg-neutral-100"
                  >
                    Lancer mon analyse gratuite
                    <Search className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#homepage-services"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-neutral-300/80 bg-white/70 px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[.13em] text-neutral-900 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/22 dark:bg-white/[.055] dark:text-white dark:hover:bg-white/[.10]"
                  >
                    Découvrir nos 7 expertises
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#journey"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 px-2 py-3 text-[8px] font-semibold uppercase tracking-[.14em] text-neutral-600 transition hover:text-neutral-900 dark:text-white/60 dark:hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300/80 bg-white/60 backdrop-blur dark:border-white/18 dark:bg-black/25">
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                    </span>
                    Voir comment XR vous accompagne
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
                  <span className="label-mono text-[6px] tracking-[.2em] text-neutral-500 dark:text-white/45">
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

          <Parallax speed={-0.008} className="relative z-10 h-full w-full">
            <DeviceStage />
          </Parallax>
        </div>

        <Reveal delay={460}>
          <div className="relative z-20 mt-4 flex items-center justify-between border-t border-neutral-300/70 pt-4 dark:border-white/10 sm:mt-2 sm:pt-5">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-white/45">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300/80 dark:border-white/15">
                <ArrowDown className="h-3.5 w-3.5 animate-pulse-soft" />
              </span>
              <span className="label-mono text-[6px] tracking-[.22em]">SCROLLER POUR EXPLORER</span>
            </div>
            <span className="hidden label-mono text-[6px] tracking-[.18em] text-neutral-400 dark:text-white/35 sm:block">
              XRAGENCY / DIGITAL EXPERIENCES
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
