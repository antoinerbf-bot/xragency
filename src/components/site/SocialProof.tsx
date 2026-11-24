import { ArrowUpRight, Globe2, MapPinned, Workflow } from "lucide-react";
import { Reveal } from "./primitives";
import { useLang } from "@/lib/i18n";

const EXPERTISES = [
  {
    icon: Globe2,
    title: "Création web",
    description:
      "Architecture, direction artistique et développement adaptés à l’activité, aux contenus et aux parcours clients.",
  },
  {
    icon: MapPinned,
    title: "Visibilité locale",
    description:
      "Diagnostic Google Business Profile, cohérence des informations et stratégie locale définie après analyse.",
  },
  {
    icon: Workflow,
    title: "Automatisation",
    description:
      "Outils et workflows conçus pour réduire les tâches répétitives et mieux suivre les demandes entrantes.",
  },
];

export function SocialProof() {
  const { lang } = useLang();
  const sectorsByLanguage = {
    fr: [
      "Hôtellerie & resorts",
      "Architecture intérieure",
      "Restaurants",
      "Mode & accessoires",
      "Joaillerie & horlogerie",
      "Immobilier",
      "Santé & bien-être",
      "Startups",
      "Conseil B2B",
      "E-commerce",
      "Tourisme",
      "Automobile",
    ],
    en: [
      "Hotels & resorts",
      "Interior design",
      "Restaurants",
      "Fashion & accessories",
      "Jewellery & watches",
      "Real estate",
      "Health & wellness",
      "Startups",
      "B2B consulting",
      "E-commerce",
      "Tourism",
      "Automotive",
    ],
    vi: [
      "Khách sạn & khu nghỉ dưỡng",
      "Thiết kế nội thất",
      "Nhà hàng",
      "Thời trang & phụ kiện",
      "Trang sức & đồng hồ",
      "Bất động sản",
      "Sức khỏe & chăm sóc",
      "Startup",
      "Tư vấn B2B",
      "Thương mại điện tử",
      "Du lịch",
      "Ô tô",
    ],
    ar: [
      "الفنادق والمنتجعات",
      "التصميم الداخلي",
      "المطاعم",
      "الأزياء والإكسسوارات",
      "المجوهرات والساعات",
      "العقارات",
      "الصحة والعافية",
      "الشركات الناشئة",
      "استشارات الشركات",
      "التجارة الإلكترونية",
      "السياحة",
      "السيارات",
    ],
    ru: [
      "Отели и курорты",
      "Дизайн интерьеров",
      "Рестораны",
      "Мода и аксессуары",
      "Ювелирные изделия и часы",
      "Недвижимость",
      "Здоровье и благополучие",
      "Стартапы",
      "B2B-консалтинг",
      "Электронная торговля",
      "Туризм",
      "Автомобили",
    ],
  };
  const translatedSectors = sectorsByLanguage[lang] ?? sectorsByLanguage.en;
  const labels = {
    fr: {
      eyebrow: "Une méthode, des livrables vérifiables",
      title: "La confiance se construit sur le travail livré.",
      intro:
        "XR Agency accompagne des activités et des équipes aux besoins variés. Nous ne publions pas de témoignages, de volumes ou de performances sans référence client vérifiable et autorisation de diffusion.",
      cta: "Parler de votre projet",
      sectors: "Secteurs accompagnés",
      items: ["Création web", "Visibilité locale", "Automatisation"],
      descriptions: [
        "Architecture, direction artistique et développement adaptés à l’activité, aux contenus et aux parcours clients.",
        "Diagnostic Google Business Profile, cohérence des informations et stratégie locale définie après analyse.",
        "Outils et workflows conçus pour réduire les tâches répétitives et mieux suivre les demandes entrantes.",
      ],
    },
    en: {
      eyebrow: "A method, verifiable deliverables",
      title: "Trust is built on the work delivered.",
      intro:
        "XR Agency supports businesses and teams with different needs. We do not publish testimonials, volumes or performance claims without a verifiable client reference and permission to share them.",
      cta: "Discuss your project",
      sectors: "Sectors we support",
      items: ["Web development", "Local visibility", "Automation"],
      descriptions: [
        "Architecture, art direction and development shaped around your business, content and customer journeys.",
        "Google Business Profile review, information consistency and a local strategy defined after analysis.",
        "Tools and workflows designed to reduce repetitive tasks and improve incoming-request follow-up.",
      ],
    },
    vi: {
      eyebrow: "Phương pháp và sản phẩm có thể kiểm chứng",
      title: "Niềm tin được xây dựng từ công việc thực tế.",
      intro:
        "XR Agency hỗ trợ doanh nghiệp và đội ngũ với nhiều nhu cầu khác nhau. Chúng tôi chỉ công bố lời chứng thực, số liệu và kết quả khi có nguồn khách hàng xác minh và được phép chia sẻ.",
      cta: "Trao đổi về dự án",
      sectors: "Lĩnh vực hỗ trợ",
      items: ["Phát triển website", "Hiện diện địa phương", "Tự động hóa"],
      descriptions: [
        "Kiến trúc, định hướng nghệ thuật và phát triển phù hợp với hoạt động, nội dung và hành trình khách hàng.",
        "Đánh giá Google Business Profile, tính nhất quán thông tin và chiến lược địa phương sau phân tích.",
        "Công cụ và quy trình giúp giảm thao tác lặp lại và theo dõi yêu cầu hiệu quả hơn.",
      ],
    },
    ar: {
      eyebrow: "منهجية ومخرجات قابلة للتحقق",
      title: "تُبنى الثقة على العمل المنجز.",
      intro:
        "تدعم XR Agency الشركات والفرق باحتياجات مختلفة. لا ننشر شهادات أو أرقاماً أو نتائج دون مرجع عميل قابل للتحقق وإذن بالنشر.",
      cta: "ناقش مشروعك",
      sectors: "القطاعات التي ندعمها",
      items: ["تطوير المواقع", "الظهور المحلي", "الأتمتة"],
      descriptions: [
        "بنية الموقع والتوجيه الفني والتطوير وفق نشاطك ومحتواك ورحلة العميل.",
        "مراجعة ملف Google Business Profile واتساق المعلومات والاستراتيجية المحلية بعد التحليل.",
        "أدوات وسير عمل لتقليل المهام المتكررة وتحسين متابعة الطلبات الواردة.",
      ],
    },
    ru: {
      eyebrow: "Методика и проверяемые результаты работы",
      title: "Доверие строится на выполненной работе.",
      intro:
        "XR Agency помогает компаниям и командам с разными задачами. Мы не публикуем отзывы, объёмы или показатели без проверяемой ссылки на клиента и разрешения на публикацию.",
      cta: "Обсудить проект",
      sectors: "Отрасли, с которыми мы работаем",
      items: ["Веб-разработка", "Локальная видимость", "Автоматизация"],
      descriptions: [
        "Архитектура, арт-дирекшн и разработка с учётом бизнеса, контента и пути клиента.",
        "Анализ Google Business Profile, согласованности данных и локальной стратегии.",
        "Инструменты и процессы для сокращения повторяющихся задач и контроля входящих запросов.",
      ],
    },
  }[lang] ?? {
    eyebrow: "A method, verifiable deliverables",
    title: "Trust is built on the work delivered.",
    intro:
      "We publish client references and performance claims only when they are verified and approved.",
    cta: "Discuss your project",
    sectors: "Sectors we support",
    items: ["Web development", "Local visibility", "Automation"],
    descriptions: [
      "Web architecture and development.",
      "Local presence and profile optimisation.",
      "Tools and workflows for repetitive tasks.",
    ],
  };
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div>
              <p className="label-mono text-[10px] uppercase tracking-[.18em] text-primary">
                {labels.eyebrow}
              </p>
              <h2 className="display-serif mt-5 max-w-xl text-4xl leading-[.98] sm:text-5xl lg:text-6xl">
                {labels.title}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                {labels.intro}
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                {labels.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-3">
            {EXPERTISES.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 60}>
                  <article className="h-full rounded-2xl border border-border bg-background p-5 sm:p-6">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                    <h3 className="mt-8 text-base font-medium">{labels.items[index]}</h3>
                    <p className="mt-3 text-xs leading-6 text-muted-foreground">
                      {labels.descriptions[index]}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-7">
          <p className="label-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">
            {labels.sectors}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {translatedSectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-border px-3 py-2 text-xs text-muted-foreground"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
