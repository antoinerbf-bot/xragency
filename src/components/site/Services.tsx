import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Service photography ── */
const SERVICE_IMG: Record<string, string> = {
  websites:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1200",
  branding:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=85&w=1200",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=85&w=1200",
  maps: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=85&w=1200",
  social:
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=85&w=1200",
  maintenance:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=1200",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1200",
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=85&w=1200",
  refonte:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=85&w=1200",
  ads: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=85&w=1200",
  strategy:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
};

/* ── Desktop: single service row ── */
function ServiceRow({
  s,
  isActive,
  onHover,
}: {
  s: (typeof SERVICES)[number];
  isActive: boolean;
  onHover: () => void;
}) {
  const { t, price } = useLang();

  return (
    <Link
      to="/services/$serviceId"
      params={{ serviceId: s.id }}
      onMouseEnter={onHover}
      className={cn(
        "group relative flex items-center gap-6 px-8 py-5 transition-all duration-300",
        isActive ? "bg-foreground" : "hover:bg-accent/50",
      )}
    >
      {/* Active left bar */}
      <span
        className={cn(
          "absolute left-0 top-0 h-full w-0.5 bg-primary/30 transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Number */}
      <span
        className={cn(
          "label-mono w-8 shrink-0 tabular-nums transition-colors",
          isActive
            ? "text-background/40"
            : "text-muted-foreground/30 group-hover:text-muted-foreground/60",
        )}
      >
        {s.num}
      </span>

      {/* Title + excerpt */}
      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "display-serif text-xl leading-tight transition-colors duration-300",
            isActive ? "text-background" : "text-foreground group-hover:text-primary",
          )}
        >
          {t(s.title)}
        </h3>
        <p
          className={cn(
            "label-mono mt-1 truncate text-xs transition-colors duration-300",
            isActive ? "text-background/50" : "text-muted-foreground/70",
          )}
        >
          {t(s.short)}
        </p>
      </div>

      {/* Price + arrow */}
      <div className="flex shrink-0 items-center gap-3">
        <span
          className={cn(
            "label-mono text-xs font-semibold transition-colors",
            isActive ? "text-background/75" : "text-primary",
          )}
        >
          Dès {price(s.fromEur)}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200",
            isActive
              ? "border-background/20 text-background/50"
              : "border-border text-muted-foreground/50 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
          )}
        >
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── Mobile: compact card ── */
function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const { t, price } = useLang();
  const img = SERVICE_IMG[s.id];

  return (
    <Reveal delay={i * 35}>
      <Link
        to="/services/$serviceId"
        params={{ serviceId: s.id }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Image — compact, grayscale on idle */}
        <div className="relative h-28 overflow-hidden">
          {img && (
            <img
              src={img}
              alt={t(s.title)}
              loading="lazy"
              className="h-full w-full object-cover grayscale-[25%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="label-mono absolute left-3 top-2 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-xs text-white/90 backdrop-blur-sm">
            {s.num}
          </span>
          <span className="label-mono absolute right-3 top-2 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-sm shadow-sm">
            Dès {price(s.fromEur)}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3.5">
          <h3 className="display-serif text-base leading-tight transition-colors duration-300 group-hover:text-primary">
            {t(s.title)}
          </h3>
          <p className="mt-1.5 flex-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {t(s.short)}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
            <span className="label-mono text-xs font-semibold text-primary">
              Voir les formules →
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ── Main export ── */
export function Services() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section id="services" className="relative py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={UI.servicesLabel}
          line1={UI.servicesTitle1}
          line2={UI.servicesTitle2}
          lead={UI.servicesLead}
        />

        {/* ── Desktop: editorial split layout ── */}
        <Reveal delay={60}>
          <div className="mt-14 hidden overflow-hidden rounded-3xl border border-border/60 lg:grid lg:grid-cols-[1fr_38%]">
            {/* Left — numbered list */}
            <div className="divide-y divide-border/40 bg-card/20">
              {SERVICES.map((s) => (
                <ServiceRow
                  key={s.id}
                  s={s}
                  isActive={s.id === activeId}
                  onHover={() => setActiveId(s.id)}
                />
              ))}
            </div>

            {/* Right — crossfading image panel */}
            <div className="relative min-h-[520px] bg-foreground">
              {/* Images — crossfade */}
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    activeId === s.id ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <img
                    src={SERVICE_IMG[s.id]}
                    alt={t(s.title)}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700",
                      activeId === s.id ? "scale-100" : "scale-105",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                </div>
              ))}

              {/* Metadata overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                <span
                  key={`num-${activeId}`}
                  className="label-mono text-xs text-white/40 animate-fade-up"
                >
                  {activeService.num} · {String(SERVICES.length).padStart(2, "0")}
                </span>
                <h4
                  key={`ttl-${activeId}`}
                  className="display-serif mt-2 text-2xl text-white animate-fade-up"
                  style={{ animationDelay: "40ms" }}
                >
                  {t(activeService.title)}
                </h4>

                {/* Highlight tags */}
                <div
                  key={`tgs-${activeId}`}
                  className="mt-3 flex flex-wrap gap-1.5 animate-fade-up"
                  style={{ animationDelay: "80ms" }}
                >
                  {activeService.highlights.slice(0, 3).map((h, k) => (
                    <span
                      key={k}
                      className="label-mono rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-sm"
                    >
                      {t(h)}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="mt-5">
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: activeService.id }}
                    className="label-mono inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-xs font-semibold shadow-lg transition-all duration-200 hover:bg-white/90 hover:translate-x-0.5"
                  >
                    Consulter la prestation complète
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Progress dots — clickable */}
                <div className="mt-5 flex items-center gap-1">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveId(s.id)}
                      aria-label={t(s.title)}
                      className={cn(
                        "h-px transition-all duration-400 cursor-pointer",
                        s.id === activeId
                          ? "w-6 bg-white"
                          : "w-2 bg-white/25 hover:bg-white/55",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Mobile: compact card grid ── */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <Reveal delay={280}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t({
                fr: "Chaque projet est unique. Discutons du vôtre dès aujourd'hui.",
                en: "Every project is unique. Let's discuss yours today.",
                vi: "Mỗi dự án đều độc nhất. Hãy thảo luận về dự án của bạn ngay hôm nay.",
              })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/services"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5"
              >
                Accéder au catalogue officiel des 11 services →
              </Link>
              <a
                href="#pricing"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                Grille tarifaire détaillée ↓
              </a>
              <a
                href="#intelligence"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5"
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
