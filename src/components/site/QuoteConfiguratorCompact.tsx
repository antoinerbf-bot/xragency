import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, ChevronRight, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { Parallax, Reveal } from "./primitives";
import { useLang, type Lang } from "@/lib/i18n";
import {
  SECTORS_DATA,
  SERVICES_DATA,
  SITUATIONS_DATA,
  BUDGETS_DATA,
  DISCOVERY_DATA,
  ALEXANDRE_MESSAGES,
  STEP_TITLES,
  STEP_SUBTITLES,
  QUOTE_UI,
} from "@/lib/quote-i18n";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month"; custom?: boolean };

const SERVICE_ORDER: Record<string, string[]> = {
  restaurant: ["website","maps","social","seo","branding","maintenance","robotics"],
  hospitality: ["website","maps","seo","social","branding","maintenance","robotics"],
  realestate: ["website","maps","branding","seo","social","maintenance","robotics"],
  automotive: ["website","maps","conversion","seo","content","maintenance","robotics"],
  fashion: ["website","branding","social","content","seo","maintenance","robotics"],
  jewelry: ["website","branding","content","seo","social","maintenance","robotics"],
  beauty: ["website","maps","social","seo","branding","maintenance","robotics"],
  health: ["website","maps","seo","branding","content","maintenance","robotics"],
  architecture: ["website","branding","content","seo","maps","maintenance","robotics"],
  construction: ["website","maps","seo","branding","content","maintenance","robotics"],
  legal: ["website","seo","branding","maps","content","maintenance","robotics"],
  finance: ["website","seo","branding","content","maps","maintenance","robotics"],
  commerce: ["website","social","seo","branding","conversion","maintenance","robotics"],
  tourism: ["website","maps","seo","social","content","maintenance","robotics"],
  agency: ["website","branding","conversion","seo","content","maintenance","robotics"],
  other: ["website","branding","seo","maps","social","maintenance","robotics"]
};

const BASE_PRICES: Record<string, number> = { website: 499, branding: 179, seo: 299, maps: 990, ads: 299, social: 299, content: 399, conversion: 299, maintenance: 29, robotics: 499 };

const PROFILE_SERVICE_RULES: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_ORDER).map(([sectorId, services]) => [sectorId, services.slice(0, 4)])
);

