import { useEffect, useState } from "react";
import { ArrowRight, FileImage, Globe2, Search, Sparkles, Zap } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { XR_HERO_PHOTO } from "@/lib/photography";
import { EmberButton, Parallax, Reveal } from "./primitives";

function useCountUp(target: number, duration = 1200, delay = 300) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const count = useCountUp(value);
  return (
    <div className="min-w-0">
      <strong className="display-serif block text-2xl tracking-[-.04em] sm:text-3xl">{count}{suffix}</strong>
      <span className="mt-1 block label-mono text-[8px] tracking-[.13em] text-muted-foreground">{label}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");

  return (
    <section id="top" className="relative overflow-hidden bg-background pt-24 sm:pt-28 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-primary/[.08] blur-3xl" />
        <div className="absolute left-[35%] top-[8%] h-px w-[55%] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_72%_22%,hsl(var(--primary)/.10),transparent_28%),linear-gradient(180deg,hsl(var(--card)/.7),transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-[680px] opacity-[.10] [background-image:linear-gradient(hsl(var(--foreground)/.07)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid min-h-[calc(100dvh-7rem)] items-center gap-10 py-10 lg:grid-cols-[.91fr_1.09fr] lg:gap-14 lg:py-14">
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[.055] px-3.5 py-2 shadow-[0_10px_35px_-20px_hsl(var(--primary)/.8)]">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]" />
                <span className="label-mono text-[8px] font-semibold tracking-[.23em] text-primary">{t(UI.heroKicker)}</span>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="display-serif mt-6 max-w-3xl text-[clamp(3.2rem,7.2vw,7rem)] leading-[.82] tracking-[-.065em]">
                {t(UI.heroTitle1)}
                <br />
                <em className="text-primary">{t(UI.heroTitleAccent)}</em>{" "}{t(UI.heroTitle2)}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EmberButton href="#quote" className="justify-center px-6 py-4">
                  {t({ fr: "Construire mon projet", en: "Build my project", vi: "Xây dựng dự án", ar: "ابدأ مشروعي", ru: "Создать мой проект" })}
                  <ArrowRight className="h-4 w-4" />
                </EmberButton>
                <a href="#audit" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/50">
                  <Search className="h-3.5 w-3.5 text-primary" />
                  {t({ fr: "Audit gratuit", en: "Free audit", vi: "Audit miễn phí", ar: "تدقيق مجاني", ru: "Бесплатный аудит" })}
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-5 border-y border-border/70 py-5">
                <Stat value={500} suffix="+" label={t(UI.statProjects)} />
                <Stat value={8} label={t(UI.statYears)} />
                <Stat value={90} suffix="%" label={t(UI.statSatisfaction)} />
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
                <span className="label-mono text-[8px] tracking-[.18em]">WEB · BRAND · SEO · LOCAL · SOCIAL</span>
                <span className="h-px w-8 bg-border" />
                <div className="flex gap-1.5">{LANGS.map((l) => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </Reveal>
          </div>

          <Parallax speed={0.028} className="relative z-10">
            <div className="relative mx-auto w-full max-w-[780px]">
              <div className="absolute -inset-8 rounded-[3rem] bg-primary/[.10] blur-3xl" />
              <div className="relative aspect-[1.12/1] overflow-hidden rounded-[2.5rem] border border-white/20 bg-black shadow-[0_50px_140px_-55px_rgba(0,0,0,.8)]">
                <img src={XR_HERO_PHOTO} alt="Architecture et espace de travail contemporain — XRAGENCY" className="h-full w-full object-cover object-center transition-transform duration-[1800ms] hover:scale-[1.035]" fetchPriority="high" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-white/5 mix-blend-soft-light" />

                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-4 py-2.5 text-white/75 backdrop-blur-xl sm:left-7 sm:top-7">
                  <span className="label-mono text-[8px] tracking-[.22em]">XR / DIGITAL STUDIO</span>
                </div>

                <div className="absolute right-5 top-5 hidden rounded-full border border-white/20 bg-black/25 px-4 py-2.5 text-white/70 backdrop-blur-xl sm:block">
                  <span className="label-mono text-[8px] tracking-[.18em]">PARIS · DUBAI · ASIA</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 text-white/65">
                      <Globe2 className="h-3.5 w-3.5 text-primary" />
                      <span className="label-mono text-[8px] tracking-[.2em]">DIGITAL EXPERIENCE · STRATEGY · GROWTH</span>
                    </div>
                    <h2 className="mt-3 display-serif text-4xl leading-[.86] text-white sm:text-6xl lg:text-7xl">
                      L’Art du <em className="text-primary not-italic">Digital.</em>
                    </h2>
                  </div>
                </div>

                <div className="absolute bottom-[26%] right-[8%] hidden h-28 w-28 rounded-full border border-white/20 lg:block">
                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_25px_hsl(var(--primary))]" />
                  <span className="absolute left-1/2 top-1/2 h-px w-[145%] -translate-x-1/2 bg-white/15" />
                  <span className="absolute left-1/2 top-1/2 h-[145%] w-px -translate-y-1/2 bg-white/15" />
                </div>
              </div>

              <a href={mockupUrl} target="_blank" rel="noreferrer" className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-primary/25 bg-background/95 px-4 py-3.5 shadow-2xl backdrop-blur-xl sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10"><FileImage className="h-4 w-4 text-primary" /></span>
                <span><b className="block text-[9px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="text-[8px] text-muted-foreground">Valeur 200 € · sans engagement</small></span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 text-primary" />
              </a>

              <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:flex">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="label-mono text-[8px]">DESIGN · STRATÉGIE · PERFORMANCE</span>
              </div>

              <div className="absolute -bottom-4 right-5 hidden items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2.5 text-white shadow-xl backdrop-blur-xl md:flex">
                <Zap className="h-3 w-3 text-primary" />
                <span className="label-mono text-[8px] tracking-[.14em]">SUR MESURE</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">
        <span className="label-mono text-[8px] tracking-[.25em] text-muted-foreground/50">SCROLL TO EXPLORE</span>
        <span className="h-px w-16 bg-border" />
      </div>
    </section>
  );
}
