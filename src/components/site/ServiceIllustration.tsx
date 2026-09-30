import { ArrowUpRight } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const META: Record<string, { label: string; number: string; photo: keyof typeof XR_PHOTOS }> = {
  websites: { label: "WEB DESIGN", number: "01", photo: "websites" },
  branding: { label: "BRAND IDENTITY", number: "02", photo: "branding" },
  seo: { label: "SEO SYSTEM", number: "03", photo: "seo" },
  maps: { label: "GOOGLE MAPS", number: "04", photo: "maps" },
  social: { label: "SOCIAL MEDIA", number: "05", photo: "social" },
  maintenance: { label: "WEBCARE", number: "06", photo: "maintenance" },
  ai: { label: "AI & STRATEGY", number: "07", photo: "ai" },
  refonte: { label: "REDESIGN", number: "09", photo: "refonte" },
  ads: { label: "GOOGLE ADS", number: "10", photo: "ads" },
  strategy: { label: "STRATEGY", number: "11", photo: "strategy" },
};

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const src = XR_PHOTOS[info.photo];

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0b0d10] shadow-[0_45px_110px_-55px_rgba(0,0,0,.95)]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={src} alt="" className="h-full w-full object-cover scale-[1.06] transition duration-[1600ms] ease-out group-hover:scale-[1.12]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />
      </div>
      <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-xl label-mono text-[8px] tracking-[.22em] text-white/75">{info.label}</span>
        <span className="label-mono text-[9px] tracking-[.2em] text-white/45">XR / {info.number}</span>
      </div>
      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2">
        <div className="mx-auto h-px w-24 bg-white/35 transition-all duration-700 group-hover:w-40" />
        <p className="mt-5 text-center label-mono text-[8px] tracking-[.35em] text-white/45 transition-transform duration-700 group-hover:-translate-y-1">DIGITAL CRAFT · STRATEGY · PERFORMANCE</p>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
        <div className="max-w-xl">
          <span className="label-mono text-[8px] tracking-[.24em] text-white/45">XRAGENCY · {info.label}</span>
          <h3 className="display-serif mt-2 text-3xl leading-[.9] text-white sm:text-5xl">{title ?? info.label}</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="h-4 w-4"/></span>
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
