import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPinned,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Award,
  Zap,
  Users,
  BarChart3,
  Gauge,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";


const MAPS_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Restaurant / Bar":"Restaurant / Bar","Hôtel / Spa":"Hotel / Spa","Santé / Médecin":"Healthcare / Doctor","Avocat / Notaire":"Lawyer / Notary","Immobilier":"Real estate","Artisan / BTP":"Trades / Construction","Beauté / Bien-être":"Beauty / Wellness","Autre commerce":"Other business",
    "Petite ville":"Small town","Ville moyenne":"Medium-sized city","Grande ville":"Large city","Métropole":"Metropolitan area","mots-clés principaux":"main keywords","Absent de Maps":"Not on Maps","Fiche non créée ou invisible":"Listing not created or not visible","Hors Top 20":"Outside Top 20","Très peu visible":"Very low visibility","Position 4 – 10":"Position 4–10","Visible mais pas dans le Pack":"Visible but outside the Local Pack",
    "SIMULATION EN DIRECT":"LIVE SIMULATION","RECHERCHE CIBLE":"TARGET SEARCH","POSITION ACTUELLE":"CURRENT POSITION","VISIBILITÉ À CONSTRUIRE":"VISIBILITY TO BUILD","SIGNAL À RENFORCER":"SIGNAL TO STRENGTHEN","POSITIONNEMENT À DÉVELOPPER":"POSITIONING TO IMPROVE",
    "Configurateur de projet":"Project configurator","Estimez votre investissement Google Maps":"Estimate your Google Maps investment","Votre secteur d'activité":"Your industry","Taille de votre ville":"City size","Nombre de mots-clés principaux":"Number of main keywords","Votre positionnement actuel sur Google Maps":"Your current Google Maps ranking",
    "Budget indicatif · à partir de 990 € / an":"Indicative budget · from €990/year","Estimation indicative · tarif exact après audit personnalisé":"Indicative estimate · exact price after a personalised audit","Objectif Top 3 · étude locale sur mesure":"Top 3 target · tailored local study","Lancer mon audit gratuit":"Start my free audit","Audit initial offert":"Initial audit included","Périmètre contractuel clair":"Clear contractual scope","Rapport mensuel inclus":"Monthly report included","Sans engagement minimum":"No minimum commitment","Méthodologie exclusive":"Exclusive methodology","Le processus en 7 phases":"The 7-phase process"
  },
  vi: {
    "Restaurant / Bar":"Nhà hàng / Bar","Hôtel / Spa":"Khách sạn / Spa","Santé / Médecin":"Y tế / Bác sĩ","Avocat / Notaire":"Luật sư / Công chứng viên","Immobilier":"Bất động sản","Artisan / BTP":"Thợ thủ công / Xây dựng","Beauté / Bien-être":"Làm đẹp / Sức khỏe","Autre commerce":"Doanh nghiệp khác",
    "Petite ville":"Thành phố nhỏ","Ville moyenne":"Thành phố vừa","Grande ville":"Thành phố lớn","Métropole":"Đô thị lớn","mots-clés principaux":"từ khóa chính","Absent de Maps":"Chưa có trên Maps","Fiche non créée ou invisible":"Chưa tạo hồ sơ hoặc không hiển thị","Hors Top 20":"Ngoài Top 20","Très peu visible":"Khả năng hiển thị rất thấp","Position 4 – 10":"Vị trí 4–10","Visible mais pas dans le Pack":"Có hiển thị nhưng ngoài Local Pack",
    "SIMULATION EN DIRECT":"MÔ PHỎNG TRỰC TIẾP","RECHERCHE CIBLE":"TÌM KIẾM MỤC TIÊU","POSITION ACTUELLE":"VỊ TRÍ HIỆN TẠI","VISIBILITÉ À CONSTRUIRE":"CẦN XÂY DỰNG HIỂN THỊ","SIGNAL À RENFORCER":"CẦN TĂNG CƯỜNG TÍN HIỆU","POSITIONNEMENT À DÉVELOPPER":"CẦN CẢI THIỆN THỨ HẠNG",
    "Configurateur de projet":"Cấu hình dự án","Estimez votre investissement Google Maps":"Ước tính ngân sách Google Maps","Votre secteur d'activité":"Lĩnh vực hoạt động","Taille de votre ville":"Quy mô thành phố","Nombre de mots-clés principaux":"Số từ khóa chính","Votre positionnement actuel sur Google Maps":"Thứ hạng Google Maps hiện tại",
    "Budget indicatif · à partir de 990 € / an":"Ngân sách tham khảo · từ 990 € / năm","Estimation indicative · tarif exact après audit personnalisé":"Ước tính tham khảo · giá chính xác sau kiểm toán cá nhân hóa","Objectif Top 3 · étude locale sur mesure":"Mục tiêu Top 3 · nghiên cứu địa phương theo yêu cầu","Lancer mon audit gratuit":"Bắt đầu kiểm toán miễn phí","Audit initial offert":"Miễn phí kiểm toán ban đầu","Périmètre contractuel clair":"Phạm vi hợp đồng rõ ràng","Rapport mensuel inclus":"Bao gồm báo cáo hằng tháng","Sans engagement minimum":"Không cam kết thời hạn tối thiểu","Méthodologie exclusive":"Phương pháp độc quyền","Le processus en 7 phases":"Quy trình 7 giai đoạn"
  },
  ru: {
    "Restaurant / Bar":"Ресторан / бар","Hôtel / Spa":"Отель / спа","Santé / Médecin":"Медицина / врач","Avocat / Notaire":"Юрист / нотариус","Immobilier":"Недвижимость","Artisan / BTP":"Мастер / строительство","Beauté / Bien-être":"Красота / wellness","Autre commerce":"Другой бизнес",
    "Petite ville":"Небольшой город","Ville moyenne":"Средний город","Grande ville":"Крупный город","Métropole":"Мегаполис","mots-clés principaux":"основных ключевых слов","Absent de Maps":"Нет на Maps","Fiche non créée ou invisible":"Профиль не создан или не виден","Hors Top 20":"За пределами топ-20","Très peu visible":"Очень низкая видимость","Position 4 – 10":"Позиция 4–10","Visible mais pas dans le Pack":"Видимость есть, но не в Local Pack",
    "SIMULATION EN DIRECT":"ИНТЕРАКТИВНАЯ СИМУЛЯЦИЯ","RECHERCHE CIBLE":"ЦЕЛЕВОЙ ПОИСК","POSITION ACTUELLE":"ТЕКУЩАЯ ПОЗИЦИЯ","VISIBILITÉ À CONSTRUIRE":"ВИДИМОСТЬ НУЖНО СОЗДАТЬ","SIGNAL À RENFORCER":"СИГНАЛ НУЖНО УСИЛИТЬ","POSITIONNEMENT À DÉVELOPPER":"ПОЗИЦИЮ НУЖНО УЛУЧШИТЬ",
    "Configurateur de projet":"Конфигуратор проекта","Estimez votre investissement Google Maps":"Оцените инвестиции в Google Maps","Votre secteur d'activité":"Ваша сфера деятельности","Taille de votre ville":"Размер города","Nombre de mots-clés principaux":"Количество основных ключевых слов","Votre positionnement actuel sur Google Maps":"Ваше текущее положение в Google Maps",
    "Budget indicatif · à partir de 990 € / an":"Ориентировочный бюджет · от 990 € в год","Estimation indicative · tarif exact après audit personnalisé":"Предварительная оценка · точная цена после персонального аудита","Objectif Top 3 · étude locale sur mesure":"Цель — топ-3 · индивидуальное локальное исследование","Lancer mon audit gratuit":"Начать бесплатный аудит","Audit initial offert":"Первичный аудит включён","Périmètre contractuel clair":"Чёткий объём договора","Rapport mensuel inclus":"Ежемесячный отчёт включён","Sans engagement minimum":"Без минимального срока обязательств","Méthodologie exclusive":"Эксклюзивная методология","Le processus en 7 phases":"Процесс из 7 этапов"
  },
  ar: {
    "Restaurant / Bar":"مطعم / بار","Hôtel / Spa":"فندق / سبا","Santé / Médecin":"الصحة / طبيب","Avocat / Notaire":"محامٍ / موثق","Immobilier":"العقارات","Artisan / BTP":"حرفي / إنشاءات","Beauté / Bien-être":"الجمال / العافية","Autre commerce":"نشاط تجاري آخر",
    "Petite ville":"مدينة صغيرة","Ville moyenne":"مدينة متوسطة","Grande ville":"مدينة كبيرة","Métropole":"منطقة حضرية كبرى","mots-clés principaux":"كلمات مفتاحية رئيسية","Absent de Maps":"غير موجود على Maps","Fiche non créée ou invisible":"الملف غير منشأ أو غير ظاهر","Hors Top 20":"خارج أفضل 20","Très peu visible":"ظهور محدود جدًا","Position 4 – 10":"الترتيب 4–10","Visible mais pas dans le Pack":"ظاهر ولكن خارج الحزمة المحلية",
    "SIMULATION EN DIRECT":"محاكاة مباشرة","RECHERCHE CIBLE":"البحث المستهدف","POSITION ACTUELLE":"الترتيب الحالي","VISIBILITÉ À CONSTRUIRE":"يلزم بناء الظهور","SIGNAL À RENFORCER":"يلزم تعزيز الإشارات","POSITIONNEMENT À DÉVELOPPER":"يلزم تحسين الترتيب",
    "Configurateur de projet":"مُهيّئ المشروع","Estimez votre investissement Google Maps":"قدّر استثمارك في Google Maps","Votre secteur d'activité":"مجال نشاطك","Taille de votre ville":"حجم مدينتك","Nombre de mots-clés principaux":"عدد الكلمات المفتاحية الرئيسية","Votre positionnement actuel sur Google Maps":"ترتيبك الحالي على Google Maps",
    "Budget indicatif · à partir de 990 € / an":"ميزانية تقديرية · ابتداءً من 990 € سنويًا","Estimation indicative · tarif exact après audit personnalisé":"تقدير أولي · السعر الدقيق بعد التدقيق المخصص","Objectif Top 3 · étude locale sur mesure":"هدف أفضل 3 · دراسة محلية مخصصة","Lancer mon audit gratuit":"ابدأ التدقيق المجاني","Audit initial offert":"التدقيق الأولي مشمول","Périmètre contractuel clair":"نطاق تعاقدي واضح","Rapport mensuel inclus":"تقرير شهري مشمول","Sans engagement minimum":"دون حد أدنى للالتزام","Méthodologie exclusive":"منهجية حصرية","Le processus en 7 phases":"العملية في 7 مراحل"
  }
};
function translateMaps(value: string, lang: string) { return MAPS_TRANSLATIONS[lang]?.[value] ?? value; }

