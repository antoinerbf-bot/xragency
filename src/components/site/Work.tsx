import { useMemo, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SHOWCASE } from "@/lib/content";
import { cn } from "@/lib/utils";

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

export function Work() {
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

  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-border/50 bg-background py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <header className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              PORTFOLIO · {SHOWCASE.length}+ WORKS
            </span>
            <h2 className="display-serif mt-5 max-w-4xl text-5xl leading-[0.88] sm:text-7xl lg:text-[6.5rem]">
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
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {lang === "fr" &&
                "Filtrez par secteur et par service. Chaque projet montre le type de prestation et le résultat — pour vous projeter concrètement."}
              {lang === "en" &&
                "Filter by industry and service. Each project shows the type of work and the result — so you can project yourself clearly."}
              {lang === "vi" &&
                "Lọc theo ngành và dịch vụ. Mỗi dự án hiển thị loại dịch vụ và kết quả — để bạn hình dung rõ ràng."}
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-4 lg:items-end">
            <a
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {lang === "fr" && "Voir toutes les réalisations"}
              {lang === "en" && "View full portfolio"}
              {lang === "vi" && "Xem toàn bộ dự án"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </header>

        <div className="mt-12 space-y-4 border-y border-border/60 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono mr-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {lang === "fr" ? "Secteur" : lang === "en" ? "Industry" : "Ngành"}
            </span>
            {SECTOR_KEYS.map((key) => {
              const count = sectorCount(key);
              if (key !== "all" && count === 0) return null;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSector(key)}
                  className={cn(
                    "label-mono rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300",
                    sector === key
                      ? "border-primary bg-primary font-semibold text-primary-foreground shadow-md"
                      : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {sectorLabel(key, t)}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono mr-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {lang === "fr" ? "Service" : lang === "en" ? "Service" : "Dịch vụ"}
            </span>
            {SERVICE_KEYS.map((key) => {
              const count = serviceCount(key);
              if (key !== "all" && count === 0) return null;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setService(key)}
                  className={cn(
                    "label-mono rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300",
                    service === key
                      ? "border-primary bg-primary font-semibold text-primary-foreground shadow-md"
                      : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {serviceLabel(key, t)}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
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
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.35) 100%)",
                      }}
                    />

                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      PROJECT
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                      <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-px w-5 bg-white/30" />
                        <span>{sectorLabel(item.sectorKey, t)}</span>
                      </div>
                      <h3
                        className={cn(
                          "display-serif mt-2 leading-[0.95] transition-transform duration-500 group-hover:translate-x-0.5",
                          isFeature
                            ? "text-3xl sm:text-4xl lg:text-5xl"
                            : "text-2xl sm:text-3xl",
                        )}
                      >
                        {item.name}
                      </h3>
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
          <div className="mt-12 border-y border-border/50 py-20 text-center">
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
      </div>
    </section>
  );
}
