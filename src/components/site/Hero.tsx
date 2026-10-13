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
          className="xr-hero-video absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        >
          <source src="https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Voiles légers : conserver le contraste du texte sans blanchir la photo ni masquer la Tour Eiffel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f0]/20 via-[#f8f6f0]/5 to-[#f8f6f0]/48 dark:from-[#090a0d]/24 dark:via-[#090a0d]/8 dark:to-[#090a0d]/58" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,246,240,0.36)_0%,rgba(248,246,240,0.14)_34%,transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(9,10,13,0.48)_0%,rgba(9,10,13,0.20)_38%,transparent_74%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f8f6f0]/70 to-transparent dark:from-[#090a0d]/75" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#08090b]/85 via-[#08090b]/55 to-[#08090b]/10 dark:from-[#050608]/88 dark:via-[#050608]/55 dark:to-[#050608]/15" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#08090b]/75 via-transparent to-[#08090b]/15" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1640px] flex-col justify-between px-5 pb-6 pt-28 sm:px-8 sm:pb-9 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-9 py-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 xl:gap-16">
          <div className="relative z-10 min-w-0 max-w-4xl">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-emerald-400" />
                <span className="label-mono text-[8px] tracking-[.25em] text-white/80 sm:text-[9px]">{t(UI.heroKicker)}</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 label-mono text-[7px] tracking-[.12em] text-white/85 backdrop-blur-md">STUDIO DIGITAL · INTERNATIONAL</span>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="display-serif max-w-[900px] break-words text-left text-[clamp(3.15rem,7.3vw,7.5rem)] leading-[.91] tracking-[-.065em] text-white [text-shadow:0_4px_34px_rgba(0,0,0,.35)]">
                <span>{t(UI.heroTitle1)} </span><em className="font-normal text-white/75">{t(UI.heroTitleAccent)}</em>
                <br />
                <span className="relative inline-block pb-2">
                  {t(UI.heroTitle2)}
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-[68%] origin-left animate-film-pulse bg-emerald-400/90" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-left text-sm leading-6 text-white/85 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg">
                {t(UI.heroLead)}
              </p>
            </Reveal>
            <Reveal delay={230}>
              <div className="mt-7 flex max-w-2xl flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#quote" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-emerald-400 px-7 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#07110d] shadow-[0_14px_44px_-14px_rgba(52,211,153,.75)] transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 sm:min-w-[250px]">
                  {t(UI.heroCtaMockup)} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="#audit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-black/20 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[.13em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">
                  {t(UI.heroCtaAudit)} <Search className="h-3.5 w-3.5" />
                </a>
                <a href="#homepage-services" className="inline-flex min-h-12 items-center justify-center gap-2 self-start px-2 py-3 text-[9px] font-semibold uppercase tracking-[.13em] text-white/75 transition hover:text-white">
                  Explorer les expertises <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/25 pt-5 sm:mt-10 sm:gap-7 sm:pt-6">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
                <Stat value={8} suffix="+" label={t(UI.statYears)} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
              <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-emerald-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/25 bg-[#101216]/70 p-3 shadow-[0_35px_120px_-35px_rgba(0,0,0,.8)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-4">
                <div className="flex items-center justify-between border-b border-white/15 px-2 pb-3 sm:px-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b66]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" /><span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                    <span className="ml-2 label-mono text-[7px] tracking-[.15em] text-white/55 sm:text-[8px]">XR CREATIVE STUDIO / LIVE</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 label-mono text-[6px] text-emerald-200 sm:text-[7px]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> EN CRÉATION</span>
                </div>
                <div className="grid gap-3 p-2 pt-3 sm:grid-cols-[.72fr_1.28fr] sm:gap-4 sm:p-3">
                  <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[.04] p-3 sm:p-4">
                    <div>
                      <span className="label-mono text-[6px] tracking-[.16em] text-emerald-200/80">01 / DIRECTION</span>
                      <p className="mt-2 display-serif text-xl leading-tight text-white sm:text-2xl">Une idée.<br />Un univers.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] rounded-full bg-emerald-300 animate-pulse" /></div>
                      <div className="h-1.5 w-[72%] rounded-full bg-white/15" />
                      <div className="h-1.5 w-[55%] rounded-full bg-white/10" />
                      <span className="block pt-1 label-mono text-[6px] text-white/45">IDENTITÉ · UX · STRATÉGIE</span>
                    </div>
                  </div>
                  <div className="relative min-h-[150px] overflow-hidden rounded-xl border border-white/15 bg-[#e9e7df] p-3 text-[#15171b] sm:min-h-[235px] sm:p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(52,211,153,.38),transparent_35%),linear-gradient(145deg,#f8f7f2,#d9dedb)]" />
                    <div className="relative flex items-center justify-between border-b border-black/10 pb-3">
                      <span className="text-[9px] font-black tracking-[.16em]">YOUR BRAND.</span>
                      <span className="text-[7px] uppercase tracking-[.14em] opacity-55">Digital experience</span>
                    </div>
                    <div className="relative grid h-[112px] grid-cols-[1fr_.72fr] items-center gap-2 sm:h-[170px]">
                      <div>
                        <span className="text-[6px] font-semibold uppercase tracking-[.2em] text-emerald-800">Made to stand out</span>
                        <p className="mt-2 display-serif text-[clamp(1.35rem,3vw,2.7rem)] leading-[.94] tracking-[-.06em]">Make<br />it matter.</p>
                        <div className="mt-3 inline-flex rounded-full bg-[#15171b] px-3 py-2 text-[6px] font-bold uppercase tracking-[.12em] text-white">Discover more ↗</div>
                      </div>
                      <div className="relative h-[82%] overflow-hidden rounded-lg bg-[#c5d5cc]">
                        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.15),transparent_55%),radial-gradient(ellipse_at_50%_20%,#f1e4d4,#a5bcb0_70%)]" />
                        <div className="absolute inset-x-[15%] bottom-0 top-[18%] rounded-t-full border border-white/35 bg-[linear-gradient(120deg,rgba(255,255,255,.65),rgba(20,40,32,.12))]" />
                        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[#263d34]/15" />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-full w-1/3 -translate-x-full animate-xr-scan bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/15 px-2 pt-3 sm:px-3">
                  <span className="label-mono text-[6px] tracking-[.14em] text-white/50 sm:text-[7px]">DESIGN · WEB · ACQUISITION · IA</span>
                  <span className="label-mono text-[6px] tracking-[.12em] text-emerald-200 sm:text-[7px]">EN MOUVEMENT ↗</span>
                </div>
              </div>
              <div className="absolute -left-2 top-[18%] hidden animate-xr-drift rounded-2xl border border-white/25 bg-[#111318]/85 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:block lg:-left-8">
                <span className="label-mono text-[6px] text-white/45">EN DIRECT</span><p className="mt-1 text-xs font-semibold">Votre prochaine idée prend forme.</p>
              </div>
              <div className="absolute -right-2 bottom-[9%] hidden animate-xr-drift rounded-2xl border border-emerald-200/35 bg-emerald-300 px-4 py-3 text-[#07110d] shadow-xl sm:block lg:-right-5">
                <span className="label-mono text-[6px]">PROCHAIN OBJECTIF</span><p className="mt-1 text-xs font-bold">Plus de visibilité. Plus de clients.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={390}>
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <div className="flex items-center gap-3 text-white/65">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25"><ArrowDown className="h-3.5 w-3.5 animate-pulse-soft" /></span>
              <span className="label-mono text-[6px] tracking-[.22em]">SCROLL POUR EXPLORER · XRAGENCY</span>
            </div>
            <span className="hidden label-mono text-[6px] tracking-[.18em] text-white/40 sm:block">DES IDÉES AU RÉSULTAT / 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
