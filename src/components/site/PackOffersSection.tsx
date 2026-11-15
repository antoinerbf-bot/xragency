import { useState } from "react";
import {
  ArrowRight,
  Check,
  Crown,
  Flame,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import svcMapsEditorial from "@/assets/svc-maps-editorial.jpg";
import svcWebEditorial from "@/assets/svc-web-editorial.jpg";
import svcBrandingEditorial from "@/assets/svc-branding-editorial.jpg";

const WHATSAPP_PHONE = "33767566783";

interface Pack {
  id: string;
  name: string;
  tagline: string;
  photo: string;
  priceEur: number;
  monthlyEur?: number;
  installments?: string;
  popular?: boolean;
  deliveryDays: string;
  savingsEur?: number;
  deliverables: string[];
  ctaLabel: string;
  waMessage: string;
}

const STRATEGIC_PACKS: Pack[] = [
  {
    id: "pack-visibilite",
    name: "Pack Visibilité Immédiate",
    tagline: "Pour commerces, restaurants et artisans qui veulent dépasser leurs concurrents locaux sur Google Maps en 21 jours.",
    photo: svcMapsEditorial,
    priceEur: 990,
    installments: "ou 2x 495 € sans frais",
    deliveryDays: "Livré sous 5 à 7 jours",
    deliverables: [
      "Conquête Google Maps Top 3 (valeur 550 €)",
      "Audit concurrentiel & mots-clés de votre zone de chalandise",
      "Restructuration complète de votre fiche Google Business",
      "Page mobile ultra-rapide de conversion (Click-to-Call, itinéraire)",
      "Stratégie d'acquisition d'avis 5 étoiles authentiques",
      "1 mois de maintenance Maps Care inclus",
    ],
    ctaLabel: "Choisir le Pack Visibilité",
    waMessage: "Bonjour Antoine, je souhaite réserver le Pack Visibilité Immédiate à 990 € pour positionner mon entreprise dans le Top 3 Google Maps.",
  },
  {
    id: "pack-agence-pro",
    name: "Pack Agence Tout-en-Un",
    tagline: "La solution clé en main complète : votre marque, votre site web sur-mesure et vos premiers clients locaux dès la semaine prochaine.",
    photo: svcWebEditorial,
    priceEur: 1290,
    installments: "ou 3x 430 € sans frais",
    popular: true,
    savingsEur: 358,
    deliveryDays: "Livré sous 5 à 7 jours ouvrés",
    deliverables: [
      "Site Web Business sur-mesure TanStack / React 19 (valeur 799 €)",
      "Conquête Google Maps Top 3 local (valeur 550 €)",
      "Pack Logo & Identité Visuelle complète (valeur 299 €)",
      "Performance PageSpeed 95+ garantie & responsive mobile",
      "Formulaire de qualification & intégration WhatsApp direct",
      "Hébergement haute disponibilité 1 an offert (valeur 79 €)",
      "100% propriétaire de votre code et nom de domaine",
    ],
    ctaLabel: "Choisir le Pack Best-Seller",
    waMessage: "Bonjour Antoine, je souhaite démarrer le Pack Agence Tout-en-Un (1 290 €) pour créer mon site, mon identité et ma visibilité Google.",
  },
  {
    id: "pack-domination",
    name: "Pack Domination & Croissance",
    tagline: "Pour les marques et entreprises qui veulent écraser la concurrence locale et déléguer 100% de leur acquisition digitale.",
    photo: svcBrandingEditorial,
    priceEur: 1499,
    monthlyEur: 499,
    deliveryDays: "Livré sous 7 à 10 jours ouvrés",
    deliverables: [
      "Plateforme E-commerce ou Réservation avancée (valeur 1 499 €)",
      "Gestion & optimisation continue Google Maps Care chaque semaine",
      "Stratégie de référencement SEO Local & rédactions mensuelles",
      "Gestion des Réseaux Sociaux & publications visuelles ciblées",
      "Suivi mensuel des conversions & analyse des appels générés",
      "Ligne directe WhatsApp avec la Direction 6j/7",
    ],
    ctaLabel: "Lancer le Pack Domination",
    waMessage: "Bonjour Antoine, je souhaite échanger sur le Pack Domination & Croissance pour mon entreprise afin de déléguer mon acquisition.",
  },
];

export function PackOffersSection() {
  const [selectedPackId, setSelectedPackId] = useState<string>("pack-agence-pro");

  const buildWaUrl = (msg: string) => {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="offres" className="relative py-20 sm:py-28 bg-[#030406] text-white overflow-hidden border-t border-white/10 scroll-mt-20">
      <div id="packs" className="absolute -top-10" />
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[90%] max-w-[1200px] rounded-full bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/[0.02] to-transparent blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 backdrop-blur-xl shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              FORMULES STRATÉGIQUES · PRIX FERMES SANS SURCOÛT
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            3 Packs Conçus pour <br className="hidden sm:inline" />
            <span className="font-serif font-light italic text-[#d4af37]">Vendre Immédiatement.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Pas de jargon ni de devis à rallonge. Des forfaits clés en main avec des livrables précis,
            un délai garanti de 5 à 7 jours ouvrés et un accompagnement humain direct.
          </p>

          {/* Trust Guarantees Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-neutral-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> 0 € de frais cachés
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <Clock className="h-4 w-4" /> Livré en 5 à 7 jours ouvrés
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="h-4 w-4" /> 100% Propriétaire de votre site
            </span>
          </div>
        </div>

        {/* 3 Strategic Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {STRATEGIC_PACKS.map((pack) => {
            const isSelected = selectedPackId === pack.id;
            const isPopular = pack.popular;

            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPackId(pack.id)}
                className={cn(
                  "relative rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-xl overflow-hidden",
                  isPopular
                    ? "border-[#d4af37] bg-gradient-to-b from-[#14120a] via-[#090b10] to-[#040508] shadow-[0_0_50px_rgba(212,175,55,0.22)] md:-translate-y-3"
                    : isSelected
                    ? "border-[#d4af37]/60 bg-[#090b10] shadow-2xl"
                    : "border-white/10 bg-[#06070a]/80 hover:border-white/25"
                )}
              >
                {/* Popularity Badge */}
                {isPopular && (
                  <div className="absolute top-3 right-4 z-20 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b45309] px-3.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#050608] shadow-lg flex items-center gap-1.5">
                    <Crown className="h-3 w-3 fill-current" />
                    <span>BEST-SELLER · -358 €</span>
                  </div>
                )}

                <div>
                  {/* Photo Banner with real editorial image */}
                  <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10 h-36 w-full">
                    <img
                      src={pack.photo}
                      alt={pack.name}
                      className="h-full w-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#d4af37] bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                        {pack.deliveryDays}
                      </span>
                      {pack.savingsEur && (
                        <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                          -{pack.savingsEur} € remise
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Header Title & Price */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                      {pack.name}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed min-h-[36px]">
                      {pack.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="mt-6 border-y border-white/10 py-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white font-serif tracking-tight">
                        {pack.priceEur.toLocaleString("fr-FR")} €
                      </span>
                      {pack.monthlyEur ? (
                        <span className="text-xs font-semibold text-neutral-300">
                          + {pack.monthlyEur} € / mois
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-400">
                          Paiement unique
                        </span>
                      )}
                    </div>
                    {pack.installments && (
                      <p className="mt-1 font-mono text-[10px] text-amber-300/80 font-medium">
                        {pack.installments}
                      </p>
                    )}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 space-y-3">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                      Ce qui est inclus dans votre prestation :
                    </p>
                    <ul className="space-y-2.5">
                      {pack.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <div className="h-4 w-4 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 grid place-items-center shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5 text-[#d4af37]" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Dual Action Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
                  <a
                    href={`#quote`}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 text-xs font-black uppercase tracking-wider transition shadow-xl",
                      isPopular
                        ? "bg-gradient-to-r from-[#f3e8c8] via-[#d4af37] to-[#8f7422] text-[#050608] hover:scale-[1.02]"
                        : "bg-white text-black hover:bg-neutral-200"
                    )}
                  >
                    <span>{pack.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href={buildWaUrl(pack.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl py-2.5 px-4 text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Valider sur WhatsApp en 1 clic</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Prompt */}
        <div className="mt-12 text-center rounded-2xl border border-white/10 bg-[#090b10] p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-white">Besoin d&apos;une solution sur-mesure ou spécifique ?</p>
            <p className="text-xs text-neutral-400">Application métier, robotique de service, refonte complexe ou réseau multi-sites.</p>
          </div>
          <a
            href="#quote"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/10 px-4 py-2.5 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37]/20 transition"
          >
            <span>Configurateur Express</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
