import { useMemo, useState } from "react";
import { ArrowRight, Bot, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/content";

type Product = {
  id: string; name: string; family: string; use: string; image: string; url: string;
  stats: string[]; desc: string; tech?: string;
};

const PRODUCTS: Product[] = [
  { id:"welcome-plus", name:"Welcome Plus", family:"Accueil", use:"Hôtel · entreprise · retail · accueil", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/ROBOT-ACCUEIL-02-scaled.png", url:"https://www.korbenforpeople.com/robot/welcome-plus/", stats:["9 h","30+ langues","Écran 27\""], desc:"Robot d’accueil haut de gamme avec grand écran HD, interaction et assistance aux visiteurs." },
  { id:"welcome-mini", name:"Welcome Mini", family:"Accueil", use:"Accueil · retail · événement", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/GREETING-BOT-MINI.png", url:"https://www.korbenforpeople.com/robot/welcome-mini/", stats:["12 h","30+ langues","Voix"], desc:"Format compact pour accueillir, informer et interagir dans les espaces recevant du public." },
  { id:"welcome-nova", name:"Welcome Nova", family:"Accueil", use:"Hôtel · santé · entreprise", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/GREETING-BOT-MINI.png", url:"https://www.korbenforpeople.com/robot/welcome-nova/", tech:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/korben-Greeting-Nova-FR-Fiche-Technique.pptx.pdf", stats:["12 h","≤ 5 000 m²","14\" FHD"], desc:"Robot d’accueil avec navigation LiDAR, positionnement visuel, reconnaissance vocale et personnalisation." },
  { id:"delivery-pro", name:"Delivery Pro", family:"Livraison", use:"Restaurant · hôtel · retail", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/DELIVERY-BOTS-2-VUE-01-scaled.png", url:"https://www.korbenforpeople.com/robot/delivery-pro/", stats:["12 h","60 kg","3–4 plateaux"], desc:"Assistant de livraison autonome pour les trajets répétitifs entre cuisine, salle, réserve ou comptoir." },
  { id:"delivery", name:"Delivery", family:"Livraison", use:"Restaurant · hôtel · commerce", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/LUCKI-PRO-scaled.png", url:"https://www.korbenforpeople.com/robot/delivery/", tech:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/korben-Delivery-FR-Fiche-Technique.pptx.pdf", stats:["10 h","40 kg","3–4 plateaux"], desc:"Robot polyvalent de livraison avec navigation autonome et interaction client." },
  { id:"autodoor", name:"Delivery Pro Autodoor", family:"Livraison sécurisée", use:"Retail · entreprise · logistique", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/07/DELIVERY-PRO-AUTODOOR-2.png", url:"https://www.korbenforpeople.com/robot/delivery-pro-autodoor/", stats:["12 h","40 kg","20 kg / plateau"], desc:"Livraison autonome avec compartiment sécurisé pour les contenus nécessitant un accès contrôlé." },
  { id:"carrybot", name:"Delivery Carry Bot", family:"Logistique", use:"Entrepôt · logistique · entreprise", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/LUCKYBOT-PRO-2.png", url:"https://www.korbenforpeople.com/robot/delivery-carry-bot/", stats:["9 h","100 kg","VSLAM+"], desc:"Assistant multitâches pour transporter des matériaux et réduire les déplacements internes." },
  { id:"beetle", name:"Cleaning Beetle", family:"Nettoyage", use:"Hôtel · bureaux · retail", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/PHANTAS-VUE-02.png", url:"https://www.korbenforpeople.com/robot/cleaning-beetle/", stats:["10 h","2 000 m²/h","40 L"], desc:"Nettoyage autonome à sec avec fonctionnement programmé et pilotage à distance." },
  { id:"scrubber", name:"Cleaning Scrubber", family:"Nettoyage", use:"Hôtel · centre commercial · grands espaces", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/SCRUBBER-VUE-01.png", url:"https://www.korbenforpeople.com/robot/cleaning-scrubber/", stats:["8 h","0,9 m/s","2 000 m²/charge"], desc:"Robot de nettoyage des sols pensé pour automatiser les cycles réguliers." },
  { id:"phantas", name:"Cleaning Phantas", family:"Nettoyage", use:"Hôtel · bureaux · espaces publics", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/PHANTAS-VUE-02.png", url:"https://www.korbenforpeople.com/robot/cleaning-phantas/", stats:["10 h","0,8 m/s","500 m²/h"], desc:"Solution de nettoyage autonome compacte pour maintenir les sols propres sans interrompre l’activité." },
  { id:"cleaning55", name:"Cleaning 55", family:"Nettoyage", use:"Hôtel · bureaux · retail", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/CLEANING-BOOT55-VUE-01.png", url:"https://www.korbenforpeople.com/robot/cleaning-55/", stats:["9 h","1 200 m²/h","2,5 L"], desc:"Robot de nettoyage compact pour les opérations quotidiennes." },
  { id:"aura-g1", name:"Aura G1", family:"Humanoïde", use:"R&D · accueil · innovation", image:"https://www.korbenforpeople.com/wp-content/uploads/2025/08/ROBOT-ACCUEIL-02-scaled.png", url:"https://www.korbenforpeople.com/robot/robot-x/", stats:["43 DOF","120 Nm","ROS2"], desc:"Humanoïde compact à plateforme ouverte, destiné à l’interaction, la perception et le développement." },
  { id:"aura-e", name:"Aura E", family:"Humanoïde", use:"Hôtel · santé · événement · R&D", image:"https://image.thum.io/get/width/1200/noanimate/https://www.korbenforpeople.com/robot/korben-aura-e/", url:"https://www.korbenforpeople.com/robot/robot-x/", stats:["42 DOF","300 Nm","550 TOPS"], desc:"Humanoïde grandeur nature orienté recherche, développement et intelligence incarnée." },
  { id:"atlas-o2", name:"Atlas O2", family:"Quadrupède", use:"Inspection · R&D · environnements complexes", image:"https://image.thum.io/get/width/1200/noanimate/https://www.korbenforpeople.com/robot/robot-atlas-o2/", url:"https://www.korbenforpeople.com/robot/robot-atlas-o2/", stats:["45 Nm","≈5 m/s","4D LiDAR"], desc:"Plateforme quadrupède agile avec perception avancée et connectivité Wi-Fi 6, Bluetooth et 4G." },
];

const FAMILIES = ["Tous","Accueil","Livraison","Livraison sécurisée","Logistique","Nettoyage","Humanoïde","Quadrupède"];

function wa(message:string){ return CONTACT.whatsapp + "?text=" + encodeURIComponent(message); }

export function RoboticsShowcase({ compact=false }: { compact?: boolean }) {
  const [family,setFamily]=useState("Tous");
  const [active,setActive]=useState(PRODUCTS[3]);
  const filtered=useMemo(()=>family==="Tous"?PRODUCTS:PRODUCTS.filter(p=>p.family===family),[family]);

  if(compact) return (
    <section id="robotique" className="relative overflow-hidden border-y border-white/10 bg-[#050608] py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,70,40,.18),transparent_28%),radial-gradient(circle_at_15%_85%,rgba(255,255,255,.05),transparent_32%)]"/>
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:px-12 lg:items-center">
        <div>
          <span className="label-mono text-[9px] tracking-[.3em] text-white/45">07 · XR ROBOTICS / KORBEN</span>
          <h2 className="display-serif mt-5 text-[clamp(3.2rem,7vw,6.8rem)] leading-[.82] tracking-[-.06em]">Le digital ne s’arrête plus à l’écran.</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/55">XR Agency devient votre point d’entrée pour la robotique de service Korben : accueil, livraison, nettoyage, logistique et humanoïdes.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services/robotique" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Découvrir les robots <ArrowRight className="h-4 w-4"/></Link>
            <a href={wa("Bonjour XRAGENCY, je souhaite recevoir une recommandation Korben pour mon entreprise.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/75">Parler à un expert</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 px-3 py-2 label-mono text-[8px] text-white/45">À partir de 499 €/mois*</span>
            <span className="rounded-full border border-white/10 px-3 py-2 label-mono text-[8px] text-white/45">CE · SAV français</span>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0d11]">
          <img src={PRODUCTS[3].image} alt="" className="absolute inset-0 h-full w-full object-contain p-8 grayscale-[.1] transition duration-[1600ms] hover:scale-105"/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,transparent_10%,rgba(0,0,0,.55)_72%)]"/>
          <div className="absolute left-6 top-6 label-mono text-[8px] tracking-[.25em] text-white/40">KORBEN DELIVERY PRO</div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/12 bg-black/65 p-5 backdrop-blur-xl">
            <div className="flex flex-wrap gap-2">{PRODUCTS[3].stats.map(x=><span key={x} className="rounded-full bg-white/[.08] px-3 py-2 label-mono text-[8px] text-white/70">{x}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="relative overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_8%,rgba(255,70,40,.16),transparent_25%),radial-gradient(circle_at_10%_55%,rgba(255,255,255,.035),transparent_30%)]"/>
      <div className="relative mx-auto max-w-[1600px] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
        <div className="grid min-h-[72vh] items-center gap-12 lg:grid-cols-[.86fr_1.14fr]">
          <div>
            <span className="label-mono text-[9px] tracking-[.32em] text-white/45">XRAGENCY · SERVICE 07 · KORBEN</span>
            <h1 className="display-serif mt-7 text-[clamp(3.8rem,8vw,8.6rem)] leading-[.78] tracking-[-.075em]">Votre prochain<br/><em className="not-italic text-white/38">collaborateur</em><br/>est autonome.</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">Une gamme de robots professionnels pour accueillir, livrer, transporter, nettoyer et expérimenter l’IA physique — avec location, achat et démonstration selon votre projet.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#catalogue" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Explorer la gamme <ArrowRight className="h-4 w-4"/></a>
              <a href="#diagnostic" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 label-mono text-[9px] tracking-[.12em] text-white/75">Trouver mon robot</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-y border-white/10 py-5">
              <div><strong className="display-serif text-3xl">499€</strong><span className="mt-1 block label-mono text-[8px] text-white/40">/ mois à partir de*</span></div>
              <div><strong className="display-serif text-3xl">8–21K€</strong><span className="mt-1 block label-mono text-[8px] text-white/40">achat HT*</span></div>
              <div><strong className="display-serif text-3xl">4</strong><span className="mt-1 block label-mono text-[8px] text-white/40">familles</span></div>
            </div>
          </div>
          <div className="relative min-h-[560px] overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#090b0e]">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.05),transparent_35%,rgba(255,70,40,.08))]"/>
            <img src={active.image} alt="" className="absolute inset-0 h-full w-full object-contain p-10 transition duration-700"/>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_18%,rgba(0,0,0,.62)_82%)]"/>
            <div className="absolute left-6 top-6 right-6 flex justify-between"><span className="label-mono text-[8px] tracking-[.25em] text-white/45">{active.family.toUpperCase()}</span><span className="label-mono text-[8px] text-white/30">XR / KORBEN</span></div>
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/12 bg-black/70 p-5 backdrop-blur-xl">
              <div className="flex items-end justify-between gap-4"><div><span className="label-mono text-[8px] text-white/40">MODÈLE</span><h2 className="display-serif mt-1 text-3xl">{active.name}</h2></div><span className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><Bot className="h-4 w-4"/></span></div>
              <div className="mt-4 flex flex-wrap gap-2">{active.stats.map(x=><span key={x} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2 label-mono text-[8px] text-white/65">{x}</span>)}</div><p className="mt-4 max-w-2xl text-xs leading-5 text-white/45">{active.desc}</p><div className="mt-4 flex flex-wrap gap-2"><a href={active.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 label-mono text-[8px] tracking-[.1em] text-white/70 hover:border-white/30 hover:text-white">Fiche / produit officiel <ExternalLink className="h-3 w-3"/></a>{active.tech && <a href={active.tech} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 label-mono text-[8px] tracking-[.1em] text-white/70 hover:border-white/30 hover:text-white">PDF technique <ExternalLink className="h-3 w-3"/></a></div>
            </div>
          </div>
        </div>

        <div id="catalogue" className="mt-10 border-t border-white/10 pt-16">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div><span className="label-mono text-[9px] tracking-[.3em] text-white/40">CATALOGUE KORBEN</span><h2 className="display-serif mt-3 text-4xl sm:text-6xl">Choisissez par usage.</h2></div>
            <div className="flex flex-wrap gap-2">{FAMILIES.map(f=><button key={f} onClick={()=>setFamily(f)} className={`rounded-full border px-3 py-2 label-mono text-[8px] tracking-[.1em] transition ${family===f?"border-white/35 bg-white text-black":"border-white/10 bg-white/[.03] text-white/50 hover:border-white/25"}`}>{f}</button>)}</div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p,i)=><button key={p.id} onClick={()=>setActive(p)} className={`group relative overflow-hidden rounded-[1.7rem] border text-left transition duration-500 ${active.id===p.id?"border-white/30 bg-white/[.08]":"border-white/10 bg-white/[.025] hover:-translate-y-1 hover:border-white/20"}`}>
              <div className="relative h-72 overflow-hidden bg-[#0a0d11]"><img src={p.image} alt={p.name} className="h-full w-full object-contain p-7 transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent"/><span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 label-mono text-[7px] text-white/55">{p.family}</span></div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="display-serif text-2xl">{p.name}</h3><p className="mt-1 text-xs text-white/40">{p.use}</p></div><ArrowRight className="mt-1 h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white"/></div><div className="mt-4 flex flex-wrap gap-1.5">{p.stats.map(s=><span key={s} className="rounded-full bg-white/[.06] px-2 py-1 label-mono text-[7px] text-white/55">{s}</span>)}</div></div>
            </button>)}
          </div>
        </div>

        <div id="diagnostic" className="mt-24 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 sm:p-10">
            <span className="label-mono text-[9px] tracking-[.25em] text-white/40">XR ROBOTICS · METHOD</span>
            <h2 className="display-serif mt-4 text-4xl sm:text-5xl">Pas besoin de choisir seul.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["01","Diagnostic","Flux, surface, tâches, équipe."],
                ["02","Sélection","Modèle + configuration + financement."],
                ["03","Déploiement","Démo, installation, contenu et suivi."],
              ].map(x=><div key={x[0]} className="rounded-2xl border border-white/10 bg-black/20 p-5"><span className="label-mono text-[8px] text-white/35">{x[0]}</span><h3 className="mt-5 text-sm font-semibold">{x[1]}</h3><p className="mt-2 text-xs leading-5 text-white/42">{x[2]}</p></div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-7 sm:p-10">
            <Sparkles className="h-5 w-5 text-white/60"/>
            <h3 className="display-serif mt-5 text-3xl sm:text-4xl">Quel robot correspond à votre activité ?</h3>
            <p className="mt-4 text-sm leading-6 text-white/48">Décrivez votre établissement, vos volumes et les tâches répétitives. Nous vous orientons vers les modèles Korben à considérer.</p>
            <a href={wa("Bonjour XRAGENCY, je veux identifier le robot Korben adapté à mon activité. Secteur : ; Ville : ; Besoin principal : ; Budget : ")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Recevoir une recommandation <ArrowRight className="h-4 w-4"/></a>
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[.025] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><span className="label-mono text-[8px] tracking-[.25em] text-white/35">TARIFICATION PUBLIQUE KORBEN</span><h3 className="display-serif mt-3 text-3xl sm:text-4xl">Location, achat ou démonstration.</h3><p className="mt-4 max-w-3xl text-sm leading-6 text-white/45">Korben annonce une location sur mesure à partir de 499 €/mois, une fourchette d’achat de 8 000 à 21 000 € HT selon le modèle et des locations événementielles à partir de 250 €. Les prix exacts et les conditions sont à confirmer avec Korben selon le robot et le projet.</p></div>
            <a href={wa("Bonjour XRAGENCY, je souhaite recevoir les tarifs et modalités Korben pour un projet robotique.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/75">Demander les tarifs <ArrowRight className="h-4 w-4"/></a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7">
          <a href="https://www.korbenforpeople.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 label-mono text-[9px] tracking-[.15em] text-white/45 hover:text-white">Voir le catalogue Korben <ExternalLink className="h-3.5 w-3.5"/></a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Parler à XRAGENCY <ArrowRight className="h-4 w-4"/></a>
        </div>
      </div>
    </section>
  );
}
