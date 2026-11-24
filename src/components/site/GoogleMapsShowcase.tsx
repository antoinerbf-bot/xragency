import { ArrowRight, Check, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { XR_PHOTOS } from "@/lib/photography";

const svcMaps = XR_PHOTOS.maps;

type MapsCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  visualLabel: string;
  visualTitle: string;
  visualBody: string;
  visualPoints: string[];
  offerLabel: string;
  strategyTitle: string;
  strategyDescription: string;
  strategyFeatures: string[];
  annualLabel: string;
  managementTitle: string;
  managementDescription: string;
  managementFeatures: string[];
  annualPayment: string;
  strategyCta: string;
  managementCta: string;
  detailCta: string;
  disclaimer: string;
};

const COPY: Record<Lang, MapsCopy> = {
  fr: {
    eyebrow: "GOOGLE BUSINESS PROFILE · SEO LOCAL",
    title: "Faites mieux connaître votre établissement",
    accent: "localement.",
    intro:
      "Nous optimisons votre fiche Google Business Profile et travaillons votre visibilité sur les recherches locales définies avec vous. Les positions Google ne sont jamais garanties.",
    visualLabel: "VISIBILITÉ LOCALE",
    visualTitle: "Une fiche claire, complète et utile",
    visualBody:
      "Des informations cohérentes pour aider vos clients à vous trouver et à vous contacter.",
    visualPoints: ["Profil & informations", "Services et contenus", "Suivi des indicateurs"],
    offerLabel: "STRATÉGIE · 1 AN",
    strategyTitle: "Stratégie de visibilité Google Maps",
    strategyDescription:
      "Audit préalable et plan d’action adapté à votre activité, à votre zone et à la concurrence.",
    strategyFeatures: [
      "Diagnostic des mots-clés et de la concurrence locale",
      "Création ou optimisation de la fiche Google Business Profile",
      "Catégories, services, description et visuels",
      "Stratégie locale et indicateurs définis après audit",
      "Validation préalable par l’équipe · aucune position garantie",
    ],
    annualLabel: "GESTION · 12 MOIS",
    managementTitle: "Gestion annuelle de la fiche",
    managementDescription:
      "Un accompagnement régulier pour garder votre profil à jour tout au long de l’année.",
    managementFeatures: [
      "Gestion de la fiche pendant 12 mois",
      "Actualisation régulière des photos, actualités et offres",
      "Réponses professionnelles aux avis",
      "Suivi de la visibilité, des appels et des demandes d’itinéraire",
    ],
    annualPayment: "Facturation annuelle",
    strategyCta: "Configurer la stratégie",
    managementCta: "Choisir la gestion annuelle",
    detailCta: "Détails du service",
    disclaimer:
      "Les résultats dépendent notamment de la concurrence, de la zone et de l’évolution des algorithmes. Aucun classement précis n’est promis.",
  },
  en: {
    eyebrow: "GOOGLE BUSINESS PROFILE · LOCAL SEO",
    title: "Help more customers discover your business",
    accent: "locally.",
    intro:
      "We optimise your Google Business Profile and work on visibility for local searches agreed with you. Google rankings are never guaranteed.",
    visualLabel: "LOCAL VISIBILITY",
    visualTitle: "A clear, complete and useful profile",
    visualBody: "Consistent information that helps customers find and contact your business.",
    visualPoints: ["Profile & information", "Services & content", "Performance indicators"],
    offerLabel: "STRATEGY · 1 YEAR",
    strategyTitle: "Google Maps visibility strategy",
    strategyDescription:
      "An initial audit and action plan tailored to your business, area and competition.",
    strategyFeatures: [
      "Keyword and local competition review",
      "Google Business Profile creation or optimisation",
      "Categories, services, description and visuals",
      "Local strategy and indicators defined after audit",
      "Team review required · no ranking position guaranteed",
    ],
    annualLabel: "MANAGEMENT · 12 MONTHS",
    managementTitle: "Annual profile management",
    managementDescription: "Ongoing support to keep your profile current throughout the year.",
    managementFeatures: [
      "Profile management for 12 months",
      "Regular updates to photos, news and offers",
      "Professional review responses",
      "Visibility, calls and direction-request tracking",
    ],
    annualPayment: "Annual billing",
    strategyCta: "Configure the strategy",
    managementCta: "Choose annual management",
    detailCta: "Service details",
    disclaimer:
      "Results depend on competition, location and changes to search algorithms. No specific ranking is promised.",
  },
  vi: {
    eyebrow: "GOOGLE BUSINESS PROFILE · SEO ĐỊA PHƯƠNG",
    title: "Giúp khách hàng biết đến doanh nghiệp của bạn",
    accent: "tại địa phương.",
    intro:
      "Chúng tôi tối ưu Google Business Profile và cải thiện khả năng hiển thị cho các tìm kiếm địa phương đã thống nhất. Không bảo đảm thứ hạng Google.",
    visualLabel: "HIỂN THỊ ĐỊA PHƯƠNG",
    visualTitle: "Hồ sơ rõ ràng, đầy đủ và hữu ích",
    visualBody: "Thông tin nhất quán giúp khách hàng tìm thấy và liên hệ doanh nghiệp.",
    visualPoints: ["Hồ sơ & thông tin", "Dịch vụ & nội dung", "Chỉ số theo dõi"],
    offerLabel: "CHIẾN LƯỢC · 1 NĂM",
    strategyTitle: "Chiến lược hiển thị Google Maps",
    strategyDescription: "Kiểm toán ban đầu và kế hoạch phù hợp với hoạt động, khu vực và đối thủ.",
    strategyFeatures: [
      "Phân tích từ khóa và cạnh tranh địa phương",
      "Tạo mới hoặc tối ưu Google Business Profile",
      "Danh mục, dịch vụ, mô tả và hình ảnh",
      "Chiến lược địa phương và chỉ số sau kiểm toán",
      "Đội ngũ thẩm định trước · không bảo đảm thứ hạng",
    ],
    annualLabel: "QUẢN LÝ · 12 THÁNG",
    managementTitle: "Quản lý hồ sơ hàng năm",
    managementDescription: "Đồng hành định kỳ để cập nhật hồ sơ trong suốt năm.",
    managementFeatures: [
      "Quản lý hồ sơ trong 12 tháng",
      "Cập nhật hình ảnh, tin tức và ưu đãi định kỳ",
      "Phản hồi đánh giá chuyên nghiệp",
      "Theo dõi hiển thị, cuộc gọi và yêu cầu chỉ đường",
    ],
    annualPayment: "Thanh toán hàng năm",
    strategyCta: "Thiết lập chiến lược",
    managementCta: "Chọn quản lý hàng năm",
    detailCta: "Chi tiết dịch vụ",
    disclaimer:
      "Kết quả phụ thuộc vào cạnh tranh, khu vực và thay đổi thuật toán. Không cam kết thứ hạng cụ thể.",
  },
  ar: {
    eyebrow: "ملف Google Business · تحسين البحث المحلي",
    title: "ساعد المزيد من العملاء على اكتشاف نشاطك",
    accent: "محليًا.",
    intro:
      "نحسّن ملف Google Business Profile ونعمل على الظهور في عمليات البحث المحلية المتفق عليها. لا نضمن ترتيبًا محددًا على Google.",
    visualLabel: "الظهور المحلي",
    visualTitle: "ملف واضح ومتكامل ومفيد",
    visualBody: "معلومات متناسقة تساعد العملاء على العثور على نشاطك والتواصل معه.",
    visualPoints: ["الملف والمعلومات", "الخدمات والمحتوى", "مؤشرات المتابعة"],
    offerLabel: "استراتيجية · سنة",
    strategyTitle: "استراتيجية الظهور على Google Maps",
    strategyDescription: "تدقيق أولي وخطة عمل تناسب نشاطك ومنطقتك والمنافسة.",
    strategyFeatures: [
      "تحليل الكلمات المفتاحية والمنافسة المحلية",
      "إنشاء ملف Google Business Profile أو تحسينه",
      "الفئات والخدمات والوصف والصور",
      "استراتيجية محلية ومؤشرات بعد التدقيق",
      "مراجعة الفريق مسبقًا · لا ضمان لترتيب محدد",
    ],
    annualLabel: "إدارة · 12 شهرًا",
    managementTitle: "إدارة الملف السنوية",
    managementDescription: "متابعة منتظمة للحفاظ على تحديث ملفك طوال العام.",
    managementFeatures: [
      "إدارة الملف لمدة 12 شهرًا",
      "تحديث الصور والأخبار والعروض بانتظام",
      "الرد المهني على التقييمات",
      "متابعة الظهور والمكالمات وطلبات الاتجاهات",
    ],
    annualPayment: "فوترة سنوية",
    strategyCta: "إعداد الاستراتيجية",
    managementCta: "اختيار الإدارة السنوية",
    detailCta: "تفاصيل الخدمة",
    disclaimer: "تعتمد النتائج على المنافسة والمنطقة وتغييرات الخوارزميات. لا نعد بترتيب محدد.",
  },
  ru: {
    eyebrow: "GOOGLE BUSINESS PROFILE · ЛОКАЛЬНОЕ SEO",
    title: "Помогите клиентам находить ваш бизнес",
    accent: "рядом.",
    intro:
      "Оптимизируем профиль Google Business Profile и работаем над видимостью по согласованным локальным запросам. Позиции Google не гарантируются.",
    visualLabel: "ЛОКАЛЬНАЯ ВИДИМОСТЬ",
    visualTitle: "Понятный, полный и полезный профиль",
    visualBody: "Согласованная информация помогает клиентам найти вас и связаться с компанией.",
    visualPoints: ["Профиль и данные", "Услуги и контент", "Показатели отслеживания"],
    offerLabel: "СТРАТЕГИЯ · 1 ГОД",
    strategyTitle: "Стратегия видимости в Google Maps",
    strategyDescription: "Первичный аудит и план с учётом бизнеса, региона и конкурентов.",
    strategyFeatures: [
      "Анализ ключевых запросов и локальных конкурентов",
      "Создание или оптимизация Google Business Profile",
      "Категории, услуги, описание и изображения",
      "Локальная стратегия и показатели после аудита",
      "Предварительная проверка команды · без гарантии позиции",
    ],
    annualLabel: "ВЕДЕНИЕ · 12 МЕСЯЦЕВ",
    managementTitle: "Годовое ведение профиля",
    managementDescription:
      "Регулярное сопровождение для поддержания актуальности профиля в течение года.",
    managementFeatures: [
      "Ведение профиля в течение 12 месяцев",
      "Регулярное обновление фото, новостей и предложений",
      "Профессиональные ответы на отзывы",
      "Отслеживание видимости, звонков и запросов маршрута",
    ],
    annualPayment: "Оплата за год",
    strategyCta: "Настроить стратегию",
    managementCta: "Выбрать годовое ведение",
    detailCta: "Подробнее об услуге",
    disclaimer:
      "Результаты зависят от конкуренции, региона и изменений алгоритмов. Конкретная позиция не обещается.",
  },
};

