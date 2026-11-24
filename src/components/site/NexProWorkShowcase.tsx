import { useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
import pf01MaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import pf02VillaAzur from "@/assets/pf-02-villa-azur.jpg";
import pf04CabinetMercier from "@/assets/pf-04-cabinet-mercier.jpg";
import pf05ElanStudio from "@/assets/pf-05-elan-studio.jpg";
import pf06ZenRetreat from "@/assets/pf-06-zen-retreat.jpg";

type Category = "real" | "food" | "immo" | "hotel" | "corporate";

interface WorkItem {
  id: string;
  category: Category;
  isRealClient: boolean;
  image: string;
  url?: string;
  title: Record<Lang, string>;
  deliverables: Record<Lang, string>;
  badge: Record<Lang, string>;
}

const WORKS: WorkItem[] = [
  {
    id: "poke-n-ball",
    category: "food",
    isRealClient: true,
    image: "/showcase/audit_app_04_poke_case.png",
    url: "https://pokenball.be",
    title: {
      fr: "Pok-N Ball (pokenball.be) – Belgique",
      en: "Pok-N Ball (pokenball.be) – Belgium",
      vi: "Pok-N Ball (pokenball.be) – Bỉ",
      ar: "Pok-N Ball (pokenball.be) – بلجيكا",
      ru: "Pok-N Ball (pokenball.be) – Бельгия",
    },
    deliverables: {
      fr: "Application web Click & Collect · Caisse POS · 0% commission plateformes",
      en: "Click & Collect Web App · POS Checkout · 0% third-party commission",
      vi: "Ứng dụng web đặt món · Hệ thống POS · 0% hoa hồng nền tảng",
      ar: "تطبيق ويب للطلب والاستلام · نقطة بيع POS · صفر عمولة للمنصات",
      ru: "Веб-приложение онлайн-заказа · POS-касса · 0% комиссий агрегаторов",
    },
    badge: {
      fr: "★ Client Réel XR (Belgique)",
      en: "★ Real XR Client (Belgium)",
      vi: "★ Khách hàng thực tế (Bỉ)",
      ar: "★ عميل حقيقي (بلجيكا)",
      ru: "★ Реальный клиент (Бельгия)",
    },
  },
  {
    id: "maison-lumiere",
    category: "food",
    isRealClient: false,
    image: pf01MaisonLumiere,
    title: {
      fr: "Maison Lumière – Haute Gastronomie (Paris)",
      en: "Maison Lumière – Haute Cuisine (Paris)",
      vi: "Maison Lumière – Ẩm thực cao cấp (Paris)",
      ar: "Maison Lumière – فنون الطهي الراقية (باريس)",
      ru: "Maison Lumière – Высокая гастрономия (Париж)",
    },
    deliverables: {
      fr: "Direction artistique · Réservation directe sans intermédiaire · Expérience immersive mobile",
      en: "Art direction · Direct booking without intermediaries · Mobile immersive experience",
      vi: "Định hướng nghệ thuật · Đặt bàn trực tiếp · Trải nghiệm di động",
      ar: "إدارة فنية · حجز مباشر بدون وسطاء · تجربة تفاعلية للجوال",
      ru: "Арт-дирекшн · Прямое бронирование без посредников · Мобильный опыт",
    },
    badge: {
      fr: "Haute Gastronomie",
      en: "Fine Dining",
      vi: "Ẩm thực cao cấp",
      ar: "مطاعم فاخرة",
      ru: "Высокая кухня",
    },
  },
  {
    id: "villa-azur",
    category: "immo",
    isRealClient: false,
    image: pf02VillaAzur,
    title: {
      fr: "Domaine & Villa Azur – Immobilier d'Exception (Côte d'Azur)",
      en: "Domaine & Villa Azur – Luxury Real Estate (French Riviera)",
      vi: "Domaine & Villa Azur – Bất động sản cao cấp (Côte d'Azur)",
      ar: "Domaine & Villa Azur – عقارات استثنائية (الريفييرا الفرنسية)",
      ru: "Domaine & Villa Azur – Элитная недвижимость (Лазурный берег)",
    },
    deliverables: {
      fr: "Vitrine cinématique plein écran · Présentation de mandats exclusifs · SEO de prestige",
      en: "Cinematic full-screen showcase · Exclusive listing presentation · Prestige SEO",
      vi: "Trình diễn toàn màn hình · Danh mục độc quyền · SEO thương hiệu cao cấp",
      ar: "عرض سينمائي بكامل الشاشة · تقديم عقود حصرية · سيو فائق الجودة",
      ru: "Полноэкранная кинематографичная витрина · Эксклюзивные объекты · Премиум SEO",
    },
    badge: {
      fr: "Immobilier de Prestige",
      en: "Prestige Real Estate",
      vi: "Bất động sản VIP",
      ar: "عقارات فاخرة",
      ru: "Элитная недвижимость",
    },
  },
  {
    id: "zen-retreat",
    category: "hotel",
    isRealClient: false,
    image: pf06ZenRetreat,
    title: {
      fr: "Zen Retreat & Alpine Spa – Hôtellerie 5 Étoiles (Genève)",
      en: "Zen Retreat & Alpine Spa – 5-Star Hospitality (Geneva)",
      vi: "Zen Retreat & Alpine Spa – Khách sạn 5 sao (Geneva)",
      ar: "Zen Retreat & Alpine Spa – ضيافة 5 نجوم (جنيف)",
      ru: "Zen Retreat & Alpine Spa – Отель 5 звёзд (Женева)",
    },
    deliverables: {
      fr: "Moteur de réservation directe (0% OTA) · Direction photo · SEO multi-langues",
      en: "Direct booking engine (0% OTA) · Photography direction · Multi-language SEO",
      vi: "Hệ thống đặt phòng trực tiếp (0% OTA) · Định hướng hình ảnh · SEO đa ngôn ngữ",
      ar: "محرك حجز مباشر (0% عمولة منصات) · توجيه تصوير · سيو متعدد اللغات",
      ru: "Модуль прямых бронирований (0% OTA) · Фото-дирекшн · Мультиязычное SEO",
    },
    badge: {
      fr: "Hôtellerie 5 Étoiles",
      en: "5-Star Hospitality",
      vi: "Khách sạn 5 sao",
      ar: "فنادق 5 نجوم",
      ru: "Отели 5 звёзд",
    },
  },
  {
    id: "cabinet-mercier",
    category: "corporate",
    isRealClient: false,
    image: pf04CabinetMercier,
    title: {
      fr: "Cabinet Mercier & Associés – Droit des Affaires (Paris / Genève)",
      en: "Mercier & Partners – Business & M&A Law (Paris / Geneva)",
      vi: "Văn phòng Luật Mercier – Luật kinh doanh (Paris / Geneva)",
      ar: "مكتب ميرسييه وشركاه – قانون الأعمال والصفقات (باريس / جنيف)",
      ru: "Cabinet Mercier & Associés – Корпоративное право (Париж / Женева)",
    },
    deliverables: {
      fr: "Plateforme institutionnelle d'autorité · Espace client sécurisé · SEO concurrentiel",
      en: "High-authority corporate portal · Secure client portal · Competitive legal SEO",
      vi: "Cổng thông tin pháp lý uy tín · Khu vực khách hàng bảo mật · SEO cạnh tranh",
      ar: "منصة مؤسسية ذات موثوقية عالية · بوابة عملاء آمنة · سيو قانوني تنافسي",
      ru: "Корпоративный портал высокого доверия · Защищённый кабинет клиента · Конкурентное SEO",
    },
    badge: {
      fr: "Droit & Conseil Privé",
      en: "Law & Private Advisory",
      vi: "Luật & Tư vấn VIP",
      ar: "قانون واستشارات خاصة",
      ru: "Право и консалтинг",
    },
  },
  {
    id: "elan-studio",
    category: "corporate",
    isRealClient: false,
    image: pf05ElanStudio,
    title: {
      fr: "Élan Studio – Architecture d'Intérieur (Dubaï / Milan)",
      en: "Élan Studio – Interior Architecture & Design (Dubai / Milan)",
      vi: "Élan Studio – Kiến trúc nội thất (Dubai / Milan)",
      ar: "Élan Studio – الهندسة المعمارية الداخلية (دبي / ميلانو)",
      ru: "Élan Studio – Архитектура интерьеров (Дубай / Милан)",
    },
    deliverables: {
      fr: "Portfolio architectural haute résolution · Brand Book digital · Stratégie Social Media",
      en: "High-res architectural portfolio · Digital Brand Book · Social Media strategy",
      vi: "Danh mục kiến trúc phân giải cao · Brand Book số · Chiến lược Social Media",
      ar: "ملف أعمال هندسي عالي الدقة · كتاب العلامة الرقمي · استراتيجية التواصل",
      ru: "Архитектурное портфолио высокого разрешения · Brand Book · Стратегия соцсетей",
    },
    badge: {
      fr: "Architecture & Design",
      en: "Architecture & Design",
      vi: "Kiến trúc & Thiết kế",
      ar: "هندسة وتصميم",
      ru: "Архитектура и дизайн",
    },
  },
];

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    allBtn: string;
    conceptLabel: string;
    filters: Record<"all" | Category, string>;
  }
