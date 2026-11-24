import storyBusinessMeeting from "@/assets/story-business-meeting.jpg";
import storyEntrepreneurLaunch from "@/assets/story-entrepreneur-launch.jpg";
import storyRestaurantOwner from "@/assets/story-restaurant-owner.jpg";
import storySchoolMentor from "@/assets/story-school-mentor.jpg";
import heroAtelierEditorial from "@/assets/hero-atelier-editorial.jpg";
import svcWebcareEditorial from "@/assets/svc-webcare-editorial.jpg";
import svcBrandingEditorial from "@/assets/svc-branding-editorial.jpg";

export interface XrAdvisor {
  id: string;
  firstName: string;
  fullName: string;
  roleTitle: string;
  role: string;
  specialtyBadge: string;
  specialtyShort: string;
  specialtyDetail: string;
  assignedServices: string[];
  primaryRoute: string;
  punchline: string;
  bio: string;
  phoneDisplay: string;
  whatsappPhone: string;
  email: string;
  portraitSrc: string;
  portraitUrl: string;
  portraitPosition: string;
  cameraSpec: string;
  LensSpec: string;
  studioFilter: string;
  kpiHighlight: string;
  xpPoints: number;
  xp: number;
  rankName: "Rookie Scout" | "Field Hunter" | "Closer Pro" | "Master Rainmaker" | "Apex Legend";
  rpgRank: "Rookie Scout" | "Field Hunter" | "Closer Pro" | "Master Rainmaker" | "Apex Legend";
  dealsClosedMonth: number;
  mrrGeneratedEur: number;
  mrrManaged: number;
  revenueMonthEur: number;
  monthlyRevenueGenerated: number;
  streakDays: number;
}

export type XRAdvisor = XrAdvisor;

/**
 * Règle photographique anti-IA stricte :
 * Portraits corporate de studio en lumière naturelle, focale 85mm f/1.8,
 * fond sombre texturé et traitement grain argentique fin.
 */
