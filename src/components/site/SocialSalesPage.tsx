import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  Film,
  Flame,
  Heart,
  Instagram,
  Layers,
  Linkedin,
  MessageCircle,
  Music,
  Play,
  Repeat,
  Send,
  Share2,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  UsersRound,
  Video,
  XCircle,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { AddToCartBtn } from "@/components/site/Cart";
import { Logo, Parallax } from "@/components/site/primitives";
import { useLang, type L, type Lang } from "@/lib/i18n";
import { InstagramLogo, TikTokLogo } from "./ServiceIllustration";

import agencySocialStudioHero from "@/assets/agency-social-studio-hero.jpg";
import agencyBeforeAfterStudio from "@/assets/agency-before-after-studio.jpg";
import svcSocialCinematic from "@/assets/svc-social-cinematic.jpg";
import svcSocialEditorial from "@/assets/svc-social-editorial.jpg";
import sectorRestaurant from "@/assets/sector-restaurant.jpg";
import sectorHospitality from "@/assets/sector-hospitality.jpg";
import sectorRealestate from "@/assets/sector-realestate.jpg";
import sectorHealth from "@/assets/sector-health.jpg";

const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

const service = SERVICES.find((item) => item.id === "social")!;
const plans = service.plans;

const waFor = (name: string, lang: Lang = "fr") => {
  const messages = {
    fr: `Bonjour XRAGENCY, je souhaite échanger sur la formule ${name} pour mes réseaux sociaux.`,
    en: `Hello XRAGENCY, I'd like to discuss the ${name} social media plan.`,
    vi: `Xin chào XRAGENCY, tôi muốn trao đổi về gói mạng xã hội ${name}.`,
    ar: `مرحباً XRAGENCY، أود مناقشة باقة إدارة التواصل الاجتماعي ${name}.`,
    ru: `Здравствуйте, XRAGENCY! Хочу обсудить тариф ведения соцсетей «${name}».`,
  };
  return `https://wa.me/33767566783?text=${encodeURIComponent(messages[lang])}`;
};

