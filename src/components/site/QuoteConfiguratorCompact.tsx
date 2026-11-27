import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Download,
  Gem,
  Globe,
  Hotel,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  Wrench,
} from "lucide-react";
import { useLang, type L, type Lang } from "@/lib/i18n";
import { useOptionalFunnel } from "@/lib/funnel";
import { useCart } from "@/hooks/useCart";
import { CONTACT } from "@/lib/content";
import { SOCIAL_MEDIA_PLANS, getCommitmentLabel, getPeriodShortLabel } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

type ServiceKey = "websites" | "seo" | "maps" | "social" | "branding" | "maintenance" | "ai" | "crm";

type PlanOption = {
  id: string;
  label: L;
  detail: L;
  priceEur: number;
  period: "once" | "month" | "year";
  commitmentMonths?: number;
  customQuote?: boolean;
  popular?: boolean;
};

type ServiceCatalogGroup = {
  id: ServiceKey;
  Icon: typeof Globe;
  title: L;
  short: L;
  plans: PlanOption[];
};

const CATALOG_GROUPS: ServiceCatalogGroup[] = [
  {
    id: "websites",
    Icon: Globe,
    title: l(
      "Création de site web",
      "Website Design",
      "Thiết kế Website",
      "تصميم موقع إلكتروني",
      "Создание сайта",
    ),
    short: l(
      "Vitrine, Business ou E-commerce",
      "Showcase, Business or E-commerce",
      "Giới thiệu, Doanh nghiệp, E-commerce",
      "تعريفي، أعمال أو متجر إلكتروني",
      "Визитка, бизнес или магазин",
    ),
    plans: [
      {
        id: "website_showcase",
        label: l(
          "Site Vitrine Pro",
          "Pro Showcase Website",
          "Website Giới thiệu Pro",
          "موقع تعريفي احترافي",
          "Сайт-визитка Pro",
        ),
        detail: l(
          "Jusqu'à 3 pages, responsive mobile-first, contact & SEO de base.",
          "Up to 3 pages, mobile-first responsive, contact & core SEO.",
          "Tối đa 3 trang, tối ưu di động & SEO cơ bản.",
          "حتى 3 صفحات متجاوبة مع تواصل وSEO أساسي.",
          "До 3 страниц, адаптив, форма и базовое SEO.",
        ),
        priceEur: 499,
        period: "once",
      },
      {
        id: "website_business",
        label: l(
          "Site Business Sur-Mesure",
          "Bespoke Business Website",
          "Website Doanh nghiệp",
          "موقع أعمال مخصص",
          "Бизнес-сайт под ключ",
        ),
        detail: l(
          "Jusqu'à 5 pages, architecture conversion, blog/galerie & analytics.",
          "Up to 5 pages, conversion UX, blog/gallery & analytics.",
          "Tối đa 5 trang, tối ưu chuyển đổi, blog & phân tích.",
          "حتى 5 صفحات، تجربة تحويل، مدونة وتحليلات.",
          "До 5 страниц, акцент на конверсию и аналитика.",
        ),
        priceEur: 799,
        period: "once",
        popular: true,
      },
      {
        id: "website_ecommerce",
        label: l(
          "Site E-Commerce & Réservation",
          "E-Commerce & Booking Site",
          "Website E-Commerce & Đặt chỗ",
          "متجر إلكتروني ونظام حجز",
          "Интернет-магазин и бронирование",
        ),
        detail: l(
          "Catalogue produits ou réservation, tunnel d'achat et gestion complète.",
          "Product catalogue or booking flow, streamlined checkout & management.",
          "Danh mục sản phẩm hoặc đặt chỗ, thanh toán mượt mà.",
          "كتالوج منتجات أو حجز ومسار شراء متكامل.",
          "Каталог или бронирование, корзина и управление.",
        ),
        priceEur: 1499,
        period: "once",
      },
    ],
  },
  {
    id: "seo",
    Icon: Search,
    title: l("SEO Google", "Google SEO", "SEO Google", "تحسين محركات البحث SEO", "SEO Google"),
    short: l(
      "Référencement naturel durable",
      "Sustainable organic search",
      "Tăng trưởng tìm kiếm tự nhiên",
      "ظهور عضوي مستدام على Google",
      "Устойчивое органическое SEO",
    ),
    plans: [
      {
        id: "seo_starter",
        label: l(
          "SEO Foundation",
          "SEO Foundation",
          "SEO Foundation",
          "SEO Foundation",
          "SEO Foundation",
        ),
        detail: l(
          "Audit technique, recherche de mots-clés, on-page & rapport mensuel.",
          "Technical audit, keyword mapping, on-page SEO & monthly report.",
          "Audit kỹ thuật, từ khóa, on-page & báo cáo tháng.",
          "تدقيق تقني، كلمات مفتاحية، تحسين الصفحات وتقرير شهري.",
          "Технический аудит, семантика, on-page и отчёт.",
        ),
        priceEur: 299,
        period: "month",
      },
      {
        id: "seo_growth",
        label: l("SEO Growth", "SEO Growth", "SEO Growth", "SEO Growth", "SEO Growth"),
        detail: l(
          "Jusqu'à 4 contenus/mois, SEO local, autorité & suivi mensuel.",
          "Up to 4 SEO assets/mo, local SEO, authority & strategy review.",
          "Tối đa 4 bài SEO/tháng, SEO địa phương & uy tín.",
          "حتى 4 مقالات شهرياً، سيو محلي وبناء سلطة.",
          "До 4 SEO-материалов/мес, локальное SEO и ссылки.",
        ),
        priceEur: 499,
        period: "month",
        popular: true,
      },
      {
        id: "seo_domination",
        label: l(
          "SEO Domination",
          "SEO Domination",
          "SEO Domination",
          "SEO Domination",
          "SEO Domination",
        ),
        detail: l(
          "Jusqu'à 8 contenus/mois, marchés compétitifs & SEO international.",
          "Up to 8 assets/mo, competitive markets & international SEO.",
          "Tối đa 8 bài/tháng, thị trường cạnh tranh & SEO quốc tế.",
          "حتى 8 مقالات شهرياً، أسواق تنافسية وسيو دولي.",
          "До 8 материалов/мес, конкурентные и мировые рынки.",
        ),
        priceEur: 699,
        period: "month",
      },
    ],
  },
  {
    id: "maps",
    Icon: MapPin,
    title: l("Google Maps", "Google Maps", "Google Maps", "خرائط Google", "Google Maps"),
    short: l(
      "Visibilité locale & fiche Google",
      "Local presence & GBP",
      "Hiển thị địa phương & hồ sơ",
      "الحضور المحلي وملف Google",
      "Локальная видимость на картах",
    ),
    plans: [
      {
        id: "maps_strategy",
        label: l(
          "Stratégie Google Maps (dès 999 €/an)",
          "Google Maps Strategy (from €999/yr)",
          "Chiến lược Google Maps (từ 999 €/năm)",
          "استراتيجية خرائط Google (من 999 €/سنة)",
          "Стратегия Google Maps (от 999 €/год)",
        ),
        detail: l(
          "Audit local, optimisation fiche & signaux locaux — tarif exact sur devis.",
          "Local audit, GBP restructuring & local signals — exact scope on quote.",
          "Kiểm toán địa phương và tối ưu hồ sơ — báo giá cụ thể.",
          "تدقيق محلي وتحسين شامل للملف — السعر النهائي بالعرض.",
          "Локальный аудит и усиление карточки — по смете.",
        ),
        priceEur: 999,
        period: "year",
        customQuote: true,
        popular: true,
      },
      {
        id: "maps_annual_management",
        label: l(
          "Gestion Annuelle Fiche Google Maps",
          "Annual GBP Profile Management",
          "Quản trị Hồ sơ Google Maps 1 năm",
          "إدارة سنوية لملف خرائط Google",
          "Годовое ведение карточки Maps",
        ),
        detail: l(
          "12 mois de gestion : photos, réponses aux avis, horaires et actualités.",
          "12 months of photos, professional review replies, hours & updates.",
          "12 tháng quản trị ảnh, phản hồi đánh giá và cập nhật.",
          "12 شهراً من الصور والرد على التقييمات والتحديثات.",
          "12 месяцев: фото, ответы на отзывы и обновления.",
        ),
        priceEur: 500,
        period: "year",
      },
    ],
  },
  {
    id: "social",
    Icon: Share2,
    title: l(
      "Social Media",
      "Social Media",
      "Mạng xã hội",
      "وسائل التواصل الاجتماعي",
      "Социальные сети",
    ),
    short: l(
      "Instagram, TikTok, Facebook, LinkedIn",
      "Instagram, TikTok, Facebook, LinkedIn",
      "Instagram, TikTok, Facebook, LinkedIn",
      "إنستغرام، تيك توك، فيسبوك، لينكدإن",
      "Instagram, TikTok, Facebook, LinkedIn",
    ),
    plans: SOCIAL_MEDIA_PLANS.map((sp) => ({
      id: sp.sku,
      label: sp.name,
      detail:
        sp.id === "essential"
          ? l(
              "Gestion 1 à 2 réseaux, création et publication, suivi mensuel.",
              "1–2 platforms, content creation & publishing, monthly review.",
              "Quản lý 1–2 kênh, sáng tạo nội dung & theo dõi tháng.",
              "إدارة منصة إلى منصتين، إنشاء محتوى ومتابعة شهرية.",
              "Ведение 1–2 сетей, контент и ежемесячный отчёт.",
            )
          : sp.id === "growth"
            ? l(
                "Gestion 2 à 3 réseaux, calendrier éditorial, contenus pro & optimisations.",
                "2–3 platforms, editorial calendar, pro visuals & ongoing optimisation.",
                "Quản lý 2–3 kênh, lịch nội dung & tối ưu liên tục.",
                "إدارة 2 إلى 3 منصات، تقويم تحريري ومحتوى احترافي.",
                "Ведение 2–3 сетей, контент-план и оптимизация.",
              )
            : l(
                "Gestion avancée 3 réseaux, stratégie sur mesure, contenus premium & reporting.",
                "Advanced 3-platform management, bespoke growth strategy & priority reporting.",
                "Quản lý chuyên sâu 3 kênh, chiến lược riêng & báo cáo ưu tiên.",
                "إدارة متقدمة لـ 3 منصات، استراتيجية مخصصة وتقارير أولوية.",
                "Продвинутое ведение 3 сетей, стратегия и отчётность.",
              ),
      priceEur: sp.eur,
      period: "month" as const,
      commitmentMonths: sp.commitmentMonths,
      popular: sp.popular,
    })),
  },
  {
    id: "branding",
    Icon: Palette,
    title: l(
      "Branding & Identité",
      "Branding & Identity",
      "Thương hiệu & Nhận diện",
      "الهوية البصرية والعلامة",
      "Брендинг и айдентика",
    ),
    short: l(
      "Logo, charte & univers visuel",
      "Logo, guidelines & visual system",
      "Logo, quy chuẩn & nhận diện",
      "الشعار، دليل الهوية والنسق البصري",
      "Логотип, брендбук и стиль",
    ),
    plans: [
      {
        id: "branding_logo",
        label: l(
          "Logo Signature",
          "Signature Logo",
          "Logo Đặc trưng",
          "شعار احترافي",
          "Фирменный логотип",
        ),
        detail: l(
          "Logo vectoriel, déclinaisons et fichiers sources.",
          "Vector logo, variations and source files.",
          "Logo vector, các phiên bản và tệp nguồn.",
          "شعار فيكتور مع النسخ والملفات المصدرية.",
          "Векторный логотип, вариации и исходники.",
        ),
        priceEur: 199,
        period: "once",
      },
      {
        id: "branding_suite",
        label: l(
          "Full Brand Suite",
          "Full Brand Suite",
          "Bộ nhận diện toàn diện",
          "هوية بصرية شاملة",
          "Полный брендбук",
        ),
        detail: l(
          "Identité complète, palette, typographie & Brand Book.",
          "Complete identity, palette, typography & Brand Book.",
          "Nhận diện đầy đủ, bảng màu, chữ & Brand Book.",
          "هوية متكاملة مع الألوان والخطوط ودليل العلامة.",
          "Полная айдентика, цвета, типографика и брендбук.",
        ),
        priceEur: 399,
        period: "once",
        popular: true,
      },
      {
        id: "branding_flagship",
        label: l(
          "Brand Direction Flagship",
          "Flagship Brand Direction",
          "Định hướng Thương hiệu Cao cấp",
          "توجيه فني متكامل للعلامة",
          "Флагманский брендинг",
        ),
        detail: l(
          "Direction artistique globale, kit social media & supports print.",
          "Full art direction, social media kit & print templates.",
          "Định hướng nghệ thuật tổng thể, bộ social & ấn phẩm.",
          "إخراج فني شامل، حزمة التواصل الاجتماعي والمطبوعات.",
          "Арт-дирекшн, шаблоны соцсетей и печатные носители.",
        ),
        priceEur: 699,
        period: "once",
      },
    ],
  },
  {
    id: "maintenance",
    Icon: Wrench,
    title: l(
      "WebCare & Maintenance",
      "WebCare & Maintenance",
      "WebCare & Bảo trì",
      "الصيانة والاستضافة WebCare",
      "WebCare и поддержка",
    ),
    short: l(
      "Sécurité, mises à jour & hébergement",
      "Security, updates & hosting",
      "Bảo mật, cập nhật & hạ tầng",
      "الأمان، التحديثات والاستضافة",
      "Безопасность, правки и хостинг",
    ),
    plans: [
      {
        id: "webcare_infra",
        label: l(
          "Infrastructure annuelle",
          "Annual Infrastructure",
          "Hạ tầng hằng năm",
          "البنية التحتية السنوية",
          "Годовая инфраструктура",
        ),
        detail: l(
          "Hébergement, nom de domaine et sécurité gérés pendant 12 mois.",
          "Managed hosting, domain name and security for 12 months.",
          "Hosting, tên miền và bảo mật trọn gói 12 tháng.",
          "استضافة ونطاق وأمان مُدار لمدة 12 شهراً.",
          "Хостинг, домен и безопасность на 12 месяцев.",
        ),
        priceEur: 79,
        period: "year",
      },
      {
        id: "webcare_essential",
        label: l(
          "WebCare Essentiel",
          "WebCare Essential",
          "WebCare Cơ bản",
          "WebCare الأساسي",
          "WebCare Базовый",
        ),
        detail: l(
          "4 modifications courantes / mois & suivi technique.",
          "4 routine updates / month & standard monitoring.",
          "4 chỉnh sửa / tháng & giám sát kỹ thuật.",
          "4 تعديلات شهرياً ومتابعة تقنية قياسية.",
          "4 правки в месяц и технический контроль.",
        ),
        priceEur: 29,
        period: "month",
      },
      {
        id: "webcare_business",
        label: l(
          "WebCare Business",
          "WebCare Business",
          "WebCare Doanh nghiệp",
          "WebCare الأعمال",
          "WebCare Бизнес",
        ),
        detail: l(
          "10 modifications / mois, priorité de traitement & conseils.",
          "10 updates / month, priority handling & ongoing advice.",
          "10 chỉnh sửa / tháng, ưu tiên xử lý & tư vấn.",
          "10 تعديلات شهرياً وأولوية في المعالجة.",
          "10 правок в месяц, приоритет и рекомендации.",
        ),
        priceEur: 49,
        period: "month",
        popular: true,
      },
      {
        id: "webcare_unlimited",
        label: l(
          "WebCare Unlimited",
          "WebCare Unlimited",
          "WebCare Không giới hạn",
          "WebCare غير المحدود",
          "WebCare Безлимит",
        ),
        detail: l(
          "Modifications courantes illimitées dans le périmètre & suivi prioritaire.",
          "Unlimited routine changes within scope & priority technical support.",
          "Chỉnh sửa thông thường không giới hạn trong phạm vi.",
          "تعديلات اعتيادية غير محدودة ضمن النطاق ودعم أولوية.",
          "Безлимитные текущие правки и приоритетная поддержка.",
        ),
        priceEur: 99,
        period: "month",
      },
    ],
  },
  {
    id: "ai",
    Icon: Bot,
    title: l(
      "IA, Automatisation & Robotique",
      "AI, Automation & Robotics",
      "AI, Tự động hóa & Robot",
      "الذكاء الاصطناعي والروبوتات",
      "ИИ, автоматизация и роботы",
    ),
    short: l(
      "Outils métiers & robots de service",
      "Custom tools & service robots",
      "Phần mềm riêng & robot dịch vụ",
      "أدوات مخصصة وروبوتات خدمة",
      "ПО под ключ и сервисные роботы",
    ),
    plans: [
      {
        id: "ai_custom_workflow",
        label: l(
          "Automatisation & Outils IA",
          "AI & Workflow Automation",
          "Tự động hóa & Công cụ AI",
          "أتمتة العمليات والذكاء الاصطناعي",
          "Автоматизация и ИИ-инструменты",
        ),
        detail: l(
          "Cadrage technique sur mesure : CRM, API, agents et gain de productivité.",
          "Bespoke technical scope: internal tools, CRM, APIs & automation.",
          "Giải pháp kỹ thuật may đo: phần mềm nội bộ, API & tự động hóa.",
          "نطاق تقني مخصص للأدوات الداخلية وواجهات API والأتمتة.",
          "Индивидуальная разработка: CRM, API и автоматизация.",
        ),
        priceEur: 0,
        period: "once",
        customQuote: true,
      },
      {
        id: "robotics_rental",
        label: l(
          "Robot de service (location dès 499 €/mois)",
          "Service Robot (rental from €499/mo)",
          "Thuê Robot dịch vụ (từ 499 €/tháng)",
          "تأجير روبوت خدمة (من 499 €/شهر)",
          "Аренда сервисного робота (от 499 €/мес)",
        ),
        detail: l(
          "Hôtellerie, restauration, accueil ou événementiel (dès 250 €). Sur devis.",
          "Hospitality, restaurants, reception or events (from €250). Quoted.",
          "Khách sạn, nhà hàng, lễ tân hoặc sự kiện. Báo giá riêng.",
          "للفنادق والمطاعم والاستقبال والفعاليات. حسب العرض.",
          "Для отелей, ресторанов и мероприятий. По смете.",
        ),
        priceEur: 499,
        period: "month",
        customQuote: true,
      },
    ],
  },
  {
    id: "crm",
    Icon: Layers,
    title: l(
      "CRM & Logiciels Métier",
      "Custom CRM & Business Software",
      "CRM & Phần mềm Quản trị",
      "برمجيات وإدارة علاقات العملاء CRM",
      "CRM и корпоративное ПО",
    ),
    short: l(
      "Caisse POS, KDS & 0% commission",
      "POS cashier, KDS & 0% commission",
      "Thu ngân POS & 0% hoa hồng",
      "نقاط البيع وبدون عمولات 0%",
      "Касса POS, KDS и 0% комиссий",
    ),
    plans: [
      {
        id: "crm_starter",
        label: l(
          "CRM Métier & Caisse POS (dès 2 000 €)",
          "Business CRM & POS (from €2,000)",
          "CRM & Cổng POS (từ 2.000 €)",
          "برنامج CRM ونقاط البيع (من 2000 €)",
          "CRM и POS-касса (от 2 000 €)",
        ),
        detail: l(
          "Zéro commission tierce, gestion commandes, KDS et stocks en temps réel.",
          "Zero third-party commission, order flow, KDS & real-time inventory.",
          "0% hoa hồng, quản lý đơn, KDS & kho tức thì.",
          "صفر عمولة، إدارة طلبات، شاشة مطبخ ومخزون فوري.",
          "Без комиссий, поток заказов, KDS и склад.",
        ),
        priceEur: 2000,
        period: "once",
        popular: true,
      },
      {
        id: "crm_enterprise",
        label: l(
          "Plateforme Multi-Établissements & API",
          "Multi-Location Platform & API",
          "Nền tảng Đa chi nhánh & API",
          "منصة متعددة الفروع مع API",
          "Платформа для сети филиалов и API",
        ),
        detail: l(
          "Architecture distribuée, synchronisation multi-sites et connecteurs sur mesure.",
          "Distributed architecture, multi-site sync & custom integrations.",
          "Đồng bộ đa điểm và tích hợp kết nối riêng.",
          "بنية موزعة ومزامنة فروع وربط مخصص.",
          "Синхронизация нескольких точек и кастомные интеграции.",
        ),
        priceEur: 3500,
        period: "once",
        customQuote: true,
      },
    ],
  },
];

