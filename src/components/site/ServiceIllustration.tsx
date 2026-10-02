import { ArrowUpRight, Bot, CalendarDays, Gauge, Globe2, MapPin, Megaphone, Palette, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";
import { Parallax } from "./primitives";

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
  refonte:{number:"08",label:"REFONTE",photo:"refonte",position:"50% 46%"},
  ads:{number:"09",label:"GOOGLE ADS",photo:"ads",position:"50% 48%"},
  strategy:{number:"10",label:"STRATÉGIE",photo:"strategy",position:"50% 42%"},
  ai:{number:"11",label:"IA",photo:"ai",position:"50% 50%"},
};

function Stage({children,className=""}:{children:ReactNode;className?:string}){
  return <div className={"xr-depth relative min-h-[460px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] "+className}>{children}</div>;
}
function Photo({src,position="50% 50%",className=""}:{src:string;position?:string;className?:string}){
  return <img src={src} alt="" style={{objectPosition:position}} className={"absolute inset-0 h-full w-full object-cover "+className}/>;
}
function Chrome({children,className=""}:{children:ReactNode;className?:string}){
  return <div className={"xr-depth-card rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)] shadow-[var(--xr-shadow)] backdrop-blur-2xl "+className}>{children}</div>;
}
function Label({children}:{children:ReactNode}){return <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2">{children}</span>;}
function Platform({name,letter}:{name:string;letter:string}){return <div className="rounded-xl border xr-line bg-[var(--xr-bg)] px-3 py-3"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--xr-ink)] text-[9px] font-bold text-[var(--xr-bg)]">{letter}</span><span className="mt-2 block text-[8px] font-semibold">{name}</span></div>;}

