import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Globe2,
  MapPin,
  MessageCircle,
  PhoneCall,
  Play,
  Search,
  Sparkles,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";

interface ToolTab {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badge: string;
}

const TABS: ToolTab[] = [
  {
    id: "mockup",
    num: "01",
    title: "Maquette Gratuite en 24–48h",
    subtitle: "Votre future interface modélisée sur mesure avant le moindre engagement financier.",
    badge: "LIVRAISON EXPRESS 24H",
  },
  {
    id: "maps",
    num: "02",
    title: "Diagnostic de visibilité locale",
    subtitle:
      "Analysez votre présence locale et identifiez les pistes d’amélioration de votre fiche.",
    badge: "VISIBILITÉ LOCALE",
  },
  {
    id: "ai",
    num: "03",
    title: "Agent IA & WhatsApp 24/7",
    subtitle: "Réponse automatique en 30 secondes et qualification de vos leads sur WhatsApp.",
    badge: "AUTOMATISATION IA",
  },
  {
    id: "video",
    num: "04",
    title: "Tournages Vidéo 4K & Reels",
    subtitle: "Création de contenus haute joaillerie qui imposent la désirabilité de votre marque.",
    badge: "PRODUCTION CINÉMATIQUE",
  },
];

export function NexProInteractiveTools() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through tabs every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative bg-[#070a12] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo de fond bleu nuit / or */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(197,168,128,.16) 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête style NexPro */}
        <div className="sec-head max-w-4xl">
          <div className="sec-head-line">
            <div className="sec-head-dash" />
            <span className="mono-nex text-white/70">
              <b className="text-[#c5a880] font-bold">02.B</b> / DÉMOS ET OUTILS INTERACTIFS EN
              DIRECT
            </span>
          </div>

          <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.8rem] text-white">
            Des technologies concrètes,{" "}
            <span className="text-[#dfc39d] font-serif font-light italic">
              testables en temps réel.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Cliquez sur un outil pour observer comment nous transformons votre visibilité en chiffre
            d'affaires prévisible.
          </p>
        </div>

        {/* Grille Outils : Onglets à gauche, Écran dynamique à droite */}
        <div
          className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Colonne Gauche : Les Onglets Interactifs NexPro */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group relative py-6 text-left transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-85"
                  }`}
                >
                  {/* Barre de progression active */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c5a880] to-emerald-400 animate-pulse" />
                  )}

                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#c5a880] pt-1">
                      {tab.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-nex text-xl sm:text-2xl text-white group-hover:text-[#dfc39d] transition">
                          {tab.title}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed transition-all duration-500 overflow-hidden ${
                          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {tab.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Colonne Droite : L'Écran Dynamique Interactif */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-b from-[#0f1422] to-[#080b12] p-6 sm:p-8 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl min-h-[440px] flex flex-col justify-between">
              {/* Barre Supérieure du Terminal */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                    XR STUDIO ENGINE · LIVE SIMULATOR
                  </span>
                </div>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                  ● DÉMO OPÉRATIONNELLE
                </span>
              </div>

              {/* Contenu Dynamique selon l'onglet actif */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                {/* SCÈNE 1 : MAQUETTE SOUS 24H */}
                {activeTab === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#c5a880] uppercase tracking-wider">
                        Étape 01 · Choix de votre univers
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white">
                        Délai : 24h chrono
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        "Hôtellerie & Luxe",
                        "Restaurant Gastronomique",
                        "Immobilier & Patrimoine",
                        "Artisanat Bâtiment",
                      ].map((sec, i) => (
                        <div
                          key={i}
                          className={`rounded-2xl border p-3.5 text-xs font-semibold text-center transition ${
                            i === 0
                              ? "border-[#c5a880] bg-[#c5a880]/15 text-[#e5cba4]"
                              : "border-white/10 bg-white/5 text-neutral-400"
                          }`}
                        >
                          {sec}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Maquette interactive sur smartphone & PC
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            Recevez un lien privé pour tester votre futur site
                          </p>
                        </div>
                      </div>
                      <a href="#quote" className="btn-nex text-xs shrink-0">
                        Commander ma maquette
                      </a>
                    </div>
                  </div>
                )}

                {/* SCÈNE 2 : DIAGNOSTIC DE VISIBILITÉ LOCALE */}
                {activeTab === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#ea4335]" />
                        <span className="font-mono text-xs text-white">
                          Requête : « Restaurant gastronomique Cannes »
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                        TOP 1 DÉTECTÉ
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-black text-emerald-400">
                            EXEMPLE
                          </span>
                          <div>
                            <p className="text-xs font-bold text-white">
                              Maison Lumière — Table Étoilée (Client XR)
                            </p>
                            <p className="text-[10px] text-neutral-300">
                              Fiche illustrative · données fictives
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-400 px-3 py-1 font-mono text-[10px] font-black text-black">
                          +150 APPELS / MOIS
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 opacity-60">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-neutral-400">#2</span>
                          <div>
                            <p className="text-xs font-semibold text-neutral-300">
                              Établissement de démonstration
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              Exemple fictif · aucune note réelle
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">Concurrent</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 italic text-center">
                      Maquette illustrative avec données fictives — aucun classement Google n’est
                      garanti.
                    </p>
                  </div>
                )}

                {/* SCÈNE 3 : AGENT IA & WHATSAPP */}
                {activeTab === 2 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <MessageCircle className="h-4 w-4" />
                      <span>Simulation conversationnelle WhatsApp en direct</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="max-w-[80%] rounded-2xl bg-white/10 p-3 text-white">
                        <span className="block text-[9px] font-mono text-neutral-400 mb-1">
                          PROSPECT · 14:32
                        </span>
                        « Bonjour, je cherche une suite avec terrasse vue mer pour ce week-end, vous
                        avez des disponibilités ? »
                      </div>

                      <div className="ml-auto max-w-[80%] rounded-2xl bg-[#005c4b] p-3 text-white border border-emerald-400/30">
                        <span className="block text-[9px] font-mono text-emerald-300 mb-1">
                          AGENT IA XR · 14:32 (Réponse en 3s)
                        </span>
                        « Bonjour Monsieur ! Il nous reste la Suite Azur 302 avec terrasse
                        panoramique. Souhaitez-vous la bloquer directement au tarif préférentiel de
                        420 € ? »
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center text-[11px] text-neutral-300">
                      ⚡ Zéro prospect perdu en dehors des horaires d'ouverture.
                    </div>
                  </div>
                )}

                {/* SCÈNE 4 : TOURNAGES VIDÉO 4K */}
                {activeTab === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#c5a880] uppercase">
                        Production Audiovisuelle & Reels 4K
                      </span>
                      <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 font-mono text-[10px] text-rose-300">
                        480 000 VUES GÉNÉRÉES
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          title: "Tournage Culinaire",
                          stats: "+120k vues",
                          format: "9:16 vertical",
                        },
                        { title: "Drone & Domaine", stats: "+210k vues", format: "4K cinéma" },
                        { title: "Storytelling Atelier", stats: "+150k vues", format: "Interview" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-black/50 p-3 text-center"
                        >
                          <div className="grid h-10 w-10 mx-auto place-items-center rounded-xl bg-white/10 text-white mb-2">
                            <Video className="h-5 w-5 text-[#c5a880]" />
                          </div>
                          <p className="text-xs font-bold text-white">{item.title}</p>
                          <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                            {item.stats}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-neutral-400 text-center">
                      Scénarisation, tournage sur site, montage ultra-dynamique et publication
                      sponsorisée.
                    </p>
                  </div>
                )}
              </div>

              {/* Pied de l'Écran */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                <span className="font-mono text-[10px] text-neutral-400">
                  Technologie propriétaire XR Agency
                </span>
                <a
                  href="#quote"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#c5a880] hover:text-white transition"
                >
                  Intégrer cette solution à mon projet →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
