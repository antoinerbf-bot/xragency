import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "ecommerce"];
const DISPLAY_NUM: Record<string, string> = { websites: "01", branding: "02", seo: "03", maps: "04", social: "05", maintenance: "06", ecommerce: "07" };
const DISPLAY_PRICE: Record<string, number | null> = {
  websites: 499,
  branding: null,
  seo: null,
  maps: null,
  social: 499,
  maintenance: null,
  ecommerce: 1499,
};
const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=2200",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=2200",
  seo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=2200",
  maps: "https://images.unsplash.com/photo-1524666041070-9e3c7be7b8e0?auto=format&fit=crop&q=90&w=2200",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=90&w=2200",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=2200",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=90&w=2200",
};

export function HomeServices() {
  const { t, price } = useLang();
  const featured = useMemo(
    () => FEATURED_IDS.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean) as typeof SERVICES,
    [],
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById("homepage-services");
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(Math.max(0, Math.min(1, -rect.top / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const position = progress * Math.max(featured.length - 1, 1);
  const activeIndex = Math.min(featured.length - 1, Math.round(position));

  return (
    <section
      id="homepage-services"
      aria-label="Les sept expertises XR Agency"
      className="relative bg-background"
      style={{ height: `${Math.max(featured.length, 1) * 78}svh` }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[580px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,hsl(var(--primary)/0.10),transparent_42%)]" />

        <div className="absolute left-5 right-5 top-24 z-30 flex items-start justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12 lg:top-28">
          <div>
            <span className="label-mono text-[9px] uppercase tracking-[0.3em] text-primary">XR AGENCY · 07 DISCIPLINES</span>
            <h2 className="display-serif mt-3 max-w-3xl text-4xl leading-[0.88] sm:text-6xl lg:text-7xl">
              Une expertise.<br />Puis la suivante.
            </h2>
          </div>
          <div className="hidden text-right sm:block">
            <div className="label-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {String(activeIndex + 1).padStart(2, "0")} / 07
            </div>
            <div className="mt-3 h-px w-28 overflow-hidden bg-border">
              <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-0 mx-auto max-w-[1600px]">
          {featured.map((service, index) => {
            const distance = index - position;
            const abs = Math.abs(distance);
            const active = abs < 0.55;
            const scale = 1 - Math.min(abs * 0.07, 0.22);
            const opacity = abs > 1.45 ? 0 : Math.max(0.12, 1 - abs * 0.58);
            const startingPrice = DISPLAY_PRICE[service.id];

            return (
              <article
                key={service.id}
                className="absolute inset-x-5 bottom-8 top-48 origin-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-8 sm:bottom-10 sm:top-44 lg:inset-x-12 lg:bottom-12 lg:top-40"
                style={{
                  zIndex: 20 - Math.round(abs * 2),
                  opacity,
                  transform: `translate3d(${distance * 11}%, ${distance * 4}%, 0) scale(${scale})`,
                  pointerEvents: active ? "auto" : "none",
                }}
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl sm:rounded-[2.5rem]">
                  <img
                    src={SERVICE_IMG[service.id]}
                    alt=""
                    aria-hidden
                    className="absolute inset-[-5%] h-[110%] w-[110%] object-cover transition-transform duration-[1400ms]"
                    style={{ transform: `scale(${active ? 1.04 : 1.1}) translate3d(${distance * -1.5}%, ${distance * -1}%, 0)` }}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-9 lg:p-14">
                    <div className="max-w-5xl">
                      <div className="mb-4 flex items-center gap-3 label-mono text-[9px] uppercase tracking-[0.24em] text-white/45">
                        <span className="text-primary">{DISPLAY_NUM[service.id]}</span>
                        <span className="h-px w-10 bg-white/20" />
                        <span>XR AGENCY</span>
                      </div>
                      <p className="label-mono text-[9px] uppercase tracking-[0.2em] text-white/55">{t(service.short)}</p>
                      <h3 className="display-serif mt-3 max-w-4xl text-5xl leading-[0.84] text-white sm:text-7xl lg:text-[8rem]">
                        {t(service.title)}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">{t(service.description)}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link
                          to="/services/$serviceId"
                          params={{ serviceId: service.id }}
                          className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:gap-5"
                        >
                          Découvrir la prestation <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-3 label-mono text-[9px] uppercase tracking-[0.12em] text-white/60 backdrop-blur-xl">
                          {startingPrice ? `À partir de ${price(startingPrice)}${service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}` : "Sur mesure · devis après analyse"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                      <div className="flex gap-1.5">
                        {featured.map((item, dotIndex) => (
                          <span
                            key={item.id}
                            className={cn("h-1 rounded-full transition-all duration-500", dotIndex === index ? "w-10 bg-white" : "w-2 bg-white/25")}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                        {index < featured.length - 1 ? <>Scroller <ArrowDown className="h-3 w-3 animate-bounce" /></> : "Explorer l'expertise"}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
