import { useState } from "react";
import {
  ArrowRight,
  Check,
  Instagram,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT, SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    price: 349,
    name: "Présence Essentielle",
    audience: "Être présent sans devoir tout gérer.",
    networks: 1,
    posts: 8,
    stories: 0,
    videos: 0,
    comments: "Modération légère",
    dm: "Non inclus",
    reports: "1 / mois",
    features: [
      "Calendrier éditorial mensuel",
      "Visuels + rédaction",
      "8 publications / mois",
      "Programmation des publications",
      "Modération légère",
    ],
  },
  {
    price: 599,
    name: "Croissance Active",
    audience: "Accélérer la présence et déléguer davantage.",
    networks: 2,
    posts: 20,
    stories: 0,
    videos: 0,
    comments: "Modération et réponses courantes",
    dm: "Selon planning",
    reports: "1 / mois",
    features: [
      "Calendrier éditorial mensuel",
      "Visuels + copywriting",
      "20 publications / mois",
      "Stories / formats courts selon planning",
      "Publication sur 2 réseaux",
      "Modération et réponses courantes",
      "Reporting mensuel",
    ],
  },
  {
    price: 799,
    name: "Domination Sociale",
    audience: "Nous prenons en charge votre présence sociale.",
    networks: 3,
    posts: 30,
    stories: 0,
    videos: 0,
    comments: "Modération renforcée",
    dm: "Selon besoin",
    reports: "1 / mois",
    features: [
      "Création, rédaction et programmation",
      "30 publications / mois",
      "Stories / formats courts",
      "Publication sur 3 réseaux",
      "Modération renforcée",
      "Veille + reporting mensuel",
    ],
  },
] as const;

