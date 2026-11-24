import {
  ArrowRight,
  Bot,
  Check,
  Globe2,
  MapPin,
  Monitor,
  Palette,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { XR_PHOTOS } from "@/lib/photography";

const svcWeb = XR_PHOTOS.websites;
const svcBrand = XR_PHOTOS.branding;
const svcSeo = XR_PHOTOS.seo;
const svcMaps = XR_PHOTOS.maps;
const svcSocial = XR_PHOTOS.social;
const svcMaint = XR_PHOTOS.maintenance;
const svcRobot = "/showcase/atlas-o2-studio.jpg";

interface Expertise {
  id: string;
  num: string;
  image: string;
  icon: typeof Monitor;
  href: string;
  price: string;
  title: Record<Lang, string>;
  sub: Record<Lang, string>;
  points: Record<Lang, string[]>;
}

const VISUAL_CONFIG: Record<
  string,
  { tag: string; badge: string; title: string; subtitle: string }
> = {
  websites: {
    tag: "WEB DESIGN & DIGITAL PRODUCT",
    badge: "SUR MESURE",
    title: "Architecture & expérience web",
    subtitle: "Sites vitrines · E-commerce · Réservation",
  },
  branding: {
    tag: "DIRECTION ARTISTIQUE",
    badge: "IDENTITÉ VISUELLE",
    title: "Identité de marque & système graphique",
    subtitle: "Logo · Typographies · Supports de marque",
  },
  seo: {
    tag: "SEO & CONTENU",
    badge: "VISIBILITÉ ORGANIQUE",
    title: "Référencement naturel",
    subtitle: "Audit technique · Contenu · Optimisation",
  },
  maps: {
    tag: "GOOGLE BUSINESS PROFILE",
    badge: "VISIBILITÉ LOCALE",
    title: "Présence locale & fiche établissement",
    subtitle: "Profil · Informations · Contenus · Avis",
  },
  social: {
    tag: "STRATÉGIE SOCIAL MEDIA",
    badge: "CONTENU & COMMUNAUTÉ",
    title: "Création de contenus & animation",
    subtitle: "Direction artistique · Calendrier · Publication",
  },
  maintenance: {
    tag: "WEBCARE & MAINTENANCE",
    badge: "SUIVI TECHNIQUE",
    title: "Maintenance & accompagnement web",
    subtitle: "Mises à jour · Sauvegardes · Support selon formule",
  },
  robotics: {
    tag: "IA & ROBOTIQUE",
    badge: "SOLUTIONS INTÉGRÉES",
    title: "Automatisation & robotique de service",
    subtitle: "Étude · Intégration · Accompagnement",
  },
};

function ExpertiseVisual({ id, image, title }: { id: string; image: string; title: string }) {
  const cfg = VISUAL_CONFIG[id] ?? {
    tag: "EXPERTISE XR",
    badge: "ACCOMPAGNEMENT",
    title,
    subtitle: "Une approche adaptée à votre projet",
  };

  return (
    <div className="group/visual relative aspect-[16/11] w-full overflow-hidden rounded-[1.5rem] border border-[#E7DFC6] bg-[#141210]">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/visual:scale-[1.035]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120F0C]/85 via-[#120F0C]/15 to-transparent" />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
        <span className="max-w-[70%] truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[#F2D7B0]">
          {cfg.tag}
        </span>
        <span className="rounded-full border border-white/30 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/90 backdrop-blur">
          {cfg.badge}
        </span>
      </div>
      <div className="absolute inset-x-5 bottom-5 text-white">
        <h4 className="font-serif text-xl leading-tight sm:text-2xl">{cfg.title}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-white/75 sm:text-sm">{cfg.subtitle}</p>
      </div>
    </div>
  );
}

const SECTION_COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    included: string;
    choose: string;
    detail: string;
    advice: string;
    adviceTitle: string;
    adviceBody: string;
    quote: string;
    whatsapp: string;
  }
