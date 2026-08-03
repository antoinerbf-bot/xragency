import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Parallax, Reveal, SectionHeading } from "./primitives";
import imgBranding from "@/assets/svc-branding.jpg";
import imgSeo from "@/assets/svc-seo.jpg";
import imgMaps from "@/assets/svc-maps.jpg";
import imgSocial from "@/assets/svc-social.jpg";
import imgMaintenance from "@/assets/svc-maintenance.jpg";
import imgAi from "@/assets/svc-ai.jpg";

const WEBSITES =
  "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=1400&q=85";

const VISUAL: Record<string, { img: string; span: string }> = {
  websites: { img: WEBSITES, span: "md:col-span-4 lg:row-span-2" },
  branding: { img: imgBranding, span: "md:col-span-2" },
  seo: { img: imgSeo, span: "md:col-span-2" },
  maps: { img: imgMaps, span: "md:col-span-3" },
  social: { img: imgSocial, span: "md:col-span-3" },
  maintenance: { img: imgMaintenance, span: "md:col-span-2" },
  ai: { img: imgAi, span: "md:col-span-4" },
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
                <a
                  href="#intelligence"
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
                    {wide ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.highlights.slice(0, 3).map((h, k) => (
                          <li
                            key={k}
                            className="label-mono rounded-full border border-current/40 px-3 py-1 backdrop-blur"
                          >
                            {t(h)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-current/25 pt-4">
                      <span className="label-mono">
                        {t(UI.from)} {price(s.fromEur)} {t(PERIOD_LABEL[s.fromPeriod])}
                      </span>
                      <span className="label-mono transition-transform group-hover:translate-x-1">
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
