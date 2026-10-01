import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";

type Props = { service: string; title?: string };

const META: Record<string, { label: string; number: string; photo?: keyof typeof XR_PHOTOS; position?: string }> = {
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
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#080b0f] shadow-[0_55px_140px_-65px_rgba(0,0,0,.98)]">
      {children}
    </div>
  );
}

function WebsitesVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.websites} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.58] grayscale-[.2] transition duration-[1400ms] group-hover:scale-[1.045] group-hover:brightness-[.72]" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/15 to-black/85" />
      <div className="absolute left-[8%] top-[13%] w-[76%] overflow-hidden rounded-[1.1rem] border border-white/15 bg-[#0d1014]/90 shadow-2xl backdrop-blur-xl transition duration-700 group-hover:-translate-y-2">
        <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
          <i className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/22" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/14" />
          <span className="ml-3 h-2.5 flex-1 rounded-full bg-white/[.05]" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={XR_PHOTOS.websites} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="label-mono text-[7px] tracking-[.22em] text-white/45">STRUCTURE · MOBILE · SEO</span>
            <div className="mt-2 flex items-end justify-between gap-3">
              <span className="display-serif max-w-[8ch] text-2xl leading-[.88] text-white/95 sm:text-3xl">Built around the action.</span>
              <ArrowUpRight className="h-5 w-5 text-white/65" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[9%] left-[10%] rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-xl">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/55">WEB / PERFORMANCE / CONVERSION</span>
      </div>
    </Frame>
  );
}

function BrandingVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.branding} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.5] grayscale-[.3] transition duration-[1400ms] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/45" />
      <div className="absolute left-[8%] top-[9%] rounded-full border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-xl">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/50">BRAND SYSTEM / 02</span>
      </div>
      <div className="absolute right-[8%] top-[13%] w-[31%] rounded-[1.2rem] border border-white/12 bg-white/[.07] p-4 backdrop-blur-2xl transition duration-700 group-hover:-translate-y-2">
        <span className="label-mono text-[7px] tracking-[.18em] text-white/42">TYPE / SCALE</span>
        <p className="display-serif mt-6 text-5xl leading-none text-white/90">Aa</p>
        <div className="mt-5 space-y-1.5">
          <div className="h-1 rounded-full bg-white/35" />
          <div className="h-1 w-4/5 rounded-full bg-white/20" />
          <div className="h-1 w-3/5 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[72%]">
        <div className="mb-3 h-px w-14 bg-white/50 transition-all duration-700 group-hover:w-28" />
        <p className="display-serif text-4xl leading-[.88] text-white/95 sm:text-5xl">Une identité qui tient partout.</p>
      </div>
    </Frame>
  );
}

function SeoVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.seo} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.42] grayscale-[.35] transition duration-[1400ms] group-hover:scale-[1.035] group-hover:brightness-[.56]" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/20 to-black/85" />
      <div className="absolute left-[7%] right-[7%] top-[10%] rounded-[1.2rem] border border-white/12 bg-[#0a0d11]/82 p-4 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-white/65" />
          <span className="text-xs text-white/65">Votre visibilité organique</span>
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[.035] px-3 py-3">
          <div className="h-2 w-3/5 rounded-full bg-white/18" />
          <div className="mt-2 h-1.5 w-11/12 rounded-full bg-white/10" />
          <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/8" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["AUDIT", "ON-PAGE", "CONTENT"].map((x) => <div key={x} className="rounded-xl border border-white/10 bg-white/[.025] px-2 py-3 text-center label-mono text-[7px] text-white/45">{x}</div>)}
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[78%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/40">SEARCH / RELEVANCE / CONTENT</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Être trouvé quand ça compte.</p>
      </div>
    </Frame>
  );
}

function MapsVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.maps} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.5] grayscale-[.25] transition duration-[1400ms] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35" />
      <div className="absolute left-[8%] top-[9%] w-[72%] overflow-hidden rounded-[1.2rem] border border-white/14 bg-[#10151a]/75 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-3">
          <Search className="h-3.5 w-3.5 text-white/55" />
          <span className="text-[9px] text-white/55">Google Business Profile</span>
        </div>
        <div className="relative h-44 bg-[#172027]">
          <div className="absolute left-[17%] top-[25%] h-px w-[70%] rotate-12 bg-white/12" />
          <div className="absolute left-[9%] top-[59%] h-px w-[78%] -rotate-6 bg-white/10" />
          {[["1","left-[60%] top-[33%]"],["2","left-[28%] top-[58%]"],["3","left-[72%] top-[70%]"]].map(([n,pos]) => <span key={n} className={"absolute "+pos+" grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white text-[8px] font-bold text-black shadow-lg"}>{n}</span>)}
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[82%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/42">LOCAL VISIBILITY / GOOGLE MAPS</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Être visible autour de vous.</p>
      </div>
    </Frame>
  );
}

function SocialVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.social} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.48] grayscale-[.3] transition duration-[1400ms] group-hover:scale-[1.045]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/5 to-black/90" />
      <div className="absolute left-[8%] top-[8%] rounded-full border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-xl">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/48">SOCIAL / 05</span>
      </div>
      <div className="absolute right-[8%] top-[15%] grid w-[42%] grid-cols-2 gap-2">
        {["CONTENT", "CALENDAR", "COMMUNITY", "REPORTING"].map((x, i) => (
          <div key={x} className="rounded-xl border border-white/12 bg-black/55 px-3 py-4 backdrop-blur-xl transition duration-500 group-hover:-translate-y-1" style={{ transitionDelay: (i * 60) + "ms" }}>
            <span className="label-mono text-[7px] text-white/48">{x}</span>
            <div className="mt-4 h-px w-full bg-white/12" />
            <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/16" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[78%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/42">CREATION / MANAGEMENT / COMMUNITY</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Votre présence, tenue de bout en bout.</p>
      </div>
    </Frame>
  );
}

function WebcareVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.maintenance} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.38] grayscale-[.45] transition duration-[1400ms] group-hover:scale-[1.035] group-hover:brightness-[.52]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/20 to-black/80" />
      <div className="absolute left-[8%] right-[8%] top-[11%] rounded-[1.3rem] border border-white/12 bg-[#090c10]/78 p-5 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <span className="label-mono text-[7px] tracking-[.2em] text-white/42">WEBCARE / LIVE</span>
          <span className="flex items-center gap-2 text-[8px] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> READY</span>
        </div>
        <div className="mt-5 space-y-3">
          {["CONTENU", "VISUELS", "TECHNIQUE", "SÉCURITÉ"].map((x) => <div key={x} className="flex items-center justify-between border-b border-white/8 pb-3"><span className="text-xs text-white/68">{x}</span><span className="label-mono text-[7px] text-white/35">SUIVI</span></div>)}
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[82%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/42">MAINTENANCE / UPDATES / SUPPORT</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Le site reste exploitable.</p>
      </div>
    </Frame>
  );
}

function RoboticsVisual() {
  return (
    <Frame>
      <img src={XR_PHOTOS.robotics} alt="" className="absolute inset-0 h-full w-full object-cover p-4 grayscale-[.15] contrast-[1.04] brightness-[.82] transition duration-[1400ms] group-hover:scale-[1.035]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
      <div className="absolute left-[8%] top-[8%] rounded-full border border-white/15 bg-black/50 px-4 py-2 backdrop-blur-xl">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/50">XR ROBOTICS / 07</span>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[84%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/42">ACCUEIL / LIVRAISON / NETTOYAGE / IA</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Un produit physique. Une expérience conçue autour de lui.</p>
      </div>
    </Frame>
  );
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  const custom = service === "websites" ? <WebsitesVisual /> : service === "branding" ? <BrandingVisual /> : service === "seo" ? <SeoVisual /> : service === "maps" ? <MapsVisual /> : service === "social" ? <SocialVisual /> : service === "maintenance" ? <WebcareVisual /> : service === "robotics" ? <RoboticsVisual /> : (
    <Frame>
      {src && <img src={src} alt="" style={{ objectPosition: info.position }} className="absolute inset-0 h-full w-full object-cover brightness-[.52] grayscale-[.15] transition duration-[1400ms] group-hover:scale-[1.045]" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/45" />
      <div className="absolute left-[8%] top-[8%] rounded-full border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-xl">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/48">XR / {info.number}</span>
      </div>
      <div className="absolute bottom-[8%] left-[8%] max-w-[84%]">
        <span className="label-mono text-[7px] tracking-[.22em] text-white/42">{info.label}</span>
        <p className="display-serif mt-3 text-4xl leading-[.88] text-white/95 sm:text-5xl">Une présence digitale construite autour du besoin.</p>
      </div>
    </Frame>
  );

  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#070809] shadow-[0_55px_140px_-60px_rgba(0,0,0,.98)]">
      <div className="absolute inset-0">{custom}</div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[8%] h-[84%] w-px bg-white/10" />
        <div className="absolute left-[8%] top-[8%] h-px w-[22%] bg-white/12" />
        <div className="absolute right-[8%] bottom-[8%] h-px w-[22%] bg-white/12" />
      </div>
      <div className="absolute right-[7%] bottom-[7%] grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition duration-500 group-hover:bg-white group-hover:text-black">
        <ExternalLink className="h-4 w-4" />
      </div>
      <div className="absolute right-[8%] top-[8%]">
        <span className="display-serif text-5xl leading-none text-white/18 transition duration-700 group-hover:text-white/32">{info.number}</span>
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
