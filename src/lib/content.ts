import type { L } from "./i18n";
import { SERVICES_PART1 } from "./content-services-a";
import { SERVICES_PART2 } from "./content-services-b";


const SERVICE_TEXT_TRANSLATIONS: Record<string, { ar: string; ru: string }> = {
  "Optimized architecture and performance tracking": { ar: "بنية محسّنة ومتابعة الأداء", ru: "Оптимизированная архитектура и отслеживание производительности" },
  "Performance and media optimization": { ar: "تحسين الأداء والوسائط", ru: "Оптимизация производительности и медиа" },
  "Multi-sector experience": { ar: "خبرة في قطاعات متعددة", ru: "Опыт работы в разных отраслях" },
  "Pro Showcase Site": { ar: "موقع تعريفي احترافي", ru: "Премиальный сайт-визитка" },
  "Bespoke responsive mobile-first design": { ar: "تصميم مخصص ومتجاوب مع أولوية للهواتف", ru: "Индивидуальный адаптивный дизайн с приоритетом мобильных устройств" },
  "Up to 3 complete structured pages": { ar: "حتى 3 صفحات متكاملة ومنظمة", ru: "До 3 полноценных структурированных страниц" },
  "Contact form & direct WhatsApp button": { ar: "نموذج اتصال وزر WhatsApp مباشر", ru: "Форма обратной связи и прямая кнопка WhatsApp" },
  "On-page SEO & semantic tags": { ar: "تحسين SEO داخل الصفحة والوسوم الدلالية", ru: "Внутренняя SEO-оптимизация и семантическая разметка" },
  "1 year high-speed hosting + SSL included": { ar: "استضافة عالية السرعة لمدة عام وشهادة SSL مشمولة", ru: "Высокоскоростной хостинг на год и SSL включены" },
  "Business Site": { ar: "موقع أعمال", ru: "Бизнес-сайт" },
  "Everything in Pro Showcase included": { ar: "يشمل جميع مزايا الموقع التعريفي الاحترافي", ru: "Включает всё из пакета Pro Showcase" },
  "Up to 5 bespoke premium pages": { ar: "حتى 5 صفحات متميزة مصممة حسب الطلب", ru: "До 5 премиальных страниц по индивидуальному дизайну" },
  "Integrated blog & news module with intuitive CMS": { ar: "مدونة مدمجة وقسم أخبار مع نظام إدارة محتوى سهل", ru: "Встроенный блог и новости с удобной CMS" },
  "Advanced SEO architecture & internal linking": { ar: "بنية SEO متقدمة وروابط داخلية", ru: "Продвинутая SEO-архитектура и внутренняя перелинковка" },
  "Lead capture & qualified quote form": { ar: "نموذج عرض سعر مؤهل وجمع بيانات العملاء المحتملين", ru: "Форма запроса сметы и сбор квалифицированных лидов" },
  "Ultra-fast loading speed (<0.5s)": { ar: "سرعة تحميل فائقة (أقل من 0.5 ثانية)", ru: "Сверхбыстрая загрузка (менее 0,5 с)" },
  "Google Analytics & Search Console setup": { ar: "إعداد Google Analytics وSearch Console", ru: "Настройка Google Analytics и Search Console" },
  "Indicative starting price from €1,499 (custom quote required)": { ar: "سعر إرشادي يبدأ من 1,499 € (يتطلب عرض سعر مخصصًا)", ru: "Ориентировочная цена от 1 499 € (требуется индивидуальная смета)" },
  "Mandatory scoping discussion with a specialist": { ar: "جلسة إلزامية مع مختص لتحديد نطاق المشروع", ru: "Обязательное обсуждение объёма проекта со специалистом" },
  "Everything in Business Site included": { ar: "يشمل جميع مزايا موقع الأعمال", ru: "Включает всё из пакета Business Site" },
  "Unlimited product catalog & inventory management": { ar: "كتالوج منتجات غير محدود وإدارة المخزون", ru: "Неограниченный каталог товаров и управление запасами" },
  "Secure checkout via Card, Apple Pay & Google Pay (Stripe)": { ar: "دفع آمن بالبطاقة وApple Pay وGoogle Pay عبر Stripe", ru: "Безопасная оплата картой, Apple Pay и Google Pay через Stripe" },
  "Online booking module with dynamic calendar": { ar: "نظام حجز عبر الإنترنت مع تقويم تفاعلي", ru: "Модуль онлайн-бронирования с динамическим календарём" },
  "Ultra-smooth mobile checkout journey optimized for conversion": { ar: "مسار شراء سلس على الهاتف ومحسّن للتحويل", ru: "Удобный мобильный путь оформления заказа, оптимизированный для конверсии" },
  "Secure customer account & automated order tracking": { ar: "حساب عميل آمن وتتبع تلقائي للطلبات", ru: "Защищённый аккаунт клиента и автоматическое отслеживание заказов" },
  "Main bespoke logo": { ar: "الشعار الرئيسي المصمم حسب الطلب", ru: "Основной логотип по индивидуальному дизайну" },
  "Essential variations (dark, light, monochrome)": { ar: "نسخ أساسية داكنة وفاتحة وأحادية اللون", ru: "Основные варианты: тёмный, светлый и монохромный" },
  "High-resolution vector files (AI, SVG, PNG, PDF)": { ar: "ملفات متجهة عالية الدقة بصيغ AI وSVG وPNG وPDF", ru: "Векторные файлы высокого разрешения в форматах AI, SVG, PNG и PDF" },
  "Optimized favicon & app icon": { ar: "أيقونة موقع وأيقونة تطبيق محسّنتان", ru: "Оптимизированные фавикон и иконка приложения" },
  "Full commercial usage rights": { ar: "نقل كامل لحقوق الاستخدام التجاري", ru: "Полные права на коммерческое использование" },
  "Brand Identity Kit": { ar: "حزمة الهوية التجارية", ru: "Комплект фирменной айдентики" },
  "Everything in Signature Logo included": { ar: "يشمل جميع مزايا شعار Signature", ru: "Включает всё из пакета Signature Logo" },
  "Luxury color palette (HEX, RGB, CMYK codes)": { ar: "لوحة ألوان فاخرة مع رموز HEX وRGB وCMYK", ru: "Премиальная палитра с кодами HEX, RGB и CMYK" },
  "Premium typography pairing & visual hierarchy": { ar: "اختيار خطوط متميز وتسلسل بصري واضح", ru: "Премиальный подбор шрифтов и визуальная иерархия" },
  "Brand patterns, graphic elements & textures": { ar: "أنماط العلامة وعناصر رسومية وخامات", ru: "Фирменные паттерны, графические элементы и текстуры" },
  "Ready-to-use social media templates (Instagram/LinkedIn)": { ar: "قوالب جاهزة لوسائل التواصل (Instagram وLinkedIn)", ru: "Готовые шаблоны для соцсетей (Instagram/LinkedIn)" },
  "Full Brand Suite": { ar: "حزمة هوية متكاملة", ru: "Полный комплект брендинга" },
  "Everything in Brand Identity Kit included": { ar: "يشمل جميع مزايا حزمة الهوية التجارية", ru: "Включает всё из Brand Identity Kit" },
  "Complete Brand Book & visual identity guidelines (20+ pages PDF)": { ar: "دليل علامة تجارية كامل وإرشادات الهوية (PDF بأكثر من 20 صفحة)", ru: "Полный брендбук и руководство по айдентике (PDF более 20 страниц)" },
  "Luxury stationery kit (business cards, letterheads, invoice templates)": { ar: "حزمة مطبوعات فاخرة تشمل بطاقات العمل والترويسات وقوالب الفواتير", ru: "Премиальный комплект деловой полиграфии: визитки, бланки и шаблоны счетов" },
  "Corporate & animated email signatures pack": { ar: "حزمة توقيعات بريد إلكتروني احترافية ومتحركة", ru: "Комплект корпоративных и анимированных email-подписей" },
  "Dedicated art director support & priority revisions": { ar: "دعم مباشر من مدير فني ومراجعات ذات أولوية", ru: "Персональная поддержка арт-директора и приоритетные правки" },
  "SEO Starter": { ar: "باقة SEO الأساسية", ru: "Базовый SEO-пакет" },
  "Audit & keywords": { ar: "تدقيق وبحث الكلمات المفتاحية", ru: "Аудит и подбор ключевых слов" },
  "On-page optimisation": { ar: "تحسين صفحات الموقع", ru: "Внутренняя оптимизация страниц" },
  "SEO Growth": { ar: "باقة نمو SEO", ru: "SEO Growth" },
  "Everything in Starter": { ar: "يشمل جميع مزايا الباقة الأساسية", ru: "Включает всё из пакета Starter" },
  "Monthly content": { ar: "محتوى شهري", ru: "Ежемесячный контент" },
  "Reporting": { ar: "التقارير", ru: "Отчётность" },
};

