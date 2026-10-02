import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Globe2, Layers3, MapPinned, Palette, Search, Share2 } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
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
  const nodes=[
    ["WEB","01",Globe2],
    ["BRAND","02",Palette],
    ["SEO","03",Search],
    ["LOCAL","04",MapPinned],
    ["SOCIAL","05",Share2],
    ["ROBOTICS","07",Bot],
  ] as const;

  return <Parallax speed={-0.018} className="h-full">
    <div className="xr-depth relative min-h-[500px] overflow-hidden rounded-[2.35rem] border xr-line bg-[var(--xr-ink)] p-3 shadow-[var(--xr-shadow)] sm:min-h-[620px]">
      <div className="relative h-full min-h-[474px] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[var(--xr-ink)] sm:min-h-[594px]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,.14),transparent_27%),radial-gradient(circle_at_72%_72%,rgba(255,255,255,.07),transparent_24%)]"/>
        <div aria-hidden className="absolute left-1/2 top-[43%] h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:h-[320px] sm:w-[320px]"/>
        <div aria-hidden className="absolute left-1/2 top-[43%] h-[175px] w-[175px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[230px] sm:w-[230px]"/>
        <div aria-hidden className="absolute left-1/2 top-[43%] h-[105px] w-[105px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-black shadow-[0_30px_90px_-24px_rgba(255,255,255,.5)] sm:h-[132px] sm:w-[132px]"/>
        <div aria-hidden className="absolute left-1/2 top-[43%] h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 sm:h-[162px] sm:w-[162px]"/>
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
          <span className="label-mono text-[6px] tracking-[.24em] text-white/50">XRAGENCY / DIGITAL SYSTEM</span>
          <span className="label-mono text-[6px] text-white/35">MONOCHROME 2026</span>
        </div>
        <div className="absolute left-5 right-5 top-[27%] text-white sm:left-8 sm:right-8">
          <div className="flex items-center justify-between gap-4">
            <span className="label-mono text-[7px] tracking-[.22em] text-white/45">UNE SEULE DIRECTION</span>
            <span className="label-mono text-[6px] text-white/30">01—07</span>
          </div>
          <p className="mt-5 display-serif text-[3.7rem] leading-[.8] tracking-[-.06em] sm:text-[5.8rem]">Design.<br/><em className="not-italic text-white/40">Visibilité.</em><br/>Conversion.</p>
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 sm:bottom-7 sm:left-7 sm:right-7">
          {nodes.map(([name,code,Icon])=><div key={name} className="rounded-xl border border-white/10 bg-white/[.05] p-3 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[.09]">
            <Icon className="h-3.5 w-3.5 text-white/70"/>
            <span className="mt-2 block label-mono text-[5px] text-white/35">{code}</span>
            <span className="mt-1 block text-[8px] font-semibold text-white">{name}</span>
          </div>)}
        </div>
        <div aria-hidden className="absolute left-0 right-0 top-[43%] h-px bg-white/10"/>
        <div aria-hidden className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-white/8"/>
        <span aria-hidden className="absolute left-1/2 top-[43%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-black"/>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35 animate-scanline"/>
      </div>
      <div className="absolute -bottom-5 left-7 right-7 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 shadow-xl backdrop-blur-xl sm:-bottom-6">
        <div className="flex items-center justify-between gap-4">
          <span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">SYSTEME XR · 100% MONOCHROME · RESPONSIVE</span>
          <ArrowUpRight className="h-3.5 w-3.5 xr-accent"/>
        </div>
      </div>
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
          <Reveal delay={230}><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><EmberButton href="#quote" className="justify-center bg-[var(--xr-ink)] px-7 py-4 text-[var(--xr-bg)] hover:brightness-110">Construire mon projet <ArrowRight className="h-4 w-4"/></EmberButton><a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-6 py-4 label-mono text-[8px] tracking-[.14em] xr-muted hover:bg-[var(--xr-surface)] hover:text-[var(--xr-ink)]"><Search className="h-3.5 w-3.5"/>Lancer mon audit</a></div></Reveal>
          <Reveal delay={300}><div className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-y xr-line py-5"><Stat value={500} suffix="+" label={t(UI.statProjects)}/><Stat value={8} suffix="+" label={t(UI.statYears)}/><Stat value={98} suffix="%" label={t(UI.statSatisfaction)}/></div></Reveal>
          <Reveal delay={360}><div className="mt-5 flex flex-wrap items-center gap-3"><span className="label-mono text-[6px] tracking-[.2em] xr-muted-2">WEB · BRAND · SEO · LOCAL · SOCIAL · IA · ROBOTICS</span><span className="h-px w-8 bg-[var(--xr-line)]"/><div className="flex gap-1">{LANGS.map(l=><span key={l.code} className="text-sm opacity-75">{l.flag}</span>)}</div></div></Reveal>
        </div></Parallax>
        <HeroVisual/>
      </div>
    </div>
    <div className="border-t xr-line"><div className="mx-auto flex max-w-[1600px] gap-10 overflow-hidden px-5 py-4 sm:px-8 lg:px-12"><div className="flex min-w-max animate-marquee items-center gap-9 label-mono text-[7px] tracking-[.28em] xr-muted-2">{Array.from({length:2}).flatMap((_,r)=>["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE","ROBOTICS"].map((x,i)=><span key={r+"-"+i} className="inline-flex items-center gap-9"><span>{x}</span><span className="opacity-45">✦</span></span>))}</div></div></div>
  </section>;
}
