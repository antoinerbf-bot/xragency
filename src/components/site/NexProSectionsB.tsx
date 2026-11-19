import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo, Reveal } from "./primitives";
import { QuoteConfiguratorCompact } from "./QuoteConfiguratorCompact";
import { XR_PHOTOS } from "@/lib/photography";

const WA_DIRECT = "https://wa.me/33767566783";

/* ==========================================================================
   SECTION 5 — RÉALISATIONS (POKE-N-BALL RÉEL + PROJETS CONCEPTUELS IDENTIFIÉS)
   ========================================================================== */
export function RealisationsSection() {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile" | "pos">("desktop");

  return (
    <section
      id="realisations"
      className="relative border-t border-[#0B0B0C]/10 bg-[#F8F6F0] py-20 sm:py-28 text-[#0B0B0C]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-[#0B0B0C]/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#8B704F]" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                  05 · RÉALISATIONS &amp; ÉTUDES DE CAS
                </span>
              </div>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.04] text-[#0B0B0C]">
                Réalisations concrètes &amp;{" "}
                <span className="italic text-[#8B704F]">démonstrations du studio.</span>
              </h2>
            </div>

            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 rounded-full border border-[#0B0B0C]/20 bg-[#FDFBF7] px-6 py-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#0B0B0C] transition hover:border-[#8B704F]"
            >
              <span>Voir toutes nos réalisations</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#8B704F]" />
            </Link>
          </div>
        </Reveal>

        {/* ÉTUDE DE CAS RÉELLE : POKE-N-BALL */}
        <Reveal delay={50}>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#0B0B0C]/15 bg-[#101114] text-[#F8F6F0] shadow-[0_28px_70px_-25px_rgba(11,11,12,0.35)]">
            <div className="grid lg:grid-cols-12">
              {/* Colonne gauche : Besoin, Solutions mises en place & 4 Interventions */}
              <div className="p-7 sm:p-10 lg:col-span-6 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-[#C5A059] px-3 py-1 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#0B0B0C]">
                      PROJET CLIENT RÉEL
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[8.5px] uppercase tracking-wider text-[#E8DCC4]">
                      RESTAURATION &amp; ÉCOSYSTÈME DIGITAL
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl sm:text-4xl text-white">Poke-N-Ball</h3>
                  <p className="mt-2 font-mono text-xs text-[#C5A059]">
                    Site web · Commande en ligne · Système de caisse · Expérience client
                  </p>

                  {/* Présentation du besoin & Solutions mises en place */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#C5A059] block">
                        PRÉSENTATION DU BESOIN
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-[#E8DCC4]/85">
                        Créer une vitrine digitale appétissante et structurer la prise de commande en ligne ainsi que
                        l&apos;encaissement en restaurant au sein d&apos;un parcours fluide.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#C5A059] block">
                        SOLUTIONS MISES EN PLACE
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-[#E8DCC4]/85">
                        Conception du site web, déploiement d&apos;un module de commande personnalisable et connexion au
                        système de caisse (POS) pour centraliser la production en cuisine.
                      </p>
                    </div>
                  </div>

                  {/* Description des 4 interventions */}
                  <div className="mt-6 space-y-2.5">
                    <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#E8DCC4]/70 block">
                      DÉTAIL DES INTERVENTIONS RÉALISÉES
                    </span>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-3.5">
                        <h4 className="text-xs font-bold text-white">1. Site web</h4>
                        <p className="mt-1 text-[11px] text-[#E8DCC4]/75">
                          Vitrine responsive mettant en valeur la carte, les ingrédients frais et l&apos;identité de
                          l&apos;enseigne.
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-3.5">
                        <h4 className="text-xs font-bold text-white">2. Commande en ligne</h4>
                        <p className="mt-1 text-[11px] text-[#E8DCC4]/75">
                          Parcours de composition de poke bowl étape par étape (base, protéine, toppings, sauce) sur
                          mobile et desktop.
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-3.5">
                        <h4 className="text-xs font-bold text-white">3. Système de caisse</h4>
                        <p className="mt-1 text-[11px] text-[#E8DCC4]/75">
                          Terminal de caisse restaurant relié aux commandes pour synchroniser la salle, le click &amp;
                          collect et la cuisine.
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-3.5">
                        <h4 className="text-xs font-bold text-white">4. Expérience client</h4>
                        <p className="mt-1 text-[11px] text-[#E8DCC4]/75">
                          Parcours sans friction depuis la découverte sur smartphone jusqu&apos;au retrait de la
                          commande en établissement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <a
                    href="#configurateur"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#0B0B0C] transition hover:bg-[#E8DCC4]"
                  >
                    <span>Demander un dispositif similaire</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    to="/realisations"
                    className="font-mono text-xs text-[#E8DCC4] hover:text-[#C5A059] underline"
                  >
                    Consulter l&apos;étude complète →
                  </Link>
                </div>
              </div>

              {/* Colonne droite : Captures Desktop, Mobile et Caisse POS interactives */}
              <div className="relative flex flex-col justify-between bg-[#0B0B0C] p-7 sm:p-10 lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/10">
                {/* Sélecteur de vue Desktop / Mobile / Caisse POS */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                    APERÇUS DE L&apos;ÉCOSYSTÈME POKE-N-BALL
                  </span>
                  <div className="flex rounded-full border border-white/15 bg-white/5 p-1">
                    <button
                      type="button"
                      onClick={() => setDeviceView("desktop")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[8.5px] font-bold uppercase transition ${
                        deviceView === "desktop" ? "bg-[#C5A059] text-[#0B0B0C]" : "text-[#E8DCC4]"
                      }`}
                    >
                      <Monitor className="h-3 w-3" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceView("mobile")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[8.5px] font-bold uppercase transition ${
                        deviceView === "mobile" ? "bg-[#C5A059] text-[#0B0B0C]" : "text-[#E8DCC4]"
                      }`}
                    >
                      <Smartphone className="h-3 w-3" /> Mobile
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceView("pos")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[8.5px] font-bold uppercase transition ${
                        deviceView === "pos" ? "bg-[#C5A059] text-[#0B0B0C]" : "text-[#E8DCC4]"
                      }`}
                    >
                      <Utensils className="h-3 w-3" /> Caisse POS
                    </button>
                  </div>
                </div>

                {/* Rendu d'interface fidèle et 100 % lisible */}
                <div className="my-6">
                  {deviceView === "desktop" && (
                    <div className="rounded-2xl border border-[#E8DCC4]/20 bg-[#F8F6F0] p-5 text-[#0B0B0C] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-[#0B0B0C]/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-[#0B0B0C] px-2.5 py-1 font-mono text-[9px] font-bold text-[#C5A059]">
                            POKE-N-BALL
                          </span>
                          <span className="font-mono text-[9px] text-[#5A534A]">Capture Desktop · Site &amp; Menu</span>
                        </div>
                        <span className="rounded-full bg-[#8B704F] px-3 py-1 text-[9px] font-bold text-white">
                          Commander en ligne
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-[1.15fr_0.85fr] items-center">
                        <div>
                          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#8B704F]">
                            CRÉATION SUR MESURE &amp; INGRÉDIENTS FRAIS
                          </span>
                          <h4 className="mt-1 font-serif text-xl font-bold text-[#0B0B0C]">
                            Composez votre Poke Bowl ou découvrez nos recettes signatures.
                          </h4>
                          <p className="mt-2 text-xs text-[#4A443C]">
                            Sélectionnez votre base, vos protéines marinées, vos accompagnements frais et validez votre
                            retrait en quelques clics.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-lg border border-[#0B0B0C]/15 bg-white px-2.5 py-1 text-[9px] font-semibold">
                              1. Choix de la base
                            </span>
                            <span className="rounded-lg border border-[#0B0B0C]/15 bg-white px-2.5 py-1 text-[9px] font-semibold">
                              2. Protéines &amp; Marinades
                            </span>
                            <span className="rounded-lg border border-[#0B0B0C]/15 bg-white px-2.5 py-1 text-[9px] font-semibold">
                              3. Click &amp; Collect
                            </span>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-[#0B0B0C]/10 bg-white">
                          <img
                            src="/showcase/audit_app_04_poke_case.png"
                            alt="Aperçu Poke-N-Ball"
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {deviceView === "mobile" && (
                    <div className="mx-auto max-w-xs rounded-[2rem] border-4 border-[#2C2925] bg-[#F8F6F0] p-4 text-[#0B0B0C] shadow-2xl">
                      <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-[#0B0B0C]/20" />
                      <div className="flex items-center justify-between border-b border-[#0B0B0C]/10 pb-2">
                        <span className="font-mono text-[9px] font-bold text-[#0B0B0C]">POKE-N-BALL MOBILE</span>
                        <span className="rounded-full bg-[#8B704F] px-2 py-0.5 text-[8px] font-bold text-white">
                          Panier (2)
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="rounded-xl bg-white p-3 border border-[#0B0B0C]/10">
                          <span className="font-mono text-[7.5px] text-[#8B704F] font-bold">ÉTAPE 1 SUR 4</span>
                          <p className="text-xs font-bold">Poke Signature Saumon Avocat</p>
                          <p className="mt-0.5 text-[10px] text-[#5A534A]">
                            Riz vinaigré, saumon frais, avocat, edamame, mangue, sauce maison.
                          </p>
                        </div>
                        <div className="rounded-xl bg-[#0B0B0C] p-3 text-center text-[10px] font-bold text-[#F8F6F0]">
                          Valider ma commande Click &amp; Collect →
                        </div>
                      </div>
                    </div>
                  )}

                  {deviceView === "pos" && (
                    <div className="rounded-2xl border border-[#C5A059]/30 bg-[#141519] p-5 text-[#F8F6F0] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-[9px] font-bold text-[#C5A059]">
                          TERMINAL DE CAISSE POS · SYNCHRONISATION SALLE &amp; WEB
                        </span>
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[8px] font-bold text-emerald-300">
                          EN LIGNE
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2.5 text-xs">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <span className="font-mono text-[8px] text-[#E8DCC4]/70 block">COMMANDE WEB #104</span>
                          <span className="mt-1 block font-bold text-white">Click &amp; Collect</span>
                          <span className="mt-1 inline-block rounded bg-[#C5A059]/20 px-1.5 py-0.5 text-[9px] text-[#C5A059]">
                            En préparation
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <span className="font-mono text-[8px] text-[#E8DCC4]/70 block">COMMANDE SALLE #105</span>
                          <span className="mt-1 block font-bold text-white">Sur place · Borne</span>
                          <span className="mt-1 inline-block rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-300">
                            Prêt au comptoir
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <span className="font-mono text-[8px] text-[#E8DCC4]/70 block">GESTION TICKETS</span>
                          <span className="mt-1 block font-bold text-white">Impression Cuisine</span>
                          <span className="mt-1 inline-block rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-[#E8DCC4]">
                            Automatique
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-[#E8DCC4]/70">
                  Architecture complète déployée par XR Agency : site vitrine, module de commande en ligne et caisse
                  connectée.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* PROJETS CONCEPTUELS DE DÉMONSTRATION STUDIO (CLAIREMENT IDENTIFIÉS) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="group overflow-hidden rounded-[1.75rem] border border-[#0B0B0C]/12 bg-[#FDFBF7] p-6 sm:p-7">
              <div className="relative h-56 overflow-hidden rounded-2xl bg-[#101114]">
                <img
                  src={XR_PHOTOS.strategy}
                  alt="Maison Lumière — Projet conceptuel"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3.5 top-3.5 rounded-full border border-[#E8DCC4]/30 bg-[#0B0B0C]/85 px-3 py-1 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#E8DCC4]">
                  PROJET CONCEPTUEL — DÉMONSTRATION STUDIO
                </span>
              </div>
              <div className="mt-5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8B704F]">
                  DIRECTION ARTISTIQUE &amp; E-COMMERCE ÉDITORIAL
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#0B0B0C]">Maison Lumière</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4A443C]">
                  Démonstration de direction artistique pour une maison de haute parfumerie et objets d&apos;intérieur :
                  typographie éditoriale, fiche produit immersive et parcours d&apos;achat épuré.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="group overflow-hidden rounded-[1.75rem] border border-[#0B0B0C]/12 bg-[#FDFBF7] p-6 sm:p-7">
              <div className="relative h-56 overflow-hidden rounded-2xl bg-[#101114]">
                <img
                  src={XR_PHOTOS.refonte}
                  alt="Villa Azur — Projet conceptuel"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3.5 top-3.5 rounded-full border border-[#E8DCC4]/30 bg-[#0B0B0C]/85 px-3 py-1 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#E8DCC4]">
                  PROJET CONCEPTUEL — DÉMONSTRATION STUDIO
                </span>
              </div>
              <div className="mt-5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8B704F]">
                  IMMOBILIER DE PRESTIGE &amp; RÉSERVATION PRIVÉE
                </span>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#0B0B0C]">Villa Azur</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4A443C]">
                  Démonstration d&apos;interface dédiée à l&apos;hôtellerie et à l&apos;immobilier : galerie grand
                  format, visite privée sur demande et qualification des acquéreurs ou voyageurs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 6 — NOTRE MÉTHODE (4 ÉTAPES AVEC PROGRESSION AU SCROLL)
   ========================================================================== */
const METHOD_STEPS = [
  {
    num: "01",
    title: "Découverte et analyse",
    desc: "Échange initial sur votre activité, vos objectifs commerciaux, votre clientèle cible et vos outils existants afin de définir le périmètre exact de votre projet.",
    deliverable: "Diagnostic clair de vos priorités",
  },
  {
    num: "02",
    title: "Stratégie et proposition commerciale",
    desc: "Recommandation des prestations adaptées (Site web, Branding, Google Maps, SEO, Social ou POS) avec un devis transparent, détaillé et sans frais cachés.",
    deliverable: "Proposition chiffrée & calendrier de réalisation",
  },
  {
    num: "03",
    title: "Production et validation",
    desc: "Conception graphique, rédaction éditoriale, développement technique et paramétrage de vos outils avec des points de validation intermédiaires.",
    deliverable: "Maquettes et livrables validés ensemble",
  },
  {
    num: "04",
    title: "Livraison, suivi et optimisation",
    desc: "Mise en ligne officielle, transfert de propriété, prise en main de vos interfaces et accompagnement continu (WebCare, SEO, Social Media).",
    deliverable: "Déploiement opérationnel & suivi dans la durée",
  },
];

export function MethodSection() {
  return (
    <section
      id="methode"
      className="relative border-t border-[#0B0B0C]/10 bg-[#101114] py-20 sm:py-28 text-[#F8F6F0]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C5A059]" />
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                06 · NOTRE MÉTHODE
              </span>
            </div>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.04] text-white">
              Un parcours de collaboration{" "}
              <span className="italic text-[#E8DCC4]">structuré en quatre étapes.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8DCC4]/80">
              De la première prise de contact jusqu&apos;au suivi après mise en ligne, chaque étape est pensée pour vous
              faire gagner du temps et sécuriser votre investissement.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 70}>
              <div className="group relative flex h-full flex-col justify-between rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059] hover:bg-white/[0.07]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-serif text-3xl font-bold text-[#C5A059]">{step.num}</span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#E8DCC4]/60">
                      ÉTAPE {step.num} / 04
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl sm:text-2xl font-semibold text-white">
                    {step.num} — {step.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#E8DCC4]/80">{step.desc}</p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#C5A059] block">
                    ENGAGEMENT ÉTAPE
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#F8F6F0]">{step.deliverable}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 7 — POURQUOI XR AGENCY (6 AVANTAGES VÉRIFIABLES EXACTS)
   ========================================================================== */
const WHY_XR_ADVANTAGES = [
  {
    num: "01",
    title: "Dix années d'expérience",
    desc: "Une décennie de pratique dans la conception de projets digitaux, l'identité de marque et l'accompagnement commercial d'entreprises.",
  },
  {
    num: "02",
    title: "Approche internationale",
    desc: "Une culture visuelle et technologique ouverte sur l'international, avec une prise en charge multilingue (Français, Anglais, Vietnamien, Arabe, Russe).",
  },
  {
    num: "03",
    title: "Compétences complémentaires",
    desc: "Web design, branding, SEO, Google Maps, réseaux sociaux, maintenance, systèmes de caisse POS et robotique réunis sous un même toit.",
  },
  {
    num: "04",
    title: "Stratégie et exécution",
    desc: "Nous ne livrons pas de simples maquettes : nous concevons la stratégie commerciale et assurons l'intégralité de la production technique.",
  },
  {
    num: "05",
    title: "Solutions sur mesure",
    desc: "Chaque entreprise possède ses propres enjeux. Nos offres s'adaptent à votre secteur, votre rythme de développement et votre budget.",
  },
  {
    num: "06",
    title: "Accompagnement",
    desc: "Un interlocuteur réactif avant, pendant et après la mise en ligne pour faire évoluer vos outils et soutenir votre croissance.",
  },
];

export function WhyXrAgencySection() {
  return (
    <section
      id="pourquoi-xr"
      className="relative border-t border-[#0B0B0C]/10 bg-[#FDFBF7] py-20 sm:py-28 text-[#0B0B0C]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-[#0B0B0C]/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#8B704F]" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                  07 · POURQUOI XR AGENCY
                </span>
              </div>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-[#0B0B0C]">
                Six raisons concrètes de nous confier{" "}
                <span className="italic text-[#8B704F]">votre développement digital.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#4A443C]">
              Des engagements fondés sur notre expérience, l&apos;étendue de nos compétences et la transparence de nos
              tarifs.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_XR_ADVANTAGES.map((adv, idx) => (
            <Reveal key={adv.num} delay={idx * 50}>
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] p-7 transition hover:border-[#8B704F]">
                <div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0B0B0C] font-mono text-[10px] font-bold text-[#C5A059]">
                    {adv.num}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[#0B0B0C]">{adv.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#4A443C]">{adv.desc}</p>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-[#0B0B0C]/10 pt-3.5 text-[11px] font-semibold text-[#8B704F]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Engagement XR Agency</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 8 — CONFIGURATEUR ET DEMANDE DE DEVIS (« Construisez votre solution sur mesure. »)
   ========================================================================== */
export function BespokeConfiguratorSection() {
  return (
    <section id="configurateur" className="relative border-t border-[#0B0B0C]/10 bg-[#F3EFE7] pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="rounded-[2rem] border border-[#0B0B0C]/12 bg-[#101114] p-7 sm:p-10 lg:p-12 text-[#F8F6F0] shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#C5A059]" />
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                    08 · CONFIGURATEUR ET DEMANDE DE DEVIS
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.04] text-white">
                  Construisez votre solution sur mesure.
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#E8DCC4]/85">
                  Sélectionnez un ou plusieurs services, comparez les formules, visualisez les tarifs et modalités
                  d&apos;engagement, puis téléchargez votre récapitulatif ou transmettez directement votre demande à
                  notre équipe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#C5A059] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0C] transition hover:bg-[#E8DCC4]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Utiliser le configurateur interactif</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8DCC4]/30 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#F8F6F0] transition hover:border-[#C5A059]"
                >
                  <span>Envoyer une demande directe</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C5A059]" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Configurateur interactif existant relié au CRM et générateur de devis PDF */}
      <QuoteConfiguratorCompact />
    </section>
  );
}

/* ==========================================================================
   SECTION 9 — FAQ (LES 6 QUESTIONS ESSENTIELLES DU BRIEF)
   ========================================================================== */
const BRIEF_FAQ_ITEMS = [
  {
    q: "Comment fonctionne une collaboration ?",
    a: "Chaque collaboration débute par une phase d'échange et d'analyse de votre besoin. Nous établissons ensuite une proposition commerciale claire détaillant les prestations retenues, le tarif exact et le calendrier. Une fois validée, nous passons en production avec des points d'étape réguliers jusqu'à la livraison et la mise en ligne.",
  },
  {
    q: "Quels sont les délais ?",
    a: "Les délais dépendent de l'ampleur de votre projet : comptez en moyenne quelques jours pour une optimisation Google Maps ou un Logo Signature, et de une à quelques semaines pour un site web complet (Vitrine Pro, Business ou E-commerce) selon le nombre de pages et les contenus à intégrer. Le planning précis est toujours confirmé dans votre devis.",
  },
  {
    q: "Les prestations sont-elles personnalisables ?",
    a: "Oui, intégralement. Nos formules (Sites Web, Branding, SEO, Google Maps, Social Media, WebCare, POS & Robotique) servent de base transparente, et nous adaptons chaque livrable à votre secteur d'activité, à votre charte et à vos contraintes opérationnelles.",
  },
  {
    q: "Peut-on combiner plusieurs services ?",
    a: "Absolument. Vous pouvez par exemple associer la création d'un Site Business (799 €) avec une Identité de Marque (299 €) et un Pack Visibilité Maps (169 €). Notre configurateur vous permet de sélectionner plusieurs pôles d'expertise afin d'obtenir une cohérence totale sur l'ensemble de votre présence digitale.",
  },
  {
    q: "Comment fonctionne l'accompagnement après livraison ?",
    a: "À la livraison, vous êtes propriétaire de vos supports. Pour assurer la pérennité technique, les sauvegardes, la sécurité et les mises à jour de votre site, nous proposons nos formules Maintenance & WebCare (Essentiel à 29 €/mois, Pro à 49 €/mois, Business à 99 €/mois) ainsi qu'un suivi continu en SEO et Social Media.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Vous pouvez composer votre projet directement dans notre configurateur interactif ci-dessus pour obtenir une estimation immédiate et un pré-devis PDF, remplir notre formulaire de contact, ou nous écrire directement sur WhatsApp pour un échange rapide avec notre équipe.",
  },
];

export function BriefFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[#0B0B0C]/10 bg-[#F8F6F0] py-20 sm:py-28 text-[#0B0B0C]"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 md:px-12">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#8B704F]" />
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                09 · QUESTIONS FRÉQUENTES (FAQ)
              </span>
              <span className="h-px w-8 bg-[#8B704F]" />
            </div>
            <h2 className="mt-4 font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.05] text-[#0B0B0C]">
              Réponses claires aux questions{" "}
              <span className="italic text-[#8B704F]">les plus fréquentes.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 divide-y divide-[#0B0B0C]/12 rounded-[1.75rem] border border-[#0B0B0C]/12 bg-[#FDFBF7] px-6 sm:px-10 shadow-xs">
          {BRIEF_FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#8B704F]">0{idx + 1}</span>
                    <span className="font-serif text-lg sm:text-xl font-semibold text-[#0B0B0C]">{item.q}</span>
                  </div>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
                      isOpen
                        ? "rotate-45 border-[#0B0B0C] bg-[#0B0B0C] text-[#F8F6F0]"
                        : "border-[#0B0B0C]/20 text-[#0B0B0C]"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-3 pl-8 sm:pl-10 pr-4">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#4A443C]">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 10 — CONTACT FINAL & FOOTER (« Parlons de votre projet. »)
   ========================================================================== */
export function FinalContactAndFooterSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      website: fd.get("website") as string,
      need: fd.get("need") as string,
      message: fd.get("message") as string,
      hp: fd.get("hp") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erreur lors de l'envoi.");
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[#0B0B0C]/12 bg-[#0B0B0C] pt-20 pb-14 sm:pt-28 text-[#F8F6F0]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="rounded-[2rem] border border-[#E8DCC4]/20 bg-[#101114] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              {/* Colonne gauche : Appel à l'action sobre & 3 boutons officiels */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#C5A059]" />
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                    10 · CONTACT &amp; LANCEMENT
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] text-white">
                  Parlons de votre projet.
                </h2>

                <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#E8DCC4]/80">
                  Vous souhaitez lancer un nouveau site web, refondre votre identité de marque, développer votre
                  visibilité sur Google Maps ou équiper votre établissement ? Choisissez le mode d&apos;échange qui vous
                  convient.
                </p>

                {/* Les 3 boutons exacts de la Section 10 du Master Brief */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#contact-form"
                    className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#C5A059] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#0B0B0C] transition hover:bg-[#E8DCC4]"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#configurateur"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#E8DCC4]/30 bg-white/5 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F8F6F0] transition hover:border-[#C5A059]"
                  >
                    <span>Construire mon projet</span>
                  </a>

                  <a
                    href={WA_DIRECT}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-300 transition hover:bg-emerald-500/25"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-2 text-xs text-[#E8DCC4]/80">
                  <div>
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#C5A059] block">
                      COORDONNÉES DIRECTES
                    </span>
                    <a href="mailto:contact.xragency@gmail.com" className="mt-1 block font-semibold text-white hover:underline">
                      contact.xragency@gmail.com
                    </a>
                    <a href={WA_DIRECT} target="_blank" rel="noreferrer" className="mt-0.5 block hover:text-white">
                      WhatsApp : +33 7 67 56 67 83
                    </a>
                  </div>
                  <div>
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#C5A059] block">
                      ZONE D'INTERVENTION
                    </span>
                    <p className="mt-1 text-white font-semibold">France & international</p>
                    <p className="mt-0.5">Direction et production à distance · Contact sur rendez-vous</p>
                  </div>
                </div>
              </div>

              {/* Colonne droite : Formulaire de demande de devis relié au CRM (/api/contact) */}
              <div id="contact-form" className="rounded-2xl border border-white/12 bg-[#0B0B0C] p-6 sm:p-8">
                <h3 className="font-serif text-2xl text-white">Transmettre votre demande</h3>
                <p className="mt-1 text-xs text-[#E8DCC4]/70">
                  Votre message est directement enregistré dans notre CRM. Réponse personnalisée sous 24h.
                </p>

                {status === "success" ? (
                  <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                    <h4 className="mt-3 font-serif text-xl text-white">Demande envoyée avec succès</h4>
                    <p className="mt-1 text-xs text-[#E8DCC4]/80">
                      Merci. Notre équipe a bien reçu votre demande et revient vers vous très rapidement.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white hover:border-[#C5A059]"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    {status === "error" && (
                      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                        {errorMessage}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#E8DCC4]/70 mb-1.5">
                          Nom &amp; Prénom *
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="Jean Dupont"
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#E8DCC4]/70 mb-1.5">
                          E-mail professionnel *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="contact@entreprise.fr"
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#E8DCC4]/70 mb-1.5">
                          Entreprise / Établissement
                        </label>
                        <input
                          name="company"
                          placeholder="Nom de votre société"
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#E8DCC4]/70 mb-1.5">
                          Prestation souhaitée
                        </label>
                        <select
                          name="need"
                          className="w-full rounded-xl border border-white/15 bg-[#141519] px-4 py-3 text-xs text-white focus:border-[#C5A059] focus:outline-none"
                        >
                          <option value="Site Web">Création ou refonte de Site Web (dès 499 €)</option>
                          <option value="Branding">Branding &amp; Identité Visuelle (dès 199 €)</option>
                          <option value="Google Maps">Google Maps &amp; Visibilité Locale (dès 99 €)</option>
                          <option value="SEO">SEO &amp; Référencement Naturel (dès 299 €/m)</option>
                          <option value="Social Media">Social Media &amp; Contenu (dès 349 €/m)</option>
                          <option value="WebCare">Maintenance &amp; WebCare (dès 29 €/m)</option>
                          <option value="POS & Robotique">Caisse POS (2 000 €) / Robotique (dès 499 €/m)</option>
                          <option value="Projet Complet">Combinaison de plusieurs services</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-[#E8DCC4]/70 mb-1.5">
                        Détails de votre projet *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="Précisez votre activité, vos objectifs et vos délais souhaités..."
                        className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C5A059] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0C] transition hover:bg-[#E8DCC4] disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{status === "loading" ? "Envoi en cours..." : "Envoyer ma demande de devis"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* FOOTER ÉLÉGANT, COMPLET ET COHÉRENT */}
        <footer className="mt-16 border-t border-white/10 pt-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="text-white" />
              <p className="mt-4 text-xs leading-relaxed text-[#E8DCC4]/70">
                Agence digitale internationale spécialisée en création de sites web, identité de marque, référencement
                Google Maps &amp; SEO, réseaux sociaux, maintenance et technologies de point de vente.
              </p>
            </div>

            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059] block">
                EXPERTISES &amp; TARIFS
              </span>
              <ul className="mt-4 space-y-2 text-xs text-[#E8DCC4]/80">
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "websites" }} className="hover:text-white">
                    Sites Web (499 € · 799 € · 1 499 €)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "branding" }} className="hover:text-white">
                    Branding &amp; Identité (199 € · 299 € · 399 €)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "seo" }} className="hover:text-white">
                    SEO Naturel (299 €/m · 499 €/m)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "maps" }} className="hover:text-white">
                    Google Maps (99 € · 169 € · 299 € · 550 €)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "social" }} className="hover:text-white">
                    Social Media (349 €/m · 499 €/m · 799 €/m)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "webcare" }} className="hover:text-white">
                    Maintenance WebCare (29 € · 49 € · 99 €/m)
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "robotique" }} className="hover:text-white">
                    POS Restaurant (2 000 €) &amp; Robotique
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059] block">
                NAVIGATION
              </span>
              <ul className="mt-4 space-y-2 text-xs text-[#E8DCC4]/80">
                <li>
                  <a href="#agence" className="hover:text-white">
                    Présentation de l&apos;agence
                  </a>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    Catalogue des services
                  </Link>
                </li>
                <li>
                  <Link to="/realisations" className="hover:text-white">
                    Réalisations (Poke-N-Ball)
                  </Link>
                </li>
                <li>
                  <a href="#methode" className="hover:text-white">
                    Notre méthode en 4 étapes
                  </a>
                </li>
                <li>
                  <a href="#configurateur" className="hover:text-white">
                    Configurateur de devis
                  </a>
                </li>
                <li>
                  <Link to="/mentions-legales" className="hover:text-white">
                    Mentions légales &amp; RGPD
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059] block">
                INFORMATIONS LÉGALES
              </span>
              <div className="mt-4 space-y-2 text-xs text-[#E8DCC4]/75">
                <p className="font-semibold text-white">XR AGENCY</p>
                <p>Entité contractante et mentions légales à confirmer avant commande.</p>
                <p>Hébergement web : Vercel · Données CRM : Supabase</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#E8DCC4]/60 sm:flex-row">
            <p>© {new Date().getFullYear()} XR Agency. Tous droits réservés.</p>
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[9px] text-[#E8DCC4] hover:border-[#C5A059]"
            >
              <span>HAUT DE PAGE</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]