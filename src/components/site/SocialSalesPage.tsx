import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, Instagram, Linkedin, Play } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { XR_PHOTOS } from "@/lib/photography";

const service = SERVICES.find((item) => item.id === "social")!;
const plans = service.plans;
const waFor = (name: string) => `https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler de la formule ${name} pour la gestion de mes réseaux sociaux.`)}`;
const benefits = [
  ["Une image cohérente", "Des visuels pensés pour votre identité et votre clientèle."],
  ["Un rythme clair", "Un calendrier éditorial adapté à la formule choisie."],
  ["Moins de charge mentale", "La création et la publication sont organisées pour vous."],
];
const faq = [
  ["Que comprend chaque formule ?", "Le nombre de réseaux, de publications et les prestations incluses sont détaillés dans chaque formule. Ouvrez le détail pour consulter la liste complète."],
  ["Les tournages sont-ils inclus ?", "Les tournages photo et vidéo sur site sont proposés en option, sur devis."],
  ["Puis-je changer de formule ?", "Nous vérifions ensemble le périmètre et les conditions avant toute évolution."],
  ["À qui appartiennent les contenus ?", "Les droits sur les contenus livrés sont cédés selon les conditions prévues au contrat. Les éléments tiers restent soumis à leurs licences."],
  ["Quand commence l’accompagnement ?", "Le lancement est préparé sous 7 jours après réception des éléments nécessaires et validation du cadrage initial."],
] as const;

export function SocialSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedPlans, setExpandedPlans] = useState<number[]>([]);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="min-h-screen bg-[var(--xr-bg)] text-[var(--xr-ink)]">
    <Nav />
    <main>
      <section className="overflow-hidden border-b xr-line">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_.9fr] lg:px-12 lg:py-20">
          <div>
            <p className="label-mono text-xs tracking-[.18em] xr-muted">SOCIAL MEDIA · XR AGENCY</p>
            <h1 className="display-serif mt-5 max-w-2xl text-[clamp(2.7rem,6vw,5.4rem)] leading-[.98] tracking-[-.04em]">Une présence sociale <em className="font-normal">qui vous ressemble.</em></h1>
            <p className="mt-5 max-w-xl text-base leading-7 xr-muted sm:text-lg">Nous créons et animons vos réseaux pour donner à votre marque une image claire, régulière et professionnelle.</p>
            <div className="mt-6 flex items-baseline gap-3"><span className="display-serif text-5xl sm:text-6xl">349 €</span><span className="xr-muted">/ mois · dès</span></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#formules" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-7 py-3 text-base font-semibold text-[var(--xr-bg)]">Voir les formules <ArrowRight className="h-4 w-4" /></a>
              <a href={waFor("Social Media")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border xr-line px-6 py-3 text-base font-semibold"><MessageCircle className="h-4 w-4" /> Poser une question</a>
            </div>
            <p className="mt-5 text-sm xr-muted">Stratégie · Création · Publication · Selon la formule choisie</p>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#b18153]/10 blur-2xl" />
            <div className="relative rounded-[1.6rem] border xr-line bg-[var(--xr-surface)] p-3 shadow-[0_24px_70px_-35px_rgba(0,0,0,.35)] sm:p-4">
              <div className="relative overflow-hidden rounded-[1.2rem] bg-black">
                <video
                  className="aspect-[4/4.2] w-full object-cover"
                  src="https://videos.pexels.com/video-files/7308291/7308291-hd_1080_1920_24fps.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  aria-label="Vidéo verticale illustrant la création de contenu et l’usage des réseaux sociaux"
                >
                  Votre navigateur ne peut pas lire cette vidéo.
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />
                <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7"><span className="rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs">STRATÉGIE · CONTENU · DIFFUSION</span><p className="display-serif mt-4 max-w-sm text-3xl leading-tight sm:text-4xl">Votre univers. Une même signature.</p></div>
                <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[10px] tracking-[.14em] text-white">FILM EN BOUCLE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-1 pt-3">{[{Icon:Instagram,label:"Instagram"},{Icon:Play,label:"TikTok"},{Icon:Linkedin,label:"LinkedIn"}].map(({Icon,label})=><div key={label} className="flex items-center justify-center gap-2 rounded-xl border xr-line px-2 py-3 text-xs sm:text-sm"><Icon className="h-4 w-4"/>{label}</div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-6 px-5 py-14 sm:grid-cols-3 sm:px-8 sm:py-20 lg:px-12">
        {benefits.map(([title,text],i)=><article key={title} className="border-t xr-line pt-5"><span className="label-mono text-xs xr-muted">0{i+1}</span><h2 className="display-serif mt-3 text-2xl sm:text-3xl">{title}</h2><p className="mt-3 max-w-sm text-base leading-6 xr-muted">{text}</p></article>)}
      </section>

      <section id="formules" className="scroll-mt-20 border-y xr-line bg-[var(--xr-surface)] py-14 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <p className="label-mono text-xs tracking-[.18em] xr-muted">TARIFS TRANSPARENTS</p><h2 className="display-serif mt-3 text-4xl sm:text-5xl">Choisissez votre formule.</h2><p className="mt-3 max-w-xl text-base leading-6 xr-muted">Comparez les prestations et choisissez le niveau d’accompagnement adapté à votre activité.</p>
          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan,i)=>{const popular=Boolean(plan.popular);const isOpen=expandedPlans.includes(i);return <article key={plan.name.fr} className={"relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 "+(popular?"border-[var(--xr-ink)] bg-[var(--xr-bg)] shadow-[0_20px_55px_-35px_rgba(0,0,0,.45)]":"xr-line bg-[var(--xr-bg)]")}>
              {popular&&<span className="absolute -top-3 left-5 rounded-full bg-[var(--xr-ink)] px-3 py-1.5 text-xs font-semibold text-[var(--xr-bg)]">Le plus choisi</span>}
              <p className="label-mono mt-2 text-xs tracking-[.14em] xr-muted">FORMULE 0{i+1}</p><h3 className="display-serif mt-3 text-3xl">{plan.name.fr}</h3>
              <div className="mt-5 border-y xr-line py-4"><div className="flex items-baseline gap-2"><span className="display-serif text-5xl">{plan.eur} €</span><span className="text-sm xr-muted">/ mois</span></div><p className="mt-2 text-sm font-medium">Engagement minimum : {i===0?"3":"6"} mois</p></div>
              <ul className="mt-5 space-y-3">{plan.features.slice(0,4).map((feature,k)=><li key={k} className="flex gap-2.5 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0"/><span>{feature.fr}</span></li>)}</ul>
              <button type="button" aria-expanded={isOpen} onClick={()=>setExpandedPlans(prev=>isOpen?prev.filter(x=>x!==i):[...prev,i])} className="mt-4 inline-flex min-h-11 items-center justify-between gap-3 text-left text-sm font-medium underline underline-offset-4"><span>{isOpen?"Masquer le détail":"Voir le détail complet"}</span><ChevronDown className={"h-4 w-4 transition-transform "+(isOpen?"rotate-180":"")}/></button>
              {isOpen&&<ul className="mt-3 space-y-2 rounded-xl bg-[var(--xr-surface)] p-4">{plan.features.map((feature,k)=><li key={k} className="flex gap-2.5 text-sm leading-5 xr-muted"><Check className="mt-0.5 h-4 w-4 shrink-0"/><span>{feature.fr}</span></li>)}</ul>}
              <div className="mt-auto pt-6"><AddToCartBtn item={{serviceId:"social",serviceName:"Social Media",planName:plan.name.fr,priceEur:plan.eur,period:"month",periodLabel:"/ mois"}} popular={popular}/><a href={waFor(plan.name.fr)} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border xr-line px-4 py-3 text-sm font-medium"><MessageCircle className="h-4 w-4"/> Parler de cette formule</a></div>
            </article>})}
          </div>
          <p className="mt-5 text-sm xr-muted">Les tournages photo et vidéo sur site sont en option, sur devis.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[.7fr_1.3fr] lg:px-12">
        <div><p className="label-mono text-xs tracking-[.18em] xr-muted">COMMENT ÇA SE PASSE</p><h2 className="display-serif mt-3 text-4xl sm:text-5xl">Simple, du début à la suite.</h2></div>
        <div className="divide-y xr-line border-y xr-line">{[["01","On cadre","Vos objectifs, votre public et votre ton."],["02","On crée","Les contenus sont préparés selon votre formule."],["03","On publie","Le calendrier est suivi et les contenus sont diffusés selon le périmètre choisi."]].map(([num,title,text])=><div key={num} className="grid gap-2 py-5 sm:grid-cols-[60px_1fr] sm:gap-4"><span className="label-mono text-xs xr-muted">{num}</span><div><h3 className="display-serif text-2xl">{title}</h3><p className="mt-1 text-base leading-6 xr-muted">{text}</p></div></div>)}</div>
      </section>

      <section className="border-y xr-line bg-[var(--xr-surface)] py-14 sm:py-20"><div className="mx-auto max-w-[900px] px-5 sm:px-8"><p className="label-mono text-xs tracking-[.18em] xr-muted">FAQ</p><h2 className="display-serif mt-3 text-4xl sm:text-5xl">Les questions essentielles.</h2><div className="mt-7 border-t xr-line">{faq.map(([q,a],i)=><div key={q} className="border-b xr-line"><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"><span className="text-base font-semibold">{q}</span><ChevronDown className={"h-4 w-4 shrink-0 transition-transform "+(openFaq===i?"rotate-180":"")}/></button>{openFaq===i&&<p className="max-w-3xl pb-5 text-base leading-7 xr-muted">{a}</p>}</div>)}</div></div></section>

      <section className="bg-[#171715] py-14 text-[#f6f2eb] sm:py-20"><div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center lg:px-12"><div><p className="label-mono text-xs tracking-[.18em] text-white/55">PRÊT À SIMPLIFIER VOS RÉSEAUX ?</p><h2 className="display-serif mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">On construit une présence à votre image.</h2><p className="mt-3 max-w-xl text-base leading-7 text-white/70">Expliquez-nous votre activité et nous vous aiderons à choisir le bon accompagnement.</p></div><a href={waFor("Social Media")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f6f2eb] px-6 py-3.5 text-base font-semibold text-[#171715]"><MessageCircle className="h-4 w-4"/> Échanger sur WhatsApp <ArrowRight className="h-4 w-4"/></a></div></section>
      <Contact />
    </main>
    {showSticky&&<div className="fixed inset-x-0 bottom-0 z-50 border-t xr-line bg-[var(--xr-bg)]/95 p-3 backdrop-blur-xl sm:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Dès 349 € / mois</p><p className="text-xs xr-muted">Trois formules au choix</p></div><a href="#formules" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[var(--xr-ink)] px-5 text-sm font-semibold text-[var(--xr-bg)]">Voir les tarifs</a></div></div>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Social Media — XR Agency","description":"Stratégie, création de contenus et animation des réseaux sociaux.","provider":{"@type":"Organization","name":"XR Agency","url":"https://xragencyai.com"},"offers":plans.map(plan=>({"@type":"Offer","name":plan.name.fr,"price":plan.eur,"priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":plan.eur,"priceCurrency":"EUR","unitText":"MONTH"},"url":"https://xragencyai.com/services/social"}))})}} />
  </div>;
}