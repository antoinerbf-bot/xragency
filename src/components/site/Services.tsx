import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Reveal, SectionHeading } from "./primitives";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ServiceIllustration } from "./ServiceIllustration";
import { cn } from "@/lib/utils";

/* ── Premium service illustrations ── */
const CORE_SERVICE_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "ecommerce"] as const;

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
          {t({ fr: "Dès", en: "From", vi: "Từ" })} {price(s.fromEur)}{s.fromPeriod === "month" ? (t({ fr: " / mois", en: " / month", vi: " / tháng" })) : s.fromPeriod === "year" ? (t({ fr: " / an", en: " / year", vi: " / năm" })) : ""}
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

  return (
    <Reveal delay={i * 35}>
      <Link
        to="/services/$serviceId"
        params={{ serviceId: s.id }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative h-36 overflow-hidden"><ServiceIllustration service={s.id} title={t(s.title)} /></div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3.5">
          <h3 className="display-serif text-base leading-tight transition-colors duration-300 group-hover:text-primary">
            {t(s.title)}
          </h3>
          <p className="mt-1.5 flex-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {t(s.short)}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
            <span className="label-mono text-[10px] font-semibold text-primary">
              {t({ fr: "Voir les formules", en: "View plans", vi: "Xem gói dịch vụ" })} →
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
              {SERVICES.filter((s) => CORE_SERVICE_IDS.includes(s.id as (typeof CORE_SERVICE_IDS)[number])).map((s) => (
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
              <ServiceIllustration service={activeService.id} title={t(activeService.title)} />

              {/* Metadata overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                <span
                  key={`num-${activeId}`}
                  className="label-mono text-[10px] text-white/40 animate-fade-up"
                >
                  {activeService.num} · {String(CORE_SERVICE_IDS.length).padStart(2, "0")}
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
                      className="label-mono rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] text-white backdrop-blur-sm"
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
                    {t({ fr: "Consulter la prestation complète", en: "View full service", vi: "Xem dịch vụ đầy đủ" })}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Progress dots — clickable */}
                <div className="mt-5 flex items-center gap-1">
                  {SERVICES.filter((s) => CORE_SERVICE_IDS.includes(s.id as (typeof CORE_SERVICE_IDS)[number])).map((s) => (
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
          {SERVICES.filter((s) => CORE_SERVICE_IDS.includes(s.id as (typeof CORE_SERVICE_IDS)[number])).map((s, i) => (
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
                {t({ fr: "Accéder au catalogue officiel des 7 offres", en: "Open the official seven-service catalogue", vi: "Mở danh mục chính thức gồm 7 dịch vụ" })} →
              </Link>
              <a
                href="#pricing"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                {t({ fr: "Grille tarifaire détaillée", en: "Detailed pricing", vi: "Bảng giá chi tiết" })} ↓
              </a>
              <a
                href="#intelligence"
                className="label-mono inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t({ fr: "Lancer mon analyse stratégique IA", en: "Launch my AI strategy analysis", vi: "Bắt đầu phân tích chiến lược AI" })}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