export function SocialSalesPage() {
  const { lang, t, price } = useLang();
  const isRtl = lang === "ar";

  // Mode de focus dans le showcase Hero
  const [heroMode, setHeroMode] = useState<"tournage" | "direction" | "acquisition">("tournage");

  // Avant / Après State (sans faux smartphone, en galerie cinématographique)
  const [activeIndustry, setActiveIndustry] = useState<"resto" | "hotel" | "immo" | "sante">("resto");

  const industriesData = {
    resto: {
      label: l("Restaurant & Gastronomie", "Restaurant & Dining", "Nhà hàng & Ẩm thực", "مطعم وضيافة", "Ресторан и гастрономия"),
      brand: "L'Atelier des Saveurs · Paris 8e",
      imageAfter: sectorRestaurant,
      imageBefore: "/src/assets/story-restaurant-owner.jpg",
      hookAfter: "« Le secret de notre feuilletage croustillant révélé en 15 secondes... »",
      hookBefore: "« Menu du jour dispo ce midi venez nombreux svp »",
      viewsAfter: "94 200 vues qualifiées",
      viewsBefore: "118 vues",
      likesAfter: "5 480 likes",
      likesBefore: "14 likes (famille)",
      resultAfter: "+148 réservations directes de tables en salle",
      resultBefore: "0 client généré en boutique",
      quoteAfter: "« 18 tables réservées dès le premier week-end après la publication du Reel ! Les clients nous disent : 'On vous a vus sur Instagram'. »",
      quoteBefore: "« 5 heures perdues sur Canva pour 14 likes d'amis... Aucun client n'est venu en salle. Une perte de temps totale. »",
      techAfter: "Caméra 4K 60FPS • Étalonnage cinématographique • Sound design immersif • Modération quotidienne",
      techBefore: "Photo floue smartphone • Lumière crue • Aucun montage • 3 semaines sans poster",
    },
    hotel: {
      label: l("Hôtel & Suite de Luxe", "Luxury Hotel & Suites", "Khách sạn & Nghỉ dưỡng", "فندق وأجنحة فاخرة", "Отель и люкс-номера"),
      brand: "Villa Belle Époque · Suite & Spa",
      imageAfter: sectorHospitality,
      imageBefore: "/src/assets/pf-06-zen-retreat.jpg",
      hookAfter: "« Ce que vous découvrez au réveil depuis la Suite Panoramique... »",
      hookBefore: "« Vue de la chambre n°4 il fait beau aujourd'hui »",
      viewsAfter: "142 800 vues qualifiées",
      viewsBefore: "86 vues",
      likesAfter: "7 910 likes",
      likesBefore: "9 likes",
      resultAfter: "+34 séjours confirmés via le lien en bio",
      resultBefore: "0 demande de devis reçue",
      quoteAfter: "« Des voyageurs internationaux réservent leur suite après avoir vu notre vidéo. Le retour sur investissement est immédiat. »",
      quoteBefore: "« Notre profil ressemblait à un album de famille désordonné. Aucun touriste ne réservait par ce canal. »",
      techAfter: "Prises de vue drone 4K • Cadre architectural léché • Rétention algorithmique forte • Stories quotidiennes",
      techBefore: "Photos mal cadrées • Sans harmonie graphique • Posté une fois par mois",
    },
    immo: {
      label: l("Immobilier de Prestige", "Prime Real Estate", "Bất động sản Cao cấp", "عقارات راقية", "Элитная недвижимость"),
      brand: "Propriétés Privées · Triangle d'Or",
      imageAfter: sectorRealestate,
      imageBefore: "/src/assets/pf-04-cabinet-mercier.jpg",
      hookAfter: "« Visite privée d'un hôtel particulier de 380m² au cœur du 8ème arrondissement... »",
      hookBefore: "« Maison à vendre 4 pièces nous contacter pour infos »",
      viewsAfter: "115 600 vues qualifiées",
      viewsBefore: "62 vues",
      likesAfter: "4 320 likes",
      likesBefore: "7 likes",
      resultAfter: "22 visites d'acquéreurs fortunés qualifiés",
      resultBefore: "0 mandat signé",
      quoteAfter: "« Un mandat exclusif signé directement suite au message privé Instagram d'un propriétaire séduit par notre univers visuel. »",
      quoteBefore: "« Des photos plates d'agences immobilières qui ne déclenchaient aucun coup de cœur. »",
      techAfter: "Visite guidée rythmée • Sous-titres dynamiques • Musique tendance • Curation d'exception",
      techBefore: "Texte brut descriptif • Sans mise en valeur • Flux stagnant",
    },
    sante: {
      label: l("Clinique & Esthétique", "Aesthetic & Wellness Clinic", "Phòng khám & Thẩm mỹ", "عيادة تجمil وطب", "Клиника эстетики"),
      brand: "Institut Médical & Sourire Paris",
      imageAfter: sectorHealth,
      imageBefore: "/src/assets/pf-05-elan-studio.jpg",
      hookAfter: "« Les 3 étapes indispensables avant un soin éclat médicalisé... »",
      hookBefore: "« Nouveaux créneaux disponibles pour vos soins »",
      viewsAfter: "88 400 vues qualifiées",
      viewsBefore: "95 vues",
      likesAfter: "3 840 likes",
      likesBefore: "12 likes",
      resultAfter: "52 rendez-vous doctolib confirmés",
      resultBefore: "0 consultation prise",
      quoteAfter: "« Les patients arrivent au cabinet en nous parlant précisément des explications qu'ils ont vues dans nos vidéos courtes. »",
      quoteBefore: "« Posts cliniques froids qui faisaient peur plutôt que de donner confiance. »",
      techAfter: "Pédagogie médicale rassurante • Éclairage studio doux • Réponses instantanées aux questions des patients",
      techBefore: "Visuels Canva génériques • Absence d'identité • Zéro interaction",
    },
  };

  const currentInd = industriesData[activeIndustry];

  // 3-Click Recommender State
  const [recIndustry, setRecIndustry] = useState<"resto" | "commerce" | "immo" | "sante" | "b2b">("resto");
  const [recGoal, setRecGoal] = useState<"vitrine" | "croissance" | "domination">("croissance");
  const [recVolume, setRecVolume] = useState<"solo" | "duo" | "multi">("duo");

  const calculatedPlanIdx = (() => {
    if (recGoal === "domination" || recVolume === "multi") return 2; // Domination 799 €
    if (recGoal === "croissance" || recVolume === "duo") return 1; // Croissance 599 €
    return 0; // Essentiel 349 €
  })();

  const currentRecPlan = plans[calculatedPlanIdx];

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: l(
        "Quelle est la différence concrète entre la Formule Vitrine (349 €) et la Formule Moteur Reels (599 €) ?",
        "What is the concrete difference between Starter (€349) and Growth Reels (€599)?",
        "Điểm khác biệt giữa gói Vitrine (349 €) và gói Moteur Reels (599 €) là gì?",
        "ما الفرق العملي بين باقة الواجهة (349 €) وباقة محرك الريلز (599 €)؟",
        "В чём разница между тарифами Витрина (349 €) и Рост Reels (599 €)?",
      ),
      a: l(
        "La formule Vitrine Signature (349 €/mois) est conçue pour maintenir un profil soigné, propre et crédible sur 1 réseau (4 à 6 posts/mois). La formule Moteur Reels & Ventes (599 €/mois) est celle qui remplit votre établissement : elle intègre les Reels 4K scénarisés avec accroches virales, 2 réseaux synchronisés (Instagram + TikTok ou Facebook) et une modération quotidienne des commentaires pour transformer chaque vue en client payant.",
        "Starter (€349/mo) maintains clean, aesthetic consistency on 1 primary network (4 to 6 posts/mo). Growth (€599/mo) is what actually brings people through your door: scripted 4K Reels with viral hooks, 2 synced channels (Instagram + TikTok) and daily comment moderation turning views into paying customers.",
        "Gói Vitrine (349 €/tháng) duy trì hình ảnh chỉn chu trên 1 kênh. Gói Moteur Reels (599 €/tháng) tạo khách hàng thực tế với video Reel 4K kịch bản cuốn hút trên 2 nền tảng cùng chăm sóc bình luận hàng ngày.",
        "باقة الواجهة (349 €/شهر) تضمن مظهراً راقياً وموثوقاً. أما باقة محرك الريلز (599 €/شهر) فهي التي تملأ مقرك بالزبائن عبر ريلز 4K سينمائية وإدارة يومية للتعليقات.",
        "Тариф Витрина (349 €/мес) гарантирует опрятный профиль. Тариф Рост Reels (599 €/мес) реально приводит клиентов за счёт вирусных Reels 4K в 2 соцсетях и ежедневной модерации.",
      ),
    },
    {
      q: l(
        "Les tournages et captations vidéo sont-ils inclus ?",
        "Are on-site video shoots included?",
        "Buổi quay chụp tại chỗ có bao gồm không?",
        "هل جلسات التصوير الميدانية مشمولة؟",
        "Включены ли выездные съёмки?",
      ),
      a: l(
        "Nos abonnements mensuels comprennent toute la direction artistique, la curation, le montage 4K de vos rushs, les sous-titres animés, le sound design et l'animation quotidienne de vos comptes. Si vous souhaitez qu'un réalisateur vienne tourner dans votre établissement (Paris, Dubaï, Genève, Da Nang...), nous proposons des forfaits demi-journée ou journée clé-en-main.",
        "Monthly plans cover creative direction, 4K editing of your footage, animated subtitles, sound design and daily community management. For on-site filming sessions with our director (Paris, Dubai, Geneva, Da Nang...), we offer turn-key half-day or full-day studio production packages.",
        "Gói hàng tháng bao gồm định hướng nghệ thuật, dựng video 4K từ tư liệu, phụ đề động và tương tác. Các buổi quay trực tiếp tại địa điểm được tổ chức chuyên nghiệp theo yêu cầu riêng.",
        "تغطي الباقات الشهرية المونتاج بدقة 4K وتصميم الصوت والترجمة والإدارة اليومية. كما نوفر جلسات تصوير ميدانية مخصصة في مقرك.",
        "Ежемесячные тарифы включают монтаж 4K, саунд-дизайн, субтитры и ведение. Выездные съёмки с оператором рассчитываются отдельным пакетом.",
      ),
    },
    {
      q: l(
        "Comment validons-nous les vidéos chaque mois ?",
        "How do we approve content each month?",
        "Quy trình duyệt bài diễn ra như thế nào?",
        "كيف نعتمد المنشورات شهرياً؟",
        "Как происходит согласование материалов?",
      ),
      a: l(
        "Zéro charge mentale. Chaque début de mois, vous recevez votre grille éditoriale visuelle sur WhatsApp ou Figma. Vous validez en un clic ou demandez une modification. Rien n'est publié sans votre accord exprès.",
        "Zero operational burden. At the start of each month, you receive your visual calendar via WhatsApp or Figma. You approve in one tap or request edits. Nothing is published without your green light.",
        "Hoàn toàn thảnh thơi. Đầu mỗi tháng, bạn nhận lịch bài đăng hoàn chỉnh qua WhatsApp hoặc Figma và duyệt chỉ với 1 chạm.",
        "بدون أي عناء تشغيلي. في بداية كل شهر، يصلك جدول المنشورات كاملاً عبر واتساب أو فيغما وتوافق بنقرة واحدة.",
        "Ноль стресса. В начале каждого месяца вы получаете готовый визуальный план в WhatsApp или Figma и утверждаете его в один клик.",
      ),
    },
    {
      q: l(
        "À qui appartiennent les vidéos créées ?",
        "Who owns the created videos?",
        "Ai sở hữu bản quyền video được tạo ra?",
        "لمن تعود ملكية الفيديوهات المنشورة؟",
        "Кому принадлежат права на созданные видео?",
      ),
      a: l(
        "100% à vous. Dès leur livraison, vous bénéficiez de la pleine cession contractuelle des droits d'exploitation commerciale. Vous êtes libre de réutiliser vos vidéos sur votre site web, en publicités payantes (Ads) ou dans vos newsletters.",
        "100% yours. All assets come with full contractual commercial ownership transferred to you. You can freely reuse your Reels on your website, paid ads or emails.",
        "100% thuộc sở hữu của bạn. Toàn bộ bản quyền thương mại được chuyển giao đầy đủ để bạn dùng trên website, quảng cáo hoặc email.",
        "100% ملك لك. تنتقل إليك كامل حقوق الاستغلال التجاري لإعادة استخدام الفيديوهات في موقعك أو إعلاناتك الممولة.",
        "100% прав принадлежит вам. Вы можете свободно использовать видео на сайте, в рекламе и рассылках.",
      ),
    },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#FAF9F5] text-[#12110E]">
      <Nav />

      <main className="pt-20 sm:pt-24">
        {/* ════════════════════════════════════════════════════════════════════
            01. HERO IMMERSIF AVEC PHOTOGRAPHIE STUDIO COHÉRENTE & LÉCHÉE
           ════════════════════════════════════════════════════════════════════ */}
        <section className="relative isolate overflow-hidden border-b border-[#E8E6E0] bg-white text-[#12110E] pb-20 pt-12 sm:pb-28 sm:pt-16">
          {/* Vraie image de fond lumineuse haute définition */}
          <div className="absolute inset-0 -z-10">
            <img
              src={agencySocialStudioHero}
              alt="Studio de Production Social Media XRAGENCY"
              className="h-full w-full object-cover object-center opacity-15 brightness-[1.05] contrast-[1.05]"
            />
            {/* Dégradé doux et lumineux */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(197,168,128,0.12),transparent_50%)]" />
          </div>

          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            {/* Top Bar : Fil d'ariane & Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBEBE6] pb-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#52504A] transition hover:text-[#12110E]"
              >
                <span>←</span> {t(l("Toutes les expertises", "All services", "Tất cả dịch vụ", "كل الخدمات", "Все услуги"))}
              </Link>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#52504A]">
                <span className="text-[#12110E] font-black tracking-[0.18em]">XRAGENCY</span>
                <span>/</span>
                <span className="text-[#C5A880] font-bold">PÔLE SOCIAL MEDIA & REELS 4K</span>
              </div>
            </div>

            <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Colonne Gauche : Vision, Accroche & Call to Actions */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-ping" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C5A880]">
                    {t(l("PRODUCTION VIDÉO 4K & DIRECTION ÉDITORIALE", "4K VIDEO PRODUCTION & EDITORIAL DIRECTION", "SẢN XUẤT 4K & NỘI DUNG CAO CẤP", "إنتاج فيديو 4K وإخراج تحريري", "ПРОДАКШН 4K И ВЕДЕНИЕ"))}
                  </span>
                </div>

                <Parallax speed={-0.03}>
                  <h1 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.03em] text-[#12110E]">
                    {t(l("Des vidéos qui captivent,", "Content that captivates,", "Nội dung cuốn hút,", "محتوى يأسر القلوب،", "Контент, который увлекает,"))}{" "}
                    <em className="font-serif italic font-normal text-[#12110E] underline decoration-[#C5A880]/60 underline-offset-8">
                      {t(l("des clients qui réservent", "clients who convert", "khách hàng đến thật", "وزبائن يقصدونك فعلياً", "и приводит клиентов"))}
                    </em>.
                  </h1>
                </Parallax>

                <p className="max-w-2xl text-[15px] leading-relaxed text-[#52504A] sm:text-base">
                  {t(
                    l(
                      "Nous créons vos Reels 4K scénarisés, orchestrons votre présence sur Instagram, TikTok & LinkedIn, et animons vos commentaires au quotidien. Fini les posts amateurs : transformez votre audience en chiffre d'affaires régulier dès 349 € / mois.",
                      "We script your 4K Reels, curate your presence across Instagram, TikTok & LinkedIn, and moderate comments daily. From €349/month, turnkey.",
                      "Quay dựng video Reel 4K kịch bản cuốn hút, quản trị Instagram, TikTok & LinkedIn toàn diện và chăm sóc bình luận mỗi ngày. Từ 349 €/tháng.",
                      "ننتج مقاطع ريلز 4K سينمائية، وندير حضورك على إنستغرام وتيك توك ولينكد إن يومياً. ابتداءً من 349 € شهرياً.",
                      "Создаём вирусные Reels 4K, ведём Instagram, TikTok и LinkedIn, отвечая на комментарии. От 349 € в месяц.",
                    ),
                  )}
                </p>

                {/* Badges d'Engagement Concret */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <span className="rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#52504A]">
                    ✦ REELS & TIKTOKS 4K 60FPS
                  </span>
                  <span className="rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#52504A]">
                    ✦ HOOKS 3 SECONDES ALGORITHMIQUES
                  </span>
                  <span className="rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#52504A]">
                    ✦ 100% CESSION DROITS COMMERCIAUX
                  </span>
                </div>

                {/* Boutons d'Action Principaux */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#offres-directes"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#12110E] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#2B2925] hover:scale-[1.01]"
                  >
                    <span>{t(l("Découvrir les 3 Formules Claires", "Explore 3 Transparent Plans", "Khám phá 3 Gói Dịch vụ", "استعرض الباقات الـ 3 الواضحة", "Смотреть 3 прозрачных тарифа"))}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#avant-apres"
                    className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#12110E] shadow-sm transition hover:border-[#12110E] hover:bg-[#F5F5F0]"
                  >
                    <Sparkles className="h-4 w-4 text-[#C5A880]" />
                    <span>{t(l("Voir l'Avant / Après en direct", "View Live Before / After", "Xem Trước / Sau Trực quan", "شاهد قبل وبعد في الواقع", "Смотреть До / После"))}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2 text-xs text-[#52504A]">
                  <ShieldCheck className="h-4 w-4 text-[#C5A880] shrink-0" />
                  <span>
                    {t(l("Tarifs fixes dès 349 € / mois · Engagement dès 3 mois · Validation 100% WhatsApp", "Fixed pricing from €349/mo · 3-month term · 100% WhatsApp approval", "Giá minh bạch từ 349 €/tháng · Cam kết từ 3 tháng · Duyệt bài 1 chạm qua WhatsApp", "أسعار ثابتة من 349 €/شهر · التزام مرن من 3 أشهر · اعتماد بنقرة واحدة عبر واتساب", "Фиксированные цены от 349 €/мес · Договор от 3 месяцев · Согласование в WhatsApp"))}
                  </span>
                </div>
              </div>

              {/* Colonne Droite : Showcase de Production Studio (Vraie image d'agence cohérente) */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto overflow-hidden rounded-3xl border border-[#E5E5E0] bg-white p-4 shadow-xl">
                  {/* Sélecteur de volet de production */}
                  <div className="flex items-center justify-between gap-1.5 rounded-2xl border border-[#E8E6E0] bg-[#FAF9F5] p-1.5">
                    {[
                      { id: "tournage", label: "Tournage & Rushs 4K", icon: Video },
                      { id: "direction", label: "Grille & Direction DA", icon: Layers },
                      { id: "acquisition", label: "Conversion Clients", icon: Target },
                    ].map((mode) => {
                      const isActive = heroMode === mode.id;
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setHeroMode(mode.id as typeof heroMode)}
                          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-[9px] font-bold uppercase tracking-wider transition ${
                            isActive
                              ? "bg-[#12110E] text-white shadow-sm"
                              : "text-[#52504A] hover:text-[#12110E] hover:bg-white"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="truncate">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Visualiseur Studio Photographique */}
                  <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E5E5E0] bg-[#12110E]">
                    <img
                      src={
                        heroMode === "tournage"
                          ? agencySocialStudioHero
                          : heroMode === "direction"
                            ? svcSocialEditorial
                            : svcSocialCinematic
                      }
                      alt="Atelier de création XRAGENCY"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Tag Supérieur */}
                    <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold text-white/90">
                          {heroMode === "tournage" && "CAPTURE 4K 60FPS · SONY FX3 & GIMBAL"}
                          {heroMode === "direction" && "CHARTE ÉDITORIALE FIGMA · HARMONIE"}
                          {heroMode === "acquisition" && "VIRALITÉ ALGORITHMIQUE & LEADS"}
                        </span>
                      </div>
                      <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[8px] text-[#C5A880] border border-[#C5A880]/30 backdrop-blur-md">
                        STUDIO XR
                      </span>
                    </div>

                    {/* Overlay d'Excellence */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2 text-white">
                      <div className="rounded-xl border border-white/15 bg-black/75 p-3 backdrop-blur-md">
                        <p className="font-serif text-xs italic text-white">
                          {heroMode === "tournage" && "« Matériel de cinéma, prises de vue immersives et étalonnage 4K dédié à votre marque. »"}
                          {heroMode === "direction" && "« Une grille Instagram harmonieuse pensée comme une couverture de magazine haut de gamme. »"}
                          {heroMode === "acquisition" && "« Des spectateurs captivés qui commentent et réservent directement dans votre boutique. »"}
                        </p>

                        <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-white/10 pt-2 font-mono text-[8.5px]">
                          <div>
                            <span className="text-white/60 block">RÉSOLUTION</span>
                            <strong className="text-[#C5A880] font-bold">4K 60FPS</strong>
                          </div>
                          <div>
                            <span className="text-white/60 block">RÉTENTION</span>
                            <strong className="text-white font-bold">+340%</strong>
                          </div>
                          <div>
                            <span className="text-white/60 block">GESTION</span>
                            <strong className="text-[#C5A880] font-bold">100% Studio</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            02. LES 3 OFFRES CLAIRES & CONCRÈTES (AVEC EFFET PARALLAXE)
           ════════════════════════════════════════════════════════════════════ */}
        <section id="offres-directes" className="relative border-b border-[#E8E6E0] bg-[#FAF9F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                <Sparkles className="h-3 w-3 text-[#C5A880]" />
                {t(l("NOS 3 FORMULES CONCRÈTES & TARIFS FIXES", "OUR 3 CONCRETE TIERS & FIXED PRICING", "3 GÓI DỊCH VỤ RÕ RÀNG", "الباقات الـ 3 المحددة بدقة والأسعار الثابتة", "3 ЧЁТКИХ ТАРИФА"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("Trois formules pensées pour votre ambition :", "Three plans crafted for your ambition:", "Ba gói dịch vụ thiết kế cho mục tiêu của bạn:", "ثلاث باقات مصممة لتلائم طموحك:", "Три тарифа под ваши задачи:"))}{" "}
                <em className="font-serif italic font-normal text-[#12110E] underline decoration-[#C5A880]/50 underline-offset-8">
                  {t(l("visibles, concrètes et sans frais cachés", "transparent, direct, zero hidden fees", "rõ ràng, trực tiếp, không phụ phí", "واضحة ومباشرة دون رسوم خفية", "прозрачно и без доплат"))}
                </em>.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(l("Comparez directement nos 3 offres ci-dessous. Chaque formule a un rôle commercial précis dans votre acquisition de nouveaux clients :", "Compare our 3 tiers directly below. Each formula serves a distinct commercial role in acquiring new customers:", "So sánh trực tiếp 3 gói bên dưới. Mỗi gói đảm nhận một vai trò cụ thể trong việc thu hút khách hàng mới:", "قارن بين باقاتنا الـ 3 مباشرة. لكل باقة دور تسويقي واضح لجلب زبائن جدد:", "Сравните 3 тарифа ниже. У каждого — своя чёткая роль в привлечении клиентов:"))}
              </p>
            </div>

            {/* 3 Cartes Concrètes & Panoramiques avec Parallax */}
            <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
              {/* OFFRE 01 : VITRINE SIGNATURE */}
              <Parallax speed={0.02}>
                <article className="flex h-full flex-col justify-between rounded-3xl border border-[#E5E5E0] bg-white p-7 shadow-sm transition hover:border-[#12110E] hover:shadow-xl sm:p-8">
                  <div>
                    {/* Illustration Concrète de l'Offre */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E5E5E0] bg-black mb-5">
                      <img
                        src={svcSocialEditorial}
                        alt="Vitrine Signature XRAGENCY"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                        <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                          GRILLE ÉDITORIALE SOIGNÉE
                        </span>
                        <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[8px] text-white">
                          1 RÉSEAU
                        </span>
                      </div>
                    </div>

                    {/* Header Carte */}
                    <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#52504A]">
                          FORMULE 01
                        </span>
                        <h3 className="mt-1 font-serif text-2xl font-medium text-[#12110E]">
                          Vitrine Signature
                        </h3>
                      </div>
                      <span className="rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3 py-1 font-mono text-[9.5px] font-semibold text-[#52504A]">
                        Dès 3 mois
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#52504A]">
                      {t(l("Pour les commerces, artisans et professions libérales qui ont déjà des clients et veulent une présence esthétique sans effet 'compte abandonné'.", "For businesses and trades wanting a spotless, credible presence without the abandoned-account feel.", "Dành cho cửa hàng, chuyên gia muốn trang mạng xã hội chỉn chu, chuyên nghiệp không bị lãng quên.", "للمتاجر والحرفيين والعيادات الراغبين في واجهة أنيقة تزرع الثقة وتقضي على مظهر الإهمال.", "Для локального бизнеса и экспертов, которым нужна аккуратная живая витрина без ощущения заброшенности."))}
                    </p>

                    {/* Prix Concret */}
                    <div className="mt-5 rounded-2xl border border-[#E8E6E0] bg-[#FAF9F5] p-4 text-center">
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#12110E]">
                          349 €
                        </span>
                        <span className="font-mono text-xs text-[#52504A]">/ mois</span>
                      </div>
                      <span className="mt-1 block font-mono text-[10px] text-[#52504A]">
                        Tarif mensuel fixe · Sans surprise
                      </span>
                    </div>

                    {/* Livrables Concrets */}
                    <div className="mt-6 space-y-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#12110E] block">
                        CE QUE VOUS RECEVEZ CONCRÈTEMENT :
                      </span>

                      <div className="space-y-2 text-xs text-[#2B2925]">
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>1 réseau clé géré</strong> (Instagram ou Facebook au choix)</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>4 à 6 publications soignées / mois</strong> avec retouche et charte graphique</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Stories bi-hebdomadaires</strong> pour animer votre actualité</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>100% Cession des droits</strong> d'auteur commerciaux</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Validation 1-clic sur WhatsApp</strong> : zéro temps perdu pour vous</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Directes */}
                  <div className="mt-8 space-y-2.5 border-t border-[#E8E6E0] pt-5">
                    <AddToCartBtn
                      item={{
                        serviceId: "social",
                        serviceName: "Social Media",
                        planName: "Vitrine Signature",
                        priceEur: 349,
                        period: "month",
                        periodLabel: "/ mois",
                      }}
                      popular={false}
                    />

                    <a
                      href={waFor("Vitrine Signature (349 €)", lang)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#FAF9F5]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>Échanger sur WhatsApp</span>
                    </a>
                  </div>
                </article>
              </Parallax>

              {/* OFFRE 02 : MOTEUR REELS & VIRALITÉ (N°1 RECOMMANDÉ) */}
              <Parallax speed={-0.02}>
                <article className="relative flex h-full flex-col justify-between rounded-3xl border-2 border-[#12110E] bg-white p-7 shadow-2xl transition hover:shadow-3xl sm:p-9 lg:-my-3">
                  <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit rounded-full bg-[#12110E] px-4 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#C5A880] shadow-md border border-[#C5A880]/30">
                    ★ FORMULE N°1 RECOMMANDÉE · 74% DE NOS CLIENTS
                  </div>

                  <div>
                    {/* Illustration Concrète de l'Offre */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E5E5E0] bg-black mb-5 shadow-sm">
                      <img
                        src={svcSocialCinematic}
                        alt="Moteur Reels 4K XRAGENCY"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                        <span className="font-mono text-[9px] font-bold text-[#C5A880] uppercase tracking-wider">
                          REELS 4K & RÉTENTION ALGORITHMIQUE
                        </span>
                        <span className="rounded bg-[#C5A880] px-2 py-0.5 font-mono text-[8px] font-bold text-[#12110E]">
                          2 RÉSEAUX
                        </span>
                      </div>
                    </div>

                    {/* Header Carte */}
                    <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                          FORMULE 02 · LE MOTEUR COMMERCIAL
                        </span>
                        <h3 className="mt-1 font-serif text-3xl font-medium text-[#12110E]">
                          Moteur Reels & Ventes
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#C5A880]/10 px-3 py-1 font-mono text-[9.5px] font-bold text-[#C5A880]">
                        Acquisition 4K
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#52504A]">
                      {t(l("Le format qui remplit votre établissement : nous scénarisons vos Reels 4K avec accroches virales, synchronisons Instagram & TikTok et modérons quotidiennement les commentaires.", "The format driving real foot traffic: scripted 4K Reels with viral hooks across Instagram & TikTok plus daily comment moderation turning views into revenue.", "Gói tạo dòng khách thực tế: video Reel 4K kịch bản cuốn hút trên Instagram & TikTok cùng trực phản hồi bình luận hàng ngày.", "الباقة التي تجلب لك عملاء فعليين: ريلز 4K سينمائية وإدارة يومية للتعليقات عبر إنستغرام وتيك توك.", "Формат, приводящий клиентов: сценарии для Reels 4K в Instagram и TikTok, хуки и ежедневная модерация.")) }
                    </p>

                    {/* Prix Concret */}
                    <div className="mt-5 rounded-2xl border border-[#E8E6E0] bg-[#FAF9F5] p-4 text-center">
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="font-serif text-5xl font-bold tracking-tight text-[#12110E]">
                          599 €
                        </span>
                        <span className="font-mono text-xs text-[#52504A]">/ mois</span>
                      </div>
                      <span className="mt-1 block font-mono text-[10px] font-semibold text-[#C5A880]">
                        Le meilleur retour sur investissement constaté
                      </span>
                    </div>

                    {/* Livrables Concrets */}
                    <div className="mt-6 space-y-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#12110E] block">
                        CE QUE VOUS RECEVEZ CONCRÈTEMENT :
                      </span>

                      <div className="space-y-2 text-xs text-[#2B2925]">
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>2 réseaux synchronisés</strong> (Instagram + TikTok ou Facebook)</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>8 à 12 publications 4K / mois</strong> dont des Reels scénarisés et montés en 4K 60FPS</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Hooks 3 secondes</strong> et sous-titres animés lisibles sans le son</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Modération quotidienne active (6j/7)</strong> : réponses soignées pour convertir en réservations</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Stories 3 fois par semaine</strong> pour maintenir l'engagement</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Reporting mensuel chiffré</strong> sur les réservations et nouveaux clients</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Directes */}
                  <div className="mt-8 space-y-2.5 border-t border-[#E8E6E0] pt-5">
                    <AddToCartBtn
                      item={{
                        serviceId: "social",
                        serviceName: "Social Media",
                        planName: "Moteur Reels & Ventes",
                        priceEur: 599,
                        period: "month",
                        periodLabel: "/ mois",
                      }}
                      popular={true}
                    />

                    <a
                      href={waFor("Moteur Reels & Ventes (599 €)", lang)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#12110E] bg-white py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#FAF9F5]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>Échanger sur cette formule N°1</span>
                    </a>
                  </div>
                </article>
              </Parallax>

              {/* OFFRE 03 : DOMINATION 360° */}
              <Parallax speed={0.03}>
                <article className="flex h-full flex-col justify-between rounded-3xl border border-[#E5E5E0] bg-white p-7 shadow-sm transition hover:border-[#12110E] hover:shadow-xl sm:p-8">
                  <div>
                    {/* Illustration Concrète de l'Offre */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E5E5E0] bg-black mb-5">
                      <img
                        src={agencySocialStudioHero}
                        alt="Domination Omnicanale XRAGENCY"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                        <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                          SATURATION 360° & MONITORING
                        </span>
                        <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[8px] text-white">
                          4 RÉSEAUX
                        </span>
                      </div>
                    </div>

                    {/* Header Carte */}
                    <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#52504A]">
                          FORMULE 03
                        </span>
                        <h3 className="mt-1 font-serif text-2xl font-medium text-[#12110E]">
                          Domination Omnicanale
                        </h3>
                      </div>
                      <span className="rounded-full border border-[#E5E5E0] bg-[#FAF9F5] px-3 py-1 font-mono text-[9.5px] font-semibold text-[#52504A]">
                        Saturation 360°
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#52504A]">
                      {t(l("Pour les marques de prestige, franchises et leaders qui veulent saturer l'attention sur tous les réseaux avec un volume intensif de Reels 4K.", "For prestige brands and industry leaders demanding omnichannel domination with high-frequency 4K video outputs.", "Dành cho thương hiệu cao cấp muốn thống trị toàn diện đa kênh với tần suất video 4K dày đặc.", "للعلامات الراقية والرواد الراغبين في السيطرة الكاملة على كافة المنصات بحجم إنتاج مكثف.", "Для премиальных брендов и лидеров рынка, нацеленных на доминирование во всех соцсетях.")) }
                    </p>

                    {/* Prix Concret */}
                    <div className="mt-5 rounded-2xl border border-[#E8E6E0] bg-[#FAF9F5] p-4 text-center">
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#12110E]">
                          799 €
                        </span>
                        <span className="font-mono text-xs text-[#52504A]">/ mois</span>
                      </div>
                      <span className="mt-1 block font-mono text-[10px] text-[#52504A]">
                        Prise en main totale multi-canaux
                      </span>
                    </div>

                    {/* Livrables Concrets */}
                    <div className="mt-6 space-y-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#12110E] block">
                        CE QUE VOUS RECEVEZ CONCRÈTEMENT :
                      </span>

                      <div className="space-y-2 text-xs text-[#2B2925]">
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>3 à 4 réseaux complets</strong> (Instagram, TikTok, LinkedIn & Facebook)</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>16+ contenus 4K / mois</strong> : saturation algorithmique intensive</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Modération prioritaire 7j/7</strong> et gestion des messages privés</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Stories quasi-quotidiennes</strong> pour une omniprésence totale</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[#C5A880] mt-0.5" />
                          <span><strong>Direction artistique dédiée</strong> et veille concurrentielle active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Directes */}
                  <div className="mt-8 space-y-2.5 border-t border-[#E8E6E0] pt-5">
                    <AddToCartBtn
                      item={{
                        serviceId: "social",
                        serviceName: "Social Media",
                        planName: "Domination Omnicanale",
                        priceEur: 799,
                        period: "month",
                        periodLabel: "/ mois",
                      }}
                      popular={false}
                    />

                    <a
                      href={waFor("Domination Omnicanale (799 €)", lang)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-2.5 text-xs font-semibold text-[#12110E] transition hover:bg-[#FAF9F5]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>Échanger sur la Domination</span>
                    </a>
                  </div>
                </article>
              </Parallax>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            03. AVANT / APRÈS : TRANSFORMATION RÉELLE (SANS AUCUN TÉLÉPHONE)
           ════════════════════════════════════════════════════════════════════ */}
        <section id="avant-apres" className="border-b border-[#E8E6E0] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12110E]/20 bg-[#FAF9F5] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#12110E]">
                <Flame className="h-3 w-3 text-rose-500" />
                {t(l("TRANSFORMATION CONCRÈTE & IMMERSIVE", "IMMERSIVE & REAL TRANSFORMATION", "BIẾN ĐỔI THỰC TẾ & CHẤT LƯỢNG", "التحول الحقيقي الملموس", "НАГЛЯДНОЕ ПРЕОБРАЖЕНИЕ"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#12110E] sm:text-5xl">
                {t(l("Sans XRAGENCY vs Avec XRAGENCY :", "Without XRAGENCY vs With XRAGENCY:", "Chưa có XRAGENCY vs Có XRAGENCY:", "بدون التعامل معنا مقابل بعد التعامل معنا:", "Без нас и с нами:"))}{" "}
                <em className="font-serif italic font-normal text-[#12110E] underline decoration-[#16A34A]/40 underline-offset-8">
                  {t(l("la métamorphose de votre image", "the visual metamorphosis", "sự lột xác hình ảnh", "التحول الجذري في صورتك", "преображение бренда"))}
                </em>.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-[#52504A] sm:text-sm">
                {t(l("Découvrez la différence saisissante entre un compte amateur délaissé par les algorithmes et une production studio qui remplit votre établissement :", "Discover the stark difference between an amateur stagnant profile and a studio-grade ecosystem filling your venue with paying clients:", "Thấy rõ khoảng cách giữa tài khoản nghiệp dư bị bóp tương tác và hệ sinh thái chuyên nghiệp đem lại khách hàng liên tục:", "اكتشف الفارق الهائل بين حساب هاوٍ مهمل واستوديو محترف يملأ مقرك بالزبائن:", "Наглядно оцените разницу между заброшенным профилем и продакшном, приносящим реальные заявки:"))}
              </p>
            </div>

            {/* Grand Banner Photographique Avant / Après (Studio Commercial Artwork) */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E5E0] bg-[#0E0D0B] shadow-2xl">
              <div className="relative aspect-[16/9] w-full max-h-[460px] overflow-hidden">
                <img
                  src={agencyBeforeAfterStudio}
                  alt="Comparatif Avant Après Social Media Studio XRAGENCY"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-rose-600/90 px-3.5 py-1 font-mono text-[9px] font-bold text-white uppercase shadow-sm">
                      GAUCHE : GESTION AMATEUR (12 likes, 0 client)
                    </span>
                    <span className="font-mono text-xs text-white/70">VS</span>
                    <span className="rounded-full bg-[#16A34A] px-3.5 py-1 font-mono text-[9px] font-bold text-white uppercase shadow-sm">
                      DROITE : PRODUCTION STUDIO 4K (+94 000 vues, +148 résas)
                    </span>
                  </div>
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9px] font-semibold text-emerald-400 backdrop-blur-md">
                    TRANSFORMATION COMMERCIALE VÉRIFIÉE
                  </span>
                </div>
              </div>
            </div>

            {/* Sélecteur de Secteur Métier */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {(["resto", "hotel", "immo", "sante"] as const).map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setActiveIndustry(ind)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                    activeIndustry === ind
                      ? "bg-[#12110E] text-white shadow-md scale-105"
                      : "border border-[#E5E5E0] bg-[#FAF9F5] text-[#52504A] hover:border-[#12110E]"
                  }`}
                >
                  {t(industriesData[ind].label)}
                </button>
              ))}
            </div>

            {/* Grand Comparatif Visuel Architectural (SANS AUCUN TÉLÉPHONE) */}
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* CARTE GAUCHE : SANS XR AGENCY (ÉTAT AMATEUR) */}
              <div className="overflow-hidden rounded-3xl border-2 border-rose-200 bg-[#FFFDFD] p-6 shadow-md sm:p-8">
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white">✕</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                      SANS XRAGENCY · ÉTAT AMATEUR
                    </span>
                  </div>
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-rose-600 border border-rose-200">
                    Perte de visibilité
                  </span>
                </div>

                {/* Visuel Amateur Grand Format */}
                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-rose-200 bg-neutral-900">
                  <img
                    src={currentInd.imageBefore}
                    alt="Avant"
                    className="h-full w-full object-cover filter grayscale contrast-90 brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/80 p-3 text-white backdrop-blur-md">
                    <p className="font-serif text-xs italic text-rose-300">
                      {currentInd.hookBefore}
                    </p>
                    <span className="mt-1 block font-mono text-[9px] text-white/60">
                      {currentInd.techBefore}
                    </span>
                  </div>
                </div>

                {/* Métriques d'Échec */}
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-rose-50 p-2.5 border border-rose-100">
                    <span className="block font-mono text-[9px] text-rose-600">VUES</span>
                    <strong className="text-xs text-rose-900 font-bold">{currentInd.viewsBefore}</strong>
                  </div>
                  <div className="rounded-xl bg-rose-50 p-2.5 border border-rose-100">
                    <span className="block font-mono text-[9px] text-rose-600">ENGAGEMENT</span>
                    <strong className="text-xs text-rose-900 font-bold">{currentInd.likesBefore}</strong>
                  </div>
                  <div className="rounded-xl bg-rose-50 p-2.5 border border-rose-100">
                    <span className="block font-mono text-[9px] text-rose-600">RÉSULTAT</span>
                    <strong className="text-xs text-rose-900 font-bold">{currentInd.resultBefore}</strong>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-rose-50/80 p-3.5 text-xs italic text-rose-800 border border-rose-100">
                  {currentInd.quoteBefore}
                </div>
              </div>

              {/* CARTE DROITE : AVEC XR AGENCY (STUDIO 4K) */}
              <div className="overflow-hidden rounded-3xl border-2 border-[#16A34A] bg-[#F7FCF8] p-6 shadow-xl sm:p-8">
                <div className="flex items-center justify-between border-b border-[#16A34A]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#16A34A] text-xs font-bold text-white">✓</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                      AVEC XRAGENCY · SIGNATURE STUDIO 4K
                    </span>
                  </div>
                  <span className="rounded-full bg-[#16A34A]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#16A34A] border border-[#16A34A]/30">
                    ★ Croissance Vérifiée
                  </span>
                </div>

                {/* Visuel Studio 4K Étalonné */}
                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#16A34A]/40 bg-black shadow-inner">
                  <img
                    src={currentInd.imageAfter}
                    alt="Après"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/80 p-3 text-white backdrop-blur-md border border-white/10">
                    <p className="font-serif text-xs italic text-emerald-300">
                      {currentInd.hookAfter}
                    </p>
                    <span className="mt-1 block font-mono text-[9px] text-white/80">
                      {currentInd.techAfter}
                    </span>
                  </div>
                </div>

                {/* Métriques de Succès Commercial */}
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-[#16A34A]/10 p-2.5 border border-[#16A34A]/25">
                    <span className="block font-mono text-[9px] text-[#16A34A] font-semibold">VUES</span>
                    <strong className="text-xs text-[#12110E] font-bold">{currentInd.viewsAfter}</strong>
                  </div>
                  <div className="rounded-xl bg-[#16A34A]/10 p-2.5 border border-[#16A34A]/25">
                    <span className="block font-mono text-[9px] text-[#16A34A] font-semibold">ENGAGEMENT</span>
                    <strong className="text-xs text-[#12110E] font-bold">{currentInd.likesAfter}</strong>
                  </div>
                  <div className="rounded-xl bg-[#16A34A]/10 p-2.5 border border-[#16A34A]/25">
                    <span className="block font-mono text-[9px] text-[#16A34A] font-semibold">RÉSULTAT</span>
                    <strong className="text-xs text-[#16A34A] font-bold">{currentInd.resultAfter}</strong>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-emerald-50 p-3.5 text-xs font-medium text-emerald-900 border border-emerald-200">
                  {currentInd.quoteAfter}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            04. SIMULATEUR EXPRESS EN 3 CLICS & RECOMMANDATION IMMÉDIATE
           ════════════════════════════════════════════════════════════════════ */}
        <section id="simulateur" className="border-b border-[#E8E6E0] bg-[#FAF9F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E0] bg-white px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#52504A]">
                <Sparkles className="h-3.5 w-3.5 text-[#16A34A]" />
                {t(l("SIMULATEUR DE FORMULE EN 3 CLICS", "3-CLICK PLAN SIMULATOR", "CÔNG CỤ TÍNH GÓI NHANH", "حاسبة الباقة في 3 خطوات", "ПОДБОР ТАРИФА ЗА 3 КЛИКА"))}
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#12110E]">
                {t(l("Calculez la formule idéale pour", "Find the plan calibrated for", "Tìm gói chuẩn xác cho", "اعثر على الباقة المناسبة", "Найдите оптимальный тариф под"))}{" "}
                <em className="font-serif italic font-normal text-[#12110E] underline decoration-[#16A34A]/40">
                  {t(l("votre activité", "your business", "doanh nghiệp của bạn", "نشاطك التجاري", "ваш бизнес"))}
                </em>.
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[#52504A] sm:text-sm">
                {t(
                  l(
                    "Sélectionnez vos critères ci-dessous : le devis exact s'actualise en temps réel avec la recommandation adaptée.",
                    "Select your criteria below: your exact quote updates in real-time with our tailored recommendation.",
                    "Chọn tiêu chí bên dưới: báo giá sẽ cập nhật tức thì với đề xuất tối ưu.",
                    "اختر معاييرك أدناه: يتحدث السعر فوراً مع التوصية المناسبة.",
                    "Выберите параметры ниже: точная смета пересчитается мгновенно.",
                  ),
                )}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              {/* 3 Étapes Interactives */}
              <div className="space-y-5 lg:col-span-7">
                {/* 1. Univers */}
                <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52504A]">
                    1. VOTRE UNIVERS MÉTIER
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      { id: "resto", label: "Restaurant & Bar", icon: "🍽️" },
                      { id: "commerce", label: "Commerce & Boutique", icon: "🛍️" },
                      { id: "immo", label: "Immobilier & Prestige", icon: "🏛️" },
                      { id: "sante", label: "Clinique & Esthétique", icon: "✨" },
                      { id: "b2b", label: "B2B & Services", icon: "💼" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRecIndustry(item.id as typeof recIndustry)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition ${
                          recIndustry === item.id
                            ? "border-[#12110E] bg-[#12110E] text-white shadow-xs"
                            : "border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Objectif */}
                <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52504A]">
                    2. VOTRE OBJECTIF PRINCIPAL
                  </span>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {[
                      {
                        id: "vitrine",
                        title: "Vitrine & Image",
                        desc: "Poser un profil propre et rassurer les clients.",
                      },
                      {
                        id: "croissance",
                        title: "Viralité & Nouveaux Clients",
                        desc: "Déclencher l'algorithme avec les Reels 4K.",
                      },
                      {
                        id: "domination",
                        title: "Leader Sectoriel",
                        desc: "Saturer tous les réseaux et dominer le marché.",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRecGoal(item.id as typeof recGoal)}
                        className={`flex flex-col rounded-xl border p-3.5 text-left transition ${
                          recGoal === item.id
                            ? "border-[#12110E] bg-[#12110E] text-white shadow-xs"
                            : "border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
                        }`}
                      >
                        <strong className="text-xs font-serif font-semibold">{item.title}</strong>
                        <span className={`mt-1 text-[10.5px] leading-relaxed ${recGoal === item.id ? "text-white/80" : "text-[#52504A]"}`}>
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Réseaux */}
                <div className="rounded-2xl border border-[#E5E5E0] bg-white p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52504A]">
                    3. RÉSEAUX SOCIAUX SOUHAITÉS
                  </span>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {[
                      { id: "solo", title: "1 réseau clé", desc: "Instagram en priorité." },
                      { id: "duo", title: "2 réseaux (Instagram + TikTok)", desc: "Le format le plus rentable." },
                      { id: "multi", title: "3 à 4 réseaux complets", desc: "Insta + TikTok + LinkedIn + FB." },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRecVolume(item.id as typeof recVolume)}
                        className={`flex flex-col rounded-xl border p-3.5 text-left transition ${
                          recVolume === item.id
                            ? "border-[#12110E] bg-[#12110E] text-white shadow-xs"
                            : "border-[#E5E5E0] bg-[#FAF9F5] text-[#12110E] hover:border-[#12110E]"
                        }`}
                      >
                        <strong className="text-xs font-serif font-semibold">{item.title}</strong>
                        <span className={`mt-1 text-[10.5px] leading-relaxed ${recVolume === item.id ? "text-white/80" : "text-[#52504A]"}`}>
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carte Recommandation */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 flex flex-col justify-between rounded-3xl border border-[#E5E5E0] bg-white p-6 shadow-xl sm:p-8">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#16A34A]/30 bg-[#16A34A]/10 px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#16A34A]">
                        ✦ FORMULE CONSEILLÉE
                      </span>
                      <span className="font-mono text-xs text-[#52504A]">DÈS 3 MOIS</span>
                    </div>

                    <div className="mt-4">
                      <span className="font-mono text-[10px] text-[#52504A] uppercase tracking-wider">
                        RECOMMANDATION CALCULÉE
                      </span>
                      <h3 className="mt-1 font-serif text-3xl font-medium text-[#12110E]">
                        {calculatedPlanIdx === 1 ? "Moteur Reels & Ventes" : calculatedPlanIdx === 2 ? "Domination Omnicanale" : "Vitrine Signature"}
                      </h3>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-serif text-5xl font-bold text-[#12110E]">
                          {price(currentRecPlan.eur)}
                        </span>
                        <span className="font-mono text-sm text-[#52504A]">/ mois</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#E8E6E0] bg-[#FAF9F5] p-3.5 text-xs text-[#52504A] leading-relaxed">
                      {calculatedPlanIdx === 1
                        ? "La formule optimale : 8 à 12 publications 4K, scénarisation des Reels dynamiques et modération quotidienne pour transformer les spectateurs en clients réels."
                        : calculatedPlanIdx === 2
                          ? "Votre profil requiert une saturation 360° avec 16+ Reels 4K par mois et une modération prioritaire 7j/7 pour écraser vos concurrents."
                          : "Une solution accessible pour éliminer l'effet de compte abandonné et maintenir une vitrine impeccable sur votre réseau principal."}
                    </div>

                    <ul className="mt-4 space-y-2">
                      {currentRecPlan.features.slice(0, 4).map((feat, k) => (
                        <li key={k} className="flex items-center gap-2 text-xs text-[#12110E]">
                          <Check className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                          <span>{t(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-2.5 pt-5 border-t border-[#E8E6E0]">
                    <AddToCartBtn
                      item={{
                        serviceId: "social",
                        serviceName: "Social Media",
                        planName: t(currentRecPlan.name),
                        priceEur: currentRecPlan.eur,
                        period: "month",
                        periodLabel: "/ mois",
                      }}
                      popular={calculatedPlanIdx === 1}
                    />

                    <a
                      href={waFor(t(currentRecPlan.name), lang)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5D5CF] bg-white py-3 text-xs font-semibold text-[#12110E] transition hover:bg-[#FAF9F5]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#16A34A]" />
                      <span>Échanger avec notre directrice artistique</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            05. QUESTIONS FRÉQUENTES CONCISES
           ════════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-[#E8E6E0] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-8">
            <div className="text-center">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#52504A]">
                TRANSPARENCE TOTALE & ENGAGEMENT
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-medium text-[#12110E]">
                Questions Fréquentes
              </h2>
              <p className="mt-2 text-xs text-[#52504A] sm:text-sm">
                Tout ce que vous devez savoir avant de lancer votre stratégie avec XRAGENCY
              </p>
            </div>

            <div className="mt-10 space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#E5E5E0] bg-[#FAF9F5] transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-serif font-medium text-[#12110E]"
                    >
                      <span>{t(faq.q)}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#12110E] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#E8E6E0] bg-white px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-[#52504A]">
                        {t(faq.a)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            06. BAS DE PAGE ÉPURÉ ARCHITECTE (PORCELAINE #FAF9F5)
           ════════════════════════════════════════════════════════════════════ */}
        <footer className="relative bg-[#FAF9F5] text-[#12110E] pt-16 pb-14 border-t border-[#E8E6E0]">
          <div className="relative mx-auto max-w-[1360px] px-4 sm:px-8">
            {/* Top Brand Banner */}
            <div className="flex flex-col gap-6 border-b border-[#E8E6E0] pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Logo className="text-[#12110E]" />
                  <div className="flex items-center gap-1.5 pl-2 border-l border-[#D5D5CF]">
                    <span className="h-2 w-2 rounded-full bg-[#1A73E8]" />
                    <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                    <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  </div>
                </div>
                <p className="mt-3 max-w-xl text-xs text-[#52504A] sm:text-sm leading-relaxed">
                  {t(
                    l(
                      "XRAGENCY · Studio d'Ingénierie & de Direction Artistique Social Media. Nous produisons des flux de contenus 4K exigeants et orchestrons votre présence sur Instagram, TikTok, Facebook & LinkedIn.",
                      "XRAGENCY · Social Media Art Direction & Production Studio. Crafting cinematic 4K video feeds and orchestrating brand dominance across Instagram, TikTok, Facebook & LinkedIn.",
                      "XRAGENCY · Studio Định hướng Nghệ thuật & Sản xuất Mạng Xã hội. Sản xuất video 4K chất lượng cao và quản trị đa kênh chuyên nghiệp.",
                      "XRAGENCY · استوديو الإخراج الفني وإنتاج محتوى التواصل الاجتماعي. ننتج مقاطع 4K سينمائية وندير حضورك على كافة المنصات باحترافية.",
                      "XRAGENCY · Студия продакшна и арт-дирекшна для соцсетей. Создаём вирусные Reels 4K и полностью ведём ваши каналы.",
                    ),
                  )}
                </p>
              </div>

              {/* Live Agency Performance Badge */}
              <div className="rounded-2xl border border-[#E5E5E0] bg-white p-4 shadow-xs shrink-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-ping rounded-full bg-[#16A34A]" />
                  <span className="font-mono text-[10.5px] font-bold text-[#12110E] tracking-wider">
                    XR CREATIVE NETWORK · EN DIRECT
                  </span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-5 font-mono text-xs">
                  <div>
                    <span className="text-[#52504A] block text-[10px]">COMPTES PILOTÉS</span>
                    <strong className="text-[#12110E] text-sm">38 Actifs</strong>
                  </div>
                  <div>
                    <span className="text-[#52504A] block text-[10px]">ENGAGEMENT MOYEN</span>
                    <strong className="text-[#16A34A] text-sm">+340%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Worldwide Hubs Grid */}
            <div className="mt-10">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#1A73E8]">
                {t(l("LES 4 HUBS XR AGENCY EN SYNCHRONISATION PERMANENTE", "THE 4 XR AGENCY HUBS IN CONSTANT SYNC", "4 TRUNG TÂM XR AGENCY TRÊN TOÀN CẦU", "مراكز XR AGENCY الأربعة في مزامنة دائمة", "4 МЕЖДУНАРОДНЫХ ХАБА XR AGENCY"))}
              </span>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { city: "Paris", tag: "Siège France · Direction Artistique & Studio", flag: "🇫🇷", time: "CET · UTC+1", coord: "48.8566° N, 2.3522° E" },
                  { city: "Dubaï", tag: "Émirats · Croissance & Influence Luxe", flag: "🇦🇪", time: "GST · UTC+4", coord: "25.2048° N, 55.2708° E" },
                  { city: "Da Nang", tag: "Vietnam · Montage Vidéo & Effets 4K", flag: "🇻🇳", time: "ICT · UTC+7", coord: "16.0544° N, 108.2022° E" },
                  { city: "Genève", tag: "Suisse · Clientèle Privée & Prestige", flag: "🇨🇭", time: "CET · UTC+1", coord: "46.2044° N, 6.1432° E" },
                ].map((hub, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#E5E5E0] bg-white p-4 shadow-xs transition hover:border-[#12110E] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{hub.flag}</span>
                      <span className="font-mono text-[9px] text-[#52504A] bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#EBEBE6]">
                        {hub.time}
                      </span>
                    </div>
                    <h4 className="mt-2.5 font-serif text-lg font-medium text-[#12110E]">{hub.city}</h4>
                    <p className="mt-0.5 text-xs text-[#52504A]">{hub.tag}</p>
                    <span className="mt-2 block font-mono text-[9.5px] text-[#1A73E8]">
                      {hub.coord}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation vers les autres prestations */}
            <div className="mt-10 border-t border-[#E8E6E0] pt-8">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#52504A]">
                {t(l("EXPLORER L'ÉCOSYSTÈME XR AGENCY", "EXPLORE XR AGENCY SERVICES", "KHÁM PHÁ DỊCH VỤ XR AGENCY", "استكشف خدمات XR AGENCY الأخرى", "ДРУГИЕ НАПРАВЛЕНИЯ XR AGENCY"))}
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {[
                  { name: l("Création de Sites Web & Refonte", "Websites & Redesign", "Thiết kế Website", "تصميم المواقع", "Создание сайтов"), path: "/services/site-internet" },
                  { name: l("Fiche Google Maps & Pack Local", "Google Maps & Local Pack", "Google Maps & Local Pack", "خرائط جوجل والظهور المحلي", "Google Maps и Local Pack"), path: "/services/maps" },
                  { name: l("Branding & Direction Artistique", "Branding & Art Direction", "Bộ nhận diện Thương hiệu", "الهوية البصرية", "Брендинг"), path: "/services/branding" },
                  { name: l("SEO & Intelligence Artificielle", "SEO & AI Search", "SEO & Trí tuệ Nhân tạo", "السيو والذكاء الاصطناعي", "SEO и ИИ"), path: "/services/seo" },
                  { name: l("Webcare & Maintenance 24/7", "Webcare & Maintenance", "Bảo trì & Vận hành", "الصيانة والدعم الفني", "Поддержка сайтов"), path: "/services/webcare" },
                  { name: l("Toutes les Réalisations", "All Case Studies", "Dự án Tiêu biểu", "كافة الأعمال", "Все кейсы"), path: "/realisations" },
                ].map((s, idx) => (
                  <Link
                    key={idx}
                    to={s.path}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E0] bg-white px-4 py-2 text-xs font-medium text-[#2B2925] shadow-xs transition hover:border-[#12110E] hover:bg-[#12110E] hover:text-white"
                  >
                    <span>{t(s.name)}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Copyright & Legal Links */}
            <div className="mt-10 flex flex-col gap-4 border-t border-[#E8E6E0] pt-6 text-xs text-[#52504A] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p>
                  XRAGENCY · © {new Date().getFullYear()} · {t(l("Tous droits réservés. Cession commerciale 100% contractuelle.", "All rights reserved. 100% contractual commercial ownership.", "Bảo lưu mọi quyền. Chuyển giao 100% bản quyền thương mại.", "جميع الحقوق محفوظة. تنازل تجاري كامل 100%.", "Все права защищены. 100% передача прав.")) }
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/mentions-legales" className="hover:text-[#12110E] transition">
                  {t(l("Mentions légales & Confidentialité", "Legal notice & Privacy", "Pháp lý & Bảo mật", "الشروط القانونية والخصوصية", "Правовая информация"))}
                </Link>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D5CF] bg-white px-3 py-1 text-[11px] font-mono text-[#52504A] hover:border-[#12110E] hover:text-[#12110E] transition shadow-xs"
                >
                  <span>RETOUR HAUT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
