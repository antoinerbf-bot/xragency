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
import { AddToCartBtn } from "./Cart";

interface ServicePillarDeepBlocksProps {
  serviceId: string;
}

export function AgencyVsXrComparisonDuelBlock() {
  const rows = [
    {
      criterion: "Délai de mise en production",
      classic: "Délais variables selon le périmètre, les contenus et les validations",
      xr: "Planning estimatif communiqué après cadrage et validation du périmètre",
    },
    {
      criterion: "Direction Artistique & Photographie",
      classic: "Approche standardisée sans direction artistique dédiée",
      xr: "Direction artistique définie selon votre marque, vos publics et vos usages",
    },
    {
      criterion: "Performance Technique & Vitesse",
      classic: "Performances dépendantes de la solution, du contenu et de l’hébergement",
      xr: "Architecture et optimisation adaptées au besoin, sans score garanti",
    },
    {
      criterion: "Ingénierie de Conversion (CRO)",
      classic: "Simple formulaire de contact passif en bas de page",
      xr: "Simulateurs interactifs, Configurateur 3 étapes & Tunnel WhatsApp",
    },
    {
      criterion: "Suivi & Interlocuteur",
      classic: "Chef de projet junior changeant, tickets payants",
      xr: "Un interlocuteur et des modalités de suivi définis dans le devis",
    },
    {
      criterion: "Impact Commercial & ROI",
      classic: "Site vitrine statique sans suivi des appels",
      xr: "Outils de suivi prévus au périmètre et documentés avant le lancement",
    },
  ];

  return (
    <section
      className="py-16 bg-[#f5f1e8] border-b border-[#ded8cc] text-[#24231f]"
      data-testid="duel-comparatif-table-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#b08d60]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#b08d60]">
            TABLEAU DUEL COMPARATIF OFFICIEL
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#24231f]">
            Agence Web Classique <span className="text-slate-500">vs</span>{" "}
            <span className="text-[#b08d60]">XR Agency</span>
          </h2>
          <p className="text-sm text-[#5f5a51]">
            Pourquoi les dirigeants exigeants remplacent leur site vitrine passif par notre
            architecture haute conversion.
          </p>
        </div>

        <div className="rounded-2xl bg-[#ffffff] border border-[#b08d60]/40 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f5f1e8] border-b border-[#ded8cc] font-mono uppercase text-xs">
                  <th className="py-4 px-5 text-[#746d62]">Critère Décisif</th>
                  <th className="py-4 px-5 text-rose-400">Agence Web Classique</th>
                  <th className="py-4 px-5 text-[#55745f]">XR Agency (Standard Romain)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-white/5 transition">
                    <td className="py-4 px-5 font-bold text-[#24231f]">{r.criterion}</td>
                    <td className="py-4 px-5 text-[#746d62]">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{r.classic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-[#24231f] font-semibold bg-[#55745f]/5">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#55745f] shrink-0 mt-0.5" />
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
      className="py-16 bg-[#f5f1e8] border-b border-[#ded8cc] text-[#24231f]"
      data-testid="maps-nfc-pack-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[#ffffff] border-2 border-[#b08d60]/60 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b08d60]/15 border border-[#b08d60]/40 text-[11px] font-mono uppercase tracking-widest text-[#b08d60]">
              <Wifi className="w-3.5 h-3.5" />
              MATÉRIEL CONNECTÉ EXCLUSIF • CO-PILOTÉ PAR MARTIN
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#24231f]">
              Pack Plaques Comptoir & Cartes <span className="text-[#b08d60]">NFC Connectées</span>
            </h2>
            <p className="text-sm text-[#5f5a51] leading-relaxed">
              Transformez chaque passage client au comptoir ou en caisse en un avis 5★ vérifié sur
              Google Maps en moins de 3 secondes, sans recherche manuelle ni friction.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2">
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded8cc]">
                <CheckCircle2 className="w-4 h-4 text-[#55745f] shrink-0" />
                <span>3 Plaques Comptoir Acrylique Noir & Gravure Or</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded8cc]">
                <CheckCircle2 className="w-4 h-4 text-[#55745f] shrink-0" />
                <span>5 Cartes NFC Métal Brossé pour votre équipe</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded8cc]">
                <CheckCircle2 className="w-4 h-4 text-[#55745f] shrink-0" />
                <span>Puce NTAG216 + QR Code laser haute densité</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded8cc]">
                <CheckCircle2 className="w-4 h-4 text-[#55745f] shrink-0" />
                <span>Pré-programmation directe vers votre fiche GBP</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#f5f1e8] border border-[#b08d60]/40 space-y-4 text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-[#b08d60]">
              PACK MATÉRIEL PRÊT À L'EMPLOI
            </div>
            <div className="text-4xl font-mono font-bold text-[#24231f]">
              290 € <span className="text-sm font-normal text-[#746d62]">HT</span>
            </div>
            <p className="text-xs text-[#746d62]">
              Livraison express configurée • Zéro abonnement matériel • Inclus ou cumulable avec nos
              forfaits Google Maps.
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
      className="py-16 bg-[#f5f1e8] border-b border-[#ded8cc] text-[#24231f]"
      data-testid="seo-4-step-protocol-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#b08d60]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#b08d60]">
            MÉTHODOLOGIE PROPRIÉTAIRE • PILOTÉE PAR HUGO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#24231f]">
            Le Protocole SEO en <span className="text-[#b08d60]">4 Étapes Chirurgicales</span>
          </h2>
          <p className="text-sm text-[#5f5a51]">
            Une exécution méthodique conçue pour capter les prospects qui cherchent activement vos
            prestations sur Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#ffffff] border border-[#ded8cc] hover:border-[#b08d60]/60 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#b08d60]/15 text-[#b08d60] border border-[#b08d60]/30">
                  {st.num}
                </span>
                <span className="text-xs font-mono text-[#55745f]">{st.kpi}</span>
              </div>
              <h3 className="text-lg font-bold text-[#24231f]">{st.title}</h3>
              <p className="text-xs sm:text-sm text-[#5f5a51] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePillarDeepBlocks({ serviceId }: ServicePillarDeepBlocksProps) {
  return (
    <div className="bg-[#f5f1e8]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-[#b08d60]/30 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8b6b45]">
            Échange projet
          </p>
          <h2 className="mt-3 font-serif text-2xl text-[#24231f] sm:text-3xl">
            Parlons du périmètre adapté à votre activité.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f5a51]">
            Nous étudions votre besoin, clarifions les livrables et confirmons les délais et
            conditions dans une proposition écrite.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b08d60] px-5 py-3 text-sm font-semibold text-[#24231f]"
          >
            Contacter XR Agency <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Service-specific deep blocks */}
      {serviceId === "maps" && <MapsNfcHardwarePackBlock />}
      {(serviceId === "websites" || serviceId === "refonte") && <AgencyVsXrComparisonDuelBlock />}
      {serviceId === "seo" && <SeoFourStepProtocolBlock />}
    </div>
  );
}
export default ServicePillarDeepBlocks;
