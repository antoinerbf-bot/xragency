import { ArrowUpRight, Bot, BarChart3, ExternalLink, Gauge, Globe2, Layers3, MapPinned, Palette, Search, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

type Meta = { label: string; number: string; photo?: keyof typeof XR_PHOTOS; position?: string };
const META: Record<string, Meta> = {
  websites: { label: "WEB EXPERIENCE", number: "01", photo: "websites", position: "50% 48%" },
  branding: { label: "BRAND IDENTITY", number: "02", photo: "branding", position: "50% 42%" },
  seo: { label: "SEO / SEARCH", number: "03", photo: "seo", position: "50% 50%" },
  maps: { label: "GOOGLE MAPS", number: "04", photo: "maps", position: "50% 50%" },
  social: { label: "SOCIAL MEDIA", number: "05", photo: "social", position: "50% 46%" },
  maintenance: { label: "WEBCARE", number: "06", photo: "maintenance", position: "50% 50%" },
  robotics: { label: "XR ROBOTICS", number: "07", photo: "robotics", position: "50% 50%" },
  ai: { label: "AI / INTELLIGENCE", number: "08", photo: "ai", position: "50% 50%" },
  refonte: { label: "REDESIGN", number: "09", photo: "refonte", position: "50% 48%" },
  ads: { label: "GOOGLE ADS", number: "10", photo: "ads", position: "50% 48%" },
  strategy: { label: "STRATEGY", number: "11", photo: "strategy", position: "50% 44%" },
};

function Frame({ children }: { children: ReactNode }) {
  return <div className="relative h-full min-h-[390px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#07090d] shadow-[0_55px_150px_-70px_rgba(0,0,0,.98)]">{children}</div>;
}

function Label({ code, text }: { code: string; text: string }) {
  return <div className="absolute left-6 top-6 z-20 flex items-center gap-3 rounded-full border border-white/12 bg-black/55 px-3.5 py-2 backdrop-blur-xl"><span className="label-mono text-[7px] text-white/30">{code}</span><span className="label-mono text-[7px] tracking-[.22em] text-white/55">{text}</span></div>;
}

function FooterLine({ children }: { children: ReactNode }) {
  return <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between gap-4"><div className="max-w-[76%]">{children}</div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/14 bg-black/48 text-white/75 backdrop-blur-xl"><ArrowUpRight className="h-4 w-4"/></span></div>;
}

function Photo({ src, position = "50% 50%", className = "" }: { src: string; position?: string; className?: string }) {
  return <img src={src} alt="" style={{ objectPosition: position }} className={"absolute inset-0 h-full w-full object-cover grayscale-[.2] brightness-[.46] contrast-[1.06] transition duration-[1400ms] group-hover:scale-[1.05] group-hover:brightness-[.58] " + className} />;
}

function WebsitesVisual() {
  return <Frame>
    <Photo src={XR_PHOTOS.websites} position="50% 48%" />
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.84),rgba(0,0,0,.10)_48%,rgba(0,0,0,.94))]" />
    <Label code="01" text="WEB EXPERIENCE" />
    <div className="absolute right-[7%] top-[15%] z-10 w-[62%] overflow-hidden rounded-[1.4rem] border border-white/14 bg-[#0a0e14]/86 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5"><span className="h-1.5 w-1.5 rounded-full bg-white/40"/><span className="h-1.5 w-1.5 rounded-full bg-white/24"/><span className="h-1.5 w-1.5 rounded-full bg-white/14"/><span className="ml-2 h-2 flex-1 rounded-full bg-white/[.05]"/></div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={XR_PHOTOS.websites} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"/>
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between"><span className="label-mono text-[6px] text-white/34">STRUCTURE</span><span className="label-mono text-[6px] text-white/34">MOBILE / SEO</span></div>
        <div className="absolute bottom-4 left-4 right-4"><p className="display-serif text-2xl leading-[.9] text-white sm:text-3xl">Le site devient votre point d'entrée.</p></div>
      </div>
    </div>
    <div className="absolute bottom-[16%] left-[8%] grid w-[29%] gap-2 sm:w-[24%]">
      {["Architecture","Parcours","Conversion"].map((x,i)=><div key={x} className="rounded-xl border border-white/12 bg-black/55 px-3 py-2.5 backdrop-blur-xl transition duration-500 group-hover:-translate-y-1" style={{transitionDelay:(i*70)+"ms"}}><span className="label-mono text-[6px] text-white/48">0{i+1}</span><span className="mt-1 block text-[9px] text-white/70">{x}</span></div>)}
    </div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">DESIGN · RESPONSIVE · SEO READY</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Pensé pour donner envie d'avancer.</p></FooterLine>
  </Frame>;
}

