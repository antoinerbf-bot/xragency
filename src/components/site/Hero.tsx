import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Globe2, Layers3, MapPinned, Palette, Search, Share2 } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";\nimport { XR_PHOTOS } from "@/lib/photography";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax, Reveal } from "./primitives";

function useCountUp(target:number,duration=1100,delay=220){
  const [value,setValue]=useState(target);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    setValue(0);
    const t=window.setTimeout(()=>{
      const start=performance.now();
      const tick=(now:number)=>{
        const p=Math.min((now-start)/duration,1);
        setValue(Math.round(target*(1-Math.pow(1-p,3))));
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },delay);
    return()=>window.clearTimeout(t);
  },[target,duration,delay]);
  return value;
}

function Stat({value,suffix,label}:{value:number;suffix?:string;label:string}){
  return <div className="border-l xr-line pl-4 first:border-l-0 first:pl-0"><strong className="display-serif text-3xl tracking-[-.04em]">{useCountUp(value)}{suffix}</strong><span className="mt-1 block label-mono text-[6px] tracking-[.18em] xr-muted-2">{label}</span></div>;
}

function HeroVisual(){
  const cards=[
    {name:"WEB DESIGN",code:"01",src:XR_PHOTOS.websites},
    {name:"GOOGLE MAPS",code:"04",src:XR_PHOTOS.maps},
    {name:"SOCIAL MEDIA",code:"05",src:XR_PHOTOS.social},
  ];
  return <Parallax speed={-0.018} className="h-full">
    <div className="xr-depth relative min-h-[500px] overflow-hidden rounded-[2.35rem] border xr-line bg-[var(--xr-ink)] p-3 shadow-[var(--xr-shadow)] sm:min-h-[620px]">
      <div className="relative min-h-[474px] overflow-hidden rounded-[1.9rem] border border-white/10 bg-black sm:min-h-[594px]">
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-75 sm:gap-2">
          {cards.map((card,i)=><div key={card.name} className={"group relative overflow-hidden "+(i===0?"col-span-2":"")}>
            <img src={card.src} alt={card.name} className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0" loading={i===0?"eager":"lazy"}/>
            <div className="absolute inset-0 bg-black/45"/>
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5"><span className="label-mono text-[6px] text-white/55">{card.code} · XRAGENCY</span><p className="mt-1 text-[9px] font-semibold tracking-[.12em] text-white sm:text-xs">{card.name}</p></div>
          </div>)}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_15%,rgba(0,0,0,.3)_55%,rgba(0,0,0,.72)_100%)]"/>
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7"><span className="label-mono text-[6px] tracking-[.24em] text-white/65">XRAGENCY / DIGITAL EXPERIENCES</span><span className="label-mono text-[6px] text-white/45">01—07</span></div>
        <div className="absolute left-5 right-5 top-[28%] sm:left-8 sm:right-8"><span className="label-mono text-[7px] tracking-[.22em] text-white/55">DESIGN · VISIBILITÉ · CONVERSION</span><p className="mt-4 max-w-xl display-serif text-[3.1rem] leading-[.84] tracking-[-.06em] text-white sm:text-[5.2rem]">Une présence digitale<br/><em className="not-italic text-white/55">qui se voit.</em></p></div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7"><span className="max-w-xs label-mono text-[6px] leading-4 tracking-[.14em] text-white/55">WEB · BRAND · SEO · GOOGLE MAPS · SOCIAL · IA</span><span className="rounded-full border border-white/20 bg-black/35 px-3 py-2 label-mono text-[6px] text-white backdrop-blur-xl">SCROLL TO EXPLORE</span></div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45 animate-scanline"/>
      </div>
      <div className="absolute -bottom-5 left-7 right-7 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 shadow-xl backdrop-blur-xl sm:-bottom-6"><div className="flex items-center justify-between gap-4"><span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">SERVICES EN IMAGES · MONOCHROME · IMMERSIF</span><ArrowUpRight className="h-3.5 w-3.5 xr-accent"/></div></div>
    </div>
  </Parallax>;
}

