import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, Globe2, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/notre-histoire")({
  head: () => ({
    meta: [
      { title: "Notre histoire — XR Agency" },
      { name: "description", content: "Découvrez l'histoire, la méthode et le positionnement de XR Agency : France, Asie et accompagnement digital international." },
      { property: "og:title", content: "Notre histoire — XR Agency" },
      { property: "og:description", content: "Une agence digitale indépendante entre France, Asie et international." },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/notre-histoire" }],
  }),
  component: StoryPage,
});

function StoryPage() {
  const schema = { "@context":"https://schema.org", "@type":"AboutPage", name:"Notre histoire — XR Agency", url:"https://xragencyai.com/notre-histoire", about:{"@type":"Organization",name:"XR Agency"} };
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground"><Nav/><main className="pt-28">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="border-b border-border/60 py-20 sm:py-28 lg:py-36"><div className="mx-auto max-w-7xl px-5 lg:px-10"><p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · NOTRE HISTOIRE</p><h1 className="display-serif mt-5 max-w-5xl text-[clamp(3.5rem,9vw,8rem)] leading-[.84]">France.<br/><em className="not-italic italic text-primary">Asie.</em><br/>International.</h1><p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">XR Agency accompagne les entreprises qui veulent transformer leur présence digitale en véritable outil commercial : stratégie, design, développement, visibilité et accompagnement continu.</p></div></section>
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="grid gap-5 md:grid-cols-3">
      {[[Compass,"01","Comprendre","Nous partons de votre activité, de vos clients, de votre positionnement et de vos objectifs avant de choisir les leviers."],[Sparkles,"02","Construire","Design, développement, branding, SEO et outils commerciaux sont assemblés autour d'un même parcours."],[Globe2,"03","Faire évoluer","Après la mise en ligne, WebCare, SEO, Google Maps et contenu permettent de faire progresser le dispositif dans le temps."]].map(([Icon,num,title,desc])=>{const I=Icon as typeof Compass;return <article key={String(num)} className="rounded-[1.75rem] border border-border bg-card/50 p-7"><I className="h-5 w-5 text-primary"/><span className="label-mono mt-8 block text-[9px] text-primary">{num}</span><h2 className="display-serif mt-3 text-3xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></article>})}
    </div></div></section>
    <section className="border-y border-border/60 py-16 sm:py-24"><div className="mx-auto max-w-4xl px-5 text-center"><p className="label-mono text-[10px] uppercase tracking-[.2em] text-primary">Notre système</p><h2 className="display-serif mt-4 text-4xl sm:text-6xl">Une seule équipe pour relier image, acquisition et produit.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Sites web, e-commerce, branding, SEO, visibilité locale, community management, IA et WebCare sont pensés comme des briques complémentaires. L'objectif est de construire un système cohérent plutôt qu'empiler des prestations.</p><a href="/#quote" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.14em] text-primary-foreground">Construire mon projet <ArrowRight className="h-4 w-4"/></a></div></section>
  </main><Contact/></div>;
}