> = {
  fr: {
    eyebrow: "NOS EXPERTISES",
    title: "Une offre complète pour votre",
    accent: "croissance.",
    intro:
      "De la stratégie de marque à la visibilité et aux outils numériques, nous réunissons les expertises utiles à votre projet.",
    included: "Exemples d’intervention",
    choose: "Choisir cette expertise",
    detail: "Voir les offres & tarifs",
    advice: "CONSEIL & ACCOMPAGNEMENT",
    adviceTitle: "Vous hésitez sur la bonne combinaison ?",
    adviceBody: "Présentez-nous votre objectif : nous vous aiderons à cadrer les services adaptés.",
    quote: "Configurer mon devis",
    whatsapp: "Échanger sur WhatsApp",
  },
  en: {
    eyebrow: "OUR EXPERTISE",
    title: "A complete digital offer for your",
    accent: "growth.",
    intro:
      "From brand strategy to visibility and digital tools, we bring together the expertise your project needs.",
    included: "Areas of support",
    choose: "Choose this expertise",
    detail: "View plans & pricing",
    advice: "ADVICE & SUPPORT",
    adviceTitle: "Not sure which services fit?",
    adviceBody: "Tell us about your goal and we’ll help define the right scope.",
    quote: "Build my quote",
    whatsapp: "Chat on WhatsApp",
  },
  vi: {
    eyebrow: "CHUYÊN MÔN CỦA CHÚNG TÔI",
    title: "Giải pháp số toàn diện cho",
    accent: "tăng trưởng.",
    intro:
      "Từ chiến lược thương hiệu đến khả năng hiển thị và công cụ số, chúng tôi kết hợp chuyên môn phù hợp với dự án của bạn.",
    included: "Phạm vi hỗ trợ",
    choose: "Chọn chuyên môn này",
    detail: "Xem gói & giá",
    advice: "TƯ VẤN & ĐỒNG HÀNH",
    adviceTitle: "Bạn chưa rõ nên kết hợp dịch vụ nào?",
    adviceBody: "Hãy chia sẻ mục tiêu để chúng tôi cùng xác định phạm vi phù hợp.",
    quote: "Tạo báo giá",
    whatsapp: "Trao đổi qua WhatsApp",
  },
  ar: {
    eyebrow: "خبراتنا",
    title: "حلول رقمية متكاملة من أجل",
    accent: "النمو.",
    intro:
      "من استراتيجية العلامة التجارية إلى الظهور والأدوات الرقمية، نجمع الخبرات المناسبة لمشروعك.",
    included: "مجالات الدعم",
    choose: "اختر هذه الخبرة",
    detail: "عرض الباقات والأسعار",
    advice: "استشارة ومرافقة",
    adviceTitle: "هل تحتاج إلى مساعدة في اختيار الخدمات؟",
    adviceBody: "شاركنا هدفك لنحدد نطاق العمل المناسب.",
    quote: "إعداد عرض السعر",
    whatsapp: "تواصل عبر واتساب",
  },
  ru: {
    eyebrow: "НАШИ КОМПЕТЕНЦИИ",
    title: "Комплексные digital-решения для",
    accent: "роста.",
    intro:
      "От стратегии бренда до видимости и цифровых инструментов — объединяем компетенции под ваш проект.",
    included: "Направления работы",
    choose: "Выбрать направление",
    detail: "Пакеты и цены",
    advice: "КОНСУЛЬТАЦИЯ И СОПРОВОЖДЕНИЕ",
    adviceTitle: "Не уверены, какие услуги выбрать?",
    adviceBody: "Расскажите о цели — поможем определить подходящий объём работ.",
    quote: "Составить смету",
    whatsapp: "Написать в WhatsApp",
  },
};

