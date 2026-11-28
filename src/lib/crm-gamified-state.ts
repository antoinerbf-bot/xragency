export interface MaquetteRequest {
  id: string;
  leadId: string;
  closerName: string;
  closerEmail: string;
  company: string;
  contactName: string;
  phone: string;
  city: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  serviceType:
    | "Site Web & Maquette 3D"
    | "Logiciel Caisse POS & Borne"
    | "Refonte Noir & Or"
    | "Pack Omnicanal Robotique";
  budgetEur: number;
  notes: string;
  status: "pending_boss" | "in_design" | "ready_to_close" | "closed";
  createdAt: string;
}

export interface CloserLeadAssignment {
  leadId: string;
  assignedToEmail: string;
  closerStatus: "en_cours" | "prospecte" | "maquette_demandee" | "signe";
  lastCallDate?: string;
  followUpNote?: string;
}

export interface SellerEgoStat {
  id: string;
  name: string;
  email: string;
  avatar3D: string;
  avatarEmoji: string;
  title: string;
  rankTitle: string;
  rankBadge: string;
  scoreEgo: number; // Score global
  revenueSignedEur: number; // CA signé
  commissionEarnedEur: number; // Primes
  maquettesRequested: number; // Maquettes générées
  closingRatePct: number; // % de transfo
  punchline: string;
  color: string;
  gradient: string;
  borderGlow: string;
  isKing?: boolean;
}

