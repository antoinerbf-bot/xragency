import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Globe2,
  Languages,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CONTACT } from "@/lib/content";
import storyMeetingPhoto from "@/assets/story-business-meeting.jpg";
import { useLang, type L } from "@/lib/i18n";

export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [
      { title: "Accompagnement International — XR Agency" },
      {
        name: "description",
        content:
          "XR Agency accompagne les marques, hôtels, restaurants et entreprises en France et à l’international grâce à une organisation agile, multilingue et 100 % coordonnée à distance.",
      },
      { property: "og:title", content: "International — XR Agency" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/international" }],
  }),
  component: InternationalPage,
});

const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

const PILLARS = [
  {
    Icon: Languages,
    title: l("Expériences réellement multilingues", "Truly multilingual experiences", "Trải nghiệm đa ngôn ngữ thực thụ", "تجارب رقمية متعددة اللغات فعلياً", "Полноценная мультиязычность"),
    desc: l(
      "Nous concevons des sites, tunnels de conversion et stratégies SEO pensés pour des audiences francophones, anglophones et internationales — y compris le support RTL pour l’arabe.",
      "We build websites, conversion journeys and SEO architectures tailored to French, English and international audiences — including native RTL layout support for Arabic.",
      "Thiết kế website, hành trình chuyển đổi và SEO cho khách hàng quốc tế, bao gồm cả bố cục RTL cho tiếng Ả Rập.",
      "نصمم مواقع ومسارات تحويل واستراتيجيات SEO موجهة للأسواق العالمية، بما في ذلك الدعم الأصلي لاتجاه RTL للغة العربية.",
      "Создаём сайты, воронки и SEO-архитектуру для европейских и международных рынков, включая полную поддержку RTL.",
    ),
  },
  {
    Icon: Clock,
    title: l("Coordination fluide sur plusieurs fuseaux", "Smooth cross-timezone coordination", "Phối hợp linh hoạt đa múi giờ", "تنسيق سلس عبر المناطق الزمنية", "Удобная работа в разных часовых поясах"),
    desc: l(
      "Notre organisation distribuée nous permet d’échanger avec des dirigeants en Europe, au Moyen-Orient, en Asie du Sud-Est ou en Amérique du Nord avec un interlocuteur clair.",
      "Our remote-first distributed model lets us collaborate smoothly with leaders across Europe, the Middle East, Southeast Asia and North America with a single point of contact.",
      "Mô hình làm việc phân tán giúp chúng tôi phối hợp mượt mà với doanh nghiệp tại châu Âu, Trung Đông và châu Á.",
      "يتيح لنا نموذج العمل الموزع التعاون بسلاسة مع قادة الأعمال في أوروبا والشرق الأوسط وآسيا عبر نقطة تواصل واضحة.",
      "Распределённая команда позволяет комфортно вести проекты в Европе, на Ближнем Востоке и в Азии через единый контакт.",
    ),
  },
  {
    Icon: Globe2,
    title: l("Adaptation culturelle & marchés locaux", "Cultural & local market adaptation", "Thích ứng văn hóa & thị trường", "تكييف ثقافي وتسويقي محلي", "Адаптация под локальные рынки"),
    desc: l(
      "Traduire mot à mot ne suffit pas : nous adaptons le ton, la structure éditoriale, les requêtes Google locales et la présentation de vos offres aux codes de chaque marché.",
      "Literal translation is never enough: we adapt tone, editorial hierarchy, local search intent and offer presentation to each target market.",
      "Không chỉ dịch ngôn từ: chúng tôi điều chỉnh giọng điệu, cấu trúc nội dung và hành vi tìm kiếm theo từng thị trường.",
      "لا تكفي الترجمة الحرفية: نحن نكيّف النبرة التحريرية وهيكلة المحتوى وعمليات البحث المحلية لتناسب كل سوق مستهدف.",
      "Дословного перевода недостаточно: мы адаптируем тональность, структуру страниц и локальные поисковые запросы под каждый рынок.",
    ),
  },
  {
    Icon: ShieldCheck,
    title: l("Pilotage centralisé & transparence", "Centralised tracking & transparency", "Quản lý tập trung & minh bạch", "إدارة مركزية وشفافية كاملة", "Централизованное управление"),
    desc: l(
      "Devis clairs en EUR, jalons partagés dans votre Espace Client et suivi direct par e-mail ou WhatsApp : aucune friction géographique sur vos livrables.",
      "Clear EUR quotes, shared milestones inside your Client Portal and direct email or WhatsApp communication — zero geographic friction on delivery.",
      "Báo giá EUR minh bạch, tiến độ rõ ràng trong Cổng Khách Hàng và liên lạc trực tiếp qua WhatsApp.",
      "عروض أسعار واضحة باليورو، ومتابعة مباشرة للمراحل عبر بوابة العملاء وتواصل سريع عبر البريد أو واتساب.",
      "Прозрачные сметы в EUR, контроль этапов в клиентском портале и оперативная связь без географических барьеров.",
    ),
  },
];

