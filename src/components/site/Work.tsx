import { useState, useMemo } from "react";
import { Sparkles, Star, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SHOWCASE } from "@/lib/content";
import { Reveal, SectionHeading, EmberButton } from "./primitives";
import { cn } from "@/lib/utils";

const SECTOR_ORDER = [
  "sectorLuxe",
  "sectorHotellerie",
  "sectorGastronomie",
  "sectorAuto",
  "sectorImmobilier",
  "sectorSante",
  "sectorBeaute",
  "sectorArchitecture",
  "sectorTech",
  "sectorCoaching",
  "sectorMode",
  "sectorArtisanat",
] as const;

/* ── Service-type filter keys ── */
const SERVICE_FILTERS: { key: string; label: { fr: string; en: string; vi: string } }[] = [
  { key: "vitrine", label: { fr: "Site vitrine", en: "Showcase", vi: "Giới thiệu" } },
  { key: "ecommerce", label: { fr: "E-commerce", en: "E-commerce", vi: "TMĐT" } },
  { key: "refonte", label: { fr: "Refonte", en: "Redesign", vi: "Thiết kế lại" } },
  { key: "seo", label: { fr: "SEO", en: "SEO", vi: "SEO" } },
  { key: "branding", label: { fr: "Branding", en: "Branding", vi: "Branding" } },
  { key: "ia", label: { fr: "IA", en: "AI", vi: "AI" } },
];

/* ── Map type text to service filter keys ── */
function getServiceTags(type: { fr: string; en: string; vi: string }): string[] {
  const fr = type.fr.toLowerCase();
  const tags: string[] = [];
  if (fr.includes("e-commerce") || fr.includes("boutique")) tags.push("ecommerce");
  else if (fr.includes("site vitrine") || fr.includes("portfolio") || fr.includes("portail")) tags.push("vitrine");
  if (fr.includes("refonte")) tags.push("refonte");
  if (fr.includes("seo")) tags.push("seo");
  if (fr.includes("branding") || fr.includes("identité")) tags.push("branding");
  if (fr.includes("ia") || fr.includes("saas") || fr.includes("dashboard")) tags.push("ia");
  if (tags.length === 0) tags.push("vitrine");
  return tags;
}

