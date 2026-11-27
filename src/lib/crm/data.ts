// ── XR AGENCY CRM — Modèle de données, Rôles RBAC stricts, 7 Services officiels & Moteur de commissions ──

export type UserRoleType =
  | "direction"
  | "manager"
  | "setter"
  | "closer"
  | "full_cycle"
  | "student"
  | "studio";

export interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  roleLabel: string;
  roleType: UserRoleType;
  recruitedBy?: string; // ex: "martin" -> Martin voit ce membre et touche son override
  settingRate: number; // % si agit en tant que Setter
  closingRate: number; // % si agit en tant que Closer
  fullCycleRate: number; // % si fait Setting + Closing
  overrideRate?: number; // % Manager sur les ventes des candidats qu'il ramène
  avatarBg: string;
  avatarChar: string; // Avatar / personnage distinctif fixe
  badge: string; // JAMAIS de % affiché dans le badge public pour préserver la confidentialité
  pin: string;
  customPinSet?: boolean; // Passe à true quand le membre personnalise son mot de passe
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "antoine",
    name: "Antoine Rousseau",
    shortName: "Antoine",
    roleLabel: "Directeur Général & Fondateur",
    roleType: "direction",
    settingRate: 1,
    closingRate: 1,
    fullCycleRate: 1,
    avatarBg: "from-amber-400 via-amber-500 to-orange-600",
    avatarChar: "👑",
    badge: "👑 Direction",
    pin: "071266",
  },
  {
    id: "martin",
    name: "Martin",
    shortName: "Martin",
    roleLabel: "Manager RH & Équipe Commerciale",
    roleType: "manager",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    overrideRate: 0.1,
    avatarBg: "from-blue-500 to-indigo-600",
    avatarChar: "👔",
    badge: "👥 Manager Filière",
    pin: "2026",
  },
  {
    id: "sarah",
    name: "Sarah Benali",
    shortName: "Sarah",
    roleLabel: "Seteuse Cold Call B2B",
    roleType: "setter",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0,
    fullCycleRate: 0.1,
    avatarBg: "from-pink-500 to-rose-700",
    avatarChar: "🎧",
    badge: "📞 Seteuse Cold Call",
    pin: "2020",
  },
  {
    id: "christel",
    name: "Christelle Thirion",
    shortName: "Christelle",
    roleLabel: "Commerciale Full-Cycle",
    roleType: "full_cycle",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-purple-500 to-violet-700",
    avatarChar: "📱",
    badge: "⚡ Commerciale Full-Cycle",
    pin: "3030",
  },
  {
    id: "camille",
    name: "Camille Bernard",
    shortName: "Camille",
    roleLabel: "Closeuse B2B",
    roleType: "closer",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.1,
    fullCycleRate: 0.1,
    avatarBg: "from-cyan-500 to-blue-700",
    avatarChar: "🎯",
    badge: "🎯 Closeuse B2B",
    pin: "4040",
  },
  {
    id: "marilyn",
    name: "Marilyn Guterres",
    shortName: "Marilyn",
    roleLabel: "Commerciale Full-Cycle",
    roleType: "full_cycle",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-emerald-500 to-teal-700",
    avatarChar: "💼",
    badge: "⚡ Commerciale Full-Cycle",
    pin: "7070",
  },
  {
    id: "pilar",
    name: "Pilar de Los Rios",
    shortName: "Pilar",
    roleLabel: "Commerciale Full-Cycle",
    roleType: "full_cycle",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-rose-500 to-amber-600",
    avatarChar: "💎",
    badge: "💼 Commerciale Full-Cycle",
    pin: "",
  },
  {
    id: "lucas",
    name: "Lucas Mercier",
    shortName: "Lucas",
    roleLabel: "Commercial Full-Cycle",
    roleType: "full_cycle",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-indigo-500 to-blue-700",
    avatarChar: "⚡",
    badge: "⚡ Commercial Full-Cycle",
    pin: "1010",
  },
  {
    id: "romain",
    name: "Romain Dubois",
    shortName: "Romain",
    roleLabel: "Commercial Closer B2B",
    roleType: "closer",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-amber-500 via-orange-500 to-red-600",
    avatarChar: "🔥",
    badge: "🔥 Closer B2B",
    pin: "5050",
  },
  {
    id: "emma",
    name: "Emma",
    shortName: "Emma",
    roleLabel: "Élève XR School · Commerciale",
    roleType: "student",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.15,
    fullCycleRate: 0.15,
    avatarBg: "from-fuchsia-500 to-purple-700",
    avatarChar: "✨",
    badge: "🎓 Élève XR School",
    pin: "6060",
  },
  {
    id: "studio",
    name: "Studio Créatif & Dév",
    shortName: "Studio",
    roleLabel: "Pôle Production & Maquettes",
    roleType: "studio",
    settingRate: 0,
    closingRate: 0,
    fullCycleRate: 0,
    avatarBg: "from-zinc-600 to-zinc-900",
    avatarChar: "🎨",
    badge: "🎨 Studio",
    pin: "0000",
  },
];

