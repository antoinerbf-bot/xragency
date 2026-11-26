// ── XR SCHOOL — Formation pure & Trames complètes (10 Secteurs × 7 Services · Zéro mention financière) ──

import { XR_OFFICIAL_SERVICES } from "./data";

export interface BusinessSector {
  id: string;
  name: string;
  icon: string;
  targetTitle: string;
  clientWord: string;
  valueMetric: string; // Valeur métier pure (pas de montant en €)
  painDigital: string;
  painLocal: string;
  painSocial: string;
  painRobotics: string;
  quickHookExample: string;
}

export const BUSINESS_SECTORS: BusinessSector[] = [
  {
    id: "restaurant",
    name: "Restauration & Gastronomie",
    icon: "🍽️",
    targetTitle: "gérant",
    clientWord: "couverts et réservations directes",
    valueMetric: "remplissage des services midi et soir",
    painDigital: "menu PDF illisible sur téléphone et absence de réservation directe (dépendance aux plateformes tierces)",
    painLocal: "perte de clients qui tapent « restaurant autour de moi » sur Google Maps et tombent sur les 3 concurrents de la rue",
    painSocial: "plats magnifiques mais compte Instagram irrégulier qui ne donne pas envie de réserver le soir même",
    painRobotics: "manque de personnel en salle aux heures de pointe et allers-retours épuisants entre cuisine et salle",
    quickHookExample: "des tables vides en semaine alors que des dizaines de personnes cherchent où manger dans votre quartier",
  },
  {
    id: "hotel",
    name: "Hôtellerie, Villas & Tourisme",
    icon: "🏨",
    targetTitle: "directeur d'établissement",
    clientWord: "réservations directes",
    valueMetric: "taux d'occupation en direct",
    painDigital: "forte dépendance aux centrales de réservation faute d'un site qui convertit directement le voyageur",
    painLocal: "voyageurs internationaux qui choisissent l'hôtel voisin mieux classé dans le Top 3 Google Maps",
    painSocial: "visuels datés qui ne reflètent pas le standing réel de l'établissement",
    painRobotics: "accueil continu, room-service de nuit et entretien des espaces communs très chronophages",
    quickHookExample: "des séjours réservables directement sur votre site sans passer par des intermédiaires",
  },
  {
    id: "sante",
    name: "Santé, Dentistes & Cliniques",
    icon: "🦷",
    targetTitle: "docteur / responsable de cabinet",
    clientWord: "patients qualifiés",
    valueMetric: "parcours de soin ciblés",
    painDigital: "site médical daté qui ne rassure pas les nouveaux patients sur l'équipement et les spécialités du cabinet",
    painLocal: "patients en recherche urgente sur Google Maps qui contactent uniquement les 3 premiers cabinets affichés",
    painSocial: "manque de contenu pédagogique et rassurant pour présenter l'équipe et les soins spécialisés",
    painRobotics: "accueil des patients en salle d'attente, logistique interne de matériel et entretien autonome des sols",
    quickHookExample: "des demandes de consultations spécialisées qui partent vers le cabinet voisin",
  },
  {
    id: "beaute",
    name: "Beauté, Coiffure & Spa",
    icon: "✨",
    targetTitle: "fondatrice / gérant",
    clientWord: "rendez-vous qualifiés",
    valueMetric: "agenda rempli sans interruption en cabine",
    painDigital: "prise de rendez-vous par téléphone qui coupe les soins en cours et fait manquer des appels",
    painLocal: "invisibilité sur Google Maps face aux salons concurrents qui captent les recherches locales",
    painSocial: "résultats avant/après sublimes non mis en avant en formats courts pour attirer une clientèle fidèle",
    painRobotics: "accueil VIP des clientes en salle d'attente et maintien impeccable du salon entre deux prestations",
    quickHookExample: "des appels manqués en plein soin alors que la cliente aurait réservé en ligne en quelques secondes",
  },
  {
    id: "btp",
    name: "BTP, Artisanat & Rénovation",
    icon: "🔨",
    targetTitle: "dirigeant / artisan",
    clientWord: "demandes de chantiers qualifiés",
    valueMetric: "carnet de chantiers qualifiés",
    painDigital: "absence de site moderne ou vitrine ancienne qui fait hésiter les propriétaires sur les gros projets",
    painLocal: "dépannages et demandes de travaux captés par les 3 entreprises en tête sur Google Maps",
    painSocial: "réalisations exemplaires non documentées en avant/après pour renforcer la preuve sociale",
    painRobotics: "manutention répétitive et nettoyage de grandes surfaces sur dépôts ou bases logistiques",
    quickHookExample: "des propriétaires prêts à lancer des travaux qui choisissent l'entreprise la plus rassurante en ligne",
  },
  {
    id: "immobilier",
    name: "Immobilier & Architecture",
    icon: "🏡",
    targetTitle: "directeur d'agence / architecte",
    clientWord: "mandats vendeurs et projets",
    valueMetric: "prise de mandats exclusifs",
    painDigital: "site vitrine classique qui ne déclenche aucune demande d'estimation propriétaire automatique",
    painLocal: "propriétaires vendeurs qui appellent d'abord les 3 agences les mieux positionnées sur Google Maps",
    painSocial: "biens d'exception qui méritent des formats vidéo immersifs pour créer un vrai bouche-à-oreille",
    painRobotics: "accueil innovant en agence ou showroom qui marque immédiatement l'esprit des visiteurs",
    quickHookExample: "des propriétaires vendeurs de votre secteur qui comparent les agences sur Google avant d'appeler",
  },
  {
    id: "droit",
    name: "Droit, Finance & Conseil",
    icon: "⚖️",
    targetTitle: "Maître / associé dirigeant",
    clientWord: "dossiers et consultations",
    valueMetric: "crédibilité et volume de dossiers ciblés",
    painDigital: "image digitale en décalage avec le niveau d'expertise réel du cabinet, freinant la prise de contact",
    painLocal: "clients qui recherchent un spécialiste dans leur ville et contactent uniquement le Top 3 Google",
    painSocial: "absence de prise de parole structurée sur LinkedIn pour capter des dirigeants et décideurs",
    painRobotics: "accueil moderne et orientation fluide des visiteurs dans les grands cabinets ou centres d'affaires",
    quickHookExample: "la première impression sur Google décide souvent si un décideur vous contacte ou passe au cabinet suivant",
  },
  {
    id: "auto",
    name: "Automobile, Luxe & Nautisme",
    icon: "🚗",
    targetTitle: "directeur de concession / gérant",
    clientWord: "essais, réservations et contacts acheteurs",
    valueMetric: "flux de demandes qualifiées en showroom",
    painDigital: "stock ou flotte mal présenté sur smartphone et prise de contact trop lente",
    painLocal: "acheteurs ou vacanciers qui recherchent sur Maps et se tournent vers les premiers résultats affichés",
    painSocial: "véhicules et unités d'exception sous-exploités en vidéos courtes sur Instagram et TikTok",
    painRobotics: "accueil VIP en showroom, service boisson autonome et entretien continu des sols",
    quickHookExample: "un showroom d'exception mérite une vitrine digitale au même niveau de finition",
  },
  {
    id: "retail",
    name: "Retail, Mode & Commerces",
    icon: "🛍️",
    targetTitle: "gérant de boutique",
    clientWord: "visites en magasin et commandes en ligne",
    valueMetric: "trafic boutique + ventes continues 24h/24",
    painDigital: "absence de click & collect ou de boutique mobile fluide pour vendre même en dehors des horaires d'ouverture",
    painLocal: "passants et habitants du quartier qui ne voient pas la boutique en haut de Google Maps",
    painSocial: "nouvelles collections trop peu mises en scène sur les réseaux face aux grandes enseignes",
    painRobotics: "accueil interactif qui attire l'œil en vitrine et crée une expérience mémorable en magasin",
    quickHookExample: "votre boutique peut continuer à accueillir et convertir vos clients le soir et le week-end",
  },
  {
    id: "entreprise",
    name: "Logistique, Industrie & Entreprises",
    icon: "🏭",
    targetTitle: "directeur des opérations / dirigeant",
    clientWord: "contrats B2B et gains opérationnels",
    valueMetric: "productivité des équipes et image corporate",
    painDigital: "site corporate vieillissant qui affaiblit la crédibilité lors des appels d'offres et recrutements",
    painLocal: "manque de visibilité régionale sur les recherches B2B stratégiques",
    painSocial: "savoir-faire industriel et marque employeur invisibles sur LinkedIn",
    painRobotics: "tâches de transport interne, livraison en entrepôt et nettoyage grand format qui mobilisent des équipes rares",
    quickHookExample: "libérer vos équipes des trajets répétitifs pour les recentrer sur les missions à forte valeur",
  },
];

