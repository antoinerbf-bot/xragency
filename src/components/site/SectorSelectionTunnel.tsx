import React, { useState } from "react";
import { ArrowRight, Sparkles, Building2, Utensils, Hotel, Home, CheckCircle2, ChevronRight, Layers } from "lucide-react";
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
    stats: "+340% de commandes directes",
    features: [
      "Domination Google Maps Pack Local",
      "Système de commande & caisse sans commission",
      "Plaques NFC comptoir pour avis 5★ automatisés",
    ],
    goalPreset: "sales",
  },
  {
    id: "hospitality",
    title: "Hôtel & Tourisme",
    subtitle: "Boutique-Hôtels, Spas & Resorts",
    image: "/showcase/sc-hotel.jpg",
    stats: "0% de commissions OTA (Booking)",
    features: [
      "Site vitrine immersif plein écran 4K",
      "Moteur de réservation directe synchronisé",
      "Référencement international multilingue",
    ],
    goalPreset: "branding",
  },
  {
    id: "realestate",
    title: "Immobilier",
    subtitle: "Agences, Promoteurs & Architectes",
    image: "/showcase/sc-immo.jpg",
    stats: "Mandats & investisseurs qualifiés",
    features: [
      "Présentation de biens haute joaillerie",
      "Tunnels d'estimation sur-mesure",
      "Campagnes Meta & Google ultra-ciblées",
    ],
    goalPreset: "refonte",
  },
  {
    id: "services",
    title: "Autre secteur",
    subtitle: "PME, Cabinets & E-Commerce",
    image: "/showcase/sc-luxe.jpg",
    stats: "Stature d'autorité & Devis entrants",
    features: [
      "Identité de marque & design prestige",
      "SEO chirurgical sur vos requêtes clés",
      "Automatisation CRM & relances intelligentes",
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
    <section id="tunnel-secteurs" className="relative overflow-hidden bg-[#080B10] border-t border-[#D4AF37]/25 py-24 sm:py-28 text-[#F8FAFC]">
      {/* Halo d'ambiance doré subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(1100px circle at 50% 30%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* ── STEP TRACKER EXACT DU CONCEPT 03 ── */}
        <div className="mb-14 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 sm:gap-6 rounded-full border border-white/15 bg-[#0F172A]/70 px-6 py-2.5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E2D5BC] text-xs font-black text-black">
                1
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Votre projet
              </span>
            </div>
            <span className="h-px w-6 sm:w-10 bg-white/20" />
            <div className="flex items-center gap-2 opacity-50">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-white/30 text-xs font-semibold text-white">
                2
              </span>
              <span className="text-xs sm:text-sm text-neutral-300">Vos besoins</span>
            </div>
            <span className="h-px w-6 sm:w-10 bg-white/20" />
            <div className="flex items-center gap-2 opacity-50">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-white/30 text-xs font-semibold text-white">
                3
              </span>
              <span className="text-xs sm:text-sm text-neutral-300">Recommandation</span>
            </div>
          </div>
        </div>

        {/* ── TITRE ET SOUS-TITRE DU CONCEPT 03 ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 max-w-xl">
            <div className="sec-head-line mb-3">
              <div className="sec-head-dash" />
              <span className="mono-nex text-white/70">
                <b className="text-[#c5a880] font-bold">06</b> / DIAGNOSTIC INTERACTIF PAR SECTEUR
              </span>
            </div>

            <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.6rem] text-white">
              Construisons ensemble votre{" "}
              <span className="text-[#dfc39d] font-serif font-light italic">
                croissance digitale.
              </span>
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] font-light leading-relaxed text-neutral-300">
              Répondez à quelques questions et recevez une recommandation sur-mesure en moins de 2 minutes.
            </p>

            {/* Bouton CTA du Concept 03 */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleSelect(activeSector)}
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#E2D5BC] px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#080B10] shadow-[0_12px_32px_rgba(226,213,188,0.35)] transition-all duration-300 hover:bg-white hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>Commencer le diagnostic</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Barre de Progression du Concept 03 */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Étape 1 sur 3</span>
                <span className="text-[#D4AF37] font-bold">33%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E2D5BC]" />
              </div>
            </div>
          </div>

          {/* ── LES 4 CARTES EN ÉVENTAIL DU CONCEPT 03 ── */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 perspective-1000">
              {SECTOR_CARDS.map((sector) => {
                const isSelected = selectedSector === sector.id;
                const isHovered = hoveredSector === sector.id;
                const isActive = isSelected || isHovered;

                return (
                  <div
                    key={sector.id}
                    onClick={() => handleSelect(sector)}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-4 sm:p-5 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "border-[#D4AF37] bg-[#0F172A] shadow-[0_20px_50px_rgba(212,175,55,0.25)] -translate-y-3 scale-[1.03]"
                        : "border-white/15 bg-[#0F172A]/70 hover:border-white/40 hover:-translate-y-1.5"
                    }`}
                    style={{ minHeight: "340px" }}
                  >
                    {/* Fond d'image photographique cinématographique */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ${
                          isActive ? "scale-110 brightness-[0.75]" : "brightness-[0.45] saturate-[0.8]"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/70 to-transparent" />
                    </div>

                    {/* Badge du secteur en haut */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-0.5 text-[8.5px] font-mono uppercase tracking-wider ${
                        isActive
                          ? "bg-[#D4AF37] font-bold text-black"
                          : "border border-white/20 bg-black/60 text-white/80"
                      }`}>
                        Secteur 0{SECTOR_CARDS.indexOf(sector) + 1}
                      </span>
                      {isActive && (
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-black text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Titre et détails en bas */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-[#E2D5BC] transition-colors">
                        {sector.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-neutral-300 font-light line-clamp-2">
                        {sector.subtitle}
                      </p>
                      
                      <div className="mt-3 border-t border-white/15 pt-2 flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                        <span>Choisir ce pôle</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fiche d'activation contextuelle sous les cartes */}
            <div className="mt-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0F172A]/90 p-5 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-white">
                      Pôle sélectionné : {activeSector.title}
                    </h4>
                    <p className="text-xs text-emerald-400 font-mono">
                      Impact mesuré : {activeSector.stats}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(activeSector)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E2D5BC] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-white"
                >
                  <span>Configurer pour {activeSector.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
