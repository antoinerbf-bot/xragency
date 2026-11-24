import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { HomeServices } from "@/components/site/HomeServices";
import { GoogleMapsShowcase } from "@/components/site/GoogleMapsShowcase";
import { NexProWorkShowcase } from "@/components/site/NexProWorkShowcase";
import { WhyAgencySection } from "@/components/site/WhyAgencySection";
import { HomeSocialOffers } from "@/components/site/HomeSocialOffers";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { StudioMethodSection } from "@/components/site/StudioMethodSection";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { FunnelProvider } from "@/lib/funnel";
import { FunnelRail } from "@/components/site/FunnelRail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Studio Digital Haute Couture | Sites web, IA, SEO & Production Internationale" },
      {
        name: "description",
        content:
          "XR Agency : Studio digital international d'avant-garde. Création de sites web sur mesure, branding, visibilité Google Maps, Social Media et solutions IA.",
      },
      { property: "og:title", content: "XR Agency — L'Art du Digital Sur-Mesure" },
      {
        property: "og:description",
        content: "Stratégie, création cinématographique et technologie pour développer votre marque partout dans le monde.",
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
      <div className="relative min-h-screen overflow-x-clip bg-[#FAF8F5] text-[#1A1815]">
        <Nav />
        <FunnelRail />
        <main className="relative z-10">
          {/* 01 — Hero épuré, sobre & haute couture (Paris, Dubaï, Genève, Da Nang) */}
          <Hero />

          {/* 02 — "Votre projet, notre solution" : Simulateur & Configurateur en 3 étapes dès le premier scroll */}
          <QuoteConfiguratorCompact />

          {/* 03 — Nos Univers & Pôles d'Expertise au Scroll Parallaxe */}
          <HomeServices />

          {/* 04 — Google Maps & Visibilité Locale : Pack Local Top 3 dès 999 €/an */}
          <GoogleMapsShowcase />

          {/* 05 — Réalisations : Projets réels d'exception & univers sectoriels */}
          <NexProWorkShowcase />

          {/* 06 — Pourquoi XR Agency (Équipe & Piliers) */}
          <WhyAgencySection />

          {/* 07 — Offres Social Media (349 / 599 / 799 €) */}
          <HomeSocialOffers />

          {/* 08 — Méthode en 4 étapes & Cadrage de projet */}
          <StudioMethodSection />

          {/* 09 — FAQ */}
          <Faq />

          {/* 10 — Contact & Hubs Internationaux de prestige */}
          <Contact />
        </main>
      </div>
    </FunnelProvider>
  );
}
