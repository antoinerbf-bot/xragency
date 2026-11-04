import { ArrowRight, ArrowUpRight, Play, Plus, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ORDERED_SERVICES } from "./HomeServices";
import { Reveal } from "./primitives";
import { useFunnel } from "@/lib/funnel";
import { PORTFOLIO_REFERENCES } from "@/lib/portfolioReferences";
import { XR_HERO_PHOTO, XR_PHOTOS } from "@/lib/photography";

const COPY = {
  fr: {
    servicesEyebrow: "LES EXPERTISES XR AGENCY",
    servicesTitle: "Une maison. Sept expertises. Un même niveau d’exigence.",
    servicesLead: "Des solutions complémentaires, conçues pour construire une présence digitale cohérente et performante.",
    from: "À partir de",
    month: "/ mois",
    year: "/ an",
    once: "paiement unique",
    discover: "Découvrir",
    add: "Ajouter au devis",
    added: "Ajouté au devis",
    reelEyebrow: "XR AGENCY · PROJET À LA UNE",
    reelTitle: "Des expériences digitales pensées pour convaincre.",
    reelLead: "Découvrez un projet réalisé par XR Agency, puis explorez nos autres réalisations.",
    reelMissing: "Un projet réel, une expérience digitale conçue pour une activité concrète.",
    watch: "Voir les réalisations",
    portfolioEyebrow: "PROJET XR AGENCY",
    portfolioTitle: "Du concret, pas des projets fictifs.",
    portfolioLead: "Une sélection volontairement limitée aux références réellement réalisées par XR Agency.",
    visit: "Voir le projet",
    methodEyebrow: "NOTRE MÉTHODE",
    methodTitle: "De l’idée à la performance.",
    steps: [
      ["01", "Audit & stratégie", "Comprendre votre activité, vos objectifs et vos priorités."],
      ["02", "Création & production", "Concevoir les supports, contenus et expériences adaptés."],
      ["03", "Mise en place", "Déployer les outils et parcours validés ensemble."],
      ["04", "Suivi & optimisation", "Mesurer, ajuster et faire évoluer les dispositifs."],
    ],
  },
  en: {
    servicesEyebrow: "XR AGENCY EXPERTISE",
    servicesTitle: "One studio. Seven disciplines. One standard of care.",
    servicesLead: "Complementary solutions designed to build a coherent, effective digital presence.",
    from: "From",
    month: "/ month",
    year: "/ year",
    once: "one-time payment",
    discover: "Explore",
    add: "Add to quote",
    added: "Added to quote",
    reelEyebrow: "XR AGENCY · PROJET À LA UNE",
    reelTitle: "Digital experiences designed to make an impact.",
    reelLead: "Explore a project delivered by XR Agency, then discover more of our work.",
    reelMissing: "A real project and a digital experience built for a real business.",
    watch: "Explore projects",
    portfolioEyebrow: "XR AGENCY PROJECT",
    portfolioTitle: "Real work, not invented case studies.",
    portfolioLead: "A deliberately focused selection of projects actually delivered by XR Agency.",
    visit: "View project",
    methodEyebrow: "OUR METHOD",
    methodTitle: "From idea to performance.",
    steps: [
      ["01", "Audit & strategy", "Understand your business, goals and priorities."],
      ["02", "Creation & production", "Design the right assets, content and experiences."],
      ["03", "Implementation", "Deploy the tools and journeys agreed together."],
      ["04", "Monitoring & optimisation", "Measure, refine and evolve the work."],
    ],
  },
  vi: {
    servicesEyebrow: "CHUYÊN MÔN XR AGENCY",
    servicesTitle: "Một studio. Bảy chuyên môn. Một tiêu chuẩn chất lượng.",
    servicesLead: "Các giải pháp bổ trợ giúp xây dựng hiện diện số nhất quán và hiệu quả.",
    from: "Từ",
    month: "/ tháng",
    year: "/ năm",
    once: "thanh toán một lần",
    discover: "Khám phá",
    add: "Thêm vào báo giá",
    added: "Đã thêm vào báo giá",
    reelEyebrow: "XR AGENCY · DỰ ÁN NỔI BẬT",
    reelTitle: "Trải nghiệm số được thiết kế để tạo khác biệt.",
    reelLead: "Khám phá một dự án do XR Agency thực hiện và các dự án khác.",
    reelMissing: "Một dự án thực tế và trải nghiệm số dành cho một doanh nghiệp thực tế.",
    watch: "Xem dự án",
    portfolioEyebrow: "DỰ ÁN XR AGENCY",
    portfolioTitle: "Dự án thực tế, không phải ví dụ hư cấu.",
    portfolioLead: "Chỉ giới thiệu những dự án thực sự do XR Agency thực hiện.",
    visit: "Xem dự án",
    methodEyebrow: "PHƯƠNG PHÁP",
    methodTitle: "Từ ý tưởng đến hiệu quả.",
    steps: [
      ["01", "Phân tích & chiến lược", "Tìm hiểu hoạt động, mục tiêu và ưu tiên của bạn."],
      ["02", "Sáng tạo & sản xuất", "Thiết kế nội dung và trải nghiệm phù hợp."],
      ["03", "Triển khai", "Cài đặt các công cụ và hành trình đã thống nhất."],
      ["04", "Theo dõi & tối ưu", "Đo lường, điều chỉnh và phát triển."],
    ],
  },
  ar: {
    servicesEyebrow: "خبرات XR AGENCY",
    servicesTitle: "استوديو واحد. سبعة تخصصات. معيار واحد للجودة.",
    servicesLead: "حلول متكاملة لبناء حضور رقمي متناسق وفعّال.",
    from: "ابتداءً من",
    month: "/ شهريًا",
    year: "/ سنويًا",
    once: "دفعة واحدة",
    discover: "اكتشف",
    add: "أضف إلى العرض",
    added: "أُضيف إلى العرض",
    reelEyebrow: "XR AGENCY · مشروع مميز",
    reelTitle: "تجارب رقمية مصممة لإحداث فرق.",
    reelLead: "اكتشف مشروعًا نفذته XR Agency ثم استكشف أعمالنا الأخرى.",
    reelMissing: "مشروع حقيقي وتجربة رقمية مصممة لنشاط حقيقي.",
    watch: "استكشف المشاريع",
    portfolioEyebrow: "مشروع XR AGENCY",
    portfolioTitle: "أعمال حقيقية، لا دراسات حالة وهمية.",
    portfolioLead: "مجموعة محدودة تضم المشاريع التي نفذتها XR Agency فعليًا فقط.",
    visit: "عرض المشروع",
    methodEyebrow: "منهجيتنا",
    methodTitle: "من الفكرة إلى الأداء.",
    steps: [
      ["01", "التدقيق والاستراتيجية", "فهم نشاطك وأهدافك وأولوياتك."],
      ["02", "الإبداع والإنتاج", "تصميم الأصول والمحتوى والتجارب المناسبة."],
      ["03", "التنفيذ", "إطلاق الأدوات والمسارات المتفق عليها."],
      ["04", "المتابعة والتحسين", "القياس والتطوير والتحسين المستمر."],
    ],
  },
  ru: {
    servicesEyebrow: "ЭКСПЕРТИЗА XR AGENCY",
    servicesTitle: "Одна студия. Семь направлений. Единый стандарт качества.",
    servicesLead: "Комплексные решения для последовательного и эффективного цифрового присутствия.",
    from: "От",
    month: "/ месяц",
    year: "/ год",
    once: "разовый платёж",
    discover: "Подробнее",
    add: "Добавить в смету",
    added: "Добавлено в смету",
    reelEyebrow: "XR AGENCY · ИЗБРАННЫЙ ПРОЕКТ",
    reelTitle: "Цифровые решения, которые работают на ваш бренд.",
    reelLead: "Посмотрите проект XR Agency и другие наши работы.",
    reelMissing: "Реальный проект и цифровой опыт для реального бизнеса.",
    watch: "Посмотреть проекты",
    portfolioEyebrow: "ПРОЕКТ XR AGENCY",
    portfolioTitle: "Реальная работа, а не вымышленные кейсы.",
    portfolioLead: "Здесь представлены только проекты, действительно выполненные XR Agency.",
    visit: "Открыть проект",
    methodEyebrow: "НАШ МЕТОД",
    methodTitle: "От идеи к результату.",
    steps: [
      ["01", "Аудит и стратегия", "Изучаем бизнес, цели и приоритеты."],
      ["02", "Создание и продакшн", "Разрабатываем подходящие материалы и решения."],
      ["03", "Внедрение", "Запускаем согласованные инструменты и сценарии."],
      ["04", "Контроль и оптимизация", "Измеряем результаты и улучшаем решения."],
    ],
  },
} as const;

