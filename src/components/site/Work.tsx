import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = [["all", "Tout"], ["Vitrine", "Sites vitrine"], ["E-commerce", "E-commerce"], ["Branding", "Branding"], ["SaaS", "SaaS / IA"], ["Portail", "Portails"]] as const;

export function Work() {
  const { t } = useLang();
  const [sector, setSector] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => PORTFOLIO_REFERENCES.filter((item) => (sector === "all" || item.sector === sector) && (type === "all" || item.type === type)), [sector, type]);
  const visible = filtered.slice(0, 6);
  const selectedLabel = sector === "all" ? "Sélection XR" : PORTFOLIO_SECTORS.find(([key]) => key === sector)?.[1];

  return (
    <section id="work" className="relative border-t border-border/50 bg-card/20 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">{t(UI.showcaseLabel)}</span>
            <h2 className="display-serif mt-3 max-w-4xl text-4xl leading-[0.92] sm:text-6xl lg:text-7xl">Références par secteur.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Une bibliothèque compacte de références digitales réelles à explorer. Choisissez votre activité : nous montrons le niveau de finition, l'architecture et les parcours que votre projet peut viser.</p>
          </div>
          <div className="label-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 lg:text-right">20 secteurs · 60 références</div>
        </div>

        <div className="mt-10 rounded-[24px] border border-border/60 bg-background/70 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">Secteur</span>
            {sector !== "all" && <button onClick={() => setSector("all")} className="label-mono text-[9px] text-primary hover:underline">Réinitialiser</button>}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button onClick={() => setSector("all")} className={cn("label-mono shrink-0 rounded-full border px-3.5 py-2 text-[10px] transition-all", sector === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")}>Tous</button>
            {PORTFOLIO_SECTORS.map(([key, label]) => <button key={key} onClick={() => setSector(key)} className={cn("label-mono shrink-0 rounded-full border px-3.5 py-2 text-[10px] transition-all", sector === key ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")}>{label}</button>)}
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {TYPE_FILTERS.map(([key, label]) => <button key={key} onClick={() => setType(key)} className={cn("label-mono shrink-0 rounded-full px-3 py-1.5 text-[9px] transition-all", type === key ? "bg-foreground text-background" : "bg-accent/50 text-muted-foreground hover:text-foreground")}>{label}</button>)}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <span className="label-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">{selectedLabel}</span>
            <div className="mt-1 display-serif text-2xl sm:text-3xl">{sector === "all" ? "Une sélection courte, pas un catalogue." : `${filtered.length} références à explorer`}</div>
          </div>
          <span className="hidden label-mono text-[9px] text-muted-foreground/50 sm:block">Cliquez pour visiter le site réel ↗</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <a key={`${item.sector}-${item.name}`} href={item.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[22px] border border-border/60 bg-background transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={item.image} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
                  <div><span className="label-mono text-[8px] uppercase tracking-[0.18em] text-white/50">{item.type}</span><div className="mt-1 display-serif text-2xl leading-none">{item.name}</div></div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3"><span className="label-mono text-[9px] text-muted-foreground">{PORTFOLIO_SECTORS.find(([key]) => key === item.sector)?.[1]}</span><span className="label-mono flex items-center gap-1 text-[9px] text-primary">Visiter <ExternalLink className="h-3 w-3" /></span></div>
            </a>
          ))}
        </div>

        {filtered.length > visible.length && <div className="mt-7 text-center"><span className="label-mono text-[9px] text-muted-foreground/60">{filtered.length - visible.length} autres références dans cette sélection — le portfolio complet est conçu comme une bibliothèque filtrable, pas comme une page interminable.</span></div>}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-6">
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground/60">Références externes utilisées comme benchmarks visuels et UX. Elles ne sont pas présentées comme des réalisations XRAGENCY. Les liens ouvrent directement les sites officiels.</p>
          <a href="#contact" className="label-mono inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2.5 text-[10px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">Créer mon projet <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </section>
  );
}
