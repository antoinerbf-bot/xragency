import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Globe2, Instagram, MapPinned, Palette, Search, Sparkles } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { EmberButton, Parallax, Reveal } from "./primitives";
import { XR_PHOTOS } from "@/lib/photography";

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

const REEL=[
  {id:"web",label:"WEB DESIGN",photo:XR_PHOTOS.websites,tag:"01",caption:"Expérience · UX · conversion"},
  {id:"maps",label:"GOOGLE MAPS",photo:XR_PHOTOS.maps,tag:"04",caption:"Visibilité locale · top 3"},
  {id:"social",label:"SOCIAL CONTENT",photo:XR_PHOTOS.social,tag:"05",caption:"Instagram · Facebook · TikTok"},
];

function ReelCard({item,index}:{item:(typeof REEL)[number];index:number}){
  return <Parallax speed={index===1?-0.035:index===0?0.018:0.04} direction="both" className="h-full">
    <article className={"xr-depth-card group relative h-full overflow-hidden rounded-[2rem] border xr-line bg-black "+(index===1?"min-h-[430px] sm:min-h-[540px]":"min-h-[320px] sm:min-h-[420px]")}>
      <img src={item.photo} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[.12] transition duration-[1400ms] group-hover:scale-[1.045] group-hover:grayscale-0"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/5"/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.16),transparent_32%)]"/>
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-center justify-between"><span className="label-mono text-[6px] tracking-[.2em] text-white/55">XR / {item.tag}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/8 text-white/80 backdrop-blur"><ArrowUpRight className="h-3.5 w-3.5"/></span></div>
        <div><p className="label-mono text-[7px] tracking-[.2em] text-white/55">{item.label}</p><h3 className="mt-3 text-lg font-medium tracking-[-.02em] text-white sm:text-xl">{item.caption}</h3></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px origin-left bg-white/50 animate-film-pulse"/>
    </article>
  </Parallax>;
}

function HeroVisual(){
  return <div className="xr-depth relative">
    <div className="absolute -inset-10 hidden rounded-full bg-[radial-gradient(circle_at_55%_42%,var(--xr-accent-soft),transparent_58%)] blur-2xl lg:block"/>
    <div className="relative grid gap-3 sm:grid-cols-[.72fr_1.12fr_.72fr]">
      <ReelCard item={REEL[0]} index={0}/>
      <div className="relative">
        <Parallax speed={-0.025} className="h-full">
          <div className="relative h-full overflow-hidden rounded-[2.35rem] border xr-line bg-[var(--xr-ink)] p-3 shadow-[var(--xr-shadow)]">
            <div className="relative h-full min-h-[480px] overflow-hidden rounded-[1.9rem] bg-black sm:min-h-[620px]">
              <img src={XR_PHOTOS.branding} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale-[.08]"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.25)_42%,rgba(0,0,0,.92))]"/>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(198,83,63,.32),transparent_26%)]"/>
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7"><span className="label-mono text-[6px] tracking-[.24em] text-white/50">XRAGENCY / MOTION REEL</span><span className="label-mono text-[6px] text-white/35">2026</span></div>
              <div className="absolute left-5 top-[40%] max-w-[75%] sm:left-8">
                <span className="label-mono text-[7px] tracking-[.22em] text-white/50">UNE MAISON DIGITALE</span>
                <p className="mt-3 display-serif text-[3.7rem] leading-[.8] tracking-[-.06em] text-white sm:text-[5.7rem]">Une marque.<br/><em className="not-italic text-white/42">Un univers.</em></p>
                <p className="mt-5 max-w-sm text-xs leading-5 text-white/52 sm:text-sm">Nous relions identité, expérience, visibilité et conversion dans un même mouvement.</p>
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 sm:bottom-7 sm:left-7 sm:right-7">
                {[["WEB","01",Globe2],["LOCAL","04",MapPinned],["SOCIAL","05",Instagram]].map(([name,code,Icon])=><div key={String(name)} className="rounded-xl border border-white/12 bg-white/6 p-3 backdrop-blur-xl"><Icon className="h-3.5 w-3.5 text-white/72"/><span className="mt-2 block label-mono text-[5px] text-white/42">{String(code)}</span><span className="mt-1 block text-[8px] font-semibold text-white">{String(name)}</span></div>)}
              </div>
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10">
                <span className="absolute left-[-2px] top-[44%] h-1 w-1 rounded-full bg-[var(--xr-accent)] shadow-[0_0_20px_var(--xr-accent)]"/>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40 animate-scanline"/>
            </div>
          </div>
        </Parallax>
        <div className="absolute -bottom-5 left-7 right-7 z-20 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 shadow-xl backdrop-blur-xl sm:-bottom-6"><div className="flex items-center justify-between gap-4"><span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">SCROLL · VOIR LE SYSTÈME PRENDRE FORME</span><ArrowRight className="h-3.5 w-3.5 xr-accent"/></div></div>
      </div>
      <ReelCard item={REEL[2]} index={2}/>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        ["02","BRANDING",Palette,"Identité"],
        ["03","SEO",Search,"Top 3"],
        ["06","WEBCARE",Sparkles,"Suivi"],
        ["07","ROBOTICS",Bot,"Service"],
      ].map(([num,label,Icon,desc])=><Parallax key={String(num)} speed={Number(num)%2?0.015:-0.02}><div className="xr-panel group flex min-h-[88px] items-end justify-between rounded-[1.45rem] p-4 transition duration-500 hover:-translate-y-1"><div><span className="label-mono text-[5px] xr-muted-2">{String(num)}</span><span className="mt-1 block text-[8px] font-semibold">{String(label)}</span><span className="mt-1 block text-[7px] xr-muted-2">{String(desc)}</span></div><Icon className="mb-1 h-4 w-4 xr-muted-2 transition group-hover:xr-accent"/></div></Parallax>)}
    </div>
  </div>;
}

