import { useState, useRef, type ReactNode } from "react";
import { Activity, ArrowUpRight, Bookmark, Bot, Check, CheckCircle2, Clock, Cpu, Eye, Film, Gauge, Globe2, Heart, Lock, MapPin, Megaphone, MessageCircle, Music, Palette, Play, Radio, Search, Server, Share2, ShieldCheck, Sparkles, TrendingUp, Video, Volume2, Zap } from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";
import { Parallax } from "./primitives";

export function InstagramLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Instagram">
      <defs>
        <radialGradient id="xrInstaGrad" cx="30%" cy="105%" r="115%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="35%" stopColor="#ff0100" />
          <stop offset="65%" stopColor="#d800b9" />
          <stop offset="100%" stopColor="#7024c4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#xrInstaGrad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export function TikTokLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="TikTok">
      <rect width="24" height="24" rx="5.5" fill="#010101" />
      <path
        d="M16.6 5.82s.51.5 1.4 0c.93-.53 2-.82 3.1-.82V8.4a6.38 6.38 0 0 1-3.7-1.18v6.52c0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8c.37 0 .73.04 1.08.1v3.45a2.53 2.53 0 0 0-1.08-.24c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V3.8h2.5c0 .7.3 1.45.8 2.02z"
        fill="#00f2fe"
        opacity="0.9"
        transform="translate(-0.5, -0.5)"
      />
      <path
        d="M16.6 5.82s.51.5 1.4 0c.93-.53 2-.82 3.1-.82V8.4a6.38 6.38 0 0 1-3.7-1.18v6.52c0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8c.37 0 .73.04 1.08.1v3.45a2.53 2.53 0 0 0-1.08-.24c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V3.8h2.5c0 .7.3 1.45.8 2.02z"
        fill="#fe2c55"
        opacity="0.9"
        transform="translate(0.5, 0.5)"
      />
      <path
        d="M16.6 5.82s.51.5 1.4 0c.93-.53 2-.82 3.1-.82V8.4a6.38 6.38 0 0 1-3.7-1.18v6.52c0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8c.37 0 .73.04 1.08.1v3.45a2.53 2.53 0 0 0-1.08-.24c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V3.8h2.5c0 .7.3 1.45.8 2.02z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function FacebookLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Facebook">
      <circle cx="12" cy="12" r="10.5" fill="#1877F2" />
      <path
        d="M15.2 12.3h-2.1v7.2h-3v-7.2h-1.5v-2.5h1.5V8.1c0-2.1 1.2-3.3 3.2-3.3.9 0 1.8.1 1.8.1v2.3h-1c-1 0-1.4.6-1.4 1.3v1.3h2.4l-.4 2.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

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

function Stage({ children, className = "", accent = "rgba(255,255,255,.08)" }: { children: ReactNode; className?: string; accent?: string }) {
  return (
    <div
      className={
        "xr-depth relative min-h-[360px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] sm:min-h-[430px] " +
        className
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 z-[1] h-72 w-72 rounded-full blur-3xl opacity-20"
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
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[#0e1015] via-[#090b0e] to-[#0e1015] p-6 text-white shadow-2xl backdrop-blur-2xl sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#c5a880]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Barre supérieure type Studio Browser + Toggle Mobile/Desktop */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-[8px] tracking-[.18em] text-white/65">
            HTTPS://XRAGENCYAI.COM · SHOWREEL WEB
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase transition ${
              device === "desktop" ? "bg-[#c5a880] text-[#090a0d]" : "text-white/70 hover:text-white"
            }`}
          >
            Vue PC 16:10
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase transition ${
              device === "mobile" ? "bg-[#c5a880] text-[#090a0d]" : "text-white/70 hover:text-white"
            }`}
          >
            Vue Mobile 9:16
          </button>
        </div>
      </div>

      {/* Scène Vidéo Interactive */}
      <div className="py-6 grid gap-6 lg:grid-cols-[1.28fr_.72fr] items-center">
        <div className="flex justify-center">
          <div
            className={`group relative overflow-hidden rounded-[1.8rem] border border-white/20 bg-black shadow-2xl transition-all duration-500 ${
              device === "mobile" ? "w-[235px] aspect-[9/16] rounded-[2.2rem]" : "w-full aspect-[16/10]"
            }`}
          >
            <video
              src="/videos/hero-ambient-loop.mp4"
              poster={XR_PHOTOS.websites}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[7.5px] font-bold text-emerald-300 backdrop-blur-md">
                ● LIVE VIDEO RENDER
              </span>
              <span className="rounded-full bg-[#c5a880] px-2.5 py-0.5 font-mono text-[7.5px] font-black text-black">
                MAQUETTE 24H
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="label-mono text-[7px] text-[#e5cba4] font-bold">
                  ARCHITECTURE HAUTE CONVERSION
                </span>
                <p className="text-xs font-semibold text-white">
                  {device === "mobile" ? "Expérience Mobile Immersive" : "Vitrine, Business & E-Commerce"}
                </p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 label-mono text-[7px] font-bold text-white backdrop-blur-md">
                499 € · 799 € · 1 499 €
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] text-[#e5cba4]">LIVRAISON CLÉ EN MAIN 7 JOURS</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h4 className="mt-1 text-xs font-bold text-white">Maquette Gratuite Validée Avant Lancement</h4>
            <p className="mt-1 text-[9px] leading-relaxed text-white/70">
              Design éditorial sur-mesure, parcours mobile ultra-fluide, formulaires connectés et propriété 100 % du code.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] text-white/60">BENCHMARK TECHNIQUE</span>
              <span className="label-mono text-[7px] font-bold text-emerald-400">GRADE A+</span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center text-[7.5px]">
              <div className="rounded-lg bg-black/50 p-2 border border-white/10">
                <span className="block font-bold text-emerald-400">100/100</span>
                <span className="label-mono text-[5.5px] text-white/60">SEO GOOGLE</span>
              </div>
              <div className="rounded-lg bg-black/50 p-2 border border-white/10">
                <span className="block font-bold text-white">&lt; 0.4s</span>
                <span className="label-mono text-[5.5px] text-white/60">VITESSE</span>
              </div>
              <div className="rounded-lg bg-black/50 p-2 border border-white/10">
                <span className="block font-bold text-[#e5cba4]">100%</span>
                <span className="label-mono text-[5.5px] text-white/60">MOBILE OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="label-mono text-[7px] text-white/60">
          VITRINE (499 €) · BUSINESS (799 €) · E-COMMERCE (1 499 €)
        </span>
        <span className="label-mono text-[7px] font-bold text-[#e5cba4]">PRÊT À CONVERTIR</span>
      </div>
    </div>
  );
}

