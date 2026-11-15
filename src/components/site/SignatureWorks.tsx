import { useState, useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Eye, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";
import { audioEngine } from "@/lib/audioExperience";
import pf01MaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import pf03NoirOr from "@/assets/pf-03-noir-or.jpg";
import pf04CabinetMercier from "@/assets/pf-04-cabinet-mercier.jpg";

interface Concept {
  id: string;
  num: string;
  name: string;
  sector: Record<Lang, string>;
  deliverables: string[];
  challenge: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  scope: string;
  year: string;
}

const CONCEPTS: Concept[] = [
  {
    id: "maison-lumiere",
    num: "01",
    name: "Concept — Hôtel Signature",
    sector: { fr: "Concept · Hôtellerie", en: "Concept · Hospitality", vi: "Ý tưởng · Khách sạn", ar: "مفهوم · ضيافة فاخرة", ru: "Концепт · Гостеприимство" },
    deliverables: ["Direction artistique", "Site sur mesure WebGL", "Moteur de réservation directe", "Brand Book 300 DPI"],
    challenge: {
      fr: "Intention du concept : mettre en scène l'atmosphère d'un hôtel de caractère et imaginer un parcours de réservation direct, clair et élégant.",
      en: "Concept direction: express the atmosphere of a distinctive hotel and imagine a clear, elegant direct-booking journey.",
      vi: "Định hướng ý tưởng: thể hiện không gian của một khách sạn đặc trưng và xây dựng hành trình đặt phòng trực tiếp, rõ ràng.",
      ar: "اتجاه المفهوم: إبراز أجواء فندق مميز وتصميم مسار حجز مباشر وواضح وأنيق.",
      ru: "Идея концепта: передать атмосферу особенного отеля и продумать ясный, элегантный путь прямого бронирования.",
    },
    description: {
      fr: "Une plateforme immersive, lente et feutrée, pensée comme une déambulation architecturale : grandes photographies d'art, typographie de haute voltige, réservation sans friction en 3 gestes.",
      en: "An unhurried, architectural digital journey: museum-grade imagery, high-fashion typography, and frictionless 3-step booking.",
      vi: "Trải nghiệm số như một chuyến du ngoạn kiến trúc: hình ảnh nghệ thuật khổ lớn, kiểu chữ xa xỉ, đặt phòng trong 3 bước.",
      ar: "تجربة رقمية مصممة كجولة معمارية: صور فوتوغرافية فنية، خطوط تحريرية راقية، وحجز في ثلاث خطوات.",
      ru: "Архитектурный цифровой опыт: широкоформатная художественная съёмка, высокая типографика и бронирование в 3 шага.",
    },
    image: pf01MaisonLumiere,
    scope: "Design & Next-Gen Code",
    year: "2026",
  },
  {
    id: "noir-or",
    num: "02",
    name: "Concept — Joaillerie Privée",
    sector: { fr: "Concept · Joaillerie", en: "Concept · Jewellery", vi: "Ý tưởng · Trang sức", ar: "مفهوم · مجوهرات", ru: "Концепт · Ювелирное искусство" },
    deliverables: ["Identité visuelle de prestige", "E-commerce Headless ultra-sécurisé", "Packaging & Brand Book", "Tunnel Stripe VIP"],
    challenge: {
      fr: "Intention du concept : traduire la précision de la haute joaillerie dans une expérience éditoriale sobre, avec une présentation produit immersive.",
      en: "Concept direction: translate fine-jewellery precision into a restrained editorial experience with immersive product presentation.",
      vi: "Định hướng ý tưởng: chuyển tải sự tinh xảo của trang sức cao cấp vào trải nghiệm biên tập tối giản và trình bày sản phẩm sống động.",
      ar: "اتجاه المفهوم: ترجمة دقة المجوهرات الراقية إلى تجربة تحريرية هادئة مع عرض غامر للمنتجات.",
      ru: "Идея концепта: передать точность высокого ювелирного искусства через сдержанный редакционный стиль и выразительную презентацию изделий.",
    },
    description: {
      fr: "Une identité noir d'encre et or chaud, une grille typographique ciselée et une boutique immersive où chaque diamant et bijou unique est mis en scène avec un rendu tridimensionnel.",
      en: "Obsidian ink and molten gold identity, chiselled layout, and an immersive store staging one-of-a-kind jewels in three dimensions.",
      vi: "Nhận diện màu đen tuyền và vàng ấm, cấu trúc chuẩn mực và gian hàng 3D trưng bày từng món trang sức độc bản.",
      ar: "هوية باللون الأسود الملكي والذهب الدافئ، وتنسيق دقيق يعرض المجوهرات النادرة بأسلوب ثلاثي الأبعاد جذاب.",
      ru: "Чёрно-золотая монохромная эстетика, ювелирная точность верстки и 3D-витрина для штучных украшений.",
    },
    image: pf03NoirOr,
    scope: "Identity & 3D Commerce",
    year: "2026",
  },
  {
    id: "cabinet-mercier",
    num: "03",
    name: "Concept — Cabinet d'Affaires",
    sector: { fr: "Concept · Conseil & droit", en: "Concept · Legal advisory", vi: "Ý tưởng · Tư vấn pháp lý", ar: "مفهوم · استشارات قانونية", ru: "Концепт · Юридический консалтинг" },
    deliverables: ["Site vitrine d'autorité", "Stratégie de visibilité locale", "SEO local & référencement", "Système de consultation directe"],
    challenge: {
      fr: "Intention du concept : créer une présence numérique rigoureuse pour un cabinet de conseil, avec des expertises lisibles et une prise de contact structurée.",
      en: "Concept direction: create a rigorous digital presence for an advisory practice, with clear areas of expertise and a structured contact path.",
      vi: "Định hướng ý tưởng: xây dựng hiện diện số chuyên nghiệp cho đơn vị tư vấn, làm rõ lĩnh vực chuyên môn và lộ trình liên hệ.",
      ar: "اتجاه المفهوم: بناء حضور رقمي رصين لمكتب استشاري، مع توضيح مجالات الخبرة وتنظيم التواصل.",
      ru: "Идея концепта: создать строгую цифровую подачу для консалтинговой практики с ясным описанием компетенций и понятным способом связи.",
    },
    description: {
      fr: "Une présence feutrée et rigoureuse, reliée à une fiche Google Maps optimisée au millimètre : compétences sectorielles explicites, prise de rendez-vous chiffrée et référencement naturel pérenne.",
      en: "A refined and rigorous digital footprint paired with an obsessive Google Maps engine: clear practice areas and encrypted appointments.",
      vi: "Hiện diện thanh lịch và chuẩn mực kết hợp hồ sơ Google Maps tối ưu toàn diện: chuyên môn rõ ràng, đặt lịch hẹn an toàn.",
      ar: "واجهة رصينة ودقيقة مرتبطة بملف Google Maps مدروس بعناية: مجالات اختصاص واضحة وحجز استشارات مشفر وسلس.",
      ru: "Строгий и уверенный визуальный язык в связке с безупречно настроенным профилем Google Maps и записью на приём.",
    },
    image: pf04CabinetMercier,
    scope: "Legal Advisory & Local Visibility",
    year: "2026",
  },
];

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    conceptLabel: string;
    cta: string;
    catalogTitle: string;
    catalogDesc: string;
    catalogBtn: string;
    matrixTab: string;
    cardsTab: string;
  }
