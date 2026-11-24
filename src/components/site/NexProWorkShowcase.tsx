import { useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
const scLuxe = "/showcase/sc-luxe.jpg";
const scHotel = "/showcase/sc-hotel.jpg";
const scImmo = "/showcase/sc-immo.jpg";
const scFood = "/showcase/sc-food.jpg";

type Category = "hotel" | "food" | "immo" | "commerce";

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
    id: "hotel-danang",
    category: "hotel",
    isRealClient: false,
    image: scHotel,
    title: {
      fr: "Hôtel & Resort – Da Nang",
      en: "Hotel & Resort – Da Nang",
      vi: "Hotel & Resort – Đà Nẵng",
      ar: "فندق ومنتجع – دا نانغ",
      ru: "Отель и курорт – Дананг",
    },
    deliverables: {
      fr: "Site web · SEO · Google Maps",
      en: "Website · SEO · Google Maps",
      vi: "Website · SEO · Google Maps",
      ar: "الموقع · تحسين محركات البحث · خرائط Google",
      ru: "Сайт · SEO · Google Maps",
    },
    badge: {
      fr: "Hôtellerie",
      en: "Hospitality",
      vi: "Khách sạn",
      ar: "فنادق",
      ru: "Отели",
    },
  },
  {
    id: "poke-n-ball",
    category: "food",
    isRealClient: true,
    image: scFood,
    url: "https://pokebowlfresh.vercel.app/",
    title: {
      fr: "Pok-N Ball Paris – Projet Réel",
      en: "Pok-N Ball Paris – Real Project",
      vi: "Pok-N Ball Paris – Dự án thực tế",
      ar: "Pok-N Ball Paris – مشروع حقيقي",
      ru: "Pok-N Ball Paris – Реальный проект",
    },
    deliverables: {
      fr: "Site web · Click & Collect · Caisse POS · Mobile First",
      en: "Website · Click & Collect · POS Cashier · Mobile First",
      vi: "Website · Đặt món online · POS · Mobile First",
      ar: "الموقع · الطلب والاستلام · كاشير POS · للجوال أولاً",
      ru: "Сайт · Онлайн-заказ · POS-касса · Mobile First",
    },
    badge: {
      fr: "★ Client Réel XR",
      en: "★ Real XR Client",
      vi: "★ Khách hàng thực tế",
      ar: "★ عميل حقيقي",
      ru: "★ Реальный клиент",
    },
  },
  {
    id: "immo-marbella",
    category: "immo",
    isRealClient: false,
    image: scImmo,
    title: {
      fr: "Agence Immobilière – Marbella",
      en: "Real Estate Agency – Marbella",
      vi: "Bất động sản – Marbella",
      ar: "وكالة عقارات – ماربيا",
      ru: "Агентство недвижимости – Марбелья",
    },
    deliverables: {
      fr: "Site web · Visibilité locale · SEO",
      en: "Website · Local SEO · Google Visibility",
      vi: "Website · SEO địa phương · Hiển thị Google",
      ar: "الموقع · الظهور المحلي · سيو",
      ru: "Сайт · Локальный SEO · Видимость",
    },
    badge: {
      fr: "Immobilier",
      en: "Real Estate",
      vi: "Bất động sản",
      ar: "عقارات",
      ru: "Недвижимость",
    },
  },
  {
    id: "boutique-paris",
    category: "commerce",
    isRealClient: false,
    image: scLuxe,
    title: {
      fr: "Maison & Boutique – Paris",
      en: "House & Boutique – Paris",
      vi: "Thương hiệu & Cửa hàng – Paris",
      ar: "دار أزياء ومتجر – باريس",
      ru: "Бутик и бренд – Париж",
    },
    deliverables: {
      fr: "Branding · Social Media · Site web",
      en: "Branding · Social Media · Website",
      vi: "Thương hiệu · Mạng xã hội · Website",
      ar: "الهوية · التواصل الاجتماعي · الموقع",
      ru: "Брендинг · Соцсети · Сайт",
    },
    badge: {
      fr: "Commerce & Luxe",
      en: "Commerce & Luxury",
      vi: "Thương mại & Cao cấp",
      ar: "التجارة والرفاهية",
      ru: "Ритейл и люкс",
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
      all: "Tous",
      hotel: "Hôtellerie",
      food: "Restauration",
      immo: "Immobilier",
      commerce: "Commerce",
    },
  },
  en: {
    eyebrow: "OUR WORK",
    heading: "Verified work & studio explorations.",
    conceptLabel: "Studio concept",
    allBtn: "View all projects",
    filters: {
      all: "All",
      hotel: "Hospitality",
      food: "Restaurants",
      immo: "Real Estate",
      commerce: "Commerce",
    },
  },
  vi: {
    eyebrow: "DỰ ÁN CỦA CHÚNG TÔI",
    heading: "Dự án thực tế & ý tưởng sáng tạo.",
    conceptLabel: "Ý tưởng studio",
    allBtn: "Xem tất cả dự án",
    filters: {
      all: "Tất cả",
      hotel: "Khách sạn",
      food: "Nhà hàng",
      immo: "Bất động sản",
      commerce: "Thương mại",
    },
  },
  ar: {
    eyebrow: "مشاريعنا",
    heading: "أعمال موثقة واستكشافات الاستوديو.",
    conceptLabel: "تصور إبداعي",
    allBtn: "عرض كل الأعمال",
    filters: {
      all: "الكل",
      hotel: "الفنادق",
      food: "المطاعم",
      immo: "العقارات",
      commerce: "التجارة",
    },
  },
  ru: {
    eyebrow: "НАШИ ПРОЕКТЫ",
    heading: "Подтверждённые проекты и студийные концепции.",
    conceptLabel: "Концепция студии",
    allBtn: "Смотреть все проекты",
    filters: {
      all: "Все",
      hotel: "Отели",
      food: "Рестораны",
      immo: "Недвижимость",
      commerce: "Ритейл",
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
            {(["all", "hotel", "food", "immo", "commerce"] as const).map((key) => {
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
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
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
