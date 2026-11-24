import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useLang, type Lang, type L } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { XR_PHOTOS } from "@/lib/photography";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO Google — Stratégie & Référencement Naturel | XR Agency" },
      {
        name: "description",
        content:
          "Programmes SEO mensuels et annuels pour positionner durablement votre marque sur Google : audit technique, mots-clés, contenu éditorial et reporting.",
      },
      { property: "og:title", content: "SEO & Référencement Naturel — XR Agency" },
      {
        property: "og:description",
        content: "Faites de Google un levier durable de visibilité et d'acquisition qualifiée.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/services/seo" }],
  }),
  component: SEOPage,
});

type Copy = L;
type Plan = {
  name: Copy;
  priceEur: number;
  period: Copy;
  audience: Copy;
  features: Copy[];
  popular?: boolean;
  annual?: boolean;
};

const c = (fr: string, en: string, vi: string, ar: string, ru: string): Copy => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

const monthly: Plan[] = [
  {
    name: c("SEO Foundation", "SEO Foundation", "SEO Foundation", "SEO Foundation", "SEO Foundation"),
    priceEur: 299,
    period: c("/ mois", "/ month", "/ tháng", "/ شهر", "/ мес"),
    audience: c(
      "Les fondations solides pour commencer à gagner en visibilité.",
      "A solid SEO foundation for businesses ready to become visible.",
      "Nền tảng SEO vững chắc để bắt đầu tăng khả năng hiển thị.",
      "الأساس المتين للبدء في تعزيز الظهور الرقمي.",
      "Надёжный фундамент для уверенного роста видимости в поиске.",
    ),
    features: [
      c("Audit SEO complet initial", "Full initial SEO audit", "Audit SEO tổng thể ban đầu", "تدقيق شامل أولي للـ SEO", "Полный первоначальный SEO-аудит"),
      c("Audit technique & indexation", "Technical & indexing audit", "Audit kỹ thuật & lập chỉ mục", "تدقيق تقني وفهرسة", "Технический аудит и индексация"),
      c("Recherche de mots-clés", "Keyword research", "Nghiên cứu từ khóa", "بحث الكلمات المفتاحية", "Подбор ключевых слов"),
      c("Analyse des concurrents", "Competitor analysis", "Phân tích đối thủ", "تحليل المنافسين", "Анализ конкурентов"),
      c("Mapping des mots-clés", "Keyword mapping", "Lập bản đồ từ khóa", "توزيع الكلمات المفتاحية", "Карта ключевых запросов"),
      c("Optimisation on-page", "On-page optimisation", "Tối ưu on-page", "تحسين الصفحات الداخلية", "Внутренняя оптимизация"),
      c("Métadonnées & structure Hn", "Metadata & heading structure", "Metadata & cấu trúc heading", "البيانات الوصفية وهيكل العناوين", "Метаданные и структура заголовков"),
      c("Maillage interne", "Internal linking", "Liên kết nội bộ", "الربط الداخلي", "Перелинковка"),
      c("Search Console & indexation", "Search Console & indexing", "Search Console & indexation", "إعداد Search Console", "Настройка Search Console"),
      c("Rapport mensuel", "Monthly report", "Báo cáo hàng tháng", "تقرير شهري", "Ежемесячный отчёт"),
    ],
  },
  {
    name: c("SEO Growth", "SEO Growth", "SEO Growth", "SEO Growth", "SEO Growth"),
    priceEur: 499,
    period: c("/ mois", "/ month", "/ tháng", "/ شهر", "/ мес"),
    popular: true,
    audience: c(
      "Notre formule la plus choisie pour développer un trafic qualifié et régulier.",
      "Our most chosen plan for steady qualified traffic and business enquiries.",
      "Gói được chọn nhiều nhất để tăng traffic chất lượng và lead.",
      "باقتنا الأكثر اختياراً لجلب حركة مرور مؤهلة وفرص أعمال.",
      "Наш самый популярный тариф для целевого трафика и заявок.",
    ),
    features: [
      c("Tout SEO Foundation", "Everything in SEO Foundation", "Tất cả tính năng SEO Foundation", "كل ما في باقة Foundation", "Всё из тарифа Foundation"),
      c("Recherche de mots-clés avancée", "Advanced keyword research", "Nghiên cứu từ khóa nâng cao", "بحث متقدم للكلمات المفتاحية", "Углублённый сбор семантики"),
      c("Analyse concurrentielle avancée", "Advanced competitor analysis", "Phân tích đối thủ nâng cao", "تحليل تنافسي متقدم", "Глубокий анализ конкурентов"),
      c("Stratégie éditoriale mensuelle", "Monthly content strategy", "Chiến lược nội dung hàng tháng", "استراتيجية محتوى شهرية", "Ежемесячная контент-стратегия"),
      c("Jusqu'à 4 contenus SEO / mois", "Up to 4 SEO content assets / month", "Tối đa 4 nội dung SEO / tháng", "حتى 4 مقالات محسّنة شهرياً", "До 4 SEO-материалов в месяц"),
      c("Optimisation des pages commerciales", "Commercial page optimisation", "Tối ưu trang thương mại", "تحسين الصفحات التجارية", "Оптимизация коммерческих страниц"),
      c("SEO local & Google Business Profile", "Local SEO & Google Business Profile", "Local SEO & Google Business Profile", "سيو محلي وملف Google التجاري", "Локальное SEO и профиль Google"),
      c("Stratégie Google Maps", "Google Maps strategy", "Chiến lược Google Maps", "استراتيجية خرائط Google", "Стратегия для Google Maps"),
      c("Stratégie d'autorité & backlinks", "Authority & backlink strategy", "Chiến lược authority & backlink", "استراتيجية بناء الروابط والسلطة", "Стратегия авторитетности и ссылок"),
      c("Schema & optimisation technique", "Schema & technical optimisation", "Schema & tối ưu kỹ thuật", "بيانات Schema وتحسين تقني", "Микроразметка Schema и технические правки"),
      c("Analyse trafic, positions & conversions", "Traffic, rankings & conversion analysis", "Phân tích traffic, rankings & conversion", "تحليل الزيارات والترتيب والتحويلات", "Анализ трафика, позиций и конверсий"),
      c("Point stratégique mensuel", "Monthly strategy call", "Buổi chiến lược hàng tháng", "جلسة استراتيجية شهرية", "Ежемесячная стратегическая сессия"),
    ],
  },
  {
    name: c("SEO Domination", "SEO Domination", "SEO Domination", "SEO Domination", "SEO Domination"),
    priceEur: 699,
    period: c("/ mois", "/ month", "/ tháng", "/ شهر", "/ мес"),
    audience: c(
      "Pour les marchés compétitifs où Google est un canal prioritaire d’acquisition.",
      "For competitive markets where Google visibility directly drives commercial growth.",
      "Dành cho thị trường cạnh tranh nơi Google tác động trực tiếp đến doanh thu.",
      "للأسواق التنافسية حيث يرتبط ظهور Google مباشرة بنمو الأعمال.",
      "Для конкурентных рынков, где позиции в Google напрямую влияют на продажи.",
    ),
    features: [
      c("Tout SEO Growth", "Everything in SEO Growth", "Tất cả tính năng SEO Growth", "كل ما في باقة Growth", "Всё из тарифа Growth"),
      c("SEO technique avancé", "Advanced technical SEO", "SEO kỹ thuật nâng cao", "سيو تقني متقدم", "Продвинутое техническое SEO"),
      c("Jusqu'à 8 contenus SEO / mois", "Up to 8 SEO content assets / month", "Tối đa 8 nội dung SEO / tháng", "حتى 8 مقالات محسّنة شهرياً", "До 8 SEO-материалов в месяц"),
      c("Landing pages commerciales avancées", "Advanced commercial landing pages", "Landing pages thương mại nâng cao", "صفحات هبوط تجارية متقدمة", "Оптимизация целевых страниц"),
      c("Google Maps & Local SEO avancé", "Advanced Google Maps & Local SEO", "Google Maps & Local SEO nâng cao", "خرائط Google وسيو محلي متقدم", "Продвинутое продвижение на картах"),
      c("Campagne d'autorité & backlinks", "Authority & backlink campaign", "Chiến dịch authority & backlink", "حملة روابط خلفية وسلطة", "Кампания по наращиванию ссылок"),
      c("Backlink intelligence concurrentielle", "Competitor backlink intelligence", "Phân tích backlink đối thủ", "تحليل روابط المنافسين", "Анализ ссылочной массы конкурентов"),
      c("Content gap & SERP gap", "Content gap & SERP gap", "Content gap & SERP gap", "تحليل فجوات المحتوى", "Анализ упущенных тем и позиций"),
      c("SEO international & multi-localisation", "International & multi-location SEO", "SEO quốc tế & đa địa điểm", "سيو دولي ومتعدد المواقع", "Международное и региональное SEO"),
      c("Optimisation avancée de conversion", "Advanced conversion optimisation", "Tối ưu chuyển đổi nâng cao", "تحسين متقدم لمعدل التحويل", "Углублённая оптимизация конверсии"),
      c("Suivi hebdomadaire", "Weekly ranking monitoring", "Theo dõi ranking hàng tuần", "متابعة أسبوعية للمراكز", "Еженедельный мониторинг позиций"),
      c("Stratège SEO dédié", "Dedicated SEO strategist", "SEO strategist riêng", "خبير سيو مخصص", "Персональный SEO-стратег"),
      c("Support prioritaire", "Priority support", "Hỗ trợ ưu tiên", "دعم ذو أولوية", "Приоритетная поддержка"),
    ],
  },
];