export function Hero(){
  const {t}=useLang();
  return <section id="top" className="xr-section xr-noise relative overflow-hidden border-b xr-line">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,var(--xr-accent-soft),transparent_25%),radial-gradient(circle_at_92%_82%,rgba(20,20,24,.07),transparent_24%)]"/>
    <div className="relative mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <Parallax speed={-0.022}><div className="max-w-3xl">
          <Reveal><div className="flex items-center gap-3"><span className="h-px w-10 bg-[var(--xr-accent)]"/><span className="label-mono text-[8px] tracking-[.28em] xr-muted-2">{t(UI.heroKicker)}</span></div></Reveal>
          <Reveal delay={90}><h1 className="display-serif mt-7 text-[clamp(3.4rem,6.6vw,7.2rem)] leading-[.81] tracking-[-.07em]">{t(UI.heroTitle1)} <span className="xr-accent">{t(UI.heroTitleAccent)}</span><br/><em className="not-italic opacity-42">{t(UI.heroTitle2)}</em></h1></Reveal>
          <Reveal delay={160}><p className="mt-8 max-w-2xl text-base leading-7 xr-muted sm:text-lg">{t(UI.heroLead)}</p></Reveal>
          <Reveal delay={230}><div className="mt-9 grid gap-3 sm:grid-cols-2"><a href="#audit" className="group rounded-[1.35rem] border xr-line bg-[var(--xr-surface)] p-4 text-left transition hover:-translate-y-1 hover:bg-[var(--xr-surface-strong)]"><div className="flex items-center justify-between"><span className="label-mono text-[6px] tracking-[.18em] xr-accent">OFFERT · VALEUR 100 €</span><Search className="h-4 w-4 xr-accent"/></div><p className="mt-3 text-sm font-semibold">Demander mon audit gratuit</p><p className="mt-1 text-[8px] leading-4 xr-muted">Analyse de votre présence digitale + recommandations concrètes.</p></a><a href="#quote" className="group rounded-[1.35rem] border xr-line bg-[var(--xr-surface)] p-4 text-left transition hover:-translate-y-1 hover:bg-[var(--xr-surface-strong)]"><div className="flex items-center justify-between"><span className="label-mono text-[6px] tracking-[.18em] xr-accent">OFFERT · VALEUR 200 €</span><ArrowRight className="h-4 w-4 xr-accent"/></div><p className="mt-3 text-sm font-semibold">Demander ma maquette gratuite</p><p className="mt-1 text-[8px] leading-4 xr-muted">Une première direction visuelle pour concrétiser votre projet.</p></a></div></Reveal>
          <Reveal delay={300}><div className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-y xr-line py-5"><Stat value={500} suffix="+" label={t(UI.statProjects)}/><Stat value={8} suffix="+" label={t(UI.statYears)}/><Stat value={98} suffix="%" label={t(UI.statSatisfaction)}/></div></Reveal>
          <Reveal delay={360}><div className="mt-5 flex flex-wrap items-center gap-3"><span className="label-mono text-[6px] tracking-[.2em] xr-muted-2">WEB · BRAND · SEO · LOCAL · SOCIAL · IA · ROBOTICS</span><span className="h-px w-8 bg-[var(--xr-line)]"/><div className="flex gap-1">{LANGS.map(l=><span key={l.code} className="text-sm opacity-75">{l.flag}</span>)}</div></div></Reveal>
        </div></Parallax>
        <HeroVisual/>
      </div>
    </div>
    <div className="border-t xr-line"><div className="mx-auto flex max-w-[1600px] gap-10 overflow-hidden px-5 py-4 sm:px-8 lg:px-12"><div className="flex min-w-max animate-marquee items-center gap-9 label-mono text-[7px] tracking-[.28em] xr-muted-2">{Array.from({length:2}).flatMap((_,r)=>["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE","ROBOTICS"].map((x,i)=><span key={r+"-"+i} className="inline-flex items-center gap-9"><span>{x}</span><span className="opacity-45">✦</span></span>))}</div></div></div>
  </section>;
}