// Initial Mock Maquettes
export const DEFAULT_MAQUETTES: MaquetteRequest[] = [
  {
    id: "maq-1",
    leadId: "lead-paris-1",
    closerName: "Lucas Martin",
    closerEmail: "lucas@xragency.fr",
    company: "Le Bistrot de la Tour",
    contactName: "Alexandre Dupont",
    phone: "+33 6 42 18 90 12",
    city: "Paris 15e",
    googleMapsUrl: "https://maps.google.com/?q=Le+Bistrot+de+la+Tour+Paris",
    instagramUrl: "https://instagram.com/lebistrotdelatour",
    facebookUrl: "https://facebook.com/lebistrotdelatour",
    websiteUrl: "https://lebistrot-ancien-site.fr",
    serviceType: "Logiciel Caisse POS & Borne",
    budgetEur: 2000,
    notes:
      "Gérant très réceptif aux 30% économisés sur Uber Eats. Veut voir la maquette du ticket caisse thermique et l'écran tactile avant vendredi 14h.",
    status: "pending_boss",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "maq-2",
    leadId: "lead-bruxelles-2",
    closerName: "Sarah Benali",
    closerEmail: "sarah@xragency.fr",
    company: "Luxe & SPA Botanica",
    contactName: "Éléonore Van Damme",
    phone: "+32 470 12 34 56",
    city: "Bruxelles",
    googleMapsUrl: "https://maps.google.com/?q=Luxe+SPA+Botanica+Bruxelles",
    instagramUrl: "https://instagram.com/botanica_spa_brussels",
    facebookUrl: "",
    websiteUrl: "https://botanicaspa.be",
    serviceType: "Site Web & Maquette 3D",
    budgetEur: 5000,
    notes:
      "Spa haut de gamme. Exige un jumeau 3D immersif style Les Sims/GTA pour faire visiter les cabines de massage privatives. Gros potentiel.",
    status: "in_design",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

// Leaderboard Concours d'Ego des Vendeurs
export const DEFAULT_SELLER_EGO_STATS: SellerEgoStat[] = [
  {
    id: "seller-1",
    name: "Sarah Benali",
    email: "sarah@xragency.fr",
    avatar3D: "🧝‍♀️",
    avatarEmoji: "🎯",
    title: "Conseillère High-Ticket & SEO",
    rankTitle: "Reine du Closing (Numéro 1)",
    rankBadge: "👑 MAÎTRESSE ABSOLUE",
    scoreEgo: 9850,
    revenueSignedEur: 32500,
    commissionEarnedEur: 6500,
    maquettesRequested: 14,
    closingRatePct: 34,
    punchline: "« Je ne vends pas, je règle des chèques. Suivez mon rythme les garçons ! »",
    color: "#ec4899",
    gradient: "from-pink-500 via-rose-600 to-purple-800",
    borderGlow: "border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.5)]",
    isKing: true,
  },
  {
    id: "seller-2",
    name: "Lucas Martin",
    email: "lucas@xragency.fr",
    avatar3D: "🥷",
    avatarEmoji: "⚔️",
    title: "Closer d'Élite Caisse & Web",
    rankTitle: "Chasseur Alpha (Numéro 2)",
    rankBadge: "🥈 TUEUR À GAGES",
    scoreEgo: 8720,
    revenueSignedEur: 28000,
    commissionEarnedEur: 5040,
    maquettesRequested: 12,
    closingRatePct: 29,
    punchline:
      "« Sarah a eu de la chance sur le spa. Ce mois-ci la couronne de l'agence est pour moi ! »",
    color: "#ef4444",
    gradient: "from-red-500 via-orange-600 to-amber-700",
    borderGlow: "border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]",
  },
  {
    id: "seller-3",
    name: "Karim Diallo",
    email: "karim@xragency.fr",
    avatar3D: "🥋",
    avatarEmoji: "⭐",
    title: "Apprenant Dojo XR School (J42)",
    rankTitle: "Le Prodige Émergent (Numéro 3)",
    rankBadge: "🥉 JEUNE LOUP",
    scoreEgo: 4200,
    revenueSignedEur: 6000,
    commissionEarnedEur: 1200,
    maquettesRequested: 5,
    closingRatePct: 22,
    punchline: "« Je suis qu'au Jour 42 sur 90 et je vous talonne déjà. Tremblez ! »",
    color: "#00f2fe",
    gradient: "from-[#00f2fe] via-cyan-600 to-blue-800",
    borderGlow: "border-[#00f2fe] shadow-[0_0_40px_rgba(0,242,254,0.5)]",
  },
  {
    id: "seller-4",
    name: "Thomas (Atelier)",
    email: "thomas@xragency.fr",
    avatar3D: "🤖",
    avatarEmoji: "🛠️",
    title: "Chef d'Atelier Hardware & 3D",
    rankTitle: "Le Fournisseur de Victoires",
    rankBadge: "⚙️ MECHA MASTER",
    scoreEgo: 3100,
    revenueSignedEur: 4000,
    commissionEarnedEur: 800,
    maquettesRequested: 3,
    closingRatePct: 40,
    punchline:
      "« Sans mes caisses et mes jumeaux 3D, vous vendriez du vent. Respectez l'atelier ! »",
    color: "#f59e0b",
    gradient: "from-amber-500 via-yellow-600 to-orange-800",
    borderGlow: "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.5)]",
  },
];

// Prospecting Sectors & Frameworks for XR School 90j
export interface ProspectingSector {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  avgDeal: string;
  hookPitch: string;
  settingDmTemplate: string;
  closingKeyArguments: string[];
  killerObjection: {
    objection: string;
    riposte: string;
  };
}

export const XR_SCHOOL_SECTORS: ProspectingSector[] = [
  {
    id: "restauration",
    name: "Restaurants, Pizzerias & Dark Kitchens",
    icon: "🍕",
    tagline: "Caisse POS tactile 2 000 € · 0% de commission vs Uber Eats 30%",
    avgDeal: "2 000 € à 5 000 €",
    hookPitch:
      "« Bonjour, vous faites combien de commandes par mois sur Uber Eats et Deliveroo ? Sur 10 000 € de CA, vous leur donnez 3 000 € chaque mois. Avec notre caisse et site direct à 2 000 €, c'est rentabilisé en 20 jours. »",
    settingDmTemplate:
      "« Bonjour [Prénom du gérant], félicitations pour vos plats chez [Nom du restaurant] ! Petite question rapide : vous êtes au courant qu'en France et Belgique vous pouvez économiser 30% de commission sur vos livraisons avec une caisse propriétaire ? Je vous montre une démo vidéo de 45 secondes ? »",
    closingKeyArguments: [
      "Estimation d’économies à calculer selon le périmètre et les coûts réels",
      "Écran tactile 15.6'' + imprimante ticket cuisine automatique 80mm",
      "Gestion des stocks au gramme près & suivi des livreurs en temps réel",
      "Option jumeau 3D immersif pour réserver les tables façon Sims/GTA",
    ],
    killerObjection: {
      objection: "« 2 000 € c'est trop cher pour changer de caisse ! »",
      riposte:
        "« Ce qui est cher, c'est de laisser 36 000 € par an à Uber Eats. Notre solution coûte 2 000 € une seule fois et vous appartient à vie. Voulez-vous continuer à enrichir Uber ou garder votre marge pour vous ? »",
    },
  },
  {
    id: "artisans_btp",
    name: "Artisans, BTP & Rénovation",
    icon: "🔨",
    tagline: "Visibilité locale · Devis et éléments de preuve vérifiables",
    avgDeal: "1 500 € à 3 500 €",
    hookPitch:
      "« Un chantier moyen chez vous rapporte entre 5 000 € et 25 000 €. Si vous n'êtes pas dans les 3 premiers sur Google Maps dans votre ville, ce sont vos concurrents qui décrochent tous les appels. »",
    settingDmTemplate:
      "« Bonjour [Nom de l'artisan], j'ai vu vos superbes réalisations sur votre page. Par contre quand on tape [Métier] à [Ville], vous apparaissez en 8ème position sur Google Maps. Vous perdez 10 à 15 demandes de devis qualifiées chaque semaine. On en parle 2 minutes ? »",
    closingKeyArguments: [
      "Stratégie de visibilité locale Google Maps, sans garantie de classement",
      "Estimateur de devis instantané qui filtre les curieux sans budget",
      "Galerie avant/après ultra percutante avec avis clients certifiés",
    ],
    killerObjection: {
      objection: "« J'ai déjà le bouche-à-oreille, je n'ai pas besoin d'internet. »",
      riposte:
        "« Le bouche-à-oreille c'est super pour survivre, mais quand un client entend parler de vous, il vous cherche d'abord sur Google. S'il tombe sur votre concurrent avec 80 avis 5 étoiles, il signe avec lui. »",
    },
  },
  {
    id: "boutiques_retail",
    name: "Boutiques, Mode & Commerces de Proximité",
    icon: "🛍️",
    tagline: "Boutique Omnicanale Click & Collect · Caisse synchronisée",
    avgDeal: "2 500 € à 4 500 €",
    hookPitch:
      "« Les gens voient votre vitrine en passant le soir quand c'est fermé. Avec notre boutique connectée et notre jumeau 3D, ils peuvent visiter vos rayons et acheter en Click & Collect 24h/24. »",
    settingDmTemplate:
      "« Hello l'équipe de [Boutique] ! Vos collections sont magnifiques. Est-ce que vos clientes peuvent commander en ligne avec retrait direct en boutique sans friction ? On a un modèle prêt pour vous qui double le panier moyen. »",
    closingKeyArguments: [
      "Synchronisation parfaite stock magasin physique et boutique en ligne",
      "Fidélité SMS automatique pour faire revenir les clientes tous les mois",
      "Vitrine interactive 3D immersive visible depuis smartphone",
    ],
    killerObjection: {
      objection: "« Je n'ai pas le temps de gérer un site internet en plus du magasin. »",
      riposte:
        "« C'est exactement pour ça qu'on synchronise tout : quand vous bippez un vêtement en caisse, il se retire tout seul du site. Vous n'avez strictement rien à faire manuellement. »",
    },
  },
  {
    id: "immobilier_luxe",
    name: "Immobilier de Prestige, Châteaux & Hôtels",
    icon: "🏰",
    tagline: "Jumeaux 3D immersifs GTA 6 / Sims · Expérience Visuelle Ultra High-Ticket",
    avgDeal: "5 000 € à 15 000 €",
    hookPitch:
      "« Les acheteurs fortunés ou internationaux ne se déplacent plus sans immersion totale. Nous recréons votre domaine en 3D photoréaliste interactive digne d'un jeu vidéo next-gen. »",
    settingDmTemplate:
      "« Bonjour [Direction], nous concevons des jumeaux numériques 3D immersifs pour l'immobilier d'exception. Nous avons préparé une maquette interactive de démonstration pour votre propriété. Qui est la personne en charge du marketing pour lui transmettre ? »",
    closingKeyArguments: [
      "Visite interactive WebGL fluide sur mobile, tablette et casque VR sans installation",
      "Effet 'WOUAH' immédiat qui justifie des prix de vente records",
      "Sélection des matériaux et éclairages jour/nuit interactifs",
    ],
    killerObjection: {
      objection: "« Une simple vidéo 4K par drone suffit largement. »",
      riposte:
        "« Une vidéo est passive : le client regarde sans agir. Dans notre jumeau 3D, l'acheteur est acteur : il ouvre les portes, visite chaque suite à son rythme et ressent les volumes. La conversion émotionnelle est 5 fois supérieure. »",
    },
  },
  {
    id: "beaute_salons",
    name: "Instituts de Beauté, Coiffure & Salons d'Esthétique",
    icon: "✨",
    tagline: "Système de Réservation d'Acomptes Anti-No-Show & Caisse Tactile",
    avgDeal: "1 800 € à 3 200 €",
    hookPitch:
      "« Combien de rendez-vous non honorés (no-show) avez-vous par semaine ? Avec le prélèvement automatique de 30% d'acompte à la réservation, vous passez de 15% de lapins à 0%. »",
    settingDmTemplate:
      "« Bonjour [Prénom], magnifique travail sur les dernières poses ! Avez-vous encore des clientes qui réservent et qui ne viennent pas ? On installe des agendas intelligents qui prélèvent un acompte automatique et bloquent les no-shows. 5 min pour en parler ? »",
    closingKeyArguments: [
      "Acompte obligatoire : 0 euro de perte sèche sur les annulations",
      "Rappels automatiques par SMS 24h et 2h avant le RDV",
      "Vente additionnelle de produits de soins au moment du paiement",
    ],
    killerObjection: {
      objection: "« Mes clientes ne voudront jamais payer d'acompte par carte. »",
      riposte:
        "« C'est faux : les clientes sérieuses préfèrent payer un acompte pour garantir leur créneau. Celles qui refusent sont justement celles qui ne seraient pas venues et vous auraient fait perdre 80 €. »",
    },
  },
];

// 3 Phases de la Vente : Setting, Diagnostic, Closing
export interface SalesPhase {
  phaseNumber: number;
  phaseName: string;
  badge: string;
  color: string;
  goal: string;
  steps: {
    title: string;
    description: string;
    scriptDialogue: string;
    proTip: string;
  }[];
}

export const XR_SALES_PHASES: SalesPhase[] = [
  {
    phaseNumber: 1,
    phaseName: "Le Setting (Prise de Contact & Hook)",
    badge: "PHASE 1 · ACCROCHE 45s",
    color: "from-blue-500 to-cyan-500",
    goal: "Capter l'attention en 45 secondes chrono et obtenir l'accord pour une démo / maquette personnalisée.",
    steps: [
      {
        title: "1. L'Accroche par la Douleur Financière",
        description:
          "Ne parlez JAMAIS de technique. Parlez immédiatement de perte d'argent ou de commission volée.",
        scriptDialogue:
          "« Bonjour Alexandre, je vous appelle au sujet des 30% de commission que vous laissez à Uber Eats chaque semaine sur votre établissement. Vous avez fait le calcul de ce que ça vous coûte sur l'année ? »",
        proTip:
          "Laissez un silence de 3 secondes après avoir posé la question. Laissez le gérant répondre avec émotion.",
      },
      {
        title: "2. La Proposition de la Maquette Gratuite",
        description:
          "Baissez la barrière de résistance en offrant une maquette visuelle sur-mesure préparée par notre studio.",
        scriptDialogue:
          "« Mon studio 3D prépare actuellement une maquette personnalisée de votre caisse et de votre menu tactile pour vous montrer concrètement comment économiser 3 000 € par mois. On regarde ça ensemble demain à 14h ou jeudi à 11h ? »",
        proTip:
          "Donnez toujours un choix binaire (demain 14h ou jeudi 11h) plutôt que de demander 'Quand êtes-vous disponible ?'.",
      },
    ],
  },
  {
    phaseNumber: 2,
    phaseName: "Le Diagnostic & Qualification",
    badge: "PHASE 2 · DÉMONSTRATION ROI",
    color: "from-purple-500 to-pink-500",
    goal: "Créer le fossé entre sa situation douloureuse actuelle et les milliers d'euros qu'il va économiser.",
    steps: [
      {
        title: "1. Les 3 Questions Choc de Qualification",
        description: "Faites-lui avouer lui-même ses chiffres réels.",
        scriptDialogue:
          "« Question 1 : Combien de commandes traitez-vous par jour ? Question 2 : Avez-vous déjà eu des bugs de caisse ou des livreurs qui se plaignent ? Question 3 : Si on divise par 2 vos frais de commission, qu'est-ce que vous faites de ces 20 000 € économisés ? »",
        proTip:
          "Notez minutieusement ses réponses dans le CRM : elles serviront de munitions pour le closing.",
      },
      {
        title: "2. Présentation de la Maquette XR Agency",
        description: "Montrez-lui la maquette interactive envoyée par Antoine.",
        scriptDialogue:
          "« Regardez sur votre écran : voici exactement votre restaurant avec votre logo, vos plats et votre terminal de commande 0% commission. C'est propre, c'est instantané. Qu'en pensez-vous ? »",
        proTip:
          "Faites-lui manipuler la maquette lui-même. Dès qu'il clique, il commence déjà à se projeter propriétaire.",
      },
    ],
  },
  {
    phaseNumber: 3,
    phaseName: "Le Closing & Prise de Paiement",
    badge: "PHASE 3 · ENCAISSEMENT",
    color: "from-emerald-500 to-green-600",
    goal: "Verrouiller le contrat, encaisser l'acompte et célébrer la victoire !",
    steps: [
      {
        title: "1. Le Cadre de l'Offre Fermée",
        description: "Présentez le tarif sans trembler, en rappelant le ROI immédiat.",
        scriptDialogue:
          "« Pour installer ce système complet avec écran tactile, imprimante cuisine, application livreur et site direct, l'investissement est de 2 000 € une seule fois. C'est amorti en 20 jours. On démarre l'installation ce lundi ? »",
        proTip:
          "Celui qui parle le premier après avoir énoncé le prix perd la négociation. Taisez-vous et attendez sa réponse.",
      },
      {
        title: "2. Verrouillage du Paiement Immédiat",
        description:
          "Prenez l'acompte de 500 € ou 1 000 € directement par lien de paiement sécurisé.",
        scriptDialogue:
          "« Je vous envoie le lien Stripe sécurisé sur votre mobile pour bloquer le matériel à l'atelier de Thomas. Je reste en ligne avec vous le temps que vous validiez l'acompte. »",
        proTip:
          "Dès que le paiement passe : appuyez sur le bouton VENTE SIGNÉE dans votre arène pour lancer les confettis !",
      },
    ],
  },
];

// Helper local storage functions
export function getSavedMaquettes(): MaquetteRequest[] {
  if (typeof window === "undefined") return DEFAULT_MAQUETTES;
  try {
    const raw = localStorage.getItem("xr_crm_maquettes");
    if (raw) return JSON.parse(raw);
  } catch {
    /* Audio or storage fallback: keep the interface usable. */
  }
  return DEFAULT_MAQUETTES;
}

export function saveMaquettes(list: MaquetteRequest[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("xr_crm_maquettes", JSON.stringify(list));
    window.dispatchEvent(new Event("xr_maquettes_updated"));
  } catch {
    /* Audio or storage fallback: keep the interface usable. */
  }
}

export function getSavedEgoStats(): SellerEgoStat[] {
  if (typeof window === "undefined") return DEFAULT_SELLER_EGO_STATS;
  try {
    const raw = localStorage.getItem("xr_crm_ego_stats");
    if (raw) return JSON.parse(raw);
  } catch {
    /* Audio or storage fallback: keep the interface usable. */
  }
  return DEFAULT_SELLER_EGO_STATS;
}

export function saveEgoStats(list: SellerEgoStat[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("xr_crm_ego_stats", JSON.stringify(list));
    window.dispatchEvent(new Event("xr_ego_updated"));
  } catch {
    /* Audio or storage fallback: keep the interface usable. */
  }
}
