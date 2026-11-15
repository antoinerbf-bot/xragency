import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicIntro } from "@/components/site/CinematicIntro";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import {
  AgencyPresentationSection,
  CoreExpertisesGridSection,
  EditorialServicesShowcaseSection,
} from "@/components/site/NexProSectionsA";
import {
  RealisationsSection,
  MethodSection,
  WhyXrAgencySection,
  BespokeConfiguratorSection,
  BriefFaqSection,
  FinalContactAndFooterSection,
} from "@/components/site/NexProSectionsB";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { DigitalAudit } from "@/components/site/DigitalAudit";
import { AdvisorsShowcase } from "@/components/site/AdvisorsShowcase";
import { FunnelProvider } from "@/lib/funnel";
import { ArrowUpRight, ShieldCheck, Trophy, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "XR Agency — Dark Luxury & Tech Précision | Web, Google Maps, SEO, IA & Robotique",
      },
      {
        name: "description",
        content:
          "Studio digital haute conversion. Découvrez nos 7 experts dédiés (Martin, Romain, Hugo, Julie, Christelle, Damien, Edgar), notre simulateur Google Maps, notre audit 5 piliers et notre configurateur de devis.",
      },
      {
        property: "og:title",
        content: "XR Agency — L'Élégance Digitale. La Machine à Vendre.",
      },
      {
        property: "og:description",
        content:
          "Sites Web Haute Conversion, Domination Google Maps + Plaques NFC, SEO Chirurgical, Branding, WebCare & Robotique.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "XR Agency" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <FunnelProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#080B10] text-[#F8FAFC]">
        <CinematicIntro />
        <Nav />
        <main className="relative z-10">
          {/* SECTION 1 — HERO */}
          <Hero />

          {/* DARK LUXURY EXECUTIVE COMMAND BAR (FAST ACCESS TO THE 3 PILLARS & ALL PAGES) */}
          <section
            className="bg-[#080B10] border-y border-[#D4AF37]/30 py-8 text-[#F8FAFC]"
            data-testid="dark-luxury-command-strip"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#D4AF37]">
                    DARK LUXURY & TECH PRÉCISION • ARCHITECTURE 3 PILIERS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Accès direct aux Pôles d'Excellence, aux 3 Outils Interactifs & au CRM RPG
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to="/recrutement"
                    className="px-4 py-2 rounded-xl bg-[#0F172A] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-[#080B10] transition"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    Recrutement Closers (CRM RPG)
                  </Link>
                  <Link
                    to="/affiliation"
                    className="px-4 py-2 rounded-xl bg-[#0F172A] border border-[#10B981]/50 text-[#10B981] text-xs font-bold flex items-center gap-1.5 hover:bg-[#10B981] hover:text-[#080B10] transition"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Programme Affiliation (Simulateur MRR)
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#080B10] text-xs font-bold flex items-center gap-1.5 hover:bg-[#e3be42] transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Ouvrir CRM RPG & Jarvis HUD
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
                {[
                  { label: "Google Maps + NFC", to: "/services/maps", ref: "Martin" },
                  { label: "Sites Web", to: "/services/websites", ref: "Romain" },
                  { label: "Duel Refonte Web", to: "/refonte-site-internet", ref: "Romain" },
                  { label: "SEO 4 Étapes", to: "/services/seo", ref: "Hugo" },
                  { label: "Branding Luxe", to: "/services/branding", ref: "Christelle" },
                  { label: "Robotique & POS", to: "/services/robotique", ref: "Damien" },
                  { label: "WebCare SLA", to: "/webcare", ref: "Julie" },
                  { label: "Réalisations", to: "/realisations", ref: "Portfolio" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    className="p-2.5 rounded-xl bg-[#0F172A] border border-white/10 hover:border-[#D4AF37] transition flex flex-col justify-between"
                  >
                    <span className="font-bold text-white flex items-center justify-between">
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                    </span>
                    <span className="text-[10px] font-mono text-[#10B981] mt-1">
                      Réf: {item.ref}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2 — PRÉSENTATION DE L'AGENCE */}
          <AgencyPresentationSection />

          {/* SECTION 3 — LES 7 COMMERCIAUX DE L'AGENCE (MARTIN, ROMAIN, HUGO, JULIE, CHRISTELLE, DAMIEN, EDGAR) */}
          <AdvisorsShowcase />

          {/* SECTION 4 — EXPERTISES PRINCIPALES */}
          <CoreExpertisesGridSection />

          {/* SECTION 5 — OUTIL INTERACTIF #1 : SIMULATEUR DE MANQUE À GAGNER GOOGLE MAPS EN TEMPS RÉEL */}
          <div id="simulateur-maps-home" className="bg-[#080B10]">
            <MapsSimulator />
          </div>

          {/* SECTION 6 — PRÉSENTATION DES SERVICES & TARIFS OFFICIELS */}
          <EditorialServicesShowcaseSection />

          {/* SECTION 7 — OUTIL INTERACTIF #2 : DIAGNOSTIC DIGITAL 5 PILIERS (JAUGES SVG & EXPORT PDF) */}
          <div id="audit" />
          <div id="diagnostic-5-piliers" className="bg-[#080B10]">
            <DigitalAudit />
          </div>

          {/* SECTION 8 — RÉALISATIONS */}
          <RealisationsSection />

          {/* SECTION 9 — NOTRE MÉTHODE (4 ÉTAPES) */}
          <MethodSection />

          {/* SECTION 10 — POURQUOI XR AGENCY */}
          <WhyXrAgencySection />

          {/* SECTION 11 — OUTIL INTERACTIF #3 : CONFIGURATEUR DE DEVIS PERSONNALISÉ EN 3 ÉTAPES */}
          <div id="quote" />
          <BespokeConfiguratorSection />

          {/* SECTION 12 — FAQ */}
          <BriefFaqSection />

          {/* SECTION 13 — CONTACT FINAL & FOOTER */}
          <FinalContactAndFooterSection />
        </main>
      </div>
    </FunnelProvider>
  );
}
