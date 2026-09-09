import { useEffect, useLayoutEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";

import { Services } from "@/components/site/Services";
import { Pricing } from "@/components/site/Pricing";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { Work } from "@/components/site/Work";
import { Intelligence } from "@/components/site/Intelligence";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { ParallaxDivider, ParallaxMarquee } from "@/components/site/ParallaxDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Studio digital premium & IA" },
      {
        name: "description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      { property: "og:title", content: "XR Agency — Studio digital premium & IA" },
      {
        property: "og:description",
        content:
          "Sites web sur mesure, branding, SEO local, Google Maps TOP 3 et assistants IA. Studio digital premium — FR / EN / VI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();

  /* Force scroll to top on mount — prevents landing in the middle of the page */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{ background: "var(--gradient-halo)" }}
      />
      <Nav />

      <main className="relative z-10">
        {/* 1. Hero — Hook, 3D Globe, Monograms & Key Authority Stats */}
        <Hero />

        {/* 1b. Parallax divider before Intelligence */}
        <ParallaxDivider
          image="https://images.unsplash.com/photo-1601933471209-9e2e57c6de79?auto=format&fit=crop&q=85&w=2400"
          caption={t({ fr: "Intelligence XRAGENCY", en: "XRAGENCY Intelligence", vi: "Trí tuệ XRAGENCY" })}
          height="30vh"
        />

        {/* 2. Intelligence robot – visible second */}
        <Intelligence />

        {/* 3. Parallax marquee — continuous expertises ticker */}
        <ParallaxMarquee />



        {/* 5. Solution Overview — Services with starting prices */}
        <Services />

        {/* 6. Transparent Pricing Grid — 11 Services & 33 Exact Plans */}
        <Pricing />

        {/* Subtle cinematic divider */}
        <ParallaxDivider
          image="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=2400"
          caption={t(UI.dividerCaption1)}
          height="22vh"
        />

        {/* 7. Growth Tool — Interactive Google Maps TOP 3 Configurator */}
        <MapsSimulator />



        {/* 8. Proof & Prestige — Portfolio Showcase with filters and metrics */}
        <Work />

        {/* 9. Conversion Accelerator — Strategic AI Conversational Advisor */}
        <Faq />

        {/* 10. Direct Action — Contact Form & Legal Info */}
        <Contact />
      </main>
    </div>
  );
}
