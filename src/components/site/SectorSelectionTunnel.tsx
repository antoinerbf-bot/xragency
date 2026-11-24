import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Hotel,
  ShoppingBag,
  Utensils,
  Home,
  BriefcaseBusiness,
} from "lucide-react";
import { useFunnel } from "@/lib/funnel";
import { useLang, type Lang } from "@/lib/i18n";

type SectorId = "restaurant" | "hospitality" | "realestate" | "commerce" | "beauty" | "other";

const SECTOR_CARDS: Array<{
  id: SectorId;
  image: string;
  icon: typeof Building2;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  focus: Record<Lang, string>;
  services: string[];
}> = [
  {
    id: "restaurant",
    image: "/showcase/sc-food.jpg",
    icon: Utensils,
    title: {
      fr: "Restauration & gastronomie",
      en: "Restaurants & food",
      vi: "Nhà hàng & ẩm thực",
      ar: "المطاعم وفنون الطهي",
      ru: "Рестораны и гастрономия",
    },
    description: {
      fr: "Restaurants, cafés, bars et concepts food.",
      en: "Restaurants, cafés, bars and food concepts.",
      vi: "Nhà hàng, quán cà phê, bar và mô hình ẩm thực.",
      ar: "مطاعم ومقاهٍ وحانات ومشاريع طعام.",
      ru: "Рестораны, кафе, бары и гастрономические проекты.",
    },
    focus: {
      fr: "Site & commande · Google Maps · Social Media",
      en: "Website & ordering · Google Maps · Social media",
      vi: "Website & đặt món · Google Maps · Mạng xã hội",
      ar: "الموقع والطلبات · خرائط Google · التواصل الاجتماعي",
      ru: "Сайт и заказы · Google Maps · Соцсети",
    },
    services: ["website", "maps", "social", "seo"],
  },
  {
    id: "hospitality",
    image: "/showcase/sc-hotel.jpg",
    icon: Hotel,
    title: {
      fr: "Hôtellerie & tourisme",
      en: "Hospitality & tourism",
      vi: "Khách sạn & du lịch",
      ar: "الضيافة والسياحة",
      ru: "Гостиничный бизнес и туризм",
    },
    description: {
      fr: "Hôtels, resorts, maisons d'hôtes, spas et destinations.",
      en: "Hotels, resorts, guesthouses, spas and destinations.",
      vi: "Khách sạn, resort, homestay, spa và điểm đến.",
      ar: "فنادق ومنتجعات وبيوت ضيافة ومنتجعات صحية ووجهات.",
      ru: "Отели, курорты, гостевые дома, спа и направления.",
    },
    focus: {
      fr: "Expérience web · Réservation · SEO international",
      en: "Web experience · Booking · International SEO",
      vi: "Trải nghiệm web · Đặt phòng · SEO quốc tế",
      ar: "تجربة الويب · الحجز · SEO دولي",
      ru: "Веб-опыт · Бронирование · Международное SEO",
    },
    services: ["website", "maps", "seo", "social"],
  },
  {
    id: "realestate",
    image: "/showcase/sc-immo.jpg",
    icon: Home,
    title: {
      fr: "Immobilier & architecture",
      en: "Real estate & architecture",
      vi: "Bất động sản & kiến trúc",
      ar: "العقارات والهندسة المعمارية",
      ru: "Недвижимость и архитектура",
    },
    description: {
      fr: "Agences, conciergeries, promoteurs et studios d'architecture.",
      en: "Agencies, property managers, developers and architecture studios.",
      vi: "Đại lý, đơn vị quản lý bất động sản, chủ đầu tư và studio kiến trúc.",
      ar: "وكالات وفرق إدارة العقارات ومطورون ومكاتب معمارية.",
      ru: "Агентства, управляющие недвижимостью, застройщики и архитектурные бюро.",
    },
    focus: {
      fr: "Image de marque · Présentation des biens · Acquisition",
      en: "Brand image · Property presentation · Acquisition",
      vi: "Hình ảnh thương hiệu · Giới thiệu bất động sản · Thu hút khách hàng",
      ar: "صورة العلامة · عرض العقارات · جذب العملاء",
      ru: "Образ бренда · Презентация объектов · Привлечение клиентов",
    },
    services: ["website", "branding", "seo", "maps"],
  },
  {
    id: "commerce",
    image: "/showcase/sc-luxe.jpg",
    icon: ShoppingBag,
    title: {
      fr: "Commerce & marques",
      en: "Retail & brands",
      vi: "Bán lẻ & thương hiệu",
      ar: "التجارة والعلامات التجارية",
      ru: "Розница и бренды",
    },
    description: {
      fr: "Boutiques, e-commerce, marques et entreprises de services.",
      en: "Retail, e-commerce, brands and service businesses.",
      vi: "Cửa hàng, thương mại điện tử, thương hiệu và doanh nghiệp dịch vụ.",
      ar: "متاجر وتجارة إلكترونية وعلامات تجارية وشركات خدمات.",
      ru: "Магазины, электронная коммерция, бренды и сервисные компании.",
    },
    focus: {
      fr: "Identité · Site marchand · Contenu & visibilité",
      en: "Identity · E-commerce · Content & visibility",
      vi: "Nhận diện · Thương mại điện tử · Nội dung & hiển thị",
      ar: "الهوية · التجارة الإلكترونية · المحتوى والظهور",
      ru: "Айдентика · Интернет-магазин · Контент и видимость",
    },
    services: ["website", "branding", "social", "seo"],
  },
  {
    id: "beauty",
    image: "/showcase/sc-luxe.jpg",
    icon: Building2,
    title: {
      fr: "Beauté & bien-être",
      en: "Beauty & wellness",
      vi: "Làm đẹp & chăm sóc sức khỏe",
      ar: "الجمال والعافية",
      ru: "Красота и wellness",
    },
    description: {
      fr: "Instituts, spas, studios et établissements de bien-être.",
      en: "Salons, spas, studios and wellness businesses.",
      vi: "Thẩm mỹ viện, spa, studio và cơ sở chăm sóc sức khỏe.",
      ar: "صالونات وسبا واستوديوهات ومراكز العافية.",
      ru: "Салоны, спа, студии и wellness-компании.",
    },
    focus: {
      fr: "Univers visuel · Réservation · Présence locale",
      en: "Visual identity · Booking · Local presence",
      vi: "Hình ảnh · Đặt lịch · Hiện diện địa phương",
      ar: "الهوية البصرية · الحجز · الحضور المحلي",
      ru: "Визуальный образ · Запись · Локальное присутствие",
    },
    services: ["website", "maps", "social", "branding"],
  },
  {
    id: "other",
    image: "/showcase/sc-luxe.jpg",
    icon: BriefcaseBusiness,
    title: {
      fr: "Services & entreprises",
      en: "Services & businesses",
      vi: "Dịch vụ & doanh nghiệp",
      ar: "الخدمات والشركات",
      ru: "Услуги и компании",
    },
    description: {
      fr: "Cabinets, indépendants, PME et activités spécialisées.",
      en: "Professional firms, independents, SMEs and specialist businesses.",
      vi: "Văn phòng chuyên môn, cá nhân kinh doanh, SME và ngành nghề đặc thù.",
      ar: "مكاتب مهنية ومستقلون وشركات صغيرة ومتوسطة وأنشطة متخصصة.",
      ru: "Профессиональные бюро, независимые специалисты, МСП и нишевые компании.",
    },
    focus: {
      fr: "Positionnement · Site · SEO & outils métier",
      en: "Positioning · Website · SEO & business tools",
      vi: "Định vị · Website · SEO & công cụ kinh doanh",
      ar: "التموضع · الموقع · SEO وأدوات الأعمال",
      ru: "Позиционирование · Сайт · SEO и бизнес-инструменты",
    },
    services: ["website", "branding", "seo", "maintenance"],
  },
];

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    step: string;
    select: string;
    selected: string;
    next: string;
    hint: string;
  }