export function GoogleMapsShowcase() {
  const { lang, price } = useLang();
  const c = COPY[lang] ?? COPY.fr;

  return (
    <section
      id="maps"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative border-b border-[#EBE5DC] bg-white py-16 text-[#1A1815] sm:py-20"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A67C40]">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-tight tracking-[-0.02em]">
            {c.title} <em className="text-[#A67C40]">{c.accent}</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5C554B] sm:text-base">{c.intro}</p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#EBE5DC] bg-[#171410]">
              <div className="relative aspect-[4/4.2] overflow-hidden">
                <img
                  src={svcMaps}
                  alt={c.visualTitle}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120F0C]/90 via-[#120F0C]/25 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center gap-2 text-[#F2D7B0]">
                  <MapPin className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    {c.visualLabel}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{c.visualTitle}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                    {c.visualBody}
                  </p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-3 bg-[#FAF8F5] p-5 sm:grid-cols-3">
                {c.visualPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-xs text-[#5C554B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A67C40]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <article className="rounded-[1.5rem] border border-[#D1B07A]/70 bg-[#FAF8F5] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A67C40]">
                    {c.offerLabel}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{c.strategyTitle}</h3>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-serif text-3xl">{price(999)}</p>
                  <p className="text-xs text-[#5C554B]">
                    /{" "}
                    {lang === "en"
                      ? "year"
                      : lang === "vi"
                        ? "năm"
                        : lang === "ar"
                          ? "سنة"
                          : lang === "ru"
                            ? "год"
                            : "an"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#5C554B]">{c.strategyDescription}</p>
              <ul className="mt-5 grid gap-3 border-t border-[#EBE5DC] pt-5 sm:grid-cols-2">
                {c.strategyFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-[#3A342D]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A67C40]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/?service=maps&plan=maps_strategy#quote"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1A1815] px-5 text-xs font-semibold text-white transition hover:bg-[#332F2B]"
                >
                  {c.strategyCta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: "maps" }}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#1A1815]/20 px-5 text-xs font-semibold text-[#1A1815] hover:border-[#A67C40]"
                >
                  {c.detailCta}
                </Link>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-[#EBE5DC] bg-white p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A67C40]">
                    {c.annualLabel}
                  </p>
                  <h3 className="mt-1 font-serif text-xl">{c.managementTitle}</h3>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-serif text-2xl">{price(500)}</p>
                  <p className="text-xs text-[#5C554B]">
                    /{" "}
                    {lang === "en"
                      ? "year"
                      : lang === "vi"
                        ? "năm"
                        : lang === "ar"
                          ? "سنة"
                          : lang === "ru"
                            ? "год"
                            : "an"}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5C554B]">
                {c.managementDescription}
              </p>
              <ul className="mt-4 grid gap-2 border-t border-[#F0EBE3] pt-4 sm:grid-cols-2">
                {c.managementFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs leading-relaxed text-[#3A342D]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A67C40]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EBE3] pt-4">
                <span className="text-xs text-[#5C554B]">{c.annualPayment}</span>
                <a
                  href="/?service=maps&plan=maps_annual_management#quote"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A67C40] hover:text-[#1A1815]"
                >
                  {c.managementCta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-[#777066]">
          {c.disclaimer}
        </p>
      </div>
    </section>
  );
}
