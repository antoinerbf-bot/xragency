import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Search, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = [["all", "Tout"], ["Vitrine", "Vitrine"], ["E-commerce", "E-commerce"], ["SaaS", "SaaS / IA"], ["Portail", "Portail"]] as const;

export function Work() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [type, setType] = useState("all");

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = useMemo(() => PORTFOLIO_REFERENCES.filter((item) => {
    const sectorLabel = PORTFOLIO_SECTORS.find(([key]) => key === item.sector)?.[1] ?? "";
    const matchesQuery = !normalizedQuery || `${item.name} ${sectorLabel} ${item.type}`.toLocaleLowerCase().includes(normalizedQuery);
    return matchesQuery && (sector === "all" || item.sector === sector) && (type === "all" || item.type === type);
  }), [normalizedQuery, sector, type]);

  const visible = filtered.slice(0, sector !== "all" || normalizedQuery ? 3 : 6);
  const selectedLabel = sector === "all" ? "References by industry" : PORTFOLIO_SECTORS.find(([key]) => key === sector)?.[1];
  const hasFilter = Boolean(query || sector !== "all" || type !== "all");
  const clearFilters = () => { setQuery(""); setSector("all"); setType("all"); };

  return (
    <section id="work" className="relative overflow-hidden border-t border-border/50 bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <header className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">{t(UI.showcaseLabel)}</span>
            <h2 className="display-serif mt-4 max-w-5xl text-5xl leading-[0.88] sm:text-7xl lg:text-[7.5rem]">Selected references.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:pb-2">Entrez votre secteur. Nous vous montrons immédiatement des références digitales dans le même univers — leur vraie homepage, en grand, à explorer.</p>
        </header>

        <div className="mt-10 border-y border-border/60 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-xl">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Votre secteur d'activité — ex. restaurant, immobilier, hôtel…" className="h-11 w-full border-0 border-b border-border/60 bg-transparent pl-7 pr-8 text-sm outline-none placeholder:text-muted-foreground/35 focus:border-primary" />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground"><X className="h-4 w-4" /></button>}
            </label>
            <div className="label-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/45">20 secteurs · 60 références · previews live</div>
          </div>

          <div className="mt-5 flex items-center gap-5 overflow-x-auto pb-1 scrollbar-hide">
            <span className="label-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">Secteur</span>
            <button type="button" onClick={() => setSector("all")} className={cn("label-mono shrink-0 text-[10px] uppercase tracking-[0.12em] transition-colors", sector === "all" ? "text-primary" : "text-muted-foreground/50 hover:text-foreground")}>Tous</button>
            {PORTFOLIO_SECTORS.map(([key, label]) => <button type="button" key={key} onClick={() => setSector(key)} className={cn("label-mono shrink-0 text-[10px] uppercase tracking-[0.12em] transition-colors", sector === key ? "text-primary" : "text-muted-foreground/50 hover:text-foreground")}>{label}</button>)}
          </div>

          <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <span className="label-mono shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">Format</span>
            {TYPE_FILTERS.map(([key, label]) => <button type="button" key={key} onClick={() => setType(key)} className={cn("label-mono shrink-0 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] transition-all", type === key ? "border-foreground bg-foreground text-background" : "border-border/60 text-muted-foreground/60 hover:border-foreground/40 hover:text-foreground")}>{label}</button>)}
            {hasFilter && <button type="button" onClick={clearFilters} className="label-mono ml-auto shrink-0 text-[9px] uppercase tracking-[0.15em] text-primary">Reset</button>}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-5">
          <div><span className="label-mono text-[9px] uppercase tracking-[0.2em] text-primary">{selectedLabel}</span><p className="mt-2 display-serif text-2xl sm:text-3xl">{filtered.length} references</p></div>
          <span className="hidden label-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/40 sm:block">Drag / scroll to explore →</span>
        </div>

        {visible.length > 0 ? <div className="mt-7 -mx-5 overflow-x-auto px-5 pb-8 scrollbar-hide sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12" style={{ scrollSnapType: "x mandatory" }}>
          <div className="flex w-max gap-5 lg:gap-7">
            {visible.map((item, index) => <a key={`${item.sector}-${item.name}-${index}`} href={item.url} target="_blank" rel="noreferrer" className="group block w-[82vw] max-w-[920px] shrink-0 snap-start lg:w-[62vw]">
              <div className="relative aspect-[16/9] overflow-hidden bg-card">
                <img src={item.image} alt={`${item.name} homepage`} loading={index < 2 ? "eager" : "lazy"} className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
                <div className="absolute left-5 top-5 flex items-center gap-3 label-mono text-[9px] uppercase tracking-[0.2em] text-white/70 sm:left-7 sm:top-7"><span>{String(index + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span><span className="h-px w-8 bg-white/30" /><span>{PORTFOLIO_SECTORS.find(([key]) => key === item.sector)?.[1]}</span></div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 text-white sm:bottom-7 sm:left-7 sm:right-7"><div><div className="label-mono text-[9px] uppercase tracking-[0.15em] text-white/55">{item.type} · live homepage preview</div><h3 className="display-serif mt-2 text-4xl leading-[0.9] sm:text-6xl">{item.name}</h3></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-black sm:h-14 sm:w-14"><ArrowUpRight className="h-5 w-5" /></span></div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1"><span className="label-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/45">Reference · {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span><span className="hidden items-center gap-2 label-mono text-[9px] uppercase tracking-[0.15em] text-primary sm:flex">Visit site <ExternalLink className="h-3 w-3" /></span></div>
            </a>)}
          </div>
        </div> : <div className="mt-7 border-y border-border/50 py-20 text-center"><p className="display-serif text-3xl">Aucune référence trouvée.</p><button type="button" onClick={clearFilters} className="mt-4 label-mono text-[10px] uppercase tracking-[0.15em] text-primary">Voir tous les secteurs</button></div>}

        <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-5"><p className="max-w-2xl text-[10px] leading-relaxed text-muted-foreground/45">Références externes utilisées pour montrer des directions créatives et UX. Elles ne sont pas présentées comme des réalisations XRAGENCY. Les liens ouvrent les sites officiels.</p><span className="hidden label-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/35 sm:block">Scroll to explore</span></div>
      </div>
    </section>
  );
}
