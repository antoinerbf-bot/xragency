import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { ServicesCatalog } from "@/components/site/ServicesCatalog";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — XRagency." },
      {
        name: "description",
        content:
          "Sites web, branding, SEO, Google Maps TOP 3, community management, e-commerce et maintenance. Plusieurs expertises, un seul système.",
      },
      { property: "og:title", content: "Services — XRagency." },
      {
        property: "og:description",
        content:
          "Studio digital premium : création, visibilité, image, contenu et accompagnement.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main className="relative z-10">
        <ServicesCatalog />
      </main>
      <Contact />
    </div>
  );
}