const BUSINESS_TYPES: Array<{
  id: string;
  label: L;
  icon: typeof UtensilsCrossed;
  recommendedServices: ServiceKey[];
  recommendedPlan: string;
  defaultLossEstimate: number;
  pitch: L;
}> = [
  {
    id: "restaurant",
    icon: UtensilsCrossed,
    label: l(
      "Restauration & Poké / Food",
      "Restaurants, Poké & Food Bars",
      "Nhà hàng & Quán ăn",
      "المطاعم والمقاهي والأغذية",
      "Рестораны и гастрономия",
    ),
    recommendedServices: ["websites", "maps", "crm"],
    recommendedPlan: "crm_starter",
    defaultLossEstimate: 12000,
    pitch: l(
      "Éliminez 15 à 30 % de commissions UberEats/Deliveroo grâce à votre commande en ligne et caisse POS 100% propriétaire.",
      "Cut 15-30% platform commissions with your own direct ordering and proprietary POS.",
      "Loại bỏ 15-30% phí hoa hồng với hệ thống đặt món và POS sở hữu riêng.",
      "تخلص من عمولات منصات التوصيل عبر موقعك ونقاط البيع الخاصة بك.",
      "Экономьте 15–30% комиссий платформ доставки со своей системой заказов.",
    ),
  },
  {
    id: "hospitality",
    icon: Hotel,
    label: l(
      "Hôtellerie, Resorts & Tourisme",
      "Hospitality, Resorts & Travel",
      "Khách sạn & Khu nghỉ dưỡng",
      "الفنادق والمنتجعات والسياحة",
      "Отели, курорты и туризм",
    ),
    recommendedServices: ["websites", "maps", "crm"],
    recommendedPlan: "website_business",
    defaultLossEstimate: 24000,
    pitch: l(
      "Reprenez le contrôle de vos réservations directes sans les 18% prélevés par Booking ou Expedia.",
      "Regain control of direct hotel bookings without 18% OTA commission margins.",
      "Tăng đặt phòng trực tiếp, chấm dứt phụ thuộc 18% phí Booking/Expedia.",
      "استعد السيطرة على حجوزاتك المباشرة بدون عمولات منصات الحجز 18%.",
      "Верните прямые бронирования без 18% комиссий туроператоров и OTA.",
    ),
  },
  {
    id: "realestate",
    icon: Building2,
    label: l(
      "Immobilier de prestige & Promoteurs",
      "Prestige Real Estate & Developers",
      "Bất động sản & Kiến trúc cao cấp",
      "العقارات الفاخرة والتطوير العقاري",
      "Премиальная недвижимость",
    ),
    recommendedServices: ["websites", "seo", "social"],
    recommendedPlan: "website_business",
    defaultLossEstimate: 0,
    pitch: l(
      "Mise en valeur cinématique de vos biens de prestige, captation de mandats exclusifs et SEO d'autorité.",
      "Cinematic showcase for luxury estates, exclusive listing capture and high-authority SEO.",
      "Trình diễn bất động sản cao cấp, thu hút khách VIP và nâng tầm thương hiệu.",
      "عرض سينمائي للعقارات الفاخرة واستقطاب عملاء الشراء بخصوصية تامة.",
      "Презентация премиальных объектов, эксклюзивные сделки и статусное SEO.",
    ),
  },
  {
    id: "commerce",
    icon: ShoppingBag,
    label: l(
      "Boutiques de luxe, Mode & Retail",
      "Luxury Retail, Fashion & Goods",
      "Cửa hàng thời trang & Bán lẻ cao cấp",
      "متاجر الأزياء والتجزئة الراقية",
      "Бутики, мода и премиум-ритейл",
    ),
    recommendedServices: ["websites", "branding", "crm"],
    recommendedPlan: "website_ecommerce",
    defaultLossEstimate: 8000,
    pitch: l(
      "E-commerce haute performance synchronisé avec votre caisse en boutique et programme fidélité VIP.",
      "High-performance e-commerce synced with physical boutique cashier and VIP loyalty.",
      "Bán lẻ đa kênh đồng bộ kho tức thì và chăm sóc khách hàng VIP.",
      "متجر إلكتروني فائق السرعة متزامن مع نقاط البيع في المتجر وبرنامج الولاء.",
      "Интернет-магазин с синхронизацией физических касс и VIP-лояльностью.",
    ),
  },
  {
    id: "beauty",
    icon: Stethoscope,
    label: l(
      "Cliniques privées, Esthétique & Santé",
      "Private Clinics, Aesthetic & Health",
      "Phòng khám, Thẩm mỹ & Y tế",
      "العيادات الطبية والتجميل والصحة",
      "Клиники, косметология и здоровье",
    ),
    recommendedServices: ["websites", "maps", "maintenance"],
    recommendedPlan: "maps_strategy",
    defaultLossEstimate: 0,
    pitch: l(
      "Classement Top 3 Google Maps, respect du secret médical et prise de rendez-vous qualifiée sans intermédiaire.",
      "Top 3 Google Maps visibility, medical-grade compliance and direct qualified appointments.",
      "Định vị Top 3 Google Maps, bảo mật y tế và đặt lịch hẹn chuẩn xác.",
      "تصدر خرائط Google وتعيين مواعيد المرضى مباشرة مع أمان البيانات.",
      "Выход в топ-3 Google Maps, медицинские стандарты и прямой поток пациентов.",
    ),
  },
  {
    id: "services",
    icon: Briefcase,
    label: l(
      "Conseil B2B, Avocats & Finance",
      "B2B Advisory, Law & Wealth",
      "Tư vấn Doanh nghiệp & Luật",
      "الاستشارات والشركات المالية والقانونية",
      "B2B-консалтинг, право и финансы",
    ),
    recommendedServices: ["websites", "seo", "branding"],
    recommendedPlan: "seo_growth",
    defaultLossEstimate: 0,
    pitch: l(
      "Positionnement d'autorité, réassurance institutionnelle et génération de mandats stratégiques.",
      "Institutional credibility, high-authority positioning and high-value mandate generation.",
      "Xây dựng uy tín thể chế và thu hút các hợp đồng chiến lược lớn.",
      "ترسيخ المكانة المهنية وجلب عقود وصفقات أعمال استراتيجية.",
      "Институциональный авторитет и привлечение крупных корпоративных контрактов.",
    ),
  },
  {
    id: "craft",
    icon: Gem,
    label: l(
      "Artisans d'Art & Créateurs de luxe",
      "Fine Crafts & Master Artisans",
      "Nghệ nhân & Thủ công tinh xảo",
      "الحرف اليدوية والفنون الراقية",
      "Ремесленники и премиум-мастера",
    ),
    recommendedServices: ["branding", "websites", "social"],
    recommendedPlan: "branding_foundation",
    defaultLossEstimate: 0,
    pitch: l(
      "Sublimation photographique de vos créations, storytelling d'orfèvre et clientèle internationale.",
      "Photographic sublimation of your craft, heritage storytelling and international reach.",
      "Tôn vinh nghệ thuật chế tác thủ công và tiếp cận tệp khách hàng quốc tế.",
      "إبراز الحرفية العالية وسرد قصة علامتك لاجتذاب عملاء النخبة حول العالم.",
      "Фотографическая подача мастерства, сторителлинг и выход на международный рынок.",
    ),
  },
];

