import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=85`;

const VISUAL: Record<string, { img: string; span: string }> = {
  websites: { img: u("1547658719-da2b51169166"), span: "md:col-span-4 lg:row-span-2" },
  branding: { img: u("1600096194534-95cf5ece04cf"), span: "md:col-span-2" },
  seo: { img: u("1460925895917-afdab827c52f"), span: "md:col-span-2" },
  maps: { img: u("1524661135-423995f22d0b"), span: "md:col-span-3" },
  social: { img: u("1611162617474-5b21e879e113"), span: "md:col-span-3" },
  maintenance: { img: u("1518770660439-4636190af475"), span: "md:col-span-2" },
  ai: { img: u("1526628953301-3e589a6a8b74"), span: "md:col-span-4" },
};

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

        <div className="mt-16 grid auto-rows-[minmax(0,1fr)] gap-5 md:grid-cols-6">
          {SERVICES.map((s, i) => {
            const v = VISUAL[s.id] ?? { img: u("1547658719-da2b51169166"), span: "md:col-span-2" };
            const wide = v.span.includes("col-span-4");
            return (
              <Reveal key={s.id} delay={i * 60} className={`${v.span} h-full`}>
                <a
                  href="#intelligence"
                  className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl border border-border transition-colors duration-500 hover:border-primary/50"
                >
                  <Parallax speed={0.04} className="absolute inset-0 -top-[8%] h-[116%]">
                    <img
                      src={v.img}
                      alt={t(s.title)}
                      loading="lazy"
                      className="h-full w-full scale-105 object-cover opacity-90 saturate-[0.85] transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:saturate-125"
                    />
                  </Parallax>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in oklab, var(--background) 10%, transparent) 0%, color-mix(in oklab, var(--background) 80%, transparent) 52%, var(--background) 100%)",
                    }}
                  />

                  <div className="relative p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="label-mono text-primary">{s.num}</span>
                      {s.premium ? (
                        <span className="label-mono rounded-full border border-primary/50 px-2 py-0.5 text-primary">
                          Premium
                        </span>
                      ) : null}
                    </div>
                    <h3
                      className={`display-serif mt-3 transition-colors group-hover:text-primary ${
                        wide ? "text-3xl sm:text-4xl" : "text-2xl"
                      }`}
                    >
                      {t(s.title)}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {t(wide ? s.description : s.short)}
                    </p>
                    {wide ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.highlights.slice(0, 3).map((h, k) => (
                          <li
                            key={k}
                            className="label-mono rounded-full border border-border bg-background/50 px-3 py-1 text-muted-foreground backdrop-blur"
                          >
                            {t(h)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-border/70 pt-4">
                      <span className="label-mono text-foreground">
                        {t(UI.from)} {price(s.fromEur)} {t(PERIOD_LABEL[s.fromPeriod])}
                      </span>
                      <span className="label-mono text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}