/* ── Sector options ── */
const SECTORS = [
  { id: "resto", icon: "🍽️", label: "Restaurant / Bar" },
  { id: "hotel", icon: "🏨", label: "Hôtel / Spa" },
  { id: "sante", icon: "⚕️", label: "Santé / Médecin" },
  { id: "juridique", icon: "⚖️", label: "Avocat / Notaire" },
  { id: "immo", icon: "🏠", label: "Immobilier" },
  { id: "artisan", icon: "🔨", label: "Artisan / BTP" },
  { id: "beaute", icon: "💆", label: "Beauté / Bien-être" },
  { id: "autre", icon: "💼", label: "Autre commerce" },
];

/* ── City size options ── */
const CITY_SIZES = [
  { id: "small", label: "Petite ville", sub: "< 50 000 hab.", multiplier: 1.0 },
  { id: "medium", label: "Ville moyenne", sub: "50 000 – 150 000", multiplier: 1.3 },
  { id: "large", label: "Grande ville", sub: "150 000 – 500 000", multiplier: 1.6 },
  { id: "metro", label: "Métropole", sub: "500 000+", multiplier: 2.1 },
];

/* ── Keywords volume options ── */
const KEYWORD_RANGES = [
  { id: "k1", label: "1 à 3", sub: "mots-clés principaux", factor: 1.0 },
  { id: "k2", label: "4 à 6", sub: "mots-clés principaux", factor: 1.25 },
  { id: "k3", label: "7 à 10", sub: "mots-clés principaux", factor: 1.55 },
];

