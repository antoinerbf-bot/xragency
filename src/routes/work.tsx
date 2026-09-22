import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SHOWCASE } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PortfolioChameleon } from "@/components/site/PortfolioChameleon";

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
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-left transition-colors duration-300",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-foreground",
      )}
    >
      <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.01em]">{label}</span>
      <span
        className={cn(
          "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] tabular-nums",
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
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
        <section className="relative min-h-[78vh] overflow-hidden bg-[#090a07] text-white sm:min-h-[82vh] lg:min-h-[88vh]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(142,174,66,0.18),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(210,164,75,0.08),transparent_28%)]" />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="relative mx-auto min-h-[78vh] max-w-[1680px] sm:min-h-[82vh] lg:min-h-[88vh]">
            <div className="relative z-20 px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
              <p className="label-mono text-[10px] uppercase tracking-[0.34em] text-[#b5c968]">
                PORTFOLIO · {SHOWCASE.length}+ WORKS
              </p>
              <h1 className="display-serif mt-5 max-w-[760px] text-[4.2rem] leading-[0.82] tracking-[-0.045em] sm:text-[7rem] lg:text-[9.2rem]">
                {lang === "fr" && <>Nos<br /><span className="text-white/35">réalisations.</span></>}
                {lang === "en" && <>Our<br /><span className="text-white/35">portfolio.</span></>}
                {lang === "vi" && <>Dự án<br /><span className="text-white/35">của chúng tôi.</span></>}
              </h1>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/55 sm:text-base">
                {intro}
              </p>
            </div>

            <div className="absolute inset-0 z-10">
              <PortfolioChameleon />
            </div>

            <div className="pointer-events-none absolute bottom-8 left-5 right-5 z-20 flex items-end justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12">
              <div className="label-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                MOVE YOUR CURSOR
                <br />
                THE CREATURE IS WATCHING
              </div>
              <div className="hidden text-right label-mono text-[9px] uppercase tracking-[0.2em] text-white/35 sm:block">
                10.7411°N · 106.7011°E
                <br />
                XRAGENCY / DIGITAL CRAFT
              </div>
            </div>
          </div>
        </section>


        <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12 lg:py-16">
          <div className="sticky top-14 z-30 -mx-5 mb-8 border-y border-border bg-background/92 px-5 py-4 shadow-[0_18px_50px_-35px_hsl(var(--foreground)/0.5)] backdrop-blur-2xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:rounded-3xl lg:border lg:px-7 lg:py-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 lg:mb-6">
              <div>
                <p className="label-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {lang === "fr" ? "Explorer" : lang === "en" ? "Explore" : "Khám phá"}
                </p>
                <p className="mt-1 text-base font-medium tracking-tight sm:text-lg">{resultLabel}</p>
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

            <div className="grid gap-4 lg:grid-cols-[140px_1fr] lg:gap-10">
              <div className="pt-1">
                <p className="text-sm font-medium text-foreground">
                  {lang === "fr" ? "Secteur" : lang === "en" ? "Industry" : "Ngành"}
                </p>
                <p className="mt-1 hidden text-xs leading-5 text-muted-foreground lg:block">
                  {lang === "fr"
                    ? "Le domaine d’activité du projet."
                    : lang === "en"
                      ? "The project’s industry."
                      : "Lĩnh vực của dự án."}
                </p>
              </div>
              <ChipRow>
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
              </ChipRow>
            </div>

            <div className="mt-6 grid gap-4 border-t border-border/60 pt-6 lg:mt-8 lg:grid-cols-[140px_1fr] lg:gap-10 lg:pt-8">
              <div className="pt-1">
                <p className="text-sm font-medium text-foreground">
                  {lang === "fr" ? "Service" : lang === "en" ? "Service" : "Dịch vụ"}
                </p>
                <p className="mt-1 hidden text-xs leading-5 text-muted-foreground lg:block">
                  {lang === "fr"
                    ? "Le type de prestation réalisée."
                    : lang === "en"
                      ? "The type of work delivered."
                      : "Loại dịch vụ đã thực hiện."}
                </p>
              </div>
              <ChipRow>
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
              </ChipRow>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
              {filtered.map((item, index) => {
                const isFeature = index === 0 || (index % 5 === 0 && index > 0);
                const span = isFeature
                  ? "sm:col-span-2 lg:col-span-7"
                  : index % 3 === 1
                    ? "lg:col-span-5"
                    : "lg:col-span-4";
                const aspect = isFeature
                  ? "aspect-[16/11] sm:aspect-[16/9]"
                  : "aspect-[16/11]";

                return (
                  <article
                    key={item.id}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-all duration-500 ease-out",
                      "hover:border-primary/35 hover:shadow-[0_20px_50px_-24px_hsl(var(--foreground)/0.35)]",
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        PROJECT
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                        <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <span className="h-px w-5 bg-white/30" />
                          <span>{sectorLabel(item.sectorKey, t)}</span>
                        </div>
                        <h2
                          className={cn(
                            "display-serif mt-2 leading-[0.95]",
                            isFeature
                              ? "text-2xl sm:text-4xl lg:text-5xl"
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
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {t(item.desc)}
                        </p>
                        <p className="mt-2 label-mono text-[10px] font-semibold tracking-[0.08em] text-primary">
                          {item.metric}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="display-serif text-2xl sm:text-3xl">
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

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/20 bg-primary/[0.06] px-5 py-8 sm:mt-16 sm:flex-row sm:items-center sm:px-12 sm:py-10">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground sm:w-auto"
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
