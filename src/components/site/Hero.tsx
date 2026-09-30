import { useEffect, useState } from "react";
import { ArrowRight, FileImage, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_PHOTO } from "@/lib/photography";

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
  return <div className="border-l border-white/15 pl-4 first:border-l-0 first:pl-0"><strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong><span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-white/45">{label}</span></div>;
}

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#07090b] text-white">
      <div className="absolute inset-0" aria-hidden>
        <img src={XR_HERO_PHOTO} alt="" className="h-full w-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050607_0%,rgba(5,6,7,.94)_32%,rgba(5,6,7,.68)_58%,rgba(5,6,7,.38)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_48%,rgba(214,164,93,.18),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,.45),#07090b_96%)]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-12 pb-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pb-24">
          <Parallax speed={-0.02}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-black/20 px-3.5 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
                <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-primary">{t(UI.heroKicker)}</span>
              </div>

              <h1 className="display-serif mt-7 text-[clamp(3.5rem,7vw,7.4rem)] leading-[.82] tracking-[-.055em]">
                {t(UI.heroTitle1)}
                <br />
                <em className="text-primary">{t(UI.heroTitleAccent)}</em>{" "}
                {t(UI.heroTitle2)}
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">{t(UI.heroLead)}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EmberButton href="#quote" className="justify-center rounded-full px-7 py-4 shadow-[0_15px_50px_rgba(214,164,93,.18)]">
                  {t({ fr: "Construire mon projet", en: "Build my project", vi: "Xây dựng dự án", ar: "ابدأ مشروعي", ru: "Создать мой проект" })}
                  <ArrowRight className="h-4 w-4" />
                </EmberButton>
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/50">
                  <Search className="h-3.5 w-3.5 text-primary" />
                  {t({ fr: "Analyser mon site", en: "Audit my website", vi: "Phân tích website", ar: "حلل موقعي", ru: "Аудит сайта" })}
                </a>
              </div>

              <div className="mt-9 grid max-w-2xl grid-cols-3 gap-5 border-y border-white/15 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} label={t(UI.statYears)} />
                <Stat value={98} suffix="%" label={t(UI.statSatisfaction)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/45">
                <span className="label-mono text-[8px] tracking-[.18em]">WEB · BRAND · SEO · LOCAL · SOCIAL</span>
                <span className="h-px w-8 bg-white/20" />
                <div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </div>
          </Parallax>

          <Parallax speed={0.045}>
            <div className="relative mx-auto w-full max-w-[760px] lg:-mr-10">
              <div className="absolute -inset-10 rounded-[4rem] bg-primary/[.10] blur-3xl" />
              <div className="relative aspect-[1.05/1] overflow-hidden rounded-[2.5rem] border border-white/15 bg-black/30 shadow-[0_50px_140px_-55px_rgba(0,0,0,.95)]">
                <img src={XR_HERO_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.04] transition-transform duration-[1800ms] hover:scale-[1.09]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(214,164,93,.28),transparent_28%)]" />

                <div className="absolute left-5 top-5 right-5 flex items-center justify-between rounded-full border border-white/15 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
                  <span className="label-mono text-[8px] tracking-[.22em] text-white/70">XRAGENCY · DIGITAL STUDIO</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-[1.15fr_.85fr]">
                  <div className="rounded-[1.4rem] border border-white/15 bg-black/55 p-5 backdrop-blur-xl">
                    <span className="label-mono text-[8px] tracking-[.24em] text-primary">01 · STRATEGY → DESIGN → GROWTH</span>
                    <p className="display-serif mt-3 text-3xl leading-[.9] sm:text-4xl">Une présence digitale qui donne envie d’acheter.</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Web", "Brand", "SEO", "Ads"].map(x => <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 label-mono text-[7px] tracking-[.12em] text-white/55">{x}</span>)}
                    </div>
                  </div>
                  <div className="hidden rounded-[1.4rem] border border-white/15 bg-white/[.07] p-5 backdrop-blur-xl sm:block">
                    <div className="flex items-center justify-between"><span className="label-mono text-[8px] text-white/45">CONVERSION</span><ArrowRight className="h-4 w-4 text-primary" /></div>
                    <div className="mt-8 text-5xl font-semibold tracking-[-.05em]">98%</div>
                    <p className="mt-2 text-xs leading-5 text-white/45">satisfaction annoncée par XRAGENCY</p>
                  </div>
                </div>
              </div>

              <a href={mockupUrl} target="_blank" rel="noreferrer" className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-primary/30 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
                <FileImage className="h-4 w-4 text-primary" />
                <span><b className="block text-[9px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="text-[8px] text-white/45">Valeur 200 € · sans engagement</small></span>
              </a>
              <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-black/75 px-4 py-2 shadow-lg backdrop-blur-xl sm:flex">
                <Sparkles className="h-3 w-3 text-primary" /><span className="label-mono text-[8px]">DESIGN · STRATÉGIE · PERFORMANCE</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
