import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { Globe } from "./Globe";
import heroLoop from "@/assets/hero-studio.mp4.asset.json";

const STATS = [
  { value: "50+", key: "statProjects" },
  { value: "8+", key: "statYears" },
  { value: "100%", key: "statRemote" },
  { value: "24/7", key: "statProduction" },
] as const;

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-screen overflow-hidden pt-28">
      <Parallax speed={0.16} className="absolute inset-0 -top-[10%] h-[120%]">
        <video
          src={heroLoop.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-90 grayscale contrast-105"
        />
      </Parallax>
      <Parallax speed={0.3} className="absolute inset-0 opacity-20 lg:left-[30%]">
        <Globe />
      </Parallax>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 90% at 6% 45%, var(--background) 34%, color-mix(in oklab, var(--background) 55%, transparent) 66%, transparent 82%), linear-gradient(180deg, color-mix(in oklab, var(--background) 80%, transparent) 0%, color-mix(in oklab, var(--background) 35%, transparent) 36%, var(--background) 97%)",
        }}
      />

      <Parallax speed={-0.05} className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col px-6 lg:px-10">
        <div className="animate-rise flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-border/60 pb-4">
          <span className="label-mono text-muted-foreground">{CONTACT.cities}</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16">
          <p
            className="label-mono text-primary"
            style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
          >
            {t(UI.heroKicker)}
          </p>

          <h1
            className="display-serif mt-8 max-w-3xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95]"
            style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 220ms both" }}
          >
            {t(UI.heroTitle1)}
            <br />
            <em className="not-italic text-primary">{t(UI.heroTitleAccent)}</em> {t(UI.heroTitle2)}
          </h1>

          <div
            className="mt-10 max-w-xl"
            style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 340ms both" }}
          >
            <p className="text-base leading-relaxed text-muted-foreground">{t(UI.heroLead)}</p>
            <p className="mt-3 text-sm text-muted-foreground/80">{t(UI.heroMeta)}</p>
          </div>

          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 440ms both" }}
          >
            <EmberButton href="#intelligence">{t(UI.ctaAnalysis)}</EmberButton>
            <EmberButton href="#services" variant="ghost">
              {t(UI.ctaContinue)}
            </EmberButton>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border/60 pt-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                style={{
                  animation: `ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${560 + i * 90}ms both`,
                }}
              >
                <dt className="display-serif text-3xl text-primary">{s.value}</dt>
                <dd className="label-mono mt-2 text-muted-foreground">{t(UI[s.key])}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-5">
          <span className="label-mono text-muted-foreground/70">p. 001</span>
          <span className="label-mono hidden text-muted-foreground/70 md:block">
            Websites · Branding · SEO · Google Maps · Social · AI · Maintenance
          </span>
          <span className="label-mono text-muted-foreground/70">xragency.com</span>
        </div>
      </Parallax>
    </section>
  );
}