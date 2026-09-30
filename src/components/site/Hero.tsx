import { useEffect, useState } from "react";
import { ArrowRight, FileImage, MousePointer2, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
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
  return <div className="border-l border-white/15 pl-4 first:border-l-0 first:pl-0"><strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong><span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-white/45">{label}</span></div>;
}

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#050608] text-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-[-15%] top-[-20%] h-[70vw] w-[70vw] rounded-full bg-white/[.045] blur-[120px]" />
        <div className="absolute bottom-[-25%] right-[-10%] h-[55vw] w-[55vw] rounded-full bg-slate-400/[.07] blur-[130px]" />
        <div className="absolute inset-0 " />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-10">
          <Parallax speed={-0.018}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.035] px-3.5 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,.65)]" />
                <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-white/70">{t(UI.heroKicker)}</span>
              </div>

              <h1 className="display-serif mt-7 max-w-4xl text-[clamp(3.7rem,7.6vw,8rem)] leading-[.82] tracking-[-.065em]">
                {t(UI.heroTitle1)}
                <br />
                <span className="text-white">{t(UI.heroTitleAccent)}</span>{" "}
                <em className="text-white/55 not-italic">{t(UI.heroTitle2)}</em>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">{t(UI.heroLead)}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <EmberButton href="#quote" className="justify-center rounded-full bg-white px-7 py-4 text-[#080a0d] shadow-[0_18px_55px_rgba(0,0,0,.22)] hover:bg-white">Construire mon projet <ArrowRight className="h-4 w-4" /></EmberButton>
                <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[.045] px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-white/80 transition hover:-translate-y-0.5 hover:bg-white/[.09]"><FileImage className="h-3.5 w-3.5" />Ma maquette gratuite</a>
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[.04] px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/75 transition hover:-translate-y-0.5 hover:border-white/25"><Search className="h-3.5 w-3.5 text-white/65" />Lancer mon audit</a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-5 border-y border-white/12 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} label={t(UI.statYears)} />
                <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"><span className="label-mono text-[8px] tracking-[.18em] text-white/42">WEB · BRAND · SEO · LOCAL · SOCIAL · IA</span><span className="h-px w-8 bg-white/20" /><div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div></div>
            </div>
          </Parallax>

          <Parallax speed={0.035}>
            <div className="relative mx-auto w-full max-w-[760px]">
              <div className="absolute -inset-8 rounded-[4rem] bg-white/[.035] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#0c0f13] p-2 shadow-[0_60px_140px_-65px_rgba(0,0,0,.95)]">
                <div className="relative aspect-[1.05/1] overflow-hidden rounded-[2rem]">
                  <img src={XR_PHOTOS.branding} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-[1800ms] hover:scale-[1.045]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_25%,rgba(255,255,255,.16),transparent_30%)]" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-full border border-white/15 bg-black/45 px-4 py-2.5 backdrop-blur-xl"><span className="label-mono text-[8px] tracking-[.22em] text-white/72">XRAGENCY · DIGITAL STUDIO</span><span className="flex items-center gap-2 label-mono text-[7px] text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-white/75" /> LIVE</span></div>
                  <div className="absolute bottom-5 left-5 right-5"><div className="max-w-[520px] rounded-[1.5rem] border border-white/15 bg-black/62 p-5 backdrop-blur-xl sm:p-7"><div className="flex items-center justify-between gap-4"><span className="label-mono text-[8px] tracking-[.24em] text-white/65">01 · STRATEGY → DESIGN → GROWTH</span><Sparkles className="h-4 w-4 text-white/75" /></div><p className="display-serif mt-4 text-3xl leading-[.9] sm:text-5xl">Une présence digitale pensée pour faire agir.</p><div className="mt-5 flex flex-wrap gap-2">{["Site","Identité","Google","IA"].map(x => <span key={x} className="rounded-full border border-white/12 bg-white/[.06] px-2.5 py-1.5 label-mono text-[7px] tracking-[.12em] text-white/62">{x}</span>)}</div></div></div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-white/12 bg-[#090b0e]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"><FileImage className="h-4 w-4 text-white/35" /><span><b className="block text-[9px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="text-[8px] text-white/45">Valeur 200 € · sans engagement</small></span></div>
              <div className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-[#090b0e]/90 px-4 py-2 shadow-lg backdrop-blur-xl sm:flex"><MousePointer2 className="h-3 w-3 text-[#d6a45d]" /><span className="label-mono text-[8px] text-white/65">INTERACTIF · SUR MESURE</span></div>
            </div>
          </Parallax>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-white/[.025]"><div className="flex min-w-max animate-marquee items-center gap-10 py-4 label-mono text-[9px] tracking-[.28em] text-white/42">{Array.from({length: 2}).flatMap((_, row) => ["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE"].map((x,i)=><span key={row+"-"+i} className="inline-flex items-center gap-10"><span>{x}</span><span className="text-[#d6a45d]">✦</span></span>))}</div></div>
    </section>
  );
}
