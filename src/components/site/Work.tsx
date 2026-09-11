import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = [["all", "Tout"], ["Vitrine", "Vitrine"], ["E-commerce", "E-commerce"], ["Branding", "Branding"], ["SaaS", "SaaS / IA"], ["Portail", "Portail"]] as const;

export function Work() {
  const { t } = useLang();
  const [sector, setSector] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(
    () => PORTFOLIO_REFERENCES.filter((item) => (sector === "all" || item.sector === sector) && (type === "all" || item.type === type)),
    [sector, type],
  );

  const visible = filtered.slice(0, 8);
  const selectedLabel = sector === "all" ? "Selected references" : PORTFOLIO_SECTORS.find(([key]) => key === sector)?.[1];

  return (
    <section id="work" className="relative overflow-hidden border-t border-border/50 bg-background py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <header className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">{t(UI.showcaseLabel)}</span>
            <h2 className="display-serif mt-4 max-w-5xl text-5xl leading-[0.88] sm:text-7xl lg:text-[7.5rem]">Selected projects.</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">Une sélection de références digitales par secteur et par type d'expérience. Chaque projet s'affiche comme une pièce éditoriale à explorer.</p>
            <div className="mt-5 label-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">20 secteurs · 60 références · références externes</div>
          </div>
        </header>

        <div className="mt-12 border-y border-border/60 py-5">
          <div className="flex items-center gap-5 overflow-x-auto pb-1 scrollbar-hide">
            <span className="label-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">Filter</span>
            <button onClick={() => setSector("all")} className={cn("label-mono shrink-0 text-[10px] uppercase tracking-[0.12em] transition-colors", sector === "all" ? "text-foreground" : "text-muted-foreground/50 hover:text-foreground")}>All</button>
            {PORTFOLIO_SECTORS.map(([key, label]) => (
              <button key={key} onClick={() => setSector(key)} className={cn("label-mono shrink-0 text-[10px] uppercase tracking-[0.12em] transition-colors", sector === key ? "text-primary" : "text-muted-foreground/50 hover:text-foreground")}>{label}</button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
            <span className="label-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">Format</span>
            {TYPE_FILTERS.map(([key, label]) => (
              <button key={key} onClick={() => setType(key)} className={cn("label-mono shrink-0 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] transition-all", type === key ? "border-foreground bg-foreground text-background" : "border-border/60 text-muted-foreground/60 hover:border-foreground/40 hover:text-foreground")}>{label}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-5 border-b border-border/50 pb-5">
          <div>
            <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-primary">{selectedLabel}</span>
            <p className="mt-2 display-serif text-2xl sm:text-3xl">{filtered.length} projects</p>
          </div>
          <span className="hidden label-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/40 sm:block">Click a project to visit ↗</span>
        </div>

        <div className="mt-8 space-y-20 sm:space-y-28 lg:space-y-36">
          {visible.map((item, index) => (
            <a key={`${item.sector}-${item.name}`} href={item.url} target="_blank" rel="noreferrer" className="group block">
              <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className={cn("lg:col-span-9", index % 3 === 1 && "lg:col-start-2")}>
                  <div className="relative aspect-[16/9] overflow-hidden bg-card">
                    <img src={item.image} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover grayscale-[12%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035] group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                    <div className="absolute left-5 top-5 label-mono text-[9px] uppercase tracking-[0.2em] text-white/65 sm:left-7 sm:top-7">{String(index + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</div>
                    <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-black sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"><ArrowUpRight className="h-5 w-5" /></div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 label-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">
                    <span>{PORTFOLIO_SECTORS.find(([key]) => key === item.sector)?.[1]}</span>
                    <span>·</span>
                    <span>{item.type}</span>
                  </div>
                  <h3 className="display-serif mt-3 text-4xl leading-[0.9] transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">{item.name}</h3>
                  <div className="mt-5 flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.15em] text-primary">View project <ExternalLink className="h-3 w-3" /></div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length > visible.length && (
          <div className="mt-16 text-center">
            <span className="label-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50">+ {filtered.length - visible.length} other references in this selection</span>
          </div>
        )}

        <div className="mt-20 border-t border-border/50 pt-7 sm:mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground/55">Références externes utilisées comme benchmarks visuels et UX. Elles ne sont pas présentées comme des réalisations XRAGENCY. Les liens ouvrent directement les sites officiels.</p>
            <a href="#contact" className="label-mono inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-primary transition-transform hover:translate-x-1">Start a project <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