// ── Les 7 Services Officiels de XR Agency (alignés avec le site public) ──

export type BillingPeriod = "once" | "month" | "year";

export interface ServicePlan {
  id: string;
  label: string;
  price: number;
  period: BillingPeriod;
}

export interface XrOfficialService {
  id: string;
  num: string;
  name: string;
  shortName: string;
  icon: string;
  category: string;
  billing: BillingPeriod;
  defaultPrice: number;
  deliverable: string;
  upsellHint?: string;
  plans: ServicePlan[];
}

export const XR_OFFICIAL_SERVICES: XrOfficialService[] = [
  {
    id: "websites",
    num: "01",
    name: "Création de sites web",
    shortName: "Site Web",
    icon: "🌐",
    category: "Web & Conversion",
    billing: "once",
    defaultPrice: 799,
    deliverable: "Site responsive haute performance, SEO technique, formulaires et hébergement 1 an inclus.",
    upsellHint: "Proposer WebCare (49 €/mois) ou Google Maps Top 3 (+990 €/an)",
    plans: [
      { id: "vitrine", label: "Site Vitrine Pro (3 pages)", price: 499, period: "once" },
      { id: "business", label: "Site Business (5 pages + Blog)", price: 799, period: "once" },
      { id: "ecommerce", label: "E-commerce & Réservation", price: 1499, period: "once" },
    ],
  },
  {
    id: "branding",
    num: "02",
    name: "Branding & Identité",
    shortName: "Branding",
    icon: "✨",
    category: "Identité Visuelle",
    billing: "once",
    defaultPrice: 229,
    deliverable: "Logo vectoriel (AI, SVG, PNG, PDF), palette, typographie, Brand Book et droits cédés.",
    upsellHint: "Combiner avec un Site Vitrine Pro (499 €)",
    plans: [
      { id: "logo", label: "Logo Signature", price: 179, period: "once" },
      { id: "kit", label: "Brand Identity Kit", price: 229, period: "once" },
      { id: "suite", label: "Full Brand Suite + Brand Book", price: 349, period: "once" },
    ],
  },
  {
    id: "seo",
    num: "03",
    name: "Référencement SEO",
    shortName: "SEO Mensuel",
    icon: "📈",
    category: "Acquisition Organique",
    billing: "month",
    defaultPrice: 299,
    deliverable: "Audit sémantique, optimisation on-page, netlinking et reporting mensuel transparent.",
    upsellHint: "Coupler avec Google Maps Top 3 pour dominer le local",
    plans: [
      { id: "seo-start", label: "SEO Croissance", price: 299, period: "month" },
      { id: "seo-pro", label: "SEO Performance", price: 499, period: "month" },
    ],
  },
  {
    id: "maps",
    num: "04",
    name: "Google Maps Top 3",
    shortName: "Maps Top 3",
    icon: "📍",
    category: "Visibilité Locale",
    billing: "year",
    defaultPrice: 990,
    deliverable: "Audit local, optimisation Google Business Profile, suivi mensuel + Garantie Top 3 ou remboursé.",
    upsellHint: "Idéal en pack avec Site Vitrine Pro ou Social Media",
    plans: [{ id: "maps-top3", label: "Maps Top 3 Garanti (Annuel)", price: 990, period: "year" }],
  },
  {
    id: "social",
    num: "05",
    name: "Social Media",
    shortName: "Social Media",
    icon: "📱",
    category: "Réseaux Sociaux",
    billing: "month",
    defaultPrice: 499,
    deliverable: "Calendrier éditorial, création visuels/Reels, rédaction, programmation et modération.",
    upsellHint: "Ajouter Branding Identity Kit pour une direction artistique pro",
    plans: [
      { id: "social-1", label: "Présence Essentielle (1 réseau · 8 posts)", price: 299, period: "month" },
      { id: "social-2", label: "Croissance Active (2 réseaux · 20 posts)", price: 499, period: "month" },
      { id: "social-3", label: "Domination Sociale (3 réseaux · 30 posts)", price: 699, period: "month" },
    ],
  },
  {
    id: "maintenance",
    num: "06",
    name: "WebCare & Maintenance",
    shortName: "WebCare",
    icon: "🛡️",
    category: "Abonnement Sécurité",
    billing: "month",
    defaultPrice: 49,
    deliverable: "Mises à jour sécurité, sauvegardes, corrections contenus/visuels et support prioritaire.",
    plans: [
      { id: "wc-essentiel", label: "Essentiel (4 modifs/mois)", price: 29, period: "month" },
      { id: "wc-business", label: "Business (10 modifs/mois · Prioritaire)", price: 49, period: "month" },
      { id: "wc-unlimited", label: "Unlimited (Illimité + Évolutions)", price: 99, period: "month" },
    ],
  },
  {
    id: "robotics",
    num: "07",
    name: "Robotique de service & IA (Korben)",
    shortName: "Robot Korben",
    icon: "🤖",
    category: "Robotique & IA High-Ticket",
    billing: "month",
    defaultPrice: 499,
    deliverable: "Diagnostic des flux, sélection robot autonome Korben (accueil, livraison, nettoyage), déploiement & SAV français.",
    upsellHint: "Proposer une démo événementielle (250 €) pour déclencher la location ou l'achat",
    plans: [
      { id: "robot-demo", label: "Démonstration / Événement", price: 250, period: "once" },
      { id: "robot-leasing", label: "Location sur mesure Korben", price: 499, period: "month" },
      { id: "robot-buy", label: "Achat Professionnel (8k–21k € HT)", price: 12000, period: "once" },
    ],
  },
];

