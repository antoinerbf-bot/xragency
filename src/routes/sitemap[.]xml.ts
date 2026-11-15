import { createFileRoute } from "@tanstack/react-router";

const urls = [
  "/",
  "/services",
  "/services/websites",
  "/services/branding",
  "/services/seo",
  "/services/maps",
  "/services/social",
  "/services/webcare",
  "/services/robotique",
  "/creation-site-internet-vietnam",
  "/agence-web/paris",
  "/agence-web/marseille",
  "/agence-web/lyon",
  "/agence-web/bordeaux",
  "/agence-web/toulouse",
  "/agence-web/nice",
  "/agence-web/nantes",
  "/agence-web/strasbourg",
  "/agence-web/montpellier",
  "/agence-web/lille",
  "/agence-web/france",
  "/agence-web/danang",
  "/agence-web/ho-chi-minh",
  "/agence-web/vietnam",
  "/realisations",
  "/notre-histoire",
  "/faq",
  "/recrutement",
  "/refonte-site-internet",
  "/mentions-legales",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>https://xragencyai.com${path}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