const PLAN_COPY = {
  fr: [
    {
      name: "Présence Essentielle",
      audience: "Être présent sans devoir tout gérer.",
      comments: "Modération légère",
      dm: "Non inclus",
      reports: "1 / mois",
      features: [
        "Calendrier éditorial mensuel",
        "Visuels et rédaction",
        "8 publications / mois",
        "Programmation des publications",
        "Modération légère",
      ],
    },
    {
      name: "Croissance Active",
      audience: "Accélérer la présence et déléguer davantage.",
      comments: "Modération et réponses courantes",
      dm: "Selon planning",
      reports: "1 / mois",
      features: [
        "Calendrier éditorial mensuel",
        "Visuels et rédaction",
        "20 publications / mois",
        "Stories et formats courts selon planning",
        "Publication sur 2 réseaux",
        "Modération et réponses courantes",
        "Reporting mensuel",
      ],
    },
    {
      name: "Domination Sociale",
      audience: "Nous prenons en charge votre présence sociale.",
      comments: "Modération renforcée",
      dm: "Selon besoin",
      reports: "1 / mois",
      features: [
        "Création, rédaction et programmation",
        "30 publications / mois",
        "Stories et formats courts",
        "Publication sur 3 réseaux",
        "Modération renforcée",
        "Veille et reporting mensuel",
      ],
    },
  ],
  en: [
    {
      name: "Essential Presence",
      audience: "Stay visible without managing every detail.",
      comments: "Light moderation",
      dm: "Not included",
      reports: "1 / month",
      features: [
        "Monthly editorial calendar",
        "Visuals and copywriting",
        "8 posts / month",
        "Post scheduling",
        "Light moderation",
      ],
    },
    {
      name: "Active Growth",
      audience: "Build a stronger presence and delegate more.",
      comments: "Moderation and routine replies",
      dm: "As scheduled",
      reports: "1 / month",
      features: [
        "Monthly editorial calendar",
        "Visuals and copywriting",
        "20 posts / month",
        "Stories and short formats as scheduled",
        "Publishing on 2 networks",
        "Moderation and routine replies",
        "Monthly reporting",
      ],
    },
    {
      name: "Social Leadership",
      audience: "We manage your social presence end to end.",
      comments: "Enhanced moderation",
      dm: "As needed",
      reports: "1 / month",
      features: [
        "Creation, copywriting and scheduling",
        "30 posts / month",
        "Stories and short formats",
        "Publishing on 3 networks",
        "Enhanced moderation",
        "Monitoring and monthly reporting",
      ],
    },
  ],
  vi: [
    {
      name: "Hiện diện Cơ bản",
      audience: "Duy trì hiện diện mà không phải tự quản lý mọi việc.",
      comments: "Kiểm duyệt cơ bản",
      dm: "Không bao gồm",
      reports: "1 / tháng",
      features: [
        "Lịch nội dung hằng tháng",
        "Hình ảnh và biên tập nội dung",
        "8 bài đăng / tháng",
        "Lên lịch đăng bài",
        "Kiểm duyệt cơ bản",
      ],
    },
    {
      name: "Tăng trưởng Chủ động",
      audience: "Mở rộng hiện diện và ủy quyền nhiều hơn.",
      comments: "Kiểm duyệt và trả lời thông thường",
      dm: "Theo kế hoạch",
      reports: "1 / tháng",
      features: [
        "Lịch nội dung hằng tháng",
        "Hình ảnh và biên tập nội dung",
        "20 bài đăng / tháng",
        "Stories và nội dung ngắn theo kế hoạch",
        "Đăng trên 2 nền tảng",
        "Kiểm duyệt và trả lời thông thường",
        "Báo cáo hằng tháng",
      ],
    },
    {
      name: "Dẫn đầu Mạng xã hội",
      audience: "Chúng tôi quản lý toàn diện hiện diện mạng xã hội.",
      comments: "Kiểm duyệt tăng cường",
      dm: "Theo nhu cầu",
      reports: "1 / tháng",
      features: [
        "Sáng tạo, biên tập và lên lịch",
        "30 bài đăng / tháng",
        "Stories và nội dung ngắn",
        "Đăng trên 3 nền tảng",
        "Kiểm duyệt tăng cường",
        "Theo dõi và báo cáo hằng tháng",
      ],
    },
  ],
  ar: [
    {
      name: "الحضور الأساسي",
      audience: "حافظ على حضورك دون إدارة كل التفاصيل بنفسك.",
      comments: "إشراف أساسي",
      dm: "غير مشمول",
      reports: "مرة شهرياً",
      features: [
        "تقويم تحريري شهري",
        "تصميمات وكتابة المحتوى",
        "8 منشورات شهرياً",
        "جدولة المنشورات",
        "إشراف أساسي",
      ],
    },
    {
      name: "النمو النشط",
      audience: "عزّز حضورك وفوّض المزيد من المهام.",
      comments: "إشراف وردود اعتيادية",
      dm: "وفق الجدول",
      reports: "مرة شهرياً",
      features: [
        "تقويم تحريري شهري",
        "تصميمات وكتابة المحتوى",
        "20 منشوراً شهرياً",
        "قصص ومحتوى قصير وفق الجدول",
        "النشر على شبكتين",
        "إشراف وردود اعتيادية",
        "تقرير شهري",
      ],
    },
    {
      name: "الريادة الاجتماعية",
      audience: "نتولى إدارة حضورك على الشبكات الاجتماعية.",
      comments: "إشراف موسّع",
      dm: "حسب الحاجة",
      reports: "مرة شهرياً",
      features: [
        "إنشاء المحتوى وكتابته وجدولته",
        "30 منشوراً شهرياً",
        "قصص ومحتوى قصير",
        "النشر على ثلاث شبكات",
        "إشراف موسّع",
        "متابعة وتقرير شهري",
      ],
    },
  ],
  ru: [
    {
      name: "Базовое присутствие",
      audience: "Оставайтесь заметными без самостоятельного управления всем процессом.",
      comments: "Базовая модерация",
      dm: "Не включено",
      reports: "1 в месяц",
      features: [
        "Ежемесячный контент-план",
        "Визуалы и тексты",
        "8 публикаций в месяц",
        "Планирование публикаций",
        "Базовая модерация",
      ],
    },
    {
      name: "Активный рост",
      audience: "Усильте присутствие и делегируйте больше задач.",
      comments: "Модерация и типовые ответы",
      dm: "По графику",
      reports: "1 в месяц",
      features: [
        "Ежемесячный контент-план",
        "Визуалы и тексты",
        "20 публикаций в месяц",
        "Stories и короткие форматы по плану",
        "Публикации в 2 сетях",
        "Модерация и типовые ответы",
        "Ежемесячный отчёт",
      ],
    },
    {
      name: "Социальное лидерство",
      audience: "Берём управление присутствием бренда в соцсетях на себя.",
      comments: "Расширенная модерация",
      dm: "По необходимости",
      reports: "1 в месяц",
      features: [
        "Создание, тексты и планирование",
        "30 публикаций в месяц",
        "Stories и короткие форматы",
        "Публикации в 3 сетях",
        "Расширенная модерация",
        "Мониторинг и ежемесячный отчёт",
      ],
    },
  ],
} as const;