> = {
  fr: {
    eyebrow: "VOTRE PROJET · 01 / 03",
    title: "Votre activité,",
    accent: "notre point de départ.",
    intro:
      "Choisissez votre secteur. Le configurateur adaptera ensuite les questions et les pistes de prestations à votre contexte.",
    step: "Étape 1 sur 3",
    select: "Sélectionner ce secteur",
    selected: "Secteur sélectionné",
    next: "Continuer vers mon diagnostic",
    hint: "Les recommandations restent indicatives : le périmètre final est défini avec vous.",
  },
  en: {
    eyebrow: "YOUR PROJECT · 01 / 03",
    title: "Your business,",
    accent: "where we begin.",
    intro:
      "Choose your industry. The configurator will adapt its questions and service suggestions to your context.",
    step: "Step 1 of 3",
    select: "Select this industry",
    selected: "Selected industry",
    next: "Continue to my brief",
    hint: "Recommendations are indicative; the final scope is agreed with you.",
  },
  vi: {
    eyebrow: "DỰ ÁN CỦA BẠN · 01 / 03",
    title: "Lĩnh vực của bạn,",
    accent: "điểm khởi đầu.",
    intro:
      "Chọn lĩnh vực hoạt động. Công cụ sẽ điều chỉnh câu hỏi và gợi ý dịch vụ theo bối cảnh của bạn.",
    step: "Bước 1 trên 3",
    select: "Chọn lĩnh vực này",
    selected: "Lĩnh vực đã chọn",
    next: "Tiếp tục chẩn đoán",
    hint: "Đề xuất chỉ mang tính tham khảo; phạm vi cuối cùng sẽ được thống nhất cùng bạn.",
  },
  ar: {
    eyebrow: "مشروعك · 01 / 03",
    title: "نشاطك التجاري،",
    accent: "نقطة انطلاقنا.",
    intro: "اختر مجال نشاطك. سيكيّف configurator الأسئلة واقتراحات الخدمات وفق احتياجاتك.",
    step: "الخطوة 1 من 3",
    select: "اختر هذا المجال",
    selected: "المجال المحدد",
    next: "تابع إلى التشخيص",
    hint: "الاقتراحات استرشادية؛ ويتم الاتفاق معك على النطاق النهائي.",
  },
  ru: {
    eyebrow: "ВАШ ПРОЕКТ · 01 / 03",
    title: "Ваш бизнес,",
    accent: "точка нашего старта.",
    intro:
      "Выберите сферу деятельности. Конфигуратор адаптирует вопросы и предложения услуг под ваш контекст.",
    step: "Шаг 1 из 3",
    select: "Выбрать эту сферу",
    selected: "Выбранная сфера",
    next: "Перейти к брифу",
    hint: "Рекомендации ориентировочные; окончательный объём согласуется с вами.",
  },
};

