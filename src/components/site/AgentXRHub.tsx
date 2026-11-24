import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Camera,
  Car,
  Check,
  CheckCircle2,
  Compass,
  Database,
  Edit3,
  ExternalLink,
  FileText,
  Flower2,
  Gauge,
  Gem,
  Globe2,
  GraduationCap,
  Hammer,
  Hotel,
  Laptop,
  MapPin,
  MapPinned,
  MessageCircle,
  Monitor,
  MoreHorizontal,
  Palette,
  Plane,
  Plus,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { XR_SECTOR_PHOTOS } from "@/lib/photography";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";
import {
  QUOTE_UI,
  SECTORS_DATA,
  SERVICES_DATA,
  SITUATIONS_DATA,
  STEP_SUBTITLES,
  STEP_TITLES,
} from "@/lib/quote-i18n";
import {
  calculateMapsTop3Estimate,
  MAPS_COMPETITION_LEVELS,
  MAPS_GEO_SCOPES,
  MAPS_GOALS,
  MAPS_KEYWORD_VOLUMES,
  MAPS_MANAGEMENT_TIERS,
  MAPS_POPULATIONS,
  MAPS_PRESENCE_STATES,
  MAPS_SECTORS,
  type MapsCompetitionId,
  type MapsGeoScopeId,
  type MapsGoalId,
  type MapsKeywordVolumeId,
  type MapsPopulationId,
  type MapsPresenceId,
} from "@/lib/maps-pricing";
import { useOptionalFunnel } from "@/lib/funnel";

type HubMode = "devis" | "audit" | "guided";
type AuditType = "design" | "seo" | "security" | "conversion" | "technical";
type Choice = { id: string; label: string; detail: string };
type ProposalItem = {
  id: string;
  label: string;
  detail: string;
  price: number;
  maxPrice?: number;
  period: "once" | "month" | "year";
  isFromEstimate?: boolean;
  isQuoteOnly?: boolean;
  checkoutId?: string;
  commitment?: string;
  commitmentMonths?: number;
  factors?: string[];
};

const SERVICE_ORDER: Record<string, string[]> = {
  restaurant: [
    "website",
    "maps_top3",
    "maps_management",
    "social",
    "seo",
    "branding",
    "maintenance",
    "robotics",
  ],
  hospitality: [
    "website",
    "maps_top3",
    "maps_management",
    "seo",
    "social",
    "branding",
    "maintenance",
    "robotics",
  ],
  realestate: [
    "website",
    "maps_top3",
    "branding",
    "seo",
    "maps_management",
    "social",
    "maintenance",
    "robotics",
  ],
  automotive: [
    "website",
    "maps_top3",
    "maps_management",
    "conversion",
    "seo",
    "content",
    "maintenance",
    "robotics",
  ],
  beauty: [
    "website",
    "maps_top3",
    "maps_management",
    "social",
    "seo",
    "branding",
    "maintenance",
    "robotics",
  ],
  health: ["website", "maps_top3", "maps_management", "seo", "branding", "maintenance", "robotics"],
  construction: [
    "website",
    "maps_top3",
    "maps_management",
    "seo",
    "branding",
    "maintenance",
    "robotics",
  ],
  events: ["website", "social", "branding", "maps_top3", "seo", "maintenance", "robotics"],
  education: ["website", "seo", "robotics", "social", "branding", "maps_top3", "maintenance"],
  other: [
    "website",
    "maps_top3",
    "maps_management",
    "branding",
    "seo",
    "social",
    "maintenance",
    "robotics",
  ],
};

const SECTOR_TO_MAPS_ID: Record<string, string> = {
  restaurant: "restaurant",
  hospitality: "hospitality",
  realestate: "realestate",
  beauty: "beauty",
  health: "dental",
  legal: "legal",
  construction: "locksmith",
  commerce: "retail",
};

const SECTOR_SHORT_LABELS: Record<string, Record<Lang, string>> = {
  health: {
    fr: "Cliniques & Santé",
    en: "Clinics & Health",
    vi: "Phòng khám & Y tế",
    ar: "العيادات والصحة",
    ru: "Клиники",
  },
  realestate: {
    fr: "Immobilier",
    en: "Real Estate",
    vi: "Bất động sản",
    ar: "العقارات",
    ru: "Недвижимость",
  },
  hospitality: { fr: "Hôtels", en: "Hotels", vi: "Khách sạn", ar: "الفنادق", ru: "Отели" },
  construction: {
    fr: "Construction",
    en: "Construction",
    vi: "Xây dựng",
    ar: "البناء",
    ru: "Строительство",
  },
  restaurant: {
    fr: "Restaurants",
    en: "Restaurants",
    vi: "Nhà hàng",
    ar: "المطاعم",
    ru: "Рестораны",
  },
  automotive: { fr: "Automobile", en: "Automotive", vi: "Ô tô", ar: "السيارات", ru: "Авто" },
  events: { fr: "Événementiel", en: "Events", vi: "Sự kiện", ar: "الفعاليات", ru: "События" },
  education: { fr: "Éducation", en: "Education", vi: "Giáo dục", ar: "التعليم", ru: "Образование" },
  beauty: {
    fr: "Bien-être & Spa",
    en: "Wellness & Spa",
    vi: "Làm đẹp",
    ar: "السبا",
    ru: "Спа и красота",
  },
  fashion: { fr: "Mode", en: "Fashion", vi: "Thời trang", ar: "الأزياء", ru: "Мода" },
  jewelry: { fr: "Joaillerie", en: "Jewelry", vi: "Trang sức", ar: "المجوهرات", ru: "Ювелирка" },
  architecture: {
    fr: "Architecture",
    en: "Architecture",
    vi: "Kiến trúc",
    ar: "العمارة",
    ru: "Архитектура",
  },
  legal: { fr: "Juridique", en: "Legal", vi: "Pháp lý", ar: "القانون", ru: "Право" },
  finance: { fr: "Finance", en: "Finance", vi: "Tài chính", ar: "المالية", ru: "Финансы" },
  commerce: { fr: "Commerce", en: "Retail", vi: "Bán lẻ", ar: "التجارة", ru: "Ритейл" },
  tourism: { fr: "Tourisme", en: "Tourism", vi: "Du lịch", ar: "السياحة", ru: "Туризм" },
  agency: { fr: "Studio / Agence", en: "Agency", vi: "Agency", ar: "وكالة", ru: "Агентство" },
  other: {
    fr: "Autre secteur",
    en: "Other industry",
    vi: "Lĩnh vực khác",
    ar: "نشاط آخر",
    ru: "Другая сфера",
  },
};

const SECTOR_ICONS: Record<string, typeof Utensils> = {
  restaurant: Utensils,
  hospitality: Hotel,
  realestate: Building2,
  tourism: Plane,
  beauty: Flower2,
  health: Stethoscope,
  automotive: Car,
  events: Sparkles,
  education: GraduationCap,
  fashion: ShoppingBag,
  jewelry: Gem,
  architecture: Compass,
  construction: Hammer,
  legal: Scale,
  finance: TrendingUp,
  commerce: ShoppingBag,
  agency: Sparkles,
  other: MoreHorizontal,
};

const CHOICE_ICONS: Record<string, typeof Sparkles> = {
  website: Monitor,
  branding: Palette,
  seo: Search,
  maps_top3: MapPinned,
  maps_management: Building2,
  social: Users,
  content: Camera,
  conversion: Zap,
  maintenance: ShieldCheck,
  robotics: Bot,
};

type ParamScreenId =
  | "maps_zone"
  | "maps_market"
  | "maps_keywords"
  | "maps_mgmt"
  | "web_scope"
  | "seo_scope"
  | "social_scope"
  | "branding_scope"
  | "webcare_scope"
  | "ai_scope";

