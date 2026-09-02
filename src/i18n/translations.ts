export type Lang = 'fr' | 'en' | 'vi'

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
]

export const CURRENCY_CONFIG = {
  fr: { symbol: '€', rate: 1, suffix: ' €', prefix: '' },
  en: { symbol: '$', rate: 1.08, suffix: '', prefix: '$' },
  vi: { symbol: '₫', rate: 22400, suffix: ' ₫', prefix: '' },
} as const

export function formatPrice(eurPrice: number, lang: Lang): string {
  const cfg = CURRENCY_CONFIG[lang]
  const converted = Math.round(eurPrice * cfg.rate)
  if (lang === 'fr') return `${converted.toLocaleString('fr-FR')} €`
  if (lang === 'en') return `$${converted.toLocaleString('en-US')}`
  return `${converted.toLocaleString('vi-VN')} ₫`
}

const translations = {
  // ─── HEADER ─────────────────────────────
  header: {
    services: { fr: 'Services', en: 'Services', vi: 'Dịch vụ' },
    pricing: { fr: 'Tarifs', en: 'Pricing', vi: 'Bảng giá' },
    work: { fr: 'Réalisations', en: 'Work', vi: 'Dự án' },
    intelligence: { fr: 'Intelligence', en: 'Intelligence', vi: 'Trí tuệ AI' },
    faq: { fr: 'FAQ', en: 'FAQ', vi: 'Hỏi đáp' },
    bookCall: { fr: 'Prendre RDV', en: 'Book a call', vi: 'Đặt lịch' },
    menu: { fr: 'Menu', en: 'Menu', vi: 'Menu' },
    close: { fr: 'Fermer', en: 'Close', vi: 'Đóng' },
  },

  // ─── HERO ─────────────────────────────
  hero: {
    strategistOnline: { fr: 'STRATÈGE SENIOR · EN LIGNE', en: 'SENIOR STRATEGIST · ONLINE', vi: 'CHIẾN LƯỢC GIA · TRỰC TUYẾN' },
    locations: { fr: 'PARIS · DUBAÏ · TOKYO · NEW YORK', en: 'PARIS · DUBAI · TOKYO · NEW YORK', vi: 'PARIS · DUBAI · TOKYO · NEW YORK' },
    edition: { fr: 'Studio Digital Premium — Édition MMXXVI', en: 'Premium Digital Studio — Edition MMXXVI', vi: 'Studio Digital Cao Cấp — Ấn Bản MMXXVI' },
    title: { fr: "L'Art du Digital\nSur-Mesure.", en: 'The Art of Digital\nCraftsmanship.', vi: 'Nghệ Thuật Số\nĐo Ni Đóng Giày.' },
    subtitle: {
      fr: 'Une maison indépendante composant des expériences digitales pour des marques exigeantes : identité, sites web, SEO, Google Maps, IA.',
      en: 'An independent house composing digital experiences for demanding brands: identity, websites, SEO, Google Maps, AI.',
      vi: 'Studio độc lập tạo ra trải nghiệm số cho các thương hiệu khắt khe: nhận diện, website, SEO, Google Maps, AI.',
    },
    appointment: { fr: 'Paris — Sur rendez-vous.', en: 'Paris — By appointment.', vi: 'Paris — Theo lịch hẹn.' },
    ctaAnalysis: { fr: 'LANCER MON ANALYSE', en: 'START MY ANALYSIS', vi: 'BẮT ĐẦU PHÂN TÍCH' },
    ctaContinue: { fr: 'CONTINUER', en: 'CONTINUE', vi: 'TIẾP TỤC' },
    duration: { fr: 'DURÉE ESTIMÉE — 2 MINUTES', en: 'ESTIMATED DURATION — 2 MINUTES', vi: 'THỜI GIAN ƯỚC TÍNH — 2 PHÚT' },
    reply: { fr: 'RÉPONSE SOUS 2H · FR / EN / VI · SANS ENGAGEMENT', en: 'REPLY WITHIN 2H · FR / EN / VI · NO COMMITMENT', vi: 'PHẢN HỒI TRONG 2H · FR / EN / VI · KHÔNG CAM KẾT' },
  },

  // ─── ABOUT ─────────────────────────────
  about: {
    stats: {
      projects: { fr: 'Projets Livrés', en: 'Projects Delivered', vi: 'Dự Án Hoàn Thành' },
      years: { fr: "Années d'Expertise", en: 'Years of Expertise', vi: 'Năm Kinh Nghiệm' },
      satisfaction: { fr: 'Satisfaction Client', en: 'Client Satisfaction', vi: 'Hài Lòng Khách Hàng' },
      responseTime: { fr: 'Temps de Réponse', en: 'Response Time', vi: 'Thời Gian Phản Hồi' },
    },
    marquee: { fr: 'SITES WEB · BRANDING · SEO · GOOGLE MAPS · RÉSEAUX SOCIAUX · IA · MAINTENANCE · ', en: 'WEBSITES · BRANDING · SEO · GOOGLE MAPS · SOCIAL MEDIA · AI · MAINTENANCE · ', vi: 'WEBSITE · THƯƠNG HIỆU · SEO · GOOGLE MAPS · MẠNG XÃ HỘI · AI · BẢO TRÌ · ' },
    title: {
      fr: 'Votre direction digitale & studio elite, activé à la demande.',
      en: 'Your digital direction & elite studio, activated on demand.',
      vi: 'Giám đốc kỹ thuật số & studio elite, kích hoạt theo yêu cầu.',
    },
    comparison: {
      title: { fr: 'Embaucher en interne ou activer XR Agency ?', en: 'Hire an internal team or plug in XR Agency?', vi: 'Tuyển nội bộ hay kích hoạt XR Agency?' },
      inHouse: { fr: 'Équipe Interne', en: 'In-House Team', vi: 'Đội Nội Bộ' },
      inHousePrice: { fr: '~18 500 €', en: '~€18,500', vi: '~€18,500' },
      inHousePeriod: { fr: '/mois', en: '/month', vi: '/tháng' },
      inHouse1: { fr: '+ Charges sociales & avantages', en: '+ Payroll taxes & benefits', vi: '+ Thuế & phúc lợi' },
      inHouse2: { fr: '3-6 mois de recrutement', en: '3-6 months recruitment', vi: '3-6 tháng tuyển dụng' },
      inHouse3: { fr: 'Risque de gestion lourd', en: 'Heavy management risk', vi: 'Rủi ro quản lý cao' },
      inHouse4: { fr: 'Profil à compétence unique', en: 'Single skill profile', vi: 'Hồ sơ kỹ năng đơn' },
      xrAgency: { fr: 'XR Agency', en: 'XR Agency', vi: 'XR Agency' },
      xrPrice: { fr: 'Dès 499 €', en: 'From €499', vi: 'Từ €499' },
      xrPeriod: { fr: '/forfait', en: '/one-time', vi: '/trọn gói' },
      xr1: { fr: 'Zéro charge sociale', en: 'Zero payroll tax', vi: 'Không thuế bảng lương' },
      xr2: { fr: 'Opérationnel en 48h', en: 'Operational in 48h', vi: 'Hoạt động trong 48h' },
      xr3: { fr: 'Collectif senior 4-en-1', en: 'Senior 4-in-1 collective', vi: 'Tập thể senior 4-trong-1' },
      xr4: { fr: 'Flexible & évolutif', en: 'Flexible & scalable', vi: 'Linh hoạt & mở rộng' },
    },
    valueProps: {
      speed: { title: { fr: 'Vitesse Record', en: 'Record Speed', vi: 'Tốc Độ Kỷ Lục' }, desc: { fr: 'Livraison 7-14 jours', en: '7-14 days delivery', vi: 'Giao hàng 7-14 ngày' } },
      senior: { title: { fr: 'Senior 4-en-1', en: 'Senior 4-in-1', vi: 'Senior 4-trong-1' }, desc: { fr: 'Stratégie, Design, Dev, IA', en: 'Strategy, Design, Dev, AI', vi: 'Chiến lược, Thiết kế, Dev, AI' } },
      results: { title: { fr: 'Résultats Garantis', en: 'Guaranteed Results', vi: 'Kết Quả Đảm Bảo' }, desc: { fr: 'KPIs mesurables', en: 'Measurable KPIs', vi: 'KPI đo lường được' } },
      roi: { title: { fr: '+3,2x ROI', en: '+3.2x ROI', vi: '+3,2x ROI' }, desc: { fr: 'Retour moyen', en: 'Average return', vi: 'Hoàn vốn trung bình' } },
    },
  },

  // ─── SERVICES ───────────────────────────
  services: {
    label: { fr: 'Notre expertise', en: 'Our expertise', vi: 'Chuyên môn' },
    title: { fr: 'Ce que nous faisons.', en: 'What we do.', vi: 'Chúng tôi làm gì.' },
    discoverPlans: { fr: 'Découvrir les formules', en: 'Discover plans', vi: 'Khám phá gói' },
    cartTitle: { fr: 'Votre projet', en: 'Your project', vi: 'Dự án của bạn' },
    selectedLabel: { fr: 'discipline sélectionnée', en: 'discipline selected', vi: 'lĩnh vực được chọn' },
    addToProject: { fr: 'Ajouter au projet', en: 'Add to project', vi: 'Thêm vào dự án' },
    selected: { fr: '✓ Sélectionné', en: '✓ Selected', vi: '✓ Được chọn' },
    requestQuote: { fr: 'Demander un devis', en: 'Request a quote', vi: 'Yêu cầu báo giá' },
    cartDescription: { fr: 'Continuez votre visite ou demandez un devis personnalisé pour cette sélection.', en: 'Continue exploring or request a personalized quote for your selection.', vi: 'Tiếp tục khám phá hoặc yêu cầu báo giá cho lựa chọn của bạn.' },
    removeItem: { fr: 'Retirer', en: 'Remove', vi: 'Xóa' },
    items: [
      { num: '01', name: { fr: 'Création de Sites Web', en: 'Website Creation', vi: 'Tạo Website' }, price: 500, metric: { fr: '100/100 PageSpeed', en: '100/100 PageSpeed', vi: '100/100 PageSpeed' }, desc: { fr: 'Sites web premium', en: 'Premium websites', vi: 'Website cao cấp' } },
      { num: '02', name: { fr: 'Branding & Identité', en: 'Branding & Identity', vi: 'Thương Hiệu & Nhận Diện' }, price: 200, metric: { fr: 'Droits complets inclus', en: 'Full rights included', vi: 'Quyền đầy đủ bao gồm' }, desc: { fr: 'Identité visuelle complète', en: 'Complete visual identity', vi: 'Nhận diện hoàn chỉnh' } },
      { num: '03', name: { fr: 'Système de Domination SEO', en: 'SEO Domination System', vi: 'Hệ Thống Thống Trị SEO' }, price: 200, period: '/mois', metric: { fr: '+340% trafic organique', en: '+340% organic traffic', vi: '+340% lưu lượng hữu cơ' }, desc: { fr: 'Domination SEO mensuelle', en: 'Monthly SEO domination', vi: 'Thống trị SEO hàng tháng' } },
      { num: '04', name: { fr: 'Google Maps TOP 3', en: 'Google Maps TOP 3', vi: 'Google Maps TOP 3' }, price: 1000, period: '/an', metric: { fr: '90% clics Top 3', en: '90% clicks Top 3', vi: '90% nhấp Top 3' }, desc: { fr: 'Visibilité Google Maps', en: 'Google Maps visibility', vi: 'Hiển thị Google Maps' } },
      { num: '05', name: { fr: 'Community Management', en: 'Community Management', vi: 'Quản Lý Cộng Đồng' }, price: 250, period: '/mois', metric: { fr: '+250% engagement', en: '+250% engagement', vi: '+250% tương tác' }, desc: { fr: 'Gestion communauté mensuelle', en: 'Monthly community management', vi: 'Quản lý cộng đồng hàng tháng' } },
      { num: '06', name: { fr: 'Maintenance WebCare', en: 'WebCare Maintenance', vi: 'Bảo Trì WebCare' }, price: 29, period: '/mois', metric: { fr: '99,9% uptime', en: '99.9% uptime', vi: '99,9% uptime' }, desc: { fr: 'Maintenance professionnelle', en: 'Professional maintenance', vi: 'Bảo trì chuyên nghiệp' } },
      { num: '07', name: { fr: 'Assistants IA 24/7', en: 'AI Assistants 24/7', vi: 'Trợ Lý AI 24/7' }, price: 500, period: '/mois', metric: { fr: '-80% coûts support', en: '-80% support costs', vi: '-80% chi phí hỗ trợ' }, desc: { fr: 'Assistants IA toujours disponibles', en: 'Always available AI assistants', vi: 'Trợ lý AI luôn sẵn sàng' } },
      { num: '08', name: { fr: 'E-commerce', en: 'E-commerce', vi: 'Thương Mại Điện Tử' }, price: 800, metric: { fr: 'Shopify & WooCommerce', en: 'Shopify & WooCommerce', vi: 'Shopify & WooCommerce' }, desc: { fr: 'Boutiques en ligne complètes', en: 'Complete online stores', vi: 'Cửa hàng trực tuyến hoàn chỉnh' } },
      { num: '09', name: { fr: 'Refonte de Site Web', en: 'Website Redesign', vi: 'Thiết Kế Lại Website' }, price: 500, metric: { fr: 'Audit UX complet', en: 'Full UX audit', vi: 'Kiểm toán UX đầy đủ' }, desc: { fr: 'Redesign professionnel', en: 'Professional redesign', vi: 'Thiết kế lại chuyên nghiệp' } },
      { num: '10', name: { fr: 'Publicité Digitale', en: 'Digital Advertising', vi: 'Quảng Cáo Kỹ Thuật Số' }, price: 500, period: '/mois', metric: { fr: 'ROAS > 4x', en: 'ROAS > 4x', vi: 'ROAS > 4x' }, desc: { fr: 'Campagnes publicitaires optimisées', en: 'Optimized ad campaigns', vi: 'Các chiến dịch quảng cáo được tối ưu' } },
      { num: '11', name: { fr: 'Stratégie Digitale', en: 'Digital Strategy', vi: 'Chiến Lược Kỹ Thuật Số' }, price: 800, metric: { fr: 'Analyse de marché', en: 'Market analysis', vi: 'Phân tích thị trường' }, desc: { fr: 'Stratégie digitale complète', en: 'Complete digital strategy', vi: 'Chiến lược số hoàn chỉnh' } },
    ],
  },

  // ─── PRICING ────────────────────────────
  pricing: {
    label: { fr: 'Investissement', en: 'Investment', vi: 'Đầu tư' },
    title: { fr: 'Tarifs transparents.', en: 'Transparent pricing.', vi: 'Bảng giá minh bạch.' },
    categories: {
      all: { fr: 'Tous les Services', en: 'All Services', vi: 'Tất Cả Dịch Vụ' },
      web: { fr: 'Sites & E-Commerce', en: 'Websites & E-Commerce', vi: 'Website & TMĐT' },
      seo: { fr: 'Google Maps & SEO', en: 'Google Maps & SEO', vi: 'Google Maps & SEO' },
      ai: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence', vi: 'Trí Tuệ Nhân Tạo' },
      brand: { fr: 'Branding & Maintenance', en: 'Branding & Maintenance', vi: 'Thương Hiệu & Bảo Trì' },
    },
    mostPopular: { fr: 'LE PLUS POPULAIRE', en: 'MOST POPULAR', vi: 'PHỔ BIẾN NHẤT' },
    choosePlan: { fr: 'CHOISIR CETTE FORMULE', en: 'CHOOSE THIS PLAN', vi: 'CHỌN GÓI NÀY' },
    quickRequest: { fr: 'DEMANDE RAPIDE SUR WHATSAPP', en: 'QUICK REQUEST ON WHATSAPP', vi: 'YÊU CẦU NHANH TRÊN WHATSAPP' },
    plans: {
      showcase: {
        name: { fr: 'Site Vitrine Pro', en: 'Pro Showcase Site', vi: 'Website Giới Thiệu Pro' },
        target: { fr: 'Artisans, indépendants', en: 'Craftsmen, freelancers', vi: 'Thợ thủ công, freelancer' },
        period: { fr: 'paiement unique', en: 'one-time payment', vi: 'thanh toán một lần' },
        features: {
          fr: ['Design responsive premium', 'Jusqu\'à 3 pages', 'Formulaire de contact', 'Optimisation SEO de base', 'Hébergement 1 an inclus', 'Livraison en 7 jours', 'Langue supplémentaire : +100€'],
          en: ['Premium responsive design', 'Up to 3 pages', 'Contact form', 'Basic SEO optimization', '1 year hosting included', '7-day delivery', 'Additional language: +€100'],
          vi: ['Thiết kế responsive cao cấp', 'Tối đa 3 trang', 'Form liên hệ', 'Tối ưu SEO cơ bản', 'Hosting 1 năm bao gồm', 'Giao hàng 7 ngày', 'Ngôn ngữ bổ sung: +€100'],
        },
      },
      business: {
        name: { fr: 'Site Business', en: 'Business Site', vi: 'Website Doanh Nghiệp' },
        target: { fr: 'PME, startups', en: 'SMEs, startups', vi: 'DNVVN, startup' },
        period: { fr: 'paiement unique', en: 'one-time payment', vi: 'thanh toán một lần' },
        features: {
          fr: ['Design responsive premium', 'Jusqu\'à 5 pages', 'Blog intégré', 'Optimisation SEO avancée', 'Hébergement 1 an inclus', 'Analytics & rapports', 'Livraison en 14 jours'],
          en: ['Premium responsive design', 'Up to 5 pages', 'Integrated blog', 'Advanced SEO optimization', '1 year hosting included', 'Analytics & reports', '14-day delivery'],
          vi: ['Thiết kế responsive cao cấp', 'Tối đa 5 trang', 'Blog tích hợp', 'Tối ưu SEO nâng cao', 'Hosting 1 năm bao gồm', 'Analytics & báo cáo', 'Giao hàng 14 ngày'],
        },
      },
      ecommerce: {
        name: { fr: 'E-commerce & Booking', en: 'E-commerce & Booking', vi: 'TMĐT & Đặt Lịch' },
        target: { fr: 'Boutiques, services', en: 'Shops, services', vi: 'Cửa hàng, dịch vụ' },
        period: { fr: 'paiement unique', en: 'one-time payment', vi: 'thanh toán một lần' },
        features: {
          fr: ['Catalogue produits', 'Paiement en ligne sécurisé', 'Gestion des stocks', 'Système de réservation', 'Optimisation SEO e-commerce', 'Hébergement 1 an inclus', 'Livraison en 21 jours'],
          en: ['Product catalogue', 'Secure online payment', 'Inventory management', 'Booking system', 'E-commerce SEO optimization', '1 year hosting included', '21-day delivery'],
          vi: ['Danh mục sản phẩm', 'Thanh toán trực tuyến bảo mật', 'Quản lý kho hàng', 'Hệ thống đặt lịch', 'Tối ưu SEO thương mại điện tử', 'Hosting 1 năm bao gồm', 'Giao hàng 21 ngày'],
        },
      },
    },
  },

  // ─── MAPS SIMULATOR ─────────────────────
  maps: {
    label: { fr: 'SEO Local', en: 'Local SEO', vi: 'SEO Địa Phương' },
    title: { fr: 'Simulateur de Visibilité Google Maps TOP 3', en: 'Google Maps TOP 3 Visibility Simulator', vi: 'Mô Phỏng Hiển Thị Google Maps TOP 3' },
    step1: { fr: 'Étape 1 — Sélectionnez votre ville', en: 'Step 1 — Select your city', vi: 'Bước 1 — Chọn thành phố' },
    step2: { fr: 'Étape 2 — Sélectionnez votre secteur', en: 'Step 2 — Select your sector', vi: 'Bước 2 — Chọn lĩnh vực' },
    step3: { fr: 'Étape 3 — Entrez vos mots-clés principaux (max 5)', en: 'Step 3 — Enter your main keywords (up to 5)', vi: 'Bước 3 — Nhập từ khóa chính (tối đa 5)' },
    step4: { fr: 'Étape 4 — Visibilité actuelle Google Maps', en: 'Step 4 — Current Google Maps visibility', vi: 'Bước 4 — Mức hiển thị Google Maps hiện tại' },
    back: { fr: '← Retour', en: '← Back', vi: '← Quay lại' },
    continue: { fr: 'Continuer →', en: 'Continue →', vi: 'Tiếp tục →' },
    launchAudit: { fr: 'LANCER MON AUDIT GOOGLE MAPS SUR WHATSAPP', en: 'LAUNCH MY GOOGLE MAPS AUDIT ON WHATSAPP', vi: 'KHỞI ĐỘNG KIỂM TOÁN GOOGLE MAPS TRÊN WHATSAPP' },
    visibility: {
      noListing: { fr: 'Pas de fiche', en: 'No listing', vi: 'Chưa có hồ sơ' },
      beyondTop10: { fr: 'Au-delà du Top 10', en: 'Beyond Top 10', vi: 'Ngoài Top 10' },
      top5to10: { fr: 'Top 5-10', en: 'Top 5-10', vi: 'Top 5-10' },
      alreadyTop3: { fr: 'Déjà Top 3', en: 'Already Top 3', vi: 'Đã trong Top 3' },
    },
    diagnostic: {
      title: { fr: 'Diagnostic Live', en: 'Live Diagnostic', vi: 'Chẩn Đoán Trực Tiếp' },
      callIncrease: { fr: 'Augm. appels estimée', en: 'Est. call increase', vi: 'Tăng cuộc gọi ước tính' },
      competition: { fr: 'Niveau de concurrence', en: 'Competition level', vi: 'Mức độ cạnh tranh' },
      searches: { fr: 'Recherches mensuelles', en: 'Monthly searches', vi: 'Lượt tìm kiếm hàng tháng' },
    },
    packPrice: { fr: 'Pack Google Maps TOP 3 — ', en: 'Google Maps TOP 3 Pack — ', vi: 'Gói Google Maps TOP 3 — ' },
    perYear: { fr: '/an', en: '/year', vi: '/năm' },
    cities: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Genève', 'Bruxelles', 'New York', 'Da Nang'],
    sectors: {
      restaurant: { fr: 'Restaurant', en: 'Restaurant', vi: 'Nhà hàng' },
      hotel: { fr: 'Hôtel', en: 'Hotel', vi: 'Khách sạn' },
      health: { fr: 'Santé', en: 'Health', vi: 'Sức khỏe' },
      lawyer: { fr: 'Avocat', en: 'Lawyer', vi: 'Luật sư' },
      realEstate: { fr: 'Immobilier', en: 'Real Estate', vi: 'Bất động sản' },
      artisan: { fr: 'Artisan', en: 'Craftsman', vi: 'Thủ công' },
      beauty: { fr: 'Beauté', en: 'Beauty', vi: 'Làm đẹp' },
      other: { fr: 'Autre', en: 'Other', vi: 'Khác' },
    },
    keywordPlaceholder: { fr: 'ex: restaurant italien, pizza Paris...', en: 'e.g. Italian restaurant, pizza Paris...', vi: 'vd: nhà hàng Ý, pizza Paris...' },
  },

  // ─── INSPIRATIONS ───────────────────────
  inspirations: {
    label: { fr: 'Portfolio', en: 'Portfolio', vi: 'Danh Mục Dự Án' },
    title: { fr: 'Inspirations de style.\nDirection artistique.', en: 'Style inspirations.\nArt direction.', vi: 'Cảm hứng phong cách.\nĐịnh hướng nghệ thuật.' },
    filterAll: { fr: 'Tous', en: 'All', vi: 'Tất cả' },
    filterShowcase: { fr: 'Vitrine', en: 'Showcase', vi: 'Giới thiệu' },
    filterEcommerce: { fr: 'E-Commerce', en: 'E-Commerce', vi: 'TMĐT' },
    filterAI: { fr: 'IA', en: 'AI', vi: 'AI' },
    disclaimer: { fr: "Les sites présentés sont des références de direction artistique, pas des projets clients XR Agency.", en: 'The sites shown are art direction references, not XR Agency client work.', vi: 'Các trang web được trình bày là tham chiếu hướng dẫn nghệ thuật, không phải công việc của khách hàng XR Agency.' },
  },

  // ─── INTELLIGENCE ──────────────────────���
  intelligence: {
    label: { fr: 'Propulsé par l\'IA', en: 'AI-Powered', vi: 'Được hỗ trợ bởi AI' },
    title: { fr: 'XRAGENCY Intelligence', en: 'XRAGENCY Intelligence', vi: 'XRAGENCY Intelligence' },
    strategistName: { fr: 'Alexandre', en: 'Alexandre', vi: 'Alexandre' },
    strategistRole: { fr: 'Stratège Digital Senior', en: 'Senior Digital Strategist', vi: 'Chiến Lược Gia Số Senior' },
    greeting: {
      fr: 'Bonjour ! Je suis Alexandre, votre Stratège Digital Senior. Sélectionnez votre secteur pour obtenir un diagnostic personnalisé.',
      en: 'Hello! I\'m Alexandre, your Senior Digital Strategist. Select your industry to get a personalized diagnostic.',
      vi: 'Xin chào! Tôi là Alexandre, Chiến Lược Gia Số Senior. Chọn ngành của bạn để nhận chẩn đoán cá nhân hóa.',
    },
    placeholder: { fr: 'Décrivez votre projet...', en: 'Describe your project...', vi: 'Mô tả dự án của bạn...' },
    send: { fr: 'Envoyer', en: 'Send', vi: 'Gửi' },
    industries: {
      restaurant: { fr: 'Restaurant', en: 'Restaurant', vi: 'Nhà hàng' },
      hotel: { fr: 'Hôtel', en: 'Hotel', vi: 'Khách sạn' },
      health: { fr: 'Santé', en: 'Health', vi: 'Sức khỏe' },
      lawyer: { fr: 'Avocat', en: 'Lawyer', vi: 'Luật sư' },
      realEstate: { fr: 'Immobilier', en: 'Real Estate', vi: 'Bất động sản' },
      boutique: { fr: 'Boutique', en: 'Boutique', vi: 'Cửa hàng' },
      craftsman: { fr: 'Artisan', en: 'Craftsman', vi: 'Thợ thủ công' },
      beauty: { fr: 'Beauté', en: 'Beauty', vi: 'Làm đẹp' },
      startup: { fr: 'Startup', en: 'Startup', vi: 'Startup' },
      other: { fr: 'Autre', en: 'Other', vi: 'Khác' },
    },
  },

  // ─── FAQ ────────────────────────────────
  faq: {
    label: { fr: 'Questions', en: 'Questions', vi: 'Câu hỏi' },
    title: { fr: 'Tout ce que vous devez savoir.', en: 'Everything you need to know.', vi: 'Mọi thứ bạn cần biết.' },
    categories: {
      all: { fr: 'Toutes', en: 'All', vi: 'Tất cả' },
      websites: { fr: 'Sites Web', en: 'Websites', vi: 'Website' },
      seo: { fr: 'SEO & Visibilité', en: 'SEO & Visibility', vi: 'SEO & Hiển Thị' },
      ai: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence', vi: 'Trí Tuệ Nhân Tạo' },
      pricing: { fr: 'Tarifs & Support', en: 'Pricing & Support', vi: 'Giá & Hỗ Trợ' },
      timelines: { fr: 'Délais', en: 'Timelines', vi: 'Thời Gian' },
      general: { fr: 'Général', en: 'General', vi: 'Chung' },
    },
    showMore: { fr: 'VOIR TOUTES LES QUESTIONS ↓', en: 'SEE ALL QUESTIONS ↓', vi: 'XEM TẤT CẢ CÂU HỎI ↓' },
  },

  // ─── CONTACT ────────────────────────────
  contact: {
    label: { fr: 'Nous contacter', en: 'Get in touch', vi: 'Liên hệ' },
    title: { fr: 'Construisons votre avantage digital.', en: "Let's build your digital advantage.", vi: 'Hãy xây dựng lợi thế số của bạn.' },
    nameLabel: { fr: 'Nom *', en: 'Name *', vi: 'Tên *' },
    emailLabel: { fr: 'Email *', en: 'Email *', vi: 'Email *' },
    companyLabel: { fr: 'Entreprise', en: 'Company', vi: 'Công ty' },
    websiteLabel: { fr: 'Site web', en: 'Website', vi: 'Website' },
    selectService: { fr: 'Sélectionnez un service', en: 'Select a service', vi: 'Chọn dịch vụ' },
    messageLabel: { fr: 'Parlez-nous de votre projet *', en: 'Tell us about your project *', vi: 'Mô tả dự án của bạn *' },
    submit: { fr: 'Parlons de votre projet', en: "Let's talk about your project", vi: 'Hãy nói về dự án của bạn' },
    thankYou: { fr: 'Merci !', en: 'Thank you!', vi: 'Cảm ơn!' },
    thankYouMsg: { fr: 'Nous vous répondrons sous 2 heures.', en: "We'll get back to you within 2 hours.", vi: 'Chúng tôi sẽ phản hồi trong 2 giờ.' },
    serviceOptions: {
      website: { fr: 'Création de site web', en: 'Website creation', vi: 'Tạo website' },
      redesign: { fr: 'Refonte', en: 'Redesign', vi: 'Thiết kế lại' },
      seo: { fr: 'SEO', en: 'SEO', vi: 'SEO' },
      maps: { fr: 'Google Maps', en: 'Google Maps', vi: 'Google Maps' },
      ads: { fr: 'Publicité', en: 'Advertising', vi: 'Quảng cáo' },
      ai: { fr: 'IA & Automatisation', en: 'AI & Automation', vi: 'AI & Tự động hóa' },
      strategy: { fr: 'Stratégie digitale', en: 'Digital strategy', vi: 'Chiến lược số' },
      other: { fr: 'Autre', en: 'Other', vi: 'Khác' },
    },
  },

  // ─── FOOTER ─────────────────────────────
  footer: {
    address: { fr: 'Adresse', en: 'Address', vi: 'Địa chỉ' },
    pubDirector: { fr: 'Directeur de publication', en: 'Publication Director', vi: 'Giám đốc xuất bản' },
    hosting: { fr: 'Hébergement', en: 'Hosting', vi: 'Hosting' },
    followUs: { fr: 'Suivez-nous', en: 'Follow us', vi: 'Theo dõi' },
    rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.', vi: 'Mọi quyền được bảo lưu.' },
    gdpr: { fr: 'Traitement des données conforme RGPD.', en: 'GDPR-compliant data processing.', vi: 'Xử lý dữ liệu tuân thủ GDPR.' },
    top: { fr: 'HAUT ↑', en: 'TOP ↑', vi: 'ĐẦU ↑' },
  },

  // ─── WHATSAPP ───────────────────────────
  whatsapp: {
    button: { fr: 'Contacter sur WhatsApp', en: 'Contact on WhatsApp', vi: 'Liên hệ qua WhatsApp' },
    defaultMessage: {
      fr: 'Bonjour XR Agency, j\'aimerais en savoir plus sur vos services.',
      en: 'Hello XR Agency, I\'d like to learn more about your services.',
      vi: 'Xin chào XR Agency, tôi muốn tìm hiểu thêm về dịch vụ của bạn.',
    },
  },
} as const

export type Translations = typeof translations
export default translations