function BrandingVisual() {
  return <Frame>
    <Photo src={XR_PHOTOS.branding} position="50% 42%" />
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.9),transparent_45%,rgba(0,0,0,.95))]" />
    <Label code="02" text="BRAND IDENTITY" />
    <div className="absolute left-[8%] top-[18%] z-10 w-[44%] rounded-[1.4rem] border border-white/14 bg-black/55 p-5 backdrop-blur-2xl">
      <span className="label-mono text-[6px] tracking-[.2em] text-white/34">TYPE / SCALE / TONE</span>
      <div className="mt-7 flex items-end justify-between"><span className="display-serif text-7xl leading-none text-white/90">Aa</span><span className="label-mono text-[7px] text-white/32">SYSTEM</span></div>
      <div className="mt-6 space-y-2"><div className="h-1 rounded-full bg-white/35"/><div className="h-1 w-4/5 rounded-full bg-white/20"/><div className="h-1 w-3/5 rounded-full bg-white/12"/></div>
    </div>
    <div className="absolute right-[8%] bottom-[19%] z-10 w-[38%] rounded-[1.5rem] border border-white/14 bg-white/[.07] p-4 backdrop-blur-2xl">
      <div className="flex items-center gap-2"><Palette className="h-3.5 w-3.5 text-white/65"/><span className="label-mono text-[6px] tracking-[.18em] text-white/40">IDENTITY</span></div>
      <p className="mt-6 text-xs leading-5 text-white/72">Logo, palette, typographie et déclinaisons pensées comme un seul système.</p>
    </div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">POSITIONNEMENT · SYSTÈME VISUEL</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Une identité qui tient partout.</p></FooterLine>
  </Frame>;
}

function SeoVisual() {
  return <Frame>
    <Photo src={XR_PHOTOS.seo} />
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.94),rgba(0,0,0,.08)_50%,rgba(0,0,0,.96))]" />
    <Label code="03" text="SEO / SEARCH" />
    <div className="absolute left-[8%] right-[8%] top-[17%] z-10 rounded-[1.5rem] border border-white/14 bg-[#090d13]/84 p-4 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-2"><Search className="h-4 w-4 text-white/65"/><span className="text-[10px] text-white/62">Visibilité organique</span><span className="ml-auto label-mono text-[6px] text-white/28">SEARCH</span></div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[.03] px-3 py-3">
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white/45"/><span className="h-2 w-2/3 rounded-full bg-white/16"/></div>
        <div className="mt-3 h-1.5 w-11/12 rounded-full bg-white/10"/><div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/7"/>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">{["AUDIT","ON-PAGE","CONTENU"].map((x,i)=><div key={x} className="rounded-xl border border-white/8 bg-white/[.022] p-3"><BarChart3 className="h-3.5 w-3.5 text-white/45"/><span className="mt-3 block label-mono text-[6px] text-white/34">0{i+1}</span><span className="mt-1 block text-[8px] text-white/62">{x}</span></div>)}</div>
    </div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">SEARCH · STRUCTURE · CONTENT</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Être trouvé quand ça compte.</p></FooterLine>
  </Frame>;
}

