import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { SERVICES } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const SERVICES = ["Tous", "Vitrine", "E-commerce", "Branding", "SaaS", "Portail"] as const;

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — XR Agency" },
      { name: "description", content: "Références digitales XR Agency et inspirations par secteur : sites vitrines, e-commerce, branding, SaaS et portails." },
      { property: "og:title", content: "Nos réalisations — XR Agency" },
      { property: "og:description", content: "Explorez les projets XR Agency et des références publiques classées par secteur et prestation." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/realisations" }],
  }),
  component: WorkPage,
});

export function WorkPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const { lang, t } = useLang();
  const [service, setService] = useState("Tous");
  const serviceOptions = [{ id: "Tous", label: lang === "fr" ? "Toutes les prestations" : lang === "en" ? "All services" : "Tất cả dịch vụ" }, ...SERVICES.map((x) => ({ id: x.id, label: t(x.title) }))];
  const serviceForReference = (type: string) => type === "E-commerce" ? "ecommerce" : type === "Branding" ? "branding" : type === "SaaS" ? "ai" : "websites";
  const filtered = useMemo(() => PORTFOLIO_REFERENCES.filter((item) => {
    const q = query.toLowerCase().trim();
    return (!q || [item.name,item.sector,item.type].join(" ").toLowerCase().includes(q))
      && (sector === "all" || item.sector === sector)
      && (service === "Tous" || serviceForReference(item.type) === service);
  }), [query, sector, service]);

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav />
    <main className="pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--primary)/.16),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-5xl">
            <p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · PORTFOLIO</p>
            <h1 className="display-serif mt-5 text-[clamp(3.4rem,9vw,8rem)] leading-[.84]">Des références<br/><em className="not-italic italic text-primary">pour vous projeter.</em></h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Explorez des références réelles par secteur et par prestation. Chaque projet ouvre directement sa homepage afin de vous permettre de juger le niveau visuel, l’expérience et la direction digitale.</p>
          </div>
          <div className="mt-12 grid gap-3 rounded-[2rem] border border-border bg-card/60 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:p-5">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Rechercher une marque, un secteur..." className="w-full rounded-2xl border border-border bg-background/80 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-primary"/></div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-3 text-[10px] uppercase tracking-[.15em] text-muted-foreground"><SlidersHorizontal className="h-3.5 w-3.5 text-primary"/>{filtered.length} références</div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-10 grid gap-3 md:grid-cols-2">
            <label className="relative block">
              <span className="mb-2 block label-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">Secteur d’activité</span>
              <select value={sector} onChange={(e)=>setSector(e.target.value)} className="w-full appearance-none rounded-2xl border border-border bg-card/70 px-4 py-3.5 pr-10 text-sm outline-none focus:border-primary">
                <option value="all">Tous les secteurs</option>
                {PORTFOLIO_SECTORS.map(([id,label])=><option key={id} value={id}>{label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 bottom-4 h-4 w-4 text-muted-foreground" />
            </label>
            <label className="relative block">
              <span className="mb-2 block label-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">Prestation</span>
              <select value={service} onChange={(e)=>setService(e.target.value)} className="w-full appearance-none rounded-2xl border border-border bg-card/70 px-4 py-3.5 pr-10 text-sm outline-none focus:border-primary">
                {serviceOptions.map((x)=><option key={x.id} value={x.id}>{x.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 bottom-4 h-4 w-4 text-muted-foreground" />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {filtered.map((item,index)=>{
              const feature=index===0 || index%6===0;
              return <a key={item.name+item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/50 transition duration-700 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_35px_90px_-40px_rgba(0,0,0,.8)] ${feature?"sm:col-span-2 lg:col-span-7":"lg:col-span-5"}`}>
                <div className={`relative overflow-hidden ${feature?"aspect-[16/10]":"aspect-[16/11]"}`}>
                  <img src={item.image} alt={item.name+" — référence "+item.sector} loading={index<4?"eager":"lazy"} decoding="async" className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
                  <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2"><span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-2.5 py-1.5 label-mono text-[8px] uppercase tracking-[.12em] text-white backdrop-blur"><img src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`} alt="" className="h-4 w-4 rounded-sm" />{item.name}</span><span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[8px] uppercase tracking-[.16em] text-white backdrop-blur">{item.type}</span></div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white"><p className="label-mono text-[8px] uppercase tracking-[.2em] text-white/55">{item.sector} · {item.type}</p><div className="mt-2 flex items-end justify-between gap-4"><h2 className={feature?"display-serif text-4xl sm:text-5xl":"display-serif text-3xl"}>{item.name}</h2><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 transition group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4"/></span></div></div>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"><span className="text-xs text-muted-foreground">{item.origin==="XR Agency"?"Projet XR Agency":"Référence publique / inspiration"}</span><span className="label-mono text-[8px] uppercase tracking-[.15em] text-primary">Visiter le site ↗</span></div>
              </a>
            })}
          </div>
          {!filtered.length && <div className="py-20 text-center"><p className="display-serif text-3xl">Aucune référence pour cette sélection.</p><button onClick={()=>{setQuery("");setSector("all");setService("Tous")}} className="mt-4 text-xs text-primary">Réinitialiser</button></div>}
        </div>
      </section>
    </main>
    <Contact />
  </div>;
}