export function SectorSelectionTunnel() {
  const { lang } = useLang();
  const { sector, setSector, setGoal, setServices, scrollToSection } = useFunnel();
  const [selectedSector, setSelectedSector] = useState<SectorId>(
    (SECTOR_CARDS.some((item) => item.id === sector) ? sector : "restaurant") as SectorId,
  );
  const copy = COPY[lang] ?? COPY.fr;
  const active = SECTOR_CARDS.find((item) => item.id === selectedSector) ?? SECTOR_CARDS[0];

  const chooseSector = (id: SectorId) => {
    setSelectedSector(id);
    setSector(id);
    setGoal("");
    const card = SECTOR_CARDS.find((item) => item.id === id);
    if (card) setServices(card.services);
  };

  const continueToBrief = () => {
    chooseSector(selectedSector);
    scrollToSection("quote");
  };

  return (
    <section
      id="tunnel-secteurs"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative overflow-hidden border-y border-[#292720]/12 bg-[#F7F4EE] py-20 text-[#211F1A] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#292720]/15 pb-5">
          <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#806747]">
            {copy.eyebrow}
          </p>
          <span className="text-[10px] text-[#827B70]">{copy.step}</span>
        </div>
        <div className="grid gap-8 pt-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="max-w-xl text-[clamp(2.4rem,5vw,4.8rem)] font-medium leading-[.96] tracking-[-.055em]">
              {copy.title}{" "}
              <span className="font-serif italic font-normal text-[#A88A65]">{copy.accent}</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#625E56] sm:text-base">
              {copy.intro}
            </p>
            <div className="mt-8 overflow-hidden border border-[#292720]/15 bg-[#EEE9E0]">
              <div className="relative h-44 overflow-hidden sm:h-56">
                <img
                  src={active.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171613]/65 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#E7C99F]">
                    {copy.selected}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl">{active.title[lang]}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-[#625E56]">{active.description[lang]}</p>
                <p className="mt-4 border-t border-[#292720]/12 pt-3 text-[10px] font-semibold uppercase leading-5 tracking-[.1em] text-[#806747]">
                  {active.focus[lang]}
                </p>
                <p className="mt-4 text-[10px] leading-5 text-[#827B70]">{copy.hint}</p>
                <button
                  type="button"
                  onClick={continueToBrief}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-3 bg-[#211F1A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-[#806747] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A88A65]"
                >
                  {copy.next}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SECTOR_CARDS.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedSector === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => chooseSector(item.id)}
                  className={`group flex min-h-[190px] flex-col justify-between border p-5 text-left transition duration-300 sm:p-6 ${isSelected ? "border-[#A88A65] bg-[#EEE9E0] shadow-[0_14px_35px_rgba(42,37,28,.08)]" : "border-[#292720]/15 bg-white/55 hover:border-[#A88A65]/70 hover:bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#9A805E]">
                      0{index + 1}
                    </span>
                    <Icon className="h-5 w-5 text-[#9A805E]" />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-serif text-xl leading-tight tracking-[-.02em]">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#625E56]">
                      {item.description[lang]}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-[#292720]/12 pt-3 text-[9px] font-semibold uppercase tracking-[.12em] text-[#806747]">
                      <span>{isSelected ? copy.selected : copy.select}</span>
                      {isSelected ? (
                        <span className="h-2 w-2 rounded-full bg-[#A88A65]" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
