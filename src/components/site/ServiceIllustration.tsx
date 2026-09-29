import { ArrowUpRight, BarChart3, Bot, Brush, Globe2, Layers3, MapPinned, Megaphone, Sparkles, Users, Wrench } from "lucide-react";

type Props = { service: string; title?: string };

const meta: Record<string, { label: string; accent: string; icon: typeof Globe2; metric: string; caption: string }> = {
  websites: { label: "WEB DESIGN", accent: "01", icon: Globe2, metric: "UX / UI", caption: "STRUCTURE · CONVERSION" },
  branding: { label: "BRAND IDENTITY", accent: "02", icon: Brush, metric: "IDENTITY", caption: "POSITIONING · SYSTEM" },
  seo: { label: "SEO SYSTEM", accent: "03", icon: BarChart3, metric: "SEARCH", caption: "VISIBILITY · GROWTH" },
  maps: { label: "GOOGLE MAPS", accent: "04", icon: MapPinned, metric: "LOCAL PACK", caption: "DISCOVERY · TRUST" },
  social: { label: "SOCIAL MEDIA", accent: "05", icon: Users, metric: "CONTENT", caption: "REACH · COMMUNITY" },
  maintenance: { label: "WEBCARE", accent: "06", icon: Wrench, metric: "24 / 7", caption: "CARE · SECURITY" },
  ai: { label: "AI & STRATEGY", accent: "07", icon: Bot, metric: "AI", caption: "AUTOMATION · INTELLIGENCE" },
  refonte: { label: "REDESIGN", accent: "09", icon: Layers3, metric: "REBUILD", caption: "UX · PERFORMANCE" },
  ads: { label: "GOOGLE ADS", accent: "10", icon: Megaphone, metric: "PAID", caption: "ACQUISITION · ROAS" },
  strategy: { label: "STRATEGY", accent: "11", icon: Sparkles, metric: "ROADMAP", caption: "POSITIONING · GROWTH" },
};

