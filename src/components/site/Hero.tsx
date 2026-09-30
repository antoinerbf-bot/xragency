import { useEffect, useState } from "react";
import { ArrowRight, FileImage, MousePointer2, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_PHOTO, XR_PHOTOS } from "@/lib/photography";

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
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

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
                <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[.045] px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-white/80 transition hover:-translate-y-0.5 hover:bg-white/[.09]">
                  <FileImage className="h-3.5 w-3.5" />Maquette gratuite
                </a>
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

          <Parallax speed={0.045}>
            <div className="relative mx-auto w-full max-w-[820px] [perspective:1600px]">
              <div className="absolute -inset-12 rounded-full bg-white/[.025] blur-3xl" />
              <div className="relative rotate-[1deg] transition-transform duration-1000 hover:rotate-0">
                <div className="absolute -inset-3 rounded-[2.8rem] border border-white/[.08] bg-white/[.015]" />
                <div className="relative overflow-hidden rounded-[2.4rem] border border-white/14 bg-[#0a0d11] p-2 shadow-[0_70px_160px_-65px_rgba(0,0,0,.98)]">
                  <div className="relative aspect-[1.06/1] overflow-hidden rounded-[2rem]">
                    <img src={XR_HERO_PHOTO} alt="" className="absolute inset-0 h-full w-full scale-[1.08] object-cover grayscale contrast-[1.08] brightness-[.72] transition duration-[1800ms] hover:scale-[1.15] hover:brightness-[.84]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/15 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,.17),transparent_25%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.12)_48%,rgba(0,0,0,.42)_100%)]" />
                    <div className="absolute inset-0 opacity-50 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.045)_0px,rgba(255,255,255,.045)_1px,transparent_1px,transparent_6px)]" />

                    <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="label-mono text-[8px] tracking-[.25em] text-white/65">XRAGENCY / DIGITAL STUDIO</span>
                      <span className="flex items-center gap-2 label-mono text-[7px] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> LIVE SYSTEM</span>
                    </div>

                    <div className="absolute left-[9%] top-[15%] hidden h-[58%] w-px bg-white/15 sm:block" />
                    <div className="absolute right-[13%] top-[10%] hidden h-[35%] w-px bg-white/10 sm:block" />
                    <div className="absolute left-[9%] top-[15%] hidden h-px w-[24%] bg-white/15 sm:block" />
                    <div className="absolute bottom-[22%] right-[13%] hidden h-px w-[28%] bg-white/10 sm:block" />

                    <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 sm:block">
                      <div className="h-40 w-px bg-white/15" />
                      <div className="mt-3 label-mono text-[7px] tracking-[.28em] text-white/35 [writing-mode:vertical-rl]">ART DIRECTION · XR / 2026</div>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div className="max-w-[560px] rounded-[1.6rem] border border-white/15 bg-black/65 p-5 backdrop-blur-xl sm:p-7">
                        <div className="flex items-center justify-between gap-4">
                          <span className="label-mono text-[8px] tracking-[.24em] text-white/55">01 · STRATEGY → DESIGN → GROWTH</span>
                          <Sparkles className="h-4 w-4 text-white/65" />
                        </div>
                        <p className="display-serif mt-4 text-3xl leading-[.9] sm:text-5xl">Une présence digitale pensée pour faire agir.</p>
                        <div className="mt-5 flex flex-wrap gap-2">{["Site","Identité","Google","IA"].map(x => <span key={x} className="rounded-full border border-white/12 bg-white/[.06] px-2.5 py-1.5 label-mono text-[7px] tracking-[.12em] text-white/58">{x}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-2 hidden h-28 w-44 overflow-hidden rounded-2xl border border-white/15 bg-[#090b0e] p-1 shadow-2xl backdrop-blur-xl lg:block">
                <div className="relative h-full overflow-hidden rounded-xl">
                  <img src={XR_PHOTOS.seo} alt="" className="h-full w-full object-cover grayscale contrast-[1.12] brightness-[.62] transition duration-1000 hover:scale-110 hover:brightness-[.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute bottom-3 left-3 label-mono text-[7px] tracking-[.2em] text-white/65">DATA / PERFORMANCE</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-white/12 bg-[#090b0e]/92 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
                <FileImage className="h-4 w-4 text-white/45" />
                <span><b className="block text-[9px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="text-[8px] text-white/42">Valeur 200 € · sans engagement</small></span>
              </div>
              <div className="absolute -right-5 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-[#090b0e]/92 px-4 py-2 shadow-lg backdrop-blur-xl sm:flex">
                <MousePointer2 className="h-3 w-3 text-white/60" />
                <span className="label-mono text-[8px] text-white/58">INTERACTIF · SUR MESURE</span>
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
