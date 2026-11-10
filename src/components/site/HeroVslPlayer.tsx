import { useRef, useState } from "react";
import { CheckCircle2, Play } from "lucide-react";
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
    { id: "probleme", num: "01", label: "Le Problème", time: 8.6 },
    { id: "solution", num: "02", label: "Machine de Vente", time: 32.2 },
    { id: "web", num: "03", label: "Web Haute Couture", time: 41.0 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.7 },
    { id: "social", num: "05", label: "Tournages 4K", time: 63.7 },
    { id: "ecosystem", num: "06", label: "SEO & Robots", time: 73.0 },
    { id: "proof", num: "07", label: "Livraison 5 Jours", time: 80.4 },
  ],
  en: [
    { id: "intro", num: "00", label: "Intro", time: 0 },
    { id: "probleme", num: "01", label: "The Problem", time: 8.6 },
    { id: "solution", num: "02", label: "Sales Engine", time: 32.2 },
    { id: "web", num: "03", label: "Haute Couture Web", time: 41.0 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.7 },
    { id: "social", num: "05", label: "4K Shoots", time: 63.7 },
    { id: "ecosystem", num: "06", label: "SEO & Robots", time: 73.0 },
    { id: "proof", num: "07", label: "5-Day Delivery", time: 80.4 },
  ],
  vi: [
    { id: "intro", num: "00", label: "Giới thiệu", time: 0 },
    { id: "probleme", num: "01", label: "Vấn đề", time: 8.6 },
    { id: "solution", num: "02", label: "Cỗ máy bán hàng", time: 32.2 },
    { id: "web", num: "03", label: "Web Đỉnh Cao", time: 41.0 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.7 },
    { id: "social", num: "05", label: "Sản xuất 4K", time: 63.7 },
    { id: "ecosystem", num: "06", label: "SEO & Robot", time: 73.0 },
    { id: "proof", num: "07", label: "Bàn giao 5 ngày", time: 80.4 },
  ],
  ar: [
    { id: "intro", num: "00", label: "المقدمة", time: 0 },
    { id: "probleme", num: "01", label: "المشكلة", time: 8.6 },
    { id: "solution", num: "02", label: "محرك المبيعات", time: 32.2 },
    { id: "web", num: "03", label: "مواقع راقية", time: 41.0 },
    { id: "maps", num: "04", label: "خرائط جوجل #1", time: 50.7 },
    { id: "social", num: "05", label: "إنتاج 4K", time: 63.7 },
    { id: "ecosystem", num: "06", label: "سيو وروبوتات", time: 73.0 },
    { id: "proof", num: "07", label: "تسليم في 5 أيام", time: 80.4 },
  ],
  ru: [
    { id: "intro", num: "00", label: "Введение", time: 0 },
    { id: "probleme", num: "01", label: "Проблема", time: 8.6 },
    { id: "solution", num: "02", label: "Машина продаж", time: 32.2 },
    { id: "web", num: "03", label: "Премиум Web", time: 41.0 },
    { id: "maps", num: "04", label: "Google Maps Top 3", time: 50.7 },
    { id: "social", num: "05", label: "4K Продакшн", time: 63.7 },
    { id: "ecosystem", num: "06", label: "SEO и Роботы", time: 73.0 },
    { id: "proof", num: "07", label: "Запуск за 5 дней", time: 80.4 },
  ],
};

const WATCH_LABELS: Record<Lang, string> = {
  fr: "Regarder la vidéo · 1 min 30",
  en: "Watch the presentation · 1 min 30",
  vi: "Xem video giới thiệu · 1 phút 30",
  ar: "شاهد الفيديو التعريفي · دقيقة ونصف",
  ru: "Смотреть презентацию · 1 мин 30",
};

const PROOFS: Record<Lang, string[]> = {
  fr: ["Garantie contractuelle", "Direction artistique sur mesure", "Accompagnement humain dédié", "Livraison garantie en 5 jours"],
  en: ["Contractual guarantee", "Bespoke art direction", "Dedicated senior team", "Guaranteed 5-day delivery"],
  vi: ["Cam kết hợp đồng", "Chỉ đạo nghệ thuật độc bản", "Đội ngũ chuyên gia đồng hành", "Bàn giao chuẩn 5 ngày"],
  ar: ["ضمانات تعاقدية", "إخراج فني حصري", "فريق استشاري مخصص", "تسليم مضمون في 5 أيام"],
  ru: ["Гарантия по договору", "Индивидуальный стиль", "Персональная команда", "Гарантия запуска за 5 дней"],
};

export function HeroVslPlayer() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const chapters = CHAPTERS[currentLang] ?? CHAPTERS.fr;
  const proofs = PROOFS[currentLang] ?? PROOFS.fr;
  const watchLabel = WATCH_LABELS[currentLang] ?? WATCH_LABELS.fr;

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
      if (t >= chapters[i].time - 0.5) {
        setActiveChapter(i);
        break;
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* 16:9 Video Frame with Amplia Digital-style Soft Shadow & Clean Border */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#101114]/15 bg-black shadow-[0_24px_60px_-24px_rgba(1,90,255,0.55),0_0_0_1px_rgba(255,255,255,0.7)] transition-all">
        
        {/* Aspect Ratio 16:9 Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#0c1830]">
          {/* Native HTML5 Video Element */}
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
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            className="h-full w-full object-cover"
          >
            <source src="/videos/xr-agency-vsl.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {/* Floating CTA Pill (Amplia Digital Style) */}
          {!isPlaying && (
            <button
              type="button"
              onClick={startPlayback}
              className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-8 bg-gradient-to-t from-black/60 via-transparent to-transparent cursor-pointer transition-opacity"
              aria-label={watchLabel}
            >
              <div className="flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#015aff] hover:bg-[#004ed4] text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base shadow-[0_10px_35px_rgba(1,90,255,0.65)] hover:scale-105 active:scale-95 transition-all">
                <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-[#015aff] shrink-0">
                  <span className="absolute inset-0 rounded-full border-2 border-white/80 animate-ping opacity-75" />
                  <Play className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-[#015aff] ml-0.5" />
                </span>
                <span className="tracking-tight">{watchLabel}</span>
              </div>
            </button>
          )}
        </div>

        {/* 8 Chapters Quick Scrub Bar directly beneath video */}
        <div className="border-t border-white/10 bg-[#0c121e] p-2.5 sm:p-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <span className="label-mono text-[7px] sm:text-[8px] font-semibold text-[#6ea8ff] tracking-[.18em] uppercase shrink-0">
              Chapitres VSL (1m 30) :
            </span>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 w-full">
              {chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => jumpToChapter(idx, chap.time)}
                  className={`rounded-lg px-2 py-1.5 text-center transition border ${
                    activeChapter === idx
                      ? "border-[#015aff] bg-[#015aff]/25 text-white font-bold"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span className="label-mono text-[6.5px] text-[#6ea8ff] block">{chap.num}</span>
                  <span className="text-[8.5px] sm:text-[9.5px] font-medium line-clamp-1">{chap.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Badges below Video */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#5c5347]">
        {proofs.map((proof, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#015aff]" />
            <span className="font-medium text-[#2d2822]">{proof}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
