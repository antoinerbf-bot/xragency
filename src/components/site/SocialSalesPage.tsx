import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageCircle, Instagram, Facebook, Linkedin, Music2, Camera, UsersRound, ChartNoAxesCombined, Target, Heart, Bookmark, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { XR_PHOTOS } from "@/lib/photography";

const SOCIAL_VISUALS = {
  instagram: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=90",
  tiktok: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=90",
  facebook: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=90",
  linkedin: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=90",
} as const;

const service = SERVICES.find((item) => item.id === "social")!;
const plans = service.plans;
const waFor = (name: string) => `https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler de la formule ${name} pour la gestion de mes réseaux sociaux.`)}`;
const platformCards = [
  { name: "Instagram", icon: Instagram, tags: ["Reels", "Carrousels", "Stories"], copy: "Un contenu visuel cohérent pour faire vivre votre univers et fédérer votre communauté.", image: SOCIAL_VISUALS.instagram, accent: "#b78a69" },
  { name: "TikTok", icon: Music2, tags: ["Vidéos courtes", "Tendances", "Créativité"], copy: "Des formats rythmés et authentiques, pensés pour capter l’attention sans perdre votre identité.", image: SOCIAL_VISUALS.tiktok, accent: "#9aab9b" },
  { name: "Facebook", icon: Facebook, tags: ["Publications", "Communauté", "Actualités"], copy: "Des contenus adaptés à votre activité pour entretenir le lien avec vos clients et votre communauté.", image: SOCIAL_VISUALS.facebook, accent: "#b8a17f" },
  { name: "LinkedIn", icon: Linkedin, tags: ["Expertise", "Marque employeur", "B2B"], copy: "Une présence professionnelle pour valoriser votre expertise, votre équipe et vos actualités.", image: SOCIAL_VISUALS.linkedin, accent: "#718f9d" },
];
const serviceTiles = [
  { title: "Stratégie sur-mesure", text: "Positionnement, audience et ligne éditoriale.", Icon: UsersRound },
  { title: "Création de contenus", text: "Photos, vidéos, Reels et carrousels.", Icon: Camera },
  { title: "Diffusion & publicités", text: "Publications et campagnes selon vos besoins.", Icon: ChartNoAxesCombined },
  { title: "Suivi & optimisation", text: "Analyse des résultats et recommandations.", Icon: Target },
];
const faq = [
  ["Que comprend chaque formule ?", "Le nombre de réseaux, de publications et les prestations incluses sont détaillés dans chaque formule. Ouvrez le détail pour consulter la liste complète."],
  ["Les tournages sont-ils inclus ?", "Les tournages photo et vidéo sur site sont proposés en option, sur devis."],
  ["Puis-je changer de formule ?", "Nous vérifions ensemble le périmètre et les conditions avant toute évolution."],
  ["À qui appartiennent les contenus ?", "Les droits sur les contenus livrés sont cédés selon les conditions prévues au contrat. Les éléments tiers restent soumis à leurs licences."],
  ["Quand commence l’accompagnement ?", "Le lancement est préparé sous 7 jours après réception des éléments nécessaires et validation du cadrage initial."],
] as const;

function PhoneMockup({ platform, image, center = false }: { platform: "Instagram" | "TikTok" | "Facebook"; image: string; center?: boolean }) {
  const Icon = platform === "Instagram" ? Instagram : platform === "TikTok" ? Music2 : Facebook;
  const title = platform === "Instagram" ? <>Votre univers.<br />En images.</> : platform === "TikTok" ? <>Des vidéos qui <em>captivent.</em></> : <>Des campagnes<br />qui vous ressemblent.</>;
  return <div className={`relative mx-auto w-full min-w-0 max-w-[250px] ${center ? "z-20 -translate-y-0 sm:-translate-y-7" : "z-10"}`}>
    <div className={`relative rounded-[1.25rem] border border-[#a9a49b] bg-[#121312] p-[3px] shadow-[0_18px_35px_rgba(0,0,0,.48)] sm:rounded-[2.4rem] sm:p-[7px] ${center ? "rotate-0" : platform === "Instagram" ? "sm:-rotate-[5deg]" : "sm:rotate-[5deg]"}`}>
      <div className="relative aspect-[9/15] overflow-hidden rounded-[1rem] bg-[#242321] sm:aspect-[9/16] sm:rounded-[1.95rem]">
        <img src={image} alt={`Exemple de direction artistique ${platform}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent via-45% to-black/85" />
        <div className="absolute inset-x-1.5 top-2 flex items-center gap-1 text-[7px] font-medium text-white sm:inset-x-3 sm:top-3 sm:gap-2 sm:text-[10px]"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/50 bg-black/30 sm:h-7 sm:w-7"><Icon className="h-3 w-3 sm:h-4 sm:w-4" /></span><span>{platform === "Instagram" ? "xr.agency" : platform === "TikTok" ? "XR Agency" : "XR Agency"}</span><span className="ml-auto text-white/80">•••</span></div>
        {platform === "TikTok" && <div className="absolute right-1 top-[42%] flex flex-col gap-2 text-white sm:right-2 sm:gap-4"><Heart className="h-3.5 w-3.5 fill-white/70 sm:h-5 sm:w-5"/><MessageCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5"/><Bookmark className="h-3.5 w-3.5 sm:h-5 sm:w-5"/></div>}
        <div className="absolute inset-x-1.5 bottom-6 text-white sm:inset-x-3 sm:bottom-8"><p className="font-serif text-[11px] leading-[1.05] tracking-tight sm:text-2xl">{title}</p><p className="mt-1 text-[7px] leading-[1.25] text-white/75 sm:mt-2 sm:text-[9px] sm:leading-4">{platform === "Instagram" ? "Une identité visuelle pensée pour votre marque." : platform === "TikTok" ? "Formats courts · Idées créatives" : "Contenus utiles. Relations durables."}</p></div>
        <div className="absolute inset-x-1.5 bottom-1 flex items-center justify-between border-t border-white/25 pt-1 text-white/90 sm:inset-x-3 sm:bottom-2 sm:pt-2"><span className="text-[6px] sm:text-[8px]">⌂</span><span className="text-[6px] sm:text-[8px]">⌕</span><span className="text-[6px] sm:text-[8px]">♡</span><span className="text-[6px] sm:text-[8px]">◉</span></div>
      </div>
    </div>
    <div className="absolute -left-1.5 top-[18%] grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-[#181a18] text-white shadow-xl sm:-left-4 sm:h-12 sm:w-12"><Icon className="h-4 w-4 sm:h-6 sm:w-6" /></div>
  </div>;
}

export function SocialSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedPlans, setExpandedPlans] = useState<number[]>([]);
  const [showSticky, setShowSticky] = useState(false);
  const [industry, setIndustry] = useState("commerce");
  const [goal, setGoal] = useState("croissance");
  const [delegation, setDelegation] = useState("reguliere");
  const recommendedPlan = (() => {
    if (delegation === "complete") return 2;
    if (delegation === "multi" || goal === "croissance" || goal === "leads") return 1;
    if (delegation === "simple") return 0;
    if (industry === "restaurant" || industry === "beaute") return goal === "visibilite" ? 0 : 1;
    if (industry === "services" && goal === "leads") return 1;
    return 0;
  })();
  const recommendationReason = recommendedPlan === 2
    ? "Votre choix privilégie une délégation plus étendue pour coordonner votre présence sur plusieurs réseaux."
    : recommendedPlan === 1
      ? goal === "leads"
        ? "Pour soutenir vos demandes commerciales, une présence régulière et des contenus adaptés à votre audience constituent un point de départ pertinent."
        : industry === "restaurant" || industry === "beaute"
          ? "Votre activité se prête à des contenus visuels réguliers pour mettre en valeur vos offres, votre savoir-faire et votre univers."
          : "Pour développer votre visibilité, une présence régulière sur plusieurs réseaux offre un cadre plus adapté."
      : "Vous pouvez commencer avec un périmètre plus ciblé, puis faire évoluer l’accompagnement selon vos besoins.";
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="xr-social-page min-h-screen bg-[#f5f1e9] text-[#171916]">
    <style>{`
      .xr-social-page { --social-ink:#111412; --social-paper:#f5f1e9; --social-muted:#d7d0c4; --social-jade:#8da99a; --social-jade-bright:#a9c1b2; --social-line:rgba(245,241,233,.17); }
      .xr-social-page .social-serif { font-family: Georgia, "Times New Roman", serif; font-weight: 400; letter-spacing:-.045em; }
      .xr-social-page .social-kicker { font-size:10px; letter-spacing:.24em; text-transform:uppercase; }
      .xr-social-page .social-jade { color:var(--social-jade-bright); }
      .xr-social-page .social-cta { transition:transform .2s ease, background-color .2s ease; }
      .xr-social-page .social-cta:hover { transform:translateY(-2px); background:#fff; }
      .xr-social-page .social-card { transition:transform .25s ease, box-shadow .25s ease; }
      .xr-social-page .social-card:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(25,25,20,.10); }
      @media (prefers-reduced-motion: reduce) { .xr-social-page * { transition:none !important; scroll-behavior:auto !important; } }
    `}</style>
    <Nav />
    <main>
      <section className="relative isolate overflow-hidden bg-[#101311] text-[#f5f1e9]">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=90" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,10,.66),rgba(9,12,10,.70)_48%,rgba(9,12,10,.66))]" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_8%,rgba(141,169,154,.20),transparent_50%)]" /></div>
        <div className="relative mx-auto max-w-[1440px] px-4 pb-7 pt-24 sm:px-7 sm:pb-12 sm:pt-12 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="social-kicker text-white/70">Social Media Studio · XR Agency</p>
            <h1 className="social-serif mx-auto mt-4 max-w-4xl text-[clamp(2.5rem,6.4vw,5.8rem)] leading-[.91]">Des contenus qui font <em className="social-jade not-italic">grandir</em><br className="hidden sm:block"/> votre marque.</h1>
            <p className="mt-4 text-xs tracking-wide text-white/75 sm:text-sm">Stratégie · Création · Diffusion · Performance</p>
          </div>
          <div className="relative mx-auto mt-7 max-w-[1120px] sm:mt-12">
            <div className="pointer-events-none absolute -right-1 top-0 z-30 hidden w-[190px] rotate-[2deg] rounded-2xl border border-white/20 bg-[#111613]/80 p-4 text-white shadow-2xl backdrop-blur-lg xl:block">
              <p className="text-[10px] uppercase tracking-[.22em] text-white/55">Aperçu des indicateurs</p>
              <div className="mt-3 flex items-end justify-between"><div><p className="font-serif text-3xl text-[#b8c9b9]">Visibilité</p><p className="mt-1 text-xs text-white/55">Portée & découverte</p></div><ChartNoAxesCombined className="h-6 w-6 text-[#b8c9b9]"/></div>
              <div className="mt-3 flex h-12 items-end gap-1.5">{[28,42,35,58,50,72,66,92].map((h,i)=><span key={i} className="flex-1 rounded-t-sm bg-[#9eb3a2]/80" style={{height:`${h}%`}} />)}</div>
              <div className="mt-4 border-t border-white/10 pt-3"><p className="text-xs text-white/55">Engagement</p><div className="mt-2 flex h-7 items-center gap-1">{[8,13,10,17,14,23,19,27,24].map((h,i)=><span key={i} className="flex-1 rounded-full bg-[#c5a27e]/80" style={{height:`${h}px`}} />)}</div></div>
            </div>
            <div className="pointer-events-none absolute -left-1 top-0 z-20 hidden -rotate-6 text-right font-serif text-3xl italic leading-[1.05] text-white/85 lg:block xl:-left-5">Instagram<br/>TikTok<br/>Facebook<div className="ml-auto mt-2 h-1 w-24 rotate-[-8deg] rounded-full bg-[#a8bca9]" /></div>
            <div className="mx-auto grid max-w-[780px] grid-cols-3 items-end gap-2 sm:max-w-[880px] sm:gap-7 xl:max-w-[850px]">
              <PhoneMockup platform="Instagram" image={SOCIAL_VISUALS.instagram} />
              <PhoneMockup platform="TikTok" image={SOCIAL_VISUALS.tiktok} center />
              <PhoneMockup platform="Facebook" image={SOCIAL_VISUALS.facebook} />
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-[1120px] grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-[#111411]/80 shadow-[0_18px_60px_rgba(0,0,0,.24)] backdrop-blur-xl sm:mt-10 sm:grid-cols-4">
            {serviceTiles.map(({title,text,Icon},i)=><div key={title} className={`px-2 py-3 text-center sm:px-5 sm:py-5 ${i%2===0?"border-r border-white/10":""} ${i<2?"border-b border-white/10 sm:border-b-0":""} ${i===1?"sm:border-r":i===2?"sm:border-r":""}`}><Icon className="mx-auto h-5 w-5 text-[#a9c1b2] sm:h-7 sm:w-7" strokeWidth={1.5}/><h2 className="mt-1.5 text-[10px] font-semibold leading-tight sm:mt-2 sm:text-sm">{title}</h2><p className="mx-auto mt-1 max-w-[210px] text-[9px] leading-3 text-white/60 sm:text-xs sm:leading-5">{text}</p></div>)}
          </div>
          <div className="mt-4 flex flex-col items-center gap-2 pb-4 sm:mt-6">
            <a href="#formules" className="social-cta inline-flex min-h-12 w-full max-w-[330px] items-center justify-center gap-3 rounded-full bg-[#f5f1e9] px-7 py-3 text-xs font-semibold tracking-[.12em] text-[#171916] shadow-xl sm:w-auto sm:text-sm">DÉCOUVRIR NOS FORMULES <ArrowRight className="h-4 w-4"/></a>
            <span className="text-xs text-white/60">Formules à partir de 349 €/mois · engagement dès 3 mois</span>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-7 grid gap-4 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-10">
            <div><p className="social-kicker text-[#777a70]">Des contenus adaptés à chaque plateforme</p><h2 className="social-serif mt-3 text-4xl leading-[.98] sm:text-5xl">Une stratégie complète<br/>pour des <em className="not-italic text-[#718f80]">résultats concrets.</em></h2></div>
            <p className="max-w-xl text-sm leading-6 text-[#62655e] md:justify-self-end">Nous créons des contenus engageants et des campagnes adaptées à votre marque pour développer votre visibilité, entretenir le lien avec votre communauté et soutenir vos objectifs.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {platformCards.map(({name,icon:Icon,tags,copy,image,accent})=><article key={name} className="social-card group relative min-h-[300px] overflow-hidden rounded-2xl border border-black/5 bg-white/75 p-5 sm:min-h-[320px] sm:p-6">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{background:accent}}><Icon className="h-5 w-5"/></span><h3 className="text-lg font-semibold">{name}</h3></div>
              <div className="mt-4 flex flex-wrap gap-1.5">{tags.map(tag=><span key={tag} className="rounded-md bg-[#eae7e0] px-2.5 py-1 text-[10px] text-[#55584f]">{tag}</span>)}</div>
              <p className="relative z-10 mt-3 max-w-[88%] text-xs leading-5 text-[#62655e]">{copy}</p>
              <div className="absolute -bottom-6 right-0 h-36 w-40 overflow-hidden rounded-tl-2xl border-l border-t border-white shadow-[-8px_-8px_25px_rgba(0,0,0,.08)] transition-transform duration-300 group-hover:-translate-y-2 sm:h-44 sm:w-48"><img src={image} alt={`Aperçu créatif ${name}`} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/></div>
              <span className="absolute bottom-5 left-5 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#f5f1e9] text-[#718f80] shadow-md"><ArrowRight className="h-4 w-4"/></span>
            </article>)}
          </div>
        </div>
      </section>

      <section id="choisir" className="bg-[#eae6dd] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div><p className="social-kicker text-[#718f80]">Votre point de départ</p><h2 className="social-serif mt-3 text-4xl leading-tight sm:text-5xl">Quelle formule correspond à votre ambition ?</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#62655e]">Répondez à trois questions pour obtenir une orientation. Vous gardez le choix final et pouvez consulter tous les détails avant de vous engager.</p></div>
          <div className="rounded-3xl border border-black/10 bg-[#f8f5ef] p-5 shadow-[0_18px_45px_rgba(28,31,25,.06)] sm:p-7">
            <label className="block text-xs font-semibold text-[#62655e]" htmlFor="social-industry">1. Votre activité</label><select id="social-industry" value={industry} onChange={e=>setIndustry(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[#171916] focus:outline-none focus:ring-2 focus:ring-[#718f80]"><option value="commerce">Commerce / boutique</option><option value="restaurant">Restaurant / hôtellerie</option><option value="services">Services / conseil</option><option value="beaute">Beauté / bien-être</option><option value="autre">Autre activité</option></select>
            <label className="mt-5 block text-xs font-semibold text-[#62655e]" htmlFor="social-goal">2. Votre priorité</label><select id="social-goal" value={goal} onChange={e=>setGoal(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[#171916] focus:outline-none focus:ring-2 focus:ring-[#718f80]"><option value="visibilite">Soigner ma présence en ligne</option><option value="croissance">Développer ma visibilité et ma communauté</option><option value="leads">Soutenir mes demandes commerciales</option></select>
            <label className="mt-5 block text-xs font-semibold text-[#62655e]" htmlFor="social-delegation">3. Le niveau d’accompagnement souhaité</label><select id="social-delegation" value={delegation} onChange={e=>setDelegation(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[#171916] focus:outline-none focus:ring-2 focus:ring-[#718f80]"><option value="simple">Commencer avec un réseau</option><option value="reguliere">Un rythme régulier sur plusieurs réseaux</option><option value="multi">Développer plusieurs réseaux</option><option value="complete">Une prise en charge étendue</option></select>
            <div aria-live="polite" className="mt-6 rounded-2xl bg-[#18201b] p-5 text-[#f5f1e9]"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#a9c1b2]"><Sparkles className="h-4 w-4"/> Notre orientation</div><div className="mt-3 flex flex-wrap items-baseline justify-between gap-2"><h3 className="social-serif text-2xl">{plans[recommendedPlan].name.fr}</h3><p className="text-xl font-semibold">{plans[recommendedPlan].eur} €<span className="text-xs font-normal text-white/60"> / mois</span></p></div><p className="mt-2 text-sm leading-6 text-white/70">{recommendationReason}</p><p className="mt-2 text-xs text-white/45">Orientation indicative selon vos réponses — le périmètre final est confirmé avec vous.</p><a href={`#plan-${recommendedPlan}`} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#f5f1e9] px-5 py-3 text-sm font-semibold text-[#171916]">Découvrir cette formule <ArrowRight className="h-4 w-4"/></a></div>
          </div>
        </div>
      </section>

      <section id="formules" className="scroll-mt-20 bg-[#101311] px-4 py-12 text-[#f5f1e9] sm:px-7 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <p className="social-kicker text-center text-white/55">Nos formules</p><h2 className="social-serif mt-3 text-center text-4xl leading-tight sm:text-5xl">Des offres adaptées à <em className="not-italic text-[#a9c1b2]">vos besoins.</em></h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-white/60">Choisissez le niveau d’accompagnement adapté à votre rythme et à vos objectifs.</p>
          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan,i)=>{const popular=Boolean(plan.popular);const isOpen=expandedPlans.includes(i);return <article id={`plan-${i}`} key={plan.name.fr} className={`relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${popular?"border-[#a9c1b2] bg-[#1a211d] shadow-[0_0_0_1px_rgba(169,193,178,.12)]":"border-white/10 bg-[#151916]"}`}>
              {popular&&<span className="absolute -top-3 left-5 rounded-full bg-[#a9c1b2] px-3 py-1.5 text-xs font-semibold text-[#111412]">Le plus populaire</span>}
              <p className="social-kicker mt-2 text-white/45">Formule 0{i+1}</p><h3 className="social-serif mt-3 text-3xl">{plan.name.fr}</h3><p className="mt-1 text-sm text-white/60">{plan.audience?.fr ?? "Un accompagnement adapté à votre activité"}</p>
              <div className="mt-5 border-y border-white/10 py-4"><div className="flex items-baseline gap-2"><span className="social-serif text-5xl">{plan.eur} €</span><span className="text-sm text-white/55">/ mois</span></div><p className="mt-2 text-xs text-white/55">Engagement minimum : {i===0?"3":"6"} mois</p></div>
              <ul className="mt-5 space-y-3">{plan.features.slice(0,4).map((feature,k)=><li key={k} className="flex gap-2.5 text-sm leading-5 text-white/85"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a9c1b2]"/><span>{feature.fr}</span></li>)}</ul>
              <button type="button" aria-expanded={isOpen} onClick={()=>setExpandedPlans(prev=>isOpen?prev.filter(x=>x!==i):[...prev,i])} className="mt-4 inline-flex min-h-11 items-center justify-between gap-3 text-left text-sm text-white/80 underline underline-offset-4"><span>{isOpen?"Masquer le détail":"Voir le détail complet"}</span><ChevronDown className={`h-4 w-4 transition-transform ${isOpen?"rotate-180":""}`}/></button>
              {isOpen&&<ul className="mt-3 space-y-2 rounded-xl bg-black/20 p-4">{plan.features.map((feature,k)=><li key={k} className="flex gap-2.5 text-sm leading-5 text-white/65"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a9c1b2]"/><span>{feature.fr}</span></li>)}</ul>}
              <div className="mt-auto pt-6"><AddToCartBtn item={{serviceId:"social",serviceName:"Social Media",planName:plan.name.fr,priceEur:plan.eur,period:"month",periodLabel:"/ mois"}} popular={popular}/><a href={waFor(plan.name.fr)} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"><MessageCircle className="h-4 w-4"/> Parler de cette formule</a></div>
            </article>})}
          </div>
          <p className="mt-5 text-center text-xs text-white/50">Les tournages photo et vidéo sur site sont en option, sur devis.</p>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-4 py-12 sm:px-7 sm:py-16 lg:px-10"><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[.7fr_1.3fr] md:gap-12"><div><p className="social-kicker text-[#777a70]">Comment ça se passe</p><h2 className="social-serif mt-3 text-4xl sm:text-5xl">Simple, du début à la suite.</h2></div><div className="divide-y divide-black/10 border-y border-black/10">{[["01","On cadre","Vos objectifs, votre public et votre ton."],["02","On crée","Les contenus sont préparés selon votre formule."],["03","On publie","Le calendrier est suivi et les contenus sont diffusés selon le périmètre choisi."]].map(([num,title,text])=><div key={num} className="grid gap-2 py-5 sm:grid-cols-[50px_1fr] sm:gap-4"><span className="social-kicker pt-1 text-[#718f80]">{num}</span><div><h3 className="social-serif text-2xl">{title}</h3><p className="mt-1 text-sm leading-6 text-[#62655e]">{text}</p></div></div>)}</div></div></section>

      <section className="bg-[#eae6dd] px-4 py-12 sm:px-7 sm:py-16 lg:px-10"><div className="mx-auto max-w-[900px]"><p className="social-kicker text-[#777a70]">FAQ</p><h2 className="social-serif mt-3 text-4xl sm:text-5xl">Les questions essentielles.</h2><div className="mt-7 border-t border-black/10">{faq.map(([q,a],i)=><div key={q} className="border-b border-black/10"><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"><span className="text-sm font-semibold sm:text-base">{q}</span><ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaq===i?"rotate-180":""}`}/></button>{openFaq===i&&<p className="max-w-3xl pb-5 text-sm leading-6 text-[#62655e]">{a}</p>}</div>)}</div></div></section>

      <section className="bg-[#20241f] px-4 py-12 text-[#f5f1e9] sm:px-7 sm:py-16 lg:px-10"><div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="social-kicker text-white/50">Prêt à simplifier vos réseaux ?</p><h2 className="social-serif mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">On construit une présence à votre image.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Expliquez-nous votre activité et nous vous aiderons à choisir le bon accompagnement.</p></div><a href={waFor("Social Media")} target="_blank" rel="noreferrer" className="social-cta inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f5f1e9] px-6 py-3.5 text-sm font-semibold text-[#171916]"><MessageCircle className="h-4 w-4"/> Échanger sur WhatsApp <ArrowRight className="h-4 w-4"/></a></div></section>
      <Contact />
    </main>
    {showSticky&&<div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f5f1e9]/95 p-3 text-[#171916] backdrop-blur-xl sm:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Social Media</p><p className="text-xs text-[#62655e]">Découvrez les formules</p></div><a href="#formules" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#20241f] px-5 text-sm font-semibold text-white">Voir les tarifs</a></div></div>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Social Media — XR Agency","description":"Stratégie, création de contenus et animation des réseaux sociaux.","provider":{"@type":"Organization","name":"XR Agency","url":"https://xragencyai.com"},"offers":plans.map(plan=>({"@type":"Offer","name":plan.name.fr,"price":plan.eur,"priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":plan.eur,"priceCurrency":"EUR","unitText":"MONTH"},"url":"https://xragencyai.com/services/social"}))})}} />
    </div>;
}
