import { useState, useMemo } from "react";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Search,
  Navigation,
  Globe,
  Compass,
  Sliders,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useOptionalFunnel } from "@/lib/funnel";

const PRESET_CITIES = [
  "Paris",
  "Dubaï",
  "Genève",
  "Bordeaux",
  "Lyon",
  "Nice",
  "Bruxelles",
];

const SECTORS = [
  {
    id: "resto",
    label: "Restaurant & Gastronomie",
    keyword: "Restaurant gastronomique",
    competitor2: "Bistrot Saint-Germain",
    competitor3: "Le Relais Gourmand",
    calls: "+180 appels/mois",
    route: "+320 itinéraires/mois",
  },
  {
    id: "hotel",
    label: "Hôtel & Hébergement",
    keyword: "Boutique Hôtel 5 étoiles",
    competitor2: "Hôtel Continental",
    competitor3: "Grand Palace & Spa",
    calls: "+95 réservations directes",
    route: "+410 visites",
  },
  {
    id: "sante",
    label: "Clinique & Santé",
    keyword: "Clinique esthétique d'excellence",
    competitor2: "Centre Laser Beauté",
    competitor3: "Cabinet Esthétique Nova",
    calls: "+140 consultations",
    route: "+280 itinéraires",
  },
  {
    id: "avocat",
    label: "Cabinet & Conseil",
    keyword: "Cabinet d'avocats affaires",
    competitor2: "Jurisfirm & Associés",
    competitor3: "Lex Avocats Conseil",
    calls: "+65 dossiers qualifiés",
    route: "+120 visites",
  },
];

interface ModuleOption {
  id: string;
  name: string;
  desc: string;
  priceEur: number;
  isIncluded?: boolean;
}

const MODULE_OPTIONS: ModuleOption[] = [
  {
    id: "core_gmb",
    name: "Audit d'éligibilité & Restructuration Fiche Google",
    desc: "Refonte intégrale, catégorisation algorithmique, horaires et attributs stratégiques.",
    priceEur: 499,
    isIncluded: true,
  },
  {
    id: "local_seo",
    name: "Stratégie Mots-Clés Locaux & Citations Annuaires (NAP)",
    desc: "Indexation multi-plateformes, cohérence des adresses et autorité locale renforcée.",
    priceEur: 250,
    isIncluded: true,
  },
  {
    id: "reviews_nfc",
    name: "Campagne d'Avis 5 Étoiles & 2 Plaques Connectées NFC",
    desc: "Collecte automatisée auprès de vos clients avec filtrage des avis insatisfaits.",
    priceEur: 250,
    isIncluded: true,
  },
  {
    id: "photos_hd",
    name: "Optimisation Photographique Haute Résolution (Pack 25 visuels)",
    desc: "Mise en avant des installations, des produits phares et des équipes en situation réelle.",
    priceEur: 290,
  },
  {
    id: "monitoring_1y",
    name: "Surveillance Algorithmique & Protection Concurrents (1 An)",
    desc: "Veille continue contre les suggestions malveillantes de modifications et baisse de rang.",
    priceEur: 360,
  },
];

