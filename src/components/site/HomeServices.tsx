import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { XR_PHOTOS } from "@/lib/photography";
import { useFunnel } from "@/lib/funnel";

const FUNNEL_SERVICE_BTN: Record<Lang, { added: string; add: string }> = {
  fr: { added: "✓ Dans votre devis", add: "+ Ajouter au devis" },
  en: { added: "✓ In your quote", add: "+ Add to quote" },
  vi: { added: "✓ Đã thêm vào báo giá", add: "+ Thêm vào báo giá" },
  ar: { added: "✓ مضاف إلى عرض السعر", add: "+ أضف إلى العرض" },
  ru: { added: "✓ В вашей смете", add: "+ Добавить в смету" },
};

export const ORDERED_SERVICES = [
  {
    id: "websites",
    funnelId: "website",
    num: "01",
    tag: {
      fr: "01 · UNIVERS WEB · HAUTE COUTURE",
      en: "01 · WEB UNIVERSE · HAUTE COUTURE",
      vi: "01 · VŨ TRỤ WEB · ĐỈNH CAO",
      ar: "01 · عالم الويب · راقٍ ومميز",
      ru: "01 · WEB-ВСЕЛЕННАЯ · ПРЕМИУМ",
    },
    title: {
      fr: "Sites Vitrines, Business & E-Commerce",
      en: "Showcase, Business & E-Commerce Websites",
      vi: "Website Giới Thiệu, Doanh Nghiệp & E-Commerce",
      ar: "مواقع تعريفية، تجارية وتجارة إلكترونية",
      ru: "Сайты-визитки, корпоративные и E-Commerce",
    },
    desc: {
      fr: "Architecture ultra-rapide (<0.4s), mobile-first, design 100% exclusif et formulaires de conversion connectés.",
      en: "Ultra-fast architecture (<0.4s), mobile-first, 100% bespoke design and connected conversion funnels.",
      vi: "Kiến trúc siêu tốc (<0.4s), mobile-first, thiết kế độc bản 100% và biểu mẫu chuyển đổi tối ưu.",
      ar: "بنية فائقة السرعة (<0.4 ثانية)، متوافقة مع الجوال، تصميم حصري 100% ونماذج تحويل ذكية.",
      ru: "Сверхбыстрая загрузка (<0.4с), mobile-first, 100% уникальный дизайн и умные формы конверсии.",
    },
    deliverables: {
      fr: [
        "Temps de chargement < 0.4s & SEO technique natif",
        "Design sur-mesure exclusif sans templates génériques",
        "CMS moderne & passerelles de paiement Stripe intégrées",
      ],
      en: [
        "Load time < 0.4s & native technical SEO",
        "Bespoke design without generic templates",
        "Modern CMS & Stripe payment gateways integrated",
      ],
      vi: [
        "Tốc độ tải < 0.4s & chuẩn SEO kỹ thuật",
        "Thiết kế độc bản, nói không với template đại trà",
        "Hệ thống CMS hiện đại & tích hợp thanh toán Stripe",
      ],
      ar: [
        "سرعة تحميل أقل من 0.4 ثانية وSEO تقني أصيل",
        "تصميم خاص حصري بدون قوالب جاهزة مكررة",
        "لوحة تحكم حديثة وبوابات دفع Stripe متكاملة",
      ],
      ru: [
        "Загрузка < 0.4с и встроенное техническое SEO",
        "Индивидуальный дизайн без шаблонных решений",
        "Современная CMS и интеграция оплат через Stripe",
      ],
    },
    accent: "#c5a880",
    photo: XR_PHOTOS.websites,
    href: "/services/websites",
    priceDisplay: "Dès 499 €",
    colSpan: "lg:col-span-8",
  },
  {
    id: "maps",
    funnelId: "maps",
    num: "02",
    tag: {
      fr: "02 · GOOGLE MAPS · PACK LOCAL #1",
      en: "02 · GOOGLE MAPS · LOCAL 3-PACK #1",
      vi: "02 · VŨ TRỤ MAPS · TOP 1 ĐỊA PHƯƠNG",
      ar: "02 · عالم MAPS · المركز الأول محلياً",
      ru: "02 · MAPS-ВСЕЛЕННАЯ · ТОП-1 НА КАРТАХ",
    },
    title: {
      fr: "Domination Google Maps & Fiches Certifiées",
      en: "Google Maps Domination & Verified Profiles",
      vi: "Thống Lĩnh Google Maps & Hồ Sơ Xác Thực",
      ar: "تصدر خرائط Google وتوثيق الأنشطة",
      ru: "Лидерство в Google Maps и верификация",
    },
    desc: {
      fr: "Placement dans le Top 3 Pack Local Google et capture immédiate des recherches de proximité géolocalisées.",
      en: "Placement in Google's Local 3-Pack and immediate capture of nearby localized searches.",
      vi: "Đưa doanh nghiệp vào Top 3 Google Maps và tiếp cận khách hàng xung quanh ngay lập tức.",
      ar: "التواجد في الثلاثي الأول لخرائط Google واجتذاب العملاء المحليين على الفور.",
      ru: "Вывод в ТОП-3 локальной выдачи Google Maps и мгновенный захват локального трафика.",
    },
    deliverables: {
      fr: [
        "Gestion & fiches certifiées dès 99 € / mois",
        "Formule Domination agressive Top 3 à 159 € / mois",
        "Collecte d'avis 5★ & plaque comptoir QR / NFC offerte",
      ],
      en: [
        "Management & verified listing from €99 / month",
        "Aggressive Top 3 Domination plan at €159 / month",
        "5★ review collection & complimentary NFC/QR plaque",
      ],
      vi: [
        "Quản lý & hồ sơ xác thực từ 99 € / tháng",
        "Gói Thống lĩnh Top 3 bứt phá chỉ 159 € / tháng",
        "Thu thập đánh giá 5★ & tặng bảng quét NFC/QR",
      ],
      ar: [
        "إدارة وتوثيق الحساب ابتداءً من 99 € / شهر",
        "باقة تصدر أفضل 3 نتائج بقوة بـ 159 € / شهر",
        "جمع تقييمات 5 نجوم ولوحة QR/NFC مجانية",
      ],
      ru: [
        "Ведение и оптимизация профиля от 99 € / месяц",
        "Тариф Топ-3 Доминирование за 159 € / месяц",
        "Сбор 5★ отзывов и стойка NFC/QR в подарок",
      ],
    },
    accent: "#ea4335",
    photo: XR_PHOTOS.maps,
    href: "/services/maps",
    priceDisplay: "Dès 99 € / mois",
    colSpan: "lg:col-span-4",
  },
  {
    id: "social",
    funnelId: "social",
    num: "03",
    tag: {
      fr: "03 · SOCIAL MEDIA · TOURNAGES & REELS 4K",
      en: "03 · SOCIAL MEDIA · 4K VIDEO PRODUCTION",
      vi: "03 · MẠNG XÃ HỘI · SẢN XUẤT REELS 4K",
      ar: "03 · التواصل الاجتماعي · إنتاج 4K",
      ru: "03 · СОЦСЕТИ · 4K-ПРОДАКШН И REELS",
    },
    title: {
      fr: "Tournages Cinéma 4K & Reels Viraux",
      en: "4K Cinema Shoots & Viral Reels",
      vi: "Quay Phim Điện Ảnh 4K & Reels Triệu View",
      ar: "تصوير سينمائي 4K وريلز عالية الانتشار",
      ru: "Кинематографичные съемки 4K и вирусные Reels",
    },
    desc: {
      fr: "Tournages physiques sur site avec matériel cinéma et montage vertical optimisé pour la rétention et l'acquisition.",
      en: "On-site physical shoots with cinema gear and vertical editing tailored for retention and customer acquisition.",
      vi: "Quay thực tế tại doanh nghiệp với máy quay điện ảnh và dựng video ngắn tối ưu chuyển đổi.",
      ar: "تصوير ميداني بمعدات سينمائية ومونتاج عمودي عالي الجودة لزيادة المتابعين والمبيعات.",
      ru: "Выездные съемки на кинокамеры и вертикальный монтаж с высокой вовлекаемостью.",
    },
    deliverables: {
      fr: [
        "Tournage sur site avec caméras cinéma & éclairage pro",
        "Montage vertical dynamique 4K (TikTok, Reels, Shorts)",
        "Calendrier éditorial & stratégie d'acquisition mensuelle",
      ],
      en: [
        "On-site filming with cinema cameras & professional lighting",
        "Dynamic 4K vertical editing (TikTok, Reels, Shorts)",
        "Monthly editorial calendar & acquisition strategy",
      ],
      vi: [
        "Quay tại địa điểm với máy quay & ánh sáng chuyên nghiệp",
        "Dựng video dọc 4K sống động (TikTok, Reels, Shorts)",
        "Kế hoạch nội dung & chiến lược tăng trưởng định kỳ",
      ],
      ar: [
        "تصوير بموقعك بكاميرات سينمائية وإضاءة احترافية",
        "مونتاج عمودي 4K ديناميكي (TikTok, Reels, Shorts)",
        "جدول نشر استراتيجي شهري يستهدف زيادة المبيعات",
      ],
      ru: [
        "Съемки на вашей локации с профессиональным светом",
        "Динамичный 4K монтаж (TikTok, Reels, Shorts)",
        "Контент-план и стратегия привлечения клиентов",
      ],
    },
    accent: "#f43f5e",
    photo: XR_PHOTOS.social,
    href: "/services/social",
    priceDisplay: "Dès 349 € / mois",
    colSpan: "lg:col-span-4",
  },
  {
    id: "branding",
    funnelId: "branding",
    num: "04",
    tag: {
      fr: "04 · BRANDING · IDENTITÉ DE PRESTIGE",
      en: "04 · BRANDING · PRESTIGE IDENTITY",
      vi: "04 · THƯƠNG HIỆU · NHẬN DIỆN CAO CẤP",
      ar: "04 · الهوية البصرية · لمسة راقية",
      ru: "04 · БРЕНДИНГ · ПРЕМИАЛЬНЫЙ СТИЛЬ",
    },
    title: {
      fr: "Direction Artistique & Brand Book",
      en: "Art Direction & Brand Book",
      vi: "Chỉ Đạo Nghệ Thuật & Brand Book",
      ar: "إخراج فني ودليل الهوية البصرية",
      ru: "Арт-дирекция и Brand Book",
    },
    desc: {
      fr: "Création de marques mémorables : logotypes vectoriels, palette chromatique et papeterie d'art de luxe.",
      en: "Creating unforgettable brands: vector logos, distinctive color palettes and luxury corporate stationery.",
      vi: "Kiến tạo thương hiệu ấn tượng: logo vector, bảng màu độc quyền và bộ ấn phẩm văn phòng sang trọng.",
      ar: "صناعة علامات تجارية ترسخ في الذهن: شعارات متجهة، ألوان متناسقة ومطبوعات فاخرة.",
      ru: "Создание запоминающихся брендов: векторные логотипы, палитра и премиальная полиграфия.",
    },
    deliverables: {
      fr: [
        "Logotype vectoriel complet (AI, SVG, PNG) & typographies",
        "Brand Book complet avec règles d'usage et codes couleurs",
        "Cession totale 100% des droits de propriété intellectuelle",
      ],
      en: [
        "Complete vector logotype (AI, SVG, PNG) & brand fonts",
        "Comprehensive Brand Book with usage guidelines & palette",
        "100% full transfer of intellectual property rights",
      ],
      vi: [
        "Bộ logo vector đầy đủ (AI, SVG, PNG) & font chữ thương hiệu",
        "Brand Book chi tiết quy chuẩn sử dụng & mã màu",
        "Chuyển giao 100% quyền sở hữu trí tuệ",
      ],
      ar: [
        "شعار متجه كامل بكافة الصيغ والخطوط الحصرية",
        "دليل هوية متكامل يحدد قواعد الاستخدام والألوان",
        "تنازل كامل 100% عن حقوق الملكية الفكرية",
      ],
      ru: [
        "Векторный логотип во всех форматах и шрифты",
        "Полный Brand Book с правилами использования",
        "100% передача всех авторских прав",
      ],
    },
    accent: "#f59e0b",
    photo: XR_PHOTOS.branding,
    href: "/services/branding",
    priceDisplay: "Dès 199 €",
    colSpan: "lg:col-span-4",
  },
  {
    id: "seo",
    funnelId: "seo",
    num: "05",
    tag: {
      fr: "05 · SEO · AUTORITÉ & TOP POSITIONS",
      en: "05 · SEO · AUTHORITY & TOP RANKINGS",
      vi: "05 · SEO · UY TÍN & THỨ HẠNG ĐẦU",
      ar: "05 · تحسين محركات البحث · الصدارة",
      ru: "05 · SEO · АВТОРИТЕТ И ТОП-ПОЗИЦИИ",
    },
    title: {
      fr: "Référencement Naturel & Autorité Google",
      en: "Organic SEO & Google Authority",
      vi: "Tối Ưu SEO & Thăng Hạng Google",
      ar: "السيو العضوي واكتساب ثقة محركات البحث",
      ru: "Органическое SEO и авторитет в Google",
    },
    desc: {
      fr: "Positionnement pérenne sur les mots-clés stratégiques à haute valeur commerciale sans dépendance publicitaire.",
      en: "Sustainable rankings on high-intent commercial keywords without recurring ad reliance.",
      vi: "Đạt thứ hạng bền vững cho từ khóa sinh lời cao mà không phụ thuộc vào tiền quảng cáo.",
      ar: "تصدر دائم للكلمات المفتاحية ذات القيمة التجارية العالية بدون إعلانات مدفوعة.",
      ru: "Стабильные позиции по целевым коммерческим запросам без переплат за рекламу.",
    },
    deliverables: {
      fr: [
        "Audit sémantique, technique et concurrentiel approfondi",
        "Cocons sémantiques ciblés et optimisation on-page",
        "Netlinking d'autorité & rapports mensuels de positions",
      ],
      en: [
        "In-depth semantic, technical and competitive audit",
        "Targeted topical clusters and on-page optimization",
        "High-authority netlinking & monthly ranking reports",
      ],
      vi: [
        "Audit toàn diện ngữ nghĩa, kỹ thuật và đối thủ cạnh tranh",
        "Cụm chủ đề ngữ nghĩa và tối ưu trang chi tiết",
        "Xây dựng backlink uy tín & báo cáo thứ hạng định kỳ",
      ],
      ar: [
        "تدقيق دلالي وتقني وتحليل شامل للمنافسين",
        "هيكلة المحتوى وتحديثات مستمرة داخل الموقع",
        "روابط خلفية قوية وتقارير أداء دورية شفافة",
      ],
      ru: [
        "Глубокий технический, семантический и конкурентный аудит",
        "Семантические кластеры и внутренняя оптимизация страниц",
        "Качественный линкбилдинг и прозрачные отчеты по позициям",
      ],
    },
    accent: "#8b5cf6",
    photo: XR_PHOTOS.seo,
    href: "/services/seo",
    priceDisplay: "Dès 299 € / mois",
    colSpan: "lg:col-span-4",
  },
  {
    id: "maintenance",
    funnelId: "maintenance",
    num: "06",
    tag: {
      fr: "06 · WEBCARE · SÉCURITÉ & ASTREINTE 24/7",
      en: "06 · WEBCARE · 24/7 CYBER SECURITY & SUPPORT",
      vi: "06 · WEBCARE · AN TOÀN & HỖ TRỢ 24/7",
      ar: "06 · رعاية المواقع · أمان ودعم 24/7",
      ru: "06 · WEBCARE · КРУГЛОСУТОЧНАЯ БЕЗОПАСНОСТЬ",
    },
    title: {
      fr: "Maintenance Proactive & Cyber-Sécurité",
      en: "Proactive WebCare & Cyber Security",
      vi: "Bảo Trì Chủ Động & An Ninh Mạng",
      ar: "صيانة وقائية وأمن سيبراني متقدم",
      ru: "Проактивная поддержка и киберзащита",
    },
    desc: {
      fr: "Protection continue contre les pannes, sauvegardes cloud automatiques et assistance technique dédiée en temps réel.",
      en: "Continuous downtime protection, automated cloud backups and dedicated real-time technical support.",
      vi: "Bảo vệ hoạt động liên tục, sao lưu đám mây tự động và đội ngũ kỹ thuật phản hồi tức thì.",
      ar: "حماية مستمرة من الأعطال، نسخ احتياطي سحابي تلقائي ودعم فني مخصص في الوقت الفعلي.",
      ru: "Защита от сбоев, регулярные бэкапы в облако и оперативная техподдержка.",
    },
    deliverables: {
      fr: [
        "Mises à jour hebdomadaires sécurisées & sauvegardes cloud",
        "Pare-feu WAF, surveillance anti-intrusion & monitoring 24/7",
        "Interventions d'urgence garanties sous 2 à 4 heures",
      ],
      en: [
        "Secure weekly updates & daily automated cloud backups",
        "WAF firewall, intrusion monitoring & 24/7 uptime check",
        "Emergency incident resolution within 2 to 4 hours",
      ],
      vi: [
        "Cập nhật an toàn hàng tuần & sao lưu đám mây tự động",
        "Tường lửa WAF, giám sát xâm nhập & đo lường 24/7",
        "Xử lý sự cố khẩn cấp trong vòng 2 đến 4 giờ",
      ],
      ar: [
        "تحديثات أمنية أسبوعية ونسخ احتياطي سحابي يومي",
        "جدار حماية WAF ومراقبة مستمرة على مدار الساعة",
        "تدخل فوري للطوارئ في غضون ساعتين إلى 4 ساعات",
      ],
      ru: [
        "Безопасные еженедельные апдейты и облачные бэкапы",
        "Файрвол WAF, мониторинг атак и аптайма 24/7",
        "Гарантированное устранение инцидентов за 2–4 часа",
      ],
    },
    accent: "#0ea5e9",
    photo: XR_PHOTOS.maintenance,
    href: "/services/webcare",
    priceDisplay: "Dès 29 € / mois",
    colSpan: "lg:col-span-6",
  },
  {
    id: "robotics",
    funnelId: "robotics",
    num: "07",
    tag: {
      fr: "07 · IA & ROBOTIQUE · ROBOTS DE SERVICE KORBEN",
      en: "07 · AI & ROBOTICS · KORBEN SERVICE ROBOTS",
      vi: "07 · AI & ROBOT · ROBOT PHỤC VỤ KORBEN",
      ar: "07 · الذكاء الاصطناعي · روبوتات الخدمة KORBEN",
      ru: "07 · ИИ И РОБОТЫ · СЕРВИСНЫЕ РОБОТЫ KORBEN",
    },
    title: {
      fr: "Robots de Service Autonomes & Agents IA",
      en: "Autonomous Service Robots & AI Agents",
      vi: "Robot Dịch Vụ Tự Hành & Trợ Lý AI",
      ar: "روبوتات الخدمة الذاتية ووكلاء الذكاء الاصطناعي",
      ru: "Автономные сервисные роботы и ИИ-агенты",
    },
    desc: {
      fr: "Automatisation concrète pour l'hôtellerie, restauration et espaces commerciaux avec les robots autonomes Korben.",
      en: "Tangible automation for hospitality, restaurants and commercial venues with autonomous Korben robots.",
      vi: "Tự động hóa đột phá cho nhà hàng, khách sạn và mặt bằng kinh doanh với robot tự hành Korben.",
      ar: "أتمتة فعلية لقطاع الضيافة والمطاعم والمتاجر الكبرى عبر روبوتات Korben الذاتية.",
      ru: "Реальная автоматизация для ресторанов, отелей и ритейла с роботами Korben.",
    },
    deliverables: {
      fr: [
        "Déploiement physique des robots Korben sur votre établissement",
        "Programmation des trajectoires, accueil & distribution autonome",
        "Maintenance matérielle complète & formation du personnel",
      ],
      en: [
        "Physical deployment of Korben robots in your venue",
        "Custom path programming, greeting & autonomous delivery",
        "Full hardware maintenance & on-site staff training",
      ],
      vi: [
        "Bàn giao & cài đặt robot Korben trực tiếp tại cơ sở",
        "Lập trình đường đi, chào khách và vận chuyển tự động",
        "Bảo trì thiết bị định kỳ & hướng dẫn nhân viên",
      ],
      ar: [
        "تشغيل ونشر ميداني لروبوتات Korben في منشأتك",
        "برمجة مسارات الحركة والترحيب بالزوار وخدمة التوصيل",
        "صيانة دورية متكاملة وتدريب طاقم العمل",
      ],
      ru: [
        "Установка и запуск роботов Korben на вашем объекте",
        "Программирование маршрутов, встреча гостей и доставка",
        "Полное сервисное обслуживание и обучение персонала",
      ],
    },
    accent: "#d4af37",
    photo: XR_PHOTOS.robotics,
    href: "/services/robotique",
    priceDisplay: "499 € / mois",
    colSpan: "lg:col-span-6",
  },
] as const;

