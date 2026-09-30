import { ArrowUpRight } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const META: Record<string, { label: string; number: string; photo: keyof typeof XR_PHOTOS; position: string; mark: string }> = {
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

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const src = XR_PHOTOS[info.photo];

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#070809] shadow-[0_55px_140px_-60px_rgba(0,0,0,.98)]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt=""
          style={{ objectPosition: info.position }}
          className="h-full w-full object-cover grayscale-[.18] contrast-[1.05] brightness-[.72] scale-[1.02] transition duration-[1400ms] ease-out group-hover:scale-[1.09] group-hover:brightness-[.9]"
        />
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
