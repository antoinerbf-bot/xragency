import { ArrowUpRight, BarChart3, CalendarDays, Layers3, Search, ShieldCheck, Palette, Bot } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };
type Meta = { number: string; label: string; photo?: keyof typeof XR_PHOTOS; position?: string };

const META: Record<string, Meta> = {
  websites:{number:"01",label:"WEB DESIGN",photo:"websites",position:"50% 48%"},
  branding:{number:"02",label:"BRANDING",photo:"branding",position:"50% 42%"},
  seo:{number:"03",label:"SEO",photo:"seo",position:"50% 48%"},
  maps:{number:"04",label:"GOOGLE MAPS",photo:"maps",position:"50% 50%"},
  social:{number:"05",label:"SOCIAL MEDIA",photo:"social",position:"50% 46%"},
  maintenance:{number:"06",label:"WEBCARE",photo:"maintenance",position:"50% 50%"},
  robotics:{number:"07",label:"ROBOTIQUE",photo:"robotics",position:"50% 50%"},
  ai:{number:"08",label:"IA",photo:"ai",position:"50% 50%"},
};

function Stage({children}:{children:ReactNode}){return <div className="xr-depth relative min-h-[430px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)]">{children}</div>;}
function Photo({src,position="50% 50%",className=""}:{src:string;position?:string;className?:string}){return <img src={src} alt="" style={{objectPosition:position}} className={"absolute inset-0 h-full w-full object-cover "+className}/>;}
function Chrome({children}:{children:ReactNode}){return <div className="xr-depth-card rounded-[1.35rem] border xr-line bg-[var(--xr-surface-strong)] shadow-[var(--xr-shadow)] backdrop-blur-2xl">{children}</div>;}
function Label({children}:{children:ReactNode}){return <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2">{children}</span>;}

function WebVisual(){return <Stage>
  <Photo src={XR_PHOTOS.websites} position="50% 48%" className="opacity-[.28] saturate-[.55] dark:opacity-[.4]"/>
  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,242,237,.96),rgba(244,242,237,.4)_44%,rgba(244,242,237,.98))] dark:bg-[linear-gradient(135deg,rgba(7,9,13,.96),rgba(7,9,13,.35)_44%,rgba(7,9,13,.98))]"/>
  <div className="relative z-10 mx-[7%] mt-[9%]">
    <Chrome><div className="overflow-hidden rounded-[1.35rem]">
      <div className="flex items-center gap-2 border-b xr-line px-4 py-3"><span className="h-2 w-2 rounded-full bg-current opacity-20"/><span className="h-2 w-2 rounded-full bg-current opacity-12"/><span className="h-2 w-2 rounded-full bg-current opacity-8"/><span className="ml-3 h-2 flex-1 rounded-full bg-current opacity-5"/></div>
      <div className="grid md:grid-cols-[1.12fr_.88fr]">
        <div className="p-7 md:p-9"><Label>WEB / EXPERIENCE</Label><p className="mt-7 display-serif text-4xl leading-[.9] tracking-[-.045em] md:text-5xl">Votre site devient un espace de marque.</p><p className="mt-5 max-w-md text-xs leading-5 xr-muted">Structure, responsive, conversion et SEO de base dans une expérience conçue pour être comprise.</p><div className="mt-7 flex flex-wrap gap-2">{["UX","Mobile","Conversion"].map(x=><span key={x} className="rounded-full border xr-line px-3 py-2 text-[8px]">{x}</span>)}</div></div>
        <div className="relative min-h-[260px] overflow-hidden border-t xr-line md:border-l md:border-t-0"><Photo src={XR_PHOTOS.websites} position="53% 44%" className="opacity-75 dark:opacity-85"/><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"/><div className="absolute bottom-6 left-6 right-6 text-white"><Label>PARCOURS</Label><p className="mt-2 text-sm font-semibold">Chaque écran a une intention.</p></div></div>
      </div>
    </div></Chrome>
  </div>
  <div className="absolute bottom-[7%] left-[7%] rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 backdrop-blur-xl"><Label>01 / ARCHITECTURE → DESIGN → ACTION</Label></div>
</Stage>;}

function BrandingVisual(){return <Stage>
  <Photo src={XR_PHOTOS.branding} position="50% 42%" className="opacity-[.22] saturate-[.55] dark:opacity-[.34]"/>
  <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(244,242,237,.97),rgba(244,242,237,.35)_45%,rgba(244,242,237,.98))] dark:bg-[linear-gradient(125deg,rgba(7,9,13,.97),rgba(7,9,13,.32)_45%,rgba(7,9,13,.98))]"/>
  <div className="relative z-10 grid gap-4 px-[7%] pt-[8%] md:grid-cols-[.72fr_1.28fr]">
    <Chrome><div className="p-6 md:p-8"><Label>IDENTITY SYSTEM</Label><div className="mt-8 flex items-end justify-between"><span className="display-serif text-7xl tracking-[-.08em]">Aa</span><span className="label-mono text-[6px] xr-muted-2">TYPE / SCALE</span></div><div className="mt-8 space-y-2">{[100,82,60,42].map((w,i)=><div key={i} className="h-1 rounded-full bg-current" style={{width:w+"%",opacity:.08+i*.04}}/>)}</div></div></Chrome>
    <Chrome><div className="p-6"><Label>ART DIRECTION</Label><div className="mt-5 overflow-hidden rounded-2xl border xr-line"><img src={XR_PHOTOS.branding} alt="" className="h-48 w-full object-cover opacity-80 dark:opacity-85"/><div className="grid grid-cols-3 border-t xr-line text-center">{["LOGO","PALETTE","GUIDE"].map((x,i)=><div key={x} className={i===1?"border-x xr-line p-3":"p-3"}><span className="block text-[8px] font-semibold">{x}</span><span className="mt-1 block text-[6px] xr-muted-2">Système</span></div>)}</div></div></div></Chrome>
  </div>
