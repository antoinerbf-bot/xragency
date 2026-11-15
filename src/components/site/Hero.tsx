import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { XR_HERO_PHOTO } from "@/lib/photography";

const HERO_COPY: Record<
  Lang,
  {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    ctaServices: string;
    ctaProject: string;
    agencySummaryTitle: string;
    agencySummaryText: string;
    pillars: { label: string; sub: string; href: string }[];
    valuePoints: string[];
    scrollNotice: string;
    filmBtn: string;
  }
> = {
  fr: {
    kicker: "XR AGENCY · AGENCE DIGITALE INTERNATIONALE · 10 ANS D'EXPÉRIENCE",
    titleLine1: "L'ÉLÉGANCE DIGITALE.",
    titleLine2: "La Machine à Vendre.",
    lead: "Des sites web exceptionnels, une image de marque forte et une visibilité locale puissante sur Google Maps.",
    ctaServices: "Découvrir nos services",
    ctaProject: "Construire mon projet",
    agencySummaryTitle: "Création, technologie & croissance commerciale",
    agencySummaryText:
      "Nous concevons et déployons des actifs digitaux complets pour les dirigeants et entreprises qui souhaitent attirer des prospects qualifiés, rassurer immédiatement et convertir durablement.",
    pillars: [
      { label: "Sites Web", sub: "Vitrine Pro 499 € · Business 799 € · E-commerce 1 499 €", href: "/services/websites" },
      { label: "Branding & Identité", sub: "Logo Signature 199 € · Identité 299 € · Charte 399 €", href: "/services/branding" },
      { label: "Google Maps & SEO", sub: "Maps dès 99 € · SEO Naturel dès 299 € / mois", href: "/services/maps" },
      { label: "Social, WebCare & POS", sub: "Social 349 €/m · WebCare 29 €/m · Caisse POS & Robots", href: "/services/social" },
    ],
    valuePoints: [
      "Dix années d'expérience en stratégie, design et développement",
      "Tarifs clairs et transparents publiés par prestation",
      "Propriété intégrale du code et accompagnement dans la durée",
    ],
    scrollNotice: "Explorer l'agence et nos 7 expertises",
    filmBtn: "Présentation vidéo",
  },
  en: {
    kicker: "XR AGENCY · INTERNATIONAL DIGITAL STUDIO · 10 YEARS OF EXPERIENCE",
    titleLine1: "L'ÉLÉGANCE DIGITALE.",
    titleLine2: "La Machine à Vendre.",
    lead: "Exceptional websites, a strong brand identity and powerful local visibility on Google Maps.",
    ctaServices: "Discover our services",
    ctaProject: "Build my project",
    agencySummaryTitle: "Creation, technology & commercial growth",
    agencySummaryText:
      "We design and deploy complete digital assets for business leaders looking to attract qualified leads, build immediate trust and convert sustainably.",
    pillars: [
      { label: "Websites", sub: "Pro Showcase €499 · Business €799 · E-commerce €1,499", href: "/services/websites" },
      { label: "Branding & Identity", sub: "Signature Logo €199 · Identity €299 · Guidelines €399", href: "/services/branding" },
      { label: "Google Maps & SEO", sub: "Maps from €99 · Organic SEO from €299 / mo", href: "/services/maps" },
      { label: "Social, WebCare & POS", sub: "Social €349/mo · WebCare €29/mo · POS & Robotics", href: "/services/social" },
    ],
    valuePoints: [
      "Ten years of experience in strategy, design and development",
      "Clear, transparent pricing published for every service",
      "Full code ownership and long-term operational support",
    ],
    scrollNotice: "Explore the agency and our 7 expertises",
    filmBtn: "Studio film",
  },
  vi: {
    kicker: "XR AGENCY · STUDIO KỸ THUẬT SỐ QUỐC TẾ · 10 NĂM KINH NGHIỆM",
    titleLine1: "L'ÉLÉGANCE DIGITALE.",
    titleLine2: "La Machine à Vendre.",
    lead: "Những trang web xuất sắc, bản sắc thương hiệu mạnh mẽ và khả năng hiển thị địa phương vượt trội trên Google Maps.",
    ctaServices: "Khám phá dịch vụ",
    ctaProject: "Xây dựng dự án",
    agencySummaryTitle: "Sáng tạo, công nghệ & tăng trưởng thương mại",
    agencySummaryText:
      "Chúng tôi thiết kế và triển khai hệ sinh thái số toàn diện giúp doanh nghiệp thu hút khách hàng tiềm năng và chuyển đổi bền vững.",
    pillars: [
      { label: "Website", sub: "Vitrine Pro 499 € · Business 799 € · E-commerce 1 499 €", href: "/services/websites" },
      { label: "Thương hiệu", sub: "Logo 199 € · Nhận diện 299 € · Brandbook 399 €", href: "/services/branding" },
      { label: "Google Maps & SEO", sub: "Maps từ 99 € · SEO từ 299 € / tháng", href: "/services/maps" },
      { label: "Social, WebCare & POS", sub: "Social 349 €/th · WebCare 29 €/th · POS & Robot", href: "/services/social" },
    ],
    valuePoints: [
      "10 năm kinh nghiệm chiến lược, thiết kế và phát triển",
      "Bảng giá minh bạch cho từng hạng mục dịch vụ",
      "Sở hữu toàn bộ mã nguồn và đồng hành dài hạn",
    ],
    scrollNotice: "Khám phá 7 chuyên môn của XR Agency",
    filmBtn: "Video giới thiệu",
  },
  ar: {
    kicker: "XR AGENCY · وكالة رقمية دولية · 10 سنوات من الخبرة",
    titleLine1: "L'ÉLÉGANCE DIGITALE.",
    titleLine2: "La Machine à Vendre.",
    lead: "مواقع ويب استثنائية، وهوية علامة تجارية قوية، وظهور محلي قوي على خرائط Google.",
    ctaServices: "اكتشف خدماتنا",
    ctaProject: "ابنِ مشروعي",
    agencySummaryTitle: "الإبداع والتكنولوجيا والنمو التجاري",
    agencySummaryText:
      "نصمم ونطوّر حلولاً رقمية متكاملة للشركات التي ترغب في جذب عملاء مؤهلين وبناء ثقة فورية وتحقيق مبيعات مستدامة.",
    pillars: [
      { label: "مواقع الويب", sub: "Vitrine Pro 499 € · Business 799 € · E-commerce 1 499 €", href: "/services/websites" },
      { label: "الهوية البصرية", sub: "شعار 199 € · هوية 299 € · دليل شامل 399 €", href: "/services/branding" },
      { label: "خرائط Google وSEO", sub: "Maps من 99 € · SEO من 299 € / شهر", href: "/services/maps" },
      { label: "التواصل والصيانة وPOS", sub: "Social 349 €/ش · WebCare 29 €/ش · POS والروبوتات", href: "/services/social" },
    ],
    valuePoints: [
      "عشر سنوات من الخبرة في الاستراتيجية والتصميم والتطوير",
      "أسعار واضحة وشفافة لكل خدمة",
      "ملكية كاملة للمشروع ومرافقة مستمرة",
    ],
    scrollNotice: "استكشف خبراتنا السبع",
    filmBtn: "فيديو تعريفي",
  },
  ru: {
    kicker: "XR AGENCY · МЕЖДУНАРОДНОЕ DIGITAL-АГЕНТСТВО · 10 ЛЕТ ОПЫТА",
    titleLine1: "L'ÉLÉGANCE DIGITALE.",
    titleLine2: "La Machine à Vendre.",
    lead: "Исключительные веб-сайты, сильный фирменный стиль и мощная локальная видимость в Google Maps.",
    ctaServices: "Открыть наши услуги",
    ctaProject: "Собрать мой проект",
    agencySummaryTitle: "Дизайн, технологии и коммерческий рост",
    agencySummaryText:
      "Мы создаём и развиваем цифровые инструменты для компаний, которым важны доверие клиентов, прозрачные тарифы и измеримая конверсия.",
    pillars: [
      { label: "Веб-сайты", sub: "Vitrine Pro 499 € · Business 799 € · E-commerce 1 499 €", href: "/services/websites" },
      { label: "Брендинг", sub: "Логотип 199 € · Айдентика 299 € · Брендбук 399 €", href: "/services/branding" },
      { label: "Google Maps и SEO", sub: "Maps от 99 € · SEO от 299 € / мес", href: "/services/maps" },
      { label: "Social, WebCare и POS", sub: "Social 349 €/м · WebCare 29 €/м · POS и Роботы", href: "/services/social" },
    ],
    valuePoints: [
      "Десять лет опыта в стратегии, дизайне и разработке",
      "Прозрачные фиксированные тарифы по каждой услуге",
      "Полная передача прав и долгосрочное сопровождение",
    ],
    scrollNotice: "Изучить 7 компетенций агентства",
    filmBtn: "Видео студии",
  },
};

