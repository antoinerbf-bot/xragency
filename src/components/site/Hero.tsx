import { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, FileImage, Search, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import EarthGlobe from "./EarthGlobe";

function useCountUp(target: number, duration = 1600, startDelay = 500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);
  return value;
}

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  const count = useCountUp(value, 1600, delay);
  return (
    <div className="bg-card/65 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/40 sm:px-5 sm:py-4">
      <dt className="display-serif text-2xl font-bold tracking-tight text-primary sm:text-3xl">{count}{suffix ?? ""}</dt>
      <dd className="label-mono mt-1 text-[10px] text-muted-foreground sm:text-xs">{label}</dd>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[calc(100dvh-4.5rem)] overflow-hidden pt-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_42%,rgba(255,60,180,.12),transparent_30%),radial-gradient(circle_at_92%_70%,rgba(30,190,255,.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-background/95 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-6rem)] max-w-[1500px] items-center gap-4 px-5 py-5 sm:px-7 lg:grid-cols-12 lg:gap-0 lg:px-10 lg:py-8">
        <Parallax speed={-0.025} className="relative z-20 lg:col-span-7 xl:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
            <span className="label-mono text-xs font-medium text-primary">{t(UI.heroKicker)}</span>
          </div>

          <p className="label-mono mt-5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
            Premium Digital Agency · The Art of Digital Craft · Mindship
          </p>

          <h1 className="display-serif mt-3 max-w-3xl text-[clamp(2.6rem,6vw,5.8rem)] leading-[0.91] tracking-tight">
            {t(UI.heroTitle1)}{" "}
            <em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>
            <br />
            {t(UI.heroTitle2)}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t(UI.heroLead)}</p>

          <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
            <EmberButton href="#quote" className="w-full justify-center rounded-2xl py-3.5">
              <span className="flex items-center gap-2">Faire mon devis gratuit <ArrowUpRight className="h-3.5 w-3.5" /></span>
            </EmberButton>

            <a
              href={CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €). Je vais vous envoyer mon logo, les éléments que j'ai déjà et le lien de mon site si j'en ai un. Merci de me dire où les envoyer.")}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-card/65 px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/60"
            >
              <span className="relative flex items-center gap-2">
                <FileImage className="h-4 w-4 text-primary" />
                <span>
                  <b className="block text-[10px] uppercase tracking-[.12em]">Maquette gratuite</b>
                  <small className="mt-0.5 block text-[9px] text-muted-foreground">Valorisation 200 € · sans engagement</small>
                </span>
              </span>
            </a>

            <a
              href="#audit"
              className="group relative overflow-hidden rounded-2xl border border-border bg-background/65 px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <span className="relative flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <span>
                  <b className="block text-[10px] uppercase tracking-[.12em]">Audit digital gratuit</b>
                  <small className="mt-0.5 block text-[9px] text-muted-foreground">Valorisation 100 € · offert sans engagement</small>
                </span>
              </span>
            </a>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <p className="label-mono text-[10px] text-muted-foreground/75 sm:text-[11px]">{t(UI.ctaReassurance)} · Pas de reconduction tacite</p>
          </div>

          <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
            <AnimatedStat value={500} suffix="+" label={t(UI.statProjects)} delay={450} />
            <AnimatedStat value={8} suffix="+" label={t(UI.statYears)} delay={520} />
            <AnimatedStat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={590} />
            <AnimatedStat value={2} suffix="h" label={t(UI.statResponse)} delay={660} />
          </dl>
        </Parallax>

        <div className="relative z-10 flex min-h-[320px] items-center justify-center lg:col-span-5 xl:col-span-6">
          <div className="relative w-full max-w-[650px]">
            <EarthGlobe className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
