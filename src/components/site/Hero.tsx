import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { Globe } from "./Globe";
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

const STATS = [
  { value: "500+", key: "statProjects" },
  { value: "8+", key: "statYears" },
  { value: "100%", key: "statRemote" },
  { value: "24/7", key: "statProduction" },
] as const;

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-screen overflow-hidden pt-28">
      {/* Background ambient video */}
      <Parallax speed={0.12} className="absolute inset-0 -top-[10%] h-[120%]">
        <video
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-60 grayscale contrast-110"
        />
      </Parallax>

      {/* Atmospheric lighting layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 40%, var(--background) 35%, color-mix(in oklab, var(--background) 70%, transparent) 65%, color-mix(in oklab, var(--background) 90%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 70%, transparent) 0%, transparent 40%, var(--background) 98%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        {/* Top Header Status Bar */}
        <div className="animate-rise flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-border/60 pb-4">
          <span className="label-mono text-xs text-muted-foreground">{CONTACT.cities}</span>
          <span className="label-mono flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t(UI.intelOnline)}
          </span>
        </div>

        {/* Hero Main Content & Signature 3D Globe */}
        <div className="grid items-center gap-12 py-12 lg:grid-cols-12 lg:py-16">
          {/* Left Column: Typography & CTAs */}
          <div className="relative z-10 lg:col-span-7">
            <p
              className="label-mono inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-xs text-primary"
              style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              {t(UI.heroKicker)}
            </p>

            <h1
              className="display-serif mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98]"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 220ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic text-primary">{t(UI.heroTitleAccent)}</em> {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-8 max-w-xl"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 340ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                {t(UI.heroMeta)}
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-4"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 440ms both" }}
            >
              <EmberButton href="#intelligence">{t(UI.ctaAnalysis)}</EmberButton>
              <EmberButton href="#services" variant="ghost">
                {t(UI.ctaContinue)}
              </EmberButton>
              <span className="label-mono text-xs text-muted-foreground/80">
                {t(UI.intelDuration)}
              </span>
            </div>
          </div>

          {/* Right Column: Signature 3D Interactive WebGL Globe */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <Parallax speed={0.06} className="relative w-full max-w-[540px]">
              <Globe className="w-full" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
                <span className="label-mono text-[10px] tracking-wider text-muted-foreground">
                  Réseau International · Paris · Asie · USA
                </span>
              </div>
            </Parallax>
          </div>
        </div>

        {/* Bottom Key Stats Bar */}
        <div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className="bg-card/70 px-5 py-5 backdrop-blur-sm transition-colors hover:bg-accent/40"
                style={{
                  animation: `ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${560 + i * 90}ms both`,
                }}
              >
                <dt className="display-serif text-3xl text-primary sm:text-4xl">{s.value}</dt>
                <dd className="label-mono mt-1.5 text-xs text-muted-foreground">{t(UI[s.key])}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-5 mt-8">
            <span className="label-mono text-xs text-muted-foreground/70">p. 001</span>
            <span className="label-mono hidden text-xs text-muted-foreground/70 md:block">
              Websites · Branding · SEO · Google Maps · Social · AI · Maintenance
            </span>
            <span className="label-mono text-xs text-muted-foreground/70">xragency.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
