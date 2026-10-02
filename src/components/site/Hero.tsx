import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, ChevronDown, Globe2, Layers3, Palette, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax, Reveal } from "./primitives";
import { XR_HERO_PHOTO } from "@/lib/photography";

function useCountUp(target:number,duration=1100,delay=220){
 const [value,setValue]=useState(target);
 useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;setValue(0);const t=window.setTimeout(()=>{const start=performance.now();const tick=(now:number)=>{const p=Math.min((now-start)/duration,1);setValue(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)},delay);return()=>window.clearTimeout(t)},[target,duration,delay]);
 return value;
}
function Stat({value,suffix,label}:{value:number;suffix?:string;label:string}){return <div className="border-l xr-line pl-4 first:border-l-0 first:pl-0"><strong className="display-serif text-3xl tracking-[-.04em]">{useCountUp(value)}{suffix}</strong><span className="mt-1 block label-mono text-[6px] tracking-[.18em] xr-muted-2">{label}</span></div>}

const MODULES=[["01","WEB",Globe2],["02","BRAND",Palette],["03","SEARCH",Search],["04","SOCIAL",Layers3],["05","ROBOTICS",Bot]] as const;

function HeroVisual(){
 return <div className="xr-depth relative min-h-[560px] sm:min-h-[660px]">
   <Parallax speed={0.04} direction="both" className="absolute inset-x-[3%] top-0">
     <div className="relative h-[520px] overflow-hidden rounded-[2.6rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)] sm:h-[610px]">
       <img src={XR_HERO_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.32] grayscale-[.2] dark:opacity-[.48]"/>
       <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,242,237,.88),rgba(244,242,237,.2)_45%,rgba(244,242,237,.92))] dark:bg-[linear-gradient(135deg,rgba(7,9,13,.78),rgba(7,9,13,.12)_45%,rgba(7,9,13,.9))]"/>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(43,92,255,.17),transparent_28%)] dark:bg-[radial-gradient(circle_at_70%_28%,rgba(143,168,255,.2),transparent_28%)]"/>
       <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8"><span className="label-mono text-[7px] tracking-[.24em] xr-muted-2">XRAGENCY / DIGITAL HOUSE</span><span className="label-mono text-[7px] xr-muted-2">MMXXVI</span></div>

       <Parallax speed={-0.035} direction="y" className="absolute left-[7%] top-[11%] w-[58%] sm:left-[9%] sm:top-[12%] sm:w-[55%]">
         <div className="xr-depth-card rounded-[1.7rem] border xr-line bg-[var(--xr-surface-strong)] p-5 shadow-[var(--xr-shadow)] backdrop-blur-xl sm:p-7">
           <div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">THE DIGITAL EXPERIENCE</span><span className="grid h-8 w-8 place-items-center rounded-full xr-accent-bg"><Sparkles className="h-3.5 w-3.5 xr-accent"/></span></div>
           <p className="mt-8 display-serif text-4xl leading-[.86] tracking-[-.05em] sm:text-6xl">Une marque.<br/>Un parcours.<br/><em className="not-italic opacity-45">Un système.</em></p>
           <div className="mt-7 grid grid-cols-3 gap-2">{[["ATTIRER","SEO"],["CONVAINCRE","BRAND"],["CONVERTIR","WEB"]].map(([a,b])=><div key={a} className="rounded-xl border xr-line p-3"><span className="label-mono text-[5px] xr-muted-2">{b}</span><span className="mt-2 block text-[8px] font-semibold">{a}</span></div>)}</div>
         </div>
       </Parallax>

       <Parallax speed={0.028} direction="both" className="absolute bottom-[6%] right-[6%] w-[48%] sm:bottom-[7%] sm:right-[7%] sm:w-[43%]">
         <div className="xr-depth-card overflow-hidden rounded-[1.7rem] border xr-line bg-[var(--xr-surface-strong)] shadow-[var(--xr-shadow)] backdrop-blur-2xl">
           <div className="relative h-52 sm:h-64"><img src={XR_HERO_PHOTO} alt="" className="h-full w-full object-cover opacity-70 grayscale-[.25] dark:opacity-80"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute bottom-5 left-5 right-5 text-white"><span className="label-mono text-[6px] text-white/45">DIRECTION / 07 MODULES</span><p className="mt-2 text-sm font-semibold">Tout doit fonctionner ensemble.</p></div></div>
           <div className="grid grid-cols-3 gap-px bg-current/10">{[["WEB","01"],["LOCAL","02"],["IA","03"]].map(([x,n])=><div key={x} className="bg-[var(--xr-surface-strong)] p-3 text-center"><span className="label-mono text-[5px] xr-muted-2">{n}</span><span className="mt-1 block text-[8px] font-semibold">{x}</span></div>)}</div>
         </div>
       </Parallax>

       <div className="absolute bottom-6 left-6 rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 backdrop-blur-xl sm:bottom-8 sm:left-8"><span className="label-mono text-[6px] tracking-[.16em]">SCROLL → EXPLORE</span></div>
     </div>
   </Parallax>

   <div className="absolute right-[2%] top-[8%] z-20 hidden w-[25%] space-y-2 lg:block">{MODULES.slice(0,4).map(([code,name,Icon],i)=><Parallax key={code} speed={-0.018-i*.003}><div className="flex items-center gap-2 rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-3 shadow-xl backdrop-blur-xl"><span className="grid h-8 w-8 place-items-center rounded-xl border xr-line"><Icon className="h-3.5 w-3.5 opacity-55"/></span><div><span className="label-mono block text-[5px] xr-muted-2">{code}</span><span className="text-[8px] font-semibold">{name}</span></div></div></Parallax>)}</div>
 </div>;
}

