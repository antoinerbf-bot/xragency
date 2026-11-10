import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

interface Chapter {
  id: string;
  num: string;
  label: string;
  time: number;
}

const CHAPTERS: Record<Lang, Chapter[]> = {
  fr: [
    { id: "intro", num: "00", label: "Introduction", time: 0 },
    { id: "probleme", num: "01", label: "Le Problème", time: 9.7 },
    { id: "solution", num: "02", label: "Acquisition XR", time: 32.0 },
    { id: "web", num: "03", label: "Web < 0.4s", time: 41.05 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.55 },
    { id: "social", num: "05", label: "Social & Branding", time: 62.05 },
    { id: "ecosystem", num: "06", label: "SEO & Robots", time: 75.6 },
    { id: "proof", num: "07", label: "Maquette & 5 Jours", time: 86.85 },
  ],
  en: [
    { id: "intro", num: "00", label: "Intro", time: 0 },
    { id: "probleme", num: "01", label: "The Problem", time: 9.7 },
    { id: "solution", num: "02", label: "XR Growth", time: 32.0 },
    { id: "web", num: "03", label: "Web < 0.4s", time: 41.05 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.55 },
    { id: "social", num: "05", label: "Social & Brand", time: 62.05 },
    { id: "ecosystem", num: "06", label: "SEO & Robots", time: 75.6 },
    { id: "proof", num: "07", label: "Mockup & 5 Days", time: 86.85 },
  ],
  vi: [
    { id: "intro", num: "00", label: "Giới thiệu", time: 0 },
    { id: "probleme", num: "01", label: "Vấn đề", time: 9.7 },
    { id: "solution", num: "02", label: "Hệ thống XR", time: 32.0 },
    { id: "web", num: "03", label: "Web < 0.4s", time: 41.05 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.55 },
    { id: "social", num: "05", label: "Social & Brand", time: 62.05 },
    { id: "ecosystem", num: "06", label: "SEO & Robot", time: 75.6 },
    { id: "proof", num: "07", label: "Bản mẫu 5 ngày", time: 86.85 },
  ],
  ar: [
    { id: "intro", num: "00", label: "المقدمة", time: 0 },
    { id: "probleme", num: "01", label: "المشكلة", time: 9.7 },
    { id: "solution", num: "02", label: "منظومة النمو", time: 32.0 },
    { id: "web", num: "03", label: "مواقع فائقة السرعة", time: 41.05 },
    { id: "maps", num: "04", label: "خرائط جوجل #1", time: 50.55 },
    { id: "social", num: "05", label: "التواصل والهوية", time: 62.05 },
    { id: "ecosystem", num: "06", label: "سيو وروبوتات", time: 75.6 },
    { id: "proof", num: "07", label: "معاينة مجانية", time: 86.85 },
  ],
  ru: [
    { id: "intro", num: "00", label: "Введение", time: 0 },
    { id: "probleme", num: "01", label: "Проблема", time: 9.7 },
    { id: "solution", num: "02", label: "Система роста", time: 32.0 },
    { id: "web", num: "03", label: "Web < 0.4с", time: 41.05 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.55 },
    { id: "social", num: "05", label: "SMM и Брендинг", time: 62.05 },
    { id: "ecosystem", num: "06", label: "SEO и Роботы", time: 75.6 },
    { id: "proof", num: "07", label: "Макет за 5 дней", time: 86.85 },
  ],
};

const SECTION_COPY: Record<
  Lang,
  { kicker: string; title1: string; titleAccent: string; sub: string; watch: string; cta: string }
> = {
  fr: {
    kicker: "PRÉSENTATION VIDÉO · 1 MIN 40",
    title1: "Comment transformer votre image en ",
    titleAccent: "machine à clients.",
    sub: "Web Haute Couture, Google Maps Top 3, Réseaux Sociaux, Branding, SEO & Robotique — découvrez tout notre écosystème en moins de deux minutes.",
    watch: "Regarder la présentation · 1 min 40",
    cta: "Obtenir ma maquette offerte",
  },
  en: {
    kicker: "VIDEO PRESENTATION · 1 MIN 40",
    title1: "How to turn your brand presence into a ",
    titleAccent: "client engine.",
    sub: "Haute Couture Web, Google Maps Top 3, Social Media, Branding, SEO & Robotics — our complete acquisition system in under two minutes.",
    watch: "Watch the presentation · 1 min 40",
    cta: "Claim my free mockup",
  },
  vi: {
    kicker: "VIDEO GIỚI THIỆU · 1 PHÚT 40",
    title1: "Cách biến hiện diện số thành ",
    titleAccent: "cỗ máy thu hút khách hàng.",
    sub: "Website Cao Cấp, Google Maps Top 3, Mạng Xã Hội, Thương Hiệu, SEO & Robot Korben — khám phá toàn bộ hệ sinh thái trong chưa đầy 2 phút.",
    watch: "Xem video giới thiệu · 1 phút 40",
    cta: "Nhận bản thiết kế mẫu miễn phí",
  },
  ar: {
    kicker: "عرض مرئي · دقيقة و40 ثانية",
    title1: "كيف تحوّل حضورك الرقمي إلى ",
    titleAccent: "محرك لاستقطاب العملاء.",
    sub: "مواقع راقية، تصدر خرائط جوجل، إدارة الشبكات، الهوية، السيو والروبوتات — اكتشف منظومتنا المتكاملة في أقل من دقيقتين.",
    watch: "شاهد العرض التقديمي · 1:40",
    cta: "احصل على معاينتك المجانية",
  },
  ru: {
    kicker: "ВИДЕО-ПРЕЗЕНТАЦИЯ · 1 МИН 40",
    title1: "Как превратить цифровой образ в ",
    titleAccent: "поток заявок и продаж.",
    sub: "Премиум-сайты, Google Maps Топ-3, соцсети, брендинг, SEO и роботы Korben — вся экосистема XR Agency за две минуты.",
    watch: "Смотреть презентацию · 1 мин 40",
    cta: "Получить бесплатный макет",
  },
};

