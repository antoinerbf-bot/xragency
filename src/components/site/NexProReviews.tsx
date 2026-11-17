import React from "react";
import { ArrowRight, CheckCircle2, MessageSquare, Quote, Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  rating: number;
  quote: string;
  metrics: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Alexandre V.",
    role: "Fondateur & Directeur Général",
    company: "Villa Azur Suites & Domaines",
    city: "Cannes (06)",
    rating: 5,
    quote: "On donnait 35 000 € par an à Booking en commissions. XR Agency nous a conçu un site sublime avec réservation directe et le Pack Google Maps #1. En 3 semaines, nos réservations en direct ont explosé. La maquette livrée sous 24h nous avait bluffés dès le premier jour.",
    metrics: "+38 000 € de marge récupérée par an",
    date: "Avis vérifié Google",
  },
  {
    id: "2",
    name: "Dr. Sarah M.",
    role: "Chirurgien Esthétique",
    company: "Cabinet Médical Haussmann",
    city: "Paris 8e (75)",
    rating: 5,
    quote: "Mon cabinet manquait de visibilité sur Google Maps. En moins de 25 jours, nous sommes passés en première position sur nos requêtes clés. Le standard téléphonique a doublé ses prises de rendez-vous qualifiés. Une équipe ultra-réactive et un standing remarquable.",
    metrics: "Position #1 Google Maps en 25 jours",
    date: "Avis vérifié Google",
  },
  {
    id: "3",
    name: "Laurent B.",
    role: "Associé Gérant",
    company: "Cabinet Mercier & Associés",
    city: "Bordeaux (33)",
    rating: 5,
    quote: "Zéro perte de temps, pas de jargon technique. Un directeur de projet unique, des délais tenus au jour près et un résultat qui impose immédiatement le respect auprès de nos clients institutionnels. Je recommande les yeux fermés.",
    metrics: "45 dossiers qualifiés dès le 1er trimestre",
    date: "Avis vérifié Google",
  },
  {
    id: "4",
    name: "Matthieu T.",
    role: "Restaurateur & Chef Propriétaire",
    company: "Maison Lumière",
    city: "Lyon (69)",
    rating: 5,
    quote: "Le système de recueil d'avis 5★ automatisé et le site mobile ultra-rapide ont transformé notre fréquentation. Plus de 180 nouveaux avis 5 étoiles récoltés et des services complets chaque week-end sans passer par les intermédiaires.",
    metrics: "+150 couverts réservés chaque semaine",
    date: "Avis vérifié Google",
  },
];

export function NexProReviews() {
  return (
    <section id="avis" className="relative bg-[#070911] text-[#f8f6f0] py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Halo d'ambiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-10 h-[500px] w-[500px] rounded-full opacity-10 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #dfc39d 0%, #c5a880 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* En-tête style NexPro avec note Google Reviews */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-white/10 pb-8">
          <div className="sec-head max-w-3xl mb-0">
            <div className="sec-head-line">
              <div className="sec-head-dash" />
              <span className="mono-nex text-white/70">
                <b className="text-[#c5a880] font-bold">08</b> / AVIS VÉRIFIÉS & RETOURS D'EXPÉRIENCE
              </span>
            </div>

            <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.6rem] text-white">
              Ce que disent les dirigeants{" "}
              <span className="text-[#dfc39d] font-serif font-light italic">
                qui nous font confiance.
              </span>
            </h2>
          </div>

          {/* Badge Global Google 5.0 ★ */}
          <div className="inline-flex items-center gap-3.5 rounded-2xl border border-[#c5a880]/30 bg-[#121622]/90 px-5 py-3 shadow-xl backdrop-blur-xl shrink-0">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-white">5.0 / 5 · Google Reviews</p>
              <p className="text-[10px] text-neutral-400">100% de recommandations clients</p>
            </div>
          </div>
        </div>

        {/* Grille des 4 Avis Clients Vérifiés */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c0f18]/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#c5a880]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* En-tête de carte avec étoiles et date */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {rev.date}
                  </span>
                </div>

                {/* Métrique d'Impact en exergue */}
                <div className="my-4 rounded-xl border border-[#c5a880]/20 bg-[#c5a880]/10 px-3 py-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#e5cba4]">
                    {rev.metrics}
                  </span>
                </div>

                {/* Citation */}
                <p className="text-xs leading-relaxed text-neutral-300 italic">
                  « {rev.quote} »
                </p>
              </div>

              {/* Auteur */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">{rev.name}</p>
                <p className="text-[11px] text-[#c5a880]">{rev.company}</p>
                <p className="text-[10px] text-neutral-400">{rev.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Appel à l'action */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-neutral-400 mb-4">
            Envie de constater le même impact pour votre activité ?
          </p>
          <a
            href="#quote"
            className="btn-nex text-xs uppercase tracking-wider inline-flex"
          >
            <span>Demander mon audit & ma maquette gratuite</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
