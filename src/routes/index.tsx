import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ImmersiveJourney } from "@/components/site/ImmersiveJourney";
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});



function ServiceRibbon() {
  const { t } = useLang();
  const items = [
    ["websites", "/services/websites"],
    ["branding", "/services/branding"],
    ["seo", "/services/seo"],
    ["maps", "/services/maps"],
    ["social", "/services/social"],
    ["maintenance", "/services/webcare"],
    ["robotics", "/services/robotique"],
  ] as const;

  return (
    <section aria-label="Les 7 expertises XR Agency" className="relative overflow-hidden border-b xr-line bg-white">
      <div className="mx-auto flex max-w-[1640px] items-center gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <span className="hidden shrink-0 label-mono text-[7px] tracking-[.22em] text-[#17181a]/40 lg:block">
          XR / EXPERTISES
        </span>
        <div className="xr-rail flex min-w-0 flex-1 gap-2 overflow-x-auto pb-0.5">
          {items.map(([id, href], index) => {
            const service = SERVICES.find((s) => s.id === id);
            if (!service) return null;
            return (
              <Link
                key={id}
                to={href}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#17181a]/10 bg-[#f7f4ee] px-4 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#17181a]/20 hover:bg-white"
              >
                <span className="font-mono text-[7px] text-[#17181a]/35">0{index + 1}</span>
                <span className="text-[9px] font-semibold text-[#17181a]">{t(service.title)}</span>
                <ArrowUpRight className="h-3 w-3 text-[#17181a]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
        <ServiceRibbon />
        <ImmersiveJourney />
        <DigitalAudit />
        <HomeServices />
        <QuoteConfiguratorCompact />
        <MapsSimulator />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
