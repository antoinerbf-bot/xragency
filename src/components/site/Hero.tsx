import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Search,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
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
          className="xr-hero-bg absolute inset-0 h-full w-full object-cover object-[54%_center] opacity-100 brightness-[1.02] contrast-[1.06] dark:opacity-100 dark:brightness-[0.88] dark:contrast-[1.08] sm:object-center"
          fetchPriority="high"
        />
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={XR_HERO_PHOTO}
          className="xr-hero-video absolute inset-0 h-full w-full object-cover object-center"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        >
          <source src="/__l5e/assets-v1/22bc4b57-f585-4301-9b43-db26f682e9a7/hero-studio.mp4" type="video/mp4" />
        </video>
        {/* Voiles légers : conserver le contraste du texte sans blanchir la photo ni masquer la Tour Eiffel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f0]/20 via-[#f8f6f0]/5 to-[#f8f6f0]/48 dark:from-[#090a0d]/24 dark:via-[#090a0d]/8 dark:to-[#090a0d]/58" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,246,240,0.36)_0%,rgba(248,246,240,0.14)_34%,transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(9,10,13,0.48)_0%,rgba(9,10,13,0.20)_38%,transparent_74%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f8f6f0]/70 to-transparent dark:from-[#090a0d]/75" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col justify-between px-5 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="flex flex-1 items-end justify-center pb-8 pt-20 sm:pb-12 sm:pt-28">
          <Parallax speed={-0.008} className="w-full">
            <div className="relative z-20 mx-auto max-w-4xl py-2 text-center sm:py-4">
              <Reveal>
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-emerald-600/80 dark:bg-emerald-400/80" />
                  <span className="label-mono text-[8px] tracking-[.28em] text-neutral-700 dark:text-white/75">
                    {t(UI.heroKicker)}
                  </span>
                  <span className="h-px w-8 bg-emerald-600/80 dark:bg-emerald-400/80" />
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-serif mx-auto mt-5 max-w-[950px] text-[clamp(2.35rem,6.2vw,6.2rem)] leading-[.98] tracking-[-.055em] text-neutral-950 dark:text-white break-words [text-shadow:0_2px_22px_rgba(248,246,240,.72)] dark:[text-shadow:0_3px_28px_rgba(0,0,0,.68)]">
                  <span className="inline-block">{t(UI.heroTitle1)}</span>{" "}
                  <span className="italic font-normal text-neutral-900 dark:text-white inline-block">
                    {t(UI.heroTitleAccent)}
                  </span>
                  <br />
                  <em className="not-italic text-neutral-800 dark:text-white/90">{t(UI.heroTitle2)}</em>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="mx-auto mt-5 max-w-xl text-[14px] leading-6 text-neutral-800 dark:text-white/90 sm:mt-6 sm:text-base sm:leading-7">
                  {t(UI.heroLead)}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mx-auto mt-7 flex w-full max-w-4xl flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <a
                    href="#quote"
                    className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-emerald-500/70 bg-emerald-600 px-7 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-white shadow-[0_12px_32px_-12px_rgba(5,150,105,.62)] transition duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-[0_16px_40px_-12px_rgba(5,150,105,.72)] dark:border-emerald-300/50 dark:bg-emerald-400 dark:text-neutral-950 dark:shadow-[0_12px_32px_-12px_rgba(52,211,153,.38)] dark:hover:bg-emerald-300 sm:w-auto sm:min-w-[280px]"
                  >
                    {t(UI.heroCtaMockup)}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#quote"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-neutral-900/20 bg-white/75 px-5 py-3 text-[9px] font-semibold uppercase tracking-[.12em] text-neutral-900 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/30 dark:bg-black/45 dark:text-white dark:hover:bg-black/60"
                  >
                    {t(UI.heroCtaAnalyze)}
                    <Search className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#audit"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-900/20 bg-white/55 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[.12em] text-neutral-800 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/90 dark:border-white/25 dark:bg-black/20 dark:text-white dark:hover:bg-black/40"
                  >
                    {t(UI.heroCtaAudit)}
                  </a>
                  <a
                    href="#homepage-services"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-900/15 bg-white/40 px-5 py-3.5 text-[8.5px] font-semibold uppercase tracking-[.12em] text-neutral-700 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/80 dark:border-white/20 dark:bg-black/15 dark:text-white/85 dark:hover:bg-black/35"
                  >
                    {t(UI.heroCtaExpertises)}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={290}>
                <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-5 border-y border-neutral-300/60 bg-white/20 py-4 backdrop-blur-[2px] dark:border-white/20 dark:bg-black/10 sm:mt-8 sm:gap-8 sm:py-5">
                  <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                  <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
                  <Stat value={8} suffix="+" label={t(UI.statYears)} />
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <span className="label-mono text-[7px] tracking-[.2em] text-neutral-600 dark:text-white/65">
                    WEB · BRAND · SEO · LOCAL · SOCIAL · WEBCARE · ROBOTIQUE
                  </span>
                </div>
              </Reveal>
            </div>
          </Parallax>
        </div>

        <Reveal delay={460}>
          <div className="relative z-20 mt-4 flex items-center justify-between border-t border-neutral-300/50 pt-4 dark:border-white/15 sm:mt-2 sm:pt-5">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-white/50">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300/80 dark:border-white/15">
                <ArrowDown className="h-3.5 w-3.5 animate-pulse-soft" />
              </span>
              <span className="label-mono text-[6px] tracking-[.22em]">{t(UI.heroScrollNotice)}</span>
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
