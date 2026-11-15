import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Play, Shield, Sparkles, Volume2, Zap } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

interface Chapter {
  id: string;
  num: string;
  label: string;
  time: number;
}

const CHAPTERS: Record<Lang, Chapter[]> = {
  fr: [
    { id: "intro", num: "01", label: "Le Constat", time: 0 },
    { id: "probleme", num: "02", label: "Prise de conscience", time: 8.08 },
    { id: "solution", num: "03", label: "Vision Studio XR", time: 17.6 },
    { id: "web", num: "04", label: "Web · Maps · Social", time: 25.84 },
    { id: "ecosystem", num: "05", label: "CRM · SEO · IA", time: 36.96 },
    { id: "proof", num: "06", label: "Démarrer ensemble", time: 46.12 },
  ],
  en: [
    { id: "intro", num: "01", label: "The Context", time: 0 },
    { id: "probleme", num: "02", label: "First Impression", time: 8.08 },
    { id: "solution", num: "03", label: "XR Craft", time: 17.6 },
    { id: "web", num: "04", label: "Web · Maps · Social", time: 25.84 },
    { id: "ecosystem", num: "05", label: "CRM · SEO · AI", time: 36.96 },
    { id: "proof", num: "06", label: "Begin Project", time: 46.12 },
  ],
  vi: [
    { id: "intro", num: "01", label: "Thực trạng", time: 0 },
    { id: "probleme", num: "02", label: "Tìm kiếm Google", time: 8.08 },
    { id: "solution", num: "03", label: "Giải pháp XR", time: 17.6 },
    { id: "web", num: "04", label: "Web · Maps · Social", time: 25.84 },
    { id: "ecosystem", num: "05", label: "CRM · SEO · AI", time: 36.96 },
    { id: "proof", num: "06", label: "Bắt đầu ngay", time: 46.12 },
  ],
  ar: [
    { id: "intro", num: "01", label: "الواقع", time: 0 },
    { id: "probleme", num: "02", label: "الانطباع الأول", time: 8.08 },
    { id: "solution", num: "03", label: "منهجية XR", time: 17.6 },
    { id: "web", num: "04", label: "المواقع والخرائط", time: 25.84 },
    { id: "ecosystem", num: "05", label: "نظام CRM والسيو", time: 36.96 },
    { id: "proof", num: "06", label: "ابدأ مشروعك", time: 46.12 },
  ],
  ru: [
    { id: "intro", num: "01", label: "Контекст", time: 0 },
    { id: "probleme", num: "02", label: "Первый контакт", time: 8.08 },
    { id: "solution", num: "03", label: "Подход XR", time: 17.6 },
    { id: "web", num: "04", label: "Сайты · Maps · SMM", time: 25.84 },
    { id: "ecosystem", num: "05", label: "CRM · SEO · ИИ", time: 36.96 },
    { id: "proof", num: "06", label: "Начать проект", time: 46.12 },
  ],
};

const SECTION_COPY: Record<
  Lang,
  { kicker: string; title1: string; titleAccent: string; sub: string; watch: string; cta: string }
> = {
  fr: {
    kicker: "LE FILM INSTITUTIONNEL · 55 SEC",
    title1: "L'art de séduire, ",
    titleAccent: "la certitude de convertir.",
    sub: "Plongez dans les coulisses du Studio XR. Découvrez comment nos directeurs artistiques et ingénieurs transforment chaque pixel en autorité commerciale pour votre marque.",
    watch: "Lire le film cinéma",
    cta: "Réserver votre cadrage",
  },
  en: {
    kicker: "THE STUDIO FILM · 55 SEC",
    title1: "The art of prestige, ",
    titleAccent: "the power of conversion.",
    sub: "Step inside the XR Studio. See how our art directors and engineers engineer digital authority that converts high-value clients effortlessly.",
    watch: "Play cinema film",
    cta: "Book private briefing",
  },
  vi: {
    kicker: "PHIM GIỚI THIỆU STUDIO · 55 GIÂY",
    title1: "Nghệ thuật đẳng cấp, ",
    titleAccent: "chinh phục khách hàng.",
    sub: "Khám phá cách XR Agency kết hợp chỉ đạo nghệ thuật, tìm kiếm địa phương và giải pháp số để tạo nên vị thế dẫn đầu.",
    watch: "Xem phim điện ảnh",
    cta: "Trao đổi dự án",
  },
  ar: {
    kicker: "فيلم الوكالة السينمائي · 55 ثانية",
    title1: "فن الإبهار الرقمي، ",
    titleAccent: "ويقين مضاعفة المبيعات.",
    sub: "اكتشف كيف نجمع بين الإخراج الفني الراقي وأحدث التقنيات لترسيخ ريادتك في السوق.",
    watch: "شاهد الفيلم السينمائي",
    cta: "احجز جلسة استشارية",
  },
  ru: {
    kicker: "ФИЛЬМ О СТУДИИ · 55 СЕК",
    title1: "Искусство премиум-образа, ",
    titleAccent: "сила высоких конверсий.",
    sub: "Погрузитесь в процесс XR Agency. Узнайте, как эстетика, безупречный код и локальное продвижение приносят состоятельных клиентов.",
    watch: "Смотреть фильм",
    cta: "Обсудить проект",
  },
};

