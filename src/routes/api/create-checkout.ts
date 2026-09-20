import { createFileRoute } from "@tanstack/react-router";

type CheckoutBody = {
  sectorId?: string;
  situation?: string;
  budget?: string;
  selectedServices?: string[];
  client?: { company?: string; name?: string; email?: string; whatsapp?: string; website?: string };
};

const BASE_PRICES: Record<string, number> = {
  website: 499,
  branding: 199,
  seo: 199,
  maps: 99,
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
          if (!process.env.STRIPE_SECRET_KEY) {
            return Response.json({ error: "STRIPE_SECRET_KEY manquante dans Vercel." }, { status: 503 });
          }

          const body = await request.json() as CheckoutBody;
          const selectedServices = Array.isArray(body.selectedServices) ? body.selectedServices.slice(0, 10) : [];
          const situation = body.situation || "";
          const budget = body.budget || "";
          const sectorId = body.sectorId || "";

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

          lineItems.forEach((item, index) => {
            form.set(`line_items[${index}][price_data][currency]`, "eur");
            form.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(item.amount * 100)));
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
