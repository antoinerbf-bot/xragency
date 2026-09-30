import { ArrowUpRight, Facebook, Instagram, Search, ShieldCheck, Video } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const META: Record<string, { label: string; number: string; photo?: keyof typeof XR_PHOTOS; position?: string; mark: string }> = {
  websites: { label: "WEB DESIGN", number: "01", photo: "websites", position: "50% 48%", mark: "01" },
  branding: { label: "BRAND IDENTITY", number: "02", photo: "branding", position: "50% 42%", mark: "02" },
  seo: { label: "SEO SYSTEM", number: "03", photo: "seo", position: "50% 50%", mark: "03" },
  maps: { label: "GOOGLE MAPS", number: "04", photo: "maps", position: "50% 50%", mark: "04" },
  social: { label: "SOCIAL MEDIA", number: "05", photo: "social", position: "50% 46%", mark: "05" },
  maintenance: { label: "WEBCARE", number: "06", photo: "maintenance", position: "50% 50%", mark: "06" },
  ai: { label: "AI & STRATEGY", number: "08", photo: "ai", position: "50% 50%", mark: "08" },
  refonte: { label: "REDESIGN", number: "09", photo: "refonte", position: "50% 48%", mark: "09" },
  ads: { label: "GOOGLE ADS", number: "10", photo: "ads", position: "50% 48%", mark: "10" },
  strategy: { label: "STRATEGY", number: "11", photo: "strategy", position: "50% 44%", mark: "11" },
  robotics: { label: "XR ROBOTICS", number: "07", photo: "robotics", position: "50% 50%", mark: "07" },
};


function BrowserVisual() {
  return <div className="h-full rounded-[1.25rem] border border-white/12 bg-[#101318] p-2.5 shadow-2xl transition duration-700 group-hover:scale-[1.025]">
    <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-2"><i className="h-1.5 w-1.5 rounded-full bg-white/30" /><i className="h-1.5 w-1.5 rounded-full bg-white/20" /><i className="h-1.5 w-1.5 rounded-full bg-white/15" /><span className="ml-3 h-3 flex-1 rounded bg-white/[.04]" /></div>
    <div className="grid h-[calc(100%-1.5rem)] grid-cols-[.38fr_1fr] gap-2 p-2">
      <div className="space-y-2"><div className="h-7 rounded-lg bg-white/10" /><div className="h-16 rounded-lg border border-white/8 bg-white/[.03]" /><div className="h-10 rounded-lg bg-white/[.04]" /></div>
      <div className="rounded-xl border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent_48%)] p-3"><div className="h-4 w-1/2 rounded bg-white/12" /><div className="mt-3 h-20 rounded-lg bg-white/[.05]" /><div className="mt-3 flex gap-2"><div className="h-7 flex-1 rounded-full bg-white/10" /><div className="h-7 w-20 rounded-full bg-white" /></div></div>
    </div>
  </div>;
}

function SeoVisual() {
  return <div className="h-full rounded-[1.25rem] border border-white/12 bg-[#0e1115] p-4">
    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Search className="h-4 w-4 text-white/65" /><span className="label-mono text-[8px] text-white/50">GOOGLE ORGANIC</span></div><span className="rounded-full border border-white/10 px-2 py-1 text-[7px] text-white/45">LIVE</span></div>
    <div className="mt-5 grid grid-cols-3 gap-2">{[["+184%","VISIBILITY"],["+62","KEYWORDS"],["3.2×","TRAFFIC"]].map(([v,l])=><div key={l} className="rounded-xl border border-white/8 bg-white/[.03] p-3"><b className="display-serif text-xl text-white">{v}</b><span className="mt-1 block text-[7px] text-white/35">{l}</span></div>)}</div>
    <div className="mt-5 h-28 rounded-xl border border-white/8 bg-white/[.025] p-3"><div className="flex h-full items-end gap-1.5">{[25,32,28,44,41,58,52,70,66,82,76,94].map((h,i)=><i key={i} className="flex-1 rounded-t bg-white/35 transition-all duration-700 group-hover:bg-white/65" style={{height:h+"%"}} />)}</div></div>
  </div>;
}

function MapsVisual() {
  return <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#10151a] p-3">
    <div className="relative grid h-full grid-cols-[1fr_.72fr] gap-2">
      <div className="relative overflow-hidden rounded-xl border border-white/8 bg-[#182027]">
        <div className="absolute left-[22%] top-[22%] h-px w-[65%] rotate-12 bg-white/15" /><div className="absolute left-[12%] top-[52%] h-px w-[72%] -rotate-6 bg-white/12" /><div className="absolute left-[52%] top-[12%] h-[78%] w-px rotate-[18deg] bg-white/10" />
        {[[ "1","left-[58%] top-[28%]" ],[ "2","left-[28%] top-[54%]" ],[ "3","left-[67%] top-[67%]" ]].map(([n,pos])=><div key={n} className={"absolute "+pos+" grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white text-[9px] font-bold text-black shadow-xl"}>{n}</div>)}
      </div>
      <div className="rounded-xl border border-white/8 bg-black/35 p-2.5"><div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-2 py-2"><Search className="h-3 w-3 text-white/50" /><span className="text-[8px] text-white/60">restaurant · Da Nang</span></div><div className="mt-3 space-y-2">{["01 · XR visibility","02 · Local leader","03 · Best rated"].map((x,i)=><div key={x} className="rounded-lg border border-white/8 bg-white/[.035] p-2"><span className="text-[8px] text-white/45">{x}</span><div className="mt-1 h-1 rounded bg-white/10"><div className="h-1 rounded bg-white/55" style={{width:(92-i*15)+"%"}} /></div></div>)}</div></div>
    </div>
  </div>;
}