const REGIONS = [
  {
    zone: l("Europe francophone & internationale", "France & Europe", "Pháp & Châu Âu", "فرنسا وأوروبا", "Франция и Европа"),
    focus: l("Hôtellerie, restauration, immobilier, marques & PME ambitieuses.", "Hospitality, gastronomy, real estate, prestige brands & ambitious SMBs.", "Khách sạn, ẩm thực, bất động sản & doanh nghiệp vừa và nhỏ.", "الضيافة، المطاعم، العقارات والعلامات الطموحة.", "Отели, рестораны, недвижимость и амбициозные бренды."),
  },
  {
    zone: l("Asie du Sud-Est & marchés émergents", "Southeast Asia & APAC", "Đông Nam Á & Châu Á", "جنوب شرق آسيا", "Юго-Восточная Азия"),
    focus: l("Resorts, restaurants, investissements immobiliers et acteurs internationaux.", "Resorts, venues, property ventures and international operators.", "Resort, nhà hàng, đầu tư bất động sản và thương hiệu quốc tế.", "المنتجعات والمشاريع العقارية والعلامات الدولية.", "Курорты, рестораны и международные проекты."),
  },
  {
    zone: l("Moyen-Orient & clientèle internationale", "Middle East & Global Clients", "Trung Đông & Toàn cầu", "الشرق الأوسط والعملاء الدوليون", "Ближний Восток и мир"),
    focus: l("Interfaces bilingues FR/EN/AR (RTL), branding haut de gamme et visibilité Google.", "Multilingual FR/EN/AR (RTL) platforms, luxury branding & search visibility.", "Giao diện đa ngôn ngữ FR/EN/AR (RTL), thương hiệu cao cấp & SEO.", "واجهات متعددة اللغات بدعم RTL وهوية راقية وظهور قوي على Google.", "Мультиязычные платформы FR/EN/AR (RTL), брендинг и SEO."),
  },
];

