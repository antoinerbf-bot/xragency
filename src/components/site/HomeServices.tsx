import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { UI } from "@/lib/copy";
import { cn } from "@/lib/utils";

const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1800",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=85&w=1800",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=85&w=1800",
  maps: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=85&w=1800",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=85&w=1800",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=1800",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1800",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=85&w=1800",
  refonte: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=85&w=1800",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=85&w=1800",
  strategy: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1800",
};

export function HomeServices() {
  const { t, price } = useLang();
  const [active, setActive] = useState(0);
  const ids = useMemo(() => SERVICES.map((s) => s.id), []);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(`home-service-${id}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = ids.indexOf(visible.target.id.replace("home-service-", ""));
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <section id="services" className="relative bg-background py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">{t(UI.servicesLabel)}</span>
            <h2 className="display-serif mt-3 max-w-4xl text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">{t(UI.servicesTitle1)}<br />{t(UI.servicesTitle2)}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{t(UI.servicesLead)}</p>
          </div>
          <div className="hidden lg:block label-mono text-right text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">{String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[64px_minmax(0,1fr)]">
          <aside className="hidden lg:flex flex-col items-center gap-2 pt-3">
            {SERVICES.map((service, index) => (
              <button key={service.id} onClick={() => document.getElementById(`home-service-${service.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })} aria-label={t(service.title)} className="group flex w-full items-center justify-center py-1">
                <span className={cn("h-px transition-all duration-300", index === active ? "w-10 bg-primary" : "w-4 bg-border group-hover:w-7 group-hover:bg-muted-foreground")} />
              </button>
            ))}
          </aside>

          <div className="relative">
            {SERVICES.map((service, index) => {
              const image = SERVICE_IMG[service.id];
              const plans = service.plans.slice(0, 3);
              return (
                <article id={`home-service-${service.id}`} key={service.id} className="relative mb-5 min-h-[68vh] overflow-hidden rounded-[28px] border border-border/60 bg-card lg:mb-8 lg:min-h-[76vh]">
                  <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-[1400ms] hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-black/35 dark:from-black/90 dark:via-black/70 dark:to-black/45" />
                  <div className="relative z-10 flex min-h-[68vh] flex-col justify-between p-7 text-white sm:p-10 lg:min-h-[76vh] lg:p-14">
                    <div className="flex items-start justify-between gap-6">
                      <span className="label-mono text-[10px] uppercase tracking-[0.25em] text-white/50">{service.num} · XR AGENCY</span>
                      <span className="label-mono rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[9px] text-white/70 backdrop-blur-md">Dès {price(service.fromEur)}{service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}</span>
                    </div>

                    <div className="max-w-5xl">
                      <p className="label-mono mb-3 text-[10px] uppercase tracking-[0.22em] text-white/45">{t(service.short)}</p>
                      <h3 className="display-serif max-w-4xl text-5xl leading-[0.9] sm:text-7xl lg:text-[8rem]">{t(service.title)}</h3>
                      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{t(service.description)}</p>

                      <div className="mt-8 grid gap-2 sm:grid-cols-3">
                        {plans.map((plan) => (
                          <div key={plan.name.fr} className="rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-md">
                            <div className="label-mono text-[9px] uppercase tracking-wider text-white/45">{t(plan.name)}</div>
                            <div className="mt-2 display-serif text-2xl">{price(plan.eur)}</div>
                            <div className="mt-1 text-[10px] text-white/45">{plan.period === "month" ? "/ mois" : plan.period === "year" ? "/ an" : "paiement unique"}</div>
                          </div>
                        ))}
                      </div>

                      <Link to="/services/$serviceId" params={{ serviceId: service.id }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-xs font-semibold text-black transition-transform hover:translate-x-1">
                        Explorer la prestation <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-4 label-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
                      <span>{index + 1} / {SERVICES.length}</span>
                      <span className="hidden sm:block">Scroll pour la suivante ↓</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
