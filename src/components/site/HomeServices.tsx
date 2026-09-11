import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { UI } from "@/lib/copy";
import { cn } from "@/lib/utils";

const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=2200",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=2200",
  seo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=2200",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=90&w=2200",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=2200",
};

const FEATURED_IDS = ["websites", "branding", "seo", "social", "maintenance"];

export function HomeServices() {
  const { t, price } = useLang();
  const featured = useMemo(
    () => FEATURED_IDS.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean) as typeof SERVICES,
    [],
  );
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById("home-services-experience");
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
      setActive(Math.min(featured.length - 1, Math.floor(p * featured.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [featured.length]);

  return (
    <section id="home-services-experience" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-12 lg:pt-32">
        <div className="flex flex-col gap-5 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">{t(UI.servicesLabel)}</span>
            <h2 className="display-serif mt-3 max-w-4xl text-4xl leading-[0.88] sm:text-6xl lg:text-7xl">
              Cinq expertises.<br /><em className="not-italic italic text-primary">Une seule expérience.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Faites défiler. Les expertises se superposent, se déplacent et se transforment au fil du parcours.
          </p>
        </div>
      </div>

      <div className="relative min-h-[390vh]">
        <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.10),transparent_42%)]" />

          <div className="absolute left-5 top-7 z-30 sm:left-8 lg:left-12">
            <div className="label-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">XR / SERVICES</div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-primary tabular-nums">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-muted-foreground">{String(featured.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="absolute right-5 top-7 z-30 sm:right-8 lg:right-12">
            <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>{active < featured.length - 1 ? "Scroll" : "Explore"}</span>
              <ArrowDown className={cn("h-3 w-3", active < featured.length - 1 && "animate-bounce")} />
            </div>
          </div>

          <div className="absolute inset-0 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            {featured.map((service, index) => {
              const delta = index - active;
              const distance = Math.abs(delta);
              const image = SERVICE_IMG[service.id];
              const visible = distance <= 2;
              const isActive = delta === 0;
              const depth = delta * 70;
              const x = delta * 5;
              const y = delta * 3;
              const scale = 1 - Math.min(distance, 2) * 0.075;

              return (
                <article
                  key={service.id}
                  aria-hidden={!visible}
                  className="absolute left-1/2 top-1/2 w-[min(900px,calc(100vw-40px))] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:w-[min(1050px,calc(100vw-64px))]"
                  style={{
                    opacity: visible ? (isActive ? 1 : 0.48) : 0,
                    transform: `translate3d(calc(-50% + ${x}%), calc(-50% + ${y}%), ${depth}px) scale(${scale})`,
                    zIndex: 30 - distance,
                    filter: isActive ? "none" : "blur(1px) saturate(.72)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-border/80 bg-card shadow-[0_30px_100px_-40px_hsl(var(--foreground)/0.5)] sm:rounded-[2rem]">
                    <div className="grid min-h-[520px] lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[590px]">
                      <div className="relative min-h-[250px] overflow-hidden lg:min-h-full">
                        <img
                          src={image}
                          alt=""
                          aria-hidden
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out"
                          style={{ transform: `scale(${isActive ? 1.04 : 1.12}) translate3d(${delta * -1}%, ${delta * 1.5}%, 0)` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/20 to-black/75" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                        <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                          <div className="label-mono text-[9px] uppercase tracking-[0.22em] text-white/60">XR AGENCY · {service.num}</div>
                          <div className="mt-2 display-serif text-3xl text-white sm:text-4xl">{price(service.fromEur)}{service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}</div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-12">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="label-mono text-[9px] uppercase tracking-[0.22em] text-primary">DIGITAL GROWTH</span>
                            <span className="label-mono text-[9px] text-muted-foreground">{String(index + 1).padStart(2, "0")} / 05</span>
                          </div>
                          <h3 className="display-serif mt-6 text-4xl leading-[0.9] sm:text-6xl lg:text-7xl">{t(service.title)}</h3>
                          <p className="mt-4 max-w-lg text-sm font-medium leading-6 text-primary">{t(service.short)}</p>
                          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{t(service.description)}</p>

                          <div className="mt-7 flex flex-wrap gap-2">
                            {service.highlights.slice(0, 3).map((highlight) => (
                              <span key={highlight.fr} className="rounded-full border border-border bg-background/70 px-3 py-2 text-[10px] text-muted-foreground">
                                {t(highlight)}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 border-t border-border/70 pt-6">
                          <Link
                            to="/services/$serviceId"
                            params={{ serviceId: service.id }}
                            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-background transition-all duration-500 hover:gap-5"
                          >
                            Découvrir la prestation <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
            {featured.map((service, index) => (
              <span key={service.id} className={cn("h-1 rounded-full transition-all duration-700", index === active ? "w-10 bg-primary" : "w-2 bg-border")} />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 hidden sm:block lg:right-12">
            <div className="label-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-3xl display-serif text-3xl leading-[0.95] sm:text-5xl">Une présence digitale pensée pour transformer l'attention en décision.</p>
          <Link to="/services" className="inline-flex shrink-0 items-center gap-3 rounded-full border border-border px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.13em] transition-colors hover:border-primary hover:text-primary">
            Voir les services complets <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
