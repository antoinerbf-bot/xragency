import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { SurfaceDigital } from "./SurfaceDigital";
import { cn } from "@/lib/utils";
import { Parallax } from "./primitives";
import { ServiceIllustration } from "./ServiceIllustration";

/** Core catalog shown on /services — coherent set, not the full internal list */
const CATALOG_IDS = [
  "websites",
  "branding",
  "seo",
  "maps",
  "social",
  "maintenance",
  "robotics",
] as const;

const SERVICE_KICKER: Record<string, { fr: string; en: string; vi: string; ar?: string; ru?: string }> = {
  websites: { fr: "FLAGSHIP", en: "FLAGSHIP", vi: "FLAGSHIP", ar: "الخدمة الرئيسية", ru: "КЛЮЧЕВОЕ" },
  branding: { fr: "IDENTITÉ", en: "IDENTITY", vi: "NHẬN DIỆN", ar: "الهوية", ru: "АЙДЕНТИКА" },
  seo: { fr: "VISIBILITÉ", en: "VISIBILITY", vi: "HIỂN THỊ", ar: "الظهور", ru: "ВИДИМОСТЬ" },
  maps: { fr: "LOCAL", en: "LOCAL", vi: "ĐỊA PHƯƠNG", ar: "محلي", ru: "ЛОКАЛЬНО" },
  social: { fr: "RÉSEAUX", en: "SOCIAL", vi: "MẠNG XÃ HỘI", ar: "التواصل", ru: "СОЦСЕТИ" },
  maintenance: { fr: "CARE", en: "CARE", vi: "BẢO TRÌ", ar: "الصيانة", ru: "ПОДДЕРЖКА" },
  robotics: { fr: "ROBOTICS", en: "ROBOTICS", vi: "ROBOT", ar: "الروبوتات", ru: "РОБОТОТЕХНИКА" },
};
const HREF: Record<string, string> = {
  websites: "/services/websites",
  branding: "/services/branding",
  seo: "/services/seo",
  maps: "/services/maps",
  social: "/services/social",
  maintenance: "/services/webcare",
  robotics: "/services/robotique",
};

