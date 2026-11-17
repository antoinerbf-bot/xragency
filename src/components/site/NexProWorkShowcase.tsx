import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Globe2, Sparkles } from "lucide-react";
import scLuxe from "@/assets/pf-03-noir-or.jpg";
import scHotel from "@/assets/pf-02-villa-azur.jpg";
import scImmo from "@/assets/pf-04-cabinet-mercier.jpg";
import scFood from "@/assets/pf-01-maison-lumiere.jpg";

interface CaseStudy {
  id: string;
  category: "luxe" | "hotel" | "immo" | "food";
  sectorBadge: string;
  title: string;
  url: string;
  image: string;
  deliveredText: string;
  scope: string;
  results: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "luxe",
    category: "luxe",
    sectorBadge: "Haute Horlogerie & Luxe",
    title: "Maison Noir & Or — Joaillerie Paris",
    url: "maison-noir-or.fr",
    image: scLuxe,
    deliveredText: "Site livrable en 24–48h",
    scope: "Refonte intégrale avec vitrine 3D immersive, storytelling horloger, tunnel de prise de rendez-vous privé et référencement Google Maps.",
    results: "+280% de prises de rendez-vous en salon privé sous 30 jours et positionnement #1 sur Google Maps Paris 8e.",
  },
  {
    id: "hotel",
    category: "hotel",
    sectorBadge: "Hôtellerie & Domaines",
    title: "Villa Azur — Résidence & Suites Privées",
    url: "villa-azur-cannes.com",
    image: scHotel,
    deliveredText: "Système de réservation direct",
    scope: "Plateforme web haute couture avec moteur de réservation en direct sans commissions Booking, visite vidéo 4K et multilingue FR/EN.",
    results: "38 000 € d'économies annuelles en commissions tierces récupérées et taux de conversion direct multiplié par 3.",
  },
  {
    id: "immo",
    category: "immo",
    sectorBadge: "Immobilier & Conseil",
    title: "Cabinet Mercier — Gestion de Patrimoine",
    url: "cabinet-mercier.fr",
    image: scImmo,
    deliveredText: "Génération de leads qualifiés",
    scope: "Architecture sobre et statutaire, simulateur fiscal interactif intégré, automatisation des formulaires WhatsApp et tunnel d'audit patrimonial.",
    results: "45 dossiers qualifiés par mois dès le premier trimestre avec un coût par lead divisé par deux.",
  },
  {
    id: "food",
    category: "food",
    sectorBadge: "Gastronomie & Restauration",
    title: "Maison Lumière — Table Étoilée",
    url: "maison-lumiere-paris.fr",
    image: scFood,
    deliveredText: "Pack Local Google Maps #1",
    scope: "Création de site vitrine ultra-rapide, menu digital interactif sur QR Code, pack domination Google Maps et gestion automatisée des avis 5★.",
    results: "+150 couverts réservés en direct chaque semaine via le profil Google Maps optimisé.",
  },
];

export function NexProWorkShowcase() {
  const [filter, setFilter] = useState<"all" | "luxe" | "hotel" | "immo" | "food">("all");

  const filtered = filter === "all" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <section id="realisations" className="relative bg-[#07090e] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo d'ambiance or/bronze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #c5a880 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête de section format NexPro Digital */}
        <div className="sec-head max-w-4xl">
          <div className="sec-head-line">
            <div className="sec-head-dash" />
            <span className="mono-nex text-white/70">
              <b className="text-[#c5a880] font-bold">03</b> / NOS RÉALISATIONS & ÉTUDES DE CAS
            </span>
          </div>

          <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.8rem] text-white">
            Des projets concrets,{" "}
            <span className="text-[#dfc39d] font-serif font-light italic">
              des marques qui grandissent.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Pas de templates génériques. Chaque projet est pensé pour votre activité, vos clients cibles et la façon dont ils vous cherchent sur Google et mobile.
          </p>
        </div>

        {/* Filtres par secteur style NexPro Chips */}
        <div className="mt-8 mb-12 flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Toutes nos réalisations" },
            { id: "luxe", label: "Luxe & Horlogerie" },
            { id: "hotel", label: "Hôtellerie & Domaines" },
            { id: "immo", label: "Patrimoine & Conseil" },
            { id: "food", label: "Gastronomie & Tables" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id as typeof filter)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition ${
                filter === cat.id
                  ? "bg-[#c5a880] text-[#080a10] shadow-[0_0_20px_rgba(197,168,128,0.35)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-[#c5a880]/50 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des Études de Cas avec Frame Navigateur Réaliste */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {filtered.map((item, idx) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d1017]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#c5a880]/40 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* Métadonnées & Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="chip-nex">{item.sectorBadge}</span>
                  <span className="chip-nex chip-nex-ok">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    {item.deliveredText}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="h-nex text-2xl sm:text-3xl text-white group-hover:text-[#dfc39d] transition">
                  {item.title}
                </h3>

                {/* Cadre Navigateur Style NexPro */}
                <div className="frame-nex my-6 group-hover:border-[#c5a880]/40 transition">
                  <div className="frame-bar">
                    <span className="frame-dot bg-red-500/80" />
                    <span className="frame-dot bg-yellow-500/80" />
                    <span className="frame-dot bg-emerald-500/80" />
                    <div className="frame-url flex items-center gap-1.5">
                      <Globe2 className="h-3 w-3 text-neutral-400" />
                      <span>https://{item.url}</span>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090c14] via-transparent to-transparent opacity-40" />
                  </div>
                </div>

                {/* Definition List : Scope & Results */}
                <div className="space-y-4 border-t border-white/10 pt-5 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#c5a880]">
                      Ce qui a été réalisé :
                    </span>
                    <p className="mt-1 text-neutral-300 leading-relaxed">{item.scope}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Impact & Résultat mesuré :
                    </span>
                    <p className="mt-1 text-white font-medium leading-relaxed">{item.results}</p>
                  </div>
                </div>
              </div>

              {/* Boutons d'Action */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href="#quote"
                  className="btn-nex text-xs uppercase tracking-wider"
                >
                  <span>Demander un site dans cet esprit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`#tunnel-secteurs`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[11px] font-bold text-neutral-400 hover:text-white transition"
                >
                  <span>Configurer ce modèle</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
