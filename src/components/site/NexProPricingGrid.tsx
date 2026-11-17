import React from "react";
import { ArrowRight, Check, HelpCircle, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { useFunnel } from "@/lib/funnel";

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Formule Essentiel",
    subtitle: "Pour les artisans et professionnels qui veulent une vitrine mobile crédible et rapide.",
    price: "499 €",
    period: "Paiement unique",
    features: [
      "Site vitrine d'une page haute conversion",
      "Design sur mesure adapté à votre métier (zéro template)",
      "Boutons d'appel téléphonique et WhatsApp directs en 1 tap",
      "Optimisation vitesse mobile (score PageSpeed 95+)",
      "Nom de domaine personnalisé et certificat HTTPS sécurisé",
      "Maquette démo offerte sous 24 à 48h",
    ],
    ctaText: "Choisir la formule Essentiel",
  },
  {
    id: "business",
    name: "Formule Business & Pack Local #1",
    subtitle: "Notre formule phare pour dominer Google Maps et capter un flux régulier de clients.",
    price: "999 €",
    period: "Paiement unique",
    popular: true,
    badge: "LE PLUS CHOISI · ROI MAXIMUM",
    features: [
      "Site multi-pages complet (Accueil, Services, Réalisations, Devis)",
      "Domination Google Maps Pack Local Top 3 garanti 1 an (ou remboursé)",
      "Rédaction persuasive de vos textes axée sur la vente",
      "Galerie de réalisations haute définition avec filtre",
      "Système de collecte d'avis 5★ automatisé avec QR Code",
      "Tunnel de demande de devis en ligne sur mesure",
      "Suivi mensuel des positions et des appels générés",
    ],
    ctaText: "Choisir la formule Business",
  },
  {
    id: "sur-mesure",
    name: "Haute Couture & Automatisation IA",
    subtitle: "L'écosystème complet pour les marques et structures ambitieuses.",
    price: "1 499 €",
    period: "À partir de · Sur devis",
    features: [
      "Plateforme web sur mesure ou moteur de réservation direct",
      "Agent IA connecté à WhatsApp 24/7 pour qualifier vos prospects",
      "Tournage vidéo 4K et production de 3 Reels dynamiques",
      "Tunnel de conversion multi-étapes avec calculateur de prix",
      "Intégration directe avec votre CRM interne ou WhatsApp",
      "Accompagnement stratégique mensuel dédié",
    ],
    ctaText: "Configurer mon projet sur mesure",
  },
];

export function NexProPricingGrid() {
  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }

  const handleSelectPlan = (planId: string) => {
    if (funnel) {
      if (planId === "essential") {
        funnel.selectedServices = ["website"];
      } else if (planId === "business") {
        funnel.selectedServices = ["website", "maps", "seo"];
      } else {
        funnel.selectedServices = ["website", "maps", "social", "robotics"];
      }
    }
  };

  return (
    <section id="formules" className="relative bg-[#080a11] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo d'ambiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #c5a880 0%, #2e5fff 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête style NexPro */}
        <div className="sec-head max-w-4xl">
          <div className="sec-head-line">
            <div className="sec-head-dash" />
            <span className="mono-nex text-white/70">
              <b className="text-[#c5a880] font-bold">05</b> / FORMULES CLAIRES & INVESTISSEMENT
            </span>
          </div>

          <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.8rem] text-white">
            Des formules transparentes,{" "}
            <span className="text-[#dfc39d] font-serif font-light italic">
              sans mauvaise surprise.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Chaque formule fait l'objet d'un devis officiel détaillé et d'un contrat clair avec la SASU KARMA (Paris). Pas de frais cachés, pas de surprises.
          </p>
        </div>

        {/* Grille des 3 Cartes de Tarification */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-9 backdrop-blur-2xl transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-[#c5a880] bg-[#11141e]/90 shadow-[0_30px_90px_-20px_rgba(197,168,128,0.25)] lg:-translate-y-2"
                  : "border border-white/10 bg-[#0d1017]/70 hover:border-white/20"
              }`}
            >
              {/* Badge Populaire */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfc39d] px-4 py-1 font-mono text-[9.5px] font-black uppercase tracking-wider text-[#080a10] shadow-lg">
                    <Star className="h-3 w-3 fill-current" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Nom et pitch de la formule */}
                <h3 className="h-nex text-2xl text-white">{plan.name}</h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed min-h-[40px]">
                  {plan.subtitle}
                </p>

                {/* Bloc Prix */}
                <div className="my-6 border-y border-white/10 py-5">
                  <div className="flex items-baseline gap-2">
                    <span className="h-nex text-4xl sm:text-5xl font-black text-white">
                      {plan.price}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-wider mt-1 block">
                    {plan.period}
                  </span>
                </div>

                {/* Liste des prestations incluses */}
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton d'Action */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#quote"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-wider transition duration-300 ${
                    plan.popular
                      ? "bg-[#c5a880] text-[#080a10] shadow-lg shadow-[#c5a880]/30 hover:bg-[#dfc39d]"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bandeau Abonnement Sérénité WebCare (Style NexPro) */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0d1017]/80 p-6 sm:p-8 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-sky-500/20 border border-sky-400/40 px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-sky-300">
                OPTION SÉRÉNITÉ · 49 € / MOIS
              </span>
              <span className="text-xs text-neutral-400">Sans engagement minimum</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Abonnement Sérénité WebCare : zéro maintenance pour vous.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Couvre l'hébergement cloud souverain, la sécurité SSL, les sauvegardes quotidiennes, les petites modifications mensuelles (textes, photos, tarifs) et l'assistance prioritaire 7j/7.
            </p>
          </div>

          <a
            href="#contact"
            className="btn-nex text-xs uppercase tracking-wider shrink-0"
          >
            <span>En savoir plus sur la Sérénité</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
