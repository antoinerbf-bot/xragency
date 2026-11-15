import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Compass, Globe, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { CITIES_DATA, type CitySeoData } from "@/lib/seo-cities";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { CONTACT } from "@/lib/content";

export const Route = createFileRoute("/agence-web/$city")({
  loader: ({ params }) => {
    const raw = params.city.toLowerCase();
    const city = CITIES_DATA[raw];
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.city) return {};
    const city = loaderData.city;
    const url = `https://xragencyai.com/agence-web/${city.slug}`;

    return {
      meta: [
        { title: city.metaTitle },
        { name: "description", content: city.metaDescription },
        { property: "og:title", content: city.metaTitle },
        { property: "og:description", content: city.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://xragencyai.com/og-image.svg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: city.metaTitle },
        { name: "twitter:description", content: city.metaDescription },
        { name: "twitter:image", content: "https://xragencyai.com/og-image.svg" },
        { name: "keywords", content: city.keywords.join(", ") },
        { name: "geo.placename", content: city.name },
        { name: "geo.region", content: city.country === "France" ? `FR-${city.postalCode.slice(0, 2)}` : "VN" },
        { name: "geo.position", content: `${city.coordinates.lat};${city.coordinates.lng}` },
        { name: "ICBM", content: `${city.coordinates.lat}, ${city.coordinates.lng}` },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CityLandingPage,
});

function CityLandingPage() {
  const { city } = Route.useLoaderData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `XR Agency ${city.name}`,
    alternateName: "KARMA SASU",
    url: `https://xragencyai.com/agence-web/${city.slug}`,
    logo: "https://xragencyai.com/logo-xr-agency.svg",
    image: "https://xragencyai.com/og-image.svg",
    description: city.metaDescription,
    telephone: "+33 7 67 56 67 83",
    email: "contact.xragency@gmail.com",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: city.slug === "paris" ? "78 Avenue des Champs-Élysées" : `Service Clients XR Agency — ${city.name}`,
      addressLocality: city.name,
      postalCode: city.postalCode,
      addressCountry: city.country === "France" ? "FR" : "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${city.name}, ${city.region}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Digitaux de Prestige",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Création de Site Internet sur Mesure ${city.name}`,
            description: "Site vitrine haute joaillerie ou plateforme e-commerce livrable en 7 jours.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `SEO Local & Domination Google Maps ${city.name}`,
            description: "Conquête du Top 3 Google Maps et visibilité locale maximale.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://xragencyai.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agences Web",
        item: "https://xragencyai.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `XR Agency ${city.name}`,
        item: `https://xragencyai.com/agence-web/${city.slug}`,
      },
    ],
  };

  const waLink = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Bonjour XR Agency, je souhaite échanger sur un projet de création de site web / SEO à ${city.name}.`
  )}`;

  const otherCities = Object.values(CITIES_DATA).filter((c) => c.slug !== city.slug);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Nav />

      <main className="relative z-10 pt-28 sm:pt-36">
        {/* ── 1. HERO SECTION ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto pb-16 sm:pb-24">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-white/50 mb-8 font-mono">
            <Link to="/" className="hover:text-white transition">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition">Agences</Link>
            <span>/</span>
            <span className="text-[#d4af37]">{city.name}</span>
          </nav>

          {/* Local Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-[#090b10]/90 px-4 py-1.5 backdrop-blur-xl shadow-2xl mb-8">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#e2e8f0]">
              {city.badge}
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                <span>{city.h1.split(" à ")[0]}</span>{" "}
                <span className="font-serif italic font-normal text-[#d4af37] block mt-2">
                  à {city.name}
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl font-light">
                {city.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#d4af37] px-7 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#e5c158] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Échanger par WhatsApp ({city.name})</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  to="/services/websites"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 hover:border-white/40"
                >
                  <span>Nos Formules Dès 7j</span>
                </Link>
              </div>

              {/* Guarantees Strip */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  <span>Livraison 7j ouvrés</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#d4af37]" />
                  <span>Objectif Top 3 Google</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#d4af37]" />
                  <span>Lighthouse 95+ Garanti</span>
                </div>
              </div>
            </div>

            {/* City Card Visual Spec */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10]/90 p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-48 w-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37]">IMPLANTATION GÉO</p>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">XR Agency · {city.name}</h3>
                </div>
                <MapPin className="h-6 w-6 text-[#d4af37]" />
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Territoire / Région</span>
                  <span className="font-semibold text-white">{city.region} ({city.country})</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Code Postal / Secteur</span>
                  <span className="font-mono text-white">{city.postalCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Coordonnées GPS</span>
                  <span className="font-mono text-[#d4af37]">{city.coordinates.lat}° N, {city.coordinates.lng}° E</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Disponibilité Studio</span>
                  <span className="font-semibold text-emerald-400">Prêt pour nouveau projet</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/50 mb-3">Secteurs Privilégiés à {city.name}:</p>
                <div className="flex flex-wrap gap-2">
                  {city.sectors.map((sector) => (
                    <span key={sector} className="rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/80">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. LOCAL MARKET ANALYSIS & EXPERTISE ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              ANALYSE DU MARCHÉ LOCAL
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              Pourquoi Votre Entreprise à {city.name} Doit Dominer le Web
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              {city.localMarketIntro}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {city.localKeyPoints.map((point, idx) => (
              <div
                key={point.title}
                className="rounded-2xl border border-white/10 bg-[#090b10] p-6 hover:border-[#d4af37]/40 transition duration-300"
              >
                <span className="font-mono text-xs font-bold text-[#d4af37]">0{idx + 1}.</span>
                <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white">{point.title}</h3>
                <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. CORE SERVICES STRIP ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              NOTRE SYSTÈME D'ACQUISITION
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Nos Prestations à {city.name}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#94a3b8]">
              Des solutions packagées sans coûts cachés, conçues pour asseoir votre autorité et convertir vos visiteurs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Sites Web */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 flex flex-col justify-between hover:border-[#d4af37]/50 transition">
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">01 · CRÉATION WEB</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">Sites Vitrines & E-Commerce</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Design sur mesure de prestige, responsive 100%, animations 3D fluides, livré clé en main en 7 jours ouvrés.
                </p>
                <div className="mt-6 space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Architecture React 19 / TanStack</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Hébergement & Domaine inclus</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Optimisé pour la conversion mobile</span></div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link to="/services/websites" className="font-mono text-xs font-bold text-[#d4af37] hover:underline">
                  Découvrir les offres →
                </Link>
                <div className="w-48">
                  <AddToCartBtn
                    item={{
                      serviceId: "websites",
                      serviceName: "Création de Site Web",
                      planName: `Vitrine Pro (${city.name})`,
                      priceEur: 1490,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: SEO Local Google Maps */}
            <div className="rounded-3xl border border-[#d4af37]/40 bg-[#0c0e18] p-8 flex flex-col justify-between shadow-[0_0_32px_rgba(212,175,55,0.15)] relative">
              <span className="absolute -top-3 right-8 rounded-full bg-[#d4af37] px-3 py-1 font-mono text-[9px] font-bold uppercase text-black">
                LE PLUS RECHERCHÉ À {city.name}
              </span>
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">02 · RÉFÉRENCEMENT LOCAL</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">SEO Top 3 Google Maps</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Positionnez votre entreprise dans les 3 premiers résultats sur smartphone quand un client cherche vos prestations à {city.name}.
                </p>
                <div className="mt-6 space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Optimisation Google Business Profile</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Citations locales & Autorité NAP</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Génération continue d'avis 5 étoiles</span></div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link to="/services/seo" className="font-mono text-xs font-bold text-[#d4af37] hover:underline">
                  Voir la stratégie SEO →
                </Link>
                <div className="w-48">
                  <AddToCartBtn
                    item={{
                      serviceId: "seo",
                      serviceName: "SEO Domination Google",
                      planName: `Pack Croissance (${city.name})`,
                      priceEur: 490,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Branding & IA */}
            <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 flex flex-col justify-between hover:border-[#d4af37]/50 transition">
              <div>
                <span className="font-mono text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">03 · IDENTITÉ & IA</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-2">Branding & Workflows IA</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  Logotypes d'exception, chartes graphiques de prestige et automatisations CRM pour traiter vos demandes en temps réel.
                </p>
                <div className="mt-6 space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Charte graphique haute joaillerie</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Agents IA & qualification WhatsApp</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[#d4af37]" /><span>Tableau de bord CRM interactif</span></div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link to="/services/branding" className="font-mono text-xs font-bold text-[#d4af37] hover:underline">
                  Découvrir le branding →
                </Link>
                <div className="w-48">
                  <AddToCartBtn
                    item={{
                      serviceId: "branding",
                      serviceName: "Identité de Marque",
                      planName: `Identité Complète (${city.name})`,
                      priceEur: 990,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. LOCAL FAQ ACCORDION ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1000px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              QUESTIONS FRÉQUENTES
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black uppercase text-white">
              FAQ · Création de Site Internet à {city.name}
            </h2>
          </div>

          <div className="space-y-4">
            {city.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-[#090b10] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition"
                  >
                    <span className="text-sm sm:text-base font-bold text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-[#d4af37] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. CITY DIRECTORY & INTERNAL LINKING GRID ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto py-16 sm:py-24 border-t border-white/10">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
              RÉSEAU D'AGENCES XR AGENCY
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-white">
              Nos Autres Implantations en France & Asie
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#94a3b8]">
              Découvrez nos services d'ingénierie digitale, de création de sites web et de référencement naturel dans les principales métropoles :
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to="/agence-web/$city"
                params={{ city: c.slug }}
                className="rounded-xl border border-white/10 bg-[#090b10] p-3 text-center transition hover:border-[#d4af37] hover:bg-[#d4af37]/5"
              >
                <span className="block text-xs font-bold uppercase text-white">{c.name}</span>
                <span className="font-mono text-[9px] text-[#94a3b8]">{c.country}</span>
              </Link>
            ))}
            <Link
              to="/creation-site-internet-vietnam"
              className="rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 p-3 text-center transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 col-span-2 sm:col-span-1"
            >
              <span className="block text-xs font-bold uppercase text-[#d4af37]">Vietnam Global</span>
              <span className="font-mono text-[9px] text-white/70">Asie & Expats</span>
            </Link>
          </div>
        </section>

        {/* ── 6. DIRECT WHATSAPP & CTA ── */}
        <section className="relative px-5 sm:px-8 lg:px-14 max-w-[1200px] mx-auto pb-20 text-center">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0e18] to-[#030406] p-8 sm:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Prêt à Conquérir la Première Page Google à {city.name} ?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto">
              Échangez directement avec notre direction technique et artistique pour définir votre stratégie de lancement.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#e5c158] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Direct · {city.name}</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                <span>Demander un Diagnostic Offert</span>
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