export function QuoteConfiguratorCompact() {
  const { lang } = useLang();
  const currentLang = (lang in QUOTE_UI.kicker ? lang : "fr") as Lang;

  const SECTORS = useMemo(() => SECTORS_DATA.map((s) => ({
    id: s.id,
    label: s.label[currentLang],
    detail: s.detail[currentLang],
    goals: s.goals.map((g) => g[currentLang])
  })), [currentLang]);

  const SERVICES = useMemo(() => SERVICES_DATA.map((s) => ({
    id: s.id,
    label: s.label[currentLang],
    detail: s.detail[currentLang]
  })), [currentLang]);

  const SITUATIONS = useMemo(() => SITUATIONS_DATA.map((s) => ({
    id: s.id,
    label: s.label[currentLang],
    detail: s.detail[currentLang]
  })), [currentLang]);

  const BUDGETS = useMemo(() => BUDGETS_DATA.map((b) => ({
    id: b.id,
    label: b.label[currentLang],
    detail: b.detail[currentLang]
  })), [currentLang]);

  const DISCOVERY = useMemo(() => DISCOVERY_DATA.map((d) => ({
    id: d.id,
    label: d.label[currentLang],
    detail: d.detail[currentLang]
  })), [currentLang]);

  const websiteTiers = useMemo(() => ({
    showcase: {
      price: 499,
      label: { fr: "Site Vitrine Pro", en: "Pro Showcase Site", vi: "Website Giới thiệu Pro", ar: "موقع تعريفي احترافي", ru: "Сайт-витрина Pro" }[currentLang],
      detail: { fr: "Site premium jusqu'à 3 pages, responsive, contact et SEO de base", en: "Premium site up to 3 pages, responsive, contact and basic SEO", vi: "Website cao cấp tối đa 3 trang, responsive, liên hệ và chuẩn SEO cơ bản", ar: "موقع متميز حتى 3 صفحات، متجاوب، تواصل وSEO أساسي", ru: "Премиум сайт до 3 страниц, адаптивный, контакты и базовое SEO" }[currentLang],
    },
    business: {
      price: 799,
      label: { fr: "Site Business", en: "Business Site", vi: "Website Doanh nghiệp", ar: "موقع أعمال متقدم", ru: "Бизнес-сайт" }[currentLang],
      detail: { fr: "Site jusqu'à 5 pages, blog, galerie, chat et analytics avancés", en: "Site up to 5 pages, blog, gallery, chat and advanced analytics", vi: "Website tối đa 5 trang, blog, thư viện ảnh, chat và analytics nâng cao", ar: "موقع حتى 5 صفحات، مدونة، معرض، دردشة وتحليلات متقدمة", ru: "Сайт до 5 страниц, блог, галерея, чат и расширенная аналитика" }[currentLang],
    },
    ecommerce: {
      price: 1499,
      label: { fr: "E-commerce & Réservation", en: "E-commerce & Booking", vi: "Thương mại điện tử & Đặt chỗ", ar: "تجارة إلكترونية وحجز", ru: "E-commerce и бронирование" }[currentLang],
      detail: { fr: "Catalogue, paiement sécurisé, gestion des stocks et parcours de réservation", en: "Catalog, secure payment, inventory management and booking flow", vi: "Danh mục sản phẩm, thanh toán bảo mật, quản lý kho và luồng đặt chỗ", ar: "كتالوج ودفع آمن وإدارة مخزون ومسار حجز", ru: "Каталог, безопасная оплата, складской учёт и модуль бронирования" }[currentLang],
    },
  }), [currentLang]);

  const brandingTiers = useMemo(() => ({
    starter: {
      price: 179,
      label: { fr: "Logo Signature", en: "Signature Logo", vi: "Logo Đặc trưng", ar: "شعار توقيع مميز", ru: "Фирменный логотип" }[currentLang],
      detail: { fr: "Logo, déclinaisons essentielles et fichiers maîtres", en: "Logo, essential variations and master files", vi: "Logo, các phiên bản cơ bản và tệp gốc", ar: "الشعار والنسخ الأساسية والملفات المصدرية", ru: "Логотип, базовые версии и исходные файлы" }[currentLang],
    },
    premium: {
      price: 349,
      label: { fr: "Full Brand Suite", en: "Full Brand Suite", vi: "Bộ nhận diện toàn diện", ar: "هوية بصرية شاملة", ru: "Полный брендинг" }[currentLang],
      detail: { fr: "Système de marque étendu, direction artistique et Brand Book", en: "Extended brand system, art direction and Brand Book", vi: "Hệ thống thương hiệu mở rộng, định hướng nghệ thuật và Brand Book", ar: "نظام علامة تجارية موسع وتوجيه فني ودليل الهوية", ru: "Расширенная бренд-система, арт-дирекшн и брендбук" }[currentLang],
    },
  }), [currentLang]);

  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [sectorId, setSectorId] = useState("");
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [goal, setGoal] = useState("");
  const [situation, setSituation] = useState("");
  const [budget, setBudget] = useState("");
  const [discovery, setDiscovery] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [client, setClient] = useState({ company: "", name: "", email: "", whatsapp: "", website: "" });
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [paying, setPaying] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    setIsTyping(true);
    const timer = window.setTimeout(() => setIsTyping(false), 380);
    return () => window.clearTimeout(timer);
  }, [step]);
  const sector = SECTORS.find((x) => x.id === sectorId);
  const situationChoice = SITUATIONS.find((x) => x.id === situation);
  const budgetChoice = BUDGETS.find((x) => x.id === budget);
  const discoveryChoice = DISCOVERY.find((x) => x.id === discovery);
  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other)
    .map((id) => SERVICES.find((x) => x.id === id))
    .filter(Boolean) as Choice[];

  const profileRecommendation = useMemo(() => {
    const base = PROFILE_SERVICE_RULES[sectorId] ?? PROFILE_SERVICE_RULES.other;
    const services = new Set<string>(base);

    // The budget changes the scope, not just the displayed price.
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

    const order = SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other;
    return order.filter((id) => services.has(id)).slice(0, budget === "under500" ? 1 : budget === "500_1000" ? 2 : budget === "1000_2500" ? 3 : 4);
  }, [sectorId, budget, situation, discovery, goal]);

  const proposals = useMemo<Proposal[]>(() => {
    return orderedServices.map((service) => {
      let price = BASE_PRICES[service.id];
      let label = service.label;
      let detail = service.detail;
      if (service.id === "maps") {
        price = 990;
        label = "Google Maps Top 3";
        detail = {
          fr: "SUR MESURE · à partir de 990 € / an · selon positionnement, zone, concurrence et mots-clés",
          en: "BESPOKE · from €990 / year · based on ranking, area, competition and keywords",
          vi: "THEO YÊU CẦU · từ 990 € / năm · tùy vị trí, khu vực, đối thủ và từ khóa",
          ar: "مخصص · ابتداءً من 990 € سنويًا · وفق الترتيب والمنطقة والمنافسة والكلمات المفتاحية",
          ru: "ПОД ЗАКАЗ · от 990 € в год · в зависимости от позиций, района, конкуренции и запросов",
        }[currentLang];
      }
      if (service.id === "website") {
        if (situation === "selling") {
          price = websiteTiers.ecommerce.price; label = websiteTiers.ecommerce.label; detail = websiteTiers.ecommerce.detail;
        } else if (budget === "1000_2500" || budget === "2500_5000" || budget === "5000_plus" || situation === "redesign") {
          price = websiteTiers.business.price; label = websiteTiers.business.label; detail = websiteTiers.business.detail;
        } else {
          price = websiteTiers.showcase.price; label = websiteTiers.showcase.label; detail = websiteTiers.showcase.detail;
        }
      }
      if (service.id === "branding" && (budget === "2500_5000" || budget === "5000_plus" || sectorId === "realestate")) {
        price = brandingTiers.premium.price; label = brandingTiers.premium.label; detail = brandingTiers.premium.detail;
      }
      return { id: service.id, label, detail, price, period: service.id === "seo" || service.id === "social" || service.id === "maintenance" ? "month" : "once", custom: service.id === "maps" };
    });
  }, [orderedServices, situation, budget, sectorId, currentLang, websiteTiers, brandingTiers]);

  const recommendedIds = profileRecommendation;
  const activeRecommended = recommendedIds.filter((id) => proposals.some((p) => p.id === id));
  useEffect(() => {
    if (step === 4 && selectedServices.length === 0 && activeRecommended.length) {
      setSelectedServices(activeRecommended);
    }
  }, [step, activeRecommended.join(",")]);
  const total = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.price ?? 0)); }, 0);
  const monthly = selectedServices.reduce((sum, id) => { const p = proposals.find((x) => x.id === id); return sum + (p?.custom ? 0 : (p?.period === "month" ? p.price : 0)); }, 0);
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
      const date = (d: Date) => d.toLocaleDateString(currentLang === "fr" ? "fr-FR" : currentLang === "vi" ? "vi-VN" : currentLang === "ru" ? "ru-RU" : currentLang === "ar" ? "ar-SA" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

      const pdfLabels = {
        fr: { devis: "DEVIS", subtitle: "STUDIO DIGITAL · STRATÉGIE · DESIGN · CROISSANCE", client: "Client", company: "Entreprise", contact: "Contact", email: "E-mail", whatsapp: "WhatsApp", website: "Site", project: "Projet", activity: "Activité", priority: "Priorité", situation: "Situation", budget: "Budget", acquisition: "Acquisition", services: "Prestations sélectionnées", colService: "PRESTATION", colMode: "MODE", colAmount: "MONTANT", frame: "Cadre du devis", validity: "Validité", validText: "15 jours · jusqu’au ", start: "Démarrage", startText: "Après validation du devis et réception des éléments nécessaires au projet.", nature: "Nature", natureText: "Pré-devis généré automatiquement à partir de votre configuration XR Quote Studio.", validation: "Validation client", valText1: "Ce document récapitule les prestations sélectionnées et leur modèle de facturation.", valText2: "Le périmètre définitif est confirmé avec XRAGENCY avant engagement.", dateSig: "Date / signature", nameQuality: "Nom / qualité", totalOnce: "TOTAL PONCTUEL", totalMonth: "TOTAL MENSUEL", recurring: "RÉCURRENT", custom: "SUR MESURE", once: "PONCTUEL", onQuote: "Sur devis" },
        en: { devis: "QUOTATION", subtitle: "DIGITAL STUDIO · STRATEGY · DESIGN · GROWTH", client: "Client", company: "Company", contact: "Contact", email: "Email", whatsapp: "WhatsApp", website: "Website", project: "Project", activity: "Industry", priority: "Priority", situation: "Situation", budget: "Budget", acquisition: "Acquisition", services: "Selected Services", colService: "SERVICE", colMode: "MODE", colAmount: "AMOUNT", frame: "Quote Terms", validity: "Validity", validText: "15 days · until ", start: "Kickoff", startText: "Upon quote sign-off and reception of necessary project assets.", nature: "Nature", natureText: "Automated estimate generated from your XR Quote Studio configuration.", validation: "Client Approval", valText1: "This document outlines selected services and their billing model.", valText2: "Definitive scope is verified with XRAGENCY prior to kickoff.", dateSig: "Date / signature", nameQuality: "Name / title", totalOnce: "ONE-TIME TOTAL", totalMonth: "MONTHLY TOTAL", recurring: "RECURRING", custom: "CUSTOM", once: "ONE-TIME", onQuote: "Custom quote" },
        vi: { devis: "BÁO GIÁ", subtitle: "STUDIO KỸ THUẬT SỐ · CHIẾN LƯỢC · THIẾT KẾ · TĂNG TRƯỞNG", client: "Khách hàng", company: "Công ty", contact: "Người liên hệ", email: "Email", whatsapp: "WhatsApp", website: "Website", project: "Dự án", activity: "Lĩnh vực", priority: "Ưu tiên", situation: "Tình trạng", budget: "Ngân sách", acquisition: "Kênh tiếp cận", services: "Dịch vụ đã chọn", colService: "DỊCH VỤ", colMode: "HÌNH THỨC", colAmount: "SỐ TIỀN", frame: "Điều khoản báo giá", validity: "Hiệu lực", validText: "15 ngày · đến ngày ", start: "Khởi động", startText: "Sau khi xác nhận báo giá và nhận đủ tư liệu dự án.", nature: "Phân loại", natureText: "Báo giá ước tính tự động từ XR Quote Studio.", validation: "Xác nhận của khách hàng", valText1: "Tài liệu này tổng hợp các dịch vụ đã chọn và mô hình thanh toán.", valText2: "Phạm vi chính thức sẽ được XRAGENCY thống nhất trước khi triển khai.", dateSig: "Ngày / Chữ ký", nameQuality: "Họ tên / Chức vụ", totalOnce: "TỔNG MỘT LẦN", totalMonth: "TỔNG HÀNG THÁNG", recurring: "ĐỊNH KỲ", custom: "THEO YÊU CẦU", once: "MỘT LẦN", onQuote: "Theo báo giá" },
        ar: { devis: "عرض سعر", subtitle: "استوديو رقمي · استراتيجية · تصميم · نمو", client: "العميل", company: "الشركة", contact: "جهة الاتصال", email: "البريد الإلكتروني", whatsapp: "واتساب", website: "الموقع الإلكتروني", project: "المشروع", activity: "النشاط", priority: "الأولوية", situation: "الوضع الحالي", budget: "الميزانية", acquisition: "الاستقطاب", services: "الخدمات المختارة", colService: "الخدمة", colMode: "النوع", colAmount: "المبلغ", frame: "شروط العرض", validity: "الصلاحية", validText: "15 يومًا · حتى ", start: "البدء", startText: "بعد اعتماد العرض واستلام متطلبات المشروع.", nature: "طبيعة الوثيقة", natureText: "عرض تقديري تم توليده تلقائيًا عبر XR Quote Studio.", validation: "اعتماد العميل", valText1: "توضح هذه الوثيقة الخدمات المختارة ونموذج الفوترة.", valText2: "يتم تأكيد النطاق النهائي رسميًا مع XRAGENCY قبل البدء.", dateSig: "التاريخ / التوقيع", nameQuality: "الاسم / الصفة", totalOnce: "إجمالي الدفعة الواحدة", totalMonth: "الإجمالي الشهري", recurring: "متكرر", custom: "مخصص", once: "دفعة واحدة", onQuote: "حسب العرض" },
        ru: { devis: "СМЕТА", subtitle: "ЦИФРОВАЯ СТУДИЯ · СТРАТЕГИЯ · ДИЗАЙН · РОСТ", client: "Клиент", company: "Компания", contact: "Контактное лицо", email: "Email", whatsapp: "WhatsApp", website: "Веб-сайт", project: "Проект", activity: "Сфера", priority: "Приоритет", situation: "Ситуация", budget: "Бюджет", acquisition: "Канал клиентов", services: "Выбранные услуги", colService: "УСЛУГА", colMode: "ФОРМАТ", colAmount: "СТОИМОСТЬ", frame: "Условия сметы", validity: "Срок действия", validText: "15 дней · до ", start: "Старт", startText: "После согласования сметы и получения исходных материалов.", nature: "Статус", natureText: "Предварительная смета, сформированная в XR Quote Studio.", validation: "Согласование клиентом", valText1: "Документ содержит выбранные услуги и модель оплаты.", valText2: "Окончательный состав работ подтверждается XRAGENCY до старта.", dateSig: "Дата / подпись", nameQuality: "Имя / должность", totalOnce: "ИТОГО ЕДИНОВРЕМЕННО", totalMonth: "ИТОГО ЕЖЕМЕСЯЧНО", recurring: "ЕЖЕМЕСЯЧНО", custom: "ПО ЗАПРОСУ", once: "ЕДИНОВРЕМЕННО", onQuote: "По запросу" },
      }[currentLang] ?? { devis: "DEVIS", subtitle: "STUDIO DIGITAL · STRATÉGIE · DESIGN · CROISSANCE", client: "Client", company: "Entreprise", contact: "Contact", email: "E-mail", whatsapp: "WhatsApp", website: "Site", project: "Projet", activity: "Activité", priority: "Priorité", situation: "Situation", budget: "Budget", acquisition: "Acquisition", services: "Prestations sélectionnées", colService: "PRESTATION", colMode: "MODE", colAmount: "MONTANT", frame: "Cadre du devis", validity: "Validité", validText: "15 jours · jusqu’au ", start: "Démarrage", startText: "Après validation du devis et réception des éléments nécessaires au projet.", nature: "Nature", natureText: "Pré-devis généré automatiquement à partir de votre configuration XR Quote Studio.", validation: "Validation client", valText1: "Ce document récapitule les prestations sélectionnées et leur modèle de facturation.", valText2: "Le périmètre définitif est confirmé avec XRAGENCY avant engagement.", dateSig: "Date / signature", nameQuality: "Nom / qualité", totalOnce: "TOTAL PONCTUEL", totalMonth: "TOTAL MENSUEL", recurring: "RÉCURRENT", custom: "SUR MESURE", once: "PONCTUEL", onQuote: "Sur devis" };

      const section = (label: string, y: number) => {
        doc.setFillColor(...soft);
        doc.roundedRect(M, y - 4, W - M * 2, 8, 1.5, 1.5, "F");
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.text(label.toUpperCase(), M + 3, y + 1);
        return y + 12;
      };

      const infoRow = (label: string, value: string, y: number, x = M, maxWidth = 150) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.7);
        doc.setTextColor(...muted);
        doc.text(label, x, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...ink);
        const lines = doc.splitTextToSize(value || "—", maxWidth);
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
      doc.text(pdfLabels.subtitle, M, 21);
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(pdfLabels.devis, R - M, 13, { align: "right" });
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
      doc.text(pdfLabels.colService, M + 3, y + 1);
      doc.text(pdfLabels.colMode, 124, y + 1);
      doc.text(pdfLabels.colAmount, R - 3, y + 1, { align: "right" });
      y += 10;

      selectedServices.forEach((id) => {
        const p = proposals.find((x) => x.id === id);
        if (!p) return;
        const detail = p.id === "robotics"
          ? (currentLang === "en" ? "Service robot rental from €499/mo · purchase options · event from €250." : "Location robot de service dès 499 € / mois · achat selon modèle · événement dès 250 €.")
          : p.detail;
        if (y > 255) {
          doc.addPage();
          y = 22;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.4);
        doc.setTextColor(...ink);
        doc.text(p.label, M + 3, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(5.9);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(detail, 86).slice(0, 2), M + 3, y + 3.5);
        doc.setFontSize(6.4);
        doc.text(p.period === "month" ? pdfLabels.recurring : p.custom ? pdfLabels.custom : pdfLabels.once, 124, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.2);
        doc.setTextColor(...ink);
        doc.text(
          p.custom ? pdfLabels.onQuote : p.price.toLocaleString("fr-FR") + " €" + (p.period === "month" ? " / mois" : ""),
          R - 3,
          y,
          { align: "right" }
        );
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
      doc.text(pdfLabels.totalOnce, 114, y + 3);
      doc.text(pdfLabels.totalMonth, 114, y + 12);
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
      doc.text(pdfLabels.validation, M + 4, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.4);
      doc.setTextColor(...muted);
      doc.text(pdfLabels.valText1, M + 4, y + 11);
      doc.text(pdfLabels.valText2, M + 4, y + 16);
      doc.setDrawColor(...lineColor);
      doc.line(111, y + 8, 188, y + 8);
      doc.line(111, y + 21, 188, y + 21);
      doc.setFontSize(5.9);
      doc.text(pdfLabels.dateSig, 111, y + 6);
      doc.text(pdfLabels.nameQuality, 111, y + 19);

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
      doc.text("78 Avenue des Champs-Élysées · Bureau 562 · 75008 Paris · France", M, 296);
      doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 300);
      doc.setTextColor(...blue);
      doc.setFont("helvetica", "bold");
      doc.text(quoteNumber, R, 300, { align: "right" });

      doc.save("XRAGENCY-Devis-" + quoteNumber + ".pdf");
      setGenerated(true);
      setSendMessage(QUOTE_UI.pdfGeneratedSuccess[currentLang]);
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : QUOTE_UI.pdfError[currentLang]);
    } finally {
      setSending(false);
    }
  };

  const goToStep = (next: number) => {
    setStep(next);
    window.setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const choose = (setter: (value: string) => void, value: string, next: number) => {
    setter(value);
    goToStep(next);
  };
  const toggleService = (id: string) => setSelectedServices((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  useEffect(() => {
    if (step > 0) journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [step]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const normalized = requested === "ecommerce" ? "website" : requested;
    if (normalized && SERVICES.some((x) => x.id === normalized)) {
      if (requested === "ecommerce") setSituation("selling");
      setSelectedServices((current) => current.includes(normalized) ? current : [normalized]);
      setStep(4);
    }
  }, []);

  const createCheckout = async () => {
    if (!client.email || !selectedServices.length || paying) return;
    setPaying(true); setSendMessage("");
    try {
      const response = await fetch("/api/create-checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "checkout", sectorId, situation, budget, selectedServices, client }) });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || QUOTE_UI.paymentError[currentLang]);
      setCheckoutUrl(data.url); window.location.href = data.url;
    } catch (error) { setSendMessage(error instanceof Error ? error.message : QUOTE_UI.paymentError[currentLang]); } finally { setPaying(false); }
  };

  const reset = () => { setStep(0); setSectorId(""); setGoal(""); setSituation(""); setBudget(""); setDiscovery(""); setSelectedServices([]); setClient({ company: "", name: "", email: "", whatsapp: "", website: "" }); setGenerated(false); setSendMessage(""); };
  const quoteDownloadLabel = sending ? QUOTE_UI.generatingPdf[currentLang] : generated ? QUOTE_UI.downloadAgain[currentLang] : QUOTE_UI.downloadPdf[currentLang];
  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client.company || !client.name || !client.email || !client.whatsapp || sending) return;
    void generatePdf();
  };

  const recommendation = useMemo(() => {
    if (!sector || !discoveryChoice) return "";
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

    if (currentLang === "en") {
      return `For ${sector.label.toLowerCase()}, XR Quote Studio recommends ${budgetText}, prioritizing ${recServices}. Your focus on ${channel} reinforces this strategic direction.`;
    }
    if (currentLang === "vi") {
      return `Đối với ${sector.label.toLowerCase()}, XR Quote Studio khuyến nghị ${budgetText}, ưu tiên ${recServices}. Việc bạn chú trọng ${channel} càng củng cố định hướng này.`;
    }
    if (currentLang === "ar") {
      return `بالنسبة لـ ${sector.label}، يوصي XR Quote Studio بـ ${budgetText}، مع إعطاء الأولوية لـ ${recServices}. كما أن تركيزك على ${channel} يعزز هذه التوصية.`;
    }
    if (currentLang === "ru") {
      return `Для сферы «${sector.label.toLowerCase()}» XR Quote Studio рекомендует ${budgetText}, с приоритетом на ${recServices}. Выбор направления «${channel}» подтверждает этот подход.`;
    }
    return `Pour ${sector.label.toLowerCase()}, XR Quote Studio recommande ${budgetText}, en donnant la priorité à ${recServices}. Votre choix de ${channel} renforce cette recommandation.`;
  }, [sector, discoveryChoice, discovery, budget, activeRecommended, currentLang, SERVICES]);

  const titles = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => STEP_TITLES[i][currentLang]), [currentLang]);
  const subtitles = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => STEP_SUBTITLES[i][currentLang]), [currentLang]);
  const alexMessages = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ALEXANDRE_MESSAGES[i][currentLang]), [currentLang]);

  const progress = ((step + 1) / 8) * 100;
  const card = (item: Choice, onClick: () => void, selected = false, priceDelta?: string) => {
    const icons: Record<string, string> = {
      restaurant: "🍽️", hospitality: "🏨", realestate: "🏡", automotive: "🚘", fashion: "👜", jewelry: "💎", beauty: "✨", health: "🩺", architecture: "🏛️", construction: "🛠️", legal: "⚖️", finance: "📈", commerce: "🛍️", tourism: "✈️", agency: "🎨", other: "💡",
      website: "🖥️", branding: "🎨", seo: "🔎", maps: "📍", ads: "🚀", social: "💬", content: "🎬", conversion: "🧭", maintenance: "🛠️", robotics: "🤖",
      none: "🌱", existing: "🧩", redesign: "✨", outdated: "🕰️", invisible: "👀", selling: "🛒", international: "🌍", launch: "🚀",
      under500: "🌿", "500_1000": "🧱", "1000_2500": "🚀", "2500_5000": "💎", "5000_plus": "🏆",
      google: "🔍", referral: "🤝", mixed: "🌐",
    };
    return (
      <button
        key={item.id}
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={"choice-card group relative min-h-[140px] w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:min-h-[150px] sm:p-5 flex flex-col justify-between " + (selected ? "is-active border-emerald-500/50 bg-[var(--xr-accent-soft)] text-[var(--xr-ink)] shadow-[0_12px_32px_-12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/30" : "border-[var(--xr-line)] bg-[var(--xr-surface-strong)] text-[var(--xr-ink)] hover:border-[var(--xr-ink)]/40 hover:-translate-y-0.5")}
      >
        <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--xr-accent-soft)] blur-2xl transition-transform duration-500 group-hover:scale-150" />
        <div className="relative flex items-start justify-between gap-3 w-full">
          <span aria-hidden="true" className={"grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110 " + (selected ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-[var(--xr-accent-soft)]")}>{icons[item.id] ?? "✦"}</span>
          <div className="flex items-center gap-1.5">
            {priceDelta && (
              <span className={"rounded-full px-2.5 py-1 label-mono text-[7px] font-bold tracking-wider transition-all " + (selected ? "bg-emerald-500 text-white shadow-sm" : "border xr-line bg-[var(--xr-bg)] text-[var(--xr-ink)]")}>
                {priceDelta}
              </span>
            )}
            <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all " + (selected ? "border-emerald-500 bg-emerald-500 text-white" : "xr-line bg-[var(--xr-bg)] xr-muted-2 group-hover:border-[var(--xr-ink)]/50 group-hover:text-[var(--xr-ink)]")}>
              {selected ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
            </span>
          </div>
        </div>
        <div className="relative mt-3">
          <span className="block text-sm font-semibold leading-5 text-[var(--xr-ink)] sm:text-[15px]">{item.label}</span>
          <span className="mt-1.5 block text-[11px] leading-[1.55] xr-muted sm:text-xs">{item.detail}</span>
        </div>
        {selected && (
          <div className="relative mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="label-mono text-[7px] font-bold tracking-[.15em] text-emerald-600 dark:text-emerald-400">{QUOTE_UI.addedToProject[currentLang]}</span>
          </div>
        )}
      </button>
    );
  };

  const totalLabel = once > 0 && monthly > 0
    ? once.toLocaleString("fr-FR") + " € + " + monthly.toLocaleString("fr-FR") + " €" + QUOTE_UI.perMonth[currentLang]
    : once > 0
      ? once.toLocaleString("fr-FR") + " €"
      : monthly > 0
        ? monthly.toLocaleString("fr-FR") + " €" + QUOTE_UI.perMonth[currentLang]
        : QUOTE_UI.calculating[currentLang];

  const SystemStack = () => (
    <div className="relative overflow-hidden rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 shadow-[var(--xr-shadow)] sm:p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted-2">{QUOTE_UI.archTitle[currentLang]}</span>
          <p className="mt-1 text-xs font-semibold text-[var(--xr-ink)]">{QUOTE_UI.archSub[currentLang]}</p>
        </div>
        <span className="rounded-full border xr-line bg-[var(--xr-bg)] px-2.5 py-1 label-mono text-[6px] tracking-[.16em] xr-muted-2">{selectedServices.length} {QUOTE_UI.activeBricks[currentLang]}</span>
      </div>
      <div className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4 sm:col-span-1">
          <span className="label-mono text-[6px] xr-muted-2">CORE</span>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border xr-line bg-[var(--xr-ink)] text-[var(--xr-bg)] font-black tracking-[-.08em]">XR</div>
            <div><p className="text-[10px] font-semibold text-[var(--xr-ink)]">XRAGENCY</p><p className="mt-1 text-[7px] xr-muted-2">{QUOTE_UI.archTagline[currentLang]}</p></div>
          </div>
        </div>
        <div className="relative sm:col-span-2">
          <div aria-hidden className="absolute left-0 top-1/2 hidden h-px w-6 bg-white/10 sm:block" />
          <div className="grid gap-2 sm:grid-cols-2">
            {(selectedServices.length ? selectedServices : ["website", "seo", "social", "branding"]).slice(0,4).map((id, index) => {
              const service = SERVICES.find((x) => x.id === id);
              return (
                <div key={id} className="group rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--xr-ink)]/18 hover:bg-[var(--xr-accent-soft)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="label-mono text-[6px] xr-muted-2">0{index + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--xr-ink)]/50 transition group-hover:scale-150" />
                  </div>
                  <p className="mt-2 text-[9px] font-semibold text-[var(--xr-ink)]">{service?.label ?? id}</p>
                  <p className="mt-1 text-[7px] leading-4 xr-muted-2">{service?.detail ?? "Brique sur mesure du dispositif."}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-between border-t border-[var(--xr-line)] pt-3">
        <span className="label-mono text-[6px] tracking-[.14em] xr-muted-2">{QUOTE_UI.estimatedInvestment[currentLang]}</span>
        <span className="text-[9px] font-semibold text-[var(--xr-ink)]">{totalLabel}</span>
      </div>
    </div>
  );

  return (
    <section id="quote" className="xr-section-elevated relative overflow-hidden border-y xr-line bg-[#f3efe7] py-14 sm:py-20 lg:py-28 dark:bg-[#0d0f12]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,var(--xr-accent-soft),transparent_26%),radial-gradient(circle_at_82%_78%,rgba(120,120,140,.08),transparent_24%)]"/>
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.025}><Reveal><div className="grid gap-7 border-b xr-line pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="min-w-0">
            <span className="label-mono xr-accent text-[8px] tracking-[.22em] sm:tracking-[.28em]">{QUOTE_UI.kicker[currentLang]}</span>
            <h2 className="display-serif mt-4 max-w-5xl break-words text-balance text-[clamp(2.35rem,5.2vw,5.6rem)] leading-[.98] tracking-[-.045em] sm:mt-5">{QUOTE_UI.title1[currentLang]} <em className="not-italic opacity-55">{QUOTE_UI.titleAccent[currentLang]}</em>{QUOTE_UI.title2[currentLang]}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 xr-muted sm:text-base">{QUOTE_UI.lead[currentLang]}</p>
          </div>
          <div className="relative overflow-hidden rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 shadow-[var(--xr-shadow)] sm:p-5">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[var(--xr-accent-soft)] blur-3xl" />
            <div className="relative flex items-center gap-3.5">
              <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#1c2430] to-[#0c0e12] border border-white/10 text-white shadow-xl">
                <span className="font-serif text-lg font-bold tracking-tight text-white/95">AX</span>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--xr-surface)] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold tracking-tight text-[var(--xr-ink)]">Alexandre</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 label-mono text-[6px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{QUOTE_UI.online[currentLang]}</span>
                </div>
                <p className="mt-0.5 label-mono text-[7px] tracking-[.12em] xr-muted-2 truncate">{QUOTE_UI.advisorRole[currentLang]}</p>
              </div>
              <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-2.5 py-1 label-mono text-[6px] font-semibold text-[var(--xr-ink)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {QUOTE_UI.advisorLiveBadge[currentLang]}
              </span>
            </div>
            <div aria-live="polite" className="relative mt-4 rounded-2xl rounded-tl-sm border xr-line bg-[var(--xr-surface-strong)] p-4 shadow-sm min-h-[96px] flex flex-col justify-between">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 label-mono text-[6px] tracking-[.16em] xr-muted-2">
                  <MessageCircle className="h-3 w-3 text-[var(--xr-accent)]" /> {QUOTE_UI.alexMsg[currentLang]}
                </span>
                {isTyping && (
                  <span className="inline-flex items-center gap-1 label-mono text-[6px] text-emerald-600 dark:text-emerald-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
              <div className={"transition-opacity duration-300 " + (isTyping ? "opacity-35" : "opacity-100")}>
                <p className="text-[11px] leading-relaxed text-[var(--xr-ink)] sm:text-xs font-medium">
                  {alexMessages[step]}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--xr-line)]/50 pt-2" aria-hidden="true">
                <div className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-[var(--xr-ink)]/60 animate-pulse" />
                  <span className="h-1 w-1 rounded-full bg-[var(--xr-ink)]/40 animate-pulse [animation-delay:150ms]" />
                  <span className="h-1 w-1 rounded-full bg-[var(--xr-ink)]/20 animate-pulse [animation-delay:300ms]" />
                  <span className="ml-1.5 label-mono text-[6px] xr-muted-2">{QUOTE_UI.personalizedSupport[currentLang]}</span>
                </div>
                <span className="label-mono text-[6px] xr-muted-2 tracking-wider">PARIS 8E</span>
              </div>
            </div>
            <div className="relative mt-4 flex items-end justify-between gap-3 border-t xr-line pt-3">
              <div><span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">{QUOTE_UI.liveEstimate[currentLang]}</span><p className="mt-1 display-serif text-2xl text-[var(--xr-ink)] sm:text-3xl">{totalLabel}</p></div>
              <span className="shrink-0 rounded-full border xr-line px-3 py-1.5 label-mono text-[6px] xr-muted-2">{String(step+1).padStart(2,"0")} / 08 {QUOTE_UI.stepCount[currentLang]}</span>
            </div>
          </div>
        </div></Reveal></Parallax>
        <div className="mt-6 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2 rounded-xl border xr-line bg-[var(--xr-surface)] p-2 shadow-[var(--xr-shadow)]">
            {titles.map((title, index) => (
              <button
                key={title + index}
                type="button"
                onClick={() => index <= step && setStep(index)}
                className={"group flex min-w-[145px] items-center gap-3 rounded-xl px-3 py-3 text-left transition " + (index === step ? "bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-lg" : index < step ? "bg-[var(--xr-accent-soft)]" : "opacity-45")}
              >
                <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[8px] font-semibold " + (index === step ? "border-white/15 bg-white/10" : "xr-line")}>
                  {index < step ? <Check className="h-3 w-3" /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className={"label-mono block text-[5px] tracking-[.16em] " + (index === step ? "text-white/55" : "xr-muted-2")}>{QUOTE_UI.stepWord[currentLang]} {String(index + 1).padStart(2, "0")}</span>
                  <span className={"mt-1 block truncate text-[9px] font-semibold " + (index === step ? "text-white" : "text-[var(--xr-ink)]")}>{title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div ref={journeyRef} className="mt-8 grid gap-5 lg:grid-cols-[.25fr_1.75fr]">
          <Reveal><aside className="xr-panel rounded-[2rem] p-3 lg:sticky lg:top-28 lg:h-fit">
            <div className="px-3 pb-3 pt-2"><div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.yourJourney[currentLang]}</span><span className="label-mono text-[6px] xr-muted-2">{String(step+1).padStart(2,"0")} / 08</span></div><div className="mt-3 h-1 rounded-full bg-current opacity-10"><div className="h-full rounded-full bg-[var(--xr-accent)] transition-all duration-500" style={{width:progress+"%"}}/></div></div>
            <div className="hidden gap-1 lg:grid">{titles.map((title,index)=><div key={title + index} className={"rounded-xl px-3 py-3 "+(index===step?"bg-[var(--xr-accent-soft)]":"opacity-45")}><div className="flex items-center gap-2"><span className="label-mono text-[6px] xr-muted-2">{String(index+1).padStart(2,"0")}</span><span className="truncate text-[8px] font-semibold">{title}</span></div></div>)}</div>
            <div className="mt-2 rounded-xl border xr-line bg-[var(--xr-surface)] p-3"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.system[currentLang]}</span><p className="mt-1 text-[9px] font-semibold">{selectedServices.length} {QUOTE_UI.activeBricks[currentLang]}</p><p className="mt-1 text-[7px] xr-muted">{totalLabel}</p></div>
          </aside></Reveal>
          <Reveal delay={70}><div className="xr-depth-card rounded-[1.15rem] border xr-line bg-[var(--xr-surface)] p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3 border-b xr-line pb-5"><div className="min-w-0"><span className="inline-flex items-center gap-2 rounded-full border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-[var(--xr-ink)]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--xr-ink)]"/>{step===7 ? QUOTE_UI.lastStretch[currentLang] : QUOTE_UI.stepWord[currentLang] + " " + String(step+1).padStart(2,"0") + " / 08"}</span><h3 className="mt-3 max-w-3xl break-words text-balance text-2xl font-semibold leading-[1.12] tracking-[-.03em] sm:text-3xl">{titles[step]}</h3><p className="mt-2 text-xs leading-5 xr-muted sm:text-sm">{subtitles[step]}</p></div>{step>0&&<button type="button" onClick={()=>goToStep(step-1)} className="shrink-0 rounded-full border xr-line px-4 py-2 text-xs font-semibold transition hover:bg-[var(--xr-accent-soft)]">{QUOTE_UI.back[currentLang]}</button>}</div>
            <div className="mt-7">
              {step===0&&<div className="space-y-4"><div className="rounded-[1.15rem] border xr-line bg-[var(--xr-surface-strong)] p-5"><span className="label-mono text-[6px] xr-accent">{QUOTE_UI.activityBadge[currentLang]}</span><p className="mt-2 text-sm xr-muted">{QUOTE_UI.activityIntro[currentLang]}</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{(showAllSectors?SECTORS:SECTORS.slice(0,6)).map((x,i)=><button key={x.id} type="button" aria-label={QUOTE_UI.stepWord[currentLang] + " " + x.label} onClick={()=>{setSectorId(x.id);goToStep(1)}} className="choice-card xr-depth-card group min-h-[140px] rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-4 text-left transition hover:border-[var(--xr-ink)]/50 hover:bg-[var(--xr-accent-soft)] sm:min-h-[155px] sm:p-5"><span className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--xr-accent-soft)] text-xl transition group-hover:scale-110">{({"restaurant":"🍽️","hospitality":"🏨","realestate":"🏡","automotive":"🚘","fashion":"👜","jewelry":"💎","beauty":"✨","health":"🩺","architecture":"🏛️","construction":"🛠️","legal":"⚖️","finance":"📈","commerce":"🛍️","tourism":"✈️","agency":"🎨","other":"💡"} as Record<string,string>)[x.id]||"✦"}</span><span className="label-mono text-[7px] xr-muted-2">{String(i+1).padStart(2,"0")}</span></span><span className="mt-4 block text-xs font-semibold leading-5 sm:text-sm">{x.label}</span><span className="mt-1.5 block text-[10px] leading-4 xr-muted">{x.detail}</span></button>)}</div><button type="button" onClick={()=>setShowAllSectors(v=>!v)} className="w-full rounded-full border xr-line py-3 label-mono text-[7px] xr-muted">{showAllSectors ? QUOTE_UI.collapseSectors[currentLang] : QUOTE_UI.seeAllSectors[currentLang]}</button></div>}
              {step===1&&sector&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.activityBadge[currentLang]}</span><p className="mt-2 text-xl font-semibold">{sector.label}</p><p className="mt-1 text-[9px] leading-4 xr-muted">{sector.detail}</p></div><div className="grid gap-2 sm:grid-cols-3">{sector.goals.map(x=>card({id:x,label:x,detail:currentLang === "en" ? "Tailored priority for your sector" : currentLang === "vi" ? "Ưu tiên phù hợp với ngành của bạn" : currentLang === "ar" ? "أولوية مناسبة لمجالك" : currentLang === "ru" ? "Приоритетная задача для вашей сферы" : "Priorité adaptée à votre secteur"},()=>choose(setGoal,x,2)))}</div></div>}
              {step===2&&<div className="grid gap-2 sm:grid-cols-2">{SITUATIONS.map(x=>card(x,()=>choose(setSituation,x.id,3),x.id===situation))}</div>}
              {step===3&&<div className="grid gap-2 sm:grid-cols-3">{BUDGETS.map(x=>card(x,()=>{setBudget(x.id);setSelectedServices([]);window.setTimeout(()=>setStep(4),180)},x.id===budget))}</div>}
              {step===4&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-accent-soft)] p-5"><span className="label-mono text-[6px] xr-accent">{QUOTE_UI.preparedSelection[currentLang]}</span><p className="mt-2 text-sm font-semibold">{QUOTE_UI.preparedTitle[currentLang]}</p><p className="mt-2 text-[9px] leading-4 xr-muted">{QUOTE_UI.preparedDetail[currentLang]}</p></div><div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{orderedServices.map(x=>{const p = proposals.find(item => item.id === x.id); const deltaTag = p ? p.custom ? QUOTE_UI.onQuote[currentLang] : p.period === "month" ? `${p.price.toLocaleString("fr-FR")} €${QUOTE_UI.perMonth[currentLang]}` : p.id === "maps" ? `990 €${QUOTE_UI.perYear[currentLang]}` : `+${p.price.toLocaleString("fr-FR")} €` : undefined; return card(x,()=>toggleService(x.id),selectedServices.includes(x.id), deltaTag);})}</div><button type="button" disabled={!selectedServices.length} onClick={()=>goToStep(5)} className="w-full rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)] hover:opacity-90 transition disabled:opacity-30">{QUOTE_UI.continue[currentLang]}</button></div>}
              {step===5&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.acquisitionBadge[currentLang]}</span><p className="mt-2 text-lg font-semibold">{QUOTE_UI.acquisitionTitle[currentLang]}</p></div><div className="grid gap-2 sm:grid-cols-2">{DISCOVERY.map(x=>card(x,()=>choose(setDiscovery,x.id,6),x.id===discovery))}</div></div>}
              {step===6&&sector&&<div className="space-y-5"><div className="rounded-[1.15rem] border xr-line bg-[var(--xr-accent-soft)] p-6"><span className="label-mono text-[6px] xr-accent">{QUOTE_UI.recommendationBadge[currentLang]}</span><p className="mt-3 max-w-3xl text-lg leading-7 sm:text-2xl">{recommendation}</p></div><div className="grid gap-2 sm:grid-cols-2">{selectedServices.map(id=>{const p=proposals.find(x=>x.id===id);return p?<div key={id} className="flex items-start justify-between gap-4 rounded-2xl border xr-line bg-[var(--xr-surface)] p-4"><div><p className="text-[10px] font-semibold">{p.label}</p><p className="mt-1 text-[8px] leading-4 xr-muted">{p.detail}</p></div><span className="shrink-0 text-[9px] font-semibold">{p.custom ? QUOTE_UI.onQuote[currentLang] : p.price.toLocaleString("fr-FR")+" €"+(p.period==="month" ? QUOTE_UI.perMonth[currentLang] : "")}</span></div>:null})}</div><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-2xl border xr-line p-5"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.oneOff[currentLang]}</span><p className="mt-1 text-3xl font-semibold">{once.toLocaleString("fr-FR")} €</p></div><div className="rounded-2xl border xr-line p-5"><span className="label-mono text-[6px] xr-muted-2">{QUOTE_UI.monthly[currentLang]}</span><p className="mt-1 text-3xl font-semibold">{monthly.toLocaleString("fr-FR")} €<span className="text-sm xr-muted">{QUOTE_UI.perMonth[currentLang]}</span></p></div></div><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={()=>goToStep(7)} className="rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)]">{QUOTE_UI.getQuotePdf[currentLang]}</button><a href={"https://wa.me/33767566783?text="+encodeURIComponent(currentLang === "en" ? `Hello XR Agency, I have completed my XR Quote Studio setup.\n• Industry: ${sector?.label}\n• Budget: ${budgetChoice?.label}\n• Services: ${selectedServices.map(id => proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")}\n• Total: ${totalLabel}` : currentLang === "vi" ? `Xin chào XR Agency, tôi đã hoàn thành cấu hình XR Quote Studio.\n• Ngành nghề: ${sector?.label}\n• Ngân sách: ${budgetChoice?.label}\n• Dịch vụ: ${selectedServices.map(id => proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")}\n• Tổng cộng: ${totalLabel}` : currentLang === "ar" ? `مرحبًا XR Agency، لقد أكملت تكوين XR Quote Studio.\n• القطاع: ${sector?.label}\n• الميزانية: ${budgetChoice?.label}\n• الخدمات: ${selectedServices.map(id => proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")}\n• الإجمالي: ${totalLabel}` : currentLang === "ru" ? `Здравствуйте, XR Agency! Я завершил расчёт в XR Quote Studio.\n• Сфера: ${sector?.label}\n• Бюджет: ${budgetChoice?.label}\n• Услуги: ${selectedServices.map(id => proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")}\n• Итого: ${totalLabel}` : `Bonjour XR Agency, j'ai terminé mon diagnostic XR Quote Studio. Secteur : ${sector?.label}. Budget : ${budgetChoice?.label}. Prestations : ${selectedServices.map(id=>proposals.find(p=>p.id===id)?.label).filter(Boolean).join(", ")}. Total : ${totalLabel}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-5 py-4 label-mono text-[8px] xr-muted">{QUOTE_UI.continueWhatsApp[currentLang]} <ArrowRight className="h-3.5 w-3.5"/></a></div></div>}
              {step===7&&<div className="space-y-4"><div className="rounded-2xl border xr-line bg-[var(--xr-accent-soft)] p-5"><span className="label-mono text-[6px] xr-accent">{QUOTE_UI.finalizationBadge[currentLang]}</span><p className="mt-2 text-lg font-semibold">{QUOTE_UI.finalizationTitle[currentLang]}</p><p className="mt-1 text-[9px] leading-4 xr-muted">{QUOTE_UI.finalizationDetail[currentLang]}</p></div><form onSubmit={handleQuoteSubmit} className="space-y-3"><div className="grid gap-3 sm:grid-cols-2"><input value={client.company} onChange={e=>setClient({...client,company:e.target.value})} placeholder={QUOTE_UI.formCompany[currentLang]} autoComplete="organization" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder={QUOTE_UI.formName[currentLang]} autoComplete="name" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.email} onChange={e=>setClient({...client,email:e.target.value})} type="email" placeholder={QUOTE_UI.formEmail[currentLang]} autoComplete="email" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/><input value={client.whatsapp} onChange={e=>setClient({...client,whatsapp:e.target.value})} type="tel" placeholder={QUOTE_UI.formPhone[currentLang]} autoComplete="tel" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none" required/></div><input value={client.website} onChange={e=>setClient({...client,website:e.target.value})} type="url" placeholder={QUOTE_UI.formWebsite[currentLang]} autoComplete="url" className="w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3.5 text-sm outline-none"/><div className="grid gap-3 sm:grid-cols-2 pt-2"><button type="submit" disabled={!client.company||!client.name||!client.email||!client.whatsapp||sending} className="w-full rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)] disabled:opacity-30">{quoteDownloadLabel}</button><button type="button" onClick={createCheckout} disabled={!client.company||!client.name||!client.email||!client.whatsapp||paying} className="w-full rounded-full border border-[var(--xr-ink)]/50 bg-[var(--xr-accent-soft)] px-5 py-4 label-mono text-[8px] font-bold text-[var(--xr-ink)] hover:bg-[var(--xr-ink)] hover:text-[var(--xr-bg)] transition disabled:opacity-30">{paying ? QUOTE_UI.preparingPayment[currentLang] : QUOTE_UI.payDeposit[currentLang]}</button></div></form>{generated&&<div className="rounded-2xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] p-4 text-sm text-center">{QUOTE_UI.pdfSuccess[currentLang]}</div>}{sendMessage&&<div aria-live="polite" className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3 text-center text-[9px] xr-muted">{sendMessage}</div>}<button type="button" onClick={reset} className="mx-auto flex items-center gap-2 label-mono text-[7px] xr-muted-2"><span>↺</span> {QUOTE_UI.restart[currentLang]}</button></div>}
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}