export interface PlaybookScript {
  sector: BusinessSector;
  serviceId: string;
  serviceName: string;
  angle: string;
  coldCall: {
    opener: string;
    qualification: string[];
    bridge: string;
  };
  setting: {
    dm1: string;
    followupJ2: string;
    followupJ5: string;
  };
  pitchDemo: string;
  closing: {
    mainClose: string;
    upsellLine: string;
  };
  objections: { q: string; a: string }[];
}

export function getSectorServicePlaybook(sectorId: string, serviceId: string): PlaybookScript {
  const sector = BUSINESS_SECTORS.find((s) => s.id === sectorId) || BUSINESS_SECTORS[0];
  const service = XR_OFFICIAL_SERVICES.find((s) => s.id === serviceId) || XR_OFFICIAL_SERVICES[0];

  if (serviceId === "websites") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Résoudre : ${sector.painDigital}. Objectif concret : améliorer le ${sector.valueMetric} grâce à un parcours mobile ultra-fluide.`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. Je ne vous prends que 30 secondes : j'ai regardé la présence en ligne de [Nom Entreprise] sur smartphone et j'ai repéré un détail concret qui vous fait perdre des ${sector.clientWord}. Vous avez un instant ? »`,
        qualification: [
          `« Aujourd'hui, comment la majorité de vos nouveaux clients vous découvrent-ils ? »`,
          `« Votre site actuel vous ramène-t-il réellement des ${sector.clientWord} chaque semaine, ou sert-il surtout de vitrine ? »`,
          `« Si notre studio vous prépare gratuitement un aperçu visuel moderne adapté à votre établissement, vous prendriez 2 minutes pour le regarder sur WhatsApp ? »`,
        ],
        bridge: `« Parfait ! Je transmets vos éléments à notre équipe créative aujourd'hui. Je vous envoie la maquette sur WhatsApp et on fait un point de 10 minutes demain à 11h ou 15h ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] 👋 Je viens de découvrir [Nom Entreprise], bravo pour votre travail ! En consultant votre présence sur mobile, j'ai remarqué un point bloquant (${sector.painDigital}) qui freine vos ${sector.clientWord}. On a pensé un concept moderne adapté à votre secteur — je peux vous envoyer l'aperçu ici ?`,
        followupJ2: `Bonjour [Prénom], petite relance rapide 😊 Notre studio vient de finaliser un aperçu visuel sur-mesure pour [Nom Entreprise]. Souhaitez-vous que je vous le partage en un clic ?`,
        followupJ5: `[Prénom], dernier message pour ne pas vous déranger : si vous voulez transformer votre visibilité et éviter ${sector.quickHookExample}, répondez-moi simplement "OK" et je vous envoie la démo gratuite.`,
      },
      pitchDemo: `« Regardez l'expérience sur mobile [Prénom] : en moins de 2 secondes, le visiteur perçoit immédiatement votre niveau de standing, comprend votre offre et peut passer à l'action en un clic. Nous avons 3 niveaux d'accompagnement (Vitrine Pro, Business ou E-commerce & Réservation), tous livrés clé-en-main avec optimisation mobile, SEO de base et hébergement inclus. »`,
      closing: {
        mainClose: `« Entre la formule Business et la formule Complète avec réservation/commande intégrée, laquelle colle le mieux à vos objectifs des prochains mois ? On réserve votre créneau de production avec notre studio cette semaine ? »`,
        upsellLine: `« Pour rester totalement serein après la mise en ligne, la majorité de nos clients associent directement notre suivi WebCare afin de déléguer toutes les mises à jour et la sécurité. On l'ajoute au plan de déploiement ? »`,
      },
      objections: [
        {
          q: "« J'ai déjà un site internet »",
          a: `« Tout à fait, je l'ai consulté avant de vous appeler ! Justement, on a identifié ce frein précis : ${sector.painDigital}. C'est pour cela qu'on préfère vous montrer un avant/après concret sur WhatsApp, sans aucun engagement. »`,
        },
        {
          q: "« Je n'ai pas le temps de m'en occuper »",
          a: `« C'est la force de notre méthode : vous n'avez ni textes techniques à écrire ni réglages à gérer. Un brief court de 15 minutes suffit, notre studio s'occupe de toute la conception jusqu'à la mise en ligne. »`,
        },
        {
          q: "« Envoyez-moi juste un email »",
          a: `« Bien sûr ! Mais un email sans contexte finit souvent noyé. Le plus simple et le plus concret, c'est de vous envoyer l'aperçu visuel directement sur WhatsApp : vous voyez le rendu en 15 secondes entre deux rendez-vous. »`,
        },
      ],
    };
  }

  if (serviceId === "maps") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Résoudre : ${sector.painLocal}. Argument différenciant : stratégie locale dédiée avec objectif **Top 3 Google Maps** et cadre contractuel clair.`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. Je viens d'effectuer une recherche locale dans votre ville sur Google Maps : [Nom Entreprise] n'apparaît pas encore dans le Top 3, alors que la grande majorité des clients appellent uniquement les 3 premiers résultats. Vous suiviez déjà votre positionnement local ? »`,
        qualification: [
          `« Aujourd'hui, savez-vous combien d'appels ou d'itinéraires proviennent directement de votre fiche Google chaque mois ? »`,
          `« Avez-vous déjà optimisé vos catégories, vos services et votre autorité locale face aux 3 concurrents devant vous ? »`,
          `« Si on vous montre un diagnostic précis de votre zone et notre méthode cadrée pour viser le Top 3 Google Maps, on se bloque 10 minutes ensemble ? »`,
        ],
        bridge: `« Parfait ! Je prépare votre benchmark local face à vos concurrents directs et on regarde le plan d'action ensemble demain à 10h30 ou 14h30 ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] 📍 Je viens d'analyser le classement Google Maps de [Nom Entreprise] sur votre secteur : ${sector.painLocal}. Nous accompagnons des établissements comme le vôtre pour atteindre le Top 3 local avec un suivi mensuel structuré. Je vous envoie votre diagnostic rapide ?`,
        followupJ2: `Bonjour [Prénom], j'ai relevé 3 optimisations concrètes sur votre fiche Google Business Profile pour capter plus d'appels locaux dès les prochaines semaines. Je vous partage le récap ?`,
        followupJ5: `[Prénom], comme nous limitons nos accompagnements locaux par zone géographique pour éviter de mettre deux clients en concurrence directe, je préfère vérifier si le sujet vous intéresse avant de passer à un autre établissement du quartier.`,
      },
      pitchDemo: `« Voici votre position actuelle sur la carte face à vos 3 concurrents directs. Notre programme Google Maps Top 3 se déroule en 4 étapes claires : Audit & benchmark de la zone, Optimisation complète de la fiche Google Business Profile, Renforcement de l'autorité locale et Pilotage mensuel — le tout cadré par notre engagement contractuel Top 3. »`,
      closing: {
        mainClose: `« Les requêtes prioritaires et votre zone sont clairement identifiées. On valide le lancement de l'audit d'optimisation cette semaine pour verrouiller votre secteur ? »`,
        upsellLine: `« Pour transformer un maximum de ces futurs clics Google Maps en contacts concrets, on peut aussi synchroniser votre site web afin que l'expérience soit irréprochable du clic jusqu'au rendez-vous. »`,
      },
      objections: [
        {
          q: "« Je ne fais pas confiance aux promesses sur Google »",
          a: `« Vous avez entièrement raison de demander des preuves. C'est pourquoi on définit ensemble au diagnostic les requêtes exactes, la zone et les critères d'éligibilité dans un cadre contractuel totalement transparent. »`,
        },
        {
          q: "« Je travaille déjà grâce au bouche-à-oreille »",
          a: `« C'est un excellent socle ! Mais même lorsqu'on vous recommande, le prospect tape votre nom ou votre spécialité sur Google Maps pour vérifier les avis et l'itinéraire. Être dans le Top 3 sécurise votre réputation et capte toute la nouvelle clientèle de passage. »`,
        },
        {
          q: "« J'ai déjà une fiche Google »",
          a: `« Avoir une fiche ouverte est une première étape, mais entre une fiche simplement remplie et une fiche optimisée en continu pour le Top 3, l'écart sur le volume d'appels entrants est énorme. »`,
        },
      ],
    };
  }

  if (serviceId === "robotics") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Résoudre : ${sector.painRobotics}. Gamme autonome **Korben** (accueil, livraison, nettoyage, logistique) : diagnostic de flux, démonstration en réel, location sur mesure ou achat professionnel, normes CE & SAV français.`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency, partenaire de la gamme de robots de service Korben. Je vous appelle car nous aidons des structures en ${sector.name} à soulager leurs équipes sur une contrainte précise : ${sector.painRobotics}. Vous vous êtes déjà penché sur l'assistance robotique ? »`,
        qualification: [
          `« Aujourd'hui, quelle est la tâche répétitive qui mobilise le plus vos équipes au détriment de l'accueil ou de la production ? »`,
          `« Est-ce que votre besoin principal porte plutôt sur l'accueil, la livraison interne, le nettoyage ou la logistique ? »`,
          `« Seriez-vous ouvert à un diagnostic gratuit de vos espaces en 15 minutes pour identifier le modèle adapté et voir les modalités d'essai ou de démonstration ? »`,
        ],
        bridge: `« Excellent. On réalise ensemble un diagnostic rapide de vos flux pour sélectionner la famille de robot Korben adaptée et cadrer une démonstration. Jeudi matin ou vendredi après-midi ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] 🤖 Nous accompagnons les dirigeants en ${sector.name} avec la gamme de robots autonomes Korben pour répondre à un enjeu terrain : ${sector.painRobotics}. Accompagnement complet, normes CE et SAV français. Souhaitez-vous recevoir une courte présentation adaptée à votre secteur ?`,
        followupJ2: `Bonjour [Prénom], petite précision utile : les robots Korben s'intègrent en véritable assistant d'équipe sans remplacer l'humain, avec possibilité de cadrer une démonstration ou une formule de location sur mesure. On regarde quel modèle correspondrait à vos locaux ?`,
        followupJ5: `[Prénom], si vous souhaitez simplement observer l'impact en situation réelle lors d'un événement ou sur une courte période de test avant toute décision, je peux vous expliquer comment organiser une démonstration sur site.`,
      },
      pitchDemo: `« Notre rôle chez XR Agency est de sécuriser chaque étape : 1) Diagnostic de vos flux et largeurs de passage, 2) Sélection de la bonne famille Korben (accueil, livraison, nettoyage ou polyvalent), 3) Cartographie et déploiement clé-en-main, 4) Accompagnement opérationnel avec SAV français et normes CE. Vous pouvez avancer via une démonstration, une location sur mesure ou une acquisition directe. »`,
      closing: {
        mainClose: `« Pour avancer concrètement et sans friction, quelle est la meilleure prochaine étape pour vous : valider le cadrage technique de vos locaux ou planifier directement une démonstration sur site ? »`,
        upsellLine: `« L'arrivée d'un robot autonome génère aussi un énorme attrait médiatique local : notre pôle Social Media peut accompagner le lancement pour transformer cette innovation en visibilité massive pour votre établissement. »`,
      },
      objections: [
        {
          q: "« Est-ce que ça ne va pas paraître froid ou remplacer mon personnel ? »",
          a: `« Sur le terrain, c'est tout l'inverse : le robot absorbe les tâches physiques et répétitives pour permettre à votre équipe d'être plus souriante et disponible pour vos clients. Et côté visiteurs, l'effet de curiosité et de modernité est immédiat. »`,
        },
        {
          q: "« Nos locaux sont complexes / étroits »",
          a: `« C'est précisément pour cela que nous commençons toujours par une phase de diagnostic et de cartographie afin de valider la compatibilité de vos espaces et choisir le format exact. »`,
        },
        {
          q: "« Je ne veux pas m'engager sans voir en vrai »",
          a: `« C'est parfaitement normal ! Nous pouvons justement cadrer une démonstration ou un essai adapté à votre scénario pour que vos équipes testent le robot dans vos propres conditions. »`,
        },
      ],
    };
  }

  if (serviceId === "social") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Résoudre : ${sector.painSocial}. Délégation progressive en 3 niveaux (Essentielle, Croissance Active, Domination Sociale) : stratégie, création, rédaction, programmation et modération.`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. Je viens de regarder vos réseaux sociaux pour [Nom Entreprise] : la qualité de votre métier se voit, mais le rythme de publication ne permet pas encore de capter régulièrement de nouveaux ${sector.clientWord}. Vous gérez vos réseaux en interne aujourd'hui ? »`,
        qualification: [
          `« Combien de temps passez-vous chaque semaine à trouver des idées, créer les visuels et rédiger les posts ? »`,
          `« Quels réseaux comptent le plus pour votre clientèle (Instagram, Facebook, LinkedIn, TikTok) ? »`,
          `« Si une équipe prenait en main votre calendrier éditorial, vos visuels, vos stories et la modération, qu'est-ce que ça changerait dans votre semaine ? »`,
        ],
        bridge: `« Je vous propose un échange de 10 minutes avec 3 idées éditoriales personnalisées pour [Nom Entreprise] afin de choisir le bon niveau de délégation. Demain 11h ou 16h ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] 📱 Très beau travail chez [Nom Entreprise] ! Petit regard extérieur : ${sector.painSocial}. Nous aidons les entreprises de votre secteur à déléguer 100 % de leur calendrier éditorial, création de visuels et animation sociale. Je peux vous envoyer 2 idées de concepts adaptées à votre marque ?`,
        followupJ2: `Bonjour [Prénom], j'ai noté 3 formats courts qui fonctionnent particulièrement bien en ${sector.name} pour générer des ${sector.clientWord} sans y passer vos soirées. Je vous les partage ici ?`,
        followupJ5: `[Prénom], si vous souhaitez garder une présence régulière et professionnelle toute l'année sans avoir à y penser chaque semaine, on peut caler 10 minutes pour voir quelle formule (1, 2 ou 3 réseaux) vous correspond le mieux.`,
      },
      pitchDemo: `« Notre méthodologie Social Media suit 4 temps : Positionnement & piliers éditoriaux, Production des visuels/carrousels/formats courts, Animation & modération selon le niveau choisi, et Pilotage mensuel. Vous choisissez simplement votre degré de délégation : Présence Essentielle (1 réseau), Croissance Active (2 réseaux + stories + reporting) ou Domination Sociale (3 réseaux + veille). »`,
      closing: {
        mainClose: `« Au vu de votre audience, la formule Croissance Active sur 2 réseaux apporte la meilleure régularité. On cale l'atelier de positionnement cette semaine pour lancer votre calendrier éditorial ? »`,
        upsellLine: `« Pour que tout votre feed ait instantanément une allure cohérente et reconnaissable, on peut harmoniser vos codes visuels en amont avec notre Brand Identity Kit. »`,
      },
      objections: [
        {
          q: "« Je préfère publier moi-même pour rester authentique »",
          a: `« Vous gardez totalement votre authenticité ! Vous nous envoyez simplement vos photos ou moments forts du quotidien sur WhatsApp, et notre équipe les sublime, rédige les textes et assure une régularité impeccable. »`,
        },
        {
          q: "« Les tournages sur site sont-ils inclus ? »",
          a: `« Pour rester transparents dès le départ : la stratégie, les visuels, la rédaction, la programmation et l'animation sont inclus dans la formule. Si vous souhaitez un tournage photo/vidéo sur place, nous le cadrons proprement à part. »`,
        },
        {
          q: "« Les réseaux sociaux ne marchent pas dans mon métier »",
          a: `« En réalité, vos prospects vérifient presque toujours vos réseaux avant de vous contacter. Une page active et professionnelle rassure immédiatement et transforme l'hésitation en prise de contact. »`,
        },
      ],
    };
  }

  if (serviceId === "seo") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Construire une visibilité durable et transparente sur Google pour capter des ${sector.clientWord} organiques toute l'année.`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. J'ai analysé la visibilité Google de [Nom Entreprise] sur vos mots-clés métiers : aujourd'hui vos concurrents captent la majorité des recherches gratuites. Vous avez déjà une stratégie SEO active ? »`,
        qualification: [
          `« Dépendre uniquement du bouche-à-oreille ou de la pub payante est-il un frein pour votre croissance ? »`,
          `« Quelles sont les 3 recherches exactes sur lesquelles vous aimeriez que vos clients vous trouvent en premier ? »`,
        ],
        bridge: `« Je vous prépare un audit SEO flash clair et sans jargon avec les points prioritaires de votre site, et on le parcourt ensemble en 10 minutes demain ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] 📈 J'ai analysé le référencement naturel de [Nom Entreprise] : il existe plusieurs leviers rapides pour remonter sur Google et capter des ${sector.clientWord} en continu. Souhaitez-vous que je vous envoie notre diagnostic synthétique ?`,
        followupJ2: `Bonjour [Prénom], votre synthèse SEO pour [Nom Entreprise] est prête (structure technique + 3 opportunités de mots-clés prioritaires). Je vous la transmets ici ?`,
        followupJ5: `[Prénom], contrairement aux campagnes publicitaires qui s'arrêtent dès qu'on coupe la diffusion, le SEO construit un actif durable mois après mois. Dites-moi si vous voulez voir vos opportunités prioritaires.`,
      },
      pitchDemo: `« Notre approche SEO est volontairement pédagogique et transparente : vous comprenez exactement ce que nous optimisons (technique, contenu, autorité) et vous suivez l'évolution réelle de votre visibilité sur Google mois après mois. »`,
      closing: {
        mainClose: `« Plus on lance les fondations tôt, plus vite Google valorise vos pages sur vos requêtes stratégiques. On démarre l'audit technique approfondi cette semaine ? »`,
        upsellLine: `« Pour obtenir des résultats rapides localement pendant que le SEO monte en puissance, associer Google Maps Top 3 est la combinaison la plus redoutable. »`,
      },
      objections: [
        {
          q: "« Le SEO prend trop de temps »",
          a: `« C'est un travail de fond, et nous sommes toujours honnêtes sur ce point. C'est d'ailleurs pour ça que l'on peut combiner des optimisations rapides (fiche Google Maps + pages clés) avec la stratégie long terme. »`,
        },
        {
          q: "« J'ai déjà eu une mauvaise expérience avec une agence SEO »",
          a: `« C'est souvent lié au manque de transparence. Chez nous, chaque action réalisée est documentée clairement et expliquée simplement dans votre suivi mensuel. »`,
        },
        {
          q: "« Mon site n'est peut-être pas adapté »",
          a: `« Notre premier contrôle technique vérifie justement la solidité de votre base. Si besoin, on corrige uniquement ce qui bloque ou on vous propose une refonte propre et prête pour Google. »`,
        },
      ],
    };
  }

  if (serviceId === "branding") {
    return {
      sector,
      serviceId,
      serviceName: service.name,
      angle: `Donner à l'entreprise une identité visuelle durable et cohérente (Logo Signature, Brand Identity Kit ou Full Brand Suite avec Brand Book et droits commerciaux cédés).`,
      coldCall: {
        opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. En découvrant [Nom Entreprise], j'ai vu que votre niveau d'expertise méritait une identité visuelle beaucoup plus forte et cohérente sur tous vos supports. Vous avez déjà envisagé de moderniser votre image de marque ? »`,
        qualification: [
          `« Disposez-vous aujourd'hui de fichiers maîtres propres (vectoriels, déclinaisons) prêts pour le digital et l'impression ? »`,
          `« Avez-vous une charte claire (couleurs, typographies) pour que votre marque soit reconnaissable au premier coup d'œil ? »`,
        ],
        bridge: `« Notre studio conçoit des systèmes de marque complets avec cession intégrale des droits. Je vous envoie 3 exemples de transformations visuelles sur WhatsApp ? »`,
      },
      setting: {
        dm1: `Bonjour [Prénom] ✨ En parcourant [Nom Entreprise], j'ai remarqué qu'une identité visuelle plus affirmée renforcerait immédiatement la confiance de vos prospects. On réalise des logos, Brand Kits et Brand Books complets avec tous les fichiers sources. Je vous montre des références ?`,
        followupJ2: `Bonjour [Prénom], une identité visuelle cohérente élève immédiatement la perception de qualité sur vos devis, réseaux sociaux et vitrines. Voici quelques créations récentes si vous voulez y jeter un œil !`,
        followupJ5: `[Prénom], que ce soit pour un Logo Signature ou une Full Brand Suite complète, notre processus en 3 étapes (plateforme, système visuel, déploiement) est rapide et clé-en-main. On en parle 5 minutes ?`,
      },
      pitchDemo: `« Nous construisons un vrai système de marque en 3 étapes : Plateforme de marque (ton et positionnement), Système visuel (logo, palette, typographie) et Déploiement avec tous les fichiers maîtres (AI, SVG, PNG, PDF) et les droits commerciaux cédés. Vous choisissez le niveau adapté : Logo Signature, Brand Identity Kit ou Full Brand Suite avec Brand Book. »`,
      closing: {
        mainClose: `« Entre le Brand Identity Kit et la Full Brand Suite avec Brand Book complet, quel niveau répond le mieux à vos supports actuels ? On lance l'atelier de direction créative cette semaine ? »`,
        upsellLine: `« Dès que votre identité est validée, le prolongement naturel consiste à l'appliquer sur votre site web et vos réseaux pour un rendu 100 % homogène. »`,
      },
      objections: [
        {
          q: "« Je peux faire mon logo moi-même avec un outil gratuit »",
          a: `« Pour un brouillon oui, mais en usage professionnel vous manquez d'originalité, de fichiers vectoriels propres pour les enseignes/impressions et de vraie cohérence de marque. Un système professionnel vous accompagne pendant des années. »`,
        },
        {
          q: "« J'ai peur que le style ne me corresponde pas »",
          a: `« Nous ne dessinons jamais à l'aveugle : on commence toujours par cadrer votre univers, vos références et votre positionnement avant de créer les pistes graphiques. »`,
        },
        {
          q: "« Ce n'est pas urgent pour moi »",
          a: `« Je comprends. Gardez simplement en tête que chaque prospect juge votre sérieux dans les 3 premières secondes en voyant votre logo et vos supports — dès que vous voudrez passer un cap, nous sommes prêts. »`,
        },
      ],
    };
  }

  // WebCare & Maintenance
  return {
    sector,
    serviceId,
    serviceName: service.name,
    angle: `Garantir la fiabilité, la sécurité et la réactivité sur toutes les évolutions courantes du site (Essentiel, Business ou Unlimited) sans dépendre d'interventions ponctuelles lentes.`,
    coldCall: {
      opener: `« Bonjour [Prénom], c'est [Mon Prénom] de XR Agency. Question très simple : qui s'occupe aujourd'hui des mises à jour de sécurité et des petites modifications sur le site de [Nom Entreprise] quand vous devez changer un texte, une photo ou une actualité ? »`,
      qualification: [
        `« Combien de temps attendez-vous en moyenne quand vous demandez une modification sur votre site ? »`,
        `« Avez-vous la certitude que vos mises à jour techniques et sauvegardes sont suivies chaque mois ? »`,
      ],
      bridge: `« Avec WebCare, vous disposez d'une équipe réactive en continu (3 niveaux : Essentiel, Business prioritaire ou Unlimited). Je vous envoie le comparatif clair sur WhatsApp ? »`,
    },
    setting: {
      dm1: `Bonjour [Prénom] 🛡️ Petit check rapide : un site sans suivi technique régulier perd vite en performance ou bloque au mauvais moment. Notre service WebCare couvre la sécurité, les corrections et vos modifications courantes avec un support réactif. Vous avez déjà une équipe dédiée pour ça ?`,
      followupJ2: `Bonjour [Prénom], avec notre niveau Business ou Unlimited, vous envoyez simplement votre demande de modification (texte, visuel, section) et notre équipe technique l'exécute en priorité. Fini les relances interminables !`,
      followupJ5: `[Prénom], si vous voulez garder un site rapide, sécurisé et toujours à jour toute l'année en toute sérénité, on peut activer WebCare en quelques minutes.`,
    },
    pitchDemo: `« WebCare vous apporte une tranquillité totale avec 3 formules simples : Essentiel (4 modifications/mois + sécurité), Business (10 modifications/mois + traitement prioritaire + conseils) et Unlimited (modifications courantes illimitées + petites évolutions incluses). »`,
    closing: {
      mainClose: `« La formule Business est idéale pour déléguer vos mises à jour en priorité sans jamais être bloqué. On met votre site sous protection WebCare dès cette semaine ? »`,
      upsellLine: `« Lors de la prise en main technique, notre équipe peut aussi réaliser un diagnostic rapide de votre visibilité Google Maps pour identifier de nouveaux leviers locaux. »`,
    },
    objections: [
      {
        q: "« Mon site fonctionne très bien aujourd'hui »",
        a: `« C'est exactement le bon moment pour le protéger ! La maintenance préventive évite les pannes soudaines, les formulaires cassés et les failles de sécurité qui coûtent très cher en urgence. »`,
      },
      {
        q: "« Je fais mes petits changements tout seul »",
        a: `« C'est top ! WebCare vous couvre sur toute la partie sécurité et technique pendant que vous gardez la main — et dès que vous manquez de temps, notre équipe prend le relais immédiatement. »`,
      },
      {
        q: "« Qu'est-ce qui est inclus exactement ? »",
        a: `« Tout est écrit noir sur blanc : mises à jour de sécurité, corrections de contenus/visuels, interventions courantes et évolutions selon le palier choisi. Les grosses refontes restent simplement sur devis à part. »`,
      },
    ],
  };
}