export function SocialManagementExperience() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState(1);
  const plan = PLANS[selected];
  const localizedPlan = PLAN_COPY[lang]?.[selected] ?? PLAN_COPY.fr[selected];
  const canonicalService = SERVICES.find((service) => service.id === "social");
  const wa = encodeURIComponent(
    `Bonjour XR Agency, je souhaite choisir le forfait Social « ${localizedPlan.name} » à ${plan.price} €/mois.`,
  );
  const copy = {
    fr: {
      eyebrow: "COMMUNITY MANAGEMENT",
      title: "Votre présence sociale devient un véritable système.",
      intro:
        "Pas une succession de posts. Une direction éditoriale, du contenu, de l’animation et du pilotage — avec un niveau de délégation clair.",
      content: "Un mois de contenu",
      included: "Inclus dans ce niveau",
      cta: "Choisir ce forfait",
      language: "1 langue incluse · +100 € / langue supplémentaire",
      note: "Shooting photo/vidéo, déplacement, mannequins, studio et production sur site sur devis. Publicité payante non incluse.",
    },
    en: {
      eyebrow: "COMMUNITY MANAGEMENT",
      title: "Your social presence becomes a real operating system.",
      intro:
        "Not a sequence of posts. Editorial direction, content, community and reporting — with a clearly defined level of delegation.",
      content: "One month of content",
      included: "Included at this level",
      cta: "Choose this plan",
      language: "1 language included · +€100 / additional language",
      note: "Photo/video shoots, travel, models, studio and on-site production quoted separately. Paid advertising not included.",
    },
    vi: {
      eyebrow: "QUẢN LÝ CỘNG ĐỒNG",
      title: "Biến hiện diện mạng xã hội thành một hệ thống thực sự.",
      intro:
        "Không chỉ là chuỗi bài đăng. Chiến lược nội dung, sáng tạo, cộng đồng và báo cáo với mức độ ủy quyền rõ ràng.",
      content: "Một tháng nội dung",
      included: "Bao gồm ở cấp độ này",
      cta: "Chọn gói",
      language: "1 ngôn ngữ · +100 € / ngôn ngữ bổ sung",
      note: "Quay chụp, di chuyển, studio và sản xuất tại chỗ báo giá riêng. Quảng cáo trả phí không bao gồm.",
    },
    ar: {
      eyebrow: "إدارة المجتمع",
      title: "حضورك على الشبكات الاجتماعية يصبح نظامًا متكاملًا.",
      intro:
        "ليس مجرد سلسلة منشورات، بل استراتيجية محتوى وإبداع وإدارة مجتمع وتقارير مع مستوى تفويض واضح.",
      content: "محتوى شهر كامل",
      included: "المشمول في هذا المستوى",
      cta: "اختر الباقة",
      language: "لغة واحدة · +100 € لكل لغة إضافية",
      note: "التصوير والتنقل والاستوديو والإنتاج الميداني بتسعير منفصل. الإعلانات المدفوعة غير مشمولة.",
    },
    ru: {
      eyebrow: "КОМЬЮНИТИ-МЕНЕДЖМЕНТ",
      title: "Ваше присутствие в соцсетях становится системой.",
      intro:
        "Не просто поток публикаций: контент-стратегия, создание, комьюнити и отчётность с понятным уровнем делегирования.",
      content: "Контент на месяц",
      included: "Включено на этом уровне",
      cta: "Выбрать пакет",
      language: "1 язык · +100 € за дополнительный язык",
      note: "Съёмка, выезды, студия и производство на месте рассчитываются отдельно. Платная реклама не включена.",
    },
  }[lang] ?? {
    eyebrow: "COMMUNITY MANAGEMENT",
    title: "Your social presence becomes a real operating system.",
    intro:
      "Editorial direction, content, community and reporting — with a clearly defined level of delegation.",
    content: "One month of content",
    included: "Included at this level",
    cta: "Choose this plan",
    language: "1 language included · +€100 / additional language",
    note: "Photo/video shoots and on-site production quoted separately. Paid advertising not included.",
  };
  return (
    <section id="plans" className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="label-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              {copy.eyebrow} · 05
            </p>
            <h2 className="display-serif mt-4 max-w-5xl text-4xl leading-[.92] sm:text-6xl lg:text-7xl">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {copy.intro}
            </p>
          </div>
          <div className="relative hidden min-h-[190px] overflow-hidden rounded-[2rem] border border-border bg-background lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/.18),transparent_42%)]" />
            <div className="absolute left-8 top-8 flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xl backdrop-blur">
              <Instagram className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">XR / SOCIAL</span>
            </div>
            <div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xl backdrop-blur">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs">+ présence · + cohérence · + conversion</span>
            </div>
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-primary/10" />
          </div>
        </div>
        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {PLANS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(index)}
              className={cn(
                "group relative overflow-hidden rounded-[1.5rem] border p-5 text-left transition-all duration-300 sm:p-6",
                selected === index
                  ? "border-primary bg-primary/[0.07] shadow-2xl -translate-y-1"
                  : "border-border bg-background/60 hover:-translate-y-1 hover:border-primary/40",
              )}
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <span className="label-mono text-[9px] text-primary">0{index + 1}</span>
                {index === 1 && (
                  <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[8px] text-primary">
                    RECOMMANDÉ
                  </span>
                )}
              </div>
              <h3 className="display-serif mt-7 text-3xl sm:text-4xl">
                {PLAN_COPY[lang]?.[index]?.name ?? PLAN_COPY.fr[index].name}
              </h3>
              <p className="mt-3 min-h-10 text-xs leading-5 text-muted-foreground">
                {PLAN_COPY[lang]?.[index]?.audience ?? PLAN_COPY.fr[index].audience}
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span className="display-serif text-5xl text-primary">{item.price} €</span>
                <span className="label-mono mb-1 text-[9px] text-muted-foreground">/ mois</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-border px-2 py-1 text-[8px]">
                  {item.networks} réseau{item.networks > 1 ? "x" : ""}
                </span>
                <span className="rounded-full border border-border px-2 py-1 text-[8px]">
                  {item.posts} publications
                </span>
                <span className="rounded-full border border-border px-2 py-1 text-[8px]">
                  {item.videos} vidéos
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">
          <div className="grid lg:grid-cols-[.7fr_1.3fr]">
            <div className="relative overflow-hidden border-b border-border bg-primary/[0.05] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[9px] text-primary">0{selected + 1} / 03</span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h3 className="display-serif mt-7 text-4xl sm:text-5xl">{plan.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {localizedPlan.audience}
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-border bg-background/70 p-4">
                    <Users className="h-4 w-4 text-primary" />
                    <strong className="mt-3 block text-2xl">{plan.networks}</strong>
                    <span className="label-mono text-[8px] text-muted-foreground">
                      {t({
                        fr: "RÉSEAUX",
                        en: "NETWORKS",
                        vi: "NỀN TẢNG",
                        ar: "الشبكات",
                        ru: "СЕТИ",
                      })}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/70 p-4">
                    <Play className="h-4 w-4 text-primary" />
                    <strong className="mt-3 block text-2xl">{plan.videos}</strong>
                    <span className="label-mono text-[8px] text-muted-foreground">
                      {t({
                        fr: "VIDÉOS / MOIS",
                        en: "VIDEOS / MONTH",
                        vi: "VIDEO / THÁNG",
                        ar: "فيديو / شهر",
                        ru: "ВИДЕО / МЕСЯЦ",
                      })}
                    </span>
                  </div>
                </div>
                <a
                  href={`${CONTACT.whatsapp}?text=${wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
                >
                  {copy.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="p-7 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="label-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                    {copy.content}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t({
                      fr: "Une production visible, mesurable et structurée.",
                      en: "Visible, measurable and structured production.",
                      vi: "Sản xuất có thể nhìn thấy, đo lường và có cấu trúc.",
                      ar: "إنتاج واضح وقابل للقياس ومنظم.",
                      ru: "Понятное, измеримое и структурированное производство.",
                    })}
                  </p>
                </div>
                <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 sm:flex">
                  <Send className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  [
                    plan.posts,
                    t({
                      fr: "PUBLICATIONS",
                      en: "POSTS",
                      vi: "BÀI ĐĂNG",
                      ar: "منشورات",
                      ru: "ПУБЛИКАЦИИ",
                    }),
                  ],
                  [
                    plan.stories,
                    t({ fr: "STORIES", en: "STORIES", vi: "STORIES", ar: "قصص", ru: "STORIES" }),
                  ],
                  [
                    plan.videos,
                    t({
                      fr: "VIDÉOS COURTES",
                      en: "SHORT VIDEOS",
                      vi: "VIDEO NGẮN",
                      ar: "فيديو قصير",
                      ru: "КОРОТКИЕ ВИДЕО",
                    }),
                  ],
                  [
                    plan.networks,
                    t({ fr: "RÉSEAUX", en: "NETWORKS", vi: "NỀN TẢNG", ar: "الشبكات", ru: "СЕТИ" }),
                  ],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="group rounded-2xl border border-border p-4 transition-colors hover:border-primary/40"
                  >
                    <span className="display-serif text-3xl text-primary">{value}</span>
                    <span className="label-mono mt-1 block text-[8px] leading-4 text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-2 sm:grid-cols-3">
                {[
                  [
                    t({
                      fr: "Commentaires",
                      en: "Comments",
                      vi: "Bình luận",
                      ar: "التعليقات",
                      ru: "Комментарии",
                    }),
                    localizedPlan.comments,
                  ],
                  [
                    t({
                      fr: "Messages privés",
                      en: "Direct messages",
                      vi: "Tin nhắn riêng",
                      ar: "الرسائل الخاصة",
                      ru: "Личные сообщения",
                    }),
                    localizedPlan.dm,
                  ],
                  [
                    t({
                      fr: "Reporting",
                      en: "Reporting",
                      vi: "Báo cáo",
                      ar: "التقارير",
                      ru: "Отчётность",
                    }),
                    localizedPlan.reports,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-card/40 p-4">
                    <span className="label-mono text-[8px] uppercase text-primary">{label}</span>
                    <p className="mt-2 text-xs font-medium leading-5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9">
                <p className="label-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                  {copy.included}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {localizedPlan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 rounded-xl border border-border/60 p-3 text-xs leading-5 text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-[9px] leading-5 text-muted-foreground sm:flex-row sm:justify-between">
          <span>{copy.language}</span>
          <span>{copy.note}</span>
        </div>
      </div>
    </section>
  );
}