> = {
  fr: {
    eyebrow: "03 · CONCEPTS DE STUDIO & EXPLORATIONS",
    title: "Trois univers de studio ",
    titleAccent: "pour explorer le champ des possibles.",
    subtitle: "Ces explorations visuelles illustrent différentes directions possibles. Elles servent de démonstrations créatives et ne représentent pas des missions clients publiées.",
    conceptLabel: "Concept studio",
    cta: "Démarrer un projet similaire",
    catalogTitle: "Explorer le catalogue créatif XR",
    catalogDesc: "Projets vérifiés, explorations de studio et prototypes 3D, classés par discipline et par secteur.",
    catalogBtn: "Voir toutes les réalisations",
    matrixTab: "01 · Matrice Interactive",
    cardsTab: "02 · Dossiers Détaillés",
  },
  en: {
    eyebrow: "03 · STUDIO CONCEPTS & EXPLORATIONS",
    title: "Three studio explorations ",
    titleAccent: "for distinctive digital worlds.",
    subtitle: "These visual explorations demonstrate possible creative directions. They are studio concepts, not published client engagements.",
    conceptLabel: "Studio concept",
    cta: "Start a bespoke project",
    catalogTitle: "Explore the XR creative catalogue",
    catalogDesc: "All studio works, 3D prototypes, and benchmark case studies sorted by sector.",
    catalogBtn: "View all works",
    matrixTab: "01 · Interactive Matrix",
    cardsTab: "02 · Detailed Cases",
  },
  vi: {
    eyebrow: "03 · KHÁM PHÁ Ý TƯỞNG STUDIO",
    title: "Ba thế giới ý tưởng số ",
    titleAccent: "mở ra nhiều hướng sáng tạo.",
    subtitle: "Những khám phá hình ảnh này minh họa các hướng sáng tạo khả thi. Đây là concept studio, không phải dự án khách hàng đã công bố.",
    conceptLabel: "Ý tưởng studio",
    cta: "Bắt đầu dự án tương tự",
    catalogTitle: "Khám phá bộ sưu tập sáng tạo XR",
    catalogDesc: "Dự án đã xác minh, concept studio và nguyên mẫu 3D được phân loại theo chuyên môn và lĩnh vực.",
    catalogBtn: "Xem tất cả dự án",
    matrixTab: "01 · Bảng tương tác",
    cardsTab: "02 · Hồ sơ concept",
  },
  ar: {
    eyebrow: "03 · مفاهيم واستكشافات الاستوديو",
    title: "ثلاثة عوالم رقمية تجريبية ",
    titleAccent: "لاستكشاف آفاق إبداعية جديدة.",
    subtitle: "تستعرض هذه التجارب البصرية اتجاهات إبداعية ممكنة. إنها مفاهيم للاستوديو وليست مشاريع عملاء منشورة.",
    conceptLabel: "مفهوم استوديو",
    cta: "ابدأ مشروعاً مشابهاً",
    catalogTitle: "استكشف كتالوج XR الإبداعي",
    catalogDesc: "مشاريع موثقة ومفاهيم استوديو ونماذج ثلاثية الأبعاد مصنفة حسب التخصص والقطاع.",
    catalogBtn: "عرض جميع الأعمال",
    matrixTab: "01 · الجدول التفاعلي",
    cardsTab: "02 · ملفات المفاهيم",
  },
  ru: {
    eyebrow: "03 · КОНЦЕПЦИИ СТУДИИ И ЭКСПЛОРАЦИИ",
    title: "Три цифровых концепта ",
    titleAccent: "для исследования новых творческих направлений.",
    subtitle: "Эти визуальные исследования показывают возможные творческие направления. Это концепты студии, а не опубликованные клиентские проекты.",
    conceptLabel: "Концепт студии",
    cta: "Запустить аналогичный проект",
    catalogTitle: "Открыть креативный каталог XR",
    catalogDesc: "Проверенные проекты, концепты студии и 3D-прототипы по направлениям и отраслям.",
    catalogBtn: "Смотреть все проекты",
    matrixTab: "01 · Интерактивная матрица",
    cardsTab: "02 · Досье концептов",
  },
};

