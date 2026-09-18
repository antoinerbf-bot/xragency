import { SHOWCASE } from "./content";

export type ShowcaseItem = (typeof SHOWCASE)[number] & { services?: string[] };

const extra: ShowcaseItem[] = [
  {
    id: "atelier-marais",
    name: "Atelier Marais",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArtisanat",
    services: ["website", "branding"],
    type: { fr: "Site artisan", en: "Craftsman site", vi: "Website thợ thủ công" },
    desc: {
      fr: "Vitrine éditoriale pour un atelier d’ébénisterie, galerie de pièces uniques et prise de rendez-vous.",
      en: "Editorial showcase for a cabinetmaking workshop, unique pieces gallery and booking.",
      vi: "Website biên tập cho xưởng mộc, gallery tác phẩm và đặt lịch.",
    },
    metric: "+210% demandes devis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "clinique-aube",
    name: "Clinique Aube",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website", "booking", "seo"],
    type: { fr: "Site santé + RDV", en: "Health + booking", vi: "Y tế + đặt lịch" },
    desc: {
      fr: "Parcours patient clair, réservation en ligne, pages soins et équipe médicale.",
      en: "Clear patient journey, online booking, treatment and team pages.",
      vi: "Lộ trình bệnh nhân rõ, đặt lịch online, trang dịch vụ và đội ngũ.",
    },
    metric: "+160% RDV en ligne",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "studio-nord",
    name: "Studio Nord",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArchitecture",
    services: ["website", "branding"],
    type: { fr: "Portfolio architecture", en: "Architecture portfolio", vi: "Portfolio kiến trúc" },
    desc: {
      fr: "Grille projet, études de cas et direction artistique pour une agence d’architecture.",
      en: "Project grid, case studies and art direction for an architecture studio.",
      vi: "Lưới dự án, case study và định hướng nghệ thuật cho studio kiến trúc.",
    },
    metric: "+140% appels d’offres",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "haussmann-living",
    name: "Haussmann Living",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website", "strategy"],
    type: { fr: "Site immobilier", en: "Real estate site", vi: "Website BDS" },
    desc: {
      fr: "Catalogue biens, pages quartier et tunnel de contact pour une agence premium.",
      en: "Property catalogue, neighborhood pages and contact funnel for a premium agency.",
      vi: "Danh mục bất động sản, trang khu vực và phễu liên hệ.",
    },
    metric: "+190% contacts qualifiés",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "coach-eline",
    name: "Éline Coaching",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website", "booking", "branding"],
    type: { fr: "Site coaching", en: "Coaching site", vi: "Website coaching" },
    desc: {
      fr: "Positionnement personnel, offre de programmes et réservation de séances.",
      en: "Personal positioning, program offer and session booking.",
      vi: "Định vị cá nhân, gói chương trình và đặt buổi.",
    },
    metric: "+240% inscriptions",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe435803?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "lumen-lab",
    name: "Lumen Lab",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website", "ai", "strategy"],
    type: { fr: "Site produit IA", en: "AI product site", vi: "Website AI" },
    desc: {
      fr: "Landing produit, démo et récit de marque pour une startup IA B2B.",
      en: "Product landing, demo and brand story for a B2B AI startup.",
      vi: "Landing sản phẩm, demo và câu chuyện thương hiệu startup AI.",
    },
    metric: "+3.1x leads inbound",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "maison-selene",
    name: "Maison Sélène",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorBeaute",
    services: ["ecommerce", "branding", "seo"],
    type: { fr: "E-commerce beauté", en: "Beauty e-commerce", vi: "TMĐT làm đẹp" },
    desc: {
      fr: "Boutique en ligne, rituel de marque et fiches produits pour une ligne de soin.",
      en: "Online shop, brand ritual and product pages for a skincare line.",
      vi: "Cửa hàng online và trang sản phẩm skincare.",
    },
    metric: "+175% CA e-commerce",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "atelier-volant",
    name: "Atelier Volant",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorMode",
    services: ["website", "branding"],
    type: { fr: "Lookbook digital", en: "Digital lookbook", vi: "Lookbook số" },
    desc: {
      fr: "Lookbook saisonnier, film et site éditorial pour une maison de prêt-à-porter.",
      en: "Seasonal lookbook, film and editorial site for a ready-to-wear house.",
      vi: "Lookbook mùa và website biên tập.",
    },
    metric: "+125% press mentions",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "garage-senat",
    name: "Garage Sénat",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorAuto",
    services: ["website", "seo"],
    type: { fr: "Site automobile", en: "Automotive site", vi: "Website ô tô" },
    desc: {
      fr: "Stock véhicules, pages services et prise de RDV atelier.",
      en: "Vehicle stock, service pages and workshop booking.",
      vi: "Kho xe, trang dịch vụ và đặt lịch xưởng.",
    },
    metric: "+155% RDV atelier",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "table-haute",
    name: "Table Haute",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website", "branding"],
    type: { fr: "Identité restaurant", en: "Restaurant identity", vi: "Nhận diện nhà hàng" },
    desc: {
      fr: "Identité, menu digital et site pour un restaurant de saison.",
      en: "Identity, digital menu and site for a seasonal restaurant.",
      vi: "Nhận diện, thực đơn số và website nhà hàng.",
    },
    metric: "+95% couverts semaine",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "riviera-suites",
    name: "Riviera Suites",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website", "booking", "seo"],
    type: { fr: "Hôtel + booking", en: "Hotel + booking", vi: "Khách sạn + booking" },
    desc: {
      fr: "Site suites, galerie et réservation directe sans OTA.",
      en: "Suites site, gallery and direct booking without OTAs.",
      vi: "Website suite, gallery và đặt phòng trực tiếp.",
    },
    metric: "+220% réservations directes",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "or-18",
    name: "Or 18",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorLuxe",
    services: ["website", "ecommerce", "branding"],
    type: { fr: "Joaillerie e-shop", en: "Jewelry e-shop", vi: "Cửa hàng trang sức" },
    desc: {
      fr: "E-shop haute joaillerie, configurateur de pièce et storytelling.",
      en: "High jewelry e-shop, piece configurator and storytelling.",
      vi: "E-shop trang sức và storytelling.",
    },
    metric: "+260% ventes private",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=85&w=1200",
  },
];

const seen = new Set(SHOWCASE.map((s) => s.id));
for (const item of extra) {
  if (!seen.has(item.id)) {
    (SHOWCASE as ShowcaseItem[]).push(item);
    seen.add(item.id);
  }
}

export const ALL_SHOWCASE: ShowcaseItem[] = SHOWCASE as ShowcaseItem[];
