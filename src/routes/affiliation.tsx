import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import {
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Coins,
  ShieldCheck,
  Repeat,
  Send,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/affiliation")({
  head: () => ({
    meta: [
      {
        title:
          "Programme d'Affiliation & Apporteurs d'Affaires — Simulateur de Commissions Récurrentes | XR Agency",
      },
      {
        name: "description",
        content:
          "Recommandez XR Agency à votre réseau de dirigeants et touchez jusqu'à 15% sur les projets signés + 10% de commissions récurrentes à vie sur les abonnements WebCare et SEO.",
      },
    ],
  }),
  component: AffiliationPortalPage,
});

function AffiliationPortalPage() {
  const [referralsPerMonth, setReferralsPerMonth] = useState<number>(3);
  const [avgSetupPrice, setAvgSetupPrice] = useState<number>(2490);
  const [avgMrrPlan, setAvgMrrPlan] = useState<number>(290);
  const [monthsHorizon, setMonthsHorizon] = useState<number>(12);
  const [submitted, setSubmitted] = useState(false);

  // 15% upfront commission on setup + 10% recurring commission on MRR cumulative
  const upfrontPerMonth = Math.round(referralsPerMonth * avgSetupPrice * 0.15);
  const monthlyRecurringAdded = Math.round(referralsPerMonth * avgMrrPlan * 0.1);
  const recurringAtMonthEnd = monthlyRecurringAdded * monthsHorizon;
  const cumulativeTotalEarnings =
    upfrontPerMonth * monthsHorizon +
    Math.round(
      monthlyRecurringAdded * ((monthsHorizon * (monthsHorizon + 1)) / 2),
    );

  return (
    <div
      className="min-h-screen bg-[#080B10] text-[#F8FAFC]"
      data-testid="affiliation-portal-page"
    >
      <Nav />

      <main className="pt-28 pb-24 space-y-20">
        {/* HERO & SCISSION RECRUTEMENT VS AFFILIATION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F172A] border border-[#10B981]/50 text-xs font-mono uppercase tracking-[0.2em] text-[#10B981]">
              <Repeat className="w-4 h-4" />
              PROGRAMME APPORTEURS D'AFFAIRES • COMMISSIONS RÉCURRENTES
            </div>

            <Link
              to="/recrutement"
              className="px-4 py-2 rounded-xl bg-[#0F172A] border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080B10] transition flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              Vous souhaitez closer à temps plein ? Voir /recrutement
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                Monétisez votre réseau avec une{" "}
                <span className="text-[#10B981]">rente récurrente</span>.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Vous êtes expert-comptable, consultant, banquier pro, agence
                partenaire ou dirigeant bien connecté ? Vous nous présentez un
                contact qualifié : <strong>Romain, Martin ou Hugo</strong>{" "}
                s'occupent de 100% de l'audit, du closing et de la livraison.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#D4AF37]/40 space-y-1">
                  <div className="text-xs font-mono uppercase text-[#D4AF37]">
                    COMMISSION SUR SETUP
                  </div>
                  <div className="text-3xl font-mono font-bold text-white">
                    15 % HT
                  </div>
                  <p className="text-xs text-slate-400">
                    Versée dès l'encaissement de l'acompte (Sites Web, Maps,
                    NFC, Branding, POS).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#10B981]/50 space-y-1">
                  <div className="text-xs font-mono uppercase text-[#10B981]">
                    COMMISSION MRR RÉCURRENTE
                  </div>
                  <div className="text-3xl font-mono font-bold text-[#10B981]">
                    10 % / mois
                  </div>
                  <p className="text-xs text-slate-400">
                    Effet boule de neige sur tous les abonnements WebCare
                    (Julie), SEO (Hugo) et Social (Edgar).
                  </p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE RECURRING COMMISSION SIMULATOR */}
            <div
              className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0F172A] border-2 border-[#10B981]/60 space-y-6 shadow-2xl"
              data-testid="affiliation-recurring-simulator"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#10B981]">
                    SIMULATEUR INTERACTIF DE COMMISSIONS RÉCURRENTES
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Calculez votre rente d'Apporteur d'Affaires
                  </h2>
                </div>
                <Coins className="w-7 h-7 text-[#D4AF37]" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Entreprises recommandées signées / mois :
                    </span>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      {referralsPerMonth} clients / mois
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={referralsPerMonth}
                    onChange={(e) =>
                      setReferralsPerMonth(Number(e.target.value))
                    }
                    data-testid="aff-slider-referrals"
                    className="w-full accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Projet initial moyen (Refonte Web / Maps / Robotique) :
                    </span>
                    <span className="font-mono font-bold text-white">
                      {avgSetupPrice.toLocaleString("fr-FR")} € HT
                    </span>
                  </div>
                  <input
                    type="range"
                    min={990}
                    max={4900}
                    step={250}
                    value={avgSetupPrice}
                    onChange={(e) => setAvgSetupPrice(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Abonnement mensuel moyen souscrit (WebCare + SEO) :
                    </span>
                    <span className="font-mono font-bold text-[#10B981]">
                      {avgMrrPlan.toLocaleString("fr-FR")} € / mois
                    </span>
                  </div>
                  <input
                    type="range"
                    min={99}
                    max={950}
                    step={50}
                    value={avgMrrPlan}
                    onChange={(e) => setAvgMrrPlan(Number(e.target.value))}
                    className="w-full accent-[#10B981]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">
                      Horizon de projection cumulée :
                    </span>
                    <span className="font-mono font-bold text-white">
                      {monthsHorizon} mois
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[6, 12, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMonthsHorizon(m)}
                        className={`py-2 rounded-xl font-mono text-xs font-bold border transition ${
                          monthsHorizon === m
                            ? "bg-[#D4AF37] text-[#080B10] border-[#D4AF37]"
                            : "bg-[#080B10] text-slate-300 border-white/10"
                        }`}
                      >
                        {m} Mois
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Output Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#080B10] border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Prime One-Shot / mois
                  </div>
                  <div
                    className="text-xl font-mono font-bold text-white mt-1"
                    data-testid="aff-upfront-monthly"
                  >
                    {upfrontPerMonth.toLocaleString("fr-FR")} €
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#080B10] border border-[#10B981]/40">
                  <div className="text-[10px] font-mono uppercase text-[#10B981]">
                    Rente MRR au mois {monthsHorizon}
                  </div>
                  <div
                    className="text-xl font-mono font-bold text-[#10B981] mt-1"
                    data-testid="aff-recurring-mrr"
                  >
                    +{recurringAtMonthEnd.toLocaleString("fr-FR")} €/m
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]">
                  <div className="text-[10px] font-mono uppercase text-[#D4AF37]">
                    Gain Cumulé ({monthsHorizon}m)
                  </div>
                  <div
                    className="text-xl font-mono font-bold text-[#D4AF37] mt-1"
                    data-testid="aff-cumulative-total"
                  >
                    {cumulativeTotalEarnings.toLocaleString("fr-FR")} €
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER REGISTRATION FORM */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-[#0F172A] border border-[#10B981]/40 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#10B981]">
                ACTIVATION DE VOTRE CODE APPORTEUR D'AFFAIRES
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Devenir Partenaire Officiel XR Agency
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#10B981]/15 border border-[#10B981] text-sm text-[#10B981] flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>
                  Votre compte Apporteur d'Affaires est pré-activé ! Vous
                  recevrez votre lien de suivi et votre convention de
                  commissionnement sous 2h.
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
                    placeholder="Votre Nom / Société *"
                    className="px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email professionnel *"
                    className="px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Téléphone WhatsApp pour suivi des commissions *"
                  className="w-full px-4 py-3 rounded-xl bg-[#080B10] border border-white/15 text-sm text-white"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#14d496] transition"
                >
                  <Send className="w-4 h-4" />
                  Activer mon Portail Apporteur d'Affaires
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