const PROOFS: Record<Lang, string[]> = {
  fr: ["Garantie contractuelle", "Direction artistique sur mesure", "Accompagnement humain dédié", "Maquette offerte sans engagement"],
  en: ["Contractual guarantee", "Bespoke art direction", "Dedicated senior team", "Free custom mockup"],
  vi: ["Cam kết hợp đồng", "Chỉ đạo nghệ thuật độc bản", "Đội ngũ chuyên gia đồng hành", "Tặng bản thiết kế mẫu"],
  ar: ["ضمانات تعاقدية", "إخراج فني حصري", "فريق استشاري مخصص", "معاينة مجانية بدون التزام"],
  ru: ["Гарантия по договору", "Индивидуальный стиль", "Персональная команда", "Бесплатный макет без обязательств"],
};

export function HeroVslPlayer() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const chapters = CHAPTERS[currentLang] ?? CHAPTERS.fr;
  const proofs = PROOFS[currentLang] ?? PROOFS.fr;
  const copy = SECTION_COPY[currentLang] ?? SECTION_COPY.fr;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    video.play().catch(() => { });
  };

  const jumpToChapter = (idx: number, time: number) => {
    setActiveChapter(idx);
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    video.currentTime = time;
    video.play().catch(() => { });
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (t >= chapters[i].time - 0.4) {
        setActiveChapter(i);
        break;
      }
    }
  };

  return (
    <section
      id="vsl-showcase"
      className="relative overflow-hidden border-t border-[#101114]/10 bg-[#f8f6f0] py-14 sm:py-20 text-[#101114]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Clean Editorial Header matching Hero above */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b704f]/30 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-md mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b48f5a] animate-pulse" />
            <span className="label-mono text-[7.5px] sm:text-[8.5px] font-semibold tracking-[.22em] text-[#554b3e] uppercase">
              {copy.kicker}
            </span>
          </div>

          <h2 className="display-serif text-[clamp(1.85rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#101114] [text-wrap:balance]">
            {copy.title1}
            <span className="italic font-light text-[#8b704f]">{copy.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-[13.5px] sm:text-[15px] leading-relaxed text-[#5c5347]">
            {copy.sub}
          </p>
        </div>

        {/* Video Frame */}
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#141312]/15 bg-[#121110] shadow-[0_28px_75px_-22px_rgba(20,19,18,0.48),0_0_0_1px_rgba(255,255,255,0.65)] transition-all">
            <div className="relative aspect-video w-full overflow-hidden bg-[#121110]">
              <video
                ref={videoRef}
                src="/videos/xr-agency-vsl.mp4"
                poster="/videos/vsl-poster.jpg"
                controls={isPlaying}
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => {
                  if (videoRef.current?.ended) setIsPlaying(false);
                }}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                className="h-full w-full object-cover"
              >
                <source src="/videos/xr-agency-vsl.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {!isPlaying && (
                <button
                  type="button"
                  onClick={startPlayback}
                  className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-9 bg-gradient-to-t from-black/60 via-transparent to-transparent cursor-pointer transition-opacity"
                  aria-label={copy.watch}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 rounded-full border border-[#c5a880]/45 bg-[#141312]/95 hover:bg-[#1e1b17] text-[#f7f4ed] px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base shadow-[0_14px_40px_rgba(20,19,18,0.75)] hover:scale-105 active:scale-95 transition-all backdrop-blur-md">
                    <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#e7cfa8] to-[#b48f5a] text-[#141312] shrink-0">
                      <span className="absolute inset-0 rounded-full border-2 border-[#e7cfa8]/75 animate-ping opacity-75" />
                      <Play className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-[#141312] ml-0.5" />
                    </span>
                    <span className="tracking-tight">{copy.watch}</span>
                  </div>
                </button>
              )}
            </div>

            {/* Chapters Scrub Bar */}
            <div className="border-t border-white/10 bg-[#121110] p-2.5 sm:p-3.5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <span className="label-mono text-[7px] sm:text-[8px] font-semibold text-[#e8cfa6] tracking-[.18em] uppercase shrink-0">
                  Chapitres :
                </span>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 w-full">
                  {chapters.map((chap, idx) => (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => jumpToChapter(idx, chap.time)}
                      className={`rounded-lg px-2 py-1.5 text-center transition border ${
                        activeChapter === idx
                          ? "border-[#c5a880] bg-[#c5a880]/20 text-[#f7f4ed] font-bold"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      <span className="label-mono text-[6.5px] text-[#e8cfa6] block">{chap.num}</span>
                      <span className="text-[8.5px] sm:text-[9.5px] font-medium line-clamp-1">{chap.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA + Reassurance strip below video */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="#quote"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#111215] px-7 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#302a23]"
            >
              <span>{copy.cta}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#5c5347]">
              {proofs.map((proof, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#8b704f]" />
                  <span className="font-medium text-[#2d2822]">{proof}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