export const XR_ADVISORS: XrAdvisor[] = [
  {
    id: "martin",
    firstName: "Martin",
    fullName: "Martin Vasseur",
    roleTitle: "Directeur Acquisition Locale, Google Maps & Systèmes NFC",
    role: "Directeur Acquisition Locale & Maps NFC",
    specialtyBadge: "GOOGLE MAPS TOP 3 & PACK NFC",
    specialtyShort: "Google Maps Top 3 & Plaques NFC",
    specialtyDetail:
      "Spécialiste de la domination locale Google Business Profile et du déploiement de plaques et cartes NFC connectées en point de vente pour multiplier les avis 5★ authentifiés.",
    assignedServices: ["maps"],
    primaryRoute: "/services/maps",
    punchline:
      "Chaque jour hors du Top 3 Google Maps, ce sont des appels entrants que vous offrez gratuitement à vos deux concurrents directs.",
    bio: "Spécialiste de la domination locale Google Business Profile et du déploiement de plaques et cartes NFC connectées en point de vente pour multiplier les avis 5 étoiles authentifiés.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "martin.vasseur@xragencyai.com",
    portraitSrc: storyBusinessMeeting,
    portraitUrl: storyBusinessMeeting,
    portraitPosition: "object-[32%_22%]",
    cameraSpec: "85mm f/1.8 · Studio Lumière Naturelle · Grain ISO 400",
    LensSpec: "85mm f/1.8 • Studio Naturel",
    studioFilter: "contrast(1.08) saturate(0.88) brightness(0.96)",
    kpiHighlight: "+310% appels Maps",
    xpPoints: 16450,
    xp: 16450,
    rankName: "Apex Legend",
    rpgRank: "Apex Legend",
    dealsClosedMonth: 18,
    mrrGeneratedEur: 4280,
    mrrManaged: 4280,
    revenueMonthEur: 24600,
    monthlyRevenueGenerated: 24600,
    streakDays: 9,
  },
  {
    id: "romain",
    firstName: "Romain",
    fullName: "Romain Delacroix",
    roleTitle: "Architecte Web Haute Conversion & Refonte Stratégique",
    role: "Architecte Web & Refonte Haute Conversion",
    specialtyBadge: "SITES WEB & REFONTE HAUTE CONVERSION",
    specialtyShort: "Sites Web & Refonte CRO",
    specialtyDetail:
      "Pilote des créations de sites vitrines Pro, Business, E-commerce et des refontes intégrales orientées vitesse de chargement, psychologie de vente et ROI mesurable.",
    assignedServices: ["websites", "refonte"],
    primaryRoute: "/services/websites",
    punchline:
      "Un site web qui ne convertit pas en moins de 8 secondes est une brochure passive. Nous construisons des machines à prises de rendez-vous.",
    bio: "Pilote des créations de sites vitrines Pro, Business, E-commerce et des refontes intégrales orientées vitesse de chargement, psychologie de vente et ROI mesurable.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "romain.delacroix@xragencyai.com",
    portraitSrc: storyEntrepreneurLaunch,
    portraitUrl: storyEntrepreneurLaunch,
    portraitPosition: "object-[48%_20%]",
    cameraSpec: "85mm f/1.8 · Studio Fond Ardoise · Grain Argentique",
    LensSpec: "85mm f/1.8 • Fond Ardoise",
    studioFilter: "contrast(1.1) saturate(0.86) brightness(0.95)",
    kpiHighlight: "Lighthouse 99/100",
    xpPoints: 15200,
    xp: 15200,
    rankName: "Apex Legend",
    rpgRank: "Apex Legend",
    dealsClosedMonth: 15,
    mrrGeneratedEur: 3150,
    mrrManaged: 3150,
    revenueMonthEur: 28900,
    monthlyRevenueGenerated: 28900,
    streakDays: 7,
  },
  {
    id: "hugo",
    firstName: "Hugo",
    fullName: "Hugo Marchand",
    roleTitle: "Stratège SEO Technique & Autorité Sémantique",
    role: "Stratège SEO Chirurgical (4 Étapes)",
    specialtyBadge: "PROTOCOLE SEO 4 ÉTAPES",
    specialtyShort: "SEO Chirurgical en 4 Étapes",
    specialtyDetail:
      "Expert en architecture sémantique, maillage interne, optimisation Core Web Vitals et conquête de mots-clés transactionnels à haute intention d'achat.",
    assignedServices: ["seo"],
    primaryRoute: "/services/seo",
    punchline:
      "La publicité s'arrête dès que vous coupez votre carte bancaire. Le référencement naturel construit un actif qui vous appartient.",
    bio: "Expert en architecture sémantique, maillage interne, optimisation Core Web Vitals et conquête de mots-clés transactionnels à haute intention d'achat.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "hugo.marchand@xragencyai.com",
    portraitSrc: storySchoolMentor,
    portraitUrl: storySchoolMentor,
    portraitPosition: "object-[50%_18%]",
    cameraSpec: "85mm f/2.0 · Lumière Latérale Studio · Noir & Or",
    LensSpec: "85mm f/2.0 • Studio Noir & Or",
    studioFilter: "contrast(1.09) saturate(0.85) brightness(0.95)",
    kpiHighlight: "Top 3 Organique",
    xpPoints: 11800,
    xp: 11800,
    rankName: "Master Rainmaker",
    rpgRank: "Master Rainmaker",
    dealsClosedMonth: 11,
    mrrGeneratedEur: 5489,
    mrrManaged: 5489,
    revenueMonthEur: 19400,
    monthlyRevenueGenerated: 19400,
    streakDays: 5,
  },
  {
    id: "julie",
    firstName: "Julie",
    fullName: "Julie Beaulieu",
    roleTitle: "Responsable WebCare, Infrastructure Cloud & Continuité",
    role: "Directrice WebCare & SLA < 4h",
    specialtyBadge: "WEBCARE & SÉCURITÉ PROACTIVE",
    specialtyShort: "WebCare, Cloud & SLA < 4h",
    specialtyDetail:
      "Interlocutrice dédiée de tous les clients sous contrat WebCare (Essentiel 29€/m, Pro 49€/m, Business 99€/m) et gestionnaire de l'infrastructure annuelle souveraine.",
    assignedServices: ["maintenance", "webcare"],
    primaryRoute: "/webcare",
    punchline:
      "Vous dirigez votre entreprise, je veille sur votre site 24h/24 : sauvegardes, sécurité SSL, mises à jour et modifications sous 24h.",
    bio: "Interlocutrice dédiée de tous les clients sous contrat WebCare (Essentiel 29€/m, Pro 49€/m, Business 99€/m) et gestionnaire de l'infrastructure annuelle souveraine.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "julie.beaulieu@xragencyai.com",
    portraitSrc: svcWebcareEditorial,
    portraitUrl: svcWebcareEditorial,
    portraitPosition: "object-[50%_24%]",
    cameraSpec: "85mm f/1.8 · Studio Corporate Paris · Grain Fin",
    LensSpec: "85mm f/1.8 • Lumière Naturelle",
    studioFilter: "contrast(1.06) saturate(0.9) brightness(0.97)",
    kpiHighlight: "SLA Réponse < 4h",
    xpPoints: 9400,
    xp: 9400,
    rankName: "Master Rainmaker",
    rpgRank: "Master Rainmaker",
    dealsClosedMonth: 22,
    mrrGeneratedEur: 3890,
    mrrManaged: 3890,
    revenueMonthEur: 14200,
    monthlyRevenueGenerated: 14200,
    streakDays: 12,
  },
  {
    id: "christelle",
    firstName: "Christelle",
    fullName: "Christelle Laurent",
    roleTitle: "Directrice de Création, Branding & Systèmes de Marque",
    role: "Directrice Artistique & Branding",
    specialtyBadge: "BRANDING & IDENTITÉ DE MARQUE",
    specialtyShort: "Branding & Identité Dark Luxury",
    specialtyDetail:
      "Directrice artistique spécialisée dans les logotypes signatures, les chartes graphiques éditoriales et l'habillage haut de gamme pour entreprises exigeantes.",
    assignedServices: ["branding"],
    primaryRoute: "/services/branding",
    punchline:
      "Le prix que vos clients acceptent de payer dépend directement de la stature visuelle que votre marque dégage à la première seconde.",
    bio: "Directrice artistique spécialisée dans les logotypes signatures, les chartes graphiques éditoriales et l'habillage haut de gamme pour entreprises exigeantes.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "christelle.laurent@xragencyai.com",
    portraitSrc: svcBrandingEditorial,
    portraitUrl: svcBrandingEditorial,
    portraitPosition: "object-[45%_25%]",
    cameraSpec: "85mm f/1.4 · Lumière Continue Studio · Contraste Doux",
    LensSpec: "85mm f/1.4 • Studio Éditorial",
    studioFilter: "contrast(1.08) saturate(0.88) brightness(0.96)",
    kpiHighlight: "Identité Prestige",
    xpPoints: 8650,
    xp: 8650,
    rankName: "Master Rainmaker",
    rpgRank: "Master Rainmaker",
    dealsClosedMonth: 14,
    mrrGeneratedEur: 1850,
    mrrManaged: 1850,
    revenueMonthEur: 16800,
    monthlyRevenueGenerated: 16800,
    streakDays: 4,
  },
  {
    id: "damien",
    firstName: "Damien",
    fullName: "Damien Kervella",
    roleTitle: "Ingénieur Caisse POS, CRM Omnicanal & Robotique",
    role: "Ingénieur Caisses POS & Robotique",
    specialtyBadge: "POS 0% COMMISSION & ROBOTIQUE",
    specialtyShort: "Robotique, Bornes & Caisses POS",
    specialtyDetail:
      "Architecte des déploiements matériels et logiciels en point de vente : terminaux de caisse POS, écrans cuisine KDS, commande en ligne directe et robots de service.",
    assignedServices: ["robotics", "pos", "robotique"],
    primaryRoute: "/services/robotique",
    punchline:
      "Arrêtez de céder 30 % de votre marge à des plateformes tierces. Reprenez le contrôle de votre caisse, de votre cuisine et de vos livraisons.",
    bio: "Architecte des déploiements matériels et logiciels en point de vente : terminaux de caisse POS, écrans cuisine KDS, commande en ligne directe et robots de service.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "damien.kervella@xragencyai.com",
    portraitSrc: storyRestaurantOwner,
    portraitUrl: storyRestaurantOwner,
    portraitPosition: "object-[52%_20%]",
    cameraSpec: "85mm f/1.8 · Reportage Studio · Grain Argentique",
    LensSpec: "85mm f/1.8 • Grain Argentique",
    studioFilter: "contrast(1.1) saturate(0.86) brightness(0.95)",
    kpiHighlight: "0% Commission Tiers",
    xpPoints: 12900,
    xp: 12900,
    rankName: "Master Rainmaker",
    rpgRank: "Master Rainmaker",
    dealsClosedMonth: 9,
    mrrGeneratedEur: 2994,
    mrrManaged: 2994,
    revenueMonthEur: 26500,
    monthlyRevenueGenerated: 26500,
    streakDays: 6,
  },
  {
    id: "edgar",
    firstName: "Edgar",
    fullName: "Edgar Solignac",
    roleTitle: "Stratège Social Media, Contenus Viraux & Réseau Partenaires",
    role: "Stratège Social Media & Affiliation",
    specialtyBadge: "SOCIAL MEDIA & AFFILIATION",
    specialtyShort: "Social Media, Meta Ads & Affiliation",
    specialtyDetail:
      "Responsable des pôles Social Media (Instagram, TikTok, LinkedIn, Facebook) et animateur du réseau d'apporteurs d'affaires à commissions récurrentes.",
    assignedServices: ["social", "affiliation"],
    primaryRoute: "/services/social",
    punchline:
      "L'attention est la monnaie la plus rare du marché. Nous transformons votre savoir-faire en formats courts qui attirent et fidélisent.",
    bio: "Responsable des pôles Social Media (Instagram, TikTok, LinkedIn, Facebook) et animateur du réseau d'apporteurs d'affaires à commissions récurrentes.",
    phoneDisplay: "+33 7 67 56 67 83",
    whatsappPhone: "33767566783",
    email: "edgar.solignac@xragencyai.com",
    portraitSrc: heroAtelierEditorial,
    portraitUrl: heroAtelierEditorial,
    portraitPosition: "object-[46%_22%]",
    cameraSpec: "85mm f/1.8 · Portrait Éditorial · Fond Sombre Texturé",
    LensSpec: "85mm f/1.8 • Fond Sombre Texturé",
    studioFilter: "contrast(1.08) saturate(0.88) brightness(0.96)",
    kpiHighlight: "Stratégie social media",
    xpPoints: 6850,
    xp: 6850,
    rankName: "Closer Pro",
    rpgRank: "Closer Pro",
    dealsClosedMonth: 12,
    mrrGeneratedEur: 5988,
    mrrManaged: 5988,
    revenueMonthEur: 15900,
    monthlyRevenueGenerated: 15900,
    streakDays: 3,
  },
];

export function getAdvisorByService(serviceId: string): XrAdvisor {
  const normalized = serviceId.toLowerCase();
  return XR_ADVISORS.find((a) => a.assignedServices.includes(normalized)) ?? XR_ADVISORS[1];
}

export function getAdvisorById(id: string): XrAdvisor {
  return XR_ADVISORS.find((a) => a.id === id.toLowerCase()) ?? XR_ADVISORS[0];
}

export function buildAdvisorWhatsAppUrl(advisor: XrAdvisor, customContext?: string): string {
  const msg = customContext
    ? `Bonjour ${advisor.firstName} (XR Agency), ${customContext}`
    : `Bonjour ${advisor.firstName}, je découvre votre profil sur XR Agency (${advisor.specialtyBadge}) et je souhaite échanger sur mon projet.`;
  return `https://wa.me/${advisor.whatsappPhone}?text=${encodeURIComponent(msg)}`;
}
