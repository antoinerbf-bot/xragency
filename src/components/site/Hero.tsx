import { useEffect, useState } from "react";
import { ArrowRight, FileImage, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_PHOTO, XR_HERO_VIDEO } from "@/lib/photography";

function useCountUp(target: number, duration = 1400, delay = 450) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const count = useCountUp(value);
  return (
    <div className="border-l border-current/15 pl-4 first:border-l-0 first:pl-0">
      <strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong>
      <span className="mt-1 block label-mono text-[8px] tracking-[.12em] opacity-55">{label}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#f5f1e9] text-[#151515] dark:bg-[#070708] dark:text-white"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <video
          className="h-full w-full object-cover object-center opacity-[.18] saturate-[.72] dark:opacity-[.42] dark:saturate-100"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={XR_HERO_PHOTO}
        >
          <source src={XR_HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#f5f1e9]/[.78] dark:bg-[#070708]/[.48]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(214,164,93,.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_72%_35%,rgba(214,164,93,.24),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,241,233,.96)_0%,rgba(245,241,233,.78)_42%,rgba(245,241,233,.30)_72%,rgba(245,241,233,.10)_100%)] dark:bg-[linear-gradient(90deg,rgba(7,7,8,.92)_0%,rgba(7,7,8,.66)_42%,rgba(7,7,8,.28)_72%,rgba(7,7,8,.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f5f1e9] to-transparent dark:from-[#070708]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <Parallax speed={-0.015} className="w-full">
          <div className="max-w-[920px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-current/15 bg-white/35 px-3.5 py-2 backdrop-blur-md dark:bg-black/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
              <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-primary">{t(UI.heroKicker)}</span>
            </div>

            <h1 className="display-serif mt-7 max-w-4xl text-[clamp(3.55rem,8vw,8.2rem)] leading-[.82] tracking-[-.06em]">
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-current/68 sm:text-lg sm:leading-8">
              {t(UI.heroLead)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <EmberButton href="#quote" className="justify-center rounded-full px-7 py-4 shadow-[0_15px_50px_rgba(214,164,93,.18)]">
                {t(UI.heroCtaProject)}
                <ArrowRight className="h-4 w-4" />
              </EmberButton>

              <a
                href="#audit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-current/15 bg-white/35 px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/50 dark:bg-white/[.06]"
              >
                <Search className="h-3.5 w-3.5 text-primary" />
                {t(UI.ctaAnalysis)}
              </a>

              <a
                href={mockupUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary/[.06] px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-primary backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/10"
              >
                <FileImage className="h-3.5 w-3.5" />
                {t(UI.heroCtaMockup)}
              </a>
            </div>

            <p className="mt-7 max-w-2xl text-[11px] leading-5 opacity-55 sm:text-xs">
              {t(UI.heroProofLine)}
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-5 border-y border-current/15 py-5">
              <Stat value={500} suffix="+" label={t(UI.statProjects)} />
              <Stat value={8} label={t(UI.statYears)} />
              <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 opacity-60">
              <span className="label-mono text-[8px] tracking-[.18em]">{t(UI.heroServicesLine)}</span>
              <span className="h-px w-10 bg-current/25" />
              <span className="label-mono text-[8px] tracking-[.18em]">{t(UI.heroMeta)}</span>
            </div>
          </div>
        </Parallax>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-3 opacity-45 lg:flex" aria-hidden="true">
        <span className="label-mono text-[8px] tracking-[.2em]">XR / MMXXVI</span>
        <span className="h-px w-14 bg-current/40" />
      </div>
    </section>
  );
}
