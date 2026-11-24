import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Layers,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CONTACT } from "@/lib/content";
import { useLang, type L } from "@/lib/i18n";

export const Route = createFileRoute("/methode")({
  head: () => ({
    meta: [
      { title: "Notre méthode en 4 étapes — XR Agency" },
      {
        name: "description",
        content:
          "Découvrez la méthode XR Agency en 4 étapes claires : Échange & Diagnostic, Stratégie, Production et Suivi & Optimisation, avec livrables concrets à chaque phase.",
      },
      { property: "og:title", content: "Notre méthode — XR Agency" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/methode" }],
  }),
  component: MethodePage,
});

const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

const STAGES = [
  {
    num: "01",
    Icon: Compass,
    title: l("Échange & Diagnostic", "Discovery & Diagnostic", "Khảo sát & Chẩn đoán", "التعارف والتشخيص", "Бриф и диагностика"),
    subtitle: l(
      "Comprendre votre activité, vos clients et votre point de départ réel.",
      "Understanding your business, audience and real starting point.",
      "Hiểu rõ doanh nghiệp, khách hàng và hiện trạng thực tế của bạn.",
      "فهم نشاطك وجمهورك ونقطة انطلاقك الفعلية.",
      "Глубоко изучаем бизнес, аудиторию и текущую точку.",
    ),
    description: l(
      "Avant toute recommandation, nous analysons votre positionnement, votre site actuel, votre visibilité Google et vos priorités commerciales pour éviter les dépenses inutiles.",
      "Before recommending anything, we analyse your positioning, current website, Google presence and commercial priorities so every action serves a real objective.",
      "Trước khi đề xuất giải pháp, chúng tôi đánh giá định vị, website hiện tại, hiển thị Google và mục tiêu kinh doanh của bạn.",
      "قبل تقديم أي توصية، نحلل تموضعك وموقعك الحالي وحضورك على Google وأولوياتك التجارية لتوجيه كل خطوة نحو هدف واضح.",
      "Прежде чем предлагать решения, мы анализируем позиционирование, текущий сайт, видимость в Google и коммерческие приоритеты.",
    ),
    deliverables: [
      l("Compte rendu de cadrage & objectifs prioritaires", "Scoping summary & priority objectives", "Bản tổng hợp phạm vi & mục tiêu ưu tiên", "ملخص تحديد النطاق والأهداف ذات الأولوية", "Бриф и карта приоритетных целей"),
      l("Diagnostic digital 5 piliers (technique, mobile, SEO, conversion)", "5-pillar digital diagnostic (technical, mobile, SEO, conversion)", "Báo cáo chẩn đoán 5 trụ cột", "تشخيص رقمي من 5 محاور", "Диагностика по 5 ключевым направлениям"),
      l("Identification des quick wins et des points bloquants", "Identification of quick wins and friction points", "Xác định điểm nghẽn và cơ hội cải thiện nhanh", "تحديد نقاط التحسين السريع والعوائق", "Выявление узких мест и точек быстрого роста"),
    ],
  },
  {
    num: "02",
    Icon: ClipboardCheck,
    title: l("Stratégie & Architecture", "Strategy & Architecture", "Chiến lược & Kiến trúc", "الاستراتيجية والهيكلة", "Стратегия и архитектура"),
    subtitle: l(
      "Un plan d’action structuré, lisible et validé avant la production.",
      "A clear, documented action plan approved before production starts.",
      "Kế hoạch hành động rõ ràng được thống nhất trước khi sản xuất.",
      "خطة عمل منظمة وواضحة تُعتمد قبل بدء الإنتاج.",
      "Прозрачный план действий, утверждённый до начала производства.",
    ),
    description: l(
      "Nous traduisons le diagnostic en architecture concrète : arborescence des pages, direction artistique, structure éditoriale SEO, calendrier Social Media et devis détaillé sans zone grise.",
      "We turn findings into a concrete blueprint: site architecture, visual direction, SEO structure, Social Media roadmap and an itemised quote with zero hidden items.",
      "Chuyển hóa phân tích thành bản thiết kế cụ thể: cấu trúc trang, định hướng hình ảnh, kế hoạch SEO và báo giá minh bạch.",
      "نحوّل التشخيص إلى مخطط عملي يشمل هيكلة الصفحات، والتوجيه البصري، وخطة المحتوى والسيو وعرض سعر مفصل وواضح.",
      "Превращаем аудит в конкретную архитектуру: структуру страниц, визуальную систему, SEO-план и детализированную смету.",
    ),
    deliverables: [
      l("Proposition détaillée avec périmètre, tarifs EUR et calendrier", "Itemised proposal with scope, EUR pricing and timeline", "Đề xuất chi tiết gồm phạm vi, chi phí EUR và tiến độ", "عرض مفصل يشمل النطاق والأسعار والجدول الزمني", "Детальное предложение с этапами, ценами и сроками"),
      l("Direction créative, arborescence & maquettes clés", "Creative direction, sitemap & key layouts", "Định hướng sáng tạo, sơ đồ trang & bố cục chính", "التوجيه الفني وهيكلة الصفحات والنماذج الأساسية", "Креативная концепция, структура и ключевые макеты"),
      l("Plan d’activation SEO / Google Maps / Social Media selon l’offre", "SEO / Google Maps / Social activation plan by scope", "Kế hoạch kích hoạt SEO / Maps / Social phù hợp", "خطة تفعيل SEO وخرائط Google والتواصل حسب الباقة", "План запуска SEO / Maps / соцсетей по выбранному пакету"),
    ],
  },
  {
    num: "03",
    Icon: Layers,
    title: l("Production & Intégration", "Production & Execution", "Sản xuất & Triển khai", "الإنتاج والتنفيذ", "Производство и внедрение"),
    subtitle: l(
      "Exécution soignée, mobile-first et points d’étape réguliers.",
      "Crafted, mobile-first execution with structured milestone reviews.",
      "Triển khai tỉ mỉ, ưu tiên di động với các mốc kiểm duyệt rõ ràng.",
      "تنفيذ متقن بأولوية للجوال مع مراجعات مرحلية منتظمة.",
      "Качественная mobile-first реализация с контрольными точками.",
    ),
    description: l(
      "Nos équipes design, développement, contenu et visibilité avancent de concert. Vous suivez chaque jalon en toute transparence et validez les livrables avant publication.",
      "Our design, engineering, content and visibility specialists work in sync. You review each milestone transparently and approve deliverables before anything goes live.",
      "Đội ngũ thiết kế, lập trình và nội dung phối hợp đồng bộ để bạn kiểm duyệt từng cột mốc minh bạch trước khi ra mắt.",
      "يعمل فريق التصميم والبرمجة والمحتوى بتناغم تام لتتابع كل مرحلة بشفافية وتعتمد المخرجات قبل النشر.",
      "Команды дизайна, разработки и контента работают синхронно — вы видите прогресс на каждом этапе до публикации.",
    ),
    deliverables: [
      l("Développement responsive PC, tablette et mobile (70 % du trafic)", "Responsive desktop, tablet & mobile build", "Phát triển tương thích máy tính, tablet và di động", "تطوير متجاوب بالكامل للحاسوب والجوال", "Адаптивная разработка под ПК, планшет и смартфон"),
      l("Intégration des contenus, formulaires, CRM et tracking convenus", "Content, lead forms, CRM & agreed tracking integration", "Tích hợp nội dung, biểu mẫu, CRM và đo lường", "دمج المحتوى ونماذج التواصل وربط CRM", "Интеграция контента, форм заявок и CRM"),
      l("Recette complète : performance, lisibilité, accessibilité & QA", "Full QA checks: performance, readability & accessibility", "Kiểm thử hiệu năng, hiển thị và trải nghiệm người dùng", "فحص شامل للأداء والوضوح وسهولة الوصول", "Полное QA-тестирование скорости и удобства"),
    ],
  },
  {
    num: "04",
    Icon: TrendingUp,
    title: l("Suivi & Optimisation", "Tracking & Optimisation", "Theo dõi & Tối ưu", "المتابعة والتحسين المستمر", "Сопровождение и рост"),
    subtitle: l(
      "Mesurer ce qui fonctionne et faire évoluer votre dispositif dans la durée.",
      "Measuring real signals and refining your digital ecosystem over time.",
      "Đo lường dữ liệu thực tế và cải tiến liên tục theo thời gian.",
      "قياس الأداء الفعلي وتطوير منظومتك الرقمية باستمرار.",
      "Измеряем реальные показатели и системно развиваем проект.",
    ),
    description: l(
      "La mise en ligne est un point de départ. Selon votre formule (WebCare, SEO, Google Maps ou Social Media), nous assurons le suivi, la maintenance et les ajustements continus.",
      "Launch is only the beginning. Depending on your chosen plan (WebCare, SEO, Google Maps or Social Media), we handle ongoing reporting, care and continuous refinements.",
      "Ra mắt chỉ là bước khởi đầu. Tùy gói dịch vụ, chúng tôi duy trì báo cáo, bảo trì và tối ưu định kỳ.",
      "الإطلاق هو البداية فقط. وفق الباقة المختارة (WebCare أو SEO أو خرائط Google أو التواصل) نواصل المتابعة والتقارير والتحسين.",
      "Запуск — это только начало. В рамках выбранного тарифа мы обеспечиваем поддержку, отчётность и регулярную оптимизацию.",
    ),
    deliverables: [
      l("Mise en ligne sécurisée et remise des accès convenus", "Clean launch & handover of agreed accesses", "Ra mắt an toàn và bàn giao quyền truy cập", "إطلاق آمن وتسليم الصلاحيات المتفق عليها", "Безопасный запуск и передача доступов"),
      l("Accès Espace Client pour suivre vos projets, tâches et documents", "Client Portal access for projects, tasks & documents", "Quyền truy cập Cổng Khách Hàng theo dõi dự án", "حساب بوابة العملاء لمتابعة المشاريع والمستندات", "Доступ в клиентский портал для контроля этапов"),
      l("Reporting clair & recommandations d’amélioration continue", "Clear reporting & ongoing improvement recommendations", "Báo cáo minh bạch & đề xuất tối ưu liên tục", "تقارير واضحة وتوصيات للتحسين المستمر", "Прозрачные отчёты и план дальнейших улучшений"),
    ],
  },
];

function MethodePage() {
  const { lang, t } = useLang();
  const isRtl = lang === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#171613]">
      <Nav />
      <main className="pt-28">
        {/* Editorial Hero */}
        <section className="border-b border-[#171613]/10 bg-[#F7F4EE] pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                  {t(l("NOTRE MÉTHODE · 4 ÉTAPES", "OUR METHOD · 4 STAGES", "PHƯƠNG PHÁP 4 BƯỚC", "منهجيتنا في 4 مراحل", "НАШ МЕТОД · 4 ЭТАПА"))}
                </span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.04] tracking-[-0.025em] text-[#171613] sm:text-6xl">
                {t(l("Un processus clair, transparent et", "A clear, transparent and", "Quy trình rõ ràng, minh bạch và", "عملية واضحة وشفافة و", "Понятный, прозрачный и"))}{" "}
                <em className="italic font-normal text-[#9E7F5A]">
                  {t(l("orienté résultats.", "results-driven process.", "hướng tới kết quả.", "موجهة نحو النتائج.", "нацеленный на результат процесс."))}
                </em>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#57534B] sm:text-base">
                {t(
                  l(
                    "Chaque projet XR Agency suit quatre étapes structurées. À chaque phase, vous savez précisément ce qui est livré, ce qui est validé et comment votre projet avance.",
                    "Every XR Agency engagement follows four structured stages. At each milestone, you know exactly what is delivered, approved and coming next.",
                    "Mỗi dự án tại XR Agency tuân theo 4 bước minh bạch với hạng mục bàn giao cụ thể ở từng giai đoạn.",
                    "يمر كل مشروع لدى XR Agency بأربع مراحل واضحة، لتعرف بدقة ما يتم تسليمه واعتماده في كل خطوة.",
                    "Каждый проект в XR Agency проходит четыре понятных этапа с конкретными результатами на каждом шаге.",
                  ),
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 4 Detailed Stages with Client Deliverables */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl space-y-6 px-5 sm:px-8">
            {STAGES.map(({ num, Icon, title, subtitle, description, deliverables }, idx) => {
              const isDark = idx % 2 === 1;
              return (
                <article
                  key={num}
                  className={`rounded-3xl border p-6 sm:p-10 ${
                    isDark
                      ? "border-[#9E7F5A]/30 bg-[#171613] text-[#F7F4EE]"
                      : "border-[#171613]/12 bg-white text-[#171613] shadow-sm"
                  }`}
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-xl ${
                            isDark
                              ? "bg-[#D8BC94] text-[#171613]"
                              : "bg-[#171613] text-[#D8BC94]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                            isDark ? "text-[#D8BC94]" : "text-[#7D6445]"
                          }`}
                        >
                          {t(l("ÉTAPE", "STAGE", "BƯỚC", "المرحلة", "ЭТАП"))} {num}
                        </span>
                      </div>
                      <h2 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">
                        {t(title)}
                      </h2>
                      <p
                        className={`mt-2 text-base font-medium ${
                          isDark ? "text-[#D8BC94]" : "text-[#7D6445]"
                        }`}
                      >
                        {t(subtitle)}
                      </p>
                      <p
                        className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                          isDark ? "text-[#F7F4EE]/75" : "text-[#57534B]"
                        }`}
                      >
                        {t(description)}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl border p-5 lg:col-span-5 ${
                        isDark
                          ? "border-[#F7F4EE]/12 bg-[#23201B]"
                          : "border-[#171613]/10 bg-[#FAF8F4]"
                      }`}
                    >
                      <p
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
                          isDark ? "text-[#D8BC94]" : "text-[#7D6445]"
                        }`}
                      >
                        {t(l("LIVRABLES CLIENT", "CLIENT DELIVERABLES", "HẠNG MỤC BÀN GIAO", "مخرجات المرحلة", "РЕЗУЛЬТАТЫ ЭТАПА"))}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {deliverables.map((item, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2.5 text-sm leading-snug ${
                              isDark ? "text-[#F7F4EE]/90" : "text-[#2E2B26]"
                            }`}
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isDark ? "text-[#D8BC94]" : "text-[#9E7F5A]"
                              }`}
                            />
                            <span>{t(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#171613]/10 bg-[#EEE9E0] py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-medium text-[#171613] sm:text-4xl">
                {t(l("Prêt à lancer l’étape 01 ensemble ?", "Ready to start Stage 01 together?", "Sẵn sàng bắt đầu Bước 01 cùng chúng tôi?", "هل أنت مستعد لبدء المرحلة 01 معاً؟", "Готовы начать с Этапа 01?"))}
              </h2>
              <p className="mt-2.5 text-sm text-[#57534B]">
                {t(l("Configurez votre projet en 3 étapes ou démarrez directement par un échange sur WhatsApp.", "Configure your project in 3 steps or start directly with a WhatsApp conversation.", "Cấu hình dự án trong 3 bước hoặc trao đổi trực tiếp qua WhatsApp.", "هيّئ مشروعك في 3 خطوات أو ابدأ محادثة مباشرة عبر واتساب.", "Соберите предварительную смету за 3 шага или напишите нам в WhatsApp."))}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#quote"
                className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-6 py-3.5 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
              >
                {t(l("Configurer mon devis", "Build my quote", "Tạo báo giá", "إنشاء عرض السعر", "Составить смету"))}
                <ArrowRight className="h-4 w-4 text-[#D8BC94]" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#171613]/20 bg-white px-6 py-3.5 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
              >
                <MessageCircle className="h-4 w-4 text-[#7D6445]" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