function WebVisual(){
  return <Stage className="bg-black">
    <Photo src={XR_PHOTOS.websites} position="52% 46%" className="opacity-[.8] grayscale-[.12]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-black/8"/>
    <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-white"><Label>WEB / EXPERIENCE</Label><span className="label-mono text-[6px] text-white/40">01 · XR</span></div>
    <ParallaxCard speed={0.018} className="absolute bottom-[8%] left-[7%] right-[7%] sm:left-[9%] sm:right-[9%]">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="p-6 sm:p-8"><Label>UNE EXPÉRIENCE, PAS UNE VITRINE</Label><h3 className="display-serif mt-6 text-4xl leading-[.88] sm:text-5xl">Chaque écran a une intention.</h3><div className="mt-6 flex flex-wrap gap-2">{["UX","Mobile","Conversion"].map(x=><span key={x} className="rounded-full border xr-line px-3 py-2 label-mono text-[6px]">{x}</span>)}</div></div>
        <div className="relative min-h-[210px] overflow-hidden border-t xr-line lg:border-l lg:border-t-0"><Photo src={XR_PHOTOS.websites} position="54% 44%" className="opacity-80 dark:opacity-90"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 text-white"><Label>ARCHITECTURE → DESIGN → ACTION</Label></div></div>
      </div>
    </ParallaxCard>
  </Stage>;
}
function BrandingVisual(){
  return <Stage>
    <Photo src={XR_PHOTOS.branding} position="50% 42%" className="opacity-[.52] saturate-[.55] dark:opacity-[.62]"/>
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)] via-[var(--xr-bg)]/18 to-[var(--xr-bg)]/82"/>
    <ParallaxCard speed={-0.02} className="absolute bottom-[8%] left-[8%] w-[43%] min-w-[260px]">
      <div className="p-6 sm:p-7"><Label>IDENTITY SYSTEM</Label><div className="mt-5 flex items-end justify-between"><span className="display-serif text-7xl tracking-[-.08em]">Aa</span><span className="label-mono text-[6px] xr-muted-2">TYPE / SCALE</span></div><div className="mt-7 grid grid-cols-4 gap-1.5">{["A","B","C","D"].map(x=><div key={x} className="aspect-square rounded-xl border xr-line bg-[var(--xr-bg)] grid place-items-center text-xs font-semibold">{x}</div>)}</div></div>
    </ParallaxCard>
    <div className="absolute right-[8%] top-[8%] rounded-full border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 backdrop-blur-xl"><Label>LOGO · PALETTE · DIRECTION</Label></div>
  </Stage>;
}
function SeoVisual(){
  return <Stage>
    <Photo src={XR_PHOTOS.seo} position="50% 48%" className="opacity-[.25] saturate-[.55] dark:opacity-[.4]"/>
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)] via-[var(--xr-bg)]/36 to-[var(--xr-bg)]/94"/>
    <div className="relative z-10 p-[8%]">
      <div className="flex items-center justify-between"><div><Label>SEO / GOOGLE</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Remonter. Être choisi.</h3></div><span className="grid h-12 w-12 place-items-center rounded-2xl xr-accent-bg"><Search className="h-5 w-5 xr-accent"/></span></div>
      <ParallaxCard speed={0.02} className="mt-8">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-3 rounded-xl border xr-line bg-[var(--xr-bg)] px-4 py-3"><Search className="h-4 w-4 xr-muted-2"/><span className="text-[9px] xr-muted">recherche client → votre activité</span></div>
          <div className="mt-5 grid gap-2">{["Structure technique","Pages stratégiques","Intentions & contenu","Maillage & autorité"].map((x,i)=><div key={x} className="flex items-center gap-3 rounded-xl border xr-line px-3 py-3"><span className="label-mono text-[6px] xr-accent">0{i+1}</span><span className="flex-1 text-[9px]">{x}</span><span className="text-[9px] font-semibold">↑</span></div>)}</div>
        </div>
      </ParallaxCard>
    </div>
  </Stage>;
}
function MapsVisual(){
  return <Stage className="bg-black">
    <Photo src={XR_PHOTOS.maps} position="50% 18%" className="opacity-[.9]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10"/>
    <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-white"><Label>GOOGLE SEARCH / LOCAL PACK</Label><span className="label-mono text-[6px] text-white/45">REAL QUERY</span></div>
    <ParallaxCard speed={0.018} className="absolute bottom-[7%] left-[7%] right-[7%]">
      <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5"><span className="grid h-9 w-9 place-items-center rounded-xl xr-accent-bg"><MapPin className="h-4 w-4 xr-accent"/></span><div className="min-w-0 flex-1"><Label>GOOGLE MAPS TOP 3</Label><p className="mt-1 text-[10px] font-semibold sm:text-xs">Être visible parmi les premiers établissements.</p></div><div className="flex gap-1.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--xr-ink)] text-[9px] font-black text-[var(--xr-bg)]">1</span><span className="grid h-8 w-8 place-items-center rounded-full border xr-line text-[9px] font-black">2</span><span className="grid h-8 w-8 place-items-center rounded-full border xr-line text-[9px] font-black">3</span></div></div>
    </ParallaxCard>
  </Stage>;
}
function SocialVisual(){
  return <Stage className="bg-black">
    <Photo src={XR_PHOTOS.social} position="50% 45%" className="opacity-[.62] saturate-[.72]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/12 to-black/15"/>
    <div className="relative z-10 h-full p-[7%] text-white">
      <div className="flex items-center justify-between"><div><Label>SOCIAL MEDIA / NETWORKS</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Une présence qui ressemble à une marque.</h3></div><Sparkles className="h-5 w-5 text-white/45"/></div>
      <div className="absolute bottom-[8%] left-[7%] right-[7%] grid grid-cols-3 gap-2">
        <Platform name="Instagram" letter="IG"/><Platform name="Facebook" letter="f"/><Platform name="TikTok" letter="TK"/>
      </div>
    </div>
  </Stage>;
}
function WebcareVisual(){
  return <Stage>
    <Photo src={XR_PHOTOS.maintenance} position="50% 50%" className="opacity-[.35] saturate-[.35] dark:opacity-[.46]"/>
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)]/98 via-[var(--xr-bg)]/54 to-[var(--xr-bg)]/93"/>
    <div className="relative z-10 p-[8%]">
      <div className="flex items-center justify-between"><div><Label>WEBCARE</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Le site reste vivant.</h3></div><ShieldCheck className="h-5 w-5 xr-accent"/></div>
      <ParallaxCard speed={0.018} className="mt-8">
        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4 sm:p-5">{["Contenu","Visuels","Technique","Sécurité"].map((x,i)=><div key={x} className="rounded-xl border xr-line bg-[var(--xr-bg)] p-4"><span className="label-mono text-[5px] xr-muted-2">0{i+1}</span><span className="mt-3 block text-[9px] font-semibold">{x}</span><div className="mt-4 h-1 overflow-hidden rounded-full bg-current/10"><div className="h-full w-[82%] rounded-full bg-[var(--xr-accent)]"/></div></div>)}</div>
      </ParallaxCard>
    </div>
  </Stage>;
}
function RoboticsVisual(){
  return <Stage>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,var(--xr-accent-soft),transparent_30%),linear-gradient(145deg,#ece9e2,#cfd0ce)] dark:bg-[radial-gradient(circle_at_50%_24%,var(--xr-accent-soft),transparent_30%),linear-gradient(145deg,#171717,#08090b)]"/>
    <ParallaxCard speed={-0.018} className="absolute inset-x-[10%] bottom-[3%] top-[3%]">
      <div className="relative h-full overflow-hidden rounded-[1.35rem]">
        <img src={XR_PHOTOS.robotics} alt="" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,.38)] dark:drop-shadow-[0_40px_75px_rgba(0,0,0,.82)]"/>
        <div className="absolute left-4 top-4 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 backdrop-blur-xl"><Label>ROBOTIQUE DE SERVICE</Label></div>
      </div>
    </ParallaxCard>
  </Stage>;
}
function RefonteVisual(){
  return <Stage className="bg-black">
    <Photo src={XR_PHOTOS.refonte} position="50% 46%" className="opacity-[.72] grayscale-[.2]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"/>
    <div className="relative z-10 flex h-full flex-col justify-between p-[7%] text-white"><div><Label>REFONTE / TRANSFORMATION</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">On ne repeint pas.<br/>On reconstruit.</h3></div><div className="grid grid-cols-3 gap-2"><div className="rounded-xl border border-white/15 bg-white/7 p-3"><span className="label-mono text-[5px] text-white/45">01</span><span className="mt-2 block text-[8px]">Clarté</span></div><div className="rounded-xl border border-white/15 bg-white/7 p-3"><span className="label-mono text-[5px] text-white/45">02</span><span className="mt-2 block text-[8px]">UX</span></div><div className="rounded-xl border border-white/15 bg-white/7 p-3"><span className="label-mono text-[5px] text-white/45">03</span><span className="mt-2 block text-[8px]">Conversion</span></div></div></div>
  </Stage>;
}
function AdsVisual(){
  return <Stage>
    <Photo src={XR_PHOTOS.ads} position="50% 48%" className="opacity-[.27] saturate-[.55] dark:opacity-[.4]"/>
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)]/97 via-[var(--xr-bg)]/28 to-[var(--xr-bg)]/92"/>
    <div className="relative z-10 p-[8%]"><Label>PAID ACQUISITION</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Acheter l'attention.<br/>Mesurer l'impact.</h3><ParallaxCard speed={0.025} className="mt-8 max-w-xl"><div className="p-5 sm:p-7"><div className="flex items-center gap-3"><Megaphone className="h-4 w-4 xr-accent"/><span className="text-[9px] font-semibold">Google Ads / campagne</span></div><div className="mt-6 grid grid-cols-3 gap-2">{[["CTR","6.8%"],["CPA","€18"],["ROAS","3.4×"]].map(([a,b])=><div key={a} className="rounded-xl border xr-line bg-[var(--xr-bg)] p-3"><span className="label-mono text-[5px] xr-muted-2">{a}</span><span className="mt-2 block text-lg font-semibold">{b}</span></div>)}</div></div></ParallaxCard></div>
  </Stage>;
}
function StrategyVisual(){
  return <Stage>
    <Photo src={XR_PHOTOS.strategy} position="50% 42%" className="opacity-[.24] saturate-[.35] dark:opacity-[.36]"/>
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--xr-bg)]/98 via-[var(--xr-bg)]/48 to-[var(--xr-bg)]/94"/>
    <div className="relative z-10 p-[8%]"><Label>STRATEGY / DIRECTION</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Décider avant d'exécuter.</h3><div className="mt-9 grid gap-2 sm:grid-cols-3"><div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4"><Gauge className="h-4 w-4 xr-accent"/><span className="mt-6 block text-[10px] font-semibold">Positionnement</span></div><div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4"><Globe2 className="h-4 w-4 xr-accent"/><span className="mt-6 block text-[10px] font-semibold">Parcours</span></div><div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4"><Sparkles className="h-4 w-4 xr-accent"/><span className="mt-6 block text-[10px] font-semibold">Priorités</span></div></div></div>
  </Stage>;
}
function AiVisual(){
  return <Stage className="bg-black">
    <Photo src={XR_PHOTOS.ai} position="50% 50%" className="opacity-[.55] saturate-[.7]"/>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(198,83,63,.32),transparent_28%),linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.87))]"/>
    <div className="relative z-10 flex h-full flex-col justify-between p-[7%] text-white"><div><Label>AI / AUTOMATION</Label><h3 className="display-serif mt-3 text-4xl sm:text-5xl">Moins de friction.<br/>Plus d'action.</h3></div><div className="grid grid-cols-3 gap-2"><div className="rounded-xl border border-white/12 bg-white/6 p-4"><span className="label-mono text-[5px] text-white/45">INPUT</span><span className="mt-2 block text-[8px]">Données</span></div><div className="rounded-xl border border-white/12 bg-white/6 p-4"><span className="label-mono text-[5px] text-white/45">ENGINE</span><span className="mt-2 block text-[8px]">IA</span></div><div className="rounded-xl border border-white/12 bg-white/6 p-4"><span className="label-mono text-[5px] text-white/45">OUTPUT</span><span className="mt-2 block text-[8px]">Action</span></div></div></div>
  </Stage>;
}