</Stage>;}

function SeoVisual(){return <Stage>
  <Photo src={XR_PHOTOS.seo} position="50% 48%" className="opacity-[.2] saturate-[.5] dark:opacity-[.32]"/>
  <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(244,242,237,.98),rgba(244,242,237,.42)_46%,rgba(244,242,237,.98))] dark:bg-[linear-gradient(140deg,rgba(7,9,13,.98),rgba(7,9,13,.36)_46%,rgba(7,9,13,.98))]"/>
  <div className="relative z-10 mx-[8%] mt-[10%]"><Chrome><div className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border xr-line xr-accent-bg"><Search className="h-4 w-4 xr-accent"/></span><div><Label>GOOGLE / SEARCH</Label><p className="mt-1 text-sm font-semibold">Être trouvé au bon moment.</p></div></div><div className="mt-7 rounded-2xl border xr-line p-4"><div className="flex items-center gap-3"><Search className="h-4 w-4 opacity-35"/><div className="h-2 flex-1 rounded-full bg-current opacity-10"/></div><div className="mt-4 grid gap-2">{["Structure technique","Pages stratégiques","Intentions & contenu","Maillage"].map((x,i)=><div key={x} className="flex items-center gap-3 rounded-xl border xr-line px-3 py-3"><span className="label-mono text-[6px] xr-muted-2">0{i+1}</span><span className="flex-1 text-[9px]">{x}</span><span className="h-1.5 w-12 rounded-full bg-current opacity-10"/></div>)}</div></div></div></Chrome></div>
</Stage>;}

function MapsVisual(){return <Stage>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(43,92,255,.16),transparent_23%),linear-gradient(145deg,#eff1f4,#d9dee6)] dark:bg-[radial-gradient(circle_at_74%_16%,rgba(143,168,255,.16),transparent_23%),linear-gradient(145deg,#111721,#07090d)]"/>
  <div className="absolute inset-[8%] overflow-hidden rounded-[1.8rem] border xr-line bg-[var(--xr-surface-strong)] shadow-[var(--xr-shadow)] backdrop-blur-xl">
    <div className="flex items-center gap-2 border-b xr-line px-4 py-3"><Search className="h-3.5 w-3.5 opacity-35"/><div className="h-2 w-1/2 rounded-full bg-current opacity-10"/><span className="ml-auto label-mono text-[6px] xr-muted-2">LOCAL</span></div>
    <div className="relative h-[calc(100%-3rem)]">
      <div className="absolute inset-0 opacity-45">{[22,48,75].map(v=><div key={v} className="absolute left-[4%] right-[4%] h-px bg-current opacity-10" style={{top:v+"%"}}/>)}{[28,57,82].map(v=><div key={v} className="absolute top-[5%] bottom-[5%] w-px bg-current opacity-10" style={{left:v+"%"}}/> )}</div>
      <div className="absolute left-[59%] top-[32%] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--xr-accent)] text-white shadow-2xl"><span className="text-xs font-black">1</span></div>
      <div className="absolute left-[31%] top-[58%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border xr-line bg-[var(--xr-surface-strong)] text-xs font-semibold">2</div>
      <div className="absolute right-[17%] top-[69%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border xr-line bg-[var(--xr-surface-strong)] text-xs font-semibold">3</div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">{["TOP 3","PROFIL","AVIS"].map(x=><div key={x} className="rounded-xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-3 text-center label-mono text-[6px]">{x}</div>)}</div>
    </div>
  </div>
</Stage>;}

