import { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, FileImage, Search, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax, FloatingBadge } from "./primitives";
// import EarthGlobe from "./EarthGlobe"; // Globe removed per user request

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1600, startDelay = 500) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);

  return value;
}

/* ── Stat card with animated counter ── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const count = useCountUp(value, 1600, delay);
  return (
    <div
      className="bg-card/75 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:bg-accent/40 hover:-translate-y-0.5 cursor-default"
      style={{ animation: `ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}
    >
      <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold tracking-tight">
        {count}
        {suffix ?? ""}
      </dt>
      <dd className="label-mono mt-1 text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[92dvh] overflow-hidden pt-20 sm:pt-24">
      {/* Atmospheric lighting depth layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 30%, color-mix(in oklab, var(--background) 65%, transparent) 60%, color-mix(in oklab, var(--background) 85%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 60%, transparent) 0%, transparent 45%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(92dvh-6.5rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        {/* Hero Main Content */}
        <div className="grid items-center gap-10 py-10 lg:grid-cols-12 lg:py-14">
          {/* Left Column: Typography & CTAs */}
          <Parallax speed={-0.03} className="relative z-10 lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"
              style={{ animation: "ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="label-mono text-xs text-primary font-medium">
                {t(UI.heroKicker)}
              </span>
            </div>

            <h1
              className="display-serif mt-5 text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.96] tracking-tight"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 200ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-6 max-w-xl"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80 font-mono">
                {t(UI.heroMeta)}
              </p>
            </div>

            {/* Direct CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 400ms both" }}
            >
              <div className="grid w-full max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3 [perspective:900px]">
                <div className="group sm:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-500">
                  <EmberButton href="#quote" className="relative w-full justify-center overflow-hidden rounded-2xl py-3.5 shadow-[0_18px_45px_-24px_rgba(0,0,0,.8)]">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">Faire mon devis gratuit <ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </EmberButton>
                </div>
                <a href={CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €). Je vais vous envoyer mon logo, les éléments que j'ai déjà et le lien de mon site si j'en ai un. Merci de me dire où les envoyer.")} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-card/60 px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-2">
                  <span className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-primary/15 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2"><FileImage className="h-4 w-4 text-primary" /><span><b className="block text-[10px] uppercase tracking-[.12em]">Maquette gratuite</b><small className="mt-0.5 block text-[9px] text-muted-foreground">Valorisation 200 € · sans engagement</small></span></span>
                </a>
                <a href="#audit" className="group relative overflow-hidden rounded-2xl border border-primary/45 bg-primary/[.07] px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary hover:bg-primary/[.11] hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-1">
                  <span className="absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-primary/10 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2"><Search className="h-4 w-4 text-primary" /><span><b className="block text-[10px] uppercase tracking-[.12em]">Lancer mon analyse personnalisée</b><small className="mt-0.5 block text-[9px] text-muted-foreground">Instantanée · multi-audits · PDF + recommandations</small></span></span>
                </a>
              </div>
              <span className="label-mono hidden text-xs text-muted-foreground/80 sm:inline">{t(UI.intelDuration)}</span>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 500ms both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <p className="label-mono text-[11px] text-muted-foreground/70">
                {t(UI.ctaReassurance)} · Pas de reconduction tacite
              </p>
            </div>
          </Parallax>

          {/* Right Column reserved for future visual */}
        </div>

        {/* Bottom Key Stats Bar with Animated Counters */}
        <div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4 shadow-sm">
            <AnimatedStat value={500} suffix="+" label={t(UI.statProjects)} delay={550} />
            <AnimatedStat value={8} suffix="+" label={t(UI.statYears)} delay={630} />
            <AnimatedStat value={98} suffix="%" label={t(UI.statSatisfaction)} delay={710} />
            <AnimatedStat value={2} suffix="h" label={t(UI.statResponse)} delay={790} />
          </dl>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/60 py-4">
            <span className="label-mono text-xs text-muted-foreground/70">XR Intelligence · Julie · Devis sur mesure</span>
            <span className="label-mono text-xs text-primary">01 · Analyse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
