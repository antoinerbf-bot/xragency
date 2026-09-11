import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES, PERIOD_LABEL } from "@/lib/content";
import { UI } from "@/lib/copy";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const SERVICE_IMAGES: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=88",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1800&q=88",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1800&q=88",
  maps: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1800&q=88",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1800&q=88",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=88",
  refonte: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=88",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1800&q=88",
  strategy: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=88",
};

const GROUPS = [
  { id: "all", fr: "Tout", en: "All", vi: "Tất cả" },
  { id: "web", fr: "Web & Commerce", en: "Web & Commerce", vi: "Web & Thương mại" },
  { id: "growth", fr: "Acquisition", en: "Acquisition", vi: "Tăng trưởng" },
  { id: "brand", fr: "Brand & Social", en: "Brand & Social", vi: "Thương hiệu & Social" },
  { id: "strategy", fr: "Conseil", en: "Advisory", vi: "Tư vấn" },
] as const;

const GROUP_IDS: Record<string, string[]> = {
  web: ["websites", "ecommerce", "refonte"],
  growth: ["seo", "maps", "ads"],
  brand: ["branding", "social"],
  strategy: ["maintenance", "strategy"],
};

export function ImmersiveServices() {
  const { t, lang, price } = useLang();
  const [group, setGroup] = useState("all");
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const services = useMemo(
    () => SERVICES.filter((service) => group === "all" || GROUP_IDS[group]?.includes(service.id)),
    [group],
  );

  useEffect(() => {
    setActive(0);
  }, [group]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("xr-services-immersive");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const value = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(value);
      const index = Math.min(services.length - 1, Math.floor(value * services.length));
      setActive(index);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [services.length]);

  const scrollHeight = `${Math.max(services.length * 78, 100)}vh`;

  return (
    <section id="xr-services-immersive" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-y border-border/60 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label-mono text-xs uppercase tracking-[0.22em] text-primary">{t(UI.servicesLabel)} · 2026</p>
              <h2 className="display-serif mt-3 max-w-4xl text-[clamp(2.7rem,6vw,6.2rem)] leading-[0.92]">Des prestations à <em className="text-primary not-italic italic">vivre</em>, pas à parcourir.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:pb-1">
              Une direction digitale complète : création, acquisition, image et pilotage. Chaque discipline ouvre sur une offre détaillée, ses livrables et son parcours de conversion.
            </p>
          </div>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GROUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGroup(item.id)}
                className={cn(
                  "label-mono shrink-0 rounded-full border px-4 py-2 text-[10px] uppercase tracking-widest transition-all",
                  group === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {item[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-0" style={{ minHeight: scrollHeight }}>
        <div className="sticky top-0 flex min-h-[calc(100svh-5rem)] items-center overflow-hidden py-8 lg:py-12">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
              <div className="hidden lg:block">
                <div className="label-mono text-xs text-muted-foreground">XR / DISCIPLINES</div>
                <div className="mt-5 h-px w-full bg-border" />
                <div className="mt-5 text-7xl font-light text-primary tabular-nums">{String(active + 1).padStart(2, "0")}</div>
                <div className="mt-2 label-mono text-xs text-muted-foreground">/ {String(services.length).padStart(2, "0")}</div>
                <div className="mt-10 h-32 w-px bg-border relative">
                  <div className="absolute left-0 top-0 w-px bg-primary transition-all duration-300" style={{ height: `${progress * 100}%` }} />
                </div>
                <p className="mt-8 max-w-xs text-xs leading-relaxed text-muted-foreground">Faites défiler. Le catalogue se transforme en parcours éditorial et révèle chaque expertise une à une.</p>
              </div>

              <div className="relative min-h-[64vh]">
                {services.map((service, index) => {
                  const offset = index - active;
                  const image = SERVICE_IMAGES[service.id] ?? SERVICE_IMAGES.websites;
                  const displayEur = service.id === "maps" ? 1399 : service.fromEur;
                  return (
                    <article
                      key={service.id}
                      className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                      style={{
                        opacity: Math.abs(offset) > 1 ? 0 : 1,
                        transform: `translate3d(${offset * 8}%, ${offset * 5}%, ${-Math.abs(offset) * 80}px) scale(${1 - Math.min(Math.abs(offset), 1) * 0.06})`,
                        pointerEvents: offset === 0 ? "auto" : "none",
                        zIndex: 20 - Math.abs(offset),
                      }}
                    >
                      <div className="grid h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="relative min-h-[34vh] overflow-hidden lg:min-h-[64vh]">
                          <img src={image} alt={t(service.title)} className="h-full w-full object-cover grayscale-[20%] transition-transform duration-[1600ms] hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="label-mono text-[9px] tracking-widest text-white">DISCIPLINE {service.num}</span>
                          </div>
                          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                            <div>
                              <div className="label-mono text-[9px] uppercase tracking-widest text-white/65">{t(UI.from)}</div>
                              <div className="display-serif mt-1 text-3xl">{price(displayEur)}<span className="label-mono ml-2 text-[9px] text-white/65">{t(PERIOD_LABEL[service.fromPeriod])}</span></div>
                            </div>
                            <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                              <span className="label-mono text-[9px]">{service.plans.length} OFFRES</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="label-mono text-[10px] uppercase tracking-[0.2em] text-primary">XR AGENCY / {service.num}</span>
                              <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="display-serif mt-7 text-4xl leading-[0.95] sm:text-5xl">{t(service.title)}</h3>
                            <p className="mt-3 text-sm font-medium text-primary">{t(service.short)}</p>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{t(service.description)}</p>

                            <div className="mt-7 grid gap-2 sm:grid-cols-2">
                              {service.highlights.slice(0, 4).map((highlight) => (
                                <div key={highlight.fr} className="rounded-xl border border-border/70 bg-background/50 px-3 py-2.5 text-xs text-foreground">
                                  {t(highlight)}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8 border-t border-border/70 pt-6">
                            <Link to="/services/$serviceId" params={{ serviceId: service.id }} className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:translate-x-1">
                              Explorer l'offre <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <span className="ml-4 hidden text-xs text-muted-foreground sm:inline">Détails · tarifs · livrables · méthode</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <Reveal>
          <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.04] p-7 sm:p-10 lg:p-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="label-mono text-xs uppercase tracking-widest text-primary">XR Intelligence</p>
                <h3 className="display-serif mt-3 text-3xl sm:text-5xl">Votre projet ne rentre pas dans une case ?</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Laissez le configurateur XR construire un périmètre, une combinaison de prestations et un devis interactif adaptés à votre activité.</p>
              </div>
              <Link to="/#intelligence" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline">Configurer mon projet <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
