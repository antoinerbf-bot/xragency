import { useState, useRef, type ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  Cpu,
  Globe2,
  Heart,
  Laptop,
  Layers,
  Lock,
  MapPin,
  Megaphone,
  MessageCircle,
  Music,
  Palette,
  PhoneCall,
  RefreshCw,
  Search,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { XR_PHOTOS } from "@/lib/photography";
import maisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import villaAzur from "@/assets/pf-02-villa-azur.jpg";
import noirOr from "@/assets/pf-03-noir-or.jpg";

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

function Label({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[7px] tracking-[.2em] text-[#d4af37] font-bold">{children}</span>;
}

/* ==========================================================================
   01. WEBSITES — STUDIO INTERACTIF VITRINE, BUSINESS & E-COMMERCE
   ========================================================================== */
function WebVisual() {
  const [modeIdx, setModeIdx] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [simulatedClick, setSimulatedClick] = useState(false);

  const webModes = [
    {
      id: "vitrine",
      label: "01 · Site Vitrine",
      price: "499 €",
      domain: "maison-lumiere-architectes.fr",
      headline: "Architecture & Intérieurs d'Exception",
      ctaText: "Demander une étude de projet",
      actionFeedback: "Formulaire de devis qualifié envoyé en 1 clic",
      photo: maisonLumiere,
      deliverables: ["Design sur-mesure responsive", "Formulaire de contact qualifié", "Optimisation SEO initiale", "Livraison cible : 7 jours"],
    },
    {
      id: "business",
      label: "02 · Site Business",
      price: "799 €",
      domain: "villa-azur-hotel.com",
      headline: "Suites & Réservation Directe Sans Commission",
      ctaText: "Réserver un créneau / une suite",
      actionFeedback: "Créneau synchronisé avec l'agenda client",
      photo: villaAzur,
      deliverables: ["Architecture multi-pages complète", "Prise de RDV ou réservation intégrée", "Pages services structurées pour Google", "Tableau de bord d'administration"],
    },
    {
      id: "ecommerce",
      label: "03 · E-Commerce",
      price: "1 499 €",
      domain: "noir-et-or-joaillerie.fr",
      headline: "Boutique en Ligne & Paiement Sécurisé",
      ctaText: "Commander avec Apple Pay / Stripe",
      actionFeedback: "Paiement Stripe sécurisé & commande créée",
      photo: noirOr,
      deliverables: ["Catalogue produits & variantes", "Tunnel de paiement Stripe / CB", "Gestion des stocks & expéditions", "Fiches produits optimisées conversion"],
    },
  ];

  const activeMode = webModes[modeIdx] ?? webModes[0];

  const triggerSimulation = () => {
    setSimulatedClick(true);
    setTimeout(() => setSimulatedClick(false), 2600);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      {/* Top Interactive Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            SIMULATEUR D&apos;ARCHITECTURE WEB · CLIQUEZ POUR TESTER
          </span>
        </div>

        {/* Device Toggle */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[8px] font-bold uppercase transition ${
              device === "desktop" ? "bg-white text-black shadow-sm" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            <Laptop className="h-3 w-3" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[8px] font-bold uppercase transition ${
              device === "mobile" ? "bg-white text-black shadow-sm" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            <Smartphone className="h-3 w-3" /> Mobile
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="mt-3.5 grid grid-cols-3 gap-2">
        {webModes.map((m, idx) => {
          const isSelected = idx === modeIdx;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setModeIdx(idx);
                setSimulatedClick(false);
              }}
              className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                isSelected
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]/50"
                  : "border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/20 hover:text-white"
              }`}
            >
              <span className={`font-mono text-[8px] font-bold uppercase tracking-wider ${isSelected ? "text-[#d4af37]" : "text-[#94a3b8]"}`}>
                {m.label}
              </span>
              <span className="mt-0.5 text-base sm:text-lg font-bold text-white">
                {m.price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Preview Stage + Deliverables */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr] items-center">
        {/* Browser / Mobile Frame */}
        <div
          className={`mx-auto w-full transition-all duration-500 ${
            device === "mobile" ? "max-w-[270px]" : "max-w-full"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-[#141312]/15 bg-[#141312] shadow-lg">
            {/* Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1c1a17] px-3 py-2 text-white">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#e5c99b]/70" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              </div>
              <span className="truncate font-mono text-[8px] text-white/70 max-w-[180px]">
                https://{activeMode.domain}
              </span>
              <span className="font-mono text-[7px] text-emerald-400 font-bold">SSL</span>
            </div>

            {/* Interactive Website Viewport */}
            <div className={`relative overflow-hidden ${device === "mobile" ? "aspect-[9/13]" : "aspect-[16/10]"}`}>
              <img
                src={activeMode.photo}
                alt={activeMode.headline}
                className="h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

              {/* Simulated Live Website UI inside viewport */}
              <div className="absolute inset-x-4 bottom-4 text-white">
                <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-widest text-[#e5c99b] backdrop-blur-md">
                  APERÇU INTERACTIF · {activeMode.label}
                </span>
                <h4 className="display-serif mt-1.5 text-lg sm:text-xl font-medium leading-tight text-white">
                  {activeMode.headline}
                </h4>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerSimulation}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e5c99b] px-3.5 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#141312] shadow-md transition hover:bg-white active:scale-95"
                  >
                    <Sparkles className="h-3 w-3" />
                    {activeMode.ctaText}
                  </button>
                </div>

                {simulatedClick && (
                  <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/90 px-3 py-2 text-[10px] font-medium text-emerald-200 backdrop-blur-md">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{activeMode.actionFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Concrete Deliverables of selected formula */}
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
              INCLUS DANS {activeMode.label.toUpperCase()}
            </span>
            <span className="rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 px-2.5 py-0.5 font-mono text-[8px] font-bold text-[#d4af37]">
              {activeMode.price}
            </span>
          </div>

          <ul className="space-y-2.5 pt-1">
            {activeMode.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-xs text-[#cbd5e1] leading-relaxed">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-black/60 p-3 border border-white/10">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#d4af37] font-bold">
              MODALITÉS DE COMMANDE
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-white">
              Forfait réglé à la commande · Sur mesure : acompte et échéances définis au devis signé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   02. GOOGLE MAPS — SIMULATEUR PACK LOCAL & GEOGRID 3×3
   ========================================================================== */
function MapsVisual() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [afterXr, setAfterXr] = useState(true);
  const [callSimulated, setCallSimulated] = useState(false);

  const scenarios = [
    {
      sector: "Artisan / Dépannage",
      query: "serrurier dépannage centre-ville",
      business: "Atelier Sécurité & Serrurerie",
      beforeRank: "14e position",
      afterRank: "Objectif Top 3",
      beforeGrid: [16, 14, 18, 12, 11, 15, 19, 14, 17],
      afterGrid: [3, 2, 4, 2, 1, 2, 4, 2, 3],
    },
    {
      sector: "Restauration & Hôtel",
      query: "restaurant gastronomique terrasse",
      business: "Maison L'Épicurien",
      beforeRank: "11e position",
      afterRank: "Objectif Top 3",
      beforeGrid: [12, 10, 14, 11, 9, 12, 15, 11, 13],
      afterGrid: [2, 1, 3, 1, 1, 2, 3, 2, 2],
    },
    {
      sector: "Santé & Cabinet",
      query: "clinique dentaire esthétique",
      business: "Cabinet Dentaire Parc Monceau",
      beforeRank: "17e position",
      afterRank: "Objectif Top 3",
      beforeGrid: [19, 16, 18, 15, 13, 17, 20, 18, 19],
      afterGrid: [3, 2, 3, 2, 1, 2, 3, 2, 4],
    },
  ];

  const active = scenarios[scenarioIdx] ?? scenarios[0];
  const grid = afterXr ? active.afterGrid : active.beforeGrid;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            SIMULATEUR GOOGLE MAPS · TESTEZ LES SECTEURS &amp; LA GRILLE LOCALE
          </span>
        </div>

        {/* Toggle Avant / Objectif XR */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => setAfterXr(false)}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              !afterXr ? "bg-white text-black shadow-sm" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Avant XR
          </button>
          <button
            type="button"
            onClick={() => setAfterXr(true)}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              afterXr ? "bg-[#d4af37] text-black shadow-sm font-extrabold" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Objectif XR
          </button>
        </div>
      </div>

      {/* Sector Selector */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {scenarios.map((s, idx) => (
          <button
            key={s.sector}
            type="button"
            onClick={() => setScenarioIdx(idx)}
            className={`rounded-full px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wider transition ${
              idx === scenarioIdx
                ? "bg-[#d4af37] text-black font-extrabold shadow-sm"
                : "border border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/20 hover:text-white"
            }`}
          >
            {s.sector}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] items-center">
        {/* Left: Simulated Google Local Pack Card */}
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#d4af37]" />
            <span className="font-mono text-[10px] font-medium text-white">
              &ldquo;{active.query}&rdquo;
            </span>
          </div>

          <div
            className={`rounded-xl border p-3.5 transition-all ${
              afterXr
                ? "border-[#d4af37]/50 bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                : "border-white/10 bg-black/40"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase ${
                    afterXr ? "bg-[#d4af37] text-black" : "bg-white/10 text-white/70"
                  }`}
                >
                  {afterXr ? active.afterRank : active.beforeRank}
                </span>
                <h4 className="mt-1.5 text-sm font-bold text-white">{active.business}</h4>
                <p className="mt-0.5 text-[11px] text-[#94a3b8]">
                  {afterXr
                    ? "4.9 ★★★★★ · Catégories & attributs complets · Avis récents"
                    : "4.1 ★★★★☆ · Fiche incomplète · Peu visible hors rue immédiate"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCallSimulated(true);
                  setTimeout(() => setCallSimulated(false), 2200);
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 font-mono text-[8px] font-bold uppercase text-black hover:bg-[#d4af37] transition shrink-0"
              >
                <PhoneCall className="h-3 w-3 text-black" /> Appeler
              </button>
            </div>

            {callSimulated && (
              <div className="mt-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 text-[10px] font-medium text-emerald-300">
                ✓ Simulation : un prospect local déclenche un appel direct depuis Google Maps.
              </div>
            )}
          </div>

          {/* 2 Distinct Offers Reminder */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-xl border border-[#d4af37]/40 bg-[#090b10] p-3 text-white">
              <span className="font-mono text-[7px] font-bold uppercase text-[#d4af37] block">
                OFFRE A · TOP 3 SUR DEVIS
              </span>
              <span className="text-base font-bold text-white font-serif">Dès 550 €</span>
              <span className="block font-mono text-[8.5px] text-[#94a3b8]">Selon ville &amp; concurrence</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-white">
              <span className="font-mono text-[7px] font-bold uppercase text-[#cbd5e1] block">
                OFFRE B · GESTION FICHE
              </span>
              <span className="text-base font-bold text-white font-serif">99 / 169 / 299 €</span>
              <span className="block font-mono text-[8.5px] text-[#94a3b8]">Par mois · 100% à distance</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive 3x3 GeoGrid on Map Backdrop */}
        <div className="relative overflow-hidden rounded-2xl border border-[#141312]/15 bg-[#141312] p-4 text-white">
          <img
            src={XR_PHOTOS.maps}
            alt="Carte GeoGrid locale"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#e5c99b]">
                RADAR GEOGRID 3×3 PAR QUARTIER
              </span>
              <span className="font-mono text-[7px] text-white/70">Simulation illustrative</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {grid.map((rank, i) => {
                const isTop3 = rank <= 3;
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center rounded-xl border py-2.5 transition-all duration-500 ${
                      isTop3
                        ? "border-emerald-400/60 bg-emerald-900/80 text-white shadow-md"
                        : "border-amber-400/40 bg-black/70 text-amber-200"
                    }`}
                  >
                    <span className="font-mono text-[7px] uppercase opacity-75">Zone {i + 1}</span>
                    <span className="display-serif text-lg font-bold">#{rank}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-2.5 text-[9px] text-white/75 leading-snug">
              Cliquez sur « Avant XR » / « Objectif XR » pour visualiser l&apos;impact d&apos;un travail de référencement local sur les 9 points d&apos;une ville.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   03. BRANDING — ATELIER INTERACTIF CHARTE GRAPHIQUE & BRAND BOOK
   ========================================================================== */
function BrandingVisual() {
  const [themeIdx, setThemeIdx] = useState(0);

  const brandThemes = [
    {
      name: "Ivoire & Bronze",
      sector: "Architecture & Joaillerie",
      bg: "#FAF8F4",
      ink: "#141312",
      accent: "#8B6B3E",
      secondary: "#E5DAC6",
      monogram: "ML",
      brandTitle: "MAISON LUMIÈRE",
      brandSub: "PARIS · ARCHITECTURE D'INTÉRIEUR",
      fontLabel: "Playfair Display + DM Sans",
      swatches: ["#141312", "#8B6B3E", "#E5DAC6", "#FAF8F4"],
    },
    {
      name: "Obsidienne & Champagne",
      sector: "Haute Horlogerie & Conseil",
      bg: "#161618",
      ink: "#F7F4EE",
      accent: "#D4AF37",
      secondary: "#2A2B30",
      monogram: "NO",
      brandTitle: "NOIR & OR",
      brandSub: "GENÈVE · HAUTE HORLOGERIE",
      fontLabel: "Cormorant + JetBrains Mono",
      swatches: ["#161618", "#D4AF37", "#2A2B30", "#F7F4EE"],
    },
    {
      name: "Terre de Sienne & Lin",
      sector: "Gastronomie & Hôtellerie",
      bg: "#F6F1E7",
      ink: "#231F1D",
      accent: "#9E472A",
      secondary: "#DFD3C3",
      monogram: "VA",
      brandTitle: "VILLA AZUR",
      brandSub: "MÉDITERRANÉE · TABLE & SUITES",
      fontLabel: "Editorial Serif + Grotesk",
      swatches: ["#231F1D", "#9E472A", "#DFD3C3", "#F6F1E7"],
    },
  ];

  const active = brandThemes[themeIdx] ?? brandThemes[0];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            ATELIER BRAND BOOK INTERACTIF · TESTEZ 3 TERRITOIRES DE MARQUE
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
          199 € · 299 € · 399 €
        </span>
      </div>

      {/* Theme Selector Buttons */}
      <div className="mt-3.5 grid grid-cols-3 gap-2">
        {brandThemes.map((t, idx) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setThemeIdx(idx)}
            className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition ${
              idx === themeIdx
                ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-sm"
                : "border-white/10 bg-[#0c0e18] text-[#94a3b8] hover:border-white/20 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {t.swatches.slice(0, 3).map((hex) => (
                <span
                  key={hex}
                  className="h-2.5 w-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <span className="mt-1 text-xs font-bold text-white">{t.name}</span>
            <span className={`text-[9px] ${idx === themeIdx ? "text-[#d4af37]" : "text-[#94a3b8]"}`}>
              {t.sector}
            </span>
          </button>
        ))}
      </div>

      {/* Live Brand Book Preview Card */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
        {/* Live Dynamic Stationery & Monogram Stage */}
        <div
          className="flex flex-col justify-between rounded-2xl border border-white/15 p-5 shadow-md transition-colors duration-500"
          style={{ backgroundColor: active.bg, color: active.ink }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.22em]"
              style={{ color: active.accent }}
            >
              PLANCHE BRAND BOOK · SYSTÈME VECTORIEL
            </span>
            <span className="font-mono text-[8px] opacity-60">AI · SVG · PDF 300 DPI</span>
          </div>

          <div className="my-5 flex items-center gap-4">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border text-2xl display-serif font-semibold shadow-sm transition-colors duration-500"
              style={{
                borderColor: active.accent,
                backgroundColor: active.secondary,
                color: active.ink,
              }}
            >
              {active.monogram}
            </div>
            <div>
              <h4 className="display-serif text-2xl sm:text-3xl tracking-tight font-medium">
                {active.brandTitle}
              </h4>
              <p
                className="mt-1 font-mono text-[8px] tracking-[0.24em] uppercase"
                style={{ color: active.accent }}
              >
                {active.brandSub}
              </p>
            </div>
          </div>

          {/* Swatch Bar */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-current/10">
            {active.swatches.map((hex) => (
              <div key={hex} className="text-center">
                <div
                  className="h-7 w-full rounded-lg border border-black/15 shadow-2xs"
                  style={{ backgroundColor: hex }}
                />
                <span className="mt-1 block font-mono text-[7px] opacity-75">{hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Editorial Photo + Deliverables */}
        <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-white">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
            <img
              src={XR_PHOTOS.branding}
              alt="Atelier identité visuelle XR Agency"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2.5 left-3 font-mono text-[8px] font-bold uppercase tracking-wider text-white">
              Duo Typographique : {active.fontLabel}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
              <span>Logo principal, secondaire &amp; monogramme vectoriel</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
              <span>Charte graphique PDF &amp; gabarits réseaux sociaux</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
              <span>Cession intégrale des fichiers sources à la livraison</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   04. SEO — SIMULATEUR SERP GOOGLE & ARCHITECTURE SÉMANTIQUE
   ========================================================================== */
function SeoVisual() {
  const [viewMode, setViewMode] = useState<"serp" | "cluster" | "tech">("serp");
  const [intentIdx, setIntentIdx] = useState(0);

  const intents = [
    {
      keyword: "architecte intérieur sur mesure paris",
      url: "https://maison-lumiere.fr › architecte-interieur-paris",
      title: "Maison Lumière | Architecte d'Intérieur & Rénovation de Prestige",
      desc: "Conception clé en main d'appartements haussmanniens et résidences privées. Étude sur-mesure, plans 3D et suivi de chantier.",
      faq1: "Quel est le délai d'une rénovation complète ?",
      faq2: "Comment se déroule la première étude architecturale ?",
      clusterPillar: "Architecture d'Intérieur Paris",
      clusterChildren: ["Rénovation Haussmannien", "Agencement Sur-Mesure", "Honoraires & Devis", "Réalisations"],
    },
    {
      keyword: "clinique dentaire implants & facettes",
      url: "https://clinique-sourire.fr › soins › facettes-dentaires",
      title: "Clinique du Sourire | Implants, Facettes & Esthétique Dentaire",
      desc: "Plateau technique dernière génération, diagnostic 3D et plan de traitement personnalisé. Prenez rendez-vous en ligne.",
      faq1: "Quelle est la durée de vie des facettes céramiques ?",
      faq2: "Comment prendre rendez-vous pour un bilan initial ?",
      clusterPillar: "Esthétique & Implants Dentaires",
      clusterChildren: ["Facettes Céramiques", "Implantologie 3D", "Blanchiment Médical", "Équipe & Clinique"],
    },
  ];

  const active = intents[intentIdx] ?? intents[0];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            SIMULATEUR SEO · PAGE 1 GOOGLE, COCON SÉMANTIQUE &amp; SOCLE TECHNIQUE
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5">
          {[
            { id: "serp" as const, label: "Aperçu Google" },
            { id: "cluster" as const, label: "Cocon Sémantique" },
            { id: "tech" as const, label: "Audit Technique" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setViewMode(tab.id)}
              className={`rounded-full px-2.5 py-1 font-mono text-[8px] font-bold uppercase transition ${
                viewMode === tab.id ? "bg-[#d4af37] text-black shadow-sm font-extrabold" : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Intent Switcher */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[8px] uppercase text-[#94a3b8]">Requête testée :</span>
        {intents.map((it, idx) => (
          <button
            key={it.keyword}
            type="button"
            onClick={() => setIntentIdx(idx)}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold transition ${
              idx === intentIdx
                ? "bg-[#d4af37] text-black font-extrabold shadow-sm"
                : "border border-white/10 bg-[#0c0e18] text-white hover:border-[#d4af37]"
            }`}
          >
            « {it.keyword} »
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] items-center">
        {viewMode === "serp" && (
          <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
            <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
              <span className="font-mono text-[8px] font-bold text-[#d4af37]">
                APERÇU RÉSULTAT ENRICHI (SCHEMA.ORG)
              </span>
              <span className="font-mono text-[8px] text-[#64748b]">Intention commerciale forte</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/60 p-4">
              <p className="text-[10px] text-[#94a3b8] truncate">{active.url}</p>
              <h4 className="mt-1 text-sm sm:text-base font-bold text-[#38bdf8] hover:underline cursor-pointer">
                {active.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-[#cbd5e1]">{active.desc}</p>

              {/* Rich Snippet FAQ Preview */}
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-2.5">
                <div className="flex items-center justify-between rounded-lg bg-[#090b10] px-3 py-2 text-[10px] font-medium text-white border border-white/10">
                  <span>▾ {active.faq1}</span>
                  <span className="font-mono text-[7px] text-[#d4af37]">FAQ Schema</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#090b10] px-3 py-2 text-[10px] font-medium text-white border border-white/10">
                  <span>▾ {active.faq2}</span>
                  <span className="font-mono text-[7px] text-[#d4af37]">FAQ Schema</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "cluster" && (
          <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
              ARCHITECTURE EN COCON SÉMANTIQUE &amp; MAILLAGE INTERNE
            </span>
            <div className="mt-3 flex flex-col items-center">
              <div className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black shadow-md">
                Page Pilier : {active.clusterPillar}
              </div>
              <div className="h-4 w-px bg-[#d4af37]" />
              <div className="grid grid-cols-2 gap-2 w-full">
                {active.clusterChildren.map((child) => (
                  <div
                    key={child}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-[11px] font-semibold text-white"
                  >
                    <span>{child}</span>
                    <ArrowUpRight className="h-3 w-3 text-[#d4af37]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === "tech" && (
          <div className="space-y-2.5 rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
              PILIERS TECHNIQUES VÉRIFIÉS CHAQUE MOIS
            </span>
            {[
              { label: "Structure Hn, Balises Title & Meta", state: "Optimisé page par page" },
              { label: "Indexation Search Console & Sitemap XML", state: "Suivi continu" },
              { label: "Vitesse Core Web Vitals & Compression AVIF", state: "Score > 90 garanti" },
              { label: "Audit d'erreurs 404 & Redirections 301", state: "Monitoring 24/7" },
              { label: "Données structurées JSON-LD (LocalBusiness, FAQ)", state: "Intégré au code" },
            ].map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 p-3"
              >
                <div>
                  <p className="text-xs font-bold text-white">{p.label}</p>
                  <p className="font-mono text-[8.5px] text-[#94a3b8]">{p.state}</p>
                </div>
                <Check className="h-4 w-4 text-[#d4af37]" />
              </div>
            ))}
          </div>
        )}

        {/* Right Column: Photo + Official SEO Plans */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/15">
            <img src={XR_PHOTOS.seo} alt="Stratégie SEO XR Agency" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#d4af37]">
                ACQUISITION ORGANIQUE CUMULATIVE
              </span>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-mono text-[8px] font-bold backdrop-blur-md">
                Sans engagement initial
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-[#0c0e18] p-3">
              <span className="font-mono text-[7.5px] font-bold uppercase text-[#d4af37] block">
                FORMULES MENSUELLES
              </span>
              <span className="text-sm font-bold text-white font-serif">
                299 / 499 / 699 €
              </span>
              <span className="block text-[9px] text-[#94a3b8]">Par mois · 4 à 8 contenus SEO</span>
            </div>
            <div className="rounded-xl border border-[#d4af37]/40 bg-[#0c0e18] p-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <span className="font-mono text-[7.5px] font-bold uppercase text-[#d4af37] block">
                PROGRAMMES ANNUELS
              </span>
              <span className="text-sm font-bold text-white font-serif">
                1 699 / 3 299 €
              </span>
              <span className="block text-[9px] text-[#94a3b8]">Par an · Capitalisation 12 mois</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   05. SOCIAL MEDIA — STUDIO INTERACTIF REELS, TIKTOK & CALENDRIER
   ========================================================================== */
function SocialVisual() {
  const [platform, setPlatform] = useState<"instagram" | "tiktok" | "facebook">("instagram");
  const [likes, setLikes] = useState(1420);
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
      badge: "FEED & REELS HD",
      tagline: "Direction Artistique & Harmonie de Grille",
      logo: InstagramLogo,
      stat: "IMAGE DE MARQUE",
      desc: "Carrousels éditoriaux, Reels rythmés et identité visuelle cohérente sur chaque post.",
    },
    {
      id: "tiktok" as const,
      name: "TikTok",
      badge: "HOOK 3S & FORMAT COURT",
      tagline: "Storytelling & Captation d'Attention",
      logo: TikTokLogo,
      stat: "VIDÉOS VERTICALES",
      desc: "Accroches dès les 3 premières secondes, sous-titres dynamiques et montage haute rétention.",
    },
    {
      id: "facebook" as const,
      name: "Facebook & Meta",
      badge: "DIFFUSION LOCALE CIBLÉE",
      tagline: "Visibilité de Proximité & Communauté",
      logo: FacebookLogo,
      stat: "AUDIENCE LOCALE",
      desc: "Animation régulière de votre page, relai des offres et présence locale rassurante.",
    },
  ];

  const current = platforms.find((p) => p.id === platform) ?? platforms[0];
  const CurrentLogo = current.logo;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <CurrentLogo className="h-5 w-5 shrink-0 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            STUDIO SOCIAL MEDIA INTERACTIF · TESTEZ LES PLATEFORMES
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
          349 € · 499 € · 799 € / MOIS
        </span>
      </div>

      {/* Main Grid */}
      <div className="mt-4 grid gap-5 lg:grid-cols-[240px_1fr] items-center">
        {/* Smartphone Simulator */}
        <div className="mx-auto w-full max-w-[235px]">
          <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-white/20 bg-black shadow-xl aspect-[9/15]">
            <img
              src={XR_PHOTOS.social}
              alt="Aperçu direction artistique social media"
              className="absolute inset-0 h-full w-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/55" />

            {/* In-Phone Header */}
            <div className="absolute top-4 left-3 right-3 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-full border border-white/30 bg-black/60 p-0.5">
                  <CurrentLogo className="h-full w-full" />
                </div>
                <span className="text-[10px] font-bold">xragency.studio</span>
              </div>
              <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[6.5px] font-bold backdrop-blur-md">
                {current.name}
              </span>
            </div>

            {/* Right Actions */}
            <div className="absolute right-2.5 bottom-14 z-20 flex flex-col items-center gap-2.5 text-white">
              <button
                type="button"
                onClick={toggleLike}
                className="flex flex-col items-center gap-0.5"
                aria-label="Aimer"
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                    isLiked ? "bg-rose-600 border-rose-400 text-white" : "bg-black/50 border-white/25"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-white" : ""}`} />
                </div>
                <span className="font-mono text-[7px] font-bold">{likes}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center gap-0.5"
                aria-label="Enregistrer"
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                    isSaved ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-black/50 border-white/25"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                </div>
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-12 z-20 text-white">
              <div className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 border border-white/15 mb-1">
                <Music className="h-2.5 w-2.5 text-[#d4af37]" />
                <span className="font-mono text-[6.5px] text-white/90">{current.badge}</span>
              </div>
              <p className="text-[10px] font-bold leading-tight">{current.tagline}</p>
              <p className="mt-0.5 text-[8px] text-white/80 line-clamp-2">{current.desc}</p>
            </div>
          </div>
        </div>

        {/* Platform Switcher & Editorial Calendar Preview */}
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {platforms.map((p) => {
              const PLogo = p.logo;
              const isSelected = p.id === platform;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                    isSelected
                      ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-sm"
                      : "border-white/10 bg-[#0c0e18] text-[#94a3b8] hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PLogo className="h-4 w-4 text-[#d4af37]" />
                    <span className="text-xs font-bold text-white">{p.name}</span>
                  </div>
                  <span className={`mt-1.5 font-mono text-[7px] font-bold ${isSelected ? "text-[#d4af37]" : "text-[#94a3b8]"}`}>
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-white shadow-xl">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
              CADENCE ÉDITORIALE &amp; LIVRABLES MENSUELS
            </span>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {[
                { name: "Starter · 349 €/m", desc: "Présence régulière & posts soignés" },
                { name: "Growth · 499 €/m", desc: "Reels dynamiques, carrousels & stories" },
                { name: "Scale · 799 €/m", desc: "Direction multi-réseaux & cadence soutenue" },
              ].map((tier) => (
                <div key={tier.name} className="rounded-xl border border-white/10 bg-black/60 p-2.5">
                  <p className="font-mono text-[8px] font-bold text-white">{tier.name}</p>
                  <p className="mt-1 text-[9.5px] leading-snug text-[#94a3b8]">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   06. WEBCARE — CONSOLE INTERACTIVE MAINTENANCE & INFRASTRUCTURE CLOUD
   ========================================================================== */
function WebcareVisual() {
  const [activeAction, setActiveAction] = useState<"backup" | "security" | "update">("backup");

  const actions = {
    backup: {
      title: "Sauvegarde Cloud Quotidienne",
      badge: "INFRASTRUCTURE 79 € / AN",
      detail: "Copie chiffrée automatique de vos fichiers et bases de données avec restauration rapide en cas d'incident.",
      status: "Sauvegarde vérifiée · Intégrité 100%",
    },
    security: {
      title: "Sécurité, SSL & Surveillance",
      badge: "PROTECTION CONTINUE",
      detail: "Renouvellement SSL/TLS, pare-feu applicatif et mises à jour préventives des composants critiques.",
      status: "Certificat TLS 1.3 actif · 0 alerte",
    },
    update: {
      title: "Modifications & Évolutions du Site",
      badge: "29 € · 49 € · 99 € / MOIS",
      detail: "Envoyez vos changements de textes, tarifs, photos ou nouvelles sections : notre équipe les intègre proprement.",
      status: "4 à ∞ modifications / mois selon formule",
    },
  };

  const current = actions[activeAction];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            CONSOLE WEBCARE INTERACTIVE · INFRASTRUCTURE (79 €/AN) + SUIVI MENSUEL
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
          29 € · 49 € · 99 € / MOIS
        </span>
      </div>

      {/* 3 Interactive Action Buttons */}
      <div className="mt-3.5 grid grid-cols-3 gap-2">
        {[
          { id: "backup" as const, label: "1. Sauvegarde Cloud", icon: Server },
          { id: "security" as const, label: "2. Bouclier Sécurité", icon: Lock },
          { id: "update" as const, label: "3. Modifications Site", icon: Wrench },
        ].map((btn) => {
          const Icon = btn.icon;
          const isSelected = activeAction === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setActiveAction(btn.id)}
              className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                isSelected
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-sm"
                  : "border-white/10 bg-[#0c0e18] text-[#94a3b8] hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#d4af37]" : "text-[#94a3b8]"}`} />
              <span className="text-[11px] font-bold leading-tight">{btn.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl space-y-3 text-white">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 px-2.5 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
              {current.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[8px] font-bold text-emerald-400">
              <RefreshCw className="h-3 w-3" /> {current.status}
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white">{current.title}</h4>
          <p className="text-xs leading-relaxed text-[#94a3b8]">{current.detail}</p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="rounded-xl bg-black/60 border border-white/10 p-2.5 text-center">
              <span className="font-mono text-[7px] text-[#94a3b8] block">ESSENTIEL</span>
              <span className="text-sm font-bold text-white font-serif">29 €/m</span>
              <span className="block font-mono text-[7.5px] text-[#94a3b8]">4 modifs / mois</span>
            </div>
            <div className="rounded-xl bg-[#090b10] border border-[#d4af37]/40 p-2.5 text-center">
              <span className="font-mono text-[7px] text-[#d4af37] font-bold block">BUSINESS</span>
              <span className="text-sm font-bold text-white font-serif">49 €/m</span>
              <span className="block font-mono text-[7.5px] text-[#d4af37]">10 modifs / mois</span>
            </div>
            <div className="rounded-xl bg-black/60 border border-white/10 p-2.5 text-center">
              <span className="font-mono text-[7px] text-[#94a3b8] block">UNLIMITED</span>
              <span className="text-sm font-bold text-white font-serif">99 €/m</span>
              <span className="block font-mono text-[7.5px] text-[#94a3b8]">Modifs courantes ∞</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
          <img
            src={XR_PHOTOS.maintenance}
            alt="Supervision Cloud & WebCare XR Agency"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37] block">
              INFRASTRUCTURE ANNUELLE : 79 € / AN
            </span>
            <p className="text-[11px] font-medium text-white/90">
              Hébergement, nom de domaine et sécurité gérés par XR Agency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   07. ROBOTIQUE & CRM SUR-MESURE — STUDIO INTERACTIF DUAL
   ========================================================================== */
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
  const [tab, setTab] = useState<"crm" | "robots">("crm");
  const [leadStage, setLeadStage] = useState<number>(1);
  const [selectedRobot, setSelectedRobot] = useState(KORBEN_ROBOTS[0]);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const stages = [
    { step: 0, name: "Nouveau Lead", action: "Qualification automatique & attribution commercial" },
    { step: 1, name: "Devis Envoyé", action: "Proposition chiffrée générée & relance programmée" },
    { step: 2, name: "RDV Confirmé", action: "Créneau synchronisé agenda + rappel SMS/WhatsApp" },
    { step: 3, name: "Client Signé", action: "Dossier transmis à l'équipe & facturation prête" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotate({ x: parseFloat(((0.5 - y) * 16).toFixed(1)), y: parseFloat(((x - 0.5) * 20).toFixed(1)) });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={tab === "robots" ? handleMouseMove : undefined}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-4 sm:p-6 shadow-2xl text-white"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            SYSTÈMES MÉTIER · CRM SUR-MESURE (DÈS 999 €) &amp; ROBOTS KORBEN (DÈS 499 €/M)
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => setTab("crm")}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              tab === "crm" ? "bg-[#d4af37] text-black shadow-sm font-extrabold" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            CRM Sur-Mesure
          </button>
          <button
            type="button"
            onClick={() => setTab("robots")}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              tab === "robots" ? "bg-[#d4af37] text-black shadow-sm font-extrabold" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Robots Korben
          </button>
        </div>
      </div>

      {tab === "crm" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Interactive Pipeline Simulator */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 shadow-xl text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#d4af37]">
                TESTEZ LE PIPELINE CRM MÉTIER · CLIQUEZ SUR UNE ÉTAPE
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[8px] font-bold text-[#d4af37]">
                DÈS 999 €
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stages.map((s) => {
                const active = leadStage === s.step;
                const passed = leadStage > s.step;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setLeadStage(s.step)}
                    className={`rounded-xl border p-2.5 text-left transition ${
                      active
                        ? "border-[#d4af37] bg-[#d4af37]/20 text-white shadow-sm ring-1 ring-[#d4af37]"
                        : passed
                        ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                        : "border-white/10 bg-black/50 text-[#94a3b8] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[7px] uppercase block opacity-75">
                      Étape 0{s.step + 1}
                    </span>
                    <span className="mt-0.5 block text-xs font-bold text-white">{s.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/60 p-3.5">
              <span className="font-mono text-[8px] font-bold uppercase text-[#d4af37]">
                ACTION AUTOMATISÉE À L&apos;ÉTAPE « {stages[leadStage]?.name.toUpperCase()} » :
              </span>
              <p className="mt-1 text-xs font-semibold text-white">
                {stages[leadStage]?.action}
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
            <img
              src={XR_PHOTOS.robotics}
              alt="Architecture CRM sur mesure XR Agency"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="font-mono text-[8px] font-bold uppercase text-[#d4af37]">
                VOTRE CRM. VOS RÈGLES. VOTRE ACTIVITÉ.
              </span>
              <p className="text-[11px] text-white/90">
                Conçu sur cahier des charges pour Immobilier, Cliniques, Restaurants, BTP &amp; Services.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {KORBEN_ROBOTS.map((robot) => (
              <button
                key={robot.id}
                type="button"
                onClick={() => setSelectedRobot(robot)}
                className={`rounded-xl px-3 py-1.5 font-mono text-[8px] font-bold uppercase transition ${
                  selectedRobot.id === robot.id
                    ? "bg-[#d4af37] text-black font-extrabold shadow-sm"
                    : "border border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/20 hover:text-white"
                }`}
              >
                {robot.name}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[200px_1fr] items-center rounded-2xl border border-white/10 bg-[#0c0e18] p-5 text-white shadow-xl">
            <div
              className="mx-auto flex h-44 w-44 items-center justify-center transition-transform duration-200"
              style={{
                transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
            >
              <img
                src={selectedRobot.image}
                alt={selectedRobot.name}
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] font-bold text-[#d4af37]">{selectedRobot.tag}</span>
                <span className="rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 px-2.5 py-0.5 font-mono text-[8px] font-bold text-[#d4af37]">
                  DÈS 499 € / MOIS
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white">{selectedRobot.name}</h4>
              <p className="text-xs text-[#94a3b8]">{selectedRobot.type}</p>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {selectedRobot.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[10px] font-medium text-white"
                  >
                    <Cpu className="h-3 w-3 text-[#d4af37] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SECONDARY / COMPLEMENTARY VISUALS (REFONTE, ADS, STRATEGY, AI) — HONEST
   ========================================================================== */
function RefonteVisual() {
  const [afterState, setAfterState] = useState(true);
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-5 sm:p-6 shadow-2xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            REFONTE DE SITE WEB · AVANT / APRÈS
          </span>
        </div>
        <div className="flex gap-1 rounded-full border border-white/15 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => setAfterState(false)}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              !afterState ? "bg-white text-black" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Site vieillissant
          </button>
          <button
            type="button"
            onClick={() => setAfterState(true)}
            className={`rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase transition ${
              afterState ? "bg-[#d4af37] text-black font-extrabold" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Après refonte XR
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className={`rounded-2xl border p-5 transition ${!afterState ? "border-amber-500/40 bg-amber-950/20" : "border-white/10 bg-black/40 opacity-70"}`}>
          <span className="font-mono text-[8px] font-bold uppercase text-amber-400">AVANT REFONTE</span>
          <h4 className="mt-1 font-bold text-sm text-white">Navigation confuse &amp; lenteur mobile</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-[#94a3b8]">
            <li>• Design daté qui ne reflète plus votre standing</li>
            <li>• Affichage mobile difficile à lire et lent</li>
            <li>• Parcours de conversion et devis introuvable</li>
          </ul>
        </div>
        <div className={`rounded-2xl border p-5 transition ${afterState ? "border-[#d4af37]/60 bg-[#d4af37]/10 shadow-[0_0_25px_rgba(212,175,55,0.15)]" : "border-white/10 bg-black/40 opacity-70"}`}>
          <span className="font-mono text-[8px] font-bold uppercase text-[#d4af37]">APRÈS REFONTE XR AGENCY</span>
          <h4 className="mt-1 font-bold text-sm text-white">Architecture lumineuse &amp; redirections SEO</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-[#cbd5e1]">
            <li>• Direction artistique alignée sur le standard Awwwards</li>
            <li>• Plan de redirections 301 pour préserver vos acquis Google</li>
            <li>• Parcours mobile et formulaires pensés pour la conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AdsVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-5 sm:p-6 shadow-2xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            CAMPAGNES GOOGLE ADS &amp; META ADS
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
          ACQUISITION SPONSORISÉE
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { step: "01 · CIBLAGE", title: "Mots-clés & Audiences", desc: "Sélection des requêtes à intention d'achat et filtrage des clics hors-cible." },
          { step: "02 · CRÉATION", title: "Annonces & Landing Pages", desc: "Rédaction des accroches publicitaires et pages d'atterrissage dédiées." },
          { step: "03 · PILOTAGE", title: "Suivi des Conversions", desc: "Paramétrage du suivi d'appels et formulaires avec ajustement continu." },
        ].map((item) => (
          <div key={item.step} className="rounded-xl border border-white/10 bg-[#0c0e18] p-4 text-white">
            <span className="font-mono text-[8px] font-bold text-[#d4af37]">{item.step}</span>
            <h4 className="mt-1 text-xs font-bold text-white">{item.title}</h4>
            <p className="mt-1 text-[11px] leading-snug text-[#94a3b8]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#06070a] p-5 sm:p-6 shadow-2xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#d4af37]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
            FEUILLE DE ROUTE &amp; CONSEIL STRATÉGIQUE
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
          CADRAGE 90 JOURS
        </span>
      </div>
      <div className="mt-4 space-y-2.5">
        {[
          { phase: "ÉTAPE 01", label: "Audit de présence, concurrence locale & positionnement" },
          { phase: "ÉTAPE 02", label: "Priorisation des leviers (Site, Maps, SEO, Réseaux Sociaux)" },
          { phase: "ÉTAPE 03", label: "Déploiement séquencé et suivi des demandes entrantes" },
        ].map((item) => (
          <div key={item.phase} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0c0e18] p-3.5 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-bold text-[#d4af37]">{item.phase}</span>
              <span className="text-xs font-semibold text-white">{item.label}</span>
            </div>
            <Check className="h-4 w-4 text-[#d4af37]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const visual =
    service === "websites" ? (
      <WebVisual />
    ) : service === "branding" ? (
      <BrandingVisual />
    ) : service === "seo" ? (
      <SeoVisual />
    ) : service === "maps" ? (
      <MapsVisual />
    ) : service === "social" ? (
      <SocialVisual />
    ) : service === "maintenance" ? (
      <WebcareVisual />
    ) : service === "robotics" || service === "ai" ? (
      <RoboticsVisual />
    ) : service === "refonte" ? (
      <RefonteVisual />
    ) : service === "ads" ? (
      <AdsVisual />
    ) : (
      <StrategyVisual />
    );

  return (
    <figure className="group relative w-full overflow-hidden rounded-[2rem]">
      {visual}
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
