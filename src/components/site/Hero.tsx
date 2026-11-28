import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Layers3, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";

interface TeamShowreelClip {
  id: string;
  video: string;
  city: string;
  focus: string;
}

const SHOWREEL_CLIPS: TeamShowreelClip[] = [
  {
    id: "creative-strategy",
    video: "/videos/hero-team-collaborative.mp4",
    city: "Paris · Dubaï · New York",
    focus: "Stratégie de Marque & Direction Artistique",
  },
  {
    id: "growth-marketing",
    video: "/videos/clip-46680.mp4",
    city: "Pôle International",
    focus: "Acquisition & Performance Digitale",
  },
  {
    id: "ux-sprint",
    video: "/videos/clip-23043.mp4",
    city: "Studio Innovation",
    focus: "Design d'Expérience & Prototypage",
  },
  {
    id: "client-review",
    video: "/videos/clip-36897.mp4",
    city: "Production Digitale",
    focus: "Architecture Web & Déploiement",
  },
];

const COPY = {
  fr: {
    eyebrow: "AGENCE DIGITALE INTERNATIONALE",
    hubsTitle: "PARIS · DUBAÏ · SINGAPOUR · NEW YORK · TOKYO",
    titlePart1: "L’art du ",
    titleItalic: "digital",
    titlePart2: "sur mesure.",
    sub: "Architecture web haute performance, stratégie de marque et acquisition ciblée. Nous concevons votre écosystème digital pour convertir durablement vos prospects en clients.",
    ctaPrimary: "Réserver un appel stratégique (15 min)",
    ctaPrimarySub: "Diagnostic direct · Ligne associée",
    ctaSecondary: "Estimer mon budget en direct",
    ctaAgency: "Nos 8 pôles & tarifs",
    guarantee: "Maquette interactive sur-mesure · Analyse SEO & performance incluse",
    scroll: "Découvrir nos expertises",
  },
  en: {
    eyebrow: "INTERNATIONAL DIGITAL AGENCY",
    hubsTitle: "PARIS · DUBAI · SINGAPORE · NEW YORK · TOKYO",
    titlePart1: "The art of ",
    titleItalic: "bespoke",
    titlePart2: "digital craft.",
    sub: "High-performance web architecture, brand strategy and targeted acquisition. We sculpt your digital presence to convert high-value prospects into clients.",
    ctaPrimary: "Request my free mockup",
    ctaPrimarySub: "Within 24-48h · No commitment",
    ctaSecondary: "Free digital audit",
    ctaAgency: "Selected work",
    guarantee: "Bespoke interactive mockup · SEO & performance audit included",
    scroll: "Discover our services",
  },
  vi: {
    eyebrow: "AGENCY KỸ THUẬT SỐ QUỐC TẾ",
    hubsTitle: "PARIS · DUBAI · SINGAPORE · NEW YORK · TOKYO",
    titlePart1: "Nghệ thuật ",
    titleItalic: "số",
    titlePart2: "đo ni đóng giày.",
    sub: "Kiến trúc web hiệu năng cao, chiến lược thương hiệu và tăng trưởng. Chúng tôi xây dựng sự hiện diện số để chuyển đổi khách hàng bền vững.",
    ctaPrimary: "Yêu cầu bản demo miễn phí",
    ctaPrimarySub: "Trong 24-48h · Không ràng buộc",
    ctaSecondary: "Đánh giá digital miễn phí",
    ctaAgency: "Dự án tiêu biểu",
    guarantee: "Demo tương tác riêng · Đánh giá SEO & chuyển đổi",
    scroll: "Khám phá chuyên môn",
  },
  ar: {
    eyebrow: "وكالة رقمية دولية",
    hubsTitle: "باريس · دبي · سنغافورة · نيويورك · طوكيو",
    titlePart1: "فن الحلول ",
    titleItalic: "الرقمية",
    titlePart2: "المصممة خصيصًا.",
    sub: "بنية ويب عالية الأداء، استراتيجية العلامة التجارية والنمو الرقمي لبناء حضور يحول الزوار إلى عملاء دائمين.",
    ctaPrimary: "طلب نموذج أولي مجاني",
    ctaPrimarySub: "خلال 24-48 ساعة · بدون التزام",
    ctaSecondary: "تدقيق رقمي مجاني",
    ctaAgency: "أعمال مختارة",
    guarantee: "نموذج تفاعلي مخصص · تدقيق شامل لتحسين محركات البحث والأداء",
    scroll: "استكشف خدماتنا",
  },
  ru: {
    eyebrow: "МЕЖДУНАРОДНОЕ DIGITAL-АГЕНТСТВО",
    hubsTitle: "ПАРИЖ · ДУБАЙ · СИНГАПУР · НЬЮ-ЙОРК · ТОКИО",
    titlePart1: "Искусство ",
    titleItalic: "digital",
    titlePart2: "под ваши задачи.",
    sub: "Высокопроизводительная веб-архитектура, стратегия бренда и целевой трафик для стабильной конверсии клиентов.",
    ctaPrimary: "Запросить бесплатный макет",
    ctaPrimarySub: "За 24-48ч · Без обязательств",
    ctaSecondary: "Бесплатный digital-аудит",
    ctaAgency: "Избранные проекты",
    guarantee: "Интерактивный макет · SEO и аудит производительности",
    scroll: "Смотреть услуги",
  },
};

