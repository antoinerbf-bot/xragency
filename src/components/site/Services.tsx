import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";
// Ultra-premium realistic editorial photography for each service
const IMG_WEBSITES =
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85";
const IMG_BRANDING =
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=85";
const IMG_SEO =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85";
const IMG_MAPS =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85";
const IMG_SOCIAL =
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=85";
const IMG_MAINTENANCE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85";
const IMG_AI =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85";

const VISUAL: Record<string, { img: string; span: string }> = {
  websites: { img: IMG_WEBSITES, span: "md:col-span-4 lg:row-span-2" },
  branding: { img: IMG_BRANDING, span: "md:col-span-2" },
  seo: { img: IMG_SEO, span: "md:col-span-2" },
  maps: { img: IMG_MAPS, span: "md:col-span-3" },
  social: { img: IMG_SOCIAL, span: "md:col-span-3" },
  maintenance: { img: IMG_MAINTENANCE, span: "md:col-span-2" },
  ai: { img: IMG_AI, span: "md:col-span-4" },
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
            const v = VISUAL[s.id] ?? { img: WEBSITES, span: "md:col-span-2" };
            const wide = v.span.includes("col-span-4");
            return (
              <Reveal key={s.id} delay={i * 60} className={`${v.span} h-full`}>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: s.id }}
                  className="group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-plate)] transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40"
                >
                  <Parallax speed={0.04} className="absolute inset-0 -top-[8%] h-[116%]">
                    <img
                      src={v.img}
                      alt={t(s.title)}
                      loading="lazy"
                      className="h-full w-full scale-105 object-cover grayscale-[0.55] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </Parallax>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, color-mix(in oklab, oklch(0.12 0 0) 22%, transparent) 40%, color-mix(in oklab, oklch(0.1 0 0) 88%, transparent) 100%)",
                    }}
                  />

                  <div className="relative p-6 text-[oklch(0.99_0_0)] sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="label-mono opacity-70">{s.num}</span>
                      {s.premium ? (
                        <span className="label-mono rounded-full border border-current/50 px-2 py-0.5">
                          Premium
                        </span>
                      ) : null}
                    </div>
                    <h3
                      className={`display-serif mt-3 ${wide ? "text-3xl sm:text-4xl" : "text-2xl"}`}
                    >
                      {t(s.title)}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">
                      {t(wide ? s.description : s.short)}
                    </p>
                    <div
                      className={
                        wide
                          ? "mt-5"
                          : "grid grid-rows-[0fr] transition-all duration-500 group-hover:mt-5 group-hover:grid-rows-[1fr]"
                      }
                    >
                      <ul className="flex flex-wrap gap-2 overflow-hidden">
                        {s.highlights.slice(0, 3).map((h, k) => (
                          <li
                            key={k}
                            className="label-mono rounded-full border border-current/40 px-3 py-1 backdrop-blur"
                          >
                            {t(h)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-current/25 pt-4">
                      <span className="label-mono">
                        {t(UI.from)} {price(s.fromEur)} {t(PERIOD_LABEL[s.fromPeriod])}
                      </span>
                      <span className="label-mono flex h-8 w-8 items-center justify-center rounded-full border border-current/40 transition-all duration-300 group-hover:bg-current/15 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
