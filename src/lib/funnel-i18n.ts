import type { Lang } from "./i18n";

export interface HeroFunnelPill {
  id: string;
  icon: string;
  label: Record<Lang, string>;
  sub: Record<Lang, string>;
  services: string[];
  targetAnchor: string;
}

export const HERO_FUNNEL_PILLS: HeroFunnelPill[] = [
  {
    id: "local_domination",
    icon: "📍",
    label: {
      fr: "Dominer Google & Maps",
      en: "Dominate Google & Maps",
      vi: "Thống trị Google Maps",
      ar: "تصدر خرائط Google محلياً",
      ru: "Топ в Google Maps",
    },
    sub: {
      fr: "Top 3 local + Fiche GMB optimisée",
      en: "Top 3 Local Pack + GMB optimization",
      vi: "Top 3 địa phương + Tối ưu hồ sơ GMB",
      ar: "أفضل 3 نتائج محلية + تحسين حساب Google",
      ru: "Топ-3 района + оформление карточки",
    },
    services: ["maps", "seo", "website"],
    targetAnchor: "#maps",
  },
  {
    id: "ecommerce_sales",
    icon: "💳",
    label: {
      fr: "Ventes & Réservations",
      en: "Sales & Bookings",
      vi: "Doanh số & Đặt phòng/bàn",
      ar: "المبيعات والحجوزات",
      ru: "Продажи и бронирование",
    },
    sub: {
      fr: "Parcours de conversion immédiate",
      en: "High-converting booking flow",
      vi: "Luồng đặt chỗ chuyển đổi cao",
      ar: "مسار حجز ودفع فوري",
      ru: "Быстрый модуль онлайн-заказа",
    },
    services: ["website", "conversion", "social"],
    targetAnchor: "#quote",
  },
  {
    id: "luxury_rebrand",
    icon: "✨",
    label: {
      fr: "Branding Ultra-Luxe",
      en: "Ultra-Luxury Branding",
      vi: "Nhận diện thương hiệu xa xỉ",
      ar: "هوية بصرية فائقة الفخامة",
      ru: "Премиальный брендинг",
    },
    sub: {
      fr: "Identité visuelle & direction artistique",
      en: "Visual identity & art direction",
      vi: "Định hướng nghệ thuật & đẳng cấp",
      ar: "توجيه فني وهوية بصرية راقية",
      ru: "Арт-дирекшн и фирменный стиль",
    },
    services: ["branding", "website", "content"],
    targetAnchor: "#services",
  },
  {
    id: "complete_reboot",
    icon: "⚡",
    label: {
      fr: "Refonte Complète + IA",
      en: "Complete Reboot + AI",
      vi: "Tái cấu trúc toàn diện + AI",
      ar: "تجديد رقمي شامل مع الذكاء الاصطناعي",
      ru: "Полный перезапуск + ИИ",
    },
    sub: {
      fr: "Site sur-mesure + WebCare + Automatisation",
      en: "Bespoke site + WebCare + Robotics",
      vi: "Website may đo + WebCare + Robot",
      ar: "موقع مخصص + WebCare + روبوتات",
      ru: "Сайт под ключ + WebCare + роботы",
    },
    services: ["website", "branding", "seo", "maintenance"],
    targetAnchor: "#quote",
  },
];

export interface SectorCostProfile {
  id: string;
  name: Record<Lang, string>;
  avgTicket: number;
  monthlyLostClients: number;
}

