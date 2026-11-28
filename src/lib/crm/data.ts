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
  avatarChar?: string; // Avatar / personnage distinctif fixe
  badge: string; // JAMAIS de % affiché dans le badge public pour préserver la confidentialité
  pin: string;
  customPinSet?: boolean; // Passe à true quand le membre personnalise son mot de passe
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "antoine",
    name: "Antoine Rebuffé-Rousseau",
    shortName: "Antoine",
    roleLabel: "Directeur Général & Fondateur",
    roleType: "direction",
    settingRate: 1,
    closingRate: 1,
    fullCycleRate: 1,
    avatarBg: "from-amber-600 to-amber-800",
    avatarChar: "A",
    badge: "Direction Générale",
    pin: "071266",
  },
  {
    id: "martin",
    name: "Martin",
    shortName: "Martin",
    roleLabel: "Manager RH, Commercial & Head of Social Media",
    roleType: "manager",
    settingRate: 0.1,
    closingRate: 0.3,
    fullCycleRate: 0.3,
    overrideRate: 0.05,
    avatarBg: "from-blue-600 to-indigo-800",
    avatarChar: "M",
    badge: "Manager RH & Head of Social",
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
    avatarBg: "from-rose-600 to-pink-800",
    avatarChar: "S",
    badge: "Seteuse B2B",
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
    avatarBg: "from-indigo-600 to-slate-800",
    avatarChar: "C",
    badge: "Commerciale Full-Cycle",
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
    avatarBg: "from-teal-600 to-cyan-800",
    avatarChar: "C",
    badge: "Closeuse B2B",
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
    avatarBg: "from-emerald-600 to-teal-800",
    avatarChar: "M",
    badge: "Commerciale Full-Cycle",
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
    avatarBg: "from-purple-600 to-violet-800",
    avatarChar: "P",
    badge: "Commerciale Full-Cycle",
    pin: "8080",
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
    avatarBg: "from-blue-600 to-slate-800",
    avatarChar: "L",
    badge: "Commercial Full-Cycle",
    pin: "1010",
  },
  {
    id: "romain",
    name: "Romain Dubois",
    shortName: "Romain",
    roleLabel: "Commercial Full-Cycle & Élève XR School",
    roleType: "full_cycle",
    recruitedBy: "martin",
    settingRate: 0.1,
    closingRate: 0.2,
    fullCycleRate: 0.2,
    avatarBg: "from-orange-600 to-amber-800",
    avatarChar: "R",
    badge: "Full-Cycle · XR School",
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
    avatarBg: "from-fuchsia-600 to-purple-800",
    avatarChar: "E",
    badge: "Conseillère · XR School",
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
    avatarBg: "from-zinc-700 to-zinc-900",
    avatarChar: "S",
    badge: "Production Studio",
    pin: "0000",
  },
];

// ── Les 7 Services Officiels de XR Agency (alignés avec le site public) ──

export type BillingPeriod = "once" | "month" | "year" | "monthly" | "annual";

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
      { id: "seo-start", label: "SEO Croissance & Local", price: 299, period: "month" },
      { id: "seo-pro", label: "SEO Performance Dominante", price: 499, period: "month" },
      { id: "seo-elite", label: "SEO National & Stratégique", price: 799, period: "month" },
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
    defaultPrice: 999,
    deliverable: "Audit local, positionnement initial, optimisation Google Business Profile, contrat sur-mesure avec Garantie Top 3 ou remboursé sous délai fixé par Direction.",
    upsellHint: "Idéal en pack avec Site Vitrine Pro ou Social Media",
    plans: [{ id: "maps-top3", label: "Maps Top 3 Garanti (Annuel sur-mesure)", price: 999, period: "year" }],
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

export type LeadStage = "new" | "rdv" | "mockup" | "negociation" | "won" | "proposal";
export type CommissionStatus = "estimated" | "pending_payment" | "unlocked";

export type QuoteWorkflowStatus =
  | "none"
  | "draft"
  | "pending_director_approval"
  | "approved"
  | "rejected"
  | "sent_to_client"
  | "signed";

export interface ClientMilestone {
  id: string;
  targetDate: string; // YYYY-MM-DD
  title: string;
  serviceCategory?: string;
  type: "onboarding" | "delivery" | "upsell_check" | "annual_renewal" | "followup";
  status: "pending" | "done" | "dismissed";
  notes?: string;
}

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
  city?: string;
  countryCode?: string; // ex: "FR", "BE", "CH", "US", etc.
  clientType?: "b2b" | "b2c";
  clientVatNumber?: string; // N° TVA Intracommunautaire si client pro UE
  source?: string;
  priority?: "normal" | "hot" | "urgent" | string;
  callsCount?: number;
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
  mockupUrl?: string;
  googleMapsUrl?: string; // Fiche Google Maps
  socialsUrl?: string; // Réseaux sociaux (Instagram, Facebook...)
  mockupNotes?: string; // Brief spécifique maquette
  studioStatus?: "pending" | "in_production" | "delivered";
  projectMilestone?: string;
  providerId?: string;
  providerCost?: number;
  invoiceStatus?: "none" | "deposit_sent" | "paid" | string;
  invoiceRef?: string;
  quoteRef?: string;
  quoteWorkflowStatus?: QuoteWorkflowStatus;
  quoteRequestedAt?: string;
  quoteApprovedAt?: string;
  quoteApprovedBy?: string; // ex: "Antoine Rebuffé-Rousseau"
  quoteDirectorNotes?: string;
  onboardingDate?: string; // Date d'entrée client chez XR Agency (YYYY-MM-DD)
  activeServicesList?: string[]; // Liste lisible des services souscrits
  clientMilestones?: ClientMilestone[]; // Calendrier d'accompagnement & d'upsell
  depositAmount?: number;
  depositPaidAt?: string;
  depositMethod?: string;
  mapsContract?: {
    enabled: boolean;
    price: number;
    keywords: string;
    targetZone: string;
    currentPosition?: string;
    competitionLevel?: "moderee" | "forte" | "ultra_concurrentielle" | string;
    deliveryDelayDays: number;
    guaranteeClause: string;
    validatedBy: string;
    directorApproved?: boolean;
  };
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
    if (setter?.recruitedBy === viewer.id || closer?.recruitedBy === viewer.id) return true;

    // Martin est également Responsable Réseaux Sociaux : visibilité sur tous les leads issus des réseaux
    const isSocialSource =
      lead.source?.toLowerCase().includes("social") ||
      lead.source?.toLowerCase().includes("réseau") ||
      lead.source?.toLowerCase().includes("instagram") ||
      lead.source?.toLowerCase().includes("tiktok") ||
      lead.source?.toLowerCase().includes("linkedin") ||
      lead.source?.toLowerCase().includes("youtube");
    if (isSocialSource) return true;
  }

  return lead.setterId === viewer.id || lead.closerId === viewer.id;
}

