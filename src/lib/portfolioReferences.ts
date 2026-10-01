export type PortfolioReference = {
  name: string;
  url: string;
  sector: string;
  type: "Vitrine" | "E-commerce" | "Branding" | "SaaS" | "Portail";
  image: string;
  services: string[];
  origin: "XR Agency" | "Référence";
};

/** Real public homepage previews — no generic stock photography. */
const preview = (url: string) => `https://image.thum.io/get/width/1800/crop/1050/noanimate/${url}`;
const ref = (name: string, url: string, sector: string, type: PortfolioReference["type"], origin: PortfolioReference["origin"] = "Référence"): PortfolioReference => ({
  name,
  url,
  sector,
  type,
  image: preview(url),
  services:
    type === "E-commerce" ? ["websites", "ecommerce"] :
    type === "Branding" ? ["branding"] :
    type === "SaaS" ? ["websites"] :
    ["websites"],
  origin,
});

const RAW_PORTFOLIO_REFERENCES: PortfolioReference[] = [
  ref("Pok-N Ball", "https://pokebowlfresh.vercel.app/", "restaurant", "Vitrine", "XR Agency"),
  ref("Completedworks", "https://completedworks.com/", "luxe", "E-commerce"),
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
  ref("The Athlete Lab", "https://www.theathletelab.com/", "sport", "Vitrine"),
  ref("Jacada Travel", "https://www.jacadatravel.com/", "voyage", "Vitrine"), ref("Black Tomato", "https://www.blacktomato.com/", "voyage", "Vitrine"), ref("Original Travel", "https://www.originaltravel.co.uk/", "voyage", "Vitrine"),
  ref("Audo Copenhagen", "https://audocph.com/", "maison", "E-commerce"), ref("Ferm Living", "https://fermliving.com/", "maison", "E-commerce"), ref("Muuto", "https://www.muuto.com/", "maison", "E-commerce"),
  ref("Le Gramme", "https://legramme.com/", "joaillerie", "E-commerce"), ref("Viltier", "https://www.viltier.com/", "joaillerie", "E-commerce"), ref("Sophie Bille Brahe", "https://sophiebillebrahe.com/", "joaillerie", "E-commerce"),
  ref("Graza", "https://www.graza.co/", "food", "E-commerce"), ref("Fishwife", "https://fishwife.com/", "food", "E-commerce"), ref("Fly By Jing", "https://flybyjing.com/", "food", "E-commerce"),
  ref("TIA Wellness Resort", "https://tiawellnessresort.com/", "spa", "Vitrine"), ref("Alba Wellness Valley", "https://www.albawellnessvalley.com/", "spa", "Vitrine"), ref("La Spa Ma May", "https://laspamamay.com/", "spa", "Vitrine"),
  ref("Ridgeway Construction", "https://www.ridgewayconstruction.co.uk/", "construction", "Vitrine"), ref("Mackenzie Construction", "https://www.mackenzieconstruction.com/", "construction", "Vitrine"), ref("Barnes Construction", "https://www.barnesconstruction.co.uk/", "construction", "Vitrine"),
  // Expanded creative references — public homepages selected for art direction, UX, typography and visual storytelling.
  ref("Aman", "https://www.aman.com/", "hotel", "Vitrine"), ref("Six Senses", "https://www.sixsenses.com/", "hotel", "Vitrine"), ref("Rosewood Hotels", "https://www.rosewoodhotels.com/", "hotel", "Vitrine"), ref("Capella Hotels", "https://capellahotels.com/", "hotel", "Vitrine"),
  ref("The Hoxton", "https://thehoxton.com/", "hotel", "Vitrine"), ref("Soho House", "https://www.sohohouse.com/", "hotel", "Vitrine"), ref("COMO Hotels", "https://www.comohotels.com/", "hotel", "Vitrine"), ref("Banyan Tree", "https://www.banyantree.com/", "hotel", "Vitrine"),
  ref("The Wolseley", "https://www.thewolseley.com/", "restaurant", "Vitrine"), ref("Noma", "https://noma.dk/", "restaurant", "Vitrine"), ref("Disfrutar", "https://www.disfrutarbarcelona.com/", "restaurant", "Vitrine"), ref("Gaggan", "https://www.gaggan.com/", "restaurant", "Vitrine"),
  ref("Alain Ducasse", "https://www.alainducasse-me.com/", "restaurant", "Vitrine"), ref("Eleven Madison Park", "https://www.elevenmadisonpark.com/", "restaurant", "Vitrine"), ref("Lyle's", "https://lyleslondon.com/", "restaurant", "Vitrine"), ref("St. John", "https://stjohnrestaurant.com/", "restaurant", "Vitrine"),
  ref("Bottega Veneta", "https://www.bottegaveneta.com/", "mode", "E-commerce"), ref("Loewe", "https://www.loewe.com/", "mode", "E-commerce"), ref("Jacquemus", "https://www.jacquemus.com/", "mode", "E-commerce"), ref("Toteme", "https://toteme-studio.com/", "mode", "E-commerce"),
  ref("Acne Studios", "https://www.acnestudios.com/", "mode", "E-commerce"), ref("Aesop", "https://www.aesop.com/", "beaute", "E-commerce"), ref("Dr. Barbara Sturm", "https://www.drsturm.com/", "beaute", "E-commerce"), ref("Augustinus Bader", "https://augustinusbader.com/", "beaute", "E-commerce"),
  ref("La Mer", "https://www.cremedelamer.com/", "beaute", "E-commerce"), ref("Byredo", "https://www.byredo.com/", "beaute", "E-commerce"), ref("Le Labo", "https://www.lelabofragrances.com/", "beaute", "E-commerce"), ref("Diptyque", "https://www.diptyqueparis.com/", "beaute", "E-commerce"),
  ref("Vitra", "https://www.vitra.com/", "maison", "Vitrine"), ref("Cassina", "https://www.cassina.com/", "maison", "E-commerce"), ref("Flos", "https://flos.com/", "maison", "E-commerce"), ref("Hay", "https://www.hay.com/", "maison", "E-commerce"),
  ref("B&B Italia", "https://www.bebitalia.com/", "maison", "E-commerce"), ref("Knoll", "https://www.knoll.com/", "maison", "E-commerce"), ref("Tekla", "https://teklafabrics.com/", "maison", "E-commerce"), ref("Artek", "https://www.artek.fi/", "maison", "E-commerce"),
  ref("Cartier", "https://www.cartier.com/", "joaillerie", "E-commerce"), ref("Van Cleef & Arpels", "https://www.vancleefarpels.com/", "joaillerie", "E-commerce"), ref("Tiffany & Co.", "https://www.tiffany.com/", "joaillerie", "E-commerce"), ref("Bulgari", "https://www.bulgari.com/", "joaillerie", "E-commerce"),
  ref("De Beers", "https://www.debeers.com/", "joaillerie", "E-commerce"), ref("Messika", "https://www.messika.com/", "joaillerie", "E-commerce"), ref("Repossi", "https://repossi.com/", "joaillerie", "E-commerce"),
  ref("Porsche", "https://www.porsche.com/", "auto", "Vitrine"), ref("Ferrari", "https://www.ferrari.com/", "auto", "Vitrine"), ref("Lamborghini", "https://www.lamborghini.com/", "auto", "Vitrine"), ref("Aston Martin", "https://www.astonmartin.com/", "auto", "Vitrine"),
  ref("McLaren", "https://www.mclaren.com/", "auto", "Vitrine"), ref("Pagani", "https://www.pagani.com/", "auto", "Vitrine"), ref("Polestar", "https://www.polestar.com/", "auto", "Vitrine"),
  ref("Snøhetta", "https://snohetta.com/", "architecture", "Vitrine"), ref("BIG", "https://big.dk/", "architecture", "Vitrine"), ref("OMA", "https://oma.com/", "architecture", "Vitrine"), ref("Foster + Partners", "https://www.fosterandpartners.com/", "architecture", "Vitrine"),
  ref("Herzog & de Meuron", "https://www.herzogdemeuron.com/", "architecture", "Vitrine"), ref("Zaha Hadid Architects", "https://www.zaha-hadid.com/", "architecture", "Vitrine"), ref("Studio MK27", "https://www.studiomk27.com/", "architecture", "Vitrine"),
  ref("Norm Architects", "https://normcph.com/", "architecture", "Vitrine"), ref("Pentagram", "https://www.pentagram.com/", "luxe", "Branding"), ref("Collins", "https://www.wearecollins.com/", "luxe", "Branding"), ref("Base Design", "https://basedesign.com/", "luxe", "Branding"),
  ref("Spotify", "https://www.spotify.com/", "tech", "SaaS"), ref("Linear", "https://linear.app/", "tech", "SaaS"), ref("Notion", "https://www.notion.so/", "tech", "SaaS"), ref("Framer", "https://www.framer.com/", "tech", "SaaS"),
  ref("Webflow", "https://webflow.com/", "tech", "SaaS"), ref("Arc", "https://arc.net/", "tech", "SaaS"), ref("Stripe", "https://stripe.com/", "finance", "SaaS"), ref("Brex", "https://www.brex.com/", "finance", "SaaS"),
  ref("Monzo", "https://monzo.com/", "finance", "Vitrine"), ref("Revolut", "https://www.revolut.com/", "finance", "Vitrine"), ref("Wise", "https://wise.com/", "finance", "Vitrine"),
  ref("Blacklane", "https://www.blacklane.com/", "voyage", "Vitrine"), ref("Mr & Mrs Smith", "https://www.mrandmrssmith.com/", "voyage", "Vitrine"), ref("Audley Travel", "https://www.audleytravel.com/", "voyage", "Vitrine"), ref("Six Senses Journeys", "https://www.sixsenses.com/en/journeys", "voyage", "Vitrine"),
  ref("Nike", "https://www.nike.com/", "sport", "E-commerce"), ref("On", "https://www.on.com/", "sport", "E-commerce"), ref("Rapha", "https://www.rapha.cc/", "sport", "E-commerce"), ref("Arc'teryx", "https://arcteryx.com/", "sport", "E-commerce"),
  ref("WHOOP", "https://www.whoop.com/", "sport", "Vitrine"), ref("Pace", "https://www.paceathletic.com/", "sport", "Vitrine"),
  ref("Monocle", "https://monocle.com/", "education", "Vitrine"), ref("Dezeen", "https://www.dezeen.com/", "architecture", "Portail"), ref("It's Nice That", "https://www.itsnicethat.com/", "education", "Portail"),
  ref("MUBI", "https://mubi.com/", "tech", "SaaS"), ref("MasterClass", "https://www.masterclass.com/", "education", "Vitrine"), ref("Domestika", "https://www.domestika.org/", "education", "Vitrine"),
  ref("Parsley Health", "https://www.parsleyhealth.com/", "sante", "Vitrine"), ref("Forward", "https://www.goforward.com/", "sante", "Vitrine"), ref("Function Health", "https://www.functionhealth.com/", "sante", "Vitrine"),
  ref("The Nue Co.", "https://thenueco.com/", "sante", "E-commerce"), ref("Hims", "https://www.hims.com/", "sante", "Vitrine"),
  ref("The Expert", "https://www.theexpert.com/", "maison", "Portail"), ref("1stDibs", "https://www.1stdibs.com/", "maison", "Portail"), ref("Pamono", "https://www.pamono.eu/", "maison", "E-commerce"),
  ref("Ace & Tate", "https://www.aceandtate.com/", "mode", "E-commerce"), ref("Cubitts", "https://cubitts.com/", "mode", "E-commerce"), ref("Warby Parker", "https://www.warbyparker.com/", "mode", "E-commerce"),
  ref("Oatly", "https://www.oatly.com/", "food", "Vitrine"), ref("Graza", "https://www.graza.co/", "food", "E-commerce"), ref("Magic Spoon", "https://magicspoon.com/", "food", "E-commerce"), ref("Liquid Death", "https://liquiddeath.com/", "food", "E-commerce"),
  ref("Patagonia", "https://www.patagonia.com/", "sport", "E-commerce"), ref("Snow Peak", "https://www.snowpeak.com/", "sport", "E-commerce"), ref("Norda", "https://nordarun.com/", "sport", "E-commerce"),
  ref("Soho Works", "https://www.sohoworks.com/", "immobilier", "Vitrine"), ref("WeWork", "https://www.wework.com/", "immobilier", "Vitrine"), ref("Habyt", "https://www.habyt.com/", "immobilier", "Vitrine"),
  ref("Sotheby's International Realty", "https://www.sothebysrealty.com/", "immobilier", "Portail"), ref("Christie's International Real Estate", "https://www.christiesrealestate.com/", "immobilier", "Portail"),
  ref("Dior", "https://www.dior.com/", "luxe", "E-commerce"), ref("Chanel", "https://www.chanel.com/", "luxe", "E-commerce"), ref("Saint Laurent", "https://www.ysl.com/", "luxe", "E-commerce"), ref("Prada", "https://www.prada.com/", "luxe", "E-commerce"),
  ref("Loro Piana", "https://www.loropiana.com/", "luxe", "E-commerce"), ref("Rimowa", "https://www.rimowa.com/", "luxe", "E-commerce"), ref("Moncler", "https://www.moncler.com/", "luxe", "E-commerce"),
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
