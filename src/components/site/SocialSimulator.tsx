import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { InstagramLogo, TikTokLogo, FacebookLogo } from "./ServiceIllustration";
import { useLang, type Lang } from "@/lib/i18n";
import { Reveal } from "./primitives";

interface SectorData {
  id: string;
  label: Record<Lang, string>;
  icon: string;
  reach: string;
  engagement: string;
  clients: string;
  hoursSaved: string;
  roas: string;
  bestFormat: string;
  quoteAnchor: string;
}

const SECTORS: SectorData[] = [
  {
    id: "food",
    label: {
      fr: "Restauration & Hôtellerie",
      en: "Restaurants & Hospitality",
      vi: "Nhà hàng & Khách sạn",
      ar: "المطاعم والضيافة",
      ru: "Рестораны и отели",
    },
    icon: "🍽️",
    reach: "65 000 à 110 000",
    engagement: "18.8%",
    clients: "+180 à +320 réservations / mois",
    hoursSaved: "18h / mois",
    roas: "×4.8",
    bestFormat: "Reels 4K gourmands & coulisses du chef",
    quoteAnchor: "restaurant",
  },
  {
    id: "luxury",
    label: {
      fr: "Mode, Joaillerie & Luxe",
      en: "Fashion & Luxury Goods",
      vi: "Thời trang & Xa xỉ",
      ar: "الموضة والمجوهرات الفاخرة",
      ru: "Мода и ювелирные изделия",
    },
    icon: "💎",
    reach: "85 000 à 160 000",
    engagement: "21.4%",
    clients: "+95 à +180 ventes qualifiées / mois",
    hoursSaved: "22h / mois",
    roas: "×5.4",
    bestFormat: "Lookbooks cinématiques 4K & macro-détails",
    quoteAnchor: "luxury",
  },
  {
    id: "beauty",
    label: {
      fr: "Beauté, Salons & Spas",
      en: "Beauty, Salons & Spas",
      vi: "Làm đẹp & Chăm sóc sức khỏe",
      ar: "التجميل والصالونات والسبا",
      ru: "Красота, салоны и спа",
    },
    icon: "✨",
    reach: "45 000 à 80 000",
    engagement: "16.9%",
    clients: "+140 à +240 rendez-vous / mois",
    hoursSaved: "15h / mois",
    roas: "×4.1",
    bestFormat: "Avant/Après rythmés & Stories immersion",
    quoteAnchor: "beauty",
  },
  {
    id: "realestate",
    label: {
      fr: "Immobilier & Architecture",
      en: "Real Estate & Architecture",
      vi: "Bất động sản & Kiến trúc",
      ar: "العقارات والهندسة المعمارية",
      ru: "Недвижимость и архитектура",
    },
    icon: "🏛️",
    reach: "40 000 à 75 000",
    engagement: "14.2%",
    clients: "+15 à +35 mandats & visites d'exception",
    hoursSaved: "20h / mois",
    roas: "×6.2",
    bestFormat: "Visites virtuelles drone & plans cinéma stabilisés",
    quoteAnchor: "realestate",
  },
  {
    id: "services",
    label: {
      fr: "Artisans & Commerces Locaux",
      en: "Artisans & Local Retail",
      vi: "Thợ thủ công & Bán lẻ địa phương",
      ar: "الحرفيون والمتاجر المحلية",
      ru: "Мастера и локальный бизнес",
    },
    icon: "🔨",
    reach: "35 000 à 65 000",
    engagement: "15.6%",
    clients: "+60 à +140 devis & contacts directs",
    hoursSaved: "16h / mois",
    roas: "×3.9",
    bestFormat: "Savoir-faire en action & avis clients vérifiés",
    quoteAnchor: "craft",
  },
];

