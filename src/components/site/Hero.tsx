import { ArrowRight, Play } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { eyebrow: string; line1: string; accent: string; intro: string; services: string; film: string; scroll: string; note: string }> = {
  fr: { eyebrow: "STUDIO DIGITAL · STRATÉGIE · CRÉATION", line1: "L’art du digital", accent: "sur mesure.", intro: "Nous concevons des expériences digitales cohérentes — de la stratégie à la création — pour aider les marques ambitieuses à mieux se présenter, se rendre visibles et développer leur activité.", services: "Découvrir nos expertises", film: "Voir le film", scroll: "Défiler pour découvrir", note: "Une approche exigeante. Des solutions pensées pour votre activité." },
  en: { eyebrow: "DIGITAL STUDIO · STRATEGY · CREATION", line1: "The art of digital", accent: "made to measure.", intro: "We design coherent digital experiences — from strategy to execution — helping ambitious brands present themselves better, become more visible and grow their business.", services: "Explore our expertise", film: "Watch the film", scroll: "Scroll to discover", note: "A considered approach. Solutions designed around your business." },
  vi: { eyebrow: "STUDIO SỐ · CHIẾN LƯỢC · SÁNG TẠO", line1: "Nghệ thuật số", accent: "đo ni đóng giày.", intro: "Chúng tôi xây dựng trải nghiệm số đồng bộ — từ chiến lược đến triển khai — giúp thương hiệu thể hiện tốt hơn, tăng khả năng hiện diện và phát triển hoạt động kinh doanh.", services: "Khám phá chuyên môn", film: "Xem phim", scroll: "Cuộn để khám phá", note: "Tư duy chỉn chu. Giải pháp phù hợp với doanh nghiệp của bạn." },
  ar: { eyebrow: "استوديو رقمي · استراتيجية · إبداع", line1: "فن الحلول الرقمية", accent: "المصممة خصيصًا.", intro: "نصمم تجارب رقمية متكاملة، من الاستراتيجية إلى التنفيذ، لمساعدة العلامات الطموحة على تقديم نفسها بشكل أفضل وتعزيز حضورها وتنمية أعمالها.", services: "اكتشف خبراتنا", film: "شاهد الفيلم", scroll: "مرر لاكتشاف المزيد", note: "منهج مدروس وحلول مصممة لأعمالك." },
  ru: { eyebrow: "DIGITAL STUDIO · СТРАТЕГИЯ · КРЕАТИВ", line1: "Искусство digital", accent: "под ваши задачи.", intro: "Мы создаём целостные цифровые решения — от стратегии до реализации — помогая амбициозным брендам лучше представлять себя, повышать видимость и развивать бизнес.", services: "Наши компетенции", film: "Смотреть фильм", scroll: "Прокрутите, чтобы узнать больше", note: "Продуманный подход. Решения для вашего бизнеса." },
};

export function Hero() {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.fr;

  return (
    <section id="hero" className="relative isolate min-h-[min(900px,100svh)] overflow-hidden bg-[#171613] text-[#F7F3EB]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/vsl-poster.jpg"
          aria-label="Film de présentation XR Agency"
        >
          <source src="/videos/xr-agency-vsl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#11110F]/90 via-[#11110F]/62 to-[#11110F]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/65 via-transparent to-[#11110F]/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(900px,100svh)] max-w-[1600px] flex-col justify-end px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#C6A77D]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E2C9A6] sm:text-xs">{copy.eyebrow}</p>
          </div>

          <h1 className="max-w-4xl text-[clamp(3.15rem,8.2vw,7.7rem)] font-medium leading-[0.92] tracking-[-0.065em] [text-wrap:balance]">
            <span className="block">{copy.line1}</span>
            <span className="mt-2 block font-serif font-normal italic tracking-[-0.045em] text-[#D9BC94]">{copy.accent}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/82 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
            {copy.intro}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#services" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#F2E9DC] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#171613] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9BC94]">
              {copy.services}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#vsl-showcase" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/12">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/45"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
              {copy.film}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/25 pt-5 text-[10px] uppercase tracking-[0.18em] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <span>{copy.note}</span>
          <a href="#services" className="inline-flex items-center gap-2 self-start transition hover:text-[#E2C9A6] sm:self-auto">{copy.scroll}<span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