export function GoogleMapsShowcase() {
  const { price } = useLang();
  const funnel = useOptionalFunnel();
  const [activeSector, setActiveSector] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Paris");
  const [customCity, setCustomCity] = useState("");
  const [mode, setMode] = useState<"after" | "before">("after");

  // Interactive modules selection state
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "core_gmb",
    "local_seo",
    "reviews_nfc",
  ]);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const sector = SECTORS[activeSector];
  const activeCityName = customCity.trim() || selectedCity;
  const isSelected = funnel?.selectedServices.includes("maps") ?? false;

  // Calculate quote based on active modules (Base minimum 999 €)
  const totalQuoteEur = useMemo(() => {
    const sum = selectedModules.reduce((acc, mId) => {
      const mod = MODULE_OPTIONS.find((m) => m.id === mId);
      return acc + (mod ? mod.priceEur : 0);
    }, 0);
    return Math.max(999, sum);
  }, [selectedModules]);

  return (
    <section
      id="maps"
      className="relative border-b border-[#E8E2D8] bg-[#FDFBF7] py-16 text-[#1A1815] sm:py-24"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1A73E8]/30 bg-[#1A73E8]/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A73E8]">
            <MapPin className="h-3.5 w-3.5 text-[#1A73E8]" />
            <span>GOOGLE BUSINESS PROFILE · PACK LOCAL OFFICIEL</span>
          </div>
          <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#1A1815]">
            Dominez les recherches Google locales <em className="text-[#1A73E8] not-italic">dans votre ville.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5C554B] sm:text-base">
            82 % des clients choisissent l'un des 3 premiers établissements sur la carte Google.
            Passez devant vos concurrents et transformez chaque recherche à proximité en client direct.
          </p>
        </header>

        {/* 2-Columns Interactive Simulator & Customizer */}
        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* GAUCHE : Simulateur Réaliste Google Local 3-Pack */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[#D5D0C5] bg-white p-6 shadow-[0_15px_40px_rgba(26,24,21,0.06)] sm:p-7">
              <div>
                {/* Header Simulateur */}
                <div className="flex items-center justify-between border-b border-[#EBE5DC] pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1A73E8] text-white font-bold text-xs">
                      G
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1815]">
                      Simulateur Google Search & Maps
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#1A73E8] border border-blue-200">
                    Algorithme Local 2026
                  </span>
                </div>

                {/* City Picker Bar */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5C554B] flex items-center gap-1">
                      <Compass className="h-3 w-3 text-[#1A73E8]" /> Ville cible :
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#1A73E8]">{activeCityName}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {PRESET_CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setSelectedCity(c);
                          setCustomCity("");
                        }}
                        className={cn(
                          "rounded-full px-3 py-1 font-mono text-xs font-medium transition",
                          activeCityName === c
                            ? "bg-[#1A73E8] text-white shadow-xs"
                            : "bg-[#F3EFE6] text-[#4A453C] hover:bg-[#EAE4D7]"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                    <input
                      type="text"
                      placeholder="+ Autre ville..."
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      className="rounded-full bg-[#F3EFE6] px-3 py-1 font-mono text-xs text-[#1A1815] placeholder-[#8C8274] border border-[#D5D0C5] focus:outline-hidden focus:border-[#1A73E8]"
                    />
                  </div>
                </div>

                {/* Sector Selector */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-[#EBE5DC] pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A7062] mr-1">Activité :</span>
                  {SECTORS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSector(idx)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition",
                        activeSector === idx
                          ? "bg-[#1A1815] text-white shadow-xs font-semibold"
                          : "bg-[#F3EFE6] text-[#5C554B] hover:bg-[#EAE4D7]"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Mode Toggle (Avant / Après) */}
                <div className="mt-4 grid grid-cols-2 rounded-xl bg-[#F3EFE6] p-1 border border-[#D5D0C5] font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setMode("after")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg py-2 font-bold transition",
                      mode === "after"
                        ? "bg-[#1A73E8] text-white shadow-xs"
                        : "text-[#5C554B] hover:text-[#1A1815]"
                    )}
                  >
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>AVEC XR AGENCY (Top 3)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("before")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg py-2 font-bold transition",
                      mode === "before"
                        ? "bg-[#C53030] text-white shadow-xs"
                        : "text-[#5C554B] hover:text-[#1A1815]"
                    )}
                  >
                    <span>SANS OPTIMISATION</span>
                  </button>
                </div>

                {/* Simulated Google Search View & Real Map Canvas */}
                <div className="mt-4 rounded-2xl border border-[#D5D0C5] bg-[#FAF8F5] p-4 text-start">
                  {/* Google Search Bar Mockup */}
                  <div className="flex items-center gap-2.5 rounded-full bg-white px-3.5 py-2 text-xs shadow-xs border border-[#E2E8F0]">
                    <Search className="h-4 w-4 text-[#1A73E8]" />
                    <span className="flex-1 font-sans text-xs font-medium text-[#202124] truncate">
                      {sector.keyword} {activeCityName}
                    </span>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#1A73E8]">
                      Google Maps
                    </span>
                  </div>

                  {/* Stylized Vector Map Preview with Authentic Pins */}
                  <div className="relative mt-3 h-28 w-full overflow-hidden rounded-xl border border-[#D5D0C5] bg-[#E8ECEF]">
                    {/* Map Grid SVG */}
                    <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#E5E3DF" />
                      <path d="M-20 60 Q 140 30 300 80 T 600 50" stroke="#FFF" strokeWidth="16" fill="none" />
                      <path d="M120 -20 Q 160 80 200 160" stroke="#FFF" strokeWidth="12" fill="none" />
                      <path d="M340 -20 Q 310 70 360 160" stroke="#FFF" strokeWidth="10" fill="none" />
                      <circle cx="200" cy="75" r="22" fill="#D4E4FF" />
                    </svg>

                    {/* GPS Pins on Map */}
                    {mode === "after" ? (
                      <>
                        {/* Pin 1: YOUR BUSINESS (Google Red with white circle) */}
                        <div className="absolute left-[40%] top-[30%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-md border-2 border-white">
                            <Star className="h-3.5 w-3.5 fill-white text-white" />
                          </div>
                          <span className="mt-1 rounded bg-[#1A1815] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-sm whitespace-nowrap">
                            Votre Établissement (Top 3)
                          </span>
                        </div>

                        {/* Pin 2: Competitor 2 */}
                        <div className="absolute left-[72%] top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-65">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#70757A] text-[10px] font-bold text-white border border-white">
                            2
                          </div>
                          <span className="rounded bg-white/90 px-1.5 py-0.2 text-[8px] text-[#3C4043] border border-zinc-200">
                            {sector.competitor2}
                          </span>
                        </div>

                        {/* Pin 3: Competitor 3 */}
                        <div className="absolute left-[20%] top-[65%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-55">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#70757A] text-[9px] font-bold text-white">
                            3
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute left-[50%] top-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#70757A] text-white shadow-md border-2 border-white">
                          <span className="font-mono text-[10px] font-bold">28</span>
                        </div>
                        <span className="mt-1 rounded bg-[#C53030] px-2 py-0.5 font-mono text-[9px] font-bold text-white whitespace-nowrap">
                          Votre Fiche (Page 3+ · Non Visible)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Google Local 3-Pack Cards Simulation */}
                  {mode === "after" ? (
                    <div className="mt-3 space-y-2">
                      {/* Top 3 : YOUR BUSINESS */}
                      <div className="rounded-xl border-2 border-[#1A73E8] bg-white p-3.5 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-bold text-[#1A73E8]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                              TOP 3 PACK LOCAL · {activeCityName.toUpperCase()}
                            </div>
                            <h4 className="mt-1 font-sans text-base font-bold text-[#202124]">
                              Votre Établissement
                            </h4>
                            <div className="mt-0.5 flex items-center gap-1 text-xs">
                              <span className="font-bold text-[#202124]">4.9</span>
                              <div className="flex text-[#FBBC04]">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC04]" />
                                ))}
                              </div>
                              <span className="text-[11px] text-[#70757A]">(348 avis)</span>
                              <span className="text-[11px] text-[#70757A]">· {sector.label}</span>
                            </div>
                            <p className="mt-1 text-[11px] text-[#70757A]">
                              Centre-ville · {activeCityName} · Ouvert · Service continu
                            </p>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-md border border-[#1A73E8] bg-blue-50 px-2 py-1 text-[10px] font-bold text-[#1A73E8]">
                              <Navigation className="h-3 w-3" /> Itinéraire
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-md border border-[#D5D0C5] bg-white px-2 py-1 text-[10px] font-medium text-[#3C4043]">
                              <Phone className="h-3 w-3" /> Appeler
                            </span>
                          </div>
                        </div>

                        {/* Monthly impact metric */}
                        <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-[#E8ECEF] pt-2 text-center">
                          <div className="rounded-lg bg-[#F8FAFC] p-1.5 border border-[#E2E8F0]">
                            <span className="block font-mono text-xs font-bold text-[#1A73E8]">{sector.calls}</span>
                            <span className="text-[9px] text-[#70757A]">Appels téléphoniques</span>
                          </div>
                          <div className="rounded-lg bg-[#F8FAFC] p-1.5 border border-[#E2E8F0]">
                            <span className="block font-mono text-xs font-bold text-[#202124]">{sector.route}</span>
                            <span className="text-[9px] text-[#70757A]">Demandes d'itinéraire</span>
                          </div>
                        </div>
                      </div>

                      {/* Competitor 2 */}
                      <div className="rounded-lg border border-[#E2E8F0] bg-white p-2.5 text-xs text-[#5F6368] flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#202124]">2. {sector.competitor2}</span>
                          <span className="text-[10px] block text-[#70757A]">4.1 ★ (42 avis) · 1.4 km</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#70757A]">Concurrent dépassé</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 text-start">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#C53030]">
                        POSITION N°28 · INVISIBLE (PAGE 3+)
                      </span>
                      <h4 className="mt-1 font-sans text-base font-semibold text-[#202124]">
                        Votre Établissement (Non optimisé)
                      </h4>
                      <p className="mt-1.5 text-xs text-[#742A2A] leading-relaxed">
                        Sans optimisation continue, vos concurrents de {activeCityName} captent plus de 90 % des appels et réservations de votre zone de chalandise.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Reassurance */}
              <div className="mt-4 flex items-center justify-between border-t border-[#EBE5DC] pt-3 text-xs text-[#7A7062]">
                <span className="text-[11px] font-mono text-[#5C554B]">Positionnement & autorité Google Maps</span>
                <span className="font-mono text-[11px] font-bold text-[#1A73E8]">
                  Exclusivité 1 établissement par ville
                </span>
              </div>
            </div>
          </div>

          {/* DROITE : Configurateur de Devis Interactif Modules Clés */}
          <div className="lg:col-span-6 flex flex-col">
            <article className="flex h-full flex-col justify-between rounded-3xl border-2 border-[#1A1815] bg-white p-6 shadow-xl sm:p-8">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE5DC] pb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#1A73E8]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1815]">
                      Configurez votre Dispositif Google Maps
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A73E8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Contrat Garanti 1 An
                  </span>
                </div>

                {/* Exclusivité & Rareté */}
                <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-xs text-amber-900 flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-amber-700" />
                  <span>
                    <strong>Engagement d'Exclusivité :</strong> nous ne signons qu'avec un seul établissement par zone et spécialité pour garantir le Top 3 local.
                  </span>
                </div>

                {/* Live Modules Checklist */}
                <div className="mt-4 space-y-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#7A7062]">
                    Modules clés à inclure selon votre situation :
                  </p>

                  {MODULE_OPTIONS.map((mod) => {
                    const isChecked = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border p-3 text-start transition",
                          isChecked
                            ? "border-[#1A73E8] bg-blue-50/40 text-[#1A1815]"
                            : "border-[#D5D0C5] bg-[#FAF8F5] text-[#5C554B] hover:border-[#1A73E8]/50"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition",
                            isChecked
                              ? "bg-[#1A73E8] border-[#1A73E8] text-white"
                              : "border-[#A0988A] bg-white"
                          )}
                        >
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-[#1A1815]">
                              {mod.name}
                            </h4>
                            <span className="font-mono text-[11px] font-semibold text-[#1A73E8] shrink-0">
                              {mod.isIncluded ? "Inclus" : `+${price(mod.priceEur)}`}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-[#5C554B] leading-snug">
                            {mod.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Price Display */}
                <div className="mt-5 rounded-2xl border border-[#D5D0C5] bg-[#FAF8F5] p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A7062]">
                        Tarif Accompagnement Annuel Clé en Main :
                      </span>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-bold text-[#1A1815]">
                          {price(totalQuoteEur)}
                        </span>
                        <span className="font-mono text-xs text-[#5C554B]"> / an</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[11px] text-[#1A73E8] font-bold block">
                        ~{price(Math.round(totalQuoteEur / 12))} / mois
                      </span>
                      <span className="text-[10px] text-[#7A7062]">Rentabilisé dès les 2 premiers clients</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Actions */}
              <div className="mt-6 space-y-2.5 border-t border-[#EBE5DC] pt-5">
                {/* 1. Primary Diagnostic Call */}
                <a
                  href={`https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20Google%20Maps%20Top%203%20pour%20mon%20%C3%A9tablissement%20%C3%A0%20${encodeURIComponent(activeCityName)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1A1815] py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-[#332F2B] active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4 text-[#E5C696]" />
                  <span>Réserver mon diagnostic téléphonique (15 min offert)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* 2. Secondary Add to Quote & WhatsApp */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => funnel?.toggleService("maps")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-semibold transition active:scale-[0.99]",
                      isSelected
                        ? "border-[#1A73E8] bg-blue-50 text-[#1A73E8]"
                        : "border-[#1A1815]/20 bg-white text-[#1A1815] hover:border-[#1A1815]"
                    )}
                  >
                    <Check className={cn("h-4 w-4", isSelected ? "text-[#1A73E8]" : "text-[#7A7062]")} />
                    <span>{isSelected ? "Ajouté à votre devis" : "+ Ajouter à mon devis"}</span>
                  </button>

                  <a
                    href={`https://wa.me/33649219808?text=Bonjour%20XR%20AGENCY%2C%20pouvez-vous%20analyser%20mon%20%C3%A9tablissement%20%C3%A0%20${encodeURIComponent(activeCityName)}%20sur%20Google%20Maps%20%3F`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-[#D5D0C5] bg-[#FAF8F5] py-2.5 text-xs font-semibold text-[#1A1815] transition hover:bg-white hover:border-[#1A1815]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#A67C40]" />
                    <span>Échanger sur WhatsApp</span>
                  </a>
                </div>

                <div className="pt-1 text-center">
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: "maps" }}
                    className="font-mono text-[11px] text-[#7A7062] hover:text-[#1A1815] hover:underline"
                  >
                    Consulter le détail technique de l'accompagnement →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