function BrandingVisual() {
  const [paletteIdx, setPaletteIdx] = useState(0);
  const palettes = [
    {
      name: "Obsidienne & Bronze Impérial",
      colors: ["#090A0D", "#1E1B16", "#C5A880", "#F8F6F0"],
    },
    {
      name: "Jade Émeraude & Craie",
      colors: ["#0E1512", "#1F352C", "#10B981", "#F5F1E9"],
    },
    {
      name: "Cobalt Tech & Argent",
      colors: ["#090D16", "#162647", "#38BDF8", "#F8FAFC"],
    },
  ];
  const currentPal = palettes[paletteIdx];

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[#0e1015] via-[#090b0e] to-[#0e1015] p-6 text-white shadow-2xl backdrop-blur-2xl sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#c5a880]/15 blur-3xl" />

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-[#c5a880]" />
          <span className="font-mono text-[8px] tracking-[.18em] text-white/75">
            STUDIO BRANDING & DIRECTION ARTISTIQUE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#c5a880]/20 px-2.5 py-0.5 font-mono text-[7px] font-bold text-[#e5cba4]">
            CESSION 100% DROITS
          </span>
          <Label>04 / BRANDING</Label>
        </div>
      </div>

      <div className="py-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
        <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/15 shadow-2xl">
          <img
            src={XR_PHOTOS.branding}
            alt="Direction artistique, Brand Book et papeterie de prestige"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div>
              <span className="label-mono text-[7px] text-[#e5cba4] font-bold">
                ATELIER TYPOGRAPHIE & COULEURS
              </span>
              <p className="text-xs font-semibold text-white">Logo Vectoriel, Papeterie & Brand Book</p>
            </div>
            <span className="rounded-full bg-[#c5a880] px-3 py-1 label-mono text-[7px] font-black text-black">
              199 € · 399 € · 699 €
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] text-[#e5cba4]">TESTER UNE HARMONIE CHROMATIQUE</span>
            </div>
            <div className="mt-2 flex gap-1.5">
              {palettes.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPaletteIdx(i)}
                  className={`flex-1 rounded-lg py-1 font-mono text-[7px] font-bold transition ${
                    paletteIdx === i ? "bg-[#c5a880] text-black" : "bg-white/10 text-white/70"
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {currentPal.colors.map((hex) => (
                <div key={hex} className="flex-1 text-center">
                  <div
                    className="h-10 w-full rounded-xl border border-white/20 shadow-sm transition-colors duration-300"
                    style={{ background: hex }}
                  />
                  <span className="mt-1 block font-mono text-[7px] text-white/70">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white">Livrables Vectoriels HD & Print</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 label-mono text-[6.5px] font-bold text-emerald-300">
                300 DPI
              </span>
            </div>
            <p className="mt-1.5 text-[9px] leading-relaxed text-white/70">
              Fichiers sources (AI, SVG, PDF, PNG), charte graphique complète et kit réseaux sociaux.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="label-mono text-[7px] text-white/60">
          AI · SVG · PDF PRINT 300 DPI · KIT RÉSEAUX SOCIAUX
        </span>
        <span className="label-mono text-[7px] font-bold text-[#e5cba4]">IDENTITÉ DE PRESTIGE</span>
      </div>
    </div>
  );
}

function SeoVisual() {
  return (
    <Stage accent="rgba(56,189,248,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-sky-500" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE SERP PREVIEW</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">+184% TRAFIC</span>
            <Label>03 / SEO NATUREL</Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.seo}
              alt="Dashboard SEO & Positionnement Google Top 1"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90">PILOTAGE ACQUISITION ORGANIQUE</span>
                <p className="text-[10px] font-semibold text-white">Top 1 Google · Croissance +184%</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md">Certifié A+</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[8px] xr-muted">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-neutral-900 text-[6px] font-black text-white">XR</span>
                <span>https://xragencyai.com</span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold ml-auto">POSITION #1</span>
              </div>
              <h4 className="mt-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                XR Agency | Agence Web & Performance Digitale
              </h4>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted line-clamp-2">
                Création de sites internet haut de gamme, branding & acquisition locale.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted">Audit sémantique + Cocon SEO + Backlinks</span>
              <span className="label-mono text-[7px] font-bold xr-accent">Dès 299 €/m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">NETLINKING · COCON SÉMANTIQUE · CORE WEB VITALS</span>
          <span className="label-mono text-[7px] xr-accent font-semibold">À PARTIR DE 299 €/MOIS</span>
        </div>
      </div>
    </Stage>
  );
}

function MapsVisual() {
  const [selectedOffer, setSelectedOffer] = useState<"top3" | "manage">("top3");

  return (
    <div className="relative isolate overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[#0e1015] via-[#090b0e] to-[#0e1015] p-6 text-white shadow-2xl sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-[#c5a880]/40 bg-[#c5a880]/15 text-[#e5cba4]">
            <MapPin className="h-4 w-4" />
          </span>
          <span className="font-mono text-[8px] tracking-[.18em] text-white/75">
            GOOGLE MAPS · PACK LOCAL TOP 3 GARANTI 24H/24 & 7J/7
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 p-1">
          <button
            type="button"
            onClick={() => setSelectedOffer("top3")}
            className={`rounded-full px-3 py-1 font-mono text-[7.5px] font-bold uppercase transition ${
              selectedOffer === "top3" ? "bg-[#c5a880] text-black" : "text-white/70 hover:text-white"
            }`}
          >
            Offre 1 : Top 3 (dès 999 €/an)
          </button>
          <button
            type="button"
            onClick={() => setSelectedOffer("manage")}
            className={`rounded-full px-3 py-1 font-mono text-[7.5px] font-bold uppercase transition ${
              selectedOffer === "manage" ? "bg-emerald-400 text-black" : "text-white/70 hover:text-white"
            }`}
          >
            Offre 2 : Gestion (500 €/an)
          </button>
        </div>
      </div>

      <div className="grid gap-6 py-6 lg:grid-cols-[.95fr_1.05fr] items-center">
        {/* Carte Cinématique Radar Google Maps */}
        <div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-white/15 bg-[#12151c]">
          <img
            src={XR_PHOTOS.maps}
            alt="Google Maps Top 3"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1.5 backdrop-blur-xl">
            <Search className="h-3.5 w-3.5 text-[#c5a880]" />
            <span className="font-mono text-[8px] font-bold text-white">
              EX : « SERRURIER PARIS » · TOP 3 GARANTI
            </span>
          </div>

          <div className="absolute left-[44%] top-[38%]">
            <span className="absolute -inset-4 rounded-full bg-emerald-400/35 animate-ping" />
            <span className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.8)]">
              <MapPin className="h-5 w-5" />
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/80 p-3.5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] font-bold text-[#e5cba4]">
                GARANTIE CONTRACTUELLE 12 MOIS
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[7.5px] font-bold text-emerald-300">
                OU REMBOURSÉ
              </span>
            </div>
            <p className="mt-1 text-[10px] text-white/80">
              Validation préalable obligatoire par nos experts et analystes selon la concurrence de votre ville.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Classement Google Maps en Direct */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-[#c5a880]/60 bg-gradient-to-r from-[#1d1912] to-[#12151c] p-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#c5a880] font-mono text-sm font-black text-black">
                  #1
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Votre Établissement (Leader Local)</h4>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[7px] font-bold text-emerald-300">
                      TOP 3 GARANTI 24/7
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="font-bold text-[#e5cba4]">5.0 ★★★★★</span>
                    <span className="text-white/65">(Avis vérifiés & optimisés)</span>
                  </div>
                  <p className="mt-2 text-[10px] text-white/80">
                    {selectedOffer === "top3"
                      ? "Propulsion & maintien dans les 3 premiers résultats pendant 1 an complet (dès 999 € / an)."
                      : "Pilotage intégral de votre fiche pendant 12 mois : photos géolocalisées, avis & posts (500 € / an)."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 opacity-70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-lg border border-white/15 font-mono text-[10px] font-bold text-white/70">
                  #2
                </span>
                <span className="text-xs font-medium text-white/80">Concurrent Local B · 4.2 ★</span>
              </div>
              <span className="font-mono text-[7.5px] text-white/50">DISTANCÉ</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-lg border border-white/15 font-mono text-[10px] font-bold text-white/70">
                  #3
                </span>
                <span className="text-xs font-medium text-white/80">Concurrent Local C · 3.9 ★</span>
              </div>
              <span className="font-mono text-[7.5px] text-white/50">DISTANCÉ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="label-mono text-[7px] text-white/60">
          OFFRE 1 : TOP 3 GARANTI 1 AN (DÈS 999 €/AN) · OFFRE 2 : GESTION ANNUELLE (500 €/AN)
        </span>
        <span className="label-mono text-[7px] font-bold text-[#e5cba4]">
          VALIDATION EXPERTS OBLIGATOIRE
        </span>
      </div>
    </div>
  );
}

function SocialVisual() {
  const [platform, setPlatform] = useState<"instagram" | "tiktok" | "facebook">("instagram");
  const [likes, setLikes] = useState(28400);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const platforms = [
    {
      id: "instagram" as const,
      name: "Instagram",
      badge: "REELS 4K & FEED",
      tagline: "Direction Artistique Haute Couture",
      accent: "from-pink-500 via-rose-500 to-amber-400",
      border: "hover:border-pink-500/50",
      activeBg: "bg-pink-500/10 border-pink-500/40 text-pink-300",
      logo: InstagramLogo,
      stat: "IMAGE DE MARQUE",
      desc: "Direction artistique cohérente, tournage sur site et feed harmonisé.",
    },
    {
      id: "tiktok" as const,
      name: "TikTok",
      badge: "HOOK 3S & VIRALITÉ",
      tagline: "Storytelling & Rétention Algorithmique",
      accent: "from-cyan-400 to-blue-500",
      border: "hover:border-cyan-400/50",
      activeBg: "bg-cyan-500/10 border-cyan-400/40 text-cyan-300",
      logo: TikTokLogo,
      stat: "VIDÉOS VERTICALES",
      desc: "Accroches créatives, montage rythmé et formats adaptés à la plateforme.",
    },
    {
      id: "facebook" as const,
      name: "Facebook & Meta Ads",
      badge: "LOCAL 5KM & ROAS ×4.2",
      tagline: "Acquisition Géolocalisée Rentable",
      accent: "from-blue-500 to-indigo-500",
      border: "hover:border-blue-500/50",
      activeBg: "bg-blue-500/10 border-blue-500/40 text-blue-300",
      logo: FacebookLogo,
      stat: "DIFFUSION CIBLÉE",
      desc: "Contenus sponsorisés et ciblage définis selon vos objectifs et votre audience.",
    },
  ];

  const current = platforms.find((p) => p.id === platform) ?? platforms[0];
  const CurrentLogo = current.logo;

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
      {/* Dynamic ambient halo based on active platform */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full blur-3xl opacity-20 transition-all duration-700"
        style={{
          background:
            platform === "instagram"
              ? "radial-gradient(circle, #e1306c, #f77737)"
              : platform === "tiktok"
              ? "radial-gradient(circle, #00f2fe, #fe2c55)"
              : "radial-gradient(circle, #1877F2, #0d5bb5)",
        }}
      />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b xr-line pb-4">
        <div className="flex items-center gap-2.5">
          <CurrentLogo className="h-5 w-5 shrink-0 shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="label-mono text-[8px] font-bold tracking-[.18em] text-[var(--xr-ink)]">
                STUDIO SOCIAL MEDIA · XR AGENCY
              </span>
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              </span>
            </div>
            <p className="text-[10px] xr-muted">Tournages 4K, montage cinématique & community management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 label-mono text-[7px] font-bold text-emerald-400">
            100% CLÉ-EN-MAIN
          </span>
          <Label>03 / SOCIAL</Label>
        </div>
      </div>

      {/* Main Grid: Interactive Smartphone Mockup + Telemetry Tunnel */}
      <div className="py-6 grid gap-6 lg:grid-cols-[280px_1fr] items-center">
        {/* Smartphone Reel / Post Simulator */}
        <div className="mx-auto w-full max-w-[275px]">
          <div className="relative overflow-hidden rounded-[2.3rem] border-[3px] border-[#252b3b] bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10 aspect-[9/16]">
            {/* Camera Dynamic Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-3 h-4 w-28 rounded-full bg-black/90 border border-white/10 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b202e]" />
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="label-mono text-[5.5px] font-bold text-white tracking-wider">REC 4K</span>
              </div>
            </div>

            {/* Video / Photo Background */}
            <img
              src={XR_PHOTOS.social}
              alt="Shooting vidéo 4K et production social media"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.92] contrast-[1.05]"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/60 z-10 pointer-events-none" />

            {/* In-Phone Header */}
            <div className="absolute top-8 left-3.5 right-3.5 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full border border-white/30 bg-black/60 p-0.5 backdrop-blur-md">
                  <CurrentLogo className="h-full w-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold tracking-tight">xragency.paris</span>
                    <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 text-[6.5px] font-bold text-white">
                      ✓
                    </span>
                  </div>
                  <span className="label-mono text-[6px] text-white/70 block -mt-0.5">
                    {platform === "facebook" ? "Sponsorisé · Rayon 5 km" : "Production 4K officielle"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleLike}
                className="rounded-full bg-white/20 hover:bg-white/30 px-2.5 py-1 label-mono text-[6.5px] font-bold backdrop-blur-md transition"
              >
                Suivre
              </button>
            </div>

            {/* In-Phone Right Interaction Sidebar */}
            <div className="absolute right-2.5 bottom-16 z-20 flex flex-col items-center gap-3 text-white">
              <button
                type="button"
                onClick={toggleLike}
                className="group flex flex-col items-center gap-1 transition active:scale-125"
                aria-label="Aimer"
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-md transition border ${
                    isLiked
                      ? "bg-rose-600/90 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.7)]"
                      : "bg-black/50 border-white/20 text-white hover:bg-black/70"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                </div>
                <span className="label-mono text-[6.5px] font-bold drop-shadow-md">
                  {(likes / 1000).toFixed(1)}k
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition"
                aria-label="Commentaires"
              >
                <div className="h-9 w-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="label-mono text-[6.5px] font-bold drop-shadow-md">1.4k</span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition"
                aria-label="Partager"
              >
                <div className="h-9 w-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <Share2 className="h-4 w-4" />
                </div>
                <span className="label-mono text-[6.5px] font-bold drop-shadow-md">4.8k</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition"
                aria-label="Enregistrer"
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-md transition border ${
                    isSaved ? "bg-amber-400 text-black border-amber-300" : "bg-black/50 border-white/20 text-white"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                </div>
              </button>

              {/* Spinning vinyl audio record */}
              <div className="mt-1 relative flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 border border-white/30 animate-spin [animation-duration:5s]">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
            </div>

            {/* In-Phone Bottom Content */}
            <div className="absolute bottom-3 left-3 right-14 z-20 text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 border border-white/15 backdrop-blur-md mb-1.5">
                <Music className="h-2.5 w-2.5 text-amber-300 animate-pulse" />
                <span className="label-mono text-[6px] tracking-wider text-white/90 truncate max-w-[120px]">
                  XR Soundscape · Audio 4K
                </span>
              </div>
              <p className="text-[10px] font-bold leading-tight drop-shadow-md text-white">
                {current.tagline}
              </p>
              <p className="mt-0.5 text-[7.5px] leading-tight text-white/85 line-clamp-2 drop-shadow-sm">
                {current.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Sales Tunnel Control & Telemetry Panel */}
        <div className="space-y-4">
          {/* Interactive Platform Tabs with Official Logos */}
          <div className="space-y-2">
            <span className="label-mono text-[7px] tracking-[.2em] xr-muted uppercase">
              1. CHOISISSEZ LA PLATEFORME POUR TESTER L'EXPÉRIENCE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {platforms.map((p) => {
                const PLogo = p.logo;
                const isSelected = p.id === platform;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={
                      "relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-300 " +
                      (isSelected
                        ? "border-amber-400/60 bg-[var(--xr-surface-strong)] shadow-lg scale-[1.02] ring-1 ring-amber-400/40"
                        : "border-white/10 bg-[var(--xr-surface)]/70 hover:border-white/30 hover:bg-[var(--xr-surface-strong)]")
                    }
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <PLogo className="h-5 w-5" />
                        <span className="text-xs font-bold text-[var(--xr-ink)]">{p.name}</span>
                      </div>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                      )}
                    </div>
                    <span className="mt-2 label-mono text-[6.5px] font-bold text-amber-300">
                      {p.badge}
                    </span>
                    <span className="mt-0.5 text-[8px] xr-muted leading-tight">{p.stat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Impact & Telemetry Metrics */}
          <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between border-b xr-line pb-2.5">
              <span className="label-mono text-[7px] tracking-[.18em] xr-muted uppercase">
                2. VOTRE CONTENU, DE L’IDÉE À LA PUBLICATION
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 label-mono text-[6.5px] font-bold text-emerald-400">
                MÉTHODE SUR MESURE
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { step: "01", title: "Cadrer", desc: "Votre marque, vos clients et vos objectifs." },
                { step: "02", title: "Créer", desc: "Un univers visuel et des formats adaptés." },
                { step: "03", title: "Publier", desc: "Un calendrier éditorial clair et régulier." },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border xr-line bg-[var(--xr-bg)]/80 p-3">
                  <span className="label-mono text-[7px] font-bold text-amber-300">{item.step} / ÉTAPE</span>
                  <p className="mt-1 text-sm font-semibold text-[var(--xr-ink)]">{item.title}</p>
                  <p className="mt-1 text-[9px] leading-4 xr-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Deliverables Checklist */}
            <div className="mt-3.5 space-y-1.5 pt-3 border-t xr-line text-[9px] text-[var(--xr-ink)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Production visuelle adaptée à votre marque et à vos canaux</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Montage soigné, rythme maîtrisé et sous-titres lisibles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Calendrier éditorial coordonné et accompagnement de publication</span>
              </div>
            </div>
          </div>

          {/* Sales conversion trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-amber-400/35 bg-gradient-to-r from-amber-400/15 via-amber-400/5 to-transparent p-3.5">
            <div>
              <span className="label-mono text-[6.5px] font-bold text-amber-300 tracking-wider uppercase">
                VOTRE PRÉSENCE SOCIALE, PRÊTE À DÉCOLLER
              </span>
              <p className="text-[11px] font-bold text-[var(--xr-ink)]">
                Dès 349 € / mois · Prise en charge intégrale sous 7 jours
              </p>
            </div>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--xr-ink)] text-[var(--xr-bg)] px-4 py-2 label-mono text-[7.5px] font-bold hover:scale-105 transition shadow-md shrink-0"
            >
              Découvrir les formules
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted">
          INSTAGRAM REELS · TIKTOK SHORTS · FACEBOOK META ADS · 100% CESSION DROITS
        </span>
        <span className="label-mono text-[7px] font-bold text-amber-300">
          STUDIO DE PRODUCTION AUDIOVISUELLE D'ÉLITE
        </span>
      </div>
    </div>
  );
}

function WebcareVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Halos cloud subtils */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="flex items-center justify-between border-b xr-line pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-400">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted">SUPERVISION CLOUD DÉDIÉE · SÉCURITÉ & MAINTENANCE HAUTE DISPONIBILITÉ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-400">
            99.99% UPTIME ACTIF
          </span>
          <Label>06 / WEBCARE</Label>
        </div>
      </div>

      <div className="py-5 space-y-4">
        {/* Real-time server telemetry cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] xr-muted-2">LATENCE SERVEUR</span>
              <Activity className="h-3 w-3 text-cyan-400 animate-pulse" />
            </div>
            <p className="mt-1 text-lg sm:text-xl font-bold text-cyan-400">&lt; 92 ms</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="label-mono text-[6px] text-emerald-400 font-medium">Paris CDG · Edge A+</span>
            </div>
          </div>

          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] xr-muted-2">DISPONIBILITÉ SLA</span>
              <Server className="h-3 w-3 text-amber-300" />
            </div>
            <p className="mt-1 text-lg sm:text-xl font-bold text-[var(--xr-ink)]">99.99%</p>
            <span className="mt-1.5 block label-mono text-[6px] text-amber-300/90 font-medium">Garantie contractuelle</span>
          </div>

          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] xr-muted-2">CHIPHER & WAF</span>
              <Lock className="h-3 w-3 text-emerald-400" />
            </div>
            <p className="mt-1 text-lg sm:text-xl font-bold text-emerald-400">TLS 1.3</p>
            <span className="mt-1.5 block label-mono text-[6px] text-emerald-300/80 font-medium">Pare-feu anti-DDoS</span>
          </div>
        </div>

        {/* Live automated log journal */}
        <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/95 p-4 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between border-b xr-line pb-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-bold text-[var(--xr-ink)]">Journal de Surveillance en Temps Réel</span>
            </div>
            <span className="label-mono text-[6.5px] text-cyan-300/90 font-bold uppercase tracking-wider">
              SURVEILLANCE 24/7/365
            </span>
          </div>
          <div className="mt-3 space-y-2 text-[8px] sm:text-[8.5px]">
            <div className="flex items-center justify-between py-1 border-b xr-line/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="text-[var(--xr-ink)]">Sauvegarde quotidienne cloud chiffrée AES-256 (France & Francfort)</span>
              </div>
              <span className="label-mono text-[7px] text-emerald-400 font-bold">SUCCÈS 04:00</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b xr-line/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="text-[var(--xr-ink)]">Filtrage WAF applicatif & scans de vulnérabilités continues</span>
              </div>
              <span className="label-mono text-[7px] text-cyan-400 font-bold">0 INTRUSION</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="text-[var(--xr-ink)]">Mises à jour de sécurité du noyau et monitoring continu des temps de réponse</span>
              </div>
              <span className="label-mono text-[7px] text-amber-300 font-bold">À JOUR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted">SAUVEGARDES QUOTIDIENNES · INFOGÉRANCE SENIOR · MODIFICATIONS INCLUSES</span>
        <span className="label-mono text-[7px] font-bold text-amber-300">SÉRÉNITÉ DIGITALE DÈS 29 € / MOIS</span>
      </div>
    </div>
  );
}

const KORBEN_ROBOTS = [
  {
    id: "tribot",
    name: "TriBot",
    type: "Collecte & Tri Intelligent",
    image: "https://www.korbenforpeople.com/wp-content/uploads/2026/01/S3J0900-scaled.png",
    specs: ["120 L Bacs (2×60L)", "Écran 18,5\" FHD", "Batterie échangeable", "24 h/24 Continu"],
    tag: "HÔTELS · RETAIL · GARES",
    url: "https://www.korbenforpeople.com/robot/tribot/",
  },
  {
    id: "welcome-plus",
    name: "Welcome Plus",
    type: "Accueil VIP & Assistant interactif",
    image: "https://www.korbenforpeople.com/wp-content/uploads/2025/08/ROBOT-ACCUEIL-02-scaled.png",
    specs: ["Écran tactile 27\"", "30+ Langues", "Guidage LiDAR", "Interaction Vocale"],
    tag: "SIÈGES · SALONS · CLINIQUE",
    url: "https://www.korbenforpeople.com/robot/welcome-plus/",
  },
  {
    id: "delivery-pro",
    name: "Delivery Pro",
    type: "Service & Livraison Autonome",
    image: "https://www.korbenforpeople.com/wp-content/uploads/2025/08/DELIVERY-BOTS-2-VUE-01-scaled.png",
    specs: ["Charge utile 60 kg", "3 à 4 Plateaux", "Suspension active", "Évitement 360°"],
    tag: "RESTAURANTS · HÔTELS",
    url: "https://www.korbenforpeople.com/robot/delivery-pro/",
  },
  {
    id: "phantas",
    name: "Cleaning Phantas",
    type: "Nettoyage Haute Précision",
    image: "https://www.korbenforpeople.com/wp-content/uploads/2025/08/PHANTAS-VUE-02.png",
    specs: ["500 m²/h", "Lavage & Aspiration", "Bordures zéro marge", "Auto-vidange"],
    tag: "BOUTIQUES · BUREAUX",
    url: "https://www.korbenforpeople.com/robot/cleaning-phantas/",
  },
];

function RoboticsVisual() {
  const [selectedRobot, setSelectedRobot] = useState(KORBEN_ROBOTS[0]);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = ((0.5 - y) * 22).toFixed(1);
    const rotY = ((x - 0.5) * 32).toFixed(1);
    setRotate({ x: parseFloat(rotX), y: parseFloat(rotY) });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[#080b10] to-[var(--xr-surface)] p-5 sm:p-7 shadow-2xl backdrop-blur-2xl"
    >
      {/* Dynamic ambient sci-fi halos */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Header with live 3D status badge */}
      <div className="flex items-center justify-between border-b xr-line pb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-400">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted">XR × KORBEN · ROBOTS PROFESSIONNELS EN SITUATION RÉELLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            VUE 3D 360° INTERACTIVE
          </span>
          <Label>07 / ROBOTIQUE</Label>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
        {KORBEN_ROBOTS.map((robot) => (
          <button
            key={robot.id}
            type="button"
            onClick={() => setSelectedRobot(robot)}
            className={`rounded-xl px-3 py-1.5 label-mono text-[7.5px] font-bold tracking-wider transition-all duration-300 ${
              selectedRobot.id === robot.id
                ? "border border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                : "border xr-line bg-[var(--xr-surface-strong)] text-[var(--xr-ink)]/70 hover:border-white/30 hover:text-white"
            }`}
          >
            {robot.name}
          </button>
        ))}
        <span className="ml-auto label-mono text-[7px] text-white/40 hidden md:inline-block">
          Survolez pour incliner sous tous les angles
        </span>
      </div>

      {/* Interactive 3D Stage */}
      <div className="relative mt-4 flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl border xr-line bg-gradient-to-b from-[#0e121a]/90 to-[#07090d]/90 p-5 backdrop-blur-xl overflow-hidden min-h-[300px]">
        {/* Holographic floor grid & laser scan */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(6,182,212,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Concentric pedestal glow */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 md:left-[35%] bottom-6 -translate-x-1/2 h-20 w-56 rounded-full bg-cyan-500/20 blur-xl" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 md:left-[35%] bottom-8 -translate-x-1/2 h-10 w-44 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]" />

        {/* 3D Moving Robot Container */}
        <div
          className="relative z-10 mx-auto md:mx-0 flex h-60 w-60 sm:h-64 sm:w-64 items-center justify-center transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.05, 1.05, 1.05)`,
          }}
        >
          <img
            src={selectedRobot.image}
            alt={selectedRobot.name}
            className="h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-[1.04] brightness-[1.02]"
          />
        </div>

        {/* Robot Specifications & Action Panel */}
        <div className="relative z-10 flex-1 w-full space-y-3">
          <div className="rounded-xl border xr-line bg-[var(--xr-surface)]/90 p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[7px] text-cyan-400 font-bold">{selectedRobot.tag}</span>
              <span className="label-mono text-[6.5px] text-emerald-400 font-semibold">DISPONIBLE DÉMO</span>
            </div>
            <h4 className="mt-1 text-base font-bold text-white tracking-tight">{selectedRobot.name}</h4>
            <p className="text-[10px] text-white/70 font-medium">{selectedRobot.type}</p>
            
            {/* Tech Specs Pills */}
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {selectedRobot.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded-lg border xr-line bg-[var(--xr-bg)]/80 px-2 py-1.5 text-[7.5px] text-white/85">
                  <Cpu className="h-2.5 w-2.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-[9px]">
            <span className="text-white/80">Location mensuelle ou achat accompagné</span>
            <span className="label-mono text-[7.5px] font-bold text-amber-300">DÈS 499 € / MOIS</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={selectedRobot.url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-white hover:bg-white/20 transition"
            >
              Fiche officielle Korben <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href="#quote"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition shadow-md"
            >
              Ajouter au devis
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-3.5 mt-3.5">
        <span className="label-mono text-[7px] xr-muted">
          ORIENTATION 3D : [ X: {rotate.x > 0 ? `+${rotate.x}` : rotate.x}° · Y: {rotate.y > 0 ? `+${rotate.y}` : rotate.y}° ]
        </span>
        <span className="label-mono text-[7px] font-bold text-cyan-400">ÉCOSYSTÈME IA & ROBOTIQUE LIVRÉ SUR SITE</span>
      </div>
    </div>
  );
}

function RefonteVisual() {
  return (
    <Stage accent="rgba(148,163,184,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-500/10 text-neutral-300">
              <Globe2 className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">AUDIT & TRANSFORMATION DIGITALE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">REBUILD A+</span>
            <Label>08 / REFONTE</Label>
          </div>
        </div>

        {/* Before / After comparison matrix */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-red-400">AVANT REFONTE</span>
                <span className="text-[10px] text-red-400">✕</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--xr-ink)]">Site Obsolète</p>
              <div className="mt-2 space-y-1 text-[8px] xr-muted">
                <p>• Temps de chargement : 4.8s</p>
                <p>• Mobile non optimisé</p>
                <p>• Taux de conversion : 0.8%</p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-emerald-400">APRÈS XR REFONTE</span>
                <span className="text-[10px] text-emerald-400 font-bold">✓</span>
              </div>
              <p className="mt-1.5 text-xs font-bold text-[var(--xr-ink)]">Architecture Next-Gen</p>
              <div className="mt-2 space-y-1 text-[8px] font-medium text-emerald-300">
                <p>• Temps de chargement : 0.3s</p>
                <p>• 100% Mobile-First & Fluide</p>
                <p>• Taux de conversion : 4.6% (×5.7)</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px] flex items-center justify-between">
            <span className="xr-muted">Migration sans perte de trafic ni de SEO existant</span>
            <span className="label-mono text-[7px] text-emerald-400 font-bold">ZÉRO REGRESSION</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">AUDIT UX · REFONTE CODE · CONVERSIONS BOOSTÉES</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">ON RECONSTRUIT POUR GAGNER</span>
        </div>
      </div>
    </Stage>
  );
}

