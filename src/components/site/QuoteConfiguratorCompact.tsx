import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  Compass,
  Flower2,
  Gem,
  Globe2,
  Hammer,
  Hotel,
  MapPinned,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Palette,
  Plane,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  Bot,
  Camera,
  Monitor,
  Zap,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { QUOTE_UI, SECTORS_DATA, SERVICES_DATA, SITUATIONS_DATA, BUDGETS_DATA, DISCOVERY_DATA, STEP_TITLES, STEP_SUBTITLES, ALEXANDRE_MESSAGES } from "@/lib/quote-i18n";
import { useFunnel } from "@/lib/funnel";
import pfMaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import pfVillaAzur from "@/assets/pf-02-villa-azur.jpg";
import pfNoirOr from "@/assets/pf-03-noir-or.jpg";
import pfCabinetMercier from "@/assets/pf-04-cabinet-mercier.jpg";
import pfElanStudio from "@/assets/pf-05-elan-studio.jpg";
import pfZenRetreat from "@/assets/pf-06-zen-retreat.jpg";
import pfNeoGear from "@/assets/pf-08-neo-gear.jpg";
import webLuxuryShowcase from "@/assets/web-luxury-showcase.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";

type Choice = { id: string; label: string; detail: string };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month"; custom?: boolean; commitment?: string };

const SERVICE_ORDER: Record<string, string[]> = {
  restaurant: ["website", "maps", "social", "seo", "branding", "maintenance", "robotics"],
  hospitality: ["website", "maps", "seo", "social", "branding", "maintenance", "robotics"],
  realestate: ["website", "maps", "branding", "seo", "social", "maintenance", "robotics"],
  automotive: ["website", "maps", "conversion", "seo", "content", "maintenance", "robotics"],
  fashion: ["website", "branding", "social", "content", "seo", "maintenance", "robotics"],
  jewelry: ["website", "branding", "content", "seo", "social", "maintenance", "robotics"],
  beauty: ["website", "maps", "social", "seo", "branding", "maintenance", "robotics"],
  health: ["website", "maps", "seo", "branding", "content", "maintenance", "robotics"],
  architecture: ["website", "branding", "content", "seo", "maps", "maintenance", "robotics"],
  construction: ["website", "maps", "seo", "branding", "content", "maintenance", "robotics"],
  legal: ["website", "seo", "branding", "maps", "content", "maintenance", "robotics"],
  finance: ["website", "seo", "branding", "content", "maps", "maintenance", "robotics"],
  commerce: ["website", "social", "seo", "branding", "conversion", "maintenance", "robotics"],
  tourism: ["website", "maps", "seo", "social", "content", "maintenance", "robotics"],
  agency: ["website", "branding", "conversion", "seo", "content", "maintenance", "robotics"],
  other: ["website", "branding", "seo", "maps", "social", "maintenance", "robotics"],
};

const SECTOR_PHOTOS: Record<string, string> = {
  restaurant: pfMaisonLumiere,
  hospitality: pfVillaAzur,
  realestate: webLuxuryShowcase,
  tourism: pfVillaAzur,
  beauty: pfZenRetreat,
  health: pfZenRetreat,
  automotive: pfNeoGear,
  fashion: pfNoirOr,
  jewelry: pfNoirOr,
  architecture: pfMaisonLumiere,
  construction: pfCabinetMercier,
  legal: pfCabinetMercier,
  finance: pfCabinetMercier,
  commerce: pfElanStudio,
  agency: heroCinematic,
};

const SECTOR_SHORT_LABELS: Record<string, Record<Lang, string>> = {
  restaurant: { fr: "Restaurant", en: "Restaurant", vi: "Nhà hàng", ar: "مطعم", ru: "Ресторан" },
  hospitality: { fr: "Hôtel", en: "Hotel", vi: "Khách sạn", ar: "فندق", ru: "Отель" },
  realestate: { fr: "Immobilier", en: "Real Estate", vi: "Bất động sản", ar: "عقارات", ru: "Недвижимость" },
  tourism: { fr: "Tourisme", en: "Tourism", vi: "Du lịch", ar: "سياحة", ru: "Туризм" },
  beauty: { fr: "Bien-être", en: "Wellness", vi: "Làm đẹp", ar: "سبا وعافية", ru: "Спа и уход" },
  automotive: { fr: "Automobile", en: "Automotive", vi: "Ô tô", ar: "سيارات", ru: "Авто" },
  fashion: { fr: "Mode", en: "Fashion", vi: "Thời trang", ar: "أزياء", ru: "Мода" },
  jewelry: { fr: "Joaillerie", en: "Jewelry", vi: "Trang sức", ar: "مجوهرات", ru: "Ювелирка" },
  health: { fr: "Santé", en: "Healthcare", vi: "Y tế", ar: "صحة", ru: "Медицина" },
  architecture: { fr: "Architecture", en: "Architecture", vi: "Kiến trúc", ar: "عمارة", ru: "Архитектура" },
  construction: { fr: "Construction", en: "Construction", vi: "Xây dựng", ar: "بناء", ru: "Стройка" },
  legal: { fr: "Juridique", en: "Legal", vi: "Pháp lý", ar: "قانون", ru: "Право" },
  finance: { fr: "Finance", en: "Finance", vi: "Tài chính", ar: "مالية", ru: "Финансы" },
  commerce: { fr: "Commerce", en: "Retail", vi: "Bán lẻ", ar: "تجارة", ru: "Ритейл" },
  agency: { fr: "Studio / Agence", en: "Agency", vi: "Agency", ar: "وكالة", ru: "Агентство" },
  other: { fr: "Autre", en: "Other", vi: "Khác", ar: "أخرى", ru: "Другое" },
};

const SECTOR_ICONS: Record<string, typeof Utensils> = {
  restaurant: Utensils,
  hospitality: Hotel,
  realestate: Building2,
  tourism: Plane,
  beauty: Flower2,
  health: Stethoscope,
  automotive: Car,
  fashion: ShoppingBag,
  jewelry: Gem,
  architecture: Compass,
  construction: Hammer,
  legal: Scale,
  finance: TrendingUp,
  commerce: ShoppingBag,
  agency: Sparkles,
  other: MoreHorizontal,
};

const CHOICE_ICONS: Record<string, typeof Globe2> = {
  website: Monitor,
  branding: Palette,
  seo: Search,
  maps: MapPinned,
  ads: Megaphone,
  social: Users,
  content: Camera,
  conversion: Zap,
  maintenance: ShieldCheck,
  robotics: Bot,
};

const ROBOTICS_DETAILS: Record<Lang, string> = {
  fr: "Robotique de service Korben (loyer indicatif à partir de 499 €/mois)",
  en: "Korben service robotics (indicative leasing from €499/month)",
  vi: "Robot dịch vụ Korben (giá thuê tham khảo từ 499 €/tháng)",
  ar: "روبوتات الخدمة Korben (إيجار استرشادي ابتداءً من 499 €/شهر)",
  ru: "Сервисная робототехника Korben (ориентировочная аренда от 499 €/мес)",
};

const BASE_PRICES: Record<string, number> = {
  website: 499,
  branding: 199,
  seo: 299,
  maps: 99,
  ads: 299,
  social: 349,
  content: 399,
  conversion: 299,
  maintenance: 29,
  robotics: 499,
};

