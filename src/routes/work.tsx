import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
          "Portfolio XRagency. : sites, branding, SEO et projets digitaux par secteur. Filtrez par activité et explorez nos réalisations.",
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

function WorkPage() {
  const { t, lang } = useLang();
  const [sector, setSector] = useState<string>("all");

  const filtered = useMemo(() => {
    if (sector === "all") return SHOWCASE;
    return SHOWCASE.filter((item) => item.sectorKey === sector);
  }, [sector]);

  const sectorLabel = (key: string) => {
    if (key === "all") return t(UI.showcaseAllSectors);
    const entry = UI[key as keyof typeof UI];
    if (entry && typeof entry === "object" && "fr" in entry) {
      return t(entry as { fr: string; en: string; vi: string });
    }
    return key;
  };

  const intro = {
    fr: "Choisissez votre secteur d'activité. Chaque projet montre le type de prestation et le résultat — pour vous projeter concrètement.",
    en: "Choose your industry. Each project shows the type of work and the result — so you can project yourself clearly.",
    vi: "Chọn lĩnh vực của bạn. Mỗi dự án hiển thị loại dịch vụ và kết quả — để bạn hình dung rõ ràng.",
  }[lang];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      <main className="relative z-10">
        {/* ── Hero exactly like qbenix portfolio: title + gecko ── */}
        <section className="relative min-h-[85vh] overflow-hidden border-b border-border/40 pt-24 sm:pt-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 70% 40%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 92%, #111) 100%)",
            }}
          />

          <div className="relative mx-auto grid min-h-[calc(85vh-6rem)] max-w-[1600px] items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:px-12 lg:pb-20">
            <div className="order-2 lg:order-1">
              <p className="label-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                PORTFOLIO · {SHOWCASE.length}+ WORKS
              </p>
              <h1 className="display-serif mt-5 text-5xl leading-[0.88] sm:text-7xl lg:text-[7rem]">
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

            {/* Gecko — large, right side like qbenix */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end lg:pr-4">
              <div className="w-full max-w-[520px] lg:max-w-none lg:w-[95%]">
                <EyeTracker />
              </div>
            </div>
          </div>
        </section>

        {/* ── Filters + grid ── */}
        <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-wrap gap-2 border-y border-border/60 py-5">
            {SECTOR_KEYS.map((key) => {
              const count =
                key === "all"
                  ? SHOWCASE.length
                  : SHOWCASE.filter((s) => s.sectorKey === key).length;
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
                  {sectorLabel(key)}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item, index) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading={index < 4 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/45 px-3 py-1 label-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      PROJECT
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-px w-6 bg-white/25" />
                        <span>{sectorLabel(item.sectorKey)}</span>
                      </div>
                      <h2 className="display-serif mt-2 text-2xl leading-tight sm:text-3xl">
                        {item.name}
                      </h2>
                      <p className="mt-1 label-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                        {t(item.type)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-3 px-4 py-4">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {t(item.desc)}
                      </p>
                      <p className="mt-2 label-mono text-[10px] font-semibold tracking-[0.08em] text-primary">
                        {item.metric}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 py-16 text-center">
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
            <Link
              to="/"
              hash="intelligence"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            >
              {lang === "fr" && "Lancer mon analyse"}
              {lang === "en" && "Start my analysis"}
              {lang === "vi" && "Bắt đầu phân tích"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Contact />
    </div>
  );
}
