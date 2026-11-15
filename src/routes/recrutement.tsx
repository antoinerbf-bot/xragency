import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import {
  Trophy,
  Flame,
  Crown,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  FileSearch,
  CalendarCheck,
  Sparkles,
  Users,
  Code2,
  Send,
} from "lucide-react";
import { RPG_RANKS, RPG_XP_REWARDS } from "@/lib/rpg-engine";
import { XR_ADVISORS } from "@/lib/xr-advisors";

export const Route = createFileRoute("/recrutement")({
  head: () => ({
    meta: [
      {
        title:
          "Recrutement Closers d'Élite — Rejoignez l'Arène CRM RPG | XR Agency",
      },
      {
        name: "description",
        content:
          "Vous êtes un closer B2B ambitieux ? Rejoignez les 7 experts XR Agency et pilotez vos ventes dans notre CRM interne gamifié façon RPG (XP, 5 Rangs, Quêtes, Prompts Lovable en 1 clic).",
      },
    ],
  }),
  component: RecrutementClosersRpgPage,
});

function RecrutementClosersRpgPage() {
  const [dealsPerMonth, setDealsPerMonth] = useState(6);
  const [avgBasket, setAvgBasket] = useState(2490);
  const [submitted, setSubmitted] = useState(false);

  const estimatedMonthlyCommission = Math.round(
    dealsPerMonth * avgBasket * 0.22,
  );
  const estimatedMonthlyXp = dealsPerMonth * 1000 + dealsPerMonth * 4 * 300;

  return (
    <div
      className="min-h-screen bg-[#080B10] text-[#F8FAFC]"
      data-testid="recrutement-closers-rpg-page"
    >
      <Nav />

      <main className="pt-28 pb-24 space-y-20">
        {/* HERO: CLOSERS D'ÉLITE & CRM GAMIFIÉ RPG */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F172A] border border-[#D4AF37]/50 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              <Trophy className="w-4 h-4" />
              DIVISION CLOSING B2B • ARÈNE CRM GAMIFIÉE RPG
            </div>

            <Link
              to="/affiliation"
              className="px-4 py-2 rounded-xl bg-[#0F172A] border border-[#10B981]/40 text-xs font-mono text-[#10B981] hover:bg-[#10B981] hover:text-[#080B10] transition flex items-center gap-1.5"
            >
              Vous êtes Apporteur d'Affaires ? Accéder au Portail Affiliation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                Ne vendez plus dans un tableur gris.{" "}
                <span className="text-[#D4AF37]">
                  Closez dans un RPG Haute Précision.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Chez <strong>XR Agency</strong>, nos closers disposent d'une arme
                inédite : un CRM gamifié connecté à Jarvis IA qui génère vos
                audits 5 piliers, vos maquettes Lovable en 1 clic et vos devis
                officiels signables en direct pendant l'appel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10">
                  <div className="text-xs font-mono text-slate-400">
                    Appel Qualifié
                  </div>
                  <div className="text-xl font-mono font-bold text-[#D4AF37] mt-1">
                    +{RPG_XP_REWARDS.call} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10">
                  <div className="text-xs font-mono text-slate-400">
                    Audit 5 Piliers
                  </div>
                  <div className="text-xl font-mono font-bold text-sky-400 mt-1">
                    +{RPG_XP_REWARDS.audit} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10">
                  <div className="text-xs font-mono text-slate-400">
                    RDV Découverte
                  </div>
                  <div className="text-xl font-mono font-bold text-purple-400 mt-1">
                    +{RPG_XP_REWARDS.meeting} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/50">
                  <div className="text-xs font-mono text-[#10B981]">
                    Deal Signé
                  </div>
                  <div className="text-xl font-mono font-bold text-[#10B981] mt-1">
                    +{RPG_XP_REWARDS.deal_closed} XP
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Closer Earnings & XP Estimator */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0F172A] border-2 border-[#D4AF37]/60 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  SIMULATEUR CLOSER XR AGENCY
                </span>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Deals closés par mois :
                    </span>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      {dealsPerMonth} deals / mois
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={dealsPerMonth}
                    onChange={(e) => setDealsPerMonth(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Panier moyen signé (Site + Maps + NFC) :
                    </span>
                    <span className="font-mono font-bold text-white">
                      {avgBasket.toLocaleString("fr-FR")} € HT
                    </span>
                  </div>
                  <input
                    type="range"
                    min={990}
                    max={4900}
                    step={250}
                    value={avgBasket}
                    onChange={(e) => setAvgBasket(Number(e.target.value))}
                    className="w-full accent-[#10B981]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#080B10] border border-[#10B981]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Commissions directes estimées :
                  </span>
                  <span
                    className="text-2xl font-mono font-bold text-[#10B981]"
                    data-testid="closer-sim-commission"
                  >
                    {estimatedMonthlyCommission.toLocaleString("fr-FR")} € /mois
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                  <span>Gain d'XP mensuel :</span>
                  <span>+{estimatedMonthlyXp.toLocaleString("fr-FR")} XP</span>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="w-full py-3 px-4 rounded-xl bg-[#D4AF37] text-[#080B10] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#e3be42] transition"
              >
                <Sparkles className="w-4 h-4" />
                Tester le CRM RPG en Direct (/dashboard)
              </Link>
            </div>
          </div>
        </section>

        {/* THE 5 RPG RANKS LADDER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              PROGRESSION & MÉRITOCRATIE
            </span>
            <h2 className="text-3xl font-bold text-white">
              Les 5 Rangs Officiels du Moteur RPG
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {RPG_RANKS.map((rank) => (
              <div
                key={rank.level}
                className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: rank.badgeColor }}
                  >
                    RANG 0{rank.level}
                  </span>
                  <Crown
                    className="w-4 h-4"
                    style={{ color: rank.badgeColor }}
                  />
                </div>
                <h3 className="text-lg font-bold text-white">{rank.title}</h3>
                <div className="text-xs font-mono text-[#D4AF37]">
                  Dès {rank.minXp.toLocaleString("fr-FR")} XP
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {rank.perk}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSER APPLICATION FORM */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-[#0F172A] border border-[#D4AF37]/40 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                CANDIDATURE CLOSER B2B
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Rejoindre l'escouade de Martin, Romain & Hugo
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#10B981]/15 border border-[#10B981] text-sm text-[#10B981] flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>
                  Candidature reçue ! Votre profil Closer a été transmis au HUD
                  Jarvis du Chef pour audition rapide.
                </span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Prénom & Nom *"
                    className="px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Téléphone WhatsApp *"
                    className="px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Spécialité de prédilection (Sites Web, Google Maps, SEO, Robotique POS) *"
                  className="w-full px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#14d496] transition"
                >
                  <Send className="w-4 h-4" />
                  Postuler comme Closer XR Agency
                </button>
              </form>
            )}
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
