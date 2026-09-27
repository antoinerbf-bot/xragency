import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileImage, Globe2, MapPin, Search, Sparkles, Zap } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";

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
  return <div className="border-l border-border/70 pl-4 first:border-l-0 first:pl-0"><strong className="display-serif text-2xl sm:text-3xl">{count}{suffix}</strong><span className="mt-1 block label-mono text-[8px] tracking-[.12em] text-muted-foreground">{label}</span></div>;
}

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="top" className="relative overflow-hidden bg-background pt-20 sm:pt-24">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full border border-primary/20 bg-primary/[.06] shadow-[0_0_180px_hsl(var(--primary)/.12)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_75%_25%,hsl(var(--primary)/.15),transparent_30%),linear-gradient(180deg,hsl(var(--card)/.65),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[600px] opacity-[.13] [background-image:linear-gradient(hsl(var(--foreground)/.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-16">
          <Parallax speed={-0.025}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/[.06] px-3.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
                <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-primary">{t(UI.heroKicker)}</span>
              </div>

              <h1 className="display-serif mt-6 text-[clamp(3.25rem,8vw,7.5rem)] leading-[.82] tracking-[-.055em]">
                {t(UI.heroTitle1)}
                <br />
                <em className="text-primary">{t(UI.heroTitleAccent)}</em>{" "}
                {t(UI.heroTitle2)}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EmberButton href="#quote" className="justify-center rounded-full px-6 py-3.5">
                  {t({ fr: "Construire mon projet", en: "Build my project", vi: "Xây dựng dự án", ar: "ابدأ مشروعي", ru: "Создать мой проект" })}
                  <ArrowRight className="h-4 w-4" />
                </EmberButton>
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/50">
                  <Search className="h-3.5 w-3.5 text-primary" />
                  {t({ fr: "Analyser mon site", en: "Audit my website", vi: "Phân tích website", ar: "حلل موقعي", ru: "Аудит сайта" })}
                </a>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-5 border-y border-border/70 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} label={t(UI.statYears)} />
                <Stat value={90} suffix="%" label={t(UI.statSatisfaction)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
                <span className="label-mono text-[8px] tracking-[.18em]">WEB · BRAND · SEO · LOCAL · SOCIAL</span>
                <span className="h-px w-8 bg-border" />
                <div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </div>
          </Parallax>

          <Parallax speed={0.035}>
            <div className="relative mx-auto w-full max-w-[650px]">
              <div className="absolute -inset-8 rounded-[3rem] bg-primary/[.08] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-border bg-card/80 p-2 shadow-[0_45px_120px_-45px_rgba(0,0,0,.45)] backdrop-blur-xl">
                <div className="rounded-[1.8rem] border border-white/10 bg-[#0b0e12] p-3">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="ml-2 h-2 w-28 rounded-full bg-white/10" />
                    <span className="ml-auto label-mono text-[7px] text-white/30">xragencyai.com</span>
                  </div>
                  <div className="grid min-h-[420px] gap-3 p-3 sm:grid-cols-[1.12fr_.88fr]">
                    <div className="relative overflow-hidden rounded-2xl bg-[#f5f2eb] p-6 text-black sm:p-8">
                      <span className="label-mono text-[8px] font-semibold tracking-[.25em] text-[#a2763d]">XR / DIGITAL STUDIO</span>
                      <h2 className="mt-6 font-serif text-5xl leading-[.86] tracking-[-.05em] sm:text-6xl">L’Art<br/><em className="text-[#a2763d]">du Digital.</em></h2>
                      <p className="mt-5 max-w-[220px] text-xs leading-5 text-black/50">Web · identité · visibilité · conversion</p>
                      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-[8px] font-semibold tracking-[.18em]">XRAGENCY</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-rows-2">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-background p-5">
                        <Globe2 className="h-5 w-5 text-primary" />
                        <div className="absolute bottom-5 left-5"><span className="label-mono text-[7px] text-muted-foreground">01</span><p className="mt-1 text-sm font-semibold">Web sur mesure</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative rounded-2xl border border-border bg-background p-4"><Search className="h-4 w-4 text-primary" /><span className="absolute bottom-4 left-4 label-mono text-[7px] text-muted-foreground">SEO</span></div>
                        <div className="relative rounded-2xl border border-border bg-background p-4"><MapPin className="h-4 w-4 text-primary" /><span className="absolute bottom-4 left-4 label-mono text-[7px] text-muted-foreground">LOCAL</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="label-mono text-[8px] tracking-[.18em] text-muted-foreground">DIGITAL SYSTEM · BUILT AROUND YOU</span>
                  <span className="flex items-center gap-1.5 text-[8px] font-semibold text-primary"><Zap className="h-3 w-3" /> SUR MESURE</span>
                </div>
              </div>

              <a href={mockupUrl} target="_blank" rel="noreferrer" className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-primary/30 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
                <FileImage className="h-4 w-4 text-primary" />
                <span><b className="block text-[9px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="text-[8px] text-muted-foreground">Valeur 200 € · sans engagement</small></span>
              </a>
              <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 shadow-lg backdrop-blur-xl sm:flex">
                <Sparkles className="h-3 w-3 text-primary" /><span className="label-mono text-[8px]">DESIGN · STRATÉGIE · PERFORMANCE</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
