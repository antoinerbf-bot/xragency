import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ExpertisesShowcase } from "@/components/site/ExpertisesShowcase";
import { NexProInteractiveTools } from "@/components/site/NexProInteractiveTools";
import { NexProProcessSection } from "@/components/site/NexProProcessSection";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { DigitalAudit } from "@/components/site/DigitalAudit";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { SectorSelectionTunnel } from "@/components/site/SectorSelectionTunnel";
import { FunnelProvider } from "@/lib/funnel";
import { FunnelRail } from "@/components/site/FunnelRail";
import { HeroVslPlayer } from "@/components/site/HeroVslPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Studio digital international | Stratégie, création & visibilité" },
      { name: "description", content: "XR Agency accompagne les marques et entreprises dans leur développement digital : création de sites web, branding, SEO, Google Maps, Social Media, WebCare et solutions IA." },
      { property: "og:title", content: "XR Agency — L’art du digital sur mesure" },
      { property: "og:description", content: "Stratégie, création et solutions digitales pensées autour de votre activité." },
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
      <div className="relative min-h-screen overflow-x-hidden bg-[#F7F4EE] text-[#171613]">
        <Nav />
        <FunnelRail />
        <main className="relative z-10">
          <Hero />
          <ExpertisesShowcase />
          <NexProInteractiveTools />
          <NexProProcessSection />
          <div id="tunnel-secteurs"><SectorSelectionTunnel /></div>
          <HeroVslPlayer />
          <MapsSimulator />
          <QuoteConfiguratorCompact />
          <DigitalAudit />
          <Faq />
          <Contact />
        </main>
      </div>
    </FunnelProvider>
  );
}