const annual: Plan[] = [
  {
    name: c("SEO Accelerator", "SEO Accelerator", "SEO Accelerator", "SEO Accelerator", "SEO Accelerator"),
    priceEur: 1699,
    period: c("/ an", "/ year", "/ năm", "/ سنة", "/ год"),
    annual: true,
    audience: c(
      "12 mois pour construire un véritable actif SEO et capitaliser sur chaque mois précédent.",
      "12 months to build a compounding organic acquisition asset.",
      "12 tháng để xây dựng tài sản acquisition organic tăng trưởng theo thời gian.",
      "12 شهراً لبناء أصل اكتساب عضوي يتراكم باستمرار.",
      "12 месяцев для создания стабильного актива органического трафика.",
    ),
    features: [
      c("Tout le système SEO Growth", "Everything in the SEO Growth system", "Toàn bộ hệ thống SEO Growth", "نظام SEO Growth بالكامل", "Вся система тарифа Growth"),
      c("5 contenus SEO / mois", "5 SEO content assets / month", "5 nội dung SEO / tháng", "5 مقالات محسّنة شهرياً", "5 SEO-материалов в месяц"),
      c("SEO local + Google Maps", "Local SEO + Google Maps", "Local SEO + Google Maps", "سيو محلي + خرائط Google", "Локальное SEO + Google Maps"),
      c("Stratégie d'autorité & backlinks", "Authority & backlink strategy", "Chiến lược authority & backlink", "استراتيجية السلطة والروابط", "Стратегия авторитетности и ссылок"),
      c("Optimisation conversion", "Conversion optimisation", "Tối ưu chuyển đổi", "تحسين معدل التحويل", "Оптимизация конверсии"),
      c("Reporting & stratégie mensuels", "Monthly reporting & strategy", "Báo cáo & chiến lược hàng tháng", "تقارير واستراتيجية شهرية", "Ежемесячные отчёты и стратегия"),
      c("Audit SEO approfondi trimestriel", "Quarterly deep-dive SEO audit", "Audit SEO chuyên sâu hàng quý", "تدقيق فصلي معمق", "Квартальный глубокий аудит"),
      c("Roadmap SEO annuelle", "Annual SEO roadmap", "Roadmap SEO hàng năm", "خارطة طريق سنوية للـ SEO", "Годовая дорожная карта SEO"),
      c("Intelligence concurrentielle avancée", "Advanced competitor intelligence", "Competitive intelligence nâng cao", "تحليل تنافسي متقدم", "Глубокая конкурентная разведка"),
      c("Stratège SEO dédié", "Dedicated SEO strategist", "SEO strategist riêng", "خبير سيو مخصص", "Выделенный SEO-стратег"),
      c("Économie vs Growth mensuel", "Savings vs monthly Growth", "Tiết kiệm so với Growth hàng tháng", "توفير مقارنة بالاشتراك الشهري", "Выгода по сравнению с помесячной оплатой"),
    ],
  },
  {
    name: c("SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual"),
    priceEur: 3299,
    period: c("/ an", "/ year", "/ năm", "/ سنة", "/ год"),
    annual: true,
    audience: c(
      "Notre programme annuel le plus complet pour faire de Google un canal stratégique.",
      "Our most complete annual programme for turning Google into a strategic channel.",
      "Chương trình hàng năm toàn diện nhất để biến Google thành kênh chiến lược.",
      "برنامجنا السنوي الأكثر اكتمالاً لتحويل Google إلى قناة اكتساب استراتيجية.",
      "Наша самая полная годовая программа для превращения Google в стратегический канал.",
    ),
    features: [
      c("Tout SEO Accelerator", "Everything in SEO Accelerator", "Tất cả tính năng SEO Accelerator", "كل ما في باقة Accelerator", "Всё из тарифа Accelerator"),
      c("Jusqu'à 10 contenus SEO / mois", "Up to 10 SEO content assets / month", "Tối đa 10 nội dung SEO / tháng", "حتى 10 مقالات شهرياً", "До 10 SEO-материалов в месяц"),
      c("SEO international & multi-location", "International & multi-location SEO", "SEO quốc tế & đa địa điểm", "سيو دولي ومتعدد الفروع", "Международное и многорегиональное SEO"),
      c("Gestion Google Business Profile", "Google Business Profile management", "Quản lý Google Business Profile", "إدارة الملف التجاري لـ Google", "Управление профилем компании Google"),
      c("Backlink & authority premium", "Premium backlink & authority", "Backlink & authority premium", "بناء روابط متميزة وسلطة عالية", "Премиальные ссылки и авторитет"),
      c("Digital PR opportunities", "Digital PR opportunities", "Cơ hội Digital PR", "فرص العلاقات العامة الرقمية", "Возможности Digital PR"),
      c("Competitor backlink intelligence", "Competitor backlink intelligence", "Competitive backlink intelligence", "تحليل روابط المنافسين", "Разведка ссылок конкурентов"),
      c("Content gap & SERP gap", "Content gap & SERP gap", "Content gap & SERP gap", "تحليل فجوات المحتوى", "Анализ упущенных тем"),
      c("Suivi hebdomadaire positions & performance", "Weekly rankings & performance monitoring", "Theo dõi ranking & performance hàng tuần", "متابعة أسبوعية للأداء", "Еженедельный аудит позиций"),
      c("Revue stratégique trimestrielle", "Quarterly strategy review", "Review chiến lược hàng quý", "مراجعة استراتيجية فصلية", "Квартальный стратегический обзор"),
      c("Consulting stratégique prioritaire", "Priority strategic consulting", "Tư vấn chiến lược ưu tiên", "استشارات استراتيجية بأولوية", "Приоритетный консалтинг"),
      c("Économie vs Domination mensuel", "Savings vs monthly Domination", "Tiết kiệm so với Domination hàng tháng", "توفير مقارنة بالاشتراك الشهري", "Выгода по сравнению с помесячной оплатой"),
    ],
  },
];

