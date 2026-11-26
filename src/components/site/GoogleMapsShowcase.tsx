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
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useOptionalFunnel } from "@/lib/funnel";

const SECTORS = [
  { id: "resto", label: "Restaurant", query: "Restaurant gastronomique Paris", calls: "+180 appels/mois", route: "+320 itinéraires/mois" },
  { id: "hotel", label: "Hôtel & Spa", query: "Boutique Hôtel de luxe", calls: "+95 réservations directes", route: "+410 visites" },
  { id: "sante", label: "Santé & Esthétique", query: "Clinique esthétique d'excellence", calls: "+140 consultations", route: "+280 itinéraires" },
  { id: "avocat", label: "Cabinet & Conseil", query: "Cabinet d'avocats affaires", calls: "+65 dossiers qualifiés", route: "+120 visites" },
];

export function GoogleMapsShowcase() {
  const { lang, price } = useLang();
  const funnel = useOptionalFunnel();
  const [activeSector, setActiveSector] = useState(0);
  const [mode, setMode] = useState<"after" | "before">("after");

  const sector = SECTORS[activeSector];
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
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* GAUCHE : Simulateur Ludique Smartphone Google Pack Local */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg rounded-[2.5rem] border border-[#1A1815]/15 bg-[#171410] p-4 text-white shadow-2xl sm:p-6">
              
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

              {/* Sector Chips Selector */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A67C40]">Secteur :</span>
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

              {/* Simulated Google Search View */}
              <div className="rounded-2xl border border-white/10 bg-[#201D19] p-4 text-start">
                {/* Search Bar Input */}
                <div className="flex items-center gap-2 rounded-xl bg-[#12100E] px-3 py-2 text-xs text-white/80 border border-white/10">
                  <Search className="h-4 w-4 text-[#A67C40]" />
                  <span className="flex-1 font-mono text-[11px] truncate text-white">{sector.query}</span>
                  <span className="rounded bg-[#E5C696]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#E5C696]">Google 4G</span>
                </div>

                {/* Google Maps Mock Result */}
                {mode === "after" ? (
                  <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 transition-all animate-in fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          POSITION N°1 · PACK LOCAL GOOGLE
                        </div>
                        <h4 className="mt-1 font-serif text-lg font-bold text-white">Votre Établissement</h4>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-[#E5C696]">
                          <span className="font-bold">4.9</span>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-white/60">(348 avis vérifiés)</span>
                        </div>
                        <p className="mt-1 text-[11px] text-white/70">
                          Ouvert · Service continu · Réservation directe & Devis instantané
                        </p>
                      </div>
                      <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 p-2 text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Performance metrics pill */}
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-center">
                      <div className="rounded-lg bg-black/40 p-2">
                        <span className="block font-mono text-xs font-bold text-emerald-400">{sector.calls}</span>
                        <span className="text-[10px] text-white/50">Appels téléphoniques directs</span>
                      </div>
                      <div className="rounded-lg bg-black/40 p-2">
                        <span className="block font-mono text-xs font-bold text-[#E5C696]">{sector.route}</span>
                        <span className="text-[10px] text-white/50">Demandes d'itinéraire GPS</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 transition-all animate-in fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-400">
                          POSITION N°28 · INVISIBLE (PAGE 3+)
                        </span>
                        <h4 className="mt-1 font-serif text-lg font-semibold text-white/70">Votre Établissement (Non optimisé)</h4>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
                          <span>3.8</span>
                          <span className="text-[11px]">(14 avis) · Horaires non mis à jour</span>
                        </div>
                        <p className="mt-1 text-[11px] text-rose-300/80">
                          Vos concurrents captent 94 % des appels et réservations de votre zone.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Action Bar inside Simulator */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <span className="text-white/60 text-[11px]">Audit d'éligibilité immédiat :</span>
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
          <div className="lg:col-span-6">
            <article className="rounded-[2.2rem] border-2 border-[#A67C40] bg-[#FAF8F5] p-7 shadow-xl sm:p-10">
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