function ServiceDestination({ id, children }: { id: string; children: React.ReactNode }) {
  if (id === "maintenance") return <Link to="/services/webcare">{children}</Link>;
  if (id === "robotics") return <Link to="/services/robotique">{children}</Link>;
  if (id === "seo") return <Link to="/services/seo">{children}</Link>;
  if (id === "maps") return <Link to="/services/maps">{children}</Link>;
  return <Link to="/services/$serviceId" params={{ serviceId: id }}>{children}</Link>;
}

export function HomepageExperience() {
  const { lang, t, price } = useLang();
  const copy = COPY[(lang in COPY ? lang : "fr") as Lang];
  const funnel = useFunnel();
  const showreelUrl = import.meta.env.VITE_XR_SHOWREEL_VIDEO_URL as string | undefined;
  const ownedProjects = PORTFOLIO_REFERENCES.filter((project) => project.origin === "XR Agency");
  const featuredProject = ownedProjects[0];

  return (
    <>
      <section id="homepage-services" data-section="homepage-services" className="relative overflow-hidden border-y border-[#b9a98f]/25 bg-[#f6f0e6] py-14 text-[#191713] sm:py-20">
        <span id="services" aria-hidden="true" className="absolute -top-24" />
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
              <span className="label-mono text-[8px] font-semibold uppercase tracking-[.26em] text-[#9b6a32]">{copy.servicesEyebrow}</span>
              <h2 className="display-serif mt-3 text-[clamp(2rem,4.2vw,4rem)] leading-[.98] tracking-[-.045em]">{copy.servicesTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#62594e] sm:text-base">{copy.servicesLead}</p>
            </div>
          </Reveal>

          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-4">
            {ORDERED_SERVICES.map((item, index) => {
              const service = SERVICES.find((entry) => entry.id === item.id);
              if (!service) return null;
              const selected = funnel.selectedServices.includes(item.funnelId);
              const Icon = item.icon;
              const period = item.period === "month" ? copy.month : item.period === "year" ? copy.year : copy.once;
              return (
                <div key={item.id} className="w-[78vw] shrink-0 snap-start sm:w-auto">
                <Reveal delay={index * 45}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#b7a58c]/35 bg-[#fffdf8] shadow-[0_12px_32px_rgba(53,40,24,.07)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(53,40,24,.13)]">
                    <div className="relative h-[190px] overflow-hidden bg-[#e9dfd0] sm:h-[150px]">
                      <img src={(item.id === "social" ? XR_PHOTOS.ai : XR_PHOTOS[item.id as keyof typeof XR_PHOTOS]) ?? XR_HERO_PHOTO} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/60 bg-black/35 text-white backdrop-blur-md">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <span className="label-mono text-[7px] tracking-[.16em] text-[#a17643]">{item.num}</span>
                      <h3 className="mt-1 min-h-[2.5rem] text-[13px] font-bold leading-tight sm:text-base">{t(service.title)}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-[10px] leading-relaxed text-[#6b6258] sm:text-xs">{t(service.short)}</p>
                      <div className="mt-4 border-t border-[#d9cdbb] pt-3">
                        <span className="block text-[8px] uppercase tracking-[.13em] text-[#877b6b]">{copy.from}</span>
                        <div className="mt-0.5 flex flex-wrap items-baseline gap-1">
                          <strong className="text-lg tracking-tight sm:text-xl">{price(item.price)}</strong>
                          <span className="text-[8px] text-[#766b5e] sm:text-[9px]">{period}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        <ServiceDestination id={item.id}>
                          <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#201d18] px-3 text-[9px] font-semibold text-[#fffaf1] transition hover:bg-[#8d6335] sm:text-[10px]">
                            {copy.discover}<ArrowUpRight className="h-3 w-3" />
                          </span>
                        </ServiceDestination>
                        <button
                          type="button"
                          onClick={() => funnel.toggleService(item.funnelId)}
                          aria-pressed={selected}
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-[#cbb99e] px-2 text-[8px] font-semibold text-[#514638] transition hover:border-[#9b6a32] hover:bg-[#f5ead9] sm:text-[9px]"
                        >
                          {selected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                          {selected ? copy.added : copy.add}
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="xr-showreel" className="relative overflow-hidden bg-[#171512] py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-[1540px] gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-14 lg:px-12">
          <Reveal>
            <div>
              <span className="label-mono text-[8px] font-semibold uppercase tracking-[.26em] text-[#d0a66e]">{copy.reelEyebrow}</span>
              <h2 className="display-serif mt-4 max-w-xl text-[clamp(2.2rem,4.5vw,4.8rem)] leading-[.94] tracking-[-.045em]">{copy.reelTitle}</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/65">{copy.reelLead}</p>
              <Link to="/realisations" className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#171512] transition hover:-translate-y-1 hover:bg-white">
                {copy.watch}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#28231c] shadow-[0_28px_70px_rgba(0,0,0,.4)]">
              {showreelUrl ? (
                <video className="aspect-video w-full object-cover" controls playsInline preload="metadata" poster={XR_HERO_PHOTO}>
                  <source src={showreelUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="relative aspect-[16/9]">
                  <img src={featuredProject?.image ?? XR_HERO_PHOTO} alt={featuredProject ? "Aperçu du projet " + featuredProject.name : "Aperçu XR Agency"} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10" />
                  <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
                    <span className="label-mono text-[8px] uppercase tracking-[.2em] text-[#e2b879]">{copy.reelEyebrow}</span>
                    <p className="mt-2 max-w-lg text-xl font-semibold leading-tight sm:text-3xl">{featuredProject ? featuredProject.name : "XR Agency"}</p>
                    <p className="mt-2 max-w-md text-[10px] leading-relaxed text-white/75 sm:text-xs">{copy.reelMissing}</p>
                  </div>
                  <Link to="/realisations" aria-label={copy.watch} className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/65 bg-black/30 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/60 sm:right-8 sm:top-8 sm:h-16 sm:w-16">
                    <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="xr-projects" className="bg-[#f6f0e6] py-14 text-[#191713] sm:py-20">
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <span className="label-mono text-[8px] font-semibold uppercase tracking-[.26em] text-[#9b6a32]">{copy.portfolioEyebrow}</span>
                <h2 className="display-serif mt-3 text-[clamp(2rem,4vw,3.8rem)] leading-[.98] tracking-[-.045em]">{copy.portfolioTitle}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#62594e]">{copy.portfolioLead}</p>
              </div>
              <Link to="/realisations" className="inline-flex min-h-10 items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-[#6e4b27] transition hover:gap-3">
                {copy.watch}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {featuredProject ? (
            <Reveal delay={80}>
              <article className="grid overflow-hidden rounded-[1.5rem] border border-[#b7a58c]/35 bg-[#fffdf8] shadow-[0_16px_42px_rgba(53,40,24,.08)] md:grid-cols-[1.35fr_.65fr]">
                <a href={featuredProject.url} target="_blank" rel="noreferrer" className="group relative block min-h-[230px] overflow-hidden bg-[#e8dece] sm:min-h-[340px]">
                  <img src={featuredProject.image} alt={"Homepage publique de " + featuredProject.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]" />
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-[#f5eee3] text-[#211c16] shadow-lg transition group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <span className="label-mono text-[8px] uppercase tracking-[.22em] text-[#9b6a32]">{featuredProject.sector} · {featuredProject.type}</span>
                  <h3 className="display-serif mt-3 text-3xl leading-tight sm:text-4xl">{featuredProject.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#62594e]">
                    {lang === "fr" ? "Référence réalisée par XR Agency. Consultez le site public pour découvrir le résultat." : lang === "vi" ? "Dự án do XR Agency thực hiện. Truy cập website công khai để xem kết quả." : lang === "ar" ? "مرجع نفذته XR Agency. افتح الموقع العام لمشاهدة النتيجة." : lang === "ru" ? "Проект, выполненный XR Agency. Откройте публичный сайт, чтобы увидеть результат." : "A project delivered by XR Agency. Visit the public website to see the result."}
                  </p>
                  <a href={featuredProject.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#b7a58c] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#28231c] transition hover:border-[#8e6234] hover:bg-[#f5ead9]">
                    {copy.visit}<ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ) : (
            <p className="rounded-2xl border border-[#b7a58c]/40 bg-white/60 p-6 text-sm text-[#62594e]">{copy.portfolioLead}</p>
          )}
        </div>
      </section>

      <section className="border-y border-[#b9a98f]/25 bg-[#f6f0e6] py-12 text-[#191713] sm:py-16">
        <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-8">
              <span className="label-mono text-[8px] font-semibold uppercase tracking-[.26em] text-[#9b6a32]">{copy.methodEyebrow}</span>
              <h2 className="display-serif mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-.045em]">{copy.methodTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, index) => (
              <Reveal key={step[0]} delay={index * 60}>
                <div className="flex h-full gap-4 rounded-2xl border border-[#cbb99e]/55 bg-[#fffdf8]/75 p-4 sm:p-5">
                  <span className="display-serif text-3xl text-[#b17b3d]">{step[0]}</span>
                  <div>
                    <h3 className="text-sm font-bold">{step[1]}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#6b6258]">{step[2]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
