import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers3,
  MessageCircle,
  PenTool,
  RefreshCw,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import storyMeeting from "@/assets/story-business-meeting.jpg";
import svcBrandingEditorial from "@/assets/svc-branding-editorial.jpg";
import svcWebEditorial from "@/assets/svc-web-editorial.jpg";
import svcSeoEditorial from "@/assets/svc-seo-editorial.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";

const STEP_PHOTOS = [storyMeeting, svcBrandingEditorial, svcWebEditorial, svcSeoEditorial];
const ICONS = [Compass, Layers3, PenTool, RefreshCw];

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { num: string; title: string; body: string }[];
    detailsCta: string;
    bannerTitle: string;
    bannerAccent: string;
    bannerQuote: string;
    bannerWa: string;
  }
> = {
  fr: {
    eyebrow: "MÉTHODE CHRONO & SÉRÉNITÉ",
    title: "De l'idée à la mise en ligne en 10 jours.",
    intro:
      "Une feuille de route sans mauvaise surprise, où chaque étape est optimisée pour propulser votre chiffre d'affaires.",
    steps: [
      {
        num: "01.",
        title: "J0 · Cadrage Express & Maquette",
        body: "Validation de la direction artistique, des textes et de l'arborescence en 48h chrono.",
      },
      {
        num: "02.",
        title: "J+3 · Développement & Conversion",
        body: "Intégration mobile-first ultra-rapide, paiements en ligne et tunnels d'achat 0% commission.",
      },
      {
        num: "03.",
        title: "J+7 · SEO & Google Domination",
        body: "Optimisation sémantique, indexation prioritaire et synchronisation Google Maps Top 3.",
      },
      {
        num: "04.",
        title: "J+10 · Livraison Clé en Main",
        body: "Mise en ligne officielle, formation vidéo privée de vos équipes et support réactif 24/7.",
      },
    ],
    detailsCta: "Voir les livrables détaillés",
    bannerTitle: "Prêt à dominer votre marché ?",
    bannerAccent: "Réservez votre production.",
    bannerQuote: "🚀 Configurer mon projet (30s)",
    bannerWa: "💬 Échanger sur WhatsApp (15m)",
  },
  en: {
    eyebrow: "TURNKEY DELIVERY METHOD",
    title: "From initial concept to live launch in 10 days.",
    intro:
      "A fast, high-impact sprint designed to maximize conversions and generate immediate revenue.",
    steps: [
      {
        num: "01.",
        title: "Day 0 · Express Scope & Mockup",
        body: "Art direction, conversion UX and sitemap approved within 48 hours.",
      },
      {
        num: "02.",
        title: "Day 3 · Engineering & Checkout",
        body: "Lightning-fast mobile development, frictionless checkout with 0% platform fees.",
      },
      {
        num: "03.",
        title: "Day 7 · SEO & Local Authority",
        body: "On-page search optimization, priority Google indexing and local 3-pack signals.",
      },
      {
        num: "04.",
        title: "Day 10 · Turnkey Handover",
        body: "Official deployment, private video onboarding for your team and 24/7 assistance.",
      },
    ],
    detailsCta: "View stage deliverables",
    bannerTitle: "Ready to accelerate your growth?",
    bannerAccent: "Book your production slot.",
    bannerQuote: "🚀 Configure my project (30s)",
    bannerWa: "💬 Chat on WhatsApp (15 min)",
  },
  vi: {
    eyebrow: "PHƯƠNG PHÁP CỦA CHÚNG TÔI",
    title: "Quy trình rõ ràng và hiệu quả.",
    intro:
      "Phương pháp 4 bước được thiết kế để chuyển hóa mục tiêu kinh doanh thành kết quả thực tế.",
    steps: [
      {
        num: "01.",
        title: "Trao đổi & chẩn đoán",
        body: "Phân tích nhu cầu, mục tiêu và thị trường của bạn.",
      },
      {
        num: "02.",
        title: "Chiến lược",
        body: "Xây dựng kế hoạch hành động rõ ràng và may đo.",
      },
      {
        num: "03.",
        title: "Sản xuất & triển khai",
        body: "Thiết kế và triển khai các giải pháp phù hợp.",
      },
      {
        num: "04.",
        title: "Theo dõi & tối ưu",
        body: "Đo lường hiệu quả và cải thiện liên tục.",
      },
    ],
    detailsCta: "Xem bàn giao theo từng bước",
    bannerTitle: "Bạn có dự án?",
    bannerAccent: "Hãy trao đổi cùng chúng tôi.",
    bannerQuote: "Yêu cầu báo giá",
    bannerWa: "Trao đổi qua WhatsApp",
  },
  ar: {
    eyebrow: "منهجيتنا",
    title: "عملية واضحة وفعّالة.",
    intro: "منهجية من 4 مراحل لتحويل أهدافك إلى نتائج ملموسة وقابلة للقياس.",
    steps: [
      {
        num: "01.",
        title: "التواصل والتشخيص",
        body: "تحليل احتياجاتك وأهدافك وسوقك المستهدف.",
      },
      {
        num: "02.",
        title: "الاستراتيجية",
        body: "تحديد خطة عمل واضحة ومصممة خصيصًا.",
      },
      {
        num: "03.",
        title: "الإنتاج والتنفيذ",
        body: "تصميم وتنفيذ الحلول الرقمية المناسبة.",
      },
      {
        num: "04.",
        title: "المتابعة والتحسين",
        body: "قياس الأداء وإجراء التحسينات المستمرة.",
      },
    ],
    detailsCta: "عرض المخرجات لكل مرحلة",
    bannerTitle: "هل لديك مشروع؟",
    bannerAccent: "لنتحدث عنه.",
    bannerQuote: "طلب عرض سعر",
    bannerWa: "تحدث عبر واتساب",
  },
  ru: {
    eyebrow: "НАШ МЕТОД",
    title: "Понятный и эффективный процесс.",
    intro:
      "Подход из 4 этапов, созданный для превращения ваших целей в измеримый результат.",
    steps: [
      {
        num: "01.",
        title: "Обсуждение и диагностика",
        body: "Анализ ваших задач, целей и рынка.",
      },
      {
        num: "02.",
        title: "Стратегия",
        body: "Разработка чёткого индивидуального плана действий.",
      },
      {
        num: "03.",
        title: "Производство",
        body: "Создание и внедрение адаптированных решений.",
      },
      {
        num: "04.",
        title: "Сопровождение и оптимизация",
        body: "Оценка эффективности и постоянное улучшение.",
      },
    ],
    detailsCta: "Посмотреть результаты по этапам",
    bannerTitle: "У вас есть проект?",
    bannerAccent: "Давайте обсудим.",
    bannerQuote: "Запросить смету",
    bannerWa: "Написать в WhatsApp",
  },
};

