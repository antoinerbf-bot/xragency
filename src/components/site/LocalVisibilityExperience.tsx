import { useMemo, useState } from "react";
import { Check, ChevronRight, MapPin, Search, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PLANS = [
  {
    key: "maps_growth",
    price: 99,
    period: "/ mois",
    title: { fr: "Gestion & Croissance Locale", en: "Local Management & Growth", vi: "Quản Lý & Tăng Trưởng Địa Phương", ar: "إدارة ونمو محلي", ru: "Ведение и локальный рост" },
    desc: {
      fr: "Gestion continue, optimisation Google Business Profile, 4 posts SEO/mois et modération des avis.",
      en: "Ongoing management, Google Business Profile optimization, 4 SEO posts/mo and review moderation.",
      vi: "Quản lý liên tục, tối ưu Google Business Profile, 4 bài đăng SEO/tháng và xử lý đánh giá.",
      ar: "إدارة مستمرة، تحسين ملف Google Business Profile، 4 منشورات شهرية ومتابعة التقييمات.",
      ru: "Регулярное ведение, оптимизация Google Business Profile, 4 SEO-поста в месяц и модерация отзывов.",
    },
    features: {
      fr: ["Audit initial & optimisation complète", "4 Google Posts mensuels SEO (visuels HD)", "Modération & réponses sous 24h aux avis", "Système d'invitation d'avis 5 étoiles"],
      en: ["Initial audit & full optimization", "4 monthly SEO Google Posts (HD visuals)", "24h moderation & replies to reviews", "5-star customer review invite system"],
      vi: ["Kiểm toán ban đầu & tối ưu toàn diện", "4 bài đăng Google Posts chuẩn SEO/tháng", "Kiểm duyệt & trả lời đánh giá trong 24h", "Hệ thống mời đánh giá 5 sao từ khách"],
      ar: ["تدقيق أولي وتحسين شامل", "4 منشورات شهرية محسنة (صور عالية الدقة)", "متابعة وردود خلال 24 ساعة", "نظام دعوة العملاء لتقييم 5 نجوم"],
      ru: ["Первичный аудит и полная оптимизация", "4 ежемесячных SEO-поста (HD-фото)", "Модерация и ответы на отзывы за 24ч", "Система сбора 5-звёздочных отзывов"],
    },
  },
  {
    key: "maps_domination",
    price: 159,
    period: "/ mois",
    popular: true,
    title: { fr: "Domination Top 3 & Acquisition", en: "Top 3 Domination & Growth", vi: "Thống Lĩnh Top 3 & Bứt Phá", ar: "تصدر Top 3 والاستحواذ السريع", ru: "Топ-3 Доминирование и Захват" },
    desc: {
      fr: "Machine d'acquisition agressive : engagement Top 3 garanti, 8 posts SEO, géotagging EXIF, +40 annuaires et plaque NFC offerte.",
      en: "Aggressive acquisition engine: guaranteed Top 3 commitment, 8 SEO posts, EXIF geotagging, 40+ directories and free NFC plaque.",
      vi: "Cỗ máy tăng trưởng mạnh mẽ: cam kết Top 3, 8 bài đăng SEO, geotag EXIF, 40+ danh bạ uy tín và tặng bảng NFC để bàn.",
      ar: "محرك الاستحواذ القوي: التزام المركز الأول، 8 منشورات، تحديد جغرافي للصور، أكثر من 40 دليلاً ولوحة NFC مجانية.",
      ru: "Агрессивный инструмент роста: гарантия Топ-3, 8 SEO-постов, EXIF геопривязка, 40+ каталогов и стойка NFC в подарок.",
    },
    features: {
      fr: ["Tout le pack Gestion 99 €/m inclus", "Engagement contractuel Top 3 Pack Local", "Geotagging EXIF sur toutes les photos", "Diffusion sur +40 annuaires d'autorité", "Plaque NFC / QR Code comptoir offerte"],
      en: ["Everything in €99/mo plan included", "Contractual Top 3 Local Pack commitment", "EXIF Geotagging on all photos", "Syndication across 40+ directories", "Complimentary custom NFC/QR plaque"],
      vi: ["Bao gồm tất cả quyền lợi gói 99 €/tháng", "Cam kết hợp đồng Top 3 Local Pack", "Gắn thẻ Geotag EXIF cho toàn bộ ảnh", "Phủ sóng trên 40+ danh bạ uy tín", "Tặng bảng để bàn quét NFC/QR cao cấp"],
      ar: ["شامل جميع ميزات باقة 99 €/شهر", "التزام تعاقدي بالوصول لأفضل 3 نتائج", "تحديد جغرافي لجميع الصور المرفوعة", "نشر في أكثر من 40 دليلاً موثوقاً", "لوحة مكتب ذكية NFC/QR مجانية"],
      ru: ["Всё из тарифа 99 €/мес включено", "Договорная гарантия выхода в Топ-3", "EXIF геопривязка всех загружаемых фото", "Публикация в 40+ авторитетных базах", "Фирменная стойка NFC/QR в подарок"],
    },
  },
];

const COPY = {
  fr: {
    kicker: "Google Maps · Visibilité locale",
    title: "Comprenez Google visuellement.",
    intro: "Découvrez ce que Google regarde, ce que XRAGENCY travaille et pourquoi l’optimisation locale va bien au-delà d’une simple modification de fiche.",
    query: "restaurant français à Da Nang",
    maps: "Google Maps", organic: "SEO", ads: "Google Ads",
    mapsDesc: "Être visible lorsqu’un client cherche une entreprise près de lui.",
    organicDesc: "Être visible dans les résultats naturels pour vos services et vos sujets.",
    adsDesc: "Acheter de la visibilité publicitaire immédiate. Non proposé par XRAGENCY.",
    why: "Pourquoi Google vous place ici ?",
    factors: [["Pertinence", "Votre fiche doit correspondre à la recherche."], ["Distance", "Google tient compte de la proximité avec la recherche locale."], ["Prominence", "Réputation, notoriété et signaux publics comptent."], ["Qualité du profil", "Catégories, services, informations, photos et activité doivent être cohérents."]],
    work: "Ce que XRAGENCY travaille",
    bridge: "Maps et SEO ne font pas la même chose.",
    bridgeDesc: "Maps travaille votre présence locale. Le SEO travaille votre visibilité dans les résultats organiques. Les deux peuvent se renforcer.",
    pricing: "Dès 99 € / mois · Formule Domination Top 3 à 159 € / mois",
    pricingDesc: "Gestion et optimisation continue dès 99 € / mois, ou pack agressif de conquête Top 3 à 159 € / mois avec garantie contractuelle de résultats et plaque NFC de comptoir offerte.",
    cta: "Recevoir mon analyse locale",
  },
  en: {
    kicker: "Google Maps · Local visibility",
    title: "Understand Google visually.",
    intro: "See what Google looks at, what XRAGENCY works on and why local optimisation is more than editing a business profile.",
    query: "French restaurant in Da Nang",
    maps: "Google Maps", organic: "SEO", ads: "Google Ads",
    mapsDesc: "Be visible when a customer searches for a business nearby.",
    organicDesc: "Be visible in organic results for your services and topics.",
    adsDesc: "Buy immediate paid visibility. Not offered by XRAGENCY.",
    why: "Why does Google place you here?",
    factors: [["Relevance", "Your profile needs to match the local search."], ["Distance", "Google considers proximity for local searches."], ["Prominence", "Reputation, awareness and public signals matter."], ["Profile quality", "Categories, services, information, photos and activity should be consistent."]],
    work: "What XRAGENCY works on",
    bridge: "Maps and SEO do different jobs.",
    bridgeDesc: "Maps works on local presence. SEO works on organic search visibility. The two can reinforce each other.",
    pricing: "From €99 / mo · Top 3 Domination plan at €159 / mo",
    pricingDesc: "Ongoing management and profile optimization from €99/mo, or aggressive Top 3 Domination package at €159/mo with contractual guarantee and complimentary custom NFC desk plaque.",
    cta: "Get my local analysis",
  },
  vi: {
    kicker: "Google Maps · Hiển thị địa phương",
    title: "Hiểu Google bằng hình ảnh.",
    intro: "Xem Google đánh giá điều gì, XRAGENCY làm gì và vì sao tối ưu địa phương không chỉ là chỉnh sửa hồ sơ doanh nghiệp.",
    query: "nhà hàng Pháp tại Đà Nẵng",
    maps: "Google Maps", organic: "SEO", ads: "Google Ads",
    mapsDesc: "Xuất hiện khi khách hàng tìm doanh nghiệp gần họ.",
    organicDesc: "Xuất hiện trong kết quả tự nhiên cho dịch vụ và chủ đề của bạn.",
    adsDesc: "Mua khả năng hiển thị trả phí ngay lập tức. XRAGENCY không cung cấp dịch vụ này.",
    why: "Vì sao Google đặt bạn ở đây?",
    factors: [["Mức độ liên quan", "Hồ sơ phải phù hợp với tìm kiếm địa phương."], ["Khoảng cách", "Google xem xét khoảng cách trong tìm kiếm địa phương."], ["Độ nổi bật", "Uy tín, nhận diện và tín hiệu công khai đều quan trọng."], ["Chất lượng hồ sơ", "Danh mục, dịch vụ, thông tin, hình ảnh và hoạt động cần nhất quán."]],
    work: "XRAGENCY làm gì",
    bridge: "Maps và SEO làm hai nhiệm vụ khác nhau.",
    bridgeDesc: "Maps tập trung vào hiện diện địa phương. SEO tập trung vào khả năng hiển thị tự nhiên. Hai dịch vụ có thể hỗ trợ lẫn nhau.",
    pricing: "Từ 99 € / tháng · Thống lĩnh Top 3 chỉ 159 € / tháng",
    pricingDesc: "Quản lý và tối ưu hồ sơ liên tục từ 99 €/tháng hoặc gói tấn công Top 3 159 €/tháng với cam kết hợp đồng và tặng bảng quét NFC để bàn.",
    cta: "Nhận phân tích địa phương",
  },
  ar: {
    kicker: "Google Maps · الظهور المحلي",
    title: "افهم Google بصريًا.",
    intro: "تعرّف على ما يراجعه Google، وما تعمل عليه XRAGENCY، ولماذا يتجاوز تحسين الظهور المحلي مجرد تعديل ملف النشاط التجاري.",
    query: "مطعم فرنسي في دا نانغ",
    maps: "Google Maps", organic: "SEO", ads: "Google Ads",
    mapsDesc: "الظهور عندما يبحث العميل عن نشاط قريب منه.",
    organicDesc: "الظهور في النتائج الطبيعية لخدماتك ومواضيعك.",
    adsDesc: "شراء ظهور إعلاني فوري. لا تقدمه XRAGENCY.",
    why: "لماذا يضعك Google هنا؟",
    factors: [["الملاءمة", "يجب أن يتوافق ملفك مع البحث المحلي."], ["المسافة", "يأخذ Google القرب في الاعتبار في البحث المحلي."], ["البروز", "السمعة والوعي والإشارات العامة مهمة."], ["جودة الملف", "يجب أن تكون الفئات والخدمات والمعلومات والصور والنشاط متسقة."]],
    work: "ما الذي تعمل عليه XRAGENCY",
    bridge: "Maps وSEO يؤديان وظيفتين مختلفتين.",
    bridgeDesc: "Maps يركز على الظهور المحلي، وSEO على نتائج البحث العضوية، ويمكن للخدمتين تعزيز بعضهما.",
    pricing: "ابتداءً من 99 € / شهر · باقة تصدر Top 3 بـ 159 € / شهر",
    pricingDesc: "إدارة وتحديث مستمر بـ 99 €/شهر أو باقة الهجوم للتواجد في أفضل 3 نتائج بـ 159 €/شهر مع ضمان تعاقدي ولوحة NFC مجانية.",
    cta: "احصل على تحليلي المحلي",
  },
  ru: {
    kicker: "Google Maps · Локальная видимость",
    title: "Поймите Google визуально.",
    intro: "Посмотрите, на что обращает внимание Google, что делает XRAGENCY и почему локальная оптимизация — это больше, чем редактирование карточки.",
    query: "французский ресторан в Дананге",
    maps: "Google Maps", organic: "SEO", ads: "Google Ads",
    mapsDesc: "Быть заметным, когда клиент ищет компанию рядом.",
    organicDesc: "Быть заметным в органической выдаче по вашим услугам и темам.",
    adsDesc: "Покупка платной видимости. XRAGENCY не предоставляет эту услугу.",
    why: "Почему Google показывает вас здесь?",
    factors: [["Релевантность", "Профиль должен соответствовать локальному запросу."], ["Расстояние", "Google учитывает близость в локальном поиске."], ["Известность", "Репутация и публичные сигналы имеют значение."], ["Качество профиля", "Категории, услуги, информация, фото и активность должны быть согласованы."]],
    work: "Что делает XRAGENCY",
    bridge: "Maps и SEO выполняют разные задачи.",
    bridgeDesc: "Maps работает с локальным присутствием, SEO — с органической выдачей. Они могут усиливать друг друга.",
    pricing: "От 99 € / мес · Топ-3 Доминирование за 159 € / мес",
    pricingDesc: "Ведение и оптимизация карточки от 99 €/мес или тариф агрессивного захвата Топ-3 за 159 €/мес с договорной гарантией и фирменной NFC-стойкой в подарок.",
    cta: "Получить локальный анализ",
  },
} as const;

export function LocalVisibilityExperience() {
  const { lang, t } = useLang();
  const copy = COPY[lang] ?? COPY.en;
  const [surface, setSurface] = useState<"maps" | "organic" | "ads">("maps");
  const [plan, setPlan] = useState(0);
  const selected = PLANS[plan];

  const surfaceContent = useMemo(() => ({
    maps: { title: copy.maps, desc: copy.mapsDesc },
    organic: { title: copy.organic, desc: copy.organicDesc },
    ads: { title: copy.ads, desc: copy.adsDesc },
  })[surface], [copy, surface]);

  const surfaceMeta = {
    maps: { eyebrow: "LOCAL PACK", title: "Google Maps", color: "text-primary" },
    organic: { eyebrow: "ORGANIC SEARCH", title: "SEO", color: "text-primary" },
    ads: { eyebrow: "PAID SEARCH", title: "Google Ads", color: "text-muted-foreground" },
  }[surface];

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/20 py-20 lg:py-28"><div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-5xl">
          <p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.kicker}</p>
          <h2 className="display-serif mt-4 text-4xl leading-[.92] sm:text-6xl">{t({ fr: "Comprenez Google", en: "Understand Google", vi: "Hiểu Google", ar: "افهم Google", ru: "Поймите Google" })} <em className="text-primary not-italic italic">{t({ fr: "visuellement.", en: "visually.", vi: "bằng hình ảnh.", ar: "بصريًا.", ru: "визуально." })}</em></h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{copy.intro}</p><div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-primary/35 bg-primary/[.07] px-5 py-4 shadow-[0_20px_60px_-35px_hsl(var(--primary)/.7)]"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></span><div><p className="label-mono text-[9px] uppercase tracking-[.18em] text-primary">GARANTIE</p><p className="mt-1 text-sm font-semibold text-foreground">{t({fr:"Top 3 ou remboursé",en:"Top 3 or money back",vi:"Top 3 hoặc hoàn tiền",ar:"Top 3 أو استرداد المبلغ",ru:"Top 3 или возврат"})}</p></div></div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] shadow-[0_35px_100px_-55px_rgba(0,0,0,.85)] border border-border bg-background shadow-[0_35px_100px_-60px_rgba(0,0,0,.9)]">
          <div className="flex flex-col gap-4 border-b border-border/70 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3">
              <Search className="h-4 w-4 text-primary" />
              <span className="text-sm">{copy.query}</span>
              <span className="ml-auto hidden rounded-full bg-muted px-2 py-1 label-mono text-[8px] text-muted-foreground sm:block">SIMULATION</span>
            </div>
            <div className="flex gap-1 rounded-full border border-border/70 bg-card/70 p-1">
              {(["maps", "organic", "ads"] as const).map((key) => (
                <button key={key} type="button" onClick={() => setSurface(key)} className={`rounded-full px-4 py-2 label-mono text-[9px] uppercase tracking-[.12em] transition ${surface === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {key === "maps" ? "Maps" : key === "organic" ? "SEO" : "AdWords"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="border-b border-border/70 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <p className="label-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">Ce que vous regardez</p>
              <div className="mt-5 space-y-2">
                {(["maps", "organic", "ads"] as const).map((key) => {
                  const item = surfaceContent;
                  const active = surface === key;
                  return (
                    <button key={key} type="button" onClick={() => setSurface(key)} className={`group w-full rounded-2xl border p-4 text-left transition-all ${active ? "border-primary/40 bg-primary/[.07] shadow-sm" : "border-border/70 hover:border-primary/30"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5"><span className={`h-2 w-2 rounded-full ${key === "ads" ? "bg-muted-foreground/50" : "bg-primary"}`} /><span className="font-medium">{item.title}</span></div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${active ? "translate-x-1 text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border/70 bg-card/50 p-4">
                <p className="label-mono text-[9px] uppercase tracking-[.16em] text-primary">À retenir</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{surface === "maps" ? "Maps = visibilité locale et appels / itinéraires." : surface === "organic" ? "SEO = visibilité naturelle sur vos pages et vos services." : "AdWords = publicité payante. Ce service n'est pas proposé par XRAGENCY."}</p>
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div><p className={`label-mono text-[9px] uppercase tracking-[.18em] ${surfaceMeta.color}`}>{surfaceMeta.eyebrow}</p><h3 className="display-serif mt-1 text-3xl sm:text-4xl">{surfaceMeta.title}</h3></div>
                {surface === "ads" ? <span className="rounded-full border border-border bg-muted px-3 py-1 label-mono text-[8px] text-muted-foreground">NON PROPOSÉ</span> : <span className="rounded-full border border-primary/20 bg-primary/[.06] px-3 py-1 label-mono text-[8px] text-primary">SERVICE XRAGENCY</span>}
              </div>

              {/* Application-like screen: deliberately built as UI, not a decorative stock image. */}
              <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-[#f7f7f5] text-[#202124] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-2 flex-1 rounded-lg border border-black/10 bg-[#f3f3f3] px-3 py-1.5 text-[9px] text-[#666]">google.com/search?q={copy.query}</div>
                </div>

                {surface === "maps" && <div className="grid min-h-[330px] sm:grid-cols-[.85fr_1.15fr]">
                  <div className="border-b border-black/10 bg-white p-4 sm:border-b-0 sm:border-r">
                    <div className="flex items-center gap-2 text-[10px] font-semibold"><MapPin className="h-3.5 w-3.5 text-[#4285f4]" /> Maps</div>
                    {[1,2,3].map((n) => <div key={n} className={`mt-3 rounded-xl border p-3 ${n === 1 ? "border-[#4285f4]/40 bg-[#f7fbff]" : "border-black/8"}`}><div className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#4285f4] text-[8px] text-white">{n}</span><div><p className="text-[10px] font-semibold">{n === 1 ? "Votre établissement" : `Concurrent local ${n}`}</p><p className="mt-0.5 text-[8px] text-[#777]">4.{n + 2} ★ · {120 + n * 74} avis</p></div></div><div className="mt-2 h-1.5 rounded-full bg-black/5"><div className="h-full rounded-full bg-[#4285f4]" style={{width:`${78-n*14}%`}} /></div></div>)}
                  </div>
                  <div className="relative min-h-[300px] overflow-hidden bg-[#dfe8d8]"><div className="absolute inset-0 opacity-60" style={{backgroundImage:"linear-gradient(30deg,transparent 45%,#fff 46%,#fff 49%,transparent 50%),linear-gradient(120deg,transparent 45%,#fff 46%,#fff 49%,transparent 50%)",backgroundSize:"90px 90px"}} /><div className="absolute left-[27%] top-[35%] grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#4285f4] text-white shadow-lg"><MapPin className="h-4 w-4" /></div><div className="absolute left-[58%] top-[52%] grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#ea4335] text-white shadow"><MapPin className="h-3 w-3" /></div><div className="absolute bottom-4 left-4 rounded-xl bg-white/95 p-3 shadow-lg"><p className="text-[8px] text-[#777]">RECHERCHE LOCALE</p><p className="mt-1 text-[11px] font-semibold">restaurant français à Da Nang</p><p className="mt-1 text-[8px] text-[#4285f4]">Votre visibilité dans le Local Pack</p></div></div>
                </div>}

                {surface === "organic" && <div className="min-h-[330px] bg-white p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-2 text-[10px]"><span className="font-bold text-[#4285f4]">Google</span><span className="rounded-full border border-black/10 px-2 py-1 text-[8px] text-[#777]">Résultats</span></div>
                  {[["XRAGENCY — Studio digital premium", "xragencyai.com", "Site premium, SEO, visibilité locale et expériences digitales sur mesure."],["Google SEO pour votre activité", "example.com/seo", "Comprendre comment vos clients recherchent vos services et construire votre visibilité."],["Agence digitale premium", "example.com/agence", "Une présence digitale pensée pour la conversion et l'image de marque."]].map(([title,url,desc],i)=><div key={title} className="mb-5 max-w-2xl"><p className="text-[8px] text-[#188038]">{url}</p><p className="mt-1 text-[13px] font-medium text-[#1a0dab]">{title}</p><p className="mt-1 text-[9px] leading-4 text-[#4d5156]">{desc}</p><span className="mt-2 inline-block rounded-full bg-[#f1f3f4] px-2 py-1 text-[7px] text-[#5f6368]">{i === 0 ? "Position organique" : "Résultat naturel"}</span></div>)}
                </div>}

                {surface === "ads" && <div className="min-h-[330px] bg-white p-6 sm:p-8"><div className="rounded-2xl border border-dashed border-black/15 bg-[#fafafa] p-6 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f1f3f4]"><Search className="h-5 w-5 text-[#777]" /></div><p className="mt-4 text-[12px] font-semibold">Google Ads / AdWords</p><p className="mx-auto mt-2 max-w-md text-[9px] leading-4 text-[#666]">Cette simulation montre à quoi correspond la publicité payante dans Google. XRAGENCY ne vend pas ce service : aucun bouton de devis n'est affiché.</p><span className="mt-4 inline-flex rounded-full border border-black/10 px-3 py-1.5 text-[8px] font-semibold text-[#666]">INFORMATION UNIQUEMENT</span></div></div>}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-sm font-medium">{surfaceContent.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{surfaceContent.desc}</p></div>
                {surface === "maps" && <a href="/services/maps" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 label-mono text-[9px] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Voir notre service <ChevronRight className="h-3.5 w-3.5" /></a>}
                {surface === "organic" && <a href="/services/seo" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 label-mono text-[9px] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Voir notre service <ChevronRight className="h-3.5 w-3.5" /></a>}
                {surface === "ads" && <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-border px-4 py-2.5 label-mono text-[9px] uppercase tracking-wider text-muted-foreground">Service non proposé</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-background p-7 sm:p-9">
            <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.work}</p></div>
            <div className="mt-8 space-y-5">{copy.factors.map(([title, desc]) => <div key={title} className="flex gap-4"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p></div></div>)}</div>
          </div>
          <div className="rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:p-9">
            <p className="label-mono text-xs uppercase tracking-widest text-primary">Maps + SEO</p>
            <h3 className="display-serif mt-4 text-4xl">{copy.bridge}</h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{copy.bridgeDesc}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">MAPS</span><p className="mt-2 text-sm">{copy.mapsDesc}</p><a href="/services/maps" className="mt-4 inline-flex items-center gap-1 label-mono text-[9px] uppercase tracking-wider text-primary">Voir notre service <ChevronRight className="h-3 w-3" /></a></div><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">SEO</span><p className="mt-2 text-sm">{copy.organicDesc}</p><a href="/services/seo" className="mt-4 inline-flex items-center gap-1 label-mono text-[9px] uppercase tracking-wider text-primary">Voir notre service <ChevronRight className="h-3 w-3" /></a></div></div>
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl"><p className="label-mono text-xs uppercase tracking-widest text-primary">Local Visibility</p><h3 className="display-serif mt-4 text-4xl sm:text-5xl">{copy.pricing}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy.pricingDesc}</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">{PLANS.map((item,index)=>{const active=plan===index;return <button key={item.key} type="button" onClick={()=>setPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all ${active ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}><span className="label-mono text-[10px] text-primary">0{index+1} / 03</span><h4 className="display-serif mt-4 text-3xl">{item.title[lang]}</h4><div className="mt-5 flex items-end gap-2"><span className="display-serif text-4xl text-primary">{item.price} €</span><span className="label-mono mb-1 text-xs text-muted-foreground">"/ year"</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc[lang]}</p><ul className="mt-6 space-y-3">{item.features[lang].map(feature=><li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul></button>})}</div>
          <div className="mt-6 rounded-2xl border border-border/70 bg-background p-5 sm:flex sm:items-center sm:justify-between sm:gap-5"><div><p className="label-mono text-[10px] text-primary">{selected.title[lang] ?? selected.title.en}</p><p className="mt-1 text-sm text-muted-foreground">{selected.desc[lang] ?? selected.desc.en}</p></div><a href="https://wa.me/33767566783" target="_blank" rel="noreferrer" className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground sm:mt-0">{copy.cta}</a></div>
        </div>
      </div>
    </section>
  );
}