// ── Parcours Structuré XR School (Formation pure · Sans durée arbitraire · Zéro argent) ──

export interface SchoolLesson {
  id: string;
  phase: string;
  title: string;
  duration: string;
  summary: string;
  checklist: string[];
}

export const XR_SCHOOL_CURRICULUM: SchoolLesson[] = [
  {
    id: "m1",
    phase: "Module 1 · Fondations XR Agency",
    title: "Maîtriser les 7 pôles de services & leurs livrables",
    duration: "15 min",
    summary: "Connaître parfaitement les bénéfices concrets de nos 7 offres (Sites web, Branding, SEO, Google Maps Top 3, Social Media, WebCare et Robotique Korben) pour orienter chaque prospect vers la bonne solution.",
    checklist: [
      "Savoir présenter clairement les 3 niveaux de Sites Web (Vitrine Pro, Business, E-commerce)",
      "Savoir expliquer la méthode en 4 étapes et le cadre de l'offre Google Maps Top 3",
      "Connaître les 4 familles de robots Korben (Accueil, Livraison, Nettoyage, Logistique/Polyvalent)",
    ],
  },
  {
    id: "m2",
    phase: "Module 2 · Setting & Prospection à froid",
    title: "L'Art du Setting (Cold Call & Messages DM/WhatsApp)",
    duration: "20 min",
    summary: "Ne jamais vendre de force au premier contact : diagnostiquer un point de friction réel en 90 secondes et décrocher un accord naturel pour une maquette, un audit ou un rendez-vous qualifié.",
    checklist: [
      "Auditer la fiche Google Maps et la version mobile d'un prospect en moins de 2 minutes",
      "Maîtriser l'accroche de 20 secondes avec un ton calme, curieux et professionnel",
      "Appliquer la séquence de relance Setting (Message 1 + Relance J+2 + Relance J+5)",
    ],
  },
  {
    id: "m3",
    phase: "Module 3 · Découverte & Présentation",
    title: "L'Effet Wow : Maquette, Audit & Démonstration",
    duration: "15 min",
    summary: "Apprendre à qualifier un besoin avec précision, transmettre un brief propre au Studio ou au Closer, puis présenter le visuel pour que le client se projette immédiatement.",
    checklist: [
      "Poser les 3 questions de qualification avant de proposer une solution",
      "Présenter la solution en parlant résultats métier (clients, temps gagné, image) plutôt que jargon technique",
      "Répondre sereinement aux objections fréquentes sans jamais se justifier ni couper la parole",
    ],
  },
  {
    id: "m4",
    phase: "Module 4 · Closing & Suivi Client",
    title: "Conclure avec élégance & fidéliser",
    duration: "20 min",
    summary: "Maîtriser la conclusion binaire sans pression, recommander les compléments cohérents (WebCare, Maps, Branding) et assurer une passation fluide vers le Studio de production.",
    checklist: [
      "Formuler une question de closing claire entre deux options adaptées au prospect",
      "Proposer systématiquement le suivi WebCare ou l'accompagnement local quand c'est pertinent",
      "Compléter la fiche client proprement pour que le Studio démarre la production sans délai",
    ],
  },
];
