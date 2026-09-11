import { useEffect, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Intelligence } from "@/components/site/Intelligence";
import { Work } from "@/components/site/Work";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XR Agency — Studio digital premium & IA" },
      { name: "description", content: "Sites web sur mesure, branding, SEO local, Google Maps TOP 3. Studio digital premium — FR / EN / VI." },
      { property: "og:title", content: "XR Agency — Studio digital premium & IA" },
      { property: "og:description", content: "Sites web sur mesure, branding, SEO local, Google Maps TOP 3. Studio digital premium — FR / EN / VI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-40" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Intelligence />

        <section className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/50 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">XR AGENCY · SERVICES</p>
                <h2 className="display-serif mt-4 text-4xl leading-[0.9] sm:text-6xl lg:text-7xl">
                  Toutes nos expertises,<br />dans une seule expérience.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Explorez le catalogue complet, les formules, les livrables et les détails de chaque accompagnement.
                </p>
              </div>
              <Link
                to="/services"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-all duration-500 hover:gap-5"
              >
                Voir tous les services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Work />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