function InternationalPage() {
  const { lang, t } = useLang();
  const isRtl = lang === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#171613]">
      <Nav />
      <main className="pt-28">
        {/* Editorial Hero */}
        <section className="border-b border-[#171613]/10 bg-[#F7F4EE] pb-16 pt-10 sm:pb-24 sm:pt-14">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-7 bg-[#9E7F5A]" aria-hidden />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7D6445]">
                  {t(l("COLLABORATION INTERNATIONALE", "INTERNATIONAL COLLABORATION", "HỢP TÁC QUỐC TẾ", "تعاون دولي بلا حدود", "МЕЖДУНАРОДНОЕ СОТРУДНИЧЕСТВО"))}
                </span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.03] tracking-[-0.025em] text-[#171613] sm:text-6xl">
                {t(l("Un accompagnement digital", "Digital execution built", "Đồng hành kỹ thuật số", "مرافقة رقمية", "Цифровое сопровождение"))}{" "}
                <em className="italic font-normal text-[#9E7F5A]">
                  {t(l("sans frontières.", "without borders.", "không biên giới.", "بلا حدود.", "без границ."))}
                </em>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#57534B] sm:text-base">
                {t(
                  l(
                    "XR Agency accompagne les entreprises, hôtels, restaurants et marques en France et à l’international grâce à une collaboration 100 % coordonnée à distance, multilingue et orientée résultats.",
                    "XR Agency partners with businesses, hotels, restaurants and brands in France and worldwide through coordinated remote collaboration, multilingual craftsmanship and transparent execution.",
                    "XR Agency đồng hành cùng doanh nghiệp, khách sạn, nhà hàng tại Pháp và quốc tế thông qua mô hình hợp tác từ xa linh hoạt, đa ngôn ngữ và minh bạch.",
                    "ترافق XR Agency الشركات والفنادق والمطاعم والعلامات التجارية في فرنسا وحول العالم عبر تعاون عن بُعد منظم ومتعدد اللغات وشفاف.",
                    "XR Agency сопровождает компании, отели, рестораны и бренды во Франции и по всему миру в формате слаженной международной удалённой работы.",
                  ),
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171613] px-6 py-3.5 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2A2823]"
                >
                  {t(l("Démarrer un projet international", "Start an international project", "Khởi động dự án quốc tế", "ابدأ مشروعاً دولياً", "Обсудить международный проект"))}
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

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[#171613]/12 bg-white shadow-[0_24px_60px_rgba(23,22,19,0.08)]">
                <img
                  src={storyMeetingPhoto}
                  alt="Collaboration internationale XR Agency"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="border-b border-[#171613]/10 bg-[#EEE9E0] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-5 md:grid-cols-2">
              {PILLARS.map(({ Icon, title, desc }) => (
                <article
                  key={title.fr}
                  className="rounded-3xl border border-[#171613]/10 bg-white p-7 shadow-sm"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#171613] text-[#D8BC94]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-serif text-2xl font-medium text-[#171613]">
                    {t(title)}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#57534B]">{t(desc)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Zones Covered — Transparent, zero invented office addresses */}
        <section className="bg-[#171613] py-16 text-[#F7F4EE] sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8BC94]">
                <Sparkles className="h-3.5 w-3.5" />
                {t(l("ZONES D’ACCOMPAGNEMENT", "REGIONS WE SUPPORT", "KHU VỰC HỖ TRỢ", "المناطق التي نخدمها", "ГЕОГРАФИЯ ПРОЕКТОВ"))}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-medium sm:text-5xl">
                {t(l("Une agence agile, connectée à vos marchés.", "An agile agency connected to your markets.", "Một agency linh hoạt, kết nối với thị trường của bạn.", "وكالة مرنة متصلة بأسواقك أينما كنت.", "Гибкое агентство на связи с вашими рынками."))}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#F7F4EE]/70">
                {t(
                  l(
                    "Nos prestations digitales sont réalisées à distance avec des points réguliers en visioconférence, un suivi centralisé et une réactivité adaptée à votre fuseau horaire.",
                    "Our digital engagements are delivered remotely with scheduled video checkpoints, centralised tracking and timezone-aware responsiveness.",
                    "Các dự án số được triển khai từ xa với lịch họp định kỳ và theo dõi tập trung.",
                    "تُنفذ خدماتنا الرقمية عن بُعد مع اجتماعات مرئية دورية ومتابعة مركزية تناسب توقيتك المحلي.",
                    "Все проекты ведутся удалённо с регулярными видеовстречами, понятными этапами и учётом вашего часового пояса.",
                  ),
                )}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {REGIONS.map((region) => (
                <div
                  key={region.zone.fr}
                  className="rounded-3xl border border-[#F7F4EE]/12 bg-[#23201B] p-6"
                >
                  <h3 className="font-serif text-2xl font-medium text-[#D8BC94]">
                    {t(region.zone)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#F7F4EE]/80">
                    {t(region.focus)}
                  </p>
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
