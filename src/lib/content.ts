import type { L } from "./i18n";

export const CONTACT = {
  email: "contact.xragency@gmail.com",
  whatsapp: "https://wa.me/33767566783",
  phone: "+33 7 67 56 67 83",
  instagram: "https://www.instagram.com/xragency_",
  linkedin: "https://linkedin.com/company/xragency",
  cities: "Paris · Da Nang · Dubai",
};

export type Plan = {
  name: L;
  audience?: L;
  eur: number;
  period: "once" | "month" | "year";
  features: L[];
  popular?: boolean;
};

export type Service = {
  id: string;
  num: string;
  title: L;
  short: L;
  description: L;
  fromEur: number;
  fromPeriod: "once" | "month" | "year";
  highlights: L[];
  plans: Plan[];
  premium?: boolean;
};

export const PERIOD_LABEL: Record<Plan["period"], L> = {
  once: { fr: "paiement unique", en: "one-time payment", vi: "thanh toán một lần" },
  month: { fr: "/ mois", en: "/ month", vi: "/ tháng" },
  year: { fr: "/ an", en: "/ year", vi: "/ năm" },
};

export const SERVICES: Service[] = [
  {
    id: "websites",
    num: "01",
    title: {
      fr: "Création de sites web",
      en: "Website Creation",
      vi: "Thiết kế website",
    },
    short: {
      fr: "Sites sur-mesure, pensés comme des objets d'édition.",
      en: "Bespoke websites, crafted like editorial objects.",
      vi: "Website riêng biệt, được chế tác như một ấn phẩm.",
    },
    description: {
      fr: "Nous concevons des sites haute performance qui transforment vos visiteurs en clients : design sur-mesure, responsive et optimisé pour le référencement.",
      en: "We design high-performance websites that turn your visitors into customers: bespoke design, fully responsive and SEO-ready.",
      vi: "Chúng tôi thiết kế website hiệu suất cao biến khách truy cập thành khách hàng: thiết kế riêng, tương thích mọi thiết bị và chuẩn SEO.",
    },
    fromEur: 499,
    fromPeriod: "once",
    highlights: [
      { fr: "Score PageSpeed 100/100", en: "100/100 PageSpeed score", vi: "Điểm PageSpeed 100/100" },
      { fr: "Chargement en moins de 2 s", en: "Under 2s load time", vi: "Tải trang dưới 2 giây" },
      { fr: "200+ sites livrés", en: "200+ websites delivered", vi: "Hơn 200 website đã bàn giao" },
      { fr: "Hébergement 1 an inclus", en: "1 year hosting included", vi: "Bao gồm 1 năm lưu trữ" },
    ],
    plans: [
      {
        name: { fr: "Site Vitrine Pro", en: "Pro Showcase Site", vi: "Website Giới thiệu Pro" },
        audience: {
          fr: "Artisans, indépendants",
          en: "Craftsmen, freelancers",
          vi: "Thợ thủ công, người làm tự do",
        },
        eur: 499,
        period: "once",
        features: [
          { fr: "Design responsive premium", en: "Premium responsive design", vi: "Thiết kế responsive cao cấp" },
          { fr: "Jusqu'à 5 pages", en: "Up to 5 pages", vi: "Tối đa 5 trang" },
          { fr: "Formulaire de contact", en: "Contact form", vi: "Biểu mẫu liên hệ" },
          { fr: "Optimisation SEO de base", en: "Basic SEO optimisation", vi: "Tối ưu SEO cơ bản" },
          { fr: "Hébergement 1 an inclus", en: "1 year hosting included", vi: "Bao gồm 1 năm lưu trữ" },
          { fr: "Livraison en 7 jours", en: "Delivered in 7 days", vi: "Bàn giao trong 7 ngày" },
        ],
      },
      {
        name: { fr: "Site Business", en: "Business Site", vi: "Website Doanh nghiệp" },
        audience: {
          fr: "PME, professions libérales",
          en: "SMEs, professional practices",
          vi: "Doanh nghiệp vừa và nhỏ, ngành nghề tự do",
        },
        eur: 799,
        period: "once",
        popular: true,
        features: [
          { fr: "Tout le Vitrine Pro", en: "Everything in Pro Showcase", vi: "Toàn bộ gói Giới thiệu Pro" },
          { fr: "Jusqu'à 10 pages", en: "Up to 10 pages", vi: "Tối đa 10 trang" },
          { fr: "Blog intégré", en: "Integrated blog", vi: "Tích hợp blog" },
          { fr: "Galerie photos et vidéos", en: "Photo & video gallery", vi: "Thư viện ảnh và video" },
          { fr: "Chat en direct", en: "Live chat", vi: "Trò chuyện trực tiếp" },
          { fr: "Analytics avancés", en: "Advanced analytics", vi: "Phân tích nâng cao" },
          { fr: "Livraison en 14 jours", en: "Delivered in 14 days", vi: "Bàn giao trong 14 ngày" },
        ],
      },
      {
        name: {
          fr: "E-commerce & Réservation",
          en: "E-commerce & Booking",
          vi: "Thương mại điện tử & Đặt chỗ",
        },
        audience: {
          fr: "Boutiques, réservations",
          en: "Shops, bookings",
          vi: "Cửa hàng, đặt chỗ",
        },
        eur: 1099,
        period: "once",
        features: [
          { fr: "Tout le Site Business", en: "Everything in Business Site", vi: "Toàn bộ gói Doanh nghiệp" },
          { fr: "Paiement en ligne sécurisé", en: "Secure online payments", vi: "Thanh toán trực tuyến an toàn" },
          { fr: "Gestion des stocks", en: "Inventory management", vi: "Quản lý kho hàng" },
          { fr: "Système de réservation", en: "Booking system", vi: "Hệ thống đặt chỗ" },
          { fr: "Site multilingue", en: "Multilingual website", vi: "Website đa ngôn ngữ" },
          { fr: "Formation incluse", en: "Training included", vi: "Bao gồm đào tạo" },
          { fr: "Livraison en 21 jours", en: "Delivered in 21 days", vi: "Bàn giao trong 21 ngày" },
        ],
      },
    ],
  },
  {
    id: "branding",
    num: "02",
    title: { fr: "Branding & Identité", en: "Branding & Identity", vi: "Thương hiệu & Nhận diện" },
    short: {
      fr: "Identités durables, systèmes complets, typographie propriétaire.",
      en: "Lasting identities, complete systems, proprietary typography.",
      vi: "Nhận diện bền vững, hệ thống hoàn chỉnh, kiểu chữ riêng.",
    },
    description: {
      fr: "Un logo, une palette, une typographie et un système complet de déclinaisons : votre marque devient immédiatement reconnaissable, sur écran comme sur papier.",
      en: "A logo, a palette, a typeface and a complete system of applications: your brand becomes instantly recognisable, on screen and in print.",
      vi: "Logo, bảng màu, kiểu chữ và hệ thống ứng dụng hoàn chỉnh: thương hiệu của bạn được nhận ra ngay lập tức, trên màn hình và ấn phẩm in.",
    },
    fromEur: 199,
    fromPeriod: "once",
    highlights: [
      { fr: "Fichiers AI, SVG, PNG, PDF", en: "AI, SVG, PNG, PDF files", vi: "Tệp AI, SVG, PNG, PDF" },
      { fr: "Versions couleur et monochrome", en: "Colour and monochrome versions", vi: "Phiên bản màu và đơn sắc" },
      { fr: "Droits commerciaux cédés", en: "Full commercial rights transferred", vi: "Chuyển giao toàn bộ quyền thương mại" },
      { fr: "2 à 4 révisions incluses", en: "2 to 4 revisions included", vi: "Bao gồm 2 đến 4 lần chỉnh sửa" },
    ],
    plans: [
      {
        name: { fr: "Logo Professionnel", en: "Professional Logo", vi: "Logo Chuyên nghiệp" },
        eur: 199,
        period: "once",
        features: [
          { fr: "3 propositions de logo", en: "3 logo concepts", vi: "3 phương án logo" },
          { fr: "Fichiers vectoriels (AI, SVG, PNG)", en: "Vector files (AI, SVG, PNG)", vi: "Tệp vector (AI, SVG, PNG)" },
          { fr: "Versions couleur et N&B", en: "Colour and B&W versions", vi: "Phiên bản màu và trắng đen" },
          { fr: "2 révisions incluses", en: "2 revisions included", vi: "Bao gồm 2 lần chỉnh sửa" },
          { fr: "Guide d'utilisation", en: "Usage guide", vi: "Hướng dẫn sử dụng" },
          { fr: "Livraison en 5 jours", en: "Delivered in 5 days", vi: "Bàn giao trong 5 ngày" },
        ],
      },
      {
        name: { fr: "Charte Graphique", en: "Brand Guidelines", vi: "Bộ quy chuẩn thương hiệu" },
        eur: 299,
        period: "once",
        popular: true,
        features: [
          { fr: "Logo professionnel inclus", en: "Professional logo included", vi: "Bao gồm logo chuyên nghiệp" },
          { fr: "Palette de couleurs", en: "Colour palette", vi: "Bảng màu" },
          { fr: "Typographies définies", en: "Defined typography", vi: "Hệ thống kiểu chữ" },
          { fr: "Règles d'utilisation", en: "Usage rules", vi: "Quy tắc sử dụng" },
          { fr: "Templates réseaux sociaux", en: "Social media templates", vi: "Mẫu mạng xã hội" },
          { fr: "Déclinaisons web et print", en: "Web and print applications", vi: "Ứng dụng web và in ấn" },
          { fr: "Livraison en 7 jours", en: "Delivered in 7 days", vi: "Bàn giao trong 7 ngày" },
        ],
      },
      {
        name: { fr: "Identité Complète", en: "Complete Identity", vi: "Nhận diện Toàn diện" },
        eur: 399,
        period: "once",
        features: [
          { fr: "Charte graphique complète", en: "Full brand guidelines", vi: "Bộ quy chuẩn đầy đủ" },
          { fr: "Papeterie (cartes, en-tête)", en: "Stationery (cards, letterhead)", vi: "Ấn phẩm văn phòng (danh thiếp, tiêu đề thư)" },
          { fr: "Kit réseaux sociaux complet", en: "Complete social media kit", vi: "Bộ mạng xã hội đầy đủ" },
          { fr: "Signalétique", en: "Signage", vi: "Bảng hiệu" },
          { fr: "Mockups professionnels", en: "Professional mockups", vi: "Mockup chuyên nghiệp" },
          { fr: "Applications web et print", en: "Web and print applications", vi: "Ứng dụng web và in ấn" },
          { fr: "Livraison en 10 jours", en: "Delivered in 10 days", vi: "Bàn giao trong 10 ngày" },
        ],
      },
    ],
  },
  {
    id: "seo",
    num: "03",
    title: { fr: "SEO Domination System", en: "SEO Domination System", vi: "Hệ thống Thống trị SEO" },
    short: {
      fr: "Sémantique, netlinking, autorité. Position par position.",
      en: "Semantics, link building, authority. Position by position.",
      vi: "Ngữ nghĩa, xây dựng liên kết, thẩm quyền. Từng vị trí một.",
    },
    description: {
      fr: "Une stratégie SEO complète pour améliorer votre visibilité sur Google et attirer un trafic réellement qualifié vers votre site.",
      en: "A complete SEO strategy to improve your Google visibility and drive genuinely qualified traffic to your site.",
      vi: "Chiến lược SEO toàn diện giúp tăng khả năng hiển thị trên Google và thu hút lưu lượng truy cập thực sự chất lượng.",
    },
    fromEur: 199,
    fromPeriod: "month",
    highlights: [
      { fr: "+340 % de trafic organique", en: "+340% organic traffic", vi: "+340% lưu lượng tự nhiên" },
      { fr: "Positionnement TOP 10", en: "TOP 10 positioning", vi: "Xếp hạng TOP 10" },
      { fr: "600+ articles optimisés", en: "600+ optimised articles", vi: "Hơn 600 bài viết tối ưu" },
      { fr: "Monitoring continu 24/7", en: "Continuous 24/7 monitoring", vi: "Giám sát liên tục 24/7" },
    ],
    plans: [
      {
        name: { fr: "SEO Local", en: "Local SEO", vi: "SEO Địa phương" },
        eur: 199,
        period: "month",
        features: [
          { fr: "Audit SEO complet", en: "Complete SEO audit", vi: "Kiểm toán SEO toàn diện" },
          { fr: "Optimisation on-page", en: "On-page optimisation", vi: "Tối ưu on-page" },
          { fr: "Google Business Profile", en: "Google Business Profile", vi: "Google Business Profile" },
          { fr: "Citations locales", en: "Local citations", vi: "Trích dẫn địa phương" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: { fr: "SEO Boost", en: "SEO Boost", vi: "SEO Tăng tốc" },
        eur: 349,
        period: "month",
        popular: true,
        features: [
          { fr: "Tout le SEO Local", en: "Everything in Local SEO", vi: "Toàn bộ gói SEO Địa phương" },
          { fr: "Netlinking premium", en: "Premium link building", vi: "Xây dựng liên kết cao cấp" },
          { fr: "Contenu optimisé (4 / mois)", en: "Optimised content (4 / month)", vi: "Nội dung tối ưu (4 bài / tháng)" },
          { fr: "Suivi des positions", en: "Rank tracking", vi: "Theo dõi thứ hạng" },
          { fr: "Analyse concurrentielle", en: "Competitive analysis", vi: "Phân tích đối thủ" },
          { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
        ],
      },
      {
        name: { fr: "SEO Pro", en: "SEO Pro", vi: "SEO Pro" },
        eur: 549,
        period: "month",
        features: [
          { fr: "Tout le SEO Boost", en: "Everything in SEO Boost", vi: "Toàn bộ gói SEO Tăng tốc" },
          { fr: "Stratégie nationale", en: "National strategy", vi: "Chiến lược toàn quốc" },
          { fr: "Contenu illimité", en: "Unlimited content", vi: "Nội dung không giới hạn" },
          { fr: "Backlinks premium", en: "Premium backlinks", vi: "Backlink cao cấp" },
          { fr: "Consultant dédié", en: "Dedicated consultant", vi: "Chuyên gia riêng" },
          { fr: "Appel hebdomadaire", en: "Weekly call", vi: "Cuộc gọi hàng tuần" },
        ],
      },
      {
        name: { fr: "Résidence Locale — annuel", en: "Local Residency — yearly", vi: "Gói Địa phương — theo năm" },
        audience: {
          fr: "2 mois offerts · entreprises locales",
          en: "2 months free · local businesses",
          vi: "Tặng 2 tháng · doanh nghiệp địa phương",
        },
        eur: 1700,
        period: "year",
        features: [
          { fr: "100 articles SEO optimisés", en: "100 optimised SEO articles", vi: "100 bài viết SEO tối ưu" },
          { fr: "Google Business Profile optimisé", en: "Optimised Google Business Profile", vi: "Tối ưu Google Business Profile" },
          { fr: "Citations locales", en: "Local citations", vi: "Trích dẫn địa phương" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: { fr: "Empire National — annuel", en: "National Empire — yearly", vi: "Gói Toàn quốc — theo năm" },
        audience: {
          fr: "Saturation sectorielle complète",
          en: "Complete sector saturation",
          vi: "Bao phủ toàn ngành",
        },
        eur: 3300,
        period: "year",
        features: [
          { fr: "600+ articles SEO", en: "600+ SEO articles", vi: "Hơn 600 bài viết SEO" },
          { fr: "Stratégie nationale complète", en: "Complete national strategy", vi: "Chiến lược toàn quốc đầy đủ" },
          { fr: "Netlinking premium", en: "Premium link building", vi: "Xây dựng liên kết cao cấp" },
          { fr: "Consultant dédié", en: "Dedicated consultant", vi: "Chuyên gia riêng" },
          { fr: "Appels hebdomadaires", en: "Weekly calls", vi: "Cuộc gọi hàng tuần" },
        ],
      },
    ],
  },
  {
    id: "maps",
    num: "04",
    title: { fr: "Google Maps TOP 3", en: "Google Maps TOP 3", vi: "Google Maps TOP 3" },
    short: {
      fr: "Local pack, avis, photos. Le trafic qui appelle.",
      en: "Local pack, reviews, photos. The traffic that calls.",
      vi: "Local pack, đánh giá, hình ảnh. Lưu lượng gọi đến.",
    },
    description: {
      fr: "Positionnez votre établissement dans les 3 premiers résultats Google Maps et captez les clients qui recherchent activement vos services dans votre zone.",
      en: "Position your business in the top 3 Google Maps results and capture the customers actively searching for your services in your area.",
      vi: "Đưa doanh nghiệp của bạn vào TOP 3 kết quả Google Maps và thu hút khách hàng đang tìm kiếm dịch vụ trong khu vực.",
    },
    fromEur: 999,
    fromPeriod: "year",
    premium: true,
    highlights: [
      { fr: "90 % des clics vont au TOP 3", en: "90% of clicks go to the TOP 3", vi: "90% lượt nhấp thuộc về TOP 3" },
      { fr: "+340 % d'appels en moyenne", en: "+340% calls on average", vi: "Trung bình +340% cuộc gọi" },
      { fr: "+500 % de demandes d'itinéraire", en: "+500% direction requests", vi: "+500% yêu cầu chỉ đường" },
      { fr: "Garantie TOP 3", en: "TOP 3 guarantee", vi: "Cam kết TOP 3" },
    ],
    plans: [
      {
        name: { fr: "Google Maps TOP 3 Garanti", en: "Google Maps TOP 3 Guaranteed", vi: "Google Maps TOP 3 Cam kết" },
        audience: {
          fr: "Prix selon secteur, ville et concurrence — devis sous 24 h",
          en: "Price based on sector, city and competition — quote within 24h",
          vi: "Giá theo ngành, thành phố và mức cạnh tranh — báo giá trong 24 giờ",
        },
        eur: 999,
        period: "year",
        popular: true,
        features: [
          { fr: "Positionnement TOP 3 garanti", en: "Guaranteed TOP 3 positioning", vi: "Cam kết vị trí TOP 3" },
          { fr: "Optimisation complète de la fiche", en: "Complete profile optimisation", vi: "Tối ưu hồ sơ toàn diện" },
          { fr: "Gestion des avis clients", en: "Customer review management", vi: "Quản lý đánh giá khách hàng" },
          { fr: "Photos professionnelles optimisées", en: "Optimised professional photos", vi: "Hình ảnh chuyên nghiệp được tối ưu" },
          { fr: "Reporting mensuel détaillé", en: "Detailed monthly reporting", vi: "Báo cáo chi tiết hàng tháng" },
          { fr: "Sans engagement après 1 an", en: "No commitment after 1 year", vi: "Không ràng buộc sau 1 năm" },
          { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
        ],
      },
    ],
  },
  {
    id: "social",
    num: "05",
    title: { fr: "Community Management", en: "Community Management", vi: "Quản trị Mạng xã hội" },
    short: {
      fr: "Direction artistique sociale et production continue.",
      en: "Social art direction and continuous production.",
      vi: "Định hướng nghệ thuật và sản xuất nội dung liên tục.",
    },
    description: {
      fr: "Contenus visuels premium, légendes engageantes, planification, modération et veille : votre présence sociale devient une machine à notoriété.",
      en: "Premium visual content, engaging captions, scheduling, moderation and monitoring: your social presence becomes an awareness engine.",
      vi: "Nội dung hình ảnh cao cấp, chú thích cuốn hút, lên lịch, kiểm duyệt và theo dõi: mạng xã hội trở thành cỗ máy nhận diện.",
    },
    fromEur: 199,
    fromPeriod: "month",
    highlights: [
      { fr: "+250 % d'engagement moyen", en: "+250% average engagement", vi: "Trung bình +250% tương tác" },
      { fr: "+180 % de portée organique", en: "+180% organic reach", vi: "+180% phạm vi tiếp cận tự nhiên" },
      { fr: "+85 % de nouveaux abonnés", en: "+85% new followers", vi: "+85% người theo dõi mới" },
      { fr: "Calendrier validé à l'avance", en: "Calendar approved in advance", vi: "Lịch nội dung được duyệt trước" },
    ],
    plans: [
      {
        name: { fr: "Community Essential", en: "Community Essential", vi: "Community Essential" },
        eur: 199,
        period: "month",
        features: [
          { fr: "8 publications par mois", en: "8 posts per month", vi: "8 bài đăng mỗi tháng" },
          { fr: "1 réseau social", en: "1 social network", vi: "1 mạng xã hội" },
          { fr: "Création de contenu", en: "Content creation", vi: "Sáng tạo nội dung" },
          { fr: "Hashtags optimisés", en: "Optimised hashtags", vi: "Hashtag tối ưu" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: { fr: "Community Business", en: "Community Business", vi: "Community Business" },
        eur: 349,
        period: "month",
        popular: true,
        features: [
          { fr: "16 publications par mois", en: "16 posts per month", vi: "16 bài đăng mỗi tháng" },
          { fr: "2 réseaux sociaux", en: "2 social networks", vi: "2 mạng xã hội" },
          { fr: "Stories quotidiennes", en: "Daily stories", vi: "Story hàng ngày" },
          { fr: "Modération des commentaires", en: "Comment moderation", vi: "Kiểm duyệt bình luận" },
          { fr: "Reporting bimensuel", en: "Bi-monthly reporting", vi: "Báo cáo hai lần mỗi tháng" },
          { fr: "Stratégie éditoriale", en: "Editorial strategy", vi: "Chiến lược nội dung" },
          { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
        ],
      },
      {
        name: { fr: "Community Premium", en: "Community Premium", vi: "Community Premium" },
        eur: 599,
        period: "month",
        features: [
          { fr: "Publications illimitées", en: "Unlimited posts", vi: "Bài đăng không giới hạn" },
          { fr: "3 réseaux sociaux et plus", en: "3+ social networks", vi: "Từ 3 mạng xã hội trở lên" },
          { fr: "Vidéos courtes (Reels / TikTok)", en: "Short videos (Reels / TikTok)", vi: "Video ngắn (Reels / TikTok)" },
          { fr: "Gestion des publicités", en: "Paid ads management", vi: "Quản lý quảng cáo" },
          { fr: "Partenariats influenceurs", en: "Influencer partnerships", vi: "Hợp tác người ảnh hưởng" },
          { fr: "Account manager dédié", en: "Dedicated account manager", vi: "Quản lý tài khoản riêng" },
          { fr: "Appel stratégique mensuel", en: "Monthly strategy call", vi: "Cuộc gọi chiến lược hàng tháng" },
        ],
      },
    ],
  },
  {
    id: "maintenance",
    num: "06",
    title: { fr: "WebCare Maintenance", en: "WebCare Maintenance", vi: "Bảo trì WebCare" },
    short: {
      fr: "Hébergement edge, sauvegardes, SLA. Zéro angle mort.",
      en: "Edge hosting, backups, SLA. No blind spots.",
      vi: "Hosting edge, sao lưu, SLA. Không điểm mù.",
    },
    description: {
      fr: "Gardez un site rapide, sécurisé et à jour grâce à une maintenance proactive : mises à jour, sauvegardes, monitoring 24/7 et interventions rapides.",
      en: "Keep your site fast, secure and up to date with proactive maintenance: updates, backups, 24/7 monitoring and fast interventions.",
      vi: "Giữ website nhanh, an toàn và luôn cập nhật với bảo trì chủ động: cập nhật, sao lưu, giám sát 24/7 và xử lý nhanh.",
    },
    fromEur: 29,
    fromPeriod: "month",
    highlights: [
      { fr: "99,9 % d'uptime garanti", en: "99.9% guaranteed uptime", vi: "Cam kết uptime 99,9%" },
      { fr: "Monitoring actif 24/7", en: "Active 24/7 monitoring", vi: "Giám sát chủ động 24/7" },
      { fr: "Intervention en moins de 4 h", en: "Response in under 4h", vi: "Can thiệp trong dưới 4 giờ" },
      { fr: "Engagement annuel = 2 mois offerts", en: "Yearly commitment = 2 months free", vi: "Cam kết theo năm = tặng 2 tháng" },
    ],
    plans: [
      {
        name: { fr: "Essential", en: "Essential", vi: "Essential" },
        eur: 29,
        period: "month",
        features: [
          { fr: "Mises à jour de sécurité", en: "Security updates", vi: "Cập nhật bảo mật" },
          { fr: "Sauvegardes régulières", en: "Regular backups", vi: "Sao lưu định kỳ" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: { fr: "Business", en: "Business", vi: "Business" },
        eur: 59,
        period: "month",
        popular: true,
        features: [
          { fr: "Modifications de contenu", en: "Content edits", vi: "Chỉnh sửa nội dung" },
          { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
          { fr: "Sauvegarde quotidienne", en: "Daily backup", vi: "Sao lưu hàng ngày" },
        ],
      },
      {
        name: { fr: "Illimité", en: "Unlimited", vi: "Không giới hạn" },
        eur: 99,
        period: "month",
        features: [
          { fr: "Modifications illimitées", en: "Unlimited edits", vi: "Chỉnh sửa không giới hạn" },
          { fr: "+1 article SEO par mois", en: "+1 SEO article per month", vi: "+1 bài viết SEO mỗi tháng" },
          { fr: "SLA prioritaire", en: "Priority SLA", vi: "SLA ưu tiên" },
        ],
      },
      {
        name: { fr: "Infrastructure annuelle", en: "Yearly Infrastructure", vi: "Hạ tầng theo năm" },
        audience: {
          fr: "Hébergement + domaine + SSL + e-mails",
          en: "Hosting + domain + SSL + emails",
          vi: "Lưu trữ + tên miền + SSL + e-mail",
        },
        eur: 79,
        period: "year",
        features: [
          { fr: "Hébergement haute performance", en: "High-performance hosting", vi: "Lưu trữ hiệu suất cao" },
          { fr: "Nom de domaine inclus", en: "Domain name included", vi: "Bao gồm tên miền" },
          { fr: "Certificat SSL (HTTPS)", en: "SSL certificate (HTTPS)", vi: "Chứng chỉ SSL (HTTPS)" },
          { fr: "E-mails professionnels", en: "Professional emails", vi: "E-mail doanh nghiệp" },
          { fr: "Support technique", en: "Technical support", vi: "Hỗ trợ kỹ thuật" },
        ],
      },
    ],
  },
  {
    id: "ai",
    num: "07",
    title: { fr: "Assistants IA 24/7", en: "AI Assistants 24/7", vi: "Trợ lý AI 24/7" },
    short: {
      fr: "Multilingues, connectés au CRM, jamais hors service.",
      en: "Multilingual, CRM-connected, never offline.",
      vi: "Đa ngôn ngữ, kết nối CRM, không bao giờ ngừng hoạt động.",
    },
    description: {
      fr: "Automatisez votre service client avec des assistants IA qui répondent instantanément, 24 heures sur 24 : moins de coûts, plus de satisfaction, zéro demande perdue.",
      en: "Automate your customer service with AI assistants that answer instantly, around the clock: lower costs, higher satisfaction, zero lost enquiries.",
      vi: "Tự động hóa chăm sóc khách hàng với trợ lý AI phản hồi tức thì, suốt 24 giờ: giảm chi phí, tăng hài lòng, không bỏ lỡ yêu cầu nào.",
    },
    fromEur: 499,
    fromPeriod: "month",
    highlights: [
      { fr: "-80 % de coûts de support", en: "-80% support costs", vi: "Giảm 80% chi phí hỗ trợ" },
      { fr: "90 % des questions résolues", en: "90% of questions resolved", vi: "Giải quyết 90% câu hỏi" },
      { fr: "Réponse en moins de 3 s", en: "Response in under 3s", vi: "Phản hồi dưới 3 giây" },
      { fr: "Site, WhatsApp, Messenger, Instagram", en: "Website, WhatsApp, Messenger, Instagram", vi: "Website, WhatsApp, Messenger, Instagram" },
    ],
    plans: [
      {
        name: { fr: "IA Chatbot", en: "AI Chatbot", vi: "Chatbot AI" },
        eur: 499,
        period: "month",
        features: [
          { fr: "Chatbot personnalisé", en: "Custom chatbot", vi: "Chatbot tùy chỉnh" },
          { fr: "Intégration au site web", en: "Website integration", vi: "Tích hợp website" },
          { fr: "Réponses automatiques", en: "Automated answers", vi: "Trả lời tự động" },
          { fr: "FAQ intelligente", en: "Smart FAQ", vi: "FAQ thông minh" },
          { fr: "Capture de leads", en: "Lead capture", vi: "Thu thập khách tiềm năng" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: { fr: "IA Assistance Avancée", en: "Advanced AI Assistance", vi: "Trợ lý AI Nâng cao" },
        eur: 999,
        period: "month",
        popular: true,
        features: [
          { fr: "IA conversationnelle avancée", en: "Advanced conversational AI", vi: "AI hội thoại nâng cao" },
          { fr: "Multilingue automatique", en: "Automatic multilingual support", vi: "Đa ngôn ngữ tự động" },
          { fr: "Intégration CRM", en: "CRM integration", vi: "Tích hợp CRM" },
          { fr: "Prise de rendez-vous", en: "Appointment booking", vi: "Đặt lịch hẹn" },
          { fr: "Analytics détaillés", en: "Detailed analytics", vi: "Phân tích chi tiết" },
          { fr: "WhatsApp et Messenger", en: "WhatsApp and Messenger", vi: "WhatsApp và Messenger" },
          { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
        ],
      },
    ],
  },
];

export const FAQ: { q: L; a: L }[] = [
  {
    q: {
      fr: "Combien de temps faut-il pour créer mon site ?",
      en: "How long does it take to build my website?",
      vi: "Mất bao lâu để hoàn thành website của tôi?",
    },
    a: {
      fr: "Selon la formule choisie : 7 jours pour un Site Vitrine, 14 jours pour un Site Business et 21 jours pour un E-commerce. Ces délais incluent la conception et les révisions.",
      en: "Depending on the plan: 7 days for a Showcase Site, 14 days for a Business Site and 21 days for an E-commerce site. These timeframes include design and revisions.",
      vi: "Tùy theo gói: 7 ngày cho website giới thiệu, 14 ngày cho website doanh nghiệp và 21 ngày cho thương mại điện tử. Thời gian này đã bao gồm thiết kế và chỉnh sửa.",
    },
  },
  {
    q: {
      fr: "Que comprend l'hébergement inclus ?",
      en: "What does the included hosting cover?",
      vi: "Gói lưu trữ đi kèm bao gồm những gì?",
    },
    a: {
      fr: "Hébergement haute performance pendant 1 an, certificat SSL, nom de domaine, sauvegardes automatiques et support technique. Renouvellement via le forfait Infrastructure annuelle.",
      en: "One year of high-performance hosting, SSL certificate, domain name, automatic backups and technical support. Renewal through the yearly Infrastructure plan.",
      vi: "Một năm lưu trữ hiệu suất cao, chứng chỉ SSL, tên miền, sao lưu tự động và hỗ trợ kỹ thuật. Gia hạn thông qua gói Hạ tầng theo năm.",
    },
  },
  {
    q: {
      fr: "Puis-je modifier mon site moi-même ?",
      en: "Can I edit my website myself?",
      vi: "Tôi có thể tự chỉnh sửa website không?",
    },
    a: {
      fr: "Oui. Nous vous formons à l'utilisation de votre site : textes, images et contenus se modifient en toute autonomie. Pour les évolutions techniques, notre équipe reste disponible.",
      en: "Yes. We train you to run your site: text, images and content can be edited autonomously. For technical changes, our team stays available.",
      vi: "Có. Chúng tôi đào tạo bạn sử dụng website: văn bản, hình ảnh và nội dung có thể tự chỉnh sửa. Với thay đổi kỹ thuật, đội ngũ của chúng tôi luôn sẵn sàng.",
    },
  },
  {
    q: {
      fr: "Combien de temps pour voir des résultats en SEO ?",
      en: "How long before SEO results appear?",
      vi: "Bao lâu để thấy kết quả SEO?",
    },
    a: {
      fr: "Les premiers résultats apparaissent généralement entre 2 et 4 mois. Le SEO est un investissement à moyen terme dont les effets sont cumulatifs et durables.",
      en: "First results usually appear between 2 and 4 months. SEO is a mid-term investment whose effects are cumulative and lasting.",
      vi: "Kết quả đầu tiên thường xuất hiện sau 2 đến 4 tháng. SEO là khoản đầu tư trung hạn với hiệu quả tích lũy và bền vững.",
    },
  },
  {
    q: {
      fr: "Quelle est la différence entre le SEO et Google Maps ?",
      en: "What is the difference between SEO and Google Maps?",
      vi: "Khác biệt giữa SEO và Google Maps là gì?",
    },
    a: {
      fr: "Le SEO positionne votre site dans les résultats organiques. Google Maps positionne votre fiche dans le Local Pack (carte + 3 résultats). Les deux leviers sont complémentaires.",
      en: "SEO positions your website in the organic results. Google Maps positions your listing in the Local Pack (map + 3 results). Both levers are complementary.",
      vi: "SEO đưa website lên kết quả tìm kiếm tự nhiên. Google Maps đưa hồ sơ của bạn vào Local Pack (bản đồ + 3 kết quả). Hai kênh này bổ trợ cho nhau.",
    },
  },
  {
    q: {
      fr: "Comment fonctionne la garantie Google Maps TOP 3 ?",
      en: "How does the Google Maps TOP 3 guarantee work?",
      vi: "Cam kết Google Maps TOP 3 hoạt động như thế nào?",
    },
    a: {
      fr: "Le contrat d'un an ne démarre que lorsque vous êtes réellement positionné dans le TOP 3. La vérification se fait ensemble, sur plusieurs appareils, en navigation neutre.",
      en: "The one-year contract only starts once you are genuinely ranked in the TOP 3. Verification is done together, on several devices, in neutral browsing.",
      vi: "Hợp đồng một năm chỉ bắt đầu khi bạn thực sự nằm trong TOP 3. Việc kiểm tra được thực hiện cùng nhau, trên nhiều thiết bị, ở chế độ duyệt trung lập.",
    },
  },
  {
    q: {
      fr: "Comment le prix Google Maps est-il calculé ?",
      en: "How is the Google Maps price calculated?",
      vi: "Giá Google Maps được tính như thế nào?",
    },
    a: {
      fr: "Il dépend de votre secteur, de votre ville et du niveau de concurrence. Nous analysons ces critères et vous transmettons un devis personnalisé sous 24 h.",
      en: "It depends on your sector, your city and the level of competition. We analyse these criteria and send you a tailored quote within 24 hours.",
      vi: "Phụ thuộc vào ngành nghề, thành phố và mức độ cạnh tranh. Chúng tôi phân tích các tiêu chí này và gửi báo giá riêng trong vòng 24 giờ.",
    },
  },
  {
    q: {
      fr: "Combien de publications sont incluses chaque mois ?",
      en: "How many posts are included each month?",
      vi: "Mỗi tháng bao gồm bao nhiêu bài đăng?",
    },
    a: {
      fr: "8 publications pour Essential, 16 pour Business et un volume illimité pour Premium. Chaque publication est créée sur mesure avec un visuel original.",
      en: "8 posts for Essential, 16 for Business and unlimited for Premium. Every post is created bespoke with original visuals.",
      vi: "8 bài cho Essential, 16 bài cho Business và không giới hạn cho Premium. Mỗi bài đăng đều được thiết kế riêng với hình ảnh gốc.",
    },
  },
  {
    q: {
      fr: "Puis-je valider les contenus avant publication ?",
      en: "Can I approve content before publication?",
      vi: "Tôi có thể duyệt nội dung trước khi đăng không?",
    },
    a: {
      fr: "Oui. Le calendrier éditorial vous est envoyé à l'avance pour validation : vous gardez le contrôle total sur ce qui est publié.",
      en: "Yes. The editorial calendar is sent to you in advance for approval: you keep full control over what gets published.",
      vi: "Có. Lịch nội dung được gửi trước để bạn duyệt: bạn hoàn toàn kiểm soát những gì được đăng.",
    },
  },
  {
    q: {
      fr: "L'IA peut-elle vraiment remplacer un employé ?",
      en: "Can AI really replace an employee?",
      vi: "AI có thực sự thay thế được nhân viên không?",
    },
    a: {
      fr: "L'IA traite 90 % des questions récurrentes (horaires, tarifs, rendez-vous). Les demandes complexes sont transférées à un humain. C'est un complément, pas un remplacement.",
      en: "AI handles 90% of recurring questions (opening hours, pricing, appointments). Complex requests are handed over to a human. It is a complement, not a replacement.",
      vi: "AI xử lý 90% câu hỏi lặp lại (giờ mở cửa, giá, lịch hẹn). Yêu cầu phức tạp sẽ chuyển cho con người. Đây là sự bổ trợ, không phải thay thế.",
    },
  },
  {
    q: {
      fr: "Sur quelles plateformes l'assistant IA fonctionne-t-il ?",
      en: "Which platforms does the AI assistant run on?",
      vi: "Trợ lý AI hoạt động trên những nền tảng nào?",
    },
    a: {
      fr: "Site web, WhatsApp, Facebook Messenger, Instagram DM et Google Business Messages. La formule avancée inclut toutes les plateformes.",
      en: "Website, WhatsApp, Facebook Messenger, Instagram DM and Google Business Messages. The advanced plan includes every platform.",
      vi: "Website, WhatsApp, Facebook Messenger, Instagram DM và Google Business Messages. Gói nâng cao bao gồm tất cả nền tảng.",
    },
  },
  {
    q: {
      fr: "Que se passe-t-il si mon site tombe en panne ?",
      en: "What happens if my website goes down?",
      vi: "Điều gì xảy ra nếu website của tôi gặp sự cố?",
    },
    a: {
      fr: "Le monitoring 24/7 détecte l'incident en temps réel. Selon votre forfait, nous intervenons sous 4 h à 48 h, et les sauvegardes permettent une restauration rapide.",
      en: "24/7 monitoring detects the incident in real time. Depending on your plan we intervene within 4 to 48 hours, and backups allow a fast restore.",
      vi: "Giám sát 24/7 phát hiện sự cố theo thời gian thực. Tùy gói, chúng tôi xử lý trong 4 đến 48 giờ, và bản sao lưu cho phép khôi phục nhanh.",
    },
  },
  {
    q: {
      fr: "Y a-t-il un engagement minimum ?",
      en: "Is there a minimum commitment?",
      vi: "Có yêu cầu cam kết tối thiểu không?",
    },
    a: {
      fr: "Les forfaits mensuels sont sans engagement. Les forfaits annuels offrent 2 mois gratuits et sont recommandés pour des résultats optimaux.",
      en: "Monthly plans have no commitment. Yearly plans include 2 free months and are recommended for optimal results.",
      vi: "Gói theo tháng không ràng buộc. Gói theo năm tặng 2 tháng miễn phí và được khuyến nghị để đạt kết quả tốt nhất.",
    },
  },
  {
    q: {
      fr: "Les droits d'utilisation de mon identité sont-ils inclus ?",
      en: "Are the usage rights to my identity included?",
      vi: "Quyền sử dụng bộ nhận diện có được bao gồm không?",
    },
    a: {
      fr: "Oui. Vous êtes propriétaire de votre identité visuelle : tous les droits d'utilisation commerciale sont cédés à la livraison.",
      en: "Yes. You own your visual identity: all commercial usage rights are transferred on delivery.",
      vi: "Có. Bạn sở hữu bộ nhận diện của mình: toàn bộ quyền sử dụng thương mại được chuyển giao khi bàn giao.",
    },
  },
];

export const PORTFOLIO = [
  {
    plate: "01",
    name: "Maison Lumière",
    sector: { fr: "Gastronomie · Paris", en: "Fine dining · Paris", vi: "Ẩm thực cao cấp · Paris" },
    result: { fr: "+180 % de réservations", en: "+180% bookings", vi: "+180% lượt đặt bàn" },
    tags: ["Website", "SEO Local", "AI"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "02",
    name: "Villa Azur",
    sector: { fr: "Hôtel boutique · Nice", en: "Boutique hotel · Nice", vi: "Khách sạn boutique · Nice" },
    result: { fr: "+240 % en direct", en: "+240% direct", vi: "+240% đặt trực tiếp" },
    tags: ["Website", "SEO Pro", "Branding"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "03",
    name: "Noir & Or",
    sector: { fr: "Retail de luxe · Global", en: "Luxury retail · Global", vi: "Bán lẻ xa xỉ · Toàn cầu" },
    result: { fr: "6 chiffres au T1", en: "6 figures in Q1", vi: "Doanh thu 6 chữ số quý I" },
    tags: ["E-commerce", "SEO", "Ads"],
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "04",
    name: "Cabinet Mercier",
    sector: { fr: "Cabinet d'avocats · Paris", en: "Law firm · Paris", vi: "Văn phòng luật · Paris" },
    result: { fr: "TOP 1 SEO", en: "TOP 1 SEO", vi: "TOP 1 SEO" },
    tags: ["Website", "Branding", "SEO"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "05",
    name: "Élan Studio",
    sector: { fr: "Studio créatif · Berlin", en: "Creative studio · Berlin", vi: "Studio sáng tạo · Berlin" },
    result: { fr: "Awwwards", en: "Awwwards", vi: "Awwwards" },
    tags: ["Brand identity", "Website"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "06",
    name: "Zen Retreat",
    sector: { fr: "Hôtel spa · Bali", en: "Spa hotel · Bali", vi: "Khách sạn spa · Bali" },
    result: { fr: "Conciergerie IA 24/7", en: "24/7 AI concierge", vi: "Lễ tân AI 24/7" },
    tags: ["Website", "AI"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "07",
    name: "Lumina Digital",
    sector: { fr: "Tech & SaaS · Lisbonne", en: "Tech & SaaS · Lisbon", vi: "Công nghệ & SaaS · Lisbon" },
    result: { fr: "+320 % de leads", en: "+320% leads", vi: "+320% khách hàng tiềm năng" },
    tags: ["Website", "SEO", "AI"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "08",
    name: "Neo Gear",
    sector: { fr: "E-commerce · Dubaï", en: "E-commerce · Dubai", vi: "Thương mại điện tử · Dubai" },
    result: { fr: "×2,4 sur le panier moyen", en: "2.4× average basket", vi: "Giá trị giỏ hàng ×2,4" },
    tags: ["E-commerce", "Branding", "Ads"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    plate: "09",
    name: "Synth OS",
    sector: { fr: "Studio produit · Berlin", en: "Product studio · Berlin", vi: "Studio sản phẩm · Berlin" },
    result: { fr: "Identité complète en 6 semaines", en: "Full identity in 6 weeks", vi: "Bộ nhận diện hoàn chỉnh trong 6 tuần" },
    tags: ["Brand identity", "Website", "Social"],
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1400&q=85",
  },
];

export const TESTIMONIALS = [
  {
    num: "01",
    brand: "Pininfarina",
    field: { fr: "Ingénierie & Performance", en: "Engineering & Performance", vi: "Kỹ thuật & Hiệu năng" },
    quote: {
      fr: "« XRAGENCY a compris notre vision d'une élégance intemporelle et l'a parfaitement traduite en digital. »",
      en: "“XRAGENCY understood our vision of timeless elegance and translated it perfectly into digital.”",
      vi: "“XRAGENCY đã hiểu tầm nhìn về sự thanh lịch vượt thời gian của chúng tôi và chuyển tải hoàn hảo lên nền tảng số.”",
    },
    author: "Marco Rossi",
    role: { fr: "Directeur digital", en: "Digital Director", vi: "Giám đốc Digital" },
  },
  {
    num: "02",
    brand: "Aman Resorts",
    field: { fr: "Expérience & Réservation", en: "Experience & Booking", vi: "Trải nghiệm & Đặt phòng" },
    quote: {
      fr: "« Nos demandes de réservation ont augmenté de 340 % après le travail SEO de XRAGENCY. »",
      en: "“Our booking requests increased by 340% after XRAGENCY's SEO work.”",
      vi: "“Yêu cầu đặt phòng của chúng tôi tăng 340% sau khi XRAGENCY triển khai SEO.”",
    },
    author: "Sarah Chen",
    role: { fr: "VP Marketing", en: "VP Marketing", vi: "Phó Chủ tịch Marketing" },
  },
  {
    num: "03",
    brand: "Clinique La Prairie",
    field: { fr: "Santé & Longévité", en: "Health & Longevity", vi: "Sức khỏe & Trường thọ" },
    quote: {
      fr: "« L'assistant IA gère parfaitement les réservations, même pendant les jours fériés suisses. »",
      en: "“The AI assistant handles reservations perfectly, even during Swiss holidays.”",
      vi: "“Trợ lý AI xử lý đặt lịch hoàn hảo, kể cả trong các ngày lễ tại Thụy Sĩ.”",
    },
    author: "Dr. Isabelle Meyer",
    role: { fr: "Directrice des opérations", en: "Operations Director", vi: "Giám đốc Vận hành" },
  },
  {
    num: "04",
    brand: "Bespoke Real Estate",
    field: { fr: "Immobilier ultra-luxe", en: "Ultra-luxury real estate", vi: "Bất động sản siêu sang" },
    quote: {
      fr: "« Notre marque reflète enfin l'exclusivité des biens que nous représentons. »",
      en: "“Our brand finally reflects the exclusivity of the properties we represent.”",
      vi: "“Thương hiệu của chúng tôi cuối cùng đã phản ánh đúng sự độc quyền của các bất động sản mà chúng tôi đại diện.”",
    },
    author: "James Wellington",
    role: { fr: "Fondateur & CEO", en: "Founder & CEO", vi: "Nhà sáng lập & CEO" },
  },
];