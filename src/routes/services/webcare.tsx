import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, LifeBuoy, ShieldCheck, Sparkles, Wrench, ServerCog } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Parallax } from "@/components/site/primitives";
import { XR_PHOTOS } from "@/lib/photography";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/services/webcare")({
  head: () => ({
    meta: [
      { title: "WebCare — Maintenance, sécurité & infrastructure | XR Agency" },
      { name: "description", content: "WebCare XR Agency : corrections, évolutions et suivi du site. Infrastructure annuelle à 79 € avec hébergement, nom de domaine et sécurité gérés par XR Agency." },
      { property: "og:title", content: "WebCare — XR Agency" },
      { property: "og:description", content: "Maintenance et infrastructure web claires, avec offres mensuelles et infrastructure annuelle à 79 €." },
    ],
  }),
  component: WebCarePage,
});

const plans = [
  { name: "Essentiel", price: 29, badge: "Pour les corrections courantes", features: ["4 modifications / mois", "Corrections de contenu et visuels", "Interventions techniques courantes", "Suivi standard", "Demandes regroupées et traitées au fil du mois"] },
  { name: "Business", price: 49, badge: "Pour faire évoluer le site régulièrement", features: ["10 modifications / mois", "Corrections de contenu, visuels et sections", "Interventions techniques courantes", "Priorité de traitement", "Conseils d'évolution courante"] },
  { name: "Unlimited", price: 99, badge: "Pour déléguer le quotidien", features: ["Modifications courantes illimitées dans le périmètre du site", "Corrections de contenu, visuels et sections", "Suivi technique prioritaire", "Petites évolutions incluses", "Refontes, fonctionnalités majeures et développements spécifiques sur devis"] },
];

function WebCarePage() {
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav />
    <main className="pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,hsl(var(--primary)/.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="max-w-4xl lg:col-span-7">
            <span className="label-mono text-[10px] uppercase tracking-[0.25em] text-primary">XR AGENCY · 06 · WEBCARE</span>
            <h1 className="display-serif mt-6 text-[clamp(3.2rem,8vw,7rem)] leading-[.86]">Votre site évolue.<br/><em className="not-italic italic text-primary">Nous aussi.</em></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.</p>
          </div>
          <Parallax speed={-0.035} className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
              <img src={XR_PHOTOS.maintenance} alt="Infrastructure et maintenance web" className="h-[360px] w-full object-cover transition-transform duration-[1600ms] hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6"><span className="label-mono text-[9px] tracking-[.24em] text-white/55">XR AGENCY · WEBCARE</span><p className="display-serif mt-2 text-2xl text-white">Votre site reste exploitable.</p></div>
            </figure>
          </Parallax>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] border border-primary/30 bg-primary/[.06] p-7 shadow-xl">
              <div className="flex items-center gap-3"><ServerCog className="h-6 w-6 text-primary"/><span className="label-mono text-[10px] uppercase tracking-[.18em] text-primary">Infrastructure annuelle</span></div>
              <div className="mt-5 flex items-end gap-2"><span className="display-serif text-6xl text-primary">79 €</span><span className="mb-2 label-mono text-[9px] text-muted-foreground">/ an</span></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">{["Hébergement","Nom de domaine","Sécurité"].map(x=><div key={x} className="rounded-xl border border-border bg-background/70 p-3 text-center text-[10px] font-medium">{x}</div>)}</div>
            </div>
            <div className="rounded-[2rem] border border-border bg-card/60 p-7">
              <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary"/><span className="label-mono text-[10px] uppercase tracking-[.18em] text-primary">À retenir</span></div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.</p>
              <p className="mt-4 text-xs text-muted-foreground">Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border/60 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-3 md:grid-cols-3">
            {[[LifeBuoy,"Corrections","Petites modifications de contenu, visuels et sections."],[Wrench,"Évolutions","Ajustements courants pour que le site reste utile."],[ShieldCheck,"Suivi","Surveillance et interventions techniques selon la formule choisie."]].map(([Icon,title,desc])=>{const I=Icon as typeof LifeBuoy;return <div key={String(title)} className="rounded-[1.5rem] border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40"><I className="h-5 w-5 text-primary"/><h2 className="display-serif mt-6 text-3xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p></div>})}
          </div>
        </div>
      </section>
      <section id="plans" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><span className="label-mono text-[10px] uppercase tracking-[0.25em] text-primary">Maintenance mensuelle</span><h2 className="display-serif mt-4 text-4xl sm:text-6xl">Choisissez votre niveau<br/>d'accompagnement.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.</p></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan,index)=><article key={plan.name} className={`rounded-[1.75rem] border p-7 transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${index===1?"border-primary/50 bg-primary/[0.05]":"border-border bg-card/60"}`}><div className="flex items-center justify-between"><span className="label-mono text-[9px] text-primary">0{index+1}</span>{index===1&&<span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[8px] text-primary">ÉQUILIBRE</span>}</div><h3 className="display-serif mt-7 text-3xl">{plan.name}</h3><p className="mt-2 text-xs text-muted-foreground">{plan.badge}</p><div className="mt-6 flex items-end gap-2 border-y border-border py-5"><span className="display-serif text-5xl text-primary">{plan.price} €</span><span className="label-mono mb-1 text-[9px] text-muted-foreground">/ mois</span></div><ul className="mt-6 space-y-3">{plan.features.map(feature=><li key={feature} className="flex gap-3 text-sm leading-5 text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{feature}</li>)}</ul><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler du forfait WebCare « ${plan.name} » à ${plan.price} €/mois.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Parler à XR Agency <ArrowRight className="h-4 w-4"/></a></article>)}
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 py-16"><div className="mx-auto max-w-3xl px-5 text-center"><Sparkles className="mx-auto h-5 w-5 text-primary"/><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Un site propre, sans abonnement incompréhensible.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.</p></div></section>
    </main><Contact />
  </div>;
}