function MapsVisual() {
  return <Frame>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,.14),transparent_24%),linear-gradient(145deg,#101821,#07090d_68%,#0d1319)]" />
    <Label code="04" text="GOOGLE MAPS / LOCAL" />
    <div className="absolute inset-[10%] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#10171e]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/24 px-3 py-3"><Search className="h-3.5 w-3.5 text-white/46"/><span className="text-[9px] text-white/52">Google Business Profile · zone locale</span></div>
      <div className="relative h-[calc(100%-2.7rem)] overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          {[18,43,69].map((top)=><div key={top} className="absolute left-[4%] h-px w-[92%] bg-white/10" style={{top:top+"%",transform:"rotate("+(top-43)/4+"deg)"}}/> )}
          {[24,61].map((left)=><div key={left} className="absolute top-[-8%] h-[116%] w-px bg-white/8" style={{left:left+"%",transform:"rotate("+(left-42)/5+"deg)"}}/> )}
          <div className="absolute left-[11%] top-[24%] h-28 w-28 rounded-full border border-white/7" />
          <div className="absolute right-[8%] bottom-[12%] h-36 w-36 rounded-full border border-white/6" />
        </div>
        {[["01","left-[60%] top-[34%]"],["02","left-[28%] top-[56%]"],["03","left-[74%] top-[72%]"]].map(([n,pos])=><div key={n} className={"absolute "+pos+" grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white text-[8px] font-bold text-black shadow-[0_0_35px_rgba(255,255,255,.18)]"}>{n}</div>)}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-1.5"><span className="rounded-lg border border-white/10 bg-black/55 px-2 py-2 text-center label-mono text-[6px] text-white/45">RANK 01</span><span className="rounded-lg border border-white/10 bg-black/55 px-2 py-2 text-center label-mono text-[6px] text-white/45">RANK 02</span><span className="rounded-lg border border-white/10 bg-black/55 px-2 py-2 text-center label-mono text-[6px] text-white/45">RANK 03</span></div>
      </div>
    </div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">LOCAL VISIBILITY · GOOGLE BUSINESS PROFILE</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Être visible autour de vous.</p></FooterLine>
  </Frame>;
}

function SocialVisual() {
  return <Frame>
    <Photo src={XR_PHOTOS.social} position="50% 46%" />
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.88),transparent_40%,rgba(0,0,0,.95))]" />
    <Label code="05" text="SOCIAL MEDIA / CONTENU" />
    <div className="absolute right-[7%] top-[16%] z-10 grid w-[44%] grid-cols-2 gap-2">
      {[["CONTENT",Layers3],["CALENDAR",Gauge],["COMMUNITY",Users],["REPORTING",BarChart3]].map(([x,Icon],i)=>{const I=Icon as typeof Gauge;return <div key={x as string} className="rounded-[1.1rem] border border-white/12 bg-black/58 p-3.5 backdrop-blur-2xl transition duration-500 group-hover:-translate-y-1" style={{transitionDelay:(i*60)+"ms"}}><I className="h-3.5 w-3.5 text-white/55"/><span className="mt-3 block label-mono text-[6px] text-white/35">{x as string}</span><div className="mt-3 h-px w-full bg-white/10"/><div className="mt-2 h-1 w-2/3 rounded-full bg-white/15"/></div>})}
    </div>
    <div className="absolute left-[8%] bottom-[19%] z-10 max-w-[48%] rounded-[1.4rem] border border-white/12 bg-black/55 p-4 backdrop-blur-2xl"><span className="label-mono text-[6px] tracking-[.18em] text-white/34">1 → 2 → 3</span><p className="mt-3 text-xs leading-5 text-white/72">Positionnement. Production. Animation.</p></div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">CRÉATION · MANAGEMENT · COMMUNAUTÉ</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Votre présence tenue de bout en bout.</p></FooterLine>
  </Frame>;
}

