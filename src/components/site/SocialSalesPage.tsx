import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Compass, MessageCircle, Play, Video, CalendarDays, Instagram, Facebook, Linkedin } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { Reveal } from "@/components/site/primitives";
import { XR_PHOTOS } from "@/lib/photography";

const service = SERVICES.find((item) => item.id === "social")!;
const plans = service.plans;
const waNumber = "33767566783";
const waFor = (name: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler de la formule ${name} pour la gestion de mes réseaux sociaux.`) }`;
const sectors = [
  { id: "food", name: "Restauration", goal: "Donner envie de réserver", ideas: ["Un produit signature en gros plan", "Les coulisses et le geste du chef", "Une adresse, une ambiance, une histoire"], line: "Le goût se raconte aussi en images." },
  { id: "luxury", name: "Luxe", goal: "Faire ressentir la valeur", ideas: ["Le détail qui fait la différence", "L’histoire derrière la pièce", "Une mise en scène éditoriale"], line: "Chaque détail porte votre signature." },
  { id: "beauty", name: "Beauté", goal: "Créer confiance et désir", ideas: ["Un geste expert expliqué simplement", "Les étapes d’une prestation", "Une routine utile à enregistrer"], line: "Montrez le soin derrière le résultat." },
  { id: "realestate", name: "Immobilier", goal: "Projeter avant la visite", ideas: ["Une visite verticale fluide", "La lumière et les détails du lieu", "Le quartier en quelques images"], line: "Faites ressentir le lieu avant la visite." },
  { id: "craft", name: "Artisans", goal: "Rendre votre savoir-faire visible", ideas: ["Le geste métier en action", "Les matières et finitions", "Une question client, une réponse claire"], line: "Votre savoir-faire mérite d’être vu." },
];
const faq = [
  ["Que comprend chaque formule ?", "Chaque formule précise le nombre de réseaux, de publications et le niveau d’animation. Ouvrez « Voir tout ce qui est inclus » sur la formule concernée pour consulter le détail exact."],
  ["Les tournages sont-ils inclus ?", "Non. Les tournages photo et vidéo sur site sont proposés en option, sur devis, selon le lieu et le besoin."],
  ["Puis-je changer de formule ?", "Nous faisons le point sur vos besoins et le périmètre avant toute évolution. Les conditions applicables sont confirmées avec vous."],
  ["Que se passe-t-il après l’engagement minimum ?", "À la fin de la période minimale, nous faisons le point sur la suite et les conditions de poursuite ou d’arrêt prévues au contrat."],
  ["À qui appartiennent les contenus ?", "Les droits sur les contenus livrés sont cédés selon les conditions convenues au contrat. Les éventuels éléments tiers restent soumis à leurs licences."],
  ["Combien de temps avant la première publication ?", "Le lancement est préparé sous 7 jours après réception des éléments nécessaires et validation du cadrage initial."],
] as const;

export function SocialSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedPlans, setExpandedPlans] = useState<number[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [sector, setSector] = useState("food");
  const [activeTab, setActiveTab] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSector = sectors.find((item) => item.id === sector) ?? sectors[0];
  const highlights = [
    { icon: Compass, title: "Direction artistique", text: "Un univers visuel reconnaissable, cohérent avec votre marque et vos clients." },
    { icon: Video, title: "Production & montage", text: "Des visuels, carrousels et formats courts conçus pour capter l’attention." },
    { icon: CalendarDays, title: "Animation & pilotage", text: "Un calendrier clair, une publication régulière et un suivi adapté à la formule." },
  ];

  return (
    <div className="min-h-screen bg-[var(--xr-bg)] text-[var(--xr-ink)]">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b xr-line">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 78% 24%, rgba(177,129,83,.16), transparent 42%), radial-gradient(ellipse at 8% 80%, rgba(177,129,83,.08), transparent 38%)" }} />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_.9fr] lg:px-12 lg:pb-24 lg:pt-20">
            <Reveal>
              <p className="label-mono text-xs tracking-[.2em] xr-muted">STRATÉGIE · CRÉATION · ANIMATION</p>
              <h1 className="display-serif mt-5 max-w-3xl text-[clamp(2.8rem,7vw,5.8rem)] leading-[.94] tracking-[-.045em]">Des réseaux sociaux qui travaillent <em className="font-normal">pour vos ventes.</em></h1>
              <p className="mt-6 max-w-xl text-base leading-7 xr-muted sm:text-lg">Stratégie, création de contenus et animation de vos réseaux : une présence cohérente, pensée pour votre marque et gérée de A à Z.</p>
              <div className="mt-7 flex items-baseline gap-3"><span className="display-serif text-5xl sm:text-6xl">349 €</span><span className="text-base xr-muted">/ mois · dès</span></div>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
                <a href="#formules" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-7 py-3.5 text-base font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5 hover:shadow-lg">Voir les formules <ArrowRight className="h-4 w-4" /></a>
                <a href={waFor("Social Media")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border xr-line px-7 py-3.5 text-base font-semibold transition hover:bg-[var(--xr-surface)]"><MessageCircle className="h-4 w-4" /> Parler sur WhatsApp</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm xr-muted"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Démarrage sous 7 jours</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Droits cédés selon contrat</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Réponse en moins de 2 h</span></div>
            </Reveal>
            <Reveal>
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-amber-200/10 via-transparent to-rose-300/10 blur-2xl" />
                <div className="relative rounded-[1.6rem] border xr-line bg-[var(--xr-surface)] p-3 shadow-[0_24px_70px_-35px_rgba(0,0,0,.35)] sm:p-4">
                <div className="relative overflow-hidden rounded-[1.2rem] bg-black">
                  <img src={XR_PHOTOS.social} alt="Direction artistique pour une campagne de réseaux sociaux" className="aspect-[4/4.2] w-full object-cover" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                  <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                    <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs">EXEMPLE CRÉATIF</span>
                    <p className="display-serif mt-4 max-w-sm text-3xl leading-tight sm:text-4xl">Votre univers. Une même signature.</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-1 pt-3">
                  {[{Icon:Instagram,label:"Instagram"},{Icon:Play,label:"TikTok"},{Icon:Linkedin,label:"LinkedIn"}].map(({Icon,label})=><div key={label} className="flex items-center justify-center gap-2 rounded-xl border xr-line px-2 py-3 text-xs sm:text-sm"><Icon className="h-4 w-4"/>{label}</div>)}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="formules" className="scroll-mt-20 mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <Reveal><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="label-mono text-xs tracking-[.18em] xr-muted">LES FORMULES</p><h2 className="display-serif mt-4 text-4xl sm:text-6xl">Choisissez votre rythme.</h2></div><p className="max-w-md text-base leading-7 xr-muted">Trois niveaux d’accompagnement. Le même objectif : une présence cohérente et tenue dans la durée.</p></div></Reveal>
          <div className="mt-9 grid items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan,i)=>{const popular=Boolean(plan.popular);const isOpen=expandedPlans.includes(i);const price=plan.eur;const commitment=i===0?"Engagement minimum : 3 mois":"Engagement minimum : 6 mois";const forWho=["Pour lancer une présence propre et régulière.","Pour développer une présence active sur plusieurs réseaux.","Pour confier une présence plus soutenue à une équipe dédiée."][i];const keyFeatures=plan.features.slice(i===0?1:1, i===0?6:6);return <Reveal key={plan.name.fr}><article className={"relative flex h-full flex-col rounded-[1.6rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 "+(popular?"border-[var(--xr-ink)] bg-[var(--xr-surface)] shadow-[0_24px_65px_-35px_rgba(0,0,0,.45)] ring-1 ring-[var(--xr-ink)]/20 lg:scale-[1.025]":"xr-line bg-[var(--xr-surface)]")}>
              {popular&&<span className="absolute -top-3 left-6 rounded-full bg-[var(--xr-ink)] px-4 py-1.5 text-xs font-semibold text-[var(--xr-bg)]">Le plus choisi</span>}
              <p className="label-mono mt-2 text-xs tracking-[.16em] xr-muted">FORMULE 0{i+1}</p><h3 className="display-serif mt-4 text-3xl">{plan.name.fr}</h3><p className="mt-3 min-h-[3rem] text-base leading-6 xr-muted">{forWho}</p>
              <div className="mt-6 border-y xr-line py-5"><div className="flex items-baseline gap-2"><span className="display-serif text-5xl sm:text-6xl">{price} €</span><span className="text-base xr-muted">/mois</span></div><p className="mt-2 text-sm font-medium">{commitment}</p></div>
              <ul className="mt-6 space-y-3">{keyFeatures.map((feature,k)=><li key={k} className="flex gap-3 text-base leading-6"><Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={2}/><span>{feature.fr}</span></li>)}</ul>
              <button type="button" aria-expanded={isOpen} onClick={()=>setExpandedPlans((prev)=>isOpen?prev.filter(x=>x!==i):[...prev,i])} className="mt-5 inline-flex min-h-12 items-center justify-between gap-3 text-left text-base font-medium underline decoration-[var(--xr-line)] underline-offset-4"><span>{isOpen?"Masquer le détail":"Voir tout ce qui est inclus"}</span><ChevronDown className={"h-4 w-4 transition-transform "+(isOpen?"rotate-180":"")}/></button>
              {isOpen&&<ul className="mt-3 space-y-3 rounded-xl bg-[var(--xr-bg)] p-4">{plan.features.map((feature,k)=><li key={k} className="flex gap-3 text-sm leading-5 xr-muted"><Check className="mt-0.5 h-4 w-4 shrink-0"/><span>{feature.fr}</span></li>)}</ul>}
              <div className="mt-auto pt-7"><AddToCartBtn item={{serviceId:"social",serviceName:"Social Media",planName:plan.name.fr,priceEur:price,period:"month",periodLabel:"/ mois"}} popular={popular}/><a href={waFor(plan.name.fr)} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border xr-line px-4 py-3 text-base font-medium transition hover:bg-[var(--xr-bg)]"><MessageCircle className="h-4 w-4"/> Parler de cette formule</a></div>
            </article></Reveal>})}
          </div>
          <p className="mt-7 text-base xr-muted">Tournages sur site en option, sur devis.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border xr-line"><button type="button" aria-expanded={comparisonOpen} onClick={()=>setComparisonOpen(!comparisonOpen)} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold"><span>Comparer les formules en un coup d’œil</span><ChevronDown className={"h-5 w-5 transition-transform "+(comparisonOpen?"rotate-180":"")}/></button>{comparisonOpen&&<div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead><tr className="border-t xr-line"><th className="p-4 font-semibold">Inclus</th>{plans.map(p=><th key={p.name.fr} className="p-4 font-semibold">{p.name.fr}</th>)}</tr></thead><tbody>{[["Réseaux","1 au choix","2 réseaux","3 réseaux"],["Publications / mois","8","20","30"],["Stories","Selon calendrier","Interactives régulières","Quotidiennes"],["Reporting","—","Mensuel","Approfondi"],["Modération","Commentaires clés","Active","Proactive 6j/7"]].map(row=><tr key={row[0]} className="border-t xr-line"><th className="p-4 font-medium">{row[0]}</th>{row.slice(1).map((v,i)=><td key={i} className="p-4 xr-muted">{v}</td>)}</tr>)}</tbody></table></div>}</div>
        </section>

        <section className="border-y xr-line bg-[var(--xr-surface)] py-16 sm:py-20"><div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12"><Reveal><p className="label-mono text-xs tracking-[.18em] xr-muted">UN PROCESSUS SIMPLE</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">De l’idée à la publication.</h2><p className="mt-4 text-base xr-muted">Lancement sous 7 jours, une fois les éléments nécessaires réunis.</p></Reveal><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{name:"Positionnement",text:"Nous cadrons vos objectifs, votre audience et votre ton."},{name:"Production",text:"Nous créons les contenus adaptés à votre formule."},{name:"Animation",text:"Nous programmons, publions et modérons selon le périmètre choisi."},{name:"Pilotage",text:"Nous lisons les retours et proposons les ajustements utiles."}].map((s,i)=><Reveal key={s.name}><article className="h-full rounded-2xl border xr-line p-5 sm:p-6"><span className="label-mono text-xs xr-muted">ÉTAPE 0{i+1}</span><h3 className="display-serif mt-4 text-2xl">{s.name}</h3><p className="mt-3 text-base leading-6 xr-muted">{s.text}</p></article></Reveal>)}</div></div></section>

        <section className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 sm:py-24"><Reveal><p className="label-mono text-xs tracking-[.18em] xr-muted">FAQ</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Les réponses, sans détour.</h2></Reveal><div className="mt-8 border-t xr-line">{faq.map(([q,a],i)=><div key={q} className="border-b xr-line"><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left"><span className="text-base font-semibold sm:text-lg">{q}</span><ChevronDown className={"h-5 w-5 shrink-0 transition-transform "+(openFaq===i?"rotate-180":"")}/></button><div className={"grid transition-[grid-template-rows] duration-300 "+(openFaq===i?"grid-rows-[1fr]":"grid-rows-[0fr]")}><div className="overflow-hidden"><p className="max-w-3xl pb-6 text-base leading-7 xr-muted">{a}</p></div></div></div>)}</div></section>

        <section className="relative overflow-hidden bg-[#171715] py-16 text-[#f6f2eb] sm:py-24"><div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{background:"radial-gradient(ellipse at 75% 20%, rgba(190,150,104,.22), transparent 45%)"}}/><div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:px-12"><div><p className="label-mono text-xs tracking-[.18em] text-white/55">À VOUS DE JOUER</p><h2 className="display-serif mt-4 text-4xl leading-tight sm:text-6xl">Votre prochain client est peut-être déjà sur Instagram.</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/70">Choisissez une formule et donnez à votre présence sociale une direction claire, régulière et professionnelle.</p><p className="display-serif mt-7 text-3xl">Dès 349 € / mois</p><a href={waFor("Social Media")} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6f2eb] px-6 py-3.5 text-base font-semibold text-[#171715] transition hover:-translate-y-0.5 sm:w-auto"><MessageCircle className="h-4 w-4"/> Démarrer sur WhatsApp <ArrowRight className="h-4 w-4"/></a></div><div className="rounded-2xl border border-white/15 bg-white/[.04] p-5 sm:p-7"><p className="text-lg font-semibold">Ou envoyez-nous votre demande</p><p className="mt-2 text-base text-white/65">Trois informations suffisent pour démarrer la conversation.</p><form action="https://formsubmit.co/contact.xragency@gmail.com" method="POST" className="mt-6 space-y-4"><input type="hidden" name="_subject" value="Demande Social Media — XR Agency"/><input required name="name" placeholder="Votre nom" aria-label="Votre nom" className="min-h-12 w-full rounded-xl border border-white/20 bg-white/[.06] px-4 text-base text-white placeholder:text-white/50"/><input required type="email" name="email" placeholder="Votre e-mail" aria-label="Votre e-mail" className="min-h-12 w-full rounded-xl border border-white/20 bg-white/[.06] px-4 text-base text-white placeholder:text-white/50"/><textarea required name="message" placeholder="Parlez-nous de votre activité et de vos besoins" aria-label="Votre message" rows={3} className="w-full rounded-xl border border-white/20 bg-white/[.06] px-4 py-3 text-base text-white placeholder:text-white/50"/><button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#f6f2eb] px-5 py-3 text-base font-semibold text-[#171715]">Envoyer ma demande <ArrowRight className="ml-2 h-4 w-4"/></button></form></div></div></section>
        <Contact />
      </main>
      {showSticky&&<div className="fixed inset-x-0 bottom-0 z-50 border-t xr-line bg-[var(--xr-bg)]/95 p-3 backdrop-blur-xl sm:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><div className="min-w-0 flex-1"><p className="text-base font-semibold">Dès 349 €/mois</p><p className="text-xs xr-muted">Choisissez votre formule</p></div><a href="#formules" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--xr-ink)] px-5 text-base font-semibold text-[var(--xr-bg)]">Choisir ma formule</a></div></div>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Social Media — XR Agency","description":"Stratégie, création de contenus et animation des réseaux sociaux.","provider":{"@type":"Organization","name":"XR Agency","url":"https://xragencyai.com"},"offers":plans.map((plan)=>({"@type":"Offer","name":plan.name.fr,"price":plan.eur,"priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":plan.eur,"priceCurrency":"EUR","unitText":"MONTH"},"url":"https://xragencyai.com/services/social"}))})}} />
    </div>
  );
}
