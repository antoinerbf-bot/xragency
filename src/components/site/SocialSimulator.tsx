import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Flame, Heart, MessageCircle, Play, Share2, Sparkles, TrendingUp, Users, Video, XCircle, Zap } from "lucide-react";
import { InstagramLogo, TikTokLogo, FacebookLogo } from "./ServiceIllustration";
import { XR_PHOTOS } from "@/lib/photography";
import { useLang, type Lang } from "@/lib/i18n";
import { Reveal } from "./primitives";

interface SectorData {
  id: string;
  label: Record<Lang, string>;
  icon: string;
  reach: string;
  engagement: string;
  clients: string;
  hoursSaved: string;
  roas: string;
  bestFormat: string;
  quoteAnchor: string;
}

const SECTORS: SectorData[] = [
  {
    id: "food",
    label: {
      fr: "Restauration & Hôtellerie",
      en: "Restaurants & Hospitality",
      vi: "Nhà hàng & Khách sạn",
      ar: "المطاعم والضيافة",
      ru: "Рестораны и отели",
    },
    icon: "🍽️",
    reach: "65 000 à 110 000",
    engagement: "18.8%",
    clients: "+180 à +320 réservations / mois",
    hoursSaved: "18h / mois",
    roas: "×4.8",
    bestFormat: "Reels 4K gourmands & coulisses du chef",
    quoteAnchor: "restaurant",
  },
  {
    id: "luxury",
    label: {
      fr: "Mode, Joaillerie & Luxe",
      en: "Fashion & Luxury Goods",
      vi: "Thời trang & Xa xỉ",
      ar: "الموضة والمجوهرات الفاخرة",
      ru: "Мода и ювелирные изделия",
    },
    icon: "💎",
    reach: "85 000 à 160 000",
    engagement: "21.4%",
    clients: "+95 à +180 ventes qualifiées / mois",
    hoursSaved: "22h / mois",
    roas: "×5.4",
    bestFormat: "Lookbooks cinématiques 4K & macro-détails",
    quoteAnchor: "luxury",
  },
  {
    id: "beauty",
    label: {
      fr: "Beauté, Salons & Spas",
      en: "Beauty, Salons & Spas",
      vi: "Làm đẹp & Chăm sóc sức khỏe",
      ar: "التجميل والصالونات والسبا",
      ru: "Красота, салоны и спа",
    },
    icon: "✨",
    reach: "45 000 à 80 000",
    engagement: "16.9%",
    clients: "+140 à +240 rendez-vous / mois",
    hoursSaved: "15h / mois",
    roas: "×4.1",
    bestFormat: "Avant/Après rythmés & Stories immersion",
    quoteAnchor: "beauty",
  },
  {
    id: "realestate",
    label: {
      fr: "Immobilier & Architecture",
      en: "Real Estate & Architecture",
      vi: "Bất động sản & Kiến trúc",
      ar: "العقارات والهندسة المعمارية",
      ru: "Недвижимость и архитектура",
    },
    icon: "🏛️",
    reach: "40 000 à 75 000",
    engagement: "14.2%",
    clients: "+15 à +35 mandats & visites d'exception",
    hoursSaved: "20h / mois",
    roas: "×6.2",
    bestFormat: "Visites virtuelles drone & plans cinéma stabilisés",
    quoteAnchor: "realestate",
  },
  {
    id: "services",
    label: {
      fr: "Artisans & Commerces Locaux",
      en: "Artisans & Local Retail",
      vi: "Thợ thủ công & Bán lẻ địa phương",
      ar: "الحرفيون والمتاجر المحلية",
      ru: "Мастера и локальный бизнес",
    },
    icon: "🔨",
    reach: "35 000 à 65 000",
    engagement: "15.6%",
    clients: "+60 à +140 devis & contacts directs",
    hoursSaved: "16h / mois",
    roas: "×3.9",
    bestFormat: "Savoir-faire en action & avis clients vérifiés",
    quoteAnchor: "craft",
  },
];