function SocialVisual() {
  return <div className="relative h-full rounded-[1.25rem] border border-white/12 bg-[#0d1014] p-3"><div className="grid h-full grid-cols-3 gap-2">{[Instagram, Facebook, Video].map((Icon,i)=><div key={i} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[.035] p-3"><Icon className="h-5 w-5 text-white/70" /><div className="absolute inset-x-3 bottom-3"><div className="h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/[.02]" /><div className="mt-2 h-1.5 w-3/4 rounded bg-white/20" /><div className="mt-1.5 h-1 w-1/2 rounded bg-white/10" /></div></div>)}</div><div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-4 py-2 backdrop-blur-xl"><span className="label-mono text-[7px] tracking-[.2em] text-white/60">CONTENT · SCHEDULING · COMMUNITY</span></div></div>;
}

function WebcareVisual() {
  return <div className="h-full rounded-[1.25rem] border border-white/12 bg-[#0d1014] p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-white/70" /><span className="label-mono text-[8px] text-white/50">WEBCARE / LIVE</span></div><span className="h-2 w-2 animate-pulse rounded-full bg-white/70" /></div><div className="mt-5 grid grid-cols-2 gap-2">{[["UPTIME","99.98%"],["SSL","ACTIVE"],["BACKUP","SYNCED"],["PATCH","READY"]].map(([l,v])=><div key={l} className="rounded-xl border border-white/8 bg-white/[.035] p-3"><span className="text-[7px] text-white/35">{l}</span><b className="mt-1 block text-sm text-white/80">{v}</b></div>)}</div><div className="mt-4 rounded-xl border border-white/8 bg-white/[.025] p-3 text-[9px] text-white/45">Corrections · évolutions · sécurité</div></div>;
}

function RoboticsVisual() {
  return <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#090b0e]"><img src={XR_PHOTOS.robotics} alt="" className="absolute inset-0 h-full w-full object-contain p-3 grayscale contrast-[1.05] brightness-[.9] transition duration-1000 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" /><div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 backdrop-blur-xl"><span className="label-mono text-[7px] text-white/60">SERVICE ROBOT · IA · AUTOMATION</span></div></div>;
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const src = XR_PHOTOS[info.photo];

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#070809] shadow-[0_55px_140px_-60px_rgba(0,0,0,.98)]">
      <div className="absolute inset-0 overflow-hidden">
        {service === "websites" ? <BrowserVisual /> : service === "seo" ? <SeoVisual /> : service === "maps" ? <MapsVisual /> : service === "social" ? <SocialVisual /> : service === "maintenance" ? <WebcareVisual /> : service === "robotics" ? <RoboticsVisual /> : <img src={src} alt="" style={{ objectPosition: info.position }} className="h-full w-full object-cover grayscale-[.1] contrast-[1.06] brightness-[.68] transition duration-[1400ms] ease-out group-hover:scale-[1.06] group-hover:brightness-[.85]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.12)_45%,transparent_62%)] translate-x-[-80%] transition-transform duration-[1800ms] ease-out group-hover:translate-x-[80%]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[9%] top-[11%] h-[78%] w-px bg-white/15" />
        <div className="absolute left-[9%] top-[11%] h-px w-[24%] bg-white/15" />
        <div className="absolute right-[9%] bottom-[11%] h-px w-[24%] bg-white/15" />
        <div className="absolute right-[9%] bottom-[11%] h-[30%] w-px bg-white/15" />
        <div className="absolute right-[8%] top-[12%] h-32 w-32 rounded-full border border-white/10 transition duration-[1400ms] group-hover:scale-125 group-hover:-translate-x-2" />
        <div className="absolute right-[12%] top-[20%] h-12 w-12 rounded-full border border-white/15 transition duration-700 group-hover:scale-125" />
      </div>

      <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
        <div>
          <span className="label-mono text-[8px] tracking-[.28em] text-white/60">XR / {info.mark}</span>
          <span className="mt-2 block label-mono text-[7px] tracking-[.24em] text-white/35">{info.label}</span>
        </div>
        <span className="display-serif text-5xl leading-none text-white/20 transition duration-700 group-hover:text-white/45">{info.number}</span>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div className="max-w-[78%]">
          <div className="mb-3 h-px w-12 bg-white/50 transition-all duration-700 group-hover:w-24" />
          <h3 className="display-serif text-3xl leading-[.9] text-white sm:text-4xl">{title ?? info.label}</h3>
          <p className="mt-2 label-mono text-[7px] tracking-[.2em] text-white/40">DIGITAL CRAFT · STRATEGY · PERFORMANCE</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
