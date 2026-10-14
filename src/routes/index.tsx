import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { HomeServices } from "@/components/site/HomeServices";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { DigitalAudit } from "@/components/site/DigitalAudit";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

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
      { property: "og:url", content: "https://xragencyai.com/" },
      { property: "og:image", content: "https://raw.githubusercontent.com/antoinerbf-bot/xragency/1c993b7f79f23fc0700cf6ce6174e2cd3ed61d40/src/assets/hero-cinematic.jpg" },
      { property: "og:image:secure_url", content: "https://raw.githubusercontent.com/antoinerbf-bot/xragency/1c993b7f79f23fc0700cf6ce6174e2cd3ed61d40/src/assets/hero-cinematic.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: "XR Agency — photographie cinématique de la homepage" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://raw.githubusercontent.com/antoinerbf-bot/xragency/1c993b7f79f23fc0700cf6ce6174e2cd3ed61d40/src/assets/hero-cinematic.jpg" },
      { name: "twitter:image:alt", content: "XR Agency — photographie cinématique de la homepage" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/" }],
  }),
  component: Index,
});



function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{ background: "var(--gradient-halo)" }}
      />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <HomeServices />
        <QuoteConfiguratorCompact />
        <DigitalAudit />
        <MapsSimulator />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
