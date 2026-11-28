export type CheckoutInterval = "once" | "month" | "year";

export interface CheckoutProduct {
  label: string;
  amountEur: number;
  interval: CheckoutInterval;
  commitmentMonths?: number;
}

/**
 * Canonical server-side checkout catalogue.
 * Prices are taken from the published XR Agency plans; unknown/custom work
 * must be quoted instead of being priced from a client's budget or sector.
 */
export const CHECKOUT_PRODUCTS = {
  website_showcase: { label: "Site Vitrine Pro", amountEur: 499, interval: "once" },
  website_business: { label: "Site Business", amountEur: 799, interval: "once" },
  ecommerce_base: { label: "E-commerce & Réservation en ligne", amountEur: 1499, interval: "once" },
  pos_crm_base: { label: "Système POS / CRM sur-mesure", amountEur: 2000, interval: "once" },

  branding_logo: { label: "Logo Signature", amountEur: 199, interval: "once" },
  branding_identity: { label: "Brand Identity Kit", amountEur: 299, interval: "once" },
  branding_full: { label: "Full Brand Suite", amountEur: 399, interval: "once" },

  seo_starter: { label: "SEO Starter", amountEur: 299, interval: "month" },
  seo_growth: { label: "SEO Growth", amountEur: 499, interval: "month" },

  maps_top3: { label: "Référencement local Top 3 (sur-mesure)", amountEur: 550, interval: "once" },
  maps_essentiel: {
    label: "Gestion Google Business Profile — Essentiel",
    amountEur: 99,
    interval: "month",
  },
  maps_croissance: {
    label: "Gestion Google Business Profile — Croissance",
    amountEur: 169,
    interval: "month",
  },
  maps_intensif: {
    label: "Gestion Google Business Profile — Intensif",
    amountEur: 299,
    interval: "month",
  },

  social_essential: {
    label: "Social Media — Présence Essentielle",
    amountEur: 349,
    interval: "month",
    commitmentMonths: 3,
  },
  social_growth: {
    label: "Social Media — Croissance Active",
    amountEur: 599,
    interval: "month",
    commitmentMonths: 6,
  },
  social_domination: {
    label: "Social Media — Domination Sociale",
    amountEur: 799,
    interval: "month",
    commitmentMonths: 6,
  },

  webcare_essential: { label: "WebCare — Essentiel", amountEur: 29, interval: "month" },
  webcare_business: { label: "WebCare — Business", amountEur: 49, interval: "month" },
  webcare_unlimited: { label: "WebCare — Unlimited", amountEur: 99, interval: "month" },
  webcare_hosting: {
    label: "Hébergement haute performance & Domaine annuel",
    amountEur: 79,
    interval: "year",
  },

} as const satisfies Record<string, CheckoutProduct>;

export type CheckoutProductId = keyof typeof CHECKOUT_PRODUCTS;