export const SECTOR_COST_PROFILES: SectorCostProfile[] = [
  {
    id: "restaurant",
    name: {
      fr: "Restaurant / Bar / Gastronomie",
      en: "Restaurant / Bar / Fine Dining",
      vi: "Nhà hàng / Bar / Ẩm thực",
      ar: "مطعم / مقهى / ضيافة",
      ru: "Ресторан / бар / гастрономия",
    },
    avgTicket: 55,
    monthlyLostClients: 140,
  },
  {
    id: "hospitality",
    name: {
      fr: "Hôtellerie / Boutique-Hôtel / Séjours",
      en: "Hotels / Boutique Stays / Tourism",
      vi: "Khách sạn / Khu nghỉ dưỡng",
      ar: "فنادق / إقامات فاخرة / سياحة",
      ru: "Отели / бутик-гостиницы / отдых",
    },
    avgTicket: 220,
    monthlyLostClients: 45,
  },
  {
    id: "beauty",
    name: {
      fr: "Institut / Spa / Clinique esthétique",
      en: "Beauty / Spa / Aesthetic Clinic",
      vi: "Thẩm mỹ viện / Spa / Làm đẹp",
      ar: "مركز تجميل / سبا / عيادة",
      ru: "Салон красоты / спа / клиника",
    },
    avgTicket: 95,
    monthlyLostClients: 75,
  },
  {
    id: "realestate",
    name: {
      fr: "Immobilier de prestige / Agence",
      en: "Luxury Real Estate / Brokerage",
      vi: "Bất động sản cao cấp",
      ar: "عقارات فاخرة / وساطة",
      ru: "Элитная недвижимость / агентство",
    },
    avgTicket: 3500,
    monthlyLostClients: 2,
  },
  {
    id: "commerce",
    name: {
      fr: "Boutique / Commerce / Retail",
      en: "Retail Store / Luxury Boutique",
      vi: "Cửa hàng bán lẻ / Boutique",
      ar: "متجر تجزئة / بوتيك فاخر",
      ru: "Бутик / магазин / ритейл",
    },
    avgTicket: 85,
    monthlyLostClients: 110,
  },
  {
    id: "health",
    name: {
      fr: "Cabinet médical / Santé / Dentaire",
      en: "Private Medical / Dental / Health",
      vi: "Phòng khám nha khoa / Y tế",
      ar: "عيادة طبية / أسنان / صحة",
      ru: "Стоматология / медицина / врачи",
    },
    avgTicket: 120,
    monthlyLostClients: 50,
  },
  {
    id: "services",
    name: {
      fr: "Services B2B / Conseil / Droit / Finance",
      en: "B2B Services / Legal / Wealth Management",
      vi: "Dịch vụ B2B / Luật / Tài chính",
      ar: "خدمات شركات / محاماة / مالية",
      ru: "B2B услуги / юридические / финансы",
    },
    avgTicket: 650,
    monthlyLostClients: 15,
  },
];

