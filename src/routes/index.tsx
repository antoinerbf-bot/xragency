import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Intelligence } from "@/components/site/Intelligence";
import { Pricing } from "@/components/site/Pricing";
import { Feature } from "@/components/site/Feature";
import { Work, Testimonials } from "@/components/site/Work";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency 2030 — Studio digital premium & IA" },
      {
        name: "description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      { property: "og:title", content: "XR Agency 2030 — Studio digital premium & IA" },
      {
        property: "og:description",
        content:
          "Sites web, branding, SEO, Google Maps et assistants IA pour marques exigeantes. Devis instantané par configurateur IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <About />
          <Services />
          <Intelligence />
          <Pricing />
          <Feature />
          <Work />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
      </div>
    </LangProvider>
  );
}
