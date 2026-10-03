import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, X, Monitor, Palette, Search, MapPinned, Share2, ShieldCheck, Bot, ArrowRight, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { SERVICES } from "@/lib/content";
import { Logo, EmberButton } from "./primitives";
import { CartFloatingButton } from "./Cart";
import { useTheme } from "@/components/theme/ThemeProvider";

const IDS=["websites","branding","seo","maps","social","maintenance","robotics"] as const;
const ICONS={websites:Monitor,branding:Palette,seo:Search,maps:MapPinned,social:Share2,maintenance:ShieldCheck,robotics:Bot};

export function Nav(){
 const {t,lang,setLang}=useLang(); const {theme,toggleTheme}=useTheme(); const location=useLocation(); const isHome=location.pathname==="/";
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false); const [servicesOpen,setServicesOpen]=useState(false); const [progress,setProgress]=useState(0); const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const onScroll=useCallback(()=>{setScrolled(window.scrollY>24);const total=document.documentElement.scrollHeight-window.innerHeight;setProgress(total>0?Math.min(window.scrollY/total,1):0)},[]);
 useEffect(()=>{onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[onScroll]);
 const href=(id:string)=>id==="maintenance"?"/services/webcare":id==="robotics"?"/services/robotique":"/services/"+id;
 return <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500",scrolled?"py-2 sm:py-3":"py-3 sm:py-5")}>
  <div className="mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-10">
   <nav className={cn("relative flex items-center gap-2 rounded-full border px-2.5 py-2.5 transition-all duration-500 sm:px-3",scrolled?"xr-panel-strong shadow-[var(--xr-shadow)]":"bg-[var(--xr-surface)] border-[var(--xr-line)] backdrop-blur-xl")}>
    <Logo className="min-w-0 px-2 sm:px-1"/>
    <div className="hidden min-w-0 flex-1 justify-center lg:flex">
      <div className="flex items-center rounded-full border xr-line bg-[var(--xr-surface)] p-1">
        <div className="relative" onMouseEnter={()=>{if(timer.current)clearTimeout(timer.current);setServicesOpen(true)}} onMouseLeave={()=>{timer.current=setTimeout(()=>setServicesOpen(false),180)}}>
          <button type="button" aria-expanded={servicesOpen} onClick={()=>setServicesOpen(v=>!v)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] transition hover:bg-[var(--xr-accent-soft)]">{t(UI.navServices)}<ChevronDown className={cn("h-3 w-3 transition-transform",servicesOpen&&"rotate-180")}/></button>
          {servicesOpen&&<div className="absolute left-1/2 top-full mt-2 w-[780px] -translate-x-1/2 rounded-[1.5rem] border xr-line bg-[var(--xr-bg-elev)] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-2 py-1"><span className="label-mono text-[7px] tracking-[.22em] xr-muted-2">XRAGENCY / 07 EXPERTISES</span><Link to="/services" onClick={()=>setServicesOpen(false)} className="inline-flex items-center gap-1 label-mono text-[7px] xr-accent">Catalogue <ArrowRight className="h-3 w-3"/></Link></div>
            <div className="grid grid-cols-4 gap-2">{IDS.map((id,i)=>{const s=SERVICES.find(x=>x.id===id);const I=ICONS[id];return s?<a key={id} href={href(id)} onClick={()=>setServicesOpen(false)} className="group rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 transition duration-300 hover:-translate-y-1 hover:bg-[var(--xr-surface-strong)]"><div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">0{i+1}</span><I className="h-3.5 w-3.5 opacity-40 group-hover:opacity-80"/></div><span className="mt-3 block text-[9px] font-semibold">{t(s.title)}</span><span className="mt-1 block text-[7px] leading-4 xr-muted">{t(s.short)}</span></a>:null})}</div>
          </div>}
        </div>
        <Link to="/realisations" className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)]">{t(UI.navWork)}</Link>
        <button type="button" onClick={()=>isHome?document.getElementById("audit")?.scrollIntoView({behavior:"smooth"}):window.location.assign("/#audit")} className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)]">Audit</button>
        <button type="button" onClick={()=>isHome?document.getElementById("faq")?.scrollIntoView({behavior:"smooth"}):window.location.assign("/#faq")} className="rounded-full px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[.16em] xr-muted hover:bg-[var(--xr-accent-soft)] hover:text-[var(--xr-ink)]">{t(UI.navFaq)}</button>
      </div>
    </div>
    <div className="ml-auto flex items-center gap-1.5">
      <div className="hidden items-center gap-1 rounded-full border xr-line bg-[var(--xr-surface)] p-1 sm:flex">{LANGS.map(l=><button key={l.code} type="button" onClick={()=>setLang(l.code)} className={cn("label-mono rounded-full px-2 py-1 text-[7px] transition",lang===l.code?"bg-[var(--xr-ink)] text-[var(--xr-bg)]":"xr-muted hover:text-[var(--xr-ink)]")}>{l.label}</button>)}</div>
      <CartFloatingButton/>
      <button type="button" aria-label={theme==="dark"?"Passer en mode clair":"Passer en mode sombre"} title={theme==="dark"?"Mode clair":"Mode sombre"} onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] transition hover:-translate-y-0.5 hover:bg-[var(--xr-accent-soft)]">{theme==="dark"?<Sun className="h-3.5 w-3.5"/>:<Moon className="h-3.5 w-3.5"/>}</button>
      <EmberButton href="/#quote" className="hidden min-h-9 px-4 py-2 text-[8px] md:inline-flex">Faire mon devis</EmberButton>
      <button type="button" aria-label="Menu" onClick={()=>setOpen(v=>!v)} className="grid h-10 w-10 place-items-center rounded-full border xr-line bg-[var(--xr-surface)] lg:hidden">{open?<X className="h-4 w-4"/>:<span className="space-y-1"><span className="block h-px w-4 bg-current"/><span className="block h-px w-4 bg-current"/><span className="block h-px w-3 bg-current"/></span>}</button>
    </div>
    <div aria-hidden className="absolute bottom-0 left-3 right-3 h-px bg-[var(--xr-line)]"><div className="h-full origin-left bg-[var(--xr-accent)] transition-transform duration-200" style={{transform:"scaleX("+progress+")"}}/></div>
   </nav>
   {open&&<div className="mt-2 rounded-[1.6rem] border xr-line bg-[var(--xr-bg-elev)] p-3 shadow-2xl lg:hidden">
     <div className="grid grid-cols-2 gap-2"><a href="/services" onClick={()=>setOpen(false)} className="rounded-2xl border xr-line p-4"><span className="label-mono text-[6px] xr-accent">01</span><span className="mt-2 block text-sm font-semibold">Expertises</span></a><a href="/realisations" onClick={()=>setOpen(false)} className="rounded-2xl border xr-line p-4"><span className="label-mono text-[6px] xr-accent">02</span><span className="mt-2 block text-sm font-semibold">Réalisations</span></a></div>
     <div className="mt-2 grid grid-cols-2 gap-2">{IDS.map(id=>{const s=SERVICES.find(x=>x.id===id);return s?<a key={id} href={href(id)} onClick={()=>setOpen(false)} className="rounded-xl border xr-line px-3 py-3 text-[9px]">{t(s.title)}</a>:null})}</div>
     <div className="mt-3 flex items-center justify-between border-t xr-line pt-3"><span className="label-mono text-[7px] xr-muted-2">LANGUE</span><div className="flex gap-1">{LANGS.map(l=><button type="button" key={l.code} onClick={()=>setLang(l.code)} className={cn("rounded-full border px-2 py-1 text-[7px]",lang===l.code?"bg-[var(--xr-ink)] text-[var(--xr-bg)]":"xr-line xr-muted")}>{l.label}</button>)}</div></div>
   </div>}
  </div>
 </header>;
}
