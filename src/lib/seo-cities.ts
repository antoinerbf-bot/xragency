export type CitySeoData = {
  slug: string;
  name: string;
  nativeName?: string;
  country: "France" | "Vietnam";
  region: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  badge: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Highlight: string;
  tagline: string;
  localMarketIntro: string;
  sectors: string[];
  localKeyPoints: {
    title: string;
    description: string;
  }[];
  keywords: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const CITIES_DATA: Record<string, CitySeoData> = {
  paris: {
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Île-de-France",
    postalCode: "75008",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Paris — Agence Web de Prestige & Création de Site Internet",
    metaDescription:
      "XR Agency Paris conçoit des sites internet sur mesure, du SEO local Google, du branding haute joaillerie et des automatisations IA pour les entreprises d'Île-de-France.",
    h1: "Création de Site Internet & Agence Web à Paris",
    h1Highlight: "L'Excellence Numérique dans la Capitale",
    tagline:
      "Haute direction artistique, architecture 3D WebGL et référencement naturel d'élite pour marques, family offices, cabinets et entreprises parisiennes d'envergure.",
    localMarketIntro:
      "À Paris, la concurrence numérique exige une identité visuelle sans compromis et une visibilité immédiate en tête des résultats Google. XR Agency accompagne les marques du Triangle d'Or, les cabinets d'affaires, les acteurs de l'hôtellerie de luxe et les PME franciliennes dans la création d'écosystèmes digitaux à fort pouvoir de conversion.",
    sectors: [
      "Mode & Joaillerie",
      "Cabinets d'Avocats & Conseil",
      "Immobilier de Prestige",
      "Hôtellerie & Gastronomie",
      "Fintech & SaaS",
    ],
    localKeyPoints: [
      {
        title: "Direction Artistique Haute Couture",
        description:
          "Design immersif digne des plus grandes maisons parisiennes, typographies de prestige et animations adaptées aux appareils et au contexte du projet.",
      },
      {
        title: "SEO local Google Paris & Île-de-France",
        description:
          "Positionnement stratégique sur vos requêtes à fort volume d'intention et travail de visibilité locale sur Google Maps.",
      },
      {
        title: "Ingénierie Web Next-Gen",
        description:
          "Développement React 19 / TanStack ultra-rapide avec optimisations techniques adaptées aux objectifs et contraintes du projet.",
      },
      {
        title: "Accompagnement sur mesure",
        description:
          "Calendrier défini selon le périmètre, les contenus et les intégrations du projet.",
      },
    ],
    keywords: [
      "xragency paris",
      "agence web paris",
      "creation site internet paris",
      "agence digitale paris",
      "studio web paris",
      "seo paris",
      "agence web 75008",
      "referencement google paris",
    ],
    faqs: [
      {
        question: "Pourquoi choisir XR Agency pour créer un site internet à Paris ?",
        answer:
          "XR Agency allie une direction artistique de niveau studio international, une performance technique travaillée et une stratégie d'acquisition organique (SEO) conçue pour améliorer la visibilité sur vos requêtes stratégiques à Paris.",
      },
      {
        question: "Quels sont les délais de livraison pour une entreprise parisienne ?",
        answer:
          "Le calendrier dépend du périmètre, des contenus et des intégrations. Il est établi et validé avant le démarrage.",
      },
      {
        question: "Comment travaillez-vous la visibilité locale à Paris sur Google Maps ?",
        answer:
          "Nous analysons le profil d’établissement, les citations locales, la cohérence NAP, la concurrence et les zones de chalandise à Paris. Les objectifs sont définis après diagnostic, sans garantie de position.",
      },
    ],
  },

  marseille: {
    slug: "marseille",
    name: "Marseille",
    country: "France",
    region: "Provence-Alpes-Côte d'Azur",
    postalCode: "13001",
    coordinates: { lat: 43.2965, lng: 5.3698 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Marseille — Agence Web & Création de Site Internet PACA",
    metaDescription:
      "Studio web de référence à Marseille. Création de sites internet sur mesure, SEO local Google Maps, branding et IA pour les entreprises marseillaises et de la région PACA.",
    h1: "Création de Site Internet & Agence Web à Marseille",
    h1Highlight: "Déployez Votre Puissance Digitale en PACA",
    tagline:
      "Des sites internet rapides, percutants et optimisés pour générer des leads qualifiés à Marseille, Aix-en-Provence et sur tout le littoral méditerranéen.",
    localMarketIntro:
      "Deuxième métropole de France et pôle économique du bassin méditerranéen, Marseille connaît un essor entrepreneurial majeur. XR Agency propulse les PME marseillaises, les acteurs maritimes, les professions libérales et les acteurs de la restauration vers le sommet de Google avec un design mémorable.",
    sectors: [
      "Maritime & Logistique",
      "Immobilier Méditerranée",
      "Hôtellerie & Restauration",
      "Santé & Bien-être",
      "Commerce & PME",
    ],
    localKeyPoints: [
      {
        title: "SEO Local Marseille & Métropole Aix-Marseille",
        description:
          "Captation des requêtes géolocalisées pour améliorer votre visibilité auprès des recherches locales pertinentes.",
      },
      {
        title: "Design Méditerranéen & Expérience Immersive",
        description:
          "Esthétique solaire, moderne et épurée, mettant en valeur l'authenticité et le professionnalisme de votre marque.",
      },
      {
        title: "Performance Mobile First",
        description:
          "Les usages mobiles occupent une place importante : les interfaces sont conçues en priorité pour les écrans tactiles.",
      },
      {
        title: "Support Réactif & Maintenance WebCare",
        description:
          "Maintenance, sauvegardes et mises à jour selon le périmètre défini au contrat.",
      },
    ],
    keywords: [
      "xragency marseille",
      "agence web marseille",
      "creation site internet marseille",
      "agence digitale marseille",
      "seo marseille",
      "creation site web marseille 13",
      "referencement local marseille",
    ],
    faqs: [
      {
        question:
          "Quel est le coût moyen pour un site web professionnel à Marseille avec XR Agency ?",
        answer:
          "Nos formules démarrent avec des packs vitrine transparents sans frais cachés, et des abonnements WebCare optionnels pour la maintenance et les évolutions continues.",
      },
      {
        question: "Pouvez-vous intervenir sur Aix-en-Provence et les Bouches-du-Rhône ?",
        answer:
          "Absolument. Nous couvrons l'ensemble de la métropole Aix-Marseille-Provence, Aubagne, La Ciotat, Martigues et tout le département des Bouches-du-Rhône.",
      },
      {
        question: "Comment améliorer ma visibilité sur Google à Marseille ?",
        answer:
          "Grâce à notre protocole SEO combinant architecture sémantique locale, performance technique travaillée et optimisation intensive de votre fiche Google Business Profile.",
      },
    ],
  },

  lyon: {
    slug: "lyon",
    name: "Lyon",
    country: "France",
    region: "Auvergne-Rhône-Alpes",
    postalCode: "69002",
    coordinates: { lat: 45.764, lng: 4.8357 },
    badge: "PÔLE RHÔNE-ALPES · PRESQU'ÎLE & PART-DIEU",
    metaTitle: "XR Agency Lyon — Agence Web & Création de Site Internet sur Mesure",
    metaDescription:
      "Création de sites internet sur mesure, référencement naturel, visibilité locale, branding et solutions digitales pour les entreprises lyonnaises et régionales.",
    h1: "Création de Site Internet & Agence Web à Lyon",
    h1Highlight: "L'Ingénierie Digitale au Cœur de Lyon",
    tagline:
      "Performance, rigueur esthétique et acquisition organique pour les entreprises de la Presqu'île, Part-Dieu, Confluence et de la région Auvergne-Rhône-Alpes.",
    localMarketIntro:
      "Carrefour européen de l'industrie, de la gastronomie et de l'innovation tech, Lyon rassemble des entreprises exigeantes. XR Agency conçoit des plateformes digitales robustes qui transforment les visiteurs en clients fidèles et consolident votre autorité sur le marché lyonnais.",
    sectors: [
      "Industrie & Ingénierie",
      "Gastronomie & Terroir",
      "Santé & Biotech",
      "Finance & Gestion de Patrimoine",
      "Tech & E-commerce",
    ],
    localKeyPoints: [
      {
        title: "Autorité SEO Lyon & Grand Lyon",
        description:
          "Stratégie de mots-clés hyper-ciblée pour dominer les recherches stratégiques de la métropole lyonnaise.",
      },
      {
        title: "Architecture Technique Sans Compromis",
        description:
          "Architecture soignée, performance travaillée et prise en compte des exigences de protection des données applicables au projet.",
      },
      {
        title: "Intégration CRM & Automatisation Commerciale",
        description:
          "Connectez votre site internet directement à vos processus de vente pour ne perdre aucun prospect qualifié.",
      },
      {
        title: "Design Épuré & Premium",
        description:
          "Une image de marque solide et intemporelle qui reflète l'excellence lyonnaise auprès de vos partenaires.",
      },
    ],
    keywords: [
      "xragency lyon",
      "agence web lyon",
      "creation site internet lyon",
      "agence digitale lyon",
      "seo lyon",
      "creation site web lyon 69",
      "studio web lyon",
    ],
    faqs: [
      {
        question: "Comment XR Agency aide-t-elle les PME lyonnaises à se démarquer ?",
        answer:
          "En créant des sites sur mesure qui s'éloignent des modèles génériques WordPress, avec un design distinctif et un référencement naturel qui surclasse vos concurrents.",
      },
      {
        question: "Proposez-vous la refonte de sites web existants à Lyon ?",
        answer:
          "Oui, nous prenons en charge la refonte complète avec conservation rigoureuse de votre historique de référencement Google et redirection 301 de vos URLs stratégiques.",
      },
      {
        question: "Travaillez-vous avec des clients en région Auvergne-Rhône-Alpes ?",
        answer:
          "Nous accompagnons des entreprises à Lyon, Villeurbanne, Saint-Étienne, Grenoble, Annecy, Valence et dans toute la région Auvergne-Rhône-Alpes.",
      },
    ],
  },

  bordeaux: {
    slug: "bordeaux",
    name: "Bordeaux",
    country: "France",
    region: "Nouvelle-Aquitaine",
    postalCode: "33000",
    coordinates: { lat: 44.8378, lng: -0.5792 },
    badge: "PÔLE NOUVELLE-AQUITAINE · TRIANGLE D'OR & CHARTRONS",
    metaTitle: "XR Agency Bordeaux — Agence Web & Création de Site Internet Prestige",
    metaDescription:
      "Agence web de prestige à Bordeaux. Conception de sites internet sur mesure, SEO local visibilité Google, branding et stratégie digitale en Gironde et Nouvelle-Aquitaine.",
    h1: "Création de Site Internet & Agence Web à Bordeaux",
    h1Highlight: "Le Raffinement Digital en Terre Bordelaise",
    tagline:
      "Élégance, précision et puissance d'acquisition pour les domaines viticoles, commerces de prestige, cabinets et startups bordelaises.",
    localMarketIntro:
      "Bordeaux incarne l'art de vivre, l'excellence des grands terroirs et un écosystème d'entreprises en pleine expansion. XR Agency sublime l'image de marque de ses clients bordelais grâce à des interfaces élégantes et un positionnement SEO dominant sur Google.",
    sectors: [
      "Vins & Domaines Viticoles",
      "Tourisme & Hôtellerie de Charme",
      "Immobilier de Prestige",
      "Professions Juridiques & Conseil",
      "Artisans & Créateurs",
    ],
    localKeyPoints: [
      {
        title: "Design Élégant & Storytelling Visuel",
        description:
          "Mise en scène soignée de votre savoir-faire avec des typographies racées et une fluidité visuelle absolue.",
      },
      {
        title: "SEO Bordeaux & Gironde",
        description:
          "Captation des requêtes à haute valeur ajoutée sur Bordeaux Métropole, le Bassin d'Arcachon et le Médoc.",
      },
      {
        title: "Réservation & E-Commerce Premium",
        description:
          "Modules de vente en ligne et de prise de rendez-vous intuitifs, sécurisés et optimisés pour la conversion.",
      },
      {
        title: "Visibilité Internationale & Multilingue",
        description:
          "Sites multilingues (Français, Anglais, etc.) adaptés aux clientèles touristiques et marchés export.",
      },
    ],
    keywords: [
      "xragency bordeaux",
      "agence web bordeaux",
      "creation site internet bordeaux",
      "agence digitale bordeaux",
      "seo bordeaux",
      "creation site web bordeaux 33",
      "studio web bordeaux",
    ],
    faqs: [
      {
        question: "Accompagnez-vous les domaines viticoles et châteaux bordelais ?",
        answer:
          "Oui, nous concevons des plateformes viticoles prestigieuses avec présentation des millésimes, storytelling oenotouristique et vente directe sécurisée.",
      },
      {
        question: "Combien de temps faut-il pour voir les résultats SEO à Bordeaux ?",
        answer:
          "Les délais et résultats varient selon le marché, la concurrence, l’état initial du site et les actions déployées.",
      },
      {
        question: "XR Agency intervient-elle sur le Bassin d'Arcachon ?",
        answer:
          "Oui, nous accompagnons des clients à Bordeaux, Mérignac, Pessac, mais aussi Arcachon, Cap Ferret, Libourne et dans toute la Gironde.",
      },
    ],
  },

  toulouse: {
    slug: "toulouse",
    name: "Toulouse",
    country: "France",
    region: "Occitanie",
    postalCode: "31000",
    coordinates: { lat: 43.6047, lng: 1.4442 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Toulouse — Agence Web & Création de Site Internet 31",
    metaDescription:
      "Agence web innovante à Toulouse. Conception de sites internet sur mesure, SEO local, branding et IA pour entreprises toulousaines et occitanes.",
    h1: "Création de Site Internet & Agence Web à Toulouse",
    h1Highlight: "Innovation & Performance Digitale dans la Ville Rose",
    tagline:
      "Un design percutant et une technologie web de pointe pour les acteurs de l'aéronautique, de la tech, du commerce et des services à Toulouse.",
    localMarketIntro:
      "Capitale européenne de l'aéronautique et métropole dynamique, Toulouse exige une excellence technique sans compromis. XR Agency dote les entreprises toulousaines de sites internet rapides, beaux et visibles là où leurs prospects cherchent.",
    sectors: [
      "Aéronautique & Spatial",
      "Startups & Technologies",
      "BTP & Habitat",
      "Commerce & Services",
      "Restauration & Loisirs",
    ],
    localKeyPoints: [
      {
        title: "SEO local à Toulouse",
        description:
          "Conquête des premières positions Google Maps et recherche naturelle dans la Ville Rose et son agglomération.",
      },
      {
        title: "Stack Technique Haute Vitesse",
        description:
          "Temps de chargement sous la seconde pour maximiser la satisfaction utilisateur et le taux de conversion.",
      },
      {
        title: "Solutions IA & Automatisation",
        description:
          "Intégrez des agents conversationnels intelligents et des automatisations de prospects pour décupler votre efficacité.",
      },
      {
        title: "Suivi & Évolution Continue",
        description:
          "Un interlocuteur dédié et un contrat WebCare clair pour faire grandir votre outil de travail dans la durée.",
      },
    ],
    keywords: [
      "xragency toulouse",
      "agence web toulouse",
      "creation site internet toulouse",
      "agence digitale toulouse",
      "seo toulouse",
      "creation site web toulouse 31",
    ],
    faqs: [
      {
        question: "Pourquoi faire appel à XR Agency à Toulouse plutôt qu'une agence classique ?",
        answer:
          "Nous ne faisons pas de sites préfabriqués. Nous concevons des écosystèmes d'acquisition complets : design sur-mesure, SEO local offensif et automatisation commerciale.",
      },
      {
        question: "Quelle est votre approche pour le SEO local à Toulouse ?",
        answer:
          "Nous combinons une optimisation technique irréprochable, des contenus sémantiques ciblés par zone et un travail sur la notoriété locale de votre fiche Google.",
      },
      {
        question: "Pouvez-vous créer un site e-commerce pour une marque toulousaine ?",
        answer:
          "Oui, nous créons des boutiques e-commerce performantes avec parcours d'achat simplifié, paiement sécurisé Stripe et synchronisation de stock.",
      },
    ],
  },

  nice: {
    slug: "nice",
    name: "Nice",
    country: "France",
    region: "Provence-Alpes-Côte d'Azur",
    postalCode: "06000",
    coordinates: { lat: 43.7102, lng: 7.262 },
    badge: "COOPÉRATION CÔTE D'AZUR · PROMENADE & CANNES",
    metaTitle: "XR Agency Nice — Agence Web Luxe & Création de Site Internet Côte d'Azur",
    metaDescription:
      "Studio web haut de gamme à Nice & Côte d'Azur. Création de sites internet de prestige, SEO local, branding et solutions digitales pour Monaco, Nice et Cannes.",
    h1: "Création de Site Internet & Agence Web à Nice",
    h1Highlight: "Le Standard Luxe de la Riviera Digitale",
    tagline:
      "Esthétique haute joaillerie, immersion visuelle et SEO d'élite pour les acteurs du luxe, de l'hôtellerie, de l'immobilier et du nautisme sur la Côte d'Azur.",
    localMarketIntro:
      "Sur la Côte d'Azur, l'exigence de la clientèle internationale ne tolère aucune approximation. XR Agency crée des vitrines digitales raffinées qui valorisent les marques azuréennes à Nice, Cannes, Antibes et Monaco, avec un référencement naturel à forte rentabilité.",
    sectors: [
      "Yachting & Nautisme",
      "Immobilier de Luxe",
      "Hôtellerie 5 Étoiles & Palaces",
      "Mode & Beauté",
      "Événementiel de Prestige",
    ],
    localKeyPoints: [
      {
        title: "Expérience Visuelle Prestige",
        description:
          "Direction artistique raffinée pour séduire une clientèle nationale et internationale exigeante.",
      },
      {
        title: "SEO Riviera & Monaco",
        description:
          "Positionnez votre marque sur les requêtes à forte valeur patrimoniale de Nice, Cannes et Monaco.",
      },
      {
        title: "Multilingue Natif (FR / EN / RU / AR)",
        description:
          "Système de langues fluide et optimisé pour le référencement international de chaque version linguistique.",
      },
      {
        title: "Vidéos & Médias Haute Résolution",
        description:
          "Intégration optimisée de vidéos cinématiques sans ralentir le temps de chargement de vos pages.",
      },
    ],
    keywords: [
      "xragency nice",
      "agence web nice",
      "creation site internet nice",
      "agence digitale cote d'azur",
      "seo nice",
      "creation site web cannes monaco",
    ],
    faqs: [
      {
        question: "Travaillez-vous avec des clients à Cannes et Monaco ?",
        answer:
          "Oui, nous accompagnons régulièrement des clients sur toute la Côte d'Azur : Nice, Cannes, Monaco, Saint-Tropez, Antibes et Villefranche-sur-Mer.",
      },
      {
        question: "Comment gérez-vous le référencement multilingue sur la Côte d'Azur ?",
        answer:
          "Chaque langue bénéficie de balises hreflang précises, d'un contenu localisé et d'une structure d'URLs dédiée pour être indexée de façon autonome par Google.",
      },
      {
        question: "Proposez-vous la réalisation de vidéos immersives pour le site ?",
        answer:
          "Nous intégrons des séquences vidéo compressées haute qualité et des animations 3D WebGL pour offrir une expérience mémorable sans temps d'attente.",
      },
    ],
  },

  nantes: {
    slug: "nantes",
    name: "Nantes",
    country: "France",
    region: "Pays de la Loire",
    postalCode: "44000",
    coordinates: { lat: 47.2184, lng: -1.5536 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Nantes — Agence Web & Création de Site Internet 44",
    metaDescription:
      "Agence web à Nantes. Création de sites internet performants, SEO local, branding et ingénierie web pour entreprises nantaises et du Grand Ouest.",
    h1: "Création de Site Internet & Agence Web à Nantes",
    h1Highlight: "Audace Créative & Performance Digitale à Nantes",
    tagline:
      "Des plateformes web élégantes et rapides qui convertissent vos prospects en clients à Nantes, Saint-Nazaire et dans les Pays de la Loire.",
    localMarketIntro:
      "Pôle d’innovation et de créativité du Grand Ouest, Nantes abrite des entreprises audacieuses. XR Agency les accompagne avec des outils web adaptés à leur identité et une stratégie de visibilité construite autour de leurs marchés.",
    sectors: [
      "E-commerce & Retail",
      "Industrie Créative & Design",
      "Tech & Numérique",
      "Santé & Éco-activités",
      "Artisans & PME",
    ],
    localKeyPoints: [
      {
        title: "SEO Régional Grand Ouest",
        description:
          "Gagnez en visibilité sur Nantes, Rennes, Angers et l'ensemble du bassin atlantique.",
      },
      {
        title: "Éco-Conception & Vitesse Extrême",
        description:
          "Des sites légers, sobres en consommation d'énergie et ultra-rapides sur toutes les connexions.",
      },
      {
        title: "Conversion & Génération de Leads",
        description:
          "Chaque page est pensée comme un entonnoir de conversion fluide pour maximiser vos demandes de contact.",
      },
      {
        title: "Autonomie & Simplicité",
        description:
          "Gérez vos contenus facilement ou déléguez l'intégralité des opérations à notre équipe WebCare.",
      },
    ],
    keywords: [
      "xragency nantes",
      "agence web nantes",
      "creation site internet nantes",
      "agence digitale nantes",
      "seo nantes",
      "creation site web nantes 44",
    ],
    faqs: [
      {
        question: "Pourquoi Nantes est-elle un marché stratégique pour votre agence ?",
        answer:
          "Nantes est un pôle d'innovation reconnu où la qualité du design et la rigueur technique font la différence pour émerger face à la concurrence.",
      },
      {
        question: "Puis-je modifier mon site moi-même après la livraison ?",
        answer:
          "Oui, nous mettons à votre disposition une interface claire et vous formons à la gestion de vos textes, photos et articles en toute autonomie.",
      },
      {
        question: "Comment fonctionne la maintenance mensuelle de mon site ?",
        answer:
          "Notre service WebCare prend en charge les sauvegardes, la sécurité, l'hébergement cloud et l'application régulière de vos demandes de modifications.",
      },
    ],
  },

  strasbourg: {
    slug: "strasbourg",
    name: "Strasbourg",
    country: "France",
    region: "Grand Est",
    postalCode: "67000",
    coordinates: { lat: 48.5734, lng: 7.7521 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Strasbourg — Agence Web & Création de Site Internet 67",
    metaDescription:
      "Agence web à Strasbourg. Création de sites internet sur mesure, SEO local et international, branding et transformation digitale en Alsace et Grand Est.",
    h1: "Création de Site Internet & Agence Web à Strasbourg",
    h1Highlight: "Votre Rayonnement Digital au Cœur de l'Europe",
    tagline:
      "Sites vitrines de prestige, boutiques e-commerce et référencement naturel pour entreprises alsaciennes et transfrontalières.",
    localMarketIntro:
      "Capitale parlementaire européenne et carrefour transfrontalier, Strasbourg bénéficie d'une position stratégique unique. XR Agency propulse les PME alsaciennes sur le marché national et européen grâce à des sites web sur mesure et un SEO sans faille.",
    sectors: [
      "Institutions & Conseil",
      "Artisanat d'Excellence & Terroir",
      "Santé & Médical",
      "Commerce Transfrontalier",
      "Industrie & Logistique",
    ],
    localKeyPoints: [
      {
        title: "SEO Bilingue France / Allemagne",
        description:
          "Optimisation pour capter la clientèle locale alsacienne et les opportunités transfrontalières allemandes et suisses.",
      },
      {
        title: "Design Institutionnel & Prestigieux",
        description:
          "Un graphisme soigné, rassurant et rigoureux pour asseoir votre autorité professionnelle.",
      },
      {
        title: "Sécurité & Conformité Européenne",
        description:
          "Respect strict du RGPD, hébergement sur serveurs sécurisés en Europe et protocoles SSL haute certification.",
      },
      {
        title: "Accompagnement de Proximité",
        description:
          "Un chef de projet dédié pour vous guider de la définition du brief jusqu'au lancement opérationnel.",
      },
    ],
    keywords: [
      "xragency strasbourg",
      "agence web strasbourg",
      "creation site internet strasbourg",
      "agence digitale strasbourg",
      "seo strasbourg",
      "creation site web alsace 67",
    ],
    faqs: [
      {
        question: "Réalisez-vous des sites bilingues français-allemand à Strasbourg ?",
        answer:
          "Oui, nous intégrons parfaitement les versions bilingues avec optimisation SEO dédiée pour chaque langue.",
      },
      {
        question: "Comment se déroule la création d'un site avec XR Agency à Strasbourg ?",
        answer:
          "Nous débutons par un cadrage stratégique, concevons les maquettes haute fidélité, développons le code propre et validons ensemble chaque étape avant mise en ligne.",
      },
      {
        question: "Intervenez-vous également à Mulhouse et Colmar ?",
        answer:
          "Oui, nous accompagnons des clients dans tout le Bas-Rhin, le Haut-Rhin et l'ensemble de la région Grand Est.",
      },
    ],
  },

  montpellier: {
    slug: "montpellier",
    name: "Montpellier",
    country: "France",
    region: "Occitanie",
    postalCode: "34000",
    coordinates: { lat: 43.6108, lng: 3.8767 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Montpellier — Agence Web & Création de Site Internet 34",
    metaDescription:
      "Agence web créative à Montpellier. Création de sites internet sur mesure, SEO local visibilité Google, branding et IA pour entreprises montpelliéraines.",
    h1: "Création de Site Internet & Agence Web à Montpellier",
    h1Highlight: "Dynamisme Digital & Acquisition Client à Montpellier",
    tagline:
      "Faites de votre site internet un point de contact clair pour vos prospects à Montpellier, Nîmes, Sète et sur l’ensemble de l’Occitanie littorale.",
    localMarketIntro:
      "Ville jeune, attractive et pôle d'innovation reconnu, Montpellier attire chaque année de nouveaux talents et entreprises. XR Agency aide les acteurs locaux à transformer cette effervescence en croissance mesurable grâce à des outils digitaux à haute conversion.",
    sectors: [
      "Santé & Medtech",
      "Agroalimentaire & Vins",
      "Startups & Plateformes",
      "Tourisme & Hôtellerie",
      "Services aux Entreprises",
    ],
    localKeyPoints: [
      {
        title: "Visibilité locale sur Google Maps",
        description:
          "Améliorez la qualité de votre présence locale sur smartphone à Montpellier grâce à une stratégie définie après diagnostic.",
      },
      {
        title: "Expérience Utilisateur Centrée sur la Vente",
        description:
          "Des parcours clients clairs et des boutons d'action stratégiques pour maximiser le taux de prise de contact.",
      },
      {
        title: "Intégration d'Outils IA Modernes",
        description:
          "Agents conversationnels intelligents et synchronisations CRM pour automatiser le traitement de vos leads.",
      },
      {
        title: "Vitesse & Référencement Naturel",
        description:
          "Des fondations techniques solides qui plaisent aux algorithmes de Google et vos visiteurs.",
      },
    ],
    keywords: [
      "xragency montpellier",
      "agence web montpellier",
      "creation site internet montpellier",
      "agence digitale montpellier",
      "seo montpellier",
      "creation site web 34",
    ],
    faqs: [
      {
        question: "Pourquoi un bon référencement est-il crucial à Montpellier ?",
        answer:
          "Avec la forte création d'entreprises à Montpellier, être visible dans le visibilité Google Maps est souvent le seul moyen d'attirer des clients réguliers sans dépendre de la publicité payante.",
      },
      {
        question: "Pouvez-vous créer un site avec système de réservation en ligne ?",
        answer:
          "Oui, nous intégrons des modules de prise de rendez-vous ou de réservation synchronisés avec votre calendrier professionnel (Google, Outlook, etc.).",
      },
      {
        question: "Couvrez-vous également Nîmes et Béziers ?",
        answer:
          "Oui, nous intervenons sur toute la région : Montpellier, Nîmes, Béziers, Sète, Lunel et La Grande-Motte.",
      },
    ],
  },

  lille: {
    slug: "lille",
    name: "Lille",
    country: "France",
    region: "Hauts-de-France",
    postalCode: "59000",
    coordinates: { lat: 50.6292, lng: 3.0573 },
    badge: "ACCOMPAGNEMENT LOCAL · À DISTANCE",
    metaTitle: "XR Agency Lille — Agence Web & Création de Site Internet 59",
    metaDescription:
      "Agence web à Lille. Création de sites internet sur mesure, SEO local visibilité Google, e-commerce et branding pour entreprises lilloises et des Hauts-de-France.",
    h1: "Création de Site Internet & Agence Web à Lille",
    h1Highlight: "La Puissance Digitale au Cœur des Flandres",
    tagline:
      "L'efficacité du design contemporain et la puissance du référencement naturel pour les entreprises du Vieux-Lille, d'EuraTechnologies et de la métropole lilloise.",
    localMarketIntro:
      "Berceau de grands groupes de distribution et pôle majeur de la French Tech avec EuraTechnologies, Lille allie tradition commerçante et modernité digitale. XR Agency conçoit des sites internet fiables, robustes et taillés pour générer un chiffre d'affaires prédictible.",
    sectors: [
      "Commerce & Distribution",
      "Startups & Incubateurs",
      "Industrie & Logistique",
      "Professions Libérales",
      "Restauration & Tourisme",
    ],
    localKeyPoints: [
      {
        title: "E-Commerce & Retail Performant",
        description:
          "Boutiques en ligne optimisées pour la vente avec gestion simplifiée des commandes et paiements ultra-sécurisés.",
      },
      {
        title: "SEO Métropole Européenne de Lille",
        description:
          "Gagnez les meilleures places sur les recherches stratégiques à Lille, Roubaix, Tourcoing et Villeneuve-d'Ascq.",
      },
      {
        title: "Technologies Modernes & Évolutives",
        description:
          "Développements pérennes sans obsolescence prématurée pour protéger vos investissements dans le temps.",
      },
      {
        title: "Support Réactif & Maintenance Continue",
        description:
          "Une équipe à vos côtés pour répondre rapidement à vos demandes d'évolutions et sécuriser vos accès.",
      },
    ],
    keywords: [
      "xragency lille",
      "agence web lille",
      "creation site internet lille",
      "agence digitale lille",
      "seo lille",
      "creation site web lille 59",
      "studio web lille",
    ],
    faqs: [
      {
        question: "Pourquoi confier son site à XR Agency à Lille ?",
        answer:
          "Nous combinons une direction artistique soignée et une approche orientée objectifs : chaque site est conçu pour présenter clairement l’offre et faciliter la prise de contact.",
      },
      {
        question: "Accompagnez-vous les startups d'EuraTechnologies ?",
        answer:
          "Oui, nous concevons des landing pages de conversion rapide et des plateformes complètes pour les jeunes pousses et scale-ups tech.",
      },
      {
        question: "Intervenez-vous dans toute la région Hauts-de-France ?",
        answer:
          "Nous accompagnons des entreprises à Lille, Valenciennes, Douai, Dunkerque, Arras, Amiens et sur l'ensemble de la région.",
      },
    ],
  },

  france: {
    slug: "france",
    name: "France",
    country: "France",
    region: "National & DOM-TOM",
    postalCode: "75008",
    coordinates: { lat: 46.2276, lng: 2.2137 },
    badge: "COUVERTURE NATIONALE · PARIS · LYON · MARSEILLE · FRANCE ENTIÈRE",
    metaTitle: "XR Agency France — Agence Web de Prestige & Studio Digital National",
    metaDescription:
      "XR Agency France : création de sites internet sur mesure, SEO local Google, direction artistique de prestige et automatisation IA pour entreprises partout en France.",
    h1: "Agence Web & Création de Site Internet en France",
    h1Highlight: "L'Excellence Numérique Nationale",
    tagline:
      "Le studio digital de prestige qui accompagne les entreprises françaises dans leur conquête digitale : sites vitrines sur mesure, e-commerce, SEO et IA.",
    localMarketIntro:
      "De Paris à Marseille, de Bordeaux à Lille et sur l'ensemble des territoires, les entreprises françaises méritent une présence en ligne irréprochable. XR Agency délivre des solutions digitales complètes qui unissent haute direction artistique, ingénierie de pointe et visibilité sur Google.",
    sectors: [
      "Grandes Entreprises & PME",
      "Luxe & Haute Joaillerie",
      "Professions Réglementées",
      "E-Commerce National",
      "Franchises & Réseaux",
    ],
    localKeyPoints: [
      {
        title: "Déploiement National & Multi-Sites",
        description:
          "Accompagnement de réseaux et franchises avec cohérence de marque et stratégies SEO locales multi-villes.",
      },
      {
        title: "Calendrier de production défini",
        description:
          "Le calendrier de production est défini selon le périmètre, les contenus et les intégrations validés.",
      },
      {
        title: "Maintenance & WebCare",
        description:
          "Les modalités d’hébergement, de sauvegarde et de mise à jour sont précisées dans le devis et le contrat.",
      },
      {
        title: "Contact Direct & Équipe Dédiée",
        description:
          "Accès direct à nos experts par WhatsApp, visioconférence et téléphone tout au long du projet.",
      },
    ],
    keywords: [
      "xragency france",
      "agence web france",
      "creation site internet france",
      "agence digitale france",
      "studio digital france",
      "meilleure agence web france",
      "referencement google france",
    ],
    faqs: [
      {
        question: "Travaillez-vous avec des clients situés n'importe où en France ?",
        answer:
          "Oui, l'intégralité de notre processus de conception, de validation et de livraison est optimisée pour un travail à distance fluide, transparent et réactif partout en France métropolitaine et dans les DOM-TOM.",
      },
      {
        question: "Quels types de sites internet concevez-vous ?",
        answer:
          "Nous réalisons des sites vitrines de prestige, des plateformes e-commerce à fort volume, des applications web sur-mesure, des refontes complètes et des systèmes de réservation.",
      },
      {
        question: "Comment se déroule la première prise de contact ?",
        answer:
          "Vous pouvez nous contacter directement par WhatsApp au +33 7 67 56 67 83 ou demander un devis en ligne. Nous vous répondons sous 2 heures avec une analyse personnalisée.",
      },
    ],
  },

  danang: {
    slug: "danang",
    name: "Da Nang",
    nativeName: "Đà Nẵng",
    country: "Vietnam",
    region: "Nam Trung Bộ",
    postalCode: "550000",
    coordinates: { lat: 16.0544, lng: 108.2022 },
    badge: "TECH HUB ASIE · ĐÀ NẴNG · AN THƯỢNG & HẢI CHÂU",
    metaTitle: "XR Agency Da Nang — Agence Web & Création de Site Internet au Vietnam",
    metaDescription:
      "Agence web internationale à Da Nang, Vietnam. Création de sites internet sur mesure, SEO Google, branding et solutions web pour expats, hôtels, restaurants et entreprises à Đà Nẵng.",
    h1: "Création de Site Internet & Agence Web à Da Nang",
    h1Highlight: "L'Ingénierie Web Européenne au Cœur de Đà Nẵng",
    tagline:
      "Standards de design français, ingénierie ultra-rapide et visibilité Google locale et internationale pour les entreprises de Da Nang et du centre du Vietnam.",
    localMarketIntro:
      "Capitale touristique et nouveau hub technologique d'Asie du Sud-Est, Da Nang connaît une expansion fulgurante. XR Agency accompagne les entrepreneurs français, internationaux et vietnamiens (resorts de luxe, restaurants, agences de voyage, startups et commerces) dans la création de vitrines digitales performantes et bilingues.",
    sectors: [
      "Resorts & Hôtels de Luxe",
      "Restaurants & Cafés Concept",
      "Immobilier & Expatriation",
      "Startups & Digital Nomades",
      "Tourisme & Loisirs",
    ],
    localKeyPoints: [
      {
        title: "Direction Artistique Française de Prestige",
        description:
          "Une image de marque d'exception qui positionne immédiatement votre établissement au-dessus des standards locaux.",
      },
      {
        title: "SEO Google Da Nang & International",
        description:
          "Captation de la clientèle touristique internationale et des résidents locaux en français, anglais et vietnamien.",
      },
      {
        title: "Systèmes de Réservation & Menus Interactifs",
        description:
          "Intégration de solutions de réservation directes, commandes en ligne et paiements sécurisés.",
      },
      {
        title: "Support Francophone Réactif sur Place",
        description:
          "Équipe accessible sur les fuseaux horaires européen et asiatique, joignable directement par WhatsApp.",
      },
    ],
    keywords: [
      "xragency danang",
      "xragency da nang",
      "agence web danang",
      "creation site internet danang",
      "web design da nang",
      "thiet ke web da nang",
      "seo danang vietnam",
      "creation site web expat vietnam",
    ],
    faqs: [
      {
        question: "Pourquoi faire appel à XR Agency à Da Nang pour créer son site internet ?",
        answer:
          "Nous combinons l'exigence esthétique et la rigueur technique d'une expertise digitale française et une connaissance des enjeux du marché de Da Nang et du Vietnam.",
      },
      {
        question: "Pouvez-vous concevoir un site trilingue Français / Anglais / Vietnamien ?",
        answer:
          "Oui, tous nos sites pour le Vietnam intègrent des sélecteurs de langues fluides avec adaptation culturelle et optimisation SEO autonome pour chaque langue.",
      },
      {
        question: "Comment gérer les paiements locaux et internationaux sur le site ?",
        answer:
          "Nous intégrons aussi bien les passerelles internationales (Stripe, PayPal, cartes de crédit) que les passerelles locales vietnamiennes (VNPAY, MoMo, virements bancaires QR code).",
      },
    ],
  },

  "ho-chi-minh": {
    slug: "ho-chi-minh",
    name: "Ho Chi Minh City",
    nativeName: "Thành phố Hồ Chí Minh (Sài Gòn)",
    country: "Vietnam",
    region: "Đông Nam Bộ",
    postalCode: "700000",
    coordinates: { lat: 10.8231, lng: 106.6297 },
    badge: "MÉTROPOLE ÉCONOMIQUE · DISTRICT 1 & THẢO ĐIỀN · SAÏGON",
    metaTitle: "XR Agency Ho Chi Minh — Agence Web & Création de Site Internet à Saïgon",
    metaDescription:
      "Agence web de prestige à Hô Chi Minh-Ville (Saïgon). Création de sites internet sur mesure, SEO Google, branding et e-commerce pour entreprises au Vietnam.",
    h1: "Création de Site Internet & Agence Web à Ho Chi Minh",
    h1Highlight: "La Puissance Digitale au Cœur de Saïgon",
    tagline:
      "Des plateformes web d'exception taillées pour la métropole économique du Vietnam : District 1, Thảo Điền, District 7 et rayonnement en Asie du Sud-Est.",
    localMarketIntro:
      "Poumon économique vibrant du Vietnam, Hô Chi Minh-Ville rassemble multinationales, créateurs audacieux et PME en hyper-croissance. XR Agency apporte aux entreprises francophones et internationales de Saïgon des sites web d'une rare élégance visuelle et une puissance d'acquisition organique sur Google.",
    sectors: [
      "Commerce & E-Commerce Asie",
      "Hospitality & Gastronomie Fine",
      "Immobilier de Luxe & Investissement",
      "Industrie & Export",
      "Tech & Services B2B",
    ],
    localKeyPoints: [
      {
        title: "Standard International & Vitesse Foudroyante",
        description:
          "Des interfaces optimisées pour les réseaux mobiles à haut débit du Vietnam et les consultations mondiales.",
      },
      {
        title: "SEO Google Vietnam & Export",
        description:
          "Travaillez la visibilité de votre entreprise sur les recherches pertinentes au Vietnam et à l’international.",
      },
      {
        title: "Branding de Haute Volée",
        description:
          "Identité de marque raffinée qui impose votre autorité face aux concurrents de la région asiatique.",
      },
      {
        title: "Écosystème CRM & Messageries (WhatsApp / Zalo)",
        description:
          "Connexion directe avec les habitudes de communication locales pour convertir vos visiteurs sans friction.",
      },
    ],
    keywords: [
      "xragency ho chi minh",
      "xragency saigon",
      "agence web ho chi minh",
      "creation site internet ho chi minh",
      "creation site internet saigon",
      "web design saigon",
      "thiet ke web ho chi minh",
      "seo vietnam ho chi minh",
    ],
    faqs: [
      {
        question: "Accompagnez-vous les entreprises et expatriés français à Ho Chi Minh ?",
        answer:
          "Oui, nous accompagnons les entrepreneurs et filiales françaises installées à Saïgon (District 1, Thảo Điền, District 2, District 7) avec une communication 100% en français et sur le fuseau horaire du Vietnam.",
      },
      {
        question:
          "Quelles sont les intégrations possibles avec les réseaux sociaux et messageries au Vietnam ?",
        answer:
          "Nous intégrons des boutons de contact direct WhatsApp, Zalo, Facebook Messenger et formulaires qualifiés pour répondre aux usages réels des consommateurs au Vietnam.",
      },
      {
        question: "Pouvez-vous prendre en charge la refonte d'un site web existant au Vietnam ?",
        answer:
          "Absolument, nous modernisons votre infrastructure, améliorons les temps de chargement et sécurisons vos positions Google existantes.",
      },
    ],
  },

  vietnam: {
    slug: "vietnam",
    name: "Vietnam",
    nativeName: "Việt Nam",
    country: "Vietnam",
    region: "National & Asie du Sud-Est",
    postalCode: "100000",
    coordinates: { lat: 14.0583, lng: 108.2772 },
    badge: "PRESENCE ASIE · ĐÀ NẴNG · HỒ CHÍ MINH · HÀ NỘI · VIETNAM ENTIER",
    metaTitle: "Création de Site Internet au Vietnam — XR Agency | Agence Web Internationale",
    metaDescription:
      "Création de sites internet au Vietnam : Da Nang, Hô Chi Minh-Ville et Hanoï. Direction artistique française, référencement naturel et accompagnement digital. Devis personnalisé.",
    h1: "Création de Site Internet au Vietnam & Agence Web",
    h1Highlight: "L'Excellence du Web Français au Cœur du Vietnam",
    tagline:
      "Le partenaire digital de confiance pour les entreprises, expats et marques au Vietnam : Da Nang, Hô Chi Minh-Ville, Hanoï et rayonnement international.",
    localMarketIntro:
      "Le Vietnam est l'un des marchés digitaux les plus dynamiques du monde avec plus de 78 millions d'internautes. XR Agency offre aux entreprises francophones, internationales et locales le meilleur des deux mondes : la direction artistique et l'exigence de qualité européenne, associées à une réactivité et une agilité incomparables sur place.",
    sectors: [
      "Tourisme & Hôtellerie Internationale",
      "Import-Export & Sourcing",
      "Entreprises d'Expatriés",
      "E-Commerce & Retail",
      "Agences & Startups Tech",
    ],
    localKeyPoints: [
      {
        title: "Standards de Qualité Européens",
        description:
          "Design sur-mesure, respect strict des normes de sécurité, du RGPD et des meilleures pratiques d'ingénierie web.",
      },
      {
        title: "SEO Google Vietnam & Multi-Pays",
        description:
          "Travail de visibilité sur les recherches pertinentes au Vietnam et sur les marchés internationaux ciblés.",
      },
      {
        title: "Calendrier de production défini Ouvrés",
        description:
          "Déploiement accéléré de votre site vitrine ou boutique pour saisir immédiatement les opportunités du marché vietnamien.",
      },
      {
        title: "Interlocuteurs Francophones Dédiés",
        description:
          "Échangez directement en français avec des experts du web qui comprennent vos enjeux et votre vision d'entreprise.",
      },
    ],
    keywords: [
      "creation de site internet vietnam",
      "agence web vietnam",
      "creation site internet vietnam",
      "xragency vietnam",
      "developpeur web vietnam",
      "agence digitale vietnam",
      "thiet ke web vietnam",
      "agence seo vietnam",
      "agence communication vietnam",
      "studio web vietnam",
    ],
    faqs: [
      {
        question: "Pourquoi choisir XR Agency pour créer son site internet au Vietnam ?",
        answer:
          "Parce que vous bénéficiez du niveau d'exigence d'une agence de design européenne (direction artistique soignée, vitesse extrême, code sur mesure) avec la proximité et la disponibilité d'une équipe active sur le fuseau horaire du Vietnam.",
      },
      {
        question: "Combien coûte la création d'un site internet au Vietnam avec XR Agency ?",
        answer:
          "Les prestations et le calendrier sont définis selon le périmètre, les contenus et les intégrations retenus.",
      },
      {
        question: "Couvrez-vous Hanoi en plus de Da Nang et Ho Chi Minh ?",
        answer:
          "Oui, nous accompagnons des clients à Hanoï, Da Nang, Hô Chi Minh-Ville, Hoi An, Nha Trang, Phu Quoc et dans toutes les provinces du Vietnam.",
      },
      {
        question: "Comment contacter l'équipe pour lancer un projet au Vietnam ?",
        answer:
          "Vous pouvez nous contacter directement par WhatsApp au +33 7 67 56 67 83 ou par email à contact.xragency@gmail.com pour un échange immédiat en français.",
      },
    ],
  },
};
