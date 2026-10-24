import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, Instagram, Facebook, Music2, Sparkles } from "lucide-react";
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
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[#b18153]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.8rem] border xr-line bg-[#171715] p-4 text-[#f6f2eb] shadow-[0_28px_80px_-32px_rgba(0,0,0,.5)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="label-mono text-[10px] tracking-[.2em] text-white/55">XR SOCIAL STUDIO</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> CONTENU EN MOUVEMENT</span>
              </div>
              <div className="relative mt-5 min-h-[300px] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-[#3c2834] via-[#191919] to-[#2d382d] p-5 sm:min-h-[350px] sm:p-7">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#c87967]/30 blur-3xl" />
                <div className="absolute -bottom-14 -left-10 h-48 w-48 rounded-full bg-[#b18153]/25 blur-3xl" />
                <div className="relative z-10 flex items-center gap-2 text-xs text-white/65"><Sparkles className="h-4 w-4" /> STRATÉGIE · CRÉATION · DIFFUSION</div>
                <p className="display-serif relative z-10 mt-5 max-w-sm text-4xl leading-[1.02] sm:text-5xl">Des contenus qui <em className="font-normal text-[#e8b99a]">captent l’attention.</em></p>
                <p className="relative z-10 mt-3 max-w-xs text-sm leading-6 text-white/65">Une identité reconnaissable, adaptée aux codes de chaque plateforme.</p>
                <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
                  <div className="animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                    <div className="flex items-center justify-between"><Instagram className="h-5 w-5"/><span className="text-[10px] text-white/55">01 / SOCIAL</span></div>
                    <div className="mt-5 h-2 w-4/5 rounded-full bg-[#e7a28d]/80"/><div className="mt-2 h-2 w-2/3 rounded-full bg-white/25"/><p className="mt-4 text-xs font-medium">Identité & contenus</p>
                  </div>
                  <div className="animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md [animation-delay:700ms]">
                    <div className="flex items-center justify-between"><Music2 className="h-5 w-5"/><span className="text-[10px] text-white/55">02 / VIDEO</span></div>
                    <div className="mt-5 flex h-7 items-end gap-1">{[35,65,45,90,55,75,40,85,50].map((h,i)=><span key={i} className="w-full rounded-t-sm bg-[#e7a28d]/80" style={{height:h+"%"}} />)}</div><p className="mt-2 text-xs font-medium">Formats dynamiques</p>
                  </div>
                </div>
                <div className="absolute right-5 top-[42%] hidden -rotate-6 rounded-xl border border-white/20 bg-[#f6f2eb] px-3 py-2 text-xs font-semibold text-[#171715] shadow-xl sm:block">Votre marque, partout.</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{Icon:Instagram,label:"Instagram"},{Icon:Music2,label:"TikTok"},{Icon:Facebook,label:"Facebook"}].map(({Icon,label})=><div key={label} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-2 py-3 text-xs sm:text-sm"><Icon className="h-4 w-4"/>{label}</div>)}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3"><span className="text-xs text-white/65">Gestion des réseaux sociaux</span><a href="#formules" className="inline-flex items-center gap-1.5 text-xs font-semibold">Voir les formules <ArrowRight className="h-3.5 w-3.5"/></a></div>
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