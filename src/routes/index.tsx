import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { QuoteConfiguratorCompact } from "@/components/site/QuoteConfiguratorCompact";
import { Intelligence } from "@/components/site/Intelligence";
import { HomeServices } from "@/components/site/HomeServices";
import { FreeAuditCTA } from "@/components/site/FreeAuditCTA";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Studio digital premium & IA" },
      { name: "description", content: "Sites web sur mesure, branding, SEO, visibilité locale, social media, webcare et e-commerce intégré. Studio digital premium — FR / EN / VI." },
      { property: "og:title", content: "XR Agency — Studio digital premium & IA" },
      { property: "og:description", content: "Sites web sur mesure, branding, SEO, visibilité locale, social media, webcare et e-commerce intégré. Studio digital premium — FR / EN / VI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-40" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Intelligence />
        <QuoteConfiguratorCompact />
        <HomeServices />
        <FreeAuditCTA />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
