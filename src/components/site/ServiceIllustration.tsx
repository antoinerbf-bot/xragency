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

function Stage({ children, className = "", accent = "#d9b48c" }: { children: ReactNode; className?: string; accent?: string }) {
  return (
    <div
      className={
        "xr-depth relative min-h-[360px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] sm:min-h-[430px] " +
        className
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 z-[1] h-72 w-72 rounded-full blur-3xl opacity-25"
        style={{ background: accent }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,.08)_46%,transparent_62%)]" />
      <div className="relative z-[2] h-full">{children}</div>
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
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
      <Photo src={XR_PHOTOS.websites} position="52% 45%" className="scale-[1.04] opacity-[.92]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/25" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/70">01 / WEB DESIGN ÉLITE</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 label-mono text-[6px] text-white/80">
          PROPRIÉTÉ TOTALE · AUCUN TEMPLATE
        </span>
      </div>

      <Parallax speed={0.018} direction="both" className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
        <Glass className="p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <Label>CONVERSION · HAUTE VITESSE · DESIGN SIGNATURE</Label>
              </div>
              <h3 className="display-serif mt-2 max-w-xl text-2xl text-white sm:text-3xl">
                L’incarnation de votre marque en ligne.
              </h3>
            </div>
            <div className="flex gap-2">
              <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 label-mono text-[7px] text-white/80">
                ⚡ 0.8s Vitesse
              </span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 label-mono text-[7px] text-white/80">
                📱 100% Responsive
              </span>
            </div>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function BrandingVisual() {
  return (
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
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
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
      <Photo src={XR_PHOTOS.seo} position="50% 45%" className="scale-[1.03] opacity-[.88]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/70">03 / SEO ACQUISITION</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 label-mono text-[6px] text-white/80">
          TRAFIC INTENTIONNISTE
        </span>
      </div>

      <Parallax speed={0.02} className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
        <Glass className="p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-white sm:text-sm">Croissance Organique Google</span>
            </div>
            <span className="label-mono rounded-md bg-emerald-500/20 px-2 py-0.5 text-[8px] font-bold text-emerald-300">
              +420% Visiteurs
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Mots-clés Top 3", val: "38 requêtes" },
              { label: "Coût par clic économisé", val: "3 400 € /m" },
              { label: "Leads qualifiés", val: "x3,8" },
            ].map((metric, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
                <span className="label-mono block text-[5px] text-white/50">{metric.label}</span>
                <span className="mt-1 block text-[10px] font-bold text-white">{metric.val}</span>
              </div>
            ))}
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function MapsVisual() {
  return (
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
      <Photo src={XR_PHOTOS.maps} position="50% 18%" className="scale-[1.04] opacity-[.94]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/30" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <span className="label-mono text-[7px] tracking-[.2em] text-white/70">04 / GOOGLE MAPS</span>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-0.5 label-mono text-[6px] font-bold text-emerald-300">
          POSITION N°1 GARANTIE
        </span>
      </div>

      <Parallax speed={0.018} className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
        <Glass className="p-4 sm:p-5">
          {/* Header fiche Google My Business */}
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[9px] font-black text-black">✓</span>
                <p className="text-xs font-bold text-white sm:text-sm">Votre Établissement · Top 1 Local Pack</p>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[9px] text-white/70">
                <span className="font-bold text-amber-300">5,0 ★★★★★</span>
                <span>(184 avis vérifiés)</span>
                <span>· Ouvert</span>
              </div>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-center">
              <span className="label-mono block text-[5px] text-white/60">RANG GOOGLE</span>
              <span className="text-xs font-black text-white">#1</span>
            </div>
          </div>

          {/* Actions & métriques */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[8px] font-semibold text-white/90">
                📞 +240% Appels entrants
              </span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[8px] font-semibold text-white/90">
                📍 +310% Itinéraires
              </span>
            </div>
            <span className="label-mono text-[7px] text-emerald-400 font-semibold">
              Flux continu de clients
            </span>
          </div>
        </Glass>
      </Parallax>
    </Stage>
  );
}

function SocialVisual() {
  return (
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
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
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
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
    <Stage className="bg-[var(--xr-bg-elev)]" accent="rgba(255,255,255,.08)">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,.14),transparent_40%),linear-gradient(155deg,#1c1d22,#0a0a0c)]" />
      <Parallax speed={-0.018} className="absolute inset-4 sm:inset-6">
        <div className="relative h-full overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40">
          <img
            src={XR_PHOTOS.robotics}
            alt="Robotique de service XR Agency"
            className="absolute inset-0 h-full w-full object-contain p-4 drop-shadow-[0_25px_50px_rgba(0,0,0,.8)]"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="label-mono text-[7px] text-white">ROBOTIQUE DE SERVICE · RESTAURATION & RETAIL</span>
          </div>
        </div>
      </Parallax>
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
        <Glass className="p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="label-mono text-[6px] text-white/60">INTELLIGENCE TERRAIN</p>
              <p className="text-xs font-semibold text-white">Livraison en salle · Accueil prestige · Automatisation</p>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 label-mono text-[7px] font-bold text-white">
              Location & Vente
            </span>
          </div>
        </Glass>
      </div>
    </Stage>
  );
}

function RefonteVisual() {
  return (
    <Stage className="bg-[var(--xr-bg-elev)]">
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
    <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
      {visual}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t border-white/20" />
        <div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r border-white/20" />
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
