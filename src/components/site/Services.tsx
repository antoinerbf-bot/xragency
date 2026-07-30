import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";

export function Services() {
  const { t, price } = useLang();

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={UI.servicesLabel}
          line1={UI.servicesTitle1}
          line2={UI.servicesTitle2}
          lead={UI.servicesLead}
        />

        <div className="mt-16 border-t border-border">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <a
                href="#intelligence"
                className="group grid grid-cols-1 items-baseline gap-4 border-b border-border py-8 transition-colors duration-500 hover:bg-primary/5 md:grid-cols-12 md:gap-8 md:px-4"
              >
                <span className="label-mono text-primary md:col-span-1">{s.num}</span>
                <h3 className="display-serif text-2xl transition-colors group-hover:text-primary md:col-span-4 md:text-3xl">
                  {t(s.title)}
                  {s.premium ? (
                    <span className="label-mono ml-3 align-middle rounded-full border border-primary/50 px-2 py-1 text-primary">
                      Premium
                    </span>
                  ) : null}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4">
                  {t(s.short)}
                </p>
                <p className="label-mono text-muted-foreground md:col-span-2 md:text-right">
                  {t(UI.from)} {price(s.fromEur)} {t(PERIOD_LABEL[s.fromPeriod])}
                </p>
                <span className="label-mono text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary md:col-span-1 md:text-right">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={`c-${s.id}`} delay={i * 50}>
              <article className="surface-plate h-full rounded-3xl p-7">
                <p className="label-mono text-primary">{s.num}</p>
                <h4 className="display-serif mt-4 text-2xl">{t(s.title)}</h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t(s.description)}
                </p>
                <ul className="mt-6 space-y-2">
                  {s.highlights.map((h, k) => (
                    <li key={k} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">·</span>
                      {t(h)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}