> = {
  fr: {
    eyebrow: "NOS RÉALISATIONS",
    heading: "Projets réels & explorations de studio.",
    conceptLabel: "Étude conceptuelle",
    allBtn: "Voir toutes les réalisations",
    filters: {
      all: "Tous les projets",
      real: "Clients Réels",
      food: "Gastronomie & Food",
      hotel: "Hôtellerie & Luxe",
      immo: "Immobilier de Prestige",
      corporate: "Conseil & Architecture",
    },
  },
  en: {
    eyebrow: "OUR WORK",
    heading: "Verified work & studio explorations.",
    conceptLabel: "Studio concept",
    allBtn: "View all projects",
    filters: {
      all: "All Projects",
      real: "Real Clients",
      food: "Dining & Food",
      hotel: "Hospitality & Luxury",
      immo: "Prestige Real Estate",
      corporate: "Advisory & Design",
    },
  },
  vi: {
    eyebrow: "DỰ ÁN CỦA CHÚNG TÔI",
    heading: "Dự án thực tế & ý tưởng sáng tạo.",
    conceptLabel: "Ý tưởng studio",
    allBtn: "Xem tất cả dự án",
    filters: {
      all: "Tất cả dự án",
      real: "Khách hàng thực tế",
      food: "Nhà hàng & Ẩm thực",
      hotel: "Khách sạn & Nghỉ dưỡng",
      immo: "Bất động sản VIP",
      corporate: "Tư vấn & Kiến trúc",
    },
  },
  ar: {
    eyebrow: "مشاريعنا",
    heading: "أعمال موثقة واستكشافات الاستوديو.",
    conceptLabel: "تصور إبداعي",
    allBtn: "عرض كل الأعمال",
    filters: {
      all: "جميع المشاريع",
      real: "عملاء حقيقيون",
      food: "المطاعم والضيافة",
      hotel: "الفنادق والرفاهية",
      immo: "العقارات الفاخرة",
      corporate: "الاستشارات والتصميم",
    },
  },
  ru: {
    eyebrow: "НАШИ ПРОЕКТЫ",
    heading: "Подтверждённые проекты и студийные концепции.",
    conceptLabel: "Концепция студии",
    allBtn: "Смотреть все проекты",
    filters: {
      all: "Все проекты",
      real: "Реальные клиенты",
      food: "Рестораны и гастрономия",
      hotel: "Отели и роскошь",
      immo: "Элитная недвижимость",
      corporate: "Консалтинг и дизайн",
    },
  },
};