// ── Modèle de Lead / Prospect avec Split Setter / Closer & Suivi Relance ──

export type LeadStage = "new" | "rdv" | "mockup" | "negociation" | "won";
export type CommissionStatus = "estimated" | "pending_payment" | "unlocked";

export interface LeadServiceItem {
  id: string;
  serviceId: string;
  planLabel: string;
  billing: BillingPeriod;
  price: number;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email?: string;
  websiteUrl?: string;
  sectorId: string;
  serviceId: string;
  planLabel: string;
  billing: BillingPeriod;
  value: number;
  extraItems?: LeadServiceItem[]; // Pack multi-services (ex: Site + WebCare + Maps Top 3)
  stage: LeadStage;
  setterId: string;
  closerId: string;
  issue: string;
  notes: string;
  followUpDate?: string; // YYYY-MM-DD
  createdAt: string;
  wonAt?: string; // ISO date de signature (pour filtre mensuel paie)
  wonMonth?: string; // YYYY-MM (ex: "2026-11")
  installments?: { plan: "1x" | "3x"; paidCount: number }; // Suivi paiement 3x sans frais
  commissionStatus: CommissionStatus;
  mockupReady?: boolean;
  mockupRequestedAt?: string; // ISO date de la demande (< 24h)
  mockupDeadline?: string; // Échéance impérative de 24h
  mockupUrgent?: boolean;
  googleMapsUrl?: string; // Fiche Google Maps
  socialsUrl?: string; // Réseaux sociaux (Instagram, Facebook...)
  mockupNotes?: string; // Brief spécifique maquette
  studioStatus?: "pending" | "in_production" | "delivered";
  timeline?: { id: string; date: string; text: string }[];
}

// ── Somme Multi-Services (One-Shot + MRR + Base de commission) ──

export function getLeadTotals(lead: Lead): {
  oneShotTotal: number;
  mrrTotal: number;
  commissionBase: number;
  itemsCount: number;
} {
  let oneShotTotal = lead.billing === "month" ? 0 : lead.value;
  let mrrTotal = lead.billing === "month" ? lead.value : 0;

  (lead.extraItems || []).forEach((item) => {
    if (item.billing === "month") mrrTotal += item.price;
    else oneShotTotal += item.price;
  });

  return {
    oneShotTotal,
    mrrTotal,
    commissionBase: oneShotTotal + mrrTotal, // Base 1er mois MRR + One-Shot
    itemsCount: 1 + (lead.extraItems?.length || 0),
  };
}

