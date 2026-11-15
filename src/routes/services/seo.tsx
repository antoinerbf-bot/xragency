import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, Search, Sparkles, TrendingUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useLang, type Lang, type L } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";
import { ServicePillarDeepBlocks } from "@/components/site/ServicePillarDeepBlocks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO & Domination Google — Stratégie & Référencement Naturel | XR Agency" },
      {
        name: "description",
        content:
          "Programmes SEO mensuels et annuels pour positionner durablement votre marque sur Google : audit technique, mots-clés, netlinking et reporting.",
      },
      { property: "og:title", content: "SEO & Référencement Naturel — XR Agency" },
      {
        property: "og:description",
        content: "Faites de Google votre principal canal d'acquisition organique qualifié.",
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

const c = (fr: string, en: string, vi: string, ar?: string, ru?: string): Copy => ({
  fr,
  en,
  vi,
  ar: ar ?? en,
  ru: ru ?? en,
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
      "Надёжный фундамент для уверенного роста видимости в поиске."
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
      "Notre formule la plus populaire pour générer du trafic qualifié et des leads réguliers.",
      "Our most popular plan for qualified traffic and recurring commercial leads.",
      "Gói phổ biến nhất để tăng traffic chất lượng và lead.",
      "باقتنا الأكثر شعبية لجلب حركة مرور مؤهلة وفرص أعمال.",
      "Наш самый популярный тариф для целевого трафика и лидов."
    ),
    features: [
      c("Tout SEO Foundation", "Everything in SEO Foundation", "Tất cả tính năng SEO Foundation", "كل ما في باقة Foundation", "Всё из тарифа Foundation"),
      c("Recherche de mots-clés avancée", "Advanced keyword research", "Nghiên cứu từ khóa nâng cao", "بحث متقدم للكلمات المفتاحية", "Углублённый сбор семантики"),
      c("Analyse concurrentielle avancée", "Advanced competitor analysis", "Phân tích đối thủ nâng cao", "تحليل تنافسي متقدم", "Глубокий анализ конкурентов"),
      c("Stratégie éditoriale mensuelle", "Monthly content strategy", "Chiến lược nội dung hàng tháng", "استراتيجية محتوى شهرية", "Ежемесячная контент-стратегия"),
      c("Jusqu'à 4 contenus SEO / mois", "Up to 4 SEO content assets / month", "Tối đa 4 nội dung SEO / tháng", "حتى 4 مقالات محسّنة شهرياً", "До 4 SEO-материалов в месяц"),
      c("Optimisation des pages commerciales", "Commercial page optimisation", "Tối ưu trang thương mại", "تحسين الصفحات التجارية", "Оптимизация коммерческих страниц"),
      c("Cocons sémantiques & maillage avancé", "Topic clusters & advanced internal linking", "Cụm chủ đề & liên kết nội bộ nâng cao", "عناقيد دلالية وربط داخلي متقدم", "Семантические кластеры и перелинковка"),
      c("Signaux géo-organiques sur votre site", "On-site geo-organic landing alignment", "Tối ưu tín hiệu địa phương trên website", "إشارات جغرافية عضوية على الموقع", "Гео-семантика посадочных страниц"),
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
      "Pour les marchés très compétitifs où Google est directement lié au chiffre d'affaires.",
      "For competitive markets where Google visibility directly drives revenue.",
      "Dành cho thị trường cạnh tranh nơi Google tác động trực tiếp đến doanh thu.",
      "للأسواق التنافسية حيث يرتبط ظهور Google مباشرة بالإيرادات.",
      "Для конкурентных рынков, где позиции в Google напрямую определяют продажи."
    ),
    features: [
      c("Tout SEO Growth", "Everything in SEO Growth", "Tất cả tính năng SEO Growth", "كل ما في باقة Growth", "Всё из тарифа Growth"),
      c("SEO technique avancé", "Advanced technical SEO", "SEO kỹ thuật nâng cao", "سيو تقني متقدم", "Продвинутое техническое SEO"),
      c("Jusqu'à 8 contenus SEO / mois", "Up to 8 SEO content assets / month", "Tối đa 8 nội dung SEO / tháng", "حتى 8 مقالات محسّنة شهرياً", "До 8 SEO-материалов в месяц"),
      c("Landing pages commerciales avancées", "Advanced commercial landing pages", "Landing pages thương mại nâng cao", "صفحات هبوط تجارية متقدمة", "Оптимизация целевых страниц"),
      c("Architecture sémantique multi-cibles", "Multi-segment organic architecture", "Kiến trúc ngữ nghĩa đa mục tiêu", "بنية دلالية متعددة الأهداف", "Мультирегиональная SEO-архитектура"),
      c("Campagne d'autorité & backlinks", "Authority & backlink campaign", "Chiến dịch authority & backlink", "حملة روابط خلفية وسلطة", "Кампания по наращиванию ссылок"),
      c("Backlink intelligence concurrentielle", "Competitor backlink intelligence", "Phân tích backlink đối thủ", "استخبارات الروابط المنافسة", "Анализ ссылочной массы конкурентов"),
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
      "12 месяцев для создания стабильного актива органического трафика."
    ),
    features: [
      c("Tout le système SEO Growth", "Everything in the SEO Growth system", "Toàn bộ hệ thống SEO Growth", "نظام SEO Growth بالكامل", "Вся система тарифа Growth"),
      c("5 contenus SEO / mois", "5 SEO content assets / month", "5 nội dung SEO / tháng", "5 مقالات محسّنة شهرياً", "5 SEO-материалов в месяц"),
      c("Pages d'atterrissage SEO ciblées", "Targeted organic landing pages", "Trang đích SEO mục tiêu", "صفحات هبوط محسنة عضوياً", "Целевые органические лендинги"),
      c("Stratégie d'autorité & backlinks", "Authority & backlink strategy", "Chiến lược authority & backlink", "استراتيجية السلطة والروابط", "Стратегия авторитетности и ссылок"),
      c("Optimisation conversion", "Conversion optimisation", "Tối ưu chuyển đổi", "تحسين معدل التحويل", "Оптимизация конверсии"),
      c("Reporting & stratégie mensuels", "Monthly reporting & strategy", "Báo cáo & chiến lược hàng tháng", "تقارير واستراتيجية شهرية", "Ежемесячные отчёты и стратегия"),
      c("Audit SEO approfondi trimestriel", "Quarterly deep-dive SEO audit", "Audit SEO chuyên sâu hàng quý", "تدقيق فصلي معمق", "Квартальный глубокий аудит"),
      c("Roadmap SEO annuelle", "Annual SEO roadmap", "Roadmap SEO hàng năm", "خارطة طريق سنوية للـ SEO", "Годовая дорожная карта SEO"),
      c("Intelligence concurrentielle avancée", "Advanced competitor intelligence", "Competitive intelligence nâng cao", "تحليل تنافسي متقدم", "Глубокая конкурентная разведка"),
      c("Stratège SEO dédié", "Dedicated SEO strategist", "SEO strategist riêng", "خبير سيو مخصص", "Выделенный SEO-стратег"),
      c("Économie massive vs paiement mensuel", "Massive savings vs monthly fee", "Tiết kiệm lớn so với trả hàng tháng", "توفير كبير مقارنة بالدفع الشهري", "Существенная выгода по сравнению с помесячной оплатой"),
    ],
  },
  {
    name: c("SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual", "SEO Domination Annual"),
    priceEur: 3299,
    period: c("/ an", "/ year", "/ năm", "/ سنة", "/ год"),
    annual: true,
    popular: true,
    audience: c(
      "Notre programme le plus complet pour faire de Google un canal d'acquisition stratégique souverain.",
      "Our most complete programme for turning Google into a strategic acquisition channel.",
      "Chương trình toàn diện nhất để biến Google thành kênh acquisition chiến lược.",
      "برنامجنا الأكثر اكتمالاً لتحويل Google إلى قناة اكتساب استراتيجية.",
      "Наша самая мощная программа для превращения Google в стратегический канал продаж."
    ),
    features: [
      c("Tout SEO Accelerator", "Everything in SEO Accelerator", "Tất cả tính năng SEO Accelerator", "كل ما في باقة Accelerator", "Всё из тарифа Accelerator"),
      c("Jusqu'à 10 contenus SEO / mois", "Up to 10 SEO content assets / month", "Tối đa 10 nội dung SEO / tháng", "حتى 10 مقالات شهرياً", "До 10 SEO-материалов в месяц"),
      c("SEO international & multi-langues", "International & multilingual SEO", "SEO quốc tế & đa ngôn ngữ", "سيو دولي ومتعدد اللغات", "Международное и мультиязычное SEO"),
      c("Maillage éditorial & cocons sémantiques", "Editorial linking & topic clusters", "Liên kết nội bộ & cụm chủ đề", "ربط تحريري وعناقيد دلالية", "Перелинковка и семантические кластеры"),
      c("Backlink & authority premium", "Premium backlink & authority", "Backlink & authority premium", "بناء روابط متميزة وسلطة عالية", "Премиальные ссылки и авторитет"),
      c("Digital PR & opportunités presse", "Digital PR opportunities", "Cơ hội Digital PR", "فرص العلاقات العامة الرقمية", "Возможности Digital PR"),
      c("Competitor backlink intelligence", "Competitor backlink intelligence", "Competitive backlink intelligence", "تحليل روابط المنافسين", "Разведка ссылок конкурентов"),
      c("Content gap & SERP gap", "Content gap & SERP gap", "Content gap & SERP gap", "تحليل فجوات المحتوى", "Анализ упущенных тем"),
      c("Suivi hebdomadaire positions & performance", "Weekly rankings & performance monitoring", "Theo dõi ranking & performance hàng tuần", "متابعة أسبوعية للأداء", "Еженедельный аудит позиций"),
      c("Revue stratégique trimestrielle", "Quarterly strategy review", "Review chiến lược hàng quý", "مراجعة استراتيجية فصلية", "Квартальный стратегический обзор"),
      c("Consulting stratégique prioritaire", "Priority strategic consulting", "Tư vấn chiến lược ưu tiên", "استشارات استراتيجية بأولوية", "Приоритетный консалтинг"),
      c("Économie vs Domination mensuel (-60%)", "Savings vs monthly Domination (-60%)", "Tiết kiệm so với Domination hàng tháng", "توفير مقارنة بالاشتراك الشهري", "Выгода по сравнению с помесячной оплатой"),
    ],
  },
];

