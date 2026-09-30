import { useEffect, useState } from "react";
import { ArrowRight, MousePointer2, Search } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax } from "./primitives";
import { XR_PHOTOS } from "@/lib/photography";

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
    <div className="border-l border-white/15 pl-4 first:border-l-0 first:pl-0">
      <strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong>
      <span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-white/45">{label}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#050608] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-30%] h-[70vw] w-[70vw] rounded-full bg-white/[.035] blur-[140px]" />
        <div className="absolute bottom-[-35%] right-[-15%] h-[60vw] w-[60vw] rounded-full bg-slate-500/[.055] blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.025)_45%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-32">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <Parallax speed={-0.022}>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-white/55" />
                <span className="label-mono text-[9px] font-semibold tracking-[.28em] text-white/60">{t(UI.heroKicker)}</span>
              </div>

              <h1 className="display-serif mt-7 max-w-5xl text-[clamp(3.7rem,7.5vw,8.2rem)] leading-[.8] tracking-[-.07em]">
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
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-transparent px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/65 transition hover:-translate-y-0.5 hover:border-white/25 hover:text-white">
                  <Search className="h-3.5 w-3.5" />Lancer mon audit
                </a>
              </div>

              <div className="mt-11 grid max-w-2xl grid-cols-3 gap-5 border-y border-white/12 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} label={t(UI.statYears)} />
                <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label-mono text-[8px] tracking-[.18em] text-white/38">WEB · BRAND · SEO · LOCAL · SOCIAL · IA</span>
                <span className="h-px w-8 bg-white/20" />
                <div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </div>
          </Parallax>

          <Parallax speed={0.025}>
            <div className="relative mx-auto w-full max-w-[900px]">
              <div className="absolute -inset-16 rounded-full bg-white/[.025] blur-[90px]" />
              <div className="relative grid grid-cols-12 gap-2 sm:gap-3">
                <div className="relative col-span-8 row-span-2 min-h-[540px] overflow-hidden rounded-[2.2rem] border border-white/12 bg-[#090c10] shadow-[0_60px_140px_-60px_rgba(0,0,0,.98)]">
                  <img src={XR_PHOTOS.websites} alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] brightness-[.68] transition duration-[1600ms] hover:scale-[1.06] hover:brightness-[.82]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,.58),transparent_55%,rgba(0,0,0,.25))]" />
                  <span className="absolute left-5 top-5 label-mono text-[7px] tracking-[.25em] text-white/55">01 / WEB EXPERIENCE</span>
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/12 bg-black/60 p-5 backdrop-blur-xl">
                    <span className="label-mono text-[7px] tracking-[.22em] text-white/38">STRATEGY → DESIGN → CONVERSION</span>
                    <p className="display-serif mt-3 text-3xl leading-[.88] sm:text-5xl">Des expériences qui donnent envie d'agir.</p>
                  </div>
                </div>

                <div className="relative col-span-4 min-h-[265px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#090c10]">
                  <img src={XR_PHOTOS.branding} alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] brightness-[.62] transition duration-[1400ms] hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <span className="absolute bottom-4 left-4 label-mono text-[7px] tracking-[.2em] text-white/55">02 / BRAND</span>
                </div>

                <div className="relative col-span-4 min-h-[265px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#090c10]">
                  <img src={XR_PHOTOS.maps} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.1] contrast-[1.05] brightness-[.65] transition duration-[1400ms] hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <span className="absolute bottom-4 left-4 label-mono text-[7px] tracking-[.2em] text-white/55">03 / LOCAL VISIBILITY</span>
                </div>
              </div>

              <div className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-[#090b0e]/92 px-4 py-2 shadow-lg backdrop-blur-xl sm:flex">
                <MousePointer2 className="h-3 w-3 text-white/60" />
                <span className="label-mono text-[8px] text-white/58">WEB · BRAND · SEO · MAPS · SOCIAL · IA</span>
              </div>
              <div className="absolute -bottom-5 left-4 hidden rounded-2xl border border-white/12 bg-[#090b0e]/92 px-4 py-3 shadow-xl backdrop-blur-xl lg:block">
                <span className="label-mono text-[7px] tracking-[.18em] text-white/42">XRAGENCY / DIGITAL SYSTEM</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-white/[.02]">
        <div className="flex min-w-max animate-marquee items-center gap-10 py-4 label-mono text-[9px] tracking-[.28em] text-white/38">
          {Array.from({ length: 2 }).flatMap((_, row) =>
            ["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE"].map((x, i) => (
              <span key={row + "-" + i} className="inline-flex items-center gap-10">
                <span>{x}</span><span className="text-white/25">✦</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