export function AgentXRHub() {
  const { lang } = useLang();
  const currentLang = (lang in QUOTE_UI.kicker ? lang : "fr") as Lang;
  const isEn = currentLang === "en";

  const funnel = useOptionalFunnel();

  // Unified hub mode: Option 1 (devis), Option 2 (audit), Option 3 (guided)
  const [hubMode, setHubMode] = useState<HubMode>("devis");

  // Detect URL hash / query parameters so both /#quote, /#audit & /?service=...#quote work naturally
  useEffect(() => {
    const syncFromUrl = () => {
      if (window.location.hash === "#audit") {
        setHubMode("audit");
      } else if (window.location.hash === "#quote" || window.location.search.includes("service=")) {
        setHubMode("devis");
      }
    };
    syncFromUrl();
    window.addEventListener("hashchange", syncFromUrl);
    return () => window.removeEventListener("hashchange", syncFromUrl);
  }, []);

  /* ─────────────── OPTION 1: BESPOKE QUOTE STATE ─────────────── */
  const journeyRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // 0: Sector, 1: Situation, 2: Goal, 3: Services, 4: Conditional Params, 5: Proposal, 6: Recap, 7: Contact/PDF
  const [paramIdx, setParamIdx] = useState(0);
  const [stepValidationMsg, setStepValidationMsg] = useState("");

  const [sectorId, setSectorId] = useState(() => funnel?.sector || "health");
  const [customSector, setCustomSector] = useState("");
  const [customActivityNote, setCustomActivityNote] = useState("");
  const [showAllSectors, setShowAllSectors] = useState(false);

  const [situation, setSituation] = useState("");
  const [goal, setGoal] = useState(() => funnel?.goal || "");
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    const init = funnel?.selectedServices || [];
    return init.map((s) => (s === "maps" ? "maps_top3" : s));
  });

  // Conditional parameters state — Parcours 1: Maps Top 3
  const [mapsSectorId, setMapsSectorId] = useState("restaurant");
  const [mapsCity, setMapsCity] = useState("");
  const [mapsPostal, setMapsPostal] = useState("");
  const [mapsDistrict, setMapsDistrict] = useState("");
  const [mapsPopulation, setMapsPopulation] = useState<MapsPopulationId>("80k_250k");
  const [mapsCompetition, setMapsCompetition] = useState<MapsCompetitionId>("moderate");
  const [mapsPresence, setMapsPresence] = useState<MapsPresenceId>("rank_4_10");
  const [mapsKeywords, setMapsKeywords] = useState<string[]>([]);
  const [mapsKwInput, setMapsKwInput] = useState("");
  const [mapsKwVolume, setMapsKwVolume] = useState<MapsKeywordVolumeId>("1_3");
  const [mapsGeoScope, setMapsGeoScope] = useState<MapsGeoScopeId>("single_city");
  const [mapsGoal, setMapsGoal] = useState<MapsGoalId>("reach_top_3");
  const [mapsAddPostCare, setMapsAddPostCare] = useState(false);

  // Conditional parameters state — Parcours 2 & Other Services
  const [mapsMgmtTier, setMapsMgmtTier] = useState<"essentiel" | "croissance" | "intensif">(
    "croissance",
  );
  const [webTier, setWebTier] = useState<"showcase" | "business" | "ecommerce">("business");
  const [webLanguages, setWebLanguages] = useState<"mono" | "bi" | "intl">("mono");
  const [webContentReady, setWebContentReady] = useState<"ready" | "guided">("guided");
  const [seoTier, setSeoTier] = useState<"foundation" | "growth">("growth");
  const [brandingTier, setBrandingTier] = useState<"starter" | "identity" | "premium">("premium");
  const [socialTier, setSocialTier] = useState<"essential" | "growth" | "signature">("essential");
  const [webcareTier, setWebcareTier] = useState<"essential" | "pro" | "custom">("pro");
  const [webcareIncludeInfra, setWebcareIncludeInfra] = useState(true);
  const [aiFocus, setAiFocus] = useState<"crm_custom" | "agents" | "integrations" | "korben">(
    "crm_custom",
  );

  const [client, setClient] = useState({
    company: "",
    name: "",
    email: "",
    whatsapp: "",
    website: "",
  });
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [paying, setPaying] = useState(false);
  const [acceptCommitments, setAcceptCommitments] = useState(false);

  useEffect(() => {
    if (funnel?.sector && sectorId !== funnel.sector) {
      setSectorId(funnel.sector);
      setMapsSectorId(SECTOR_TO_MAPS_ID[funnel.sector] ?? "other");
    }
  }, [funnel?.sector, sectorId]);

  useEffect(() => {
    if (funnel?.selectedServices?.length && selectedServices.length === 0) {
      setSelectedServices(funnel.selectedServices.map((s) => (s === "maps" ? "maps_top3" : s)));
    }
  }, [funnel?.selectedServices, selectedServices.length]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    const aliasMap: Record<string, string> = {
      ecommerce: "website",
      websites: "website",
      maps: "maps_top3",
      maps_top3: "maps_top3",
      maps_management: "maps_management",
      webcare: "maintenance",
      robotique: "robotics",
      crm: "robotics",
    };
    const normalized = requested ? (aliasMap[requested] ?? requested) : null;
    if (normalized && SERVICES_DATA.some((x) => x.id === normalized)) {
      if (requested === "ecommerce") setWebTier("ecommerce");
      if (requested === "crm" || requested === "robotique") setAiFocus("crm_custom");
      setHubMode("devis");
      setSelectedServices((cur) => (cur.includes(normalized) ? cur : [normalized]));
      setParamIdx(0);
      setStep(4);
    }
  }, []);

  /* ─────────────── OPTION 2: DIGITAL & ACTIVITY AUDIT STATE ─────────────── */
  const auditInputRef = useRef<HTMLInputElement>(null);
  const [auditFocus, setAuditFocus] = useState<"site" | "maps" | "full">("site");
  const [auditUrl, setAuditUrl] = useState("");
  const [auditSector, setAuditSector] = useState("restaurant");
  const [auditTypes, setAuditTypes] = useState<AuditType[]>([
    "design",
    "seo",
    "conversion",
    "technical",
  ]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditResult, setAuditResult] = useState<{
    score: number;
    url: string;
    title: string;
    description: string;
    status: number;
    types: AuditType[];
    findings: { label: string; detail: string; status?: boolean }[];
    recommendations: { service: string; reason: string }[];
  } | null>(null);

  /* ─────────────── OPTION 3: GUIDED DISCOVERY STATE ─────────────── */
  const [guidedStep, setGuidedStep] = useState<0 | 1 | 2 | 3>(0);
  const [guidedGoal, setGuidedGoal] = useState("");
  const [guidedStage, setGuidedStage] = useState("");
  const [guidedTempo, setGuidedTempo] = useState("");

  const SECTORS = useMemo(
    () =>
      SECTORS_DATA.map((s) => ({
        id: s.id,
        label: s.label[currentLang] ?? s.label.fr,
        shortLabel: SECTOR_SHORT_LABELS[s.id]?.[currentLang] ?? s.label[currentLang] ?? s.label.fr,
        detail: s.detail[currentLang] ?? s.detail.fr,
        goals: s.goals.map((g) => g[currentLang] ?? g.fr),
      })),
    [currentLang],
  );

  const SERVICES = useMemo(
    () =>
      SERVICES_DATA.filter((s) => s.id !== "ads").map((s) => ({
        id: s.id,
        label: s.label[currentLang] ?? s.label.fr,
        detail: s.detail[currentLang] ?? s.detail.fr,
      })),
    [currentLang],
  );

  const SITUATIONS = useMemo(
    () =>
      SITUATIONS_DATA.map((s) => ({
        id: s.id,
        label: s.label[currentLang],
        detail: s.detail[currentLang],
      })),
    [currentLang],
  );

  const sector = SECTORS.find((x) => x.id === sectorId) ?? SECTORS[0];
  const resolvedSectorLabel =
    sectorId === "other" && customSector.trim().length > 0
      ? `Autre : ${customSector.trim()}${customActivityNote.trim() ? ` (${customActivityNote.trim()})` : ""}`
      : sector.label;
  const situationChoice = SITUATIONS.find((x) => x.id === situation);

  // Featured 9 exact sectors requested cleanly in order (Clinics, Real Estate, Hotels, Construction, Restaurants, Automotive, Events, Education, Other)
  const featuredSectorIds = [
    "health",
    "realestate",
    "hospitality",
    "construction",
    "restaurant",
    "automotive",
    "events",
    "education",
    "other",
  ];
  const visibleSectors = showAllSectors
    ? SECTORS
    : (featuredSectorIds
        .map((id) => SECTORS.find((s) => s.id === id))
        .filter(Boolean) as typeof SECTORS);

  const orderedServices = (SERVICE_ORDER[sectorId] ?? SERVICE_ORDER.other)
    .map((id) => SERVICES.find((x) => x.id === id))
    .filter(Boolean) as Choice[];

  const paramScreens: ParamScreenId[] = useMemo(() => {
    const list: ParamScreenId[] = [];
    if (selectedServices.includes("maps_top3"))
      list.push("maps_zone", "maps_market", "maps_keywords");
    if (selectedServices.includes("maps_management")) list.push("maps_mgmt");
    if (selectedServices.includes("website")) list.push("web_scope");
    if (selectedServices.includes("branding")) list.push("branding_scope");
    if (selectedServices.includes("seo")) list.push("seo_scope");
    if (selectedServices.includes("social")) list.push("social_scope");
    if (selectedServices.includes("maintenance")) list.push("webcare_scope");
    if (selectedServices.includes("robotics")) list.push("ai_scope");
    return list;
  }, [selectedServices]);

  useEffect(() => {
    if (paramIdx >= paramScreens.length && paramScreens.length > 0) {
      setParamIdx(paramScreens.length - 1);
    }
  }, [paramIdx, paramScreens.length]);

  const mapsEstimate = useMemo(
    () =>
      calculateMapsTop3Estimate({
        sectorId: mapsSectorId,
        city: mapsCity,
        postalCode: mapsPostal,
        district: mapsDistrict,
        population: mapsPopulation,
        competition: mapsCompetition,
        presence: mapsPresence,
        keywords: mapsKeywords,
        keywordVolume: mapsKwVolume,
        geoScope: mapsGeoScope,
        goal: mapsGoal,
      }),
    [
      mapsSectorId,
      mapsCity,
      mapsPostal,
      mapsDistrict,
      mapsPopulation,
      mapsCompetition,
      mapsPresence,
      mapsKeywords,
      mapsKwVolume,
      mapsGeoScope,
      mapsGoal,
    ],
  );

  const selectedMgmtTier =
    MAPS_MANAGEMENT_TIERS.find((t) => t.id === mapsMgmtTier) ?? MAPS_MANAGEMENT_TIERS[1];

  const activeProposals: ProposalItem[] = useMemo(() => {
    const items: ProposalItem[] = [];
    selectedServices.forEach((id) => {
      if (id === "maps_top3") {
        items.push({
          id: "maps_top3",
          label: isEn
            ? "Google Maps Top 3 SEO (Custom)"
            : "Google Maps Top 3 · Référencement local sur mesure",
          detail: `${mapsCity.trim() || "Zone ciblée"} · ${mapsEstimate.difficultyLabel[currentLang]} (${mapsEstimate.difficultyScore}/100) · Sans garantie fixe`,
          price: mapsEstimate.fromEur,
          maxPrice: mapsEstimate.maxEur,
          period: "once",
          isFromEstimate: true,
          isQuoteOnly: true,
          factors: mapsEstimate.factors.map((f) => f[currentLang]),
        });
      } else if (id === "maps_management") {
        items.push({
          id: "maps_management",
          label: `Google Maps · ${selectedMgmtTier.name[currentLang]}`,
          detail: `${selectedMgmtTier.postsPerMonth} Posts · ${selectedMgmtTier.photosPerMonth} visuels · ${selectedMgmtTier.reviewsPerMonth} avis/mois (100 % à distance)`,
          price: selectedMgmtTier.eurMonth,
          period: "month",
          checkoutId:
            selectedMgmtTier.id === "essentiel"
              ? "maps_essentiel"
              : selectedMgmtTier.id === "croissance"
                ? "maps_croissance"
                : "maps_intensif",
          commitment: isEn ? "Monthly remote management" : "Abonnement mensuel à distance",
        });
      } else if (id === "website") {
        const base = webTier === "ecommerce" ? 1499 : webTier === "business" ? 799 : 499;
        const hasLanguageScope = webLanguages !== "mono";
        const label =
          webTier === "ecommerce"
            ? isEn
              ? "E-commerce & Booking Website"
              : "Site E-commerce & Réservation"
            : webTier === "business"
              ? isEn
                ? "Business Custom Website"
                : "Site Business Sur-Mesure"
              : isEn
                ? "Signature Showcase Website"
                : "Site Vitrine Pro";
        items.push({
          id: "website",
          label,
          detail:
            (webTier === "ecommerce"
              ? "Boutique, paiement Stripe & tunnel"
              : webTier === "business"
                ? "5+ pages éditoriales, analytics & conversion"
                : "Jusqu'à 3 pages responsives, contact & SEO") +
            (hasLanguageScope
              ? ` + Multilingue (${webLanguages === "intl" ? "3+" : "2"} langues, complément sur devis)`
              : ""),
          price: base,
          period: "once",
          checkoutId:
            webTier === "ecommerce"
              ? undefined
              : webTier === "business"
                ? "website_business"
                : "website_showcase",
          isQuoteOnly: webTier === "ecommerce" || hasLanguageScope,
        });
      } else if (id === "branding") {
        const p = brandingTier === "premium" ? 399 : brandingTier === "identity" ? 299 : 199;
        items.push({
          id: "branding",
          label:
            brandingTier === "premium"
              ? "Full Brand Suite"
              : brandingTier === "identity"
                ? "Brand Identity Kit"
                : "Logo Signature",
          detail:
            brandingTier === "premium"
              ? "Brand Book, papeterie, signatures et droits cédés"
              : brandingTier === "identity"
                ? "Logo, palette, typographies et modèles pour réseaux sociaux"
                : "Logo vectoriel, déclinaisons et fichiers maîtres",
          price: p,
          period: "once",
          checkoutId:
            brandingTier === "premium"
              ? "branding_full"
              : brandingTier === "identity"
                ? "branding_identity"
                : "branding_logo",
        });
      } else if (id === "seo") {
        const p = seoTier === "growth" ? 499 : 299;
        items.push({
          id: "seo",
          label: `SEO · ${seoTier === "growth" ? "Growth" : "Starter"}`,
          detail:
            seoTier === "growth"
              ? "SEO Starter inclus, contenu mensuel et reporting"
              : "Audit, mots-clés et optimisations on-page",
          price: p,
          period: "month",
          checkoutId: seoTier === "growth" ? "seo_growth" : "seo_starter",
        });
      } else if (id === "social") {
        const commitmentMonths = socialTier === "essential" ? 3 : 6;
        const p = socialTier === "signature" ? 799 : socialTier === "growth" ? 599 : 349;
        items.push({
          id: "social",
          label: `Social Media · ${socialTier === "signature" ? "Domination Sociale" : socialTier === "growth" ? "Croissance Active" : "Présence Essentielle"}`,
          detail: "Calendrier éditorial, publications et animation selon la formule sélectionnée",
          price: p,
          period: "month",
          checkoutId:
            socialTier === "signature"
              ? "social_domination"
              : socialTier === "growth"
                ? "social_growth"
                : "social_essential",
          commitment: isEn
            ? `Minimum commitment: ${commitmentMonths} months`
            : `Engagement minimum de ${commitmentMonths} mois`,
          commitmentMonths,
        });
      } else if (id === "maintenance") {
        const p = webcareTier === "custom" ? 99 : webcareTier === "pro" ? 49 : 29;
        items.push({
          id: "maintenance",
          label: `WebCare ${webcareTier === "custom" ? "Unlimited" : webcareTier === "pro" ? "Business" : "Essentiel"}`,
          detail:
            "Mises à jour sécurisées, sauvegardes cloud, surveillance et support selon la formule",
          price: p,
          period: "month",
          checkoutId:
            webcareTier === "custom"
              ? "webcare_unlimited"
              : webcareTier === "pro"
                ? "webcare_business"
                : "webcare_essential",
        });
        if (webcareIncludeInfra) {
          items.push({
            id: "webcare_infrastructure",
            label: "Hébergement + nom de domaine",
            detail: "Renouvellement annuel séparé · 79 €/an · confirmé dans le devis final",
            price: 79,
            period: "year",
            isFromEstimate: true,
            isQuoteOnly: true,
          });
        }
      } else if (id === "robotics") {
        const isKorben = aiFocus === "korben";
        const isCrm = aiFocus === "crm_custom";
        items.push({
          id: "robotics",
          label: isCrm
            ? "CRM Personnalisé Sur-Mesure"
            : isKorben
              ? "Robotique Autonome Korben"
              : "Automatisations IA & Agents",
          detail: isCrm
            ? "Pipeline métier, relances automatiques & options développées sur cahier des charges"
            : isKorben
              ? "Location dès 499 €/m ou achat 8–21 K€ HT sur étude de site"
              : "Agents conversationnels, qualification leads & connexions outils — sur devis",
          price: isKorben ? 499 : 2000,
          period: isKorben ? "month" : "once",
          isFromEstimate: true,
          isQuoteOnly: true,
        });
      } else {
        const meta = SERVICES.find((s) => s.id === id);
        items.push({
          id,
          label: meta?.label || id,
          detail: meta?.detail || "",
          price: id === "content" ? 399 : 299,
          period: "once",
          checkoutId: id,
        });
      }
    });
    return items;
  }, [
    selectedServices,
    currentLang,
    isEn,
    mapsCity,
    mapsEstimate,
    selectedMgmtTier,
    webTier,
    webLanguages,
    brandingTier,
    seoTier,
    socialTier,
    webcareTier,
    webcareIncludeInfra,
    aiFocus,
    SERVICES,
  ]);

  const onceFixed = activeProposals.reduce(
    (s, p) => s + (!p.isFromEstimate && p.period === "once" ? p.price : 0),
    0,
  );
  const onceFromCustom = activeProposals.reduce(
    (s, p) => s + (p.isFromEstimate && p.period === "once" ? p.price : 0),
    0,
  );
  const monthlyTotal = activeProposals.reduce(
    (s, p) => s + (p.period === "month" ? p.price : 0),
    0,
  );
  const annualTotal = activeProposals.reduce((s, p) => s + (p.period === "year" ? p.price : 0), 0);
  const hasCheckoutableFixedItems =
    activeProposals.length > 0 && activeProposals.every((p) => !p.isQuoteOnly && p.checkoutId);
  const hasMinimumCommitment = activeProposals.some((p) => (p.commitmentMonths ?? 0) > 0);

  const goToStep = (next: number) => {
    setStepValidationMsg("");
    setStep(next);
    window.setTimeout(
      () => journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      60,
    );
  };

  const handleSectorStepContinue = () => {
    if (sectorId === "other" && customSector.trim().length < 2) {
      setStepValidationMsg(
        isEn
          ? "Please enter your industry before moving to the next step."
          : "Merci de préciser votre secteur d'activité ci-dessus avant de continuer.",
      );
      return;
    }
    goToStep(1);
  };

  const handleNextFromParams = () => {
    if (currentParam === "maps_zone" && mapsCity.trim().length < 2) {
      setStepValidationMsg(
        "Indiquez la ville ciblée (ex : Orléans, Paris, Lyon...) pour calculer un budget juste.",
      );
      return;
    }
    setStepValidationMsg("");
    if (paramIdx < paramScreens.length - 1) setParamIdx((i) => i + 1);
    else goToStep(5);
  };

  const handleBackFromParams = () => {
    setStepValidationMsg("");
    if (paramIdx > 0) setParamIdx((i) => i - 1);
    else goToStep(3);
  };

  const toggleService = (id: string) => {
    setStepValidationMsg("");
    setSelectedServices((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const toggleSuggestedKw = (kw: string) => {
    const clean = `${kw} ${mapsCity.trim()}`.trim();
    const exists = mapsKeywords.some((k) => k.toLowerCase() === clean.toLowerCase());
    setMapsKeywords((prev) =>
      exists ? prev.filter((k) => k.toLowerCase() !== clean.toLowerCase()) : [...prev, clean],
    );
  };

  const addCustomKw = () => {
    const v = mapsKwInput.trim();
    if (!v) return;
    if (!mapsKeywords.some((k) => k.toLowerCase() === v.toLowerCase())) {
      setMapsKeywords((prev) => [...prev, v]);
    }
    setMapsKwInput("");
  };

  const activeMapsSector = MAPS_SECTORS.find((s) => s.id === mapsSectorId) ?? MAPS_SECTORS[0];

  const generatePdf = async () => {
    setSending(true);
    setSendMessage("");
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210,
        M = 14,
        R = 196;
      const ink = [18, 22, 29] as const;
      const soft = [245, 242, 236] as const;
      const lineColor = [220, 214, 204] as const;
      const muted = [92, 100, 112] as const;
      const white = [255, 255, 255] as const;
      const issueDate = new Date();
      const validity = new Date(issueDate);
      validity.setDate(validity.getDate() + 15);
      const stamp = issueDate.toISOString().slice(0, 10).replace(/-/g, "");
      const quoteNumber = "XR-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
      const cleanForPdf = (str: string) =>
        (str || "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\x20-\x7E\xA0-\xFF]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

      doc.setFillColor(...ink);
      doc.rect(0, 0, W, 33, "F");
      doc.setTextColor(...white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("XRAGENCY", M, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text("78 Avenue des Champs-Elysees · 75008 Paris", M, 20);
      doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83", M, 25);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(
        cleanForPdf(isEn ? "CUSTOM COMMERCIAL PROPOSAL" : "ESTIMATION COMMERCIALE SUR MESURE"),
        R,
        13,
        { align: "right" },
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(quoteNumber, R, 19, { align: "right" });
      doc.text(
        `Date : ${issueDate.toLocaleDateString("fr-FR")} · Validite : ${validity.toLocaleDateString("fr-FR")}`,
        R,
        25,
        { align: "right" },
      );

      let y = 44;
      const box = (heading: string) => {
        doc.setFillColor(...soft);
        doc.roundedRect(M, y - 5, W - 2 * M, 9, 2, 2, "F");
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(cleanForPdf(heading).toUpperCase(), M + 3, y + 0.5);
        y += 11;
      };

      box(isEn ? "Client Details" : "Coordonnees du client");
      doc.setFontSize(8.5);
      doc.text(cleanForPdf(`${client.company} — ${client.name}`), M, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      doc.text(
        cleanForPdf(
          `${client.email} · ${client.whatsapp}${client.website ? ` · ${client.website}` : ""}`,
        ),
        M,
        y,
      );
      y += 9;

      box(isEn ? "Project Scope" : "Cadrage & Objectif");
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.text(cleanForPdf(`Secteur : ${resolvedSectorLabel}`), M, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      if (situationChoice) {
        doc.text(cleanForPdf(`Situation : ${situationChoice.label}`), M, y);
        y += 5;
      }
      if (goal) {
        doc.text(cleanForPdf(`Objectif : ${goal}`), M, y);
        y += 5;
      }
      y += 5;

      box(isEn ? "Configured Services & Estimate" : "Prestations configurees & Estimation");
      activeProposals.forEach((p) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        const priceLabel = p.isFromEstimate
          ? `A partir de ${p.price} EUR${p.maxPrice ? ` - ${p.maxPrice} EUR` : ""}`
          : `${p.price} EUR${p.period === "month" ? " / mois" : p.period === "year" ? " / an" : ""}`;
        doc.text(cleanForPdf(p.label), M, y);
        doc.text(cleanForPdf(priceLabel), R, y, { align: "right" });
        y += 4.5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(cleanForPdf(p.detail), W - 2 * M - 10), M, y);
        y += 8;
        doc.setDrawColor(...lineColor);
        doc.line(M, y - 2, R, y - 2);
      });

      y += 4;
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      if (onceFixed > 0) {
        doc.text(cleanForPdf(`Total forfaits fixes : ${onceFixed} EUR`), R, y, { align: "right" });
        y += 5.5;
      }
      if (onceFromCustom > 0) {
        doc.text(cleanForPdf(`Sur mesure (a partir de) : ${onceFromCustom} EUR`), R, y, {
          align: "right",
        });
        y += 5.5;
      }
      if (monthlyTotal > 0) {
        doc.text(cleanForPdf(`Abonnements mensuels : ${monthlyTotal} EUR / mois`), R, y, {
          align: "right",
        });
        y += 5.5;
      }
      if (annualTotal > 0) {
        doc.text(cleanForPdf(`Hébergement & domaine : ${annualTotal} EUR / an`), R, y, {
          align: "right",
        });
        y += 5.5;
      }

      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...muted);
      const paymentTerms = cleanForPdf(
        isEn
          ? "Custom projects: a deposit is due at order; the remaining balance follows milestones stated in the final signed quote."
          : "Projets sur mesure : acompte à la commande ; solde réparti selon les jalons précisés dans le devis final signé.",
      );
      doc.text(doc.splitTextToSize(paymentTerms, W - 2 * M), M, y);
      y += 7;
      const taxTerms = cleanForPdf(
        isEn
          ? "EUR reference prices. VAT treatment is confirmed on the final quote/invoice according to the seller's tax regime and the client's location. International currency conversions are indicative only."
          : "Prix de référence en EUR. TVA confirmée sur le devis ou la facture selon le régime fiscal du prestataire et la localisation du client. Les conversions internationales sont indicatives.",
      );
      doc.text(doc.splitTextToSize(taxTerms, W - 2 * M), M, y);

      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      doc.text("XR Agency · Document indicatif soumis à validation du périmètre final.", M, 286);

      const pdfBase64 = doc.output("datauristring").split(",")[1];
      doc.save(`XRAGENCY-Devis-${quoteNumber}.pdf`);
      setGenerated(true);

      let emailDelivered = false;
      if (client.email) {
        try {
          const emailRes = await fetch("/api/create-checkout", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              action: "send_quote",
              pdfBase64,
              client,
              summary: {
                sector: resolvedSectorLabel,
                goal,
                situation: situationChoice?.label || "",
                recommendation: mapsAddPostCare
                  ? "Inclut suite mensuelle Parcours 2 souhaitée."
                  : "",
                services: activeProposals.map((p) => ({
                  label: p.label,
                  detail: p.detail,
                  price: p.price,
                  period: p.period,
                })),
                once: onceFixed + onceFromCustom,
                monthly: monthlyTotal,
                annual: annualTotal,
              },
            }),
          });
          if (emailRes.ok) emailDelivered = true;
        } catch {
          emailDelivered = false;
        }
      }

      setSendMessage(
        emailDelivered
          ? `Votre pré-devis PDF (${quoteNumber}) a été téléchargé et transmis à ${client.email} ainsi qu'à notre équipe.`
          : QUOTE_UI.pdfGeneratedSuccess[currentLang],
      );
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : QUOTE_UI.pdfError[currentLang]);
    } finally {
      setSending(false);
    }
  };

  const createCheckout = async () => {
    const checkoutIds = activeProposals
      .map((p) => p.checkoutId)
      .filter((id): id is string => Boolean(id));
    if (
      !client.email ||
      !checkoutIds.length ||
      paying ||
      (hasMinimumCommitment && !acceptCommitments)
    )
      return;
    setPaying(true);
    setSendMessage("");
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "checkout",
          sectorId,
          situation: webTier === "ecommerce" ? "selling" : situation,
          budget:
            webTier === "business"
              ? "1000_2500"
              : brandingTier === "premium"
                ? "2500_5000"
                : "500_1000",
          selectedServices: checkoutIds,
          acceptCommitmentTerms: acceptCommitments,
          client,
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url)
        throw new Error(data.error || QUOTE_UI.paymentError[currentLang]);
      window.location.href = data.url;
    } catch (error) {
      setSendMessage(error instanceof Error ? error.message : QUOTE_UI.paymentError[currentLang]);
    } finally {
      setPaying(false);
    }
  };

  /* ─────────────── OPTION 2: RUN AUDIT ─────────────── */
  const runAudit = async (overrideTypes?: AuditType[]) => {
    const activeTypes = overrideTypes ?? auditTypes;
    if (!auditUrl.trim()) {
      setAuditError(
        "Entrez l'adresse de votre site web (ex : monentreprise.fr) pour lancer l'analyse.",
      );
      auditInputRef.current?.focus();
      return;
    }
    setAuditLoading(true);
    setAuditError("");
    setAuditResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          url: auditUrl.trim(),
          types: activeTypes,
          sector: auditSector,
          budget: "1000_2500",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit momentanément indisponible");
      setAuditResult(data);
    } catch (e) {
      setAuditError(e instanceof Error ? e.message : "Erreur d'analyse");
    } finally {
      setAuditLoading(false);
    }
  };

  const makeAuditPdf = () => {
    if (!auditResult) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFillColor(20, 19, 18);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("XRAGENCY · AGENT XR AUDIT", 14, 15);
    doc.setFontSize(9);
    doc.text(`${auditResult.url} — Score : ${auditResult.score}/100`, 14, 23);
    let y = 42;
    doc.setTextColor(20, 19, 18);
    auditResult.findings.forEach((f, idx) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`${idx + 1}. ${f.label}`, 14, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(doc.splitTextToSize(f.detail, 178), 16, y);
      y += 10;
    });
    doc.save("XRAGENCY-Audit-Digital.pdf");
  };

  /* ─────────────── OPTION 3: GUIDED RECOMMENDATION ─────────────── */
  const guidedRecommendation = useMemo(() => {
    if (guidedGoal === "local") {
      return {
        title: "Visibilité Locale & Fiche Google Maps",
        reason:
          "Vous souhaitez attirer des clients autour de vous : le combo Site Web rapide + Référencement Google Maps est le levier le plus direct.",
        services: ["website", "maps_top3"],
      };
    }
    if (guidedGoal === "brand") {
      return {
        title: "Identité Premium & Site Vitrine Haute Conversion",
        reason:
          "Soigner votre image de marque et votre site internet inspire immédiatement confiance à vos prospects.",
        services: ["branding", "website", "social"],
      };
    }
    if (guidedGoal === "automation") {
      return {
        title: "CRM Sur-Mesure & Automatisations IA",
        reason:
          "Pour ne plus perdre de prospects et structurer vos relances, un CRM personnalisé dès 999 € connecté à vos outils s'impose.",
        services: ["robotics", "website"],
      };
    }
    return {
      title: "Croissance Multi-Canaux (Site + SEO + Social Media)",
      reason:
        "Associer présence sur Google, contenus réseaux sociaux et site performant sécurise vos demandes régulières.",
      services: ["website", "seo", "social"],
    };
  }, [guidedGoal]);

  const activeMilestoneIdx = step <= 2 ? 0 : step === 3 ? 1 : step === 4 ? 2 : 3;
  const milestones =
    currentLang === "en"
      ? ["Profile", "Services", "Parameters", "Proposal"]
      : ["Profil", "Prestations", "Paramètres", "Proposition"];
  const subtitles = isEn
    ? [
        "What is your industry?",
        "Where is your company today?",
        "What is your main objective?",
        "Which digital levers do you want to configure?",
        "Configure your selected options",
        "Your tailored XR Agency recommendation",
        "Your contact details & custom PDF estimate",
        "Your commercial proposal is ready",
      ]
    : [
        "Quel est votre secteur d'activité ?",
        "Quelle est votre situation actuelle ?",
        "Quel est votre objectif prioritaire ?",
        "Quels leviers souhaitez-vous configurer ?",
        "Affinons ensemble vos paramètres",
        "Votre recommandation XR Agency sur mesure",
        "Vos coordonnées pour générer votre devis PDF",
        "Votre récapitulatif commercial est prêt",
      ];
  const liveBadgeEstimate = useMemo(() => {
    const parts: string[] = [];
    if (onceFixed > 0) parts.push(`${onceFixed.toLocaleString("fr-FR")} €`);
    if (onceFromCustom > 0) parts.push(`dès ${onceFromCustom.toLocaleString("fr-FR")} €`);
    if (monthlyTotal > 0) parts.push(`${monthlyTotal.toLocaleString("fr-FR")} €/m`);
    if (annualTotal > 0) parts.push(`${annualTotal.toLocaleString("fr-FR")} €/an`);
    return parts.length ? parts.join(" + ") : QUOTE_UI.calculating[currentLang];
  }, [onceFixed, onceFromCustom, monthlyTotal, annualTotal, currentLang]);
  const currentParam = paramScreens[paramIdx];

  const choiceBtn = (item: Choice, onClick: () => void, selected = false, tag?: string) => {
    const Icon = CHOICE_ICONS[item.id] ?? Sparkles;
    return (
      <button
        key={item.id}
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
          "group relative w-full rounded-2xl border p-4 text-left transition-all flex items-center justify-between gap-3",
          selected
            ? "border-[#d4af37] bg-[#0c0e18] text-white shadow-sm ring-1 ring-[#b48f5a]"
            : "border-white/10 bg-[#0c0e18] text-white hover:border-[#d4af37]",
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors",
              selected ? "bg-white text-black text-[#e8cfa6]" : "bg-[#f5efe4] text-[#d4af37]",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <span className="block text-xs sm:text-sm font-bold leading-snug">{item.label}</span>
            <span className="block text-[10.5px] sm:text-xs text-[#94a3b8] leading-snug mt-0.5">
              {item.detail}
            </span>
          </div>
        </div>
        {tag && (
          <span className="shrink-0 rounded-full bg-[#f5efe4] px-2.5 py-1 label-mono text-[7.5px] font-bold text-[#d4af37]">
            {tag}
          </span>
        )}
      </button>
    );
  };

  return (
    <section
      id="quote"
      dir={currentLang === "ar" ? "rtl" : "ltr"}
      className="xr-section relative py-20 sm:py-28 bg-[#06070a] text-white border-t border-white/10"
    >
      <span id="audit" aria-hidden="true" className="pointer-events-none absolute -top-24 left-0" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        <div
          ref={journeyRef}
          className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0c0e17] shadow-[0_32px_90px_-42px_rgba(0,0,0,0.85)] lg:grid lg:grid-cols-[0.86fr_1.14fr]"
        >
          {/* LEFT: WELCOMING AGENT XR CONCIERGE & 3 MODES */}
          <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-[#0f121e] to-[#0a0c14] p-6 sm:p-8 lg:p-9 text-white">
            <div className="space-y-6">
              {/* Top Portrait Card + Greeting */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080a11] shadow-xl">
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={agentXrPortrait}
                    alt="Votre conseillère Agent XR chez XR Agency"
                    className="h-full w-full object-cover object-[center_18%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-black/80 px-3 py-1 font-mono text-[7.5px] font-bold tracking-[.18em] text-[#d4af37] shadow-xs border border-white/10">
                      XR AGENCY · PARIS
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-[10px] font-bold text-white shadow-xs border border-white/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      En ligne
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[7px] font-bold tracking-[.2em] text-[#d4af37] uppercase">
                      ASSISTANT COMMERCIAL XR
                    </span>
                    <h2 className="text-xl sm:text-2xl leading-snug font-bold mt-0.5 drop-shadow text-white">
                      Bonjour et bienvenue chez <em className="italic text-[#d4af37]">XR Agency</em>{" "}
                      !
                    </h2>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0c14] border-t border-white/5">
                  <p className="text-xs sm:text-sm font-medium text-[#94a3b8] leading-relaxed">
                    Comment pouvons-nous vous accompagner aujourd&apos;hui ? Sélectionnez votre
                    point d&apos;entrée :
                  </p>
                </div>
              </div>

              {/* 3 Interactive Entry Paths (Section 4) */}
              <div className="space-y-2.5">
                {[
                  {
                    id: "devis" as const,
                    badge: "OPTION 1",
                    title: "Je souhaite un devis adapté à mon entreprise",
                    desc: "Secteur, services ciblés, chiffrage transparent & PDF",
                    icon: FileText,
                  },
                  {
                    id: "audit" as const,
                    badge: "OPTION 2",
                    title: "Je souhaite réaliser un audit de mon activité",
                    desc: "Analyse de votre site, opportunités et plan d'action",
                    icon: Search,
                  },
                  {
                    id: "guided" as const,
                    badge: "OPTION 3",
                    title: "Je ne sais pas encore, accompagnez-moi",
                    desc: "3 questions rapides pour identifier le levier prioritaire",
                    icon: Compass,
                  },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const active = hubMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setHubMode(opt.id);
                        setStepValidationMsg("");
                      }}
                      className={cn(
                        "group flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all",
                        active
                          ? "border-[#d4af37] bg-white text-black text-white shadow-md"
                          : "border-[#d4af37]/12 bg-[#0c0e18] text-white hover:border-[#d4af37]",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
                          active ? "bg-[#c5a880] text-white" : "bg-[#f5efe4] text-[#d4af37]",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "label-mono text-[6.5px] font-bold tracking-[.16em] block",
                            active ? "text-[#e8cfa6]" : "text-[#8b704f]",
                          )}
                        >
                          {opt.badge}
                        </span>
                        <span className="block text-xs sm:text-[13px] font-bold leading-snug mt-0.5">
                          {opt.title}
                        </span>
                        <span
                          className={cn(
                            "block text-[10.5px] truncate mt-0.5",
                            active ? "text-white/75" : "text-[#94a3b8]",
                          )}
                        >
                          {opt.desc}
                        </span>
                      </div>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1",
                          active ? "text-[#e8cfa6]" : "text-[#8b704f]",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/10 flex items-center justify-between text-[11px] text-[#94a3b8]">
              <span>Accompagnement 100% humain · Devis gratuit</span>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#d4af37] hover:underline"
              >
                WhatsApp direct ↗
              </a>
            </div>
          </div>

          {/* RIGHT: ACTIVE WORKSPACE */}
          <div className="p-6 pb-20 sm:p-8 sm:pb-20 lg:p-10 bg-[#0c0e17] text-white flex flex-col justify-between">
            {/* ───────────── MODE 1: CONDITIONAL QUOTE CONFIGURATOR ───────────── */}
            {hubMode === "devis" && (
              <div className="space-y-6">
                {/* Milestones + Live Estimate Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {milestones.map((lbl, idx) => (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => {
                          const mapStep = [0, 3, 4, 6][idx];
                          if (mapStep <= step) goToStep(mapStep);
                        }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold transition",
                          idx === activeMilestoneIdx
                            ? "border-[#d4af37] bg-[#d4af37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                            : idx < activeMilestoneIdx
                              ? "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37]"
                              : "border-white/10 bg-[#0c0e18]/5 text-[#64748b]",
                        )}
                      >
                        <span className="font-mono text-[9px]">{idx + 1}</span>
                        <span>{lbl}</span>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 px-3.5 py-1.5 text-right">
                    <span className="block font-mono text-[6px] font-bold text-[#d4af37] uppercase">
                      {QUOTE_UI.liveEstimate[currentLang]}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white whitespace-nowrap">
                      {liveBadgeEstimate}
                    </span>
                  </div>
                </div>

                {/* Step Header + Back */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="label-mono text-[7.5px] font-bold tracking-[.2em] text-[#d4af37] uppercase">
                      {step === 4 && paramScreens.length > 0
                        ? `PARAMÈTRE ${paramIdx + 1} / ${paramScreens.length}`
                        : `${QUOTE_UI.stepWord[currentLang]} 0${step + 1} / 08`}
                    </span>
                    <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {subtitles[step]}
                    </h3>
                  </div>

                  {(step > 0 || (step === 4 && paramIdx > 0)) && (
                    <button
                      type="button"
                      onClick={() => (step === 4 ? handleBackFromParams() : goToStep(step - 1))}
                      className="rounded-full border border-white/15 bg-[#0c0e18] px-4 py-1.5 text-xs font-semibold text-white hover:border-[#d4af37] transition"
                    >
                      {QUOTE_UI.back[currentLang]}
                    </button>
                  )}
                </div>

                {/* STEP 0: SECTOR PICKER WITH ALL 9 LUMINOUS PHOTOS & "AUTRE SECTEUR" FIX */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {visibleSectors.map((item) => {
                        const isSel = item.id === sectorId;
                        const photo =
                          XR_SECTOR_PHOTOS[item.id as keyof typeof XR_SECTOR_PHOTOS] ??
                          XR_SECTOR_PHOTOS.other;
                        const Icon = SECTOR_ICONS[item.id] ?? Sparkles;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSectorId(item.id);
                              setMapsSectorId(SECTOR_TO_MAPS_ID[item.id] ?? "other");
                              setStepValidationMsg("");
                              // CRITICAL FIX Section 5: NEVER auto-advance when selecting "other"!
                              if (item.id !== "other") {
                                goToStep(1);
                              }
                            }}
                            className={cn(
                              "group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left transition-all shadow-2xs",
                              isSel
                                ? "border-[#d4af37] ring-2 ring-[#b48f5a]"
                                : "border-[#e3dcd0] hover:border-[#d4af37]",
                            )}
                          >
                            <img
                              src={photo}
                              alt={item.shortLabel}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                            {isSel && (
                              <span className="absolute top-2.5 right-2.5 grid h-6 w-6 place-items-center rounded-full bg-[#c5a880] text-white shadow-md">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-white">
                              <Icon className="h-3.5 w-3.5 text-[#e8cfa6] shrink-0" />
                              <span className="text-xs font-bold truncate drop-shadow">
                                {item.shortLabel}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Inline panel when "Autre secteur d'activité" is selected */}
                    {sectorId === "other" && (
                      <div className="rounded-2xl border border-[#d4af37]/55 bg-[#0c0e18] p-5 space-y-4 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="label-mono text-[7px] font-bold text-[#d4af37] uppercase">
                              SECTEUR PERSONNALISÉ
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              Précisez votre activité pour adapter nos prestations :
                            </h4>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-[11px] font-bold text-white mb-1">
                              Nom de votre secteur / métier *
                            </label>
                            <input
                              type="text"
                              value={customSector}
                              onChange={(e) => {
                                setCustomSector(e.target.value);
                                setStepValidationMsg("");
                              }}
                              placeholder="Ex : Conseil B2B, Industrie, Sport, Association..."
                              className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs outline-none focus:border-[#d4af37]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-white mb-1">
                              Brève description (facultatif)
                            </label>
                            <input
                              type="text"
                              value={customActivityNote}
                              onChange={(e) => setCustomActivityNote(e.target.value)}
                              placeholder="Ex : Prestations pour PME ou vente en ligne..."
                              className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs outline-none focus:border-[#d4af37]"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="block text-[11px] font-bold text-white mb-2">
                            Services XR Agency disponibles pour votre secteur :
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {orderedServices.slice(0, 6).map((svc) => (
                              <span
                                key={svc.id}
                                className="rounded-full border border-white/15 bg-[#0c0e18] px-2.5 py-1 text-[10px] font-semibold text-[#4b443b]"
                              >
                                ✓ {svc.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {stepValidationMsg && (
                      <p className="text-xs font-bold text-red-600">{stepValidationMsg}</p>
                    )}

                    <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAllSectors((v) => !v)}
                        className="rounded-full border border-white/15 bg-[#0c0e18] px-4 py-2 label-mono text-[7.5px] font-bold text-white hover:border-[#d4af37]"
                      >
                        {showAllSectors
                          ? QUOTE_UI.collapseSectors[currentLang]
                          : QUOTE_UI.seeAllSectors[currentLang]}
                      </button>
                      <button
                        type="button"
                        onClick={handleSectorStepContinue}
                        className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs font-bold text-white hover:bg-[#8b704f] transition"
                      >
                        {sectorId === "other"
                          ? "Continuer avec mon activité →"
                          : `${QUOTE_UI.continue[currentLang]} →`}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 1: SITUATION ACTUELLE */}
                {step === 1 && (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {SITUATIONS.map((x) =>
                      choiceBtn(
                        x,
                        () => {
                          setSituation(x.id);
                          if (x.id === "selling") setWebTier("ecommerce");
                          goToStep(2);
                        },
                        situation === x.id,
                      ),
                    )}
                  </div>
                )}

                {/* STEP 2: OBJECTIF PRIORITAIRE */}
                {step === 2 && (
                  <div className="grid gap-2.5">
                    {sector.goals.map((g) =>
                      choiceBtn(
                        {
                          id: g,
                          label: g,
                          detail: isEn
                            ? "Guides recommended service scope"
                            : "Oriente les recommandations et le budget",
                        },
                        () => {
                          setGoal(g);
                          goToStep(3);
                        },
                        goal === g,
                      ),
                    )}
                  </div>
                )}

                {/* STEP 3: CHOIX DES PRESTATIONS */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-[#0c0e18] px-4 py-3 flex items-center justify-between gap-2">
                      <p className="text-xs text-[#94a3b8]">
                        Google Maps sépare le <strong>Top 3 sur mesure</strong> de la{" "}
                        <strong>Gestion mensuelle</strong>. Vous pouvez combiner plusieurs services.
                      </p>
                      <span className="shrink-0 rounded-full bg-white text-black px-3 py-1 label-mono text-[7px] font-bold text-[#e8cfa6]">
                        {selectedServices.length} choisi(s)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {orderedServices.map((x) => {
                        const tag =
                          x.id === "maps_top3"
                            ? "Dès 550 €"
                            : x.id === "maps_management"
                              ? "99–299 €/m"
                              : x.id === "website"
                                ? "Dès 499 €"
                                : x.id === "branding"
                                  ? "Dès 199 €"
                                  : x.id === "seo"
                                    ? "Dès 299 €/m"
                                    : x.id === "social"
                                      ? "Dès 349 €/m"
                                      : x.id === "maintenance"
                                        ? "Dès 29 €/m"
                                        : "POS / CRM dès 2 000 €";
                        return choiceBtn(
                          x,
                          () => toggleService(x.id),
                          selectedServices.includes(x.id),
                          tag,
                        );
                      })}
                    </div>

                    {stepValidationMsg && (
                      <p className="text-xs font-bold text-red-600">{stepValidationMsg}</p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (selectedServices.length === 0) {
                          setStepValidationMsg(
                            "Sélectionnez au moins un service pour paramétrer votre projet.",
                          );
                          return;
                        }
                        setParamIdx(0);
                        goToStep(paramScreens.length > 0 ? 4 : 5);
                      }}
                      className="w-full rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#8b704f] transition"
                    >
                      Configurer les paramètres spécifiques →
                    </button>
                  </div>
                )}

                {/* STEP 4: CONDITIONAL PARAMETERS */}
                {step === 4 && currentParam && (
                  <div className="space-y-4">
                    <div className="h-1.5 rounded-full bg-[#efeae0] overflow-hidden">
                      <div
                        className="h-full bg-[#9b7b4b] transition-all duration-300"
                        style={{ width: `${((paramIdx + 1) / paramScreens.length) * 100}%` }}
                      />
                    </div>

                    {currentParam === "maps_zone" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          GOOGLE MAPS TOP 3 · LOCALISATION
                        </span>
                        <h4 className="display-serif text-2xl">
                          Où souhaitez-vous positionner votre établissement ?
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <select
                            value={mapsSectorId}
                            onChange={(e) => setMapsSectorId(e.target.value)}
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs font-semibold"
                          >
                            {MAPS_SECTORS.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label[currentLang]}
                              </option>
                            ))}
                          </select>
                          <input
                            value={mapsCity}
                            onChange={(e) => {
                              setMapsCity(e.target.value);
                              setStepValidationMsg("");
                            }}
                            placeholder="Ville cible * (ex: Orléans, Paris...)"
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs"
                          />
                          <input
                            value={mapsPostal}
                            onChange={(e) => setMapsPostal(e.target.value)}
                            placeholder="Code postal"
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs"
                          />
                          <input
                            value={mapsDistrict}
                            onChange={(e) => setMapsDistrict(e.target.value)}
                            placeholder="Quartier (facultatif)"
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-2.5 text-xs"
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-[11px] font-bold block mb-1">Population</label>
                            <select
                              value={mapsPopulation}
                              onChange={(e) =>
                                setMapsPopulation(e.target.value as MapsPopulationId)
                              }
                              className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs"
                            >
                              {MAPS_POPULATIONS.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.label[currentLang]}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] font-bold block mb-1">
                              Étendue géographique
                            </label>
                            <select
                              value={mapsGeoScope}
                              onChange={(e) => setMapsGeoScope(e.target.value as MapsGeoScopeId)}
                              className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs"
                            >
                              {MAPS_GEO_SCOPES.map((g) => (
                                <option key={g.id} value={g.id}>
                                  {g.label[currentLang]}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentParam === "maps_market" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          GOOGLE MAPS TOP 3 · CONCURRENCE &amp; RANG ACTUEL
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {MAPS_COMPETITION_LEVELS.map((lv) => (
                            <button
                              key={lv.id}
                              type="button"
                              onClick={() => setMapsCompetition(lv.id)}
                              className={cn(
                                "rounded-xl border p-2.5 text-left text-xs font-bold",
                                mapsCompetition === lv.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {lv.label[currentLang]}
                            </button>
                          ))}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {MAPS_PRESENCE_STATES.map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setMapsPresence(st.id)}
                              className={cn(
                                "rounded-xl border p-2.5 text-left text-[11px]",
                                mapsPresence === st.id
                                  ? "border-[#d4af37] bg-[#f5efe4] font-bold"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {st.label[currentLang]}
                            </button>
                          ))}
                        </div>
                        <select
                          value={mapsGoal}
                          onChange={(e) => setMapsGoal(e.target.value as MapsGoalId)}
                          className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs font-semibold"
                        >
                          {MAPS_GOALS.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.label[currentLang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {currentParam === "maps_keywords" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-4">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          GOOGLE MAPS TOP 3 · MOTS-CLÉS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(
                            activeMapsSector.suggestedKeywords[currentLang] ??
                            activeMapsSector.suggestedKeywords.fr
                          ).map((kw) => {
                            const label = `${kw} ${mapsCity.trim()}`.trim();
                            const active = mapsKeywords.some(
                              (k) => k.toLowerCase() === label.toLowerCase(),
                            );
                            return (
                              <button
                                key={kw}
                                type="button"
                                onClick={() => toggleSuggestedKw(kw)}
                                className={cn(
                                  "rounded-full border px-3 py-1 text-[10.5px] font-medium",
                                  active
                                    ? "border-[#d4af37] bg-white text-black text-[#e8cfa6]"
                                    : "border-white/15 bg-[#0c0e18]",
                                )}
                              >
                                {active ? "✓ " : "+ "}
                                {label}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex gap-2">
                          <input
                            value={mapsKwInput}
                            onChange={(e) => setMapsKwInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addCustomKw();
                              }
                            }}
                            placeholder="Ajouter un mot-clé personnalisé..."
                            className="flex-1 rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs"
                          />
                          <button
                            type="button"
                            onClick={addCustomKw}
                            className="rounded-xl bg-white text-black px-4 py-2 text-xs font-bold text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        {mapsKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {mapsKeywords.map((kw) => (
                              <span
                                key={kw}
                                className="inline-flex items-center gap-1 rounded-lg bg-[#f5efe4] px-2.5 py-1 text-[10px] font-semibold"
                              >
                                {kw}
                                <button
                                  type="button"
                                  onClick={() => setMapsKeywords((p) => p.filter((x) => x !== kw))}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {MAPS_KEYWORD_VOLUMES.map((kv) => (
                            <button
                              key={kv.id}
                              type="button"
                              onClick={() => setMapsKwVolume(kv.id)}
                              className={cn(
                                "rounded-xl border p-2.5 text-[10.5px] font-semibold",
                                mapsKwVolume === kv.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {kv.label[currentLang]}
                            </button>
                          ))}
                        </div>
                        <label className="flex items-start gap-2.5 rounded-xl bg-[#0c0e18] p-3 text-xs cursor-pointer border border-white/10">
                          <input
                            type="checkbox"
                            checked={mapsAddPostCare}
                            onChange={(e) => setMapsAddPostCare(e.target.checked)}
                            className="mt-0.5 accent-[#9b7b4b]"
                          />
                          <span>
                            Envisager aussi une gestion mensuelle à distance après le référencement
                            Top 3.
                          </span>
                        </label>
                      </div>
                    )}

                    {currentParam === "maps_mgmt" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          GESTION MENSUELLE GOOGLE MAPS (100 % À DISTANCE)
                        </span>
                        {MAPS_MANAGEMENT_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setMapsMgmtTier(tier.id)}
                            className={cn(
                              "w-full rounded-xl border p-3.5 text-left flex items-center justify-between gap-3",
                              mapsMgmtTier === tier.id
                                ? "border-[#d4af37] bg-white text-black text-white"
                                : "border-white/15 bg-[#0c0e18]",
                            )}
                          >
                            <div>
                              <strong className="text-xs block">{tier.name[currentLang]}</strong>
                              <span
                                className={cn(
                                  "text-[10.5px]",
                                  mapsMgmtTier === tier.id ? "text-[#d7d1c6]" : "text-[#94a3b8]",
                                )}
                              >
                                {tier.postsPerMonth} Posts · {tier.photosPerMonth} visuels ·{" "}
                                {tier.reviewsPerMonth} avis/mois
                              </span>
                            </div>
                            <span className="text-sm font-black shrink-0">{tier.eurMonth} €/m</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {currentParam === "web_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          SITE WEB SUR-MESURE
                        </span>
                        <div className="grid sm:grid-cols-3 gap-2.5">
                          {[
                            {
                              id: "showcase" as const,
                              t: "Vitrine Pro",
                              p: "499 €",
                              d: "Jusqu'à 3 pages, responsive",
                            },
                            {
                              id: "business" as const,
                              t: "Business",
                              p: "799 €",
                              d: "5+ pages, blog & SEO",
                            },
                            {
                              id: "ecommerce" as const,
                              t: "E-commerce",
                              p: "1 499 €",
                              d: "Catalogue, Stripe & RDV",
                            },
                          ].map((w) => (
                            <button
                              key={w.id}
                              type="button"
                              onClick={() => setWebTier(w.id)}
                              className={cn(
                                "rounded-xl border p-3 text-left",
                                webTier === w.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              <div className="flex justify-between font-bold text-xs">
                                <span>{w.t}</span>
                                <span>{w.p}</span>
                              </div>
                              <p
                                className={cn(
                                  "mt-1 text-[10px]",
                                  webTier === w.id ? "text-[#d7d1c6]" : "text-[#94a3b8]",
                                )}
                              >
                                {w.d}
                              </p>
                            </button>
                          ))}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <select
                            value={webLanguages}
                            onChange={(e) =>
                              setWebLanguages(e.target.value as "mono" | "bi" | "intl")
                            }
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs"
                          >
                            <option value="mono">1 langue (inclus)</option>
                            <option value="bi">Bilingue FR / EN · sur devis</option>
                            <option value="intl">Multilingue 3+ · sur devis</option>
                          </select>
                          <select
                            value={webContentReady}
                            onChange={(e) =>
                              setWebContentReady(e.target.value as "ready" | "guided")
                            }
                            className="rounded-xl border border-white/15 bg-[#0c0e18] px-3 py-2 text-xs"
                          >
                            <option value="guided">Contenus à structurer ensemble</option>
                            <option value="ready">Textes & visuels déjà prêts</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentParam === "branding_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          BRANDING &amp; IDENTITÉ
                        </span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setBrandingTier("starter")}
                            className={cn(
                              "rounded-xl border p-4 text-left",
                              brandingTier === "starter"
                                ? "border-[#d4af37] bg-white text-black text-white"
                                : "border-white/15 bg-[#0c0e18]",
                            )}
                          >
                            <strong className="text-sm block">Logo Signature · 199 €</strong>
                            <span className="text-[11px] opacity-80">
                              Vectoriel HD et déclinaisons essentielles
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBrandingTier("identity")}
                            className={cn(
                              "rounded-xl border p-4 text-left",
                              brandingTier === "identity"
                                ? "border-[#d4af37] bg-white text-black text-white"
                                : "border-white/15 bg-[#0c0e18]",
                            )}
                          >
                            <strong className="text-sm block">Brand Identity Kit · 299 €</strong>
                            <span className="text-[11px] opacity-80">
                              Palette, typographies & modèles sociaux
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBrandingTier("premium")}
                            className={cn(
                              "rounded-xl border p-4 text-left",
                              brandingTier === "premium"
                                ? "border-[#d4af37] bg-white text-black text-white"
                                : "border-white/15 bg-[#0c0e18]",
                            )}
                          >
                            <strong className="text-sm block">Full Brand Suite · 399 €</strong>
                            <span className="text-[11px] opacity-80">
                              Brand Book, papeterie & droits cédés
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {currentParam === "seo_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          SEO ORGANIQUE GOOGLE
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {[
                            { id: "foundation" as const, l: "SEO Starter · 299 €/m" },
                            { id: "growth" as const, l: "SEO Growth · 499 €/m" },
                          ].map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSeoTier(s.id)}
                              className={cn(
                                "rounded-xl border p-3.5 text-left text-xs font-bold",
                                seoTier === s.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {s.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentParam === "social_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          RÉSEAUX SOCIAUX
                        </span>
                        <div className="grid sm:grid-cols-3 gap-2.5">
                          {[
                            { id: "essential" as const, l: "Essentielle · 349 €/m" },
                            { id: "growth" as const, l: "Croissance · 599 €/m" },
                            { id: "signature" as const, l: "Domination · 799 €/m" },
                          ].map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSocialTier(s.id)}
                              className={cn(
                                "rounded-xl border p-3.5 text-left text-xs font-bold",
                                socialTier === s.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {s.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentParam === "webcare_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          WEBCARE · MAINTENANCE
                        </span>
                        <div className="grid sm:grid-cols-3 gap-2.5">
                          {[
                            { id: "essential" as const, l: "Essentiel · 29 €/m" },
                            { id: "pro" as const, l: "Business · 49 €/m" },
                            { id: "custom" as const, l: "Unlimited · 99 €/m" },
                          ].map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setWebcareTier(s.id)}
                              className={cn(
                                "rounded-xl border p-3.5 text-left text-xs font-bold",
                                webcareTier === s.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              {s.l}
                            </button>
                          ))}
                        </div>
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={webcareIncludeInfra}
                            onChange={(e) => setWebcareIncludeInfra(e.target.checked)}
                            className="accent-[#9b7b4b]"
                          />
                          <span>Inclure hébergement + domaine annuel (79 €/an à part)</span>
                        </label>
                      </div>
                    )}

                    {currentParam === "ai_scope" && (
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-3">
                        <span className="label-mono text-[7.5px] font-bold text-[#d4af37]">
                          CRM SUR-MESURE, AUTOMATISATION IA &amp; ROBOTIQUE
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {[
                            {
                              id: "crm_custom" as const,
                              l: "CRM Personnalisé · Dès 999 €",
                              d: "Conception métier sur cahier des charges & relances auto",
                            },
                            {
                              id: "agents" as const,
                              l: "Agents Conversationnels IA",
                              d: "Qualification web / WhatsApp & prise de RDV 24/7",
                            },
                            {
                              id: "integrations" as const,
                              l: "Automatisations & API Métier",
                              d: "Connexion Stripe, mails, agendas et workflows internes",
                            },
                            {
                              id: "korben" as const,
                              l: "Robotique d'accueil Korben",
                              d: "Location dès 499 €/m ou achat 8–21 K€ HT",
                            },
                          ].map((a) => (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => setAiFocus(a.id)}
                              className={cn(
                                "rounded-xl border p-3.5 text-left",
                                aiFocus === a.id
                                  ? "border-[#d4af37] bg-white text-black text-white"
                                  : "border-white/15 bg-[#0c0e18]",
                              )}
                            >
                              <strong className="text-xs block">{a.l}</strong>
                              <span className="text-[10px] opacity-80">{a.d}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {stepValidationMsg && (
                      <p className="text-xs font-bold text-red-600">{stepValidationMsg}</p>
                    )}

                    <button
                      type="button"
                      onClick={handleNextFromParams}
                      className="w-full rounded-full bg-white text-black py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#8b704f] transition"
                    >
                      {paramIdx < paramScreens.length - 1
                        ? "Question suivante →"
                        : "Calculer mon estimation personnalisée →"}
                    </button>
                  </div>
                )}

                {/* STEP 5: PROPOSAL */}
                {step === 5 && (
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      {activeProposals.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 space-y-2.5"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-white">
                                {p.label}
                              </h4>
                              <p className="mt-1 text-xs text-[#94a3b8]">{p.detail}</p>
                            </div>
                            <div className="text-right">
                              <span className="display-serif text-2xl font-bold text-white">
                                {p.isFromEstimate
                                  ? `Dès ${p.price.toLocaleString("fr-FR")} €${p.maxPrice ? ` – ${p.maxPrice.toLocaleString("fr-FR")} €` : ""}`
                                  : `${p.price.toLocaleString("fr-FR")} €`}
                              </span>
                              <span className="block label-mono text-[7px] text-[#d4af37]">
                                {p.period === "month"
                                  ? "PAR MOIS"
                                  : p.period === "year"
                                    ? "PAR AN"
                                    : p.isQuoteOnly
                                      ? "ESTIMATION INDICATIVE"
                                      : "FORFAIT PONCTUEL"}
                              </span>
                            </div>
                          </div>
                          {p.factors && (
                            <div className="rounded-xl bg-[#0c0e18] p-3 text-[11px] text-[#94a3b8] space-y-1 border border-white/10">
                              <strong className="text-white flex items-center gap-1.5">
                                <Gauge className="h-3.5 w-3.5 text-[#d4af37]" /> Facteurs pris en
                                compte :
                              </strong>
                              {p.factors.map((f, idx) => (
                                <p key={idx}>• {f}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setParamIdx(0);
                          goToStep(4);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0c0e18] px-5 py-3.5 text-xs font-bold text-white"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Modifier mes paramètres
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(6)}
                        className="flex-1 rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#8b704f] transition"
                      >
                        Voir le récapitulatif complet →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 6: EDITABLE RECAP */}
                {step === 6 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-[#0c0e18] divide-y divide-[#e6dfd2]">
                      {[
                        { k: "Secteur d'activité", v: resolvedSectorLabel, editStep: 0 },
                        {
                          k: "Situation actuelle",
                          v: situationChoice?.label || "Non précisée",
                          editStep: 1,
                        },
                        { k: "Objectif prioritaire", v: goal || "Non précisé", editStep: 2 },
                        {
                          k: "Prestations retenues",
                          v: activeProposals.map((p) => p.label).join(" · "),
                          editStep: 3,
                        },
                      ].map((rowItem) => (
                        <div
                          key={rowItem.k}
                          className="flex items-center justify-between gap-4 p-4"
                        >
                          <div>
                            <span className="label-mono text-[7px] text-[#d4af37] font-bold block">
                              {rowItem.k}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {rowItem.v}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => goToStep(rowItem.editStep)}
                            className="shrink-0 rounded-full border border-white/15 bg-[#0c0e18] px-3 py-1 text-[10px] font-bold hover:border-[#d4af37]"
                          >
                            Modifier
                          </button>
                        </div>
                      ))}
                    </div>

                    <div
                      className={cn(
                        "grid gap-3",
                        annualTotal > 0 ? "sm:grid-cols-4" : "sm:grid-cols-3",
                      )}
                    >
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-center">
                        <span className="label-mono text-[6.5px] text-[#6b655c] block">
                          FORFAITS FIXES
                        </span>
                        <span className="text-xl font-bold">
                          {onceFixed.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-center">
                        <span className="label-mono text-[6.5px] text-[#6b655c] block">
                          SUR MESURE « DÈS »
                        </span>
                        <span className="text-xl font-bold">
                          {onceFromCustom.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-center">
                        <span className="label-mono text-[6.5px] text-[#6b655c] block">
                          MENSUEL
                        </span>
                        <span className="text-xl font-bold">
                          {monthlyTotal.toLocaleString("fr-FR")} €/m
                        </span>
                      </div>
                      {annualTotal > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-4 text-center">
                          <span className="label-mono text-[6.5px] text-[#6b655c] block">
                            ANNUEL
                          </span>
                          <span className="text-xl font-bold">
                            {annualTotal.toLocaleString("fr-FR")} €/an
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToStep(7)}
                      className="w-full rounded-full bg-white text-black px-6 py-4 text-xs font-bold text-white shadow-md hover:bg-[#8b704f] transition"
                    >
                      {QUOTE_UI.getQuotePdf[currentLang]}
                    </button>
                  </div>
                )}

                {/* STEP 7: CONTACT, PDF & CHECKOUT */}
                {step === 7 && (
                  <div className="space-y-4">
                    <form
                      onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        if (
                          !client.company ||
                          !client.name ||
                          !client.email ||
                          !client.whatsapp ||
                          sending
                        )
                          return;
                        void generatePdf();
                      }}
                      className="space-y-3"
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          value={client.company}
                          onChange={(e) => setClient({ ...client, company: e.target.value })}
                          placeholder={QUOTE_UI.formCompany[currentLang]}
                          className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs"
                          required
                        />
                        <input
                          value={client.name}
                          onChange={(e) => setClient({ ...client, name: e.target.value })}
                          placeholder={QUOTE_UI.formName[currentLang]}
                          className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs"
                          required
                        />
                        <input
                          value={client.email}
                          onChange={(e) => setClient({ ...client, email: e.target.value })}
                          type="email"
                          placeholder={QUOTE_UI.formEmail[currentLang]}
                          className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs"
                          required
                        />
                        <input
                          value={client.whatsapp}
                          onChange={(e) => setClient({ ...client, whatsapp: e.target.value })}
                          type="tel"
                          placeholder={QUOTE_UI.formPhone[currentLang]}
                          className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs"
                          required
                        />
                      </div>
                      <input
                        value={client.website}
                        onChange={(e) => setClient({ ...client, website: e.target.value })}
                        type="url"
                        placeholder={QUOTE_UI.formWebsite[currentLang]}
                        className="w-full rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs"
                      />

                      {hasMinimumCommitment && (
                        <label className="flex items-start gap-2 rounded-xl border border-[#d4af37]/30 bg-[#0c0e18] p-3 text-xs text-[#e8e1d4]">
                          <input
                            type="checkbox"
                            checked={acceptCommitments}
                            onChange={(e) => setAcceptCommitments(e.target.checked)}
                            className="mt-0.5 accent-[#9b7b4b]"
                          />
                          <span>
                            {isEn
                              ? "I acknowledge and accept the minimum commitment period shown in my selected Social Media plan (3 or 6 months)."
                              : "Je reconnais et accepte la durée minimale d’engagement indiquée pour la formule Social Media sélectionnée (3 ou 6 mois)."}
                          </span>
                        </label>
                      )}

                      <div className="rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-[10px] leading-relaxed text-[#a6a09a]">
                        {isEn
                          ? "Prices are referenced in EUR. VAT treatment is confirmed on the final quote/invoice according to the seller's tax regime and the client's location."
                          : "Prix de référence en EUR. Le traitement de la TVA sera confirmé sur le devis ou la facture selon le régime fiscal du prestataire et la localisation du client."}
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2 pt-2">
                        <button
                          type="submit"
                          disabled={
                            !client.company ||
                            !client.name ||
                            !client.email ||
                            !client.whatsapp ||
                            sending
                          }
                          className="w-full rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold text-white shadow-md disabled:opacity-30"
                        >
                          {sending
                            ? QUOTE_UI.generatingPdf[currentLang]
                            : generated
                              ? QUOTE_UI.downloadAgain[currentLang]
                              : QUOTE_UI.downloadPdf[currentLang]}
                        </button>

                        {hasCheckoutableFixedItems ? (
                          <button
                            type="button"
                            onClick={createCheckout}
                            disabled={
                              !client.company ||
                              !client.name ||
                              !client.email ||
                              !client.whatsapp ||
                              paying ||
                              (hasMinimumCommitment && !acceptCommitments)
                            }
                            className="w-full rounded-full border border-[#d4af37] bg-[#0c0e18] px-6 py-3.5 text-xs font-bold text-white disabled:opacity-30"
                          >
                            {paying
                              ? QUOTE_UI.preparingPayment[currentLang]
                              : "Régler les forfaits éligibles (CB)"}
                          </button>
                        ) : (
                          <a
                            href={`https://wa.me/33767566783?text=${encodeURIComponent(
                              `Bonjour XR Agency, voici ma demande personnalisée (${resolvedSectorLabel}) — ${activeProposals.map((p) => p.label).join(", ")} — Estimation : ${liveBadgeEstimate}.`,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37] bg-[#0c0e18] px-6 py-3.5 text-xs font-bold text-white"
                          >
                            <MessageCircle className="h-4 w-4 text-emerald-600" /> Envoyer ma
                            demande sur WhatsApp
                          </a>
                        )}
                      </div>
                    </form>

                    {sendMessage && (
                      <div className="rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-center text-xs text-white">
                        {sendMessage}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setStep(0);
                        setParamIdx(0);
                        setSelectedServices(["website"]);
                        setGenerated(false);
                        setSendMessage("");
                      }}
                      className="mx-auto flex items-center gap-1.5 label-mono text-[7px] text-[#787062] hover:text-white"
                    >
                      <span>↺</span> Recommencer
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ───────────── MODE 2: AUDIT D'ACTIVITÉ & SITE WEB ───────────── */}
            {hubMode === "audit" && (
              <div className="space-y-6">
                <div className="border-b border-[#d4af37]/10 pb-4">
                  <span className="label-mono text-[7.5px] font-bold tracking-[.2em] text-[#d4af37] uppercase">
                    OPTION 2 · DIAGNOSTIC OFFERT EN DIRECT
                  </span>
                  <h3 className="display-serif text-2xl sm:text-3xl text-white mt-1">
                    Analysons votre site et vos leviers de croissance
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#94a3b8]">
                    Entrez votre site pour un scan technique/SEO immédiat, ou explorez nos points de
                    blocage fréquents.
                  </p>
                </div>

                {!auditResult ? (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: "site" as const,
                          icon: Laptop,
                          title: "Site internet",
                          sub: "Vitesse, UX, SEO",
                        },
                        {
                          id: "maps" as const,
                          icon: MapPin,
                          title: "Visibilité locale",
                          sub: "Google Maps & avis",
                        },
                        {
                          id: "full" as const,
                          icon: BarChart3,
                          title: "Audit complet",
                          sub: "Site + SEO + Conversion",
                        },
                      ].map((m) => {
                        const Icon = m.icon;
                        const act = auditFocus === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setAuditFocus(m.id);
                              if (m.id === "full")
                                setAuditTypes([
                                  "design",
                                  "seo",
                                  "security",
                                  "conversion",
                                  "technical",
                                ]);
                              else if (m.id === "site")
                                setAuditTypes(["design", "seo", "conversion", "technical"]);
                            }}
                            className={cn(
                              "rounded-2xl border p-3.5 text-left transition",
                              act
                                ? "border-[#d4af37] bg-[#0c0e18] ring-1 ring-[#9b7b4b]"
                                : "border-white/10 bg-[#0c0e18]",
                            )}
                          >
                            <Icon className="h-4.5 w-4.5 text-[#d4af37] mb-2" />
                            <span className="block text-xs font-bold">{m.title}</span>
                            <span className="block text-[10px] text-[#94a3b8]">{m.sub}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid sm:grid-cols-[0.42fr_0.58fr] gap-3">
                      <select
                        value={auditSector}
                        onChange={(e) => setAuditSector(e.target.value)}
                        className="rounded-xl border border-white/15 bg-[#0c0e18] px-3.5 py-3 text-xs font-semibold text-white"
                      >
                        <option value="restaurant">Restaurant / Hôtellerie</option>
                        <option value="realestate">Immobilier / Construction</option>
                        <option value="health">Clinique / Médical</option>
                        <option value="commerce">Commerce / Services</option>
                        <option value="other">Autre activité</option>
                      </select>

                      <input
                        ref={auditInputRef}
                        type="text"
                        value={auditUrl}
                        onChange={(e) => {
                          setAuditUrl(e.target.value);
                          setAuditError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void runAudit();
                          }
                        }}
                        placeholder="https://votre-site.fr"
                        className="rounded-xl border border-white/15 bg-[#0c0e18] px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    {auditError && <p className="text-xs font-bold text-red-600">{auditError}</p>}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => void runAudit()}
                        disabled={auditLoading}
                        className="flex-1 rounded-full bg-white text-black px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white hover:bg-[#8b704f] transition disabled:opacity-50"
                      >
                        {auditLoading ? "Analyse en cours..." : "Lancer mon audit gratuit →"}
                      </button>
                      {auditFocus === "maps" && (
                        <a
                          href="#maps"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37] bg-[#0c0e18] px-5 py-4 text-xs font-bold text-white"
                        >
                          Ouvrir le simulateur Maps
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d4af37]/35 bg-[#0c0e18] p-5">
                      <div>
                        <span className="label-mono text-[7px] font-bold text-[#d4af37]">
                          RÉSULTAT ANALYSE
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
                          {auditResult.url}
                          <a href={auditResult.url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 text-[#d4af37]" />
                          </a>
                        </h4>
                        <p className="text-xs text-[#94a3b8] mt-0.5">
                          {auditResult.title || "Titre page détecté"}
                        </p>
                      </div>
                      <div className="text-center rounded-2xl bg-[#0c0e18] px-5 py-3 border border-white/10 shadow-2xs">
                        <span className="display-serif text-4xl font-bold text-[#d4af37]">
                          {auditResult.score}
                        </span>
                        <span className="text-xs font-bold text-[#94a3b8]">/100</span>
                      </div>
                    </div>

                    <div className="grid gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {auditResult.findings.map((f, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs"
                        >
                          <span
                            className={cn(
                              "font-bold",
                              f.status === false ? "text-amber-700" : "text-emerald-700",
                            )}
                          >
                            {f.status === false ? "▲ " : "✓ "} {f.label}
                          </span>
                          <p className="text-[#94a3b8] mt-0.5">{f.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={makeAuditPdf}
                        className="rounded-full bg-white text-black px-5 py-3 text-xs font-bold text-white"
                      >
                        Télécharger l&apos;Audit PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServices(["website", "seo", "maps_top3"]);
                          setHubMode("devis");
                          setStep(3);
                        }}
                        className="rounded-full border border-[#d4af37] bg-[#0c0e18] px-5 py-3 text-xs font-bold text-white"
                      >
                        Transformer en devis sur mesure →
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuditResult(null)}
                        className="rounded-full border border-white/15 px-4 py-3 text-xs font-semibold text-[#94a3b8]"
                      >
                        Nouvelle analyse
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ───────────── MODE 3: GUIDED DISCOVERY ("JE NE SAIS PAS ENCORE") ───────────── */}
            {hubMode === "guided" && (
              <div className="space-y-6">
                <div className="border-b border-[#d4af37]/10 pb-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="label-mono text-[7.5px] font-bold tracking-[.2em] text-[#d4af37] uppercase">
                      OPTION 3 · ACCOMPAGNEMENT GUIDÉ · ÉTAPE 0{Math.min(guidedStep + 1, 4)} / 04
                    </span>
                    <h3 className="display-serif text-2xl sm:text-3xl text-white mt-1">
                      {guidedStep === 0 &&
                        "Quel résultat ferait la plus grande différence pour vous ?"}
                      {guidedStep === 1 && "Où en est votre présence digitale aujourd'hui ?"}
                      {guidedStep === 2 && "Quel rythme d'accompagnement préférez-vous ?"}
                      {guidedStep === 3 && "Voici la feuille de route recommandée pour vous"}
                    </h3>
                  </div>
                  {guidedStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setGuidedStep((guidedStep - 1) as 0 | 1 | 2 | 3)}
                      className="rounded-full border border-white/15 bg-[#0c0e18] px-4 py-1.5 text-xs font-bold"
                    >
                      Retour
                    </button>
                  )}
                </div>

                {guidedStep === 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        id: "local",
                        l: "Attirer plus de clients locaux",
                        d: "Être trouvé sur Google Maps et recevoir des appels directs.",
                        i: MapPin,
                      },
                      {
                        id: "brand",
                        l: "Moderniser mon image et mon site",
                        d: "Inspirer confiance immédiatement dès le premier clic.",
                        i: Globe2,
                      },
                      {
                        id: "growth",
                        l: "Développer ma visibilité sur Google & Réseaux",
                        d: "Attirer de nouveaux prospects régulièrement chaque mois.",
                        i: TrendingUp,
                      },
                      {
                        id: "automation",
                        l: "Structurer mes ventes avec un CRM & l'IA",
                        d: "Centraliser mes prospects, automatiser les relances & gagner du temps.",
                        i: Database,
                      },
                    ].map((g) => {
                      const I = g.i;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => {
                            setGuidedGoal(g.id);
                            setGuidedStep(1);
                          }}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition hover:border-[#d4af37]",
                            guidedGoal === g.id
                              ? "border-[#d4af37] bg-[#0c0e18]"
                              : "border-white/10 bg-[#0c0e18]",
                          )}
                        >
                          <I className="h-5 w-5 text-[#d4af37] mb-2" />
                          <strong className="block text-sm font-bold">{g.l}</strong>
                          <span className="text-xs text-[#94a3b8] mt-1 block">{g.d}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {guidedStep === 1 && (
                  <div className="grid gap-3">
                    {[
                      {
                        id: "start",
                        l: "Je pars de zéro ou presque",
                        d: "Besoin de fondations solides rapidement opérationnelles.",
                      },
                      {
                        id: "improve",
                        l: "J'ai déjà un site ou des fiches mais trop peu de retours",
                        d: "Besoin d'optimiser la crédibilité et la conversion.",
                      },
                      {
                        id: "scale",
                        l: "Je veux passer au niveau supérieur",
                        d: "Automatisation, SEO structuré et présence multi-canaux.",
                      },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setGuidedStage(s.id);
                          setGuidedStep(2);
                        }}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition hover:border-[#d4af37]",
                          guidedStage === s.id
                            ? "border-[#d4af37] bg-[#0c0e18]"
                            : "border-white/10 bg-[#0c0e18]",
                        )}
                      >
                        <strong className="block text-sm font-bold">{s.l}</strong>
                        <span className="text-xs text-[#94a3b8] mt-0.5 block">{s.d}</span>
                      </button>
                    ))}
                  </div>
                )}

                {guidedStep === 2 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        id: "targeted",
                        l: "Démarrer ciblé",
                        d: "Corriger la priorité #1 sans superflu.",
                      },
                      {
                        id: "complete",
                        l: "Écosystème complet",
                        d: "Construire l'ensemble de façon cohérente.",
                      },
                      {
                        id: "expert",
                        l: "Avis d'un expert",
                        d: "Confirmer ensemble avant de lancer.",
                      },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setGuidedTempo(t.id);
                          setGuidedStep(3);
                        }}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition hover:border-[#d4af37]",
                          guidedTempo === t.id
                            ? "border-[#d4af37] bg-[#0c0e18]"
                            : "border-white/10 bg-[#0c0e18]",
                        )}
                      >
                        <strong className="block text-sm font-bold">{t.l}</strong>
                        <span className="text-xs text-[#94a3b8] mt-1 block">{t.d}</span>
                      </button>
                    ))}
                  </div>
                )}

                {guidedStep === 3 && (
                  <div className="rounded-3xl border border-[#d4af37]/45 bg-[#0c0e18] p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37]">
                      <CheckCircle2 className="h-4.5 w-4.5" /> ORIENTATION RECOMMANDÉE
                    </div>
                    <h4 className="display-serif text-2xl sm:text-3xl text-white">
                      {guidedRecommendation.title}
                    </h4>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {guidedRecommendation.reason}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {guidedRecommendation.services.map((sid) => {
                        const found = SERVICES.find((s) => s.id === sid);
                        return (
                          <span
                            key={sid}
                            className="rounded-full bg-[#0c0e18] border border-white/15 px-3.5 py-1.5 text-xs font-bold text-white"
                          >
                            ✓ {found?.label ?? sid}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServices(guidedRecommendation.services);
                          if (guidedRecommendation.services.includes("robotics"))
                            setAiFocus("crm_custom");
                          setHubMode("devis");
                          setParamIdx(0);
                          setStep(0);
                        }}
                        className="flex-1 rounded-full bg-white text-black px-6 py-3.5 text-xs font-bold text-white hover:bg-[#8b704f] transition"
                      >
                        Chiffrer ce programme étape par étape →
                      </button>
                      <a
                        href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, suite au parcours guidé (${guidedRecommendation.title}), j'aimerais obtenir vos conseils.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0c0e18] px-5 py-3.5 text-xs font-bold text-white"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-600" /> Parler à un
                        conseiller
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
