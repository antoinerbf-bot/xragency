import { SERVICES, PERIOD_LABEL, type Service } from "./content";
import { CHECKOUT_PRODUCTS, type CheckoutProductId } from "./checkout-catalog";
import type { Lang } from "./i18n";

/**
 * Single source of truth for XR Agency commercial pricing & periods.
 * Prevents drift between homepage, service pages, configurator, cart & checkout.
 */
export const SOCIAL_MEDIA_PLANS = [
  {
    sku: "social_essential" as CheckoutProductId,
    id: "essential",
    name: {
      fr: "Présence Essentielle",
      en: "Essential Presence",
      vi: "Hiện Diện Cơ Bản",
      ar: "الحضور الأساسي",
      ru: "Базовое присутствие",
    },
    eur: CHECKOUT_PRODUCTS.social_essential.amountEur, // 349
    period: "month" as const,
    commitmentMonths: 3,
    popular: false,
  },
  {
    sku: "social_growth" as CheckoutProductId,
    id: "growth",
    name: {
      fr: "Croissance Active",
      en: "Active Growth",
      vi: "Tăng Trưởng Chủ Động",
      ar: "النمو النشط",
      ru: "Активный рост",
    },
    eur: CHECKOUT_PRODUCTS.social_growth.amountEur, // 599
    period: "month" as const,
    commitmentMonths: 6,
    popular: true,
  },
  {
    sku: "social_domination" as CheckoutProductId,
    id: "domination",
    name: {
      fr: "Domination Sociale",
      en: "Social Domination",
      vi: "Thống Lĩnh Mạng Xã Hội",
      ar: "الهيمنة الاجتماعية",
      ru: "Лидерство в соцсетях",
    },
    eur: CHECKOUT_PRODUCTS.social_domination.amountEur, // 799
    period: "month" as const,
    commitmentMonths: 6,
    popular: false,
  },
] as const;

export const CANONICAL_SERVICE_URLS: Record<string, string> = {
  websites: "/services/websites",
  branding: "/services/branding",
  seo: "/services/seo",
  maps: "/services/maps",
  social: "/services/social",
  maintenance: "/services/webcare",
  webcare: "/services/webcare",
  robotics: "/services/robotique",
  crm: "/services/crm",
};

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getStartingPriceEur(serviceId: string): number {
  const s = getServiceById(serviceId);
  if (s) return s.fromEur;
  if (serviceId === "website") return CHECKOUT_PRODUCTS.website_showcase.amountEur;
  if (serviceId === "webcare") return CHECKOUT_PRODUCTS.webcare_essential.amountEur;
  return 0;
}

export function getPeriodShortLabel(period: "once" | "month" | "year", lang: Lang): string {
  if (period === "once") return "";
  return PERIOD_LABEL[period][lang] ?? PERIOD_LABEL[period].fr;
}

export function getCommitmentLabel(months: number, lang: Lang): string {
  const templates: Record<Lang, string> = {
    fr: `Engagement ${months} mois`,
    en: `${months}-month commitment`,
    vi: `Cam kết ${months} tháng`,
    ar: `التزام لمدة ${months} أشهر`,
    ru: `Контракт на ${months} мес.`,
  };
  return templates[lang] ?? templates.fr;
}