export function Work() {
  const { t } = useLang();
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  const sectors = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of SHOWCASE) {
      map.set(s.sectorKey, (map.get(s.sectorKey) ?? 0) + 1);
    }
    return SECTOR_ORDER.filter((k) => map.has(k)).map((k) => ({ key: k, count: map.get(k) ?? 0 }));
  }, []);

  const serviceTagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of SHOWCASE) {
      for (const tag of getServiceTags(s.type)) {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      }
    }
    return SERVICE_FILTERS.filter((f) => map.has(f.key)).map((f) => ({ key: f.key, label: f.label, count: map.get(f.key) ?? 0 }));
  }, []);

  const filtered = useMemo(() => {
    let items = SHOWCASE;
    if (activeSector) {
      items = items.filter((s) => s.sectorKey === activeSector);
    }
    if (activeService) {
      items = items.filter((s) => getServiceTags(s.type).includes(activeService));
    }
    return items;
  }, [activeSector, activeService]);

  return (
    <section id="work" className="relative py-16 sm:py-24 lg:py-36">
      {/* Ambient background grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-refined" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section heading */}
        <SectionHeading
          label={UI.showcaseLabel}
          line1={UI.showcaseTitle1}
          line2={UI.showcaseTitle2}
          lead={UI.showcaseLead}
        />

        {/* Service type filter pills */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveService(null)}
              className={cn(
                "label-mono rounded-full border px-4 py-2 text-xs transition-all duration-300",
                !activeService
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {t({ fr: "Tous les services", en: "All services", vi: "Tất cả dịch vụ" })}
            </button>
            {serviceTagCounts.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveService(activeService === key ? null : key)}
                className={cn(
                  "label-mono rounded-full border px-4 py-2 text-xs transition-all duration-300",
                  activeService === key
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {t(label)}
                <span className="ml-1.5 opacity-50">{count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Sector filter pills */}
        <Reveal delay={120}>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSector(null)}
              className={cn(
                "label-mono rounded-full border px-4 py-2 text-xs transition-all duration-300",
                !activeSector
                  ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                  : "border-border/60 text-muted-foreground/70 hover:border-primary/30 hover:text-foreground",
              )}
            >
              {t(UI.showcaseAllSectors)}
            </button>
            {sectors.map(({ key, count }) => (
              <button
                key={key}
                onClick={() => setActiveSector(activeSector === key ? null : key)}
                className={cn(
                  "label-mono rounded-full border px-4 py-2 text-xs transition-all duration-300",
                  activeSector === key
                    ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                    : "border-border/60 text-muted-foreground/70 hover:border-primary/30 hover:text-foreground",
                )}
              >
                {t(UI[key as keyof typeof UI])}
                <span className="ml-1.5 opacity-50">{count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Showcase grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <ShowcaseCard item={item} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Reveal delay={100}>
            <p className="mt-12 text-center text-sm text-muted-foreground">
              {t({
                fr: "Aucun projet ne correspond à ces filtres.",
                en: "No projects match these filters.",
                vi: "Không có dự án nào phù hợp với bộ lọc này.",
              })}
            </p>
          </Reveal>
        ) : null}

        {/* Bottom disclaimer */}
        <Reveal delay={200}>
          <p className="mt-10 text-center text-[11px] leading-relaxed text-muted-foreground/60 italic max-w-2xl mx-auto">
            {t(UI.showcaseDisclaimer)}
          </p>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={260}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t({
                fr: "Votre secteur n'est pas listé ? Chaque projet est unique.",
                en: "Your sector isn't listed? Every project is unique.",
                vi: "Lĩnh vực của bạn không có trong danh sách? Mỗi dự án đều độc nhất.",
              })}
            </p>
            <EmberButton href="#contact" variant="outline">
              <Sparkles className="h-4 w-4" />
              {t({
                fr: "Demander une étude personnalisée",
                en: "Request a custom study",
                vi: "Yêu cầu nghiên cứu tùy chỉnh",
              })}
            </EmberButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Individual Showcase Card ── */
function ShowcaseCard({ item }: { item: (typeof SHOWCASE)[number] }) {
  const { t } = useLang();

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
    >
      {/* Image with parallax-like hover zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Sector badge */}
        <span className="label-mono absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] text-white backdrop-blur-md">
          {t(UI[item.sectorKey as keyof typeof UI])}
        </span>

        {/* Visit Website button — appears on hover */}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="label-mono absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] text-white/90 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-white/25"
        >
          Visit Website
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-serif text-xl transition-colors duration-300 group-hover:text-primary">
            {item.name}
          </h3>
          <span className="label-mono shrink-0 rounded-full border border-border/60 px-2.5 py-0.5 text-[9px] text-muted-foreground/60">
            {t(item.type)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t(item.desc)}
        </p>

        {/* Metric + Visit Website */}
        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="label-mono text-xs font-semibold text-primary">{item.metric}</span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="label-mono flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-primary"
          >
            Visit Website
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Testimonials ── */
export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={UI.trustLabel} line1={UI.trustTitle1} line2={UI.trustTitle2} />

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {t(UI.trustSubtitle)}
            </p>

            {/* Placeholder cards for future testimonials */}
            <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/40 p-10 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                    <Star className="h-5 w-5 text-primary/30" />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/50">
                    {i === 0
                      ? t({ fr: "Étude de cas à venir", en: "Case study coming soon", vi: "Sắp có nghiên cứu" })
                      : i === 1
                        ? t({ fr: "Témoignage client", en: "Client testimonial", vi: "Nhận xét khách hàng" })
                        : t({ fr: "Retour d'expérience", en: "Client feedback", vi: "Phản hồi khách hàng" })}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-[11px] leading-relaxed text-muted-foreground/50 italic max-w-lg">
              {t({
                fr: "Les témoignages et études de cas présentés seront mis à jour progressivement avec l'autorisation de nos clients.",
                en: "Testimonials and case studies will be progressively updated with our clients' permission.",
                vi: "Các đánh giá và nghiên cứu tình sẽ được cập nhật dần với sự cho phép của khách hàng.",
              })}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