export function Hero(){
  const {t}=useLang();
  return <section id="top" className="xr-section xr-noise relative overflow-hidden border-b xr-line">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,var(--xr-accent-soft),transparent_25%),radial-gradient(circle_at_92%_82%,rgba(20,20,24,.07),transparent_24%)]"/>
    <div className="relative mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pt-32">
      <div className="grid items-center gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-12">
        <Parallax speed={-0.022}><div className="max-w-3xl">
          <Reveal><div className="flex items-center gap-3"><span className="h-px w-10 bg-[var(--xr-accent)]"/><span className="label-mono text-[8px] tracking-[.28em] xr-muted-2">{t(UI.heroKicker)}</span></div></Reveal>
          <Reveal delay={90}><h1 className="display-serif mt-7 text-[clamp(3.4rem,6.6vw,7.2rem)] leading-[.81] tracking-[-.07em]">{t(UI.heroTitle1)} <span className="xr-accent">{t(UI.heroTitleAccent)}</span><br/><em className="not-italic opacity-42">{t(UI.heroTitle2)}</em></h1></Reveal>
          <Reveal delay={160}><p className="mt-8 max-w-2xl text-base leading-7 xr-muted sm:text-lg">{t(UI.heroLead)}</p></Reveal>
          <Reveal delay={230}><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><EmberButton href="#quote" className="justify-center bg-[var(--xr-ink)] px-7 py-4 text-[var(--xr-bg)] hover:brightness-110">Construire mon projet <ArrowRight className="h-4 w-4"/></EmberButton><a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-6 py-4 label-mono text-[8px] tracking-[.14em] xr-muted hover:bg-[var(--xr-surface)] hover:text-[var(--xr-ink)]"><Search className="h-3.5 w-3.5"/>Lancer mon audit</a></div></Reveal>
          <Reveal delay={300}><div className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-y xr-line py-5"><Stat value={500} suffix="+" label={t(UI.statProjects)}/><Stat value={8} suffix="+" label={t(UI.statYears)}/><Stat value={98} suffix="%" label={t(UI.statSatisfaction)}/></div></Reveal>
          <Reveal delay={360}><div className="mt-5 flex flex-wrap items-center gap-3"><span className="label-mono text-[6px] tracking-[.2em] xr-muted-2">WEB · BRAND · SEO · LOCAL · SOCIAL · IA · ROBOTICS</span><span className="h-px w-8 bg-[var(--xr-line)]"/><div className="flex gap-1">{LANGS.map(l=><span key={l.code} className="text-sm opacity-75">{l.flag}</span>)}</div></div></Reveal>
        </div></Parallax>
        <div className="lg:pt-3"><HeroVisual/></div>
      </div>
    </div>
    <div className="border-t xr-line"><div className="mx-auto flex max-w-[1600px] gap-10 overflow-hidden px-5 py-4 sm:px-8 lg:px-12"><div className="flex min-w-max animate-marquee items-center gap-9 label-mono text-[7px] tracking-[.28em] xr-muted-2">{Array.from({length:2}).flatMap((_,r)=>["WEB DESIGN","BRANDING","SEO","GOOGLE MAPS","SOCIAL MEDIA","IA & AUTOMATION","WEBCARE","ROBOTICS"].map((x,i)=><span key={r+"-"+i} className="inline-flex items-center gap-9"><span>{x}</span><span className="opacity-45">✦</span></span>))}</div></div></div>
  </section>;
}
