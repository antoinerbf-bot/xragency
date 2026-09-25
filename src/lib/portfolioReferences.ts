export type PortfolioReference = {
  name: string;
  url: string;
  sector: string;
  type: "Vitrine" | "E-commerce" | "Branding" | "SaaS" | "Portail";
  image: string;
  origin: "XR Agency" | "Référence";
};

/** Real public homepage previews — no generic stock photography. */
const preview = (url: string) => `https://image.thum.io/get/width/1800/crop/1050/noanimate/${url}`;
const ref = (name: string, url: string, sector: string, type: PortfolioReference["type"], origin: PortfolioReference["origin"] = "Référence"): PortfolioReference => ({ name, url, sector, type, image: preview(url), origin });

const RAW_PORTFOLIO_REFERENCES: PortfolioReference[] = [
  ref("Pok-N Ball", "https://pokebowlfresh.vercel.app/", "restaurant", "E-commerce", "XR Agency"),
  ref("French Paradise", "https://frenchparadise.vn/", "food", "Vitrine", "XR Agency"),
  ref("Le Gramme", "https://legramme.com/", "luxe", "E-commerce"), ref("MaisonCléo", "https://maisoncleo.com/", "luxe", "E-commerce"), ref("Completedworks", "https://completedworks.com/", "luxe", "E-commerce"),
  ref("AYANA", "https://www.ayana.com/", "hotel", "Vitrine"), ref("Heckfield Place", "https://www.heckfieldplace.com/", "hotel", "Vitrine"), ref("Naman Retreat", "https://www.namanretreat.com/", "hotel", "Vitrine"),
  ref("Septime", "https://www.septime-charonne.fr/", "restaurant", "Vitrine"), ref("Burnt Ends", "https://burntends.com.sg/", "restaurant", "Vitrine"), ref("BRAT", "https://bratrestaurant.co.uk/", "restaurant", "Vitrine"),
  ref("The Modern House", "https://www.themodernhouse.com/", "immobilier", "Portail"), ref("DDRE Global", "https://ddreglobal.com/", "immobilier", "Vitrine"), ref("Aucoot", "https://www.aucoot.com/", "immobilier", "Vitrine"),
  ref("Girardo & Co.", "https://girardo.com/", "auto", "Vitrine"), ref("DK Engineering", "https://www.dkeng.co.uk/", "auto", "Vitrine"), ref("Romans International", "https://www.romansinternational.com/", "auto", "E-commerce"),
  ref("FGM Architects", "https://fgma.co.uk/", "architecture", "Vitrine"), ref("Office Winhov", "https://winhov.nl/", "architecture", "Vitrine"), ref("Montalba Architects", "https://montalbaarchitects.com/", "architecture", "Vitrine"),
  ref("Paloma Wool", "https://palomawool.com/", "mode", "E-commerce"), ref("MaisonCléo", "https://maisoncleo.com/", "mode", "E-commerce"), ref("Girls of Dust", "https://www.girlsofdust.com/", "mode", "E-commerce"),
  ref("Anillo", "https://anillo.com/", "beaute", "E-commerce"), ref("Typology", "https://www.typology.com/", "beaute", "E-commerce"), ref("Agent Nateur", "https://www.agentnateur.com/", "beaute", "E-commerce"),
  ref("Neko Health", "https://www.nekohealth.com/", "sante", "Vitrine"), ref("OneSkin", "https://www.oneskin.co/", "sante", "E-commerce"), ref("Forward Health", "https://goforward.com/", "sante", "Vitrine"),
  ref("Keystone Law", "https://keystonelaw.com/", "droit", "Vitrine"), ref("Hodge Jones & Allen", "https://www.hja.net/", "droit", "Vitrine"), ref("Buckles Solicitors", "https://www.buckles-law.co.uk/", "droit", "Vitrine"),
  ref("Plum", "https://withplum.com/", "finance", "Vitrine"), ref("Yotta", "https://www.withyotta.com/", "finance", "Vitrine"), ref("Tide", "https://www.tide.co/", "finance", "Vitrine"),
  ref("Raycast", "https://www.raycast.com/", "tech", "SaaS"), ref("Spline", "https://spline.design/", "tech", "SaaS"), ref("LottieFiles", "https://lottiefiles.com/", "tech", "SaaS"),
  ref("The School of Life", "https://www.theschooloflife.com/", "education", "E-commerce"), ref("Minerva University", "https://www.minerva.edu/", "education", "Vitrine"), ref("Hyper Island", "https://hyperisland.com/", "education", "Vitrine"),
  ref("Kettlebell Kings", "https://www.kettlebellkings.com/", "sport", "E-commerce"), ref("WOD Nation", "https://wodnationgear.com/", "sport", "E-commerce"), ref("The Athlete Lab", "https://www.theathletelab.com/", "sport", "Vitrine"),
  ref("Jacada Travel", "https://www.jacadatravel.com/", "voyage", "Vitrine"), ref("Black Tomato", "https://www.blacktomato.com/", "voyage", "Vitrine"), ref("Original Travel", "https://www.originaltravel.co.uk/", "voyage", "Vitrine"),
  ref("Audo Copenhagen", "https://audocph.com/", "maison", "E-commerce"), ref("Ferm Living", "https://fermliving.com/", "maison", "E-commerce"), ref("Muuto", "https://www.muuto.com/", "maison", "E-commerce"),
  ref("Le Gramme", "https://legramme.com/", "joaillerie", "E-commerce"), ref("Viltier", "https://www.viltier.com/", "joaillerie", "E-commerce"), ref("Sophie Bille Brahe", "https://sophiebillebrahe.com/", "joaillerie", "E-commerce"),
  ref("Graza", "https://www.graza.co/", "food", "E-commerce"), ref("Fishwife", "https://fishwife.com/", "food", "E-commerce"), ref("Fly By Jing", "https://flybyjing.com/", "food", "E-commerce"),
  ref("TIA Wellness Resort", "https://tiawellnessresort.com/", "spa", "Vitrine"), ref("Alba Wellness Valley", "https://www.albawellnessvalley.com/", "spa", "Vitrine"), ref("La Spa Ma May", "https://laspamamay.com/", "spa", "Vitrine"),
  ref("Ridgeway Construction", "https://www.ridgewayconstruction.co.uk/", "construction", "Vitrine"), ref("Mackenzie Construction", "https://mackenzieconstruction.co.uk/", "construction", "Vitrine"), ref("Barnes Construction", "https://www.barnesconstruction.co.uk/", "construction", "Vitrine"),
  
];

export const PORTFOLIO_REFERENCES: PortfolioReference[] = Array.from(
  new Map(RAW_PORTFOLIO_REFERENCES.map((item) => [`${item.name}|${item.url}`, item])).values(),
);

export const PORTFOLIO_SECTORS = [
  ["luxe", "Luxe"], ["hotel", "Hôtellerie"], ["restaurant", "Restauration"], ["immobilier", "Immobilier"], ["auto", "Automobile"],
  ["architecture", "Architecture"], ["mode", "Mode"], ["beaute", "Beauté"], ["sante", "Santé"], ["droit", "Droit"],
  ["finance", "Finance"], ["tech", "Tech / SaaS"], ["education", "Éducation"], ["sport", "Sport"], ["voyage", "Voyage"],
  ["maison", "Maison / Design"], ["joaillerie", "Joaillerie"], ["food", "Food / Épicerie"], ["spa", "Spa / Wellness"], ["construction", "Construction"],
] as const;