const PILLARS = [
  {
    icon: BarChart3,
    label: {
      fr: "Stratégie & Conseil",
      en: "Strategy & Advisory",
      vi: "Chiến lược & Tư vấn",
      ar: "الاستراتيجية والاستشارات",
      ru: "Стратегия и консалтинг",
    },
  },
  {
    icon: Play,
    label: {
      fr: "Production Créative",
      en: "Creative Production",
      vi: "Sản xuất Sáng tạo",
      ar: "الإنتاج الإبداعي",
      ru: "Креативное производство",
    },
  },
  {
    icon: Layers3,
    label: {
      fr: "Acquisition & Visibilité",
      en: "Acquisition & SEO",
      vi: "Thu hút & Hiển thị",
      ar: "الاستحواذ والظهور",
      ru: "Привлечение и видимость",
    },
  },
  {
    icon: Sparkles,
    label: {
      fr: "Automatisation & IA",
      en: "Automation & AI",
      vi: "Tự động hóa & AI",
      ar: "الأتمتة والذكاء",
      ru: "Автоматизация и ИИ",
    },
  },
];

export function Hero() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveClipIndex((prev) => (prev + 1) % SHOWREEL_CLIPS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeClip = SHOWREEL_CLIPS[activeClipIndex];

  return (
    <>
      <section
        id="hero"
        aria-label="XR Agency Hero"
        className="xr-hero-refined relative isolate min-h-[100svh] w-full overflow-hidden bg-[#100E0C] pt-20 text-[#FAF7F2]"
      >
        {/* ── Background: Convivial & Professional Digital Marketing Team in Action ── */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#100E0C]">
          {SHOWREEL_CLIPS.map((clip, idx) => {
            const isActive = idx === activeClipIndex;
            return (
              <div
                key={clip.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                  isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none",
                )}
              >
                <video
                  src={clip.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover scale-[1.01]"
                />
              </div>
            );
          })}

          {/* Luminous Luxury Scrim: Soft, luminous, keeping the team and their creative work vividly visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#100E0C]/80 via-black/15 to-black/40 pointer-events-none" />
        </div>

        {/* ── Top-Left: Architectural Branding & Headline ── */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 lg:left-12 z-30 pointer-events-auto max-w-[290px] sm:max-w-xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-white/95">
              <span className="inline sm:hidden">AGENCE DIGITALE INTERNATIONALE</span>
              <span className="hidden sm:inline">{c.eyebrow}</span>
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-[3.2rem] font-light leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
            <span>{c.titlePart1}</span>
            <span className="font-serif italic font-normal text-white underline decoration-[#E5C696]/60 decoration-1 underline-offset-4">
              {c.titleItalic}
            </span>{" "}
            <span>{c.titlePart2}</span>
          </h1>
        </div>

        {/* ── Top-Right: Discreet Live Team & International Hub Indicator ── */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 lg:right-12 z-30 pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 backdrop-blur-md text-white shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
              {activeClip.city}
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-zinc-300">
              · {activeClip.focus}
            </span>
          </div>
        </div>

        {/* ── Bottom Center Dock: Subtitle, CTAs & Guarantee ── */}
        <div className="relative z-20 pointer-events-none mx-auto flex min-h-[calc(100svh-5rem)] max-w-3xl flex-col items-center justify-end px-4 sm:px-6 pb-6 sm:pb-10 text-center">
          <div className="pointer-events-auto w-full max-w-2xl flex flex-col items-center">
            {/* Subtitle: High-clarity, elegant description */}
            <p className="text-xs sm:text-[14px] leading-relaxed text-white/95 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {c.sub}
            </p>

            {/* CTA Row: Demande de maquette, Audit gratuit, Appel stratégique 15 min */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {/* Primary Action: Demande de maquette */}
              <a
                href="#quote"
                className="group relative inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-6 text-xs sm:text-[13px] font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-white/95 hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4 text-[#A67C40] shrink-0" />
                <span>Demander une maquette</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-black" />
              </a>

              {/* Secondary Action: Audit gratuit */}
              <a
                href="#quote"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-xs sm:text-[13px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/70 hover:scale-[1.03] active:scale-[0.98] shadow-sm"
              >
                <span>Audit gratuit</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/80" />
              </a>

              {/* Tertiary Action: Appel stratégique 15 min */}
              <a
                href="tel:+33767566783"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 sm:px-5 text-xs sm:text-[13px] font-medium text-white/95 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:border-white/40 hover:text-white"
              >
                <span>📞 Appel stratégique (15 min)</span>
              </a>
            </div>

            {/* Reassurance Guarantee Footnote */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[11px] font-mono text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <span className="text-[#E5C696]">✦</span>
              <span>Ligne directe Direction Associée : +33 7 67 56 67 83</span>
              <span className="text-white/40">·</span>
              <span>Maquette personnalisée 48h sans engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars Ribbon (Moved below Hero to keep Hero 100% focused on immersion) ── */}
      <div className="relative z-30 border-y border-white/10 bg-[#120F0D]/95 backdrop-blur-md py-4 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 flex-1">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.label.fr} className="flex items-center gap-3 text-white/90">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/10 text-white shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium tracking-wide sm:text-[13px]">
                    {pillar.label[lang] ?? pillar.label.fr}
                  </span>
                </div>
              );
            })}
          </div>

          <a
            href="#services"
            className="hidden items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 transition hover:text-white lg:inline-flex shrink-0"
          >
            <span>{c.scroll}</span>
            <span className="inline-block animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </>
  );
}
