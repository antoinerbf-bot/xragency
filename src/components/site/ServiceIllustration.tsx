import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const meta: Record<string, { label: string; accent: string }> = {
  websites: { label: "WEB DESIGN", accent: "01" },
  branding: { label: "BRAND IDENTITY", accent: "02" },
  seo: { label: "SEO", accent: "03" },
  maps: { label: "LOCAL VISIBILITY", accent: "04" },
  social: { label: "SOCIAL MEDIA", accent: "05" },
  maintenance: { label: "WEBCARE", accent: "06" },
  ai: { label: "AI & STRATEGY", accent: "07" },
  ecommerce: { label: "E-COMMERCE", accent: "08" },
  refonte: { label: "REDESIGN", accent: "09" },
  ads: { label: "CAMPAIGNS", accent: "10" },
  strategy: { label: "STRATEGY", accent: "11" },
};

export function ServiceIllustration({ service, title }: Props) {
  const photo = XR_PHOTOS[service as keyof typeof XR_PHOTOS] ?? XR_PHOTOS.websites;
  const info = meta[service] ?? meta.websites;

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">
      <img
        src={photo}
        alt={title ?? info.label}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(4,5,6,.72)_0%,rgba(4,5,6,.16)_48%,rgba(4,5,6,.64)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(242,163,58,.28),transparent_32%)] mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <span className="label-mono text-[9px] tracking-[.24em] text-white/65">{info.label}</span>
          <div className="mt-1 h-px w-10 bg-primary/80" />
        </div>
        <span className="label-mono text-[9px] tracking-[.2em] text-primary">{info.accent}</span>
      </div>
    </figure>
  );
}
