import { useEffect, useState } from "react";
import { ArrowRight, MousePointer2, Search } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax } from "./primitives";

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
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[.045] px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/55 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[.08] hover:text-white">
                  Demander une maquette gratuite <ArrowRight className="h-3.5 w-3.5" />
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
            <div className="relative mx-auto h-[540px] w-full max-w-[920px] sm:h-[660px]">
              <div className="absolute -inset-10 rounded-full bg-white/[.025] blur-[100px]" />

              <div className="absolute left-0 top-10 h-[78%] w-[72%] overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#080b0f] shadow-[0_60px_150px_-70px_rgba(0,0,0,.98)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.12),transparent_23%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,.055),transparent_28%),linear-gradient(145deg,#11161b,#080a0d_62%,#10151a)]" />
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.08)_47%,transparent_62%)]" />

                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <span className="label-mono text-[7px] tracking-[.22em] text-white/38">XRAGENCY / CREATIVE SYSTEM</span>
                  <span className="label-mono text-[7px] text-white/30">01 — 06</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute h-[62%] w-[62%] rounded-full border border-white/[.06]" />
                  <div className="absolute h-[46%] w-[46%] rounded-full border border-white/[.08]" />
                  <span className="display-serif absolute -translate-x-8 -translate-y-3 text-[16rem] leading-none tracking-[-.14em] text-white/[.06] sm:text-[20rem]">X</span>
                  <span className="display-serif absolute translate-x-10 translate-y-7 text-[13rem] leading-none tracking-[-.14em] text-white/[.2] sm:text-[17rem]">R</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 rounded-[1.4rem] border border-white/10 bg-black/55 p-4 backdrop-blur-xl sm:p-5">
                  <span className="label-mono text-[7px] tracking-[.22em] text-white/35">STRATEGY → DESIGN → CONVERSION</span>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="display-serif max-w-[10ch] text-3xl leading-[.88] sm:text-4xl">Des idées qui deviennent désirables.</p>
                    <span className="hidden text-right label-mono text-[7px] leading-4 text-white/28 sm:block">WEB<br/>BRAND<br/>SEO<br/>IA</span>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-0 w-[31%] rounded-[2rem] border border-white/12 bg-white/[.035] p-5 backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[7px] tracking-[.18em] text-white/35">01 / POSITION</span>
                  <ArrowRight className="h-3.5 w-3.5 rotate-[-45deg] text-white/35" />
                </div>
                <p className="mt-8 text-[clamp(2rem,4vw,3.6rem)] font-light leading-none tracking-[-.08em] text-white/90">+500</p>
                <p className="mt-2 label-mono text-[7px] leading-4 text-white/32">PROJECTS /<br/>DIGITAL EXPERIENCES</p>
              </div>

              <div className="absolute bottom-0 right-[3%] w-[46%] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0b0e12] shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(255,255,255,.12),transparent_25%),linear-gradient(135deg,#11151a,#080a0d)]" />
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-[7px] tracking-[.2em] text-white/35">02 / MOTION</span>
                    <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,.35)]" />
                  </div>
                  <h3 className="display-serif mt-10 text-4xl leading-[.84] sm:text-5xl">Make it<br/><em className="not-italic text-white/35">felt.</em></h3>
                  <div className="mt-8 space-y-2">
                    <div className="h-px w-full bg-white/10" />
                    <div className="flex justify-between label-mono text-[7px] text-white/30"><span>EDITORIAL</span><span>86%</span></div>
                    <div className="h-px w-[86%] bg-white/35" />
                    <div className="flex justify-between label-mono text-[7px] text-white/30"><span>CONVERSION</span><span>94%</span></div>
                    <div className="h-px w-[94%] bg-white/25" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-[58%] hidden items-center gap-2 rounded-full border border-white/15 bg-[#090b0e]/92 px-4 py-2 shadow-lg backdrop-blur-xl lg:flex">
                <MousePointer2 className="h-3 w-3 text-white/55" />
                <span className="label-mono text-[7px] tracking-[.15em] text-white/42">MOVE · EXPLORE · CONVERT</span>
              </div>

              <div className="absolute left-5 top-[3%] hidden rounded-2xl border border-white/10 bg-[#090b0e]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
                <span className="label-mono text-[7px] tracking-[.18em] text-white/30">XRAGENCY / DIGITAL DIRECTION</span>
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