function GenericVisual({info}:{info:Meta}){
  const src=info.photo?XR_PHOTOS[info.photo]:undefined;
  return <Stage>{src&&<Photo src={src} position={info.position} className="opacity-70 dark:opacity-60"/>}<div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)]/66 via-transparent to-[var(--xr-bg)]/78"/><div className="absolute left-[7%] top-[7%] rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 backdrop-blur-xl"><Label>{info.label}</Label></div></Stage>;
}
function ParallaxCard({children,speed=0.02,className=""}:{children:ReactNode;speed?:number;className?:string}){
  return <Parallax speed={speed} direction="both" className={className}><Chrome>{children}</Chrome></Parallax>;
}

export function ServiceIllustration({service,title}:Props){
  const info=META[service]??META.websites;
  const visual=
    service==="websites"?<WebVisual/>:
    service==="branding"?<BrandingVisual/>:
    service==="seo"?<SeoVisual/>:
    service==="maps"?<MapsVisual/>:
    service==="social"?<SocialVisual/>:
    service==="maintenance"?<WebcareVisual/>:
    service==="robotics"?<RoboticsVisual/>:
    service==="refonte"?<RefonteVisual/>:
    service==="ads"?<AdsVisual/>:
    service==="strategy"?<StrategyVisual/>:
    service==="ai"?<AiVisual/>:
    <GenericVisual info={info}/>;
  return <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
    {visual}
    <div className="pointer-events-none absolute inset-0 z-30"><div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t xr-line"/><div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r xr-line"/></div>
    <div className="absolute bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 backdrop-blur-xl"><span className="label-mono text-[6px] xr-muted-2">{info.number}</span><span className="label-mono text-[6px]">{title??info.label}</span><ArrowUpRight className="h-3 w-3 opacity-40"/></div>
    <figcaption className="sr-only">{title??info.label}</figcaption>
  </figure>;
}
