import { ArrowUpRight, BadgeCheck, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO, TESTIMONIALS } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";

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
                  <Parallax speed={0.05} className="h-full w-full">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-[112%] w-full scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </Parallax>
                  <span className="label-mono absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-muted-foreground backdrop-blur">
                    {t({ fr: "Planche", en: "Plate", vi: "Bản" })} {p.plate}
                  </span>
                  <span className="label-mono absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {t(UI.workCase)}
                    <ArrowUpRight className="h-3.5 w-3.5" />
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((tm, i) => (
            <Reveal key={tm.num} delay={i * 70}>
              <Parallax speed={i % 3 === 1 ? 0.05 : i % 3 === 2 ? -0.04 : 0.02}>
                <figure className="surface-plate h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="flex gap-0.5 text-primary">
                      {Array.from({ length: tm.rating }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                    <span className="label-mono text-muted-foreground">{t(tm.field)}</span>
                  </div>
                  <h3 className="display-serif mt-5 text-2xl">{tm.brand}</h3>
                  <blockquote className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {t(tm.quote)}
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-5">
                    <span className="label-mono text-foreground">
                      {tm.author} — {t(tm.role)}
                    </span>
                    <span className="label-mono text-muted-foreground/70">
                      {tm.city} · {t(tm.date)}
                    </span>
                  </figcaption>
                </figure>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}