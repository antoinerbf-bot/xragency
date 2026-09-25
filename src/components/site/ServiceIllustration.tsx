import { ArrowUpRight, BarChart3, Bot, Brush, Globe2, Layers3, MapPinned, Megaphone, ShieldCheck, ShoppingBag, Sparkles, Users, Wrench } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const meta: Record<string, { label: string; accent: string; icon: typeof Globe2; metric: string; caption: string }> = {
  websites: { label: "WEB DESIGN", accent: "01", icon: Globe2, metric: "01 / 04", caption: "UX · UI · CONVERSION" },
  branding: { label: "BRAND IDENTITY", accent: "02", icon: Brush, metric: "IDENTITY", caption: "POSITIONING · SYSTEM" },
  seo: { label: "SEO SYSTEM", accent: "03", icon: BarChart3, metric: "SEARCH", caption: "VISIBILITY · GROWTH" },
  maps: { label: "LOCAL VISIBILITY", accent: "04", icon: MapPinned, metric: "TOP 3", caption: "MAPS · LOCAL PACK" },
  social: { label: "SOCIAL MEDIA", accent: "05", icon: Users, metric: "CONTENT", caption: "REACH · COMMUNITY" },
  maintenance: { label: "WEBCARE", accent: "06", icon: Wrench, metric: "24/7", caption: "CARE · SECURITY" },
  ai: { label: "AI & STRATEGY", accent: "07", icon: Bot, metric: "AI", caption: "AUTOMATION · INTELLIGENCE" },
  ecommerce: { label: "E-COMMERCE", accent: "08", icon: ShoppingBag, metric: "SELL", caption: "CHECKOUT · CONVERSION" },
  refonte: { label: "REDESIGN", accent: "09", icon: Layers3, metric: "REBUILD", caption: "UX · PERFORMANCE" },
  ads: { label: "CAMPAIGNS", accent: "10", icon: Megaphone, metric: "PAID", caption: "ACQUISITION · ROAS" },
  strategy: { label: "STRATEGY", accent: "11", icon: Sparkles, metric: "PLAN", caption: "POSITIONING · ROADMAP" },
};

export function ServiceIllustration({ service, title }: Props) {
  const photo = XR_PHOTOS[service as keyof typeof XR_PHOTOS] ?? XR_PHOTOS.websites;
  const info = meta[service] ?? meta.websites;
  const Icon = info.icon;

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#080a0d] shadow-[0_40px_100px_-45px_rgba(0,0,0,.95)]">
      <img
        src={photo}
        alt={title ?? info.label}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(125deg,rgba(4,5,6,.86)_0%,rgba(4,5,6,.22)_48%,rgba(4,5,6,.72)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(242,163,58,.34),transparent_30%)] mix-blend-screen" />
      <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-xl">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="label-mono text-[8px] tracking-[.2em] text-white/75">{info.label}</span>
      </div>

      <div className="absolute right-5 top-5 rounded-2xl border border-white/15 bg-black/35 px-3 py-2 text-right backdrop-blur-xl">
        <p className="label-mono text-[8px] tracking-[.2em] text-white/45">XR SYSTEM</p>
        <p className="mt-1 text-sm font-semibold text-white">{info.metric}</p>
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="label-mono text-[8px] tracking-[.24em] text-primary">{info.caption}</span>
            <h3 className="mt-2 max-w-[14rem] text-lg font-semibold leading-tight text-white">{title ?? info.label}</h3>
          </div>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 h-px bg-white/10">
          <div className="h-px w-2/3 bg-primary transition-all duration-700 group-hover:w-full" />
        </div>
      </div>

      {service === "maps" && (
        <div className="absolute bottom-28 right-5 hidden w-36 rounded-xl border border-white/15 bg-white/[.07] p-3 backdrop-blur-xl sm:block">
          <div className="flex items-center gap-2"><MapPinned className="h-3 w-3 text-primary" /><span className="label-mono text-[7px] text-white/60">LOCAL PACK</span></div>
          <div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-white/70">Position</span><strong className="text-lg text-white">#1–3</strong></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[86%] rounded-full bg-primary" /></div>
          <p className="mt-2 text-[7px] uppercase tracking-widest text-primary">GUARANTEE*</p>
        </div>
      )}

      {service === "seo" && (
        <div className="absolute bottom-28 right-5 hidden w-36 rounded-xl border border-white/15 bg-white/[.07] p-3 backdrop-blur-xl sm:block">
          <div className="flex items-center gap-2"><BarChart3 className="h-3 w-3 text-primary" /><span className="label-mono text-[7px] text-white/60">ORGANIC</span></div>
          <div className="mt-3 flex items-end gap-1"><span className="text-xl font-semibold text-white">↑</span><span className="text-[10px] text-white/65">visibility</span></div>
          <div className="mt-2 flex gap-1"><i className="h-5 w-1 rounded-full bg-primary/30" /><i className="h-8 w-1 rounded-full bg-primary/50" /><i className="h-11 w-1 rounded-full bg-primary/70" /><i className="h-14 w-1 rounded-full bg-primary" /></div>
        </div>
      )}

      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
