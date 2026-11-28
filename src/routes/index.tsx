import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { HomeServices } from "@/components/site/HomeServices";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
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
          {/* 01 — Hero épuré, sobre & haute couture */}
          <Hero />

          {/* 02 — "Votre projet, notre solution" : Diagnostic interactif orienté secteur & besoins réels */}
          <QuoteConfiguratorCompact />

          {/* 03 — Nos 8 Pôles d'Excellence & Tarifs : Scroll fluide sans superposition */}
          <HomeServices />

          {/* 04 — FAQ transparente */}
          <Faq />

          {/* 05 — Contact & Ligne directe */}
          <Contact />
        </main>
      </div>
    </FunnelProvider>
  );
}
