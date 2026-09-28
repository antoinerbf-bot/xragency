import { useEffect, useState } from "react";
import { ArrowRight, FileImage, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_POSTER, XR_HERO_VIDEO } from "@/lib/photography";

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
    <div className="border-l border-white/20 pl-4 first:border-l-0 first:pl-0">
      <strong className="display-serif text-2xl text-white sm:text-3xl">{count}{suffix}</strong>
      <span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-white/55">{label}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const [videoReady, setVideoReady] = useState(false);
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-[#08090b] text-white [color-scheme:dark]">
      <div className="absolute inset-0 -z-10 bg-[#08090b]" aria-hidden="true">
        <img
          src={XR_HERO_POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[1.04] saturate-[.8]"
        />
        <video
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[1.04] saturate-[.82] transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={XR_HERO_POSTER}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          aria-hidden="true"
        >
          <source src={XR_HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#08090b]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(214,164,93,.28),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,11,.94)_0%,rgba(8,9,11,.76)_38%,rgba(8,9,11,.34)_72%,rgba(8,9,11,.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,.60)_0%,transparent_28%,transparent_68%,rgba(8,9,11,.88)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <Parallax speed={-0.015} className="w-full">
          <div className="max-w-[920px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
              <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-primary">{t(UI.heroKicker)}</span>
            </div>

            <h1 className="display-serif mt-7 max-w-4xl text-[clamp(3.35rem,8vw,8.2rem)] leading-[.82] tracking-[-.06em] text-white">
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{t(UI.heroLead)}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <EmberButton href="#quote" className="justify-center rounded-full px-7 py-4 shadow-[0_15px_50px_rgba(214,164,93,.22)]">
                {t(UI.heroCtaProject)} <ArrowRight className="h-4 w-4" />
              </EmberButton>

              <a href="#audit" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.08] px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/[.12]">
                <Search className="h-3.5 w-3.5 text-primary" /> {t(UI.ctaAnalysis)}
              </a>

              <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-primary/45 bg-primary/[.10] px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-primary backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/[.16]">
                <FileImage className="h-3.5 w-3.5" /> {t(UI.heroCtaMockup)}
              </a>
            </div>

            <p className="mt-7 max-w-2xl text-[11px] leading-5 text-white/58 sm:text-xs">{t(UI.heroProofLine)}</p>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-5 border-y border-white/15 py-5">
              <Stat value={500} suffix="+" label={t(UI.statProjects)} />
              <Stat value={8} label={t(UI.statYears)} />
              <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/55">
              <span className="label-mono text-[8px] tracking-[.18em]">{t(UI.heroServicesLine)}</span>
              <span className="h-px w-10 bg-white/25" />
              <span className="label-mono text-[8px] tracking-[.18em]">{t(UI.heroMeta)}</span>
            </div>
          </div>
        </Parallax>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-3 opacity-45 lg:flex" aria-hidden="true">
        <span className="label-mono text-[8px] tracking-[.2em]">XR / MMXXVI</span>
        <span className="h-px w-14 bg-white/40" />
      </div>
    </section>
  );
}
