import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ServerCog, ShieldCheck, Wrench, MessageCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { ServicePillarDeepBlocks } from "@/components/site/ServicePillarDeepBlocks";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/webcare")({
  head: () => ({
    meta: [
      { title: "WebCare — Maintenance, Sécurité & Infrastructure Cloud | XR Agency" },
      {
        name: "description",
        content:
          "WebCare XR Agency : corrections, évolutions et suivi du site. Infrastructure annuelle à 79 € avec hébergement, nom de domaine et sécurité gérés par XR Agency.",
      },
      { property: "og:title", content: "WebCare — XR Agency" },
      {
        property: "og:description",
        content: "Maintenance et infrastructure web claires, avec offres mensuelles et infrastructure annuelle à 79 €.",
      },
    ],
  }),
  component: WebCarePage,
});

const WEBCARE_TRANSLATIONS: Record<Lang, Record<string, string>> = {
  fr: {
    "Votre site évolue.": "Votre site évolue.",
    "Nous aussi.": "Nous aussi.",
    "Infrastructure annuelle": "Infrastructure annuelle",
    "À retenir": "À retenir",
    "Hébergement": "Hébergement",
    "Nom de domaine": "Nom de domaine",
    "Sécurité": "Sécurité",
    "Corrections": "Corrections",
    "Évolutions": "Évolutions",
    "Suivi": "Suivi",
    "Maintenance mensuelle": "Maintenance mensuelle",
    "Choisissez votre niveau": "Choisissez votre niveau",
    "d'accompagnement.": "d'accompagnement.",
    "ÉQUILIBRE": "ÉQUILIBRE",
    "/ mois": "/ mois",
    "Parler à XR Agency": "Parler à XR Agency",
    "Lecture rapide": "Lecture rapide",
    "Ce que chaque niveau couvre.": "Ce que chaque niveau couvre.",
    "éléments": "éléments",
    "Un site propre, sans abonnement incompréhensible.": "Un site propre, sans abonnement incompréhensible.",
    "Petites modifications de contenu, visuels et sections.": "Petites modifications de contenu, visuels et sections.",
    "Ajustements courants pour que le site reste utile.": "Ajustements courants pour que le site reste utile.",
    "Surveillance et interventions techniques selon la formule choisie.": "Surveillance et interventions techniques selon la formule choisie.",
    "Pour les corrections courantes": "Pour les corrections courantes",
    "Pour faire évoluer le site régulièrement": "Pour faire évoluer le site régulièrement",
    "Pour déléguer le quotidien": "Pour déléguer le quotidien",
    "4 modifications / mois": "4 modifications / mois",
    "10 modifications / mois": "10 modifications / mois",
    "Corrections de contenu et visuels": "Corrections de contenu et visuels",
    "Interventions techniques courantes": "Interventions techniques courantes",
    "Suivi standard": "Suivi standard",
    "Demandes regroupées et traitées au fil du mois": "Demandes regroupées et traitées au fil du mois",
    "Corrections de contenu, visuels et sections": "Corrections de contenu, visuels et sections",
    "Priorité de traitement": "Priorité de traitement",
    "Conseils d'évolution courante": "Conseils d'évolution courante",
    "Modifications courantes illimitées dans le périmètre du site": "Modifications courantes illimitées dans le périmètre du site",
    "Suivi technique prioritaire": "Suivi technique prioritaire",
    "Petites évolutions incluses": "Petites évolutions incluses",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Refontes, fonctionnalités majeures et développements spécifiques sur devis",
    "Essentiel": "Essentiel",
    "Business": "Business",
    "Unlimited": "Unlimited",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.":
      "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.":
      "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.":
      "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.":
      "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.":
      "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.":
      "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.":
      "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.",
  },
  en: {
    "Votre site évolue.": "Your website evolves.",
    "Nous aussi.": "So do we.",
    "Infrastructure annuelle": "Annual infrastructure",
    "À retenir": "Good to know",
    "Hébergement": "Hosting",
    "Nom de domaine": "Domain name",
    "Sécurité": "Security",
    "Corrections": "Fixes",
    "Évolutions": "Updates",
    "Suivi": "Monitoring",
    "Maintenance mensuelle": "Monthly maintenance",
    "Choisissez votre niveau": "Choose your level",
    "d'accompagnement.": "of support.",
    "ÉQUILIBRE": "BALANCED",
    "/ mois": "/ month",
    "Parler à XR Agency": "Talk to XR Agency",
    "Lecture rapide": "At a glance",
    "Ce que chaque niveau couvre.": "What each tier covers.",
    "éléments": "items",
    "Un site propre, sans abonnement incompréhensible.": "A clean website without confusing retainers.",
    "Petites modifications de contenu, visuels et sections.": "Small updates to copy, imagery and sections.",
    "Ajustements courants pour que le site reste utile.": "Routine adjustments so your site remains commercially active.",
    "Surveillance et interventions techniques selon la formule choisie.": "Technical monitoring and intervention based on chosen tier.",
    "Pour les corrections courantes": "For standard maintenance",
    "Pour faire évoluer le site régulièrement": "For regular iterative improvements",
    "Pour déléguer le quotidien": "For hands-off delegation",
    "4 modifications / mois": "4 changes / month",
    "10 modifications / mois": "10 changes / month",
    "Corrections de contenu et visuels": "Content and visual corrections",
    "Interventions techniques courantes": "Standard technical updates",
    "Suivi standard": "Standard monitoring",
    "Demandes regroupées et traitées au fil du mois": "Grouped requests processed continuously",
    "Corrections de contenu, visuels et sections": "Content, image and section fixes",
    "Priorité de traitement": "Priority queue",
    "Conseils d'évolution courante": "Ongoing evolution guidance",
    "Modifications courantes illimitées dans le périmètre du site": "Unlimited standard changes within scope",
    "Suivi technique prioritaire": "Priority technical monitoring",
    "Petites évolutions incluses": "Minor feature updates included",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Redesigns and major custom features quoted separately",
    "Essentiel": "Essential",
    "Business": "Business",
    "Unlimited": "Unlimited",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.":
      "Routine maintenance, bugfixes and lightweight updates: clear retainer to keep your website fast, secure and reliable.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.":
      "XR Agency manages hosting, domain name renewals and SSL infrastructure.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.":
      "€79/year covers infrastructure. Maintenance tiers are selected separately based on your requirements.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.":
      "Major custom developments and complete overhauls are always scoped separately.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.":
      "Allowances cover standard ongoing requests.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.":
      "The breakdown below summarises deliverables per tier.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.":
      "€79/year for infrastructure, plus the exact level of support you need.",
  },
  vi: {
    "Votre site évolue.": "Website của bạn phát triển.",
    "Nous aussi.": "Chúng tôi đồng hành.",
    "Infrastructure annuelle": "Hạ tầng hàng năm",
    "À retenir": "Lưu ý",
    "Hébergement": "Hosting",
    "Nom de domaine": "Tên miền",
    "Sécurité": "Bảo mật",
    "Corrections": "Sửa lỗi",
    "Évolutions": "Nâng cấp",
    "Suivi": "Theo dõi",
    "Maintenance mensuelle": "Bảo trì hàng tháng",
    "Choisissez votre niveau": "Chọn cấp độ",
    "d'accompagnement.": "hỗ trợ phù hợp.",
    "ÉQUILIBRE": "CÂN BẰNG",
    "/ mois": "/ tháng",
    "Parler à XR Agency": "Trao đổi với XR Agency",
    "Lecture rapide": "Tóm tắt",
    "Ce que chaque niveau couvre.": "Phạm vi từng gói.",
    "éléments": "mục",
    "Un site propre, sans abonnement incompréhensible.": "Website luôn ổn định, không phí ẩn.",
    "Petites modifications de contenu, visuels et sections.": "Chỉnh sửa nội dung, hình ảnh và phần trang.",
    "Ajustements courants pour que le site reste utile.": "Cập nhật định kỳ để website luôn hiệu quả.",
    "Surveillance et interventions techniques selon la formule choisie.": "Giám sát kỹ thuật theo gói đã chọn.",
    "Pour les corrections courantes": "Cho sửa lỗi định kỳ",
    "Pour faire évoluer le site régulièrement": "Cho website cần nâng cấp thường xuyên",
    "Pour déléguer le quotidien": "Ủy quyền trọn gói",
    "4 modifications / mois": "4 chỉnh sửa / tháng",
    "10 modifications / mois": "10 chỉnh sửa / tháng",
    "Corrections de contenu et visuels": "Sửa nội dung và hình ảnh",
    "Interventions techniques courantes": "Can thiệp kỹ thuật tiêu chuẩn",
    "Suivi standard": "Theo dõi tiêu chuẩn",
    "Demandes regroupées et traitées au fil du mois": "Xử lý yêu cầu trong tháng",
    "Corrections de contenu, visuels et sections": "Sửa nội dung, ảnh và section",
    "Priorité de traitement": "Ưu tiên xử lý",
    "Conseils d'évolution courante": "Tư vấn nâng cấp",
    "Modifications courantes illimitées dans le périmètre du site": "Chỉnh sửa không giới hạn trong phạm vi",
    "Suivi technique prioritaire": "Ưu tiên kỹ thuật",
    "Petites évolutions incluses": "Bao gồm cải tiến nhỏ",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Tính năng lớn cần báo giá riêng",
    "Essentiel": "Cơ bản",
    "Business": "Doanh nghiệp",
    "Unlimited": "Không giới hạn",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.":
      "Bảo trì định kỳ, sửa lỗi và cập nhật nhẹ: gói dịch vụ rõ ràng giúp website hoạt động mượt mà.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.":
      "XR Agency quản lý hosting, tên miền và bảo mật.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.":
      "79 €/năm bao gồm hạ tầng. Các gói bảo trì được chọn riêng.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.":
      "Phát triển lớn cần báo giá riêng.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.":
      "Áp dụng cho các yêu cầu thông thường.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.":
      "Tóm tắt từng gói để bạn dễ dàng lựa chọn.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.":
      "79 €/năm hạ tầng, cộng với gói bảo trì phù hợp.",
  },
  ar: {
    "Votre site évolue.": "موقعك يتطور.",
    "Nous aussi.": "ونحن أيضًا.",
    "Infrastructure annuelle": "البنية التحتية السنوية",
    "À retenir": "معلومة مهمة",
    "Hébergement": "الاستضافة",
    "Nom de domaine": "اسم النطاق",
    "Sécurité": "الأمان",
    "Corrections": "الإصلاحات",
    "Évolutions": "التحسينات",
    "Suivi": "المتابعة",
    "Maintenance mensuelle": "الصيانة الشهرية",
    "Choisissez votre niveau": "اختر مستوى",
    "d'accompagnement.": "الدعم المناسب.",
    "ÉQUILIBRE": "متوازن",
    "/ mois": "/ شهر",
    "Parler à XR Agency": "تواصل مع XR Agency",
    "Lecture rapide": "نظرة سريعة",
    "Ce que chaque niveau couvre.": "ما الذي تتضمنه كل باقة؟",
    "éléments": "عناصر",
    "Un site propre, sans abonnement incompréhensible.": "موقع مُعتنى به دون اشتراك غير واضح.",
    "Petites modifications de contenu, visuels et sections.": "تعديلات بسيطة على المحتوى والصور وأقسام الصفحات.",
    "Ajustements courants pour que le site reste utile.": "تعديلات دورية للحفاظ على فائدة الموقع.",
    "Surveillance et interventions techniques selon la formule choisie.": "مراقبة تقنية وتدخلات وفق الباقة المختارة.",
    "Pour les corrections courantes": "للإصلاحات المعتادة",
    "Pour faire évoluer le site régulièrement": "لتطوير الموقع بانتظام",
    "Pour déléguer le quotidien": "لتفويض المهام اليومية",
    "4 modifications / mois": "4 تعديلات شهريًا",
    "10 modifications / mois": "10 تعديلات شهريًا",
    "Corrections de contenu et visuels": "تصحيح المحتوى والصور",
    "Interventions techniques courantes": "تدخلات تقنية معتادة",
    "Suivi standard": "متابعة قياسية",
    "Demandes regroupées et traitées au fil du mois": "تجميع الطلبات ومعالجتها خلال الشهر",
    "Corrections de contenu, visuels et sections": "تصحيح المحتوى والصور وأقسام الصفحات",
    "Priorité de traitement": "أولوية في المعالجة",
    "Conseils d'évolution courante": "نصائح للتحسين المستمر",
    "Modifications courantes illimitées dans le périmètre du site": "تعديلات اعتيادية غير محدودة ضمن نطاق الموقع",
    "Suivi technique prioritaire": "أولوية في المتابعة التقنية",
    "Petites évolutions incluses": "تحسينات بسيطة مشمولة",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "إعادة التصميم والميزات الكبيرة والتطوير المخصص بعرض سعر منفصل",
    "Essentiel": "أساسي",
    "Business": "الأعمال",
    "Unlimited": "غير محدود",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.":
      "صيانة دورية وإصلاحات وتحسينات بسيطة: باقة واضحة تحافظ على موقعك مرتبًا ومحدّثًا.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.":
      "تتولى XR Agency إدارة الاستضافة واسم النطاق وأمان البنية التحتية.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.":
      "تغطي رسوم 79 يورو سنويًا البنية التحتية.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.":
      "تتطلب أعمال التطوير الكبيرة عرض سعر منفصل.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.":
      "تشمل الحدود الشهرية الطلبات المعتادة.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.":
      "تلخص النقاط التالية محتويات كل باقة.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.":
      "79 يورو سنويًا للبنية التحتية مع مستوى الصيانة المطلوب.",
  },
  ru: {
    "Votre site évolue.": "Ваш сайт развивается.",
    "Nous aussi.": "И мы вместе с ним.",
    "Infrastructure annuelle": "Инфраструктура на год",
    "À retenir": "Важно знать",
    "Hébergement": "Хостинг",
    "Nom de domaine": "Домен",
    "Sécurité": "Безопасность",
    "Corrections": "Исправления",
    "Évolutions": "Улучшения",
    "Suivi": "Контроль",
    "Maintenance mensuelle": "Ежемесячное обслуживание",
    "Choisissez votre niveau": "Выберите уровень",
    "d'accompagnement.": "поддержки.",
    "ÉQUILIBRE": "ОПТИМАЛЬНЫЙ",
    "/ mois": "/ мес.",
    "Parler à XR Agency": "Связаться с XR Agency",
    "Lecture rapide": "Кратко",
    "Ce que chaque niveau couvre.": "Что входит в каждый тариф?",
    "éléments": "пунктов",
    "Un site propre, sans abonnement incompréhensible.": "Ухоженный сайт без непонятной подписки.",
    "Petites modifications de contenu, visuels et sections.": "Небольшие изменения контента, изображений и разделов.",
    "Ajustements courants pour que le site reste utile.": "Текущие корректировки, которые сохраняют пользу сайта.",
    "Surveillance et interventions techniques selon la formule choisie.": "Технический мониторинг и работы согласно выбранному тарифу.",
    "Pour les corrections courantes": "Для обычных исправлений",
    "Pour faire évoluer le site régulièrement": "Для регулярного развития сайта",
    "Pour déléguer le quotidien": "Для делегирования ежедневных задач",
    "4 modifications / mois": "4 изменения в месяц",
    "10 modifications / mois": "10 изменений в месяц",
    "Corrections de contenu et visuels": "Исправления контента и изображений",
    "Interventions techniques courantes": "Стандартные технические работы",
    "Suivi standard": "Стандартный мониторинг",
    "Demandes regroupées et traitées au fil du mois": "Запросы объединяются и обрабатываются в течение месяца",
    "Corrections de contenu, visuels et sections": "Правки контента, изображений и разделов",
    "Priorité de traitement": "Приоритетная обработка",
    "Conseils d'évolution courante": "Рекомендации по текущим улучшениям",
    "Modifications courantes illimitées dans le périmètre du site": "Неограниченные стандартные изменения в рамках сайта",
    "Suivi technique prioritaire": "Приоритетный технический мониторинг",
    "Petites évolutions incluses": "Небольшие улучшения включены",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Редизайн, крупные функции и разработка оцениваются отдельно",
    "Essentiel": "Базовый",
    "Business": "Бизнес",
    "Unlimited": "Безлимит",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.":
      "Текущая поддержка, исправления и небольшие улучшения: понятный тариф, который помогает поддерживать сайт в актуальном состоянии.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.":
      "XR Agency управляет хостингом, доменом и безопасностью инфраструктуры.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.":
      "79 € в год — это стоимость инфраструктуры.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.":
      "Крупная разработка, редизайн и новые функции всегда оцениваются отдельно.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.":
      "Лимиты относятся к обычным запросам.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.":
      "Ниже перечислены элементы каждого тарифа.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.":
      "79 € в год за инфраструктуру, затем — тот уровень обслуживания, который вам действительно нужен.",
  },
};

