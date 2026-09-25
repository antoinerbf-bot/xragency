import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

type CheckoutBody = {
  sectorId?: string;
  currency?: "eur" | "usd" | "vnd";
  situation?: string;
  budget?: string;
  selectedServices?: string[];
  action?: "checkout" | "send_quote";
  pdfBase64?: string;
  summary?: { sector?: string; goal?: string; situation?: string; budget?: string; discovery?: string; recommendation?: string; services?: Array<{ label: string; detail: string; price: number; period: "once" | "month" }>; once?: number; monthly?: number };
  client?: { company?: string; name?: string; email?: string; whatsapp?: string; website?: string };
};

const BASE_PRICES: Record<string, number> = {
  website: 499,
  branding: 199,
  seo: 199,
  maps: 990,
  ads: 299,
  social: 299,
  content: 399,
  conversion: 299,
  maintenance: 29,
};

const WEBSITE_PRICES = {
  showcase: 499,
  business: 799,
  ecommerce: 1499,
};

const PREMIUM_BRANDING = 399;

const CURRENCY_RATES: Record<"eur" | "usd" | "vnd", number> = {
  eur: 1,
  usd: 1.15,
  vnd: 29800,
};

function convertAmount(amountEur: number, currency: "eur" | "usd" | "vnd") {
  const converted = amountEur * CURRENCY_RATES[currency];
  return currency === "vnd" ? Math.round(converted) : Math.round(converted * 100) / 100;
}

function toMinorUnit(amount: number, currency: "eur" | "usd" | "vnd") {
  return currency === "vnd" ? Math.round(amount) : Math.round(amount * 100);
}

function getPrice(serviceId: string, situation: string, budget: string, sectorId: string) {
  if (serviceId === "website") {
    if (situation === "selling") return WEBSITE_PRICES.ecommerce;
    if (budget === "1000_2500" || budget === "2500_5000" || budget === "5000_plus" || situation === "redesign") {
      return WEBSITE_PRICES.business;
    }
    return WEBSITE_PRICES.showcase;
  }
  if (serviceId === "branding" && (budget === "2500_5000" || budget === "5000_plus" || sectorId === "realestate")) {
    return PREMIUM_BRANDING;
  }
  return BASE_PRICES[serviceId] ?? 0;
}

function getLabel(serviceId: string, situation: string) {
  if (serviceId === "website" && situation === "selling") return "E-commerce & Réservation";
  if (serviceId === "website") return "Site web XRAGENCY";
  const labels: Record<string, string> = {
    branding: "Branding",
    seo: "SEO",
    maps: "Google Maps",
    ads: "Google Ads",
    social: "Social Media",
    content: "Contenu · photo · vidéo",
    conversion: "Conversion & parcours",
    maintenance: "WebCare",
  };
  return labels[serviceId] ?? serviceId;
}