function SocialVisual(){return <Stage>
  <Photo src={XR_PHOTOS.social} position="50% 46%" className="opacity-[.26] saturate-[.6] dark:opacity-[.45]"/>
  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(244,242,237,.95),rgba(244,242,237,.25)_40%,rgba(244,242,237,.95))] dark:bg-[linear-gradient(120deg,rgba(7,9,13,.95),rgba(7,9,13,.22)_40%,rgba(7,9,13,.95))]"/>
  <div className="relative z-10 mx-[7%] mt-[9%]"><Chrome><div className="p-6"><div className="flex items-center justify-between"><div><Label>CONTENT SYSTEM</Label><p className="mt-1 text-sm font-semibold">Des contenus pensés comme une marque.</p></div><Layers3 className="h-4 w-4 opacity-35"/></div><div className="mt-5 grid grid-cols-3 gap-2"><div className="col-span-2 overflow-hidden rounded-xl"><img src={XR_PHOTOS.social} alt="" className="h-40 w-full object-cover opacity-85"/></div><div className="grid gap-2">{[1,2].map(i=><div key={i} className="rounded-xl border xr-line p-3"><CalendarDays className="h-3.5 w-3.5 opacity-35"/><span className="mt-2 block label-mono text-[6px] xr-muted-2">WEEK {i}</span><div className="mt-2 h-1.5 w-2/3 rounded-full bg-current opacity-10"/></div>)}</div></div></div></Chrome></div>
  <div className="absolute bottom-[8%] right-[7%] flex gap-2">{["CONTENT","COMMUNITY","REPORTING"].map(x=><span key={x} className="rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 label-mono text-[6px] backdrop-blur-xl">{x}</span>)}</div>
</Stage>;}

function WebcareVisual(){return <Stage>
  <Photo src={XR_PHOTOS.maintenance} className="opacity-[.18] saturate-[.4] dark:opacity-[.28]"/>
  <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(244,242,237,.97),rgba(244,242,237,.35)_44%,rgba(244,242,237,.98))] dark:bg-[linear-gradient(140deg,rgba(7,9,13,.97),rgba(7,9,13,.3)_44%,rgba(7,9,13,.98))]"/>
  <div className="relative z-10 mx-[8%] mt-[10%]"><Chrome><div className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border xr-line"><ShieldCheck className="h-4 w-4 opacity-45"/></span><div><Label>WEBCARE</Label><p className="mt-1 text-sm font-semibold">Votre site reste exploitable.</p></div><span className="ml-auto rounded-full border xr-line px-2.5 py-1 label-mono text-[6px] xr-muted-2">ACTIF</span></div><div className="mt-7 grid grid-cols-2 gap-2">{["Contenu","Visuels","Technique","Sécurité"].map((x,i)=><div key={x} className="rounded-xl border xr-line p-4"><div className="flex justify-between"><span className="text-[9px] font-semibold">{x}</span><span className="label-mono text-[6px] xr-muted-2">0{i+1}</span></div><div className="mt-3 h-1 rounded-full bg-current opacity-10"><div className="h-full w-4/5 rounded-full bg-[var(--xr-accent)]"/></div></div>)}</div></div></Chrome></div>
</Stage>;}

function RoboticsVisual(){return <Stage>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_18%,rgba(43,92,255,.14),transparent_28%),linear-gradient(145deg,#eef0f2,#d8dce1)] dark:bg-[radial-gradient(circle_at_60%_18%,rgba(143,168,255,.16),transparent_28%),linear-gradient(145deg,#11161e,#07090d)]"/>
  <img src={XR_PHOTOS.robotics} alt="" className="absolute inset-x-[10%] bottom-[2%] top-[2%] h-[96%] w-[80%] object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,.3)] dark:drop-shadow-[0_45px_70px_rgba(0,0,0,.8)] transition-transform duration-700 group-hover:scale-[1.025]"/>
  <div className="absolute left-[7%] top-[7%] rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 backdrop-blur-xl"><Label>PRODUIT PHYSIQUE / KORBEN</Label></div>
  <div className="absolute bottom-[7%] right-[7%] rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 backdrop-blur-xl"><span className="text-[9px] font-semibold">Location · achat · événement</span><span className="mt-1 block text-[7px] xr-muted-2">Robotique de service</span></div>
</Stage>;}

function GenericVisual({info}:{info:Meta}){const src=info.photo?XR_PHOTOS[info.photo]:undefined;return <Stage>{src&&<Photo src={src} position={info.position} className="opacity-75 dark:opacity-65"/>}<div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(244,242,237,.3),rgba(244,242,237,.05)_45%,rgba(244,242,237,.72))] dark:bg-[linear-gradient(140deg,rgba(7,9,13,.45),rgba(7,9,13,.04)_45%,rgba(7,9,13,.8))]"/><div className="absolute left-[7%] top-[7%] rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 backdrop-blur-xl"><Label>{info.label}</Label></div></Stage>;}

export function ServiceIllustration({service,title}:Props){
  const info=META[service]??META.websites;
  const visual=service==="websites"?<WebVisual/>:service==="branding"?<BrandingVisual/>:service==="seo"?<SeoVisual/>:service==="maps"?<MapsVisual/>:service==="social"?<SocialVisual/>:service==="maintenance"?<WebcareVisual/>:service==="robotics"?<RoboticsVisual/>:<GenericVisual info={info}/>;
  return <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">{visual}<div className="pointer-events-none absolute inset-0 z-30"><div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t xr-line"/><div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r xr-line"/></div><div className="absolute bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 backdrop-blur-xl"><span className="label-mono text-[6px] xr-muted-2">{info.number}</span><span className="label-mono text-[6px]">{title??info.label}</span><ArrowUpRight className="h-3 w-3 opacity-40"/></div><figcaption className="sr-only">{title??info.label}</figcaption></figure>;
}
