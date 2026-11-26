import { useState, useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe2,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
import { useFunnel } from "@/lib/funnel";
import showcaseWebImg from "@/assets/web-luxury-showcase.jpg";
import studioAtelierImg from "@/assets/hero-editorial-concept01.jpg";

interface Pillar {
  icon: typeof BarChart3;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
}

const PILLARS: Pillar[] = [
  {
    icon: BarChart3,
    title: {
      fr: "Stratégie & Direction Artistique",
      en: "Strategy & Creative Direction",
      vi: "Chiến lược & Định hướng nghệ thuật",
      ar: "الاستراتيجية والإدارة الفنية",
      ru: "Стратегия и арт-дирекшн",
    },
    desc: {
      fr: "Identité de marque singulière et positionnement premium.",
      en: "Singular brand identity and high-end market positioning.",
      vi: "Định vị thương hiệu độc bản và đẳng cấp.",
      ar: "هوية تجارية متميزة وتموضع فاخر.",
      ru: "Уникальная айдентика и премиальное позиционирование.",
    },
  },
  {
    icon: Zap,
    title: {
      fr: "Ingénierie Web & E-Commerce",
      en: "Web Engineering & E-Commerce",
      vi: "Kỹ thuật Web & Thương mại điện tử",
      ar: "هندسة الويب والتجارة الإلكترونية",
      ru: "Веб-инженерия и e-commerce",
    },
    desc: {
      fr: "Chargement < 0.5s, code 100% propriétaire, zéro abonnement forcé.",
      en: "Sub-0.5s load time, 100% proprietary code, no forced subscriptions.",
      vi: "Tốc độ tải dưới 0.5s, mã nguồn độc quyền, không phụ phí nền tảng.",
      ar: "سرعة تحميل فائقة، كود مملوك بالكامل بدون اشتراكات إجبارية.",
      ru: "Загрузка менее 0.5с, 100% ваш код, никаких скрытых подписок.",
    },
  },
  {
    icon: Layers3,
    title: {
      fr: "Domination Google Maps & SEO",
      en: "Google Maps & Local SEO",
      vi: "Thống lĩnh Google Maps & SEO",
      ar: "السيطرة على خرائط جوجل والسيو",
      ru: "Google Карты и локальное SEO",
    },
    desc: {
      fr: "Positionnement Top 3 local pour capter les clients à fort pouvoir d'achat.",
      en: "Guaranteed Local Top 3 rank to capture high-value clients.",
      vi: "Đưa thương hiệu vào Top 3 Google tìm kiếm địa phương.",
      ar: "تصدر المراكز الثلاثة الأولى في خرائط جوجل لجلب عملاء ذوي قيمة عالية.",
      ru: "Вывод в Топ-3 локальной выдачи Google для привлечения платёжеспособных клиентов.",
    },
  },
  {
    icon: Sparkles,
    title: {
      fr: "Automatisation & IA Intégrée",
      en: "Automation & Custom AI",
      vi: "Tự động hóa & Tích hợp AI",
      ar: "الأتمتة والذكاء الاصطناعي",
      ru: "Автоматизация и интеграция ИИ",
    },
    desc: {
      fr: "Workflows sur-mesure, qualification de leads 24/7 et CRM digital.",
      en: "Tailored workflows, 24/7 lead qualification and custom CRM.",
      vi: "Quy trình tự động hóa, lọc khách hàng 24/7 và CRM nội bộ.",
      ar: "أتمتة العمليات وفرز العملاء على مدار الساعة وربط إدارة العملاء.",
      ru: "Индивидуальные сценарии, круглосуточная квалификация лидов и CRM.",
    },
  },
];

const I18N = {
  fr: {
    badge: "STUDIO DIGITAL HAUTE COUTURE · PARIS · GENÈVE · DUBAÏ · ASIE",
    titlePart1: "L'art du digital ",
    titleItalic: "sur-mesure,",
    titlePart2: " taillé pour faire vendre.",
    sub: "Architecture web haute performance, domination Google Maps et solutions d'intelligence artificielle. Nous concevons des outils numériques d'exception pour transformer vos visiteurs en chiffre d'affaires pérenne, sans abonnement forcé.",
    ctaPrimary: "Configurer mon projet",
    ctaPrimarySub: "Simulateur instantané 30s",
    ctaSecondary: "Consulter nos réalisations",
    ctaWhatsapp: "Ligne directe WhatsApp",
    ctaWhatsappSub: "Réponse d'un directeur sous 15 min",
    metrics: {
      delivery: { val: "10-14 j", label: "Délai moyen de livraison clé en main" },
      ownership: { val: "100%", label: "Propriétaire du code & nom de domaine" },
      clients: { val: "40+", label: "Marques et entreprises accompagnées" },
    },
    tabs: {
      showcase: "Vitrine d'Excellence",
      simulator: "Simulateur Express",
      film: "Showreel Vidéo (1 min)",
    },
    sim: {
      title: "Estimez votre investissement en 10 secondes",
      pack1: { name: "Site Vitrine", price: "499 €", desc: "Clé en main, SEO & design haute couture" },
      pack2: { name: "Pack Business", price: "890 €", desc: "Site complet + Google Maps Boost" },
      pack3: { name: "Pack Élite 360", price: "1 790 €", desc: "Site sur-mesure + SEO Top 3 + Social" },
      bonus: "Offre Synergie : -15% appliqués sur les packs combinés",
      btn: "Personnaliser ce pack dans le configurateur",
    },
    statusAvailable: "Studio disponible · 3 créneaux de livraison ce mois-ci",
  },
  en: {
    badge: "BESPOKE DIGITAL STUDIO · PARIS · GENEVA · DUBAI · ASIA",
    titlePart1: "The craft of ",
    titleItalic: "bespoke digital,",
    titlePart2: " engineered to sell.",
    sub: "High-performance web architecture, Google Maps dominance, and tailored AI systems. We build exceptional digital assets that turn prospects into sustainable revenue, with 0% platform lock-in.",
    ctaPrimary: "Configure project",
    ctaPrimarySub: "Instant 30s estimator",
    ctaSecondary: "Selected works",
    ctaWhatsapp: "Direct WhatsApp Line",
    ctaWhatsappSub: "Director response within 15 mins",
    metrics: {
      delivery: { val: "10-14 d", label: "Turnkey delivery turnaround" },
      ownership: { val: "100%", label: "Complete code & asset ownership" },
      clients: { val: "40+", label: "Brands & international clients" },
    },
    tabs: {
      showcase: "Flagship Showcase",
      simulator: "Instant Estimator",
      film: "Official Showreel",
    },
    sim: {
      title: "Estimate your project in 10 seconds",
      pack1: { name: "Showcase Website", price: "€499", desc: "Turnkey, SEO-ready & luxury design" },
      pack2: { name: "Business Bundle", price: "€890", desc: "Full site + Google Maps Boost" },
      pack3: { name: "Elite 360 Suite", price: "€1,790", desc: "Custom web app + Local Top 3 + Social" },
      bonus: "Synergy Pack: -15% automatically deducted on bundles",
      btn: "Customize this plan in configurator",
    },
    statusAvailable: "Studio online · 3 production slots open this month",
  },
  vi: {
    badge: "STUDIO KỸ THUẬT SỐ CAO CẤP · PARIS · GENEVA · DUBAI · CHÂU Á",
    titlePart1: "Nghệ thuật số ",
    titleItalic: "độc bản,",
    titlePart2: " thúc đẩy doanh số bền vững.",
    sub: "Kiến trúc web siêu tốc, thống lĩnh Google Maps và tự động hóa AI. Chúng tôi kiến tạo những trải nghiệm số đẳng cấp giúp chuyển đổi khách hàng tiềm năng thành doanh thu thực tế mà không thu phí nền tảng định kỳ.",
    ctaPrimary: "Cấu hình dự án",
    ctaPrimarySub: "Mô phỏng ngân sách trong 30s",
    ctaSecondary: "Dự án tiêu biểu",
    ctaWhatsapp: "Kết nối WhatsApp trực tiếp",
    ctaWhatsappSub: "Phản hồi trong vòng 15 phút",
    metrics: {
      delivery: { val: "10-14 ngày", label: "Thời gian bàn giao chìa khóa trao tay" },
      ownership: { val: "100%", label: "Sở hữu toàn bộ mã nguồn & tên miền" },
      clients: { val: "40+", label: "Thương hiệu & doanh nghiệp đồng hành" },
    },
    tabs: {
      showcase: "Dự án thực tế",
      simulator: "Mô phỏng chi phí",
      film: "Video giới thiệu",
    },
    sim: {
      title: "Ước tính chi phí đầu tư trong 10 giây",
      pack1: { name: "Website giới thiệu", price: "499 €", desc: "Bàn giao trọn gói, chuẩn SEO & sang trọng" },
      pack2: { name: "Gói Kinh Doanh", price: "890 €", desc: "Website chuẩn + Đẩy Top Google Maps" },
      pack3: { name: "Gói Toàn Diện Élite", price: "1 790 €", desc: "Website tùy biến + Top 3 SEO + Social" },
      bonus: "Ưu đãi Combo: Giảm ngay 15% khi kết hợp nhiều dịch vụ",
      btn: "Tùy chỉnh gói này trong bộ cấu hình",
    },
    statusAvailable: "Studio đang hoạt động · Còn 3 suất triển khai trong tháng",
  },
  ar: {
    badge: "استوديو رقمي فاخر · باريس · جنيف · دبي · آسيا",
    titlePart1: "فن الحلول الرقمية ",
    titleItalic: "المصممة خصيصًا،",
    titlePart2: " لتحقيق أعلى مبيعات.",
    sub: "هندسة مواقع فائقة السرعة، تصدر خرائط جوجل وحلول الذكاء الاصطناعي لتحويل زوارك إلى مبيعات مستدامة دون اشتراكات مخفية.",
    ctaPrimary: "تخصيص المشروع",
    ctaPrimarySub: "حاسبة التكلفة الفورية",
    ctaSecondary: "أعمالنا المختارة",
    ctaWhatsapp: "واتساب مباشر",
    ctaWhatsappSub: "رد خلال 15 دقيقة",
    metrics: {
      delivery: { val: "10-14 يوم", label: "مدة التسليم المتكاملة" },
      ownership: { val: "100%", label: "ملكية كاملة للكود والموقع" },
      clients: { val: "+40", label: "علامة تجارية حول العالم" },
    },
    tabs: {
      showcase: "معرض الأعمال",
      simulator: "محاكي الأسعار",
      film: "فيديو الاستوديو",
    },
    sim: {
      title: "قدّر استثمارك خلال 10 ثوانٍ",
      pack1: { name: "موقع تعريفي فاخر", price: "499 €", desc: "تسليم شامل مع تهيئة محركات البحث" },
      pack2: { name: "باقة الأعمال المتكاملة", price: "890 €", desc: "موقع كامل مع دعم خرائط جوجل" },
      pack3: { name: "باقة النخبة 360", price: "1 790 €", desc: "تطبيق ويب مع تصدر السيو والتواصل" },
      bonus: "خصم تآزري: -15% عند اختيار باقات مدمجة",
      btn: "تخصيص هذه الباقة في الحاسبة",
    },
    statusAvailable: "الاستوديو متاح · 3 مواعيد تسليم متاحة هذا الشهر",
  },
  ru: {
    badge: "ПРЕМИАЛЬНАЯ DIGITAL-СТУДИЯ · ПАРИЖ · ЖЕНЕВА · ДУБАЙ · АЗИЯ",
    titlePart1: "Искусство создания ",
    titleItalic: "сайтов на заказ,",
    titlePart2: " которые реально продают.",
    sub: "Высокоскоростная веб-архитектура, лидерство в Google Maps и внедрение ИИ. Мы создаем цифровые решения исключительного качества, превращающие посетителей в постоянных клиентов без абонентской платы.",
    ctaPrimary: "Рассчитать проект",
    ctaPrimarySub: "Мгновенный калькулятор за 30с",
    ctaSecondary: "Наши кейсы",
    ctaWhatsapp: "Прямая линия в WhatsApp",
    ctaWhatsappSub: "Ответ руководителя за 15 минут",
    metrics: {
      delivery: { val: "10-14 дней", label: "Срок сдачи под ключ" },
      ownership: { val: "100%", label: "Полное владение кодом и доменом" },
      clients: { val: "40+", label: "Успешных проектов по всему миру" },
    },
    tabs: {
      showcase: "Избранные работы",
      simulator: "Экспресс-калькулятор",
      film: "Шоурил студии",
    },
    sim: {
      title: "Рассчитайте инвестиции за 10 секунд",
      pack1: { name: "Сайт-визитка", price: "499 €", desc: "Под ключ, SEO и люксовый дизайн" },
      pack2: { name: "Пакет Business", price: "890 €", desc: "Полноценный сайт + Буст Google Maps" },
      pack3: { name: "Пакет Elite 360", price: "1 790 €", desc: "Индивидуальный сайт + Топ-3 SEO + Соцсети" },
      bonus: "Скидка за синергию: -15% при заказе комбо-пакетов",
      btn: "Настроить этот пакет в конфигураторе",
    },
    statusAvailable: "Студия доступна · Осталось 3 слота на этот месяц",
  },
};

export function Hero() {
  const { lang } = useLang();
  const c = I18N[lang] ?? I18N.fr;
  const { applyGoalPreset } = useFunnel();

  const [activeTab, setActiveTab] = useState<"showcase" | "simulator" | "film">("showcase");
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
    setTimeout(() => {
      videoPlayerRef.current?.play().catch(() => {});
    }, 150);
  };

  const handleCloseVideo = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setIsVideoModalOpen(false);
  };

  const handleChoosePack = (idx: number) => {
    setSelectedPackIndex(idx);
    if (idx === 0) applyGoalPreset("starter");
    else if (idx === 1) applyGoalPreset("local_domination");
    else applyGoalPreset("growth_360");
  };

  return (
    <section
      id="hero"
      aria-label="XR Agency Hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0D0B09] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 text-[#FAF7F2]"
    >
      {/* ── Subtle Atmospheric Light & Texture (Obsidian & Warm Champagne) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 right-[-10%] h-[680px] w-[680px] rounded-full opacity-25 blur-[140px]"
          style={{
            background: "radial-gradient(circle, #E5C696 0%, rgba(229,198,150,0.08) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] h-[550px] w-[550px] rounded-full opacity-15 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Soft edge fade to subsequent sections */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* ── Main Two-Column Architectural Grid ── */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 pb-12 sm:pb-16">
          
          {/* ── Column Left (7 cols): Editorial Typography, Trust & High-Conversion CTAs ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Kicker Badge: Clean Haute Joaillerie Pill */}
            <div className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#E5C696]/30 bg-[#16120E]/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5C696] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5C696]">
                {c.badge}
              </span>
            </div>

            {/* Main Headline H1 */}
            <h1 className="font-serif text-[clamp(2.35rem,4.4vw,4.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-white">
              <span>{c.titlePart1}</span>
              <span className="font-serif italic font-normal text-[#F2D7B0] drop-shadow-[0_2px_16px_rgba(242,215,176,0.2)]">
                {c.titleItalic}
              </span>
              <span>{c.titlePart2}</span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="mt-5 max-w-[620px] text-sm sm:text-base leading-relaxed text-white/80 font-normal">
              {c.sub}
            </p>

            {/* Real Authority Markers: Google Reviews + Delivery Guarantee */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-bold text-white">4.9 / 5</span>
                <span className="text-[#E5C696] tracking-widest text-[11px]">★★★★★</span>
                <span className="text-white/40">·</span>
                <span className="text-white/70 font-medium">+40 marques propulsées</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Livraison clé en main sous 10 à 14 jours</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {/* Primary Action: Direct Configuration */}
              <a
                href="#quote"
                className="group inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-[#E5C696] px-7 py-3 text-xs sm:text-sm font-bold text-[#14110E] shadow-[0_12px_30px_rgba(229,198,150,0.28)] transition-all duration-300 hover:bg-[#F2D7B0] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{c.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Direct WhatsApp Callout */}
              <a
                href="https://wa.me/33649219808?text=Bonjour%20XR%20Agency%2C%20je%20souhaite%20un%20devis%20ou%20un%20audit%20pour%20mon%20projet."
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-6 py-3 text-xs sm:text-sm font-semibold text-emerald-300 backdrop-blur-md transition-all duration-300 hover:bg-emerald-500/25 hover:border-emerald-400"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{c.ctaWhatsapp}</span>
              </a>

              {/* Work Link */}
              <a
                href="#work"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              >
                <span>{c.ctaSecondary}</span>
                <ChevronRight className="h-4 w-4 text-[#E5C696]" />
              </a>
            </div>

            {/* Transparent Pricing Anchor Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-white/70">
              <span className="text-white/40">Tarifs clairs :</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[#E5C696] font-medium">
                Sites dès 499 €
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[#E5C696] font-medium">
                Google Maps 999 €/an
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[#E5C696] font-medium">
                Social 349 €/m
              </span>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300 font-medium">
                0% commission tierce
              </span>
            </div>

            {/* Authority Metrics Row */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-6 max-w-[560px]">
              <div>
                <strong className="block font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {c.metrics.delivery.val}
                </strong>
                <span className="mt-0.5 block text-[11px] sm:text-xs text-white/60">
                  {c.metrics.delivery.label}
                </span>
              </div>
              <div className="border-x border-white/10 px-3 sm:px-6">
                <strong className="block font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#E5C696]">
                  {c.metrics.ownership.val}
                </strong>
                <span className="mt-0.5 block text-[11px] sm:text-xs text-white/60">
                  {c.metrics.ownership.label}
                </span>
              </div>
              <div>
                <strong className="block font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {c.metrics.clients.val}
                </strong>
                <span className="mt-0.5 block text-[11px] sm:text-xs text-white/60">
                  {c.metrics.clients.label}
                </span>
              </div>
            </div>

          </div>

          {/* ── Column Right (5 cols): Interactive Studio Showcase & Conversion Console ── */}
          <div className="lg:col-span-5 relative">
            <div className="group relative overflow-hidden rounded-[2rem] border border-[#E5C696]/25 bg-[#14110E]/90 p-3 sm:p-4 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              
              {/* Header Tabs: Showcase / Simulator / Film */}
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("showcase")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                      activeTab === "showcase"
                        ? "bg-[#E5C696] text-[#14110E] shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {c.tabs.showcase}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("simulator")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                      activeTab === "simulator"
                        ? "bg-[#E5C696] text-[#14110E] shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {c.tabs.simulator}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOpenVideo}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-[#E5C696] transition hover:bg-white/10"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span className="hidden sm:inline">{c.tabs.film}</span>
                </button>
              </div>

              {/* ── TAB 1: SHOWCASE VITRINE D'EXCEPTION ── */}
              {activeTab === "showcase" && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
                  <img
                    src={showcaseWebImg}
                    alt="XR Agency réalisations web et studio de luxe"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#E5C696] backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      HAUTE PERFORMANCE WEB
                    </span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-300 backdrop-blur-md">
                      100/100 LIGHTHOUSE
                    </span>
                  </div>

                  {/* Bottom Metrics Details */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/75 p-3 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif text-sm sm:text-base font-normal text-white">
                          Architecture Digital & Design Studio
                        </p>
                        <p className="font-mono text-[10px] text-[#E5C696] tracking-wider uppercase">
                          Paris · Dubaï · Genève · Da Nang
                        </p>
                      </div>
                      <a
                        href="#work"
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#E5C696] text-[#14110E] transition hover:scale-110"
                        title="Voir nos projets"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 2: SIMULATEUR EXPRESS CONVERSION ── */}
              {activeTab === "simulator" && (
                <div className="flex flex-col justify-between rounded-2xl bg-[#1A1612] p-4 text-white">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono uppercase tracking-wider text-[#E5C696]">
                        {c.sim.title}
                      </p>
                      <span className="text-[10px] rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 font-mono font-semibold">
                        -15% SYNERGIE
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {[c.sim.pack1, c.sim.pack2, c.sim.pack3].map((pk, idx) => (
                        <button
                          key={pk.name}
                          type="button"
                          onClick={() => handleChoosePack(idx)}
                          className={cn(
                            "w-full rounded-xl border p-2.5 text-left transition-all flex items-center justify-between",
                            selectedPackIndex === idx
                              ? "border-[#E5C696] bg-[#E5C696]/10 text-white shadow-sm"
                              : "border-white/10 bg-black/30 text-white/80 hover:border-white/30",
                          )}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{pk.name}</span>
                              {idx === 1 && (
                                <span className="rounded bg-[#E5C696]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#E5C696]">
                                  Populaire
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-white/60">{pk.desc}</p>
                          </div>
                          <span className="font-mono text-sm font-bold text-[#E5C696]">
                            {pk.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-3">
                    <p className="text-[10px] text-white/60 font-mono">
                      ✓ {c.sim.bonus}
                    </p>
                    <a
                      href="#quote"
                      className="mt-2.5 inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#E5C696] px-4 py-2.5 text-xs font-bold text-[#14110E] transition hover:bg-[#F2D7B0]"
                    >
                      <span>{c.sim.btn}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Status Guarantee Footer */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/65">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{c.statusAvailable}</span>
                </div>
                <span className="text-white/40">Garantie Livraison 10j</span>
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Section: 4 Value Pillars ── */}
        <div className="border-t border-white/15 pt-8 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title.fr}
                  className="rounded-2xl border border-white/10 bg-[#16120E]/70 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#E5C696]/40 hover:bg-[#1A1612]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#E5C696]/30 bg-[#241E18] text-[#E5C696]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-white">
                      {p.title[lang] ?? p.title.fr}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[11px] sm:text-xs leading-relaxed text-white/65">
                    {p.desc[lang] ?? p.desc.fr}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 transition hover:text-[#E5C696]"
            >
              <span>Découvrir nos forfaits & expertises</span>
              <span className="inline-block animate-bounce">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Official Video Reel Modal ── */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#0E0C0A] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E5C696]">
                XR AGENCY — SHOWREEL OFFICIEL
              </span>
              <button
                type="button"
                onClick={handleCloseVideo}
                className="rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                ref={videoPlayerRef}
                src="/videos/xr-agency-vsl.mp4"
                poster="/videos/vsl-poster.jpg"
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