export function Hero(){
 const {t}=useLang();
 return <section id="top" className="xr-section xr-noise relative overflow-hidden border-b xr-line">
   <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,var(--xr-accent-soft),transparent_26%),radial-gradient(circle_at_88%_88%,rgba(120,120,140,.1),transparent_24%)]"/>
   <div className="relative mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pt-32">
     <div className="grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
       <Parallax speed={-0.025}><div className="max-w-3xl"><Reveal><div className="flex items-center gap-3"><span className="h-px w-10 bg-[var(--xr-accent)]"/><span className="label-mono text-[8px] tracking-[.28em] xr-muted-2">{t(UI.heroKicker)}</span></div></Reveal>
         <Reveal delay={90}><h1 className="display-serif mt-7 text-[clamp(3.4rem,6.8vw,7.7rem)] leading-[.81] tracking-[-.07em]">{t(UI.heroTitle1)} <span className="xr-accent">{t(UI.heroTitleAccent)}</span><br/><em className="not-italic opacity-42">{t(UI.heroTitle2)}</em></h1></Reveal>
         <Reveal delay={160}><p className="mt-8 max-w-2xl text-base leading-7 xr-muted sm:text-lg">{t(UI.heroLead)}</p></Reveal>
         <Reveal delay={220}><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><EmberButton href="#quote" className="justify-center bg-[var(--xr-ink)] px-7 py-4 text-[var(--xr-bg)] hover:brightness-110">Construire mon projet <ArrowRight className="h-4 w-4"/></EmberButton><a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-6 py-4 label-mono text-[8px] tracking-[.14em] xr-muted hover:bg-[var(--xr-surface)] hover:text-[var(--xr-ink)]"><Search className="h-3.5 w-3.5"/>Lancer mon audit</a></div></Reveal>
         <Reveal delay={300}><div className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-y xr-line py-5"><Stat value={500} suffix="+" label={t(UI.statProjects)}/><Stat value={8} suffix="+" label={t(UI.statYears)}/><Stat value={98} suffix="%" label={t(UI.statSatisfaction)}/></div></Reveal>
         <Reveal delay={360}><div className="mt-5 flex flex-wrap items-center gap-3"><span className="label-mono text-[6px] tracking-[.2em] xr-muted-2">WEB · BRAND · SEO · LOCAL · SOCIAL · IA · ROBOTICS</span><span className="h-px w-8 bg-[var(--xr-line)]"/><div className="flex gap-1">{LANGS.map(l=><span key={l.code} className="text-sm opacity-75">{l.flag}</span>)}</div></div></Reveal>
       </div></Parallax>
       <HeroVisual/>
     </div>
   </div>
   <div className="border-t xr-line"><div className="mx-auto flex max-w-[1600px] gap-10 overflow-hidden px-5 py-4 sm:px-8 lg:px-12"><div className="flex min-w-max animate-marquee items-center gap-9 label-mono text-[7px] tracking-[.28em] xr-muted-2">{Array.from({length:2}).flatMap((_,r)=>["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE","ROBOTICS"].map((x,i)=><span key={r+"-"+i} className="inline-flex items-center gap-9"><span>{x}</span><span className="opacity-45">✦</span></span>))}</div></div></div>
   <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 opacity-40 lg:flex"><ChevronDown className="h-3.5 w-3.5 animate-pulse-soft"/><span className="label-mono text-[6px] tracking-[.28em]">DÉFILEZ</span></div>
 </section>;
}