const EXPERTISES: Expertise[] = [
  {
    id: "websites",
    num: "01",
    image: svcWeb,
    icon: Monitor,
    href: "/services/creation-site-web",
    price: "À partir de 499 €",
    title: {
      fr: "Création de Sites Web & E-commerce",
      en: "Website Design & E-Commerce",
      vi: "Thiết Kế Website & Thương Mại Điện Tử",
      ar: "تصميم المواقع والمتاجر الإلكترونية",
      ru: "Создание сайтов и E-commerce",
    },
    sub: {
      fr: "Sites vitrines, plateformes professionnelles et boutiques en ligne optimisées pour convertir.",
      en: "Showcase websites, business platforms and high-converting online stores.",
      vi: "Website giới thiệu, nền tảng doanh nghiệp và cửa hàng trực tuyến tối ưu chuyển đổi.",
      ar: "مواقع تعريفية، منصات احترافية ومتاجر إلكترونية عالية التحويل.",
      ru: "Сайты-визитки, корпоративные порталы и интернет-магазины с высокой конверсией.",
    },
    points: {
      fr: [
        "Design 100% sur mesure & responsive mobile",
        "Chargement ultra-rapide & SEO technique intégré",
        "Vitrine 499 € · Pro 799 € · E-commerce 1 499 €",
      ],
      en: [
        "100% bespoke design & mobile responsive",
        "Ultra-fast loading & integrated technical SEO",
        "Starter 499 € · Pro 799 € · E-commerce 1,499 €",
      ],
      vi: [
        "Thiết kế may đo 100% & chuẩn di động",
        "Tải trang siêu tốc & tối ưu SEO kỹ thuật",
        "Gói Cơ bản 499 € · Pro 799 € · TMĐT 1.499 €",
      ],
      ar: [
        "تصميم مخصص 100% ومتوافق مع الهواتف",
        "سرعة تحميل فائقة وسيو تقني مدمج",
        "تعريفي 499 € · متقدم 799 € · متجر 1,499 €",
      ],
      ru: [
        "100% индивидуальный дизайн и адаптивность",
        "Молниеносная загрузка и базовый SEO",
        "Визитка 499 € · Про 799 € · Магазин 1 499 €",
      ],
    },
  },
  {
    id: "branding",
    num: "02",
    image: svcBrand,
    icon: Palette,
    href: "/services/branding",
    price: "À partir de 199 €",
    title: {
      fr: "Branding & Identité Visuelle",
      en: "Brand Identity & Design",
      vi: "Bộ Nhận Diện Thương Hiệu",
      ar: "الهوية البصرية والعلامة التجارية",
      ru: "Брендинг и фирменный стиль",
    },
    sub: {
      fr: "Une image de marque forte, singulière et mémorable qui inspire confiance dès le premier regard.",
      en: "A distinctive and memorable brand identity that builds immediate trust.",
      vi: "Hình ảnh thương hiệu sắc nét, chuyên nghiệp tạo dựng niềm tin tức thì.",
      ar: "هوية بصرية مميزة تترك انطباعًا قويًا وتبني الثقة الفورية.",
      ru: "Сильный и запоминающийся образ бренда, вызывающий доверие с первого взгляда.",
    },
    points: {
      fr: [
        "Logo vectoriel, typographies & palette couleur",
        "Charte graphique complète & déclinaisons réseaux",
        "Logo 199 € · Identité 299 € · Pack Complet 399 €",
      ],
      en: [
        "Vector logo, typography & color system",
        "Full brand guidelines & social templates",
        "Logo 199 € · Identity 299 € · Full Pack 399 €",
      ],
      vi: [
        "Logo vector, phông chữ & bảng màu chuẩn",
        "Cẩm nang thương hiệu & ấn phẩm truyền thông",
        "Logo 199 € · Nhận diện 299 € · Trọn gói 399 €",
      ],
      ar: [
        "شعار متجهي، خطوط ونظام ألوان متناسق",
        "دليل هوية متكامل وقوالب تواصل",
        "شعار 199 € · هوية 299 € · باقة شاملة 399 €",
      ],
      ru: [
        "Векторный логотип, шрифты и цветовая палитра",
        "Брендбук и шаблоны для соцсетей",
        "Лого 199 € · Айдентика 299 € · Полный пакет 399 €",
      ],
    },
  },
  {
    id: "seo",
    num: "03",
    image: svcSeo,
    icon: Search,
    href: "/services/seo",
    price: "À partir de 299 € / mois",
    title: {
      fr: "SEO & Référencement Google",
      en: "SEO & Organic Visibility",
      vi: "SEO & Thứ Hạng Tìm Kiếm Google",
      ar: "تحسين محركات البحث SEO",
      ru: "SEO и продвижение в Google",
    },
    sub: {
      fr: "Attirez des prospects qualifiés chaque jour sur Google sans payer de publicité à chaque clic.",
      en: "Attract qualified inbound leads continuously on Google without paying per click.",
      vi: "Thu hút khách hàng tiềm năng liên tục trên Google mà không tốn chi phí quảng cáo.",
      ar: "اجذب عملاء مؤهلين يوميًا عبر محركات البحث دون تكاليف إعلانات باهظة.",
      ru: "Привлекайте целевых клиентов из поиска без постоянных расходов на рекламу.",
    },
    points: {
      fr: [
        "Audit technique, sémantique & netlinking",
        "Optimisation des positions & rédaction stratégique",
        "Local 299 €/m · National & E-commerce 499 €/m",
      ],
      en: [
        "Technical audit, semantic analysis & backlinks",
        "Rankings optimization & strategic content",
        "Local 299 €/mo · National 499 €/mo",
      ],
      vi: [
        "Kiểm toán kỹ thuật, từ khóa & liên kết ngoài",
        "Tối ưu thứ hạng & bài viết chiến lược",
        "Địa phương 299 €/tháng · Quốc gia 499 €/tháng",
      ],
      ar: [
        "تدقيق تقني، كلمات مفتاحية وروابط خلفية",
        "تحسين المراتب ومحتوى مدروس",
        "محلي 299 €/شهر · وطني 499 €/شهر",
      ],
      ru: [
        "Технический аудит, семантика и ссылки",
        "Рост позиций и экспертный контент",
        "Локальный 299 €/мес · Федеральный 499 €/мес",
      ],
    },
  },
  {
    id: "maps",
    num: "04",
    image: svcMaps,
    icon: MapPin,
    href: "/services/google-maps",
    price: "À partir de 999 € / an",
    title: {
      fr: "Google Maps & Visibilité Locale",
      en: "Google Maps & Local Presence",
      vi: "Google Maps & Hiển Thị Địa Phương",
      ar: "خرائط Google والظهور المحلي",
      ru: "Google Maps и локальный бизнес",
    },
    sub: {
      fr: "Travaillez la présence de votre établissement dans les recherches locales et sur Google Maps.",
      en: "Improve your business presence in local search and on Google Maps.",
      vi: "Cải thiện sự hiện diện của doanh nghiệp trong tìm kiếm địa phương và Google Maps.",
      ar: "حسّن ظهور منشأتك في البحث المحلي وخرائط Google.",
      ru: "Улучшите присутствие бизнеса в локальном поиске и на Google Картах.",
    },
    points: {
      fr: [
        "Optimisation complète Google Business Profile",
        "Géocodage photos, signaux locaux & avis",
        "Pack Local 999 €/an · Gestion continue 500 €/an",
      ],
      en: [
        "Full Google Business Profile optimization",
        "Geotagged photos, local citations & reviews",
        "Local Pack 999 €/yr · Ongoing Care 500 €/yr",
      ],
      vi: [
        "Tối ưu toàn diện Google Business Profile",
        "Định vị hình ảnh, tín hiệu địa phương & đánh giá",
        "Gói Địa phương 999 €/năm · Duy trì 500 €/năm",
      ],
      ar: [
        "تحسين شامل لملف Google Business Profile",
        "توطين جغرافي للصور وتقييمات العملاء",
        "باقة التأسيس 999 €/سنة · إدارة سنوية 500 €/سنة",
      ],
      ru: [
        "Полная настройка профиля Google Мой Бизнес",
        "Геотегирование фото, цитирование и отзывы",
        "Пакет 999 €/год · Сопровождение 500 €/год",
      ],
    },
  },
  {
    id: "social",
    num: "05",
    image: svcSocial,
    icon: Share2,
    href: "/services/social",
    price: "À partir de 349 € / mois",
    title: {
      fr: "Social Media & Community Management",
      en: "Social Media & Content Strategy",
      vi: "Mạng Xã Hội & Quản Trị Cộng Đồng",
      ar: "إدارة وسائل التواصل وصناعة المحتوى",
      ru: "SMM и контент-маркетинг",
    },
    sub: {
      fr: "Création de contenus percutants (Reels, TikTok, Posts) et gestion active de vos communautés.",
      en: "High-impact video content (Reels, TikTok) and active community management.",
      vi: "Sáng tạo nội dung cuốn hút (Reels, TikTok) và chăm sóc tương tác khách hàng.",
      ar: "صناعة محتوى تفاعلي (فيديوهات قصيرة وتصاميم) وإدارة حساباتك باحترافية.",
      ru: "Создание цепляющего контента (Reels, Shorts) и активное ведение сообществ.",
    },
    points: {
      fr: [
        "Direction artistique & tournage / montage de vidéos",
        "Calendrier éditorial & publication programmée",
        "Essentielle 349 € · Croissance 599 € · Domination 799 €",
      ],
      en: [
        "Art direction & video shooting/editing",
        "Editorial calendar & scheduled publishing",
        "Essential 349 € · Growth 599 € · Domination 799 €",
      ],
      vi: [
        "Định hướng nghệ thuật & dựng video ngắn",
        "Lịch đăng tải & xuất bản định kỳ",
        "Cơ bản 349 € · Tăng trưởng 599 € · Đột phá 799 €",
      ],
      ar: [
        "إخراج فني، تصوير ومونتاج احترافي",
        "جدول نشر وإدارة الردود",
        "أساسية 349 € · نمو 599 € · هيمنة 799 €",
      ],
      ru: [
        "Арт-дирекшн, съёмка и динамичный монтаж",
        "Контент-план и регулярные публикации",
        "Базовый 349 € · Рост 599 € · Масштаб 799 €",
      ],
    },
  },
  {
    id: "maintenance",
    num: "06",
    image: svcMaint,
    icon: ShieldCheck,
    href: "/services/webcare",
    price: "À partir de 29 € / mois",
    title: {
      fr: "WebCare & Maintenance Continue",
      en: "WebCare & Continuous Maintenance",
      vi: "WebCare & Bảo Trì Kỹ Thuật",
      ar: "WebCare والصيانة المستمرة",
      ru: "WebCare и техподдержка",
    },
    sub: {
      fr: "Un accompagnement technique pour maintenir votre site à jour et suivre son bon fonctionnement.",
      en: "Technical support to help keep your website updated and maintain its operation.",
      vi: "Hỗ trợ kỹ thuật để cập nhật website và theo dõi hoạt động.",
      ar: "دعم تقني لتحديث موقعك ومتابعة تشغيله.",
      ru: "Техническое сопровождение для обновления сайта и контроля его работы.",
    },
    points: {
      fr: [
        "Sauvegardes quotidiennes & surveillance 24/7",
        "Mises à jour CMS, sécurité & support prioritaire",
        "Essentiel 29 €/m · Sérénité 49 €/m · Performance 99 €/m",
      ],
      en: [
        "Daily backups & 24/7 uptime monitoring",
        "CMS updates, malware protection & fast support",
        "Essential 29 €/mo · Peace 49 €/mo · Pro 99 €/mo",
      ],
      vi: [
        "Sao lưu hàng ngày & giám sát 24/7",
        "Cập nhật mã nguồn & hỗ trợ kỹ thuật nhanh",
        "Cơ bản 29 €/th · Toàn diện 49 €/th · Cao cấp 99 €/th",
      ],
      ar: [
        "نسخ احتياطي يومي ومراقبة 24/7",
        "تحديثات أمان ودعم فني سريع",
        "أساسي 29 €/شهر · راحة بال 49 €/شهر · أداء 99 €/شهر",
      ],
      ru: [
        "Ежедневные бэкапы и мониторинг 24/7",
        "Обновления движка и приоритетная помощь",
        "Базовый 29 €/мес · Стандарт 49 €/мес · Про 99 €/мес",
      ],
    },
  },
  {
    id: "robotics",
    num: "07",
    image: svcRobot,
    icon: Bot,
    href: "/services/robotique",
    price: "À partir de 499 € / mois",
    title: {
      fr: "IA, Automatisation & Robotique de Service",
      en: "AI, Automation & Service Robotics",
      vi: "AI, Tự Động Hóa & Robot Dịch Vụ",
      ar: "الذكاء الاصطناعي والأتمتة والروبوتات",
      ru: "ИИ, автоматизация и сервисные роботы",
    },
    sub: {
      fr: "Modernisez votre exploitation avec des robots d'accueil / service et des automatisations intelligentes.",
      en: "Modernize your business operations with hospitality service robots and custom AI workflows.",
      vi: "Nâng tầm vận hành với robot dịch vụ chào đón và quy trình tự động hóa thông minh.",
      ar: "عصرنة عملياتك بروبوتات استقبال وخدمة وأنظمة أتمتة ذكية.",
      ru: "Инновации для бизнеса: сервисные роботы для заведений и умная автоматизация процессов.",
    },
    points: {
      fr: [
        "Robots de livraison & accueil pour restaurants et hôtels",
        "Intégration logicielle sur mesure & formation équipe",
        "Location dès 499 €/m · Achat 8 000–21 000 € · Démo 250 €",
      ],
      en: [
        "Delivery & reception robots for restaurants/hotels",
        "Custom software integration & staff training",
        "Leasing from 499 €/mo · Purchase 8k–21k € · Demo 250 €",
      ],
      vi: [
        "Robot phục vụ & đón tiếp cho nhà hàng/khách sạn",
        "Tích hợp phần mềm & đào tạo nhân sự",
        "Thuê từ 499 €/tháng · Mua 8.000–21.000 € · Demo 250 €",
      ],
      ar: [
        "روبوتات توصيل واستقبال للمطاعم والفنادق",
        "ربط برمجي مخصص وتدريب للموظفين",
        "تأجير من 499 €/شهر · شراء 8,000–21,000 € · تجربة 250 €",
      ],
      ru: [
        "Роботы-доставщики и хостес для HoReCa",
        "Интеграция под ключ и обучение персонала",
        "Аренда от 499 €/мес · Покупка 8–21 тыс. € · Демо 250 €",
      ],
    },
  },
];