function BrowserVisual({ service }: { service: string }) {
  if (service === "websites" || service === "refonte") {
    return <div className="absolute inset-8 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl">
      <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-[#f5f5f3] px-3"><i className="h-2 w-2 rounded-full bg-black/15"/><i className="h-2 w-2 rounded-full bg-black/15"/><i className="h-2 w-2 rounded-full bg-black/15"/><span className="ml-2 h-2 w-28 rounded-full bg-black/8"/></div>
      <div className="grid h-[calc(100%-2rem)] grid-cols-[1.1fr_.9fr] gap-3 p-4">
        <div className="flex flex-col justify-center"><span className="h-2 w-20 rounded-full bg-[#d5a15b]"/><span className="mt-3 h-6 w-40 rounded bg-black/80"/><span className="mt-2 h-2 w-32 rounded bg-black/10"/><div className="mt-5 h-7 w-24 rounded-full bg-black"/></div>
        <div className="rounded-xl bg-gradient-to-br from-[#e8e1d7] to-[#b9c0c6]"/></div>
    </div>;
  }
  if (service === "branding") {
    return <div className="absolute inset-8 rounded-2xl border border-white/15 bg-[#f4f0e9] p-5 shadow-2xl">
      <div className="flex items-center justify-between"><span className="text-[8px] tracking-[.25em] text-black/45">BRAND SYSTEM</span><span className="text-[8px] text-black/35">XR / 02</span></div>
      <div className="mt-8 text-5xl font-serif tracking-[-.08em] text-black">XR</div>
      <div className="mt-5 grid grid-cols-4 gap-2">{["#111","#d6a45d","#e8e0d2","#8a8f91"].map((x)=><span key={x} className="aspect-square rounded-xl" style={{background:x}}/>)}</div>
      <div className="mt-5 h-2 w-32 rounded bg-black/75"/><div className="mt-2 h-2 w-20 rounded bg-black/15"/>
    </div>;
  }
  if (service === "seo") {
    return <div className="absolute inset-8 rounded-2xl border border-white/15 bg-[#0d1117] p-5 shadow-2xl">
      <div className="flex justify-between"><span className="text-[8px] tracking-[.22em] text-white/45">ORGANIC VISIBILITY</span><span className="text-[8px] text-[#d6a45d]">+64%</span></div>
      <div className="mt-8 flex h-28 items-end gap-2">{[25,38,31,52,47,68,62,84].map((h,i)=><span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#8f6736] to-[#e1b36e]" style={{height:h+"%"}}/>)}</div>
      <div className="mt-5 flex gap-2"><span className="rounded-full bg-white/8 px-3 py-1.5 text-[8px] text-white/65">Keywords</span><span className="rounded-full bg-white/8 px-3 py-1.5 text-[8px] text-white/65">Traffic</span><span className="rounded-full bg-white/8 px-3 py-1.5 text-[8px] text-white/65">SERP</span></div>
    </div>;
  }
  if (service === "maps") {
    return <div className="absolute inset-7 overflow-hidden rounded-2xl border border-white/15 bg-[#eef1ee] shadow-2xl">
      <div className="absolute inset-0 opacity-80" style={{backgroundImage:"linear-gradient(35deg,transparent 47%,rgba(70,90,80,.12) 48%,rgba(70,90,80,.12) 51%,transparent 52%),linear-gradient(110deg,transparent 45%,rgba(70,90,80,.10) 46%,rgba(70,90,80,.10) 49%,transparent 50%)",backgroundSize:"90px 70px"}}/>
      {[["22%","35%"],["55%","24%"],["72%","62%"]].map(([x,y],i)=><span key={i} className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#d85f4a] shadow-lg" style={{left:x,top:y}}><span className="absolute inset-2 rounded-full bg-white/90"/></span>)}
      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 p-3 shadow-xl"><div className="flex items-center justify-between"><b className="text-[10px] text-black">Your business</b><span className="text-[8px] text-[#b27b31]">4.9 ★</span></div><div className="mt-1 h-2 w-28 rounded bg-black/10"/></div>
    </div>;
  }
  if (service === "social") {
    return <div className="absolute inset-8 grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-[#111318] p-3 shadow-2xl">
      {["#d7b06b","#c8ced1","#8d969c","#b5a18b","#dedede","#777f84"].map((x,i)=><div key={i} className="relative overflow-hidden rounded-xl" style={{background:x}}><span className="absolute bottom-2 left-2 h-1.5 w-8 rounded bg-black/45"/><span className="absolute bottom-2 right-2 h-3 w-3 rounded-full border border-white/70"/></div>)}
    </div>;
  }
  if (service === "maintenance") {
    return <div className="absolute inset-8 rounded-2xl border border-white/15 bg-[#0d1117] p-5 shadow-2xl">
      <div className="flex items-center justify-between"><span className="text-[8px] tracking-[.2em] text-white/45">WEBCARE STATUS</span><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[7px] text-emerald-300">ALL SYSTEMS OK</span></div>
      <div className="mt-8 grid grid-cols-3 gap-2">{["99.9%","24/7","SSL"].map(x=><div key={x} className="rounded-xl border border-white/8 bg-white/[.04] p-3"><div className="text-sm font-semibold text-white">{x}</div><div className="mt-1 h-1.5 w-10 rounded bg-[#d6a45d]"/></div>)}</div>
      <div className="mt-5 h-2 w-full rounded bg-white/8"/><div className="mt-2 h-2 w-2/3 rounded bg-white/8"/>
    </div>;
  }
  return <div className="absolute inset-8 rounded-2xl border border-white/15 bg-gradient-to-br from-[#171b21] to-[#080a0d] shadow-2xl"><div className="absolute inset-8 rounded-xl border border-[#d6a45d]/25"/><div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6a45d]/50 shadow-[0_0_60px_rgba(214,164,93,.18)]"/></div>;
}

export function ServiceIllustration({ service, title }: Props) {
  const info = meta[service] ?? meta.websites;
  const Icon = info.icon;
  return <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0e12] shadow-[0_40px_100px_-45px_rgba(0,0,0,.9)]">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(214,164,93,.18),transparent_35%),linear-gradient(135deg,#10141a,#07090c)]"/>
    <div aria-hidden className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]"/>
    <BrowserVisual service={service}/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/75 via-transparent to-transparent"/>
    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-xl"><Icon className="h-3.5 w-3.5 text-[#d6a45d]"/><span className="label-mono text-[8px] tracking-[.2em] text-white/80">{info.label}</span></div>
    <div className="absolute right-5 top-5 rounded-2xl border border-white/15 bg-black/45 px-3 py-2 text-right backdrop-blur-xl"><span className="label-mono text-[7px] text-white/45">XR / {info.accent}</span><p className="mt-1 text-sm font-semibold text-white">{info.metric}</p></div>
    <div className="absolute inset-x-5 bottom-5 rounded-[1.3rem] border border-white/15 bg-black/65 p-4 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1 sm:p-5">
      <div className="flex items-end justify-between gap-4"><div><span className="label-mono text-[8px] tracking-[.24em] text-[#d6a45d]">{info.caption}</span><h3 className="mt-2 text-lg font-semibold leading-tight text-white">{title ?? info.label}</h3></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white"><ArrowUpRight className="h-4 w-4"/></span></div>
    </div>
    <figcaption className="sr-only">{title ?? info.label}</figcaption>
  </figure>;
}