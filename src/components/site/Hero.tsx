import { useEffect, useState } from "react";
import { ArrowRight, Bot, ChevronDown, CircleDot, Globe2, Layers3, MousePointer2, Palette, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_PHOTO } from "@/lib/photography";

function useCountUp(target: number, duration = 1200, delay = 300) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <div className="group border-l border-white/15 pl-4 first:border-l-0 first:pl-0">
      <strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong>
      <span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-white/45">{label}</span>
    </div>
  );
}

const MODULES = [
  { code: "01", name: "WEB", icon: Globe2 },
  { code: "02", name: "BRAND", icon: Palette },
  { code: "03", name: "SEARCH", icon: Search },
  { code: "04", name: "SOCIAL", icon: Layers3 },
  { code: "05", name: "WEBCARE", icon: CircleDot },
  { code: "06", name: "ROBOTICS", icon: Bot },
  { code: "07", name: "IA", icon: Sparkles },
] as const;

function SystemVisual() {
  return (
    <div className="relative h-[510px] w-full sm:h-[620px]">
      <div aria-hidden className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_65%_28%,rgba(126,151,255,.22),transparent_28%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,.08),transparent_28%)] blur-2xl" />
      <Parallax speed={0.045}>
        <div className="absolute right-0 top-[4%] h-[82%] w-[86%] overflow-hidden rounded-[2.8rem] border border-white/14 bg-[#090c12] shadow-[0_70px_180px_-80px_rgba(0,0,0,.98)]">
          <img src={XR_HERO_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.28] brightness-[.52] contrast-[1.06] transition duration-[1400ms] hover:scale-[1.03] hover:brightness-[.64]" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.78),rgba(0,0,0,.12)_46%,rgba(0,0,0,.9))]" />
          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.09)_47%,transparent_62%)]" />

          <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
            <span className="label-mono text-[7px] tracking-[.24em] text-white/40">XRAGENCY / SYSTEM DESIGN</span>
            <span className="label-mono text-[7px] text-white/32">07 MODULES</span>
          </div>

          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute h-[52%] w-[52%] rounded-full border border-white/12 animate-slow-spin" />
            <div className="absolute h-[34%] w-[34%] rounded-full border border-white/18 border-dashed" />
            <div className="absolute h-[10%] w-[10%] rounded-full border border-white/45 bg-white/[.08] shadow-[0_0_70px_rgba(255,255,255,.18)] backdrop-blur-xl" />
            <div className="relative z-10 grid h-20 w-20 place-items-center rounded-[1.7rem] border border-white/18 bg-black/45 text-white shadow-2xl backdrop-blur-2xl sm:h-24 sm:w-24">
              <span className="display-serif text-4xl tracking-[-.08em] sm:text-5xl">XR</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
            <div>
              <span className="label-mono text-[7px] tracking-[.2em] text-white/40">STRATEGY → DESIGN → ACQUISITION</span>
              <p className="display-serif mt-3 max-w-[11ch] text-3xl leading-[.88] sm:text-5xl">Tout doit fonctionner ensemble.</p>
            </div>
            <div className="hidden text-right sm:block">
              <span className="label-mono text-[7px] text-white/32">ARCHITECTURE</span>
              <div className="mt-2 h-px w-24 bg-white/24" />
              <span className="mt-2 block label-mono text-[7px] text-white/32">EXPÉRIENCE</span>
            </div>
          </div>
        </div>
      </Parallax>

      <div className="absolute left-0 top-[10%] z-20 hidden w-[24%] flex-col gap-2 sm:flex">
        {MODULES.slice(0,4).map((item, index) => {
          const Icon = item.icon;
          return (
            <Parallax key={item.code} speed={-0.018 - index * 0.004} direction="both">
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-[#080b10]/78 px-3 py-3 shadow-xl backdrop-blur-xl">
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[.04]"><Icon className="h-3.5 w-3.5 text-white/65" /></span>
                <span><span className="block label-mono text-[6px] tracking-[.18em] text-white/32">{item.code}</span><span className="text-[9px] font-semibold text-white/72">{item.name}</span></span>
              </div>
            </Parallax>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-[8%] z-20 flex max-w-[86%] items-center gap-3 rounded-[1.5rem] border border-white/14 bg-black/65 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:left-[14%] sm:px-5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black"><MousePointer2 className="h-4 w-4" /></span>
        <div>
          <span className="label-mono text-[7px] tracking-[.18em] text-white/42">UNE SEULE LOGIQUE</span>
          <p className="mt-0.5 text-[10px] text-white/72">Chaque brique renforce la suivante.</p>
        </div>
      </div>

      <div className="absolute right-[2%] top-[13%] z-20 w-[31%] rounded-[1.7rem] border border-white/14 bg-white/[.06] p-4 shadow-2xl backdrop-blur-2xl sm:right-[3%] sm:w-[28%] sm:p-5">
        <div className="flex items-center justify-between"><span className="label-mono text-[7px] text-white/34">XR / DIRECTION</span><Sparkles className="h-3.5 w-3.5 text-white/60" /></div>
        <p className="mt-7 text-sm leading-5 text-white/75">Un dispositif construit autour de votre activité, pas autour d'un catalogue.</p>
        <div className="mt-5 flex gap-1.5">{[0,1,2,3,4].map(i => <span key={i} className="h-1.5 flex-1 rounded-full bg-white/12"><span className={i < 3 ? "block h-full w-full rounded-full bg-white/42" : "block h-full w-1/2 rounded-full bg-white/20"} /></span>)}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#05070b] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-25%] h-[70vw] w-[70vw] rounded-full bg-indigo-400/[.06] blur-[140px]" />
        <div className="absolute bottom-[-35%] right-[-15%] h-[60vw] w-[60vw] rounded-full bg-white/[.035] blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.18)_65%,rgba(0,0,0,.4)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-32">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <Parallax speed={-0.028}>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-white/50" />
                <span className="label-mono text-[9px] font-semibold tracking-[.28em] text-white/60">{t(UI.heroKicker)}</span>
              </div>

              <h1 className="display-serif mt-7 max-w-4xl text-[clamp(3.3rem,6.4vw,7.2rem)] leading-[.83] tracking-[-.065em]">
                {t(UI.heroTitle1)}
                <br />
                <span className="text-white">{t(UI.heroTitleAccent)}</span>{" "}
                <em className="text-white/38 not-italic">{t(UI.heroTitle2)}</em>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">{t(UI.heroLead)}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <EmberButton href="#quote" className="justify-center rounded-full bg-white px-7 py-4 text-[#080a0d] shadow-[0_18px_55px_rgba(0,0,0,.25)] hover:bg-white">
                  Construire mon projet <ArrowRight className="h-4 w-4" />
                </EmberButton>
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[.03] px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/68 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[.06] hover:text-white">
                  <Search className="h-3.5 w-3.5" />Lancer mon audit
                </a>
              </div>

              <div className="mt-11 grid max-w-2xl grid-cols-3 gap-5 border-y border-white/12 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} suffix="+" label={t(UI.statYears)} />
                <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label-mono text-[8px] tracking-[.18em] text-white/38">WEB · BRAND · SEO · LOCAL · SOCIAL · IA</span>
                <span className="h-px w-8 bg-white/20" />
                <div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </div>
          </Parallax>

          <SystemVisual />
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-white/[.018]">
        <div className="flex min-w-max animate-marquee items-center gap-10 py-4 label-mono text-[9px] tracking-[.28em] text-white/38">
          {Array.from({ length: 2 }).flatMap((_, row) =>
            ["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE","ROBOTICS"].map((x, i) => (
              <span key={row + "-" + i} className="inline-flex items-center gap-10">
                <span>{x}</span><span className="text-white/22">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 opacity-35 lg:flex">
        <ChevronDown className="h-3.5 w-3.5 animate-pulse-soft" />
        <span className="label-mono text-[7px] tracking-[.3em]">SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