function completeServiceTranslations(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(completeServiceTranslations);
    return;
  }
  if (!value || typeof value !== "object") return;
  const entry = value as Record<string, unknown>;
  if (typeof entry.en === "string" && typeof entry.fr === "string") {
    const translated = SERVICE_TEXT_TRANSLATIONS[entry.en];
    if (translated) {
      if (typeof entry.ar !== "string") entry.ar = translated.ar;
      if (typeof entry.ru !== "string") entry.ru = translated.ru;
    }
  }
  Object.values(entry).forEach(completeServiceTranslations);
}

completeServiceTranslations(SERVICES_PART1);
completeServiceTranslations(SERVICES_PART2);

export const CONTACT = {
  email: "contact.xragency@gmail.com",
  whatsapp: "https://wa.me/33767566783",
  phone: "+33 7 67 56 67 83",
  instagram: "https://www.instagram.com/xragency_",
  linkedin: "https://linkedin.com/company/xragency",
  facebook: "",
  tiktok: "",
  cities: "France · Dubaï · Asie · International",
};

export type Plan = {
  name: L;
  audience?: L;
  eur: number;
  period: "once" | "month" | "year";
  features: L[];
  popular?: boolean;
  isQuoteOnly?: boolean;
};

export type ServiceStep = {
  num: string;
  title: L;
  desc: L;
};