export function canViewMemberFinances(viewer: TeamMember, target: TeamMember): boolean {
  // Règle stricte de confidentialité : Seule la Direction voit les finances de tous les membres.
  // Chaque commercial / employé voit exclusivement ses propres commissions, jamais celles des autres.
  if (viewer.roleType === "direction") return true;
  return viewer.id === target.id;
}

// ── Moteur de calcul des commissions (Pack Multi-Services + Split Setter/Closer + Override Manager + Attribution Réseaux) ──

export interface DealCommissionBreakdown {
  setterAmount: number;
  closerAmount: number;
  managerOverrideAmount: number;
  managerId: string | null;
  socialCommissionAmount: number;
  socialManagerId: string | null;
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
    // Cas full-cycle : le commercial prospecte et close lui-même
    let rate = closer?.roleType === "direction" ? 0 : (closer?.fullCycleRate ?? 0.2);

    // Martin en vente directe autonome : 30 % de commission (Défi 20k€ avant 01/03/2027)
    if (closer?.id === "martin") {
      rate = 0.30;
    } else if (closer?.id === "pilar" || closer?.id === "christel" || closer?.roleType === "full_cycle" || closer?.roleType === "closer") {
      // Règle générale démarcheuse / closer tout-en-un (ex: Pilar, Christelle, Romain, Marilyn, Lucas, Camille) :
      // 20% sur la création de sites web et 10% sur tous les forfaits récurrents mensuels ou annuels
      rate = isWebsite ? 0.20 : 0.10;
    }
    closerAmount = Math.round(baseValue * rate);
  } else {
    let sRate = setter?.roleType === "direction" ? 0 : (setter?.settingRate ?? 0.1);
    let cRate = closer?.roleType === "direction" ? 0 : (closer?.closingRate ?? 0.15);

    if (closer?.id === "martin") {
      cRate = 0.30;
    } else if (closer?.id === "pilar" || closer?.id === "christel" || closer?.roleType === "closer" || closer?.roleType === "full_cycle") {
      cRate = isWebsite ? 0.20 : 0.10;
    }
    if (setter?.id === "pilar" || setter?.id === "christel" || setter?.roleType === "closer" || setter?.roleType === "full_cycle") {
      sRate = 0.10;
    }

    setterAmount = Math.round(baseValue * sRate);
    closerAmount = Math.round(baseValue * cRate);
  }

  // Override Manager sur l'équipe commerciale gérée
  let managerOverrideAmount = 0;
  let managerId: string | null = null;
  const recruiterId = closer?.recruitedBy || setter?.recruitedBy;
  if (recruiterId) {
    const manager = members.find((m) => m.id === recruiterId);
    if (manager) {
      managerId = manager.id;
      // Règle stricte Martin / Manager :
      // - 10% direct sur les sites web & offres one-shot de son équipe
      // - 5% sur les abonnements mensuels et annuels de son équipe
      // - Boosté à 10% sur les abonnements mensuels si le défi équipe de 20k€ avant le 01/02/2027 est atteint
      const isOneShot = lead.billing === "once" || lead.serviceId === "websites";
      const isMonthly = lead.billing === "month";
      let overrideRate = isOneShot ? 0.10 : 0.05;
      if (isMonthly && manager.overrideRate && manager.overrideRate >= 0.10) {
        overrideRate = 0.10;
      }
      managerOverrideAmount = Math.round(baseValue * overrideRate);
    }
  }

  // Attribution Réseaux Sociaux : 10 % pour le Responsable Réseaux (Martin) sur tout deal closé issu des réseaux
  let socialCommissionAmount = 0;
  let socialManagerId: string | null = null;
  const isSocialSource =
    lead.source?.toLowerCase().includes("social") ||
    lead.source?.toLowerCase().includes("réseau") ||
    lead.source?.toLowerCase().includes("instagram") ||
    lead.source?.toLowerCase().includes("tiktok") ||
    lead.source?.toLowerCase().includes("linkedin") ||
    lead.source?.toLowerCase().includes("youtube");

  if (isSocialSource) {
    socialManagerId = "martin";
    socialCommissionAmount = Math.round(baseValue * 0.10);
  }

  return {
    setterAmount,
    closerAmount,
    managerOverrideAmount,
    managerId,
    socialCommissionAmount,
    socialManagerId,
  };
}

export function formatPricePeriod(value: number, billing: BillingPeriod): string {
  const formatted = value.toLocaleString("fr-FR") + " €";
  if (billing === "month") return `${formatted}/mois`;
  if (billing === "year") return `${formatted}/an`;
  return formatted;
}