function translateWebCare(value: string, lang: Lang) {
  return WEBCARE_TRANSLATIONS[lang]?.[value] ?? value;
}

const plans = [
  {
    name: "Essentiel",
    price: 29,
    badge: "Pour les corrections courantes",
    features: [
      "4 modifications / mois",
      "Corrections de contenu et visuels",
      "Interventions techniques courantes",
      "Suivi standard",
      "Demandes regroupées et traitées au fil du mois",
    ],
  },
  {
    name: "Pro",
    price: 49,
    badge: "Pour faire évoluer le site régulièrement",
    popular: true,
    features: [
      "10 modifications / mois",
      "Corrections de contenu, visuels et sections",
      "Interventions techniques courantes",
      "Priorité de traitement",
      "Conseils d'évolution courante",
    ],
  },
  {
    name: "Business",
    price: 99,
    badge: "Pour déléguer le quotidien",
    features: [
      "Modifications courantes illimitées dans le périmètre du site",
      "Corrections de contenu, visuels et sections",
      "Suivi technique prioritaire",
      "Petites évolutions incluses",
      "Refontes, fonctionnalités majeures et développements spécifiques sur devis",
    ],
  },
];

function WebCarePage() {
  const { lang, price } = useLang();
  const tx = (value: string) => translateWebCare(value, lang);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white selection:bg-[#d4af37] selection:text-black"
    >
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
              <span>TOUTES LES DISCIPLINES</span>
            </Link>
            <div className="flex items-center gap-2 text-[#64748b]">
              <Link to="/" className="hover:text-white transition">ACCUEIL</Link>
              <span>/</span>
              <span className="text-[#d4af37] font-bold uppercase">WEBCARE & INFRASTRUCTURE</span>
            </div>
          </div>
        </div>

        {/* ── HERO OF WEBCARE ── */}
        <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid items-center gap-12 lg:grid-cols-[0.52fr_0.48fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#d4af37] mb-6 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>06 · INFRASTRUCTURE & MAINTENANCE SOUVERAINE</span>
                </div>

                <h1 className="text-[clamp(2.9rem,5.8vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white [text-wrap:balance]">
                  {tx("Votre site évolue.")}
                  <br />
                  <span className="text-[#d4af37]">{tx("Nous aussi.")}</span>
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#94a3b8] font-normal">
                  {tx(
                    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis."
                  )}
                </p>

                {/* Highlights Pills */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Hébergement haute disponibilité", "Certificat SSL & WAF Cloudflare", "Sauvegardes quotidiennes", "SLA garanti"].map((h, i) => (
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
                    <span>Explorer les forfaits WebCare</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#infra"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white hover:border-[#d4af37] hover:text-[#d4af37] transition"
                  >
                    <span>Infrastructure 79 € / an</span>
                  </a>
                </div>

                {/* Reassurance SLA Banner */}
                <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#94a3b8] block">
                      INFRASTRUCTURE ANNUELLE
                    </span>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white font-serif mt-0.5">
                      79 € <span className="text-sm font-sans font-normal text-[#94a3b8]">/ an</span>
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-8">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#d4af37] block font-bold">
                      SÉCURITÉ & PERFORMANCE
                    </span>
                    <p className="text-sm font-semibold text-[#cbd5e1] mt-0.5">
                      Serveurs certifiés ISO 27001 · Sauvegardes chiffrées hors-site
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
                        Cockpit WebCare en Direct
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-[#94a3b8]">
                      SYSTEM HEALTH · 99.99% UPTIME
                    </span>
                  </div>

                  <ServiceIllustration service="maintenance" title="WEBCARE & INFRASTRUCTURE" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DUAL CORNERSTONE: INFRASTRUCTURE (79 €/an) & MAINTENANCE ── */}
        <section id="infra" className="border-b border-white/10 bg-[#050608] py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Infrastructure Card */}
              <div className="rounded-3xl border border-[#d4af37]/40 bg-[#0c0e18] p-8 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <ServerCog className="h-6 w-6 text-[#d4af37]" />
                    <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d4af37] font-bold">
                      {tx("Infrastructure annuelle")}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-white font-serif">79 €</span>
                    <span className="font-mono text-xs text-[#94a3b8]">/ an</span>
                  </div>

                  <p className="mt-4 text-sm text-[#cbd5e1] leading-relaxed">
                    {tx("XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.")}
                  </p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-3">
                    {["Hébergement", "Nom de domaine", "Sécurité"].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-center font-mono text-[10px] font-semibold text-white"
                      >
                        {tx(x)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <AddToCartBtn
                    item={{
                      serviceId: "webcare-infra",
                      serviceName: "WebCare Infrastructure",
                      planName: tx("Infrastructure annuelle"),
                      priceEur: 79,
                      period: "year",
                      periodLabel: "/ an",
                      commitment: "Abonnement annuel",
                    }}
                  />
                </div>
              </div>

              {/* Maintenance Overview Card */}
              <div className="rounded-3xl border border-white/10 bg-[#090b10] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-[#d4af37]" />
                    <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d4af37] font-bold">
                      {tx("Maintenance mensuelle")}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-[#94a3b8] leading-relaxed">
                    {tx(
                      "Choisissez votre niveau d'accompagnement mensuel pour vos mises à jour régulières, sans devis à chaque petite modification."
                    )}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2.5">
                    {plans.map((p) => (
                      <a
                        key={p.name}
                        href="#plans"
                        className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center hover:border-[#d4af37] transition group"
                      >
                        <span className="block font-mono text-[8px] font-bold uppercase text-[#d4af37]">{tx(p.name)}</span>
                        <span className="block text-2xl font-black text-white font-serif mt-1">{p.price} €</span>
                        <span className="block font-mono text-[8px] text-[#94a3b8]">/ mois</span>
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="#plans"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-[#d4af37] transition"
                >
                  <span>{tx("Comparer les 3 formules mensuelles")}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 / 3 NIVEAUX DE MAINTENANCE MENSUELLE ── */}
        <section id="plans" className="border-b border-white/10 bg-[#030406] py-20 sm:py-32 scroll-mt-20">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end mb-16">
              <div>
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#d4af37] block mb-3">
                  01 / FORMULES MENSUELLES D'ACCOMPAGNEMENT
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  {tx("Choisissez votre niveau")} {tx("d'accompagnement.")}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed lg:justify-self-end max-w-lg">
                Sans engagement initial. Les évolutions majeures ou refontes restent chiffrées à part sur devis.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {plans.map((plan, index) => {
                const waHref = `https://wa.me/33767566783?text=${encodeURIComponent(
                  `Bonjour XR Agency, je souhaite parler du forfait WebCare « ${plan.name} » à ${plan.price} €/mois.`
                )}`;
                return (
                  <article
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-all duration-300",
                      plan.popular
                        ? "border-[#d4af37] bg-[#0c0e18] shadow-[0_0_50px_rgba(212,175,55,0.22)] ring-1 ring-[#d4af37]/60"
                        : "border-white/10 bg-[#080a12] hover:border-white/25"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span className={cn("font-mono text-[9px] font-bold uppercase tracking-wider", plan.popular ? "text-[#d4af37]" : "text-white/60")}>
                          0{index + 1} / 03
                        </span>
                        {plan.popular && (
                          <span className="rounded-full bg-[#d4af37] px-3 py-1 font-mono text-[8px] font-extrabold uppercase tracking-wider text-black shadow-md">
                            {tx("ÉQUILIBRE")}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{tx(plan.name)}</h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 min-h-[44px]">{tx(plan.badge)}</p>

                      <div className="border-y border-white/10 py-6 mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-white font-serif">{plan.price} €</span>
                          <span className="font-mono text-xs text-[#94a3b8]">{tx("/ mois")}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                            <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{tx(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <AddToCartBtn
                        item={{
                          serviceId: "maintenance",
                          serviceName: "WebCare Maintenance",
                          planName: tx(plan.name),
                          priceEur: plan.price,
                          period: "month",
                          periodLabel: tx("/ mois"),
                          commitment: "Sans engagement",
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
                        <span>{tx("Parler à XR Agency")}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 02 / COMPARATIVE SPEC MATRIX ── */}
        <section className="border-b border-white/10 bg-[#040508] py-20 sm:py-28">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[8.5px] uppercase tracking-[.24em] text-[#d4af37] block mb-2">
                  TABLEAU COMPARATIF D'ATELIER
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white">
                  Différence rapide entre les 3 niveaux
                </h2>
              </div>
              <span className="font-mono text-xs text-[#d4af37]">
                + 79 € / an pour hébergement, domaine & sécurité Cloud
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#090b10] shadow-2xl">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-white/10 bg-black/60 font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                  <tr>
                    <th className="p-5">Critère</th>
                    <th className="p-5">Essentiel · 29 €/m</th>
                    <th className="p-5 text-[#d4af37]">Business · 49 €/m</th>
                    <th className="p-5">Unlimited · 99 €/m</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#cbd5e1]">
                  <tr>
                    <td className="p-5 font-bold text-white">Mises à jour courantes</td>
                    <td className="p-5 font-mono">4 / mois</td>
                    <td className="p-5 font-mono text-[#d4af37] font-bold">10 / mois</td>
                    <td className="p-5 font-mono font-bold text-white">Illimitées (périmètre site)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-white">Délai & priorité</td>
                    <td className="p-5">Suivi standard (48h)</td>
                    <td className="p-5 font-bold text-[#d4af37]">Prioritaire (24h)</td>
                    <td className="p-5 font-bold text-white">Traitement dédié urgent (12h)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-white">Nouvelles sections & conseils</td>
                    <td className="p-5">Contenu & visuels</td>
                    <td className="p-5 font-bold text-[#d4af37]">+ Nouvelles sections</td>
                    <td className="p-5 font-bold text-white">+ Petites évolutions incluses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Julie — Dedicated WebCare Advisor */}
        <ServicePillarDeepBlocks serviceId="webcare" />

        {/* Global Studio Contact */}
        <Contact />
      </main>
    </div>
  );
}
