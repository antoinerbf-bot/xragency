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

function HeroFeaturesOverview() {
  const { t } = useLang();
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[620px] flex-col justify-center py-6 lg:py-0">
      {/* Halo d'ambiance raffiné */}
      <div aria-hidden className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-3xl" />

      {/* Cartes d'impact en verre dépoli ultra-élégantes & aériennes */}
      <div className="relative space-y-4">
        {/* Carte 1 : Excellence Web & Performance */}
        <div className="group rounded-[1.8rem] border border-neutral-300/80 bg-white/80 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,.08)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 dark:border-white/12 dark:bg-[#121316]/75 dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,.7)] sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="label-mono text-[7px] tracking-[.2em] text-neutral-500 dark:text-white/50">
                HAUTE CRÉATION DIGITALE
              </span>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500">
              PARIS · SUR-MESURE
            </span>
          </div>

          <h3 className="display-serif mt-3 text-2xl text-neutral-900 dark:text-white sm:text-3xl">
            L'Alliance de l'Édition & de la Technologie
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-white/65">
            Architecture sur-mesure, identités de marque remarquables, acquisition Google Maps Top 1 et déploiement d'intelligences artificielles opérationnelles.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2.5 border-t border-neutral-200/80 pt-4 dark:border-white/10 text-center">
            <div className="rounded-xl bg-neutral-100/70 p-2.5 dark:bg-white/[.04]">
              <span className="display-serif block text-lg font-bold text-neutral-900 dark:text-white">&lt; 0.4s</span>
              <span className="label-mono text-[6px] text-neutral-500 dark:text-white/45">CHARGEMENT</span>
            </div>
            <div className="rounded-xl bg-neutral-100/70 p-2.5 dark:bg-white/[.04]">
              <span className="display-serif block text-lg font-bold text-emerald-500">#1</span>
              <span className="label-mono text-[6px] text-neutral-500 dark:text-white/45">GOOGLE MAPS</span>
            </div>
            <div className="rounded-xl bg-neutral-100/70 p-2.5 dark:bg-white/[.04]">
              <span className="display-serif block text-lg font-bold text-neutral-900 dark:text-white">100%</span>
              <span className="label-mono text-[6px] text-neutral-500 dark:text-white/45">SUR-MESURE</span>
            </div>
          </div>
        </div>

        {/* Carte 2 : Badge direct Local Pack Top 3 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-neutral-300/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#121316]/60">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/10 text-red-500">
              <MapPinned className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">Google Maps Local Pack Top 3</p>
              <p className="text-[9px] text-neutral-500 dark:text-white/50">Engagement contractuel avec garantie « Top 3 ou remboursé »</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 label-mono text-[7px] font-bold text-emerald-500 self-start sm:self-center">
            DÈS 990 € / AN
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
          className="xr-hero-bg absolute inset-0 h-full w-full object-cover opacity-35 dark:opacity-55 filter brightness-100 contrast-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f0]/95 via-[#f8f6f0]/80 to-[#f8f6f0]/40 dark:from-[#090a0d]/95 dark:via-[#090a0d]/80 dark:to-[#090a0d]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f6f0] dark:to-[#090a0d]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--xr-bg)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
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
                <h1 className="display-serif mt-6 max-w-[860px] text-[clamp(2.8rem,5.5vw,6.5rem)] leading-[.92] tracking-[-.055em] text-neutral-900 dark:text-white break-words">
                  <span className="inline-block whitespace-nowrap">{t(UI.heroTitle1)}</span>{" "}
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
            <HeroFeaturesOverview />
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
