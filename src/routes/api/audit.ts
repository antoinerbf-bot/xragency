import { createFileRoute } from "@tanstack/react-router";

function text(html: string, re: RegExp) {
  return html.match(re)?.[1]?.replace(/\s+/g, " ").trim() || "";
}

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
          const body = await request.json() as { url?: string; type?: string };
          if (!body.url) return Response.json({ error: "URL requise." }, { status: 400 });
          const raw = body.url.trim().startsWith("http") ? body.url.trim() : "https://" + body.url.trim();
          const target = new URL(raw);
          if (!["http:", "https:"].includes(target.protocol)) return Response.json({ error: "URL invalide." }, { status: 400 });
          const response = await fetch(target.toString(), { redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "user-agent": "XRAGENCY-Alexandre-Audit/1.0" } });
          const html = await response.text();
          const title = text(html, /<title[^>]*>([^<]+)<\/title>/i);
          const description = text(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
          const h1 = text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "");
          const findings = [
            { label: "Titre de page", status: !!title, detail: title || "Aucun titre détecté" },
            { label: "Meta description", status: !!description, detail: description || "Aucune meta description détectée" },
            { label: "H1 principal", status: !!h1, detail: h1 || "Aucun H1 détecté" },
            { label: "Responsive", status: /<meta[^>]+name=["']viewport["']/i.test(html), detail: /viewport/i.test(html) ? "Viewport détecté" : "Viewport non détecté" },
          ];
          const score = scoreAudit(html, response.headers, body.type || "design");
          return Response.json({ ok: true, url: target.toString(), type: body.type || "design", score, title, description, findings, status: response.status });
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : "Impossible d'analyser cette URL." }, { status: 502 });
        }
      },
    },
  },
});