export type ServiceDeliverable = {
  title: L;
  desc: L;
};

export type ServiceMetric = {
  metric: string;
  label: L;
  desc: L;
};

export type ServiceComparison = {
  feature: L;
  us: L;
  them: L;
};

export type Service = {
  id: string;
  num: string;
  title: L;
  short: L;
  description: L;
  fromEur: number;
  fromPeriod: "once" | "month" | "year";
  highlights: L[];
  plans: Plan[];
  premium?: boolean;
  steps?: ServiceStep[];
  deliverables?: ServiceDeliverable[];
  metrics?: ServiceMetric[];
  comparisons?: ServiceComparison[];
  serviceFaqs?: { q: L; a: L }[];
};

export const PERIOD_LABEL: Record<Plan["period"], L> = {
  once: { fr: "paiement unique", en: "one-time payment", vi: "thanh toán một lần", ar: "دفعة واحدة", ru: "разовый платёж" },
  month: { fr: "/ mois", en: "/ month", vi: "/ tháng", ar: "/ شهر", ru: "/ месяц" },
  year: { fr: "/ an", en: "/ year", vi: "/ năm", ar: "/ سنة", ru: "/ год" },
};

export const SERVICES: Service[] = [...SERVICES_PART1, ...SERVICES_PART2] as Service[];

export type FaqCategory = "sites" | "seo" | "ads" | "ia" | "tarifs" | "delais" | "general";