function PlanCard({ plan, t }: { plan: Plan; t: (v: Copy) => string; lang?: Lang }) {
  const { price } = useLang();
  const planTitle = t(plan.name);
  const waHref = `https://wa.me/33767566783?text=${encodeURIComponent(
    `Bonjour XR Agency, je souhaite parler de la formule SEO « ${planTitle} » (${plan.priceEur} € ${t(plan.period)}).`
  )}`;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300",
        plan.popular
          ? "border-[#d4af37] bg-[#0c0e18] shadow-[0_0_50px_rgba(212,175,55,0.22)] ring-1 ring-[#d4af37]/60"
          : "border-white/10 bg-[#080a12] hover:border-white/25"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className={cn("font-mono text-[9px] font-bold uppercase tracking-wider", plan.popular ? "text-[#d4af37]" : "text-white/60")}>
            {plan.annual ? "PROGRAMME ANNUEL" : "FORMULE MENSUELLE"}
          </span>
          {plan.popular && (
            <span className="rounded-full bg-[#d4af37] px-3 py-1 font-mono text-[8px] font-extrabold uppercase tracking-wider text-black shadow-md">
              LE PLUS CHOISI
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{planTitle}</h3>
        <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 min-h-[44px]">{t(plan.audience)}</p>

        <div className="border-y border-white/10 py-6 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white font-serif">{price(plan.priceEur)}</span>
            <span className="font-mono text-xs text-[#94a3b8]">{t(plan.period)}</span>
          </div>
          {plan.annual && (
            <p className="mt-1.5 font-mono text-[9px] text-[#d4af37]">Engagement 12 mois avec capitalisation continue.</p>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{t(feature)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 pt-4 border-t border-white/10">
        <AddToCartBtn
          item={{
            serviceId: "seo",
            serviceName: "SEO & Domination Google",
            planName: planTitle,
            priceEur: plan.priceEur,
            period: plan.annual ? "year" : "month",
            periodLabel: t(plan.period),
            commitment: plan.annual
              ? t(c("Engagement : 12 mois", "12-month programme", "Cam kết 12 tháng", "التزام 12 شهراً", "Программа 12 мес"))
              : t(c("Sans engagement initial", "No initial lock-in", "Không cam kết ban đầu", "بدون التزام أولي", "Без обязательств")),
          }}
          popular={plan.popular}
        />
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#cbd5e1] hover:border-[#d4af37] hover:text-white transition"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
          <span>{t(c("Échanger sur WhatsApp", "Discuss on WhatsApp", "Trao đổi qua WhatsApp", "ناقش عبر واتساب", "Обсудить в WhatsApp"))}</span>
        </a>
      </div>
    </article>
  );
}

function SEOPage() {
  const { t, lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faq = [
    [
      c("Combien de temps faut-il pour voir des résultats ?", "How long does SEO take to show results?", "Bao lâu để thấy kết quả SEO?", "كم من الوقت يستغرق ظهور نتائج تحسين محركات البحث؟", "Сколько времени требуется для первых результатов SEO?"),
      c(
        "Le SEO est un actif cumulatif. Nous cherchons des gains mesurables dès les 30 premiers jours sur les requêtes à intention forte, puis nous renforçons progressivement l'autorité sémantique, la structure technique et les positions concurrentielles.",
        "SEO compounds over time. We target measurable early wins within the first 30 days, then systematically scale topic clusters and authority backlinks.",
        "SEO tích lũy theo thời gian. Chúng tôi tìm kiếm tiến bộ có thể đo lường sớm rồi tăng dần content, authority và rankings.",
        "نتائج SEO تراكمية. نسعى لتحقيق نتائج قابلة للقياس في المراحل الأولى ثم تعزيز المحتوى والسلطة والمراكز تدريجياً.",
        "Эффект SEO накопительный. Первые результаты видны в течение 30 дней, далее планомерно наращивается трафик и позиции."
      ),
    ],
    [
      c("Pouvez-vous garantir la première position Google ?", "Can you guarantee the #1 Google position?", "Bạn có thể đảm bảo vị trí #1 Google không?", "هل تضمنون المركز الأول على Google؟", "Гарантируете ли вы первую строчку в Google?"),
      c(
        "Non. Aucune agence sérieuse ne possède Google. En revanche, nous appliquons une ingénierie sémantique et technique rigoureuse avec un historique éprouvé de top positions sur les mots-clés stratégiques les plus rentables.",
        "No. No serious agency can guarantee a specific Google ranking. We provide structured execution, transparent reporting and a clear strategy.",
        "Không. Không agency nghiêm túc nào có thể đảm bảo một vị trí Google cụ thể.",
        "لا. لا يمكن لأي وكالة جادة ضمان مركز دقيق على Google.",
        "Нет. Ни одно добросовестное агентство не может гарантировать конкретную позицию."
      ),
    ],
    [
      c("Pourquoi choisir un plan annuel ?", "Why choose an annual plan?", "Tại sao nên chọn gói hàng năm?", "لماذا تختار باقة سنوية؟", "Почему стоит выбрать годовой план?"),
      c(
        "Parce que l'algorithme Google valorise la régularité et la profondeur. Un engagement sur 12 mois permet de construire un fossé concurrentiel infranchissable tout en divisant considérablement le coût par lead.",
        "Because SEO compounds over time. 12 months lets every piece of content, authority signal and conversion insight reinforce the next.",
        "Vì SEO tích lũy theo thời gian. 12 tháng cho phép tối đa hóa hiệu ứng tích lũy.",
        "لأن نتائج SEO تُبنى بمرور الوقت وتوفر عائداً استثمارياً ضخماً.",
        "Потому что результаты SEO формируются во времени с накопительным эффектом."
      ),
    ],
    [
      c("Le SEO remplace-t-il Google Ads ?", "Does SEO replace Google Ads?", "SEO có thay thế Google Ads không?", "هل يحل تحسين محركات البحث محل Google Ads؟", "Заменяет ли SEO рекламу Google Ads?"),
      c(
        "Non, ils se complètent parfaitement. Le SEO bâtit un actif propriétaire pérenne et gratuit sur chaque clic, tandis que Google Ads permet d'acheter de la demande immédiate sur des opérations ponctuelles.",
        "No. They complement each other. SEO builds a long-term organic asset while paid search buys demand immediately.",
        "Không. Hai kênh bổ trợ nhau.",
        "لا، فهما متكاملان.",
        "Нет. Они дополняют друг друга."
      ),
    ],
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white selection:bg-[#d4af37] selection:text-black">
      <Nav />

      {/* Atmospheric Specular Halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[95%] max-w-[1400px] rounded-full bg-[#d4af37]/8 blur-[160px]"
      />

      <main className="pt-28 sm:pt-32">
        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-4 font-mono text-[9.5px]">
            <Link to="/services" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white transition">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t({ fr: "TOUTES LES DISCIPLINES", en: "ALL DISCIPLINES", vi: "TẤT CẢ DỊCH VỤ", ar: "كل الخدمات", ru: "ВСЕ УСЛУГИ" })}</span>
            </Link>
            <div className="flex items-center gap-2 text-[#64748b]">
              <Link to="/" className="hover:text-white transition">{t({ fr: "ACCUEIL", en: "HOME", vi: "TRANG CHỦ", ar: "الرئيسية", ru: "ГЛАВНАЯ" })}</Link>
              <span>/</span>
              <span className="text-[#d4af37] font-bold uppercase">SEO & DOMINATION GOOGLE</span>
            </div>
          </div>
        </div>

        {/* ── HERO OF SEO ── */}
        <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid items-center gap-12 lg:grid-cols-[0.52fr_0.48fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#d4af37] mb-6 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>03 · XR SEARCH ENGINE LAB</span>
                </div>

                <h1 className="text-[clamp(2.9rem,5.8vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white [text-wrap:balance]">
                  Transformez Google en actif souverain.
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#94a3b8] font-normal">
                  {t(
                    c(
                      "Plus de visibilité. Plus de trafic qualifié. Une stratégie SEO de haute précision dès 299 € / mois pour bâtir un canal d'acquisition durable.",
                      "More visibility. More qualified traffic. A structured SEO system from €299/month to build a durable commercial asset.",
                      "Tăng visibility. Tăng traffic chất lượng. Chiến lược SEO từ 299 €/tháng."
                    )
                  )}
                </p>

                {/* Highlights Pills */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Audit technique approfondi", "Recherche sémantique propriétaire", "Netlinking d'autorité", "Reporting ROI mensuel"].map((h, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-[9px] font-semibold text-[#cbd5e1] backdrop-blur-md"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Call to Actions */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:scale-105 hover:bg-[#d4af37]"
                  >
                    <span>Explorer les forfaits SEO</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/#audit"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-[#d4af37] hover:text-[#d4af37] transition"
                  >
                    <span>Audit SEO offert</span>
                  </a>
                </div>

                {/* Reassurance SLA Banner */}
                <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#94a3b8] block">
                      À PARTIR DE
                    </span>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white font-serif mt-0.5">
                      299 € <span className="text-sm font-sans font-normal text-[#94a3b8]">/ mois</span>
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-8">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#d4af37] block font-bold">
                      MÉTHODOLOGIE WHITE-HAT
                    </span>
                    <p className="text-sm font-semibold text-[#cbd5e1] mt-0.5">
                      Conforme aux guidelines Google · Zéro pénalité algorithmique
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Simulator in Titanium Frame */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-white/5 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#090b10] p-3 sm:p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.98)] backdrop-blur-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        Simulateur SEO en Direct
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-[#94a3b8]">
                      SERP ANALYSIS · LIVE
                    </span>
                  </div>

                  <ServiceIllustration service="seo" title="SEO & DOMINATION GOOGLE" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EARLY PRICING OVERVIEW STRIP ── */}
        <section className="border-b border-white/10 bg-[#06070a] py-8 text-white">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="font-mono text-[9px] font-bold tracking-[.24em] text-[#d4af37] uppercase">
                TARIFS OFFICIELS SEO MENSUELS & ANNUELS
              </span>
              <a href="#plans" className="font-mono text-[9px] font-bold text-white hover:text-[#d4af37] transition">
                Comparer les formules ↓
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { name: "SEO Foundation", price: "299 € / m", tag: "Mensuel" },
                { name: "SEO Growth", price: "499 € / m", tag: "Recommandé" },
                { name: "SEO Domination", price: "699 € / m", tag: "Mensuel" },
                { name: "SEO Accelerator", price: "1 699 € / an", tag: "Annuel" },
                { name: "SEO Domination An", price: "3 299 € / an", tag: "Annuel (-60%)" },
              ].map((p, idx) => (
                <a
                  key={idx}
                  href="#plans"
                  className={cn(
                    "flex flex-col justify-between rounded-2xl border p-4 shadow-lg transition hover:-translate-y-0.5",
                    p.tag.includes("Recommandé")
                      ? "border-[#d4af37] bg-[#0c0e18]"
                      : "border-white/10 bg-[#090b10] hover:border-white/30"
                  )}
                >
                  <span className="font-mono text-[8px] font-bold text-[#d4af37]">{p.tag}</span>
                  <p className="mt-1 text-sm font-bold text-white">{p.name}</p>
                  <p className="mt-2 text-xl font-bold font-serif text-white">{p.price}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 / FORMULES MENSUELLES ── */}
        <section id="plans" className="border-b border-white/10 bg-[#030406] py-20 sm:py-32 scroll-mt-20">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end mb-16">
              <div>
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  01 / FORMULES MENSUELLES SANS ENGAGEMENT
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  Choisissez votre niveau d'accélération.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed lg:justify-self-end max-w-lg">
                Commencez au niveau adapté à votre marché. Évoluez à tout moment selon vos objectifs de croissance et votre capacité commerciale.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {monthly.map((plan) => (
                <PlanCard key={plan.name.fr} plan={plan} t={t} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 / PROGRAMMES ANNUELS CAPITALISÉS ── */}
        <section id="annual-plans" className="border-b border-white/10 bg-[#050608] py-20 sm:py-32">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end mb-16">
              <div>
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  02 / PROGRAMMES ANNUELS STRATÉGIQUES
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  Construisez un actif SEO sur 12 mois.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed lg:justify-self-end max-w-lg">
                Les programmes annuels maximisent l'effet cumulatif entre production de contenu, signaux d'autorité et conversion, tout en offrant une réduction tarifaire majeure.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 items-stretch max-w-5xl mx-auto">
              {annual.map((plan) => (
                <PlanCard key={plan.name.fr} plan={plan} t={t} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 / STRATEGIC PILLARS ── */}
        <section className="border-b border-white/10 bg-[#040508] py-20 sm:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#090b10] p-7 sm:p-9 shadow-xl">
                <Search className="h-6 w-6 text-[#d4af37]" />
                <h3 className="mt-5 text-xl font-bold text-white uppercase tracking-tight">Être trouvé</h3>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed font-normal">
                  Nous ciblons chirurgicalement les requêtes à forte intention d'achat qui génèrent des leads à haute valeur ajoutée.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#090b10] p-7 sm:p-9 shadow-xl">
                <TrendingUp className="h-6 w-6 text-[#d4af37]" />
                <h3 className="mt-5 text-xl font-bold text-white uppercase tracking-tight">Grimper au Top 1</h3>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed font-normal">
                  Technique pure, cocons sémantiques, vitesse de chargement et maillage de netlinking travaillent de concert.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#090b10] p-7 sm:p-9 shadow-xl">
                <Sparkles className="h-6 w-6 text-[#d4af37]" />
                <h3 className="mt-5 text-xl font-bold text-white uppercase tracking-tight">Convertir le trafic</h3>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed font-normal">
                  Le SEO ne s'arrête pas au clic : nous optimisons vos pages de destination pour transformer chaque visiteur en client signé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PILLAR 1: HUGO (CONSEILLER SEO) & PROTOCOLE SEO EN 4 ÉTAPES ── */}
        <ServicePillarDeepBlocks serviceId="seo" />

        {/* ── 04 / FAQ ACCORDION ── */}
        <section className="border-b border-white/10 bg-[#040508] py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center mb-14">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                04 / QUESTIONS FRÉQUENTES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                Questions essentielles
              </h2>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {faq.map(([question, answer], i) => {
                const active = openFaq === i;
                return (
                  <div key={i} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(active ? null : i)}
                      className="flex w-full items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-white hover:text-[#d4af37] transition"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#d4af37]">0{i + 1}</span>
                        <span>{t(question)}</span>
                      </span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300 text-[#d4af37]", active && "rotate-180")} />
                    </button>
                    {active && (
                      <div className="mt-4 pl-8 text-xs sm:text-sm leading-relaxed text-[#94a3b8] animate-in fade-in duration-200">
                        {t(answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Studio Contact */}
        <Contact />
      </main>
    </div>
  );
}
