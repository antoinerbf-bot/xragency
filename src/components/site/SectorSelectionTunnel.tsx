import React, { useState } from "react";
import { ArrowRight, Sparkles, Building2, Utensils, Hotel, Home, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import { useFunnel } from "@/lib/funnel";

interface SectorCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  stats: string;
  features: string[];
  goalPreset: "maps" | "sales" | "branding" | "refonte";
}

const SECTOR_CARDS: SectorCard[] = [
  {
    id: "restaurant",
    title: "Restaurant & Food",
    subtitle: "Restauration, Bars & Dark Kitchens",
    image: "/showcase/sc-food.jpg",
    stats: "+340% d'appels & commandes directes",
    features: [
      "Domination Google Maps Pack Local",
      "Système de caisse POS & commande en ligne sans commission",
      "Plaques NFC comptoir pour avis 5★ automatisés",
    ],
    goalPreset: "sales",
  },
  {
    id: "hospitality",
    title: "Hôtel & Tourisme",
    subtitle: "Boutique-Hôtels, Spas & Resorts",
    image: "/showcase/sc-hotel.jpg",
    stats: "0% commission OTA · Réservations en direct",
    features: [
      "Site vitrine immersif plein écran 4K",
      "Moteur de réservation direct synchronisé",
      "Référencement international multilingue",
    ],
    goalPreset: "branding",
  },
  {
    id: "realestate",
    title: "Immobilier & Architecture",
    subtitle: "Promoteurs, Agences & Architectes",
    image: "/showcase/sc-immo.jpg",
    stats: "Génération de mandats qualifiés",
    features: [
      "Présentation de biens haute joaillerie",
      "Tunnels d'estimation en ligne personnalisés",
      "Acquisition d'acheteurs & investisseurs ciblés",
    ],
    goalPreset: "refonte",
  },
  {
    id: "services",
    title: "Entreprises & PME",
    subtitle: "Professions Libérales, Cabinets & Services",
    image: "/showcase/sc-luxe.jpg",
    stats: "Stature d'autorité & Devis entrants",
    features: [
      "Identité de marque & charte éditoriale luxe",
      "SEO chirurgical sur requêtes transactionnelles",
      "CRM & Automatisation de relance WhatsApp 24/7",
    ],
    goalPreset: "maps",
  },
];

export function SectorSelectionTunnel() {
  const { applyGoalPreset } = useFunnel();
  const [selectedSector, setSelectedSector] = useState<string>("restaurant");
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const activeSector = SECTOR_CARDS.find((s) => s.id === (hoveredSector || selectedSector)) || SECTOR_CARDS[0];

  const handleSelect = (sector: SectorCard) => {
    setSelectedSector(sector.id);
    applyGoalPreset(sector.goalPreset);
    const element = document.getElementById("quote");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#080B10] border-y border-[#D4AF37]/20 py-24 text-[#F8FAFC]">
      {/* Halo d'ambiance doré subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(1000px circle at 50% 30%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* En-tête : Diagnostic & Parcours guidé */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                03 · TUNNEL SECTORIEL & RECOMMANDATION SUR-MESURE
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-[1.05] text-white">
              Construisons ensemble votre{" "}
              <span className="italic text-[#D4AF37]">croissance digitale.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Sélectionnez votre univers métier. Découvrez immédiatement la configuration d'outils et de visibilité conçue pour maximiser votre rentabilité.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-[#D4AF37]">
              Étape 1 sur 3 : Secteur d'activité
            </span>
          </div>
        </div>

        {/* Grille des 4 Cartes Métier (Inspiré Concept 03 de l'esquisse) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTOR_CARDS.map((sector) => {
            const isSelected = selectedSector === sector.id;
            return (
              <div
                key={sector.id}
                onMouseEnter={() => setHoveredSector(sector.id)}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => handleSelect(sector)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 flex flex-col justify-between ${
                  isSelected
                    ? "border-[#D4AF37] bg-[#0F172A] shadow-[0_20px_50px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "border-white/10 bg-[#0c0e14] hover:border-white/30 hover:bg-[#0F172A]"
                }`}
              >
                {/* Image d'ambiance avec masque dégradé sombre */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.08] brightness-[0.85]"
                    onError={(e) => {
                      // Fallback image si le fichier n'est pas trouvé
                      (e.currentTarget as HTMLImageElement).src = "/videos/vsl-poster.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30">
                      {sector.subtitle.split(",")[0]}
                    </span>
                    {isSelected && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-black">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {sector.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-300 font-mono">
                      {sector.subtitle}
                    </p>
                  </div>
                </div>

                {/* Corps de la carte : Statistiques & Livrables clés */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="rounded-xl bg-black/50 border border-white/5 p-3">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#10B981] block">
                      IMPACT MESURABLE OBSERVÉ
                    </span>
                    <strong className="text-xs font-bold text-white mt-0.5 block">
                      {sector.stats}
                    </strong>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {sector.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`mt-4 w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-[#D4AF37] text-black shadow-lg hover:bg-[#e2c14c]"
                        : "bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black"
                    }`}
                  >
                    <span>Lancer le configurateur</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