const PROFILE_SERVICE_RULES: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_ORDER).map(([sectorId, services]) => [sectorId, services.slice(0, 4)])
);

const MILESTONE_LABELS: Record<Lang, [string, string, string, string]> = {
  fr: ["Projet", "Services", "Options", "Devis"],
  en: ["Project", "Services", "Options", "Quote"],
  vi: ["Dự án", "Dịch vụ", "Tùy chọn", "Báo giá"],
  ar: ["المشروع", "الخدمات", "الخيارات", "العرض"],
  ru: ["Проект", "Услуги", "Опции", "Смета"],
};

const HERO_COPY: Record<Lang, { pre: string; accent: string; lead: string }> = {
  fr: {
    pre: "Votre projet digital,",
    accent: "sur-mesure.",
    lead: "Configurez votre besoin en quelques étapes et recevez une proposition personnalisée.",
  },
  en: {
    pre: "Your digital project,",
    accent: "tailor-made.",
    lead: "Configure your requirements in a few steps and receive a bespoke proposal.",
  },
  vi: {
    pre: "Dự án số của bạn,",
    accent: "đo ni đóng giày.",
    lead: "Thiết lập nhu cầu qua vài bước đơn giản và nhận ngay đề xuất tối ưu.",
  },
  ar: {
    pre: "مشروعك الرقمي،",
    accent: "مصمم خصيصاً لك.",
    lead: "حدّد احتياجاتك في خطوات بسيطة واحصل على عرض مخصص وفوري.",
  },
  ru: {
    pre: "Ваш цифровой проект,",
    accent: "под ваши задачи.",
    lead: "Настройте параметры за пару минут и получите персональный расчёт.",
  },
};

