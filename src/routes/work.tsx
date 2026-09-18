import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EyeTracker } from "@/components/site/EyeTracker";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SHOWCASE } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — XRagency." },
      {
        name: "description",
        content:
          "Portfolio XRagency. : sites, branding, SEO et projets digitaux par secteur. Filtrez par activité et service et explorez nos réalisations.",
      },
      { property: "og:title", content: "Nos réalisations — XRagency." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WorkPage,
});

const SECTOR_KEYS = [
  "all",
  "sectorLuxe",
  "sectorHotellerie",
  "sectorGastronomie",
  "sectorMode",
  "sectorBeaute",
  "sectorAuto",
  "sectorArchitecture",
  "sectorImmobilier",
  "sectorCoaching",
  "sectorArtisanat",
  "sectorSante",
  "sectorTech",
] as const;

const SERVICE_KEYS = [
  "all",
  "website",
  "ecommerce",
  "booking",
  "branding",
  "seo",
  "strategy",
  "ai",
] as const;

type ShowcaseItem = (typeof SHOWCASE)[number] & { services?: string[] };

function sectorLabel(
  key: string,
  t: (v: { fr: string; en: string; vi: string }) => string,
) {
  if (key === "all") return t(UI.showcaseAllSectors);
  const entry = UI[key as keyof typeof UI];
  if (entry && typeof entry === "object" && "fr" in entry)
    return t(entry as { fr: string; en: string; vi: string });
  return key;
}

function serviceLabel(
  key: string,
  t: (v: { fr: string; en: string; vi: string }) => string,
) {
  if (key === "all") return t(UI.showcaseAllServices);
  const map: Record<string, keyof typeof UI> = {
    website: "serviceWebsite",
    ecommerce: "serviceEcommerce",
    booking: "serviceBooking",
    branding: "serviceBranding",
    seo: "serviceSeo",
    social: "serviceSocial",
    strategy: "serviceStrategy",
    ai: "serviceAi",
    webcare: "serviceWebcare",
  };
  const k = map[key];
  if (k && UI[k]) return t(UI[k] as { fr: string; en: string; vi: string });
  return key;
}

