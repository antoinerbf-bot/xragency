import { useEffect, useRef, useState } from "react";
import { ArrowDown, FileImage, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton } from "./primitives";

const SECTOR_CHIPS=[["restaurant","Gastronomie"],["hospitality","Hôtellerie"],["realestate","Immobilier"],["automotive","Automobile"],["fashion","Mode"],["jewelry","Joaillerie"]];

function useCountUp(target:number,duration=1400){const[value,setValue]=useState(target);useEffect(()=>{let frame=0;const start=performance.now();const tick=(now:number)=>{const p=Math.min((now-start)/duration,1);setValue(Math.max(1,Math.round(target*(1-Math.pow(1-p,3)))));if(p<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[target,duration]);return value}

function Stat({value,suffix,label}:{value:number;suffix:string;label:string}){return <div className="px-3 py-3 sm:px-5"><div className="display-serif text-2xl font-semibold text-primary sm:text-3xl">{useCountUp(value)}{suffix}</div><div className="mt-1 text-xs text-white/60">{label}</div></div>}

export function Hero(){
 const{t}=useLang();const videoRef=useRef<HTMLVideoElement>(null);const[canPlay,setCanPlay]=useState(true);
 useEffect(()=>{const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const save=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData??false;setCanPlay(!(reduce||save));},[]);
 const chooseSector=(id:string)=>{window.dispatchEvent(new CustomEvent("xr:sector",{detail:{id}}));document.getElementById("quote")?.scrollIntoView({behavior:"smooth",block:"start"})};
 return <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-zinc-950 text-white">
   <div className="absolute inset-0">
    {canPlay?<video ref={videoRef} autoPlay loop muted playsInline preload="metadata" poster="/media/hero-poster.webp" className="h-full w-full object-cover object-center" aria-hidden><source src="/media/hero-desktop.mp4" media="(min-width:768px)" type="video/mp4"/><source src="/media/hero-mobile.mp4" type="video/mp4"/></video>:<img src="/media/hero-poster.webp" alt="" className="h-full w-full object-cover object-center"/>}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.92)_0%,rgba(8,8,8,.72)_38%,rgba(8,8,8,.28)_72%,rgba(8,8,8,.52)_100%)]"/>
    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,.88)_0%,transparent_45%,rgba(8,8,8,.2)_100%)]"/>
   </div>
   <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-6 pt-28 sm:px-8 sm:pb-10 lg:px-12">
    <div className="max-w-5xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/25 px-3 py-1.5 backdrop-blur-md"><Sparkles className="h-3.5 w-3.5 text-primary"/><span className="text-xs font-medium tracking-wide text-white/85">{t(UI.heroKicker)}</span></div>
      <h1 className="display-serif max-w-4xl text-[clamp(3rem,7vw,6.8rem)] leading-[.9] tracking-[-.04em]">{t(UI.heroTitle1)}<br/><em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em> {t(UI.heroTitle2)}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{t(UI.heroLead)}</p>
      <p className="mt-2 text-sm text-white/55">{t(UI.heroMeta)}</p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <EmberButton href="#quote" className="bg-primary px-7 text-sm text-primary-foreground">Faire mon devis <ArrowDown className="h-4 w-4"/></EmberButton>
        <a href={CONTACT.whatsapp+"?text="+encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm text-white backdrop-blur-md transition hover:border-primary/60 hover:bg-primary/10"><FileImage className="h-4 w-4 text-primary"/>Maquette · 200 €</a>
      </div>
      <p className="mt-3 text-xs text-white/55">{t(UI.ctaReassurance)}</p>
      <div className="mt-7 grid max-w-2xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black/25 backdrop-blur-xl sm:grid-cols-4">
        <Stat value={500} suffix="+" label={t(UI.statProjects)}/><Stat value={8} suffix="+" label={t(UI.statYears)}/><Stat value={98} suffix="%" label={t(UI.statSatisfaction)}/><Stat value={2} suffix="h" label={t(UI.statResponse)}/>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-white/60">Choisissez votre univers</div>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">{SECTOR_CHIPS.map(([id,label],i)=><button key={id} type="button" onClick={()=>chooseSector(id)} className="min-h-11 shrink-0 rounded-full border border-white/20 bg-white/[.07] px-4 text-sm text-white/80 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/15">{String(i+1).padStart(2,"0")} · {label}</button>)}</div>
      </div>
    </div>
   </div>
 </section>
}