import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, LifeBuoy, ShieldCheck, Sparkles, Wrench, ServerCog, MessageCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { AddToCartBtn } from "@/components/site/Cart";
import { CONTACT } from "@/lib/content";
import { XR_PHOTOS } from "@/lib/photography";
import { useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/services/webcare")({
  head: () => ({
    meta: [
      { title: "WebCare — Maintenance, sécurité & infrastructure | XR Agency" },
      { name: "description", content: "WebCare XR Agency : corrections, évolutions et suivi du site. Infrastructure annuelle à 79 € avec hébergement, nom de domaine et sécurité gérés par XR Agency." },
      { property: "og:title", content: "WebCare — XR Agency" },
      { property: "og:description", content: "Maintenance et infrastructure web claires, avec offres mensuelles et infrastructure annuelle à 79 €." },
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
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.": "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.": "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.": "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.": "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.": "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.": "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.": "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.",
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
    "Évolutions": "Improvements",
    "Suivi": "Monitoring",
    "Maintenance mensuelle": "Monthly maintenance",
    "Choisissez votre niveau": "Choose your level",
    "d'accompagnement.": "of support.",
    "ÉQUILIBRE": "BALANCED",
    "/ mois": "/ month",
    "Parler à XR Agency": "Talk to XR Agency",
    "Lecture rapide": "At a glance",
    "Ce que chaque niveau couvre.": "What each plan includes.",
    "éléments": "items",
    "Un site propre, sans abonnement incompréhensible.": "A well-maintained website, without a confusing subscription.",
    "Petites modifications de contenu, visuels et sections.": "Small updates to content, visuals and page sections.",
    "Ajustements courants pour que le site reste utile.": "Routine adjustments that keep your website useful.",
    "Surveillance et interventions techniques selon la formule choisie.": "Technical monitoring and interventions according to your plan.",
    "Pour les corrections courantes": "For routine fixes",
    "Pour faire évoluer le site régulièrement": "For regular website improvements",
    "Pour déléguer le quotidien": "For day-to-day delegation",
    "4 modifications / mois": "4 changes per month",
    "10 modifications / mois": "10 changes per month",
    "Corrections de contenu et visuels": "Content and visual fixes",
    "Interventions techniques courantes": "Routine technical interventions",
    "Suivi standard": "Standard monitoring",
    "Demandes regroupées et traitées au fil du mois": "Requests grouped and handled throughout the month",
    "Corrections de contenu, visuels et sections": "Content, visual and section updates",
    "Priorité de traitement": "Priority handling",
    "Conseils d'évolution courante": "Advice on ongoing improvements",
    "Modifications courantes illimitées dans le périmètre du site": "Unlimited routine changes within the website's scope",
    "Suivi technique prioritaire": "Priority technical monitoring",
    "Petites évolutions incluses": "Small improvements included",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Redesigns, major features and custom development quoted separately",
    "Essentiel": "Essential",
    "Business": "Business",
    "Unlimited": "Unlimited",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.": "Routine maintenance, fixes and small improvements: a clear plan to keep your website clean, up to date and useful without turning every small request into a new quote.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.": "XR Agency manages your hosting, domain name and infrastructure security.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.": "The €79/year fee covers infrastructure. Maintenance and improvement work is selected separately according to your needs.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.": "Major development, redesigns and new features always require a separate quote.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.": "The monthly allowance covers routine requests. Out-of-scope work is quoted separately to keep workloads realistic.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.": "These points summarise each plan so you can understand the scope before choosing.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.": "€79/year for infrastructure, then the maintenance level you actually need. Significant improvements are always scoped separately.",
  },
  vi: {
    "Votre site évolue.": "Website của bạn luôn phát triển.",
    "Nous aussi.": "Chúng tôi cũng vậy.",
    "Infrastructure annuelle": "Hạ tầng hằng năm",
    "À retenir": "Điều cần biết",
    "Hébergement": "Lưu trữ",
    "Nom de domaine": "Tên miền",
    "Sécurité": "Bảo mật",
    "Corrections": "Sửa lỗi",
    "Évolutions": "Cải tiến",
    "Suivi": "Theo dõi",
    "Maintenance mensuelle": "Bảo trì hằng tháng",
    "Choisissez votre niveau": "Chọn mức độ",
    "d'accompagnement.": "hỗ trợ phù hợp.",
    "ÉQUILIBRE": "CÂN BẰNG",
    "/ mois": "/ tháng",
    "Parler à XR Agency": "Trao đổi với XR Agency",
    "Lecture rapide": "Tóm tắt",
    "Ce que chaque niveau couvre.": "Mỗi gói bao gồm những gì?",
    "éléments": "hạng mục",
    "Un site propre, sans abonnement incompréhensible.": "Website được chăm sóc, không có gói đăng ký khó hiểu.",
    "Petites modifications de contenu, visuels et sections.": "Chỉnh sửa nhỏ về nội dung, hình ảnh và các phần của trang.",
    "Ajustements courants pour que le site reste utile.": "Điều chỉnh thường xuyên để website luôn hữu ích.",
    "Surveillance et interventions techniques selon la formule choisie.": "Giám sát kỹ thuật và xử lý theo gói đã chọn.",
    "Pour les corrections courantes": "Dành cho sửa lỗi thường xuyên",
    "Pour faire évoluer le site régulièrement": "Dành cho website cần cải tiến thường xuyên",
    "Pour déléguer le quotidien": "Dành cho việc ủy quyền hằng ngày",
    "4 modifications / mois": "4 chỉnh sửa / tháng",
    "10 modifications / mois": "10 chỉnh sửa / tháng",
    "Corrections de contenu et visuels": "Sửa nội dung và hình ảnh",
    "Interventions techniques courantes": "Can thiệp kỹ thuật thông thường",
    "Suivi standard": "Theo dõi tiêu chuẩn",
    "Demandes regroupées et traitées au fil du mois": "Gom và xử lý yêu cầu trong tháng",
    "Corrections de contenu, visuels et sections": "Sửa nội dung, hình ảnh và các phần trang",
    "Priorité de traitement": "Ưu tiên xử lý",
    "Conseils d'évolution courante": "Tư vấn cải tiến định kỳ",
    "Modifications courantes illimitées dans le périmètre du site": "Chỉnh sửa thông thường không giới hạn trong phạm vi website",
    "Suivi technique prioritaire": "Ưu tiên theo dõi kỹ thuật",
    "Petites évolutions incluses": "Bao gồm cải tiến nhỏ",
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Thiết kế lại, tính năng lớn và phát triển riêng cần báo giá",
    "Essentiel": "Cơ bản",
    "Business": "Doanh nghiệp",
    "Unlimited": "Không giới hạn",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.": "Bảo trì định kỳ, sửa lỗi và cải tiến nhỏ: gói dịch vụ rõ ràng giúp website luôn gọn gàng, cập nhật và hữu ích mà không cần báo giá mới cho từng yêu cầu nhỏ.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.": "XR Agency quản lý hosting, tên miền và bảo mật hạ tầng.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.": "79 €/năm bao gồm hạ tầng. Công việc bảo trì và cải tiến được lựa chọn riêng theo nhu cầu.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.": "Các hạng mục phát triển lớn, thiết kế lại và tính năng mới luôn cần báo giá riêng.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.": "Số lượng áp dụng cho yêu cầu thông thường. Công việc ngoài phạm vi sẽ được báo giá riêng để đảm bảo khối lượng hợp lý.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.": "Các mục dưới đây tóm tắt từng gói để bạn hiểu rõ phạm vi trước khi lựa chọn.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.": "79 €/năm cho hạ tầng, sau đó chọn mức bảo trì phù hợp với nhu cầu thực tế. Các cải tiến lớn luôn được xác định phạm vi riêng.",
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
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.": "صيانة دورية وإصلاحات وتحسينات بسيطة: باقة واضحة تحافظ على موقعك مرتبًا ومحدّثًا وعمليًا دون الحاجة إلى عرض سعر جديد لكل طلب صغير.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.": "تتولى XR Agency إدارة الاستضافة واسم النطاق وأمان البنية التحتية.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.": "تغطي رسوم 79 يورو سنويًا البنية التحتية. تُختار أعمال الصيانة والتحسين بشكل منفصل وفق احتياجاتك.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.": "تتطلب أعمال التطوير الكبيرة وإعادة التصميم والميزات الجديدة عرض سعر منفصلًا.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.": "تشمل الحدود الشهرية الطلبات المعتادة. تُسعّر الأعمال خارج النطاق بشكل منفصل للحفاظ على حجم عمل واقعي.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.": "تلخص النقاط التالية محتويات كل باقة لتوضيح نطاق العمل قبل الاختيار.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.": "79 يورو سنويًا للبنية التحتية، ثم مستوى الصيانة الذي تحتاجه فعليًا. تُحدد التحسينات المهمة بشكل منفصل.",
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
    "Refontes, fonctionnalités majeures et développements spécifiques sur devis": "Редизайн, крупные функции и индивидуальная разработка оцениваются отдельно",
    "Essentiel": "Базовый",
    "Business": "Бизнес",
    "Unlimited": "Безлимит",
    "Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.": "Текущая поддержка, исправления и небольшие улучшения: понятный тариф, который помогает поддерживать сайт в порядке и актуальном состоянии без отдельной сметы на каждый небольшой запрос.",
    "XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.": "XR Agency управляет хостингом, доменом и безопасностью инфраструктуры.",
    "Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.": "79 € в год — это стоимость инфраструктуры. Работы по обслуживанию и улучшению выбираются отдельно в зависимости от ваших потребностей.",
    "Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.": "Крупная разработка, редизайн и новые функции всегда оцениваются отдельно.",
    "Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.": "Лимиты относятся к обычным запросам. Работы вне согласованного объёма оцениваются отдельно, чтобы сохранить реалистичную нагрузку.",
    "Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.": "Ниже перечислены элементы каждого тарифа, чтобы вы понимали объём работ до выбора.",
    "79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.": "79 € в год за инфраструктуру, затем — тот уровень обслуживания, который вам действительно нужен. Существенные улучшения всегда согласуются отдельно.",
  },
};
function translateWebCare(value: string, lang: Lang) { return WEBCARE_TRANSLATIONS[lang][value] ?? value; }

const plans = [
  { name: "Essentiel", price: 29, badge: "Pour les corrections courantes", features: ["4 modifications / mois", "Corrections de contenu et visuels", "Interventions techniques courantes", "Suivi standard", "Demandes regroupées et traitées au fil du mois"] },
  { name: "Business", price: 49, badge: "Pour faire évoluer le site régulièrement", features: ["10 modifications / mois", "Corrections de contenu, visuels et sections", "Interventions techniques courantes", "Priorité de traitement", "Conseils d'évolution courante"] },
  { name: "Unlimited", price: 99, badge: "Pour déléguer le quotidien", features: ["Modifications courantes illimitées dans le périmètre du site", "Corrections de contenu, visuels et sections", "Suivi technique prioritaire", "Petites évolutions incluses", "Refontes, fonctionnalités majeures et développements spécifiques sur devis"] },
];

function WebCarePage() {
  const { lang, price } = useLang();
  const tx = (value: string) => translateWebCare(value, lang);
  const perYearLabel = { fr: "/ an", en: "/ year", vi: "/ năm", ar: "/ سنة", ru: "/ год" }[lang];
  const waMsgFor = (planLabel: string, amountEur: number, periodText: string) =>
    ({
      fr: `Bonjour XR Agency, je souhaite parler du forfait WebCare « ${planLabel} » à ${amountEur} € ${periodText}.`,
      en: `Hello XR Agency, I would like to discuss the WebCare "${planLabel}" plan at €${amountEur} ${periodText}.`,
      vi: `Xin chào XR Agency, tôi muốn trao đổi về gói WebCare "${planLabel}" (${amountEur} € ${periodText}).`,
      ar: `مرحبًا XR Agency، أود مناقشة باقة WebCare "${planLabel}" بقيمة ${amountEur} € ${periodText}.`,
      ru: `Здравствуйте, XR Agency! Хочу обсудить пакет WebCare «${planLabel}» (${amountEur} € ${periodText}).`,
    })[lang];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-[#F7F4EE] text-[#171613]">
      <Nav />
      <main className="pt-28">
        {/* Hero */}
        <section className="border-b border-[#171613]/10 bg-[#F7F4EE] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5">
                  <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                    XR AGENCY · WEBCARE
                  </span>
                </div>
                <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.03] tracking-[-0.025em] text-[#171613] sm:text-6xl lg:text-[4.5rem]">
                  {tx("Votre site évolue.")}
                  <br />
                  <em className="italic font-normal text-[#9E7F5A]">{tx("Nous aussi.")}</em>
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-[#57534B] sm:text-base">
                  {tx("Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.")}
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="group relative overflow-hidden rounded-[2rem] border border-[#171613]/12 bg-[#171613] shadow-[0_24px_60px_rgba(23,22,19,0.12)]">
                  <img
                    src={XR_PHOTOS.maintenance}
                    alt="WebCare XR Agency"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between pointer-events-none">
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#E5C696] backdrop-blur-md">
                      ✦ INFRASTRUCTURE & SÉCURITÉ ACTIVE
                    </span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-950/60 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-emerald-300 backdrop-blur-md">
                      99.98% UPTIME
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/75 p-3.5 text-white backdrop-blur-xl">
                    <h4 className="font-serif text-base font-medium text-white">Sérénité Technique 24/7</h4>
                    <p className="mt-0.5 text-xs text-white/70">Sauvegardes quotidiennes, correctifs de sécurité continus et SLA garanti.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure 79 €/an + À retenir */}
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-[1.1fr_.9fr]">
              <div className="flex flex-col justify-between rounded-3xl border border-[#E5E5E0] bg-white p-7 text-[#12110E] shadow-xl">
                <div>
                  <div className="flex items-center gap-3">
                    <ServerCog className="h-5 w-5 text-[#12110E]" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#12110E]">
                      {tx("Infrastructure annuelle")}
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-serif text-5xl font-semibold text-[#12110E] sm:text-6xl">
                      {price(79)}
                    </span>
                    <span className="font-mono text-xs text-[#52504A]">{perYearLabel}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#52504A]">
                    {tx("XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.")}
                  </p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {["Hébergement", "Nom de domaine", "Sécurité"].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-[#EBEBE6] bg-[#FAF9F5] p-3 text-center text-xs font-medium text-[#2B2925]"
                      >
                        {tx(x)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <AddToCartBtn
                    item={{
                      serviceId: "maintenance",
                      serviceName: "WebCare",
                      planName: tx("Infrastructure annuelle"),
                      priceEur: 79,
                      period: "year",
                      periodLabel: perYearLabel,
                    }}
                    popular
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-3xl border border-[#171613]/12 bg-white p-7">
                <div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#9E7F5A]" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7D6445]">
                      {tx("À retenir")}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[#45413A]">
                    {tx("Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.")}
                  </p>
                  <p className="mt-4 text-xs leading-6 text-[#57534B]">
                    {tx("Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.")}
                  </p>
                </div>
                <div className="mt-6 border-t border-[#171613]/10 pt-4">
                  <a
                    href={`${CONTACT.whatsapp}?text=${encodeURIComponent(waMsgFor(tx("Infrastructure annuelle"), 79, perYearLabel))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#171613]/20 bg-[#FAF8F4] px-5 py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#7D6445]" />
                    {tx("Parler à XR Agency")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="border-b border-[#171613]/10 bg-[#EEE9E0] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="grid gap-4 md:grid-cols-3">
              {(
                [
                  [LifeBuoy, "Corrections", "Petites modifications de contenu, visuels et sections."],
                  [Wrench, "Évolutions", "Ajustements courants pour que le site reste utile."],
                  [ShieldCheck, "Suivi", "Surveillance et interventions techniques selon la formule choisie."],
                ] as const
              ).map(([Icon, title, desc]) => (
                <div
                  key={title}
                  className="xr-editorial-card rounded-3xl border border-[#171613]/10 bg-white p-6"
                >
                  <Icon className="h-5 w-5 text-[#9E7F5A]" />
                  <h2 className="mt-5 font-serif text-2xl font-medium text-[#171613]">
                    {tx(title)}
                  </h2>
                  <p className="mt-2.5 text-sm leading-6 text-[#57534B]">{tx(desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monthly Maintenance Plans */}
        <section id="plans" className="bg-[#F7F4EE] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                  {tx("Maintenance mensuelle")}
                </span>
                <h2 className="mt-3 font-serif text-3xl font-medium text-[#171613] sm:text-5xl">
                  {tx("Choisissez votre niveau")}
                  <br />
                  {tx("d'accompagnement.")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#57534B]">
                {tx("Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.")}
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const isFeatured = index === 1;
                return (
                  <article
                    key={plan.name}
                    className={`flex flex-col justify-between rounded-3xl border p-7 sm:p-8 transition ${
                      isFeatured
                        ? "border-2 border-[#12110E] bg-white text-[#12110E] shadow-xl ring-1 ring-black/5"
                        : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#52504A]">
                          0{index + 1}
                        </span>
                        {isFeatured && (
                          <span className="rounded-full bg-[#12110E] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                            {tx("ÉQUILIBRE")}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-6 font-serif text-3xl font-medium text-[#12110E]">{tx(plan.name)}</h3>
                      <p className="mt-2 text-xs text-[#52504A]">
                        {tx(plan.badge)}
                      </p>
                      <div className="mt-6 flex items-baseline gap-2 border-y border-[#EBEBE6] py-5">
                        <span className="font-serif text-5xl font-semibold text-[#12110E]">{price(plan.price)}</span>
                        <span className="font-mono text-xs text-[#52504A]">
                          {tx("/ mois")}
                        </span>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-3 text-sm leading-5 text-[#2B2925]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                            <span>{tx(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 space-y-2.5">
                      <AddToCartBtn
                        item={{
                          serviceId: "maintenance",
                          serviceName: "WebCare",
                          planName: tx(plan.name),
                          priceEur: plan.price,
                          period: "month",
                          periodLabel: tx("/ mois"),
                        }}
                        popular={isFeatured}
                      />
                      <a
                        href={`${CONTACT.whatsapp}?text=${encodeURIComponent(waMsgFor(tx(plan.name), plan.price, tx("/ mois")))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-5 py-2.5 text-xs font-semibold text-[#12110E] transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                        <span>{tx("Parler à XR Agency")}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Scope breakdown (fixed untranslated feature bug) */}
        <section className="border-t border-[#171613]/10 bg-[#EEE9E0] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="mb-8">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                {tx("Lecture rapide")}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium text-[#171613] sm:text-5xl">
                {tx("Ce que chaque niveau couvre.")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#57534B]">
                {tx("Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.")}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <article
                  key={plan.name + "-detail"}
                  className="rounded-3xl border border-[#171613]/10 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7D6445]">
                      0{index + 1} · {tx(plan.name).toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] text-[#57534B]">
                      {plan.features.length} {tx("éléments")}
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex gap-3 text-sm leading-5 text-[#45413A]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9E7F5A]" />
                        <span>{tx(feature)}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#171613]/10 bg-[#F7F4EE] py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <Sparkles className="mx-auto h-5 w-5 text-[#9E7F5A]" />
            <h2 className="mt-4 font-serif text-3xl font-medium text-[#171613] sm:text-5xl">
              {tx("Un site propre, sans abonnement incompréhensible.")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#57534B]">
              {tx("79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.")}
            </p>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