export function NexProWorkShowcase() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filtered = filter === "all" ? WORKS : WORKS.filter((item) => item.category === filter);

  return (
    <section
      id="realisations"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="border-b border-[#EBE5DC] bg-white py-20 text-[#1A1815]"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-10">
        {/* Header + Filter Pills */}
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A67C40]">
            {c.eyebrow}
          </p>
          <h2 className="mt-2.5 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] font-normal tracking-[-0.02em] text-[#1A1815]">
            {c.heading}
          </h2>

          {/* Filter Pills */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {(["all", "real", "food", "hotel", "immo", "corporate"] as const).map((key) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200",
                    active
                      ? "bg-[#1A1815] text-white shadow-sm"
                      : "border border-[#EBE5DC] bg-[#FAF8F5] text-[#5C554B] hover:border-[#1A1815] hover:text-[#1A1815]",
                  )}
                >
                  {c.filters[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photographic Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const cardBody = (
              <div className="group relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[#EBE5DC] bg-[#120F0C] shadow-lg transition duration-500 hover:border-[#D1B07A] hover:shadow-[0_15px_40px_rgba(166,124,64,0.18)]">
                <img
                  src={item.image}
                  alt={item.title[lang]}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Top pill badge */}
                <div className="absolute left-3.5 top-3.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
                      item.isRealClient
                        ? "border border-[#E5C696] bg-[#1A1815]/95 text-[#E5C696] shadow-md"
                        : "border border-white/20 bg-black/60 text-white/90",
                    )}
                  >
                    {item.isRealClient
                      ? item.badge[lang]
                      : `${c.conceptLabel} · ${item.badge[lang]}`}
                  </span>
                </div>

                {/* Bottom title + deliverables + round arrow button */}
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-medium leading-snug text-white">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#E5C696]">{item.deliverables[lang]}</p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition group-hover:border-[#E5C696] group-hover:bg-[#E5C696] group-hover:text-[#17130E]">
                    {item.url ? (
                      <ExternalLink className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    )}
                  </span>
                </div>
              </div>
            );

            return item.url ? (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="block">
                {cardBody}
              </a>
            ) : (
              <Link key={item.id} to="/work" className="block">
                {cardBody}
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1A1815]/20 bg-[#FAF8F5] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white shadow-sm"
          >
            <span>{c.allBtn}</span>
            <ArrowUpRight className="h-4 w-4 text-[#A67C40] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
