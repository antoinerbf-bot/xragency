import { ArrowUpRight, Award, Globe2, Layers, Plane } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import storyMeeting from "@/assets/story-business-meeting.jpg";

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    accent: string;
    pillars: { title: string; detail: string }[];
    cta: string;
    photoAlt: string;
  }
> = {
  fr: {
    eyebrow: "POURQUOI XR AGENCY",
    title: "Une agence engagée",
    accent: "à vos côtés.",
    pillars: [
      {
        title: "Conseil stratégique",
        detail: "Des recommandations claires et adaptées à votre marché.",
      },
      {
        title: "Exécution sur mesure",
        detail: "Des solutions concrètes, créatives et performantes.",
      },
      {
        title: "Expertise digitale 360°",
        detail: "Une vision d'ensemble de vos leviers de croissance.",
      },
      {
        title: "Accompagnement international",
        detail: "Une coordination internationale adaptée au périmètre du projet.",
      },
    ],
    cta: "Découvrir notre histoire",
    photoAlt: "Scène de réunion de travail",
  },
  en: {
    eyebrow: "WHY XR AGENCY",
    title: "A committed agency",
    accent: "by your side.",
    pillars: [
      {
        title: "Strategic consulting",
        detail: "Clear, tailored recommendations built for your market.",
      },
      {
        title: "Bespoke execution",
        detail: "Concrete, creative and high-performing digital solutions.",
      },
      {
        title: "360° digital expertise",
        detail: "A full comprehensive perspective on business growth.",
      },
      {
        title: "International presence",
        detail: "International coordination shaped around the project scope.",
      },
    ],
    cta: "Discover our story",
    photoAlt: "A team meeting scene",
  },
  vi: {
    eyebrow: "VÌ SAO CHỌN XR AGENCY",
    title: "Một đối tác tận tâm",
    accent: "đồng hành cùng bạn.",
    pillars: [
      {
        title: "Tư vấn chiến lược",
        detail: "Định hướng rõ ràng, bám sát thị trường mục tiêu.",
      },
      {
        title: "Thực thi may đo",
        detail: "Giải pháp thực tế, sáng tạo và hiệu quả vượt trội.",
      },
      {
        title: "Chuyên môn số 360°",
        detail: "Tầm nhìn toàn diện về các đòn bẩy tăng trưởng.",
      },
      {
        title: "Hỗ trợ quốc tế",
        detail: "Phối hợp quốc tế phù hợp với phạm vi dự án.",
      },
    ],
    cta: "Tìm hiểu câu chuyện của chúng tôi",
    photoAlt: "Cảnh họp nhóm làm việc",
  },
  ar: {
    eyebrow: "لماذا XR AGENCY",
    title: "وكالة ملتزمة",
    accent: "بجانبك دائمًا.",
    pillars: [
      {
        title: "استشارات استراتيجية",
        detail: "توصيات واضحة ومصممة خصيصًا لسوقك.",
      },
      {
        title: "تنفيذ مخصص",
        detail: "حلول واقعية، إبداعية وعالية الأداء.",
      },
      {
        title: "خبرة رقمية متكاملة",
        detail: "رؤية شاملة 360° لجميع محركات النمو.",
      },
      {
        title: "دعم دولي متواصل",
        detail: "تنسيق دولي يتناسب مع نطاق المشروع.",
      },
    ],
    cta: "تعرف على قصتنا",
    photoAlt: "مشهد اجتماع عمل",
  },
  ru: {
    eyebrow: "ПОЧЕМУ XR AGENCY",
    title: "Агентство, вовлечённое",
    accent: "в ваш успех.",
    pillars: [
      {
        title: "Стратегический консалтинг",
        detail: "Чёткие рекомендации, адаптированные под ваш рынок.",
      },
      {
        title: "Индивидуальная реализация",
        detail: "Конкретные, креативные и эффективные решения.",
      },
      {
        title: "Цифровая экспертиза",
        detail: "Комплексный взгляд 360° на точки роста.",
      },
      {
        title: "Международное сопровождение",
        detail: "Международная координация с учётом задач проекта.",
      },
    ],
    cta: "Узнать о нас больше",
    photoAlt: "Сцена рабочей встречи",
  },
};

const PILLAR_ICONS = [Award, Layers, Globe2, Plane];

export function WhyAgencySection() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;

  return (
    <section
      id="agence"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="border-b border-[#EBE5DC] bg-[#FAF8F5] py-20 text-[#1A1815]"
    >
      <div className="mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* Left: Team Photo in Clean Luxury Frame */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-[#EBE5DC] bg-white p-3 shadow-lg">
            <img
              src={storyMeeting}
              alt={c.photoAlt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Editorial 2x2 Pillars */}
        <div className="lg:col-span-7">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A67C40]">
            {c.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.4rem)] font-normal leading-[1.12] tracking-[-0.02em] text-[#1A1815]">
            <span>{c.title} </span>
            <em className="font-serif italic text-[#A67C40]">{c.accent}</em>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx];
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[#EBE5DC] bg-white p-5 shadow-sm transition hover:border-[#D1B07A] hover:shadow-md"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FAF8F5] text-[#A67C40] border border-[#EBE5DC]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold tracking-wide text-[#1A1815]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5C554B]">{pillar.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              to="/notre-histoire"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#1A1815] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#332F2B]"
            >
              <span>{c.cta}</span>
              <ArrowUpRight className="h-4 w-4 text-[#E5C696] rtl:rotate-90" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
