import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface WhyItem {
  num: string;
  title: string;
  lead: string;
  details: string[];
}

const WHY_ITEMS: WhyItem[] = [
  {
    num: "01",
    title: "Conçu par des entrepreneurs de terrain",
    lead: "Nous dirigeons nos propres structures commerciales au quotidien. Nous connaissons vos marges, vos devis et la réalité du closing.",
    details: [
      "Zéro jargon théorique : nous parlons chiffre d'affaires et retour sur investissement",
      "Systèmes testés en conditions réelles avant d'être déployés pour nos clients",
      "Solutions concrètes orientées acquisition directe (téléphone, WhatsApp, devis)",
    ],
  },
  {
    num: "02",
    title: "Des réalisations sur mesure, zéro template générique",
    lead: "Chaque marque, restaurant, domaine ou cabinet bénéficie d'une architecture singulière. Nous ne clonons pas de thèmes WordPress préconçus.",
    details: [
      "Direction artistique de prestige adaptée à votre secteur d'activité",
      "Performance technique, sécurité et hébergement adaptés au projet",
      "Conversion mobile first : vos prospects commandent en 2 taps",
    ],
  },
  {
    num: "03",
    title: "Un interlocuteur dédié & un suivi clair",
    lead: "De la première discussion jusqu'au lancement en ligne, vous échangez directement avec votre directeur de projet dédié.",
    details: [
      "Une proposition adaptée au périmètre : vous validez la direction avant la production",
      "Pas de chaîne d'intermédiaires ni de tickets support sans fin",
      "Cadre contractuel et périmètre définis avant le démarrage",
    ],
  },
];

export function NexProWhySection() {
  return (
    <section id="pourquoi" className="relative bg-[#06080d] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo de lumière or */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full opacity-10 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #dfc39d 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête de section style NexPro */}
        <div className="sec-head max-w-3xl">
          <div className="sec-head-line">
            <div className="sec-head-dash" />
            <span className="mono-nex text-white/70">
              <b className="text-[#c5a880] font-bold">03</b> / POURQUOI XR AGENCY
            </span>
          </div>

          <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.8rem] text-white">
            Une agence de terrain.{" "}
            <span className="text-[#dfc39d] font-serif font-light italic">
              Pas des théoriciens.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Pourquoi les artisans, professionnels libéraux, hôteliers et marques prestigieuses nous confient leur acquisition digitale.
          </p>
        </div>

        {/* 3 Lignes Numérotées Style NexPro Why */}
        <div className="mt-14 divide-y divide-white/10 border-t border-b border-white/10">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.num}
              className="group grid grid-cols-1 gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:items-baseline transition duration-300 hover:bg-white/[0.02]"
            >
              {/* Grand Numéro NexPro */}
              <div className="lg:col-span-2">
                <span className="h-nex text-5xl sm:text-6xl lg:text-7xl text-[#c5a880] tracking-tighter opacity-80 group-hover:opacity-100 transition">
                  {item.num}
                </span>
              </div>

              {/* Titre & Proposition */}
              <div className="lg:col-span-5">
                <h3 className="h-nex text-2xl sm:text-3xl text-white group-hover:text-[#dfc39d] transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-md">
                  {item.lead}
                </p>
              </div>

              {/* Détails & Garanties */}
              <div className="lg:col-span-5">
                <ul className="space-y-2.5">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bandeau d'engagement réactivité */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-[#c5a880]/30 bg-gradient-to-r from-[#171410] via-[#0d1017] to-[#0a0c12] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/40 shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Testez notre réactivité dès aujourd'hui
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400">
                Recevez votre première ébauche de maquette personnalisée sous 24 à 48h, sans engagement.
              </p>
            </div>
          </div>

          <a
            href="#quote"
            className="btn-nex text-xs uppercase tracking-wider shrink-0"
          >
            <span>Obtenir ma maquette gratuite</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
