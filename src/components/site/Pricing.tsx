import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { EmberButton, Reveal, SectionHeading } from "./primitives";

export function Pricing() {
  const { t, price } = useLang();
  const [active, setActive] = useState(SERVICES[0].id);
  const service = SERVICES.find((s) => s.id === active)!;

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={UI.pricingLabel}
          line1={UI.pricingTitle1}
          line2={UI.pricingTitle2}
          lead={UI.pricingLead}
        />

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "label-mono rounded-full border px-4 py-2.5 transition-all duration-300",
                  active === s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
                )}
              >
                {s.num} · {t(s.title)}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={service.id}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {service.plans.map((p, i) => (
            <article
              key={`${service.id}-${i}`}
              className={cn(
                "surface-plate relative flex flex-col rounded-3xl p-8",
                p.popular && "border-primary/60",
              )}
              style={{
                animation: `ember-rise 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both`,
              }}
            >
              {p.popular ? (
                <span className="label-mono absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-primary-foreground">
                  {t(UI.popular)}
                </span>
              ) : null}

              <h3 className="display-serif text-2xl">{t(p.name)}</h3>
              {p.audience ? (
                <p className="label-mono mt-2 text-muted-foreground">{t(p.audience)}</p>
              ) : null}

              <p className="mt-6 flex items-baseline gap-2">
                <span className="display-serif text-4xl text-primary">{price(p.eur)}</span>
                <span className="label-mono text-muted-foreground">{t(PERIOD_LABEL[p.period])}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f, k) => (
                  <li key={k} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>

              <EmberButton
                href="#intelligence"
                variant={p.popular ? "solid" : "ghost"}
                className="mt-8 w-full"
              >
                {t(UI.choosePlan)}
              </EmberButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}