import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bot,
  Building2,
  Camera,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Gauge,
  Globe2,
  HelpCircle,
  Instagram,
  Layers,
  Linkedin,
  Lock,
  MapPin,
  MessageCircle,
  Monitor,
  Moon,
  MousePointerClick,
  Navigation,
  Palette,
  Phone,
  QrCode,
  Radio,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  Utensils,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Logo } from "@/components/site/primitives";
import { MapsSimulator } from "@/components/site/MapsSimulator";
import { AddToCartBtn } from "@/components/site/Cart";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { XR_PHOTOS } from "@/lib/photography";
import { useLang, type L } from "@/lib/i18n";

import sectorConstruction from "@/assets/sector-construction.jpg";
import sectorRestaurant from "@/assets/sector-restaurant.jpg";
import sectorHealth from "@/assets/sector-health.jpg";
import pfMaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";

const WA_BASE = `${CONTACT.whatsapp}?text=`;
const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

// ════════════════════════════════════════════════════════════════════════════
// 1. WEBSITES STUDIO PAGE (/services/websites)
// ════════════════════════════════════════════════════════════════════════════
export function WebsitesStudioPage() {
  const { t, price, lang } = useLang();
  const isRtl = lang === "ar";
  const service = SERVICES.find((s) => s.id === "websites")!;
  const [selectedSector, setSelectedSector] = useState<
    "artisan" | "restaurant" | "clinique" | "ecommerce"
  >("artisan");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [previewTab, setPreviewTab] = useState<"experience" | "lighthouse" | "specs">("experience");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [simulatedNotice, setSimulatedNotice] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"once" | "monthly">("once");

  // Interactive Recommender Quiz
  const [quizNeed, setQuizNeed] = useState<"vitrine" | "business" | "ecommerce">("business");
  const [quizPages, setQuizPages] = useState<"starter" | "expanded" | "catalog">("expanded");
  const [quizFeature, setQuizFeature] = useState<"seo" | "booking" | "payment">("booking");
  const [activeWebStep, setActiveWebStep] = useState<number>(0);

  const sectorTabs = [
    {
      id: "artisan" as const,
      Icon: Wrench,
      label: l("Artisans & Services", "Trades & Services", "Dịch vụ & Kỹ thuật", "الحرف والخدمات", "Услуги и сервис"),
    },
    {
      id: "restaurant" as const,
      Icon: Utensils,
      label: l("Restaurants & Hôtels", "Restaurants & Hotels", "Nhà hàng & Khách sạn", "المطاعم والفنادق", "Рестораны и отели"),
    },
    {
      id: "clinique" as const,
      Icon: Building2,
      label: l("Cabinets, Immobilier & Prestige", "Practices, Real Estate & Luxury", "Phòng khám & Bất động sản", "العيادات والعقار الفاخر", "Клиники и премиум"),
    },
    {
      id: "ecommerce" as const,
      Icon: ShoppingBag,
      label: l("E-Commerce & Marques", "E-Commerce & Brands", "Thương mại điện tử", "التجارة الإلكترونية", "E-Commerce и бренды"),
    },
  ];

  const sectorPreviews = {
    artisan: {
      brand: "MAISON VENDÔME",
      tagline: l("Rénovation & Ebénisterie d'Art", "Fine Renovation & Craftsmanship", "Cải tạo & Mộc thủ công mỹ nghệ", "الترميم والنجارة الفاخرة", "Реставрация и мастерство"),
      ctaText: l("Demander un devis en 2 min", "Request a quote in 2 min", "Yêu cầu báo giá trong 2 phút", "اطلب عرض سعر في دقيقتين", "Запросить расчёт за 2 мин"),
      visitorStat: l("84% de contacts depuis mobile", "84% of leads from mobile", "84% khách hàng từ di động", "84% من العملاء عبر الجوال", "84% заявок со смартфонов"),
      title: l(
        "Artisans, BTP & Services de proximité",
        "Trades, Construction & Local Services",
        "Dịch vụ địa phương & Xây dựng",
        "الحرفيون والخدمات المحلية",
        "Локальный сервис и строительство",
      ),
      subtitle: l(
        "Conçu pour déclencher des demandes rapides sur mobile et clarifier vos prestations dès la première seconde.",
        "Designed to trigger instant mobile enquiries and present your services with immediate clarity.",
        "Thiết kế tối ưu cho di động nhằm tạo cuộc gọi và yêu cầu báo giá nhanh chóng.",
        "مصمم لتسهيل التواصل الفوري عبر الهاتف وتوضيح خدماتك منذ اللحظة الأولى.",
        "Создан для быстрых обращений с мобильных устройств и чёткой презентации услуг.",
      ),
      kpis: [
        l("Parcours de contact mobile immédiat", "Frictionless mobile contact journey", "Hành trình liên hệ nhanh trên di động", "مسار تواصل فوري عبر الجوال", "Удобная заявка с мобильного"),
        l("Présentation structurée des prestations", "Clear structured service breakdown", "Trình bày dịch vụ rõ ràng", "عرض منظم للخدمات والمجالات", "Чёткая структура услуг"),
        l("Accès direct téléphone & WhatsApp", "Direct phone & WhatsApp actions", "Kết nối trực tiếp điện thoại & WhatsApp", "وصول مباشر للهاتف وواتساب", "Прямые кнопки телефона и WhatsApp"),
      ],
      recommendedPlan: l("Site Vitrine Pro (499 €)", "Pro Showcase Site (€499)", "Website Giới thiệu Pro (499 €)", "موقع تعريفي احترافي (499 €)", "Сайт-визитка Pro (499 €)"),
      image: sectorConstruction,
    },
    restaurant: {
      brand: "LE JARDIN D'ÉDEN",
      tagline: l("Gastronomie de Saison & Vins Rares", "Seasonal Gastronomy & Rare Wines", "Ẩm thực theo mùa & Rượu vang chọn lọc", "المطبخ الموسمي والنبيذ النادر", "Сезонная гастрономия и вина"),
      ctaText: l("Réserver une table privée", "Book a private table", "Đặt bàn riêng", "احجز طاولة خاصة", "Забронировать стол"),
      visitorStat: l("72% de réservations en ligne", "72% bookings made online", "72% đặt bàn trực tuyến", "72% من الحجوزات عبر الإنترنت", "72% онлайн-бронирований"),
      title: l(
        "Restaurants, Hôtellerie & Lieux de Vie",
        "Restaurants, Hospitality & Lifestyle Venues",
        "Nhà hàng, Khách sạn & Điểm đến",
        "المطاعم والضيافة والمنتجعات",
        "Рестораны, отели и гостеприимство",
      ),
      subtitle: l(
        "Direction artistique soignée, mise en valeur photographique, carte interactive et réservation fluide.",
        "Editorial art direction, high-impact photography, interactive menus and effortless reservations.",
        "Định hướng nghệ thuật tinh tế, thực đơn tương tác và đặt bàn mượt mà.",
        "إخراج فني راقٍ، قائمة تفاعلية وحجز سلس بنقرتين.",
        "Эстетичный дизайн, акцент на фотографии, интерактивное меню и удобное бронирование.",
      ),
      kpis: [
        l("Menu numérique & galerie éditoriale", "Digital menu & editorial photography", "Thực đơn số & hình ảnh nổi bật", "قائمة رقمية ومعرض صور احترافي", "Цифровое меню и фотогалерея"),
        l("Parcours de réservation adapté", "Tailored booking & table reservation flow", "Quy trình đặt bàn linh hoạt", "مسار حجز مهيأ لاحتياجك", "Удобный сценарий бронирования"),
        l("Architecture SEO & visibilité locale", "Local SEO & maps-ready architecture", "Cấu trúc chuẩn SEO địa phương", "هيكلة سيو مهيأة للبحث المحلي", "Архитектура под локальное SEO"),
      ],
      recommendedPlan: l("Site Business Sur-Mesure (799 €)", "Bespoke Business Site (€799)", "Website Doanh nghiệp (799 €)", "موقع أعمال مخصص (799 €)", "Бизнес-сайт под ключ (799 €)"),
      image: sectorRestaurant,
    },
    clinique: {
      brand: "ATLAS & ASSOCIÉS",
      tagline: l("Conseil Patrimonial & Droit Privé", "Wealth Advisory & Private Law", "Tư vấn tài sản & Luật tư", "الاستشارات المالية والقانون الخاص", "Консалтинг и частное право"),
      ctaText: l("Prendre rendez-vous privé", "Schedule private consultation", "Đặt lịch tư vấn riêng", "احجز استشارة خاصة", "Записаться на консультацию"),
      visitorStat: l("91% de consultations qualifiées", "91% qualified appointments", "91% lịch hẹn được chuẩn hóa", "91% من المواعيد المؤهلة", "91% целевых обращений"),
      title: l(
        "Cabinets, Cliniques, Immobilier & Prestige",
        "Clinics, Advisory, Real Estate & Prestige",
        "Phòng khám, Tư vấn & Bất động sản cao cấp",
        "العيادات والمكاتب الاستشارية والعقار الفاخر",
        "Клиники, консалтинг и недвижимость",
      ),
      subtitle: l(
        "Éditorial haut de gamme, prise de rendez-vous qualifiée et crédibilité institutionnelle immédiate.",
        "Refined editorial typography, qualified appointment booking and immediate institutional trust.",
        "Phong cách biên tập sang trọng, đặt lịch hẹn đồng bộ và uy tín vững chắc.",
        "تصميم تحريري فاخر وحجز مواعيد منظم يمنح ثقة فورية.",
        "Премиальная типографика, удобная запись и высокий уровень доверия с первого экрана.",
      ),
      kpis: [
        l("Image de marque cohérente & rassurante", "Cohesive, trustworthy brand presence", "Hình ảnh thương hiệu đồng bộ", "هوية رقمية متماسكة وموثوقة", "Цельный и статусный образ бренда"),
        l("Prise de rendez-vous selon vos outils", "Appointment booking with your tools", "Tích hợp đặt lịch theo công cụ sẵn có", "حجز مواعيد متوافق مع أدواتك", "Интеграция записи с вашими сервисами"),
        l("Structure SEO multilingue & ciblée", "Multilingual & targeted SEO structure", "Cấu trúc SEO đa ngôn ngữ", "بنية سيو متعددة اللغات ومستهدفة", "Мультиязычная SEO-структура"),
      ],
      recommendedPlan: l("Site Business Sur-Mesure (799 €)", "Bespoke Business Site (€799)", "Website Doanh nghiệp (799 €)", "موقع أعمال مخصص (799 €)", "Бизнес-сайт под ключ (799 €)"),
      image: sectorHealth,
    },
    ecommerce: {
      brand: "AURA MAISON",
      tagline: l("Haute Joaillerie & Pièces Numérotées", "High Jewellery & Numbered Creations", "Trang sức cao cấp & Bộ sưu tập giới hạn", "المجوهرات الراقية والقطع الفريدة", "Ювелирные изделия и эксклюзив"),
      ctaText: l("Commander la création signature", "Order signature piece", "Đặt mua tác phẩm đặc trưng", "اطلب القطعة الحصرية", "Заказать флагманскую модель"),
      visitorStat: l("Panier moyen supérieur de +38%", "Average order value +38%", "Giá trị đơn trung bình +38%", "متوسط السلة الشرائية +38%", "Средний чек выше на +38%"),
      title: l(
        "Boutiques E-Commerce, Marques & Enseignes",
        "E-Commerce Stores & Retail Brands",
        "Cửa hàng E-Commerce & Thương hiệu",
        "المتاجر الإلكترونية والعلامات التجارية",
        "Интернет-магазины и бренды",
      ),
      subtitle: l(
        "Parcours d'achat pensé pour votre catalogue, vos modes de paiement et votre logistique quotidienne.",
        "Purchase flows structured around your product catalogue, payment methods and daily operations.",
        "Trải nghiệm mua sắm thiết kế riêng theo danh mục sản phẩm và vận hành của bạn.",
        "تجربة شراء مصممة حسب كتالوج منتجاتك ووسائل الدفع وتنظيمك اليومي.",
        "Продуманный путь к покупке, адаптированный под ваш каталог и бизнес-процессы.",
      ),
      kpis: [
        l("Parcours d'achat mobile optimisé", "Streamlined mobile checkout journey", "Trải nghiệm mua sắm mượt trên di động", "مسار شراء سلس على الهاتف", "Удобное оформление заказа с мобильного"),
        l("Catalogue & options selon votre périmètre", "Catalogue tailored to your scope", "Danh mục sản phẩm linh hoạt", "كتالوج منظم حسب نطاق متجرك", "Гибкая структура каталога"),
        l("Fiches produits structurées pour le SEO", "SEO-structured product pages", "Trang sản phẩm tối ưu SEO", "صفحات منتجات مهيكلة لمحركات البحث", "SEO-оптимизированные карточки товаров"),
      ],
      recommendedPlan: l("Site E-Commerce & Réservation (1 499 €)", "E-Commerce & Booking (€1,499)", "Website E-Commerce & Đặt chỗ (1.499 €)", "متجر إلكتروني وحجز (1,499 €)", "Интернет-магазин и бронирование (1 499 €)"),
      image: pfMaisonLumiere,
    },
  };

  const activeSector = sectorPreviews[selectedSector];
  const monthlyPeriodLabel = t(l("/ mois", "/ month", "/ tháng", "/ شهر", "/ мес"));

  // Computed recommendation from Quiz
  const computedPlan = (() => {
    if (quizNeed === "ecommerce" || quizPages === "catalog" || quizFeature === "payment") {
      return {
        id: "ecommerce",
        name: l("Formule 03 · Site E-Commerce & Réservation", "Plan 03 · E-Commerce & Booking Site", "Gói 03 · Website E-Commerce & Đặt chỗ", "الباقة 03 · متجر إلكتروني وحجز", "Тариф 03 · E-Commerce и бронирование"),
        price: 1499,
        monthly: 175,
        timeline: l("Livraison en 21 à 30 jours", "Delivery in 21 to 30 days", "Bàn giao trong 21 đến 30 ngày", "التسليم خلال 21 إلى 30 يوماً", "Запуск за 21–30 дней"),
        desc: l("Paiement sécurisé Stripe / CB, catalogue produits illimité et gestion des commandes.", "Secure Stripe checkout, unlimited catalogue and full order management.", "Thanh toán Stripe bảo mật, danh mục sản phẩm không giới hạn.", "دفع آمن ببطاقات الائتمان، كتالوج غير محدود وإدارة الطلبات.", "Приём платежей Stripe/картами, каталог без ограничений и заказы."),
      };
    }
    if (quizNeed === "business" || quizPages === "expanded" || quizFeature === "booking") {
      return {
        id: "business",
        name: l("Formule 02 · Site Business Sur-Mesure", "Plan 02 · Bespoke Business Site", "Gói 02 · Website Doanh nghiệp May Đo", "الباقة 02 · موقع أعمال مخصص", "Тариф 02 · Бизнес-сайт под ключ"),
        price: 799,
        monthly: 93,
        popular: true,
        timeline: l("Livraison en 14 à 21 jours", "Delivery in 14 to 21 days", "Bàn giao trong 14 đến 21 ngày", "التسليم خلال 14 إلى 21 يوماً", "Запуск за 14–21 день"),
        desc: l("Jusqu'à 15 pages sur mesure, module de prise de RDV / devis dynamique et architecture SEO locale.", "Up to 15 bespoke pages, dynamic booking/lead form and advanced local SEO.", "Tối đa 15 trang may đo, biểu mẫu đặt lịch thông minh và chuẩn SEO.", "حتى 15 صفحة مخصصة، حجز مواعيد وبنية سيو متقدمة.", "До 15 страниц, запись/калькулятор и продвинутое локальное SEO."),
      };
    }
    return {
      id: "vitrine",
      name: l("Formule 01 · Site Vitrine Pro", "Plan 01 · Pro Showcase Site", "Gói 01 · Website Giới thiệu Pro", "الباقة 01 · موقع تعريفي احترافي", "Тариф 01 · Сайт-визитка Pro"),
      price: 499,
      monthly: 58,
      timeline: l("Livraison en 7 à 10 jours", "Delivery in 7 to 10 days", "Bàn giao trong 7 đến 10 ngày", "التسليم خلال 7 إلى 10 أيام", "Запуск за 7–10 дней"),
      desc: l("1 à 5 pages épurées, expérience mobile-first, formulaire de contact sécurisé et base SEO propre.", "1 to 5 clean pages, mobile-first UX, contact form and sound SEO foundation.", "1 đến 5 trang tinh tế, tối ưu di động và biểu mẫu bảo mật.", "1 إلى 5 صفحات أنيقة، أولوية للجوال ونموذج تواصل سريع.", "1–5 лаконичных страниц, mobile-first, форма и чистая база SEO."),
    };
  })();

  const steps = [
    {
      step: "01",
      title: l("Brief & direction créative", "Brief & creative direction", "Khảo sát & định hướng sáng tạo", "الموجز والتوجه الإبداعي", "Бриф и креативное направление"),
      desc: l(
        "Nous cadrons vos objectifs, votre clientèle et une direction visuelle adaptée à votre identité.",
        "We align on your objectives, audience and a visual direction tailored to your brand.",
        "Xác định mục tiêu, khách hàng và định hướng thị giác phù hợp với thương hiệu.",
        "نحدد أهدافك وجمهورك ونصوغ توجهاً بصرياً ملائماً لهوية علامتك.",
        "Фиксируем цели, аудиторию и визуальную концепцию под позиционирование бренда.",
      ),
    },
    {
      step: "02",
      title: l("Conception & développement", "Design & development", "Thiết kế & phát triển", "التصميم والتطوير", "Дизайн и разработка"),
      desc: l(
        "Nous construisons une interface responsive mobile-first, rapide et claire sur tous les écrans.",
        "We build a fast, mobile-first responsive interface that performs cleanly on every screen.",
        "Xây dựng giao diện responsive ưu tiên di động, mượt mà trên mọi thiết bị.",
        "نطور واجهة سريعة ومتجاوبة تعطي الأولوية للجوال وتعمل بسلاسة على جميع الشاشات.",
        "Создаём быстрый mobile-first интерфейс, одинаково удобный на смартфоне и ПК.",
      ),
    },
    {
      step: "03",
      title: l("SEO & conversion", "SEO & conversion setup", "SEO & chuyển đổi", "تحسين البحث والتحويل", "SEO и конверсия"),
      desc: l(
        "Nous intégrons la structure SEO, les formulaires qualifiés et les points de contact convenus au devis.",
        "We implement technical SEO foundations, lead forms and contact pathways defined in your scope.",
        "Tích hợp nền tảng SEO kỹ thuật, biểu mẫu và điểm chạm liên hệ theo phạm vi đã duyệt.",
        "ندمج البنية التقنية للـ SEO ونماذج التواصل المحددة في نطاق المشروع.",
        "Внедряем техническое SEO, формы заявок и все согласованные каналы связи.",
      ),
    },
    {
      step: "04",
      title: l("Tests & mise en ligne", "QA & launch", "Kiểm thử & vận hành", "الاختبار والإطلاق", "Тестирование и запуск"),
      desc: l(
        "Après validation complète, nous effectuons les vérifications prévues et préparons la mise en ligne.",
        "After your approval, we complete final checks, prepare deployment and hand over agreed accesses.",
        "Sau khi duyệt, chúng tôi kiểm thử toàn diện, chuẩn bị ra mắt và bàn giao quyền truy cập.",
        "بعد الاعتماد النهائي، نجري الفحوصات اللازمة ونجهّز الإطلاق ونسلّم الصلاحيات المتفق عليها.",
        "После финальной проверки и согласования готовим публикацию и передаём доступы.",
      ),
    },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#FAF9F5] text-[#12110E]">
      <Nav />
      <main>
        {/* Editorial Hero — Lumineux, Élégant, Zéro Jaune */}
        <section className="relative overflow-hidden bg-white pb-16 pt-24 border-b border-[#E8E6E0] sm:pb-24 sm:pt-32">
          {/* Soft ambient lighting — warm and natural, ZERO square grid */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(18,17,14,0.04),transparent_65%)]" />

          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#12110E]">
                <Monitor className="h-3.5 w-3.5" />
                {t(l("CRÉATION DE SITES WEB · SUR MESURE", "BESPOKE WEB DESIGN & DEVELOPMENT", "THIẾT KẾ WEBSITE MAY ĐO", "تصميم وتطوير المواقع المخصصة", "СОЗДАНИЕ САЙТОВ ПОД КЛЮЧ"))}
              </span>
              <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.8vw,5.2rem)] font-medium leading-[1.02] tracking-tight text-[#12110E]">
                {t(l("Des sites web modernes, pensés pour", "Modern websites designed to", "Website hiện đại, thiết kế để", "مواقع حديثة مصممة", "Современные сайты, созданные чтобы"))}{" "}
                <em className="italic font-normal text-[#12110E] underline decoration-[#12110E]/30 underline-offset-8">
                  {t(l("convertir", "convert", "chuyển đổi", "لتحويل الزوار", "конвертировать"))}
                </em>{" "}
                {t(l("sur mobile & PC.", "on mobile & desktop.", "trên di động & máy tính.", "على الجوال والحاسوب.", "на мобильных и ПК."))}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#52504A] sm:text-base">
                {t(
                  l(
                    "Sites vitrines, sites professionnels et e-commerce : direction artistique sur mesure, expérience mobile-first et base SEO propre. Le périmètre et les conditions sont précisés au devis. Dès 499 €.",
                    "Showcase, business and e-commerce websites: bespoke art direction, mobile-first UX and clean SEO architecture. Full scope and terms are confirmed in writing. From €499.",
                    "Website giới thiệu, doanh nghiệp và e-commerce: thiết kế riêng, tối ưu di động và chuẩn SEO. Phạm vi và điều khoản minh bạch trong báo giá. Từ 499 €.",
                    "مواقع تعريفية وتجارية ومتاجر إلكترونية بتصميم مخصص وأولوية للجوال وبنية سيو نظيفة. يُحدد النطاق بدقة في العرض. ابتداءً من 499 €.",
                    "Сайты-визитки, бизнес-сайты и интернет-магазины: индивидуальный дизайн, mobile-first UX и чистая SEO-основа. Объём фиксируется в смете. От 499 €.",
                  ),
                )}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                >
                  {t(l("Voir les 3 formules (499 € · 799 € · 1 499 €)", "View the 3 plans (€499 · €799 · €1,499)", "Xem 3 gói (499 € · 799 € · 1.499 €)", "عرض الباقات الـ 3 (499 € · 799 € · 1,499 €)", "Смотреть 3 тарифа (499 € · 799 € · 1 499 €)"))}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#simulateur-express"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-6 py-3.5 text-xs font-semibold text-[#12110E] shadow-sm transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                >
                  <Sparkles className="h-4 w-4 text-[#12110E]" />
                  {t(l("Simuler mon projet en 3 clics", "Simulate my project in 3 clicks", "Tính toán dự án trong 3 bước", "محاكاة مشروعي بـ 3 نقرات", "Рассчитать проект в 3 клика"))}
                </a>
                <a
                  href={`${WA_BASE}${encodeURIComponent(
                    t(
                      l(
                        "Bonjour XR Agency, je souhaite échanger sur la création de mon site internet.",
                        "Hello XR Agency, I would like to discuss building my website.",
                        "Xin chào XR Agency, tôi muốn trao đổi về việc thiết kế website.",
                        "مرحبًا XR Agency، أود مناقشة إنشاء موقعي الإلكتروني.",
                        "Здравствуйте, XR Agency! Хочу обсудить создание сайта.",
                      ),
                    ),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-6 py-3.5 text-xs font-semibold text-[#12110E] shadow-sm transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                >
                  <MessageCircle className="h-4 w-4 text-[#16A34A]" />
                  {t(l("Parler de mon projet", "Discuss my project", "Trao đổi dự án", "ناقش مشروعي", "Обсудить проект"))}
                </a>
              </div>
            </div>

            {/* Interactive Preview Studio: Live UI + Lighthouse + Specs */}
            <div className="mt-12 rounded-3xl border border-[#E5E5E0] bg-white p-5 shadow-xl sm:p-8">
              {/* Header Controls: Sectors + Mode Switcher + Device */}
              <div className="flex flex-col gap-4 border-b border-[#EBEBE6] pb-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Sector Switcher */}
                <div className="flex flex-wrap gap-2">
                  {sectorTabs.map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedSector(id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedSector === id
                          ? "bg-[#12110E] text-white shadow-sm"
                          : "border border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t(label)}
                    </button>
                  ))}
                </div>

                {/* Mode Selector (Live Prototype / Lighthouse Audit / Technical Specs) */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-full border border-[#D5D5CF] bg-[#F5F5F0] p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setPreviewTab("experience")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                        previewTab === "experience"
                          ? "bg-[#12110E] text-white shadow-sm"
                          : "text-[#52504A] hover:text-[#12110E]"
                      }`}
                    >
                      <MousePointerClick className="h-3.5 w-3.5" />
                      {t(l("Maquette Live", "Live Prototype", "Giao diện Live", "النموذج الحي", "Интерактив"))}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("lighthouse")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                        previewTab === "lighthouse"
                          ? "bg-[#16A34A] text-white shadow-sm"
                          : "text-[#52504A] hover:text-[#12110E]"
                      }`}
                    >
                      <Gauge className="h-3.5 w-3.5" />
                      {t(l("Audit Google (99/100)", "Google Audit (99/100)", "Kiểm định Google (99/100)", "تدقيق Google (99/100)", "Google Audit (99/100)"))}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("specs")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                        previewTab === "specs"
                          ? "bg-[#12110E] text-white shadow-sm"
                          : "text-[#52504A] hover:text-[#12110E]"
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5" />
                      {t(l("Stack & Livrables", "Stack & Deliverables", "Công nghệ & Bàn giao", "التقنية والتسليم", "Стек и поставка"))}
                    </button>
                  </div>

                  {/* Device toggle (desktop / mobile) */}
                  <div className="inline-flex rounded-full border border-[#D5D5CF] bg-[#F5F5F0] p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        previewDevice === "desktop" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A]"
                      }`}
                      title="Vue Desktop"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t(l("PC", "Desktop", "PC", "حاسوب", "ПК"))}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        previewDevice === "mobile" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A]"
                      }`}
                      title="Vue Smartphone"
                    >
                      <Smartphone className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t(l("Mobile", "Mobile", "Mobile", "جوال", "Мобильный"))}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Interactive Stage */}
              <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                {/* Left Column: Sector Specs & Recommendation */}
                <div className="space-y-4 lg:col-span-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12110E]">
                      {t(l("ARCHITECTURE PAR SECTEUR", "INDUSTRY ARCHITECTURE", "KIẾN TRÚC THEO NGÀNH", "هيكلة حسب القطاع", "АРХИТЕКТУРА ПОД ОТРАСЛЬ"))}
                    </span>
                    <span className="rounded-full border border-[#EBEBE6] bg-[#FAF9F5] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#52504A]">
                      {t(activeSector.visitorStat)}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                    {t(activeSector.title)}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#52504A]">
                    {t(activeSector.subtitle)}
                  </p>
                  <ul className="space-y-2 pt-1">
                    {activeSector.kpis.map((k, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-medium text-[#2B2925]">
                        <Check className="h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span>{t(k)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Recommendation Card with quick jump */}
                  <div className="rounded-2xl border border-[#E5E5E0] bg-[#FAF9F5] p-4.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#52504A] font-semibold">
                        {t(l("Formule recommandée :", "Recommended tier:", "Gói đề xuất:", "الباقة المقترحة:", "Рекомендуемый тариф:"))}
                      </span>
                      <span className="rounded-full bg-[#12110E] px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                        {t(l("CLÉ EN MAIN", "TURNKEY", "TRỌN GÓI", "شامل", "ПОД КЛЮЧ"))}
                      </span>
                    </div>
                    <a
                      href="#plans"
                      className="mt-2 flex items-center justify-between text-base font-semibold text-[#12110E] transition hover:text-[#52504A] group/rec"
                    >
                      <span className="group-hover/rec:translate-x-0.5 transition-transform">{t(activeSector.recommendedPlan)}</span>
                      <ArrowRight className="h-4 w-4 text-[#12110E] transition-transform group-hover/rec:translate-x-1.5" />
                    </a>
                  </div>

                  {/* Theme Switcher within preview */}
                  <div className="flex items-center justify-between rounded-xl border border-[#EBEBE6] bg-[#FAF9F5] px-3 py-2 text-xs text-[#52504A]">
                    <span className="text-[11px] font-mono uppercase tracking-wider">{t(l("Thème de prévisualisation :", "Preview theme:", "Giao diện thử:", "مظهر العرض:", "Тема оформления:"))}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewTheme("dark")}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] font-semibold transition ${
                          previewTheme === "dark" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A] hover:text-[#12110E]"
                        }`}
                      >
                        <Moon className="h-3 w-3" />
                        {t(l("Sombre Luxe", "Dark Luxury", "Tối sang", "داكن فاخر", "Тёмная"))}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTheme("light")}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] font-semibold transition ${
                          previewTheme === "light" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A] hover:text-[#12110E]"
                        }`}
                      >
                        <Sun className="h-3 w-3" />
                        {t(l("Clair Ivoire", "Light Ivory", "Sáng ngà", "فاتح عاجي", "Светлая"))}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Dynamic Interactive Device Simulator */}
                <div className="flex justify-center lg:col-span-7">
                  <div
                    className={`relative overflow-hidden border border-[#D5D5CF] bg-white shadow-2xl transition-all duration-500 ${
                      previewDevice === "mobile"
                        ? "aspect-[9/18] w-[310px] rounded-[2.8rem] border-4 border-[#2A2722] p-2 ring-1 ring-black/10"
                        : "aspect-[16/10] w-full rounded-2xl"
                    }`}
                  >
                    {/* Device Chrome Header */}
                    {previewDevice === "desktop" ? (
                      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#201E1A] px-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#E05A47]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#E5B542]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#52B755]" />
                        </div>
                        <div className="mx-auto flex h-5 w-3/5 items-center justify-center gap-1.5 rounded-md bg-black/40 px-2 text-[10px] font-mono text-white/70">
                          <Lock className="h-2.5 w-2.5 text-[#52B755]" />
                          <span className="truncate">https://xragency.com/{selectedSector}-luxe</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-white/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#52B755] animate-pulse" />
                          <span>LIVE</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mx-auto mb-1.5 flex h-3.5 w-24 items-center justify-between rounded-full bg-black/90 px-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-black ring-1 ring-white/20" />
                        <span className="h-1 w-6 rounded-full bg-white/25" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#52B755]/80" />
                      </div>
                    )}

                    {/* Viewport Content based on active tab */}
                    <div
                      className={
                        previewDevice === "desktop"
                          ? "relative h-[calc(100%-2rem)] w-full overflow-hidden"
                          : "relative h-[calc(100%-1.1rem)] w-full overflow-hidden rounded-[2.2rem]"
                      }
                    >
                      {/* TAB 1: MAQUETTE LIVE INTERACTIVE */}
                      {previewTab === "experience" && (
                        <div className={`relative h-full w-full overflow-hidden ${previewTheme === "light" ? "bg-[#FAF9F5] text-[#12110E]" : "bg-[#171613] text-white"}`}>
                          {/* Background Photo */}
                          <img
                            src={activeSector.image}
                            alt={t(activeSector.title)}
                            className="absolute inset-0 h-full w-full object-cover opacity-30 filter brightness-90 transition-all duration-700 hover:scale-105"
                          />
                          <div className={`absolute inset-0 ${previewTheme === "light" ? "bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/75 to-transparent" : "bg-gradient-to-t from-[#171613] via-[#171613]/85 to-transparent"}`} />

                          {/* Mock Website Internal Header */}
                          <div className="relative z-10 flex items-center justify-between border-b border-black/10 px-4 py-2.5 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-xs font-bold tracking-wider text-[#12110E]">✦ {activeSector.brand}</span>
                            </div>
                            <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-[#52504A] sm:flex">
                              <span className="font-bold text-[#12110E]">Accueil</span>
                              <span>Prestations</span>
                              <span>Galerie</span>
                              <span>Contact</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSimulatedNotice(t(l("✓ Parcours fluide : Le visiteur clique et valide sa demande en moins de 60 secondes.", "✓ Seamless flow: Visitors click and submit enquiries in under 60 seconds.", "✓ Trải nghiệm mượt mà: Khách gửi yêu cầu trong chưa đầy 60 giây.", "✓ تجربة سلسة: الزائر يقدم طلبه خلال أقل من 60 ثانية.", "✓ Быстрый сценарий: Заявка оформляется менее чем за 60 секунд.")));
                                setTimeout(() => setSimulatedNotice(null), 4000);
                              }}
                              className="rounded-full bg-[#12110E] px-2.5 py-1 font-mono text-[9px] font-bold text-white transition hover:bg-[#2B2925]"
                            >
                              {t(l("Contact Direct", "Direct Contact", "Liên hệ ngay", "تواصل مباشر", "Связаться"))}
                            </button>
                          </div>

                          {/* Hero simulated content */}
                          <div className="relative z-10 flex h-[calc(100%-3rem)] flex-col justify-end p-4 sm:p-6">
                            {simulatedNotice && (
                              <div className="mb-3 animate-fade-in rounded-xl border border-[#1A73E8]/30 bg-[#EBF3FE] p-2.5 text-[11px] font-medium text-[#1A73E8] shadow-lg backdrop-blur-md">
                                {simulatedNotice}
                              </div>
                            )}

                            <span className="inline-block w-fit rounded-full border border-[#12110E]/15 bg-white/80 px-2.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-[#12110E]">
                              {t(activeSector.tagline)}
                            </span>
                            <h3 className="mt-2 font-serif text-lg font-medium leading-tight sm:text-2xl text-[#12110E]">
                              {t(activeSector.title)}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs text-[#52504A] sm:line-clamp-none">
                              {t(activeSector.subtitle)}
                            </p>

                            {/* Interactive Conversion Button */}
                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSimulatedNotice(t(l("✦ Simulation réussie : Formulaire qualifié déclenché. Le lead arrive instantanément par SMS & WhatsApp.", "✦ Interactive simulation: Qualified lead form triggered. Lead sent instantly via SMS & WhatsApp.", "✦ Trải nghiệm thử thành công: Biểu mẫu gửi ngay thông báo qua SMS & WhatsApp.", "✦ تجربة ناجحة: إشعار فوري بالطلب عبر رسالة نصية وواتساب.", "✦ Интерактив сработал: Заявка мгновенно поступила в WhatsApp и CRM.")));
                                  setTimeout(() => setSimulatedNotice(null), 4000);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#12110E] px-3.5 py-1.5 font-mono text-[10px] font-bold text-white shadow-md transition hover:bg-[#2B2925]"
                              >
                                <Zap className="h-3 w-3 text-white" />
                                {t(activeSector.ctaText)}
                              </button>
                              <span className="font-mono text-[9px] text-[#52504A]">
                                ✦ {t(l("Cliquez pour simuler l'action", "Click to test user interaction", "Nhấp để thử trải nghiệm", "انقر لتجربة التفاعل", "Кликните для проверки"))}
                              </span>
                            </div>

                            {/* Bottom micro metrics */}
                            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-2.5 font-mono text-[8.5px] text-[#52504A]">
                              <span>Score TTFB : 110ms</span>
                              <span>Mobile First 100%</span>
                              <span>Next.js · SSL Sécurisé</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: AUDIT GOOGLE LIGHTHOUSE 99/100 */}
                      {previewTab === "lighthouse" && (
                        <div className="flex h-full flex-col justify-between bg-[#12110E] p-4 text-[#F7F4EE] sm:p-6">
                          <div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <div className="flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-[#52B755]" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#52B755]">
                                  Google Lighthouse v12 · Audit Officiel
                                </span>
                              </div>
                              <span className="rounded-full bg-[#52B755]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#52B755]">
                                PASSED 100%
                              </span>
                            </div>

                            {/* 4 Circular Gauge Scores */}
                            <div className="mt-5 grid grid-cols-4 gap-2 text-center sm:gap-4">
                              <div className="rounded-2xl border border-[#52B755]/30 bg-[#52B755]/10 p-2.5">
                                <div className="font-serif text-2xl font-bold text-[#52B755] sm:text-3xl">99</div>
                                <span className="mt-1 block font-mono text-[8.5px] uppercase text-white/70">Performance</span>
                              </div>
                              <div className="rounded-2xl border border-[#52B755]/30 bg-[#52B755]/10 p-2.5">
                                <div className="font-serif text-2xl font-bold text-[#52B755] sm:text-3xl">100</div>
                                <span className="mt-1 block font-mono text-[8.5px] uppercase text-white/70">Accessibilité</span>
                              </div>
                              <div className="rounded-2xl border border-[#52B755]/30 bg-[#52B755]/10 p-2.5">
                                <div className="font-serif text-2xl font-bold text-[#52B755] sm:text-3xl">100</div>
                                <span className="mt-1 block font-mono text-[8.5px] uppercase text-white/70">Pratiques</span>
                              </div>
                              <div className="rounded-2xl border border-[#52B755]/30 bg-[#52B755]/10 p-2.5">
                                <div className="font-serif text-2xl font-bold text-[#52B755] sm:text-3xl">100</div>
                                <span className="mt-1 block font-mono text-[8.5px] uppercase text-white/70">SEO Technique</span>
                              </div>
                            </div>

                            {/* Core Web Vitals Real Metrics */}
                            <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 font-mono">
                              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                                <span className="block text-[9px] text-white/50">FCP (1er rendu)</span>
                                <span className="text-[#52B755] font-bold">0.4 s</span>
                              </div>
                              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                                <span className="block text-[9px] text-white/50">LCP (Grand contenu)</span>
                                <span className="text-[#52B755] font-bold">0.7 s</span>
                              </div>
                              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                                <span className="block text-[9px] text-white/50">TBT (Blocage)</span>
                                <span className="text-[#52B755] font-bold">0 ms</span>
                              </div>
                              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                                <span className="block text-[9px] text-white/50">CLS (Stabilité)</span>
                                <span className="text-[#52B755] font-bold">0.00</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-white/80">
                            <p className="font-medium">
                              ✦ {t(l("Zéro surcharge WordPress : nos sites sont codés sur mesure en React / Next.js / Vite, garantissant un chargement instantané même en 4G mobile.", "Zero WordPress bloat: our sites are custom built in React / Next.js / Vite, ensuring instant loading even on mobile 4G.", "Không gánh nặng WordPress: website được phát triển trên React / Next.js / Vite cho tốc độ tức thì.", "خالٍ من بطء ووردبريس: مواقعنا مبرمجة بأحدث تقنيات React لتحميل فوري على شبكات الجوال.", "Никакого тяжёлого WordPress: чистый код React / Next.js для мгновенной загрузки на 4G."))}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: SPECS & ARCHITECTURE */}
                      {previewTab === "specs" && (
                        <div className="flex h-full flex-col justify-between bg-white p-4 text-[#12110E] sm:p-6">
                          <div>
                            <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#12110E]">
                                Architecture Haute Fidélité · Livrables Cédés
                              </span>
                              <span className="font-mono text-[10px] text-[#52504A]">Garantie 30j incluse</span>
                            </div>

                            <div className="mt-4 space-y-2.5">
                              <div className="flex items-start gap-2.5 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2.5">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                                <div>
                                  <h4 className="text-xs font-semibold text-[#12110E]">Code Source 100% Cédé & Zéro Dépendance</h4>
                                  <p className="mt-0.5 text-[11px] text-[#52504A]">Vous êtes le propriétaire exclusif de votre site, de votre nom de domaine et de vos données. Aucun abonnement captif.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2.5">
                                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8]" />
                                <div>
                                  <h4 className="text-xs font-semibold text-[#12110E]">Réseau CDN Mondial Haute Vitesse</h4>
                                  <p className="mt-0.5 text-[11px] text-[#52504A]">Mise en cache sur plus de 300 points de présence dans le monde (Vercel / Cloudflare) avec certificat SSL 256-bit automatique.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2.5">
                                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#12110E]" />
                                <div>
                                  <h4 className="text-xs font-semibold text-[#12110E]">Protection Anti-Spam & Notifications Temps Réel</h4>
                                  <p className="mt-0.5 text-[11px] text-[#52504A]">Formulaires protégés par honeypot invisible avec alerte instantanée sur WhatsApp et par e-mail professionnel.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-[#EBEBE6] pt-3">
                            <span className="font-mono text-[10px] text-[#52504A]">Livraison : 7 à 21 jours selon formule</span>
                            <a href="#plans" className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#12110E] hover:underline">
                              Voir la grille tarifaire →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            LE PARCOURS DE CRÉATION LUDIQUE & ILLUSTRÉ
           ════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-[#E8E6E0]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A73E8]/25 bg-[#1A73E8]/8 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A73E8]">
                <Sparkles className="h-3 w-3 text-[#1A73E8]" />
                {t(l("PARCOURS DE CRÉATION SUR-MESURE", "BESPOKE CREATION JOURNEY", "QUY TRÌNH MAY ĐO TRỰC QUAN", "رحلة التصميم والتطوير المخصصة", "ПОШАГОВЫЙ ПРОЦЕСС РАЗРАБОТКИ"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("De l'esquisse au lancement sans accroc.", "From blueprint to flawless launch.", "Từ phác thảo đến vận hành hoàn hảo.", "من الفكرة المبدئية إلى الإطلاق المثالي.", "От первого эскиза до безупречного запуска."))}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(
                  l(
                    "Une méthode artisanale et rigoureuse en 4 étapes claires. Cliquez sur chaque jalon pour explorer nos livrables concrets et nos garanties techniques.",
                    "A disciplined 4-step craft. Click each milestone to preview our deliverables, technical standards and client peace of mind.",
                    "Quy trình 4 bước chuẩn mực và minh bạch. Nhấp vào từng giai đoạn để xem chi tiết sản phẩm bàn giao.",
                    "منهجية دقيقة من 4 خطوات واضحة. اضغط على أي مرحلة لاستعراض المخرجات والمعايير الفنية.",
                    "4 чётких этапа с фиксированными сроками. Нажмите на любой шаг, чтобы увидеть детали и результаты.",
                  ),
                )}
              </p>
            </div>

            {/* Interactive Step Switcher Tabs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {[
                { idx: 0, num: "01", label: l("Cadrage & Wireframes", "Scoping & Wireframes", "Cấu trúc & Wireframes", "التأطير وهيكلة الصفحات", "Бриф и структура"), color: "#1A73E8", icon: Compass },
                { idx: 1, num: "02", label: l("Direction Artistique Figma", "Figma Art Direction", "Thiết kế Figma Độc bản", "الإخراج الفني في Figma", "Арт-дирекшн Figma"), color: "#EA4335", icon: Palette },
                { idx: 2, num: "03", label: l("Ingénierie & Score 100", "Engineering & Speed 100", "Lập trình Tốc độ 100", "الهندسة والسرعة القصوى", "Вёрстка и скорость 100"), color: "#16A34A", icon: Gauge },
                { idx: 3, num: "04", label: l("Déploiement & Cession 100%", "Launch & 100% Handover", "Vận hành & Bàn giao 100%", "الإطلاق ونقل الملكية", "Запуск и передача прав"), color: "#F59E0B", icon: Award },
              ].map((step) => {
                const Icon = step.icon;
                const isActive = activeWebStep === step.idx;
                return (
                  <button
                    key={step.idx}
                    type="button"
                    onClick={() => setActiveWebStep(step.idx)}
                    className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#12110E] text-white shadow-lg scale-105"
                        : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#52504A] hover:border-[#12110E] hover:text-[#12110E] hover:bg-white"
                    }`}
                  >
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-bold text-white transition"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </span>
                    <Icon className="h-3.5 w-3.5 transition group-hover:scale-110" style={{ color: isActive ? "#FFF" : step.color }} />
                    <span>{t(step.label)}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full" style={{ backgroundColor: step.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Stage & Visual Preview */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-[#FAF9F5] p-6 shadow-xl sm:p-10">
              {/* STEP 0: CADRAGE & WIREFRAMES */}
              {activeWebStep === 0 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A73E8]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#1A73E8]">
                        <Compass className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 01 · FONDATIONS & PSYCHOLOGIE CLIENT", "STEP 01 · FOUNDATIONS & USER PSYCHOLOGY", "BƯỚC 01 · NỀN TẢNG & TÂM LÝ KHÁCH HÀNG", "الخطوة 01 · الأساسات وسيكولوجية العميل", "ШАГ 01 · СТРУКТУРА И СЦЕНАРИИ"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Délai : 48 à 72h</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Cadrage Stratégique & Arborescence de Conversion", "Strategic Scoping & Conversion Wireframes", "Cấu trúc Chiến lược & Wireframe Chuyển đổi", "التأطير الاستراتيجي وهيكلة التحويل", "Стратегический бриф и сценарии конверсии"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Nous définissons l'arborescence exacte de vos pages, les arguments clés qui rassurent vos visiteurs et les déclencheurs de prise de contact (appels, devis, réservations). Rien n'est laissé au hasard.",
                          "We define the precise page architecture, core value propositions and conversion triggers (phone calls, booking forms, purchases). Nothing is left to intuition.",
                          "Xác định cấu trúc trang chuẩn xác, luận điểm tạo niềm tin và điểm chạm kích hoạt liên hệ nhanh chóng.",
                          "نحدد هيكل الصفحات بدقة والنقاط التي تعزز ثقة العميل وتحفزه على التواصل الفوري أو الحجز المباشر.",
                          "Формируем структуру страниц, триггеры доверия и кнопки целевого действия под задачи вашего бизнеса.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Cahier des charges fonctionnel et inventaire des contenus nécessaires", "Functional specifications and asset inventory breakdown", "Bản đặc tả kỹ thuật và danh sách nội dung cần thiết", "تحديد الاحتياجات الفنية وجرد المحتوى المطلوب", "Техническое задание и список необходимых материалов"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Wireframe interactif des parcours mobiles et desktop", "Interactive mobile-first wireframing of primary journeys", "Sơ đồ khung tương tác tối ưu trên di động và máy tính", "مخططات تفاعلية للهيكل على الجوال والكمبيوتر", "Интерактивный wireframe ключевых страниц"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Validation conjointe avant la première ligne de design", "Mutual alignment and sign-off before design starts", "Thống nhất phương án trước khi triển khai thiết kế", "اعتماد مشترك قبل البدء في مرحلة التصميم", "Согласование структуры до начала работы дизайнера"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-3.5 py-2 text-xs font-semibold text-[#1A73E8]">
                        <Compass className="h-4 w-4" />
                        <span>{t(l("Livrable : Sitemap Interactif & Cadrage Fonctionnel", "Deliverable: Interactive Sitemap & Scope Document", "Bàn giao: Sơ đồ Website & Tài liệu Đặc tả", "المخرج: خريطة الموقع التفاعلية ووثيقة النطاق", "Результат: Интерактивная карта сайта и ТЗ"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveWebStep(1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Direction Artistique", "Next step: Art Direction", "Bước tiếp: Định hướng Nghệ thuật", "الخطوة التالية: الإخراج الفني", "Следующий шаг: Дизайн"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION WIREFRAME MOCKUP */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-white p-6 shadow-xl flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A73E8]">
                          SITEMAP & STRUCTURE UX
                        </span>
                        <span className="rounded-full bg-[#1A73E8]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#1A73E8]">
                          ÉDITORIAL MOBILE-FIRST
                        </span>
                      </div>

                      {/* Visual Wireframe Diagram */}
                      <div className="space-y-3 py-4 my-auto">
                        <div className="h-10 rounded-xl border border-dashed border-[#1A73E8]/40 bg-[#F0F5FF] p-2 flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-[#1A73E8]">01. HERO SECTION</span>
                          <span className="rounded bg-[#1A73E8] px-2 py-0.5 font-mono text-[9px] text-white">Accroche + Bouton Devis</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-16 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2 text-center flex flex-col justify-center">
                            <span className="font-mono text-[9px] text-[#52504A]">02. Prestations</span>
                            <span className="font-bold text-[10px] text-[#12110E]">Offres & Tarifs</span>
                          </div>
                          <div className="h-16 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2 text-center flex flex-col justify-center">
                            <span className="font-mono text-[9px] text-[#52504A]">03. Réassurance</span>
                            <span className="font-bold text-[10px] text-[#12110E]">Avis & Étoiles</span>
                          </div>
                          <div className="h-16 rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-2 text-center flex flex-col justify-center">
                            <span className="font-mono text-[9px] text-[#52504A]">04. Contact</span>
                            <span className="font-bold text-[10px] text-[#12110E]">Tunnel Rapide</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#FAF9F5] p-2.5 text-center font-mono text-[10.5px] text-[#52504A] border border-[#EBEBE6]">
                        ✓ Parcours épuré sans friction · 0 distraction inutile
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: DIRECTION ARTISTIQUE FIGMA */}
              {activeWebStep === 1 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EA4335]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#EA4335]">
                        <Palette className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 02 · DESIGN HAUTE COUTURE", "STEP 02 · BESPOKE ART DIRECTION", "BƯỚC 02 · THIẾT KẾ ĐỘC BẢN", "الخطوة 02 · الإخراج الفني الراقي", "ШАГ 02 · АРТ-ДИРЕКШН И FIGMA"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">100% Sur-Mesure</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Direction Artistique & Prototypage Figma", "Art Direction & High-Fidelity Figma", "Định hướng Nghệ thuật & Maquette Figma", "الإخراج الفني ونماذج فيغما التفاعلية", "Арт-дирекшн и прототипирование в Figma"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Zéro template générique ou thème préfabriqué. Nos directeurs artistiques composent un design qui reflète la stature de votre marque : typographies éditoriales, micro-interactions tactiles et élégance intemporelle.",
                          "Zero generic templates or cookie-cutter themes. Our art directors craft an interface that commands authority: bespoke editorial typography, tactile micro-interactions and timeless elegance.",
                          "Nói không với mẫu template đại trà. Đội ngũ sáng tạo xây dựng giao diện sang trọng, độc bản và tôn vinh đẳng cấp thương hiệu.",
                          "لا نستخدم أي قوالب مسبقة الصنع. يصمم فريقنا واجهة حصرية تليق بمكانة علامتك: خطوط تحريرية راقية، حركات تفاعلية ناعمة وأناقة مستدامة.",
                          "Никаких шаблонных тем. Арт-директор разрабатывает уникальный дизайн: премиальная типографика, выверенные отступы и статус бренда.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#EA4335]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Palette chromatique signature et système typographique hiérarchisé", "Signature colour palette and editorial typographic scale", "Bảng màu độc quyền và hệ thống phân cấp kiểu chữ", "لوحة ألوان متفردة وتناسق خطوط تحريرية راقية", "Фирменная палитра и иерархия шрифтов"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Maquettes complètes Desktop & Mobile sur Figma cliquable", "Complete interactive Figma prototype on mobile and desktop", "Maquette tương tác đầy đủ trên di động và máy tính", "نماذج كاملة وتفاعلية على Figma لكل من الجوال والكمبيوتر", "Интерактивный макет в Figma для смартфона и ПК"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Ajustements inclus jusqu'à validation complète de votre part", "Iterative refinements included until your full sign-off", "Bao gồm chỉnh sửa đến khi bạn hoàn toàn hài lòng", "تعديلات مشمولة حتى اعتمادك الكامل للتصميم", "Правки и доработки до полного утверждения вами"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#FCE8E6] px-3.5 py-2 text-xs font-semibold text-[#EA4335]">
                        <Palette className="h-4 w-4" />
                        <span>{t(l("Livrable : Prototype Figma Interactif Validé", "Deliverable: Approved Interactive Figma File", "Bàn giao: File Figma Tương tác Chuẩn hóa", "المخرج: ملف Figma التفاعلي المعتمد بالكامل", "Результат: Утверждённый интерактивный макет Figma"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveWebStep(2)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Ingénierie & Vitesse", "Next step: Engineering & Speed", "Bước tiếp: Lập trình & Tốc độ", "الخطوة التالية: الهندسة والسرعة", "Следующий шаг: Вёрстка"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION FIGMA CANVAS PREVIEW */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-[#1E1E1E] p-5 shadow-2xl text-white flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
                          <span className="font-mono text-xs text-white/90">figma · xr-studio-v2.fig</span>
                        </div>
                        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-[#16A34A]">
                          100% VECTORIEL
                        </span>
                      </div>

                      <div className="my-auto rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-white/60">SYSTÈME CHROMATIQUE</span>
                          <span className="text-white">5 Nuances Contrôlées</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-8 flex-1 rounded-lg bg-[#FAF9F5] border border-white/20" />
                          <div className="h-8 flex-1 rounded-lg bg-[#12110E]" />
                          <div className="h-8 flex-1 rounded-lg bg-[#1A73E8]" />
                          <div className="h-8 flex-1 rounded-lg bg-[#EA4335]" />
                          <div className="h-8 flex-1 rounded-lg bg-[#16A34A]" />
                        </div>
                        <div className="pt-1 text-[11px] font-serif text-white/80 italic">
                          "Typographies de prestige & contrastes certifiés WCAG AAA pour une lisibilité parfaite."
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                        <span>Responsive : Mobile 390px · Desktop 1440px</span>
                        <span className="text-[#EA4335]">Prêt pour le code</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: INGÉNIERIE & SCORE 100/100 */}
              {activeWebStep === 2 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#16A34A]">
                        <Gauge className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 03 · PERFORMANCE RADICALE", "STEP 03 · RADICAL PERFORMANCE", "BƯỚC 03 · HIỆU NĂNG ĐỈNH CAO", "الخطوة 03 · السرعة والأداء الفائق", "ШАГ 03 · СКОРОСТЬ И ЧИСТЫЙ КОД"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Chargement &lt; 0.8s</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Développement Épuré & Score 100/100 Lighthouse", "Clean Engineering & 100/100 Lighthouse", "Lập trình Tinh gọn & Điểm 100/100 Google", "تطوير نقي وسرعة 100/100 على Lighthouse", "Чистый код и 100/100 в Google Lighthouse"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Nous programmons votre site avec les technologies modernes les plus rapides (React, Vite, Tailwind). Pas de WordPress alourdi ni d'usines à gaz qui ralentissent vos clients : les pages s'ouvrent instantanément, favorisant votre ranking SEO.",
                          "We build with ultra-fast modern web standards (React, Vite, Tailwind). Zero bloated CMS plugins or sluggish page weights: pages snap open in sub-second speed, boosting both Google rankings and conversion.",
                          "Lập trình bằng công nghệ hiện đại nhất (React, Vite, Tailwind). Loại bỏ hoàn toàn plugin nặng nề giúp tải trang tức thì dưới 1 giây.",
                          "نبرمج موقعك بأحدث التقنيات وأسرعها (React, Vite, Tailwind) دون قوالب ووردبريس الثقيلة: تفتح الصفحات فوراً في أقل من ثانية.",
                          "Разрабатываем на современном стеке (React, Vite, Tailwind). Никаких медленных плагинов: загрузка быстрее 0.8 секунды.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#16A34A]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Score vert 95-100 sur Google PageSpeed & Core Web Vitals", "95-100 green score on Google PageSpeed & Core Web Vitals", "Đạt điểm xanh 95-100 trên Google PageSpeed", "نقاط خضراء من 95 إلى 100 في معايير Google PageSpeed", "Оценка 95–100 в Google PageSpeed"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Architecture SEO sémantique intégrée (balises Hn, Schema.org, OpenGraph)", "Built-in semantic SEO (Hn tags, Schema.org local entities, OpenGraph)", "Cấu trúc thẻ SEO chuẩn mực và dữ liệu có cấu trúc Schema", "بنية سيو مدمجة كاملة وعلامات Schema.org المحلية", "Семантическая разметка Schema.org и мета-теги"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Formulaires anti-spam invisibles sans captcha irritant pour vos prospects", "Invisible honeypot anti-spam with zero friction captchas for visitors", "Bảo vệ chống spam thông minh không cần captcha gây phiền", "حماية من الرسائل المزعجة بدون اختبارات كابتشا مزعجة", "Защита от спама без раздражающей капчи"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#E6F4EA] px-3.5 py-2 text-xs font-semibold text-[#16A34A]">
                        <Gauge className="h-4 w-4" />
                        <span>{t(l("Livrable : Code Source Optimisé & Certifié 100/100", "Deliverable: 100/100 Certified Source Code", "Bàn giao: Mã nguồn Tối ưu Chuẩn 100/100", "المخرج: كود مصدري نقي معتمد بنتيجة 100/100", "Результат: Оптимизированный исходный код 100/100"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveWebStep(3)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Déploiement & Cession", "Next step: Handover & Launch", "Bước tiếp: Bàn giao & Vận hành", "الخطوة التالية: التسليم ونقل الملكية", "Следующий шаг: Запуск"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION 4 LIGHTHOUSE GAUGES */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-white p-6 shadow-xl flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#12110E]">
                          AUDIT OFFICIEL GOOGLE LIGHTHOUSE
                        </span>
                        <span className="rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#16A34A]">
                          100% VERT
                        </span>
                      </div>

                      {/* 4 Green Gauges */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 my-auto py-2">
                        {[
                          { score: "100", label: "Performance" },
                          { score: "100", label: "Accessibilité" },
                          { score: "100", label: "Best Practices" },
                          { score: "100", label: "SEO Google" },
                        ].map((g, i) => (
                          <div key={i} className="flex flex-col items-center justify-center p-2 text-center">
                            <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-[#16A34A] bg-[#F0FDF4] font-mono text-xl font-bold text-[#16A34A] shadow-inner">
                              {g.score}
                            </div>
                            <span className="mt-2 text-[11px] font-semibold text-[#12110E]">{g.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl bg-[#F0FDF4] p-2.5 text-center font-mono text-[10.5px] text-[#16A34A] border border-[#16A34A]/20">
                        ⚡ Temps de chargement mesuré : 0.4s · First Contentful Paint immédiat
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DÉPLOIEMENT & CESSION 100% */}
              {activeWebStep === 3 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#B45309]">
                        <Award className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 04 · MISE EN LIGNE & LIBERTÉ TOTALE", "STEP 04 · LAUNCH & FULL OWNERSHIP", "BƯỚC 04 · VẬN HÀNH & TỰ CHỦ HOÀN TOÀN", "الخطوة 04 · الإطلاق ونقل الملكية الكاملة", "ШАГ 04 · ЗАПУСК И ПОЛНАЯ ПЕРЕДАЧА ПРАВ"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Zéro Lock-in</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Mise en Ligne Clé en Main & Cession de Propriété 100%", "Turnkey Launch & 100% Ownership Handover", "Bàn giao Trọn gói & Sở hữu Toàn bộ", "إطلاق شامل وتسليم ملكية 100% للمشروع", "Запуск под ключ и 100% передача всех прав"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Votre site est configuré sur un CDN mondial à haute disponibilité avec certificat SSL 256-bit. Nous connectons votre nom de domaine et vous remettons l'intégralité des accès et du code source. Vous n'êtes lié par aucun abonnement forcé.",
                          "Your site is deployed on an enterprise global CDN with automated 256-bit SSL encryption. We wire your domain and hand over 100% of credentials, source code and assets. Zero vendor lock-in.",
                          "Website được triển khai trên mạng lưới CDN toàn cầu với chứng chỉ SSL 256-bit. Bàn giao 100% mã nguồn và quyền quản trị không ràng buộc.",
                          "يتم نشر موقعك على شبكة CDN عالمية عالية الأمان بشهادة SSL مشفرة. نربط نطاقك ونسلمك الكود المصدري كاملاً وجميع الصلاحيات دون أي اشتراكات إجبارية.",
                          "Сайт размещается на глобальном CDN с SSL-сертификатом. Передаём 100% доступов и исходного кода без скрытых подписок.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#B45309]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Configuration DNS, domaine personnalisé et certificat SSL HTTPS automatique", "DNS routing, custom domain setup and automated 256-bit HTTPS SSL", "Cấu hình DNS, kết nối tên miền riêng và chứng chỉ SSL bảo mật", "ضبط إعدادات النطاق DNS وشهادة الأمان المشفرة HTTPS", "Настройка DNS, домена и бесплатного SSL"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Indexation immédiate sur Google Search Console & sitemap XML soumis", "Direct indexing on Google Search Console & XML sitemap submission", "Khai báo index ngay trên Google Search Console & sitemap XML", "أرشفة فورية على Google Search Console وتقديم ملف Sitemap", "Отправка sitemap в Google Search Console"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Garantie technique offerte de 30 jours après la mise en ligne", "Included 30-day post-launch technical warranty & refinements", "Bảo hành kỹ thuật miễn phí 30 ngày sau khi bàn giao", "ضمان تقني شامل لمدة 30 يوماً بعد تاريخ الإطلاق", "30 дней бесплатной технической гарантии"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#FEF7E0] px-3.5 py-2 text-xs font-semibold text-[#B45309]">
                        <ShieldCheck className="h-4 w-4" />
                        <span>{t(l("Livrable : Site En Ligne + Cession Propriété & Clés", "Deliverable: Live Site + 100% Ownership & Keys", "Bàn giao: Website Hoạt động + Bàn giao Quyền sở hữu", "المخرج: الموقع يعمل على الهواء + تسليم الصلاحيات والملكية", "Результат: Работающий сайт + передача всех доступов"))}</span>
                      </div>
                      <a
                        href="#plans"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Choisir ma formule de site", "Choose my website plan", "Chọn gói website", "اختر باقة موقعك", "Выбрать тариф сайта"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* ILLUSTRATION OWNERSHIP & SECURITY KEYS */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-gradient-to-br from-[#FFFDF7] to-[#FAF9F5] p-6 shadow-xl flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#12110E]">
                          PASSEPORT DE PROPRIÉTÉ
                        </span>
                        <span className="rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#16A34A]">
                          100% INDÉPENDANT
                        </span>
                      </div>

                      {/* Certificate Box */}
                      <div className="my-auto rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#12110E] text-white">
                            <Lock className="h-5 w-5 text-[#E5C696]" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-medium text-[#12110E]">
                              Cession Intégrale XR AGENCY
                            </h4>
                            <p className="font-mono text-[10px] text-[#52504A]">
                              Certificat de transfert de droits et de code
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                          <div className="rounded-lg bg-[#FAF9F5] p-2 border border-[#EBEBE6]">
                            <span className="text-[#52504A] block text-[9.5px]">CODE SOURCE</span>
                            <strong className="text-[#12110E]">GitHub / Archive ZIP</strong>
                          </div>
                          <div className="rounded-lg bg-[#FAF9F5] p-2 border border-[#EBEBE6]">
                            <span className="text-[#52504A] block text-[9.5px]">NOM DE DOMAINE</span>
                            <strong className="text-[#12110E]">100% à votre nom</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-[#52504A]">
                        <span>CDN Mondial : 300+ PoPs</span>
                        <span className="font-bold text-[#16A34A]">Garantie 30j active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Summary Pills */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-4">
              {[
                { n: "01", t: l("Cadrage & UX", "Scoping & UX", "Cấu trúc & UX", "التأطير وUX", "Бриф"), c: "#1A73E8" },
                { n: "02", t: l("Design Figma", "Figma Design", "Thiết kế Figma", "تصميم فيغما", "Дизайн"), c: "#EA4335" },
                { n: "03", t: l("Vitesse Score 100", "Speed Score 100", "Tốc độ 100", "السرعة 100", "Скорость"), c: "#16A34A" },
                { n: "04", t: l("Cession 100%", "100% Handover", "Bàn giao 100%", "نقل الملكية", "Запуск"), c: "#F59E0B" },
              ].map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveWebStep(i)}
                  className={`rounded-2xl p-3 text-start transition border ${
                    activeWebStep === i
                      ? "border-[#12110E] bg-white shadow-sm"
                      : "border-[#EBEBE6] bg-[#FAF9F5] hover:border-[#12110E]"
                  }`}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: pill.c }}>
                    {pill.n}
                  </span>
                  <div className="mt-1 font-serif text-xs font-medium text-[#12110E] truncate">
                    {t(pill.t)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Interactive Formula Recommender ("Quel site pour votre projet ?") */}
        <section id="simulateur-express" className="border-b border-[#E8E6E0] bg-[#FAF9F5] py-16 text-[#12110E] sm:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#12110E]">
                <Sparkles className="h-3 w-3 text-[#12110E]" />
                {t(l("SIMULATEUR DE RECOMMANDATION EXPRESS", "EXPRESS RECOMMENDATION SIMULATOR", "CÔNG CỤ GỢI Ý GÓI PHÙ HỢP", "أداة التوصية الفورية بالباقة", "ПОДБОР ОПТИМАЛЬНОГО ТАРИФА"))}
              </span>
              <h2 className="mt-3 font-serif text-2xl font-medium sm:text-4xl text-[#12110E]">
                {t(l("Trouvez en 3 clics la formule idéale pour votre activité.", "Find the ideal plan for your business in 3 clicks.", "Tìm gói phù hợp nhất chỉ sau 3 cú nhấp.", "اعثر على الباقة المثالية لنشاطك بـ 3 نقرات.", "Подберите идеальный тариф для вашего проекта в 3 клика."))}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-xs text-[#52504A] sm:text-sm">
                {t(l("Sélectionnez vos critères : le simulateur vous oriente immédiatement vers l'envergure technique et le budget adaptés.", "Select your criteria: get an instant recommendation for your technical scope and budget.", "Chọn tiêu chí để nhận ngay gợi ý phạm vi và ngân sách chuẩn xác.", "اختر المعايير ليحدد لك النظام الباقة والتكلفة المناسبة فوراً.", "Укажите критерии: мы сразу покажем подходящий формат и бюджет."))}
              </p>
            </div>

            {/* 3 Steps selector */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Question 1: Activity need */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase text-[#12110E]">
                  {t(l("1. Typologie du projet", "1. Project Type", "1. Loại hình dự án", "1. نوع المشروع", "1. Тип проекта"))}
                </span>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "vitrine" as const, title: l("Artisan & Profession Libérale", "Trades & Professional", "Nghề thủ công & Tự do", "حرفي ومهني حر", "Услуги и частная практика"), sub: l("Présentation claire & contact", "Clear presence & direct contact", "Giới thiệu & liên hệ nhanh", "حضور واضح وتواصل مباشر", "Презентация и контакты") },
                    { id: "business" as const, title: l("PME, Cabinet & Établissement", "SME, Advisory & Venue", "Doanh nghiệp & Đơn vị cao cấp", "شركة ومؤسسة استشارية", "Компания, клиника, заведение"), sub: l("Crédibilité, SEO & prise de RDV", "Authority, SEO & booking", "Uy tín, SEO & đặt lịch", "مصداقية وسيو وحجز مواعيد", "Статус, SEO и запись") },
                    { id: "ecommerce" as const, title: l("Marque, Boutique & Vente", "Brand & Online Store", "Thương hiệu & Cửa hàng", "علامة تجارية ومتجر بيع", "Бренд и интернет-магазин"), sub: l("Catalogue & paiement CB en ligne", "Catalogue & card payments", "Danh mục & thanh toán thẻ", "كتالوج ودفع إلكتروني", "Каталог и онлайн-оплата") },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizNeed(opt.id)}
                      className={`w-full text-start rounded-xl p-3 text-xs transition border ${
                        quizNeed === opt.id
                          ? "border-[#12110E] bg-[#12110E] text-white shadow-sm"
                          : "border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <div className="font-semibold">{t(opt.title)}</div>
                      <div className={`text-[10px] mt-0.5 ${quizNeed === opt.id ? "text-white/70" : "text-[#52504A]"}`}>{t(opt.sub)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Volume of pages */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase text-[#12110E]">
                  {t(l("2. Volume de pages", "2. Page Scope", "2. Số lượng trang", "2. عدد الصفحات", "2. Объём страниц"))}
                </span>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "starter" as const, title: l("1 à 3 pages complètes", "1 to 3 structured pages", "1 đến 3 trang hoàn chỉnh", "1 إلى 3 صفحات منظمة", "1–3 страницы"), sub: l("Essentiel : Accueil, Prestations, Contact", "Core: Home, Services, Contact", "Cốt lõi: Trang chủ, Dịch vụ, Liên hệ", "الأساس: الرئيسية، الخدمات، التواصل", "Главная, услуги, контакты") },
                    { id: "expanded" as const, title: l("Jusqu'à 15 pages sur mesure", "Up to 15 bespoke pages", "Tối đa 15 trang may đo", "حتى 15 صفحة مخصصة", "До 15 страниц"), sub: l("Pages métiers, blog, avis & réalisations", "Detailed subpages, blog, portfolio", "Trang ngành, blog, dự án tiêu biểu", "صفحات تفصيلية، مدونة، أعمال سابقة", "Услуги, блог, кейсы и отзывы") },
                    { id: "catalog" as const, title: l("Catalogue illimité", "Unlimited Catalogue", "Danh mục không giới hạn", "كتالوج منتجات غير محدود", "Каталог без ограничений"), sub: l("Fiches produits, variantes & filtres", "Product sheets, variants & filters", "Chi tiết sản phẩm & bộ lọc", "بطاقات منتجات وخيارات متعددة", "Карточки товаров и фильтры") },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizPages(opt.id)}
                      className={`w-full text-start rounded-xl p-3 text-xs transition border ${
                        quizPages === opt.id
                          ? "border-[#12110E] bg-[#12110E] text-white shadow-sm"
                          : "border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <div className="font-semibold">{t(opt.title)}</div>
                      <div className={`text-[10px] mt-0.5 ${quizPages === opt.id ? "text-white/70" : "text-[#52504A]"}`}>{t(opt.sub)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Key Feature */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase text-[#12110E]">
                  {t(l("3. Fonctionnalité clé", "3. Key Capability", "3. Tính năng ưu tiên", "3. الميزة الأساسية", "3. Ключевая функция"))}
                </span>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "seo" as const, title: l("Formulaire & Référencement", "Contact & Core SEO", "Biểu mẫu & SEO cơ bản", "نموذج وسيو أساسي", "Форма и базовое SEO"), sub: l("Visibilité Google & contact WhatsApp", "Google search & direct WhatsApp", "Hiện diện Google & WhatsApp", "ظهور جوجل وتواصل واتساب", "Поиск Google и WhatsApp") },
                    { id: "booking" as const, title: l("Prise de RDV / Devis dynamique", "Booking / Dynamic Quote", "Đặt lịch / Tính báo giá tự động", "حجز مواعيد / تسعير ديناميكي", "Запись / Интерактивный расчёт"), sub: l("Synchronisation calendrier & filtres", "Calendar sync & custom lead filters", "Đồng bộ lịch & phân loại khách", "مزامنة التقويم وتصنيف الطلبات", "Синхронизация с календарём") },
                    { id: "payment" as const, title: l("Paiement sécurisé Stripe / CB", "Stripe & Card Payments", "Thanh toán thẻ / Stripe", "دفع إلكتروني آمن بالبطاقات", "Приём платежей Stripe и картами"), sub: l("Paniers, facturation & e-mails auto", "Cart, invoices & auto emails", "Giỏ hàng, hóa đơn & email tự động", "سلة شراء وفواتير وبريد تلقائي", "Корзина и авто-чеки") },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizFeature(opt.id)}
                      className={`w-full text-start rounded-xl p-3 text-xs transition border ${
                        quizFeature === opt.id
                          ? "border-[#12110E] bg-[#12110E] text-white shadow-sm"
                          : "border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <div className="font-semibold">{t(opt.title)}</div>
                      <div className={`text-[10px] mt-0.5 ${quizFeature === opt.id ? "text-white/70" : "text-[#52504A]"}`}>{t(opt.sub)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Calculated Result Card */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-white p-6 text-[#12110E] shadow-xl sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#12110E] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
                      ★ {t(l("VOTRE RECOMMANDATION SUR-MESURE", "YOUR BESPOKE RECOMMENDATION", "GÓI GỢI Ý DÀNH RIÊNG CHO BẠN", "توصيتك المخصصة", "ВАША ОПТИМАЛЬНАЯ КОНФИГУРАЦИЯ"))}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#16A34A]">
                      {t(computedPlan.timeline)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-medium sm:text-3xl text-[#12110E]">
                    {t(computedPlan.name)}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#52504A] sm:text-sm">
                    {t(computedPlan.desc)}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                  <div className="text-start lg:text-end">
                    <div className="font-serif text-4xl font-bold text-[#12110E]">
                      {price(computedPlan.price)}
                    </div>
                    <div className="font-mono text-[11px] text-[#52504A]">
                      {t(l("ou", "or", "hoặc", "أو", "или"))} {price(computedPlan.monthly)} {monthlyPeriodLabel} {t(l("(12 mois)", "(12 mo)", "(12 tháng)", "(12 شهراً)", "(12 мес)"))}
                    </div>
                  </div>
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    <span>{t(l("Voir les détails de cette formule", "View plan details", "Xem chi tiết gói này", "عرض تفاصيل الباقة", "Смотреть детали тарифа"))}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Website Plans: 499 / 799 / 1 499 € */}
        <section id="plans" className="bg-white py-16 text-[#12110E] sm:py-24 border-b border-[#E8E6E0]">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-[#EBEBE6] pb-8 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#12110E]">
                  {t(l("TARIFS OFFICIELS TRANSPARENTS · 100% CESSION", "OFFICIAL TRANSPARENT PRICING · 100% OWNERSHIP", "BẢNG GIÁ CHÍNH THỨC · SỞ HỮU TRỌN ĐỜI", "الأسعار الرسمية الشفافة · ملكية تامة", "ОФИЦИАЛЬНЫЕ ТАРИФЫ · 100% ВАША СОБСТВЕННОСТЬ"))}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-medium sm:text-5xl text-[#12110E]">
                  {t(l("Choisissez l’envergure de votre site web.", "Choose the right scope for your website.", "Chọn quy mô website phù hợp.", "اختر حجم موقعك الإلكتروني.", "Выберите формат вашего сайта."))}
                </h2>
                <p className="mt-2 text-xs text-[#52504A] sm:text-sm">
                  {t(l("Aucun frais caché. Code source et nom de domaine 100% cédés. Garantie 30 jours après mise en ligne.", "No hidden fees. 100% source code and domain ownership. 30-day post-launch warranty.", "Không chi phí ẩn. Bàn giao 100% mã nguồn và tên miền. Bảo hành 30 ngày.", "بدون أي رسوم خفية. ملكية تامة للمصدر والنطاق وضمان 30 يوماً.", "Без скрытых доплат. Полная передача прав на код и домен. Гарантия 30 дней."))}
                </p>
              </div>

              <div className="inline-flex rounded-full border border-[#D5D5CF] bg-[#F5F5F0] p-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPaymentMode("once")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    paymentMode === "once" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A]"
                  }`}
                >
                  {t(l("Paiement comptant", "One-time payment", "Thanh toán một lần", "دفعة واحدة", "Разовый платёж"))}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("monthly")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    paymentMode === "monthly" ? "bg-[#12110E] text-white shadow-sm" : "text-[#52504A]"
                  }`}
                >
                  {t(l("Mensualités 12 mois", "12-month instalments", "Trả góp 12 tháng", "أقساط 12 شهراً", "Рассрочка 12 мес."))}
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {service.plans.map((p, idx) => {
                const displayEur =
                  paymentMode === "monthly" ? Math.round((p.eur * 1.4) / 12) : p.eur;
                const timeline =
                  idx === 0
                    ? t(l("⚡ Livraison en 7 à 10 jours ouvrés", "⚡ Delivery in 7 to 10 working days", "⚡ Bàn giao trong 7 đến 10 ngày làm việc", "⚡ التسليم خلال 7 إلى 10 أيام عمل", "⚡ Запуск за 7–10 рабочих дней"))
                    : idx === 1
                    ? t(l("⚡ Livraison en 14 à 21 jours ouvrés", "⚡ Delivery in 14 to 21 working days", "⚡ Bàn giao trong 14 đến 21 ngày làm việc", "⚡ التسليم خلال 14 إلى 21 يوم عمل", "⚡ Запуск за 14–21 рабочий день"))
                    : t(l("⚡ Livraison en 21 à 30 jours ouvrés", "⚡ Delivery in 21 to 30 working days", "⚡ Bàn giao trong 21 đến 30 ngày làm việc", "⚡ التسليم خلال 21 إلى 30 يوم عمل", "⚡ Запуск за 21–30 рабочих дней"));

                return (
                  <div
                    key={idx}
                    className={`flex flex-col justify-between rounded-3xl border p-7 transition-all duration-300 ${
                      p.popular
                        ? "border-2 border-[#12110E] bg-white shadow-xl ring-1 ring-black/5"
                        : "border border-[#E5E5E0] bg-[#FAF9F5] hover:border-[#12110E]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#52504A]">
                          {t(l("FORMULE", "PLAN", "GÓI", "باقة", "ТАРИФ"))} 0{idx + 1}
                        </span>
                        {p.popular && (
                          <span className="rounded-full bg-[#12110E] px-3 py-1 font-mono text-[10px] font-semibold uppercase text-white">
                            {t(l("Le plus choisi", "Most chosen", "Phổ biến nhất", "الأكثر اختياراً", "Популярный выбор"))}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-serif text-3xl font-medium text-[#12110E]">{t(p.name)}</h3>

                      {/* Delivery timeline micro-badge */}
                      <div className="mt-2 font-mono text-[10.5px] font-semibold text-[#16A34A]">
                        {timeline}
                      </div>

                      <div className="mt-4 flex items-baseline gap-2 border-y border-[#EBEBE6] py-5">
                        <span className="font-serif text-5xl font-semibold text-[#12110E]">
                          {price(displayEur)}
                        </span>
                        <span className="font-mono text-xs text-[#52504A]">
                          {paymentMode === "monthly"
                            ? t(l("/ mois (12 mois)", "/ month (12 mo)", "/ tháng (12 tháng)", "/ شهر (12 شهراً)", "/ мес (12 мес)"))
                            : t(PERIOD_LABEL.once)}
                        </span>
                      </div>
                      {paymentMode === "monthly" && (
                        <p className="mt-1 font-mono text-[11px] text-[#52504A]">
                          {t(l(`Soit ${Math.round(p.eur * 1.4)} € au total sur 12 mois`, `Total €${Math.round(p.eur * 1.4)} over 12 months`, `Tổng ${Math.round(p.eur * 1.4)} € trong 12 tháng`, `الإجمالي ${Math.round(p.eur * 1.4)} € على 12 شهراً`, `Итого ${Math.round(p.eur * 1.4)} € за 12 месяцев`))}
                        </p>
                      )}
                      <ul className="mt-5 space-y-2.5">
                        {(p.features ?? []).map((f, k) => (
                          <li key={k} className="flex items-start gap-2.5 text-xs text-[#2B2925]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                            <span>{t(f)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 space-y-2.5">
                      <AddToCartBtn
                        item={{
                          serviceId: "websites",
                          serviceName: t(service.title),
                          planName: t(p.name) + (paymentMode === "monthly" ? " (12m)" : ""),
                          priceEur: displayEur,
                          period: paymentMode === "monthly" ? "month" : "once",
                          periodLabel: paymentMode === "monthly" ? monthlyPeriodLabel : t(PERIOD_LABEL.once),
                        }}
                        popular={p.popular}
                      />
                      <a
                        href={`${WA_BASE}${encodeURIComponent(`${t(l("Bonjour XR Agency, je souhaite lancer mon", "Hello XR Agency, I would like to start my", "Xin chào XR Agency, tôi muốn triển khai gói", "مرحبًا XR Agency، أود بدء مشروع", "Здравствуйте, XR Agency! Хочу запустить"))} ${t(p.name)} (${price(displayEur)}).`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-3 text-xs font-semibold text-[#12110E] transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                        {t(l("Discuter sur WhatsApp", "Chat on WhatsApp", "Trao đổi WhatsApp", "تواصل عبر واتساب", "Написать в WhatsApp"))}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reassurance Triple Banner */}
            <div className="mt-12 grid grid-cols-1 gap-4 rounded-3xl border border-[#E5E5E0] bg-[#FAF9F5] p-6 sm:grid-cols-3 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-[#16A34A]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#12110E]">{t(l("Cession de propriété 100%", "100% Ownership Transfer", "Bàn giao quyền sở hữu 100%", "ملكية 100% لك", "100% передача прав"))}</h4>
                  <p className="text-[11px] text-[#52504A]">{t(l("Code source, nom de domaine et design vous appartiennent.", "Source code, domain and design are entirely yours.", "Mã nguồn, tên miền và thiết kế thuộc về bạn.", "الكود والنطاق والتصميم ملك خالص لك.", "Исходный код, домен и дизайн полностью ваши."))}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 shrink-0 text-[#12110E]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#12110E]">{t(l("Garantie 30 jours après mise en ligne", "30-Day Post-Launch Warranty", "Bảo hành 30 ngày sau ra mắt", "ضمان 30 يوماً بعد الإطلاق", "Гарантия 30 дней после запуска"))}</h4>
                  <p className="text-[11px] text-[#52504A]">{t(l("Ajustements techniques et corrections mineures offerts.", "Free technical adjustments and minor refinements.", "Chỉnh sửa kỹ thuật và tinh chỉnh miễn phí.", "تعديلات تقنية وضبط مجاني.", "Бесплатные доработки и поддержка."))}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 shrink-0 text-[#12110E]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#12110E]">{t(l("Zéro abonnement captif", "Zero Vendor Lock-in", "Không thuê bao ràng buộc", "بدون اشتراك إجباري", "Без скрытых подписок"))}</h4>
                  <p className="text-[11px] text-[#52504A]">{t(l("Vous êtes libre d'héberger votre site où vous le souhaitez.", "Host your site anywhere you prefer without restriction.", "Tự do lưu trữ ở bất kỳ đâu bạn muốn.", "حرية كاملة في استضافة موقعك أينما تشاء.", "Свобода размещения на любом хостинге."))}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2. GOOGLE MAPS STUDIO PAGE (/services/maps) — 100% LUMINEUSE & LUDIQUE
// ════════════════════════════════════════════════════════════════════════════
export function MapsDominationStudioPage() {
  const { t, price, lang } = useLang();
  const isRtl = lang === "ar";
  const perYear = t(l("/ an", "/ year", "/ năm", "/ سنة", "/ год"));
  const perMonth = t(l("/ mois", "/ month", "/ tháng", "/ شهر", "/ мес"));

  // Interactive Simulator & Funnel State
  const [selectedSector, setSelectedSector] = useState<
    "resto" | "artisan" | "hotel" | "sante" | "avocat" | "beaute"
  >("resto");
  const [currentRank, setCurrentRank] = useState<"invisible" | "inter" | "unoptimized">("invisible");
  const [userKeywords, setUserKeywords] = useState<string[]>([
    "restaurant gastronomique",
    "meilleure terrasse",
    "dîner romantique",
  ]);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [cityScale, setCityScale] = useState<"small" | "medium" | "metro">("medium");
  const [selectedCity, setSelectedCity] = useState<string>("Paris");
  const [customCity, setCustomCity] = useState<string>("");
  const [simState, setSimState] = useState<"after" | "before">("after");
  const [simNotice, setSimNotice] = useState<string | null>(null);

  // Interactive Customer Journey Step
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);

  const displayCity = customCity.trim() || selectedCity;

  const sectors = [
    {
      id: "resto" as const,
      icon: Utensils,
      label: l("Restaurant & Café", "Restaurant & Cafe", "Nhà hàng & Cafe", "مطعم ومقهى", "Ресторан и кафе"),
      sampleName: l("L'Atelier des Saveurs", "The Flavor Workshop", "Xưởng Vị Giác", "ورشة النكهات", "Мастерская Вкуса"),
      category: l("Restaurant gastronomique français", "Fine French dining", "Nhà hàng Pháp cao cấp", "مطعم فرنسي راقٍ", "Французская кухня"),
      photo: sectorRestaurant,
      searchQuery: l("restaurant gastronomique", "fine dining restaurant", "nhà hàng cao cấp", "مطعم راقٍ", "гастрономический ресторан"),
      suggestedKeywords: ["restaurant gastronomique", "meilleure terrasse", "brunch dimanche", "privatisation restaurant", "traiteur événementiel"],
    },
    {
      id: "artisan" as const,
      icon: Wrench,
      label: l("Artisan & BTP", "Trades & Construction", "Thợ & Xây dựng", "حرفي ومقاولات", "Мастер и ремонт"),
      sampleName: l("Maison Rénovation Prestige", "Prestige Home Renovation", "Cải tạo Nhà Đẳng cấp", "ترميم راقٍ للمنازل", "Престиж Ремонт"),
      category: l("Entreprise de rénovation et menuiserie", "Renovation & joinery firm", "Công ty cải tạo & mộc", "شركة ترميم وديكور", "Ремонт и отделка"),
      photo: sectorConstruction,
      searchQuery: l("artisan renovation", "home renovation contractor", "thợ cải tạo nhà", "مقاول ترميم", "мастер по ремонту"),
      suggestedKeywords: ["entreprise rénovation", "artisan menuisier", "rénovation appartement", "devis travaux btp", "artisan qualifié"],
    },
    {
      id: "hotel" as const,
      icon: Building2,
      label: l("Hôtel & Résidence", "Hotel & Luxury Stay", "Khách sạn & Khu nghỉ dưỡng", "فندق ومنتجع", "Отель и курорт"),
      sampleName: l("Villa Belle Époque · Boutique Hôtel", "Belle Epoque Villa Boutique Hotel", "Khách sạn Boutique Belle Epoque", "فندق بوتيك فيلا بيل إيبوك", "Вилла Бель Эпок Отель"),
      category: l("Hôtel 4 étoiles & Spa", "4-star boutique hotel & spa", "Khách sạn 4 sao & Spa", "فندق 4 نجوم ومنتجع", "Отель 4 звезды и спа"),
      photo: pfMaisonLumiere,
      searchQuery: l("hotel boutique spa", "boutique hotel spa", "khách sạn boutique spa", "فندق بوتيك سبا", "бутик-отель спа"),
      suggestedKeywords: ["boutique hôtel spa", "séjour de luxe", "chambre vue panoramique", "réservation direct hôtel", "séminaire hôtel de charme"],
    },
    {
      id: "sante" as const,
      icon: Sparkles,
      label: l("Cabinet Médical & Dentaire", "Medical & Dental Clinic", "Phòng khám & Nha khoa", "عيادة طبية وأسنان", "Клиника и стоматология"),
      sampleName: l("Centre Dentaire & Esthétique Sourire", "Dental & Aesthetic Smile Clinic", "Trung tâm Nha khoa Thẩm mỹ", "مركز طب وتجميل الأسنان", "Стоматологический центр"),
      category: l("Cabinet dentaire conventionné", "Dental surgery practice", "Phòng khám nha khoa", "عيادة أسنان معتمدة", "Стоматологическая клиника"),
      photo: sectorHealth,
      searchQuery: l("dentiste cabinet medical", "dentist dental clinic", "nha sĩ phòng khám", "طبيب أسنان عيادة", "стоматолог клиника"),
      suggestedKeywords: ["chirurgien esthétique", "cabinet dentaire", "blanchiment dentaire", "médecine esthétique", "urgence dentaire"],
    },
    {
      id: "avocat" as const,
      icon: ShieldCheck,
      label: l("Avocat & Notaire", "Lawyer & Notary", "Luật sư & Công chứng", "محاماة وتوثيق", "Юрист и нотариус"),
      sampleName: l("Cabinet Associés Droit & Conseil", "Legal & Advisory Partners", "Công ty Luật & Tư vấn", "مكتب محاماة واستشارات", "Юридическая коллегия"),
      category: l("Cabinet d'avocats au Barreau", "Bar-registered law firm", "Văn phòng luật sư", "مكتب محاماة معتمد", "Адвокатский кабинет"),
      photo: XR_PHOTOS.strategy,
      searchQuery: l("avocat droit affaires", "business lawyer", "luật sư doanh nghiệp", "محامي شركات", "юрист по бизнесу"),
      suggestedKeywords: ["avocat droit des affaires", "cabinet avocat fiscaliste", "conseil juridique entreprise", "avocat fusion acquisition", "contentieux commercial"],
    },
    {
      id: "beaute" as const,
      icon: Star,
      label: l("Beauté & Spa", "Beauty & Wellness", "Làm đẹp & Spa", "Tư vấn & Spa", "Красота и спа"),
      sampleName: l("Institut Harmonie & Soins Privés", "Harmony Private Spa & Beauty", "Viện Chăm sóc & Spa Riêng", "معهد العناية والسبا الخاص", "Институт Красоты и Спа"),
      category: l("Institut de beauté & massages", "Beauty salon & wellness massages", "Spa làm đẹp & massage", "صالون تجميل وعناية", "Салон красоты и массаж"),
      photo: XR_PHOTOS.branding,
      searchQuery: l("institut beaute spa", "beauty salon spa", "spa làm đẹp", "صالون تجميل سبا", "салон красоты спа"),
      suggestedKeywords: ["institut de beauté de luxe", "soin visage haute technologie", "massage bien-être", "épilation laser définitive", "spa privatif"],
    },
  ];

  const currentSector = sectors.find((s) => s.id === selectedSector) ?? sectors[0];
  const citiesList = ["Paris", "Lyon", "Bordeaux", "Marseille", "Nice", "Da Nang", "Genève"];

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !userKeywords.includes(trimmed)) {
      setUserKeywords((prev) => [...prev, trimmed]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setUserKeywords((prev) => prev.filter((k) => k !== kw));
  };

  const handleToggleSuggested = (kw: string) => {
    if (userKeywords.includes(kw)) {
      setUserKeywords((prev) => prev.filter((k) => k !== kw));
    } else {
      setUserKeywords((prev) => [...prev, kw]);
    }
  };

  // Dynamic estimate calculation based on user's exact parameters
  const calculatedEstimate = (() => {
    let base = 999;
    const count = userKeywords.length;
    if (count > 3 && count <= 6) {
      base += 290;
    } else if (count > 6) {
      base += 290 + (count - 6) * 85;
    }
    if (cityScale === "medium") base += 150;
    if (cityScale === "metro") base += 350;
    if (currentRank === "invisible") base += 120;
    return base;
  })();

  const selectedKeywordsLabel = `${userKeywords.length} mot(s)-clé(s) sélectionné(s)`;

  const selectedRankLabel =
    currentRank === "invisible"
      ? "Absent ou hors Top 20"
      : currentRank === "inter"
      ? "Position 4 à 10 (proche du Pack)"
      : "Fiche existante mais mal optimisée";

  const selectedCityScaleLabel =
    cityScale === "small"
      ? "Commune locale (< 50 000 hab.)"
      : cityScale === "medium"
      ? "Agglomération (50 000 à 200 000 hab.)"
      : "Grande métropole (200 000+ hab.)";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#FAF9F5] text-[#12110E]">
      <Nav />
      <main>
        {/* ════════════════════════════════════════════════════════════════════
            1. HERO LUMINEUX : PUR, ÉLÉGANT, SANS MOTIF ARTIFICIEL
           ════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white pb-16 pt-24 border-b border-[#E8E6E0] sm:pb-24 sm:pt-32">
          {/* Soft ambient lighting — warm and natural, ZERO square grid */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,115,232,0.06),transparent_65%)]" />

          <div className="relative mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1A73E8]/20 bg-[#1A73E8]/8 px-4 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#1A73E8]">
                <MapPin className="h-3.5 w-3.5 text-[#EA4335]" />
                {t(l("VISIBILITÉ GOOGLE MAPS · DOMINATION DU PACK LOCAL", "GOOGLE MAPS VISIBILITY · LOCAL PACK DOMINATION", "HIỂN THỊ GOOGLE MAPS · CHIẾM LĨNH TOP ĐỊA PHƯƠNG", "خرائط GOOGLE · تصدر حزمة البحث المحلي", "GOOGLE MAPS · ЛИДЕРСТВО В LOCAL PACK"))}
              </span>

              <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.6vw,4.8rem)] font-medium leading-[1.04] tracking-tight text-[#12110E]">
                {t(l("Faites de Google Maps votre premier canal", "Make Google Maps your primary channel", "Biến Google Maps thành kênh đón khách", "اجعل خرائط Google قناتك الأولى", "Сделайте Google Maps главным источником"))}{" "}
                <span className="relative inline-block text-[#1A73E8]">
                  {t(l("d'acquisition locale.", "for local clients.", "khách hàng tại địa phương.", "لاكتساب العملاء محلياً.", "локальных клиентов."))}
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#52504A] sm:text-base">
                {t(
                  l(
                    "97% des consommateurs recherchent un commerce ou un artisan local sur Google Maps. Nous positionnons votre établissement dans le Top 3 du Pack Local et assurons la gestion continue de votre e-réputation avec une rigueur absolue.",
                    "97% of consumers search for nearby businesses on Google Maps. We elevate your profile to the Local 3-Pack and manage your reputation with absolute precision.",
                    "97% khách hàng tìm kiếm địa điểm trên Google Maps. Chúng tôi đưa bạn vào Top 3 Local Pack và bảo chứng uy tín thương hiệu.",
                    "97% من العملاء يبحثون عن الأنشطة التجارية عبر خرائط Google. نضع نشاطك ضمن أفضل 3 نتائج محلية وندير سمعتك بدقة متناهية.",
                    "97% клиентов ищут заведения и услуги на Google Maps. Мы выводим вас в топ-3 Local Pack и системно управляем репутацией.",
                  ),
                )}
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#simulateur-devis"
                  className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                >
                  <Sparkles className="h-4 w-4 text-[#C27838]" />
                  {t(l("Simulateur de Devis & Conquête Local Pack", "Local Pack & Quote Simulator", "Mô phỏng Báo giá & Chiếm lĩnh Local Pack", "محاكاة التسعير وتصدر الخرائط", "Калькулятор продвижения в Local Pack"))}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#offres"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-6 py-3.5 text-xs font-semibold text-[#12110E] shadow-sm transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                >
                  {t(l("Découvrir les 2 formules officielles", "Explore the 2 official plans", "Khám phá 2 gói chính thức", "عرض الباقتين الرسميتين", "Смотреть 2 официальных тарифа"))}
                </a>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                LES 2 VRAIES OFFRES OFFICIELLES GOOGLE MAPS (999 € AN & 99 € MOIS)
               ════════════════════════════════════════════════════════════════ */}
            <div id="offres" className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* OFFRE 01 : STRATÉGIE & CONQUÊTE DU TOP 3 (ANNUELLE) */}
              <div className="relative flex flex-col justify-between rounded-3xl border border-[#1A73E8]/30 bg-white p-7 shadow-lg transition-all duration-300 hover:border-[#1A73E8] hover:shadow-xl sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBEBE6] pb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A73E8]/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                      <Compass className="h-3.5 w-3.5 text-[#1A73E8]" />
                      {t(l("OFFRE 01 · STRATÉGIE ANNUELLE", "PLAN 01 · ANNUAL STRATEGY", "GÓI 01 · CHIẾN LƯỢC NĂM", "العرض 01 · استراتيجية سنوية", "ТАРИФ 01 · ГОДОВАЯ СТРАТЕГИЯ"))}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#52504A]">
                      {t(l("Audit & Diagnostic de zone inclus", "Area audit & diagnostic included", "Bao gồm kiểm toán khu vực", "يشمل تدقيق المنطقة", "Аудит локации включён"))}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                    {t(l("Stratégie de Conquête Top 3 Google Maps", "Google Maps Top 3 Conquest Strategy", "Chiến lược Chiếm lĩnh Top 3 Google Maps", "استراتيجية تصدر أفضل 3 نتائج على الخرائط", "Стратегия вывода в топ-3 Google Maps"))}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#52504A]">
                      {t(l("À partir de", "From", "Từ", "ابتداءً من", "От"))}
                    </span>
                    <span className="font-serif text-4xl font-bold text-[#12110E] sm:text-5xl">
                      {price(999)}
                    </span>
                    <span className="font-mono text-xs text-[#52504A]">{perYear}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#52504A]">
                    {t(
                      l(
                        "Plan d'action annuel sur mesure selon vos mots-clés stratégiques, votre position actuelle sur Maps et l'intensité concurrentielle de votre zone. Conçu pour hisser durablement votre établissement dans le Local 3-Pack.",
                        "Tailored annual action plan based on your target keywords, current map ranking and local competitor strength. Designed to secure your presence in the Local 3-Pack.",
                        "Kế hoạch hành động hằng năm tùy chỉnh theo từ khóa, vị trí hiện tại và mức độ cạnh tranh tại khu vực của bạn.",
                        "خطة سنوية مخصصة تعتمد على كلماتك المفتاحية وموقعك الحالي وقوة المنافسين في منطقتك لدخول حزمة أفضل 3 نتائج.",
                        "Индивидуальный годовой план на основе ваших ключевых запросов, текущей позиции и конкуренции в городе.",
                      ),
                    )}
                  </p>

                  {/* Itemized Deliverables */}
                  <ul className="mt-6 space-y-2.5 border-t border-[#EBEBE6] pt-5">
                    {[
                      l("Audit technique & décryptage des 3 leaders du Local Pack", "In-depth competitor analysis of the 3 Local Pack leaders", "Kiểm toán kỹ thuật & phân tích 3 đối thủ đứng đầu", "تحليل تقني لأبرز 3 منافسين متصدرين للنتائج", "Анализ 3 лидеров в Local Pack"),
                      l("Restructuration intégrale de la fiche Google Business Profile", "Complete restructuring of your Google Business Profile", "Tái cấu trúc toàn diện hồ sơ Google Business", "إعادة هيكلة شاملة لملف Google Business", "Полная оптимизация профиля Google Business"),
                      l("Géoréférencement & balisage EXIF de vos photos professionnelles", "Geotagging & EXIF metadata tagging of HD photos", "Gắn tọa độ địa lý & dữ liệu EXIF cho ảnh HD", "ترميز جغرافي وبيانات EXIF للصور", "Геопривязка и EXIF-разметка фотографий"),
                      l("Harmonisation des citations locales NAP (Nom, Adresse, Téléphone)", "NAP local citation consistency across web directories", "Đồng bộ thông tin NAP trên các danh bạ uy tín", "توحيد بيانات الاسم والعنوان ورقم الهاتف", "Синхронизация NAP (название, адрес, телефон)"),
                      l("Tableau de bord de suivi mensuel des positions & des appels entrants", "Monthly ranking tracking & detailed call volume report", "Báo cáo thứ hạng & cuộc gọi hằng tháng", "تقرير شهري لتتبع الترتيب وعدد الاتصالات", "Ежемесячный отчёт по позициям и звонкам"),
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2B2925]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8]" />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a
                    href="#simulateur-devis"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12110E] py-3.5 text-xs font-semibold text-white transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    <span>{t(l("Configurer mon projet & estimer le tarif", "Configure my project & estimate price", "Cấu hình dự án & tính giá", "تحديد معايير المشروع وتقدير التكلفة", "Рассчитать стоимость для моего города"))}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* OFFRE 02 : GESTION ANNUELLE (500 € / AN) */}
              <div className="relative flex flex-col justify-between rounded-3xl border border-[#16A34A]/30 bg-white p-7 shadow-lg transition-all duration-300 hover:border-[#16A34A] hover:shadow-xl sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBEBE6] pb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#16A34A]">
                      <Star className="h-3.5 w-3.5 fill-[#16A34A] text-[#16A34A]" />
                      {t(l("OFFRE 02 · PILOTAGE COMPLET 12 MOIS", "PLAN 02 · FULL 12-MONTH MANAGEMENT", "GÓI 02 · QUẢN TRỊ TOÀN DIỆN 12 THÁNG", "العرض 02 · إدارة سنوية شاملة 12 شهرًا", "ТАРИФ 02 · ПОЛНОЕ ГОДОВОЕ ВЕДЕНИЕ 12 МЕСЯЦЕВ"))}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#16A34A]">
                      {t(l("Facturation annuelle unique · 0 abonnement", "Single annual billing · zero monthly subscription", "Thanh toán theo năm · không phí tháng", "دفع سنوي واحد · بدون اشتراك شهري", "Разовая годовая оплата · без ежемесячных списаний"))}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                    {t(l("Gestion Annuelle de Fiche Google Maps", "Annual Google Maps Profile Management", "Quản lý Hồ sơ Google Maps Hàng năm", "إدارة سنوية شاملة لملف خرائط Google", "Годовое ведение профиля Google Maps"))}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#52504A]">
                      {t(l("Tarif fixe", "Fixed rate", "Giá trọn gói", "سعر ثابت", "Фиксированная цена"))}
                    </span>
                    <span className="font-serif text-4xl font-bold text-[#12110E] sm:text-5xl">
                      {price(500)}
                    </span>
                    <span className="font-mono text-xs text-[#52504A]"> / an</span>
                    <span className="rounded-full bg-[#F0FDF4] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#16A34A]">
                      {t(l("Pack Annuel Clé en Main", "Turnkey Annual Pack", "Gói Trọn Gói Năm", "الباقة السنوية المتكاملة", "Годовой пакет под ключ"))}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#52504A]">
                    {t(
                      l(
                        "Déléguez l'animation complète de votre établissement sur Google pendant 12 mois : réponse rédigée sous 48h à 100% de vos avis clients, publication de photos géolocalisées et actualités, mise à jour des horaires et protection active anti-modifications.",
                        "Delegate your complete Google presence for 12 months: professional replies to 100% of reviews within 48h, geotagged photos, regular updates, holiday schedules and active anti-tampering protection.",
                        "Ủy thác toàn diện hồ sơ Google trong 12 tháng: phản hồi 100% đánh giá trong 48h, đăng ảnh định vị và bảo vệ hồ sơ khỏi đối thủ.",
                        "إدارة سنوية متكاملة لملفك على خرائط Google لمدة 12 شهراً: رد راقٍ على 100% من التقييمات خلال 48 ساعة، نشر صور وعروض وتحديث مستمر وحماية السمعة.",
                        "Комплексное ведение карточки 12 месяцев: индивидуальные ответы на 100% отзывов за 48ч, регулярные фото, новости и защита от правок.",
                      ),
                    )}
                  </p>

                  {/* Checklist */}
                  <ul className="mt-6 space-y-2.5 border-t border-[#EBEBE6] pt-5">
                    {[
                      l("Réponse rédigée sur mesure sous 48h à 100% de vos avis clients", "Custom curated reply to 100% of customer reviews within 48h", "Phản hồi chuyên nghiệp 100% đánh giá trong 48h", "رد مخصص على 100% من التقييمات خلال 48 ساعة", "Индивидуальный ответ на 100% отзывов за 48ч"),
                      l("Publication régulière de photos géolocalisées & actualités", "Regular geotagged photo uploads & special announcements", "Đăng tải hình ảnh định vị & ưu đãi định kỳ", "نشر صور جغرافية وعروض وتحديثات دورية", "Регулярная публикация гео-фото и новостей"),
                      l("Mise à jour continue des horaires d'ouverture & jours fériés", "Continuous updates for opening hours and holidays", "Cập nhật liên tục giờ mở cửa và ngày lễ", "تحديث مستمر لمواعيد العمل والأعياد", "Актуализация часов работы и праздников"),
                      l("Protection active anti-modifications malveillantes", "Active protection against malicious competitor edits", "Bảo vệ chủ động khỏi chỉnh sửa xấu từ đối thủ", "حماية استباقية من التعديلات العشوائية للمنافسين", "Защита от несанкционированных правок конкурентов"),
                      l("Rapport annuel complet de visibilité, appels et itinéraires", "Annual visibility, phone calls and direction requests report", "Báo cáo thường niên về lượt xem, cuộc gọi và chỉ đường", "تقرير سنوي شامل للمكالمات والزيارات وطلبات الاتجاهات", "Годовой отчёт по звонкам, переходам и маршрутам"),
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2B2925]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-2.5">
                  <AddToCartBtn
                    item={{
                      serviceId: "maps",
                      serviceName: "Google Maps",
                      planName: t(l("Gestion Annuelle Fiche Google Maps", "Annual Google Maps Management", "Quản trị Google Maps Hàng năm", "الإدارة السنوية لخرائط Google", "Годовое ведение Google Maps")),
                      priceEur: 500,
                      period: "year",
                      periodLabel: t(l(" / an", " / year", " / năm", " / سنة", " / год")),
                    }}
                    popular={true}
                  />
                  <a
                    href={`${WA_BASE}${encodeURIComponent(
                      t(
                        l(
                          "Bonjour XRAGENCY, je souhaite souscrire au forfait Gestion Annuelle Fiche Google Maps à 500 € / an.",
                          "Hello XRAGENCY, I would like to subscribe to the Annual Google Maps Management pack at €500/year.",
                          "Xin chào XRAGENCY, tôi muốn đăng ký gói Quản lý Google Maps Hàng năm 500 €/năm.",
                          "مرحبًا XRAGENCY، أود الاشتراك في باقة الإدارة السنوية لملف خرائط Google بـ 500 € / سنة.",
                          "Здравствуйте, XRAGENCY! Хочу подключить годовое ведение профиля Google Maps за 500 €/год.",
                        ),
                      ),
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-3 text-xs font-semibold text-[#12110E] transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#16A34A]" />
                    <span>{t(l("Échanger sur WhatsApp", "Chat on WhatsApp", "Trao đổi WhatsApp", "تواصل عبر واتساب", "Написать в WhatsApp"))}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            2. SIMULATEUR DE DEVIS & TUNNEL LUDIQUE : CRITÈRES RÉELS
           ════════════════════════════════════════════════════════════════════ */}
        <section id="simulateur-devis" className="border-b border-[#E8E6E0] bg-[#FAF9F5] py-16 sm:py-24">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A73E8]/25 bg-[#1A73E8]/8 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A73E8]">
                <Sparkles className="h-3 w-3 text-[#1A73E8]" />
                {t(l("TUNNEL DE DIAGNOSTIC & ESTIMATION EN DIRECT", "LIVE DIAGNOSTIC & ESTIMATION TUNNEL", "CÔNG CỤ ĐỊNH GIÁ & DỰ BÁO TRỰC TIẾP", "محاكاة وتقدير التكلفة والنتائج في الوقت الفعلي", "КАЛЬКУЛЯТОР СТОИМОСТИ И РЕЗУЛЬТАТОВ"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("Estimez votre investissement pour conquérir & préserver le Top 3.", "Estimate your investment to conquer & secure the Top 3.", "Dự toán đầu tư để chinh phục & bảo toàn Top 3.", "قدّر استثمارك لتصدر أفضل 3 نتائج وضمان بقائك فيها.", "Рассчитайте бюджет для выхода и закрепления в топ-3."))}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(l("Le tarif annuel dépend directement de vos mots-clés, de votre rang actuel et de la concurrence de votre ville. Ajustez les critères ci-dessous :", "Annual investment depends on your target keywords, current ranking and local competition. Adjust your criteria below:", "Chi phí hằng năm phụ thuộc số lượng từ khóa, thứ hạng hiện tại và quy mô thị trường địa phương:", "تعتمد التكلفة السنوية بدقة على الكلمات المفتاحية وموقعك الحالي وحجم المدينة والمنافسة:", "Годовой бюджет зависит от ключевых слов, текущего положения и размера города. Выберите параметры ниже:"))}
              </p>
            </div>

            {/* Interactive Criteria Cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
              {/* CRITÈRE 1 : MÉTIER / SECTEUR */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                  {t(l("1. Métier / Activité", "1. Sector / Business", "1. Lĩnh vực hoạt động", "1. مجال النشاط", "1. Отрасль"))}
                </span>
                <div className="mt-3 space-y-1.5">
                  {sectors.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSector(sec.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-start text-xs font-medium transition ${
                        selectedSector === sec.id
                          ? "bg-[#12110E] text-white shadow-sm font-semibold"
                          : "border border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <span className="truncate">{t(sec.label)}</span>
                      {selectedSector === sec.id && <Check className="h-3.5 w-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* CRITÈRE 2 : POSITION ACTUELLE */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                  {t(l("2. Position actuelle sur Maps", "2. Current Rank on Maps", "2. Vị trí hiện tại", "2. الترتيب الحالي على الخرائط", "2. Текущая позиция"))}
                </span>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "invisible" as const, title: l("Absent ou hors Top 20", "Invisible / Outside Top 20", "Chưa có hoặc ngoài Top 20", "غير موجود أو خارج أفضل 20", "Вне топ-20 или нет профиля"), sub: l("Visibilité nulle pour les clients", "Zero visibility for local searches", "Khách hàng không thấy", "لا ظهور في عمليات البحث", "Клиенты вас не видят") },
                    { id: "inter" as const, title: l("Position 4 à 10", "Rank 4 to 10", "Vị trí 4 đến 10", "الترتيب من 4 إلى 10", "Позиция 4–10"), sub: l("Visible mais hors du Pack Local", "Visible but outside Local Pack", "Có hiện diện nhưng ngoài Pack", "ظاهر لكن خارج حزمة النتائج الأولى", "Рядом, но не в Pack") },
                    { id: "unoptimized" as const, title: l("Fiche mal optimisée", "Poorly optimized profile", "Hồ sơ chưa tối ưu", "ملف موجود لكن غير مكتمل", "Профиль плохо заполнен"), sub: l("Peu d'avis, photos anciennes", "Few reviews, outdated media", "Ít đánh giá, ảnh cũ", "تقييمات قليلة وصور قديمة", "Мало отзывов, старые фото") },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setCurrentRank(r.id)}
                      className={`w-full rounded-xl p-3 text-start text-xs transition border ${
                        currentRank === r.id
                          ? "border-[#12110E] bg-[#12110E] text-white shadow-sm"
                          : "border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <div className="font-semibold">{t(r.title)}</div>
                      <div className={`mt-0.5 text-[10px] ${currentRank === r.id ? "text-white/70" : "text-[#52504A]"}`}>{t(r.sub)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CRITÈRE 3 : MOTS-CLÉS STRATÉGIQUES PERSONNALISÉS */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                      {t(l("3. Vos Mots-clés Stratégiques", "3. Your Target Keywords", "3. Từ khóa chiến lược của bạn", "3. كلماتك المفتاحية المستهدفة", "3. Ваши ключевые слова"))}
                    </span>
                    <span className="rounded-full bg-[#1A73E8]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1A73E8]">
                      {userKeywords.length} actif{userKeywords.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-[#52504A]">
                    {t(l("Tapez vos requêtes cibles ou piochez dans les suggestions :", "Type your queries or pick from suggestions:", "Nhập từ khóa hoặc chọn gợi ý bên dưới:", "أدخل كلماتك المفتاحية أو اختر من المقترحات:", "Введите свои запросы или выберите из списка:"))}
                  </p>

                  {/* Input field to add custom keyword */}
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder={t(l("ex: chirurgien esthétique...", "ex: boutique hotel...", "ex: nhà hàng chay...", "مثال: محامي شركات...", "напр.: бутик отель..."))}
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                      className="w-full rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3 py-1.5 text-xs text-[#12110E] placeholder:text-[#999] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyword}
                      className="shrink-0 rounded-xl bg-[#12110E] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#2B2925]"
                    >
                      {t(l("Ajouter", "Add", "Thêm", "إضافة", "Добавить"))}
                    </button>
                  </div>

                  {/* Active user keywords tag chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {userKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#1A73E8]/10 px-2 py-1 font-mono text-[11px] font-semibold text-[#1A73E8]"
                      >
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(kw)}
                          className="hover:text-red-600 transition"
                          title="Supprimer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested sector keywords */}
                <div className="mt-3 border-t border-[#EBEBE6] pt-2.5">
                  <span className="block font-mono text-[9.5px] uppercase tracking-wider text-[#52504A] mb-1.5">
                    {t(l("Suggestions recommandées :", "Recommended suggestions:", "Gợi ý hàng đầu:", "مقترحات لهذا القطاع:", "Рекомендованные:"))}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {currentSector.suggestedKeywords.slice(0, 4).map((sug) => {
                      const isSelected = userKeywords.includes(sug);
                      return (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => handleToggleSuggested(sug)}
                          className={`rounded-md px-2 py-0.5 text-[10px] transition font-medium ${
                            isSelected
                              ? "bg-[#1A73E8] text-white"
                              : "bg-[#F0EFEA] text-[#52504A] hover:bg-[#E5E4DE] hover:text-[#12110E]"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {sug}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CRITÈRE 4 : VILLE & INTENSITÉ DE CONCURRENCE */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                  {t(l("4. Ville & Concurrence", "4. City & Competition", "4. Quy mô thành phố", "4. حجم المدينة والمنافسة", "4. Размер города"))}
                </span>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "small" as const, title: l("Commune (< 50 000 hab.)", "Town (< 50k pop.)", "Thị xã (< 50k dân)", "بلدة (< 50 ألف نسمة)", "Город (< 50 тыс.)"), sub: l("Concurrence modérée", "Moderate competition", "Cạnh tranh vừa phải", "منافسة معتدلة", "Умеренная конкуренция") },
                    { id: "medium" as const, title: l("Agglo (50k à 200k hab.)", "Mid-city (50k to 200k pop.)", "Đô thị (50k - 200k dân)", "مدينة متوسطة (50-200 ألف)", "Город (50–200 тыс.)"), sub: l("Concurrence active", "Active competition", "Cạnh tranh sôi động", "منافسة نشطة", "Активная конкуренция") },
                    { id: "metro" as const, title: l("Métropole (200k+ / Paris...)", "Metropolis (200k+ pop.)", "Đại đô thị (200k+ dân)", "مدينة كبرى (أكثر من 200 ألف)", "Мегаполис (200 тыс.+)"), sub: l("Concurrence féroce", "High density competition", "Cạnh tranh rất cao", "منافسة قوية جداً", "Высокая конкуренция") },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCityScale(c.id)}
                      className={`w-full rounded-xl p-3 text-start text-xs transition border ${
                        cityScale === c.id
                          ? "border-[#12110E] bg-[#12110E] text-white shadow-sm"
                          : "border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                      }`}
                    >
                      <div className="font-semibold">{t(c.title)}</div>
                      <div className={`mt-0.5 text-[10px] ${cityScale === c.id ? "text-white/70" : "text-[#52504A]"}`}>{t(c.sub)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* City choice bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="font-mono text-[11px] text-[#52504A]">
                {t(l("Votre ville :", "Your city:", "Thành phố của bạn:", "مدينتك:", "Ваш город:"))}
              </span>
              {citiesList.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c);
                    setCustomCity("");
                  }}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition ${
                    selectedCity === c && !customCity
                      ? "bg-[#12110E] text-white"
                      : "border border-[#D5D5CF] bg-white text-[#52504A] hover:border-[#12110E]"
                  }`}
                >
                  {c}
                </button>
              ))}
              <input
                type="text"
                placeholder={t(l("Autre ville...", "Other city...", "Thành phố khác...", "مدينة أخرى...", "Другой город..."))}
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="w-32 rounded-full border border-[#D5D5CF] bg-white px-3 py-1 text-xs text-[#12110E] placeholder:text-[#999] focus:border-[#12110E] focus:outline-none"
              />
            </div>

            {/* ════════════════════════════════════════════════════════════════
                CALCULATED RESULT CARD & SMARTPHONE SIMULATION PREVIEW
               ════════════════════════════════════════════════════════════════ */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-white p-6 shadow-xl sm:p-10">
              {/* Header result summary */}
              <div className="flex flex-col gap-6 border-b border-[#EBEBE6] pb-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#1A73E8]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#1A73E8]">
                      ★ {t(l("PROJECTION SUR-MESURE ESTIMÉE", "ESTIMATED BESPOKE PROJECTION", "DỰ TOÁN CHI PHÍ & VỊ THẾ", "التقدير المخصص لمشروعك", "ИНДИВИДУАЛЬНЫЙ РАСЧЁТ"))}
                    </span>
                    <span className="font-mono text-xs text-[#52504A]">
                      {displayCity} · {selectedKeywordsLabel}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-medium sm:text-4xl text-[#12110E]">
                    {t(l("Budget Annuel Stratégie Top 3 : dès", "Annual Top 3 Strategy Budget: from", "Dự toán hằng năm Chiến lược Top 3: từ", "الميزانية السنوية للتصدر: ابتداءً من", "Годовой бюджет вывода в топ-3: от"))}{" "}
                    <span className="text-[#1A73E8] font-bold">{price(calculatedEstimate)}</span>
                    <span className="text-base font-normal text-[#52504A]"> / an</span>
                  </h3>

                  <p className="mt-2 text-xs text-[#52504A] sm:text-sm">
                    {t(l("Devis personnalisé affiné après diagnostic de zone. Possibilité d'ajouter l'option Gestion Annuelle continue de Fiche à 500 € / an.", "Personalized quote refined after area diagnosis. Option to add continuous Annual Management at €500/year.", "Báo giá chính xác sau kiểm toán khu vực. Tùy chọn thêm gói Quản lý Hàng năm 500 €/năm.", "عرض سعر نهائي بعد تدقيق المنطقة، مع إمكانية إضافة باقة الإدارة السنوية بـ 500 €/سنة.", "Точный расчёт после аудита. Возможно подключение годового ведения за 500 €/год."))}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col shrink-0">
                  <a
                    href={`${WA_BASE}${encodeURIComponent(
                      `Bonjour XR Agency, je souhaite lancer mon audit Google Maps pour mon établissement (${t(currentSector.label)}) à ${displayCity} avec les critères : ${selectedKeywordsLabel}, position actuelle : ${selectedRankLabel}, estimation : dès ${calculatedEstimate} €/an.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12110E] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    <span>{t(l("Réserver mon audit pour", "Book my audit for", "Đặt lịch kiểm toán cho", "احجز التدقيق لـ", "Забронировать аудит для"))} {displayCity}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#52504A]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                    <span>{t(l("Diagnostic sans engagement", "No-obligation diagnosis", "Kiểm toán không ràng buộc", "تدقيق بدون التزام", "Аудит без обязательств"))}</span>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE AVANT / APRÈS SMARTPHONE STAGE */}
              <div className="mt-8">
                <div className="flex flex-col items-center justify-between gap-4 border-b border-[#EBEBE6] pb-4 sm:flex-row">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#12110E]">
                      {t(l("Simulation Visuelle en Direct sur Google Maps", "Live Visual Simulation on Google Maps", "Mô phỏng Giao diện Trực tiếp trên Google Maps", "محاكاة المظهر المباشر على خرائط Google", "Симуляция отображения в Google Maps"))}
                    </span>
                    <p className="mt-0.5 text-[11px] text-[#52504A]">
                      {t(l("Basculez entre votre état actuel et le Pack Local Top 3 pour observer la différence :", "Toggle between your current state and the Top 3 Local Pack to see the difference:", "Chuyển đổi giữa trạng thái hiện tại và Top 3 Local Pack để thấy sự khác biệt:", "بدّل بين وضعك الحالي وحزمة أفضل 3 نتائج لتشهد الفارق:", "Переключайтесь между текущим состоянием и топ-3 выдачи:"))}
                    </p>
                  </div>

                  {/* Tactile Switcher */}
                  <div className="inline-flex rounded-full border border-[#D5D5CF] bg-[#F5F5F0] p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setSimState("before")}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                        simState === "before"
                          ? "bg-[#D9534F] text-white shadow-sm"
                          : "text-[#52504A] hover:text-[#12110E]"
                      }`}
                    >
                      {t(l("1. Avant XR (Position #18 · Hors Pack)", "1. Before XR (Rank #18 · Out of Pack)", "1. Trước XR (Hạng #18 · Ngoài Pack)", "1. قبل XR (الترتيب 18 · خارج الحزمة)", "1. До XR (Позиция #18 · Вне Pack)"))}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimState("after")}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                        simState === "after"
                          ? "bg-[#16A34A] text-white shadow-sm"
                          : "text-[#52504A] hover:text-[#12110E]"
                      }`}
                    >
                      ★ {t(l("2. Après XR (Intégration Top 3 Local)", "2. After XR (Top 3 Local Pack Secured)", "2. Sau XR (Vào Top 3 Local Pack)", "2. بعد XR (دخول حزمة أفضل 3 نتائج)", "2. После XR (Вход в топ-3 Local Pack)"))}
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                  {/* Smartphone Viewport with Real 3-Pack Container */}
                  <div className="lg:col-span-7">
                    <div className="mx-auto max-w-[430px] rounded-[2.5rem] border-[6px] border-[#1E1E1C] bg-[#F8F9FA] p-3 shadow-2xl">
                      {/* Phone Notch & Status */}
                      <div className="flex items-center justify-between px-3 pt-1 pb-2">
                        <span className="font-mono text-[11px] font-semibold text-[#1E1E1C]">09:41</span>
                        <div className="h-4 w-24 rounded-full bg-[#1E1E1C]" />
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold text-[#1E1E1C]">5G</span>
                          <div className="h-2.5 w-4 rounded-sm border border-[#1E1E1C] p-0.5">
                            <div className="h-full w-full bg-[#1E1E1C] rounded-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* Google Search Bar */}
                      <div className="mt-1 rounded-full border border-[#D5D5CF] bg-white px-3.5 py-2 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="flex items-center gap-0.5">
                            <span className="h-2 w-2 rounded-full bg-[#1A73E8]" />
                            <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                            <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                          </div>
                          <span className="truncate font-sans text-xs text-[#202124] font-medium">
                            {t(currentSector.searchQuery)} à {displayCity}
                          </span>
                        </div>
                        <Search className="h-4 w-4 shrink-0 text-[#1A73E8]" />
                      </div>

                      {/* Filter Chips Bar */}
                      <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-[10.5px]">
                        <span className="shrink-0 rounded-full bg-[#1A73E8] px-2.5 py-0.5 font-medium text-white shadow-xs">
                          ✓ {t(l("Ouvert maintenant", "Open now", "Đang mở cửa", "مفتوح الآن", "Открыто"))}
                        </span>
                        <span className="shrink-0 rounded-full border border-[#D5D5CF] bg-white px-2.5 py-0.5 font-medium text-[#3C4043]">
                          ★ {t(l("Top 3 Local", "Top 3 Local", "Top 3 Local", "أفضل 3 محلياً", "Топ-3 Local"))}
                        </span>
                        <span className="shrink-0 rounded-full border border-[#D5D5CF] bg-white px-2.5 py-0.5 font-medium text-[#3C4043]">
                          4,5★+
                        </span>
                      </div>

                      {/* Mini Stylized Map View */}
                      <div className="relative mt-2.5 h-28 overflow-hidden rounded-xl border border-[#E0E0E0] bg-[#E8ECEF]">
                        {/* Map Grid Roads */}
                        <div className="absolute inset-0 opacity-40">
                          <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-white" />
                          <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-white" />
                          <div className="absolute top-0 bottom-0 right-1/4 w-3.5 bg-white -rotate-12" />
                          <div className="absolute top-3 left-4 h-6 w-12 rounded bg-[#C7E0C4]/70" />
                          <div className="absolute bottom-2 right-6 h-8 w-16 rounded bg-[#C7E0C4]/70" />
                        </div>

                        {/* Interactive Pins on Map */}
                        {simState === "after" ? (
                          <>
                            {/* Pin #1 : Your establishment (green star pin) */}
                            <div className="absolute top-7 left-[36%] -translate-x-1/2 flex flex-col items-center animate-bounce">
                              <div className="flex items-center gap-1 rounded-full bg-[#16A34A] px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
                                <Star className="h-2.5 w-2.5 fill-white" />
                                <span>#1 {t(currentSector.sampleName)}</span>
                              </div>
                              <div className="h-2 w-2 -mt-0.5 rotate-45 bg-[#16A34A]" />
                            </div>

                            {/* Pin #2 & #3 : Competitors */}
                            <div className="absolute top-12 left-[68%] flex items-center gap-1 rounded-full bg-[#EA4335] px-1.5 py-0.5 text-[8.5px] font-bold text-white shadow-sm">
                              <MapPin className="h-2.5 w-2.5" />
                              <span>#2</span>
                            </div>
                            <div className="absolute bottom-3 left-[20%] flex items-center gap-1 rounded-full bg-[#EA4335] px-1.5 py-0.5 text-[8.5px] font-bold text-white shadow-sm">
                              <MapPin className="h-2.5 w-2.5" />
                              <span>#3</span>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Before XR: Competitors own the central pack */}
                            <div className="absolute top-6 left-[34%] flex items-center gap-1 rounded-full bg-[#EA4335] px-1.5 py-0.5 text-[8.5px] font-bold text-white shadow-sm">
                              <MapPin className="h-2.5 w-2.5" />
                              <span>#1 Concurrent A</span>
                            </div>
                            <div className="absolute top-12 left-[62%] flex items-center gap-1 rounded-full bg-[#EA4335] px-1.5 py-0.5 text-[8.5px] font-bold text-white shadow-sm">
                              <MapPin className="h-2.5 w-2.5" />
                              <span>#2 Concurrent B</span>
                            </div>
                            <div className="absolute bottom-3 left-[48%] flex items-center gap-1 rounded-full bg-[#EA4335] px-1.5 py-0.5 text-[8.5px] font-bold text-white shadow-sm">
                              <MapPin className="h-2.5 w-2.5" />
                              <span>#3 Concurrent C</span>
                            </div>
                            {/* Your establishment relegated off-grid */}
                            <div className="absolute top-2 right-2 rounded border border-dashed border-[#D9534F] bg-white/95 px-1.5 py-0.5 text-[8px] font-bold text-[#D9534F]">
                              ⚠️ #18 {t(currentSector.sampleName)} (Hors Pack)
                            </div>
                          </>
                        )}
                      </div>

                      {/* Google Maps Local 3-Pack Feed */}
                      <div className="mt-3 space-y-2">
                        {simState === "after" ? (
                          <>
                            {/* SLOT #1 : VOTRE ÉTABLISSEMENT PROPULSÉ DANS LE TOP 3 */}
                            <div className="rounded-xl border-2 border-[#16A34A] bg-white p-3 shadow-sm ring-2 ring-[#16A34A]/10 transition">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="rounded bg-[#16A34A] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                                      ★ TOP 3 · PACK LOCAL RECOMMANDÉ
                                    </span>
                                  </div>
                                  <h4 className="mt-1 truncate font-serif text-sm font-bold text-[#12110E]">
                                    {t(currentSector.sampleName)}
                                  </h4>
                                  <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                                    <span className="font-bold text-[#12110E]">4,9</span>
                                    <div className="flex text-amber-500">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-2.5 w-2.5 fill-amber-500" />
                                      ))}
                                    </div>
                                    <span className="font-mono text-[10px] text-[#52504A]">(148 avis certifiés)</span>
                                  </div>
                                  <p className="text-[10px] text-[#52504A] truncate">
                                    {t(currentSector.category)} · {displayCity}
                                  </p>
                                  <p className="font-mono text-[10px] font-semibold text-[#16A34A]">
                                    ● Ouvert actuellement · Ferme à 19h30
                                  </p>
                                </div>

                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E5E5E0] bg-[#EEE]">
                                  <img
                                    src={currentSector.photo}
                                    alt=""
                                    className="h-full w-full object-cover scale-105"
                                  />
                                  <span className="absolute bottom-0.5 right-0.5 rounded bg-[#16A34A] px-1 py-0.2 font-mono text-[7.5px] font-bold text-white">
                                    4K HD
                                  </span>
                                </div>
                              </div>

                              {/* Tactile Action Buttons */}
                              <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#EBEBE6] pt-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSimNotice(t(l("✓ Simulation : Le prospect déclenche un appel téléphonique direct sur mobile.", "✓ Simulation: User taps direct call button on mobile.", "✓ Mô phỏng: Khách bấm gọi trực tiếp từ điện thoại.", "✓ محاكاة: العميل يضغط للاتصال المباشر من هاتفه.", "✓ Симуляция: Клиент сразу звонит со смартфона.")));
                                    setTimeout(() => setSimNotice(null), 3500);
                                  }}
                                  className="flex items-center justify-center gap-1 rounded-lg bg-[#1A73E8] py-1.5 text-[10.5px] font-semibold text-white shadow-xs transition hover:bg-[#1557B0]"
                                >
                                  <Phone className="h-3 w-3" />
                                  <span>{t(l("Appeler", "Call", "Gọi điện", "اتصال", "Позвонить"))}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSimNotice(t(l("✓ Simulation : Le GPS Google Maps guide l'automobiliste jusqu'à votre adresse.", "✓ Simulation: Google Maps GPS directions started directly to your storefront.", "✓ Mô phỏng: Chỉ đường Google Maps dẫn khách đến tận cửa.", "✓ محاكاة: توجيه العميل بخرائط جوجل مباشرة إلى محلك.", "✓ Симуляция: Маршрут в Google Maps ведёт прямо к дверям.")));
                                    setTimeout(() => setSimNotice(null), 3500);
                                  }}
                                  className="flex items-center justify-center gap-1 rounded-lg border border-[#D5D5CF] bg-white py-1.5 text-[10.5px] font-semibold text-[#12110E] transition hover:bg-[#F5F5F0]"
                                >
                                  <Navigation className="h-3 w-3 text-[#1A73E8]" />
                                  <span>{t(l("Itinéraire", "Directions", "Chỉ đường", "اتجاهات", "Маршрут"))}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSimNotice(t(l("✓ Simulation : Visite qualifiée envoyée sur votre site officiel.", "✓ Simulation: High-intent visitor routed to your official website.", "✓ Mô phỏng: Lượt truy cập chất lượng chuyển sang website chính thức.", "✓ محاكاة: توجيه عميل مهتم لطلب عرض سعر من موقعك.", "✓ Симуляция: Целевой переход на сайт за бронированием.")));
                                    setTimeout(() => setSimNotice(null), 3500);
                                  }}
                                  className="flex items-center justify-center gap-1 rounded-lg border border-[#D5D5CF] bg-white py-1.5 text-[10.5px] font-semibold text-[#12110E] transition hover:bg-[#F5F5F0]"
                                >
                                  <Globe2 className="h-3 w-3 text-[#16A34A]" />
                                  <span>{t(l("Site Web", "Website", "Website", "الموقع", "Сайт"))}</span>
                                </button>
                              </div>
                            </div>

                            {/* SLOT #2 : CONCURRENT A DANS LE PACK */}
                            <div className="rounded-xl border border-[#E5E5E0] bg-white p-2.5 opacity-80">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-mono text-[8.5px] text-[#777]">PACK LOCAL #2</span>
                                  <h5 className="font-sans text-xs font-semibold text-[#2B2925]">
                                    {t(l("Maison & Terroir Prestige", "Prestige House & Heritage", "Thương hiệu Đối thủ A", "المنافس المحلي أ", "Конкурент А"))}
                                  </h5>
                                  <div className="flex items-center gap-1 text-[10px] text-[#52504A]">
                                    <span>4.3</span>
                                    <span className="text-amber-500">★★★★☆</span>
                                    <span>(64 avis)</span>
                                  </div>
                                </div>
                                <span className="font-mono text-[9px] text-[#777]">Itinéraire · 1,2 km</span>
                              </div>
                            </div>

                            {/* SLOT #3 : CONCURRENT B DANS LE PACK */}
                            <div className="rounded-xl border border-[#E5E5E0] bg-white p-2.5 opacity-80">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-mono text-[8.5px] text-[#777]">PACK LOCAL #3</span>
                                  <h5 className="font-sans text-xs font-semibold text-[#2B2925]">
                                    {t(l("Le Grand Comptoir & Co.", "The Grand Counter & Co.", "Thương hiệu Đối thủ B", "المنافس المحلي ب", "Конкурент Б"))}
                                  </h5>
                                  <div className="flex items-center gap-1 text-[10px] text-[#52504A]">
                                    <span>4.1</span>
                                    <span className="text-amber-500">★★★★☆</span>
                                    <span>(42 avis)</span>
                                  </div>
                                </div>
                                <span className="font-mono text-[9px] text-[#777]">Itinéraire · 2,4 km</span>
                              </div>
                            </div>

                            <div className="rounded-lg bg-[#EBF7EE] p-2 text-center font-mono text-[10px] font-semibold text-[#16A34A]">
                              🎉 {t(l("Votre établissement capte 74% de l'ensemble des clics et appels mobiles de la zone !", "Your profile captures 74% of all local mobile calls and clicks in your area!", "Cơ sở của bạn thu hút 74% toàn bộ cuộc gọi và lượt nhấp tại khu vực!", "نشاطك يستحوذ على 74% من إجمالي الاتصالات والنقرات في المنطقة!", "Ваш профиль получает 74% всех звонков и маршрутов города!"))}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* ALERTE AVANT XR : VOTRE FICHE EST EXCLUE DU PACK LOCAL */}
                            <div className="rounded-lg border border-[#D9534F]/30 bg-[#FDF2F2] p-2.5 text-center">
                              <span className="font-mono text-[10px] font-bold text-[#D9534F]">
                                ⚠️ {t(l("VOTRE ÉTABLISSEMENT EST EXCLU DU PACK LOCAL (RANG #18)", "YOUR BUSINESS IS EXCLUDED FROM LOCAL PACK (RANK #18)", "CƠ SỞ CỦA BẠN BỊ LOẠI KHỎI LOCAL PACK (HẠNG #18)", "نشاطك مستبعد من حزمة النتائج الأولى (الترتيب 18)", "ВАШ БИЗНЕС НЕ ВХОДИТ В LOCAL PACK (ПОЗИЦИЯ #18)"))}
                              </span>
                              <p className="mt-0.5 text-[9.5px] text-[#777]">
                                {t(l("92% des utilisateurs sur mobile s'arrêtent au Top 3. Vos concurrents captent 100% de vos clients potentiels.", "92% of mobile users never scroll past Top 3. Your competitors get 100% of your leads.", "92% khách hàng chỉ xem Top 3. Đối thủ đang thâu tóm toàn bộ khách của bạn.", "92% من المستخدمين لا يتجاوزون أول 3 نتائج. المنافسون يسرقون زبائنك.", "92% клиентов не листают дальше топ-3. Конкуренты забирают всех клиентов.")) }
                              </p>
                            </div>

                            {/* Concurrents monopolisent les 3 places */}
                            {[
                              { r: "#1", name: l("Concurrent Local Leader", "Market Competitor Leader", "Đối thủ dẫn đầu", "المنافس المتصدر", "Лидер рынка"), rating: "4.5 ★★★★★ (118 avis)", share: "48% des appels" },
                              { r: "#2", name: l("Concurrent Établi Centre", "Established Center Competitor", "Đối thủ trung tâm", "منافس وسط المدينة", "Второй конкурент"), rating: "4.3 ★★★★☆ (79 avis)", share: "32% des appels" },
                              { r: "#3", name: l("Concurrent Secondaire", "Secondary Competitor", "Đối thủ phụ", "منافس محلي آخر", "Третий конкурент"), rating: "4.1 ★★★★☆ (45 avis)", share: "16% des appels" },
                            ].map((c, i) => (
                              <div key={i} className="rounded-xl border border-[#E5E5E0] bg-white p-2.5">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-mono text-[8.5px] font-bold text-[#EA4335]">{c.r} DU PACK</span>
                                    <h5 className="font-sans text-xs font-semibold text-[#2B2925]">{t(c.name)}</h5>
                                    <div className="text-[10px] text-[#52504A]">{c.rating}</div>
                                  </div>
                                  <span className="rounded bg-[#EFEFEF] px-1.5 py-0.5 font-mono text-[9px] font-medium text-[#52504A]">
                                    {c.share}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* VOTRE FICHE RELÉGUÉE EN PAGE 2 */}
                            <div className="rounded-xl border border-dashed border-[#D9534F] bg-[#FFF8F8] p-2.5 opacity-75">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="rounded bg-[#D9534F] px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-white">
                                    VOTRE ÉTAT ACTUEL · RANG #18 (PAGE 2)
                                  </span>
                                  <h4 className="mt-1 font-serif text-xs font-semibold text-[#12110E]">
                                    {t(currentSector.sampleName)}
                                  </h4>
                                  <div className="mt-0.5 text-[10px] text-[#888]">
                                    3,8 ★★★☆☆ (8 avis · non gérés)
                                  </div>
                                  <p className="font-mono text-[9px] text-[#D9534F]">
                                    Horaires d'ouverture non renseignés · Photos anciennes
                                  </p>
                                </div>
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-[#DDD]">
                                  <img src={currentSector.photo} alt="" className="h-full w-full object-cover filter grayscale brightness-75" />
                                  <span className="absolute bottom-0 right-0 rounded bg-black/70 px-1 text-[7px] text-white">Flou</span>
                                </div>
                              </div>
                              <div className="mt-2 rounded bg-white p-1 text-center font-mono text-[9px] text-[#888]">
                                Boutons invisibles sur mobile · 0 à 2 appels / mois seulement
                              </div>
                            </div>
                          </>
                        )}

                        {simNotice && (
                          <div className="mt-2 animate-fade-in rounded-xl border border-[#1A73E8]/30 bg-[#EBF3FE] p-2 text-center text-xs font-medium text-[#1A73E8]">
                            {simNotice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Impact Statistics & Reassurance */}
                  <div className="space-y-4 lg:col-span-5">
                    <div className="rounded-2xl border border-[#E5E5E0] bg-[#FAF9F5] p-5 sm:p-6 shadow-sm">
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#12110E]">
                          {t(l("IMPACT CONSTATÉ EN CONQUÊTE DU TOP 3", "OBSERVED METRICS ON TOP 3 ENTRY", "HIỆU QUẢ ĐO LƯỜNG KHI VÀO TOP 3", "الأثر الفعلي لدخول المراكز الثلاثة الأولى", "ФАКТИЧЕСКИЙ РЕЗУЛЬТАТ В ТОП-3"))}
                        </span>
                        <span className="font-mono text-[10px] text-[#1A73E8] font-bold">100% Organique</span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="rounded-xl border border-[#EBEBE6] bg-white p-3.5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#52504A]">
                              {t(l("Appels téléphoniques directs", "Direct incoming phone calls", "Cuộc gọi đến trực tiếp", "اتصالات هاتفية مباشرة", "Прямые звонки"))}
                            </span>
                            <span className={`font-mono text-xs font-bold ${simState === "after" ? "text-[#16A34A]" : "text-[#D9534F]"}`}>
                              {simState === "after" ? "+180% (35 à 60 / mois)" : "~2 à 4 / mois (négligeable)"}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#52504A]">
                            {simState === "after"
                              ? t(l("Clients à fort panier déclenchant l'appel en 1 clic sans passer par un standard.", "High-value prospects calling in 1 click directly from Maps.", "Khách hàng gọi ngay với 1 chạm từ bản đồ.", "عملاء مباشرون يتصلون بنقرة واحدة.", "Клиенты звонят в один клик прямо с карты."))
                              : t(l("Votre numéro n'est quasiment jamais affiché sur les recherches mobiles.", "Your phone number is rarely displayed on mobile searches.", "Số điện thoại gần như không hiển thị cho khách di động.", "رقمك نادراً ما يظهر في نتائج البحث.", "Номер почти не показывается в мобильной выдаче."))}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#EBEBE6] bg-white p-3.5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#52504A]">
                              {t(l("Demandes d'itinéraire GPS", "GPS directions requests", "Yêu cầu chỉ đường GPS", "طلبات اتجاهات القيادة", "Запросы маршрута"))}
                            </span>
                            <span className={`font-mono text-xs font-bold ${simState === "after" ? "text-[#16A34A]" : "text-[#D9534F]"}`}>
                              {simState === "after" ? "+240% de visites sur place" : "Trafic marginal"}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#52504A]">
                            {simState === "after"
                              ? t(l("Les automobilistes et piétons sont guidés à votre porte via Google Maps GPS.", "Pedestrians and drivers guided to your doorstep via Maps GPS.", "Chỉ đường GPS dẫn thẳng người đi bộ và lái xe đến cơ sở.", "توجيه العملاء مباشرة إلى باب محلك بنظام الملاحة.", "Пешеходы и водители сразу строят маршрут до входа."))
                              : t(l("Visibilité nulle pour les prospects qui cherchent 'autour de moi'.", "Zero foot traffic from prospects searching 'near me'.", "Không có lượt khách tìm kiếm theo khu vực lân cận.", "لا زيارات من الباحثين عن أماكن 'قريبة مني'.", "Нет трафика от запросов 'рядом со мной'.")) }
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#EBEBE6] bg-white p-3.5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#52504A]">
                              {t(l("Note de réputation Google", "Google reputation score", "Điểm uy tín Google", "معدل التقييمات", "Рейтинг в Google"))}
                            </span>
                            <span className={`font-mono text-xs font-bold ${simState === "after" ? "text-[#1A73E8]" : "text-[#888]"}`}>
                              {simState === "after" ? "4.9 / 5 (148 avis certifiés)" : "3.8 / 5 (8 avis · fragile)"}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#52504A]">
                            {simState === "after"
                              ? t(l("Arsenal d'avis 5★ déployé + réponses soignées sous 48h.", "5★ review system deployed + tailored replies within 48h.", "Hệ thống đánh giá 5★ và phản hồi chuyên nghiệp trong 48h.", "نظام تقييمات 5 نجوم وردود احترافية خلال 48 ساعة.", "Система сбора отзывов 5★ и ответы на каждый за 48ч."))
                              : t(l("Vulnérable aux faux avis sans réponse et au déclassement algorithmique.", "Vulnerable to unanswered reviews and algorithmic drop.", "Dễ bị tụt hạng và dính đánh giá tiêu cực không phản hồi.", "معرض لتقييمات سلبية غير مُعالجة وتراجع الترتيب.", "Уязвим к негативу и понижению в алгоритмах.")) }
                          </p>
                        </div>
                      </div>

                      {/* Studio Guarantee box */}
                      <div className="mt-4 rounded-xl border border-[#16A34A]/25 bg-[#F4FBF6] p-3 text-xs text-[#12110E]">
                        <div className="flex items-center gap-2 font-semibold text-[#16A34A]">
                          <ShieldCheck className="h-4 w-4" />
                          <span>{t(l("Éthique & Conformité Algorithmique", "Ethics & Algorithmic Compliance", "Đạo đức & Tuân thủ Thuật toán", "الأمان والامتثال للخوارزميات", "Безопасность и соответствие Google"))}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#52504A]">
                          {t(l("Zéro faux avis acheté. Nous respectons à 100% les consignes Google Business Profile pour un positionnement pérenne qui ne craint aucune mise à jour.", "Zero fake reviews. 100% compliant with Google Business Profile policies for lasting local authority that withstands algorithm core updates.", "Không mua đánh giá ảo. Tuân thủ 100% chính sách Google để duy trì vị thế vững bền.", "لا نشتري تقييمات وهمية إطلاقاً. عملنا متوافق 100% مع سياسات جوجل لضمان صدارة دائمة.", "Никаких накруток. 100% соответствие официальным правилам Google для стабильного и безопасного роста.")) }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            3. LE PARCOURS CLIENT LUDIQUE, CHARMANT & ILLUSTRÉ
           ════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-[#E8E6E0]">
          {/* Subtle colored ambient glows */}
          <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#1A73E8]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#EA4335]/5 blur-3xl" />

          <div className="relative mx-auto max-w-[1360px] px-4 sm:px-8">
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1A73E8]/25 bg-[#1A73E8]/8 px-4 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#1A73E8]">
                <Sparkles className="h-3.5 w-3.5 text-[#1A73E8]" />
                {t(l("PARCOURS CLIENT INTERACTIF & ILLUSTRÉ", "INTERACTIVE & ILLUSTRATED CLIENT JOURNEY", "HÀNH TRÌNH KHÁCH HÀNG TRỰC QUAN & MINH HỌA", "رحلة العميل التفاعلية والموضحة بالرسوم", "ИНТЕРАКТИВНЫЙ И ИЛЛЮСТРИРОВАННЫЙ МАРШРУТ"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("De l'ombre au sommet de Google Maps.", "From invisible to the top of Google Maps.", "Từ ẩn mình đến vị trí dẫn đầu Google Maps.", "من الغياب التام إلى قمة خرائط جوجل.", "От нуля до первого места в Google Maps."))}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(
                  l(
                    "Une aventure en 5 étapes claires, transparentes et illustrées. Cliquez sur chaque étape pour découvrir comment nous transformons votre visibilité locale.",
                    "A journey in 5 clear, transparent and illustrated steps. Tap each step to discover how we turn your local presence into an acquisition engine.",
                    "Hành trình 5 bước minh bạch và sinh động. Nhấp vào từng bước để khám phá cách chúng tôi tạo đột phá hiển thị cho bạn.",
                    "رحلة من 5 خطوات واضحة وممتعة. اضغط على أي خطوة لاكتشاف كيف نحوّل ظهورك المحلي إلى محرك مبيعات حقيقي.",
                    "5 простых, наглядных и понятных шагов. Нажмите на любой шаг, чтобы увидеть процесс трансформации профиля.",
                  ),
                )}
              </p>
            </div>

            {/* Interactive Step Switcher Tabs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {[
                { idx: 0, num: "01", label: l("Radar & Failles", "Radar & Diagnostic", "Radar & Điểm yếu", "رادار الثغرات", "Радар локации"), color: "#1A73E8", icon: Radio },
                { idx: 1, num: "02", label: l("Shooting & EXIF", "Photos & EXIF", "Ảnh & EXIF GPS", "تصوير وترميز", "HD-фото и EXIF"), color: "#EA4335", icon: Camera },
                { idx: 2, num: "03", label: l("Cohérence NAP", "NAP Authority", "Đồng bộ NAP", "توحيد NAP", "Каталоги NAP"), color: "#16A34A", icon: Globe2 },
                { idx: 3, num: "04", label: l("Arsenal Avis 5★", "5-Star Engine", "Avis 5★ & NFC", "تقييمات 5 نجوم", "Сбор отзывов 5★"), color: "#F59E0B", icon: QrCode },
                { idx: 4, num: "05", label: l("Top 3 & Appels", "Top 3 & Calls", "Top 3 & Cuộc gọi", "أفضل 3 نتائج والاتصالات", "Топ-3 и звонки"), color: "#4F46E5", icon: Phone },
              ].map((step) => {
                const Icon = step.icon;
                const isActive = activeJourneyStep === step.idx;
                return (
                  <button
                    key={step.idx}
                    type="button"
                    onClick={() => setActiveJourneyStep(step.idx)}
                    className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#12110E] text-white shadow-lg scale-105"
                        : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#52504A] hover:border-[#12110E] hover:text-[#12110E] hover:bg-white"
                    }`}
                  >
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-bold text-white transition"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </span>
                    <Icon className="h-3.5 w-3.5 transition group-hover:scale-110" style={{ color: isActive ? "#FFF" : step.color }} />
                    <span>{t(step.label)}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full" style={{ backgroundColor: step.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Stage & Dynamic Illustration */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-[#FAF9F5] p-6 shadow-xl sm:p-10">
              {/* STEP 0: RADIOGRAPHIE & RADAR CONCURRENTIEL */}
              {activeJourneyStep === 0 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A73E8]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#1A73E8]">
                        <Radio className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 01 · DÉTECTION & ANALYSE CHIRURGICALE", "STEP 01 · DETECTION & SURGICAL BREAKDOWN", "BƯỚC 01 · BÓC TÁCH & QUÉT THỊ TRƯỜNG", "الخطوة 01 · المسح والتحليل الجراحي", "ШАГ 01 · СКАНИРОВАНИЕ И АНАЛИЗ"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Rayon 5 à 15 km</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Radiographie de Zone & Radar Concurrentiel", "Area Radiography & Competitor Radar", "Kiểm toán Khu vực & Radar Đối thủ", "مسح المنطقة ورادار المنافسين", "Радиометрия локации и радар конкурентов"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Avant de toucher au moindre bouton, nous scannons votre zone géographique. Nous identifions les 3 concurrents qui captent vos clients, leurs failles sémantiques et le volume exact de recherches mensuelles que vous perdez aujourd'hui.",
                          "Before taking any action, we scan your geographic radius. We identify the top 3 competitors stealing your calls, their keyword loopholes and the exact monthly search volume you are missing.",
                          "Trước khi thao tác, chúng tôi quét bán kính khu vực. Xác định 3 đối thủ đang đón khách của bạn, điểm yếu của họ và dung lượng tìm kiếm bị bỏ lỡ.",
                          "قبل البدء بأي تعديل، نقوم بمسح نطاقك الجغراfi كاملاً لكشف المنافسين الثلاثة الأقوى والثغرات التي ستمنحك الأسبقية عليهم.",
                          "Сначала мы сканируем ваш район. Находим 3 главных конкурента, их уязвимости в ключевых словах и упущенный объём клиентов.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Scan des 20 facteurs algorithmiques Google Business Profile", "Audit of all 20 Google ranking signals", "Kiểm tra 20 yếu tố thuật toán Google", "تدقيق 20 معياراً في خوارزمية خرائط جوجل", "Аудит 20 факторов ранжирования Google"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Analyse de densité des mots-clés stratégiques autour de votre adresse", "Keyword density analysis around your exact address", "Phân tích mật độ từ khóa quanh địa chỉ", "تحليل كثافة الكلمات المفتاحية حول عنوانك", "Анализ ключевых слов вокруг вашей локации"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Cartographie des faiblesses du Top 3 concurrent", "Mapping vulnerabilities of the local Top 3", "Lập bản đồ điểm yếu của Top 3 đối thủ", "كشف نقاط ضعف المنافسين الثلاثة المتصدرين", "Карта уязвимостей топ-3 конкурентов"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-3.5 py-2 text-xs font-semibold text-[#1A73E8]">
                        <FileText className="h-4 w-4" />
                        <span>{t(l("Livrable : Rapport de Rayonnement & Faisabilité", "Deliverable: Area Radiography Report", "Bàn giao: Báo cáo Tiềm năng Khu vực", "المخرج: تقرير نطاق التغطية والفرص", "Результат: Отчёт о потенциале выхода в топ-3"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveJourneyStep(1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Shooting & EXIF", "Next step: Photos & EXIF", "Bước tiếp: Ảnh & EXIF", "الخطوة التالية: التصوير", "Следующий шаг: Фото"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* REALISTIC GOOGLE MAPS 3-PACK SIMULATION (REPLACES ARTIFICIAL RADAR) */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-[#F8F9FA] p-4 shadow-xl flex flex-col justify-between">
                      {/* Realistic Google Maps Search Header */}
                      <div className="rounded-xl border border-[#E0E0DC] bg-white p-2.5 shadow-sm flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#1A73E8] text-white shrink-0">
                            <MapPin className="h-3.5 w-3.5" />
                          </div>
                          <span className="truncate font-sans text-xs text-[#202124] font-medium">
                            {userKeywords[0] || t(currentSector.searchQuery)} à {displayCity}
                          </span>
                        </div>
                        <span className="rounded-full bg-[#16A34A]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#16A34A] shrink-0">
                          ● EN DIRECT
                        </span>
                      </div>

                      {/* Google Maps Local 3-Pack Results */}
                      <div className="my-2 space-y-2">
                        {/* RESULT #1 : CLIENT ESTABLISHMENT (TOP RANKED) */}
                        <div className="relative rounded-xl border-2 border-[#1A73E8] bg-white p-3 shadow-md">
                          <div className="absolute -top-2.5 right-3 rounded-full bg-[#1A73E8] px-2.5 py-0.5 font-mono text-[8.5px] font-bold text-white shadow-sm">
                            ★ TOP 1 PACK LOCAL
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-sans text-xs font-bold text-[#202124]">
                                {t(currentSector.sampleName)}
                              </h4>
                              <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px]">
                                <span className="font-bold text-[#D97706]">4.9</span>
                                <div className="flex text-[#F59E0B]">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-amber-400" />
                                  ))}
                                </div>
                                <span className="text-[#5F6368]">(184)</span>
                                <span className="text-[#5F6368]">· {t(currentSector.category)}</span>
                              </div>
                              <p className="mt-0.5 text-[10px] text-[#5F6368]">
                                <span className="font-semibold text-[#188038]">Ouvert</span> · Ferme à 23:00 · {displayCity}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons (Call, Directions, Website) */}
                          <div className="mt-2 flex items-center gap-2 border-t border-[#F1F3F4] pt-2">
                            <span className="inline-flex items-center gap-1 rounded-lg bg-[#E8F0FE] px-2.5 py-1 text-[10px] font-semibold text-[#1A73E8]">
                              <Phone className="h-3 w-3" /> Appeler
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg border border-[#DADCE0] px-2.5 py-1 text-[10px] font-medium text-[#3C4043]">
                              <Compass className="h-3 w-3" /> Itinéraire
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg border border-[#DADCE0] px-2.5 py-1 text-[10px] font-medium text-[#3C4043]">
                              <ArrowRight className="h-3 w-3" /> Site web
                            </span>
                          </div>
                        </div>

                        {/* RESULT #2 : COMPETITOR B */}
                        <div className="rounded-xl border border-[#E5E5E0] bg-white/70 p-2 text-[10px] text-[#5F6368] flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-[#202124]">#2 Établissement Concurrent B</span>
                            <div className="flex items-center gap-1 text-[9.5px] text-[#70757A]">
                              <span>4.3 ★ (52)</span>
                              <span>· 1.2 km</span>
                            </div>
                          </div>
                          <span className="font-mono text-[9px] text-[#70757A]">-48% clics</span>
                        </div>

                        {/* RESULT #3 : COMPETITOR C */}
                        <div className="rounded-xl border border-[#E5E5E0] bg-white/50 p-2 text-[10px] text-[#5F6368] flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-[#202124]">#3 Établissement Concurrent C</span>
                            <div className="flex items-center gap-1 text-[9.5px] text-[#70757A]">
                              <span>4.1 ★ (31)</span>
                              <span>· 2.4 km</span>
                            </div>
                          </div>
                          <span className="font-mono text-[9px] text-[#70757A]">-75% clics</span>
                        </div>
                      </div>

                      {/* Bottom live metrics */}
                      <div className="flex items-center justify-between border-t border-[#EBEBE6] pt-2 text-[10px] font-mono text-[#52504A]">
                        <span>Rayon audité : 15 km autour de {displayCity}</span>
                        <span className="font-bold text-[#1A73E8]">+1 450 impressions/semaine</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: SHOOTING HD & BALISAGE GÉOGRAPHIQUE EXIF */}
              {activeJourneyStep === 1 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EA4335]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#EA4335]">
                        <Camera className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 02 · BALISAGE VISUEL & GPS", "STEP 02 · VISUAL & GPS GEOTAGGING", "BƯỚC 02 · ĐỊNH DANH HÌNH ẢNH & GPS", "الخطوة 02 · التصوير والترميز الجغرافي", "ШАГ 02 · ВИЗУАЛ И EXIF-ГЕОТЕГИ"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Résolution 4K & EXIF</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Shooting HD & Balisage Géographique EXIF", "HD Shoot & GPS Geotagged Media", "Chụp ảnh HD & Gắn tọa độ EXIF", "تصوير احتراfi وترميز جغراfi EXIF", "HD-съёмка и EXIF-геотегирование"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Google favorise les fiches vivantes et authentiques. Nous gravons de manière invisible dans le code de vos photos les coordonnées GPS exactes de votre adresse. Google Cloud Vision lit ces données et valide physiquement votre présence dans la ville.",
                          "Google prioritizes fresh, authentic profiles. We invisibly embed your exact GPS coordinates directly into image EXIF metadata. Google Cloud Vision detects these tags and confirms your physical local presence.",
                          "Google ưu tiên hồ sơ sống động và chân thực. Chúng tôi gắn tọa độ GPS chuẩn xác vào file ảnh để thuật toán Google Cloud Vision xác nhận uy tín cơ sở.",
                          "تفضل جوجل الملفات الموثوقة ذات الصور الحقيقية. نقوم بدمج إحداثيات GPS لعنوانك بدقة داخل ملفات الصور لتقرأها خوارزمية الرؤية من جوجل فوراً.",
                          "Google продвигает живые профили. Мы прошиваем точные GPS-координаты вашей локации в метаданные EXIF. Нейросеть Google Vision мгновенно верифицирует бизнес.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#EA4335]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Shooting photo 4K de l'établissement, façade, équipe et produits phares", "4K authentic shoot of storefront, staff and showcase products", "Chụp ảnh 4K mặt tiền, nhân sự và sản phẩm chủ lực", "تصوير 4K احترافي للمكان والواجهة وفريق العمل والخدمات", "Съёмка 4K фасада, команды и ключевых услуг"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Encodage EXIF géolocalisé (Latitude, Longitude, Altitude & Nom officiel)", "Geotagged EXIF encoding (Exact Lat, Long, Elevation & Business name)", "Mã hóa tọa độ EXIF định vị vĩ độ, kinh độ và tên chính thức", "تضمين إحداثيات GPS والاسم الرسمي داخل بيانات الصور الرقمية", "Прошивка координат (широта, долгота, точный адрес)"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Validation par Google Vision API (score de pertinence certifié > 95%)", "Verification via Google Vision API (certified relevance > 95%)", "Xác thực qua Google Vision API đạt trên 95%", "اعتماد الصور عبر Google Vision API بنسبة تطابق تفوق 95%", "Проверка соответствия через Google Vision API"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#FCE8E6] px-3.5 py-2 text-xs font-semibold text-[#EA4335]">
                        <Camera className="h-4 w-4" />
                        <span>{t(l("Livrable : 25+ Photos Haute Résolution Balisées", "Deliverable: 25+ Geocoded HD Photos", "Bàn giao: 25+ Ảnh HD gắn GPS", "المخرج: 25+ صورة عالية الدقة مكوّدة جغرافياً", "Результат: 25+ гео-фотографий с подтверждением"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveJourneyStep(2)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Cohérence NAP", "Next step: NAP Authority", "Bước tiếp: Đồng bộ NAP", "الخطوة التالية: توحيد البيانات", "Следующий шаг: Каталоги"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION CAMERA VIEWFINDER & EXIF MOCKUP */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-zinc-900 shadow-2xl">
                      <img
                        src={currentSector.photo}
                        alt="Shoot HD"
                        className="h-full w-full object-cover filter brightness-95"
                      />

                      {/* Camera Viewfinder Overlay */}
                      <div className="pointer-events-none absolute inset-0 p-4">
                        <div className="h-full w-full rounded-xl border border-white/40 border-dashed relative">
                          {/* Corner Focus Marks */}
                          <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white" />
                          <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white" />
                          <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white" />
                          <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white" />

                          {/* Center Focus Reticle */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-8 w-8 rounded-full border border-white/60 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* EXIF Metadata Card Floating */}
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-black/75 p-3 backdrop-blur-md text-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] font-mono">
                          <span className="flex items-center gap-1.5 text-[#EA4335] font-bold">
                            <MapPin className="h-3 w-3" />
                            EXIF GPS METADATA
                          </span>
                          <span className="text-[#16A34A] font-bold">✓ GOOGLE VISION VALIDATED</span>
                        </div>
                        <div className="mt-1.5 grid grid-cols-3 gap-2 font-mono text-[9.5px]">
                          <div>
                            <span className="text-white/60 block">LAT / LONG</span>
                            <span className="font-semibold text-white">48.8566° N, 2.3522° E</span>
                          </div>
                          <div>
                            <span className="text-white/60 block">LOCALITÉ</span>
                            <span className="font-semibold text-white">{displayCity}</span>
                          </div>
                          <div>
                            <span className="text-white/60 block">RÉSOLUTION</span>
                            <span className="font-semibold text-white">4096 × 2732 · 4K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: COHÉRENCE NAP & 25+ ANNUAIRES D'AUTORITÉ */}
              {activeJourneyStep === 2 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#16A34A]">
                        <Globe2 className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 03 · SYNCHRONISATION MULTI-RÉSEAU", "STEP 03 · MULTI-NETWORK SYNCHRONIZATION", "BƯỚC 03 · ĐỒNG BỘ ĐA MẠNG LƯỚI", "الخطوة 03 · المزامنة الشاملة عبر الشبكات", "ШАГ 03 · ЕДИНЫЙ ПРОФИЛЬ NAP"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">25+ Plateformes clés</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Synchronisation NAP & 25+ Annuaires d'Autorité", "NAP Sync & 25+ Master Directories", "Đồng bộ NAP & 25+ Danh bạ Chính", "توحيد بيانات NAP عبر أكثر من 25 دليلاً", "Синхронизация NAP в 25+ главных каталогах"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Google ne croit pas une fiche sur parole : il vérifie que votre Nom, Adresse et Téléphone (NAP) sont rigoureusement identiques partout sur le web. Nous synchronisons vos données sur Apple Plans, Waze, Bing, PagesJaunes et éliminons tout doublon conflictuel.",
                          "Google verifies third-party consensus: it demands that your Name, Address, and Phone (NAP) are strictly identical across the web. We synchronize your data on Apple Maps, Waze, Bing Places, Yelp and eliminate conflicting duplicate citations.",
                          "Google đối chiếu dữ liệu chéo: đảm bảo Tên, Địa chỉ và Số điện thoại (NAP) hoàn toàn khớp trên toàn mạng internet. Chúng tôi đồng bộ trên Apple Maps, Waze, Bing và xóa bỏ trùng lặp.",
                          "تتحقق جوجل من مطابقة اسمك وعنوانك ورقم هاتفك بدقة عبر المنصات العالمية. نقوم بمزامنة بياناتك على Apple Maps وWaze وBing وغيرها مع حذف أي بيانات مكررة.",
                          "Google сверяет данные с десятками независимых источников: название, адрес и телефон (NAP) должны совпадать до символа. Мы синхронизируем профиль на всех картах.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#16A34A]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Alignement parfait du Nom, Adresse et Téléphone sans la moindre coquille", "Strict Name-Address-Phone formatting without single spelling discrepancy", "Đồng bộ tuyệt đối Tên, Địa chỉ, Số điện thoại chuẩn xác", "مطابقة تامة للاسم والعنوان ورقم الهاتف بدون أي خطأ إملائي", "Абсолютное соответствие NAP без расхождений"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Création & certification sur Apple Plans, Waze, Bing Places, TripAdvisor, etc.", "Setup & verification on Apple Maps, Waze, Bing, TripAdvisor, Yelp", "Xác thực trên Apple Maps, Waze, Bing, TripAdvisor...", "توثيق رسمي على Apple Maps وWaze وBing وTripAdvisor", "Регистрация на Apple Maps, Waze, Bing, TripAdvisor"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Suppression définitive des doublons fantômes qui diluaient votre autorité", "Permanent deletion of ghost duplicates that drained your ranking weight", "Xóa sổ các hồ sơ trùng lặp gây phân tán uy tín", "الحذف النهائي للملفات الوهمية المكررة التي تضعف ترتيبك", "Удаление старых дубликатов, размывающих вес профиля"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#E6F4EA] px-3.5 py-2 text-xs font-semibold text-[#16A34A]">
                        <Globe2 className="h-4 w-4" />
                        <span>{t(l("Livrable : Passeport Numérique Certifié & Dédupliqué", "Deliverable: Certified Multi-Directory Passport", "Bàn giao: Hộ chiếu Số Đa Nền tảng", "المخرج: جواز الحضور الرقمي الموحد الخالي من التكرار", "Результат: Единый цифровой паспорт во всех каталогах"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveJourneyStep(3)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Arsenal Avis 5★", "Next step: 5-Star Engine", "Bước tiếp: Avis 5★", "الخطوة التالية: التقييمات", "Следующий шаг: Отзывы"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION DIRECTORY NETWORK ECOSYSTEM */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-white p-6 shadow-xl flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#12110E]">
                          ÉCOSYSTÈME CITATIONS NAP
                        </span>
                        <span className="rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#16A34A]">
                          100% SYNCHRONISÉ
                        </span>
                      </div>

                      {/* Directory Node Grid */}
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 my-auto py-3">
                        {[
                          { name: "Google Maps", icon: "📍", status: "Maître" },
                          { name: "Apple Plans", icon: "🍎", status: "Certifié" },
                          { name: "Waze GPS", icon: "🚗", status: "Actif" },
                          { name: "Bing Places", icon: "🌐", status: "Vérifié" },
                          { name: "PagesJaunes", icon: "📒", status: "Synchronisé" },
                          { name: "TripAdvisor", icon: "🦉", status: "Validé" },
                        ].map((d, i) => (
                          <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-[#E5E5E0] bg-[#FAF9F5] p-3 text-center transition hover:border-[#16A34A]">
                            <span className="text-xl">{d.icon}</span>
                            <span className="mt-1 font-semibold text-xs text-[#12110E]">{d.name}</span>
                            <span className="mt-0.5 font-mono text-[9px] text-[#16A34A] font-medium flex items-center gap-1">
                              <Check className="h-2.5 w-2.5" /> {d.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl bg-[#F0FDF4] p-2.5 text-center font-mono text-[10.5px] text-[#16A34A] border border-[#16A34A]/20">
                        ✓ Consensus algorithmique Google : 100% de concordance géographique
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ARSENAL AVIS 5 ÉTOILES & CHEVALET NFC SANS CONTACT */}
              {activeJourneyStep === 3 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#B45309]">
                        <QrCode className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 04 · COLLECTE D'AVIS & CONVERSION", "STEP 04 · REVIEW ENGINE & CONVERSION", "BƯỚC 04 · CỖ MÁY ĐÁNH GIÁ & CHUYỂN ĐỔI", "الخطوة 04 · محرك التقييمات ومضاعفة التحويل", "ШАГ 04 · СБОР ОТЗЫВОВ 5★"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Technologie NFC 1 Tap</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Arsenal Avis 5 Étoiles & Chevalet NFC Sans Contact", "5-Star Review Engine & Contactless NFC Stand", "Cỗ máy Đánh giá 5 Sao & Thẻ Chạm NFC", "محرك التقييمات 5 نجوم وقاعدة NFC اللاتلامسية", "Диспетчер отзывов 5★ и стойка с чипом NFC"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Le volume et la fraîcheur des avis sont le signal n°1 de conversion. Nous vous équipons d'un support comptoir sans contact NFC + QR Code : vos clients posent leur smartphone et tombent directement sur la fenêtre 5 étoiles. Chaque avis reçoit une réponse sur-mesure sous 48h.",
                          "Review volume and recency are the top conversion signals. We provide a contactless NFC desk stand & QR badge: customers simply tap their phone and land right on your 5-star review page. We craft custom replies within 48h for every review.",
                          "Số lượng và độ mới của đánh giá là chìa khóa chuyển đổi số 1. Chúng tôi cung cấp thẻ chạm NFC để bàn & mã QR: khách chạm máy là đánh giá 5 sao tức thì. Mọi đánh giá đều được phản hồi tận tâm trong 48h.",
                          "التقييمات الحديثة هي العامل الأهم لكسب ثقة العملاء. نزودك بقاعدة طاولة ذكية بتقنية NFC ورمز QR: يلمس العميل بهاتفه ليفتح نموذج التقييم مباشرة في ثانيتين مع الرد الاحترافي على كل تقييم خلال 48 ساعة.",
                          "Свежие отзывы — главный фактор выбора заведения. Мы даём фирменную NFC-стойку: клиент прикладывает смартфон и за 3 секунды ставит 5 звёзд. Мы отвечаем на 100% отзывов за 48 часов.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#B45309]">
                        {t(l("Ce que nous déployons concrètement :", "What we execute concretely:", "Hạng mục triển khai cụ thể:", "ما نقوم بتنفيذه عملياً:", "Что мы делаем на этом шаге:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Chevalet comptoir NFC en bois/plexiglas + QR Code ultra-rapide gravé", "Premium contactless NFC counter display + instant scanned QR badge", "Thẻ để bàn NFC cao cấp + mã QR khắc laser siêu nhạy", "قاعدة مكتبية فاخرة بتقنية NFC اللاتلامسية ورمز QR مخصص", "NFC-стойка на стойку администратора + мгновенный QR-код"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Tunnel direct : le client n'a aucun menu à chercher, la boîte 5★ s'ouvre direct", "Direct funnel: zero menus to browse, 5-star rating dialog opens instantly", "Đường dẫn trực tiếp: mở ngay khung đánh giá không cần tìm kiếm", "توجيه فوري: يفتح صندوق تقييم 5 نجوم تلقائياً بدون أي تعقيد", "Прямая ссылка: окно 5 звёзд открывается сразу без поиска"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Réponses humaines sous 48h intégrées avec vos mots-clés stratégiques", "Tailored human replies within 48h enriched with target local SEO keywords", "Phản hồi chỉn chu lồng ghép từ khóa chiến lược trong 48h", "ردود راقية خلال 48 ساعة بصياغة ذكية تدعم الكلمات المفتاحية", "Ответы на отзывы за 48ч с нужными ключевыми запросами"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#FEF7E0] px-3.5 py-2 text-xs font-semibold text-[#B45309]">
                        <Award className="h-4 w-4" />
                        <span>{t(l("Livrable : Kit Chevalet NFC Connecté + Charte Réponses 48h", "Deliverable: Connected NFC Kit + 48h Reply Playbook", "Bàn giao: Bộ Thẻ NFC + Quy chuẩn Phản hồi 48h", "المخرج: طقم NFC الذكي + بروتوكول الردود الاحترافية", "Результат: NFC-комплект + протокол ответов на отзывы"))}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveJourneyStep(4)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Étape suivante : Conquête du Top 3", "Next step: Top 3 Conquest", "Bước tiếp: Chinh phục Top 3", "الخطوة التالية: حزمة أفضل 3 نتائج", "Следующий шаг: Топ-3"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ILLUSTRATION NFC TACTILE TAP & 5-STAR REVIEW CARD */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-gradient-to-br from-[#FFF9F2] to-[#FAF9F5] p-6 shadow-xl flex flex-col justify-between">
                      {/* NFC Device Graphic Header */}
                      <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#12110E] text-white">
                            <Radio className="h-4 w-4" />
                          </span>
                          <div>
                            <span className="block font-semibold text-xs text-[#12110E]">XR CONTACTLESS NFC</span>
                            <span className="block font-mono text-[9px] text-[#52504A]">Chauffe & Déclenchement 1-Tap</span>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#16A34A]">
                          100% AVIS RÉELS
                        </span>
                      </div>

                      {/* Simulated 5-Star Google Review Box */}
                      <div className="my-auto rounded-2xl border border-[#E5E5E0] bg-white p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#1A73E8] font-bold text-xs text-white">
                              CL
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-[#12110E]">Camille Laurent</div>
                              <div className="flex text-amber-500 text-[11px] mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                                ))}
                                <span className="ml-1.5 font-mono text-[10px] text-[#52504A]">Il y a 2 heures</span>
                              </div>
                            </div>
                          </div>
                          <span className="rounded-md bg-[#E8F0FE] px-2 py-0.5 font-mono text-[9px] font-bold text-[#1A73E8]">
                            Avis Certifié
                          </span>
                        </div>

                        <p className="mt-2.5 text-xs text-[#2B2925] leading-relaxed italic">
                          "Accueil exceptionnel et prestation remarquable ! Trouvé facilement sur Google Maps grâce aux photos magnifiques. Je recommande les yeux fermés."
                        </p>

                        <div className="mt-3 rounded-xl border border-[#E8E6E0] bg-[#FAF9F5] p-2.5 text-[11px] text-[#52504A]">
                          <span className="font-semibold text-[#12110E] block text-[10.5px]">
                            {t(l("Réponse du propriétaire (sous 1h15) :", "Response from the owner (within 1h15):", "Phản hồi từ chủ cơ sở:", "رد مالك النشاط (خلال ساعة):", "Ответ владельца (через 1 час):"))}
                          </span>
                          <span className="text-[10.5px] mt-0.5 block text-[#52504A]">
                            "Merci infiniment Camille ! Toute l'équipe de {displayCity} est ravie de votre satisfaction..."
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-[#52504A] pt-1">
                        <span>Taux de satisfaction : 99.2%</span>
                        <span className="font-bold text-[#12110E]">Score : 4.9 ★ (148 avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONQUÊTE TOP 3 & FLUX CONTINU D'APPELS */}
              {activeJourneyStep === 4 && (
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5]/10 px-3 py-1 font-mono text-[10.5px] font-bold text-[#4F46E5]">
                        <Phone className="h-3.5 w-3.5" />
                        {t(l("ÉTAPE 05 · FLUX DE CLIENTS & REVENUS", "STEP 05 · CLIENT INFLOW & REVENUE", "BƯỚC 05 · DÒNG KHÁCH HÀNG & DOANH THU", "الخطوة 05 · تدفق العملاء وتضاعف الإيرادات", "ШАГ 05 · ПОТОК КЛИЕНТОВ И ДОХОД"))}
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">Pack Local Top 3</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#12110E] sm:text-3xl">
                      {t(l("Conquête du Top 3 & Flux d'Appels Téléphoniques", "Top 3 Conquest & Inbound Phone Surge", "Chinh phục Top 3 & Bùng nổ Cuộc gọi Đến", "دخول أفضل 3 نتائج وتدفق الاتصالات المباشرة", "Выход в топ-3 и поток звонков"))}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#52504A] sm:text-sm">
                      {t(
                        l(
                          "Votre fiche est désormais installée dans le Top 3 du Pack Local de votre ville. Sur smartphone, les clients cliquent directement sur 'Appeler' ou 'Itinéraire'. Votre investissement annuel est rentabilisé dès les premières semaines grâce aux nouveaux clients générés.",
                          "Your profile is now firmly established in the local Top 3 Pack. Mobile searchers tap 'Call' or 'Directions' with zero friction. Your annual investment is amortized within weeks from high-ticket local clients.",
                          "Cơ sở của bạn đứng vững trong Top 3 Local Pack. Khách trên điện thoại bấm gọi hoặc chỉ đường ngay lập tức, đem lại dòng doanh thu đều đặn.",
                          "أصبح ملفك ثابتاً في صدارة النتائج الثلاث الأولى. يضغط العملاء مباشرة على زر 'اتصال' أو 'الاتجاهات' لتتحول عمليات البحث اليومية إلى مبيعات وأرباح فورية.",
                          "Ваш бизнес стабильно занимает топ-3 в блоке карт. Клиенты со смартфонов нажимают 'Позвонить' или 'Маршрут', обеспечивая стабильный приток заказов.",
                        ),
                      )}
                    </p>

                    <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 space-y-2">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#4F46E5]">
                        {t(l("Ce que vous récoltez au quotidien :", "What you reap daily:", "Kết quả thu hoạch hằng ngày:", "ما تحصده يومياً بشكل عملي:", "Ваши ежедневные результаты:"))}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2B2925]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("+180% d'appels entrants qualifiés sans dépenser un euro en publicité payante", "+180% incoming high-intent calls without burning budget on paid ads", "+180% cuộc gọi đến có nhu cầu thực mà không tốn tiền quảng cáo", "+180% اتصالات هاتفية من عملاء جاهزين دون أي مصاريف إعلانية", "+180% прямых целевых звонков без расходов на рекламу"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Afflux régulier de clients physiques guidés directement par GPS jusqu'à vous", "Consistent stream of foot traffic routed straight to your storefront by GPS", "Lượng khách trực tiếp tìm đến cửa hàng nhờ định vị GPS", "تدفق مستمر للعملاء يقودهم نظام الملاحة بخرائط جوجل إلى باب محلك", "Постоянный поток посетителей по навигатору прямо к двери"))}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
                          <span>{t(l("Tableau de bord de suivi mensuel clair : appels, itinéraires et clics site web", "Clear monthly analytics dashboard: phone calls, GPS directions and website clicks", "Báo cáo theo dõi hằng tháng rõ ràng: cuộc gọi, chỉ đường và lượt truy cập", "لوحة تحكم شهرية واضحة تبيّن عدد المكالمات والاتجاهات المحققة", "Личный прозрачный дашборд: звонки, маршруты и клики"))}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#EEF2FF] px-3.5 py-2 text-xs font-semibold text-[#4F46E5]">
                        <TrendingUp className="h-4 w-4" />
                        <span>{t(l("Livrable : Tableau de Bord Mensuel + Suivi des Appels", "Deliverable: Monthly Performance Dashboard", "Bàn giao: Bảng đo lường Hiệu quả Hằng tháng", "المخرج: لوحة بيانات شهرية وتتبع للمكالمات", "Результат: Ежемесячный дашборд звонков и маршрутов"))}</span>
                      </div>
                      <a
                        href="#simulateur-devis"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12110E] hover:underline"
                      >
                        <span>{t(l("Estimer mon investissement Top 3", "Estimate my Top 3 investment", "Dự toán chi phí Top 3", "قدّر استثمارك لدخول أفضل 3 نتائج", "Рассчитать бюджет для топ-3"))}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* ILLUSTRATION INCOMING CALL PHONE NOTIFICATION & METRICS */}
                  <div className="lg:col-span-6">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#D5D5CF] bg-[#12110E] p-6 shadow-2xl text-white flex flex-col justify-between">
                      {/* Top Bar status */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
                          SIGNAL LOCAL ACTIF
                        </span>
                        <span className="rounded-full bg-[#16A34A]/20 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-[#16A34A]">
                          ● EN LIGNE TOP 3
                        </span>
                      </div>

                      {/* Live Incoming Call Simulation Box */}
                      <div className="my-auto rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <span className="absolute -inset-1 animate-ping rounded-full bg-[#16A34A]/50" />
                            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#16A34A] text-white shadow-lg">
                              <Phone className="h-5 w-5 animate-bounce" />
                            </div>
                          </div>
                          <div>
                            <span className="rounded-md bg-[#16A34A]/20 px-2 py-0.5 font-mono text-[9px] font-bold text-[#16A34A]">
                              NOUVEL APPEL ENTRANT (GOOGLE MAPS)
                            </span>
                            <h4 className="mt-1 font-serif text-lg font-medium text-white">
                              Prospect Qualifié · {displayCity}
                            </h4>
                            <p className="font-mono text-[10px] text-white/60">
                              Bouton "Appeler" déclenché depuis mobile
                            </p>
                          </div>
                        </div>

                        {/* Visual Growth bar */}
                        <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-xs font-mono">
                          <span className="text-white/70">Flux mensuel d'appels :</span>
                          <span className="font-bold text-[#16A34A]">+180% (45 à 75 appels)</span>
                        </div>
                      </div>

                      {/* Bottom live ticker */}
                      <div className="flex items-center justify-between font-mono text-[10px] text-white/60 pt-1">
                        <span>Rayon d'action : {displayCity} et agglomération</span>
                        <span className="text-[#4F46E5] font-bold">100% Organique (0 € Ads)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5-Step Summary Pills Roadmap below */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5">
              {[
                { n: "01", t: l("Radar & Failles", "Radar & Gaps", "Radar & Điểm yếu", "رادار الثغرات", "Радар"), c: "#1A73E8" },
                { n: "02", t: l("Shooting & EXIF", "Photos & EXIF", "Ảnh & EXIF GPS", "تصوير وترميز", "HD-фото"), c: "#EA4335" },
                { n: "03", t: l("Synchronisation NAP", "NAP Authority", "Đồng bộ NAP", "توحيد NAP", "Каталоги"), c: "#16A34A" },
                { n: "04", t: l("Arsenal Avis 5★", "5-Star Engine", "Avis 5★ NFC", "تقييمات 5 نجوم", "Отзывы"), c: "#F59E0B" },
                { n: "05", t: l("Top 3 & Appels", "Top 3 & Calls", "Top 3 & Cuộc gọi", "أفضل 3 نتائج والاتصالات", "Топ-3"), c: "#4F46E5" },
              ].map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveJourneyStep(i)}
                  className={`rounded-2xl p-3 text-start transition border ${
                    activeJourneyStep === i
                      ? "border-[#12110E] bg-white shadow-sm"
                      : "border-[#EBEBE6] bg-[#FAF9F5] hover:border-[#12110E]"
                  }`}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: pill.c }}>
                    {pill.n}
                  </span>
                  <div className="mt-1 font-serif text-xs font-medium text-[#12110E] truncate">
                    {t(pill.t)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            4. FAQ TRANSPARENTE ET RÉASSURANCE
           ════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#FAF9F5] py-16 sm:py-20 border-b border-[#E8E6E0]">
          <div className="mx-auto max-w-3xl px-4 sm:px-8">
            <div className="text-center">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#52504A]">
                {t(l("QUESTIONS FRÉQUENTES & TRANSPARENCE", "FREQUENT QUESTIONS & TRANSPARENCY", "CÂU HỎI THƯỜNG GẶP & MINH BẠCH", "الأسئلة الشائعة والشفافية", "ЧАСТЫЕ ВОПРОСЫ И ОТВЕТЫ"))}
              </span>
              <h2 className="mt-2 font-serif text-2xl font-medium text-[#12110E] sm:text-4xl">
                {t(l("Tout ce que vous devez savoir avant de démarrer.", "Everything you need to know before starting.", "Mọi điều bạn cần biết trước khi bắt đầu.", "كل ما تحتاج معرفته قبل الانطلاق.", "Всё, что важно знать перед стартом."))}
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: l("Pourquoi le Top 3 Google Maps génère-t-il plus d'appels qu'un site web ?", "Why does the Top 3 generate more phone calls than a standard website?", "Tại sao Top 3 Google Maps tạo nhiều cuộc gọi hơn website?", "لماذا تحقق أفضل 3 نتائج على الخرائط اتصالات أكثر من الموقع؟", "Почему топ-3 карт даёт больше звонков, чем сайт?"),
                  a: l("Sur mobile, le Local 3-Pack de Google s'affiche avant les résultats naturels. Il offre un bouton direct 'Appeler' et 'Itinéraire' qui court-circuite la navigation : le client vous contacte immédiatement.", "On mobile, the Local 3-Pack appears above standard organic results with direct 'Call' and 'Directions' buttons, driving immediate high-intent actions.", "Trên di động, Local 3-Pack hiện ngay đầu với nút gọi và chỉ đường trực tiếp, tạo tương tác tức thì.", "على الجوال، تظهر النتائج الثلاث الأولى مباشرة مع زر اتصال فوري وتوجيه جغرافي بنقرة واحدة.", "На смартфонах блок карт отображается первым с кнопками 'Позвонить' и 'Маршрут', снимая все барьеры."),
                },
                {
                  q: l("Y a-t-il une garantie de position n°1 ?", "Is there a guarantee for position #1?", "Có cam kết vị trí số 1 không?", "هل تضمنون المركز الأول؟", "Есть ли гарантия первого места?"),
                  a: l("Non, et aucun prestataire sérieux ne peut le garantir car Google reste seul souverain de son algorithme. Nous optimisons en revanche 100% des critères officiels (pertinence, distance, autorité des avis) pour maximiser vos chances de conquérir le Top 3.", "No, and no honest agency can guarantee rank #1 as Google controls its algorithm. However, we meticulously optimize 100% of official signals (relevance, distance, authority) to maximize your ranking power.", "Không, không ai có thể can thiệp thuật toán Google. Nhưng chúng tôi tối ưu 100% tiêu chí chính thức để tối đa hóa cơ hội đạt Top 3.", "لا، فخوارزمية جوجل وحدها صاحبة القرار. لكننا نحسن 100% من معايير الترتيب الرسمية لتعظيم فرصك في الصدارة.", "Нет, никто не управляет алгоритмом Google напрямую. Но мы выжимаем 100% из официальных факторов ранжирования."),
                },
                {
                  q: l("Comment fonctionne la formule Gestion Annuelle à 500 € / an ?", "How does the €500/year annual management plan work?", "Gói quản trị hàng năm 500 €/năm hoạt động thế nào?", "كيف تعمل باقة الإدارة السنوية بـ 500 € / سنة؟", "Как работает годовое ведение за 500 €/год?"),
                  a: l("C'est une gestion active clé en main pendant 12 mois sans abonnement mensuel : nous surveillons votre fiche, répondons sous 48h à 100% des avis clients, publions vos photos et actualités et protégeons votre profil contre les modifications frauduleuses.", "It is an active turnkey management service for 12 months with no monthly fee: we monitor your listing, respond to 100% of reviews within 48h, post photos and updates, and defend your profile.", "Đây là dịch vụ trọn gói 12 tháng không phí tháng: chăm sóc hồ sơ, phản hồi 100% đánh giá trong 48h, đăng ảnh và bảo vệ hồ sơ.", "إنها خدمة إدارة متكاملة لمدة 12 شهرًا بدون اشتراك شهري: نتابع ملفك ونرد على 100% من التقييمات وننشر الصور ونحمي الملف.", "Это комплексное годовое ведение без ежемесячных платежей: ответы на все отзывы за 48ч, регулярные фото и защита от спама."),
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                  <h3 className="font-serif text-base font-semibold text-[#12110E]">{t(faq.q)}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#52504A]">{t(faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3. BRANDING & IDENTITÉ VISUELLE STUDIO PAGE (/services/branding)
// ════════════════════════════════════════════════════════════════════════════
export function BrandingStudioPage() {
  const { t, price, lang } = useLang();
  const isRtl = lang === "ar";
  const service = SERVICES.find((s) => s.id === "branding")!;
  const [selectedPalette, setSelectedPalette] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);

  const palettes = [
    {
      name: l("Obsidienne & Champagne", "Obsidian & Champagne", "Đen tuyền & Champagne", "الأوبسيديان والبرونز الدافئ", "Обсидиан и шампань"),
      vibe: l("Hôtellerie, Immobilier, Maisons de prestige, Cabinets", "Hospitality, Real Estate, Prestige Brands, Advisory", "Khách sạn, Bất động sản, Thương hiệu cao cấp", "الضيافة، العقار الفاخر، العلامات الراقية", "Отели, недвижимость, премиальные бренды"),
      colors: ["#171613", "#2A2722", "#9E7F5A", "#D1C7BD", "#F7F4EE"],
    },
    {
      name: l("Forêt Profonde & Lin Naturel", "Deep Forest & Natural Linen", "Xanh rừng & Vải lanh tự nhiên", "الأخضر العميق والكتان الطبيعي", "Глубокий лес и натуральный лён"),
      vibe: l("Gastronomie, Bien-être, Spas, Cliniques esthétiques", "Gastronomy, Wellness, Spas, Aesthetic Clinics", "Ẩm thực, Chăm sóc sức khỏe, Spa & Phòng khám", "المطاعم الراقية، العافية، المنتجعات الصحية", "Гастрономия, спа, велнес и клиники"),
      colors: ["#121D18", "#1F352C", "#7A9486", "#DCD6CA", "#F7F4EE"],
    },
    {
      name: l("Ardoise & Argent Architectural", "Slate & Architectural Silver", "Đá phiến & Bạc kiến trúc", "الأردواز والفضي المعماري", "Сланец и архитектурное серебро"),
      vibe: l("Tech, Logiciels B2B, Architecture, Conseil & Industrie", "Tech, B2B Software, Architecture, Advisory & Industry", "Công nghệ, Phần mềm B2B, Kiến trúc & Tư vấn", "التقنية، البرمجيات، الهندسة والاستشارات", "Технологии, B2B-ПО, архитектура и консалтинг"),
      colors: ["#11151C", "#242D3B", "#64748B", "#CBD5E1", "#F8FAFC"],
    },
  ];

  const activePalette = palettes[selectedPalette];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#FAF9F5] text-[#12110E]">
      <Nav />
      <main>
        {/* Editorial Hero — Lumineux & Haute Couture */}
        <section className="relative overflow-hidden bg-white pb-16 pt-24 border-b border-[#E8E6E0] sm:pb-24 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(18,17,14,0.04),transparent_65%)]" />

          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#12110E]">
                  <Palette className="h-3.5 w-3.5" />
                  {t(l("DIRECTION ARTISTIQUE & IDENTITÉ DE MARQUE", "ART DIRECTION & BRAND IDENTITY", "ĐỊNH HƯỚNG NGHỆ THUẬT & THƯƠNG HIỆU", "الإخراج الفني والهوية البصرية", "АРТ-ДИРЕКШН И БРЕНДИНГ"))}
                </span>
                <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.4vw,4.8rem)] font-medium leading-[1.02] tracking-tight text-[#12110E]">
                  {t(l("Créez une identité visuelle forte et", "Create a distinctive and", "Xây dựng bản sắc thương hiệu", "اصنع هوية بصرية قوية و", "Создайте сильную и"))}{" "}
                  <em className="italic font-normal text-[#12110E] underline decoration-[#12110E]/30 underline-offset-8">
                    {t(l("mémorable.", "memorable identity.", "khó quên.", "راسخة في الأذهان.", "запоминающуюся айдентику."))}
                  </em>
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-[#52504A] sm:text-base">
                  {t(
                    l(
                      "Logo vectoriel, palette chromatique, typographies éditoriales, charte graphique complète, supports print et déclinaisons digitales. Dès 199 €.",
                      "Vector logo, colour system, editorial typography, brand guidelines, print collateral and digital assets. From €199.",
                      "Logo vector, bảng màu, hệ thống chữ, bộ quy chuẩn thương hiệu, ấn phẩm và tài sản số. Từ 199 €.",
                      "شعار احترافي، لوحة ألوان، خطوط تحريرية، دليل هوية متكامل وتطبيقات رقمية ومطبوعة. ابتداءً من 199 €.",
                      "Векторный логотип, цветовая система, типографика, брендбук, печатные и цифровые носители. От 199 €.",
                    ),
                  )}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    {t(l("Voir les formules Branding (199 € · 299 € · 399 €)", "Explore Branding plans (€199 · €299 · €399)", "Xem các gói Branding (199 € · 299 € · 399 €)", "عرض باقات الهوية (199 € · 299 € · 399 €)", "Смотреть тарифы (199 € · 299 € · 399 €)"))}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Interactive Colour Direction Atelier & Studio Visual */}
              <div className="space-y-6 lg:col-span-6">
                {/* 100% Real High-Resolution Editorial Branding Photograph */}
                <div className="group/brand relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-[#E5E5E0] bg-white shadow-xl">
                  <img
                    src={XR_PHOTOS.branding}
                    alt="Direction artistique, Brand Book et papeterie de prestige"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover/brand:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top micro-capsules */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-md">
                      ✦ DIRECTION ARTISTIQUE & ATELIER
                    </span>
                    <span className="whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-white backdrop-blur-md shadow-md">
                      300 DPI · VECTORIEL
                    </span>
                  </div>

                  {/* Bottom Frosted Glass Caption Card */}
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/75 p-3.5 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover/brand:bg-black/85">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-serif text-base font-medium tracking-tight text-white">
                          Identité de Marque & Système Graphique 360°
                        </h4>
                        <p className="mt-0.5 truncate text-[11px] text-white/70">
                          Logo Vectoriel · Typographies Singulières · Brand Book & Papeterie
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg border border-white/20 bg-white/15 px-2.5 py-1 font-mono text-[10.5px] font-bold text-white">
                        Cession 100%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Harmonious Palette Selector */}
                <div className="rounded-3xl border border-[#E5E5E0] bg-white p-5 shadow-xl sm:p-6 text-[#12110E]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#12110E]">
                      {t(l("ATELIER CHROMATIQUE · EXPLOREZ UNE DIRECTION", "COLOUR ATELIER · EXPLORE A DIRECTION", "XƯỞNG MÀU SẮC · KHÁM PHÁ PHONG CÁCH", "مختبر الألوان · استكشف التوجه البصري", "ЦВЕТОВАЯ ПАЛИТРА · ПРИМЕРЫ НАПРАВЛЕНИЙ"))}
                    </span>
                    <span className="font-mono text-[10px] text-[#52504A]">
                      {t(activePalette.name)}
                    </span>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {palettes.map((pal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPalette(idx)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                          selectedPalette === idx
                            ? "bg-[#12110E] text-white shadow-sm"
                            : "border border-[#EBEBE6] bg-[#FAF9F5] text-[#2B2925] hover:border-[#12110E]"
                        }`}
                      >
                        {t(pal.name)}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {activePalette.colors.map((hex) => (
                      <div key={hex} className="space-y-1 text-center">
                        <div
                          className="h-12 w-full rounded-xl border border-black/10 shadow-inner transition-all duration-500"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="block font-mono text-[9px] text-[#52504A]">{hex}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3.5 text-xs text-[#52504A] border-t border-[#EBEBE6] pt-3">
                    <strong className="text-[#12110E] font-medium">{t(l("Idéal pour :", "Ideal for:", "Phù hợp cho:", "مثالي لـ:", "Подходит для:"))}</strong> {t(activePalette.vibe)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            INTERACTIVE BEFORE / AFTER BRANDING SLIDER
           ════════════════════════════════════════════════════════════════════ */}
        <section id="avant-apres" className="border-b border-[#E8E6E0] bg-[#FAF9F5] py-16 sm:py-24">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#12110E]">
                <Sparkles className="h-3 w-3 text-[#C5A880]" />
                {t(l("MÉTAMORPHOSE & VALEUR PERÇUE", "METAMORPHOSIS & PERCEIVED VALUE", "CHUYỂN HÓA BẢN SẮC & GIÁ TRỊ CẢM NHẬN", "التحول البصري والقيمة المدركة", "ТРАНСФОРМАЦИЯ И ВОСПРИЯТИЕ БРЕНДА"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("Glissez pour comparer l'Avant / Après.", "Slide to compare Before & After.", "Kéo thanh trượt để so sánh Trước / Sau.", "اسحب للمقارنة بين قبل وبعد صياغة الهوية.", "Сравните До и После создания айдентики."))}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(l("Une identité amateur brise instantanément la confiance. Un système graphique haute-couture décuple votre valeur perçue dès la première seconde.", "An amateur identity ruins trust instantly. A bespoke haute-couture system multiplies your perceived value from second one.", "Một bộ nhận diện nghiệp dư làm mất niềm tin ngay lập tức. Hệ thống nhận diện cao cấp giúp nhân giá trị thương hiệu lên gấp nhiều lần.", "الهوية العشوائية تضعف ثقة العميل فوراً، بينما النظام البصري الفاخر يرفع قيمتك السوقية من النظرة الأولى.", "Любительский логотип снижает доверие. Высокая айдентика кратно увеличивает воспринимаемую ценность с первой секунды."))}
              </p>
            </div>

            {/* Before / After Split Slider */}
            <div className="mt-12 mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#D5D5CF] bg-[#12110E] shadow-2xl select-none">
                {/* AFTER LAYER (FULL BACKGROUND) */}
                <div className="absolute inset-0 bg-[#0E0D0B] p-8 sm:p-12 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 px-3 py-1 font-mono text-[10px] font-bold text-[#C5A880]">
                      ✦ APRÈS : XR AGENCY HAUTE COUTURE
                    </span>
                    <span className="font-mono text-xs text-[#C5A880]">VALEUR PERÇUE : ×3</span>
                  </div>

                  <div className="max-w-md">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A880] uppercase">
                      MAISON HAUTE PARFUMERIE
                    </span>
                    <h3 className="mt-2 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#FAF8F5]">
                      L'ÉLIXIR PUR
                    </h3>
                    <p className="mt-2 text-xs text-[#D1C7BD] leading-relaxed">
                      Système typographique gravé sur-mesure, dorure à chaud, logo vectoriel SVG infini et palette champagne/obsidienne intemporelle.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="rounded-md border border-[#C5A880]/30 bg-white/5 px-2.5 py-1 font-mono text-[9.5px] text-[#C5A880]">
                        Vectoriel 300 DPI
                      </span>
                      <span className="rounded-md border border-[#C5A880]/30 bg-white/5 px-2.5 py-1 font-mono text-[9.5px] text-[#C5A880]">
                        Brand Book 28 Pages
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A49C] border-t border-white/10 pt-3">
                    <span>Prêt pour print, packaging de luxe, enseigne physique et digital</span>
                    <span className="text-[#C5A880]">Tarifs clients : +40% acceptés</span>
                  </div>
                </div>

                {/* BEFORE LAYER (CLIPPED BY SLIDER) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-[#ECEAE4] p-8 sm:p-12 flex flex-col justify-between text-[#2B2925] border-r-2 border-white shadow-2xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-100 border border-red-300 px-3 py-1 font-mono text-[10px] font-bold text-red-600">
                      ✕ AVANT : LOGO GÉNÉRIQUE CANVA
                    </span>
                    <span className="font-mono text-xs text-red-600">CRÉDIBILITÉ FAIBLE</span>
                  </div>

                  <div className="max-w-md">
                    <span className="font-sans text-[11px] uppercase tracking-wide text-zinc-500">
                      Boutique de parfum
                    </span>
                    <h3 className="mt-2 font-sans font-bold text-2xl sm:text-4xl text-zinc-800 tracking-normal">
                      L'elixir pur
                    </h3>
                    <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                      Image JPG basse résolution, police par défaut, couleurs criardes, impossible à agrandir pour enseigne ou packaging haut de gamme.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="rounded-md bg-zinc-200 px-2.5 py-1 font-mono text-[9.5px] text-zinc-700">
                        Pixelisé en grand format
                      </span>
                      <span className="rounded-md bg-zinc-200 px-2.5 py-1 font-mono text-[9.5px] text-zinc-700">
                        Zéro charte graphique
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-300 pt-3">
                    <span>Aspect amateur qui incite les prospects à négocier les prix</span>
                    <span className="text-red-600">Pertes de ventes</span>
                  </div>
                </div>

                {/* SLIDER HANDLE */}
                <div
                  className="absolute inset-y-0 -ml-3 flex items-center justify-center cursor-ew-resize pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#12110E] shadow-2xl border-2 border-[#12110E]">
                    <span className="text-xs font-bold">⇄</span>
                  </div>
                </div>

                {/* Range input invisible overlay */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  aria-label="Avant / Après Slider"
                />
              </div>

              {/* Helper instruction */}
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-[#52504A]">
                <span>← Glissez de gauche à droite pour observer la métamorphose →</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            PARALLAX SYSTEM SHOWCASE CARDS (LIVRABLES BRANDING)
           ════════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-16 sm:py-24 border-b border-[#E8E6E0]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#12110E]">
                {t(l("LIVRABLES SUR-MESURE", "BESPOKE DELIVERABLES", "TÀI SẢN BÀN GIAO", "المخرجات الاحترافية المسلّمة", "ЧТО ВХОДИТ В РЕЗУЛЬТАТ"))}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#12110E] sm:text-4xl">
                {t(l("Tout ce dont vous avez besoin pour imposer votre standing.", "Everything you need to assert your stature.", "Mọi thứ cần thiết để khẳng định đẳng cấp.", "كل ما تحتاجه لفرض حضورك وتميزك.", "Всё необходимое для премиального статуса."))}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  n: "01",
                  title: l("Logo Vectoriel & Déclinaisons", "Vector Logo & Variants", "Logo Vector & Biến thể", "الشعار الفيكتوري والنسخ المتعددة", "Векторный логотип"),
                  desc: l("Fichiers maîtres SVG, AI, EPS, PDF, PNG transparent 300 DPI pour impression géante sans aucune perte.", "Master SVG, AI, EPS, PDF, high-res transparent PNG files for giant printing without quality loss.", "File gốc SVG, AI, EPS, PDF chất lượng in ấn kích thước lớn không suy giảm.", "ملفات أصلية SVG وAI وPDF قابلة للتكبير اللانهائي دون أي فقد في الدقة.", "Мастер-файлы SVG, AI, PDF для любых форматов."),
                  icon: Sparkles,
                },
                {
                  n: "02",
                  title: l("Typographies Éditoriales", "Editorial Typography", "Bộ chữ Độc bản", "الخطوط التحريرية الحصرية", "Шрифтовая система"),
                  desc: l("Sélection minutieuse de polices haute-couture : titres majestueux, textes de labeur fluides et hiérarchie rigoureuse.", "Carefully curated editorial font pairing: majestic headlines, fluid body copy and rigorous optical balance.", "Kết hợp font chữ thượng lưu: tiêu đề uy nghi, nội dung dễ đọc.", "مواءمة دقيقة لخطوط العناوين الفاخرة والنصوص الانسيابية.", "Пара премиальных шрифтов для заголовков и текста."),
                  icon: FileText,
                },
                {
                  n: "03",
                  title: l("Brand Book & Guidelines", "Brand Book & Guidelines", "Brand Book Quy chuẩn", "دليل الهوية الكامل", "Брендбук и гайдлайн"),
                  desc: l("Guide complet d'utilisation : règles d'interdiction, zones de respiration, palettes hexadécimales, CMJN et Pantone.", "Complete rulebook: clear spacing, forbidden treatments, hex codes, CMYK and Pantone color swatches.", "Cẩm nang hướng dẫn sử dụng: khoảng cách, màu CMYK và Pantone.", "كتيب شامل لقواعد استخدام الشعار وأكواد ألوان CMYK وPantone.", "Правила использования, отступы, CMYK и Pantone."),
                  icon: Award,
                },
                {
                  n: "04",
                  title: l("Papeterie & Déclinaisons 360°", "Stationery & 360° Collateral", "Ấn phẩm & Tài sản số", "المطبوعات والتطبيقات الرقمية", "Носители и полиграфия"),
                  desc: l("Cartes de visite de prestige, en-têtes officiels, signatures e-mail raffinées, bannières réseaux sociaux et favicons.", "Luxury business cards, formal letterheads, refined email signatures, social headers and app favicons.", "Danh thiếp ép kim, tiêu đề thư, chữ ký email và banner mạng xã hội.", "بطاقات أعمال فاخرة، أوراق رسمية، تواقيع بريد إلكتروني وبانرات سوشيال ميديا.", "Визитки, бланки, подписи писем и баннеры."),
                  icon: CheckCircle2,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#E5E5E0] bg-[#FAF9F5] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#12110E] hover:bg-white hover:shadow-lg"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#C5A880]">{item.n}</span>
                    <h3 className="mt-3 font-serif text-lg font-medium text-[#12110E]">{t(item.title)}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#52504A]">{t(item.desc)}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E8E6E0] pt-4">
                    <span className="font-mono text-[10px] text-[#52504A]">100% Propriétaire</span>
                    <item.icon className="h-4 w-4 text-[#12110E]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branding Plans */}
        <section id="plans" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {service.plans.map((p, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between rounded-3xl border p-7 transition-all duration-300 ${
                  p.popular
                    ? "border-2 border-[#12110E] bg-white text-[#12110E] shadow-xl ring-1 ring-black/5"
                    : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#52504A]">
                      BRANDING 0{idx + 1}
                    </span>
                    {p.popular && (
                      <span className="rounded-full bg-[#12110E] px-3 py-1 font-mono text-[10px] font-semibold uppercase text-white">
                        {t(l("Le plus choisi", "Most chosen", "Phổ biến nhất", "الأكثر اختياراً", "Популярный выбор"))}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-medium text-[#12110E]">{t(p.name)}</h3>
                  <div className="mt-5 flex items-baseline gap-2 border-y border-[#EBEBE6] py-5">
                    <span className="font-serif text-5xl font-semibold text-[#12110E]">{price(p.eur)}</span>
                    <span className="font-mono text-xs text-[#52504A]">{t(PERIOD_LABEL.once)}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {(p.features ?? []).map((f, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-xs text-[#2B2925]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span>{t(f)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <AddToCartBtn
                    item={{
                      serviceId: "branding",
                      serviceName: t(service.title),
                      planName: t(p.name),
                      priceEur: p.eur,
                      period: "once",
                      periodLabel: t(PERIOD_LABEL.once),
                    }}
                    popular={p.popular}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4. IA, AUTOMATISATION & LOGICIELS SUR-MESURE (/services/ai, /services/strategy)
// ════════════════════════════════════════════════════════════════════════════
export function AiAndCustomSoftwareStudioPage() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(12);
  const [teamSize, setTeamSize] = useState(4);
  const annualHoursSaved = hoursSavedPerWeek * teamSize * 48;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#FAF9F5] text-[#12110E]">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-white pb-16 pt-24 border-b border-[#E8E6E0] sm:pb-24 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(18,17,14,0.04),transparent_65%)]" />

          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#12110E]">
                  <Cpu className="h-3.5 w-3.5" />
                  {t(l("IA · LOGICIELS MÉTIERS & AUTOMATISATION", "AI · CUSTOM SOFTWARE & AUTOMATION", "AI · PHẦN MỀM & TỰ ĐỘNG HÓA", "الذكاء الاصطناعي والبرمجيات والأتمتة", "ИИ · РАЗРАБОТКА ПО И АВТОМАТИЗАЦИЯ"))}
                </span>
                <h1 className="mt-5 font-serif text-[clamp(2.3rem,5.2vw,4.6rem)] font-medium leading-[1.02] tracking-tight text-[#12110E]">
                  {t(
                    l(
                      "Outils sur mesure, automatisation opérationnelle & intégrations IA.",
                      "Bespoke tools, operational automation & practical AI integrations.",
                      "Phần mềm riêng, tự động hóa vận hành & tích hợp AI thực tiễn.",
                      "أدوات مخصصة وأتمتة للعمليات وتكامل عملي للذكاء الاصطناعي.",
                      "Индивидуальное ПО, автоматизация процессов и практический ИИ.",
                    ),
                  )}
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-[#52504A] sm:text-base">
                  {t(
                    l(
                      "Au-delà de votre site web, XR Agency conçoit des outils internes sur mesure : tableaux de bord, automatisation des devis et factures, qualification de demandes et connecteurs API adaptés à votre organisation.",
                      "Beyond your website, XR Agency builds tailored internal tools: custom dashboards, quote and invoicing workflows, enquiry qualification and API integrations built around your operations.",
                      "Vượt xa website, XR Agency thiết kế công cụ nội bộ theo yêu cầu: bảng điều khiển, tự động hóa báo giá/hóa đơn và kết nối API phù hợp quy trình.",
                      "إلى جانب موقعك الإلكتروني، تطور XR Agency أدوات داخلية مخصصة: لوحات تحكم، أتمتة عروض الأسعار والفواتير وربط واجهات API.",
                      "Помимо сайтов XR Agency создаёт внутренние инструменты под ключ: дашборды, автоматизацию смет и счетов, обработку заявок и API-интеграции.",
                    ),
                  )}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="/#quote"
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-6 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    {t(l("Cadrer mon projet sur mesure", "Scope my custom project", "Tư vấn dự án riêng", "حدد نطاق مشروعي", "Обсудить проект"))}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/services/robotique"
                    className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-6 py-3.5 text-xs font-semibold text-[#12110E] shadow-sm transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                  >
                    <Bot className="h-4 w-4 text-[#12110E]" />
                    {t(l("Découvrir l'offre Robotique", "Explore Robotics solutions", "Xem giải pháp Robot", "اكتشف حلول الروبوتات", "Смотреть раздел Робототехника"))}
                  </Link>
                </div>
              </div>

              {/* Illustrative Time-Saved Estimator */}
              <div className="rounded-3xl border border-[#E5E5E0] bg-white p-6 shadow-xl sm:p-8 lg:col-span-6 text-[#12110E]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#12110E]">
                  {t(l("ESTIMATEUR ILLUSTRATIF DE TEMPS LIBÉRÉ", "ILLUSTRATIVE TIME-SAVINGS ESTIMATOR", "ƯỚC TÍNH THỜI GIAN TIẾT KIỆM", "تقدير توضيحي للوقت الموفّر", "ОРИЕНТИРОВОЧНЫЙ РАСЧЁТ ЭКОНОМИИ ВРЕМЕНИ"))}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-medium text-[#12110E]">
                  {t(l("Évaluez le temps opérationnel récupérable chaque année", "Estimate operational hours recovered each year", "Đánh giá số giờ vận hành có thể tiết kiệm mỗi năm", "قدّر الساعات التشغيلية التي يمكن توفيرها سنوياً", "Оцените объём часов, освобождаемых за год"))}
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#52504A]">
                        {t(l("Heures répétitives ciblées / semaine / personne :", "Targeted repetitive hours / week / person:", "Số giờ lặp lại / tuần / người:", "الساعات المتكررة أسبوعياً لكل فرد:", "Рутинных часов / нед. на сотрудника:"))}
                      </span>
                      <strong className="font-mono text-[#12110E]">
                        {hoursSavedPerWeek} h / {t(l("sem", "wk", "tuần", "أسبوع", "нед"))}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={25}
                      value={hoursSavedPerWeek}
                      onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                      className="mt-2 w-full accent-[#12110E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#52504A]">
                        {t(l("Collaborateurs concernés :", "Team members equipped:", "Số nhân sự áp dụng:", "عدد أعضاء الفريق:", "Сотрудников в процессе:"))}
                      </span>
                      <strong className="font-mono text-[#12110E]">
                        {teamSize} {t(l("personnes", "people", "người", "أشخاص", "чел."))}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="mt-2 w-full accent-[#12110E]"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#E5E5E0] bg-[#FAF9F5] p-5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#52504A]">
                    {t(l("POTENTIEL ANNUEL ILLUSTRATIF (48 SEMAINES) :", "ILLUSTRATIVE ANNUAL POTENTIAL (48 WEEKS):", "TIỀM NĂNG HẰNG NĂM (48 TUẦN):", "الإمكانات السنوية التوضيحية (48 أسبوعاً):", "ОРИЕНТИРОВОЧНЫЙ ПОТЕНЦИАЛ (48 НЕД.):"))}
                  </span>
                  <p className="mt-1 font-serif text-4xl font-semibold text-[#12110E]">
                    {annualHoursSaved.toLocaleString("fr-FR")}{" "}
                    <span className="text-xl font-normal text-[#52504A]">
                      {t(l("heures / an", "hours / year", "giờ / năm", "ساعة / سنة", "часов / год"))}
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-[#52504A]">
                    {t(
                      l(
                        "Projection pédagogique indicative — le gain réel dépend de vos processus internes et du périmètre retenu après audit.",
                        "Indicative educational projection — actual gains depend on your workflows and agreed project scope.",
                        "Dự báo mang tính minh họa — hiệu quả thực tế phụ thuộc quy trình và phạm vi triển khai.",
                        "تقدير توضيحي — تعتمد المكاسب الفعلية على عملياتك الداخلية والنطاق المتفق عليه.",
                        "Ориентировочная модель — реальный эффект зависит от ваших процессов и объёма внедрения.",
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