function WebcareVisual() {
  return <Frame>
    <Photo src={XR_PHOTOS.maintenance} />
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.94),transparent_44%,rgba(0,0,0,.96))]" />
    <Label code="06" text="WEBCARE / LIVE" />
    <div className="absolute left-[8%] right-[8%] top-[17%] z-10 rounded-[1.5rem] border border-white/14 bg-[#090d12]/85 p-5 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-white/55"/><span className="text-[10px] text-white/62">Site en suivi</span></div><span className="flex items-center gap-1.5 label-mono text-[6px] text-white/35"><span className="h-1.5 w-1.5 rounded-full bg-white/70"/>ACTIF</span></div>
      <div className="mt-5 space-y-3">{["Contenu","Visuels","Technique","Sécurité"].map((x,i)=><div key={x} className="flex items-center gap-3 border-b border-white/7 pb-3"><span className="label-mono text-[6px] text-white/28">0{i+1}</span><span className="flex-1 text-xs text-white/68">{x}</span><span className="label-mono text-[6px] text-white/30">SUIVI</span></div>)}</div>
    </div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">MAINTENANCE · UPDATES · SUPPORT</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Le site reste exploitable.</p></FooterLine>
  </Frame>;
}

function RoboticsVisual() {
  return <Frame>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_18%,rgba(125,143,255,.16),transparent_24%),linear-gradient(145deg,#0a0d12,#050608)]" />
    <img src={XR_PHOTOS.robotics} alt="" className="absolute inset-x-[5%] bottom-0 top-[5%] h-[92%] w-[90%] object-contain grayscale-[.08] contrast-[1.05] drop-shadow-[0_35px_55px_rgba(0,0,0,.75)] transition duration-[1400ms] group-hover:scale-[1.03]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),transparent_55%,rgba(0,0,0,.95))]" />
    <Label code="07" text="XR ROBOTICS / KORBEN" />
    <div className="absolute right-[8%] top-[18%] z-10 rounded-2xl border border-white/14 bg-black/52 px-4 py-3 backdrop-blur-2xl"><span className="label-mono text-[6px] tracking-[.18em] text-white/34">PRODUIT PHYSIQUE</span><p className="mt-2 text-xs text-white/74">Robot de service · location · achat</p></div>
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">ACCUEIL · LIVRAISON · NETTOYAGE · IA</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Un produit qu'on comprend au premier regard.</p></FooterLine>
  </Frame>;
}

function GenericVisual({ info }: { info: Meta }) {
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  return <Frame>
    {src && <Photo src={src} position={info.position}/>}
    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,.9),transparent_42%,rgba(0,0,0,.94))]" />
    <Label code={info.number} text={info.label} />
    <FooterLine><span className="label-mono text-[7px] tracking-[.22em] text-white/40">{info.label}</span><p className="display-serif mt-2 text-3xl leading-[.88] text-white/95 sm:text-4xl">Une présence digitale construite autour du besoin.</p></FooterLine>
  </Frame>;
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const custom = service === "websites" ? <WebsitesVisual /> : service === "branding" ? <BrandingVisual /> : service === "seo" ? <SeoVisual /> : service === "maps" ? <MapsVisual /> : service === "social" ? <SocialVisual /> : service === "maintenance" ? <WebcareVisual /> : service === "robotics" ? <RoboticsVisual /> : <GenericVisual info={info} />;

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#070809] shadow-[0_60px_160px_-70px_rgba(0,0,0,.98)]">
      <div className="absolute inset-0">{custom}</div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[7%] top-[7%] h-[86%] w-px bg-white/10" />
        <div className="absolute left-[7%] top-[7%] h-px w-[24%] bg-white/12" />
        <div className="absolute right-[7%] bottom-[7%] h-px w-[24%] bg-white/12" />
      </div>
      <div className="absolute right-[7%] top-[7%] z-20"><span className="display-serif text-5xl leading-none text-white/18 transition duration-700 group-hover:text-white/36">{info.number}</span></div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
