import { createFileRoute } from "@tanstack/react-router";

function text(html: string, re: RegExp) {
  return html.match(re)?.[1]?.replace(/\s+/g, " ").trim() || "";
}

const TYPE_META: Record<string, { service: string; reason: string }> = {
  design: { service: "Website / UX", reason: "Renforcer la hiérarchie visuelle, la cohérence et l'expérience mobile." },
  seo: { service: "SEO", reason: "Améliorer la structure, les contenus et la visibilité sur les recherches stratégiques." },
  security: { service: "WebCare", reason: "Renforcer le suivi technique et les bonnes pratiques de sécurité." },
  conversion: { service: "Website / Conversion", reason: "Réduire les frictions et rendre les CTA et parcours commerciaux plus efficaces." },
  technical: { service: "Website + WebCare", reason: "Améliorer performance, responsive, accessibilité et suivi technique." },
};

function scoreAudit(html: string, headers: Headers, type: string) {
  const hasTitle = /<title[^>]*>\s*[^<]{3,}\s*<\/title>/i.test(html);
  const hasDescription = /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const h1 = (html.match(/<h1\b/gi) || []).length;
  const images = (html.match(/<img\b/gi) || []).length;
  const alt = (html.match(/<img[^>]+alt=["'][^"']*["']/gi) || []).length;
  const checks = type === "design"
    ? [hasViewport, h1 === 1, images === 0 || alt >= Math.ceil(images * .7), html.length < 1800000]
    : type === "seo"
    ? [hasTitle, hasDescription, h1 >= 1, /<link[^>]+rel=["']canonical["']/i.test(html)]
    : type === "security"
    ? [!!headers.get("strict-transport-security"), !!headers.get("content-security-policy"), !!headers.get("x-content-type-options"), !!headers.get("referrer-policy")]
    : type === "conversion"
    ? [/<button|<a\b/i.test(html), /contact|devis|quote|book|reservation/i.test(html), hasViewport, h1 >= 1]
    : [hasViewport, !!headers.get("cache-control"), html.length < 2200000, !/<script[^>]+src=["'][^"']+http:\/\//i.test(html)];
  return Math.min(100, Math.round(55 + checks.filter(Boolean).length * 10 + (h1 > 0 ? 5 : 0)));
}

export const Route = createFileRoute("/api/audit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as { url?: string; type?: string; types?: string[]; sector?: string; budget?: string };
          if (!body.url) return Response.json({ error: "URL requise." }, { status: 400 });
          const raw = body.url.trim().startsWith("http") ? body.url.trim() : "https://" + body.url.trim();
          const target = new URL(raw);
          if (!["http:", "https:"].includes(target.protocol)) return Response.json({ error: "URL invalide." }, { status: 400 });
          const response = await fetch(target.toString(), { redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "user-agent": "XRAGENCY-Julie-Audit/1.0" } });
          const html = await response.text();
          const title = text(html, /<title[^>]*>([^<]+)<\/title>/i);
          const description = text(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
          const h1 = text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "");
          const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
          const images = (html.match(/<img\\b/gi) || []).length;
          const alt = (html.match(/<img[^>]+alt=["'][^"']*["']/gi) || []).length;
          const types = [...new Set((body.types?.length ? body.types : [body.type || "design"]).filter((x): x is string => ["design","seo","security","conversion","technical"].includes(x)))];
          if (!types.length) return Response.json({ error: "Sélectionnez au moins un axe d'audit." }, { status: 400 });
          const typeScores = types.map(type => scoreAudit(html, response.headers, type));
          const score = Math.round(typeScores.reduce((sum, value) => sum + value, 0) / typeScores.length);
          const recommendations = types.map(type => TYPE_META[type]).filter(Boolean);
          const sector = body.sector || "autre";
          const budget = body.budget || "non renseigné";
          recommendations.push({ service: "Priorisation " + sector, reason: "Recommandations calibrées pour le contexte déclaré et le budget " + budget + "." });
          const findings = types.flatMap(type => {
            const checks = type === "seo"
              ? [
                  { label: "Structure SEO", status: !!title && !!description, detail: !!title && !!description ? "Titre et meta description détectés." : "Titre ou meta description à améliorer." },
                  { label: "H1 principal", status: !!h1, detail: h1 || "Aucun H1 détecté." },
                ]
              : type === "design"
              ? [
                  { label: "Responsive", status: hasViewport, detail: hasViewport ? "Viewport détecté." : "Viewport non détecté." },
                  { label: "Images accessibles", status: images === 0 || alt >= Math.ceil(images * .7), detail: images === 0 ? "Aucune image détectée." : String(alt) + "/" + String(images) + " images avec attribut alt." },
                ]
              : type === "security"
              ? [
                  { label: "HTTPS", status: target.protocol === "https:", detail: target.protocol === "https:" ? "Connexion HTTPS utilisée." : "Le site est appelé en HTTP." },
                  { label: "Headers de sécurité", status: !!response.headers.get("content-security-policy") || !!response.headers.get("strict-transport-security"), detail: "Vérification des principaux headers disponibles." },
                ]
              : type === "conversion"
              ? [
                  { label: "Point d'action", status: /<button|<a\\b/i.test(html), detail: /<button|<a\\b/i.test(html) ? "Liens ou boutons détectés." : "Aucun CTA évident détecté." },
                  { label: "Parcours mobile", status: hasViewport, detail: hasViewport ? "Viewport détecté." : "Viewport non détecté." },
                ]
              : [
                  { label: "Performance de page", status: html.length < 2200000, detail: String(Math.round(html.length / 1024)) + " Ko de HTML reçu." },
                  { label: "Cache", status: !!response.headers.get("cache-control"), detail: response.headers.get("cache-control") || "Cache-Control non détecté." },
                ];
            return checks.map(item => ({ ...item, label: (TYPE_META[type]?.service || type) + " · " + item.label }));
          });
          return Response.json({ ok: true, url: target.toString(), types, score, title, description, findings, recommendations, status: response.status });
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : "Impossible d'analyser cette URL." }, { status: 502 });
        }
      },
    },
  },
});