export function SignatureWorks() {
  const { lang } = useLang();
  const L = (lang in COPY ? lang : "fr") as Lang;
  const copy = COPY[L];

  const [hoveredConcept, setHoveredConcept] = useState<Concept | null>(null);
  const [viewStyle, setViewStyle] = useState<"matrix" | "cards">("matrix");
  const previewRef = useRef<HTMLDivElement>(null);

  // Move the preview directly with the pointer; avoid a React render on every mouse event.
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !previewRef.current) return;
    const cardWidth = 380;
    const cardHeight = 238;
    const left = Math.max(20, Math.min(e.clientX + 28, window.innerWidth - cardWidth - 20));
    const top = Math.max(110, Math.min(e.clientY - 120, window.innerHeight - cardHeight - 20));
    previewRef.current.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  };

  return (
    <section
      id="signature-works"
      onPointerMove={handlePointerMove}
      className="relative border-t border-white/10 bg-[#050608] py-24 text-white sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle Specular Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[#d4af37]/5 blur-[180px]"
      />

      <div className="relative mx-auto max-w-[1520px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[8.5px] font-mono font-bold tracking-[.26em] text-[#d4af37] uppercase mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              <span>{copy.eyebrow}</span>
              <span className="opacity-30">|</span>
              <span>XR INTERACTIVE WORKS</span>
            </div>
            <h2 className="text-[clamp(2.4rem,4.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] [text-wrap:balance] text-white">
              {copy.title}
              <span className="font-serif italic font-normal text-[#d4af37] tracking-tight block sm:inline">
                {copy.titleAccent}
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:justify-self-end">
            <p className="max-w-lg text-sm leading-relaxed text-[#94a3b8] sm:text-base font-normal">
              {copy.subtitle}
            </p>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 self-start rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setViewStyle("matrix");
                  audioEngine.playChime(528, 0.02, 0.3);
                }}
                className={`rounded-full px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition ${
                  viewStyle === "matrix" ? "bg-[#d4af37] text-black shadow-md" : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {copy.matrixTab}
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewStyle("cards");
                  audioEngine.playChime(660, 0.02, 0.3);
                }}
                className={`rounded-full px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition ${
                  viewStyle === "cards" ? "bg-white text-black shadow-md" : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {copy.cardsTab}
              </button>
            </div>
          </div>
        </div>

        {/* ── STYLE 1: XR INTERACTIVE PROJECT MATRIX (FLOATING PREVIEW) ── */}
        {viewStyle === "matrix" ? (
          <div className="relative mt-12 divide-y divide-white/10">
            {CONCEPTS.map((c, idx) => {
              const isHovered = hoveredConcept?.id === c.id;
              const hasHover = hoveredConcept !== null;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => {
                    setHoveredConcept(c);
                    audioEngine.playChime(440 + idx * 110, 0.025, 0.35);
                  }}
                  onMouseLeave={() => setHoveredConcept(null)}
                  className={`group relative flex flex-col justify-between py-10 transition-all duration-500 lg:flex-row lg:items-center px-6 -mx-6 rounded-2xl ${
                    hasHover
                      ? isHovered
                        ? "opacity-100 bg-white/[0.04] scale-[1.01]"
                        : "opacity-25 blur-[0.4px] scale-[0.99]"
                      : "opacity-100 hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-6 lg:gap-10">
                    <span className="font-mono text-2xl sm:text-4xl font-extrabold text-[#d4af37]/60 group-hover:text-[#d4af37] transition">
                      {c.num}
                    </span>
                    <div>
                      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#f8fafc]">
                        {c.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#cbd5e1]">
                          {c.sector[L]}
                        </span>
                        <span className="font-mono text-[9px] text-[#d4af37]">
                          {c.scope} · {c.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Deliverables & Action */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-0">
                    <div className="hidden xl:flex items-center gap-2">
                      {c.deliverables.slice(0, 2).map((d) => (
                        <span key={d} className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-[#94a3b8]">
                          {d}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#quote"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition duration-300 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black"
                    >
                      <span>{copy.cta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Floating pointer-follow project preview */}
            {hoveredConcept && (
              <div
                ref={previewRef}
                className="pointer-events-none fixed left-0 top-0 z-40 hidden overflow-hidden rounded-2xl border border-white/20 bg-[#090b10] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.98)] backdrop-blur-2xl transition-[transform] duration-150 ease-out lg:block w-[380px] aspect-[16/10]"
                style={{ transform: "translate3d(24px, 140px, 0)" }}
              >
                <img
                  src={hoveredConcept.image}
                  alt={hoveredConcept.name}
                  className="h-full w-full object-cover object-top scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-white block">
                      {hoveredConcept.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#d4af37]">
                      {hoveredConcept.scope}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                    {hoveredConcept.year}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── STYLE 2: DETAILED FULL-WIDTH CASE STUDIES ── */
          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            {CONCEPTS.map((c, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={c.id}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                    reversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={`lg:col-span-7 ${reversed ? "lg:col-start-6" : "lg:col-start-1"}`}>
                    <a
                      href="#quote"
                      className="group relative block overflow-hidden rounded-3xl border border-white/12 bg-[#090b10] p-3 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/50 sm:p-4"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
                        <img
                          src={c.image}
                          alt={`${copy.conceptLabel} ${c.name}`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur-md border border-white/10">
                          {copy.conceptLabel} · {c.sector[L]}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className={`space-y-6 lg:col-span-5 ${reversed ? "lg:col-start-1" : "lg:col-start-8"}`}>
                    <span className="font-mono text-5xl font-extrabold text-[#d4af37]">{c.num}</span>
                    <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">{c.name}</h3>
                    <p className="text-sm leading-relaxed text-[#94a3b8] sm:text-base font-normal">
                      {c.description[L]}
                    </p>
                    <p className="border-l-2 border-[#d4af37] pl-4 text-sm italic leading-relaxed text-[#e2e8f0]">
                      {c.challenge[L]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {c.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-white/10 bg-[#090b10] px-3.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-300"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#d4af37] transition hover:text-white"
                    >
                      <span>{copy.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Catalog Discovery Callout */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:mt-24 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold sm:text-3xl text-white">{copy.catalogTitle}</p>
            <p className="mt-2 text-sm text-[#94a3b8]">{copy.catalogDesc}</p>
          </div>
          <Link
            to="/realisations"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#f3e8c8] via-[#d4af37] to-[#8f7422] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#050608] transition hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          >
            <span>{copy.catalogBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
