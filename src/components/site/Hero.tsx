import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileImage, ShieldCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton } from "./primitives";
import pf07 from "@/assets/pf-07-lumina-digital.jpg";

const HERO_SECTORS = [
  ["restaurant","Restaurant · café · bar"],["hospitality","Hôtel · villa · resort"],["realestate","Immobilier · location"],
  ["automotive","Automobile · mobilité"],["fashion","Mode · accessoires"],["jewelry","Joaillerie · horlogerie"],
  ["beauty","Beauté · spa"],["health","Santé · médical"],["architecture","Architecture · intérieur"],
  ["construction","Construction · rénovation"],["legal","Avocat · droit"],["finance","Finance · patrimoine"],
  ["commerce","Commerce · e-commerce"],["tourism","Voyage · tourisme"],["agency","Agence · studio"]
] as const;

function Stat({value,label}:{value:string;label:string}) {
  return <div className="px-4 py-3 sm:px-5"><div className="display-serif text-xl text-primary sm:text-2xl">{value}</div><div className="mt-1 text-sm text-muted-foreground">{label}</div></div>;
}

export function Hero(){
  const {t}=useLang();
  const videoRef=useRef<HTMLVideoElement>(null);
  const [reduceMotion,setReduceMotion]=useState(false);
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>{const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;setReduceMotion(mq.matches||Boolean(connection?.saveData));};
    update(); mq.addEventListener?.("change",update);
    return()=>mq.removeEventListener?.("change",update);
  },[]);
  useEffect(()=>{
    if(reduceMotion) return;
    const onScroll=()=>{
      const el=videoRef.current;
      if(!el||!Number.isFinite(el.duration)||el.duration<=0) return;
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      const progress=Math.min(1,Math.max(0,window.scrollY/max));
      const target=progress*el.duration*.72;
      if(Math.abs(el.currentTime-target)>.08) el.currentTime=target;
    };
    window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
    return()=>window.removeEventListener("scroll",onScroll);
  },[reduceMotion]);
  const goSector=(id:string)=>{
    window.dispatchEvent(new CustomEvent("xr:sector",{detail:id}));
    document.getElementById("quote")?.scrollIntoView({behavior:reduceMotion?"auto":"smooth"});
  };
  return <section id="top" className="grain relative min-h-[100svh] overflow-hidden pt-20 sm:pt-24">
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <img src={pf07} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-45 saturate-[.7]"/>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.22)_62%,rgba(0,0,0,.55))]"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.58),transparent_35%,var(--background)_100%)]"/>
      {!reduceMotion&&<video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={pf07} className="absolute inset-0 h-full w-full object-cover object-center opacity-55 mix-blend-screen" aria-hidden><source src="/media/hero-desktop.mp4" type="video/mp4"/></video>}
      <div className="absolute -right-[8%] top-[15%] h-[48vw] w-[48vw] rounded-full bg-primary/[.12] blur-[110px]"/>
      <div className="pointer-events-none absolute inset-0 opacity-[.05] [background-image:radial-gradient(rgba(255,255,255,.9)_0.7px,transparent_0.7px)] [background-size:5px_5px]"/>
    </div>
    <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1500px] flex-col justify-end px-5 pb-5 sm:px-8 sm:pb-7 lg:px-12">
      <div className="max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-md"><Sparkles className="h-3.5 w-3.5 text-primary"/><span className="text-sm font-medium tracking-[.08em] text-white/85">{t(UI.heroKicker)}</span></div>
        <h1 className="display-serif mt-5 max-w-6xl text-[clamp(3rem,8vw,8.4rem)] leading-[.82] tracking-[-.05em] text-white">{t(UI.heroTitle1)}<br/><em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}{t(UI.heroTitle2)}</h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{t(UI.heroLead)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <EmberButton href="#quote" className="px-6 py-3.5">Faire mon devis gratuit <ArrowUpRight className="h-4 w-4"/></EmberButton>
          <a href={CONTACT.whatsapp+"?text="+encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).")} target="_blank" rel="noreferrer" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/60"><FileImage className="h-4 w-4 text-primary"/>Maquette gratuite · 200 €</a>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-white/60"><ShieldCheck className="h-4 w-4 text-primary"/>Audit digital gratuit · sans engagement</div>
      </div>
      <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
          <Stat value="500+" label={t(UI.statProjects)}/><Stat value="8+" label={t(UI.statYears)}/><Stat value="7" label="expertises"/><Stat value="3" label="langues"/>
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {HERO_SECTORS.map(([id,label])=><button key={id} type="button" onClick={()=>goSector(id)} className="min-h-[40px] shrink-0 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/75 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/55 hover:text-white">{label}</button>)}
      </div>
    </div>
  </section>;
}
