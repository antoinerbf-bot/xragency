import { useMemo, useState } from "react";
import { ArrowRight, Bot, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/content";

type Product = {
  id: string; name: string; family: string; use: string; image: string; url: string;
  stats: string[]; desc: string; tech?: string;
};

const PRODUCTS: Product[] = [
  { id:"tribot", name:"TriBot", family:"Collecte & tri", use:"Hôtel · retail · espaces publics", image:"https://www.korbenforpeople.com/wp-content/uploads/2026/01/S3J0900-scaled.png", url:"https://www.korbenforpeople.com/robot/tribot/", stats:["24 h","120 L","18,5\" écran"], desc:"Robot intelligent de collecte et de tri avec deux bacs de 60 L, batterie interchangeable et écran publicitaire." },
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
  { id:"aura-e", name:"Aura E", family:"Humanoïde", use:"Hôtel · santé · événement · R&D", image:"https://image.thum.io/get/width/1200/noanimate/https://www.korbenforpeople.com/robot/korben-aura-e/", url:"https://www.korbenforpeople.com/robot/korben-aura-e/", tech:"https://www.korbenforpeople.com/wp-content/uploads/2025/11/Korben-Aura-E-FR-Fiche-Technique.pdf", stats:["42 DOF","300 Nm","550 TOPS"], desc:"Humanoïde grandeur nature orienté recherche, développement et intelligence incarnée." },
  { id:"atlas-o2", name:"Atlas O2", family:"Quadrupède", use:"Inspection · R&D · environnements complexes", image:"https://image.thum.io/get/width/1200/noanimate/https://www.korbenforpeople.com/robot/robot-atlas-o2/", url:"https://www.korbenforpeople.com/robot/robot-atlas-o2/", stats:["45 Nm","≈5 m/s","4D LiDAR"], desc:"Plateforme quadrupède agile avec perception avancée et connectivité Wi-Fi 6, Bluetooth et 4G." },
];

const FAMILIES = ["Tous","Accueil","Livraison","Livraison sécurisée","Logistique","Nettoyage","Humanoïde","Quadrupède","Collecte & tri"];
function wa(message:string){ return CONTACT.whatsapp + "?text=" + encodeURIComponent(message); }

function ProductVisual({ product, large=false }: { product: Product; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#080a0d] ${large ? "h-full min-h-[540px]" : "h-72"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.08),transparent_34%),linear-gradient(135deg,#101318,#050608)]" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/[.06]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/[.06]" />
      <img src={product.image} alt={product.name} className={`absolute inset-0 h-full w-full object-contain transition duration-1000 ease-out group-hover:scale-[1.035] ${large ? "p-12 sm:p-16" : "p-7"}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_18%,rgba(0,0,0,.62)_82%)]" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="label-mono text-[7px] tracking-[.28em] text-white/40">KORBEN / XR ROBOTICS</span>
        <span className="label-mono text-[7px] text-white/25">{product.family.toUpperCase()}</span>
      </div>
    </div>
  );
}

export function RoboticsShowcase({ compact=false }: { compact?: boolean }) {
  const [family,setFamily]=useState("Tous");
  const [active,setActive]=useState(PRODUCTS[0]); // TriBot en vedette par défaut
  const filtered=useMemo(()=>family==="Tous"?PRODUCTS:PRODUCTS.filter(p=>p.family===family),[family]);

  if(compact) return (
    <section id="robotique" className="relative overflow-hidden border-y border-white/10 bg-[#050608] py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,255,255,.09),transparent_25%),radial-gradient(circle_at_12%_85%,rgba(255,255,255,.04),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12 lg:items-center">
        <div>
          <span className="label-mono text-[9px] tracking-[.3em] text-white/45">07 · XR ROBOTICS / KORBEN</span>
          <h2 className="display-serif mt-5 max-w-2xl text-[clamp(3.1rem,7vw,6.8rem)] leading-[.82] tracking-[-.06em]">Le digital sort de l’écran.</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/52">Accueil, livraison, nettoyage, logistique et IA physique : une sélection de robots professionnels avec location, achat et démonstration.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services/robotique" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Explorer la gamme <ArrowRight className="h-4 w-4"/></Link>
            <a href={wa("Bonjour XRAGENCY, je souhaite une recommandation de robot Korben pour mon entreprise.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 label-mono text-[9px] tracking-[.12em] text-white/70">Parler à un expert</a>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-5 border-y border-white/10 py-5">
            <div><strong className="display-serif text-3xl">499€</strong><span className="mt-1 block label-mono text-[8px] text-white/35">/ mois à partir de*</span></div>
            <div><strong className="display-serif text-3xl">8–21K€</strong><span className="mt-1 block label-mono text-[8px] text-white/35">achat HT*</span></div>
            <div><strong className="display-serif text-3xl">15+</strong><span className="mt-1 block label-mono text-[8px] text-white/35">modèles</span></div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-[2.4rem] border border-white/10">
          <ProductVisual product={active} large />
          <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
            <div className="flex items-end justify-between gap-4"><div><span className="label-mono text-[7px] text-white/35">SÉLECTION XR</span><h3 className="display-serif mt-1 text-3xl">{active.name}</h3></div><span className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><Bot className="h-4 w-4"/></span></div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="relative overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_7%,rgba(255,255,255,.08),transparent_24%),radial-gradient(circle_at_8%_50%,rgba(255,255,255,.035),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1600px] px-5 pb-28 pt-32 sm:px-8 lg:px-12">
        <div className="grid min-h-[76vh] items-center gap-10 lg:grid-cols-[.78fr_1.22fr]">
          <div className="relative z-10">
            <span className="label-mono text-[9px] tracking-[.32em] text-white/40">XRAGENCY · ROBOTIQUE DE SERVICE · KORBEN</span>
            <h1 className="display-serif mt-7 text-[clamp(3.8rem,8vw,8.7rem)] leading-[.76] tracking-[-.075em]">Louez votre<br/><em className="not-italic text-white/38">prochain</em><br/>collaborateur.</h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/52 sm:text-lg">Des robots professionnels pour absorber les tâches répétitives, fluidifier l’accueil et créer de nouvelles expériences — avec un accompagnement XR de la sélection au déploiement.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#catalogue" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Voir les modèles <ArrowRight className="h-4 w-4"/></a>
              <a href="#diagnostic" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 label-mono text-[9px] tracking-[.12em] text-white/70">Trouver le bon robot</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-y border-white/10 py-5">
              <div><strong className="display-serif text-3xl">499€</strong><span className="mt-1 block label-mono text-[8px] text-white/35">location / mois*</span></div>
              <div><strong className="display-serif text-3xl">8–21K€</strong><span className="mt-1 block label-mono text-[8px] text-white/35">achat HT*</span></div>
              <div><strong className="display-serif text-3xl">15+</strong><span className="mt-1 block label-mono text-[8px] text-white/35">modèles</span></div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#080a0d] shadow-[0_70px_180px_-80px_rgba(0,0,0,.95)]">
            <ProductVisual product={active} large />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.6rem] border border-white/10 bg-black/72 p-5 backdrop-blur-2xl sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><span className="label-mono text-[7px] tracking-[.22em] text-white/35">{active.family.toUpperCase()}</span><h2 className="display-serif mt-1 text-3xl sm:text-4xl">{active.name}</h2><p className="mt-1 text-xs text-white/38">{active.use}</p></div>
                <div className="flex flex-wrap gap-1.5">{active.stats.map(s=><span key={s} className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1.5 label-mono text-[7px] text-white/60">{s}</span>)}</div>
              </div>
              <p className="mt-4 max-w-2xl text-xs leading-5 text-white/43">{active.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2"><a href={active.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 label-mono text-[8px] text-white/65 hover:border-white/30 hover:text-white">Fiche officielle <ExternalLink className="h-3 w-3"/></a>{active.tech && <a href={active.tech} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 label-mono text-[8px] text-white/65 hover:border-white/30 hover:text-white">Fiche technique <ExternalLink className="h-3 w-3"/></a>}</div>
            </div>
          </div>
        </div>

        <div id="catalogue" className="mt-16 border-t border-white/10 pt-20">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div><span className="label-mono text-[9px] tracking-[.3em] text-white/35">01 / CATALOGUE</span><h2 className="display-serif mt-3 text-5xl leading-[.85] sm:text-7xl">Choisissez par<br/><em className="not-italic text-white/35">usage.</em></h2></div>
            <div className="flex max-w-3xl flex-wrap gap-2">{FAMILIES.map(f=><button key={f} onClick={()=>setFamily(f)} className={`rounded-full border px-3 py-2 label-mono text-[8px] tracking-[.1em] transition ${family===f ? "border-white bg-white text-black" : "border-white/10 bg-white/[.02] text-white/45 hover:border-white/25 hover:text-white"}`}>{f}</button>)}</div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(p=>(
              <div key={p.id} className={`group flex flex-col justify-between overflow-hidden rounded-[1.8rem] border text-left transition duration-500 ${active.id===p.id ? "border-white/30 bg-white/[.07]" : "border-white/10 bg-white/[.018] hover:-translate-y-1 hover:border-white/20"}`}>
                <div onClick={()=>setActive(p)} className="cursor-pointer">
                  <ProductVisual product={p}/>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="label-mono text-[7px] text-white/30">{p.family}</span>
                        <h3 className="display-serif mt-1 text-2xl">{p.name}</h3>
                        <p className="mt-1 text-xs text-white/38">{p.use}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white"/>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stats.map(s=><span key={s} className="rounded-full bg-white/[.05] px-2 py-1 label-mono text-[7px] text-white/50">{s}</span>)}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 px-5 py-3 flex items-center justify-between bg-black/40">
                  <button type="button" onClick={()=>setActive(p)} className="label-mono text-[7px] text-white/60 hover:text-white">
                    Voir les détails
                  </button>
                  <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 label-mono text-[7.5px] font-semibold text-emerald-400 hover:text-emerald-300">
                    Fiche officielle site <ExternalLink className="h-3 w-3"/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="diagnostic" className="mt-28 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[.025] p-7 sm:p-10">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full border border-white/[.06] translate-x-1/3 -translate-y-1/3" />
            <span className="label-mono text-[8px] tracking-[.25em] text-white/35">02 / DIAGNOSTIC</span>
            <h2 className="display-serif mt-4 max-w-2xl text-4xl sm:text-6xl">Pas besoin de choisir seul.</h2>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[["01","Observer","Flux, surface, tâches, équipe."],["02","Matcher","Usage + robot + configuration + financement."],["03","Déployer","Démo, installation, contenus et suivi."]].map(x=><div key={x[0]} className="rounded-2xl border border-white/10 bg-black/20 p-5"><span className="label-mono text-[8px] text-white/30">{x[0]}</span><h3 className="mt-5 text-sm font-semibold">{x[1]}</h3><p className="mt-2 text-xs leading-5 text-white/38">{x[2]}</p></div>)}
            </div>
          </div>
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[.04] p-7 sm:p-10">
            <ShieldCheck className="h-5 w-5 text-white/55"/>
            <h3 className="display-serif mt-5 text-4xl">Location ou achat.</h3>
            <p className="mt-4 text-sm leading-6 text-white/45">Korben annonce des locations sur mesure à partir de 499 €/mois, une fourchette d’achat de 8 000 à 21 000 € HT selon le modèle et des locations événementielles à partir de 250 €.</p>
            <a href={wa("Bonjour XRAGENCY, je veux connaître les conditions de location d'un robot Korben pour mon entreprise.")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Demander une offre <ArrowRight className="h-4 w-4"/></a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7">
          <a href="https://www.korbenforpeople.com/" target="_blank" rel="noreferrer" className="label-mono text-[8px] tracking-[.18em] text-white/35 hover:text-white">Catalogue officiel Korben ↗</a>
          <a href={wa("Bonjour XRAGENCY, je souhaite être accompagné pour choisir et louer un robot Korben.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Parler à XRAGENCY <ArrowRight className="h-4 w-4"/></a>
        </div>
      </div>
    </section>
  );
}
