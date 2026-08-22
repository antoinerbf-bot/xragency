import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Star,
  X,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO, TESTIMONIALS, CONTACT } from "@/lib/content";
import { Parallax, Reveal, SectionHeading, EmberButton } from "./primitives";

export function Work() {
  const { t, lang } = useLang();
  const [activeProject, setActiveProject] = useState<(typeof PORTFOLIO)[0] | null>(null);

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.workLabel} line1={UI.workTitle1} line2={UI.workTitle2} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.plate} delay={i * 60}>
              <div
                onClick={() => setActiveProject(p)}
                className="group block cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
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
                  <span className="label-mono absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-xs text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">
                    {t(UI.workCase)}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="p-6">
                  <p className="label-mono text-xs text-muted-foreground">{t(p.sector)}</p>
                  <h3 className="display-serif mt-3 text-2xl transition-colors group-hover:text-primary">
                    {p.name}
                  </h3>
                  <p className="label-mono mt-3 text-sm font-semibold text-primary">
                    {t(p.result)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-mono rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            <button
              onClick={() => setActiveProject(null)}
              aria-label="Fermer"
              className="absolute right-6 top-6 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-16/9 overflow-hidden rounded-2xl border border-border">
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <span className="label-mono text-xs text-primary">
                    Planche {activeProject.plate} · {t(activeProject.sector)}
                  </span>
                  <h3 className="display-serif mt-2 text-3xl sm:text-4xl text-foreground">
                    {activeProject.name}
                  </h3>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-2.5">
                  <span className="label-mono text-xs text-muted-foreground">Impact mesuré</span>
                  <p className="display-serif text-xl font-bold text-primary">
                    {t(activeProject.result)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Disciplines déployées
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label-mono flex items-center gap-1.5 rounded-full border border-border bg-accent/30 px-3 py-1.5 text-xs text-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                    `Bonjour XR Agency, j'ai vu votre réalisation "${activeProject.name}" (${activeProject.tags.join(
                      ", ",
                    )}) et je souhaite un résultat similaire pour mon entreprise.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Demander une étude similaire
                </a>

                <button
                  onClick={() => setActiveProject(null)}
                  className="label-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
          {TESTIMONIALS.map((tm, i) =>
            (() => {
              const linked = PORTFOLIO.find((p) => p.name === tm.brand);
              return (
                <Reveal key={tm.num} delay={i * 70}>
                  <Parallax speed={i % 3 === 1 ? 0.05 : i % 3 === 2 ? -0.04 : 0.02}>
                    <figure className="surface-plate flex h-full flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="flex gap-0.5 text-primary">
                          {Array.from({ length: tm.rating }).map((_, s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </span>
                        <span className="label-mono text-muted-foreground">{t(tm.field)}</span>
                      </div>
                      <h3 className="display-serif mt-5 text-2xl">{tm.brand}</h3>
                      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-muted-foreground">
                        {t(tm.quote)}
                      </blockquote>
                      {linked ? (
                        <a
                          href="#work"
                          className="label-mono mt-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 px-3 py-1.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          {t(UI.workLinkedCase)} · {t(linked.result)}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      <figcaption className="mt-7 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-5">
                        <span className="label-mono flex items-center gap-1.5 text-foreground">
                          <BadgeCheck
                            className="h-3.5 w-3.5 text-primary"
                            aria-label={t(UI.workVerified)}
                          />
                          {tm.author} — {t(tm.role)}
                        </span>
                        <span className="label-mono text-muted-foreground/70">
                          {tm.city} · {t(tm.date)}
                        </span>
                      </figcaption>
                    </figure>
                  </Parallax>
                </Reveal>
              );
            })(),
          )}
        </div>
      </div>
    </section>
  );
}
