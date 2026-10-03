import { ArrowUpRight, Bot, Gauge, Globe2, MapPin, Megaphone, Palette, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";
import { Parallax } from "./primitives";

type Props = { service: string; title?: string };
type Meta = { number: string; label: string; photo?: keyof typeof XR_PHOTOS; position?: string };

const META: Record<string, Meta> = {
  websites: { number: "01", label: "WEB DESIGN", photo: "websites", position: "50% 42%" },
  branding: { number: "02", label: "BRANDING", photo: "branding", position: "50% 50%" },
  seo: { number: "03", label: "SEO", photo: "seo", position: "50% 45%" },
  maps: { number: "04", label: "GOOGLE MAPS", photo: "maps", position: "50% 18%" },
  social: { number: "05", label: "SOCIAL MEDIA", photo: "social", position: "50% 45%" },
  maintenance: { number: "06", label: "WEBCARE", photo: "maintenance", position: "50% 50%" },
  robotics: { number: "07", label: "ROBOTIQUE", photo: "robotics", position: "50% 50%" },
  refonte: { number: "08", label: "REFONTE", photo: "refonte", position: "50% 46%" },
  ads: { number: "09", label: "GOOGLE ADS", photo: "ads", position: "50% 48%" },
  strategy: { number: "10", label: "STRATÉGIE", photo: "strategy", position: "50% 42%" },
  ai: { number: "11", label: "IA", photo: "ai", position: "50% 50%" },
};

function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "xr-depth relative min-h-[430px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function Photo({
  src,
  position = "50% 50%",
  className = "",
}: {
  src: string;
  position?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      style={{ objectPosition: position }}
      className={"absolute inset-0 h-full w-full object-cover " + className}
    />
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="label-mono text-[7px] tracking-[.2em] text-white/55">{children}</span>;
}

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-[1.35rem] border border-white/15 bg-black/58 shadow-[0_30px_90px_-45px_rgba(0,0,0,.85)] backdrop-blur-xl " +
        className
      }
    >
      {children}
    </div>
  );
}

function WebVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.websites} position="52% 45%" className="scale-[1.04] opacity-[.92]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>01 / WEB DESIGN</Label>
        <Label>REAL PROJECT VIEW</Label>
      </div>
      <Parallax speed={0.018} direction="both" className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Label>DESIGN → UX → CONVERSION</Label>
              <h3 className="display-serif mt-2 max-w-xl text-3xl text-white sm:text-4xl">Un vrai site. Une vraie expérience.</h3>
            </div>
            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-2 label-mono text-[6px] text-white/55">
              RESPONSIVE / SEO / PERFORMANCE
            </span>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function BrandingVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.branding} position="50% 45%" className="scale-[1.05] opacity-[.84]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>02 / BRANDING</Label>
        <Label>IDENTITY SYSTEM</Label>
      </div>
      <Parallax speed={-0.022} direction="both" className="absolute left-5 top-[28%] sm:left-8">
        <Glass className="w-[min(320px,72vw)] p-5 sm:p-6">
          <Label>BRAND KIT</Label>
          <div className="mt-6 flex items-end justify-between">
            <span className="display-serif text-7xl leading-none text-white">Aa</span>
            <div className="flex gap-1.5">
              {["01", "02", "03", "04"].map((x) => (
                <span key={x} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-[7px] text-white/55">
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-white/12 pt-4">
            <span className="label-mono text-[6px] text-white/45">LOGO · TYPO · DIRECTION · APPLICATIONS</span>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function SeoVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.seo} position="50% 45%" className="scale-[1.03] opacity-[.82]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>03 / SEO</Label>
        <Label>SEARCH VISIBILITY</Label>
      </div>
      <Parallax speed={0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-white/75" />
            <span className="text-xs font-semibold text-white">Être trouvé au moment de la recherche.</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["TECHNIQUE", "CONTENU", "AUTORITÉ", "PERFORMANCE"].map((x) => (
              <span key={x} className="rounded-full border border-white/15 px-3 py-2 label-mono text-[6px] text-white/55">
                {x}
              </span>
            ))}
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function MapsVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.maps} position="50% 18%" className="scale-[1.04] opacity-[.94]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>04 / GOOGLE MAPS</Label>
        <Label>REAL GOOGLE SEARCH</Label>
      </div>
      <Parallax speed={0.018} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-white/75" />
            <div className="min-w-0 flex-1">
              <Label>LOCAL PACK</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Google Maps Top 3</p>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={
                    "grid h-8 w-8 place-items-center rounded-full border text-[9px] font-black " +
                    (n === 1 ? "border-white bg-white text-black" : "border-white/15 text-white/60")
                  }
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function SocialVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.social} position="50% 45%" className="scale-[1.04] opacity-[.88]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/6 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>05 / SOCIAL MEDIA</Label>
        <Label>INSTAGRAM · FACEBOOK · TIKTOK</Label>
      </div>
      <Parallax speed={-0.016} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <Label>SOCIAL MEDIA</Label>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h3 className="display-serif max-w-2xl text-3xl text-white sm:text-4xl">Une présence qui ressemble à votre marque.</h3>
            <div className="flex gap-2">
              {["IG", "FB", "TK"].map((x) => (
                <span key={x} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[7px] font-bold text-white/65">
                  {x}
                </span>
              ))}
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function WebcareVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.maintenance} position="50% 50%" className="scale-[1.04] opacity-[.82]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>06 / WEBCARE</Label>
        <Label>KEEP IT LIVE</Label>
      </div>
      <Parallax speed={0.018} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-white/75" />
            <div>
              <Label>CONTINUITY</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Corrections. Sécurité. Évolutions.</p>
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function RoboticsVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,.16),transparent_26%),linear-gradient(145deg,#d8d8d8,#111)]" />
      <Parallax speed={-0.018} className="absolute inset-4 sm:inset-7">
        <div className="relative h-full overflow-hidden rounded-[1.7rem]">
          <img
            src={XR_PHOTOS.robotics}
            alt=""
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,.48)]"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-xl">
            <Label>07 / ROBOTIQUE</Label>
          </div>
        </div>
      </Parallax>
      <div className="absolute bottom-6 left-6 right-6 text-center sm:left-10 sm:right-10">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/55">ACCUEILLIR · LIVRER · NETTOYER · AUTOMATISER</span>
      </div>
    </Stage>
  );
}

function RefonteVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.refonte} position="50% 46%" className="scale-[1.04] opacity-[.86]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>08 / REFONTE</Label>
        <Label>REBUILD THE EXPERIENCE</Label>
      </div>
      <Parallax speed={0.018} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <Label>REFONTE</Label>
          <h3 className="display-serif mt-2 max-w-xl text-3xl text-white sm:text-4xl">On ne repeint pas. On reconstruit.</h3>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function AdsVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.ads} position="50% 48%" className="scale-[1.04] opacity-[.84]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>09 / GOOGLE ADS</Label>
        <Label>PAID ACQUISITION</Label>
      </div>
      <Parallax speed={0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Megaphone className="h-4 w-4 text-white/75" />
            <Label>GOOGLE ADS</Label>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[["CTR", "↑"], ["CPA", "↓"], ["ROAS", "×"]].map(([a, b]) => (
              <div key={a} className="rounded-xl border border-white/12 bg-white/6 p-3 text-white">
                <span className="label-mono text-[5px] text-white/45">{a}</span>
                <span className="mt-2 block text-lg font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function StrategyVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.strategy} position="50% 42%" className="scale-[1.04] opacity-[.8]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>10 / STRATÉGIE</Label>
        <Label>DIRECTION</Label>
      </div>
      <Parallax speed={-0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Gauge className="h-4 w-4 text-white/75" />
            <div>
              <Label>STRATEGY</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Positionnement → parcours → priorités.</p>
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function AiVisual() {
  return (
    <Stage className="bg-[#e9e4dc]">
      <Photo src={XR_PHOTOS.ai} position="50% 50%" className="scale-[1.04] opacity-[.84]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/7 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <Label>11 / IA</Label>
        <Label>AUTOMATION</Label>
      </div>
      <Parallax speed={0.02} className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <Glass className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-white/75" />
            <div>
              <Label>AI SYSTEM</Label>
              <p className="mt-1 text-xs font-semibold text-white sm:text-sm">Données → IA → action.</p>
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function GenericVisual({ info }: { info: Meta }) {
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  return (
    <Stage className="bg-[#e9e4dc]">
      {src ? <Photo src={src} position={info.position} className="opacity-[.9]" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
      <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
        <Label>{info.number} / {info.label}</Label>
      </div>
    </Stage>
  );
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const visual =
    service === "websites" ? <WebVisual /> :
    service === "branding" ? <BrandingVisual /> :
    service === "seo" ? <SeoVisual /> :
    service === "maps" ? <MapsVisual /> :
    service === "social" ? <SocialVisual /> :
    service === "maintenance" ? <WebcareVisual /> :
    service === "robotics" ? <RoboticsVisual /> :
    service === "refonte" ? <RefonteVisual /> :
    service === "ads" ? <AdsVisual /> :
    service === "strategy" ? <StrategyVisual /> :
    service === "ai" ? <AiVisual /> :
    <GenericVisual info={info} />;

  return (
    <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-black shadow-[var(--xr-shadow)]">
      {visual}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t border-white/20" />
        <div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r border-white/20" />
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
