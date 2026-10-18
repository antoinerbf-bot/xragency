import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, LifeBuoy, ShieldCheck, Sparkles, Wrench, ServerCog } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { ServiceIllustration } from "@/components/site/ServiceIllustration";
import { Parallax } from "@/components/site/primitives";
import { Contact } from "@/components/site/Contact";
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
  },
};
function translateWebCare(value: string, lang: Lang) { return WEBCARE_TRANSLATIONS[lang][value] ?? value; }

const plans = [
  { name: "Essentiel", price: 29, badge: "Pour les corrections courantes", features: ["4 modifications / mois", "Corrections de contenu et visuels", "Interventions techniques courantes", "Suivi standard", "Demandes regroupées et traitées au fil du mois"] },
  { name: "Business", price: 49, badge: "Pour faire évoluer le site régulièrement", features: ["10 modifications / mois", "Corrections de contenu, visuels et sections", "Interventions techniques courantes", "Priorité de traitement", "Conseils d'évolution courante"] },
  { name: "Unlimited", price: 99, badge: "Pour déléguer le quotidien", features: ["Modifications courantes illimitées dans le périmètre du site", "Corrections de contenu, visuels et sections", "Suivi technique prioritaire", "Petites évolutions incluses", "Refontes, fonctionnalités majeures et développements spécifiques sur devis"] },
];

