import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Globe,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { CONTACT } from "@/lib/content";

export const Route = createFileRoute("/creation-site-internet-vietnam")({
  head: () => ({
    meta: [
      { title: "Création de Site Internet au Vietnam — XR Agency | Agence Web Internationale" },
      {
        name: "description",
        content:
          "Expert en création de site internet au Vietnam : Da Nang, Ho Chi Minh, Hanoi. Studio digital international, création web, SEO naturel et accompagnement au Vietnam. Devis personnalisé.",
      },
      { property: "og:title", content: "Création de Site Internet au Vietnam — XR Agency" },
      {
        property: "og:description",
        content:
          "Création de sites web et accompagnement digital à Da Nang, Hô Chi Minh-Ville et Hanoï.",
      },
      { property: "og:url", content: "https://xragencyai.com/creation-site-internet-vietnam" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://xragencyai.com/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Création de Site Internet au Vietnam — XR Agency" },
      {
        name: "twitter:description",
        content:
          "Expert en création de site internet au Vietnam : Da Nang, Ho Chi Minh, Hanoi. Studio digital international, création web, SEO naturel et accompagnement au Vietnam.",
      },
      {
        name: "keywords",
        content:
          "creation de site internet vietnam, agence web vietnam, creation site internet vietnam, developpeur web vietnam, xragency vietnam, web design da nang, agence web ho chi minh, thiet ke web vietnam, agence digitale vietnam, creation site expat vietnam",
      },
      { name: "geo.placename", content: "Vietnam" },
      { name: "geo.region", content: "VN" },
          ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/creation-site-internet-vietnam" }],
  }),
  component: VietnamLandingPage,
});

function VietnamLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const vietnamSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "XR Agency",
    url: "https://xragencyai.com/creation-site-internet-vietnam",
    logo: "https://xragencyai.com/logo-xr-agency.svg",
    image: "https://xragencyai.com/og-image.svg",
    description:
      "Expert en création de site internet au Vietnam : Da Nang, Ho Chi Minh, Hanoi. Direction artistique française, ingénierie React 19, SEO Google et multilingue.",
    telephone: "+33 7 67 56 67 83",
    email: "contact.xragency@gmail.com",
    areaServed: [
      { "@type": "City", name: "Đà Nẵng" },
      { "@type": "City", name: "Thành phố Hồ Chí Minh" },
      { "@type": "City", name: "Hà Nội" },
      { "@type": "Country", name: "Vietnam" },
    ],
  };

  const faqList = [
    {
      q: "Pourquoi faire appel à XR Agency pour créer un site internet au Vietnam ?",
      a: "XR Agency accompagne les entreprises qui souhaitent développer leur présence numérique au Vietnam. Le cadrage du projet, les langues de travail et les modalités de suivi sont définis avec vous avant le démarrage.",
    },
    {
      q: "Mes clients sont à la fois locaux et internationaux : comment gérez-vous le multilingue ?",
      a: "Nous définissons l’architecture linguistique selon vos marchés cibles. Les versions linguistiques, les URL et les balises hreflang sont cadrées pendant la conception afin de préserver la cohérence éditoriale et le référencement.",
    },
    {
      q: "Quels sont les délais pour lancer un site web professionnel au Vietnam ?",
      a: "Le délai dépend du périmètre, des contenus disponibles, des intégrations et du nombre de langues. Un calendrier réaliste est établi après validation du cahier des charges.",
    },
    {
      q: "Pouvez-vous intégrer les méthodes de paiement locales vietnamiennes ?",
      a: "Les solutions de paiement sont étudiées selon votre statut, votre banque, votre marché et les contraintes du prestataire. La faisabilité et les éventuels frais d’intégration sont confirmés avant tout engagement.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const waLink = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Bonjour XR Agency, je souhaite échanger sur un projet de création de site web / SEO au Vietnam (Da Nang, Ho Chi Minh, Hanoi).",
  )}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white selection:bg-[#d4af37] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vietnamSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Nav />

      <main className="relative z-10 pt-28 sm:pt-36">
        {/* ── 1. MONUMENTAL HERO ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto pb-16 sm:pb-24">
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-xs text-white/50 mb-8 font-mono"
          >
            <Link to="/" className="hover:text-white transition">
              Accueil
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition">
              Agences
            </Link>
            <span>/</span>
            <span className="text-[#d4af37]">Vietnam</span>
          </nav>

          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-[#090b10]/90 px-4 py-1.5 backdrop-blur-xl shadow-2xl mb-8">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#e2e8f0]">
              PRESENCE ASIE · ĐÀ NẴNG · HỒ CHÍ MINH · HÀ NỘI
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] items-center">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                <span>Création de Site Internet</span>{" "}
                <span className="font-serif italic font-normal text-[#d4af37] block mt-2">
                  au Vietnam
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl font-light">
                Le studio digital français de référence au Vietnam. Nous créons des sites vitrines
                d'exception, des plateformes e-commerce à forte conversion et des stratégies SEO
                pour conquérir Google à Da Nang, Saïgon, Hanoï et à l'international.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#d4af37] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#e5c158] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discuter de Mon Projet Vietnam (WhatsApp)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: "websites" }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  <span>Nos Formules Dès 7j</span>
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  <span>Standards Européens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#d4af37]" />
                  <span>Trilingue FR / EN / VI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#d4af37]" />
                  <span>Livraison Rapide 7j</span>
                </div>
              </div>
            </div>

            {/* Vietnam Hub Spec Card */}
            <div className="rounded-3xl border border-[#d4af37]/30 bg-[#0c0e18] p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 h-48 w-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37]">
                    HUB VIETNAM
                  </p>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                    XR Agency · Asie
                  </h3>
                </div>
                <Compass className="h-6 w-6 text-[#d4af37]" />
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Pôle Da Nang</span>
                  <span className="font-semibold text-white">An Thượng & Hải Châu</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Pôle Hô Chi Minh</span>
                  <span className="font-semibold text-white">District 1 & Thảo Điền</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Pôle Hanoï & Nord</span>
                  <span className="font-semibold text-white">Hoàn Kiếm & Tay Ho</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Langues de Travail</span>
                  <span className="font-mono text-[#d4af37]">Français · Anglais · Tiếng Việt</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/50 mb-3">
                  Clientèles Accompagnées au Vietnam:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Resorts & Hôtels",
                    "Entrepreneurs Expats",
                    "Import-Export",
                    "Restaurants & Bars",
                    "Agences de Voyage",
                    "Tech & SaaS",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. THE DUAL ADVANTAGE ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              LE DOUBLE AVANTAGE XR AGENCY
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              L'Élégance Française, la Vitesse et la Réactivité au Vietnam
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              Créer un site internet au Vietnam ne doit pas signifier faire des compromis sur le
              design ou la fiabilité. Nous vous offrons le niveau d'exigence d'une grande agence
              parisienne, combiné à la réactivité d'une équipe active sur le fuseau horaire
              asiatique.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#090b10] p-6 hover:border-[#d4af37]/40 transition">
              <span className="font-mono text-xs font-bold text-[#d4af37]">01.</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-white">
                Direction Artistique Haute Couture
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Des maquettes sur mesure inspirées des plus grandes marques internationales. Zéro
                template préfabriqué.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#090b10] p-6 hover:border-[#d4af37]/40 transition">
              <span className="font-mono text-xs font-bold text-[#d4af37]">02.</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-white">
                SEO Google Vietnam & Monde
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Positionnement durable en première page sur Google.com.vn et Google.com pour capter
                des clients réguliers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#090b10] p-6 hover:border-[#d4af37]/40 transition">
              <span className="font-mono text-xs font-bold text-[#d4af37]">03.</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-white">
                Paiements & Réservations Directs
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Intégration de solutions de paiement compatibles avec votre activité, après
                encaissement direct sans intermédiaire.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#090b10] p-6 hover:border-[#d4af37]/40 transition">
              <span className="font-mono text-xs font-bold text-[#d4af37]">04.</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-white">
                Planning défini après cadrage
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Déploiement rapide de votre site avec formation complète et contrat d'assistance
                WebCare en continu.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. THREE HUBS IN VIETNAM ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              IMPLANTATIONS AU VIETNAM
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Da Nang, Ho Chi Minh & Hanoi
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#94a3b8]">
              Découvrez nos services dédiés par région au Vietnam :
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Da Nang */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 flex flex-col justify-between hover:border-[#d4af37] transition">
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase">
                  CENTRE VIETNAM
                </span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">Da Nang & Hoi An</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Pôle touristique et tech hub en plein essor. Idéal pour resorts, hôtels de charme,
                  restaurants, agences de voyage et nomades digitaux.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/agence-web/$city"
                  params={{ city: "danang" }}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#d4af37] hover:underline"
                >
                  <span>Agence Web Da Nang</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Ho Chi Minh */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 flex flex-col justify-between hover:border-[#d4af37] transition">
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase">
                  SUD VIETNAM
                </span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">
                  Ho Chi Minh (Saïgon)
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Poumon économique du pays : District 1, Thảo Điền, District 7. Conçu pour le
                  e-commerce, les cabinets B2B, l'industrie et les marques de prestige.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/agence-web/$city"
                  params={{ city: "ho-chi-minh" }}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#d4af37] hover:underline"
                >
                  <span>Agence Web Ho Chi Minh</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* France & Europe */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 flex flex-col justify-between hover:border-[#d4af37] transition">
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase">
                  SIÈGE EUROPÉEN
                </span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">Paris & France</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Accompagnement de projets en France et en Europe. Les informations juridiques et
                  contractuelles sont communiquées dans les documents de chaque projet.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/agence-web/$city"
                  params={{ city: "paris" }}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#d4af37] hover:underline"
                >
                  <span>Agence Web Paris</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. FAQ VIETNAM ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1000px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              QUESTIONS FRÉQUENTES
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black uppercase text-white">
              FAQ · Création de Site Internet au Vietnam
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-[#090b10] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition"
                  >
                    <span className="text-sm sm:text-base font-bold text-white pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#d4af37] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. FINAL CTA ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1200px] mx-auto pb-20 text-center">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0e18] to-[#030406] p-8 sm:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-[#d4af37]/15 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Lancez Votre Site Internet au Vietnam Dès Cette Semaine
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto">
              Échangez directement avec notre direction en français via WhatsApp pour un devis et
              une première analyse de votre projet.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#e5c158] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Direct (+33 7 67 56 67 83)</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                <span>Demander un Devis en Ligne</span>
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
