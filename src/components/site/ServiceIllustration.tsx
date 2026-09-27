import { ArrowUpRight, BarChart3, Bot, Brush, Globe2, Layers3, MapPinned, Megaphone, Sparkles, Users, Wrench } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const meta: Record<string, {
  label: string;
  accent: string;
  icon: typeof Globe2;
  metric: string;
  caption: string;
  photo: string;
}> = {
  websites: { label: "WEB DESIGN", accent: "01", icon: Globe2, metric: "UX / UI", caption: "STRUCTURE · CONVERSION", photo: XR_PHOTOS.websites },
  branding: { label: "BRAND IDENTITY", accent: "02", icon: Brush, metric: "IDENTITY", caption: "POSITIONING · SYSTEM", photo: XR_PHOTOS.branding },
  seo: { label: "SEO SYSTEM", accent: "03", icon: BarChart3, metric: "SEARCH", caption: "VISIBILITY · GROWTH", photo: XR_PHOTOS.seo },
  maps: { label: "GOOGLE MAPS", accent: "04", icon: MapPinned, metric: "LOCAL PACK", caption: "DISCOVERY · TRUST", photo: XR_PHOTOS.maps },
  social: { label: "SOCIAL MEDIA", accent: "05", icon: Users, metric: "CONTENT", caption: "REACH · COMMUNITY", photo: XR_PHOTOS.social },
  maintenance: { label: "WEBCARE", accent: "06", icon: Wrench, metric: "24 / 7", caption: "CARE · SECURITY", photo: XR_PHOTOS.maintenance },
  ai: { label: "AI & STRATEGY", accent: "07", icon: Bot, metric: "AI", caption: "AUTOMATION · INTELLIGENCE", photo: XR_PHOTOS.ai },
  refonte: { label: "REDESIGN", accent: "09", icon: Layers3, metric: "REBUILD", caption: "UX · PERFORMANCE", photo: XR_PHOTOS.refonte },
  ads: { label: "GOOGLE ADS", accent: "10", icon: Megaphone, metric: "PAID", caption: "ACQUISITION · ROAS", photo: XR_PHOTOS.ads },
  strategy: { label: "STRATEGY", accent: "11", icon: Sparkles, metric: "ROADMAP", caption: "POSITIONING · GROWTH", photo: XR_PHOTOS.strategy },
};

export function ServiceIllustration({ service, title }: Props) {
  const item = meta[service] ?? meta.websites;
  const Icon = item.icon;

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[#111] shadow-[0_35px_100px_-45px_rgba(0,0,0,.8)]">
      <div className="absolute -inset-8 bg-primary/15 blur-3xl transition duration-700 group-hover:bg-primary/25" />
      <div className="absolute inset-3 overflow-hidden rounded-[1.65rem]">
        <img
          src={item.photo}
          alt={title ? `${title} — XRAGENCY` : item.label}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-white/5 mix-blend-soft-light" />
      </div>

      <div className="absolute inset-3 rounded-[1.65rem] border border-white/15 pointer-events-none" />

      <div className="absolute left-7 top-7 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 text-white/80 backdrop-blur-xl">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="label-mono text-[8px] font-semibold tracking-[.2em]">{item.label}</span>
      </div>

      <div className="absolute right-7 top-7 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-white/65 backdrop-blur-xl">
        <span className="label-mono text-[8px] tracking-[.16em]">{item.accent} · XR</span>
      </div>

      <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 text-white">
        <div>
          <p className="label-mono text-[8px] tracking-[.2em] text-white/55">{item.caption}</p>
          <p className="mt-2 display-serif text-3xl leading-none sm:text-4xl">{item.metric}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-white/15 opacity-60" />
      <div className="pointer-events-none absolute -bottom-3 -right-3 h-3 w-3 rounded-full bg-primary shadow-[0_0_25px_hsl(var(--primary))]" />
    </div>
  );
}
