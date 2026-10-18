import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { CostOfInaction } from "@/components/site/CostOfInaction";
import { HomeServices } from "@/components/site/HomeServices";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { DigitalAudit } from "@/components/site/DigitalAudit";
import { ProofAndGuarantees } from "@/components/site/ProofAndGuarantees";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { CinematicIntro } from "@/components/site/CinematicIntro";
import { FunnelProvider } from "@/lib/funnel";
import { FunnelRail } from "@/components/site/FunnelRail";
import { StickyFunnelCTA } from "@/components/site/StickyFunnelCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Agence digitale premium | Web, SEO, Branding & IA" },
      {
        name: "description",
        content:
          "XR Agency conçoit des sites web sur mesure, du branding, du SEO, de la visibilité Google Maps, du social media, du WebCare et des solutions IA & robotique.",
      },
      { property: "og:title", content: "XR Agency — Agence digitale premium" },
      {
        property: "og:description",
        content:
          "Un écosystème digital complet : Web Design, Branding, SEO, Google Maps, Social Media, WebCare et IA & Robotique.",
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
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <CinematicIntro />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-25"
          style={{ background: "var(--gradient-halo)" }}
        />
        <Nav />
        <FunnelRail />
        <main className="relative z-10">
          <Hero />
          <CostOfInaction />
          <HomeServices />
          <MapsSimulator />
          <DigitalAudit />
          <ProofAndGuarantees />
          <QuoteConfiguratorCompact />
          <Faq />
          <Contact />
        </main>
        <StickyFunnelCTA />
      </div>
    </FunnelProvider>
  );
}