export function HeroVslPlayer() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const chapters = CHAPTERS[currentLang] ?? CHAPTERS.fr;
  const copy = SECTION_COPY[currentLang] ?? SECTION_COPY.fr;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    video.play().catch(() => {});
  };

  const jumpToChapter = (idx: number, time: number) => {
    setActiveChapter(idx);
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    video.currentTime = time;
    video.play().catch(() => {});
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
      className="relative overflow-hidden border-t border-white/10 bg-[#050608] py-24 sm:py-32 lg:py-36 text-white"
    >
      {/* Subtle Cinema Light Bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[85%] rounded-full bg-[#d4af37]/8 blur-[180px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Cinema Header */}
        <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-end mb-14 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-1.5 text-[8.5px] font-mono font-bold tracking-[.26em] text-[#d4af37] uppercase mb-5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span>{copy.kicker}</span>
              <span className="opacity-30">|</span>
              <span>FILM STUDIO · 55 SEC</span>
            </div>
            <h2 className="text-[clamp(2.4rem,4.4vw,4.4rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white [text-wrap:balance]">
              {copy.title1}
              <span className="font-serif italic font-normal text-[#d4af37] tracking-tight block sm:inline">
                {copy.titleAccent}
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-5">
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-neutral-300 lg:text-right">
              {copy.sub}
            </p>
            <a
              href="#quote"
              className="group inline-flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[.18em] text-[#d4af37] hover:text-white transition shrink-0"
            >
              <span>{copy.cta}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-[#d4af37]" />
            </a>
          </div>
        </div>

        {/* 21:9 CinemaScope Theater Canvas with Ambient Titanium Glass Frame */}
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[#d4af37]/25 bg-[#090b10] p-2.5 sm:p-4 shadow-[0_45px_120px_-30px_rgba(0,0,0,0.95)]">
          {/* Subtle Outer Specular Sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-[#d4af37]/[0.03]" />

          <div className="relative aspect-[21/10] sm:aspect-[21/9] w-full overflow-hidden rounded-[1.6rem] bg-black">
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
                className="group absolute inset-0 z-20 flex items-center justify-center bg-black/45 hover:bg-black/30 cursor-pointer transition-colors backdrop-blur-[2px]"
                aria-label={copy.watch}
              >
                <div className="relative flex items-center gap-4.5 rounded-full border border-white/25 bg-black/80 px-8 py-4.5 text-sm font-bold text-white shadow-[0_0_60px_rgba(212,175,55,0.35)] backdrop-blur-2xl transition duration-300 group-hover:scale-105 group-hover:border-[#d4af37]">
                  <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f3e8c8] via-[#d4af37] to-[#8f7422] text-[#050608] shrink-0 shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </span>
                  <div className="text-left">
                    <span className="block font-sans text-sm tracking-tight text-white font-semibold">{copy.watch}</span>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#d4af37] font-bold">55 SEC · FILM STUDIO</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* 4 Client Reassurance & Security Pillars */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              icon: Shield,
              title: "Délais cadrés",
              sub: "Planning défini selon la formule",
            },
            {
              icon: Zap,
              title: "Propriété 100% Exclusive",
              sub: "Zéro abonnement forcé, code cédé",
            },
            {
              icon: Sparkles,
              title: "Architecture Next-Gen",
              sub: "Optimisation technique & suivi des performances",
            },
            {
              icon: CheckCircle2,
              title: "Accompagnement VIP",
              sub: "Un interlocuteur dédié au projet",
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-[#090b10] px-4 py-3.5 backdrop-blur-md"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#d4af37]/10 text-[#d4af37] shrink-0 border border-[#d4af37]/20">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white tracking-tight leading-snug truncate">
                    {pillar.title}
                  </p>
                  <p className="text-[10.5px] text-neutral-400 leading-snug truncate">
                    {pillar.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Precision Chapter Scrub Matrix */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 border-t border-white/10 pt-6">
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => jumpToChapter(idx, chap.time)}
              className={`group text-left p-3 rounded-xl border transition-all ${
                activeChapter === idx
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  : "border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[9.5px] tracking-widest ${
                    activeChapter === idx ? "text-[#d4af37] font-bold" : "opacity-60"
                  }`}
                >
                  {chap.num}
                </span>
                {activeChapter === idx && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
                )}
              </div>
              <span
                className={`mt-1.5 block text-xs leading-snug ${
                  activeChapter === idx ? "font-bold text-white" : "font-medium"
                }`}
              >
                {chap.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
