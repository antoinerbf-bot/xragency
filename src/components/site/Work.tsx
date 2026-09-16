import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SHOWCASE } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EyeTracker } from "./EyeTracker";

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

export function Work() {
  const { t, lang } = useLang();
  const [sector, setSector] = useState<string>("all");

  const filtered = useMemo(() => {
    if (sector === "all") return SHOWCASE;
    return SHOWCASE.filter((item) => item.sectorKey === sector);
  }, [sector]);

  const sectorLabel = (key: string) => {
    if (key === "all") return t(UI.showcaseAllSectors);
    const entry = UI[key as keyof typeof UI];
    if (entry && typeof entry === "object" && "fr" in entry) return t(entry as { fr: string; en: string; vi: string });
    return key;
  };

  return (
    <section id="work" className="relative overflow-hidden border-t border-border/50 bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Qbenix-style hero header */}
        <header className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              PORTFOLIO · {SHOWCASE.length}+ WORKS
            </span>
            <h2 className="display-serif mt-5 max-w-4xl text-5xl leading-[0.88] sm:text-7xl lg:text-[6.5rem]">
              Our portfolio.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {lang === "fr" &&
                "Choisissez votre secteur d'activité et explorez des projets cohérents avec votre métier. Chaque carte montre le type de prestation et le résultat obtenu."}
              {lang === "en" &&
                "Choose your industry and explore projects relevant to your business. Each card shows the type of work and the result delivered."}
              {lang === "vi" &&
                "Chọn lĩnh vực hoạt động và khám phá các dự án phù hợp với ngành của bạn. Mỗi thẻ hiển thị loại dịch vụ và kết quả đạt được."}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <EyeTracker />
          </div>
        </header>

        {/* Sector filters — playful for the prospect */}
        <div className="mt-12 flex flex-wrap gap-2 border-y border-border/60 py-5">
          {SECTOR_KEYS.map((key) => {
            const count =
              key === "all" ? SHOWCASE.length : SHOWCASE.filter((s) => s.sectorKey === key).length;
            if (key !== "all" && count === 0) return null;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSector(key)}
                className={cn(
                  "label-mono rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300",
                  sector === key
                    ? "border-primary bg-primary text-primary-foreground font-semibold shadow-md"
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {sectorLabel(key)}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Project grid — Qbenix card language */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Tag like Qbenix CONCEPT */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    PROJECT
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-white/30" />
                      <span>{sectorLabel(item.sectorKey)}</span>
                    </div>
                    <h3 className="display-serif mt-2 text-2xl leading-tight sm:text-3xl">{item.name}</h3>
                    <p className="mt-1 label-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                      {t(item.type)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <div>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {t(item.desc)}
                    </p>
                    <p className="mt-2 label-mono text-[10px] font-semibold tracking-[0.08em] text-primary">
                      {item.metric}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 border-y border-border/50 py-20 text-center">
            <p className="display-serif text-3xl">
              {lang === "fr" && "Aucun projet dans ce secteur."}
              {lang === "en" && "No projects in this sector."}
              {lang === "vi" && "Không có dự án trong lĩnh vực này."}
            </p>
            <button
              type="button"
              onClick={() => setSector("all")}
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
