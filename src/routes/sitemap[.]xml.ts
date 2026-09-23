import { createFileRoute } from "@tanstack/react-router";

const urls = [
  "/", "/services", "/services/websites", "/services/branding", "/services/seo",
  "/services/google-maps", "/services/social", "/services/webcare",
  "/work", "/realisations", "/notre-histoire", "/faq",
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
