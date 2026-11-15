import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Wifi,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { getAdvisorByService } from "../../lib/xr-advisors";
import { AdvisorContextualBanner } from "./AdvisorsShowcase";
import { AddToCartBtn } from "./Cart";

interface ServicePillarDeepBlocksProps {
  serviceId: string;
}

export function AgencyVsXrComparisonDuelBlock() {
  const rows = [
    {
      criterion: "Délai de mise en production",
      classic: "8 à 16 semaines (réunions interminables, retards)",
      xr: "7 à 14 jours ouvrés (Sprint commando dirigé par Romain)",
    },
    {
      criterion: "Direction Artistique & Photographie",
      classic: "Templates génériques ou visuels IA 3D artificiels",
      xr: "Dark Luxury sur-mesure (#080B10 & #D4AF37), portraits studio 85mm",
    },
    {
      criterion: "Performance Technique & Vitesse",
      classic: "WordPress lourd (Score Lighthouse 45–65/100)",
      xr: "Architecture React/Edge moderne (Lighthouse 98–100/100)",
    },
    {
      criterion: "Ingénierie de Conversion (CRO)",
      classic: "Simple formulaire de contact passif en bas de page",
      xr: "Simulateurs interactifs, Configurateur 3 étapes & Tunnel WhatsApp",
    },
    {
      criterion: "Suivi & Interlocuteur",
      classic: "Chef de projet junior changeant, tickets payants",
      xr: "Romain (Sites) + Julie (WebCare SLA < 4h) en ligne directe",
    },
    {
      criterion: "Impact Commercial & ROI",
      classic: "Site vitrine statique sans suivi des appels",
      xr: "Machine d'acquisition tracée (Appels, Devis PDF, CRM Supabase)",
    },
  ];

  return (
    <section
      className="py-16 bg-[#080B10] border-b border-white/10 text-[#F8FAFC]"
      data-testid="duel-comparatif-table-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#D4AF37]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            TABLEAU DUEL COMPARATIF OFFICIEL
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Agence Web Classique <span className="text-slate-500">vs</span>{" "}
            <span className="text-[#D4AF37]">XR Agency</span>
          </h2>
          <p className="text-sm text-slate-300">
            Pourquoi les dirigeants exigeants remplacent leur site vitrine passif par notre architecture haute conversion.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0F172A] border border-[#D4AF37]/40 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#080B10] border-b border-white/10 font-mono uppercase text-xs">
                  <th className="py-4 px-5 text-slate-400">Critère Décisif</th>
                  <th className="py-4 px-5 text-rose-400">
                    Agence Web Classique
                  </th>
                  <th className="py-4 px-5 text-[#10B981]">
                    XR Agency (Standard Romain)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-white/5 transition">
                    <td className="py-4 px-5 font-bold text-white">
                      {r.criterion}
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{r.classic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-white font-semibold bg-[#10B981]/5">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{r.xr}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MapsNfcHardwarePackBlock() {
  return (
    <section
      className="py-16 bg-[#080B10] border-b border-white/10 text-[#F8FAFC]"
      data-testid="maps-nfc-pack-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[#0F172A] border-2 border-[#D4AF37]/60 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              <Wifi className="w-3.5 h-3.5" />
              MATÉRIEL CONNECTÉ EXCLUSIF • CO-PILOTÉ PAR MARTIN
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Pack Plaques Comptoir & Cartes{" "}
              <span className="text-[#D4AF37]">NFC Connectées</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Transformez chaque passage client au comptoir ou en caisse en un avis 5★ vérifié sur Google Maps en moins de 3 secondes, sans recherche manuelle ni friction.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2">
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080B10] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>3 Plaques Comptoir Acrylique Noir & Gravure Or</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080B10] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>5 Cartes NFC Métal Brossé pour votre équipe</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080B10] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Puce NTAG216 + QR Code laser haute densité</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080B10] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Pré-programmation directe vers votre fiche GBP</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080B10] border border-[#D4AF37]/40 space-y-4 text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              PACK MATÉRIEL PRÊT À L'EMPLOI
            </div>
            <div className="text-4xl font-mono font-bold text-white">
              290 € <span className="text-sm font-normal text-slate-400">HT</span>
            </div>
            <p className="text-xs text-slate-400">
              Livraison express configurée • Zéro abonnement matériel • Inclus ou cumulable avec nos forfaits Google Maps.
            </p>
            <AddToCartBtn
              item={{
                serviceId: "maps_nfc_pack",
                serviceName: "Google Maps & NFC",
                planName: "Pack 3 Plaques Comptoir + 5 Cartes NFC Or/Noir",
                priceEur: 290,
                period: "once",
                periodLabel: "Forfait matériel",
              }}
              popular
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoFourStepProtocolBlock() {
  const steps = [
    {
      num: "ÉTAPE 01",
      title: "Audit Chirurgical & Déblocage d'Indexation",
      desc: "Correction des erreurs d'exploration, optimisation du budget de crawl, temps de réponse serveur (< 150ms), balisage Schema.org LocalBusiness & FAQPage.",
      kpi: "100% des pages stratégiques indexées",
    },
    {
      num: "ÉTAPE 02",
      title: "Architecture en Silos & Cocons Sémantiques",
      desc: "Cartographie des requêtes à intention transactionnelle directe et structuration d'un maillage interne hermétique qui concentre le PageRank sur vos pages de vente.",
      kpi: "+180% de mots-clés en Top 10",
    },
    {
      num: "ÉTAPE 03",
      title: "Pages Locales & Sectorielles Haute Conversion",
      desc: "Rédaction éditoriale experte orientée prise de rendez-vous et demande de devis, calibrée pour surpasser la densité sémantique des 3 premiers résultats.",
      kpi: "Taux de clic organique > 8,5%",
    },
    {
      num: "ÉTAPE 04",
      title: "Autorité de Domaine & Netlinking Chirurgical",
      desc: "Acquisition mensuelle de liens contextuels depuis des médias thématiques vérifiés pour verrouiller durablement vos positions face aux concurrents.",
      kpi: "Croissance continue du trafic qualifié",
    },
  ];

  return (
    <section
      className="py-16 bg-[#080B10] border-b border-white/10 text-[#F8FAFC]"
      data-testid="seo-4-step-protocol-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#D4AF37]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            MÉTHODOLOGIE PROPRIÉTAIRE • PILOTÉE PAR HUGO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Le Protocole SEO en{" "}
            <span className="text-[#D4AF37]">4 Étapes Chirurgicales</span>
          </h2>
          <p className="text-sm text-slate-300">
            Une exécution méthodique conçue pour capter les prospects qui cherchent activement vos prestations sur Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 hover:border-[#D4AF37]/60 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  {st.num}
                </span>
                <span className="text-xs font-mono text-[#10B981]">
                  {st.kpi}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{st.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePillarDeepBlocks({
  serviceId,
}: ServicePillarDeepBlocksProps) {
  const advisor = getAdvisorByService(serviceId);

  return (
    <div className="bg-[#080B10]">
      {/* Dedicated Human Advisor Attribution Block */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <AdvisorContextualBanner
          advisor={advisor}
          serviceContextLabel={`Service ${serviceId.toUpperCase()}`}
        />
      </div>

      {/* Service-specific deep blocks */}
      {serviceId === "maps" && <MapsNfcHardwarePackBlock />}
      {(serviceId === "websites" || serviceId === "refonte") && (
        <AgencyVsXrComparisonDuelBlock />
      )}
      {serviceId === "seo" && <SeoFourStepProtocolBlock />}
    </div>
  );
}
export default ServicePillarDeepBlocks;
