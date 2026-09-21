import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { Parallax, Reveal } from "./primitives";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance"];
const DISPLAY_NUM: Record<string, string> = {
  websites: "01",
  branding: "02",
  seo: "03",
  maps: "04",
  social: "05",
  maintenance: "06",
};
const DISPLAY_PRICE: Record<string, number | null> = {
  websites: 499,
  branding: null,
  seo: null,
  maps: null,
  social: 499,
  maintenance: null,
};

const SERVICE_IMG: Record<string, string> = {
  websites:
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=2200",
  branding:
    "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&q=90&w=2200",
  seo:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=90&w=2200",
  maps:
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=90&w=2200",
  social:
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=90&w=2200",
  maintenance:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=90&w=2200",
};

const VILLA_IMG =
  "https://images.unsplash.com/photo-1782413263988-11f7178cf385?auto=format&fit=crop&q=90&w=1800";

export function HomeServices() {
  const { t, price } = useLang();
  const featured = FEATURED_IDS.map((id) =>
    SERVICES.find((service) => service.id === id),
  ).filter(Boolean) as typeof SERVICES;

  const hrefFor = (id: string) =>
    id === "maintenance" ? "/services/webcare" : `/services/${id}`;

  return (
    <section
      id="homepage-services"
      aria-label="Les six expertises XR Agency"
      className="relative overflow-hidden bg-[#07090b] py-20 text-white sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.07),transparent_35%),radial-gradient(circle_at_90%_45%,rgba(255,180,90,.07),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.035}>
          <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[0.32em] text-white/45">
                XR AGENCY · 06 EXPERTISES
              </span>
              <h2 className="display-serif mt-4 max-w-4xl text-5xl leading-[0.88] text-white sm:text-7xl lg:text-[6.6rem]">
                Des solutions sur mesure
                <br />
                pour chaque <em className="text-white/55">ambition.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/50 lg:pb-2">
              Six expertises pensées comme un seul écosystème : stratégie,
              création, visibilité et performance. Faites défiler pour voir
              chaque univers.
            </p>
          </div>
        </Parallax>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {featured.map((service, index) => {
            const startingPrice = DISPLAY_PRICE[service.id];
            const featuredLarge = index < 2;

            return (
              <Reveal key={service.id} delay={index * 70} className={featuredLarge ? "sm:col-span-1" : ""}>
                <article className="group relative isolate min-h-[500px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0b0e11] shadow-[0_30px_90px_-45px_rgba(0,0,0,.95)] sm:min-h-[560px]">
                  <div className="absolute inset-[-7%]">
                    <Parallax speed={index % 2 === 0 ? 0.055 : -0.045} className="h-full w-full">
                      <img
                        src={SERVICE_IMG[service.id]}
                        alt=""
                        aria-hidden
                        loading={index > 1 ? "lazy" : "eager"}
                        className="h-full w-full object-cover brightness-[0.72] saturate-[0.82] transition duration-[1200ms] ease-out group-hover:scale-[1.075] group-hover:brightness-[0.84] group-hover:saturate-100"
                      />
                    </Parallax>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

                  <div className="relative z-10 flex min-h-[500px] flex-col justify-between p-6 sm:min-h-[560px] sm:p-9 lg:p-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 label-mono text-[9px] tracking-[0.22em] text-white/45">
                        <span className="text-white">{DISPLAY_NUM[service.id]}</span>
                        <span className="h-px w-8 bg-white/20" />
                        <span>XR AGENCY</span>
                      </div>
                      <span className="rounded-full border border-white/15 bg-black/20 px-3 py-2 label-mono text-[8px] tracking-[0.15em] text-white/50 backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")} / 06
                      </span>
                    </div>

                    <Parallax speed={-0.028}>
                      <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-white/70" />
                          <span className="label-mono text-[8px] tracking-[0.2em] text-white/55">
                            {t(service.short)}
                          </span>
                        </div>

                        <h3 className="display-serif text-4xl leading-[0.9] text-white sm:text-6xl lg:text-[5.2rem]">
                          {t(service.title)}
                        </h3>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-[15px]">
                          {t(service.description)}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                          <Link
                            to={hrefFor(service.id)}
                            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[0.12em] text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                          >
                            Découvrir <ArrowUpRight className="h-4 w-4" />
                          </Link>

                          {startingPrice && (
                            <span className="rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[9px] tracking-[0.12em] text-white/65 backdrop-blur-md">
                              À partir de {price(startingPrice)}
                              {service.fromPeriod === "month" ? " / mois" : ""}
                            </span>
                          )}

                          {service.id === "websites" && (
                            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-3 label-mono text-[9px] tracking-[0.1em] text-white/70 backdrop-blur-md">
                              <Check className="h-3 w-3" />
                              E-commerce & réservation
                            </span>
                          )}
                        </div>
                      </div>
                    </Parallax>

                    <div className="flex items-center justify-between border-t border-white/15 pt-4">
                      <div className="flex gap-1.5">
                        {featured.map((_, dot) => (
                          <span
                            key={dot}
                            className={`h-1 rounded-full transition-all ${dot === index ? "w-10 bg-white" : "w-2 bg-white/25"}`}
                          />
                        ))}
                      </div>
                      <span className="label-mono text-[8px] tracking-[0.18em] text-white/35">
                        PARALLAX / SCROLL
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Parallax speed={0.035} className="mt-16 sm:mt-24">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <img
              src={VILLA_IMG}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050708] via-[#050708]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/90 via-transparent to-[#050708]/10" />

            <div className="relative z-10 flex min-h-[360px] items-end p-7 sm:p-10 lg:p-14">
              <div className="max-w-xl">
                <span className="label-mono text-[9px] tracking-[0.3em] text-white/45">
                  UNE AGENCE · UNE VISION
                </span>
                <h3 className="display-serif mt-4 text-4xl leading-[0.9] sm:text-6xl">
                  Plus qu’un prestataire,
                  <br />
                  <em className="text-white/55">un partenaire de croissance.</em>
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-6 text-white/55">
                  Une direction créative forte, une technologie solide et des
                  expériences digitales conçues pour durer.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute right-[-8%] top-[-14%] hidden h-[125%] w-[55%] rounded-full border border-white/10 lg:block" />
            <div className="pointer-events-none absolute right-[7%] top-[22%] hidden h-3 w-3 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,.7)] lg:block" />
          </div>
        </Parallax>
      </div>
    </section>
  );
}