export function Hero() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;
  const copy = HERO_COPY[currentLang] ?? HERO_COPY.fr;

  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const [motionAllowed, setMotionAllowed] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [filmModalOpen, setFilmModalOpen] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMotionAllowed(!reducedMotion && !saveData);

    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media || reducedMotion) return;

    let frame = 0;
    const updateDepth = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
      );
      media.style.transform = `translate3d(0, ${((progress - 0.5) * -32).toFixed(2)}px, 0) scale(1.04)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };
    updateDepth();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const waUrl = `https://wa.me/33767566783?text=${encodeURIComponent(
    "Bonjour XR Agency, je découvre votre site et je souhaite échanger sur mon projet."
  )}`;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="xr-hero xr-hero-refined relative isolate overflow-hidden bg-[#080B10] text-[#F8FAFC]"
    >
      {/* ── 1. PHOTOGRAPHIE STUDIO 85MM & BOUCLE VIDÉO SUBTILE AVEC PARALLAXE ── */}
      <div
        ref={mediaRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden transition-transform duration-300 ease-out will-change-transform"
      >
        <img
          src={XR_HERO_PHOTO}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] contrast-[1.08] brightness-[0.58] saturate-[0.86]"
        />

        {motionAllowed && (
          <video
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-[center_20%] contrast-[1.08] brightness-[0.58] saturate-[0.86] transition-opacity duration-1000 ${
              videoLoaded ? "opacity-55" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={XR_HERO_PHOTO}
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/videos/hero-ambient-loop.mp4" type="video/mp4" />
          </video>
        )}

        {/* Voiles Dark Luxury (#080B10 / #0F172A) pour une lisibilité irréprochable */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,#080B10_0%,rgba(8,11,16,0.95)_38%,rgba(8,11,16,0.82)_60%,rgba(8,11,16,0.52)_82%,rgba(8,11,16,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#080B10_0%,rgba(8,11,16,0.5)_22%,transparent_50%)]" />
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,16,0.65)_0%,rgba(8,11,16,0.9)_35%,rgba(8,11,16,0.98)_70%,#080B10_100%)]" />
      </div>

      {/* ── 2. ARCHITECTURE ÉDITORIALE DARK LUXURY DU HERO ── */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1640px] flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-10">
        {/* Barre supérieure : Identité & Film Studio */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
            <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.22em] text-[#D4AF37] uppercase">
              {copy.kicker}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilmModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#0F172A]/90 hover:bg-[#0F172A] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F8FAFC] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]"
            >
              <Play className="h-3 w-3 fill-current text-[#D4AF37]" />
              <span>{copy.filmBtn}</span>
            </button>
          </div>
        </div>

        {/* Grille principale : Proposition de valeur à gauche + Monogramme XR & Carte d'agence à droite */}
        <div className="my-auto py-8 lg:py-12 grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          {/* Colonne gauche : Titre officiel, texte, CTA et réassurance */}
          <div className="max-w-[780px] text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />
              <span className="font-mono text-[9px] font-bold tracking-[0.26em] text-[#D4AF37] uppercase">
                DARK LUXURY & TECH PRÉCISION · STUDIO 85MM · HAUTE CONVERSION
              </span>
            </div>

            <h1 className="text-[clamp(2.35rem,5.3vw,5.1rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[#F8FAFC]">
              <span className="block">{copy.titleLine1}</span>
              <span className="mt-1.5 block font-serif font-normal italic tracking-[-0.01em] text-[#D4AF37]">
                {copy.titleLine2}
              </span>
            </h1>

            <p className="mt-5 max-w-[630px] text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed text-slate-300 font-normal">
              {copy.lead}
            </p>

            {/* Boutons officiels du Master Brief */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href="#presentation-services"
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#080B10] shadow-[0_12px_30px_rgba(212,175,55,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e5c247]"
              >
                <span>{copy.ctaServices}</span>
                <ArrowRight className="h-4 w-4 text-[#080B10] transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#configurateur"
                className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-[#10B981]/55 bg-[#0F172A]/90 hover:bg-[#10B981] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#10B981] hover:text-[#080B10] shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>{copy.ctaProject}</span>
              </a>
            </div>

            {/* Points de valeur ajoutée vérifiables */}
            <ul className="mt-7 space-y-2 border-t border-white/10 pt-5">
              {copy.valuePoints.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-300 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : Logo XR intégré avec élégance & Aperçu immédiat des prestations */}
          <div className="relative rounded-[1.75rem] border border-[#D4AF37]/35 bg-[#0F172A]/95 p-6 sm:p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#080B10] text-[#F8FAFC] border border-[#D4AF37]/50 shadow-md">
                  <svg viewBox="0 0 160 160" fill="none" className="h-7 w-7" aria-hidden="true">
                    <path d="M26 26 L54 26 L134 134 L106 134 Z" fill="#F8FAFC" />
                    <path d="M134 26 L106 26 L26 134 L54 134 Z" fill="#D4AF37" />
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] block">
                    XR AGENCY · ARCHITECTURE COMMERCIALE
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-white">
                    {copy.agencySummaryTitle}
                  </h2>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-300">
              {copy.agencySummaryText}
            </p>

            {/* Accès rapide aux pôles de services avec tarifs officiels */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {copy.pillars.map((pillar) => (
                <Link
                  key={pillar.label}
                  to={pillar.href}
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#080B10] hover:bg-[#080B10]/80 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {pillar.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37] transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="mt-1.5 font-mono text-[9.5px] text-[#10B981] leading-snug">
                    {pillar.sub}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-slate-400">
              <span>7 Commerciaux dédiés & réponse sous 24h</span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#10B981] hover:text-[#D4AF37] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#10B981]" />
                <span>WhatsApp direct</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barre inférieure de navigation au scroll */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <a
            href="#equipe-commerciale"
            className="group inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 transition hover:text-white"
          >
            <span>{copy.scrollNotice}</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1 text-[#D4AF37]" />
          </a>

          <span className="font-mono text-[8.5px] text-[#D4AF37] font-semibold hidden md:inline tracking-[0.16em]">
            SITES WEB · BRANDING · SEO · GOOGLE MAPS · SOCIAL MEDIA · WEBCARE · POS & ROBOTIQUE
          </span>
        </div>
      </div>

      {/* ── 3. MODALE VIDÉO STUDIO ── */}
      {filmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0C]/90 p-4 sm:p-8 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-[#E8DCC4]/20 bg-[#0B0B0C] shadow-2xl">
            <button
              type="button"
              onClick={() => setFilmModalOpen(false)}
              className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-[#0B0B0C]/80 border border-[#E8DCC4]/25 text-[#F8F6F0] hover:bg-[#F8F6F0] hover:text-[#0B0B0C] transition"
              aria-label="Fermer la vidéo"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video w-full bg-[#0B0B0C]">
              <video
                src="/videos/xr-agency-vsl.mp4"
                controls
                autoPlay
                className="h-full w-full object-contain"
                poster="/videos/vsl-poster.jpg"
              >
                Votre navigateur ne prend pas en charge la balise vidéo.
              </video>
            </div>

            <div className="p-4 sm:p-6 bg-[#101114] text-[#F8F6F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold">XR Agency — Présentation Studio</h3>
                <p className="text-xs text-[#E8DCC4]/75">
                  Découvrez notre approche en création digitale, identité de marque et acquisition locale.
                </p>
              </div>
              <a
                href="#configurateur"
                onClick={() => setFilmModalOpen(false)}
                className="rounded-full bg-[#C5A059] text-[#0B0B0C] font-bold text-xs px-5 py-2.5 transition hover:bg-[#E8DCC4]"
              >
                Construire mon projet
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