function WebCarePage() {
  const { lang } = useLang();
  const tx = (value: string) => translateWebCare(value, lang);
  return <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav />
    <main className="pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-24 lg:py-32"><Parallax speed={0.04} className="pointer-events-none absolute -inset-[8%] opacity-30"><img src={XR_PHOTOS.maintenance} alt="" aria-hidden="true" className="h-[116%] w-full object-cover object-center blur-[1px]" /></Parallax>
        <div className="absolute inset-0 bg-background/85" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,hsl(var(--primary)/.18),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="max-w-4xl lg:col-span-7">
            <span className="label-mono text-[10px] uppercase tracking-[0.25em] text-primary">XR AGENCY · 06 · WEBCARE</span>
            <h1 className="display-serif mt-6 text-[clamp(3.2rem,8vw,7rem)] leading-[.86]">{tx("Votre site évolue.")}<br/><em className="not-italic italic text-primary">{tx("Nous aussi.")}</em></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{tx("Maintenance courante, corrections et évolutions légères : une formule claire pour garder votre site propre, à jour et exploitable sans transformer chaque petite demande en nouveau devis.")}</p>
          </div>
          <Parallax speed={-0.035} className="lg:col-span-5">
            <div className="relative">
              <ServiceIllustration service="maintenance" title="WEBCARE" />
            </div>
          </Parallax>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[2rem] border border-primary/30 bg-primary/[.06] p-7 shadow-xl">
              <div className="flex items-center gap-3"><ServerCog className="h-6 w-6 text-primary"/><span className="label-mono text-[10px] uppercase tracking-[.18em] text-primary">{tx("Infrastructure annuelle")}</span></div>
              <div className="mt-5 flex items-end gap-2"><span className="display-serif text-6xl text-primary">79 €</span><span className="mb-2 label-mono text-[9px] text-muted-foreground">/ an</span></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tx("XR Agency gère l'hébergement, le nom de domaine et la sécurité de l'infrastructure.")}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">{["Hébergement","Nom de domaine","Sécurité"].map(x=><div key={x} className="rounded-xl border border-border bg-background/70 p-3 text-center text-[10px] font-medium">{tx(x)}</div>)}</div>
            </div>
            <div className="rounded-[2rem] border border-border bg-card/60 p-7">
              <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary"/><span className="label-mono text-[10px] uppercase tracking-[.18em] text-primary">{tx("À retenir")}</span></div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{tx("Les 79 € / an couvrent l'infrastructure. Les interventions de maintenance et d'évolution sont choisies séparément selon votre besoin.")}</p>
              <p className="mt-4 text-xs text-muted-foreground">{tx("Les développements majeurs, refontes et nouvelles fonctionnalités font toujours l'objet d'un devis spécifique.")}</p>
            </div>
          </div>
        </div>
      </section>
      <Parallax speed={-0.025}><section className="border-b border-border/60 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-3 md:grid-cols-3">
            {[[LifeBuoy,"Corrections","Petites modifications de contenu, visuels et sections."],[Wrench,"Évolutions","Ajustements courants pour que le site reste utile."],[ShieldCheck,"Suivi","Surveillance et interventions techniques selon la formule choisie."]].map(([Icon,title,desc])=>{const I=Icon as typeof LifeBuoy;return <div key={String(title)} className="rounded-[1.5rem] border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40"><I className="h-5 w-5 text-primary"/><h2 className="display-serif mt-6 text-3xl">{tx(String(title))}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{tx(String(desc))}</p></div>})}
          </div>
        </div>
      </section></Parallax>
      <section id="plans" className="relative overflow-hidden py-20 lg:py-28"><div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><span className="label-mono text-[10px] uppercase tracking-[0.25em] text-primary">{tx("Maintenance mensuelle")}</span><h2 className="display-serif mt-4 text-4xl sm:text-6xl">{tx("Choisissez votre niveau")}<br/>{tx("d'accompagnement.")}</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">{tx("Les volumes concernent les demandes courantes. Les travaux hors périmètre restent séparés pour préserver une charge de travail réaliste.")}</p></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan,index)=><article key={plan.name} className={`rounded-[1.75rem] border p-7 transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${index===1?"border-primary/50 bg-primary/[0.05]":"border-border bg-card/60"}`}><div className="flex items-center justify-between"><span className="label-mono text-[9px] text-primary">0{index+1}</span>{index===1&&<span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[8px] text-primary">{tx("ÉQUILIBRE")}</span>}</div><h3 className="display-serif mt-7 text-3xl">{tx(plan.name)}</h3><p className="mt-2 text-xs text-muted-foreground">{tx(plan.badge)}</p><div className="mt-6 flex items-end gap-2 border-y border-border py-5"><span className="display-serif text-5xl text-primary">{plan.price} €</span><span className="label-mono mb-1 text-[9px] text-muted-foreground">/ mois</span></div><ul className="mt-6 space-y-3">{plan.features.map(feature=><li key={tx(feature)} className="flex gap-3 text-sm leading-5 text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{tx(feature)}</li>)}</ul><a href={`https://wa.me/33767566783?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler du forfait WebCare « ${plan.name} » à ${plan.price} €/mois.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">{tx("Parler à XR Agency")} <ArrowRight className="h-4 w-4"/></a></article>)}
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8">
            <span className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">{tx("Lecture rapide")}</span>
            <h2 className="display-serif mt-4 text-4xl sm:text-5xl">{tx("Ce que chaque niveau couvre.")}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{tx("Les points ci-dessous reprennent les éléments de chaque formule, afin de rendre le périmètre lisible avant de choisir.")}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan,index) => (
              <article key={plan.name + "-detail"} className="rounded-[1.5rem] border border-border bg-card/45 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="label-mono text-[8px] tracking-[.18em] text-primary">0{index + 1} · {plan.name.toUpperCase()}</span>
                  <span className="label-mono text-[8px] text-muted-foreground">{plan.features.length} {tx("éléments")}</span>
                </div>
                <div className="mt-6 space-y-3">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex gap-3 text-sm leading-5 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>
                      {feature}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 py-16"><div className="mx-auto max-w-3xl px-5 text-center"><Sparkles className="mx-auto h-5 w-5 text-primary"/><h2 className="display-serif mt-4 text-4xl sm:text-5xl">{tx("Un site propre, sans abonnement incompréhensible.")}</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">{tx("79 € / an pour l'infrastructure, puis le niveau de maintenance dont vous avez réellement besoin. Les évolutions importantes sont toujours cadrées séparément.")}</p></div></section>
    </main><Contact />
  </div>;
}