export function StudioMethodSection() {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.fr;

  return (
    <section
      id="methode"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-[#EFE9DD] pt-16 text-[#171613] sm:pt-20"
    >
      <div className="mx-auto max-w-[1540px] px-5 pb-14 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="grid gap-6 border-b border-[#171613]/12 pb-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9E7B4F]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,3.1rem)] font-normal leading-tight tracking-[-0.02em] text-[#171613]">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#5C574F] sm:text-base">{copy.intro}</p>
        </div>

        {/* 4 Steps with Photos + Connecting Arrows matching mockup */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => {
            const Icon = ICONS[index];
            return (
              <article
                key={step.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#171613]/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C8A16E] hover:shadow-md"
              >
                <div>
                  <div className="aspect-[16/8.5] max-h-36 w-full overflow-hidden rounded-xl bg-[#EAE2D3] border border-[#171613]/8">
                    <img
                      src={STEP_PHOTOS[index]}
                      alt={step.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-[#8D6C42]">
                      {step.num}
                    </span>
                    <Icon className="h-4 w-4 text-[#8D6C42]" />
                  </div>
                  <h3 className="mt-1 text-sm sm:text-base font-semibold text-[#171613]">{step.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#5C574F]">{step.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            to="/methode"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A5E3A] hover:text-[#171613]"
          >
            <span>{copy.detailsCta}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Full-bleed Architectural Dusk CTA Banner */}
      <div className="relative isolate overflow-hidden border-y border-[#D8B788]/25 bg-[#120F0C] py-14 text-[#FAF7F2] sm:py-16">
        <img
          src="/showcase/cta-boardroom-real.jpg"
          alt="Studio Executive Boardroom"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-85 brightness-[0.95] contrast-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0F0C09]/90 via-[#0F0C09]/65 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-[1540px] flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-10">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-[#E5C696]">
              XR AGENCY · PARIS & INTERNATIONAL
            </p>
            <h3 className="mt-2 font-serif text-[clamp(2rem,3.8vw,3.3rem)] font-normal leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {copy.bannerTitle}{" "}
              <span className="italic text-[#E5C696]">{copy.bannerAccent}</span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#quote"
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#E5C696] via-[#D5AF79] to-[#C2985E] px-6 py-3 text-xs font-bold text-[#17130E] shadow-[0_12px_28px_-8px_rgba(213,175,121,0.5)] transition hover:brightness-105 active:scale-[0.98]"
            >
              <span>{copy.bannerQuote}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a
              href="https://wa.me/33649219808?text=Bonjour%20XRAGENCY%2C%20je%20souhaite%20r%C3%A9server%20un%20cr%C3%A9neau%20de%20production%20prioritaire."
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-xl border border-white/25 bg-black/40 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:border-[#E5C696] hover:bg-black/60 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 text-[#E5C696]" />
              <span>{copy.bannerWa}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
