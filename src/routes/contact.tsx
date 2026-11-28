import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { useLang } from "@/lib/i18n";

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
  const { lang } = useLang();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#171613] text-[#F7F4EE]">
      <Nav />
      <main className="pt-20">
        <Contact />
      </main>
    </div>
  );
}