const CURRENT_SITUATIONS: Array<{
  id: string;
  label: L;
  recommendedBoost: ServiceKey;
}> = [
  {
    id: "no_presence",
    label: l(
      "Tout à créer · Aucun site web ni identité visuelle",
      "Starting from scratch · No website or branding yet",
      "Dự án mới hoàn toàn · Chưa có website & nhận diện",
      "مشروع جديد تماماً · لا يوجد موقع أو هوية بصرية حتى الآن",
      "С нуля: нет сайта и визуального стиля",
    ),
    recommendedBoost: "websites",
  },
  {
    id: "outdated",
    label: l(
      "Site web existant obsolète · Taux de conversion faible",
      "Outdated existing site · Low visitor conversion rate",
      "Website hiện tại lỗi thời · Tỷ lệ chuyển đổi thấp",
      "موقع قديم وبطيء · معدل تحويل العملاء منخفض",
      "Сайт устарел и плохо конвертирует посетителей",
    ),
    recommendedBoost: "websites",
  },
  {
    id: "invisible_google",
    label: l(
      "Invisible sur Google & Google Maps face aux concurrents",
      "Invisible on Google & Google Maps vs competitors",
      "Vắng bóng trên Google Maps & Tìm kiếm so với đối thủ",
      "ضعف الظهور على خرائط وجوجل أمام المنافسين",
      "Невидимы в Google и на картах на фоне конкурентов",
    ),
    recommendedBoost: "maps",
  },
  {
    id: "high_commissions",
    label: l(
      "Trop de commissions prélevées (Uber, Booking : 15–30 %)",
      "Losing too much to platforms (Uber, Booking: 15-30%)",
      "Mất quá nhiều hoa hồng cho nền tảng (Booking, Grab: 15-30%)",
      "عمولات مرتفعة جداً للمنصات الوسيطة (15-30%)",
      "Слишком большие комиссии посредникам (15–30%)",
    ),
    recommendedBoost: "crm",
  },
  {
    id: "manual_tools",
    label: l(
      "Processus manuels · Manque de CRM & automatisation",
      "Manual processes · Need custom CRM & automation",
      "Quy trình thủ công · Cần phần mềm CRM & tự động hóa",
      "إجراءات يدوية مجهدة · نحتاج نظام CRM وأتمتة ذكية",
      "Рутина и ручные процессы: нужна автоматизация и CRM",
    ),
    recommendedBoost: "crm",
  },
];