export function ServicesCatalog() {
  const { t, price, lang } = useLang();
  const catalog = CATALOG_IDS.map((id) => SERVICES.find((s) => s.id === id)).filter(
    Boolean,
  ) as typeof SERVICES;

  const copy = {
    fr: {
      eyebrow: "SERVICES",
      title1: "Plusieurs expertises.",
      title2: "Un seul système.",
      lead: "Sites vitrines, sites business et e-commerce, identité, SEO, Google Maps, réseaux et maintenance. Chaque prestation répond à un besoin précis — ensemble, elles construisent une présence digitale qui convertit.",
      learn: "En savoir plus",
      from: "À partir de",
      ctaTitle: "Pas sûr par où commencer ?",
      ctaLead: "Décrivez votre situation. On vous propose un ordre clair et une estimation.",
      cta: "Lancer mon analyse",
      enter: "Entrer dans l’expérience",
      quote: "Faire mon devis",
      compose: "Composer cette offre",
      quoteFree: "Faire mon devis gratuit",
      perMonth: " / mois",
      perYear: " / an",
    },
    en: {
      eyebrow: "SERVICES",
      title1: "Multiple disciplines.",
      title2: "One system.",
      lead: "Showcase, business and e-commerce websites, identity, SEO, Google Maps, social and maintenance. Each service solves a specific need — together they build a digital presence that converts.",
      learn: "Learn more",
      from: "From",
      ctaTitle: "Not sure where to start?",
      ctaLead: "Tell us about your situation. We'll suggest a sequence and a budget range.",
      cta: "Start my analysis",
      enter: "Enter the experience",
      quote: "Build my quote",
      compose: "Build this offer",
      quoteFree: "Get my free quote",
      perMonth: " / mo",
      perYear: " / yr",
    },
    vi: {
      eyebrow: "DỊCH VỤ",
      title1: "Nhiều chuyên môn.",
      title2: "Một hệ thống.",
      lead: "Website giới thiệu, website doanh nghiệp và e-commerce, nhận diện, SEO, Google Maps, mạng xã hội và bảo trì. Mỗi dịch vụ giải quyết một nhu cầu cụ thể — cùng nhau tạo nên hiện diện số có khả năng chuyển đổi.",
      learn: "Tìm hiểu thêm",
      from: "Từ",
      ctaTitle: "Chưa chắc bắt đầu từ đâu?",
      ctaLead: "Mô tả tình huống của bạn. Chúng tôi đề xuất thứ tự và khoảng ngân sách.",
      cta: "Bắt đầu phân tích",
      enter: "Bước vào trải nghiệm",
      quote: "Tạo báo giá",
      compose: "Chọn gói này",
      quoteFree: "Nhận báo giá miễn phí",
      perMonth: " / tháng",
      perYear: " / năm",
    },
    ar: {
      eyebrow: "الخدمات",
      title1: "خبرات متعددة.",
      title2: "منظومة واحدة.",
      lead: "مواقع تعريفية وتجارية ومتاجر إلكترونية، وهوية بصرية، وتحسين محركات البحث، وخرائط Google، وشبكات اجتماعية وصيانة. تعالج كل خدمة حاجة محددة، وتتكامل الخدمات لبناء حضور رقمي يحقق النتائج.",
      learn: "اكتشف المزيد",
      from: "ابتداءً من",
      ctaTitle: "لست متأكدًا من أين تبدأ؟",
      ctaLead: "اشرح لنا وضعك، وسنقترح ترتيبًا واضحًا ونطاقًا تقديريًا للميزانية.",
      cta: "ابدأ التحليل",
      enter: "اكتشف التجربة",
      quote: "أنشئ عرض السعر",
      compose: "اختر هذه الباقة",
      quoteFree: "احصل على عرض سعر مجاني",
      perMonth: " / شهر",
      perYear: " / سنة",
    },
    ru: {
      eyebrow: "УСЛУГИ",
      title1: "Разные компетенции.",
      title2: "Единая система.",
      lead: "Сайты-визитки и бизнес-сайты, интернет-магазины, айдентика, SEO, Google Maps, социальные сети и обслуживание. Каждая услуга решает конкретную задачу, а вместе они создают цифровое присутствие, которое помогает конвертировать посетителей в клиентов.",
      learn: "Подробнее",
      from: "От",
      ctaTitle: "Не знаете, с чего начать?",
      ctaLead: "Расскажите о своей ситуации. Мы предложим понятную последовательность действий и ориентир по бюджету.",
      cta: "Начать анализ",
      enter: "Открыть возможности",
      quote: "Составить смету",
      compose: "Выбрать этот пакет",
      quoteFree: "Получить бесплатную смету",
      perMonth: " / мес",
      perYear: " / год",
    },
  }[lang];

  return (
    <section className="relative">
      {/* Hero — same Surface digitale universe as Home */}
      <div className="relative min-h-[70vh] overflow-hidden border-b border-border/40">
        <div className="pointer-events-none absolute inset-0 bg-background">
          <SurfaceDigital className="opacity-80" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, transparent 0%, color-mix(in oklab, var(--background) 55%, transparent) 70%, var(--background) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <Parallax speed={-0.035}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#d4af37] mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              <span>ATELIER DES DISCIPLINES · XR DIGITAL</span>
            </div>
            <h1 className="text-[clamp(3rem,6.8vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white">
              {copy.title1}
              <br />
              <span className="text-[#d4af37]">{copy.title2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-[#94a3b8] leading-relaxed">
              {copy.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/#quote"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-black transition hover:scale-105 hover:bg-[#d4af37] shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                {copy.enter} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/#quote"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-6 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                {copy.quote}
              </a>
            </div>
          </Parallax>
          <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#64748b]">
            01 // {String(catalog.length).padStart(2, "0")} EXPERTISES SOUVERAINES
          </p>
        </div>
      </div>

      {/* Six service scenes — editorial bento */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {catalog.map((service, index) => {
            const kicker = SERVICE_KICKER[service.id] ?? { fr: "SERVICE", en: "SERVICE", vi: "DỊCH VỤ" };
            const href = HREF[service.id] ?? `/services/${service.id}`;
            const featured = index === 0;
            return (
              <article key={service.id} className={cn("group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/12 bg-[#090b10] p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.18)]", featured ? "md:col-span-2 lg:col-span-7" : "lg:col-span-5")}>
                <div>
                  <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#06070a]">
                    <ServiceIllustration service={service.id} title={t(service.title)} />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-[8px] font-bold uppercase tracking-[.2em] text-[#d4af37]">
                      {kicker[lang] ?? kicker.en}
                    </span>
                    <span className="rounded-full bg-black/80 px-3.5 py-1 font-mono text-[8.5px] font-bold text-[#d4af37] border border-white/10">
                      {copy.from} {price(service.fromEur)}{service.fromPeriod === "month" ? copy.perMonth : service.fromPeriod === "year" ? copy.perYear : ""}
                    </span>
                  </div>
                  <h2 className={cn("leading-[.95] text-white font-extrabold", featured ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl")}>
                    {t(service.title)}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#94a3b8]">{t(service.description)}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/10">
                  <a href={href} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-white transition hover:border-[#d4af37] hover:text-[#d4af37]">
                    {copy.learn} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href={`/?service=${service.id}#quote`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-black transition hover:bg-[#d4af37] hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {copy.compose} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            );
          })}

          {/* Dedicated Custom CRM Card */}
          <article className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-gradient-to-br from-[#0e121d] via-[#090b10] to-[#040508] p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(212,175,55,0.25)] md:col-span-2 lg:col-span-12">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 px-3 py-1 text-[8px] font-bold uppercase tracking-[.2em] text-[#d4af37]">
                    NOUVELLE OFFRE MÉTIER
                  </span>
                  <span className="rounded-full bg-black px-3.5 py-1 font-mono text-[8.5px] font-bold text-[#d4af37] border border-white/15">
                    À PARTIR DE 2 000 € · 0% COMMISSION
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl text-white font-extrabold leading-tight">
                  Caisse POS &amp; CRM Omnicanal · <span className="text-[#d4af37] font-light italic">Stop aux 30% d&apos;Uber Eats.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#94a3b8] max-w-2xl">
                  Logiciel de caisse tactile avec tickets certifiés, gestion complète des stocks, synchronisation avec votre site web, écran cuisine KDS, app livreurs et option Jumeau Numérique 3D immersif style GTA.
                </p>
              </div>
              <div className="flex flex-wrap lg:justify-end gap-3">
                <a href="/services/robotique#crm-sur-mesure" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-black transition hover:scale-105 hover:bg-[#d4af37] shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                  Découvrir l&apos;offre Caisse &amp; CRM <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-white/15 bg-[#090b10] px-8 py-12 sm:px-12 lg:px-16 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#d4af37] block mb-2">
                CADRAGE IMMÉDIAT
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">{copy.ctaTitle}</h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-[#94a3b8] leading-relaxed font-normal">{copy.ctaLead}</p>
            </div>
            <a
              href="/#quote"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[#d4af37] hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <span>{copy.quoteFree}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
