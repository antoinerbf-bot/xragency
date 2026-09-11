import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { UI } from "@/lib/copy";
import { cn } from "@/lib/utils";

const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=88&w=2200",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=88&w=2200",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=88&w=2200",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=88&w=2200",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=88&w=2200",
};

const FEATURED_IDS = ["websites", "branding", "seo", "social", "maintenance"];

export function HomeServices() {
  const { t, price } = useLang();
  const featured = useMemo(
    () => FEATURED_IDS.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean) as typeof SERVICES,
    [],
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = featured
      .map((service) => document.getElementById(`home-service-${service.id}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = featured.findIndex((service) => `home-service-${service.id}` === visible.target.id);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [featured]);

  return (
    <section id="services" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        <header className="relative z-20 grid gap-7 pb-16 lg:grid-cols-[1fr_420px] lg:items-end lg:pb-24">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">{t(UI.servicesLabel)}</span>
            <h2 className="display-serif mt-4 max-w-5xl text-5xl leading-[0.86] sm:text-7xl lg:text-[8rem]">{t(UI.servicesTitle1)}<br />{t(UI.servicesTitle2)}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:pb-2">
            Une présence digitale pensée comme une expérience : attirer, convaincre, convertir — puis faire durer la relation.
          </p>
        </header>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background to-transparent" />

        <div className="absolute left-5 top-8 z-30 hidden lg:block lg:left-12">
          <div className="flex items-center gap-3 label-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/45">
            <span className="text-primary">{String(active + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(featured.length).padStart(2, "0")}</span>
          </div>
        </div>

        {featured.map((service, index) => {
          const image = SERVICE_IMG[service.id];
          const plans = service.plans.slice(0, 2);
          const isActive = active === index;
          return (
            <article
              id={`home-service-${service.id}`}
              key={service.id}
              className="relative min-h-[105svh] lg:min-h-[115vh]"
            >
              <div className="sticky top-0 flex h-[100svh] min-h-[680px] items-center overflow-hidden">
                <div className="absolute inset-0 bg-black">
                  <img
                    src={image}
                    alt=""
                    aria-hidden
                    className="absolute inset-[-8%] h-[116%] w-[116%] object-cover transition-transform duration-[1800ms] ease-out"
                    style={{ transform: `translate3d(${isActive ? "0" : "-2%"}, ${isActive ? "0" : "3%"}, 0) scale(${isActive ? 1.03 : 1.08})` }}
                  />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 lg:px-24">
                  <div className="max-w-5xl">
                    <div className="mb-7 flex items-center gap-4 label-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                      <span className="text-white/80">{service.num}</span>
                      <span className="h-px w-12 bg-white/20" />
                      <span>XR AGENCY · DIGITAL GROWTH</span>
                    </div>

                    <p className="label-mono text-[10px] uppercase tracking-[0.22em] text-white/55">{t(service.short)}</p>
                    <h3 className="display-serif mt-4 max-w-5xl text-6xl leading-[0.82] text-white sm:text-8xl lg:text-[10rem]">
                      {t(service.title)}
                    </h3>
                    <p className="mt-7 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base lg:text-lg">
                      {t(service.description)}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Link
                        to="/services/$serviceId"
                        params={{ serviceId: service.id }}
                        className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-500 hover:gap-5"
                      >
                        Découvrir la prestation <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <span className="rounded-full border border-white/15 bg-white/5 px-4 py-3 label-mono text-[9px] uppercase tracking-[0.14em] text-white/55 backdrop-blur-md">
                        À partir de {price(service.fromEur)}{service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-9 left-5 right-5 flex items-end justify-between sm:left-8 sm:right-8 lg:left-24 lg:right-24">
                    <div className="flex gap-2">
                      {featured.map((item, dotIndex) => (
                        <span key={item.id} className={cn("h-px transition-all duration-700", dotIndex === index ? "w-12 bg-white" : "w-4 bg-white/25")} />
                      ))}
                    </div>
                    <div className="hidden items-center gap-3 label-mono text-[9px] uppercase tracking-[0.16em] text-white/40 sm:flex">
                      {index < featured.length - 1 ? <>Scroll pour continuer <ArrowDown className="h-3 w-3 animate-bounce" /></> : <>Une présence. Cinq expertises.</>}
                    </div>
                  </div>

                  <div className="absolute bottom-9 right-5 hidden w-[280px] lg:right-24 lg:block">
                    <div className="border-t border-white/15 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        {plans.map((plan) => (
                          <div key={plan.name.fr}>
                            <div className="label-mono text-[8px] uppercase tracking-[0.12em] text-white/35">{t(plan.name)}</div>
                            <div className="mt-1 display-serif text-xl text-white">{price(plan.eur)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="relative z-20 mx-auto max-w-[1600px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40">
        <div className="border-t border-border/50 pt-8 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div>
            <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-primary">XR AGENCY</span>
            <p className="display-serif mt-3 max-w-3xl text-3xl leading-[0.95] sm:text-5xl">Un écosystème digital conçu pour transformer l'attention en décision.</p>
          </div>
          <Link to="/contact" className="mt-7 inline-flex shrink-0 items-center gap-3 rounded-full bg-foreground px-6 py-3 label-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-background transition-transform hover:translate-x-1 sm:mt-0">
            Parlons de votre projet <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