const BUDGET_TIERS: Array<{
  id: string;
  range: string;
  label: L;
  tag: string;
}> = [
  {
    id: "essential",
    range: "500 € – 1 500 €",
    label: l("Démarrage Essentiel", "Starter Essential", "Khởi đầu Vững chắc", "الباقة الأساسية", "Базовый старт"),
    tag: "Rapide & Rentable",
  },
  {
    id: "growth",
    range: "1 500 € – 3 500 €",
    label: l("Croissance Élite", "Growth Elite", "Tăng trưởng Cao cấp", "نمو متسارع متميز", "Активный рост"),
    tag: "Le Plus Choisi ★",
  },
  {
    id: "bespoke",
    range: "3 500 € – 10 000 €+",
    label: l("Haute Performance Sur-Mesure", "Bespoke Enterprise", "Đặc quyền May đo", "حلول متقدمة وشاملة", "Премиум под ключ"),
    tag: "Sur-Mesure Intégral",
  },
];

const GOALS: Array<{ id: string; label: L }> = [
  {
    id: "visibility",
    label: l(
      "Gagner en visibilité sur Google",
      "Grow visibility on Google",
      "Tăng độ phủ trên Google",
      "زيادة الظهور على Google",
      "Усилить видимость в Google",
    ),
  },
  {
    id: "leads",
    label: l(
      "Générer plus de demandes & réservations",
      "Generate more leads & bookings",
      "Tăng khách hàng & đặt lịch",
      "زيادة الطلبات والحجوزات",
      "Привлечь больше заявок",
    ),
  },
  {
    id: "brand",
    label: l(
      "Moderniser mon image de marque",
      "Elevate my brand image",
      "Nâng tầm hình ảnh thương hiệu",
      "ترقية صورة العلامة التجارية",
      "Обновить имидж бренда",
    ),
  },
  {
    id: "launch",
    label: l(
      "Lancer une nouvelle activité",
      "Launch a new business",
      "Ra mắt dự án mới",
      "إطلاق نشاط جديد",
      "Запустить новый проект",
    ),
  },
];

const UI_COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    businessLabel: string;
    goalLabel: string;
    servicesLabel: string;
    servicesHint: string;
    continueBtn: string;
    backBtn: string;
    step2Title: string;
    step2Sub: string;
    step3Title: string;
    step3Sub: string;
    summaryTitle: string;
    emptySelection: string;
    onceTotal: string;
    monthlyTotal: string;
    annualTotal: string;
    customBadge: string;
    customNote: string;
    addAllToCart: string;
    addedAllToCart: string;
    contactHeading: string;
    companyLabel: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    websiteLabel: string;
    submitBtn: string;
    sendingBtn: string;
    whatsappBtn: string;
    resetBtn: string;
    vatNotice: string;
    successTitle: string;
    successSub: string;
    errorFallback: string;
    selectAtLeastOne: string;
    editStep: string;
  }