export function ExpertisesShowcase() {
  const { lang } = useLang();
  const c = SECTION_COPY[lang] ?? SECTION_COPY.fr;

  return (
    <section
      id="services"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative bg-[#FAF8F5] py-20 text-[#1A1815] border-b border-[#EBE5DC]"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A67C40]">
            {c.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.4rem)] font-normal tracking-[-0.02em] text-[#1A1815]">
            {c.title} <em className="font-serif italic font-normal text-[#A67C40]">{c.accent}</em>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5C554B] sm:text-base">{c.intro}</p>
        </div>

        {/* Parallax Stack Cards : Scrolling Progressif */}
        <div className="relative mt-16 space-y-10 pb-12">
          {EXPERTISES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                style={{
                  top: `calc(4.5rem + ${idx * 16}px)`,
                }}
                className="group sticky z-[1] overflow-hidden rounded-[2.5rem] border border-[#E7DFC6] bg-white p-7 sm:p-10 shadow-[0_25px_60px_-15px_rgba(20,16,11,0.08)] transition-all duration-300 hover:border-[#D1B07A]"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Left Column: Number, Title, Subtitle, Deliverables, Actions */}
                  <div className="flex flex-col justify-between lg:col-span-7">
                    <div>
                      {/* Top Meta Pill */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1815] px-3.5 py-1 font-mono text-xs font-semibold text-[#E5C696]">
                          <Icon className="h-3.5 w-3.5 text-[#E5C696]" />
                          <span>EXP. {item.num} / 07</span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="mt-4 font-serif text-[clamp(1.75rem,2.6vw,2.4rem)] font-normal leading-tight text-[#1A1815]">
                        {item.title[lang]}
                      </h3>

                      {/* Subtitle */}
                      <p className="mt-3 text-sm leading-relaxed text-[#5C554B] sm:text-base">
                        {item.sub[lang]}
                      </p>

                      {/* 3 Key Deliverables */}
                      <div className="mt-6 border-t border-[#F0EBE3] pt-5">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A67C40]">
                          {c.included}
                        </span>
                        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {item.points[lang].slice(0, 2).map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2.5 text-xs text-[#3A342D] sm:text-[13px]"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#A67C40]"
                                strokeWidth={2.5}
                              />
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`/?service=${item.id}#quote`}
                        className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#1A1815] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#332F2B]"
                      >
                        <span>{c.choose}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
                      </a>
                      <Link
                        to={item.href as "/services"}
                        className="inline-flex min-h-[46px] items-center gap-1.5 rounded-full border border-[#1A1815]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#1A1815] transition hover:border-[#1A1815]"
                      >
                        <span>{c.detail}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: High-Fidelity Bespoke Visual Component */}
                  <div className="w-full lg:col-span-5">
                    <ExpertiseVisual id={item.id} image={item.image} title={item.title[lang]} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl border border-[#EBE5DC] bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A67C40]">
                {c.advice}
              </span>
              <h4 className="mt-1 font-serif text-2xl font-normal text-[#1A1815]">
                {c.adviceTitle}
              </h4>
              <p className="mt-1 text-sm text-[#5C554B]">{c.adviceBody}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#quote"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#1A1815] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#332F2B]"
              >
                <span>{c.quote}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
              </a>
              <a
                href="https://wa.me/33767566783"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#1A1815]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#1A1815] transition hover:border-[#1A1815]"
              >
                <span>{c.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