function FilterChip({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-left transition-all duration-300",
        active
          ? "border-foreground bg-foreground text-background shadow-sm"
          : "border-border/70 bg-background/70 text-foreground/75 hover:border-foreground/25 hover:bg-card hover:text-foreground",
      )}
    >
      <span className="text-[13px] font-medium tracking-[-0.01em]">{label}</span>
      <span
        className={cn(
          "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] tabular-nums",
          active ? "bg-background/15 text-background" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function WorkPage() {
  const { t, lang } = useLang();
  const [sector, setSector] = useState<string>("all");
  const [service, setService] = useState<string>("all");

  const filtered = useMemo(() => {
    return (SHOWCASE as ShowcaseItem[]).filter((item) => {
      const sectorOk = sector === "all" || item.sectorKey === sector;
      const services = item.services ?? ["website"];
      const serviceOk = service === "all" || services.includes(service);
      return sectorOk && serviceOk;
    });
  }, [sector, service]);

  const sectorCount = useCallback((key: string) => {
    if (key === "all") return SHOWCASE.length;
    return SHOWCASE.filter((s) => s.sectorKey === key).length;
  }, []);

  const serviceCount = useCallback((key: string) => {
    if (key === "all") return SHOWCASE.length;
    return (SHOWCASE as ShowcaseItem[]).filter((s) =>
      (s.services ?? ["website"]).includes(key),
    ).length;
  }, []);

  const intro = {
    fr: "Filtrez par secteur et par service. Chaque projet montre le type de prestation et le résultat — pour vous projeter concrètement.",
    en: "Filter by industry and service. Each project shows the type of work and the result — so you can project yourself clearly.",
    vi: "Lọc theo ngành và dịch vụ. Mỗi dự án hiển thị loại dịch vụ và kết quả — để bạn hình dung rõ ràng.",
  }[lang];

  const resultLabel =
    lang === "fr"
      ? `${filtered.length} projet${filtered.length > 1 ? "s" : ""}`
      : lang === "en"
        ? `${filtered.length} project${filtered.length > 1 ? "s" : ""}`
        : `${filtered.length} dự án`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      <main className="relative z-10">
        <section className="relative min-h-[88vh] overflow-hidden pt-20 sm:pt-24">
          <div className="relative mx-auto grid min-h-[calc(88vh-5rem)] max-w-[1680px] items-center lg:grid-cols-[minmax(320px,0.9fr)_1.15fr]">
            <div className="relative z-20 px-5 pb-10 pt-8 sm:px-8 lg:px-12 lg:pb-16">
              <p className="label-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                PORTFOLIO · {SHOWCASE.length}+ WORKS
              </p>
              <h1 className="display-serif mt-5 text-5xl leading-[0.88] sm:text-7xl lg:text-[6.8rem]">
                {lang === "fr" && (
                  <>
                    Nos
                    <br />
                    réalisations.
                  </>
                )}
                {lang === "en" && (
                  <>
                    Our
                    <br />
                    portfolio.
                  </>
                )}
                {lang === "vi" && (
                  <>
                    Dự án
                    <br />
                    của chúng tôi.
                  </>
                )}
              </h1>
              <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                {intro}
              </p>
            </div>

            <div className="relative h-[52vh] min-h-[340px] w-full lg:h-[calc(88vh-5rem)]">
              <EyeTracker />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
          <div className="sticky top-16 z-30 -mx-5 mb-12 border-y border-border/60 bg-background/85 px-5 py-6 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:rounded-3xl lg:border lg:px-8 lg:py-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="label-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {lang === "fr" ? "Explorer" : lang === "en" ? "Explore" : "Khám phá"}
                </p>
                <p className="mt-1 text-lg font-medium tracking-tight">{resultLabel}</p>
              </div>
              {(sector !== "all" || service !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSector("all");
                    setService("all");
                  }}
                  className="label-mono text-[10px] uppercase tracking-[0.16em] text-primary hover:underline"
                >
                  {lang === "fr" ? "Réinitialiser" : lang === "en" ? "Reset filters" : "Đặt lại"}
                </button>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[140px_1fr] lg:gap-10">
              <div className="pt-1">
                <p className="text-sm font-medium text-foreground">
                  {lang === "fr" ? "Secteur" : lang === "en" ? "Industry" : "Ngành"}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {lang === "fr"
                    ? "Le domaine d’activité du projet."
                    : lang === "en"
                      ? "The project’s industry."
                      : "Lĩnh vực của dự án."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SECTOR_KEYS.map((key) => {
                  const count = sectorCount(key);
                  if (key !== "all" && count === 0) return null;
                  return (
                    <FilterChip
                      key={key}
                      active={sector === key}
                      label={sectorLabel(key, t)}
                      count={count}
                      onClick={() => setSector(key)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-8 border-t border-border/50 pt-8 lg:grid-cols-[140px_1fr] lg:gap-10">
              <div className="pt-1">
                <p className="text-sm font-medium text-foreground">
                  {lang === "fr" ? "Service" : lang === "en" ? "Service" : "Dịch vụ"}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {lang === "fr"
                    ? "Le type de prestation réalisée."
                    : lang === "en"
                      ? "The type of work delivered."
                      : "Loại dịch vụ đã thực hiện."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_KEYS.map((key) => {
                  const count = serviceCount(key);
                  if (key !== "all" && count === 0) return null;
                  return (
                    <FilterChip
                      key={key}
                      active={service === key}
                      label={serviceLabel(key, t)}
                      count={count}
                      onClick={() => setService(key)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
              {filtered.map((item, index) => {
                const isFeature = index === 0 || (index % 5 === 0 && index > 0);
                const span = isFeature
                  ? "sm:col-span-2 lg:col-span-7"
                  : index % 3 === 1
                    ? "lg:col-span-5"
                    : "lg:col-span-4";
                const aspect = isFeature
                  ? "aspect-[16/10] sm:aspect-[16/9]"
                  : "aspect-[16/11]";

                return (
                  <article
                    key={item.id}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 transition-all duration-500 ease-out",
                      "hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]",
                      span,
                    )}
                  >
                    <div className={cn("relative overflow-hidden", aspect)}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        PROJECT
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                        <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <span className="h-px w-5 bg-white/30" />
                          <span>{sectorLabel(item.sectorKey, t)}</span>
                        </div>
                        <h2
                          className={cn(
                            "display-serif mt-2 leading-[0.95] transition-transform duration-500 group-hover:translate-x-0.5",
                            isFeature
                              ? "text-3xl sm:text-4xl lg:text-5xl"
                              : "text-2xl sm:text-3xl",
                          )}
                        >
                          {item.name}
                        </h2>
                        <p className="mt-1.5 label-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                          {t(item.type)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between gap-3 px-4 py-4 sm:px-5">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                          {t(item.desc)}
                        </p>
                        <p className="mt-2 label-mono text-[10px] font-semibold tracking-[0.08em] text-primary">
                          {item.metric}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="display-serif text-3xl">
                {lang === "fr" && "Aucun projet pour cette combinaison."}
                {lang === "en" && "No projects match this combination."}
                {lang === "vi" && "Không có dự án phù hợp."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSector("all");
                  setService("all");
                }}
                className="mt-4 label-mono text-[10px] uppercase tracking-[0.15em] text-primary"
              >
                {t(UI.showcaseAllSectors)}
              </button>
            </div>
          )}

          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/20 bg-primary/[0.04] px-8 py-10 sm:flex-row sm:items-center sm:px-12">
            <div>
              <h3 className="display-serif text-2xl sm:text-3xl">
                {lang === "fr" && "Un projet dans votre secteur ?"}
                {lang === "en" && "A project in your industry?"}
                {lang === "vi" && "Một dự án trong ngành của bạn?"}
              </h3>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                {lang === "fr" &&
                  "On analyse votre situation et on vous propose une feuille de route claire."}
                {lang === "en" &&
                  "We review your situation and propose a clear roadmap."}
                {lang === "vi" &&
                  "Chúng tôi phân tích tình huống và đề xuất lộ trình rõ ràng."}
              </p>
            </div>
            <a
              href="/#intelligence"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {lang === "fr" && "Lancer mon analyse"}
              {lang === "en" && "Start my analysis"}
              {lang === "vi" && "Bắt đầu phân tích"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Contact />
    </div>
  );
}