> = {
  fr: {
    eyebrow: "CONFIGURATEUR DE DEVIS EN 3 ÉTAPES",
    heading: "Votre projet,",
    headingAccent: "notre solution.",
    subtitle:
      "Sélectionnez vos besoins, ajustez vos formules aux tarifs officiels XR Agency et obtenez votre récapitulatif PDF instantané.",
    step1: "1. Besoins",
    step2: "2. Options",
    step3: "3. Récapitulatif",
    businessLabel: "Votre secteur d’activité",
    goalLabel: "Votre objectif principal",
    servicesLabel: "Quels services vous intéressent ?",
    servicesHint: "Sélectionnez un ou plusieurs leviers",
    continueBtn: "Continuer",
    backBtn: "Retour",
    step2Title: "Affinez vos formules",
    step2Sub: "Choisissez le niveau officiel adapté à votre rythme pour chaque service retenu.",
    step3Title: "Récapitulatif & envoi du devis",
    step3Sub: "Vérifiez vos prestations, vos engagements et recevez votre proposition officielle.",
    summaryTitle: "Votre sélection",
    emptySelection: "Sélectionnez au moins un service pour afficher votre estimation.",
    onceTotal: "Total ponctuel",
    monthlyTotal: "Total mensuel",
    annualTotal: "Total annuel",
    customBadge: "Sur devis",
    customNote:
      "Certaines prestations sur mesure sont confirmées après étude de votre zone ou cahier des charges.",
    addAllToCart: "Ajouter toute la sélection au panier",
    addedAllToCart: "Sélection ajoutée au panier",
    contactHeading: "Recevoir mon devis officiel PDF",
    companyLabel: "Entreprise / Établissement *",
    nameLabel: "Nom complet *",
    emailLabel: "E-mail professionnel *",
    phoneLabel: "Téléphone / WhatsApp *",
    websiteLabel: "Site web actuel (optionnel)",
    submitBtn: "Générer mon PDF & envoyer ma demande",
    sendingBtn: "Enregistrement en cours...",
    whatsappBtn: "Envoyer sur WhatsApp",
    resetBtn: "Réinitialiser",
    vatNotice:
      "Tarifs de référence en EUR. Le périmètre définitif, le régime de TVA applicable et les modalités de règlement sont confirmés sur devis avant tout engagement.",
    successTitle: "Devis enregistré et PDF téléchargé",
    successSub: "Votre demande a bien été transmise à l’équipe XR Agency.",
    errorFallback:
      "Impossible d’enregistrer le devis pour le moment. Vous pouvez aussi nous écrire directement sur WhatsApp.",
    selectAtLeastOne: "Sélectionnez au moins un service pour continuer.",
    editStep: "Modifier",
  },
  en: {
    eyebrow: "3-STEP QUOTE CONFIGURATOR",
    heading: "Your project,",
    headingAccent: "our solution.",
    subtitle:
      "Select your needs, pick official XR Agency tiers and receive an instant PDF summary tailored to your scope.",
    step1: "1. Needs",
    step2: "2. Options",
    step3: "3. Summary",
    businessLabel: "Your business sector",
    goalLabel: "Your primary goal",
    servicesLabel: "Which services are you interested in?",
    servicesHint: "Select one or more disciplines",
    continueBtn: "Continue",
    backBtn: "Back",
    step2Title: "Fine-tune your tiers",
    step2Sub: "Select the official plan that best fits your pace for each chosen service.",
    step3Title: "Summary & quote request",
    step3Sub:
      "Review your selected services, minimum commitments and request your official proposal.",
    summaryTitle: "Your selection",
    emptySelection: "Select at least one service to preview your live estimate.",
    onceTotal: "One-time total",
    monthlyTotal: "Monthly total",
    annualTotal: "Annual total",
    customBadge: "On quote",
    customNote:
      "Tailored services are confirmed in writing after reviewing your local market or brief.",
    addAllToCart: "Add entire selection to cart",
    addedAllToCart: "Selection added to cart",
    contactHeading: "Receive my official PDF quote",
    companyLabel: "Company / Venue *",
    nameLabel: "Full name *",
    emailLabel: "Work email *",
    phoneLabel: "Phone / WhatsApp *",
    websiteLabel: "Current website (optional)",
    submitBtn: "Download PDF & send quote request",
    sendingBtn: "Saving quote...",
    whatsappBtn: "Send via WhatsApp",
    resetBtn: "Reset",
    vatNotice:
      "Reference pricing in EUR. Final scope, applicable VAT treatment and payment terms are confirmed in writing prior to commitment.",
    successTitle: "Quote saved and PDF downloaded",
    successSub: "Your request has been received by the XR Agency team.",
    errorFallback:
      "Could not save your quote right now. You can also message us directly on WhatsApp.",
    selectAtLeastOne: "Please select at least one service to continue.",
    editStep: "Edit",
  },
  vi: {
    eyebrow: "CÔNG CỤ BÁO GIÁ 3 BƯỚC",
    heading: "Dự án của bạn,",
    headingAccent: "giải pháp của chúng tôi.",
    subtitle:
      "Chọn nhu cầu, điều chỉnh gói dịch vụ theo bảng giá chính thức của XR Agency và tải bản tóm tắt PDF ngay.",
    step1: "1. Nhu cầu",
    step2: "2. Tùy chọn",
    step3: "3. Tóm tắt",
    businessLabel: "Lĩnh vực kinh doanh",
    goalLabel: "Mục tiêu chính",
    servicesLabel: "Bạn quan tâm đến dịch vụ nào?",
    servicesHint: "Chọn một hoặc nhiều dịch vụ",
    continueBtn: "Tiếp tục",
    backBtn: "Quay lại",
    step2Title: "Chọn gói chi tiết",
    step2Sub: "Lựa chọn gói chính thức phù hợp với từng dịch vụ đã chọn.",
    step3Title: "Tóm tắt & gửi yêu cầu báo giá",
    step3Sub: "Kiểm tra lại các hạng mục, cam kết và nhận đề xuất chính thức.",
    summaryTitle: "Lựa chọn của bạn",
    emptySelection: "Chọn ít nhất một dịch vụ để xem ước tính.",
    onceTotal: "Tổng một lần",
    monthlyTotal: "Tổng hằng tháng",
    annualTotal: "Tổng hằng năm",
    customBadge: "Báo giá riêng",
    customNote: "Các hạng mục theo yêu cầu sẽ được xác nhận chi tiết sau khi khảo sát.",
    addAllToCart: "Thêm tất cả vào giỏ lựa chọn",
    addedAllToCart: "Đã thêm vào lựa chọn",
    contactHeading: "Nhận báo giá PDF chính thức",
    companyLabel: "Công ty / Cơ sở *",
    nameLabel: "Họ và tên *",
    emailLabel: "Email *",
    phoneLabel: "Điện thoại / WhatsApp *",
    websiteLabel: "Website hiện tại (tùy chọn)",
    submitBtn: "Tải PDF & gửi yêu cầu",
    sendingBtn: "Đang lưu...",
    whatsappBtn: "Gửi qua WhatsApp",
    resetBtn: "Làm lại",
    vatNotice:
      "Giá tham chiếu tính bằng EUR. Phạm vi chính thức, thuế VAT và điều khoản thanh toán được xác nhận trong báo giá.",
    successTitle: "Đã lưu báo giá và tải PDF",
    successSub: "Yêu cầu của bạn đã được chuyển tới đội ngũ XR Agency.",
    errorFallback: "Chưa thể lưu báo giá lúc này. Bạn có thể liên hệ trực tiếp qua WhatsApp.",
    selectAtLeastOne: "Vui lòng chọn ít nhất một dịch vụ.",
    editStep: "Sửa",
  },
  ar: {
    eyebrow: "مُهيّئ عرض السعر في 3 خطوات",
    heading: "مشروعك،",
    headingAccent: "حلّنا المصمم لك.",
    subtitle:
      "اختر احتياجاتك، وحدد الباقات الرسمية من XR Agency، واحصل فوراً على ملخص عرض السعر بصيغة PDF.",
    step1: "1. الاحتياجات",
    step2: "2. الخيارات",
    step3: "3. الملخص",
    businessLabel: "قطاع نشاطك",
    goalLabel: "هدفك الرئيسي",
    servicesLabel: "ما هي الخدمات التي تهمك؟",
    servicesHint: "اختر خدمة واحدة أو أكثر",
    continueBtn: "متابعة",
    backBtn: "رجوع",
    step2Title: "اختر الباقات المناسبة",
    step2Sub: "حدد المستوى الرسمي الملائم لكل خدمة قمت باختيارها.",
    step3Title: "الملخص وإرسال طلب العرض",
    step3Sub: "راجع خدماتك المختارة ومدة الالتزام وأرسل طلبك الرسمي.",
    summaryTitle: "اختياراتك",
    emptySelection: "اختر خدمة واحدة على الأقل لعرض التقدير المباشر.",
    onceTotal: "الإجمالي لمرة واحدة",
    monthlyTotal: "الإجمالي الشهري",
    annualTotal: "الإجمالي السنوي",
    customBadge: "حسب العرض",
    customNote: "تُؤكد الخدمات المخصصة كتابياً بعد دراسة السوق أو متطلبات المشروع.",
    addAllToCart: "إضافة كل الاختيارات إلى السلة",
    addedAllToCart: "تمت الإضافة إلى السلة",
    contactHeading: "استلام عرض السعر الرسمي PDF",
    companyLabel: "الشركة / المؤسسة *",
    nameLabel: "الاسم الكامل *",
    emailLabel: "البريد الإلكتروني *",
    phoneLabel: "الهاتف / واتساب *",
    websiteLabel: "الموقع الحالي (اختياري)",
    submitBtn: "تحميل PDF وإرسال الطلب",
    sendingBtn: "جارٍ الحفظ...",
    whatsappBtn: "إرسال عبر واتساب",
    resetBtn: "إعادة تعيين",
    vatNotice:
      "الأسعار المرجعية باليورو (EUR). يتم تأكيد النطاق النهائي والضريبة وشروط الدفع رسمياً قبل أي التزام.",
    successTitle: "تم حفظ العرض وتحميل PDF",
    successSub: "وصل طلبك بنجاح إلى فريق XR Agency.",
    errorFallback: "تعذر حفظ العرض حالياً. يمكنك التواصل معنا مباشرة عبر واتساب.",
    selectAtLeastOne: "يرجى اختيار خدمة واحدة على الأقل للمتابعة.",
    editStep: "تعديل",
  },
  ru: {
    eyebrow: "КОНФИГУРАТОР СМЕТЫ В 3 ШАГА",
    heading: "Ваш проект,",
    headingAccent: "наше решение.",
    subtitle:
      "Выберите задачи, подберите официальные тарифы XR Agency и получите готовый PDF-расчёт за минуту.",
    step1: "1. Задачи",
    step2: "2. Опции",
    step3: "3. Итог",
    businessLabel: "Сфера деятельности",
    goalLabel: "Главная цель",
    servicesLabel: "Какие услуги вас интересуют?",
    servicesHint: "Выберите одно или несколько направлений",
    continueBtn: "Продолжить",
    backBtn: "Назад",
    step2Title: "Уточните тарифы",
    step2Sub: "Выберите официальный уровень сопровождения по каждому направлению.",
    step3Title: "Итог и отправка сметы",
    step3Sub: "Проверьте состав услуг, условия контракта и отправьте заявку.",
    summaryTitle: "Ваш выбор",
    emptySelection: "Выберите хотя бы одну услугу для расчёта.",
    onceTotal: "Разовый платёж",
    monthlyTotal: "В месяц",
    annualTotal: "В год",
    customBadge: "По смете",
    customNote: "Индивидуальные услуги уточняются после анализа вашего рынка и задач.",
    addAllToCart: "Добавить всё в корзину",
    addedAllToCart: "Добавлено в корзину",
    contactHeading: "Получить официальный PDF-расчёт",
    companyLabel: "Компания / бренд *",
    nameLabel: "Ваше имя *",
    emailLabel: "Рабочий email *",
    phoneLabel: "Телефон / WhatsApp *",
    websiteLabel: "Текущий сайт (необязательно)",
    submitBtn: "Скачать PDF и отправить заявку",
    sendingBtn: "Сохранение...",
    whatsappBtn: "Отправить в WhatsApp",
    resetBtn: "Сбросить",
    vatNotice:
      "Ориентировочные тарифы в EUR. Финальный объём, НДС и условия оплаты подтверждаются в официальном предложении.",
    successTitle: "Смета сохранена, PDF скачан",
    successSub: "Ваша заявка успешно передана команде XR Agency.",
    errorFallback: "Не удалось сохранить заявку сейчас. Вы также можете написать нам в WhatsApp.",
    selectAtLeastOne: "Выберите хотя бы одну услугу, чтобы продолжить.",
    editStep: "Изменить",
  },
};

function mapServiceParam(raw: string | null): ServiceKey | null {
  if (!raw) return null;
  const v = raw.toLowerCase();
  if (v === "websites" || v === "website") return "websites";
  if (v === "seo") return "seo";
  if (v === "maps") return "maps";
  if (v === "social") return "social";
  if (v === "branding") return "branding";
  if (v === "maintenance" || v === "webcare") return "maintenance";
  if (v === "ai" || v === "robotics" || v === "strategy") return "ai";
  return null;
}