/* ── Current ranking options ── */
const CURRENT_RANKS = [
  { id: "absent", label: "Absent de Maps", sub: "Fiche non créée ou invisible", penalty: 1.15 },
  { id: "below20", label: "Hors Top 20", sub: "Très peu visible", penalty: 1.08 },
  { id: "4to10", label: "Position 4 – 10", sub: "Visible mais pas dans le Pack", penalty: 1.0 },
];

/* ── 7-Phase methodology ── */
const PHASES = [
  { num: "01", name: "Analyse Initiale", title: "Diagnostic de présence", desc: "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles." },
  { num: "02", name: "Audit Concurrentiel", title: "Décryptage du TOP 3", desc: "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité." },
  { num: "03", name: "Stratégie Ciblée", title: "Mots-clés & Zones", desc: "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires." },
  { num: "04", name: "Optimisation GBP", title: "Restructuration Pro", desc: "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services." },
  { num: "05", name: "Autorité Locale", title: "Signaux & Citations NAP", desc: "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale." },
  { num: "06", name: "Pilotage Actif", title: "Veille & Ajustements", desc: "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients." },
  { num: "07", name: "Résultats & ROI", title: "Mesure transparente", desc: "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire." },
];

/* ── Animated price counter ── */
function useAnimatedPrice(target: number, duration = 500) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/* ── Selector Button ── */
function SelectorBtn({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center text-xs transition-all duration-200",
        selected
          ? "border-[var(--xr-ink)] bg-[var(--xr-accent-soft)] text-[var(--xr-ink)] shadow-sm ring-1 ring-[var(--xr-ink)]/15"
          : "border-border bg-card/60 text-muted-foreground hover:border-[var(--xr-ink)]/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function MapsSimulator() {
  const { price: formatPrice, lang } = useLang();
  const tx = (value: string) => translateMaps(value, lang);

  const [sector, setSector] = useState(SECTORS[0].id);
  const [citySize, setCitySize] = useState(CITY_SIZES[0].id);
  const [keywords, setKeywords] = useState(KEYWORD_RANGES[0].id);
  const [rank, setRank] = useState(CURRENT_RANKS[0].id);

  /* ── Dynamic price calculation ── */
  const { priceMin, priceMax } = useMemo(() => {
    const base = 990;
    const sizeMul = CITY_SIZES.find((c) => c.id === citySize)?.multiplier ?? 1;
    const kwFactor = KEYWORD_RANGES.find((k) => k.id === keywords)?.factor ?? 1;
    const rankPenalty = CURRENT_RANKS.find((r) => r.id === rank)?.penalty ?? 1;
    const raw = base * sizeMul * kwFactor * rankPenalty;
    return {
      priceMin: Math.round(raw / 100) * 100,
      priceMax: Math.round((raw * 1.45) / 100) * 100,
    };
  }, [citySize, keywords, rank]);

  const animMin = useAnimatedPrice(priceMin);
  const animMax = useAnimatedPrice(priceMax);

  const selectedSector = SECTORS.find((s) => s.id === sector);

  const waPrefill = encodeURIComponent(
    `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.\n\n` +
    `• Secteur : ${selectedSector?.label}\n` +
    `• Taille de ville : ${CITY_SIZES.find((c) => c.id === citySize)?.label}\n` +
    `• Mots-clés : ${KEYWORD_RANGES.find((k) => k.id === keywords)?.label}\n` +
    `• Position actuelle : ${CURRENT_RANKS.find((r) => r.id === rank)?.label}\n\n` +
    `Référence de départ : à partir de 990 € / an · devis sur mesure\n\n` +
    `Pouvons-nous lancer l'audit personnalisé ?`
  );

  return (
    <section id="maps" className="xr-section-elevated relative border-y xr-line py-20 sm:py-28 lg:py-32">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div>
          <SectionHeading
            label={{ fr: "GOOGLE BUSINESS PROFILE · LOCAL SEO", en: "GOOGLE BUSINESS PROFILE · LOCAL SEO", vi: "GOOGLE BUSINESS PROFILE · LOCAL SEO" }}
            line1={{ fr: "Construisons votre visibilité", en: "Build your local visibility", vi: "Xây dựng khả năng hiển thị địa phương", ru: "Повысим вашу видимость", ar: "لنبنِ ظهورك" }}
            line2={{
              fr: "sur Google Maps, sur mesure.",
              en: "on Google Maps, built around you.",
              vi: "trên Google Maps, theo nhu cầu của bạn.",
              ru: "в Google Maps с учётом ваших задач.",
              ar: "على Google Maps بما يناسبك.",
            }}
            lead={{
              fr: "À partir de 990 € / an. Audit, optimisation Google Business Profile, stratégie locale et suivi adaptés à votre zone, votre concurrence et vos requêtes.",
              en: "From €990 / year. Audit, Google Business Profile optimisation, local strategy and monitoring adapted to your area, competition and target searches.",
              vi: "Từ 990 € / năm. Kiểm toán, tối ưu Google Business Profile, chiến lược địa phương và theo dõi theo khu vực, đối thủ và truy vấn mục tiêu.",
              ru: "От 990 € в год. Аудит, оптимизация Google Business Profile, локальная стратегия и мониторинг с учётом района, конкурентов и запросов.",
              ar: "ابتداءً من 990 € سنويًا. تدقيق وتحسين Google Business Profile واستراتيجية محلية ومتابعة وفق منطقتك ومنافسيك وطلبات البحث.",
            }}
          />

          {/* ── Exclusivity Badge — very visible ── */}
          <Reveal delay={80}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-5 py-3.5 shadow-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-black shadow-sm"><svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google" role="img"><path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"/><path fill="#34A853" d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z"/><path fill="#FBBC05" d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z"/><path fill="#EA4335" d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"/></svg></span>
              <Zap className="h-5 w-5 shrink-0 text-[var(--xr-bg)]" />
              <p className="text-sm font-semibold text-foreground leading-snug">
                {tx("à partir de 990 € / an · objectif Top 3 sans garantie de position")}
              </p>
              <Award className="h-5 w-5 shrink-0 text-[var(--xr-ink)]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <div className="overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] text-[var(--xr-ink)] shadow-[var(--xr-shadow)]">
            <div className="flex items-center justify-between border-b xr-line bg-[var(--xr-surface)] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--xr-accent-soft)]"><MapPinned className="h-4 w-4 text-[var(--xr-ink)]"/></span>
                <div>
                  <span className="label-mono text-[6px] tracking-[.18em] xr-muted-2">{tx("SIMULATION EN DIRECT")}</span>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--xr-ink)]">{tx(selectedSector?.label ?? "")} · {tx(CITY_SIZES.find(c=>c.id===citySize)?.label ?? "")}</p>
                </div>
              </div>
              <span className="rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-1.5 label-mono text-[6px] xr-muted">LOCAL PACK</span>
            </div>
            <div className="xr-maps-stage relative h-[330px] overflow-hidden bg-[#efeee9] sm:h-[390px]">
              <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(76,78,72,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(76,78,72,.10)_1px,transparent_1px)] [background-size:30px_30px]"/>
              <svg aria-hidden="true" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                <g fill="none" stroke="#d9d6ce" strokeWidth="34" strokeLinecap="round">
                  <path d="M-80 110 C180 65 250 205 470 175 S780 45 1280 130"/>
                  <path d="M-40 410 C170 330 270 420 430 360 S790 300 1260 440"/>
                  <path d="M250 -60 C300 100 250 230 330 590"/>
                  <path d="M650 -40 C590 120 710 210 660 570"/>
                  <path d="M990 -40 C900 90 1020 230 930 570"/>
                  <path d="M-40 255 C220 220 350 275 530 250 S880 205 1260 260"/>
                </g>
                <g fill="none" stroke="#fff" strokeWidth="23" strokeLinecap="round">
                  <path d="M-80 110 C180 65 250 205 470 175 S780 45 1280 130"/>
                  <path d="M-40 410 C170 330 270 420 430 360 S790 300 1260 440"/>
                  <path d="M250 -60 C300 100 250 230 330 590"/>
                  <path d="M650 -40 C590 120 710 210 660 570"/>
                  <path d="M990 -40 C900 90 1020 230 930 570"/>
                  <path d="M-40 255 C220 220 350 275 530 250 S880 205 1260 260"/>
                </g>
                <g fill="#d8e0d6" stroke="#fff" strokeWidth="3">
                  <rect x="65" y="155" width="115" height="58" rx="9"/>
                  <rect x="410" y="35" width="125" height="65" rx="9"/>
                  <rect x="765" y="175" width="125" height="62" rx="9"/>
                  <rect x="400" y="410" width="150" height="55" rx="9"/>
                  <rect x="1035" y="300" width="110" height="65" rx="9"/>
                </g>
              </svg>
              {[["34%","34%","#252525","01"],["51%","48%","#686761","02"],["67%","30%","#a3a198","03"]].map(([left,top,bg,num])=>
                <div key={num} className="absolute" style={{left,top}}>
                  <div className="grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[var(--pin)] shadow-[0_14px_32px_-10px_rgba(18,19,22,.55)] ring-1 ring-black/10" style={{ left: 0, top: 0, background: bg }}>
                    <span className="text-[8px] font-black text-white">{num}</span>
                  </div>
                </div>
              )}
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-6 sm:right-6">
                <div className="rounded-xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-xl">
                  <span className="label-mono text-[5px] tracking-[.16em] text-[#17181a]/40">{tx("RECHERCHE CIBLE")}</span>
                  <p className="mt-1 text-[10px] font-semibold text-[#17181a]">{tx(selectedSector?.label ?? "")} · {KEYWORD_RANGES.find(k=>k.id===keywords)?.label} {tx("mots-clés principaux")}</p>
                </div>
                <div className="hidden rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-right shadow-lg backdrop-blur-xl sm:block">
                  <span className="label-mono text-[5px] tracking-[.16em] text-[#17181a]/40">{tx("POSITION ACTUELLE")}</span>
                  <p className="mt-1 text-[10px] font-semibold text-[#17181a]">{tx(CURRENT_RANKS.find(r=>r.id===rank)?.label ?? "")}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-2 label-mono text-[5px] tracking-[.14em] text-[#17181a]/48 shadow-lg backdrop-blur-xl sm:left-6">
                {rank === "absent" ? tx("VISIBILITÉ À CONSTRUIRE") : rank === "below20" ? tx("SIGNAL À RENFORCER") : tx("POSITIONNEMENT À DÉVELOPPER")}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Intelligent Configurator ── */}
        <Reveal delay={60}>
          <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
            {/* Configurator header */}
            <div className="border-b border-border/60 bg-accent/20 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--xr-ink)] text-[var(--xr-bg)]">
                  <Gauge className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{tx("Configurateur de projet")}</p>
                  <p className="display-serif text-lg text-foreground mt-0.5">
                    {tx("Estimez votre investissement Google Maps")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Step 1 — Sector */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">1</span>
                  Votre secteur d'activité
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SECTORS.map((s) => (
                    <SelectorBtn
                      key={s.id}
                      selected={sector === s.id}
                      onClick={() => setSector(s.id)}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-[11px] leading-tight">{tx(s.label)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 2 — City Size */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">2</span>
                  Taille de votre ville
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CITY_SIZES.map((c) => (
                    <SelectorBtn
                      key={c.id}
                      selected={citySize === c.id}
                      onClick={() => setCitySize(c.id)}
                    >
                      <Building2 className="h-4 w-4" />
                      <span className="font-semibold text-[12px]">{tx(c.label)}</span>
                      <span className="text-[10px] opacity-60">{c.sub}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 3 — Keywords */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">3</span>
                  Nombre de mots-clés principaux
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {KEYWORD_RANGES.map((k) => (
                    <SelectorBtn
                      key={k.id}
                      selected={keywords === k.id}
                      onClick={() => setKeywords(k.id)}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="font-bold text-base">{k.label}</span>
                      <span className="text-[10px] opacity-60">{tx(k.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 4 — Current Ranking */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">4</span>
                  Votre positionnement actuel sur Google Maps
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {CURRENT_RANKS.map((r) => (
                    <SelectorBtn
                      key={r.id}
                      selected={rank === r.id}
                      onClick={() => setRank(r.id)}
                    >
                      <MapPinned className="h-4 w-4" />
                      <span className="font-semibold text-[12px] leading-tight">{tx(r.label)}</span>
                      <span className="text-[10px] opacity-60 leading-tight">{tx(r.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* ── Dynamic Price Result ── */}
              <div className="rounded-2xl border-2 border-primary/30 bg-[var(--xr-ink)]/5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="label-mono text-xs text-muted-foreground">{tx("Budget indicatif · à partir de 990 € / an")}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        key={animMin}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMin)}
                      </span>
                      <span className="display-serif text-xl text-[var(--xr-ink)]/60">–</span>
                      <span
                        key={animMax}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMax)}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">/ an</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground/70">
                      {tx("Estimation indicative · tarif exact après audit personnalisé")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    {/* Guarantee badge */}
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-3 py-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] font-bold text-[var(--xr-ink)]">
                        {tx("Objectif Top 3 · étude locale sur mesure")}
                      </span>
                    </div>
                    <a
                      href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-2.5 text-xs font-semibold text-[var(--xr-bg)] transition-all duration-200 hover:bg-[var(--xr-ink)]/90 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      Lancer mon audit gratuit
                    </a>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--xr-ink)]/20 pt-4">
                  {[
                    { icon: CheckCircle2, text: tx("Audit initial offert") },
                    { icon: CheckCircle2, text: tx("Périmètre contractuel clair") },
                    { icon: CheckCircle2, text: tx("Rapport mensuel inclus") },
                    { icon: CheckCircle2, text: tx("Sans engagement minimum") },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 7-Phase Methodology ── */}
        <Reveal delay={80}>
          <div>
            <div className="mb-8 text-center">
              <p className="label-mono text-xs text-[var(--xr-ink)]">{tx("Méthodologie exclusive")}</p>
              <h3 className="display-serif mt-2 text-2xl sm:text-3xl text-foreground">
                Le processus en 7 phases
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.slice(0, 4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--xr-ink)]/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {tx(ph.name)}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{tx(ph.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ph.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {PHASES.slice(4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--xr-ink)]/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {tx(ph.name)}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{tx(ph.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
