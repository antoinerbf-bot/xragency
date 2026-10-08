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
    <div className="relative mx-auto h-full min-h-[520px] w-full max-w-[760px] sm:min-h-[640px] lg:min-h-[700px]">
      <div aria-hidden className="xr-hero-orbit xr-hero-orbit-a border-neutral-400/25 dark:border-white/12" />
      <div aria-hidden className="xr-hero-orbit xr-hero-orbit-b border-neutral-400/25 dark:border-white/12" />

      <Parallax speed={-0.014} direction="both" className="absolute inset-x-0 top-[8%]">
        <div className="relative mx-auto w-[86%] max-w-[650px] [transform:perspective(1400px)_rotateY(-7deg)_rotateX(2deg)] transition-transform duration-700 hover:[transform:perspective(1400px)_rotateY(-2deg)_rotateX(0deg)]">
          <div className="overflow-hidden rounded-[1.4rem] border border-neutral-300/70 bg-white/90 p-2 shadow-[0_35px_100px_-35px_rgba(0,0,0,.25)] backdrop-blur-xl dark:border-white/15 dark:bg-[#121212]/90 dark:shadow-[0_35px_120px_-45px_rgba(0,0,0,.95)] sm:rounded-[1.8rem] sm:p-2.5">
            <div className="relative overflow-hidden rounded-[1rem] bg-neutral-950 sm:rounded-[1.35rem]">
              <img
                src={XR_PHOTOS.websites}
                alt="Aperçu d'un site web XR Agency"
                className="aspect-[16/10] w-full object-cover object-center transition duration-1000 hover:scale-[1.03]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-xl">
                <span className="label-mono text-[6px] tracking-[.2em] text-white/80">WEB EXPERIENCE</span>
                <span className="text-[7px] text-white/60">01 / 07</span>
              </div>
            </div>
          </div>
          <div aria-hidden className="mx-auto mt-1 h-1.5 w-[60%] rounded-full bg-neutral-300/60 dark:bg-white/15" />
        </div>
      </Parallax>

      <Parallax speed={0.018} direction="both" className="absolute right-[1%] top-[42%] w-[27%] min-w-[135px] max-w-[190px]">
        <div className="overflow-hidden rounded-[1.35rem] border border-neutral-300/70 bg-white/95 p-2 shadow-[0_28px_80px_-25px_rgba(0,0,0,.2)] backdrop-blur-xl dark:border-white/15 dark:bg-black/80 dark:shadow-[0_28px_90px_-35px_rgba(0,0,0,.95)] [transform:perspective(900px)_rotateY(-14deg)_rotateX(4deg)_rotateZ(3deg)]">
          <div className="relative overflow-hidden rounded-[.95rem] border border-neutral-200 dark:border-white/10">
            <img
              src={XR_PHOTOS.maps}
              alt="Aperçu Google Maps"
              className="aspect-[9/16] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-2 bottom-2 rounded-lg border border-white/20 bg-black/65 px-2 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-white">
                <MapPinned className="h-3 w-3" />
                <span className="text-[7px] font-semibold">Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </Parallax>

      <Parallax speed={-0.022} direction="x" className="absolute left-[0%] top-[51%] w-[24%] min-w-[125px] max-w-[180px]">
        <div className="rounded-[1.25rem] border border-neutral-300/70 bg-white/95 p-3 shadow-[0_25px_70px_-25px_rgba(0,0,0,.2)] backdrop-blur-xl dark:border-white/12 dark:bg-[#111]/78 dark:shadow-[0_25px_80px_-30px_rgba(0,0,0,.92)]">
          <div className="flex items-center justify-between">
            <span className="label-mono text-[6px] tracking-[.18em] text-neutral-500 dark:text-white/45">SOCIAL</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.7)]" />
          </div>
          <img
            src={XR_PHOTOS.social}
            alt="Aperçu des réseaux sociaux"
            className="mt-2 aspect-[4/3] w-full rounded-lg object-cover opacity-90"
            loading="lazy"
          />
        </div>
      </Parallax>

      <Parallax speed={0.026} direction="both" className="absolute bottom-[7%] left-[10%] w-[24%] min-w-[130px] max-w-[190px]">
        <div className="rounded-[1.3rem] border border-neutral-300/70 bg-white/95 p-3 shadow-[0_24px_70px_-25px_rgba(0,0,0,.2)] backdrop-blur-xl dark:border-white/12 dark:bg-[#101010]/82 dark:shadow-[0_24px_80px_-30px_rgba(0,0,0,.9)]">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-neutral-900 dark:text-white/90" />
            <div>
              <span className="label-mono block text-[6px] tracking-[.16em] text-neutral-500 dark:text-white/45">IA & ROBOTIQUE</span>
              <span className="mt-0.5 block text-[8px] font-semibold text-neutral-800 dark:text-white/85">Automation</span>
            </div>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-900 dark:border-white/10 dark:bg-black">
            <img
              src={XR_PHOTOS.robotics}
              alt="Aperçu robotique"
              className="aspect-[4/3] w-full object-contain object-center"
              loading="lazy"
            />
          </div>
        </div>
      </Parallax>

      <Parallax speed={-0.012} className="absolute right-[27%] bottom-[3%]">
        <div className="rounded-full border border-neutral-300/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-white/12 dark:bg-black/45">
          <span className="label-mono text-[6px] tracking-[.17em] text-neutral-600 dark:text-white/55">07 EXPERTISES · 1 ÉCOSYSTÈME</span>
        </div>
      </Parallax>

      <div className="absolute right-[18%] top-[32%] hidden sm:block">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-neutral-300/70 bg-white/80 text-neutral-900 shadow-md backdrop-blur-xl dark:border-white/20 dark:bg-black/45 dark:text-white">
          <Sparkles className="h-4 w-4 text-neutral-800 dark:text-white/90" />
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
          className="xr-hero-bg absolute inset-0 h-full w-full object-cover opacity-35 dark:opacity-55 filter brightness-95 contrast-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f0] via-[#f8f6f0]/75 to-transparent dark:from-[#090a0d] dark:via-[#090a0d]/70 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f6f0]/20 to-[#f8f6f0] dark:via-transparent dark:to-[#090a0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(0,0,0,.02),transparent_26%)] dark:bg-[radial-gradient(circle_at_72%_40%,rgba(255,255,255,.08),transparent_26%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--xr-bg)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-4">
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
                <h1 className="display-serif mt-6 max-w-[860px] text-[clamp(3.35rem,6.7vw,7.4rem)] leading-[.82] tracking-[-.075em] text-neutral-900 dark:text-white">
                  {t(UI.heroTitle1)}{" "}
                  <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent italic font-normal dark:from-white dark:via-white/90 dark:to-white/70">
                    {t(UI.heroTitleAccent)}
                  </span>
                  <br />
                  <em className="not-italic text-neutral-700 dark:text-white/72">{t(UI.heroTitle2)}</em>
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

          <Parallax speed={-0.008} className="relative z-10 h-full min-h-[520px] lg:min-h-[700px]">
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
