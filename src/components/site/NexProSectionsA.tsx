import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Compass,
  Globe,
  Layers,
  MapPin,
  Monitor,
  Palette,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./primitives";
import { XR_PHOTOS } from "@/lib/photography";

/* ==========================================================================
   SECTION 2 — PRÉSENTATION DE L'AGENCE (10 ANS D'EXPÉRIENCE)
   ========================================================================== */
const AGENCY_DOMAINS = [
  {
    id: "01",
    title: "Stratégie",
    desc: "Cadrage commercial, étude du positionnement et architecture de parcours orientés vers la prise de contact et la vente.",
  },
  {
    id: "02",
    title: "Design",
    desc: "Direction artistique haut de gamme, identités visuelles mémorables et interfaces éditoriales sur mesure.",
  },
  {
    id: "03",
    title: "Développement",
    desc: "Ingénierie web moderne, rapide, sécurisée et parfaitement responsive sur ordinateur, tablette et mobile.",
  },
  {
    id: "04",
    title: "Marketing digital",
    desc: "Création de contenus, animation des réseaux sociaux et campagnes d'acquisition structurées pour votre marché.",
  },
  {
    id: "05",
    title: "Visibilité",
    desc: "Référencement naturel SEO et optimisation de votre fiche Google Maps pour capter la demande locale.",
  },
  {
    id: "06",
    title: "Technologies",
    desc: "Systèmes de caisse POS, CRM sur mesure, commande en ligne et intégration de robotique de service.",
  },
  {
    id: "07",
    title: "Accompagnement",
    desc: "Maintenance WebCare, mises à jour continues, sécurité proactive et conseil opérationnel dans la durée.",
  },
];