export const FUNNEL_UI = {
  inaction: {
    eyebrow: {
      fr: "SIMULATEUR DE MANQUE À GAGNER",
      en: "COST OF INACTION SIMULATOR",
      vi: "MÔ PHỎNG CHI PHÍ DO KHÔNG HÀNH ĐỘNG",
      ar: "محاكي تكلفة عدم التحرك",
      ru: "КАЛЬКУЛЯТОР УПУЩЕННОЙ ВЫГОДЫ",
    },
    title: {
      fr: "Combien vous coûte l'absence d'une présence digitale d'élite ?",
      en: "What does the lack of an elite digital presence really cost you?",
      vi: "Việc thiếu vắng hiện diện kỹ thuật số đỉnh cao đang làm bạn mất bao nhiêu?",
      ar: "كم تكلفك حقاً غياب الحضور الرقمي النخبوي؟",
      ru: "Сколько стоит бизнесу отсутствие первоклассного цифрового присутствия?",
    },
    subtitle: {
      fr: "Chaque mois sans top 3 sur Google Maps, sans site rapide et sans conversion optimisée, ces clients choisissent vos concurrents.",
      en: "Every month without a top-3 Maps rank, a lightning-fast site, and optimized UX, these clients choose your competitors.",
      vi: "Mỗi tháng không có top 3 Google Maps, website mượt mà và tối ưu chuyển đổi, những khách hàng này sẽ chọn đối thủ của bạn.",
      ar: "كل شهر يمر دون مراكز أولى في الخرائط وموقع فائق السرعة وتجربة شراء سلسة، يذهب هؤلاء العملاء مباشرة لمنافسيك.",
      ru: "Каждый месяц без топ-3 на картах, быстрого сайта и четкой конверсии эти клиенты уходят к вашим конкурентам.",
    },
    sectorSelectLabel: {
      fr: "Votre secteur d'activité",
      en: "Your industry sector",
      vi: "Lĩnh vực hoạt động",
      ar: "قطاع نشاطك",
      ru: "Ваша сфера деятельности",
    },
    ticketLabel: {
      fr: "Panier ou ticket moyen par client",
      en: "Average basket or spend per client",
      vi: "Giá trị trung bình mỗi khách",
      ar: "متوسط الإنفاق لكل عميل",
      ru: "Средний чек на одного клиента",
    },
    clientsLabel: {
      fr: "Clients qui vous échappent / mois (recherches captées par la concurrence)",
      en: "Missed clients monthly (searches won by competitors)",
      vi: "Khách hàng vuột mất mỗi tháng (vào tay đối thủ)",
      ar: "عملاء يذهبون للمنافسين شهرياً",
      ru: "Упущенных клиентов в месяц (перехвачены конкурентами)",
    },
    monthlyCardTitle: {
      fr: "MANQUE À GAGNER MENSUEL",
      en: "MONTHLY REVENUE DRAIN",
      vi: "TỔN THẤT DOANH THU THÁNG",
      ar: "الخسارة الشهرية التقديرية",
      ru: "УПУЩЕННАЯ ВЫГОДА В МЕСЯЦ",
    },
    annualCardTitle: {
      fr: "MANQUE À GAGNER ANNUEL ESTIMÉ",
      en: "ESTIMATED ANNUAL MISSED REVENUE",
      vi: "TỔN THẤT DOANH THU NĂM ƯỚC TÍNH",
      ar: "إجمالي الخسارة السنوية التقديرية",
      ru: "ГОДОВАЯ УПУЩЕННАЯ ВЫГОДА",
    },
    annualCardSub: {
      fr: "Des dizaines de milliers d'euros captés par des concurrents simplement mieux positionnés.",
      en: "Tens of thousands of euros captured by competitors who are simply better positioned.",
      vi: "Hàng chục ngàn euro rơi vào tay đối thủ chỉ vì họ xuất hiện sớm hơn bạn.",
      ar: "عشرات الآلاف من اليوروهات يستحوذ عليها منافسون فقط لأنهم متواجدون بشكل أفضل.",
      ru: "Десятки тысяч евро забирают конкуренты, которые просто лучше представлены в сети.",
    },
    ctaButton: {
      fr: "Récupérer ces clients avec XR Agency",
      en: "Capture this revenue with XR Agency",
      vi: "Giành lại nhóm khách hàng này cùng XR Agency",
      ar: "استعد هذه الإيرادات مع XR Agency",
      ru: "Вернуть этих клиентов вместе с XR Agency",
    },
    trustNotice: {
      fr: "Estimation indicative basée sur les taux moyens de conversion observés en acquisition locale et web.",
      en: "Indicative estimate based on benchmark conversion rates in local search and digital acquisition.",
      vi: "Ước tính tham khảo dựa trên tỷ lệ chuyển đổi trung bình của thị trường.",
      ar: "تقدير إرشادي مبني على متوسط معدلات التحويل في البحث المحلي والويب.",
      ru: "Ориентировочный расчёт на основе средних показателей конверсии в локальном поиске.",
    },
  },
  rail: {
    hero: { fr: "Vision", en: "Vision", vi: "Tầm nhìn", ar: "الرؤية", ru: "Видение" },
    inaction: { fr: "Impact Financier", en: "Financial Impact", vi: "Tác động tài chính", ar: "الأثر المالي", ru: "Финансы" },
    solutions: { fr: "Solutions", en: "Solutions", vi: "Giải pháp", ar: "الحلول", ru: "Решения" },
    maps: { fr: "Google Maps", en: "Google Maps", vi: "Google Maps", ar: "خرائط Google", ru: "Google Карты" },
    audit: { fr: "Audit Digital", en: "Digital Audit", vi: "Audit số", ar: "التدقيق الرقمي", ru: "Аудит" },
    quote: { fr: "Devis Direct", en: "Instant Quote", vi: "Báo giá nhanh", ar: "عرض سعر", ru: "Смета" },
  },
  sticky: {
    prefix: { fr: "Mon projet :", en: "My project:", vi: "Dự án của tôi:", ar: "مشروعي:", ru: "Мой проект:" },
    from: { fr: "dès", en: "from", vi: "từ", ar: "من", ru: "от" },
    services: { fr: "prestation(s)", en: "service(s)", vi: "dịch vụ", ar: "خدمة / خدمات", ru: "услуг(и)" },
    ctaFinalize: { fr: "Finaliser mon devis", en: "Finalize quote", vi: "Hoàn thiện báo giá", ar: "إتمام العرض", ru: "К смете" },
    ctaWhatsapp: { fr: "WhatsApp direct", en: "WhatsApp Concierge", vi: "WhatsApp trực tiếp", ar: "واتساب مباشر", ru: "WhatsApp" },
    waIntro: {
      fr: "Bonjour Alexandre & l'équipe XR Agency, j'ai configuré mon projet sur le site : ",
      en: "Hello Alexandre & the XR Agency team, I configured my project on your website: ",
      vi: "Xin chào Alexandre và đội ngũ XR Agency, tôi vừa thiết lập dự án trên trang: ",
      ar: "مرحباً ألكسندر وفريق XR Agency، قمت بتحديد مواصفات مشروعي: ",
      ru: "Здравствуйте, Александр и команда XR Agency! Я собрал конфигурацию проекта: ",
    },
  },
  guarantees: {
    eyebrow: {
      fr: "ENGAGEMENTS & TRANSPARENCE",
      en: "COMMITMENTS & TRANSPARENCY",
      vi: "CAM KẾT & MINH BẠCH",
      ar: "الالتزامات والشفافية",
      ru: "ОБЯЗАТЕЛЬСТВА И ПРОЗРАЧНОСТЬ",
    },
    title: {
      fr: "Pourquoi les marques d'élite et les commerces de pointe choisissent XR Agency",
      en: "Why elite brands and ambitious leaders partner with XR Agency",
      vi: "Vì sao các thương hiệu danh tiếng và cơ sở hàng đầu tin tưởng XR Agency",
      ar: "لماذا تختار العلامات المرموقة ورواد الأعمال التعاون مع XR Agency",
      ru: "Почему бренды и лидеры рынка доверяют XR Agency",
    },
    subtitle: {
      fr: "Aucune promesse creuse, aucun verrouillage obscur. Des livrables d'excellence, une gouvernance claire et un contact direct.",
      en: "No empty promises, no lock-in traps. Prestigious deliverables, clear governance, and direct access.",
      vi: "Không lời hứa sáo rỗng, không ràng buộc mập mờ. Bàn giao xuất sắc, quản trị rõ ràng và kết nối trực tiếp.",
      ar: "بلا وعود وهمية أو عقود مقيدة مبهمة. مخرجات رفيعة المستوى، وشفافية كاملة، وتواصل مباشر.",
      ru: "Без пустых обещаний и скрытых ограничений. Премиальный результат, прозрачные условия и прямой контакт.",
    },
    items: [
      {
        icon: "ShieldCheck",
        title: {
          fr: "Diagnostic & Audit 100% offerts",
          en: "100% Complimentary Diagnostic & Audit",
          vi: "Audit & Chẩn đoán 100% miễn phí",
          ar: "تدقيق وتشخيص مجاني 100%",
          ru: "100% бесплатный аудит и диагностика",
        },
        desc: {
          fr: "Aucun engagement. Nous analysons votre écosystème en profondeur avant toute décision d'investissement.",
          en: "Zero obligation. We analyze your digital footprint in detail before any budget commitment.",
          vi: "Hoàn toàn không ràng buộc. Chúng tôi phân tích kỹ hệ sinh thái số trước khi bàn đến ngân sách.",
          ar: "دون أي التزام مسبق. نقوم بتحليل وجودك الرقمي بعمق قبل أي قرار استثماري.",
          ru: "Без обязательств. Мы подробно анализируем ваш бизнес до любых инвестиционных решений.",
        },
      },
      {
        icon: "CheckCircle2",
        title: {
          fr: "Tarifs clairs, zéro frais cachés",
          en: "Crystal-Clear Pricing, Zero Hidden Fees",
          vi: "Bảng giá công khai, không phí ẩn",
          ar: "أسعار واضحة تماماً دون أي رسوم خفية",
          ru: "Фиксированные цены без скрытых доплат",
        },
        desc: {
          fr: "Chaque prestation a un périmètre défini, des jalons précis et un tarif transparent validé en amont.",
          en: "Every engagement comes with explicit deliverables, milestones, and pre-approved transparent pricing.",
          vi: "Mọi dịch vụ đều có khối lượng công việc rõ ràng, mốc thời gian chuẩn và chi phí được duyệt trước.",
          ar: "لكل مرحلة نطاق عمل دقيق وجدول زمني محدد وتكلفة معلنة متفق عليها مسبقاً.",
          ru: "Каждая услуга имеет четкий перечень результатов, сроки и прозрачную стоимость.",
        },
      },
      {
        icon: "KeyRound",
        title: {
          fr: "Propriété intégrale de votre code & données",
          en: "100% Ownership of Your Code & Assets",
          vi: "Toàn quyền sở hữu mã nguồn và tài sản",
          ar: "ملكية كاملة لكود الموقع وكافة الأصول",
          ru: "Полное владение кодом и всеми данными",
        },
        desc: {
          fr: "Vous conservez tous les droits sur votre nom de domaine, votre code source, vos comptes et vos contenus.",
          en: "You retain full legal ownership of your domain, codebase, accounts, visual assets, and analytics.",
          vi: "Bạn sở hữu hoàn toàn tên miền, mã nguồn, tài khoản quản trị và toàn bộ hình ảnh sáng tạo.",
          ar: "تحتفظ بالملكية القانونية الكاملة لنطاقك وكود موقعك وحساباتك وتصميماتك الرقمية.",
          ru: "Вы сохраняете полные права на домен, исходный код, аккаунты и все материалы.",
        },
      },
      {
        icon: "Sparkles",
        title: {
          fr: "Ligne directe Alexandre · Assistant à votre service",
          en: "Direct Line to Alexandre · Assistant at your service",
          vi: "Đường dây trực tiếp Alexandre · Trợ lý phục vụ bạn",
          ar: "خط مباشر مع ألكسندر · مساعد في خدمتكم",
          ru: "Прямой контакт с Александром · Ассистент к вашим услугам",
        },
        desc: {
          fr: "Pas de standard impersonnel : vous échangez directement avec les artisans qui conçoivent votre projet.",
          en: "No impersonal ticket queues: you speak directly with the experts designing and engineering your solution.",
          vi: "Không qua trung gian hỗ trợ: bạn trao đổi trực tiếp với những chuyên gia đang thực hiện dự án.",
          ar: "لا وجود لنظام تذاكر بطيء: تواصل فوري ومباشر مع الخبراء القائمين على بناء مشروعك.",
          ru: "Никаких шаблонных тикетов: прямое общение с экспертами, которые создают ваш проект.",
        },
      },
    ],
  },
} as const;