function CTA({
  children,
  href = "/#quote",
  secondary = false,
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold transition-all ${
        secondary
          ? "border border-[#171613]/20 bg-white text-[#171613] hover:border-[#9E7F5A]"
          : "bg-[#171613] text-[#F7F4EE] shadow-sm hover:-translate-y-0.5 hover:bg-[#2A2823]"
      }`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function PlanCard({ plan, t, lang }: { plan: Plan; t: (v: Copy) => string; lang: Lang }) {
  const { price } = useLang();
  const isFeatured = Boolean(plan.popular);
  const waMsg = {
    fr: `Bonjour XR Agency, je souhaite échanger sur la formule ${t(plan.name)} (${plan.priceEur} € ${t(plan.period)}).`,
    en: `Hello XR Agency, I would like to discuss the ${t(plan.name)} plan (€${plan.priceEur} ${t(plan.period)}).`,
    vi: `Xin chào XR Agency, tôi muốn trao đổi về gói ${t(plan.name)} (${plan.priceEur} € ${t(plan.period)}).`,
    ar: `مرحبًا XR Agency، أود مناقشة باقة ${t(plan.name)} (${plan.priceEur} € ${t(plan.period)}).`,
    ru: `Здравствуйте, XR Agency! Хочу обсудить тариф ${t(plan.name)} (${plan.priceEur} € ${t(plan.period)}).`,
  }[lang];

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-8 transition ${
        isFeatured
          ? "border-2 border-[#12110E] bg-white text-[#12110E] shadow-xl ring-1 ring-black/5"
          : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 start-6 rounded-full bg-[#12110E] px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {t(c("Le plus choisi", "Most chosen", "Phổ biến nhất", "الأكثر اختياراً", "Самый популярный"))}
        </div>
      )}
      {plan.annual && (
        <div className="mb-3 inline-flex w-fit rounded-full border border-[#12110E]/15 bg-[#12110E]/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12110E]">
          {t(c("Programme annuel · 12 mois", "Annual programme · 12 months", "Chương trình 12 tháng", "برنامج سنوي · 12 شهراً", "Годовая программа · 12 мес."))}
        </div>
      )}
      <h3 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl text-[#12110E]">{t(plan.name)}</h3>
      <p className="mt-2.5 min-h-[48px] text-sm leading-6 text-[#52504A]">
        {t(plan.audience)}
      </p>
      <div className="mt-5 flex items-baseline gap-1.5 border-y border-[#EBEBE6] py-5">
        <span className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl text-[#12110E]">
          {price(plan.priceEur)}
        </span>
        <span className="text-sm text-[#52504A]">
          {t(plan.period)}
        </span>
      </div>
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm leading-5 text-[#2B2925]"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
            />
            <span>{t(feature)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 space-y-2.5">
        <AddToCartBtn
          item={{
            serviceId: "seo",
            serviceName: "SEO Google",
            planName: t(plan.name),
            priceEur: plan.priceEur,
            period: plan.annual ? "year" : "month",
            periodLabel: t(plan.period),
          }}
          popular={isFeatured}
        />
        <a
          href={`${CONTACT.whatsapp}?text=${encodeURIComponent(waMsg)}`}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-2.5 text-xs font-semibold text-[#12110E] transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
          {t(c("Échanger sur WhatsApp", "Chat on WhatsApp", "Trao đổi WhatsApp", "تواصل عبر واتساب", "Обсудить в WhatsApp"))}
        </a>
      </div>
    </article>
  );
}

function SEOPage() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faq: [Copy, Copy][] = [
    [
      c(
        "Combien de temps faut-il pour observer des progrès SEO ?",
        "How long does SEO take to show measurable progress?",
        "Bao lâu để thấy tiến bộ SEO?",
        "كم من الوقت يستغرق ظهور نتائج تحسين محركات البحث؟",
        "Сколько времени требуется для первых результатов SEO?",
      ),
      c(
        "Le SEO est un travail cumulatif. Les optimisations techniques et on-page posent des bases rapides, puis le contenu éditorial et l'autorité renforcent progressivement votre visibilité sur Google.",
        "SEO compounds over time. Technical and on-page improvements establish solid foundations early, then editorial content and authority steadily build your Google visibility.",
        "SEO tích lũy theo thời gian. Tối ưu kỹ thuật và on-page đặt nền tảng sớm, sau đó nội dung và uy tín giúp tăng trưởng bền vững.",
        "نتائج SEO تراكمية. تضع التحسينات التقنية والداخلية أساساً متيناً، ثم يعزز المحتوى والسلطة ظهورك تدريجياً على Google.",
        "Эффект SEO накопительный. Технические и внутренние правки закладывают фундамент, а контент и авторитет планомерно усиливают видимость в Google.",
      ),
    ],
    [
      c(
        "Pouvez-vous garantir la première position sur Google ?",
        "Can you guarantee the #1 ranking on Google?",
        "Bạn có thể đảm bảo vị trí #1 Google không?",
        "هل تضمنون المركز الأول على Google؟",
        "Гарантируете ли вы первую строчку в Google?",
      ),
      c(
        "Non. Aucune agence sérieuse ne peut garantir une position Google précise, car les algorithmes appartiennent à Google. Nous nous engageons sur une méthodologie rigoureuse, des livrables documentés et un reporting mensuel transparent.",
        "No. No serious agency can guarantee a specific Google ranking because search algorithms are controlled by Google. We commit to rigorous execution, documented deliverables and transparent monthly reporting.",
        "Không. Không agency nghiêm túc nào có thể đảm bảo vị trí Google cố định. Chúng tôi cam kết phương pháp bài bản, hạng mục rõ ràng và báo cáo minh bạch hàng tháng.",
        "لا. لا يمكن لأي وكالة جادة ضمان ترتيب محدد على Google لأن الخوارزميات تخضع لـ Google وحدها. نلتزم بمنهجية دقيقة وتسليمات موثقة وتقارير شهرية شفافة.",
        "Нет. Ни одно добросовестное агентство не может гарантировать точную позицию в Google. Мы гарантируем системную работу, документированные этапы и прозрачную отчётность.",
      ),
    ],
    [
      c(
        "Pourquoi choisir un programme annuel ?",
        "Why choose an annual SEO programme?",
        "Tại sao nên chọn gói hàng năm?",
        "لماذا تختار برنامجاً سنوياً؟",
        "Почему стоит выбрать годовую программу?",
      ),
      c(
        "Parce que le référencement naturel capitalise dans la durée. 12 mois permettent de déployer une feuille de route cohérente combinant technique, contenus, autorité et suivi des conversions.",
        "Because organic search compounds over time. A 12-month roadmap lets technical fixes, content assets, authority signals and conversion improvements reinforce each other.",
        "Vì SEO tích lũy theo thời gian. Lộ trình 12 tháng giúp kỹ thuật, nội dung, độ uy tín và tỷ lệ chuyển đổi hỗ trợ lẫn nhau.",
        "لأن السيو يتراكم أثره بمرور الوقت. تتيح خطة 12 شهراً تكامل الجانب التقني والمحتوى والسلطة وتحسين التحويلات.",
        "Потому что органический рост работает по принципу сложного процента: за 12 месяцев техника, контент и авторитет взаимно усиливают друг друга.",
      ),
    ],
    [
      c(
        "Comment le SEO Google et Google Maps se complètent-ils ?",
        "How do Google SEO and Google Maps complement each other?",
        "SEO Google và Google Maps bổ trợ nhau như thế nào?",
        "كيف يتكامل تحسين محركات البحث SEO وخرائط Google؟",
        "Как SEO и Google Maps дополняют друг друга?",
      ),
      c(
        "Google Maps capte les recherches locales à proximité immédiate (établissements, hôtels, restaurants, cabinets), tandis que le SEO positionne les pages de votre site sur des requêtes nationales ou internationales plus larges.",
        "Google Maps captures immediate local intent (venues, hotels, restaurants, practices), while website SEO positions your pages across broader regional, national and international searches.",
        "Google Maps nắm bắt nhu cầu tìm kiếm địa phương lân cận, trong khi SEO đưa các trang website tiếp cận lượng tìm kiếm rộng hơn trên toàn quốc và quốc tế.",
        "تجذب خرائط Google الباحثين المحليين القريبين من منشأتك، بينما يرسّخ SEO حضور صفحات موقعك في عمليات البحث الأوسع وطنياً ودولياً.",
        "Google Maps охватывает локальные запросы рядом с вашим бизнесом, а SEO продвигает страницы сайта по широким региональным и международным запросам.",
      ),
    ],
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#171613]">
      <Nav />
      <main>
        {/* Editorial Hero */}
        <section className="border-b border-[#171613]/10 bg-[#F7F4EE] pb-16 pt-32 sm:pb-24 sm:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
                  {t(c("SEO GOOGLE · RÉFÉRENCEMENT NATUREL", "GOOGLE SEO · ORGANIC SEARCH", "SEO GOOGLE · TÌM KIẾM TỰ NHIÊN", "SEO GOOGLE · البحث العضوي", "SEO GOOGLE · ОРГАНИЧЕСКИЙ ПОИСК"))}
                </span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.04] tracking-[-0.025em] text-[#171613] sm:text-6xl">
                {t(
                  c(
                    "Gagnez en visibilité durable sur Google.",
                    "Build lasting organic visibility on Google.",
                    "Tăng khả năng hiển thị bền vững trên Google.",
                    "حقق ظهوراً عضوياً مستداماً على Google.",
                    "Выстраивайте устойчивую видимость в Google.",
                  ),
                )}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#57534B] sm:text-base">
                {t(
                  c(
                    "Audit technique, stratégie de mots-clés, contenu éditorial et autorité : une méthode transparente pour attirer un trafic qualifié, sans jamais promettre de classement garanti.",
                    "Technical SEO, keyword strategy, editorial content and domain authority: a transparent approach to attract qualified traffic, with honest reporting and zero artificial guarantees.",
                    "Audit kỹ thuật, chiến lược từ khóa, nội dung biên tập và độ uy tín: phương pháp minh bạch để thu hút lưu lượng chất lượng mà không hứa hẹn thứ hạng ảo.",
                    "تدقيق تقني، استراتيجية كلمات مفتاحية، محتوى تحريري وموثوقية: نهج شفاف لجذب زيارات مؤهلة دون وعود وهمية بمراكز مضمونة.",
                    "Технический аудит, семантика, экспертный контент и авторитет домена: прозрачный подход к привлечению целевого трафика без фиктивных гарантий позиций.",
                  ),
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="#plans">
                  {t(c("Voir les formules", "Explore plans", "Xem các gói", "عرض الباقات", "Смотреть тарифы"))}
                </CTA>
                <CTA href="/#audit" secondary>
                  {t(c("Lancer le diagnostic gratuit", "Run free diagnostic", "Chẩn đoán miễn phí", "ابدأ التشخيص المجاني", "Бесплатная диагностика"))}
                </CTA>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#57534B]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#9E7F5A]" />
                  {t(c("Reporting mensuel documenté", "Documented monthly reporting", "Báo cáo minh bạch hàng tháng", "تقارير شهرية موثقة", "Прозрачная ежемесячная отчётность"))}
                </span>
                <span>•</span>
                <span>
                  {t(c("Technique + Contenu + Autorité", "Technical + Content + Authority", "Kỹ thuật + Nội dung + Uy tín", "التقنية + المحتوى + السلطة", "Техника + Контент + Авторитет"))}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-[2rem] border border-[#171613]/12 bg-[#171613] shadow-[0_24px_60px_rgba(23,22,19,0.12)]">
                <img
                  src={XR_PHOTOS.seo}
                  alt="SEO Google XR Agency"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between pointer-events-none">
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#E5C696] backdrop-blur-md">
                    ✦ PROTOCOLE SÉMANTIQUE & AUDIT
                  </span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-950/60 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-emerald-300 backdrop-blur-md">
                    FLUX INBOUND 24/7
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/75 p-3.5 text-white backdrop-blur-xl">
                  <h4 className="font-serif text-base font-medium text-white">Positionnement Durable & Visibilité Google</h4>
                  <p className="mt-0.5 text-xs text-white/70">Recherche de mots-clés stratégiques, autorité de domaine et croissance naturelle mesurable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="border-b border-[#171613]/10 bg-[#EEE9E0] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-3 sm:px-8">
            <div className="rounded-3xl border border-[#171613]/10 bg-white p-6">
              <Search className="h-5 w-5 text-[#9E7F5A]" />
              <h2 className="mt-4 font-serif text-2xl font-medium text-[#171613]">
                {t(c("Être trouvé", "Be found", "Được tìm thấy", "أن يجدك عملاؤك", "Быть найденным"))}
              </h2>
              <p className="mt-2.5 text-sm leading-6 text-[#57534B]">
                {t(
                  c(
                    "Nous ciblons les recherches intentionnelles qui correspondent réellement à vos offres et à votre clientèle.",
                    "We target high-intent search queries that genuinely match your services and ideal clients.",
                    "Chúng tôi nhắm đến những truy vấn tìm kiếm thực sự khớp với dịch vụ và khách hàng mục tiêu.",
                    "نستهدف عبارات البحث ذات النية الحقيقية والمطابقة لخدماتك وجمهورك المثالي.",
                    "Мы фокусируемся на коммерческих запросах, которые напрямую соответствуют вашим услугам.",
                  ),
                )}
              </p>
            </div>
            <div className="rounded-3xl border border-[#171613]/10 bg-white p-6">
              <TrendingUp className="h-5 w-5 text-[#9E7F5A]" />
              <h2 className="mt-4 font-serif text-2xl font-medium text-[#171613]">
                {t(c("Progresser durablement", "Grow sustainably", "Tăng trưởng bền vững", "نمو مستدام", "Расти устойчиво"))}
              </h2>
              <p className="mt-2.5 text-sm leading-6 text-[#57534B]">
                {t(
                  c(
                    "Santé technique, architecture sémantique, contenus utiles et autorité travaillent ensemble mois après mois.",
                    "Technical health, semantic architecture, helpful content and authority work together month after month.",
                    "Kỹ thuật vững chắc, cấu trúc ngữ nghĩa, nội dung giá trị và uy tín phối hợp đồng bộ từng tháng.",
                    "تتكامل الصحة التقنية والهيكلة الدلالية والمحتوى المفيد والسلطة الرقمية شهراً بعد شهر.",
                    "Техническое качество, структура, полезный контент и авторитет работают в единой системе.",
                  ),
                )}
              </p>
            </div>
            <div className="rounded-3xl border border-[#171613]/10 bg-white p-6">
              <Sparkles className="h-5 w-5 text-[#9E7F5A]" />
              <h2 className="mt-4 font-serif text-2xl font-medium text-[#171613]">
                {t(c("Convertir le trafic", "Convert traffic", "Chuyển đổi lưu lượng", "تحويل الزيارات إلى فرص", "Конвертировать трафик"))}
              </h2>
              <p className="mt-2.5 text-sm leading-6 text-[#57534B]">
                {t(
                  c(
                    "Le SEO ne s'arrête pas au clic : nous soignons la clarté de vos pages commerciales et le parcours vers la demande de devis.",
                    "SEO does not stop at the click: we refine your commercial pages and conversion paths into real enquiries.",
                    "SEO không dừng lại ở lượt nhấp: chúng tôi tối ưu trang dịch vụ và hành trình chuyển đổi thành yêu cầu báo giá.",
                    "لا يتوقف SEO عند النقر: بل نحسّن وضوح صفحاتك التجارية ومسار التحويل نحو طلب العرض.",
                    "SEO не заканчивается кликом: мы усиливаем коммерческие страницы и путь посетителя к заявке.",
                  ),
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Plans */}
        <section id="plans" className="scroll-mt-24 bg-[#F7F4EE] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
                  01 / {t(c("FORMULES MENSUELLES", "MONTHLY PLANS", "GÓI HÀNG THÁNG", "الباقات الشهرية", "ЕЖЕМЕСЯЧНЫЕ ТАРИФЫ"))}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#171613] sm:text-5xl">
                  {t(
                    c(
                      "Choisissez votre rythme d'accompagnement.",
                      "Choose your growth pace.",
                      "Chọn tốc độ tăng trưởng phù hợp.",
                      "اختر وتيرة النمو المناسبة لنشاطك.",
                      "Выберите темп развития.",
                    ),
                  )}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#57534B]">
                {t(
                  c(
                    "Commencez au niveau adapté à votre marché et ajustez l'accompagnement à mesure que vos objectifs évoluent.",
                    "Start at the level that matches your market and scale as your ambitions evolve.",
                    "Bắt đầu ở mức phù hợp với thị trường và mở rộng khi mục tiêu tăng lên.",
                    "ابدأ بالمستوى الملائم لسوقك وطوّر خطتك مع توسع أهدافك.",
                    "Начните с уровня, соответствующего вашему рынку, и масштабируйте программу по мере роста.",
                  ),
                )}
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {monthly.map((plan) => (
                <PlanCard key={plan.name.fr} plan={plan} t={t} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Annual Plans */}
        <section className="border-y border-[#171613]/10 bg-[#EEE9E0] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
                02 / {t(c("PROGRAMMES ANNUELS", "ANNUAL PROGRAMMES", "CHƯƠNG TRÌNH 12 THÁNG", "البرامج السنوية", "ГОДОВЫЕ ПРОГРАММЫ"))}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#171613] sm:text-5xl">
                {t(
                  c(
                    "Construisez un actif SEO sur 12 mois.",
                    "Build a compounding SEO asset over 12 months.",
                    "Xây dựng tài sản SEO trong 12 tháng.",
                    "ابنِ أصلاً عضوياً متراكماً خلال 12 شهراً.",
                    "Создайте устойчивый SEO-актив за 12 месяцев.",
                  ),
                )}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#57534B]">
                {t(
                  c(
                    "Les programmes annuels favorisent la continuité entre optimisation technique, création éditoriale, autorité et conversion.",
                    "Annual programmes maximise continuity across technical health, editorial output, authority and conversion.",
                    "Chương trình hàng năm đảm bảo tính liên tục giữa kỹ thuật, nội dung, uy tín và chuyển đổi.",
                    "تضمن البرامج السنوية استمرارية العمل بين التحسين التقني وإنتاج المحتوى وبناء الموثوقية.",
                    "Годовые программы обеспечивают системную преемственность техники, контента и роста конверсий.",
                  ),
                )}
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {annual.map((plan) => (
                <PlanCard key={plan.name.fr} plan={plan} t={t} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F7F4EE] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D6445]">
                FAQ
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-[#171613] sm:text-4xl">
                {t(c("Questions fréquentes", "Frequently asked questions", "Câu hỏi thường gặp", "الأسئلة الشائعة", "Частые вопросы"))}
              </h2>
            </div>
            <div className="mt-10 divide-y divide-[#171613]/10 overflow-hidden rounded-3xl border border-[#171613]/12 bg-white">
              {faq.map(([question, answer], i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-5 text-start text-sm font-semibold text-[#171613] sm:p-6"
                  >
                    <span>{t(question)}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#7D6445] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-6 text-sm leading-7 text-[#57534B] sm:px-6">
                      {t(answer)}
                    </div>
                  )}
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