export const FAQ: { q: L; a: L; category: FaqCategory }[] = [
  {
    category: "delais",
    q: {
      fr: "Combien de temps faut-il pour créer mon site ?",
      en: "How long does it take to build my website?",
      vi: "Mất bao lâu để hoàn thành website của tôi?",
      ar: "كم من الوقت يستغرق إنشاء موقعي؟",
      ru: "Сколько времени занимает создание сайта?",
    },
    a: {
      fr: "Selon la formule choisie : 7 jours pour un Site Vitrine, 14 jours pour un Site Business et 21 jours pour un E-commerce. Ces délais incluent la conception et les révisions.",
      en: "Depending on the plan: 7 days for a Showcase Site, 14 days for a Business Site and 21 days for an E-commerce site. These timeframes include design and revisions.",
      vi: "Tùy theo gói: 7 ngày cho website giới thiệu, 14 ngày cho website doanh nghiệp và 21 ngày cho thương mại điện tử. Thời gian này đã bao gồm thiết kế và chỉnh sửa.",
      ar: "بحسب الباقة: 7 أيام للموقع التعريفي، و14 يومًا لموقع الأعمال، و21 يومًا لمتجر إلكتروني. تشمل هذه المدد التصميم والمراجعات.",
      ru: "В зависимости от пакета: 7 дней для презентационного сайта, 14 дней для бизнес-сайта и 21 день для интернет-магазина. Сроки включают дизайн и правки.",
    },
  },
  {
    category: "tarifs",
    q: {
      fr: "Les prix affichés sont-ils définitifs ?",
      en: "Are the displayed prices final?",
      vi: "Giá hiển thị có phải là giá cuối cùng không?",
      ar: "هل الأسعار المعروضة نهائية؟",
      ru: "Окончательные ли указанные цены?",
    },
    a: {
      fr: "Les tarifs indiqués sont des prix de départ. Le devis final dépend du périmètre exact (pages, langues, intégrations). Aucun frais caché n'est ajouté après validation du devis.",
      en: "Listed rates are starting prices. The final quote depends on the exact scope (pages, languages, integrations). No hidden fees are added after quote approval.",
      vi: "Mức giá niêm yết là giá khởi điểm. Báo giá cuối phụ thuộc phạm vi cụ thể (trang, ngôn ngữ, tích hợp). Không có phí ẩn sau khi duyệt báo giá.",
      ar: "الأسعار المنشورة هي أسعار بدء. يعتمد العرض النهائي على النطاق الفعلي من صفحات ولغات وتكاملات. لا تتم إضافة رسوم مخفية بعد اعتماد العرض.",
      ru: "Опубликованные цены являются стартовыми. Финальная смета зависит от точного объёма: страниц, языков и интеграций. После согласования сметы скрытые сборы не добавляются.",
    },
  },
  {
    category: "general",
    q: {
      fr: "Travaillez-vous à distance et à l'international ?",
      en: "Do you work remotely and internationally?",
      vi: "Bạn có làm việc từ xa và quốc tế không?",
    },
    a: {
      fr: "Oui. XR Agency accompagne des clients en France, en Asie et à l'international, entièrement à distance, avec des points de suivi réguliers.",
      en: "Yes. XR Agency works with clients in France, Asia and internationally, fully remotely, with regular check-ins.",
      vi: "Có. XR Agency đồng hành với khách hàng tại Pháp, Châu Á và quốc tế, hoàn toàn từ xa, với các buổi cập nhật định kỳ.",
      ar: "نعم. تعمل XR Agency مع عملاء في فرنسا وآسيا ودوليًا عن بُعد بالكامل، مع نقاط متابعة منتظمة.",
      ru: "Да. XR Agency работает с клиентами во Франции, Азии и на международном уровне полностью удалённо, с регулярными точками контроля.",
    },
  },
  {
    category: "general",
    q: {
      fr: "Les droits d'utilisation de mon identité sont-ils inclus ?",
      en: "Are the usage rights to my identity included?",
      vi: "Quyền sử dụng bộ nhận diện có được bao gồm không?",
    },
    a: {
      fr: "Oui. Vous êtes propriétaire de votre identité visuelle : tous les droits d'utilisation commerciale sont cédés à la livraison.",
      en: "Yes. You own your visual identity: all commercial usage rights are transferred on delivery.",
      vi: "Có. Bạn sở hữu bộ nhận diện của mình: toàn bộ quyền sử dụng thương mại được chuyển giao khi bàn giao.",
      ar: "نعم. تصبح الهوية البصرية ملكًا لكم، مع نقل حقوق الاستخدام التجاري عند التسليم.",
      ru: "Да. Вы владеете своей визуальной айдентикой, а коммерческие права передаются при сдаче проекта.",
    },
  },
];

export const SHOWCASE = [
  { id: "xr-pok-n-ball", name: "Pok-N Ball", url: "https://pokebowlfresh.vercel.app/", sectorKey: "sectorGastronomie", services: ["websites"], type: { fr: "site restaurant / commande", en: "restaurant / ordering site", vi: "website nhà hàng / đặt món" }, desc: { fr: "Projet XR Agency : expérience digitale orientée commande et conversion.", en: "XR Agency project focused on ordering and conversion.", vi: "Dự án XR Agency tập trung vào đặt món và chuyển đổi." }, metric: "XR AGENCY · WEBSITE + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://pokebowlfresh.vercel.app/" },
];

export const PORTFOLIO = SHOWCASE.map((s, i) => ({
  plate: String(i + 1).padStart(2, "0"),
  name: s.name,
  sector: s.type,
  result: { fr: s.metric, en: s.metric, vi: s.metric },
  tags: [s.type.en],
  image: s.image,
}));

export const TESTIMONIALS = [];
