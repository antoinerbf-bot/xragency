import { ArrowUpRight, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { CANONICAL_SERVICE_URLS } from "@/lib/catalog";
import { XR_PHOTOS } from "@/lib/photography";

const CORE_IDS = ["websites", "seo", "maps", "social", "branding", "maintenance"] as const;

const SERVICE_IMAGES: Record<string, string> = {
  websites: XR_PHOTOS.websites,
  seo: XR_PHOTOS.seo,
  maps: XR_PHOTOS.maps,
  social: XR_PHOTOS.social,
  branding: XR_PHOTOS.branding,
  maintenance: XR_PHOTOS.maintenance,
  robotics: XR_PHOTOS.robotics,
};

const SERVICE_KICKER: Record<string, { fr: string; en: string; vi: string; ar: string; ru: string }> = {
  websites: { fr: "SITES WEB", en: "WEBSITES", vi: "WEBSITE", ar: "المواقع", ru: "САЙТЫ" },
  seo: { fr: "VISIBILITÉ GOOGLE", en: "GOOGLE SEO", vi: "SEO GOOGLE", ar: "الظهور على Google", ru: "SEO GOOGLE" },
  maps: { fr: "PRÉSENCE LOCALE", en: "LOCAL MAPS", vi: "GOOGLE MAPS", ar: "خرائط محلية", ru: "GOOGLE MAPS" },
  social: { fr: "SOCIAL MEDIA", en: "SOCIAL MEDIA", vi: "MẠNG XÃ HỘI", ar: "التواصل الاجتماعي", ru: "СОЦСЕТИ" },
  branding: { fr: "IDENTITÉ & MARQUE", en: "BRANDING", vi: "THƯƠNG HIỆU", ar: "الهوية البصرية", ru: "БРЕНДИНГ" },
  maintenance: { fr: "WEBCARE", en: "WEBCARE", vi: "BẢO TRÌ", ar: "الصيانة", ru: "ПОДДЕРЖКА" },
  robotics: { fr: "IA & ROBOTIQUE", en: "AI & ROBOTICS", vi: "AI & ROBOT", ar: "الذكاء والروبوتات", ru: "ИИ И РОБОТИКА" },
};

export function ServicesCatalog() {
  const { t, price, lang } = useLang();
  const isRtl = lang === "ar";
  const coreServices = CORE_IDS.map((id) => SERVICES.find((s) => s.id === id)).filter(
    Boolean,
  ) as typeof SERVICES;
  const roboticsService = SERVICES.find((s) => s.id === "robotics");

  const copy = {
    fr: {
      eyebrow: "NOS EXPERTISES",
      title1: "Des solutions digitales complètes",
      title2: "et sur mesure.",
      lead: "De la stratégie à l’exécution, nous activons les bons leviers pour développer votre visibilité, attirer des clients qualifiés et structurer votre croissance durable.",
      learn: "Découvrir le service",
      from: "À partir de",
      ctaTitle: "Pas encore sûr de l’ordre des priorités ?",
      ctaLead:
        "Décrivez vos objectifs dans notre configurateur en 3 étapes ou demandez un audit gratuit. Nous vous proposons un plan d’action clair et chiffré.",
      quote: "Composer mon devis",
      compose: "Ajouter au devis",
      quoteFree: "Démarrer mon projet",
      perMonth: " / mois",
      perYear: " / an",
      specialBadge: "INNOVATION & LOGICIELS MÉTIERS",
      aiCta: "IA & Logiciels sur mesure",
    },
    en: {
      eyebrow: "OUR EXPERTISE",
      title1: "Complete, tailor-made",
      title2: "digital solutions.",
      lead: "From strategy to execution, we activate the right levers to grow your visibility, attract qualified clients and build lasting performance.",
      learn: "Explore service",
      from: "From",
      ctaTitle: "Not sure where to start first?",
      ctaLead:
        "Share your goals in our 3-step quote configurator or run a free diagnostic. We will recommend a clear sequence and transparent budget.",
      quote: "Build my quote",
      compose: "Configure offer",
      quoteFree: "Start my project",
      perMonth: " / mo",
      perYear: " / yr",
      specialBadge: "INNOVATION & CUSTOM SOFTWARE",
      aiCta: "AI & Custom Software",
    },
    vi: {
      eyebrow: "CHUYÊN MÔN CỦA CHÚNG TÔI",
      title1: "Giải pháp số toàn diện",
      title2: "và may đo riêng.",
      lead: "Từ chiến lược đến thực thi, chúng tôi kích hoạt đúng đòn bẩy giúp bạn tăng độ phủ, thu hút khách hàng tiềm năng và phát triển bền vững.",
      learn: "Xem chi tiết",
      from: "Từ",
      ctaTitle: "Chưa chắc nên bắt đầu từ đâu?",
      ctaLead:
        "Mô tả mục tiêu của bạn trong công cụ báo giá 3 bước. Chúng tôi sẽ đề xuất thứ tự triển khai và ngân sách minh bạch.",
      quote: "Tạo báo giá",
      compose: "Chọn gói này",
      quoteFree: "Bắt đầu dự án",
      perMonth: " / tháng",
      perYear: " / năm",
      specialBadge: "ĐỔI MỚI & PHẦN MỀM RIÊNG",
      aiCta: "AI & Phần mềm theo yêu cầu",
    },
    ar: {
      eyebrow: "خبراتنا الرقمية",
      title1: "حلول رقمية متكاملة",
      title2: "مصممة على مقاسك.",
      lead: "من الاستراتيجية إلى التنفيذ، نفعّل الأدوات المناسبة لتعزيز ظهورك، وجذب عملاء مؤهلين، وبناء نمو مستدام لعلامتك.",
      learn: "اكتشف الخدمة",
      from: "ابتداءً من",
      ctaTitle: "لست متأكدًا من نقطة البداية؟",
      ctaLead:
        "شاركنا أهدافك عبر مُهيّئ العرض في 3 خطوات لنقترح لك خطة عمل واضحة وميزانية شفافة.",
      quote: "إنشاء عرض سعر",
      compose: "اختر هذه الخدمة",
      quoteFree: "ابدأ مشروعي",
      perMonth: " / شهر",
      perYear: " / سنة",
      specialBadge: "الابتكار والبرمجيات المخصصة",
      aiCta: "الذكاء الاصطناعي والبرمجيات",
    },
    ru: {
      eyebrow: "НАШИ КОМПЕТЕНЦИИ",
      title1: "Комплексные цифровые решения",
      title2: "под ваши задачи.",
      lead: "От стратегии до реализации — задействуем нужные каналы для роста видимости, привлечения целевых клиентов и устойчивого развития бренда.",
      learn: "Подробнее об услуге",
      from: "От",
      ctaTitle: "Не знаете, с какого шага начать?",
      ctaLead:
        "Опишите задачи в 3-шаговом конфигураторе сметы — мы предложим понятный план действий и прозрачный бюджет.",
      quote: "Составить смету",
      compose: "Выбрать услугу",
      quoteFree: "Начать проект",
      perMonth: " / мес",
      perYear: " / год",
      specialBadge: "ИННОВАЦИИ И ИНДИВИДУАЛЬНОЕ ПО",
      aiCta: "ИИ и разработка ПО",
    },
  }[lang];

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative bg-[#F7F4EE] text-[#171613]"
    >
      {/* Editorial Ivory Header */}
      <div className="border-b border-[#171613]/10 bg-[#F7F4EE] pb-14 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                  {copy.eyebrow}
                </span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.03] tracking-[-0.025em] text-[#171613] sm:text-6xl lg:text-[4.25rem]">
                {copy.title1}{" "}
                <span className="italic font-normal text-[#9E7F5A]">{copy.title2}</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#57534B] sm:text-base">{copy.lead}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/#quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
                >
                  {copy.quoteFree} <ArrowUpRight className="h-4 w-4 text-white" />
                </a>
                <a
                  href="/#audit"
                  className="inline-flex items-center gap-2 rounded-full border border-[#171613]/20 bg-white px-6 py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                >
                  {copy.quote}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Services — Clean 3×2 Editorial Grid */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service, index) => {
            const kicker = SERVICE_KICKER[service.id] ?? SERVICE_KICKER.websites;
            const href = CANONICAL_SERVICE_URLS[service.id] ?? `/services/${service.id}`;
            const img = SERVICE_IMAGES[service.id] ?? XR_PHOTOS.websites;
            const periodText =
              service.fromPeriod === "month"
                ? copy.perMonth
                : service.fromPeriod === "year"
                  ? copy.perYear
                  : "";

            return (
              <article
                key={service.id}
                className="xr-editorial-card group flex flex-col overflow-hidden rounded-3xl border border-[#171613]/10 bg-white shadow-[0_12px_34px_rgba(23,22,19,0.05)]"
              >
                <a href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#171613]">
                  <img
                    src={img}
                    alt={t(service.title)}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171613]/55 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-white/25 bg-[#171613]/75 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE] backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")} / 06 · {kicker[lang] ?? kicker.en}
                    </span>
                    <span className="rounded-full bg-[#F7F4EE]/95 px-3 py-1 font-mono text-[10px] font-semibold text-[#171613] shadow-sm">
                      {copy.from} {price(service.fromEur)}
                      {periodText}
                    </span>
                  </div>
                </a>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-2xl font-medium leading-tight text-[#171613]">
                    {t(service.title)}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#57534B]">
                    {t(service.description)}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[#171613]/10 pt-4">
                    <a
                      href={href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#171613] px-4 py-2 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
                    >
                      {copy.learn} <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                    </a>
                    <a
                      href={`/?service=${service.id}#quote`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#171613]/15 bg-[#FAF8F4] px-4 py-2 text-xs font-medium text-[#171613] transition hover:border-[#9E7F5A]"
                    >
                      {copy.compose}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Full-Width Feature Card: AI, Software & Robotics */}
        {roboticsService && (
          <article className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-white text-[#12110E] shadow-[0_20px_50px_rgba(23,22,19,0.06)]">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="relative h-64 lg:col-span-5 lg:h-full bg-slate-900">
                <img
                  src={SERVICE_IMAGES.robotics}
                  alt={t(roboticsService.title)}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 hidden lg:block" />
              </div>
              <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#706A61]">
                  <Bot className="h-3.5 w-3.5 text-[#12110E]" /> {copy.specialBadge}
                </span>
                <h2 className="mt-4 font-serif text-3xl font-medium text-[#12110E] sm:text-4xl">
                  {t(roboticsService.title)}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5A554E]">
                  {t(roboticsService.description)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/services/robotique"
                    className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925]"
                  >
                    {copy.learn} <ArrowUpRight className="h-4 w-4 text-white" />
                  </Link>
                  <a
                    href="/services/ai"
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-5 py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-white hover:border-[#12110E]"
                  >
                    {copy.aiCta} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl border border-[#171613]/12 bg-[#EEE9E0] px-7 py-10 sm:px-12 lg:px-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#171613] sm:text-4xl">
                {copy.ctaTitle}
              </h3>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#57534B]">
                {copy.ctaLead}
              </p>
            </div>
            <a
              href="/#quote"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#171613] px-7 py-3.5 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
            >
              {copy.quoteFree}
              <ArrowUpRight className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
