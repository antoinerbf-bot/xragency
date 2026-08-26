import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PERIOD_LABEL, SERVICES } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";
import { ArrowRight, Sparkles, Check } from "lucide-react";

/* ── Illustration per service ── */
const SERVICE_IMG: Record<string, string> = {
  websites:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=800",
  branding:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=85&w=800",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=85&w=800",
  maps: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=85&w=800",
  social:
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=85&w=800",
  maintenance:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=800",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=800",
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=85&w=800",
  refonte:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=85&w=800",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=85&w=800",
  strategy:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=800",
};

/* ── Subtle accent per service ── */
const ACCENT_GRADIENT: Record<string, string> = {
  websites: "linear-gradient(135deg, oklch(0.18 0 0 / 0.04) 0%, transparent 60%)",
  branding: "linear-gradient(135deg, oklch(0.35 0.04 260 / 0.06) 0%, transparent 60%)",
  seo: "linear-gradient(135deg, oklch(0.55 0.08 162 / 0.06) 0%, transparent 60%)",
  maps: "linear-gradient(135deg, oklch(0.50 0.10 264 / 0.06) 0%, transparent 60%)",
  social: "linear-gradient(135deg, oklch(0.65 0.12 303 / 0.06) 0%, transparent 60%)",
  maintenance: "linear-gradient(135deg, oklch(0.45 0.06 22 / 0.06) 0%, transparent 60%)",
  ai: "linear-gradient(135deg, oklch(0.60 0.10 70 / 0.06) 0%, transparent 60%)",
  ecommerce: "linear-gradient(135deg, oklch(0.50 0.08 330 / 0.06) 0%, transparent 60%)",
  refonte: "linear-gradient(135deg, oklch(0.40 0.06 200 / 0.06) 0%, transparent 60%)",
  ads: "linear-gradient(135deg, oklch(0.55 0.10 50 / 0.06) 0%, transparent 60%)",
  strategy: "linear-gradient(135deg, oklch(0.45 0.06 280 / 0.06) 0%, transparent 60%)",
};

export function Services() {
  const { t, price } = useLang();

  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={UI.servicesLabel}
          line1={UI.servicesTitle1}
          line2={UI.servicesTitle2}
          lead={UI.servicesLead}
        />

        {/* ── Premium card grid ── */}
        <div className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const bg = ACCENT_GRADIENT[s.id] ?? "transparent";
            const img = SERVICE_IMG[s.id];
            const startingPriceFormatted = price(s.fromEur);
            const periodText = t(PERIOD_LABEL[s.fromPeriod]);

            return (
              <Reveal key={s.id} delay={i * 50}>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: s.id }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-2xl"
                  style={{ background: bg }}
                >
                  {/* Illustration */}
                  {img ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={img}
                        alt={t(s.title)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                      
                      {/* Service number badge */}
                      <span className="label-mono absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] text-white backdrop-blur-md">
                        {s.num}
                      </span>
                      
                      {/* Price badge directly visible on card */}
                      <span className="label-mono absolute right-4 top-4 rounded-full border border-primary/50 bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md shadow-md">
                        Dès {startingPriceFormatted} <span className="text-[10px] font-normal text-muted-foreground">{s.fromPeriod !== "once" ? (s.fromPeriod === "month" ? "/m" : "/an") : ""}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/10] items-center justify-center border-b border-border/40">
                      <span className="display-serif text-6xl text-muted-foreground/20">
                        {s.num}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display-serif text-xl transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                      {t(s.title)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t(s.short)}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {s.highlights.slice(0, 3).map((h, k) => (
                          <li
                            key={k}
                            className="label-mono rounded-full border border-border/80 bg-accent/20 px-2.5 py-1 text-[9px] text-muted-foreground"
                          >
                            {t(h)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="label-mono text-[11px] font-semibold text-primary transition-colors duration-300">
                        Découvrir les formules →
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={SERVICES.length * 50}>
          <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-20">
            <p className="text-sm text-muted-foreground">
              {t({
                fr: "Chaque projet est unique. Discutons du vôtre dès aujourd'hui.",
                en: "Every project is unique. Let's discuss yours today.",
                vi: "Mỗi dự án đều độc nhất. Hãy thảo luận về dự án của bạn ngay hôm nay.",
              })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Consulter la grille tarifaire complète ↓
              </a>
              <a
                href="#intelligence"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Lancer mon analyse stratégique IA
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