export function SocialSimulator() {
  const { lang } = useLang();
  const currentLang = (["fr", "en", "vi", "ar", "ru"].includes(lang) ? lang : "fr") as Lang;
  const [selectedSector, setSelectedSector] = useState<string>("food");
  const [activeChannel, setActiveChannel] = useState<"instagram" | "tiktok" | "facebook">("instagram");

  const sector = SECTORS.find((s) => s.id === selectedSector) ?? SECTORS[0];
  const copy = {
    kicker: { fr: "COMMUNITY MANAGEMENT · STUDIO DE CONTENU", en: "COMMUNITY MANAGEMENT · CONTENT STUDIO", vi: "QUẢN LÝ CỘNG ĐỒNG · STUDIO NỘI DUNG", ar: "إدارة المجتمع · استوديو المحتوى", ru: "КОМЬЮНИТИ-МЕНЕДЖМЕНТ · КОНТЕНТ-СТУДИЯ" },
    title: { fr: "Du contenu qui donne envie d’entrer en conversation.", en: "Content that gives people a reason to engage.", vi: "Nội dung khơi gợi tương tác thực sự.", ar: "محتوى يشجع الجمهور على التفاعل.", ru: "Контент, который вовлекает в диалог." },
    intro: { fr: "Une ligne éditoriale claire, des visuels cohérents et une animation adaptée à votre marque. Explorez un exemple de direction créative selon votre secteur.", en: "A clear editorial direction, cohesive visuals and community management tailored to your brand. Explore a creative direction for your sector.", vi: "Định hướng nội dung rõ ràng, hình ảnh nhất quán và quản lý cộng đồng phù hợp với thương hiệu.", ar: "توجه تحريري واضح وصور متناسقة وإدارة مجتمع تناسب علامتك التجارية.", ru: "Чёткая редакционная стратегия, единый визуальный стиль и управление сообществом под ваш бренд." },
    choose: { fr: "01 · Choisissez votre secteur", en: "01 · Choose your sector", vi: "01 · Chọn lĩnh vực", ar: "01 · اختر مجال نشاطك", ru: "01 · Выберите отрасль" },
    preview: { fr: "02 · Aperçu de direction éditoriale", en: "02 · Editorial direction preview", vi: "02 · Xem trước định hướng nội dung", ar: "02 · معاينة التوجه التحريري", ru: "02 · Пример редакционной стратегии" },
    example: { fr: "EXEMPLE CRÉATIF · PAS UNE PRÉVISION DE PERFORMANCE", en: "CREATIVE EXAMPLE · NOT A PERFORMANCE FORECAST", vi: "VÍ DỤ SÁNG TẠO · KHÔNG PHẢI DỰ BÁO HIỆU QUẢ", ar: "مثال إبداعي · ليس توقعًا للأداء", ru: "КРЕАТИВНЫЙ ПРИМЕР · НЕ ПРОГНОЗ РЕЗУЛЬТАТОВ" },
    goal: { fr: "Objectif éditorial", en: "Editorial objective", vi: "Mục tiêu nội dung", ar: "الهدف التحريري", ru: "Редакционная цель" },
    angles: { fr: "Angles de contenu à explorer", en: "Content angles to explore", vi: "Góc nội dung nên khai thác", ar: "محاور المحتوى المقترحة", ru: "Идеи для контента" },
    channels: { fr: "Choisissez un canal", en: "Choose a channel", vi: "Chọn kênh", ar: "اختر قناة", ru: "Выберите канал" },
    instagram: { fr: "Instagram · Image & relation", en: "Instagram · Brand & community", vi: "Instagram · Hình ảnh & cộng đồng", ar: "إنستغرام · الهوية والمجتمع", ru: "Instagram · Образ бренда и сообщество" },
    tiktok: { fr: "TikTok · Vidéo verticale", en: "TikTok · Short-form video", vi: "TikTok · Video dọc", ar: "تيك توك · فيديو قصير", ru: "TikTok · Короткие видео" },
    facebook: { fr: "Facebook · Proximité & actualités", en: "Facebook · Local reach & updates", vi: "Facebook · Kết nối địa phương", ar: "فيسبوك · التواصل المحلي", ru: "Facebook · Локальная аудитория и новости" },
    scope: { fr: "La portée, les ventes et l’engagement dépendent de votre audience, du budget, de l’offre et de la régularité. Nous définissons les objectifs après analyse de votre situation.", en: "Reach, sales and engagement depend on your audience, budget, offer and consistency. Targets are set after reviewing your situation.", vi: "Phạm vi tiếp cận, doanh số và tương tác phụ thuộc vào tệp khách hàng, ngân sách, ưu đãi và tính nhất quán.", ar: "يعتمد الوصول والمبيعات والتفاعل على الجمهور والميزانية والعرض والاستمرارية.", ru: "Охваты, продажи и вовлечённость зависят от аудитории, бюджета, предложения и регулярности." },
    plans: { fr: "Voir les forfaits Community Management", en: "Explore community management plans", vi: "Xem các gói quản lý cộng đồng", ar: "استكشف باقات إدارة المجتمع", ru: "Посмотреть тарифы на управление сообществом" },
  };
  const text = (key: keyof typeof copy) => copy[key][currentLang] ?? copy[key].fr;
  const sectorCopy: Record<string, Record<Lang, { goal: string; angles: string[] }>> = {
    food: {
      fr: { goal: "Donner faim, créer la confiance et faciliter la réservation.", angles: ["Le produit en gros plan : texture, geste, détail", "Les coulisses : équipe, préparation et savoir-faire", "La preuve sociale : avis, moments clients et réponses utiles"] },
      en: { goal: "Build appetite, trust and a clear path to booking.", angles: ["The product up close: texture, craft and detail", "Behind the scenes: team, preparation and expertise", "Social proof: reviews, customer moments and helpful replies"] },
      vi: { goal: "Khơi gợi sự ngon miệng, niềm tin và nhu cầu đặt chỗ.", angles: ["Cận cảnh món ăn và chi tiết chế biến", "Hậu trường: đội ngũ và kỹ thuật", "Đánh giá khách hàng và khoảnh khắc thực tế"] },
      ar: { goal: "إثارة الشهية وبناء الثقة وتسهيل الحجز.", angles: ["تفاصيل المنتج عن قرب", "كواليس الفريق والتحضير", "آراء العملاء واللحظات الحقيقية"] },
      ru: { goal: "Вызывать аппетит, укреплять доверие и упрощать бронирование.", angles: ["Крупный план продукта и деталей", "Закулисье, команда и мастерство", "Отзывы и реальные моменты клиентов"] },
    },
    luxury: {
      fr: { goal: "Installer une perception premium et valoriser le détail.", angles: ["Matières, finitions et détails en macro", "Récit de marque et inspiration", "Mise en scène produit et conseils de style"] },
      en: { goal: "Build premium perception and showcase craftsmanship.", angles: ["Materials, finishes and macro details", "Brand story and inspiration", "Product styling and practical advice"] },
      vi: { goal: "Xây dựng hình ảnh cao cấp và tôn vinh chi tiết.", angles: ["Chất liệu và hoàn thiện", "Câu chuyện thương hiệu", "Trình bày sản phẩm và gợi ý phong cách"] },
      ar: { goal: "تعزيز الصورة الفاخرة وإبراز الحرفية.", angles: ["الخامات والتفاصيل الدقيقة", "قصة العلامة التجارية", "عرض المنتج ونصائح التنسيق"] },
      ru: { goal: "Подчеркнуть премиальность и качество исполнения.", angles: ["Материалы, отделка и детали", "История бренда и вдохновение", "Подача продукта и советы по стилю"] },
    },
    beauty: {
      fr: { goal: "Rassurer, montrer l’expertise et encourager la prise de rendez-vous.", angles: ["Gestes experts et détails de prestation", "Conseils simples et pédagogiques", "Résultats documentés avec autorisation client"] },
      en: { goal: "Build trust, demonstrate expertise and encourage bookings.", angles: ["Expert techniques and service details", "Simple, useful educational tips", "Documented results with client permission"] },
      vi: { goal: "Tạo niềm tin, thể hiện chuyên môn và khuyến khích đặt lịch.", angles: ["Kỹ thuật và chi tiết dịch vụ", "Mẹo chăm sóc dễ áp dụng", "Kết quả có sự đồng ý của khách hàng"] },
      ar: { goal: "بناء الثقة وإظهار الخبرة وتشجيع حجز المواعيد.", angles: ["تفاصيل الخدمة والمهارة", "نصائح بسيطة ومفيدة", "نتائج موثقة بموافقة العميل"] },
      ru: { goal: "Укреплять доверие, показывать экспертность и стимулировать запись.", angles: ["Техника и детали услуги", "Понятные полезные советы", "Результаты с разрешения клиента"] },
    },
    realestate: {
      fr: { goal: "Projeter le client dans le lieu et qualifier les demandes.", angles: ["Visite fluide et circulation dans l’espace", "Détails d’architecture et matériaux", "Informations pratiques et appel à visiter"] },
      en: { goal: "Help prospects imagine the space and qualify enquiries.", angles: ["Fluid walkthrough and spatial flow", "Architectural details and materials", "Practical information and viewing CTA"] },
      vi: { goal: "Giúp khách hình dung không gian và nâng chất lượng yêu cầu.", angles: ["Video tham quan liền mạch", "Chi tiết kiến trúc và vật liệu", "Thông tin thực tế và lời mời xem"] },
      ar: { goal: "مساعدة العميل على تخيل المكان وتأهيل الاستفسارات.", angles: ["جولة سلسة في المساحة", "تفاصيل العمارة والمواد", "معلومات عملية ودعوة للزيارة"] },
      ru: { goal: "Помочь представить пространство и повысить качество обращений.", angles: ["Плавный обзор пространства", "Архитектурные детали и материалы", "Практическая информация и приглашение на просмотр"] },
    },
    services: {
      fr: { goal: "Rendre le savoir-faire concret et déclencher une demande qualifiée.", angles: ["Le geste métier en situation réelle", "Avant/après contextualisé et honnête", "Réponse aux questions fréquentes et preuve client"] },
      en: { goal: "Make expertise tangible and encourage qualified enquiries.", angles: ["The craft in action", "Contextual, honest before-and-after", "Answers to FAQs and customer proof"] },
      vi: { goal: "Thể hiện tay nghề thực tế và thu hút yêu cầu phù hợp.", angles: ["Quy trình làm việc thực tế", "Trước/sau có bối cảnh rõ ràng", "Giải đáp thắc mắc và đánh giá khách hàng"] },
      ar: { goal: "إظهار المهارة بوضوح وتشجيع الطلبات المؤهلة.", angles: ["المهارة أثناء العمل", "قبل وبعد ضمن سياق واضح", "إجابات عن الأسئلة الشائعة وآراء العملاء"] },
      ru: { goal: "Показать мастерство и привлекать целевые обращения.", angles: ["Рабочий процесс в действии", "Контекстное сравнение до и после", "Ответы на частые вопросы и отзывы"] },
    },
  };
  const sectorPlan = sectorCopy[sector.id]?.[currentLang] ?? sectorCopy[sector.id]?.fr ?? sectorCopy.food.fr;
  const channels = {
    instagram: { name: "Instagram", icon: <InstagramLogo className="h-5 w-5" />, label: text("instagram"), formats: { fr: "Carrousels utiles, Stories interactives, Reels de marque", en: "Useful carousels, interactive Stories, brand Reels", vi: "Carousel hữu ích, Story tương tác, Reels thương hiệu", ar: "منشورات متسلسلة وقصص تفاعلية وريلز", ru: "Полезные карусели, интерактивные Stories, Reels бренда" } },
    tiktok: { name: "TikTok", icon: <TikTokLogo className="h-5 w-5" />, label: text("tiktok"), formats: { fr: "Accroche immédiate, démonstration, récit vertical", en: "Strong hook, demonstration, vertical storytelling", vi: "Mở đầu thu hút, minh họa, kể chuyện dạng dọc", ar: "افتتاحية قوية وعرض عملي وسرد عمودي", ru: "Сильный хук, демонстрация и вертикальный сторителлинг" } },
    facebook: { name: "Facebook", icon: <FacebookLogo className="h-5 w-5" />, label: text("facebook"), formats: { fr: "Actualités locales, avis, événements et messages utiles", en: "Local updates, reviews, events and useful posts", vi: "Tin tức địa phương, đánh giá, sự kiện và thông tin hữu ích", ar: "أخبار محلية وآراء وفعاليات ومنشورات مفيدة", ru: "Локальные новости, отзывы, события и полезные публикации" } },
  }[activeChannel];
  return (
    <section className="relative overflow-hidden border-b xr-line bg-[var(--xr-bg)] py-14 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(ellipse at 15% 20%, rgba(225,48,108,.10), transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(0,242,254,.07), transparent 44%)" }} />
      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <header className="grid gap-5 border-b xr-line pb-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="label-mono text-[8px] tracking-[.24em] text-pink-500">{text("kicker")}</p>
              <h2 className="display-serif mt-4 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[.9] tracking-[-.04em] text-[var(--xr-ink)]">{text("title")}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 xr-muted">{text("intro")}</p>
          </header>
        </Reveal>
        <div className="mt-8">
          <p className="label-mono mb-3 text-[8px] tracking-[.2em] xr-muted-2">{text("choose")}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {SECTORS.map((item) => (
              <button key={item.id} type="button" onClick={() => setSelectedSector(item.id)} aria-pressed={item.id === selectedSector} className={"flex min-h-16 items-center gap-3 rounded-2xl border p-4 text-left transition-all " + (item.id === selectedSector ? "border-primary bg-primary/10 ring-1 ring-primary/30" : "border-border bg-card/50 hover:border-primary/40")}>
                <span className="text-xl" aria-hidden>{item.icon}</span>
                <span className="text-xs font-semibold leading-5 text-foreground">{item.label[currentLang] ?? item.label.fr}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <article className="overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-surface)] shadow-xl">
            <div className="border-b xr-line p-6 sm:p-8">
              <p className="label-mono text-[8px] tracking-[.2em] text-pink-400">{text("preview")}</p>
              <h3 className="display-serif mt-4 text-3xl leading-tight text-[var(--xr-ink)]">{sector.label[currentLang] ?? sector.label.fr}</h3>
              <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/[.06] p-4"><p className="label-mono text-[7px] tracking-[.18em] text-primary">{text("goal")}</p><p className="mt-2 text-xs leading-5 text-foreground">{sectorPlan.goal}</p></div>
            </div>
            <div className="p-6 sm:p-8"><p className="label-mono text-[8px] tracking-[.18em] xr-muted-2">{text("angles")}</p><ul className="mt-4 space-y-3">{sectorPlan.angles.map((angle, i) => <li key={angle} className="flex gap-3 text-xs leading-5 text-foreground"><span className="label-mono text-primary">0{i + 1}</span><span>{angle}</span></li>)}</ul></div>
          </article>
          <article className="relative overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-surface-strong)] shadow-xl">
            <div aria-hidden className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(circle at 75% 10%, rgba(225,48,108,.25), transparent 45%)" }} />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col gap-4 border-b xr-line pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="label-mono text-[8px] tracking-[.2em] text-primary">{text("channels")}</p><h3 className="display-serif mt-2 text-2xl text-[var(--xr-ink)]">{channels.name}</h3></div><div className="flex gap-2">{(["instagram", "tiktok", "facebook"] as const).map((channel) => <button key={channel} type="button" aria-pressed={activeChannel === channel} onClick={() => setActiveChannel(channel)} className={"flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition " + (activeChannel === channel ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>{channel === "instagram" ? <InstagramLogo className="h-4 w-4" /> : channel === "tiktok" ? <TikTokLogo className="h-4 w-4" /> : <FacebookLogo className="h-4 w-4" />}<span>{channels.name === "Facebook" ? "Facebook" : channel === "instagram" ? "Instagram" : "TikTok"}</span></button>)}</div></div>
              <div className="mt-6 rounded-2xl border xr-line bg-[var(--xr-bg)] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3"><span className="label-mono text-[7px] tracking-[.18em] text-primary">{text("example")}</span><Sparkles className="h-4 w-4 text-primary" /></div>
                <div className="mt-5 flex items-start gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border xr-line bg-card">{channels.icon}</div><div><h4 className="text-sm font-semibold text-foreground">{channels.label}</h4><p className="mt-2 text-xs leading-5 xr-muted">{channels.formats[currentLang] ?? channels.formats.fr}</p></div></div>
                <div className="mt-5 grid gap-2 sm:grid-cols-3">{sectorPlan.angles.map((angle, i) => <div key={angle} className="rounded-xl border xr-line bg-card/50 p-3"><span className="label-mono text-[7px] text-primary">IDÉE 0{i + 1}</span><p className="mt-2 text-xs leading-5 text-foreground">{angle}</p></div>)}</div>
              </div>
              <p className="mt-5 text-xs leading-6 xr-muted">{text("scope")}</p>
              <a href="#plans" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3 text-xs font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5">{text("plans")}<ArrowRight className="h-4 w-4" /></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
