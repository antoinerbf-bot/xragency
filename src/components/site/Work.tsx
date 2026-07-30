import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO, TESTIMONIALS } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";

export function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.workLabel} line1={UI.workTitle1} line2={UI.workTitle2} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.plate} delay={i * 60}>
              <a
                href="#intelligence"
                className="group block overflow-hidden rounded-3xl border border-border"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="label-mono absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-muted-foreground backdrop-blur">
                    {t({ fr: "Planche", en: "Plate", vi: "Bản" })} {p.plate}
                  </span>
                </div>
                <div className="p-6">
                  <p className="label-mono text-muted-foreground">{t(p.sector)}</p>
                  <h3 className="display-serif mt-3 text-2xl transition-colors group-hover:text-primary">
                    {p.name}
                  </h3>
                  <p className="label-mono mt-3 text-primary">{t(p.result)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-mono rounded-full border border-border px-2.5 py-1 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.trustLabel} line1={UI.trustTitle1} line2={UI.trustTitle2} />
        <Reveal delay={140}>
          <p className="label-mono mt-6 text-primary">{t(UI.trustRating)}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((tm, i) => (
            <Reveal key={tm.num} delay={i * 70}>
              <figure className="surface-plate h-full rounded-3xl p-8">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono text-primary">{tm.num}</span>
                  <span className="label-mono text-muted-foreground">{t(tm.field)}</span>
                </div>
                <h3 className="display-serif mt-5 text-2xl">{tm.brand}</h3>
                <blockquote className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {t(tm.quote)}
                </blockquote>
                <figcaption className="label-mono mt-7 border-t border-border pt-5 text-muted-foreground">
                  {tm.author} — {t(tm.role)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}