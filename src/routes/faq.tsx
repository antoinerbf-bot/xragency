import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { FAQ } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — XR Agency" },
      { name: "description", content: "Questions fréquentes sur les sites web, SEO, Google Maps, WebCare, branding et accompagnement XR Agency." },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query,setQuery]=useState("");
  const items=useMemo(()=>FAQ.filter(x=>{const q=query.toLowerCase();return !q||x.q.fr.toLowerCase().includes(q)||x.a.fr.toLowerCase().includes(q)}),[query]);
  const schema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: FAQ.map(item => ({ "@type":"Question", name:item.q.fr, acceptedAnswer:{ "@type":"Answer", text:item.a.fr } })) };
  return <div className="min-h-screen bg-background text-foreground"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Nav/><main className="pt-28"><section className="border-b border-border/60 py-20 sm:py-28"><div className="mx-auto max-w-5xl px-5 lg:px-10"><p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · FAQ</p><h1 className="display-serif mt-5 text-[clamp(3.5rem,8vw,7rem)] leading-[.86]">Les questions<br/><em className="not-italic italic text-primary">que l'on nous pose.</em></h1><div className="relative mt-10 max-w-2xl"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher une question..." className="w-full rounded-2xl border border-border bg-card px-11 py-4 text-sm outline-none focus:border-primary"/></div></div></section><section className="py-14 sm:py-20"><div className="mx-auto max-w-4xl px-5 lg:px-10"><div className="space-y-3">{items.map((item,i)=><details key={i} className="group rounded-2xl border border-border bg-card/50 p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium"><span>{item.q.fr}</span><Plus className="h-4 w-4 shrink-0 text-primary transition group-open:rotate-45"/></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{item.a.fr}</p></details>)}</div></div></section></main><Contact/></div>;
}