// ── Règles strictes de visibilité (RBAC) ──

export function canViewLead(viewer: TeamMember, lead: Lead, members: TeamMember[]): boolean {
  if (viewer.roleType === "direction") return true;
  if (viewer.roleType === "studio") return lead.stage === "mockup" || lead.stage === "won";

  if (viewer.roleType === "manager") {
    if (lead.setterId === viewer.id || lead.closerId === viewer.id) return true;
    const setter = members.find((m) => m.id === lead.setterId);
    const closer = members.find((m) => m.id === lead.closerId);
    return setter?.recruitedBy === viewer.id || closer?.recruitedBy === viewer.id;
  }

  return lead.setterId === viewer.id || lead.closerId === viewer.id;
}

export function canViewMemberFinances(viewer: TeamMember, target: TeamMember): boolean {
  // Règle stricte de confidentialité : Seule la Direction voit les finances de tous les membres.
  // Chaque commercial / employé voit exclusivement ses propres commissions, jamais celles des autres.
  if (viewer.roleType === "direction") return true;
  return viewer.id === target.id;
}

// ── Moteur de calcul des commissions (Pack Multi-Services + Split Setter/Closer + Override Manager) ──

export interface DealCommissionBreakdown {
  setterAmount: number;
  closerAmount: number;
  managerOverrideAmount: number;
  managerId: string | null;
}

export function computeDealCommissions(lead: Lead, members: TeamMember[]): DealCommissionBreakdown {
  const setter = members.find((m) => m.id === lead.setterId);
  const closer = members.find((m) => m.id === lead.closerId);
  const baseValue = getLeadTotals(lead).commissionBase;

  // Détection si l'offre concerne un site web (20%) ou un forfait récurrent mensuel/annuel (10%)
  const isWebsite =
    lead.serviceId === "websites" ||
    (lead.billing === "once" && !lead.serviceId.includes("maps"));

  let setterAmount = 0;
  let closerAmount = 0;

  if (lead.setterId === lead.closerId) {
    // Cas full-cycle : elle prospecte et elle close elle-même (tout-en-un)
    let rate = closer?.roleType === "direction" ? 0 : (closer?.fullCycleRate ?? 0.2);
    // Règle générale démarcheuse / closer tout-en-un (ex: Pilar, Christel, profils commerciaux) :
    // 20% sur la création de sites web et 10% sur tous les forfaits récurrents mensuels ou annuels
    if (closer?.id === "pilar" || closer?.id === "christel" || closer?.roleType === "full_cycle" || closer?.roleType === "closer") {
      rate = isWebsite ? 0.20 : 0.10;
    }
    closerAmount = Math.round(baseValue * rate);
  } else {
    let sRate = setter?.roleType === "direction" ? 0 : (setter?.settingRate ?? 0.1);
    let cRate = closer?.roleType === "direction" ? 0 : (closer?.closingRate ?? 0.15);

    if (closer?.id === "pilar" || closer?.id === "christel" || closer?.roleType === "closer" || closer?.roleType === "full_cycle") {
      cRate = isWebsite ? 0.20 : 0.10;
    }
    if (setter?.id === "pilar" || setter?.id === "christel" || setter?.roleType === "closer" || setter?.roleType === "full_cycle") {
      sRate = 0.10;
    }

    setterAmount = Math.round(baseValue * sRate);
    closerAmount = Math.round(baseValue * cRate);
  }

  let managerOverrideAmount = 0;
  let managerId: string | null = null;
  const recruiterId = closer?.recruitedBy || setter?.recruitedBy;
  if (recruiterId) {
    const manager = members.find((m) => m.id === recruiterId);
    if (manager?.overrideRate) {
      managerId = manager.id;
      managerOverrideAmount = Math.round(baseValue * manager.overrideRate);
    }
  }

  return { setterAmount, closerAmount, managerOverrideAmount, managerId };
}

export function formatPricePeriod(value: number, billing: BillingPeriod): string {
  const formatted = value.toLocaleString("fr-FR") + " €";
  if (billing === "month") return `${formatted}/mois`;
  if (billing === "year") return `${formatted}/an`;
  return formatted;
}
