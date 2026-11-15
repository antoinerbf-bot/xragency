import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Smartphone,
  Star,
  TrendingUp,
  Utensils,
  Zap,
} from "lucide-react";
import sectorRestaurant from "@/assets/sector-restaurant.jpg";
import storyRestaurantOwner from "@/assets/story-restaurant-owner.jpg";

export function PokeCaseStudySection() {
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("solution");

  return (
    <section id="poke-n-ball" className="relative py-20 sm:py-28 bg-[#030406] text-white border-t border-white/10 overflow-hidden scroll-mt-20">
      <div id="case-study-poke" className="absolute -top-10" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-300">
              ÉTUDE DE CAS RÉELLE · PROJET CLIENT DOCUMENTÉ
            </span>
          </div>
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[9px] text-neutral-300">
            PARIS 11E · RESTAURATION RAPIDE PREMIUM
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Showcase Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl border border-[#d4af37]/40 bg-[#07090e] p-3 sm:p-4 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
              <img
                src={sectorRestaurant}
                alt="Poke-N-Ball - Expérience Digitale & Restauration Rapide Premium"
                className="rounded-2xl object-cover w-full h-[320px] sm:h-[420px] brightness-90 hover:scale-[1.02] transition duration-500"
              />

              {/* Verified Deliverable Badges */}
              <div className="absolute top-6 left-6 rounded-2xl bg-black/85 border border-white/15 px-3.5 py-2 backdrop-blur-md shadow-2xl flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] grid place-items-center">
                  <Star className="h-4 w-4 text-[#d4af37] fill-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Google Maps</p>
                  <p className="text-xs font-bold text-white">Profil &amp; Visibilité Locale</p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 rounded-2xl bg-[#090b10]/90 border border-emerald-500/40 px-4 py-2.5 backdrop-blur-md shadow-2xl flex items-center gap-3">
                <Utensils className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">0% Commission</p>
                  <p className="text-xs font-bold text-white">Commande Directe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Story & Tabs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="font-mono text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                CLIENT RÉEL LIVRÉ · RESTAURATION RAPIDE
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
                Poke-N-Ball Paris
              </h2>
              <p className="mt-1 text-sm font-medium text-neutral-300">
                Déploiement d&apos;un écosystème digital complet : plateforme de commande directe, système POS de caisse synchronisé et présence locale.
              </p>
            </div>

            {/* Interactive Switcher */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              {[
                { id: "solution" as const, label: "1. Livrables Réalisés" },
                { id: "results" as const, label: "2. Bénéfices Métier" },
                { id: "challenge" as const, label: "3. Problématique Initiale" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    activeTab === tab.id
                      ? "bg-[#d4af37] text-black shadow-md"
                      : "bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content by Tab */}
            {activeTab === "solution" && (
              <div className="space-y-3.5 animate-in fade-in text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>1. Site Web &amp; Commande en ligne directe :</strong> Menu digital fluide, paiement en ligne sécurisé et zéro commission tierce reversée.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>2. Système de Caisse POS Connecté :</strong> Gestion des commandes en cuisine et tickets de caisse synchronisés avec le stock.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>3. Expérience Client Mobile :</strong> Parcours de commande Click &amp; Collect optimisé pour les clients réguliers du quartier.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>4. Fiche Google Business Profile :</strong> Photos professionnelles des plats, horaires à jour et récolte simplifiée des avis clients.</span>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl sm:text-2xl font-black text-emerald-400 font-serif">100% Autonome</p>
                    <p className="mt-1 text-xs text-neutral-300 font-medium">Canal de commande directe sans dépendre uniquement des agrégateurs</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl sm:text-2xl font-black text-[#d4af37] font-serif">0 € Commission</p>
                    <p className="mt-1 text-xs text-neutral-300 font-medium">Sur chaque commande enregistrée directement sur la plateforme</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  L&apos;établissement dispose désormais de son propre fichier client, de son outil de caisse et d&apos;une vitrine moderne valorisant la qualité de ses préparations.
                </p>
              </div>
            )}

            {activeTab === "challenge" && (
              <div className="space-y-3 animate-in fade-in text-xs text-neutral-300 leading-relaxed">
                <p>
                  Dans un secteur ultra-dense comme Paris 11e, Poke-N-Ball subissait des commissions de 30% imposées par les applications tierces, tout en restant invisible sur les recherches locales directes (&quot;meilleur poké paris 11&quot;).
                </p>
                <p>
                  Leur objectif était clair : posséder leur propre outil de vente et capter la clientèle de bureau et de quartier en direct.
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] hover:bg-[#e8cfa6] px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition shadow-lg"
              >
                <span>Obtenir le même résultat pour mon entreprise</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#packs"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs font-bold text-white transition"
              >
                <span>Voir les 3 Packs</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
