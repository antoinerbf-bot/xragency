import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { EmberButton } from "./primitives";
import { Globe } from "./Globe";

const PORTRAIT =
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=800";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0" style={{ background: "var(--gradient-halo)" }} />
      <Globe />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col px-6 lg:px-10">
        <div className="animate-rise grid grid-cols-2 gap-x-8 gap-y-2 border-b border-border/60 pb-4 lg:grid-cols-4">
          <span className="label-mono text-muted-foreground">N° 07</span>
          <span className="label-mono text-muted-foreground lg:text-center">{t(UI.heroEdition)}</span>
          <span className="label-mono text-muted-foreground lg:text-center">Paris — Global</span>
          <span className="label-mono text-muted-foreground lg:text-right">{t(UI.heroReadTime)}</span>
        </div>

        <div className="grid flex-1 gap-10 py-14 lg:grid-cols-12 lg:gap-0">
          <aside
            className="hidden lg:col-span-2 lg:block lg:border-r lg:border-border/60 lg:pr-8"
            style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
          >
            <p className="label-mono text-muted-foreground/70">{t(UI.heroSummary)}</p>
            <ol className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="label-mono flex gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="text-primary/60">{s.num}</span>
                    <span>{t(s.title)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="flex flex-col justify-center lg:col-span-7 lg:px-10">
            <p
              className="label-mono text-primary"
              style={{ animation: "ember-rise 0.9s cubic-bezier(0.16,1,0.3,1) 160ms both" }}
            >
              {t(UI.heroKicker)}
            </p>

            <h1
              className="display-serif mt-8 text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.95]"
              style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 240ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="italic text-primary">{t(UI.heroTitleAccent)}</em>
              <br />
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-10 max-w-xl border-t border-border/60 pt-8"
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
                {t(UI.ctaContinue)} ↓
              </EmberButton>
            </div>
          </div>

          <figure
            className="lg:col-span-3 lg:border-l lg:border-border/60 lg:pl-8"
            style={{ animation: "ember-rise 1s cubic-bezier(0.16,1,0.3,1) 520ms both" }}
          >
            <figcaption className="label-mono text-muted-foreground/70">{t(UI.heroPlate)}</figcaption>
            <img
              src={PORTRAIT}
              alt={t(UI.heroPlate)}
              className="mt-5 aspect-3/4 w-full rounded-2xl border border-border object-cover grayscale"
            />
            <blockquote className="display-serif mt-5 text-lg italic leading-relaxed text-muted-foreground">
              {t(UI.heroQuote)}
            </blockquote>
            <p className="label-mono mt-4 text-muted-foreground/70">{t(UI.heroQuoteAuthor)}</p>
          </figure>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 py-5">
          <span className="label-mono text-muted-foreground/70">p. 001</span>
          <span className="label-mono hidden text-muted-foreground/70 md:block">
            Websites · Branding · SEO · Google Maps · Social · AI · Maintenance
          </span>
          <span className="label-mono text-muted-foreground/70">xragency.com</span>
        </div>
      </div>
    </section>
  );
}