import { ArrowUpRight, BarChart3, Bot, Brush, Globe2, Layers3, MapPinned, Megaphone, Sparkles, Users, Wrench } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const meta: Record<string, { label: string; accent: string; icon: typeof Globe2; metric: string; caption: string; photo: string }> = {
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
  const info = meta[service] ?? meta.websites;
  const Icon = info.icon;

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#090b0d] shadow-[0_40px_110px_-45px_rgba(0,0,0,.95)]">
      <img
        src={info.photo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-[1.04] grayscale-[.08] brightness-[.72] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.09]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,6,8,.88)_0%,rgba(5,6,8,.34)_48%,rgba(5,6,8,.18)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(214,164,93,.30),transparent_28%)]" />
      <div aria-hidden className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-xl">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="label-mono text-[8px] tracking-[.2em] text-white/80">{info.label}</span>
      </div>

      <div className="absolute right-5 top-5 rounded-2xl border border-white/15 bg-black/45 px-3 py-2.5 text-right backdrop-blur-xl">
        <span className="label-mono text-[7px] text-white/45">XR / {info.accent}</span>
        <p className="mt-1 text-sm font-semibold text-white">{info.metric}</p>
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/15 bg-black/65 p-4 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1 sm:p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="label-mono text-[8px] tracking-[.24em] text-primary">{info.caption}</span>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white">{title ?? info.label}</h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors group-hover:border-primary/50 group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
