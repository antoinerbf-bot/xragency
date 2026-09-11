export type PortfolioReference = {
  name: string;
  url: string;
  sector: string;
  type: "Vitrine" | "E-commerce" | "Branding" | "SaaS" | "Portail";
  image: string;
};

/**
 * Homepage previews are generated from the live public websites so the portfolio
 * shows the actual interface rather than generic stock photography.
 */
const preview = (url: string) => `https://image.thum.io/get/width/1800/crop/1050/noanimate/${url}`;

const ref = (name: string, url: string, sector: string, type: PortfolioReference["type"]): PortfolioReference => ({
  name,
  url,
  sector,
  type,
  image: preview(url),
});

export const PORTFOLIO_REFERENCES: PortfolioReference[] = [
  // Luxe — independent / mid-size references rather than global mega-brands
  ref("Le Gramme", "https://www.legramme.com/", "luxe", "E-commerce"),
  ref("Maison Matisse", "https://www.maison-matisse.com/", "luxe", "E-commerce"),
  ref("Fornasetti", "https://www.fornasetti.com/", "luxe", "E-commerce"),

  // Hôtellerie
  ref("d’Angleterre", "https://www.dangleterre.com/", "hotel", "Vitrine"),
  ref("Saxon Hotel", "https://www.saxon.co.za/", "hotel", "Vitrine"),
  ref("Passalacqua", "https://www.passalacqua.it/", "hotel", "Vitrine"),

  // Restauration
  ref("Curious Cork", "https://www.curiouscork.wine/", "restaurant", "Vitrine"),
  ref("Baker’s Crust", "https://www.bakerscrust.com/", "restaurant", "E-commerce"),
  ref("Seagar’s", "https://www.seagars.com/", "restaurant", "Vitrine"),

  // Immobilier
  ref("11 Tanjung", "https://11tanjung.com/", "immobilier", "Vitrine"),
  ref("Navana Real Estate", "https://navana.com/", "immobilier", "Vitrine"),
  ref("The Hideout", "https://thehideout.com/", "immobilier", "Vitrine"),

  // Automobile / mobilité
  ref("Lacks Enterprises", "https://lacksenterprises.com/", "auto", "Vitrine"),
  ref("Kelford Cams", "https://kelfordcams.com/", "auto", "E-commerce"),
  ref("Springrates", "https://www.springrates.com/", "auto", "E-commerce"),

  // Architecture
  ref("FGM Architects", "https://www.fgmarchitects.com/", "architecture", "Vitrine"),
  ref("Sera Architects", "https://seraarchitects.com/", "architecture", "Vitrine"),
  ref("Feldman Architecture", "https://www.feldmanarchitecture.com/", "architecture", "Vitrine"),

  // Mode
  ref("L.F.Markey", "https://lfmarkey.com/", "mode", "E-commerce"),
  ref("Palmer Harding", "https://www.palmerharding.com/", "mode", "E-commerce"),
  ref("Odeur", "https://odeurstudios.com/", "mode", "E-commerce"),

  // Beauté
  ref("Anillo", "https://anillo.com/", "beaute", "E-commerce"),
  ref("Typology", "https://www.typology.com/", "beaute", "E-commerce"),
  ref("Nécessaire", "https://necessaire.com/", "beaute", "E-commerce"),

  // Santé
  ref("Embrace Your Smile", "https://embraceyoursmile.com/", "sante", "Vitrine"),
  ref("Cuyuna Regional Medical Center", "https://www.cuyunamed.org/", "sante", "Portail"),
  ref("NasaClip", "https://nasaclip.com/", "sante", "Vitrine"),

  // Droit
  ref("Law Offices of Dianne Sawaya", "https://www.dlslaw.com/", "droit", "Vitrine"),
  ref("The Stritmatter Firm", "https://www.stritmatter.com/", "droit", "Vitrine"),
  ref("Simeone & Miller", "https://www.simeonemiller.com/", "droit", "Vitrine"),

  // Finance
  ref("Monzo", "https://monzo.com/", "finance", "Vitrine"),
  ref("N26", "https://n26.com/", "finance", "Vitrine"),
  ref("Klarna", "https://www.klarna.com/", "finance", "SaaS"),

  // Tech / SaaS
  ref("Linear", "https://linear.app/", "tech", "SaaS"),
  ref("Raycast", "https://www.raycast.com/", "tech", "SaaS"),
  ref("Lottiefiles", "https://lottiefiles.com/", "tech", "SaaS"),

  // Éducation
  ref("Minerva University", "https://www.minerva.edu/", "education", "Vitrine"),
  ref("42", "https://42.fr/", "education", "Vitrine"),
  ref("Hyper Island", "https://www.hyperisland.com/", "education", "Vitrine"),

  // Sport
  ref("On Running", "https://www.on.com/", "sport", "E-commerce"),
  ref("Rapha", "https://www.rapha.cc/", "sport", "E-commerce"),
  ref("WHOOP", "https://www.whoop.com/", "sport", "E-commerce"),

  // Voyage
  ref("Black Tomato", "https://www.blacktomato.com/", "voyage", "Vitrine"),
  ref("Mr & Mrs Smith", "https://www.mrandmrssmith.com/", "voyage", "Portail"),
  ref("Original Travel", "https://www.originaltravel.co.uk/", "voyage", "Vitrine"),

  // Maison / Design
  ref("Muuto", "https://www.muuto.com/", "maison", "E-commerce"),
  ref("Ferm Living", "https://fermliving.com/", "maison", "E-commerce"),
  ref("Hay", "https://www.hayshop.com/", "maison", "E-commerce"),

  // Joaillerie
  ref("Completedworks", "https://completedworks.com/", "joaillerie", "E-commerce"),
  ref("Sophie Whitelaw", "https://www.sophiewhitelaw.com/", "joaillerie", "Vitrine"),
  ref("Spinelli Kilcollin", "https://www.spinellikilcollin.com/", "joaillerie", "E-commerce"),

  // Food / épicerie
  ref("Graza", "https://www.graza.co/", "food", "E-commerce"),
  ref("Fishwife", "https://eatfishwife.com/", "food", "E-commerce"),
  ref("Diaspora Co.", "https://www.diasporaco.com/", "food", "E-commerce"),

  // Spa / Wellness
  ref("Life Time", "https://www.lifetime.life/", "spa", "Vitrine"),
  ref("Aman Spa", "https://www.aman.com/wellness", "spa", "Vitrine"),
  ref("The Well", "https://www.the-well.com/", "spa", "Vitrine"),

  // Construction
  ref("Vitruvius Built", "https://www.vitruviusbuilt.com/", "construction", "Vitrine"),
  ref("Alberici", "https://www.alberici.com/", "construction", "Vitrine"),
  ref("Granger Construction", "https://www.grangerconstruction.com/", "construction", "Vitrine"),
];

export const PORTFOLIO_SECTORS = [
  ["luxe", "Luxe"],
  ["hotel", "Hôtellerie"],
  ["restaurant", "Restauration"],
  ["immobilier", "Immobilier"],
  ["auto", "Automobile"],
  ["architecture", "Architecture"],
  ["mode", "Mode"],
  ["beaute", "Beauté"],
  ["sante", "Santé"],
  ["droit", "Droit"],
  ["finance", "Finance"],
  ["tech", "Tech / SaaS"],
  ["education", "Éducation"],
  ["sport", "Sport"],
  ["voyage", "Voyage"],
  ["maison", "Maison / Design"],
  ["joaillerie", "Joaillerie"],
  ["food", "Food / Épicerie"],
  ["spa", "Spa / Wellness"],
  ["construction", "Construction"],
] as const;