export function QuoteConfiguratorCompact() {
  const { lang, t, price } = useLang();
  const safeLang: Lang = lang in UI_COPY ? (lang as Lang) : "fr";
  const ui = UI_COPY[safeLang];
  const isRtl = safeLang === "ar";
  const funnel = useOptionalFunnel();
  const { addItem } = useCart();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessType, setBusinessType] = useState<string>(BUSINESS_TYPES[0].id);
  const [goalId, setGoalId] = useState<string>(GOALS[1].id);
  const [currentSituation, setCurrentSituation] = useState<string>(CURRENT_SITUATIONS[0].id);
  const [budgetTier, setBudgetTier] = useState<string>(BUDGET_TIERS[1].id);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>(["maps", "seo", "social"]);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(180);
  const [activePackPreset, setActivePackPreset] = useState<string>("leads");

  const PACK_PRESETS = [
    {
      id: "launch",
      Icon: Globe,
      badge: "Lancement Rapide",
      title: "Pack Lancement & Notoriété",
      sub: "Site web vitrine d'exception, identité visuelle signature et création de votre fiche Google Maps.",
      services: ["websites", "branding", "maps"] as ServiceKey[],
    },
    {
      id: "leads",
      Icon: TrendingUp,
      badge: "Performance & Flux",
      title: "Pack Conquête Clients",
      sub: "Arriver dans le Top 3 Google Maps, dominer le référencement naturel SEO et attirer sur les réseaux.",
      services: ["maps", "seo", "social"] as ServiceKey[],
    },
    {
      id: "direct",
      Icon: ShoppingBag,
      badge: "0% Commission",
      title: "Pack Vente Directe & CRM",
      sub: "Application web Click & Collect, réservations sans intermédiaire et logiciel CRM caisse sur-mesure.",
      services: ["websites", "crm", "maintenance"] as ServiceKey[],
    },
    {
      id: "full",
      Icon: Gem,
      badge: "Tout-en-un Studio",
      title: "Écosystème Haute Couture",
      sub: "Dispositif complet : Identité globale, Site web, Top 3 Google, Automatisation IA & WebCare serein.",
      services: ["websites", "branding", "maps", "seo", "crm", "maintenance"] as ServiceKey[],
    },
  ];

  const estimatedSavings = useMemo(() => {
    const perOrderSavings = 7.5;
    return Math.round(monthlyVolume * perOrderSavings);
  }, [monthlyVolume]);

  const [selectedPlans, setSelectedPlans] = useState<Record<ServiceKey, string>>({
    websites: "website_business",
    seo: "seo_growth",
    maps: "maps_strategy",
    social: "social_growth",
    branding: "branding_suite",
    maintenance: "webcare_business",
    ai: "ai_custom_workflow",
    crm: "crm_starter",
  });
  const [stepError, setStepError] = useState("");
  const [cartSynced, setCartSynced] = useState(false);

  const [client, setClient] = useState({
    company: "",
    name: "",
    email: "",
    whatsapp: "",
    website: "",
  });
  const [sending, setSending] = useState(false);
  const [submitOk, setSubmitOk] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Respect URL query ?service=xxx if linked from service pages
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const mapped = mapServiceParam(params.get("service"));
    const requestedPlan = params.get("plan");
    if (mapped) {
      // A service-specific CTA should start with that service only, not unrelated defaults.
      setSelectedServices([mapped]);
      if (requestedPlan) {
        const group = CATALOG_GROUPS.find((item) => item.id === mapped);
        if (group?.plans.some((plan) => plan.id === requestedPlan)) {
          setSelectedPlans((prev) => ({ ...prev, [mapped]: requestedPlan }));
        }
      }
    }
  }, []);

  // Sync sector from funnel context when provided
  useEffect(() => {
    if (funnel?.sector) {
      const found = BUSINESS_TYPES.find((b) => b.id === funnel.sector);
      if (found) setBusinessType(found.id);
    }
  }, [funnel?.sector]);

  const toggleService = (id: ServiceKey) => {
    setStepError("");
    setCartSynced(false);
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectPlan = (serviceId: ServiceKey, planId: string) => {
    setCartSynced(false);
    setSelectedPlans((prev) => ({ ...prev, [serviceId]: planId }));
  };

  const chosenItems = useMemo(() => {
    return selectedServices
      .map((serviceId) => {
        const group = CATALOG_GROUPS.find((g) => g.id === serviceId);
        if (!group) return null;
        const planId = selectedPlans[serviceId];
        const plan = group.plans.find((p) => p.id === planId) ?? group.plans[0];
        return { group, plan };
      })
      .filter((x): x is { group: ServiceCatalogGroup; plan: PlanOption } => x !== null);
  }, [selectedServices, selectedPlans]);

  const totals = useMemo(() => {
    let once = 0;
    let monthly = 0;
    let annual = 0;
    let hasCustom = false;
    for (const { plan } of chosenItems) {
      if (plan.customQuote) {
        hasCustom = true;
        continue;
      }
      if (plan.period === "once") once += plan.priceEur;
      else if (plan.period === "month") monthly += plan.priceEur;
      else if (plan.period === "year") annual += plan.priceEur;
    }
    const isMultiPack = chosenItems.length >= 2 || once >= 799;
    const bundleDiscount = isMultiPack && once > 0 ? Math.round(once * 0.15) : 0;
    const finalOnce = Math.max(0, once - bundleDiscount);
    return { once, monthly, annual, hasCustom, isMultiPack, bundleDiscount, finalOnce };
  }, [chosenItems]);

  const goStep = (target: 1 | 2 | 3) => {
    if (target > 1 && selectedServices.length === 0) {
      setStepError(ui.selectAtLeastOne);
      return;
    }
    setStepError("");
    setStep(target);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const syncAllToCart = () => {
    for (const { group, plan } of chosenItems) {
      if (plan.customQuote && plan.priceEur === 0) continue;
      addItem({
        id: `${group.id}-${plan.id}`,
        serviceId: group.id,
        serviceName: t(group.title),
        planName: t(plan.label),
        priceEur: plan.priceEur,
        period: plan.period,
        periodLabel: getPeriodShortLabel(plan.period, safeLang),
        commitment: plan.commitmentMonths
          ? getCommitmentLabel(plan.commitmentMonths, safeLang)
          : undefined,
      });
    }
    setCartSynced(true);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedServices([]);
    setSubmitOk(null);
    setSubmitError(null);
    setStepError("");
    setCartSynced(false);
  };

  const activeBusiness = BUSINESS_TYPES.find((b) => b.id === businessType) ?? BUSINESS_TYPES[0];
  const activeGoal = GOALS.find((g) => g.id === goalId) ?? GOALS[0];

  const whatsappHref = useMemo(() => {
    const lines = chosenItems.map(({ group, plan }) => {
      const pLabel = plan.customQuote
        ? plan.priceEur > 0
          ? `dès ${plan.priceEur} €${getPeriodShortLabel(plan.period, safeLang)} (sur devis)`
          : ui.customBadge
        : `${plan.priceEur} €${getPeriodShortLabel(plan.period, safeLang)}`;
      const commit = plan.commitmentMonths
        ? ` · ${getCommitmentLabel(plan.commitmentMonths, safeLang)}`
        : "";
      return `• ${t(group.title)} — ${t(plan.label)} : ${pLabel}${commit}`;
    });
    const text =
      `${safeLang === "en" ? "Hello XR Agency, here is my project quote selection:" : "Bonjour XR Agency, voici ma configuration de devis :"}\n\n` +
      `${ui.businessLabel} : ${t(activeBusiness.label)}\n` +
      `${ui.goalLabel} : ${t(activeGoal.label)}\n\n` +
      `${lines.join("\n")}\n\n` +
      (totals.once > 0 ? `${ui.onceTotal} : ${totals.once} €\n` : "") +
      (totals.monthly > 0 ? `${ui.monthlyTotal} : ${totals.monthly} € / mois\n` : "") +
      (totals.annual > 0 ? `${ui.annualTotal} : ${totals.annual} € / an\n` : "") +
      (client.company ? `\n${ui.companyLabel.replace(" *", "")} : ${client.company}` : "");
    return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [chosenItems, activeBusiness, activeGoal, totals, client.company, safeLang, t, ui]);

  const handleSubmitQuote = async (e: FormEvent) => {
    e.preventDefault();
    if (!client.company.trim() || !client.name.trim() || !client.email.trim()) return;
    setSending(true);
    setSubmitError(null);
    setSubmitOk(null);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const clean = (s: string) =>
        s
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\x20-\x7E\xA0-\xFF]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

      const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const quoteRef = `XR-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Editorial Charcoal & Champagne Bronze PDF Header
      doc.setFillColor(23, 22, 19);
      doc.rect(0, 0, 210, 32, "F");
      doc.setTextColor(247, 244, 238);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text("XR AGENCY", 14, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(216, 188, 148);
      doc.text("AGENCE DIGITALE INTERNATIONALE · PRE-DEVIS", 14, 22);
      doc.setTextColor(247, 244, 238);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(quoteRef, 196, 15, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(new Date().toLocaleDateString("fr-FR"), 196, 22, { align: "right" });

      let y = 44;
      doc.setTextColor(23, 22, 19);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CLIENT & PROJET", 14, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(clean(`Entreprise : ${client.company}`), 14, y);
      y += 5;
      doc.text(clean(`Contact : ${client.name} · ${client.email} · ${client.whatsapp}`), 14, y);
      y += 5;
      doc.text(
        clean(`Secteur : ${activeBusiness.label.fr} | Objectif : ${activeGoal.label.fr}`),
        14,
        y,
      );
      if (client.website.trim()) {
        y += 5;
        doc.text(clean(`Site actuel : ${client.website}`), 14, y);
      }

      y += 10;
      doc.setFillColor(238, 233, 224);
      doc.rect(14, y - 5, 182, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("PRESTATION SELECTIONNEE", 17, y);
      doc.text("TARIF REFERENCE (EUR)", 193, y, { align: "right" });
      y += 8;

      doc.setFont("helvetica", "normal");
      chosenItems.forEach(({ group, plan }) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(23, 22, 19);
        doc.text(clean(`${group.title.fr} — ${plan.label.fr}`), 16, y);
        const amountStr = plan.customQuote
          ? plan.priceEur > 0
            ? `Des ${plan.priceEur} EUR / ${plan.period === "year" ? "an" : "mois"} (devis)`
            : "Sur devis"
          : `${plan.priceEur} EUR${plan.period === "month" ? " / mois" : plan.period === "year" ? " / an" : ""}`;
        doc.text(clean(amountStr), 193, y, { align: "right" });
        y += 4.5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(87, 83, 75);
        const detailLine = plan.commitmentMonths
          ? `${plan.detail.fr} (Engagement minimum ${plan.commitmentMonths} mois)`
          : plan.detail.fr;
        doc.text(doc.splitTextToSize(clean(detailLine), 140).slice(0, 2), 16, y);
        y += 10;
      });

      y += 4;
      doc.setFillColor(23, 22, 19);
      doc.roundedRect(112, y, 84, 28, 2, 2, "F");
      doc.setTextColor(216, 188, 148);
      doc.setFontSize(8);
      doc.text("TOTAL PONCTUEL", 117, y + 8);
      doc.text("TOTAL MENSUEL", 117, y + 16);
      doc.text("TOTAL ANNUEL", 117, y + 24);
      doc.setTextColor(247, 244, 238);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`${totals.once} EUR`, 191, y + 8, { align: "right" });
      doc.text(`${totals.monthly} EUR / mois`, 191, y + 16, { align: "right" });
      doc.text(`${totals.annual} EUR / an`, 191, y + 24, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(87, 83, 75);
      doc.text(
        "Tarifs de reference en EUR. Le perimetre definitif et les conditions sont confirmes sur devis avant engagement.",
        14,
        282,
      );
      doc.text(
        "XR Agency · contact.xragency@gmail.com · WhatsApp +33 7 67 56 67 83 · xragencyai.com",
        14,
        288,
      );

      const pdfDataUri = doc.output("datauristring");
      const pdfBase64 = pdfDataUri.split(",")[1] || "";

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "send_quote",
          pdfBase64,
          client,
          summary: {
            sector: activeBusiness.label.fr,
            goal: activeGoal.label.fr,
            services: chosenItems.map(({ group, plan }) => ({
              label: `${group.title.fr} — ${plan.label.fr}`,
              detail: plan.commitmentMonths
                ? `${plan.detail.fr} (Engagement ${plan.commitmentMonths} mois)`
                : plan.detail.fr,
              price: plan.priceEur,
              period: plan.period,
            })),
            once: totals.once,
            monthly: totals.monthly,
            annual: totals.annual,
          },
        }),
      });
      const result = (await response.json()) as {
        sent?: boolean;
        quoteId?: string;
        error?: string;
      };
      if (!response.ok || !result.sent) {
        throw new Error(result.error || ui.errorFallback);
      }

      doc.save(`XR-Agency-Devis-${result.quoteId || quoteRef}.pdf`);
      setSubmitOk(result.quoteId || quoteRef);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : ui.errorFallback);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="quote"
      ref={sectionRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="scroll-mt-20 border-y border-[#171613]/10 bg-[#F7F4EE] py-16 text-[#171613] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
                {ui.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.06] tracking-[-0.02em] text-[#12110E] sm:text-5xl">
              {ui.heading}{" "}
              <span className="italic font-normal text-[#12110E]">{ui.headingAccent}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#57534B] sm:text-base">
              {ui.subtitle}
            </p>
          </div>

          {/* 3-Step Indicator Bar */}
          <nav aria-label="Étapes du configurateur" className="flex items-center gap-2">
            {([1, 2, 3] as const).map((s) => {
              const label = s === 1 ? ui.step1 : s === 2 ? ui.step2 : ui.step3;
              const isActive = step === s;
              const isDone = step > s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => goStep(s)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:px-4 ${
                    isActive
                      ? "border-[#171613] bg-[#171613] text-[#F7F4EE]"
                      : isDone
                        ? "border-[#9E7F5A]/50 bg-[#EEE9E0] text-[#171613]"
                        : "border-[#171613]/15 bg-white text-[#57534B] hover:border-[#9E7F5A]"
                  }`}
                >
                  {isDone && <Check className="h-3.5 w-3.5 text-[#9E7F5A]" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main 2-Column Workspace (Left: Step Form | Right: Live Sticky Summary) */}
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-12">
          {/* Left Column: Active Step */}
          <div className="rounded-3xl border border-[#171613]/12 bg-white p-5 shadow-[0_20px_50px_rgba(23,22,19,0.05)] sm:p-8 lg:col-span-8">
            {/* STEP 1 — BESOINS & DIAGNOSTIC INTERACTIF */}
            {step === 1 && (
              <div className="space-y-8">
                {/* 1. CHOIX LUDIQUE DU PACK STRATÉGIQUE */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#7D6445]">
                      1. Choisissez votre Pack Stratégique (1 Clic)
                    </label>
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                      ✨ Pack configuré automatiquement
                    </span>
                  </div>

                  <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PACK_PRESETS.map((p) => {
                      const isActive = activePackPreset === p.id;
                      const Icon = p.Icon;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setActivePackPreset(p.id);
                            setSelectedServices(p.services);
                          }}
                          className={cn(
                            "group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 text-start transition-all duration-300 shadow-xs",
                            isActive
                              ? "border-[#171613] bg-[#171613] text-[#F7F4EE] shadow-lg -translate-y-1"
                              : "border-[#171613]/12 bg-[#FAF8F4] text-[#2C2924] hover:border-[#9E7F5A] hover:bg-white"
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span
                                className={cn(
                                  "grid h-9 w-9 place-items-center rounded-xl transition",
                                  isActive
                                    ? "bg-white/20 text-[#E5C696]"
                                    : "bg-white text-[#8D6C42] border border-[#171613]/10"
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <span
                                className={cn(
                                  "font-mono text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5",
                                  isActive
                                    ? "bg-[#E5C696] text-[#171613]"
                                    : "bg-[#EEE8DC] text-[#7A6343]"
                                )}
                              >
                                {p.badge}
                              </span>
                            </div>
                            <h4 className="mt-3 text-base font-bold tracking-tight">
                              {p.title}
                            </h4>
                            <p
                              className={cn(
                                "mt-1.5 text-xs leading-relaxed",
                                isActive ? "text-white/80" : "text-[#5C554B]"
                              )}
                            >
                              {p.sub}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-current/10 pt-3 text-[11px] font-semibold">
                            <span>{p.services.length} services inclus</span>
                            <span className={isActive ? "text-[#E5C696]" : "text-[#8D6C42]"}>
                              {isActive ? "✓ Sélectionné" : "Activer ce pack →"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. SECTEUR D'ACTIVITÉ */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#7D6445]">
                      2. Votre Secteur d'Activité
                    </label>
                    <span className="font-mono text-[10px] text-[#9E7F5A] bg-[#F4EFE6] px-2.5 py-0.5 rounded-full">
                      Adaptation sectorielle
                    </span>
                  </div>
                  <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {BUSINESS_TYPES.map((b) => {
                      const active = businessType === b.id;
                      const SectorIcon = b.icon;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setBusinessType(b.id);
                            setSelectedServices(b.recommendedServices);
                          }}
                          className={`group flex items-center gap-3 rounded-2xl border p-3.5 text-start text-xs font-semibold transition-all duration-200 ${
                            active
                              ? "border-[#171613] bg-[#171613] text-[#F7F4EE] shadow-md -translate-y-0.5"
                              : "border-[#171613]/12 bg-[#FAF8F4] text-[#45413A] hover:border-[#9E7F5A] hover:bg-white"
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl transition ${
                              active ? "bg-white/20 text-[#E5C696]" : "bg-white text-[#8D6C42] border border-[#171613]/10"
                            }`}
                          >
                            <SectorIcon className="h-4 w-4" />
                          </span>
                          <span className="leading-snug">{t(b.label)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. SERVICES À SÉLECTIONNER OU AJUSTER */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#7D6445]">
                      3. Vos Services & Pôles d'Excellence
                    </label>
                    <span className="text-xs text-[#57534B]">Ajustez les disciplines selon vos besoins</span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {CATALOG_GROUPS.map(({ id, Icon, title, short, plans }) => {
                      const checked = selectedServices.includes(id);
                      const minPlan = plans[0];
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleService(id)}
                          className={`group flex items-start gap-3.5 rounded-2xl border p-4 text-start transition ${
                            checked
                              ? "border-[#171613] bg-[#171613] text-[#F7F4EE] shadow-md"
                              : "border-[#171613]/12 bg-[#FAF8F4] text-[#171613] hover:border-[#9E7F5A] hover:bg-white"
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                              checked
                                ? "bg-white/15 text-white"
                                : "border border-[#171613]/12 bg-white text-[#706A61]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold">{t(title)}</span>
                              <span
                                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                                  checked
                                    ? "border-white bg-white text-[#12110E]"
                                    : "border-[#171613]/20 bg-white"
                                }`}
                              >
                                {checked && <Check className="h-3 w-3" />}
                              </span>
                            </div>
                            <p
                              className={`mt-1 text-xs ${
                                checked ? "text-[#F7F4EE]/75" : "text-[#57534B]"
                              }`}
                            >
                              {t(short)}
                            </p>
                            <p
                              className={`mt-2 font-mono text-[11px] font-semibold ${
                                checked ? "text-emerald-300" : "text-[#12110E]"
                              }`}
                            >
                              {id === "websites"
                                ? "À partir de 499 €"
                                : minPlan.priceEur > 0
                                  ? `${safeLang === "en" ? "From" : "Dès"} ${price(minPlan.priceEur)}${getPeriodShortLabel(minPlan.period, safeLang)}`
                                  : ui.customBadge}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. NOS 3 GARANTIES D'EXCELLENCE & DE RASSURANCE */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-[#171613]/10 pt-5">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-3.5 text-start">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      Maquette 48h offerte
                    </span>
                    <p className="mt-1 text-[11px] text-[#4A453C] leading-snug">
                      Prototype interactif sur-mesure livré sous 24-48h, sans aucun engagement.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/20 bg-amber-50/50 p-3.5 text-start">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
                      Délai Garanti 7-14j
                    </span>
                    <p className="mt-1 text-[11px] text-[#4A453C] leading-snug">
                      Planning contractuel ferme et production réactive sans décalage de date.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-50/50 p-3.5 text-start">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                      0% Commission Cachée
                    </span>
                    <p className="mt-1 text-[11px] text-[#4A453C] leading-snug">
                      Pleine propriété du code, de l'identité et de l'ensemble de vos outils.
                    </p>
                  </div>
                </div>

                {stepError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">
                    {stepError}
                  </p>
                )}

                <div className="flex justify-end border-t border-[#171613]/10 pt-5">
                  <button
                    type="button"
                    onClick={() => goStep(2)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-7 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] active:scale-[0.98]"
                  >
                    <span>Continuer vers les formules & options</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — OPTIONS & FORMULES */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#171613]">
                    {ui.step2Title}
                  </h3>
                  <p className="mt-1 text-sm text-[#57534B]">{ui.step2Sub}</p>
                </div>

                <div className="space-y-6">
                  {selectedServices.map((serviceId) => {
                    const group = CATALOG_GROUPS.find((g) => g.id === serviceId);
                    if (!group) return null;
                    const Icon = group.Icon;
                    const activePlanId = selectedPlans[serviceId] ?? group.plans[0].id;
                    return (
                      <div
                        key={serviceId}
                        className="rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] p-4 sm:p-5"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-[#9E7F5A]" />
                          <h4 className="font-serif text-lg font-medium text-[#171613]">
                            {t(group.title)}
                          </h4>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                          {group.plans.map((plan) => {
                            const active = activePlanId === plan.id;
                            return (
                              <button
                                key={plan.id}
                                type="button"
                                onClick={() => selectPlan(serviceId, plan.id)}
                                className={`flex flex-col justify-between rounded-2xl border p-4 text-start transition ${
                                  active
                                    ? "border-[#171613] bg-[#171613] text-[#F7F4EE] shadow-md"
                                    : "border-[#171613]/12 bg-white text-[#171613] hover:border-[#9E7F5A]"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold">{t(plan.label)}</span>
                                    {plan.popular && (
                                      <span
                                        className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase ${
                                          active
                                            ? "bg-white/20 text-white"
                                            : "bg-[#EEE9E0] text-[#12110E]"
                                        }`}
                                      >
                                        ★
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className={`mt-1.5 text-[11px] leading-relaxed ${
                                      active ? "text-[#F7F4EE]/75" : "text-[#57534B]"
                                    }`}
                                  >
                                    {t(plan.detail)}
                                  </p>
                                </div>
                                <div className="mt-3 border-t border-current/12 pt-2.5">
                                  <p
                                    className={`font-serif text-lg font-semibold ${
                                      active ? "text-emerald-300" : "text-[#12110E]"
                                    }`}
                                  >
                                    {plan.priceEur > 0
                                      ? `${plan.customQuote ? `${safeLang === "en" ? "From" : "Dès"} ` : ""}${price(plan.priceEur)}${getPeriodShortLabel(plan.period, safeLang)}`
                                      : ui.customBadge}
                                  </p>
                                  {plan.commitmentMonths && (
                                    <p
                                      className={`mt-0.5 font-mono text-[10px] ${
                                        active ? "text-[#F7F4EE]/70" : "text-[#706A61]"
                                      }`}
                                    >
                                      {getCommitmentLabel(plan.commitmentMonths, safeLang)}
                                    </p>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-[#171613]/10 pt-5">
                  <button
                    type="button"
                    onClick={() => goStep(1)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#171613]/20 bg-white px-5 py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {ui.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => goStep(3)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-7 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925]"
                  >
                    {ui.continueBtn}
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — RÉCAPITULATIF & ENVOI */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#171613]">
                      {ui.step3Title}
                    </h3>
                    <p className="mt-1 text-sm text-[#57534B]">{ui.step3Sub}</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 px-3.5 py-1.5 text-xs font-medium text-[#57534B] hover:border-[#171613] hover:text-[#171613]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {ui.resetBtn}
                  </button>
                </div>

                {/* Editable Context Summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#171613]/10 bg-[#FAF8F4] px-4 py-3 text-xs">
                  <div className="space-y-0.5">
                    <p>
                      <span className="text-[#57534B]">{ui.businessLabel} : </span>
                      <strong className="text-[#171613]">{t(activeBusiness.label)}</strong>
                    </p>
                    <p>
                      <span className="text-[#57534B]">{ui.goalLabel} : </span>
                      <strong className="text-[#171613]">{t(activeGoal.label)}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goStep(1)}
                    className="font-semibold text-[#7D6445] underline underline-offset-4 hover:text-[#171613]"
                  >
                    {ui.editStep}
                  </button>
                </div>

                {submitOk ? (
                  <div className="rounded-3xl border border-[#9E7F5A]/40 bg-[#FAF8F4] p-7 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-[#7D6445]" />
                    <h4 className="mt-3 font-serif text-2xl font-medium text-[#171613]">
                      {ui.successTitle}
                    </h4>
                    <p className="mt-2 text-sm text-[#57534B]">
                      {ui.successSub}{" "}
                      <strong className="font-mono text-[#171613]">({submitOk})</strong>
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE] hover:bg-[#2A2823]"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-400" />
                        {ui.whatsappBtn}
                      </a>
                      <button
                        type="button"
                        onClick={resetAll}
                        className="inline-flex items-center gap-2 rounded-full border border-[#171613]/20 bg-white px-5 py-3 text-xs font-semibold text-[#171613]"
                      >
                        {ui.resetBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuote} className="space-y-4">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7D6445]">
                      {ui.contactHeading}
                    </h4>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#45413A]">
                          {ui.companyLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={client.company}
                          onChange={(e) => setClient({ ...client, company: e.target.value })}
                          className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#45413A]">
                          {ui.nameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={client.name}
                          onChange={(e) => setClient({ ...client, name: e.target.value })}
                          className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#45413A]">
                          {ui.emailLabel}
                        </label>
                        <input
                          type="email"
                          required
                          value={client.email}
                          onChange={(e) => setClient({ ...client, email: e.target.value })}
                          className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#45413A]">
                          {ui.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          required
                          value={client.whatsapp}
                          onChange={(e) => setClient({ ...client, whatsapp: e.target.value })}
                          className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#45413A]">
                        {ui.websiteLabel}
                      </label>
                      <input
                        type="text"
                        value={client.website}
                        onChange={(e) => setClient({ ...client, website: e.target.value })}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#171613] focus:border-[#9E7F5A] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {submitError && (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">
                        {submitError}
                      </p>
                    )}

                    {/* Reassurance & Fast-Track Box */}
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-50/70 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                          <span className="text-base">🚀</span>
                          Démarrage Express garanti sous 48h
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                          3 créneaux restants
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900 leading-relaxed">
                        Chaque projet est livré clé en main sous 10 à 14 jours ouvrés. Validez votre configuration directement avec un expert sur WhatsApp ou téléchargez votre devis officiel PDF.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[#171613]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => goStep(2)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#171613]/20 bg-white px-5 py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {ui.backBtn}
                      </button>

                      <div className="flex flex-col gap-2.5 sm:flex-row">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-emerald-700 hover:scale-[1.02]"
                        >
                          <MessageCircle className="h-4 w-4 text-white" />
                          <span>💬 Valider sur WhatsApp (15m)</span>
                        </a>
                        <button
                          type="submit"
                          disabled={sending}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823] disabled:opacity-50"
                        >
                          <Download className="h-4 w-4 text-white" />
                          {sending ? ui.sendingBtn : ui.submitBtn}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Editorial Summary Card */}
          <aside className="rounded-3xl border border-[#E5E5E0] bg-white p-6 text-[#12110E] shadow-[0_20px_50px_rgba(23,22,19,0.06)] lg:sticky lg:top-24 lg:col-span-4">
            <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#706A61]">
                  {ui.summaryTitle}
                </p>
                <p className="mt-0.5 text-xs text-[#5A554E]">{t(activeBusiness.label)}</p>
              </div>
              <span className="rounded-full bg-[#12110E] px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                {chosenItems.length}
              </span>
            </div>

            {chosenItems.length === 0 ? (
              <p className="py-8 text-center text-xs text-[#5A554E]">{ui.emptySelection}</p>
            ) : (
              <>
                <ul className="divide-y divide-[#E5E5E0] py-2">
                  {chosenItems.map(({ group, plan }) => (
                    <li key={group.id} className="flex items-start justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#12110E]">{t(group.title)}</p>
                        <p className="text-[11px] text-[#5A554E]">{t(plan.label)}</p>
                        {plan.commitmentMonths && (
                          <p className="mt-0.5 font-mono text-[10px] text-[#706A61]">
                            {getCommitmentLabel(plan.commitmentMonths, safeLang)}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 font-mono text-xs font-semibold text-[#12110E]">
                        {plan.customQuote
                          ? plan.priceEur > 0
                            ? `${price(plan.priceEur)}${getPeriodShortLabel(plan.period, safeLang)}*`
                            : ui.customBadge
                          : `${price(plan.priceEur)}${getPeriodShortLabel(plan.period, safeLang)}`}
                      </span>
                    </li>
                  ))}
                </ul>

                {totals.bundleDiscount > 0 && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/80 p-3 my-2 text-xs">
                    <div className="flex items-center justify-between text-emerald-800 font-bold">
                      <span>🎁 Pack Synergie (-15%)</span>
                      <span>-{price(totals.bundleDiscount)}</span>
                    </div>
                    <p className="text-[10.5px] text-emerald-700 mt-1 font-medium">
                      + 1er mois WebCare offert (valeur 99 €)
                    </p>
                  </div>
                )}

                <div className="mt-2 space-y-2 border-t border-[#E5E5E0] pt-4">
                  {totals.once > 0 && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#5A554E]">{ui.onceTotal}</span>
                      <div className="text-right">
                        {totals.bundleDiscount > 0 && (
                          <span className="text-xs line-through text-slate-400 mr-2">
                            {price(totals.once)}
                          </span>
                        )}
                        <span className="font-serif text-2xl font-bold text-emerald-700">
                          {price(totals.finalOnce)}
                        </span>
                      </div>
                    </div>
                  )}
                  {totals.monthly > 0 && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#5A554E]">{ui.monthlyTotal}</span>
                      <span className="font-serif text-xl font-semibold text-[#12110E]">
                        {price(totals.monthly)}
                        {getPeriodShortLabel("month", safeLang)}
                      </span>
                    </div>
                  )}
                  {totals.annual > 0 && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#5A554E]">{ui.annualTotal}</span>
                      <span className="font-serif text-xl font-semibold text-[#12110E]">
                        {price(totals.annual)}
                        {getPeriodShortLabel("year", safeLang)}
                      </span>
                    </div>
                  )}
                </div>

                {totals.hasCustom && (
                  <p className="mt-3 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-3 text-[11px] leading-relaxed text-[#5A554E]">
                    * {ui.customNote}
                  </p>
                )}

                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    onClick={syncAllToCart}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#12110E] px-4 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925]"
                  >
                    {cartSynced ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        {ui.addedAllToCart}
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        {ui.addAllToCart}
                      </>
                    )}
                  </button>
                  {step < 3 && (
                    <button
                      type="button"
                      onClick={() => goStep(3)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E5E0] bg-white px-4 py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#FAF9F5]"
                    >
                      {ui.step3}
                      <ArrowRight className="h-3.5 w-3.5 text-[#12110E]" />
                    </button>
                  )}
                </div>
              </>
            )}

            <div className="mt-5 flex items-start gap-2 border-t border-[#E5E5E0] pt-4 text-[11px] leading-relaxed text-[#706A61]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{ui.vatNotice}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