const SECTION_COPY = {
  fr: {
    eyebrow: "07 EXPERTISES · ÉCOSYSTÈME STRATÉGIQUE D'ACQUISITION",
    title: "Nos 7 Expertises d'Élite",
    titleAccent: "Sélectionnez votre levier commercial.",
    lead: "Des livrables transparents, des garanties contractuelles et une exécution de prestige. Chaque service s'intègre harmonieusement dans votre stratégie de conversion.",
    from: "Tarif",
    open: "Découvrir l'offre",
    configure: "Configurer mon pack sur mesure",
  },
  en: {
    eyebrow: "07 DISCIPLINES · COMPLETE STRATEGIC ACQUISITION ECOSYSTEM",
    title: "Our 7 Elite Disciplines",
    titleAccent: "Select your commercial growth lever.",
    lead: "Transparent deliverables, contractual guarantees and bespoke craftsmanship. Each discipline seamlessly contributes to your bottom-line conversion.",
    from: "Pricing",
    open: "Explore service",
    configure: "Configure my custom package",
  },
  vi: {
    eyebrow: "07 CHUYÊN MÔN · HỆ SINH THÁI TĂNG TRƯỞNG CHIẾN LƯỢC",
    title: "7 Dịch Vụ Đỉnh Cao Của XR Agency",
    titleAccent: "Chọn đòn bẩy phát triển kinh doanh.",
    lead: "Hạng mục bàn giao minh bạch, cam kết chuẩn mực và chất lượng thi công hàng đầu cho thương hiệu của bạn.",
    from: "Bảng giá",
    open: "Chi tiết dịch vụ",
    configure: "Cấu hình gói theo yêu cầu",
  },
  ar: {
    eyebrow: "07 مجالات تخصص · منظومة استراتيجية متكاملة للنمو",
    title: "خدماتنا السبع النخبوية",
    titleAccent: "اختر ركيزة انطلاقك التجاري.",
    lead: "مخرجات واضحة وشفافة، ضمانات موثقة وتنفيذ رفيع المستوى لكل محور من محاور نموك الرقمي.",
    from: "السعر",
    open: "تفاصيل الخدمة",
    configure: "تكوين باقتي المخصصة",
  },
  ru: {
    eyebrow: "07 КОМПЕТЕНЦИЙ · ПОЛНАЯ ЭКОСИСТЕМА ПРОДАЖ",
    title: "7 Премиальных Услуг XR Agency",
    titleAccent: "Выберите точку коммерческого роста.",
    lead: "Прозрачные результаты, договорные гарантии и безупречное качество исполнения для каждого этапа масштабирования.",
    from: "Стоимость",
    open: "Подробнее",
    configure: "Собрать индивидуальный пакет",
  },
};

function ServiceLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (id === "robotics") {
    return (
      <Link to="/services/robotique" className={className}>
        {children}
      </Link>
    );
  }
  if (id === "maintenance") {
    return (
      <Link to="/services/webcare" className={className}>
        {children}
      </Link>
    );
  }
  if (id === "seo") {
    return (
      <Link to="/services/seo" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/services/$serviceId" params={{ serviceId: id }} className={className}>
      {children}
    </Link>
  );
}

export function HomeServices() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const copy = SECTION_COPY[currentLang] ?? SECTION_COPY.fr;

  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }

  return (
    <section
      id="services"
      data-section="homepage-services"
      className="relative overflow-hidden border-t border-[#101114]/10 bg-[#f8f6f0] py-16 sm:py-24 text-[#101114]"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(197, 168, 128, 0.12), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(16, 17, 20, 0.05), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b704f]/30 bg-white/70 px-4 py-1.5 shadow-xs backdrop-blur-md mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b704f]" />
            <span className="label-mono text-[7.5px] sm:text-[8.5px] font-semibold tracking-[.24em] text-[#554b3e] uppercase">
              {copy.eyebrow}
            </span>
          </div>

          <h2 className="display-serif text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#101114] [text-wrap:balance]">
            {copy.title} · <span className="italic font-light text-[#8b704f]">{copy.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5c5347] sm:text-[15.5px]">
            {copy.lead}
          </p>
        </div>

        {/* Compact & Editorial Bento Grid Showcase */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {ORDERED_SERVICES.map((item) => {
            const isSelected = funnel?.selectedServices.includes(item.funnelId) ?? false;

            return (
              <article
                key={item.id}
                id={`services-${item.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-[#101114]/10 bg-white/85 p-5 sm:p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#8b704f]/40 hover:shadow-xl ${item.colSpan}`}
              >
                {/* Visual Header with Real Photography */}
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#101114]/10 bg-[#12100e] mb-5">
                    <img
                      src={item.photo}
                      alt={item.title[currentLang] ?? item.title.fr}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Tag Pill on Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 label-mono text-[7px] sm:text-[7.5px] font-semibold uppercase tracking-[.18em] text-[#e8d5b5] backdrop-blur-md">
                        {item.tag[currentLang] ?? item.tag.fr}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 label-mono text-[7.5px] font-bold text-white backdrop-blur-md border border-white/20">
                        {item.priceDisplay}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="display-serif text-lg sm:text-xl font-medium text-white tracking-tight drop-shadow-md">
                        {item.title[currentLang] ?? item.title.fr}
                      </h3>
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#5a5246] mb-4">
                    {item.desc[currentLang] ?? item.desc.fr}
                  </p>

                  {/* 3 Concrete Deliverables (No Cartoon Mockups) */}
                  <div className="space-y-2 border-t border-[#101114]/10 pt-3.5 mb-5">
                    {(item.deliverables[currentLang] ?? item.deliverables.fr).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#2b2721]">
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#8b704f]/15 text-[#8b704f]">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[11.5px] leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions: Quick Add to Quote + Explore Service */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[#101114]/10">
                  <button
                    type="button"
                    onClick={() => funnel?.toggleService(item.funnelId)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 label-mono text-[8px] font-bold uppercase tracking-[.1em] transition-all duration-300 ${
                      isSelected
                        ? "border-emerald-600/60 bg-emerald-600/15 text-emerald-800"
                        : "border-[#101114]/15 bg-white text-[#171512] hover:border-[#8b704f] hover:bg-[#8b704f]/10"
                    }`}
                  >
                    {isSelected
                      ? FUNNEL_SERVICE_BTN[currentLang]?.added ?? "✓ Dans votre devis"
                      : FUNNEL_SERVICE_BTN[currentLang]?.add ?? "+ Ajouter au devis"}
                  </button>

                  <ServiceLink
                    id={item.id}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8b704f] hover:text-[#5e4b33] transition"
                  >
                    <span>{copy.open}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </ServiceLink>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Bottom Funnel Callout */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-[#8b704f]/30 bg-gradient-to-r from-[#171512] via-[#221f1b] to-[#171512] p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
            <div>
              <span className="label-mono text-[7.5px] sm:text-[8px] uppercase tracking-[.22em] text-[#d0a66e]">
                ACCOMPAGNEMENT STRATÉGIQUE GLOBAL
              </span>
              <h3 className="display-serif mt-1 text-xl sm:text-2xl text-white font-medium">
                Vous hésitez entre plusieurs leviers pour votre marque ?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/70 max-w-xl">
                Configurez votre devis complet en 2 minutes ou échangez directement avec Alexandre pour définir votre feuille de route.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="#quote"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f8f6f0] px-6 py-2.5 text-[9.5px] font-bold uppercase tracking-[.1em] text-[#171512] transition hover:bg-white hover:scale-105"
              >
                {copy.configure}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="tel:+33767566783"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[9.5px] font-semibold uppercase tracking-[.1em] text-white transition hover:bg-white/15"
              >
                +33 7 67 56 67 83
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
