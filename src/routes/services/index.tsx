import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { ImmersiveServices } from "@/components/site/ImmersiveServices";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Nos Prestations & Formules — XR Agency Studio" },
      {
        name: "description",
        content:
          "Catalogue XR Agency : création de sites, e-commerce, SEO, Google Maps, branding, community management et webcare.",
      },
      { property: "og:title", content: "Nos Prestations & Formules — XR Agency" },
      {
        property: "og:description",
        content: "Studio digital premium : création, visibilité, image, contenu et accompagnement digital.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10 pt-28">
        <ImmersiveServices />
      </main>
      <Contact />
    </div>
  );
}
