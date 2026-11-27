import { useState } from "react";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Search,
  Navigation,
  TrendingUp,
  Sparkles,
  Compass,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
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
    label: "Restaurant",
    keyword: "Restaurant gastronomique",
    competitor2: "Bistrot Saint-Germain",
    competitor3: "Le Relais Gourmand",
    calls: "+180 appels/mois",
    route: "+320 itinéraires/mois",
  },
  {
    id: "hotel",
    label: "Hôtel & Spa",
    keyword: "Boutique Hôtel 5 étoiles",
    competitor2: "Hôtel Continental",
    competitor3: "Grand Palace & Spa",
    calls: "+95 réservations directes",
    route: "+410 visites",
  },
  {
    id: "sante",
    label: "Santé & Esthétique",
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

export function GoogleMapsShowcase() {
  const { lang, price } = useLang();
  const funnel = useOptionalFunnel();
  const [activeSector, setActiveSector] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Paris");
  const [customCity, setCustomCity] = useState("");
  const [mode, setMode] = useState<"after" | "before">("after");

  const sector = SECTORS[activeSector];
  const activeCityName = customCity.trim() || selectedCity;
  const isSelected = funnel?.selectedServices.includes("maps") ?? false;

  return (
    <section
      id="maps"
      className="relative border-b border-[#EBE5DC] bg-white py-16 text-[#1A1815] sm:py-24"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A67C40]/25 bg-[#FAF8F5] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A67C40]">
            <MapPin className="h-3.5 w-3.5 text-[#A67C40]" />
            <span>GOOGLE BUSINESS PROFILE · TOP 3 PACK LOCAL</span>
          </div>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-tight tracking-[-0.02em]">
            Dominez les recherches Google locales <em className="text-[#A67C40] not-italic">dans votre ville.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5C554B] sm:text-base">
            82 % des consommateurs choisissent parmi les 3 premiers établissements affichés sur la carte Google.
            Passez devant vos concurrents et transformez chaque recherche à proximité en client direct.
          </p>
        </header>

        {/* 2-Columns Interactive Tunnel */}
        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* GAUCHE : Simulateur Interactif Smartphone Google Pack Local & Map Canvas */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative mx-auto flex h-full w-full max-w-xl flex-col justify-between rounded-[2.5rem] border border-[#1A1815]/15 bg-[#171410] p-5 text-white shadow-2xl sm:p-7">
              
              <div>
                {/* Header Simulateur */}
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E5C696] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Simulateur Live · Pack Local Google
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                    Algorithme 2026
                  </span>
                </div>

                {/* City Selector */}
                <div className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#E5C696]/80 flex items-center gap-1">
                      <Compass className="h-3 w-3" /> Ville ciblée :
                    </span>
                    <span className="text-[10px] font-mono text-white/50">{activeCityName}</span>
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
                          "rounded-full px-2.5 py-0.5 font-mono text-[11px] transition",
                          activeCityName === c
                            ? "bg-[#E5C696] text-[#14110E] font-bold"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
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
                      className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white placeholder-white/40 border border-white/10 focus:outline-hidden focus:border-[#E5C696]"
                    />
                  </div>
                </div>

                {/* Sector Chips Selector */}
                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#A67C40] mr-1">Secteur :</span>
                  {SECTORS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSector(idx)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        activeSector === idx
                          ? "bg-[#E5C696] text-[#14110E] shadow"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Mode Toggle Avant / Après */}
                <div className="mb-4 grid grid-cols-2 rounded-xl bg-black/50 p-1 border border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setMode("after")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg py-2 font-bold transition",
                      mode === "after"
                        ? "bg-emerald-500 text-white shadow"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AVEC XRAGENCY (Top 1)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("before")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg py-2 font-bold transition",
                      mode === "before"
                        ? "bg-rose-600/80 text-white shadow"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <span>SANS OPTIMISATION</span>
                  </button>
                </div>

                {/* Simulated Google Search View & Real Map Canvas */}
                <div className="rounded-2xl border border-white/10 bg-[#201D19] p-4 text-start">
                  {/* Search Bar Input */}
                  <div className="flex items-center gap-2 rounded-xl bg-[#12100E] px-3 py-2 text-xs text-white/80 border border-white/10">
                    <Search className="h-4 w-4 text-[#A67C40]" />
                    <span className="flex-1 font-mono text-[11px] truncate text-white">
                      {sector.keyword} {activeCityName}
                    </span>
                    <span className="rounded bg-[#E5C696]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#E5C696]">Google 4G</span>
                  </div>

                  {/* Stylized Google Map Canvas with Interactive Pins */}
                  <div className="relative mt-3 h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1A1F2B]">
                    {/* Map Grid & Roads SVG */}
                    <svg className="absolute inset-0 h-full w-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#1A1F2B" />
                      <path d="M-20 60 Q 120 40 280 80 T 600 50" stroke="#333E52" strokeWidth="12" fill="none" />
                      <path d="M140 -20 Q 180 70 210 160" stroke="#333E52" strokeWidth="8" fill="none" />
                      <path d="M320 -20 Q 300 80 340 160" stroke="#333E52" strokeWidth="10" fill="none" />
                      <circle cx="210" cy="70" r="14" fill="#2E3747" />
                      <circle cx="310" cy="75" r="10" fill="#2E3747" />
                    </svg>

                    {/* GPS Pins on Map */}
                    {mode === "after" ? (
                      <>
                        {/* Pin 1: Top 1 Votre Établissement (Emerald Pulse) */}
                        <div className="absolute left-[38%] top-[28%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.8)] border-2 border-white">
                            <span className="font-mono text-xs font-black">1</span>
                            <span className="absolute -inset-1 rounded-full border border-emerald-400 animate-ping opacity-60" />
                          </span>
                          <span className="mt-1 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-300 backdrop-blur-xs whitespace-nowrap">
                            Votre Établissement (N°1)
                          </span>
                        </div>

                        {/* Pin 2: Competitor 2 */}
                        <div className="absolute left-[70%] top-[40%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-65">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-600 text-[10px] font-bold text-white border border-white/50">
                            2
                          </span>
                          <span className="rounded bg-black/60 px-1 py-0.2 text-[8px] text-white/60">
                            {sector.competitor2}
                          </span>
                        </div>

                        {/* Pin 3: Competitor 3 */}
                        <div className="absolute left-[20%] top-[65%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-50">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-700 text-[9px] font-bold text-white/80">
                            3
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="absolute left-[50%] top-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg border border-white">
                          <span className="font-mono text-[10px] font-bold">28</span>
                        </span>
                        <span className="mt-1 rounded bg-black/80 px-2 py-0.5 font-mono text-[9px] text-rose-300 whitespace-nowrap">
                          Votre Fiche (Page 3+ · Non Visible)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Google Local 3-Pack Simulated Results */}
                  {mode === "after" ? (
                    <div className="mt-3 space-y-2 transition-all animate-in fade-in">
                      {/* Result 1: YOUR BUSINESS (TOP 1) */}
                      <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                              N°1 PACK LOCAL · {activeCityName.toUpperCase()}
                            </div>
                            <h4 className="mt-1 font-serif text-base font-bold text-white">
                              Votre Établissement
                            </h4>
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-[#E5C696]">
                              <span className="font-bold">4.9</span>
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-[10px] text-white/60">(348 avis vérifiés)</span>
                            </div>
                            <p className="mt-0.5 text-[10px] text-white/70">
                              {sector.keyword} · {activeCityName} · Ouvert
                            </p>
                          </div>
                          <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/20 p-1.5 text-emerald-400">
                            <TrendingUp className="h-4 w-4" />
                          </span>
                        </div>

                        {/* Direct conversion stats */}
                        <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-white/10 pt-2 text-center">
                          <div className="rounded-md bg-black/50 p-1.5">
                            <span className="block font-mono text-xs font-bold text-emerald-400">{sector.calls}</span>
                            <span className="text-[9px] text-white/50">Appels directs</span>
                          </div>
                          <div className="rounded-md bg-black/50 p-1.5">
                            <span className="block font-mono text-xs font-bold text-[#E5C696]">{sector.route}</span>
                            <span className="text-[9px] text-white/50">Itinéraires GPS</span>
                          </div>
                        </div>
                      </div>

                      {/* Result 2: Competitor 2 (Muted) */}
                      <div className="rounded-lg border border-white/5 bg-black/20 p-2 text-xs text-white/60 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white/80">2. {sector.competitor2}</span>
                          <span className="text-[10px] block text-white/40">4.1 ★ (42 avis) · 1.2 km</span>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">Dépassement garanti</span>
                      </div>

                      {/* Result 3: Competitor 3 (Muted) */}
                      <div className="rounded-lg border border-white/5 bg-black/20 p-2 text-xs text-white/60 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white/80">3. {sector.competitor3}</span>
                          <span className="text-[10px] block text-white/40">3.9 ★ (19 avis) · 2.4 km</span>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">Dépassement garanti</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 transition-all animate-in fade-in">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-400">
                        POSITION N°28 · INVISIBLE (PAGE 3+)
                      </span>
                      <h4 className="mt-1 font-serif text-base font-semibold text-white/70">
                        Votre Établissement (Non optimisé)
                      </h4>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
                        <span>3.8</span>
                        <span className="text-[11px]">(14 avis) · Horaires non vérifiés</span>
                      </div>
                      <p className="mt-2 text-xs text-rose-300/80 leading-relaxed">
                        Vos concurrents de {activeCityName} captent plus de 90 % des appels et réservations locales.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Action Bar inside Simulator */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <span className="text-white/60 text-[11px]">Audit éligibilité {activeCityName} :</span>
                <a
                  href="#maps-simulator"
                  className="font-mono text-[11px] font-bold text-[#E5C696] underline hover:text-white"
                >
                  Tester mes mots-clés →
                </a>
              </div>
            </div>
          </div>

          {/* DROITE : Offre Stratégique Unique & Machine de Conversion */}
          <div className="lg:col-span-6 flex flex-col">
            <article className="flex h-full flex-col justify-between rounded-[2.2rem] border-2 border-[#A67C40] bg-[#FAF8F5] p-7 shadow-xl sm:p-10">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE5DC] pb-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#A67C40]/15 px-3.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A67C40]">
                    <Star className="h-3.5 w-3.5 fill-[#A67C40]" />
                    PACK OFFICIEL DOMINATION GOOGLE MAPS
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Accompagnement Stratégique 1 An
                  </span>
                </div>

                {/* Exclusivité & Rareté */}
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-50/70 p-3 text-xs text-amber-900 flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  <span className="font-medium">
                    <strong>Exclusivité sectorielle :</strong> nous n'accompagnons qu'un seul établissement par ville et par spécialité pour garantir la première place.
                  </span>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1815]">
                    Stratégie de Visibilité Google Maps
                  </h3>
                  <div className="shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-xs text-[#5C554B]">Dès</span>
                      <span className="font-serif text-4xl font-bold text-[#1A1815]">{price(999)}</span>
                      <span className="font-mono text-xs text-[#5C554B]"> / an</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#5C554B]">
                  Un dispositif complet pour faire de votre fiche Google votre meilleur apporteur de chiffre d'affaires :
                  audit technique complet, optimisation algorithmique, renforcement de la géolocalisation et stratégie d'avis clients.
                </p>

                {/* Deliverables Checklist */}
                <ul className="mt-6 space-y-3 border-t border-[#EBE5DC] pt-5">
                  {[
                    "Audit complet de vos concurrents directs & mots-clés à fort volume local",
                    "Création ou restructuration complète de la fiche Google Business Profile",
                    "Optimisation des catégories primaires, attributs cachés et services",
                    "Stratégie de collecte et automatisation des avis clients 5 étoiles",
                    "Nettoyage des citations annuaires (NAP) et cohérence d'autorité locale",
                    "Suivi mensuel des appels, itinéraires GPS et positions dans votre zone",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#2E2923]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A67C40]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TUNNEL DE VENTE INTENSE : FORCER LE CALL / LE DEVIS / L'ACTION */}
              <div className="mt-8 space-y-3 border-t border-[#EBE5DC] pt-6">
                {/* 1. CALL DIRECT */}
                <a
                  href="https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20t%C3%A9l%C3%A9phonique%20Google%20Maps%20offert%20pour%20mon%20%C3%A9tablissement."
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1A1815] py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-[#332F2B] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4 text-[#E5C696]" />
                  <span>Réserver mon diagnostic téléphonique (15 min offert)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* 2. ACTIONS SECONDAIRES : AJOUT DEVIS & WHATSAPP */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => funnel?.toggleService("maps")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-full border py-3 text-xs font-semibold transition active:scale-[0.99]",
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-[#1A1815]/20 bg-white text-[#1A1815] hover:border-[#1A1815] hover:bg-[#FAF8F5]"
                    )}
                  >
                    <Check className={cn("h-4 w-4", isSelected ? "text-emerald-600" : "text-[#A67C40]")} />
                    <span>{isSelected ? "Sélectionné dans votre devis" : "+ Ajouter au devis (999 €)"}</span>
                  </button>

                  <a
                    href="https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20pouvez-vous%20analyser%20la%20fiche%20Google%20Maps%20de%20mon%20%C3%A9tablissement%20%3F"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 py-3 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>Échanger sur WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: "maps" }}
                    className="font-mono text-xs text-[#8C8274] hover:text-[#1A1815] hover:underline"
                  >
                    Consulter la méthodologie technique complète de l'agence →
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
