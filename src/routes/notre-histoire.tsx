import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Compass, Globe2, Sparkles, Target, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import storyMeeting from "@/assets/story-business-meeting.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";

export const Route = createFileRoute("/notre-histoire")({
  head: () => ({
    meta: [
      { title: "L’Agence — XR Agency" },
      {
        name: "description",
        content:
          "Découvrez l’histoire, la méthode et l’équipe internationale de XR Agency, agence digitale française à vocation internationale.",
      },
      { property: "og:title", content: "L’Agence — XR Agency" },
      {
        property: "og:description",
        content: "Une agence digitale française à vocation internationale.",
      },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/notre-histoire" }],
  }),
  component: StoryPage,
});

const COPY = {
  fr: {
    kicker: "L’AGENCE · XR AGENCY",
    title: "Une agence française",
    accent: "à vocation internationale.",
    lead: "Née à Paris, XR Agency réunit une équipe d’experts passionnés par le digital, la créativité et la performance, au service des entreprises ambitieuses en France et à l’international.",
    bullets: [
      "Une équipe multidisciplinaire (stratégie, design, code, SEO, social)",
      "Un accompagnement sur mesure et orienté résultats",
      "Une vision globale et internationale",
    ],
    cta: "Démarrer un projet avec nous",
    caption: "Paris · France · Asie · International",
    alt: "Équipe XR Agency en séance de travail",
    steps: [
      [
        "Comprendre",
        "Nous partons de votre activité, de vos clients, de votre positionnement et de vos objectifs avant de choisir les leviers.",
      ],
      [
        "Construire",
        "Design, développement, branding, SEO et outils commerciaux sont assemblés autour d’un même parcours.",
      ],
      [
        "Faire évoluer",
        "Après la mise en ligne, WebCare, SEO, Google Maps et contenu permettent de faire progresser le dispositif dans le temps.",
      ],
    ],
    system: "NOTRE SYSTÈME",
    headline: "Une seule équipe pour relier image, acquisition et produit.",
    body: "Sites web, e-commerce, branding, SEO, visibilité locale, community management, IA et WebCare sont pensés comme des briques complémentaires. L’objectif est de construire un système cohérent plutôt qu’empiler des prestations.",
    description: "Une agence digitale française à vocation internationale.",
  },
  en: {
    kicker: "THE AGENCY · XR AGENCY",
    title: "A French digital agency",
    accent: "with an international outlook.",
    lead: "Founded in Paris, XR Agency brings together specialists in digital strategy, editorial design, engineering and growth to support ambitious businesses in France and worldwide.",
    bullets: [
      "A multidisciplinary team (strategy, design, code, SEO, social)",
      "Bespoke, results-oriented support",
      "A global and international perspective",
    ],
    cta: "Start a project with us",
    caption: "Paris · France · Asia · Worldwide",
    alt: "XR Agency team working together",
    steps: [
      [
        "Understand",
        "We start with your business, customers, positioning and goals before choosing the right levers.",
      ],
      [
        "Build",
        "Design, development, branding, SEO and sales tools are brought together into one coherent journey.",
      ],
      [
        "Evolve",
        "After launch, WebCare, SEO, Google Maps and content help improve the system over time.",
      ],
    ],
    system: "OUR SYSTEM",
    headline: "One team connecting brand, acquisition and product.",
    body: "Websites, e-commerce, branding, SEO, local visibility, social media management, AI and WebCare are designed as complementary building blocks. The goal is a coherent system, not a pile of disconnected services.",
    description: "An independent digital agency connecting France, Asia and international markets.",
  },
  vi: {
    kicker: "VỀ AGENCY · XR AGENCY",
    title: "Một agency Pháp",
    accent: "với tầm nhìn quốc tế.",
    lead: "Khởi nguồn từ Paris, XR Agency quy tụ đội ngũ chuyên gia đam mê kỹ thuật số, sáng tạo và hiệu quả kinh doanh, đồng hành cùng doanh nghiệp tại Pháp và quốc tế.",
    bullets: [
      "Đội ngũ đa chuyên môn (chiến lược, thiết kế, lập trình, SEO, social)",
      "Đồng hành may đo và định hướng kết quả",
      "Tầm nhìn toàn cầu và quốc tế",
    ],
    cta: "Bắt đầu dự án cùng chúng tôi",
    caption: "Paris · Pháp · Châu Á · Quốc tế",
    alt: "Đội ngũ XR Agency đang làm việc",
    steps: [
      [
        "Thấu hiểu",
        "Chúng tôi bắt đầu từ hoạt động kinh doanh, khách hàng, định vị và mục tiêu của bạn trước khi chọn giải pháp.",
      ],
      [
        "Xây dựng",
        "Thiết kế, phát triển, thương hiệu, SEO và công cụ bán hàng được kết nối thành một hành trình thống nhất.",
      ],
      [
        "Phát triển",
        "Sau khi ra mắt, WebCare, SEO, Google Maps và nội dung giúp cải thiện hệ thống theo thời gian.",
      ],
    ],
    system: "HỆ THỐNG CỦA CHÚNG TÔI",
    headline: "Một đội ngũ kết nối thương hiệu, thu hút khách hàng và sản phẩm.",
    body: "Website, thương mại điện tử, thương hiệu, SEO, hiển thị địa phương, quản lý mạng xã hội, AI và WebCare được thiết kế để bổ trợ lẫn nhau.",
    description: "Studio kỹ thuật số độc lập kết nối Pháp, châu Á và thị trường quốc tế.",
  },
  ar: {
    kicker: "الوكالة · XR AGENCY",
    title: "وكالة فرنسية",
    accent: "بآفاق دولية.",
    lead: "انطلقت XR Agency من باريس وتجمع فريقًا من الخبراء في الاستراتيجية الرقمية والتصميم والتطوير والنمو لخدمة الشركات الطموحة في فرنسا وحول العالم.",
    bullets: [
      "فريق متعدد التخصصات (استراتيجية، تصميم، برمجة، SEO، تواصل)",
      "مرافقة مخصصة وموجهة نحو النتائج",
      "رؤية شاملة ودولية",
    ],
    cta: "ابدأ مشروعك معنا",
    caption: "باريس · فرنسا · آسيا · العالم",
    alt: "فريق XR Agency أثناء العمل",
    steps: [
      [
        "الفهم",
        "نبدأ بنشاطك التجاري وعملائك ومكانتك وأهدافك قبل اختيار الحلول المناسبة.",
      ],
      [
        "البناء",
        "نجمع التصميم والتطوير والهوية التجارية وتحسين محركات البحث وأدوات المبيعات ضمن تجربة واحدة متكاملة.",
      ],
      [
        "التطوير",
        "بعد الإطلاق، تساعد خدمات WebCare وSEO وGoogle Maps والمحتوى على تحسين المنظومة بمرور الوقت.",
      ],
    ],
    system: "منظومتنا",
    headline: "فريق واحد يربط الهوية واكتساب العملاء والمنتج.",
    body: "نصمم المواقع والتجارة الإلكترونية والهوية التجارية وSEO والظهور المحلي وإدارة الشبكات الاجتماعية والذكاء الاصطناعي وWebCare كعناصر متكاملة.",
    description: "وكالة رقمية مستقلة تربط فرنسا وآسيا والأسواق العالمية.",
  },
  ru: {
    kicker: "АГЕНТСТВО · XR AGENCY",
    title: "Французское агентство",
    accent: "международного уровня.",
    lead: "Основанное в Париже, XR Agency объединяет экспертов в digital-стратегии, дизайне, разработке и продвижении для амбициозных компаний во Франции и по всему миру.",
    bullets: [
      "Мультидисциплинарная команда (стратегия, дизайн, код, SEO, соцсети)",
      "Индивидуальное сопровождение с фокусом на результат",
      "Глобальное и международное видение",
    ],
    cta: "Начать проект с нами",
    caption: "Париж · Франция · Азия · Весь мир",
    alt: "Команда XR Agency за работой",
    steps: [
      [
        "Понять",
        "Сначала мы изучаем ваш бизнес, клиентов, позиционирование и цели, а затем выбираем подходящие инструменты.",
      ],
      [
        "Создать",
        "Дизайн, разработка, брендинг, SEO и инструменты продаж объединяются в единый пользовательский путь.",
      ],
      [
        "Развивать",
        "После запуска WebCare, SEO, Google Maps и контент помогают улучшать систему со временем.",
      ],
    ],
    system: "НАША СИСТЕМА",
    headline: "Одна команда объединяет бренд, привлечение клиентов и продукт.",
    body: "Сайты, электронная коммерция, брендинг, SEO, локальная видимость, управление соцсетями, ИИ и WebCare задуманы как взаимодополняющие элементы.",
    description: "Независимое digital-агентство, объединяющее Францию, Азию и международные рынки.",
  },
} as const;

const BULLET_ICONS = [Users, Target, Globe2];

function StoryPage() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  useEffect(() => {
    document.title = `${c.title} — XR Agency`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", c.description);
  }, [c]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `${c.title} — XR Agency`,
    url: "https://xragencyai.com/notre-histoire",
    about: { "@type": "Organization", name: "XR Agency" },
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#F7F4EE] text-[#171613]"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Nav />
      <main className="pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* 2-Column Editorial Hero matching mockup frame 06 / 10 */}
        <section className="border-b border-[#171613]/10 py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
            <div className="lg:col-span-6">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9E7B4F]">
                {c.kicker}
              </p>
              <h1 className="mt-3 font-serif text-[clamp(2.3rem,4.4vw,4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-[#171613]">
                {c.title} <span className="italic text-[#8D6C42]">{c.accent}</span>
              </h1>
              <p className="mt-5 text-sm leading-7 text-[#5C574F] sm:text-base">{c.lead}</p>

              <div className="mt-6 space-y-3">
                {c.bullets.map((b, i) => {
                  const Icon = BULLET_ICONS[i];
                  return (
                    <div key={b} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#EFE6D5] text-[#8D6C42]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-[#171613]">{b}</span>
                    </div>
                  );
                })}
              </div>

              <a
                href="/#quote"
                className="mt-8 inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#E5C696] via-[#D5AF79] to-[#C2985E] px-6 py-3 text-xs font-bold text-[#17130E] shadow-md transition hover:brightness-105"
              >
                <span>{c.cta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>

            <div className="lg:col-span-6">
              <figure className="overflow-hidden rounded-2xl border border-[#171613]/10 bg-white p-2 shadow-[0_24px_70px_-28px_rgba(23,22,19,0.25)]">
                <img
                  src={storyMeeting}
                  alt={c.alt}
                  className="aspect-[16/10] w-full rounded-xl object-cover object-center"
                  loading="eager"
                />
                <figcaption className="px-3 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7A5E3A]">
                  {c.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="bg-[#EFE9DD] py-16 sm:py-20">
          <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-5 md:grid-cols-3">
              {c.steps.map(([title, desc], i) => {
                const Icon = [Compass, Sparkles, Globe2][i];
                return (
                  <article
                    key={title}
                    className="rounded-2xl border border-[#171613]/10 bg-[#FAF7F2] p-7 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFE6D5] text-[#8D6C42]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#8D6C42]">
                        0{i + 1}
                      </span>
                    </div>
                    <h2 className="mt-6 font-serif text-2xl font-medium text-[#171613]">
                      {title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#5C574F]">{desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dark CTA Banner */}
        <section className="relative isolate overflow-hidden border-y border-[#D8B788]/25 bg-[#120F0C] py-16 text-[#FAF7F2] sm:py-20">
          <img
            src={heroCinematic}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0F0C09]/95 via-[#0F0C09]/85 to-[#0F0C09]/60" />
          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E5C696]">
              {c.system}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-normal text-white sm:text-5xl">
              {c.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">{c.body}</p>
            <a
              href="/#quote"
              className="mt-8 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#E5C696] via-[#D5AF79] to-[#C2985E] px-6 py-3 text-xs font-bold text-[#17130E] shadow-lg transition hover:brightness-105"
            >
              <span>{c.cta}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