export function QuoteConfiguratorCompact() {
  const { lang } = useLang();
  const currentLang = (lang in QUOTE_UI.kicker ? lang : "fr") as Lang;
  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }

  const SECTORS = useMemo(
    () =>
      SECTORS_DATA.map((s) => ({
        id: s.id,
        label: s.label[currentLang],
        shortLabel: SECTOR_SHORT_LABELS[s.id]?.[currentLang] ?? s.label[currentLang],
        detail: s.detail[currentLang],
        goals: s.goals.map((g) => g[currentLang]),
      })),
    [currentLang]
  );

  const SERVICES = useMemo(
    () =>
      SERVICES_DATA.map((s) => ({
        id: s.id,
        label: s.label[currentLang],
        detail: s.detail[currentLang],
      })),
    [currentLang]
  );

  const SITUATIONS = useMemo(
    () =>
      SITUATIONS_DATA.map((s) => ({
        id: s.id,
        label: s.label[currentLang],
        detail: s.detail[currentLang],
      })),
    [currentLang]
  );

  const BUDGETS = useMemo(
    () =>
      BUDGETS_DATA.map((b) => ({
        id: b.id,
        label: b.label[currentLang],
        detail: b.detail[currentLang],
      })),
    [currentLang]
  );

  const DISCOVERY = useMemo(
    () =>
      DISCOVERY_DATA.map((d) => ({
        id: d.id,
        label: d.label[currentLang],
        detail: d.detail[currentLang],
      })),
    [currentLang]
  );

  const websiteTiers = useMemo(
    () => ({
      showcase: {
        price: 499,
        label: { fr: "Site Vitrine Pro", en: "Pro Showcase Site", vi: "Website Giới thiệu Pro", ar: "موقع تعريفي احترافي", ru: "Сайт-визитка Pro" }[currentLang],
        detail: {
          fr: "Site premium jusqu'à 3 pages, responsive, contact et SEO de base",
          en: "Premium site up to 3 pages, responsive, contact and basic SEO",
          vi: "Website cao cấp tối đa 3 trang, responsive, liên hệ và chuẩn SEO cơ bản",
          ar: "موقع متميز حتى 3 صفحات، متجاوب، تواصل وSEO أساسي",
          ru: "Премиум сайт до 3 страниц, адаптивный, контакты и базовое SEO",
        }[currentLang],
      },
      business: {
        price: 799,
        label: { fr: "Site Business", en: "Business Site", vi: "Website Doanh nghiệp", ar: "موقع أعمال متقدم", ru: "Бизнес-сайт" }[currentLang],
        detail: {
          fr: "Site jusqu'à 5 pages, blog, galerie, chat et analytics avancés",
          en: "Site up to 5 pages, blog, gallery, chat and advanced analytics",
          vi: "Website tối đa 5 trang, blog, thư viện ảnh, chat và analytics nâng cao",
          ar: "موقع حتى 5 صفحات، مدونة، معرض، دردشة وتحليلات متقدمة",
          ru: "Сайт до 5 страниц, блог, галерея, чат и расширенная аналитика",
        }[currentLang],
      },
      ecommerce: {
        price: 1499,
        label: { fr: "E-commerce & Réservation", en: "E-commerce & Booking", vi: "Thương mại điện tử & Đặt chỗ", ar: "تجارة إلكترونية وحجز", ru: "E-commerce и бронирование" }[currentLang],
        detail: {
          fr: "Catalogue, paiement sécurisé, gestion des stocks et parcours de réservation",
          en: "Catalog, secure payment, inventory management and booking flow",
          vi: "Danh mục sản phẩm, thanh toán bảo mật, quản lý kho và luồng đặt chỗ",
          ar: "كتالوج ودفع آمن وإدارة مخزون ومسار حجز",
          ru: "Каталог, безопасная оплата, складской учёт и модуль бронирования",
        }[currentLang],
      },
    }),
    [currentLang]
  );

  const brandingTiers = useMemo(
    () => ({
      starter: {
        price: 199,
        label: { fr: "Logo Signature", en: "Signature Logo", vi: "Logo Đặc trưng", ar: "شعار توقيع مميز", ru: "Фирменный логотип" }[currentLang],
        detail: {
          fr: "Logo, déclinaisons essentielles et fichiers maîtres",
          en: "Logo, essential variations and master files",
          vi: "Logo, các phiên bản cơ bản và tệp gốc",
          ar: "الشعار والنسخ الأساسية والملفات المصدرية",
          ru: "Логотип, базовые версии и исходные файлы",
        }[currentLang],
      },
      premium: {
        price: 399,
        label: { fr: "Full Brand Suite", en: "Full Brand Suite", vi: "Bộ nhận diện toàn diện", ar: "هوية بصرية شاملة", ru: "Полный брендинг" }[currentLang],
        detail: {
          fr: "Système de marque étendu, direction artistique et Brand Book",
          en: "Extended brand system, art direction and Brand Book",
          vi: "Hệ thống thương hiệu mở rộng, định hướng nghệ thuật và Brand Book",
          ar: "نظام علامة تجارية موسع وتوجيه فني ودليل الهوية",
          ru: "Расширенная бренд-система, арт-дирекшн и брендбук",
        }[currentLang],
      },
    }),
    [currentLang]
  );

  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState(() => funnel?.sector || "restaurant");
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [goal, setGoal] = useState(() => funnel?.goal || "");
  const [situation, setSituation] = useState("");
  const [budget, setBudget] = useState("");
  const [discovery, setDiscovery] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(() => funnel?.selectedServices || []);
  const [client, setClient] = useState({ company: "", name: "", email: "", whatsapp: "", website: "" });
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (funnel?.sector && sectorId !== funnel.sector) {
      setSectorId(funnel.sector);
    }
  }, [funnel?.sector]);

  useEffect(() => {
    if (funnel?.selectedServices?.length && selectedServices.length === 0) {
      setSelectedServices(funnel.selectedServices);
    }
  }, [funnel?.selectedServices, selectedServices.length]);

  const sector = SECTORS.find((x) => x.id === sectorId) ?? SECTORS[0];
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const discoveryChoice = DISCOVERY.find((x) => x.id === discovery);
  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other)
    .map((id) => SERVICES.find((x) => x.id === id))
    .filter(Boolean) as Choice[];

  const featuredSectorIds = ["restaurant", "hospitality", "realestate", "tourism", "beauty", "other"];
  const visibleSectors = useMemo(() => {
    if (showAllSectors) return SECTORS;
    return featuredSectorIds.map((id) => SECTORS.find((s) => s.id === id)).filter(Boolean) as typeof SECTORS;
  }, [SECTORS, showAllSectors]);

  const profileRecommendation = useMemo(() => {
    const base = PROFILE_SERVICE_RULES[sectorId] ?? PROFILE_SERVICE_RULES.other;
    const services = new Set<string>(base);

    if (budget === "under500") {
      services.clear();
      services.add(situation === "selling" ? "website" : base[0]);
    } else if (budget === "500_1000") {
      services.delete("social");
      services.delete("branding");
    } else if (budget === "1000_2500") {
      services.add("website");
      if (situation === "selling") services.add("maps");
    } else if (budget === "2500_5000" || budget === "5000_plus") {
      services.add("website");
      if (goal.toLowerCase().includes("premium") || sectorId === "realestate") services.add("branding");
      if (discovery !== "social") services.add("seo");
    }

    if (situation === "none" || situation === "redesign") services.add("website");
    if (situation === "selling") {
      services.add("website");
      services.add("seo");
    }
    if (discovery === "google") {
      services.add("seo");
      if (sectorId === "hospitality" || sectorId === "realestate") services.add("maps");
    }
    if (discovery === "social") services.add("social");
    if (goal.toLowerCase().includes("crédibilité") || goal.toLowerCase().includes("premium")) services.add("branding");
    return Array.from(services).slice(0, 4);
  }, [sectorId, goal, situation, budget, discovery]);

  const proposals: Proposal[] = useMemo(() => {
    return orderedServices.map((service) => {
      let price = BASE_PRICES[service.id] ?? 299;
      let label = service.label;
      let detail = service.detail;
      if (service.id === "maps") {
        price = 99;
        label = "Google Maps Top 3";
        detail = {
          fr: "Dès 99 € / mois (Gestion) · Domination Top 3 à 159 € / mois · Plaque NFC offerte",
          en: "From €99 / mo (Management) · Top 3 Domination at €159 / mo · Free NFC plaque",
          vi: "Từ 99 € / tháng (Quản lý) · Thống lĩnh Top 3 159 € / tháng · Tặng bảng NFC",
          ar: "ابتداءً من 99 € / شهر (إدارة) · تصدر Top 3 بـ 159 € / شهر · لوحة NFC مجانية",
          ru: "От 99 € / мес (Ведение) · Топ-3 Доминирование за 159 € / мес · Стойка NFC в подарок",
        }[currentLang];
      }
      if (service.id === "website") {
        if (situation === "selling") {
          price = websiteTiers.ecommerce.price;
          label = websiteTiers.ecommerce.label;
          detail = websiteTiers.ecommerce.detail;
        } else if (budget === "1000_2500" || budget === "2500_5000" || budget === "5000_plus" || situation === "redesign") {
          price = websiteTiers.business.price;
          label = websiteTiers.business.label;
          detail = websiteTiers.business.detail;
        } else {
          price = websiteTiers.showcase.price;
          label = websiteTiers.showcase.label;
          detail = websiteTiers.showcase.detail;
        }
      }
      if (service.id === "branding" && (budget === "2500_5000" || budget === "5000_plus" || sectorId === "realestate")) {
        price = brandingTiers.premium.price;
        label = brandingTiers.premium.label;
        detail = brandingTiers.premium.detail;
      }
      const commitment =
        service.id === "social"
          ? ({ fr: "Engagement : 3 mois", en: "3-month commitment", vi: "Cam kết 3 tháng", ar: "التزام 3 أشهر", ru: "Обязательство 3 мес" }[currentLang])
          : service.id === "maps"
            ? ({ fr: "Abonnement mensuel", en: "Monthly plan", vi: "Gói hàng tháng", ar: "اشتراك شهري", ru: "Ежемесячный тариф" }[currentLang])
            : undefined;
      return {
        id: service.id,
        label,
        detail,
        price,
        period: service.id === "maps" || service.id === "seo" || service.id === "social" || service.id === "maintenance" || service.id === "robotics" ? "month" : "once",
        custom: false,
        commitment,
      };
    });
  }, [orderedServices, situation, budget, sectorId, currentLang, websiteTiers, brandingTiers]);

  const recommendedIds = profileRecommendation;
  const activeRecommended = recommendedIds.filter((id) => proposals.some((p) => p.id === id));
  useEffect(() => {
    if (step === 4 && selectedServices.length === 0 && activeRecommended.length) {
      setSelectedServices(activeRecommended);
    }
  }, [step, activeRecommended.join(",")]);

  const total = selectedServices.reduce((sum, id) => {
    const p = proposals.find((x) => x.id === id);
    return sum + (p?.custom ? 0 : p?.price ?? 0);
  }, 0);
  const monthly = selectedServices.reduce((sum, id) => {
    const p = proposals.find((x) => x.id === id);
    return sum + (p?.custom ? 0 : p?.period === "month" ? p.price : 0);
  }, 0);
  const once = total - monthly;

  const generatePdf = async () => {
    setSending(true);
    setSendMessage("");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210, M = 14, R = 196;
      const ink = [18, 22, 29] as const;
      const soft = [241, 244, 247] as const;
      const lineColor = [218, 223, 229] as const;
      const muted = [92, 100, 112] as const;
      const white = [255, 255, 255] as const;
      const blue = [32, 32, 32] as const;
      const issueDate = new Date();
      const validity = new Date(issueDate);
      validity.setDate(validity.getDate() + 15);
      const stamp = issueDate.toISOString().slice(0, 10).replace(/-/g, "");
      const quoteNumber = "XR-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
      const pdfLang = currentLang === "ar" || currentLang === "ru" ? "en" : currentLang;
      const cleanForPdf = (str: string) => {
        if (!str) return "";
        return str
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\x20-\x7E\xA0-\xFF]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      };
      const date = (d: Date) => d.toLocaleDateString(pdfLang === "fr" ? "fr-FR" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      const allPdfLabels = {
        fr: { devis: "DEVIS", subtitle: "STUDIO DIGITAL · STRATÉGIE · DESIGN · CROISSANCE", client: "Client", company: "Entreprise", contact: "Contact", email: "E-mail", whatsapp: "WhatsApp", website: "Site", project: "Projet", activity: "Activité", priority: "Priorité", situation: "Situation", budget: "Budget", acquisition: "Acquisition", services: "Prestations sélectionnées", colService: "PRESTATION", colMode: "MODE", colAmount: "MONTANT", frame: "Cadre du devis", validity: "Validité", validText: "15 jours · jusqu’au ", start: "Démarrage", startText: "Après validation du devis et réception des éléments nécessaires au projet.", nature: "Nature", natureText: "Pré-devis généré automatiquement à partir de votre configuration XR Quote Studio.", validation: "Validation client", valText1: "Ce document récapitule les prestations sélectionnées et leur modèle de facturation.", valText2: "Le périmètre définitif est confirmé avec XRAGENCY avant engagement.", dateSig: "Date / signature", nameQuality: "Nom / qualité", totalOnce: "TOTAL PONCTUEL", totalMonth: "TOTAL MENSUEL", recurring: "RÉCURRENT", custom: "SUR MESURE", once: "PONCTUEL", onQuote: "Sur devis" },
        en: { devis: "QUOTATION", subtitle: "DIGITAL STUDIO · STRATEGY · DESIGN · GROWTH", client: "Client", company: "Company", contact: "Contact", email: "Email", whatsapp: "WhatsApp", website: "Website", project: "Project", activity: "Industry", priority: "Priority", situation: "Situation", budget: "Budget", acquisition: "Acquisition", services: "Selected Services", colService: "SERVICE", colMode: "MODE", colAmount: "AMOUNT", frame: "Quote Terms", validity: "Validity", validText: "15 days · until ", start: "Kickoff", startText: "Upon quote sign-off and reception of necessary project assets.", nature: "Nature", natureText: "Automated estimate generated from your XR Quote Studio configuration.", validation: "Client Approval", valText1: "This document outlines selected services and their billing model.", valText2: "Definitive scope is verified with XRAGENCY prior to kickoff.", dateSig: "Date / signature", nameQuality: "Name / title", totalOnce: "ONE-TIME TOTAL", totalMonth: "MONTHLY TOTAL", recurring: "RECURRING", custom: "CUSTOM", once: "ONE-TIME", onQuote: "Custom quote" },
        vi: { devis: "BAO GIA", subtitle: "STUDIO KY THUAT SO · CHIEN LUOC · THIET KE · TANG TRUONG", client: "Khach hang", company: "Cong ty", contact: "Nguoi lien he", email: "Email", whatsapp: "WhatsApp", website: "Website", project: "Du an", activity: "Linh vuc", priority: "Uu tien", situation: "Tinh trang", budget: "Ngan sach", acquisition: "Kenh tiep can", services: "Dich vu da chon", colService: "DICH VU", colMode: "HINH THUC", colAmount: "SO TIEN", frame: "Dieu khoan bao gia", validity: "Hieu luc", validText: "15 ngay · den ngay ", start: "Khoi dong", startText: "Sau khi xac nhan bao gia va nhan du tu lieu du an.", nature: "Phan loai", natureText: "Bao gia uoc tinh tu dong tu XR Quote Studio.", validation: "Xac nhan cua khach hang", valText1: "Tai lieu nay tong hop cac dich vu da chon va mo hinh thanh toan.", valText2: "Pham vi chinh thuc se duoc XRAGENCY thong nhat truoc khi trien khai.", dateSig: "Ngay / Chu ky", nameQuality: "Ho ten / Chuc vu", totalOnce: "TONG MOT LAN", totalMonth: "TONG HANG THANG", recurring: "DINH KY", custom: "THEO YEU CAU", once: "MOT LAN", onQuote: "Theo bao gia" },
      } as const;

      const pdfLabels = allPdfLabels[pdfLang as "fr" | "vi"] ?? allPdfLabels.en;

      const section = (label: string, y: number) => {
        doc.setFillColor(...soft);
        doc.roundedRect(M, y - 4, W - M * 2, 8, 1.5, 1.5, "F");
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.text(cleanForPdf(label).toUpperCase(), M + 3, y + 1);
        return y + 12;
      };

      const infoRow = (label: string, value: string, y: number, x = M, maxWidth = 150) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.7);
        doc.setTextColor(...muted);
        doc.text(cleanForPdf(label), x, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ink);
        const lines = doc.splitTextToSize(cleanForPdf(value || "—"), maxWidth);
        doc.text(lines, x + 30, y);
        return y + Math.max(5, lines.length * 4.5);
      };

      doc.setFillColor(...ink);
      doc.rect(0, 0, W, 33, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("XRAGENCY", M, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(198, 203, 211);
      doc.text(cleanForPdf(pdfLabels.subtitle), M, 21);
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(cleanForPdf(pdfLabels.devis), R - M, 13, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(198, 203, 211);
      doc.text(quoteNumber, R - M, 20, { align: "right" });
      doc.text(date(issueDate), R - M, 26, { align: "right" });

      let y = 44;
      y = section(pdfLabels.client, y);
      y = infoRow(pdfLabels.company, client.company, y);
      y = infoRow(pdfLabels.contact, client.name, y);
      y = infoRow(pdfLabels.email, client.email, y);
      y = infoRow(pdfLabels.whatsapp, client.whatsapp, y);
      y = infoRow(pdfLabels.website, client.website || "—", y);
      y += 4;

      y = section(pdfLabels.project, y);
      y = infoRow(pdfLabels.activity, sector?.label || "—", y);
      y = infoRow(pdfLabels.priority, goal || "—", y);
      y = infoRow(pdfLabels.situation, situationChoice?.label || "—", y);
      y = infoRow(pdfLabels.budget, budgetChoice?.label || "—", y);
      y = infoRow(pdfLabels.acquisition, discoveryChoice?.label || "—", y);
      y += 5;

      y = section(pdfLabels.services, y);
      doc.setFillColor(...ink);
      doc.roundedRect(M, y - 4, W - M * 2, 8, 1.2, 1.2, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text(cleanForPdf(pdfLabels.colService), M + 3, y + 1);
      doc.text(cleanForPdf(pdfLabels.colMode), 124, y + 1);
      doc.text(cleanForPdf(pdfLabels.colAmount), R - 3, y + 1, { align: "right" });
      y += 10;

      selectedServices.forEach((id) => {
        const p = proposals.find((x) => x.id === id);
        if (!p) return;
        const rawDetail = p.id === "robotics" ? ROBOTICS_DETAILS[pdfLang] ?? ROBOTICS_DETAILS.en : p.detail;
        const detail = cleanForPdf(rawDetail);
        if (y > 255) {
          doc.addPage();
          y = 22;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.4);
        doc.setTextColor(...ink);
        doc.text(cleanForPdf(p.label), M + 3, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(5.9);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(detail, 86).slice(0, 2), M + 3, y + 3.5);
        doc.setFontSize(6.4);
        doc.text(cleanForPdf(p.id === "social" ? pdfLabels.recurring + " (3 MOIS)" : p.period === "month" ? pdfLabels.recurring : p.custom ? pdfLabels.custom : pdfLabels.once), 124, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.2);
        doc.setTextColor(...ink);
        doc.text(p.custom ? cleanForPdf(pdfLabels.onQuote) : p.price.toLocaleString("fr-FR") + " €" + (p.period === "month" ? " / mois" : ""), R - 3, y, { align: "right" });
        y += 12;
        doc.setDrawColor(...lineColor);
        doc.line(M, y - 3, R, y - 3);
      });

      y += 3;
      if (y > 250) {
        doc.addPage();
        y = 22;
      }
      doc.setFillColor(...ink);
      doc.roundedRect(110, y - 4, 86, 28, 2.5, 2.5, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.7);
      doc.setTextColor(186, 192, 202);
      doc.text(cleanForPdf(pdfLabels.totalOnce), 114, y + 3);
      doc.text(cleanForPdf(pdfLabels.totalMonth), 114, y + 12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.setTextColor(...white);
      doc.text(once.toLocaleString("fr-FR") + " €", 192, y + 3, { align: "right" });
      doc.text(monthly.toLocaleString("fr-FR") + " € / mois", 192, y + 12, { align: "right" });
      y += 36;

      y = section(pdfLabels.frame, y);
      y = infoRow(pdfLabels.validity, pdfLabels.validText + date(validity), y);
      y = infoRow(pdfLabels.start, pdfLabels.startText, y);
      y = infoRow(pdfLabels.nature, pdfLabels.natureText, y, M, 150);
      y += 5;

      doc.setFillColor(247, 249, 252);
      doc.roundedRect(M, y - 3, W - M * 2, 29, 2.5, 2.5, "F");
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(cleanForPdf(pdfLabels.validation), M + 4, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.4);
      doc.setTextColor(...muted);
      doc.text(cleanForPdf(pdfLabels.valText1), M + 4, y + 11);
      doc.text(cleanForPdf(pdfLabels.valText2), M + 4, y + 16);
      doc.setDrawColor(...lineColor);
      doc.line(111, y + 8, 188, y + 8);
      doc.line(111, y + 21, 188, y + 21);
      doc.setFontSize(5.9);
      doc.text(cleanForPdf(pdfLabels.dateSig), 111, y + 6);
      doc.text(cleanForPdf(pdfLabels.nameQuality), 111, y + 19);

      doc.setDrawColor(...lineColor);
      doc.line(M, 281, R, 281);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.3);
      doc.setTextColor(...ink);
      doc.text("KARMA SASU · XRAGENCY", M, 287);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.7);
      doc.setTextColor(...muted);
      doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · RCS Paris", M, 292);
      doc.text("78 Avenue des Champs-Elysees · Bureau 562 · 75008 Paris · France", M, 296);
      doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 300);
      doc.setTextColor(...blue);
      doc.setFont("helvetica", "bold");
      doc.text(quoteNumber, R, 300, { align: "right" });

      const pdfDataUri = doc.output("datauristring");
      const pdfBase64 = pdfDataUri.includes(",") ? pdfDataUri.split(",")[1] : "";
      doc.save("XRAGENCY-Devis-" + quoteNumber + ".pdf");
      setGenerated(true);

      let emailDelivered = false;
      if (pdfBase64 && client.email) {
        try {
          const emailRes = await fetch("/api/send-quote", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: client.email,
              name: client.name,
              company: client.company,
              whatsapp: client.whatsapp,
              website: client.website,
              quoteNumber,
              pdfBase64,
            }),
          });
          if (emailRes.ok) emailDelivered = true;
        } catch {
          emailDelivered = false;
        }
      }

      if (emailDelivered) {
        setSendMessage(
          currentLang === "en"
            ? `Your PDF quote (${quoteNumber}) has been downloaded and emailed to ${client.email}.`
            : currentLang === "vi"
              ? `Báo giá PDF (${quoteNumber}) đã được tải xuống và gửi tới ${client.email}.`
              : currentLang === "ar"
                ? `تم تنزيل عرض السعر PDF (${quoteNumber}) وإرساله إلى ${client.email}.`
                : currentLang === "ru"
                  ? `Ваш PDF-расчёт (${quoteNumber}) скачан и отправлен на ${client.email}.`
                  : `Votre devis PDF (${quoteNumber}) a été téléchargé et envoyé par e-mail à ${client.email}.`
        );
      } else {
        setSendMessage(QUOTE_UI.pdfGeneratedSuccess[currentLang]);
      }
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : QUOTE_UI.pdfError[currentLang]);
    } finally {
      setSending(false);
    }
  };

  const goToStep = (next: number) => {
    setStep(next);
    window.setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
  };

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    goToStep(next);
  };

  const toggleService = (id: string) =>
    setSelectedServices((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const aliasMap: Record<string, string> = {
      ecommerce: "website",
      websites: "website",
      webcare: "maintenance",
      robotique: "robotics",
    };
    const normalized = requested ? aliasMap[requested] ?? requested : null;
    if (normalized && SERVICES.some((x) => x.id === normalized)) {
      if (requested === "ecommerce") setSituation("selling");
      setSelectedServices((current) => (current.includes(normalized) ? current : [normalized]));
      setStep(4);
    }
  }, []);

  const createCheckout = async () => {
    if (!client.email || !selectedServices.length || paying) return;
    setPaying(true);
    setSendMessage("");
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "checkout", sectorId, situation, budget, selectedServices, client }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || QUOTE_UI.paymentError[currentLang]);
      window.location.href = data.url;
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : QUOTE_UI.paymentError[currentLang]);
    } finally {
      setPaying(false);
    }
  };

  const reset = () => {
    setStep(0);
    setSectorId("restaurant");
    setGoal("");
    setSituation("");
    setBudget("");
    setDiscovery("");
    setSelectedServices([]);
    setClient({ company: "", name: "", email: "", whatsapp: "", website: "" });
    setGenerated(false);
    setSendMessage("");
  };

  const quoteDownloadLabel = sending ? QUOTE_UI.generatingPdf[currentLang] : generated ? QUOTE_UI.downloadAgain[currentLang] : QUOTE_UI.downloadPdf[currentLang];
  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client.company || !client.name || !client.email || !client.whatsapp || sending) return;
    void generatePdf();
  };

  const recommendation = useMemo(() => {
    if (!sector) return "";
    const channels: Record<string, string> = {
      google: { fr: "Google et la visibilité locale", en: "Google and local search visibility", vi: "Google và khả năng hiển thị địa phương", ar: "Google والظهور المحلي", ru: "Google и локальную видимость" }[currentLang],
      social: { fr: "les réseaux sociaux", en: "social media channels", vi: "mạng xã hội", ar: "شبكات التواصل الاجتماعي", ru: "социальные сети" }[currentLang],
      referral: { fr: "la conversion du bouche-à-oreille", en: "word-of-mouth conversion", vi: "chuyển đổi từ truyền miệng", ar: "تحويل توصيات العملاء", ru: "конверсию рекомендаций" }[currentLang],
      mixed: { fr: "la complémentarité de vos canaux", en: "cross-channel synergy", vi: "sự kết hợp đa kênh", ar: "تكامل قنواتك", ru: "синергию всех каналов" }[currentLang],
    };
    const channel = channels[discovery] ?? channels.mixed;
    const budgetTexts: Record<string, string> = {
      under500: { fr: "un premier levier ciblé", en: "a focused initial lever", vi: "một đòn bẩy trọng tâm ban đầu", ar: "أداة تركيز أولية", ru: "точечный стартовый инструмент" }[currentLang],
      "500_1000": { fr: "une présence solide sans disperser le budget", en: "a solid presence without scattering the budget", vi: "sự hiện diện vững chắc không lãng phí ngân sách", ar: "حضوراً قوياً دون تشتيت الميزانية", ru: "уверенное присутствие без распыления бюджета" }[currentLang],
      "1000_2500": { fr: "un dispositif cohérent qui couvre votre socle digital et votre acquisition", en: "a coherent setup covering your digital foundation and acquisition", vi: "hệ thống hoàn chỉnh bao quát nền tảng số và thu hút khách hàng", ar: "منظومة متكاملة تغطي قاعدتك الرقمية والاستقطاب", ru: "комплекс, закрывающий цифровую базу и привлечение клиентов" }[currentLang],
      default: { fr: "un dispositif plus complet, sans ajouter des prestations qui ne servent pas votre objectif", en: "a comprehensive setup without adding unnecessary services", vi: "hệ thống toàn diện mà không thêm dịch vụ thừa", ar: "منظومة شاملة دون إضافة خدمات لا تخدم أهدافك", ru: "полноценную систему без лишних нецелевых услуг" }[currentLang],
    };
    const budgetText = budgetTexts[budget] ?? budgetTexts.default;
    const recServices = activeRecommended.map((id) => SERVICES.find((x) => x.id === id)?.label).filter(Boolean).join(", ");
    if (currentLang === "en") return `For ${sector.label.toLowerCase()}, XR Quote Studio recommends ${budgetText}, prioritizing ${recServices}. Your focus on ${channel} reinforces this direction.`;
    if (currentLang === "vi") return `Đối với ${sector.label.toLowerCase()}, XR Quote Studio khuyến nghị ${budgetText}, ưu tiên ${recServices}.`;
    if (currentLang === "ar") return `بالنسبة لـ ${sector.label}، يوصي XR Quote Studio بـ ${budgetText} مع الأولوية لـ ${recServices}.`;
    if (currentLang === "ru") return `Для сферы «${sector.label.toLowerCase()}» XR Quote Studio рекомендует ${budgetText}, с приоритетом на ${recServices}.`;
    return `Pour ${sector.label.toLowerCase()}, XR Agency recommande ${budgetText}, en donnant la priorité à ${recServices}. Votre objectif sur ${channel} renforce cette stratégie.`;
  }, [sector, discovery, budget, activeRecommended, currentLang, SERVICES]);

  const titles = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => STEP_TITLES[i][currentLang]), [currentLang]);
  const subtitles = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => STEP_SUBTITLES[i][currentLang]), [currentLang]);
  const alexMessages = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ALEXANDRE_MESSAGES[i][currentLang]), [currentLang]);

  const activeMilestoneIdx = step <= 1 ? 0 : step === 2 || step === 4 ? 1 : step === 3 || step === 5 ? 2 : 3;
  const milestones = MILESTONE_LABELS[currentLang] ?? MILESTONE_LABELS.fr;
  const heroCopy = HERO_COPY[currentLang] ?? HERO_COPY.fr;

  const totalLabel =
    once > 0 && monthly > 0
      ? once.toLocaleString("fr-FR") + " € + " + monthly.toLocaleString("fr-FR") + " €" + QUOTE_UI.perMonth[currentLang]
      : once > 0
        ? once.toLocaleString("fr-FR") + " €"
        : monthly > 0
          ? monthly.toLocaleString("fr-FR") + " €" + QUOTE_UI.perMonth[currentLang]
          : QUOTE_UI.calculating[currentLang];

  const card = (item: Choice, onClick: () => void, selected = false, priceDelta?: string) => {
    const Icon = CHOICE_ICONS[item.id] ?? Sparkles;
    return (
      <button
        key={item.id}
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={
          "group relative w-full rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-200 flex items-center justify-between gap-3 " +
          (selected
            ? "border-[#b48f5a] bg-white text-[#141312] shadow-[0_12px_30px_-10px_rgba(180,143,90,0.3)] ring-1 ring-[#b48f5a]/50"
            : "border-[#e5dfd3] bg-white/85 text-[#141312] hover:border-[#c5a880] hover:bg-white")
        }
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className={
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors " +
              (selected ? "bg-[#141312] text-[#c5a880]" : "bg-[#efeae0] text-[#6d593e] group-hover:bg-[#141312] group-hover:text-white")
            }
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <span className="block text-xs sm:text-[13px] font-bold leading-tight text-[#141312] truncate">{item.label}</span>
            <span className="mt-0.5 block text-[10.5px] leading-snug text-[#6b655c] line-clamp-1">{item.detail}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {priceDelta && (
            <span
              className={
                "rounded-full px-2.5 py-0.5 label-mono text-[7px] font-bold tracking-wider " +
                (selected ? "bg-[#c5a880] text-[#141312]" : "border border-[#e2dcd0] bg-[#f7f4ed] text-[#49433a]")
              }
            >
              {priceDelta}
            </span>
          )}
          <span
            className={
              "grid h-6 w-6 place-items-center rounded-full border transition-all " +
              (selected ? "border-[#b48f5a] bg-[#b48f5a] text-white" : "border-[#dcd5c7] bg-[#f7f4ed] text-[#8a8071] group-hover:border-[#141312] group-hover:text-[#141312]")
            }
          >
            {selected ? <Check className="h-3 w-3 stroke-[2.5]" /> : <ArrowRight className="h-3 w-3" />}
          </span>
        </div>
      </button>
    );
  };

  return (
    <section id="quote" className="relative overflow-hidden border-y border-[#101114]/10 bg-[#efeae0] py-12 sm:py-16 lg:py-20 text-[#141312]">
      <div className="relative mx-auto max-w-[1320px] px-3.5 sm:px-6 lg:px-8">
        {/* Luxury Unified App Shell matching Screen 1 (Dark Obsidian Photo Header + Rounded Warm Cream Control Sheet) */}
        <div ref={journeyRef} className="overflow-hidden rounded-[2rem] border border-[#141312]/15 bg-[#12100e] shadow-[0_35px_100px_-30px_rgba(16,14,10,0.45)]">
          {/* Top Obsidian Photographic Header */}
          <div className="relative overflow-hidden px-5 pt-6 pb-12 sm:px-8 sm:pt-8 sm:pb-14 lg:px-12">
            <img
              src={SECTOR_PHOTOS[sectorId] ?? pfVillaAzur}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#12100e]/85 via-[#12100e]/65 to-[#12100e]" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                {/* Brand + 4 Milestones Stepper */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="label-mono text-[8.5px] font-bold tracking-[.26em] text-white/90">
                    X R A G E N C Y
                  </span>
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-md">
                    {milestones.map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => idx <= activeMilestoneIdx && goToStep(idx === 0 ? 0 : idx === 1 ? 4 : idx === 2 ? 5 : 6)}
                        className={
                          "inline-flex items-center gap-1.5 text-[10px] font-medium transition " +
                          (idx === activeMilestoneIdx ? "text-[#e5c99b] font-bold" : idx < activeMilestoneIdx ? "text-white/85" : "text-white/40")
                        }
                      >
                        <span
                          className={
                            "grid h-4 w-4 place-items-center rounded-full text-[8.5px] font-bold " +
                            (idx === activeMilestoneIdx
                              ? "bg-[#c5a880] text-[#12100e]"
                              : idx < activeMilestoneIdx
                                ? "bg-white/25 text-white"
                                : "border border-white/25 text-white/50")
                          }
                        >
                          {idx + 1}
                        </span>
                        <span>{label}</span>
                        {idx < 3 && <span className="text-white/25 ml-1">—</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile compact 4-milestone rail */}
                <div className="flex sm:hidden items-center justify-between gap-1 rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md mb-4">
                  {milestones.map((label, idx) => (
                    <div
                      key={label}
                      className={"flex items-center gap-1 text-[10px] " + (idx === activeMilestoneIdx ? "text-[#e5c99b] font-bold" : "text-white/55")}
                    >
                      <span
                        className={
                          "grid h-4 w-4 place-items-center rounded-full text-[8.5px] font-bold " +
                          (idx === activeMilestoneIdx ? "bg-[#c5a880] text-[#12100e]" : "border border-white/25")
                        }
                      >
                        {idx + 1}
                      </span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <h2 className="display-serif text-[clamp(1.85rem,3.6vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                  {heroCopy.pre}{" "}
                  <span className="font-serif italic font-light text-[#d4b686]">{heroCopy.accent}</span>
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg">
                  {heroCopy.lead}
                </p>
              </div>

              {/* Concierge Real-Time Investment & Advice Pill */}
              <div className="rounded-2xl border border-white/15 bg-black/55 p-4 backdrop-blur-xl text-white lg:min-w-[340px] lg:max-w-[380px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative grid h-8 w-8 place-items-center rounded-lg border border-[#c5a880]/40 bg-[#1c1915] text-[11px] font-serif font-bold text-[#e5c99b]">
                      AX
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#12100e] bg-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold leading-none">Agent XR · Devis Live</p>
                      <p className="mt-1 text-[9.5px] text-white/60 leading-none">{titles[step]}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block label-mono text-[6px] text-[#c5a880] uppercase">{QUOTE_UI.liveEstimate[currentLang]}</span>
                    <span className="text-[12.5px] sm:text-sm font-bold text-white whitespace-nowrap">{totalLabel}</span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-start gap-2 text-[11px] text-white/80 leading-snug">
                  <MessageCircle className="h-3.5 w-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                  <p className="line-clamp-2">{alexMessages[step]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rounded Warm Cream Sheet sliding over Dark Banner */}
          <div className="-mt-6 relative z-20 rounded-t-[1.85rem] bg-[#f7f4ed] px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 text-[#141312]">
            {/* Step Header + Back Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#e4dfd5]">
              <div>
                <span className="label-mono text-[7px] font-bold tracking-[.2em] text-[#8b704f] uppercase">
                  {step === 7 ? QUOTE_UI.lastStretch[currentLang] : `${QUOTE_UI.stepWord[currentLang]} 0${step + 1} / 08`}
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-[#141312]">
                  {subtitles[step]}
                </h3>
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => goToStep(step - 1)}
                  className="rounded-full border border-[#d6cfc1] bg-white px-4 py-1.5 text-xs font-semibold text-[#141312] transition hover:border-[#141312]"
                >
                  ← {QUOTE_UI.back[currentLang]}
                </button>
              )}
            </div>

            <div className="mt-6">
              {/* STEP 0: Photographic Luxury Sector Grid (Screen 1 Signature UI) */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {visibleSectors.map((item) => {
                      const isSelected = item.id === sectorId;
                      const photo = SECTOR_PHOTOS[item.id];
                      const Icon = SECTOR_ICONS[item.id] ?? Sparkles;

                      if (!photo) {
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSectorId(item.id);
                              goToStep(1);
                            }}
                            className={
                              "group relative flex aspect-[4/3] sm:aspect-[4/3.2] flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all duration-200 " +
                              (isSelected
                                ? "border-[#b48f5a] bg-[#ece6da] ring-2 ring-[#b48f5a]/40 shadow-md"
                                : "border-[#e2dcd0] bg-[#ece8de] hover:border-[#b48f5a]")
                            }
                          >
                            {isSelected && (
                              <span className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-[#b48f5a] text-white shadow-sm">
                                <Check className="h-3 w-3 stroke-[3]" />
                              </span>
                            )}
                            <MoreHorizontal className="h-6 w-6 text-[#5f584d] mb-1.5" />
                            <span className="text-xs sm:text-[13px] font-bold text-[#141312]">{item.shortLabel}</span>
                          </button>
                        );
                      }

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSectorId(item.id);
                            goToStep(1);
                          }}
                          className={
                            "group relative aspect-[4/3] sm:aspect-[4/3.2] overflow-hidden rounded-2xl border text-left transition-all duration-300 " +
                            (isSelected
                              ? "border-[#b48f5a] ring-2 ring-[#b48f5a] shadow-[0_14px_30px_-10px_rgba(180,143,90,0.55)]"
                              : "border-[#dfd8cb] hover:border-[#b48f5a]/70 hover:-translate-y-0.5")
                          }
                        >
                          <img
                            src={photo}
                            alt={item.shortLabel}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                          {isSelected && (
                            <span className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-[#c5a880] text-[#141312] shadow-md">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                          )}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-white">
                            <Icon className="h-3.5 w-3.5 text-[#e5c99b] shrink-0" />
                            <span className="text-xs sm:text-[13px] font-bold tracking-tight truncate">
                              {item.shortLabel}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAllSectors((v) => !v)}
                      className="rounded-full border border-[#d6cfc1] bg-white px-5 py-2 label-mono text-[7.5px] font-semibold text-[#5c554a] hover:border-[#141312] hover:text-[#141312] transition"
                    >
                      {showAllSectors ? QUOTE_UI.collapseSectors[currentLang] : QUOTE_UI.seeAllSectors[currentLang]}
                    </button>

                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="w-full sm:w-auto sm:min-w-[240px] inline-flex items-center justify-center gap-2 rounded-full bg-[#141312] px-7 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#2a2723]"
                    >
                      <span>{QUOTE_UI.continue[currentLang]}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && sector && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#e2dcd0] bg-white px-4 py-3 text-xs">
                    <span className="label-mono text-[6.5px] text-[#8b704f] font-bold uppercase block">{QUOTE_UI.activityBadge[currentLang]}</span>
                    <span className="font-bold text-[#141312]">{sector.label}</span> ·{" "}
                    <span className="text-[#6b655c]">{sector.detail}</span>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {sector.goals.map((x) =>
                      card(
                        {
                          id: x,
                          label: x,
                          detail:
                            currentLang === "en"
                              ? "Priority objective for your industry"
                              : currentLang === "vi"
                                ? "Mục tiêu ưu tiên cho ngành của bạn"
                                : "Priorité adaptée à votre secteur",
                        },
                        () => choose(setGoal, x, 2),
                        goal === x
                      )
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {SITUATIONS.map((x) => card(x, () => choose(setSituation, x.id, 3), x.id === situation))}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {BUDGETS.map((x) =>
                    card(
                      x,
                      () => {
                        setBudget(x.id);
                        goToStep(4);
                      },
                      x.id === budget
                    )
                  )}
                </div>
              )}

              {/* STEP 4: Services */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#e2dcd0] bg-white px-4 py-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="label-mono text-[6.5px] text-[#8b704f] font-bold block uppercase">{QUOTE_UI.preparedSelection[currentLang]}</span>
                      <p className="text-xs font-semibold text-[#141312]">{QUOTE_UI.preparedTitle[currentLang]}</p>
                    </div>
                    <span className="rounded-full bg-[#141312] px-3 py-1 label-mono text-[7px] font-bold text-[#c5a880]">
                      {selectedServices.length} {QUOTE_UI.activeBricks[currentLang]}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {orderedServices.map((x) => {
                      const p = proposals.find((item) => item.id === x.id);
                      const deltaTag = p
                        ? p.custom
                          ? QUOTE_UI.onQuote[currentLang]
                          : p.period === "month"
                            ? `${p.price.toLocaleString("fr-FR")} €${QUOTE_UI.perMonth[currentLang]}`
                            : `+${p.price.toLocaleString("fr-FR")} €`
                        : undefined;
                      return card(x, () => toggleService(x.id), selectedServices.includes(x.id), deltaTag);
                    })}
                  </div>
                  <button
                    type="button"
                    disabled={!selectedServices.length}
                    onClick={() => goToStep(5)}
                    className="w-full rounded-full bg-[#141312] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#2a2723] disabled:opacity-30"
                  >
                    {QUOTE_UI.continue[currentLang]} →
                  </button>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {DISCOVERY.map((x) => card(x, () => choose(setDiscovery, x.id, 6), x.id === discovery))}
                </div>
              )}

              {/* STEP 6 */}
              {step === 6 && sector && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#c5a880]/50 bg-white p-4">
                    <span className="label-mono text-[6.5px] text-[#8b704f] font-bold block uppercase">{QUOTE_UI.recommendationBadge[currentLang]}</span>
                    <p className="mt-1 text-sm leading-relaxed text-[#141312] font-medium">{recommendation}</p>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {selectedServices.map((id) => {
                      const p = proposals.find((x) => x.id === id);
                      return p ? (
                        <div key={id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#e2dcd0] bg-white px-4 py-3">
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-[#141312] truncate">{p.label}</span>
                            {p.commitment && <span className="block label-mono text-[6.5px] text-[#8b704f]">{p.commitment}</span>}
                          </div>
                          <span className="shrink-0 label-mono text-[8px] font-bold text-[#141312]">
                            {p.custom ? QUOTE_UI.onQuote[currentLang] : p.price.toLocaleString("fr-FR") + " €" + (p.period === "month" ? QUOTE_UI.perMonth[currentLang] : "")}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#e2dcd0] bg-white p-4 text-center">
                      <span className="label-mono text-[6.5px] text-[#6b655c] block">{QUOTE_UI.oneOff[currentLang]}</span>
                      <span className="text-xl font-bold text-[#141312] sm:text-2xl">{once.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="rounded-2xl border border-[#e2dcd0] bg-white p-4 text-center">
                      <span className="label-mono text-[6.5px] text-[#6b655c] block">{QUOTE_UI.monthly[currentLang]}</span>
                      <span className="text-xl font-bold text-[#141312] sm:text-2xl">
                        {monthly.toLocaleString("fr-FR")} €<span className="text-xs font-normal text-[#6b655c]">{QUOTE_UI.perMonth[currentLang]}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2 pt-2">
                    <button type="button" onClick={() => goToStep(7)} className="rounded-full bg-[#141312] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#2a2723]">
                      {QUOTE_UI.getQuotePdf[currentLang]} →
                    </button>
                    <a
                      href={
                        "https://wa.me/33767566783?text=" +
                        encodeURIComponent(
                          currentLang === "en"
                            ? `Hello XR Agency, I completed my Quote Studio setup. Industry: ${sector.label}. Services: ${selectedServices.map((id) => proposals.find((p) => p.id === id)?.label).filter(Boolean).join(", ")}. Total: ${totalLabel}.`
                            : `Bonjour XR Agency, j'ai configuré mon devis. Secteur : ${sector.label}. Prestations : ${selectedServices.map((id) => proposals.find((p) => p.id === id)?.label).filter(Boolean).join(", ")}. Total : ${totalLabel}.`
                        )
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6cfc1] bg-white px-6 py-3.5 text-xs font-bold text-[#141312] hover:border-[#141312] transition"
                    >
                      {QUOTE_UI.continueWhatsApp[currentLang]} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* STEP 7 */}
              {step === 7 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#c5a880]/50 bg-white px-4 py-3">
                    <span className="label-mono text-[6.5px] text-[#8b704f] font-bold block uppercase">{QUOTE_UI.finalizationBadge[currentLang]}</span>
                    <p className="text-xs font-semibold text-[#141312]">{QUOTE_UI.finalizationTitle[currentLang]}</p>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} placeholder={QUOTE_UI.formCompany[currentLang]} autoComplete="organization" className="w-full rounded-xl border border-[#ddd6c8] bg-white px-4 py-3 text-xs text-[#141312] outline-none focus:border-[#b48f5a]" required />
                      <input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder={QUOTE_UI.formName[currentLang]} autoComplete="name" className="w-full rounded-xl border border-[#ddd6c8] bg-white px-4 py-3 text-xs text-[#141312] outline-none focus:border-[#b48f5a]" required />
                      <input value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} type="email" placeholder={QUOTE_UI.formEmail[currentLang]} autoComplete="email" className="w-full rounded-xl border border-[#ddd6c8] bg-white px-4 py-3 text-xs text-[#141312] outline-none focus:border-[#b48f5a]" required />
                      <input value={client.whatsapp} onChange={(e) => setClient({ ...client, whatsapp: e.target.value })} type="tel" placeholder={QUOTE_UI.formPhone[currentLang]} autoComplete="tel" className="w-full rounded-xl border border-[#ddd6c8] bg-white px-4 py-3 text-xs text-[#141312] outline-none focus:border-[#b48f5a]" required />
                    </div>
                    <input value={client.website} onChange={(e) => setClient({ ...client, website: e.target.value })} type="url" placeholder={QUOTE_UI.formWebsite[currentLang]} autoComplete="url" className="w-full rounded-xl border border-[#ddd6c8] bg-white px-4 py-3 text-xs text-[#141312] outline-none focus:border-[#b48f5a]" />

                    <div className="grid gap-2.5 sm:grid-cols-2 pt-2">
                      <button type="submit" disabled={!client.company || !client.name || !client.email || !client.whatsapp || sending} className="w-full rounded-full bg-[#141312] px-6 py-3.5 text-xs font-bold text-white shadow-lg disabled:opacity-30 hover:bg-[#2a2723] transition">
                        {quoteDownloadLabel}
                      </button>
                      <button type="button" onClick={createCheckout} disabled={!client.company || !client.name || !client.email || !client.whatsapp || paying} className="w-full rounded-full border border-[#b48f5a] bg-[#f4efe4] px-6 py-3.5 text-xs font-bold text-[#141312] hover:bg-[#141312] hover:text-white transition disabled:opacity-30">
                        {paying ? QUOTE_UI.preparingPayment[currentLang] : QUOTE_UI.payDeposit[currentLang]}
                      </button>
                    </div>
                  </form>

                  {generated && (
                    <div className="rounded-xl border border-emerald-600/30 bg-emerald-50 p-3 text-xs text-center text-emerald-700 font-semibold">
                      {QUOTE_UI.pdfSuccess[currentLang]}
                    </div>
                  )}
                  {sendMessage && (
                    <div aria-live="polite" className="rounded-xl border border-[#e2dcd0] bg-white p-3 text-center text-xs text-[#554f46]">
                      {sendMessage}
                    </div>
                  )}
                  <button type="button" onClick={reset} className="mx-auto flex items-center gap-1.5 label-mono text-[7px] text-[#787062] hover:text-[#141312] transition">
                    <span>↺</span> {QUOTE_UI.restart[currentLang]}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
