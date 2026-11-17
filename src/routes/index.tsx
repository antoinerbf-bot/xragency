import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ExpertisesShowcase } from "@/components/site/ExpertisesShowcase";
import { HeroVslPlayer } from "@/components/site/HeroVslPlayer";
import { NexProWorkShowcase } from "@/components/site/NexProWorkShowcase";
import { NexProInteractiveTools } from "@/components/site/NexProInteractiveTools";
import { NexProWhySection } from "@/components/site/NexProWhySection";
import { NexProMobileShowcase } from "@/components/site/NexProMobileShowcase";
import { NexProProcessSection } from "@/components/site/NexProProcessSection";
import { NexProPricingGrid } from "@/components/site/NexProPricingGrid";
import { NexProReviews } from "@/components/site/NexProReviews";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { DigitalAudit } from "@/components/site/DigitalAudit";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { ProofAndGuarantees } from "@/components/site/ProofAndGuarantees";
import { InteractiveGlobalTeamGlobe } from "@/components/site/InteractiveGlobalTeamGlobe";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { SectorSelectionTunnel } from "@/components/site/SectorSelectionTunnel";
import { AdvisorsShowcase } from "@/components/site/AdvisorsShowcase";
import { FunnelProvider } from "@/lib/funnel";
import { FunnelRail } from "@/components/site/FunnelRail";

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
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-25"
          style={{ background: "var(--gradient-halo)" }}
        />
        <Nav />
        <FunnelRail />
        <main className="relative z-10">
          <Hero />

          {/* 02 / NOS EXPERTISES · 6 CARTES TACTILES DU TUNNEL */}
          <ExpertisesShowcase />

          {/* 03 / ÉTUDES DE CAS & RÉALISATIONS CONCRÈTES */}
          <NexProWorkShowcase />

          {/* 02.B / DÉMOS ET OUTILS INTERACTIFS EN DIRECT */}
          <NexProInteractiveTools />

          {/* 03 / POURQUOI XR AGENCY (LIGNES NUMÉROTÉES 01, 02, 03) */}
          <NexProWhySection />

          {/* 03.B / EXPÉRIENCE MOBILE-FIRST (DOUBLE SMARTPHONE 3D) */}
          <NexProMobileShowcase />

          {/* 04 / DÉROULEMENT DU PROJET · 14 JOURS CHRONO */}
          <NexProProcessSection />

          {/* 05 / FORMULES CLAIRES & INVESTISSEMENT */}
          <NexProPricingGrid />

          <div id="tunnel-secteurs">
            <SectorSelectionTunnel />
          </div>

          <HeroVslPlayer />

          {/* 06 / SIMULATEUR DE VISIBILITÉ GOOGLE MAPS */}
          <MapsSimulator />

          {/* 07 / CONFIGURATEUR SUR MESURE */}
          <QuoteConfiguratorCompact />

          {/* 08 / AVIS VÉRIFIÉS GOOGLE 5.0 ★ */}
          <NexProReviews />

          <DigitalAudit />
          <AdvisorsShowcase />

          {/* 08 / RAYONNEMENT MONDIAL ET ÉQUIPE */}
          <InteractiveGlobalTeamGlobe />

          {/* 09 / ENGAGEMENTS CONTRACTUELS & SASU KARMA */}
          <ProofAndGuarantees />

          {/* 10 / QUESTIONS FRÉQUENTES */}
          <Faq />

          {/* 11 / CONTACT & MAQUETTES */}
          <Contact />
        </main>
      </div>
    </FunnelProvider>
  );
}