function AdsVisual() {
  return (
    <Stage accent="rgba(56,189,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/10 text-sky-400">
              <Megaphone className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">GOOGLE ADS & META ADS CAMPAIGNS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">ROAS 4.8×</span>
            <Label>09 / ADS</Label>
          </div>
        </div>

        {/* Paid acquisition metrics console */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">CTR MOYEN</span>
              <p className="mt-1 text-base font-bold text-sky-400">8.4%</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">+140% vs marché</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">COÛT PAR LEAD</span>
              <p className="mt-1 text-base font-bold text-[var(--xr-ink)]">12.50 €</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">-42% CPA</span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2">RETOUR / INVEST.</span>
              <p className="mt-1 text-base font-bold text-emerald-500">4.8× ROAS</p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium">Rentabilité nette</span>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-[var(--xr-surface-strong)] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--xr-ink)]">Campagnes Précises & Mots-Clés Intentionnistes</span>
              <span className="label-mono text-[6.5px] font-bold text-sky-400">TRACKING SERVER-SIDE</span>
            </div>
            <p className="mt-1 text-[8.5px] leading-relaxed xr-muted">
              Ciblage ultra-qualifié à fort pouvoir d'achat, A/B testing continu des accroches et landing pages dédiées à forte conversion.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">SEARCH · SHOPPING · REMARKETING · SCALING</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">ACQUISITION RENTABLE & MESURABLE</span>
        </div>
      </div>
    </Stage>
  );
}

function StrategyVisual() {
  return (
    <Stage accent="rgba(129,140,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
              <Gauge className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">STRATÉGIE DIGITALE & EXPANSION</span>
          </div>
          <Label>10 / STRATÉGIE</Label>
        </div>

        {/* Strategy Roadmap */}
        <div className="my-auto py-3 space-y-2.5">
          {[
            { phase: "PHASE 1", label: "Diagnostic d'Opportunité & Concurrence", status: "Terminé", color: "text-emerald-400" },
            { phase: "PHASE 2", label: "Positionnement de Prestige & Offre Irrésistible", status: "En cours", color: "text-indigo-400" },
            { phase: "PHASE 3", label: "Tunnel de Vente & Canaux d'Acquisition Directe", status: "Prévu", color: "xr-muted" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="label-mono text-[6.5px] font-bold text-indigo-300">{item.phase}</span>
                <span className="text-[11px] font-semibold text-[var(--xr-ink)]">{item.label}</span>
              </div>
              <span className={`label-mono text-[6.5px] font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">PLAN D'ACTION CONCRET · KPIS CHIFFRÉS · ROADMAP 90J</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">DIRECTION STRATÉGIQUE CLAIRE</span>
        </div>
      </div>
    </Stage>
  );
}

function AiVisual() {
  return (
    <Stage accent="rgba(192,132,252,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted">INTELLIGENCE ARTIFICIELLE & AUTOMATISATION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold">IA ACTIVE</span>
            <Label>11 / IA</Label>
          </div>
        </div>

        {/* AI Workflow Agents */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 01</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">Capture & Triage</p>
              <p className="mt-1 text-[7.5px] xr-muted">Qualification automatique des leads entrants 24/7</p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 02</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">RAG & Connaissance</p>
              <p className="mt-1 text-[7.5px] xr-muted">Réponses ultra-précises basées sur vos documents</p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold">AGENT 03</span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]">Workflows Métier</p>
              <p className="mt-1 text-[7.5px] xr-muted">Génération automatique de devis et synchronisation</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-[9px]">
            <span className="font-semibold text-[var(--xr-ink)]">Gain de productivité constaté : <span className="text-emerald-400 font-bold">15 à 25h / semaine</span> par collaborateur</span>
            <span className="label-mono text-[7px] text-purple-300 font-bold shrink-0">100% INTÉGRÉ</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted">LLMS SUR-MESURE · EMBEDDINGS · AUTOMATION N8N/MAKE</span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold">TRANSFORMATION IA IMMÉDIATE</span>
        </div>
      </div>
    </Stage>
  );
}

function GenericVisual({ info }: { info: Meta }) {
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  return (
    <Stage>
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
