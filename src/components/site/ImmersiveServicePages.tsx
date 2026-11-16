import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Cpu,
  Globe2,
  Layers,
  MapPin,
  MessageCircle,
  Monitor,
  Palette,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { XR_PHOTOS } from "@/lib/photography";
import { useLang } from "@/lib/i18n";

import sectorConstruction from "@/assets/sector-construction.jpg";
import sectorRestaurant from "@/assets/sector-restaurant.jpg";
import sectorHealth from "@/assets/sector-health.jpg";
import pfMaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";

const WA_BASE = "https://wa.me/33767566783?text=";

// ════════════════════════════════════════════════════════════════════════════
// 1. WEBSITES STUDIO PAGE (/services/websites) — Niveau SocialSalesPage
// ════════════════════════════════════════════════════════════════════════════
export function WebsitesStudioPage() {
  const { t, price } = useLang();
  const service = SERVICES.find((s) => s.id === "websites")!;
  const [selectedSector, setSelectedSector] = useState<"artisan" | "restaurant" | "clinique" | "ecommerce">("artisan");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [paymentMode, setPaymentMode] = useState<"once" | "monthly">("once");

  const sectorPreviews = {
    artisan: {
      title: "Artisans, BTP & Services d'Urgence",
      subtitle: "Conçu pour déclencher des appels immédiats sur mobile et convertir le trafic local.",
      kpis: ["+210 % d'appels entrants", "Temps de chargement 0.6s", "Bouton d'appel & WhatsApp fixe"],
      recommendedPlan: "Site Vitrine Pro (499 €)",
      image: sectorConstruction,
    },
    restaurant: {
      title: "Restaurants, Hôtellerie & Lieux de Vie",
      subtitle: "Direction artistique immersive, carte interactive et réservation de table en 2 clics.",
      kpis: ["Zéro commission sur réservations", "Menu QR & Photos HD", "Connexion Google Maps Top 3"],
      recommendedPlan: "Site Business Sur-Mesure (799 €)",
      image: sectorRestaurant,
    },
    clinique: {
      title: "Cliniques, Cabinets Médicaux, Avocats & Prestige",
      subtitle: "Éditorial haute couture, prise de rendez-vous synchronisée et crédibilité institutionnelle.",
      kpis: ["Image de marque haut de gamme", "Prise de RDV Doctolib / Calendly", "Architecture SEO multi-villes"],
      recommendedPlan: "Site Business Sur-Mesure (799 €)",
      image: sectorHealth,
    },
    ecommerce: {
      title: "Boutiques E-Commerce, Marques & Enseignes",
      subtitle: "Tunnel d'achat ultra-fluide, Apple Pay / Stripe, gestion des stocks et relance paniers.",
      kpis: ["Checkout 1-clic mobile", "Catalogue illimité", "SEO fiches produits automatisé"],
      recommendedPlan: "Site E-Commerce & Réservation (1 499 €)",
      image: pfMaisonLumiere,
    },
  };

  const activeSector = sectorPreviews[selectedSector];

  return (
    <div className="min-h-screen bg-[#f5f1e9] text-[#141513]">
      <Nav />
      <main>
        {/* Hero Cinématique Studio Web */}
        <section className="relative isolate overflow-hidden bg-[#0e1012] pt-28 pb-16 text-[#f5f1e9] sm:pt-36 sm:pb-24">
          <img
            src={XR_PHOTOS.websites}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-[#0e1012]/85 to-[#0e1012]" />

          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e5cba4]">
                <Monitor className="h-3.5 w-3.5" /> STUDIO ARCHITECTURE WEB · LIVRAISON 7 JOURS
              </span>
              <h1 className="mt-5 font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.94] tracking-tight text-white">
                Des sites web haute couture, pensés pour{" "}
                <em className="text-[#c5a880] not-italic">convertir</em> sur mobile & PC.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                Maquette personnalisée validée avant mise en ligne, design ultra-rapide, référencement Google intégré et propriété à 100 % du code. Dès 499 €.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 rounded-full bg-[#c5a880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#101114] transition hover:bg-[#d8be98]"
                >
                  Voir les 3 formules (499 € · 799 € · 1 499 €)
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`${WA_BASE}${encodeURIComponent("Bonjour XR Agency, je souhaiterais demander une maquette gratuite pour mon site internet.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#c5a880]"
                >
                  <MessageCircle className="h-4 w-4 text-[#c5a880]" />
                  Demander ma maquette gratuite
                </a>
              </div>
            </div>

            {/* Double Mockup Interactif : PC + Smartphone en Direct */}
            <div className="mt-12 rounded-3xl border border-white/15 bg-[#15171c]/90 p-5 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: "artisan", label: "🔧 Artisans & Services" },
                      { id: "restaurant", label: "🍽️ Restaurants & Hôtels" },
                      { id: "clinique", label: "🏛️ Cliniques, Cabinets & Luxe" },
                      { id: "ecommerce", label: "🛍️ E-Commerce & Marques" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedSector(tab.id)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedSector === tab.id
                          ? "bg-[#c5a880] text-[#101114]"
                          : "border border-white/15 bg-white/5 text-white/75 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 p-1">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      previewDevice === "desktop" ? "bg-white text-black" : "text-white/70"
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" /> Vue PC
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      previewDevice === "mobile" ? "bg-white text-black" : "text-white/70"
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" /> Vue Mobile 9:16
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-4">
                  <span className="inline-block rounded-full bg-[#c5a880]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#e5cba4]">
                    SIMULATEUR D’ARCHITECTURE PAR MÉTIER
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">{activeSector.title}</h2>
                  <p className="text-sm leading-relaxed text-white/70">{activeSector.subtitle}</p>
                  <ul className="space-y-2 pt-2">
                    {activeSector.kpis.map((k) => (
                      <li key={k} className="flex items-center gap-2.5 text-xs font-medium text-emerald-300">
                        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-[#c5a880]/30 bg-black/40 p-4">
                    <span className="block font-mono text-[10px] uppercase text-white/50">
                      Formule recommandée :
                    </span>
                    <p className="mt-1 text-base font-bold text-[#e5cba4]">{activeSector.recommendedPlan}</p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex justify-center">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl transition-all duration-500 ${
                      previewDevice === "mobile" ? "w-[290px] aspect-[9/16] rounded-[2.2rem]" : "w-full aspect-[16/10]"
                    }`}
                  >
                    <img
                      src={activeSector.image}
                      alt={activeSector.title}
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="rounded-full bg-[#c5a880] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-black">
                        Rendu Cinématique XR
                      </span>
                      <p className="mt-2 font-serif text-xl sm:text-2xl">{activeSector.title}</p>
                      <p className="mt-1 text-xs text-white/75">
                        Interface 100 % fluide sur iPhone, Android, Tablette & Desktop.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Les 4 étapes clés : Maquette Gratuite -> Livraison 7 jours */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24">
          <div className="text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8b704f]">
              MÉTHODE XR AGENCY · ZÉRO SURPRISE
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl">
              Vous validez la maquette avant la mise en ligne.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Brief & Maquette 24–48h",
                desc: "Notre direction artistique conçoit le prototype visuel de votre futur site pour que vous puissiez le juger sur pièce.",
              },
              {
                step: "02",
                title: "Développement Haute Vitesse",
                desc: "Intégration sur-mesure ultra-rapide, pensée pour les dirigeants et leurs clients sur téléphone comme sur ordinateur.",
              },
              {
                step: "03",
                title: "SEO & Formulaires Connectés",
                desc: "Balisage Google complet, boutons d'appels directs, WhatsApp et formulaires de devis reliés à votre boîte mail.",
              },
              {
                step: "04",
                title: "Mise en ligne à J+7",
                desc: "Déploiement sur votre nom de domaine avec certificat SSL, propriété totale et accompagnement WebCare.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[#141513]/10 bg-white p-6 shadow-sm"
              >
                <span className="font-mono text-xs font-bold text-[#8b704f]">ÉTAPE {item.step}</span>
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4e4b46]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tarifs Officiels Sites Web : 499 € / 799 € / 1 499 € */}
        <section id="plans" className="bg-[#101215] py-16 text-white sm:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c5a880]">
                  TARIFS OFFICIELS TRANSPARENTS
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-5xl">
                  Choisissez l’envergure de votre site internet.
                </h2>
              </div>

              <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setPaymentMode("once")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    paymentMode === "once" ? "bg-[#c5a880] text-[#101114]" : "text-white/70"
                  }`}
                >
                  Paiement Comptant
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("monthly")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    paymentMode === "monthly" ? "bg-[#c5a880] text-[#101114]" : "text-white/70"
                  }`}
                >
                  Mensualités 12 mois
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {service.plans.map((p, idx) => {
                const displayEur =
                  paymentMode === "monthly" ? Math.round((p.eur * 1.4) / 12) : p.eur;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col justify-between rounded-3xl border p-7 ${
                      p.popular
                        ? "border-[#c5a880] bg-gradient-to-b from-[#1e1b16] to-[#131519] shadow-[0_20px_60px_rgba(197,168,128,0.2)]"
                        : "border-white/10 bg-[#15171c]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#c5a880]">FORMULE 0{idx + 1}</span>
                        {p.popular && (
                          <span className="rounded-full bg-[#c5a880] px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#101114]">
                            Le plus choisi
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-serif text-3xl">{t(p.name)}</h3>
                      <div className="mt-5 flex items-baseline gap-2 border-y border-white/10 py-5">
                        <span className="font-serif text-5xl font-bold text-white">
                          {price(displayEur)}
                        </span>
                        <span className="font-mono text-xs text-white/60">
                          {paymentMode === "monthly" ? "/ mois (sur 12 mois)" : "paiement unique"}
                        </span>
                      </div>
                      <ul className="mt-5 space-y-2.5">
                        {(p.features ?? []).map((f, k) => (
                          <li key={k} className="flex items-start gap-2.5 text-xs text-white/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" />
                            <span>{t(f)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 space-y-2.5">
                      <AddToCartBtn
                        item={{
                          serviceId: "websites",
                          serviceName: t(service.title),
                          planName: t(p.name) + (paymentMode === "monthly" ? " (12 mois)" : ""),
                          priceEur: displayEur,
                          period: paymentMode === "monthly" ? "month" : "once",
                          periodLabel:
                            paymentMode === "monthly" ? "/ mois" : t(PERIOD_LABEL.once),
                        }}
                        popular={p.popular}
                      />
                      <a
                        href={`${WA_BASE}${encodeURIComponent(`Bonjour XR Agency, je souhaite lancer mon ${t(p.name)} (${price(displayEur)}).`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-xs font-semibold text-white/80 hover:border-[#c5a880] hover:text-white"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Discuter sur WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2. GOOGLE MAPS TOP 3 STUDIO PAGE (/services/maps) — Niveau SocialSalesPage
// ════════════════════════════════════════════════════════════════════════════
export function MapsDominationStudioPage() {
  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#f8f6f0]">
      <Nav />
      <main>
        {/* Hero Cinématique Google Maps Top 3 */}
        <section className="relative isolate overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              background:
                "radial-gradient(900px circle at 20% 20%, rgba(197,168,128,0.22), transparent 65%), radial-gradient(800px circle at 80% 70%, rgba(16,185,129,0.16), transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                <MapPin className="h-3.5 w-3.5" /> GARANTIE CONTRACTUELLE TOP 3 · 24H/24 & 7J/7 PENDANT 1 AN
              </span>
              <h1 className="mt-5 font-serif text-[clamp(2.4rem,6vw,5.3rem)] leading-[0.94] text-white">
                Soyez dans les <span className="text-[#c5a880]">3 premiers résultats</span> Google Maps de votre ville, ou nous vous remboursons.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                72 % des clients qui cherchent un commerce, un artisan, un restaurant ou une clinique sur leur téléphone appellent l’un des 3 premiers résultats Google Maps. Zéro abonnement mensuel : uniquement deux offres annuelles claires soumises à la validation de nos experts.
              </p>

              {/* Comparatif visuel immédiat des 2 offres Maps */}
              <div className="mt-10 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                <div className="rounded-3xl border border-[#c5a880] bg-gradient-to-b from-[#1f1b15] to-[#12141a] p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#c5a880] px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#101114]">
                      OFFRE 1 · PROPULSION & GARANTIE
                    </span>
                    <span className="font-mono text-xs text-[#e5cba4]">Validation experts requise</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-white">
                    Top 3 Google Maps Garanti 1 An (24h/24, 7j/7)
                  </h2>
                  <p className="mt-2 font-serif text-4xl font-bold text-[#e5cba4]">
                    À partir de 999 € <span className="text-sm font-normal text-white/65">/ an</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Le tarif annuel exact dépend de vos mots-clés (ex: Serrurier Paris), de votre page actuelle sur Google Maps et du nombre d'habitants de votre ville. Création de fiche incluse si vous n'êtes pas encore sur Google Maps.
                  </p>
                </div>

                <div className="rounded-3xl border border-emerald-400/40 bg-gradient-to-b from-emerald-950/35 to-[#12141a] p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-400 px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#101114]">
                      OFFRE 2 · PILOTAGE COMPLET 12 MOIS
                    </span>
                    <span className="font-mono text-xs text-emerald-300">Tarif fixe annuel</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-white">
                    Gestion Annuelle de Fiche Google Maps
                  </h2>
                  <p className="mt-2 font-serif text-4xl font-bold text-emerald-300">
                    500 € <span className="text-sm font-normal text-white/65">/ an</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Nous gérons intégralement votre fiche Google Business Profile pendant 1 an : publications régulières de photos géolocalisées, réponses professionnelles aux avis clients, protection anti-modifications et reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulateur Interactif Google Maps */}
        <section className="py-10">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <MapsSimulator />
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3. BRANDING & IDENTITÉ VISUELLE STUDIO PAGE (/services/branding)
// ════════════════════════════════════════════════════════════════════════════
export function BrandingStudioPage() {
  const { t, price } = useLang();
  const service = SERVICES.find((s) => s.id === "branding")!;
  const [selectedPalette, setSelectedPalette] = useState<number>(0);

  const palettes = [
    {
      name: "Obsidienne & Bronze Impérial",
      vibe: "Maisons de prestige, Horlogerie, Immobilier, Cabinets d'affaires",
      colors: ["#0E0F12", "#1B1916", "#C5A880", "#E5CBA4", "#F8F6F0"],
    },
    {
      name: "Jade Émeraude & Craie Minérale",
      vibe: "Cliniques esthétiques, Hôtellerie, Bien-être, Gastronomie",
      colors: ["#101815", "#1F352C", "#8DA99A", "#D7D0C4", "#F5F1E9"],
    },
    {
      name: "Cobalt Technologique & Argent",
      vibe: "SaaS, Intelligence Artificielle, Industrie, Robotique & FinTech",
      colors: ["#090D16", "#131F38", "#38BDF8", "#94A3B8", "#F8FAFC"],
    },
  ];

  const activePalette = palettes[selectedPalette];

  return (
    <div className="min-h-screen bg-[#f5f1e9] text-[#141513]">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-[#111215] pt-28 pb-20 text-white sm:pt-36">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e5cba4]">
                  <Palette className="h-3.5 w-3.5" /> DIRECTION ARTISTIQUE & IDENTITÉ DE MARQUE
                </span>
                <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.94]">
                  Une identité visuelle qui impose le{" "}
                  <em className="text-[#c5a880] not-italic">respect</em> dès la première seconde.
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
                  Logo vectoriel, charte graphique complète, typographies éditoriales, supports imprimés et kit réseaux sociaux. Dès 199 €.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-2 rounded-full bg-[#c5a880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#101114]"
                  >
                    Voir les formules Branding (199 € · 399 € · 699 €)
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Studio Interactif de Direction Artistique */}
              <div className="rounded-3xl border border-white/15 bg-[#181a20] p-6 sm:p-8 shadow-2xl lg:col-span-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">
                  ATELIER CHROMATIQUE INTERACTIF · TESTEZ UNE AMBIANCE
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {palettes.map((pal, idx) => (
                    <button
                      key={pal.name}
                      type="button"
                      onClick={() => setSelectedPalette(idx)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        selectedPalette === idx
                          ? "bg-[#c5a880] text-[#101114]"
                          : "border border-white/15 bg-white/5 text-white/75"
                      }`}
                    >
                      {pal.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-5 gap-2.5">
                  {activePalette.colors.map((hex) => (
                    <div key={hex} className="space-y-1.5 text-center">
                      <div
                        className="h-24 w-full rounded-2xl border border-white/20 shadow-inner transition-all duration-500"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="block font-mono text-[10px] text-white/70">{hex}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="font-serif text-xl text-white">{activePalette.name}</p>
                  <p className="mt-1 text-xs text-white/65">Idéal pour : {activePalette.vibe}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formules Branding */}
        <section id="plans" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {service.plans.map((p, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between rounded-3xl border p-7 ${
                  p.popular
                    ? "border-[#141513] bg-[#141513] text-white shadow-2xl"
                    : "border-[#141513]/15 bg-white text-[#141513]"
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-[#c5a880]">BRANDING 0{idx + 1}</span>
                  <h3 className="mt-3 font-serif text-3xl">{t(p.name)}</h3>
                  <div className="mt-5 flex items-baseline gap-2 border-y border-current/10 py-5">
                    <span className="font-serif text-5xl font-bold">{price(p.eur)}</span>
                    <span className="font-mono text-xs opacity-65">paiement unique</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {(p.features ?? []).map((f, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-xs opacity-85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" />
                        <span>{t(f)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <AddToCartBtn
                    item={{
                      serviceId: "branding",
                      serviceName: t(service.title),
                      planName: t(p.name),
                      priceEur: p.eur,
                      period: "once",
                      periodLabel: t(PERIOD_LABEL.once),
                    }}
                    popular={p.popular}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4. IA, AUTOMATISATION & LOGICIELS SUR-MESURE (/services/ai, /services/strategy)
// ════════════════════════════════════════════════════════════════════════════
export function AiAndCustomSoftwareStudioPage() {
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(18);
  const [teamSize, setTeamSize] = useState(4);
  const annualSavingsEur = hoursSavedPerWeek * teamSize * 45 * 48;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <Nav />
      <main>
        <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e5cba4]">
                  <Cpu className="h-3.5 w-3.5" /> INGÉNIERIE IA · LOGICIELS MÉTIERS & AUTOMATISATION
                </span>
                <h1 className="mt-5 font-serif text-[clamp(2.3rem,5.4vw,4.8rem)] leading-[0.95]">
                  Développement de logiciels sur-mesure, agents IA & automatisation 24h/24.
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
                  Au-delà des sites internet, XR Agency conçoit vos outils internes sur-mesure : plateformes métiers, systèmes POS, automatisation des devis/factures, qualification IA sur WhatsApp et connecteurs API.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="/#quote"
                    className="inline-flex items-center gap-2 rounded-full bg-[#c5a880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#101114]"
                  >
                    Chiffrer mon logiciel ou agent IA <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/services/robotique"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#c5a880]"
                  >
                    <Bot className="h-4 w-4 text-[#c5a880]" /> Voir aussi nos Robots Physiques
                  </Link>
                </div>
              </div>

              {/* Simulateur de ROI Automatisation & Logiciel */}
              <div className="rounded-3xl border border-[#c5a880]/35 bg-[#13161f] p-6 sm:p-8 shadow-2xl lg:col-span-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">
                  SIMULATEUR DE RENTABILITÉ IA & LOGICIEL SUR-MESURE
                </span>
                <h2 className="mt-2 text-xl font-bold text-white">
                  Calculez le temps et le budget économisés chaque année
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/75">Heures répétitives économisées / semaine / personne :</span>
                      <strong className="font-mono text-[#e5cba4]">{hoursSavedPerWeek} h / sem</strong>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={35}
                      value={hoursSavedPerWeek}
                      onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                      className="mt-2 w-full accent-[#c5a880]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/75">Collaborateurs équipés :</span>
                      <strong className="font-mono text-[#e5cba4]">{teamSize} personnes</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="mt-2 w-full accent-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/35 bg-emerald-500/10 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    GAIN DE PRODUCTIVITÉ ANNUEL ESTIMÉ :
                  </span>
                  <p className="mt-1 font-serif text-4xl font-bold text-emerald-300">
                    +{annualSavingsEur.toLocaleString("fr-FR")} € / an
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Soit {(hoursSavedPerWeek * teamSize * 48).toLocaleString("fr-FR")} heures libérées par an pour vos ventes et vos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