export const Route = createFileRoute("/api/create-checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as CheckoutBody;

          if (body.action === "send_quote") {
            const email = body.client?.email?.trim();
            const pdfBase64 = body.pdfBase64?.trim();
            if (!email || !pdfBase64) return Response.json({ error: "E-mail et PDF requis." }, { status: 400 });
            if (!process.env.RESEND_API_KEY) return Response.json({ error: "RESEND_API_KEY manquante dans Vercel. Le PDF a été généré, mais l'envoi automatique est indisponible." }, { status: 503 });
            const resend = new Resend(process.env.RESEND_API_KEY);
            const summary = body.summary || {};
            const services = (summary.services || []).map((service) => `<li><strong>${service.label}</strong> — ${service.price.toLocaleString("fr-FR")} €${service.period === "month" ? " / mois" : ""}<br><span style="color:#666">${service.detail}</span></li>`).join("");
            const result = await resend.emails.send({
              from: process.env.RESEND_FROM_EMAIL || "XR Agency <onboarding@resend.dev>",
              to: [email],
              replyTo: "contact.xragency@gmail.com",
              subject: "Votre devis personnalisé — XR Agency",
              html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#171717"><h1>Votre devis personnalisé XR Agency</h1><p>Bonjour ${body.client?.name || ""},</p><p>Merci d'avoir terminé votre diagnostic <strong>XR Intelligence</strong>. Le PDF complet est en pièce jointe.</p><h2>Votre recherche</h2><p><strong>Activité :</strong> ${summary.sector || ""}<br><strong>Priorité :</strong> ${summary.goal || ""}<br><strong>Situation :</strong> ${summary.situation || ""}<br><strong>Budget :</strong> ${summary.budget || ""}<br><strong>Acquisition :</strong> ${summary.discovery || ""}</p><h2>Recommandation</h2><p>${summary.recommendation || ""}</p><h2>Prestations retenues</h2><ul>${services}</ul><p><strong>Total ponctuel :</strong> ${(summary.once || 0).toLocaleString("fr-FR")} €<br><strong>Total mensuel :</strong> ${(summary.monthly || 0).toLocaleString("fr-FR")} € / mois</p></div>`,
              attachments: [{ filename: "devis-xragency.pdf", content: pdfBase64 }],
            });
            if (result.error) return Response.json({ error: result.error.message || "Resend n'a pas pu envoyer l'e-mail." }, { status: 502 });
            return Response.json({ sent: true });
          }
          if (!process.env.STRIPE_SECRET_KEY) {
            return Response.json({ error: "STRIPE_SECRET_KEY manquante dans Vercel." }, { status: 503 });
          }

          const selectedServices = Array.isArray(body.selectedServices) ? body.selectedServices.slice(0, 10) : [];
          const situation = body.situation || "";
          const budget = body.budget || "";
          const sectorId = body.sectorId || "";
          const currency = body.currency === "usd" || body.currency === "vnd" ? body.currency : "eur";

          if (!selectedServices.length) {
            return Response.json({ error: "Aucune prestation sélectionnée." }, { status: 400 });
          }

          const lineItems = selectedServices
            .map((serviceId) => {
              const amount = getPrice(serviceId, situation, budget, sectorId);
              if (!amount || amount < 1) return null;
              const recurring = serviceId === "seo" || serviceId === "social" || serviceId === "maintenance";
              return {
                amount,
                label: getLabel(serviceId, situation),
                recurring,
              };
            })
            .filter(Boolean) as Array<{ amount: number; label: string; recurring: boolean }>;

          if (!lineItems.length) {
            return Response.json({ error: "Impossible de calculer le devis." }, { status: 400 });
          }

          const mode = lineItems.some((item) => item.recurring) ? "subscription" : "payment";
          const form = new URLSearchParams();

          form.set("mode", mode);
          form.set("success_url", `${process.env.SITE_URL || new URL(request.url).origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`);
          form.set("cancel_url", `${process.env.SITE_URL || new URL(request.url).origin}/#quote`);
          form.set("billing_address_collection", "auto");
          form.set("allow_promotion_codes", "true");
          form.set("locale", "auto");

          if (body.client?.email) form.set("customer_email", body.client.email);
          if (body.client?.name) form.set("metadata[customer_name]", body.client.name);
          if (body.client?.company) form.set("metadata[company]", body.client.company);
          if (body.client?.whatsapp) form.set("metadata[whatsapp]", body.client.whatsapp);
          if (body.client?.website) form.set("metadata[website]", body.client.website);
          form.set("metadata[sector]", sectorId);
          form.set("metadata[situation]", situation);
          form.set("metadata[budget]", budget);
          form.set("metadata[services]", selectedServices.join(","));
          form.set("metadata[currency]", currency);

          lineItems.forEach((item, index) => {
            form.set(`line_items[${index}][price_data][currency]`, currency);
            const convertedAmount = convertAmount(item.amount, currency);
            form.set(`line_items[${index}][price_data][unit_amount]`, String(toMinorUnit(convertedAmount, currency)));
            form.set(`line_items[${index}][price_data][product_data][name]`, item.label);
            if (item.recurring) {
              form.set(`line_items[${index}][price_data][recurring][interval]`, "month");
            }
            form.set(`line_items[${index}][quantity]`, "1");
          });

          const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form,
          });

          const stripeData = await stripeResponse.json() as { url?: string; error?: { message?: string } };

          if (!stripeResponse.ok || !stripeData.url) {
            return Response.json(
              { error: stripeData.error?.message || "Stripe n'a pas pu créer la session." },
              { status: 502 },
            );
          }

          return Response.json({ url: stripeData.url });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Erreur lors de la création du paiement." },
            { status: 500 },
          );
        }
      },
    },
  },
});