export function SocialSimulator() {
  const { lang, t } = useLang();
  const currentLang = (["fr", "en", "vi", "ar", "ru"].includes(lang) ? lang : "fr") as Lang;
  const [selectedSector, setSelectedSector] = useState<string>("food");
  const [activeChannel, setActiveChannel] = useState<"instagram" | "tiktok" | "facebook">("instagram");

  const sector = SECTORS.find((s) => s.id === selectedSector) ?? SECTORS[0];

  return (
    <section className="relative overflow-hidden border-b xr-line bg-[var(--xr-bg)] py-14 sm:py-20 lg:py-24">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(225, 48, 108, 0.08), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0, 242, 254, 0.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col gap-4 border-b xr-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-500/15 text-pink-400">
                  <Flame className="h-3.5 w-3.5" />
                </span>
                <span className="label-mono text-[8px] tracking-[.24em] text-[var(--xr-ink)]/70 uppercase">
                  TUNNEL D'ACQUISITION & VISIBILITÉ VIRALE
                </span>
              </div>
              <h2 className="display-serif mt-3 max-w-4xl text-[clamp(2.3rem,4.8vw,4.8rem)] leading-[.88] tracking-[-.05em] text-[var(--xr-ink)]">
                {currentLang === "fr" && "Simulateur d'Audience & Retour sur Investissement Social Media."}
                {currentLang === "en" && "Audience Simulator & Social Media ROI Forecast."}
                {currentLang === "vi" && "Mô phỏng Khán giả & Dự báo ROI Mạng Xã Hội."}
                {currentLang === "ar" && "محاكي الجمهور والعائد على الاستثمار في وسائل التواصل."}
                {currentLang === "ru" && "Симулятор охвата и расчёт окупаемости Social Media."}
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-6 xr-muted">
              {currentLang === "fr" &&
                "Sélectionnez votre univers. Découvrez l'impact concret d'une production 4K et d'une gestion 100% déléguée sur vos ventes."}
              {currentLang === "en" &&
                "Select your industry. Discover the concrete impact of 4K cinematic production and 100% delegated management on your revenue."}
              {currentLang === "vi" &&
                "Chọn ngành nghề của bạn. Khám phá tác động cụ thể của sản xuất 4K và quản lý trọn gói đối với doanh số."}
              {currentLang === "ar" &&
                "اختر مجالك واكتشف التأثير المباشر للإنتاج السينمائي 4K والإدارة الكاملة على أرباحك."}
              {currentLang === "ru" &&
                "Выберите вашу сферу. Узнайте конкретный эффект 4K-продакшна и полного делегирования на ваши продажи."}
            </p>
          </div>
        </Reveal>

        {/* 1. Sector Switcher */}
        <div className="pt-8">
          <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2 uppercase block mb-3">
            ÉTAPE 1 · VÔTRE SECTEUR D'ACTIVITÉ :
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {SECTORS.map((s) => {
              const active = s.id === selectedSector;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSector(s.id)}
                  className={
                    "flex items-center gap-2.5 rounded-2xl border p-3.5 text-left transition-all duration-300 " +
                    (active
                      ? "border-amber-400 bg-[var(--xr-surface-strong)] shadow-lg scale-[1.02] ring-1 ring-amber-400/50"
                      : "border-white/10 bg-[var(--xr-surface)]/60 hover:border-white/25 hover:bg-[var(--xr-surface-strong)]")
                  }
                >
                  <span className="text-xl shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[var(--xr-ink)] truncate">
                      {s.label[currentLang] ?? s.label.fr}
                    </p>
                    <span className="label-mono text-[6.5px] text-amber-300 block">
                      {active ? "SÉLECTIONNÉ" : "Calculer"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Projection Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          {/* Left Column: Business Telemetry & Concrete Gains */}
          <div className="flex flex-col justify-between rounded-[2rem] border xr-line bg-[var(--xr-surface)]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b xr-line pb-4">
                <div>
                  <span className="label-mono text-[7px] tracking-[.18em] text-emerald-400 font-bold uppercase">
                    PROJECTION CHIFFRÉE MENSUELLE
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--xr-ink)] mt-0.5">
                    Impact pour le secteur {sector.label[currentLang] ?? sector.label.fr}
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 label-mono text-[7.5px] font-bold text-emerald-400">
                  ENGAGEMENT 100% MESURABLE
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-center">
                <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-3.5">
                  <span className="display-serif block text-2xl font-bold text-pink-400 sm:text-3xl">
                    {sector.reach}
                  </span>
                  <span className="label-mono mt-1 block text-[6.5px] tracking-wider xr-muted uppercase">
                    Vues locales ciblées / mois
                  </span>
                </div>

                <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-3.5">
                  <span className="display-serif block text-2xl font-bold text-amber-300 sm:text-3xl">
                    {sector.engagement}
                  </span>
                  <span className="label-mono mt-1 block text-[6.5px] tracking-wider xr-muted uppercase">
                    Taux d'interaction moyen
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-2xl border xr-line bg-[var(--xr-surface-strong)] p-3.5">
                  <span className="display-serif block text-2xl font-bold text-emerald-400 sm:text-3xl">
                    {sector.roas}
                  </span>
                  <span className="label-mono mt-1 block text-[6.5px] tracking-wider xr-muted uppercase">
                    Retour sur budget Ads constaté
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs">
                  <span className="font-semibold text-[var(--xr-ink)]">
                    🎯 Nouveaux clients & réservations :
                  </span>
                  <span className="font-bold text-emerald-400">{sector.clients}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-xs">
                  <span className="font-semibold text-[var(--xr-ink)]">
                    ⏱️ Temps économisé pour la direction :
                  </span>
                  <span className="font-bold text-purple-300">{sector.hoursSaved}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-bg)] p-3 text-xs">
                  <span className="font-semibold text-[var(--xr-ink)]">
                    🎬 Format le plus performant identifié :
                  </span>
                  <span className="label-mono text-[8px] font-bold text-amber-300">{sector.bestFormat}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t xr-line flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs xr-muted">
                Dès <strong className="text-[var(--xr-ink)] font-bold">299 € / mois</strong> · Forfait sans engagement long
              </span>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] text-[var(--xr-bg)] px-5 py-2.5 label-mono text-[8px] font-bold shadow-md hover:-translate-y-0.5 transition"
              >
                Choisir ma formule Social Media
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact Comparison "Amateur vs XR Agency" */}
          <div className="rounded-[2rem] border xr-line bg-[var(--xr-surface-strong)]/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="label-mono text-[7px] tracking-[.2em] xr-muted-2 uppercase block">
                POURQUOI DÉLÉGUER À XR AGENCY ?
              </span>
              <h3 className="display-serif text-2xl font-bold text-[var(--xr-ink)] mt-1 mb-5">
                Comparatif de Rentabilité & Sérénité
              </h3>

              {/* Amateur column */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Gestion amateur en interne (Sans agence)</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Photos prises au smartphone avec éclairage approximatif</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Publications irrégulières qui tuent l'algorithme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>15 à 20h perdues chaque mois par le gérant au lieu de vendre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Budget publicitaire brûlé sans tracking ni retargeting</span>
                    </li>
                  </ul>
                </div>

                {/* XR Agency Pro Column */}
                <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Dispositif d'Élite XR Agency</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-[var(--xr-ink)]">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Caméras cinéma 4K, stabilisateurs Ronin & micros pro sur site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Calendrier éditorial verrouillé et validé à l'avance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Modération 6j/7 et transformation des commentaires en clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>100% de cession des droits d'auteur · Zéro charge mentale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t xr-line flex items-center justify-between">
              <span className="label-mono text-[7px] text-amber-300 font-bold">
                LANCEMENT DE VOTRE CAMPAGNE SOUS 7 JOURS
              </span>
              <span className="label-mono text-[7px] text-emerald-400 font-bold">
                SATISFAIT OU RÉAJUSTÉ
              </span>
            </div>
          </div>
        </div>

        {/* 3. The Three Official Social Ecosystems with Vibrant Logos */}
        <div className="mt-12 pt-8 border-t xr-line">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="label-mono text-[7px] tracking-[.22em] text-[var(--xr-ink)]/60 uppercase">
                LES 3 PILIERS OFFICIELS DU DISPOSITIF
              </span>
              <h3 className="display-serif text-2xl sm:text-3xl font-bold text-[var(--xr-ink)] mt-1">
                Une synergie totale pour captiver, fidéliser et convertir.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Instagram Card */}
            <div className="rounded-[1.8rem] border border-pink-500/25 bg-gradient-to-b from-pink-500/10 via-[var(--xr-surface)] to-[var(--xr-bg)] p-6 shadow-lg transition hover:-translate-y-1 hover:border-pink-500/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <InstagramLogo className="h-7 w-7" />
                  <span className="text-base font-bold text-[var(--xr-ink)]">Instagram</span>
                </div>
                <span className="rounded-full bg-pink-500/15 border border-pink-500/30 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-pink-300">
                  REELS & FEED 4K
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-[var(--xr-ink)]">
                L'Écrin Visuel de Votre Marque
              </p>
              <p className="mt-1 text-[11px] leading-relaxed xr-muted">
                Direction artistique soignée, grille harmonieuse, étalonnage cinématique et Stories interactives pour asseoir une réputation irréprochable.
              </p>
              <div className="mt-4 pt-3 border-t xr-line flex items-center justify-between text-[10px]">
                <span className="xr-muted">Fréquence idéale</span>
                <span className="label-mono font-bold text-pink-400">12 à 20 posts / mois</span>
              </div>
            </div>

            {/* TikTok Card */}
            <div className="rounded-[1.8rem] border border-cyan-400/25 bg-gradient-to-b from-cyan-400/10 via-[var(--xr-surface)] to-[var(--xr-bg)] p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TikTokLogo className="h-7 w-7" />
                  <span className="text-base font-bold text-[var(--xr-ink)]">TikTok</span>
                </div>
                <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-cyan-300">
                  HOOK 3S & VIRALITÉ
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-[var(--xr-ink)]">
                L'Accélérateur de Visibilité Massive
              </p>
              <p className="mt-1 text-[11px] leading-relaxed xr-muted">
                Formats verticaux ultra-rythmés, sons tendance certifiés et narration captivante pour exploser les compteurs de vues organiques.
              </p>
              <div className="mt-4 pt-3 border-t xr-line flex items-center justify-between text-[10px]">
                <span className="xr-muted">Potentiel viral moyen</span>
                <span className="label-mono font-bold text-cyan-300">80K à 250K vues</span>
              </div>
            </div>

            {/* Facebook / Meta Ads Card */}
            <div className="rounded-[1.8rem] border border-blue-500/25 bg-gradient-to-b from-blue-500/10 via-[var(--xr-surface)] to-[var(--xr-bg)] p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FacebookLogo className="h-7 w-7" />
                  <span className="text-base font-bold text-[var(--xr-ink)]">Facebook & Ads</span>
                </div>
                <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-blue-300">
                  LOCAL 5KM & RETARGETING
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-[var(--xr-ink)]">
                Le Canal d'Acquisition Directe
              </p>
              <p className="mt-1 text-[11px] leading-relaxed xr-muted">
                Campagnes sponsorisées ultra-ciblées géographiquement autour de votre adresse, retargeting des visiteurs et génération de formulaires.
              </p>
              <div className="mt-4 pt-3 border-t xr-line flex items-center justify-between text-[10px]">
                <span className="xr-muted">Retour publicitaire (ROAS)</span>
                <span className="label-mono font-bold text-blue-400">×3.8 à ×5.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
