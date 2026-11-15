import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — XR Agency" },
      {
        name: "description",
        content:
          "Contactez XR Agency pour votre projet digital : site web, branding, SEO, Google Maps, réseaux sociaux et solutions IA.",
      },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-24">
        <Contact />
      </main>
    </div>
  );
}
