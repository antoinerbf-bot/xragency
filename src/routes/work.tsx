import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";

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
      { link: "canonical", href: "https://xragencyai.com/realisations" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [service, setService] = useState("Tous");
  const filtered = useMemo(() => PORTFOLIO_REFERENCES.filter((item) => {
    const q = query.toLowerCase().trim();
    return (!q || [item.name,item.sector,item.type].join(" ").toLowerCase().includes(q))
      && (sector === "all" || item.sector === sector)
      && (service === "Tous" || item.type === service);
  }), [query, sector, service]);

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav />
    <main className="pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--primary)/.16),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-5xl">
            <p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · PORTFOLIO</p>
            <h1 className="display-serif mt-5 text-[clamp(3.4rem,9vw,8rem)] leading-[.84]">Des expériences<br/><em className="not-italic italic text-primary">qui donnent envie d'entrer.</em></h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Sélectionnez votre secteur et la prestation qui vous intéresse pour voir des références cohérentes. Chaque carte ouvre le site correspondant dans un nouvel onglet.</p>
          </div>
          <div className="mt-12 grid gap-3 rounded-[2rem] border border-border bg-card/60 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:p-5">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Rechercher une marque, un secteur..." className="w-full rounded-2xl border border-border bg-background/80 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-primary"/></div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-3 text-[10px] uppercase tracking-[.15em] text-muted-foreground"><SlidersHorizontal className="h-3.5 w-3.5 text-primary"/>{filtered.length} références</div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8 flex flex-wrap gap-2">
            <button onClick={()=>setSector("all")} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${sector==="all"?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:border-primary/40"}`}>Tous les secteurs</button>
            {PORTFOLIO_SECTORS.map(([id,label])=><button key={id} onClick={()=>setSector(id)} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${sector===id?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:border-primary/40"}`}>{label}</button>)}
          </div>
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
            {SERVICES.map(x=><button key={x} onClick={()=>setService(x)} className={`shrink-0 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${service===x?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:border-primary/40"}`}>{x}</button>)}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {filtered.map((item,index)=>{
              const feature=index===0 || index%6===0;
              return <a key={item.name+item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/50 transition duration-700 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_35px_90px_-40px_rgba(0,0,0,.8)] ${feature?"sm:col-span-2 lg:col-span-7":"lg:col-span-5"}`}>
                <div className={`relative overflow-hidden ${feature?"aspect-[16/10]":"aspect-[16/11]"}`}>
                  <img src={item.image} alt={item.name+" — référence "+item.sector} loading={index<4?"eager":"lazy"} decoding="async" className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2"><span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[8px] uppercase tracking-[.16em] text-white backdrop-blur">{item.origin}</span><span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 label-mono text-[8px] uppercase tracking-[.16em] text-white backdrop-blur">{item.type}</span></div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white"><p className="label-mono text-[8px] uppercase tracking-[.2em] text-white/55">{item.sector}</p><div className="mt-2 flex items-end justify-between gap-4"><h2 className={feature?"display-serif text-4xl sm:text-5xl":"display-serif text-3xl"}>{item.name}</h2><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 transition group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4"/></span></div></div>
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