export function AgencyPresentationSection() {
  return (
    <section
      id="agence"
      className="relative overflow-hidden border-y border-[#0B0B0C]/10 bg-[#FDFBF7] py-20 sm:py-28 text-[#0B0B0C]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#8B704F]" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                  02 · PRÉSENTATION DE L&apos;AGENCE
                </span>
              </div>

              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.02em] text-[#0B0B0C]">
                Une agence digitale internationale forte de{" "}
                <span className="italic text-[#8B704F]">dix années d&apos;expérience</span> aux côtés des entreprises.
              </h2>

              <p className="mt-6 max-w-2xl text-[15px] sm:text-[16.5px] leading-relaxed text-[#38342E]">
                XR Agency réunit au sein d&apos;un même studio les compétences créatives, techniques et commerciales
                indispensables pour développer votre activité. Plutôt que de multiplier les prestataires, vous
                bénéficiez d&apos;un interlocuteur unique capable de concevoir votre identité, bâtir votre site web,
                déployer votre visibilité sur Google et installer vos outils de gestion.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#expertises"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#0B0B0C] px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F8F6F0] transition hover:bg-[#8B704F]"
                >
                  <span>Voir nos 7 expertises</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C5A059]" />
                </a>
                <a
                  href="#configurateur"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B0B0C]/20 bg-[#F8F6F0] px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0B0B0C] transition hover:border-[#8B704F]"
                >
                  <span>Construire mon projet</span>
                </a>
              </div>
            </div>

            {/* Encadré d'architecture : Les 7 domaines d'intervention */}
            <div className="rounded-[1.75rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] p-6 sm:p-8 shadow-[0_20px_50px_-24px_rgba(11,11,12,0.12)]">
              <div className="flex items-center justify-between border-b border-[#0B0B0C]/10 pb-4">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B704F]">
                  DOMAINES D&apos;INTERVENTION INTÉGRÉS
                </span>
                <span className="rounded-full border border-[#8B704F]/30 bg-[#E8DCC4]/45 px-3 py-1 font-mono text-[8.5px] font-bold text-[#0B0B0C]">
                  10 ANS D&apos;EXPÉRIENCE
                </span>
              </div>

              <div className="mt-5 divide-y divide-[#0B0B0C]/10">
                {AGENCY_DOMAINS.map((domain) => (
                  <div key={domain.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-4">
                    <span className="font-mono text-[10px] font-bold text-[#8B704F] mt-0.5">{domain.id}</span>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B0B0C]">{domain.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#524C43]">{domain.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3 — EXPERTISES PRINCIPALES (GRILLE À RÉVÉLATION PROGRESSIVE)
   ========================================================================== */
const CORE_EXPERTISES = [
  {
    id: "websites",
    num: "01",
    title: "Sites Web & E-commerce",
    shortDesc: "Sites vitrines professionnels, sites business administrables et boutiques e-commerce ou réservation.",
    clientBenefit: "Transformez vos visiteurs en demandes de devis et en achats grâce à un parcours rapide et rassurant.",
    fromPrice: "Dès 499 €",
    href: "/services/websites",
    icon: Monitor,
    visualTag: "Architecture responsive & conversion",
  },
  {
    id: "branding",
    num: "02",
    title: "Branding & Identité Visuelle",
    shortDesc: "Création de logo signature, univers de marque complet et charte graphique multi-supports.",
    clientBenefit: "Inspirez immédiatement confiance face à vos concurrents avec une image cohérente et mémorable.",
    fromPrice: "Dès 199 €",
    href: "/services/branding",
    icon: Palette,
    visualTag: "Direction artistique & Brand Book",
  },
  {
    id: "seo",
    num: "03",
    title: "SEO & Référencement Naturel",
    shortDesc: "Optimisation technique, ciblage de mots-clés stratégiques et création de contenus éditoriaux.",
    clientBenefit: "Attirez chaque mois un flux régulier de prospects qui recherchent activement vos prestations sur Google.",
    fromPrice: "Dès 299 € / mois",
    href: "/services/seo",
    icon: Search,
    visualTag: "Acquisition organique durable",
  },
  {
    id: "maps",
    num: "04",
    title: "Google Maps & Visibilité Locale",
    shortDesc: "Optimisation complète de votre fiche Google Business Profile, pack visibilité et SEO local conquête.",
    clientBenefit: "Captez les appels, demandes d'itinéraires et visites des clients situés dans votre zone géographique.",
    fromPrice: "Dès 99 €",
    href: "/services/maps",
    icon: MapPin,
    visualTag: "Présence locale & appels directs",
  },
  {
    id: "social",
    num: "05",
    title: "Social Media & Contenu",
    shortDesc: "Gestion complète de vos réseaux sociaux, calendrier éditorial, visuels sur mesure et vidéos courtes.",
    clientBenefit: "Restez présent dans l'esprit de votre audience sans y consacrer votre temps opérationnel.",
    fromPrice: "Dès 349 € / mois",
    href: "/services/social",
    icon: Share2,
    visualTag: "Ligne éditoriale & formats Reels",
  },
  {
    id: "maintenance",
    num: "06",
    title: "Maintenance & WebCare",
    shortDesc: "Sauvegardes régulières, mises à jour techniques, surveillance de sécurité et modifications incluses.",
    clientBenefit: "Garantissez la disponibilité, la rapidité et la sécurité de votre site tout au long de l'année.",
    fromPrice: "Dès 29 € / mois",
    href: "/services/webcare",
    icon: ShieldCheck,
    visualTag: "Sérénité technique & support",
  },
  {
    id: "robotics",
    num: "07",
    title: "Technologies, POS, CRM & Robotique",
    shortDesc: "Système de caisse et gestion restaurant clé en main, CRM commercial et robots de service.",
    clientBenefit: "Fluidifiez vos opérations en point de vente, centralisez vos commandes et modernisez l'accueil client.",
    fromPrice: "POS 2 000 € · Robots dès 499 €/m",
    href: "/services/robotique",
    icon: Bot,
    visualTag: "Caisse connectée & robotique",
  },
];

export function CoreExpertisesGridSection() {
  return (
    <section id="expertises" className="relative bg-[#F8F6F0] py-20 sm:py-28 text-[#0B0B0C]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-[#0B0B0C]/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#8B704F]" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                  03 · EXPERTISES PRINCIPALES
                </span>
              </div>
              <h2 className="mt-4 font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.05] text-[#0B0B0C]">
                Sept pôles d&apos;expertise complémentaires,{" "}
                <span className="italic text-[#8B704F]">conçus pour convertir.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#4E4840]">
              Chaque prestation répond à un objectif commercial précis : visibilité, crédibilité, acquisition de
              prospects ou performance opérationnelle.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CORE_EXPERTISES.map((exp, idx) => {
            const Icon = exp.icon;
            const isWide = idx === 6;
            return (
              <Reveal key={exp.id} delay={idx * 45} className={isWide ? "md:col-span-2 lg:col-span-3" : ""}>
                <div
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[#0B0B0C]/12 bg-[#FDFBF7] p-6 sm:p-7 shadow-[0_14px_36px_-18px_rgba(11,11,12,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B704F] hover:shadow-[0_24px_48px_-20px_rgba(139,112,79,0.22)] ${
                    isWide ? "lg:flex-row lg:items-center lg:gap-10" : ""
                  }`}
                >
                  {/* Illustration spécifique en en-tête de carte */}
                  <div className={isWide ? "lg:w-2/5 shrink-0" : ""}>
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-[#0B0B0C]/10 bg-[#101114]">
                      <img
                        src={XR_PHOTOS[exp.id as keyof typeof XR_PHOTOS]}
                        alt={exp.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/90 via-[#0B0B0C]/30 to-transparent" />
                      <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-full border border-[#E8DCC4]/25 bg-[#0B0B0C]/75 px-3 py-1 backdrop-blur-md">
                        <span className="font-mono text-[9px] font-bold text-[#C5A059]">{exp.num}</span>
                        <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#F8F6F0]">
                          {exp.visualTag}
                        </span>
                      </div>
                      <div className="absolute bottom-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-xl border border-[#E8DCC4]/30 bg-[#0B0B0C]/80 text-[#E8DCC4]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Contenu structuré : Titre, Description courte, Bénéfice client, Accès page dédiée */}
                  <div className={`flex flex-1 flex-col justify-between ${isWide ? "mt-5 lg:mt-0" : "mt-5"}`}>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0B0B0C] group-hover:text-[#8B704F] transition-colors">
                          {exp.title}
                        </h3>
                        <span className="shrink-0 rounded-full border border-[#8B704F]/35 bg-[#E8DCC4]/35 px-3 py-1 font-mono text-[9.5px] font-bold text-[#0B0B0C]">
                          {exp.fromPrice}
                        </span>
                      </div>

                      <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-[#4A443C]">
                        {exp.shortDesc}
                      </p>

                      <div className="mt-4 rounded-xl border border-[#8B704F]/20 bg-[#F8F6F0] p-3">
                        <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#8B704F]">
                          BÉNÉFICE CLIENT
                        </span>
                        <p className="mt-1 text-xs font-medium leading-snug text-[#1C1A17]">{exp.clientBenefit}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#0B0B0C]/10 pt-4">
                      <Link
                        to={exp.href}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0B0B0C] group-hover:text-[#8B704F] transition-colors"
                      >
                        <span>Découvrir la prestation</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <a
                        href="#configurateur"
                        className="font-mono text-[9.5px] font-semibold text-[#8B704F] hover:underline"
                      >
                        Ajouter au devis →
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4 — PRÉSENTATION ÉDITORIALE DES SERVICES & TARIFS OFFICIELS
   (Composition variée inspirée de NexPro — Zéro cartes identiques)
   ========================================================================== */
export function EditorialServicesShowcaseSection() {
  const [activeSocialTier, setActiveSocialTier] = useState<"essentiel" | "croissance" | "autorite">("croissance");

  return (
    <section
      id="presentation-services"
      className="relative border-t border-[#0B0B0C]/10 bg-[#FDFBF7] py-20 sm:py-28 text-[#0B0B0C]"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#8B704F]" />
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#8B704F]">
                04 · OFFRES &amp; TARIFS OFFICIELS
              </span>
            </div>
            <h2 className="mt-4 font-serif text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.04] text-[#0B0B0C]">
              Des offres limpides,{" "}
              <span className="italic text-[#8B704F]">des tarifs connus d&apos;avance.</span>
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16.5px] leading-relaxed text-[#464039]">
              Découvrez dans le détail nos sept domaines d&apos;intervention. Chaque formule affiche clairement son
              périmètre, son tarif et ses modalités pour vous permettre de décider en toute transparence.
            </p>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────────
            4.1 — SITES WEB (Composition Panoramique + Maquette d'interface HTML/CSS)
           ────────────────────────────────────────────────────────────────────── */}
        <Reveal delay={40}>
          <div className="mt-16 overflow-hidden rounded-[2rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] shadow-[0_24px_60px_-25px_rgba(11,11,12,0.14)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* Colonne gauche : Présentation & 3 Formules */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B704F]">
                      EXPERTISE 01 · CRÉATION DE SITES WEB
                    </span>
                    <span className="rounded-full bg-[#0B0B0C] px-3 py-1 font-mono text-[8.5px] font-bold text-[#F8F6F0]">
                      PROPRIÉTÉ 100 % CLIENT
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-[#0B0B0C]">
                    Sites Web haute conversion : Vitrine, Business &amp; E-commerce
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A443C]">
                    Nous concevons des sites rapides, élégants et structurés pour transformer vos visiteurs en prises de
                    contact, réservations ou commandes en ligne.
                  </p>

                  {/* Les 3 formules officielles Sites Web */}
                  <div className="mt-7 space-y-4">
                    <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-5 transition hover:border-[#8B704F]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <span className="font-mono text-[8.5px] font-bold uppercase tracking-widest text-[#8B704F]">
                            FORMULE 01
                          </span>
                          <h4 className="text-base font-bold text-[#0B0B0C]">Site Vitrine Pro</h4>
                        </div>
                        <span className="font-serif text-2xl font-bold text-[#0B0B0C]">499 €</span>
                      </div>
                      <p className="mt-2 text-xs text-[#4A443C]">
                        Jusqu&apos;à 3 pages sur mesure, design responsive mobile &amp; desktop, formulaire de contact,
                        intégration WhatsApp et optimisation SEO initiale.
                      </p>
                    </div>

                    <div className="rounded-2xl border-2 border-[#8B704F] bg-[#FDFBF7] p-5 shadow-sm">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-[#8B704F] px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase text-[#F8F6F0]">
                            RECOMMANDÉ PME
                          </span>
                          <h4 className="text-base font-bold text-[#0B0B0C]">Site Business</h4>
                        </div>
                        <span className="font-serif text-2xl font-bold text-[#0B0B0C]">799 €</span>
                      </div>
                      <p className="mt-2 text-xs text-[#4A443C]">
                        Jusqu&apos;à 5 pages, architecture commerciale complète, galerie ou réalisations, blog
                        administrable, suivi analytique et optimisation de conversion.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-5 transition hover:border-[#8B704F]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <span className="font-mono text-[8.5px] font-bold uppercase tracking-widest text-[#8B704F]">
                            FORMULE 03
                          </span>
                          <h4 className="text-base font-bold text-[#0B0B0C]">E-commerce &amp; Réservation</h4>
                        </div>
                        <span className="font-serif text-2xl font-bold text-[#0B0B0C]">1 499 €</span>
                      </div>
                      <p className="mt-2 text-xs text-[#4A443C]">
                        Catalogue produits ou prestations, paiement sécurisé en ligne (Stripe / CB), gestion des
                        commandes ou réservations et tableau de bord complet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#0B0B0C]/10 pt-5">
                  <Link
                    to="/services/websites"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0C] px-6 py-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#F8F6F0] hover:bg-[#8B704F] transition"
                  >
                    <span>Détails des offres Sites Web</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C5A059]" />
                  </Link>
                  <a
                    href="#configurateur"
                    className="font-mono text-xs font-bold text-[#8B704F] hover:underline"
                  >
                    Configurer mon site →
                  </a>
                </div>
              </div>

              {/* Colonne droite : Illustration d'interface HTML/CSS 100% lisible (Zéro faux texte IA) */}
              <div className="relative flex flex-col justify-center bg-[#101114] p-7 sm:p-10 text-[#F8F6F0]">
                <img
                  src={XR_PHOTOS.websites}
                  alt="Création de site web sur mesure"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                />
                <div className="relative z-10 rounded-2xl border border-[#E8DCC4]/20 bg-[#0B0B0C]/90 p-5 shadow-2xl backdrop-blur-xl">
                  {/* Barre de navigateur réaliste */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#8B704F]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#C5A059]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#E8DCC4]/40" />
                    </div>
                    <span className="rounded-md bg-white/5 px-3 py-1 font-mono text-[9px] text-[#E8DCC4]">
                      https://votre-entreprise.fr · HTTPS Sécurisé
                    </span>
                    <span className="font-mono text-[8.5px] text-[#C5A059]">Mobile &amp; PC</span>
                  </div>

                  {/* Contenu simulé d'une interface client réelle et lisible */}
                  <div className="mt-4 rounded-xl bg-[#F8F6F0] p-4 text-[#0B0B0C]">
                    <div className="flex items-center justify-between border-b border-[#0B0B0C]/10 pb-2.5">
                      <span className="font-serif text-xs font-bold tracking-wider">MAISON D&apos;ARCHITECTURE</span>
                      <span className="rounded-full bg-[#0B0B0C] px-2.5 py-1 text-[8px] font-bold text-[#F8F6F0]">
                        Demander un rendez-vous
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_0.8fr] items-center">
                      <div>
                        <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#8B704F]">
                          ARCHITECTURE INTÉRIEURE · PARIS
                        </span>
                        <p className="mt-1 font-serif text-base font-semibold leading-snug">
                          Concevez des espaces de caractère, livrés clé en main.
                        </p>
                        <div className="mt-2.5 flex gap-2">
                          <span className="rounded-full bg-[#8B704F] px-2.5 py-1 text-[8px] font-bold text-white">
                            Voir le portfolio
                          </span>
                          <span className="rounded-full border border-[#0B0B0C]/20 px-2.5 py-1 text-[8px] font-semibold">
                            Estimer mon projet
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-[#0B0B0C]/10 bg-[#FDFBF7] p-2.5">
                        <span className="block font-mono text-[7.5px] text-[#8B704F] font-bold">
                          PARCOURS DE CONVERSION
                        </span>
                        <ul className="mt-1.5 space-y-1 text-[9px] text-[#2C2925]">
                          <li>✓ Chargement instantané</li>
                          <li>✓ Appel &amp; WhatsApp en 1 clic</li>
                          <li>✓ Formulaire relié au CRM</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Indicateurs techniques vérifiables */}
                  <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="block font-mono text-[8px] text-[#E8DCC4]/70">RESPONSIVE</span>
                      <span className="mt-0.5 block text-xs font-bold text-[#F8F6F0]">Mobile · Tablette · PC</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="block font-mono text-[8px] text-[#E8DCC4]/70">STRUCTURE SEO</span>
                      <span className="mt-0.5 block text-xs font-bold text-[#C5A059]">Balisage &amp; Indexation</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="block font-mono text-[8px] text-[#E8DCC4]/70">PROPRIÉTÉ</span>
                      <span className="mt-0.5 block text-xs font-bold text-[#F8F6F0]">Sans location forcée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────────
            4.2 — BRANDING & IDENTITÉ VISUELLE + 4.3 — SEO NATUREL (Duo Asymétrique)
           ────────────────────────────────────────────────────────────────────── */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* BRANDING (7 colonnes) */}
          <Reveal delay={60} className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#0B0B0C]/12 bg-[#101114] p-7 sm:p-10 text-[#F8F6F0]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#C5A059]">
                    EXPERTISE 02 · BRANDING &amp; IDENTITÉ VISUELLE
                  </span>
                  <Palette className="h-4 w-4 text-[#C5A059]" />
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[#F8F6F0]">
                  Une identité visuelle qui impose votre statut dès le premier regard.
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#E8DCC4]/80">
                  Du logotype vectoriel à la charte graphique complète, nous créons des systèmes visuels cohérents pour
                  vos supports digitaux, imprimés et enseignes.
                </p>

                {/* Planche de style visuelle intégrée */}
                <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-[#0B0B0C] p-3.5">
                  <div className="rounded-xl bg-[#F8F6F0] p-3 text-[#0B0B0C]">
                    <span className="font-mono text-[7.5px] font-bold block">IVOIRE</span>
                    <span className="font-mono text-[8px] opacity-70">#F8F6F0</span>
                  </div>
                  <div className="rounded-xl bg-[#E8DCC4] p-3 text-[#0B0B0C]">
                    <span className="font-mono text-[7.5px] font-bold block">CHAMPAGNE</span>
                    <span className="font-mono text-[8px] opacity-70">#E8DCC4</span>
                  </div>
                  <div className="rounded-xl bg-[#8B704F] p-3 text-[#F8F6F0]">
                    <span className="font-mono text-[7.5px] font-bold block">BRONZE</span>
                    <span className="font-mono text-[8px] opacity-80">#8B704F</span>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-[#0B0B0C] p-3 text-[#C5A059]">
                    <span className="font-mono text-[7.5px] font-bold block">OR DISCRET</span>
                    <span className="font-mono text-[8px] opacity-80">#C5A059</span>
                  </div>
                </div>

                {/* Les 3 tarifs officiels Branding */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                    <span className="font-mono text-[8px] text-[#C5A059] uppercase">FORMULE 01</span>
                    <h4 className="mt-1 text-sm font-bold text-white">Logo Signature</h4>
                    <p className="mt-1 font-serif text-2xl font-bold text-[#E8DCC4]">199 €</p>
                    <p className="mt-1.5 text-[11px] text-[#E8DCC4]/75">
                      Création de logo sur mesure, déclinaisons et fichiers sources HD / vectoriels.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#C5A059] bg-white/[0.08] p-4">
                    <span className="font-mono text-[8px] text-[#C5A059] uppercase">FORMULE 02</span>
                    <h4 className="mt-1 text-sm font-bold text-white">Identité de Marque</h4>
                    <p className="mt-1 font-serif text-2xl font-bold text-[#E8DCC4]">299 €</p>
                    <p className="mt-1.5 text-[11px] text-[#E8DCC4]/75">
                      Logo, palette chromatique, typographies officielles et déclinaisons réseaux sociaux.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                    <span className="font-mono text-[8px] text-[#C5A059] uppercase">FORMULE 03</span>
                    <h4 className="mt-1 text-sm font-bold text-white">Charte Graphique Complète</h4>
                    <p className="mt-1 font-serif text-2xl font-bold text-[#E8DCC4]">399 €</p>
                    <p className="mt-1.5 text-[11px] text-[#E8DCC4]/75">
                      Brand Book complet, règles d&apos;usage, papeterie et gabarits commerciaux.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <Link
                  to="/services/branding"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#E8DCC4] hover:text-[#C5A059]"
                >
                  <span>Explorer l&apos;offre Branding</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a href="#configurateur" className="font-mono text-xs text-[#C5A059] hover:underline">
                  Choisir une formule →
                </a>
              </div>
            </div>
          </Reveal>

          {/* SEO & RÉFÉRENCEMENT NATUREL (5 colonnes) */}
          <Reveal delay={90} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] p-7 sm:p-10 text-[#0B0B0C]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B704F]">
                    EXPERTISE 03 · SEO &amp; RÉFÉRENCEMENT NATUREL
                  </span>
                  <TrendingUp className="h-4 w-4 text-[#8B704F]" />
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[#0B0B0C]">
                  Positionnez votre entreprise durablement sur Google.
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#4A443C]">
                  Audit sémantique, optimisation technique des pages, maillage interne et rédaction de contenus ciblés
                  pour capter les recherches commerciales de votre secteur.
                </p>

                {/* Les 2 formules officielles SEO */}
                <div className="mt-6 space-y-3.5">
                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-[#0B0B0C]">SEO Essentiel</h4>
                        <span className="font-mono text-[9px] font-semibold text-[#8B704F]">SANS ENGAGEMENT</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#0B0B0C]">299 €</span>
                        <span className="block font-mono text-[9px] text-[#5A534A]">/ mois</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-[#4A443C]">
                      Optimisation technique, suivi des mots-clés prioritaires, corrections on-page et rapport mensuel.
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-[#8B704F] bg-[#FDFBF7] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-[#0B0B0C]">SEO Croissance</h4>
                        <span className="font-mono text-[9px] font-semibold text-[#8B704F]">ENGAGEMENT 3 MOIS</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#0B0B0C]">499 €</span>
                        <span className="block font-mono text-[9px] text-[#5A534A]">/ mois</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-[#4A443C]">
                      Stratégie de contenu étendue, création de pages d&apos;acquisition, autorité thématique et suivi
                      de conversion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#0B0B0C]/10 pt-4">
                <Link
                  to="/services/seo"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0C] hover:text-[#8B704F]"
                >
                  <span>Détails du référencement SEO</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ──────────────────────────────────────────────────────────────────────
            4.4 — GOOGLE MAPS & VISIBILITÉ LOCALE (Composition Interactive + Carte Locale)
           ────────────────────────────────────────────────────────────────────── */}
        <Reveal delay={80}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] p-7 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              {/* Aperçu d'interface Fiche Google Business Profile lisible */}
              <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-6 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0B0B0C]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B704F]" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#0B0B0C]">
                      APERÇU FICHE GOOGLE BUSINESS PROFILE
                    </span>
                  </div>
                  <span className="rounded-full bg-[#E8DCC4]/60 px-2.5 py-0.5 font-mono text-[8px] font-bold text-[#0B0B0C]">
                    RECHERCHE LOCALE
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl border-2 border-[#8B704F] bg-[#F8F6F0] p-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#0B0B0C] px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#C5A059]">
                          FICHE OPTIMISÉE
                        </span>
                        <span className="text-xs font-bold text-[#0B0B0C]">Votre Établissement</span>
                      </div>
                      <p className="mt-1 text-[10.5px] text-[#4A443C]">
                        Catégories structurées · Services détaillés · Photos HD · Zone d&apos;intervention
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="rounded-lg bg-[#0B0B0C] px-2.5 py-1.5 text-[9px] font-bold text-[#F8F6F0]">
                        Appeler
                      </span>
                      <span className="rounded-lg border border-[#0B0B0C]/20 bg-white px-2.5 py-1.5 text-[9px] font-bold text-[#0B0B0C]">
                        Itinéraire
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="rounded-xl border border-[#0B0B0C]/10 bg-white p-3 text-center">
                      <span className="font-mono text-[8px] text-[#8B704F] block">APPELS DIRECTS</span>
                      <span className="mt-1 block text-xs font-bold text-[#0B0B0C]">Clic Mobile</span>
                    </div>
                    <div className="rounded-xl border border-[#0B0B0C]/10 bg-white p-3 text-center">
                      <span className="font-mono text-[8px] text-[#8B704F] block">ITINÉRAIRES</span>
                      <span className="mt-1 block text-xs font-bold text-[#0B0B0C]">Trafic en point de vente</span>
                    </div>
                    <div className="rounded-xl border border-[#0B0B0C]/10 bg-white p-3 text-center">
                      <span className="font-mono text-[8px] text-[#8B704F] block">AVIS CLIENTS</span>
                      <span className="mt-1 block text-xs font-bold text-[#0B0B0C]">Réassurance locale</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Les 4 offres officielles Google Maps & Visibilité Locale */}
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B704F]">
                  EXPERTISE 04 · GOOGLE MAPS &amp; VISIBILITÉ LOCALE
                </span>
                <h3 className="mt-3 font-serif text-3xl text-[#0B0B0C]">
                  Captez les clients qui cherchent vos services autour de vous.
                </h3>
                <p className="mt-2 text-sm text-[#4A443C]">
                  Quatre niveaux d&apos;intervention clairs pour créer, optimiser ou propulser votre fiche Google
                  Business Profile sur votre zone de chalandise.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-4">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[#0B0B0C]">Fiche Pro Optimisée</h4>
                      <span className="font-serif text-xl font-bold text-[#0B0B0C]">99 €</span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#4A443C]">
                      Audit, paramétrage complet des catégories, horaires, attributs, description optimisée et médias.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-4">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[#0B0B0C]">Pack Visibilité Maps</h4>
                      <span className="font-serif text-xl font-bold text-[#0B0B0C]">169 €</span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#4A443C]">
                      Optimisation avancée du catalogue de services, publications Google Posts et cohérence locale.
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-[#8B704F] bg-[#FDFBF7] p-4">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[#0B0B0C]">Domination Locale</h4>
                      <span className="font-serif text-xl font-bold text-[#0B0B0C]">299 €</span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#4A443C]">
                      Dispositif complet d&apos;optimisation multi-critères, citations locales et stratégie de collecte
                      d&apos;avis.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#101114] p-4 text-[#F8F6F0]">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[#E8DCC4]">Option SEO Local Conquête</h4>
                      <span className="font-serif text-xl font-bold text-[#C5A059]">550 €</span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#E8DCC4]/80">
                      Travail ciblé sur <strong>jusqu&apos;à 10 mots-clés locaux</strong> pour renforcer durablement
                      votre présence géographique.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to="/services/maps"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0C] hover:text-[#8B704F]"
                  >
                    <span>Voir la page Google Maps dédiée</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a href="#configurateur" className="font-mono text-xs font-bold text-[#8B704F] hover:underline">
                    Sélectionner dans le devis →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────────
            4.5 — SOCIAL MEDIA & CONTENU (Comparateur Interactif avec Badge « Le plus choisi »)
           ────────────────────────────────────────────────────────────────────── */}
        <Reveal delay={100}>
          <div className="mt-10 rounded-[2rem] border border-[#0B0B0C]/12 bg-[#FDFBF7] p-7 sm:p-10 lg:p-12 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-[#0B0B0C]/10 pb-7 lg:flex-row lg:items-end">
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B704F]">
                  EXPERTISE 05 · SOCIAL MEDIA &amp; CONTENU
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[#0B0B0C]">
                  Faites rayonner votre marque sur les réseaux sociaux.
                </h3>
              </div>
              <Link
                to="/services/social"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8B704F] hover:text-[#0B0B0C]"
              >
                <span>Découvrir la page Social Media</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* Pack Essentiel */}
              <div
                onClick={() => setActiveSocialTier("essentiel")}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  activeSocialTier === "essentiel"
                    ? "border-[#8B704F] bg-[#F8F6F0] shadow-md"
                    : "border-[#0B0B0C]/12 bg-[#F8F6F0]/60 hover:border-[#8B704F]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8B704F]">
                    ENGAGEMENT 3 MOIS
                  </span>
                </div>
                <h4 className="mt-2 font-serif text-2xl font-bold text-[#0B0B0C]">Pack Essentiel</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#0B0B0C]">349 €</span>
                  <span className="font-mono text-xs text-[#5A534A]">/ mois</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#4A443C]">
                  Présence régulière et professionnelle : planning éditorial, création graphique sur mesure, rédaction
                  des publications et programmation mensuelle.
                </p>
              </div>

              {/* Pack Croissance — Le plus choisi */}
              <div
                onClick={() => setActiveSocialTier("croissance")}
                className="relative cursor-pointer rounded-2xl border-2 border-[#8B704F] bg-[#101114] p-6 text-[#F8F6F0] shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#E8DCC4]">
                    ENGAGEMENT 6 MOIS
                  </span>
                  <span className="rounded-full bg-[#C5A059] px-3 py-1 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#0B0B0C]">
                    Le plus choisi
                  </span>
                </div>
                <h4 className="mt-2 font-serif text-2xl font-bold text-white">Pack Croissance</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#C5A059]">499 €</span>
                  <span className="font-mono text-xs text-[#E8DCC4]/75">/ mois</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#E8DCC4]/85">
                  Cadence soutenue multi-formats (carrousels, stories, vidéos courtes Reels/TikTok), direction
                  artistique dédiée et reporting d&apos;audience mensuel.
                </p>
              </div>

              {/* Pack Autorité */}
              <div
                onClick={() => setActiveSocialTier("autorite")}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  activeSocialTier === "autorite"
                    ? "border-[#8B704F] bg-[#F8F6F0] shadow-md"
                    : "border-[#0B0B0C]/12 bg-[#F8F6F0]/60 hover:border-[#8B704F]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8B704F]">
                    ENGAGEMENT 6 MOIS
                  </span>
                </div>
                <h4 className="mt-2 font-serif text-2xl font-bold text-[#0B0B0C]">Pack Autorité</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#0B0B0C]">799 €</span>
                  <span className="font-mono text-xs text-[#5A534A]">/ mois</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#4A443C]">
                  Accompagnement intensif pour les marques ambitieuses : production éditoriale haute fréquence, vidéos
                  verticales premium, animation et pilotage stratégique.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────────
            4.6 — MAINTENANCE & WEBCARE + 4.7 — TECHNOLOGIES, POS, CRM & ROBOTIQUE
           ────────────────────────────────────────────────────────────────────── */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* MAINTENANCE & WEBCARE */}
          <Reveal delay={110}>
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#0B0B0C]/12 bg-[#F8F6F0] p-7 sm:p-10">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B704F]">
                    EXPERTISE 06 · MAINTENANCE &amp; WEBCARE
                  </span>
                  <ShieldCheck className="h-4 w-4 text-[#8B704F]" />
                </div>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[#0B0B0C]">
                  Sécurité, sauvegardes et mises à jour continues.
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-4 text-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0C]">Essentiel</h4>
                    <p className="mt-2 font-serif text-2xl font-bold text-[#0B0B0C]">29 €</p>
                    <span className="font-mono text-[9px] text-[#5A534A]">/ mois</span>
                  </div>
                  <div className="rounded-2xl border-2 border-[#8B704F] bg-[#FDFBF7] p-4 text-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B704F]">Pro</h4>
                    <p className="mt-2 font-serif text-2xl font-bold text-[#0B0B0C]">49 €</p>
                    <span className="font-mono text-[9px] text-[#5A534A]">/ mois</span>
                  </div>
                  <div className="rounded-2xl border border-[#0B0B0C]/12 bg-[#FDFBF7] p-4 text-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0C]">Business</h4>
                    <p className="mt-2 font-serif text-2xl font-bold text-[#0B0B0C]">99 €</p>
                    <span className="font-mono text-[9px] text-[#5A534A]">/ mois</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#8B704F]/30 bg-[#E8DCC4]/35 px-4 py-3">
                  <span className="text-xs font-semibold text-[#0B0B0C]">
                    Option Nom de domaine + Hébergement haute disponibilité
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0B0B0C]">79 € / an</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#0B0B0C]/10 pt-4">
                <Link
                  to="/services/webcare"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0C] hover:text-[#8B704F]"
                >
                  <span>Comparer les plans WebCare</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* TECHNOLOGIES, POS, CRM ET ROBOTIQUE */}
          <Reveal delay={130}>
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#0B0B0C]/12 bg-[#101114] p-7 sm:p-10 text-[#F8F6F0]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#C5A059]">
                    EXPERTISE 07 · TECHNOLOGIES, POS, CRM &amp; ROBOTIQUE
                  </span>
                  <Bot className="h-4 w-4 text-[#C5A059]" />
                </div>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-white">
                  Caisse restaurant connectée &amp; robotique de service.
                </h3>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#E8DCC4]">
                        Système de caisse et gestion restaurant (Installation complète)
                      </h4>
                      <span className="font-serif text-2xl font-bold text-[#C5A059] shrink-0">2 000 €</span>
                    </div>
                    <p className="mt-1 text-xs text-[#E8DCC4]/75">
                      Prise de commande, synchronisation salle/cuisine, click &amp; collect, gestion des tables et suivi
                      du chiffre d&apos;affaires.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#C5A059]/45 bg-white/[0.06] p-4">
                    <h4 className="text-sm font-bold text-white">Robots de service autonomes</h4>
                    <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs">
                      <div className="rounded-xl bg-[#0B0B0C] p-2.5 border border-white/10">
                        <span className="font-mono text-[8px] text-[#C5A059] block">LOCATION</span>
                        <span className="font-bold text-white">Dès 499 € / mois</span>
                      </div>
                      <div className="rounded-xl bg-[#0B0B0C] p-2.5 border border-white/10">
                        <span className="font-mono text-[8px] text-[#C5A059] block">ACHAT (SELON MODÈLE)</span>
                        <span className="font-bold text-white">8 000 € à 21 000 € HT</span>
                      </div>
                      <div className="rounded-xl bg-[#0B0B0C] p-2.5 border border-white/10">
                        <span className="font-mono text-[8px] text-[#C5A059] block">DÉMO CONDITIONS RÉELLES</span>
                        <span className="font-bold text-white">250 € (déduits si commande)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <Link
                  to="/services/robotique"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#E8DCC4] hover:text-[#C5A059]"
                >
                  <span>Découvrir nos solutions POS &amp; Robotique</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
