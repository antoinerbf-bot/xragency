import type { L } from "./i18n";
import pf01 from "@/assets/pf-01-maison-lumiere.jpg";
import pf02 from "@/assets/pf-02-villa-azur.jpg";
import pf03 from "@/assets/pf-03-noir-or.jpg";
import pf04 from "@/assets/pf-04-cabinet-mercier.jpg";
import pf05 from "@/assets/pf-05-elan-studio.jpg";
import pf06 from "@/assets/pf-06-zen-retreat.jpg";
import pf07 from "@/assets/pf-07-lumina-digital.jpg";
import pf08 from "@/assets/pf-08-neo-gear.jpg";
import pf09 from "@/assets/pf-09-synth-os.jpg";

export const CONTACT = {
  email: "contact.xragency@gmail.com",
  whatsapp: "https://wa.me/33767566783",
  phone: "+33 7 67 56 67 83",
  instagram: "https://www.instagram.com/xragency_",
  linkedin: "https://linkedin.com/company/xragency",
  cities: "Paris · Dubaï · Tokyo · New York",
};

export type Plan = {
  name: L;
  audience?: L;
  eur: number;
  period: "once" | "month" | "year";
  features: L[];
  popular?: boolean;
};

export type ServiceStep = {
  num: string;
  title: L;
  desc: L;
};

export type ServiceDeliverable = {
  title: L;
  desc: L;
};

export type ServiceMetric = {
  metric: string;
  label: L;
  desc: L;
};

export type ServiceComparison = {
  feature: L;
  us: L;
  them: L;
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
  steps?: ServiceStep[];
  deliverables?: ServiceDeliverable[];
  metrics?: ServiceMetric[];
  comparisons?: ServiceComparison[];
  serviceFaqs?: { q: L; a: L }[];
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
      {
        fr: "Score PageSpeed 100/100",
        en: "100/100 PageSpeed score",
        vi: "Điểm PageSpeed 100/100",
      },
      { fr: "Chargement en moins de 2 s", en: "Under 2s load time", vi: "Tải trang dưới 2 giây" },
      { fr: "200+ sites livrés", en: "200+ websites delivered", vi: "Hơn 200 website đã bàn giao" },
      { fr: "Hébergement 1 an inclus", en: "1 year hosting included", vi: "Bao gồm 1 năm lưu trữ" },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Audit & Direction Artistique",
          en: "Audit & Art Direction",
          vi: "Đánh giá & Định hướng nghệ thuật",
        },
        desc: {
          fr: "Analyse de votre positionnement, benchmark concurrentiel et création de maquettes interactives sur-mesure.",
          en: "Analysis of your positioning, competitor benchmark and creation of tailored interactive prototypes.",
          vi: "Phân tích vị thế thương hiệu, nghiên cứu đối thủ và tạo bản mẫu tương tác riêng biệt.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Développement Haute Performance",
          en: "High-Performance Development",
          vi: "Phát triển Hiệu suất cao",
        },
        desc: {
          fr: "Intégration d'architectures ultra-rapides, animations fluides et score Google PageSpeed 100/100.",
          en: "Ultra-fast architecture engineering, smooth animations and 100/100 Google PageSpeed score.",
          vi: "Lập trình kiến trúc siêu nhanh, hiệu ứng mượt mà và đạt điểm Google PageSpeed 100/100.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Intégrations & Conversion",
          en: "Integrations & Conversion",
          vi: "Tích hợp & Chuyển đổi",
        },
        desc: {
          fr: "Connexion de formulaires de contact, calendrier de réservation, paiement en ligne sécurisé et analytics.",
          en: "Connecting contact forms, booking calendars, secure online payments and analytics.",
          vi: "Kết nối biểu mẫu liên hệ, lịch đặt chỗ, thanh toán trực tuyến bảo mật và thống kê nâng cao.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Déploiement & Passation",
          en: "Deployment & Handover",
          vi: "Triển khai & Bàn giao",
        },
        desc: {
          fr: "Mise en ligne sur réseau Edge mondial avec SSL, optimisation SEO technique et formation à l'administration.",
          en: "Global Edge network launch with SSL, technical SEO optimisation and admin training.",
          vi: "Ra mắt trên mạng Edge toàn cầu kèm SSL, tối ưu SEO kỹ thuật và hướng dẫn quản trị.",
        },
      },
    ],
    metrics: [
      {
        metric: "100/100",
        label: { fr: "Score PageSpeed", en: "PageSpeed Score", vi: "Điểm PageSpeed" },
        desc: {
          fr: "Chargement ultra-rapide sur mobile et desktop.",
          en: "Ultra-fast loading on mobile and desktop.",
          vi: "Tải trang siêu tốc trên di động và máy tính.",
        },
      },
      {
        metric: "< 1.5s",
        label: { fr: "Temps d'affichage", en: "Display speed", vi: "Tốc độ hiển thị" },
        desc: {
          fr: "Zéro latence pour maximiser la rétention utilisateur.",
          en: "Zero latency to maximize visitor retention.",
          vi: "Không độ trễ để tối đa hóa giữ chân khách.",
        },
      },
      {
        metric: "+48%",
        label: { fr: "Taux de conversion", en: "Conversion rate", vi: "Tỷ lệ chuyển đổi" },
        desc: {
          fr: "Hausse moyenne des demandes générées.",
          en: "Average increase in enquiries generated.",
          vi: "Tăng trưởng yêu cầu trung bình.",
        },
      },
    ],
    comparisons: [
      {
        feature: {
          fr: "Code & Architecture",
          en: "Code & Architecture",
          vi: "Mã nguồn & Kiến trúc",
        },
        us: {
          fr: "Code sur-mesure ultra-léger & sécurisé",
          en: "Bespoke ultra-light & secure codebase",
          vi: "Mã nguồn riêng siêu nhẹ & bảo mật",
        },
        them: {
          fr: "Thèmes WordPress lourds & vulnérables",
          en: "Heavy & vulnerable WordPress themes",
          vi: "Theme WordPress nặng nề & dễ lỗi",
        },
      },
      {
        feature: { fr: "Design & UX", en: "Design & UX", vi: "Thiết kế & Trải nghiệm" },
        us: {
          fr: "Direction artistique unique et exclusive",
          en: "Unique and exclusive art direction",
          vi: "Định hướng nghệ thuật độc bản",
        },
        them: {
          fr: "Templates préfabriqués génériques",
          en: "Generic off-the-shelf templates",
          vi: "Mẫu giao diện có sẵn đại trà",
        },
      },
      {
        feature: { fr: "Autonomie & Gestion", en: "Autonomy & Management", vi: "Tự chủ & Quản lý" },
        us: {
          fr: "Formation complète, modifiable sans code",
          en: "Full training, editable with no code",
          vi: "Đào tạo đầy đủ, chỉnh sửa không cần code",
        },
        them: {
          fr: "Dépendance totale et frais cachés",
          en: "Total lock-in and hidden fees",
          vi: "Bị phụ thuộc và phát sinh chi phí",
        },
      },
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
          {
            fr: "Design responsive premium",
            en: "Premium responsive design",
            vi: "Thiết kế responsive cao cấp",
          },
          { fr: "Jusqu'à 3 pages", en: "Up to 3 pages", vi: "Tối đa 3 trang" },
          { fr: "Formulaire de contact", en: "Contact form", vi: "Biểu mẫu liên hệ" },
          { fr: "Optimisation SEO de base", en: "Basic SEO optimisation", vi: "Tối ưu SEO cơ bản" },
          {
            fr: "Hébergement 1 an inclus",
            en: "1 year hosting included",
            vi: "Bao gồm 1 năm lưu trữ",
          },
          { fr: "Livraison en 7 jours", en: "Delivered in 7 days", vi: "Bàn giao trong 7 ngày" },
          {
            fr: "Langue supplémentaire : +100 € / langue",
            en: "Extra language: +$108 / language",
            vi: "Thêm ngôn ngữ: +100 € / ngôn ngữ",
          },
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
          {
            fr: "Tout le Vitrine Pro",
            en: "Everything in Pro Showcase",
            vi: "Toàn bộ gói Giới thiệu Pro",
          },
          { fr: "Jusqu'à 5 pages", en: "Up to 5 pages", vi: "Tối đa 5 trang" },
          { fr: "Blog intégré", en: "Integrated blog", vi: "Tích hợp blog" },
          {
            fr: "Galerie photos et vidéos",
            en: "Photo & video gallery",
            vi: "Thư viện ảnh và video",
          },
          { fr: "Chat en direct", en: "Live chat", vi: "Trò chuyện trực tiếp" },
          { fr: "Analytics avancés", en: "Advanced analytics", vi: "Phân tích nâng cao" },
          { fr: "Livraison en 14 jours", en: "Delivered in 14 days", vi: "Bàn giao trong 14 ngày" },
          {
            fr: "Langue supplémentaire : +100 € / langue",
            en: "Extra language: +$108 / language",
            vi: "Thêm ngôn ngữ: +100 € / ngôn ngữ",
          },
        ],
      },
      {
        name: {
          fr: "E-commerce & Réservation",
          en: "E-commerce & Booking",
          vi: "Thương mại điện tử & Đặt chỗ",
        },
        audience: {
          fr: "À partir de 1 099 € — selon le nombre de produits",
          en: "From $1,187 — depending on the number of products",
          vi: "Từ 1.099 € — tùy theo số lượng sản phẩm",
        },
        eur: 1099,
        period: "once",
        features: [
          {
            fr: "Tout le Site Business",
            en: "Everything in Business Site",
            vi: "Toàn bộ gói Doanh nghiệp",
          },
          {
            fr: "Catalogue produits sur-mesure",
            en: "Bespoke product catalogue",
            vi: "Danh mục sản phẩm riêng",
          },
          {
            fr: "Paiement en ligne sécurisé",
            en: "Secure online payments",
            vi: "Thanh toán trực tuyến an toàn",
          },
          { fr: "Gestion des stocks", en: "Inventory management", vi: "Quản lý kho hàng" },
          { fr: "Formation incluse", en: "Training included", vi: "Bao gồm đào tạo" },
          { fr: "Livraison en 21 jours", en: "Delivered in 21 days", vi: "Bàn giao trong 21 ngày" },
          {
            fr: "Option : système de réservation (supplément)",
            en: "Option: booking system (add-on)",
            vi: "Tùy chọn: hệ thống đặt chỗ (phụ phí)",
          },
          {
            fr: "Option : multilingue +100 € / langue",
            en: "Option: multilingual +$108 / language",
            vi: "Tùy chọn: đa ngôn ngữ +100 € / ngôn ngữ",
          },
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
      {
        fr: "Fichiers AI, SVG, PNG, PDF",
        en: "AI, SVG, PNG, PDF files",
        vi: "Tệp AI, SVG, PNG, PDF",
      },
      {
        fr: "Versions couleur et monochrome",
        en: "Colour and monochrome versions",
        vi: "Phiên bản màu và đơn sắc",
      },
      {
        fr: "Droits commerciaux cédés",
        en: "Full commercial rights transferred",
        vi: "Chuyển giao toàn bộ quyền thương mại",
      },
      {
        fr: "2 à 4 révisions incluses",
        en: "2 to 4 revisions included",
        vi: "Bao gồm 2 đến 4 lần chỉnh sửa",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Immersion & Moodboard",
          en: "Immersion & Moodboard",
          vi: "Khảo sát & Bảng cảm hứng",
        },
        desc: {
          fr: "Analyse des valeurs fondamentales, du public cible et définition des axes graphiques stimulants.",
          en: "Analysis of core values, target audience and defining inspiring creative visual axes.",
          vi: "Phân tích giá trị cốt lõi, đối tượng mục tiêu và xác định hướng sáng tạo.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Conception & Propositions",
          en: "Design & Concepts",
          vi: "Thiết kế & Phương án",
        },
        desc: {
          fr: "Création de concepts de logo uniques et distinctifs, testés sur supports réels.",
          en: "Crafting distinctive, unique logo concepts tested in real-world brand contexts.",
          vi: "Sáng tạo các phương án logo độc đáo, kiểm tra thực tế trên nhiều bối cảnh.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Système de Marque & Règles",
          en: "Brand System & Rules",
          vi: "Hệ thống thương hiệu & Quy chuẩn",
        },
        desc: {
          fr: "Élaboration de la palette de couleurs, des règles typographiques et des gabarits sociaux.",
          en: "Building color palettes, typography hierarchies and branded social media templates.",
          vi: "Xây dựng bảng màu, hệ thống kiểu chữ và mẫu mạng xã hội chuẩn chỉnh.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Livraison des Fichiers Maîtres",
          en: "Master Files Delivery",
          vi: "Bàn giao Tệp gốc hoàn chỉnh",
        },
        desc: {
          fr: "Remise du Brand Book complet et des fichiers vectoriels prêts pour l'impression et le digital.",
          en: "Handover of complete Brand Book and vector source files ready for print and digital.",
          vi: "Bàn giao Brand Book đầy đủ và toàn bộ tệp vector sẵn sàng cho in ấn và số hóa.",
        },
      },
    ],
    metrics: [
      {
        metric: "100%",
        label: {
          fr: "Propriété cédée",
          en: "Ownership transferred",
          vi: "Quyền sở hữu chuyển giao",
        },
        desc: {
          fr: "Pleine exploitation commerciale sans redevance.",
          en: "Full commercial usage rights with zero royalties.",
          vi: "Toàn quyền khai thác thương mại không phí bản quyền.",
        },
      },
      {
        metric: "3",
        label: { fr: "Pistes créatives", en: "Creative concepts", vi: "Phương án sáng tạo" },
        desc: {
          fr: "Concepts originaux et variés dès la première étape.",
          en: "Original and varied concepts from step one.",
          vi: "Phương án gốc đa dạng ngay từ bước đầu.",
        },
      },
      {
        metric: "5 à 10j",
        label: { fr: "Délai moyen", en: "Average delivery", vi: "Thời gian bàn giao" },
        desc: {
          fr: "Processus agile et livrables impeccables.",
          en: "Agile process with impeccable deliverables.",
          vi: "Quy trình linh hoạt và bàn giao chuẩn xác.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Singularité", en: "Uniqueness", vi: "Tính độc bản" },
        us: {
          fr: "Création 100% sur-mesure et vectorielle",
          en: "100% bespoke vector craftsmanship",
          vi: "Thiết kế vector riêng biệt 100%",
        },
        them: {
          fr: "Éléments génériques ou icônes libres de droit",
          en: "Generic stock icons or Canva templates",
          vi: "Biểu tượng có sẵn hoặc mẫu miễn phí",
        },
      },
      {
        feature: { fr: "Fichiers sources", en: "Source files", vi: "Tệp nguồn" },
        us: {
          fr: "Pack complet AI, SVG, EPS, PNG HD, PDF",
          en: "Full pack: AI, SVG, EPS, HD PNG, PDF",
          vi: "Trọn bộ AI, SVG, EPS, PNG HD, PDF",
        },
        them: {
          fr: "Simple PNG basse résolution",
          en: "Low-res PNG only",
          vi: "Chỉ có tệp PNG độ phân giải thấp",
        },
      },
      {
        feature: { fr: "Guide d'application", en: "Brand guide", vi: "Hướng dẫn sử dụng" },
        us: {
          fr: "Charte graphique complète et templates",
          en: "Complete brand guidelines and templates",
          vi: "Bộ quy chuẩn đầy đủ kèm template",
        },
        them: {
          fr: "Aucune consigne d'utilisation",
          en: "Zero brand guidelines provided",
          vi: "Không có hướng dẫn áp dụng",
        },
      },
    ],
    plans: [
      {
        name: { fr: "Logo Professionnel", en: "Professional Logo", vi: "Logo Chuyên nghiệp" },
        eur: 199,
        period: "once",
        features: [
          { fr: "3 propositions de logo", en: "3 logo concepts", vi: "3 phương án logo" },
          {
            fr: "Fichiers vectoriels (AI, SVG, PNG)",
            en: "Vector files (AI, SVG, PNG)",
            vi: "Tệp vector (AI, SVG, PNG)",
          },
          {
            fr: "Versions couleur et N&B",
            en: "Colour and B&W versions",
            vi: "Phiên bản màu và trắng đen",
          },
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
          {
            fr: "Logo professionnel inclus",
            en: "Professional logo included",
            vi: "Bao gồm logo chuyên nghiệp",
          },
          { fr: "Palette de couleurs", en: "Colour palette", vi: "Bảng màu" },
          { fr: "Typographies définies", en: "Defined typography", vi: "Hệ thống kiểu chữ" },
          { fr: "Règles d'utilisation", en: "Usage rules", vi: "Quy tắc sử dụng" },
          { fr: "Templates réseaux sociaux", en: "Social media templates", vi: "Mẫu mạng xã hội" },
          {
            fr: "Déclinaisons web et print",
            en: "Web and print applications",
            vi: "Ứng dụng web và in ấn",
          },
          { fr: "Livraison en 7 jours", en: "Delivered in 7 days", vi: "Bàn giao trong 7 ngày" },
        ],
      },
      {
        name: { fr: "Identité Complète", en: "Complete Identity", vi: "Nhận diện Toàn diện" },
        eur: 399,
        period: "once",
        features: [
          {
            fr: "Charte graphique complète",
            en: "Full brand guidelines",
            vi: "Bộ quy chuẩn đầy đủ",
          },
          {
            fr: "Papeterie (cartes, en-tête)",
            en: "Stationery (cards, letterhead)",
            vi: "Ấn phẩm văn phòng (danh thiếp, tiêu đề thư)",
          },
          {
            fr: "Kit réseaux sociaux complet",
            en: "Complete social media kit",
            vi: "Bộ mạng xã hội đầy đủ",
          },
          { fr: "Signalétique", en: "Signage", vi: "Bảng hiệu" },
          { fr: "Mockups professionnels", en: "Professional mockups", vi: "Mockup chuyên nghiệp" },
          {
            fr: "Applications web et print",
            en: "Web and print applications",
            vi: "Ứng dụng web và in ấn",
          },
          { fr: "Livraison en 10 jours", en: "Delivered in 10 days", vi: "Bàn giao trong 10 ngày" },
        ],
      },
    ],
  },
  {
    id: "seo",
    num: "03",
    title: {
      fr: "SEO Domination System",
      en: "SEO Domination System",
      vi: "Hệ thống Thống trị SEO",
    },
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
      {
        fr: "+340 % de trafic organique",
        en: "+340% organic traffic",
        vi: "+340% lưu lượng tự nhiên",
      },
      { fr: "Positionnement TOP 10", en: "TOP 10 positioning", vi: "Xếp hạng TOP 10" },
      {
        fr: "600+ articles optimisés",
        en: "600+ optimised articles",
        vi: "Hơn 600 bài viết tối ưu",
      },
      {
        fr: "Monitoring continu 24/7",
        en: "Continuous 24/7 monitoring",
        vi: "Giám sát liên tục 24/7",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Audit Sémantique & Technique",
          en: "Semantic & Technical Audit",
          vi: "Kiểm toán Ngữ nghĩa & Kỹ thuật",
        },
        desc: {
          fr: "Identification des mots-clés les plus rentables, analyse de vos concurrents et correction des blocages techniques.",
          en: "Identification of highest ROI keywords, competitor analysis and technical barrier resolution.",
          vi: "Xác định từ khóa sinh lời cao nhất, phân tích đối thủ và xử lý các lỗi kỹ thuật.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Optimisation On-Page & Contenu",
          en: "On-Page & Content Optimisation",
          vi: "Tối ưu On-Page & Nội dung",
        },
        desc: {
          fr: "Structure des balises, maillage interne, rédaction de contenus d'autorité et optimisation de l'intention de recherche.",
          en: "Tag hierarchy, internal linking, authority content writing and search intent matching.",
          vi: "Cấu trúc thẻ, liên kết nội bộ, soạn thảo nội dung thẩm quyền và tối ưu ý định tìm kiếm.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Netlinking Premium",
          en: "Premium Link Building",
          vi: "Xây dựng Liên kết Cao cấp",
        },
        desc: {
          fr: "Acquisition de backlinks de haute qualité et renforcement continu de l'autorité de votre domaine.",
          en: "Acquiring high-authority backlinks and continuously building your domain power.",
          vi: "Nhận backlink chất lượng cao và gia tăng liên tục độ uy tín của tên miền.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Suivi des Positions & ROI",
          en: "Rank Tracking & ROI",
          vi: "Theo dõi Thứ hạng & ROI",
        },
        desc: {
          fr: "Reporting mensuel transparent, analyse des conversions et ajustements réguliers de la stratégie.",
          en: "Transparent monthly reporting, conversion analytics and regular strategic adjustments.",
          vi: "Báo cáo minh bạch hàng tháng, phân tích chuyển đổi và điều chỉnh chiến lược định kỳ.",
        },
      },
    ],
    metrics: [
      {
        metric: "+340%",
        label: { fr: "Trafic organique", en: "Organic traffic", vi: "Lưu lượng tự nhiên" },
        desc: {
          fr: "Croissance moyenne constatée sur 6 mois.",
          en: "Average growth recorded over 6 months.",
          vi: "Tăng trưởng trung bình ghi nhận trong 6 tháng.",
        },
      },
      {
        metric: "TOP 10",
        label: { fr: "Mots-clés cibles", en: "Target keywords", vi: "Từ khóa mục tiêu" },
        desc: {
          fr: "Positionnement en première page Google.",
          en: "First page rankings on high-intent queries.",
          vi: "Thứ hạng trang nhất Google cho từ khóa chuyển đổi.",
        },
      },
      {
        metric: "0 €",
        label: {
          fr: "Coût par clic publicitaire",
          en: "Ad cost per click",
          vi: "Chi phí mỗi lượt click quảng cáo",
        },
        desc: {
          fr: "Trafic pérenne et autonome sans payer de régie.",
          en: "Evergreen traffic without paying ad networks.",
          vi: "Lưu lượng bền vững không phụ thuộc vào tiền quảng cáo.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Stratégie", en: "Strategy", vi: "Chiến lược" },
        us: {
          fr: "Approche sémantique moderne & axée conversion",
          en: "Modern semantic & conversion-focused approach",
          vi: "Tiếp cận ngữ nghĩa hiện đại & tập trung chuyển đổi",
        },
        them: {
          fr: "Bourrage de mots-clés obsolète",
          en: "Outdated keyword stuffing tactics",
          vi: "Nhồi nhét từ khóa lạc hậu",
        },
      },
      {
        feature: { fr: "Qualité des liens", en: "Link Quality", vi: "Chất lượng liên kết" },
        us: {
          fr: "Backlinks d'autorité dans des médias reconnus",
          en: "High-authority backlinks on real media sites",
          vi: "Backlink uy tín từ các trang truyền thông thực sự",
        },
        them: {
          fr: "Réseaux de sites artificiels (PBN risqués)",
          en: "Spammy low-quality link networks (risky PBN)",
          vi: "Hệ thống site vệ tinh rác (PBN rủi ro)",
        },
      },
      {
        feature: { fr: "Reporting", en: "Reporting", vi: "Báo cáo" },
        us: {
          fr: "Dashboard clair axé sur le chiffre d'affaires",
          en: "Clear dashboard focused on revenue & leads",
          vi: "Bảng điều khiển trực quan theo dõi doanh thu & lead",
        },
        them: {
          fr: "Fichiers Excel illisibles sans analyse",
          en: "Unreadable data dumps with no actionable insight",
          vi: "Báo cáo dữ liệu khô khan không có định hướng",
        },
      },
    ],
    plans: [
      {
        name: { fr: "SEO Local", en: "Local SEO", vi: "SEO Địa phương" },
        eur: 199,
        period: "month",
        features: [
          { fr: "Audit SEO complet", en: "Complete SEO audit", vi: "Kiểm toán SEO toàn diện" },
          { fr: "Optimisation on-page", en: "On-page optimisation", vi: "Tối ưu on-page" },
          {
            fr: "Google Business Profile",
            en: "Google Business Profile",
            vi: "Google Business Profile",
          },
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
          {
            fr: "Tout le SEO Local",
            en: "Everything in Local SEO",
            vi: "Toàn bộ gói SEO Địa phương",
          },
          {
            fr: "Netlinking premium",
            en: "Premium link building",
            vi: "Xây dựng liên kết cao cấp",
          },
          {
            fr: "Contenu optimisé (4 / mois)",
            en: "Optimised content (4 / month)",
            vi: "Nội dung tối ưu (4 bài / tháng)",
          },
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
          {
            fr: "Tout le SEO Boost",
            en: "Everything in SEO Boost",
            vi: "Toàn bộ gói SEO Tăng tốc",
          },
          { fr: "Stratégie nationale", en: "National strategy", vi: "Chiến lược toàn quốc" },
          { fr: "Contenu illimité", en: "Unlimited content", vi: "Nội dung không giới hạn" },
          { fr: "Backlinks premium", en: "Premium backlinks", vi: "Backlink cao cấp" },
          { fr: "Consultant dédié", en: "Dedicated consultant", vi: "Chuyên gia riêng" },
          { fr: "Appel hebdomadaire", en: "Weekly call", vi: "Cuộc gọi hàng tuần" },
        ],
      },
      {
        name: {
          fr: "Résidence Locale — annuel",
          en: "Local Residency — yearly",
          vi: "Gói Địa phương — theo năm",
        },
        audience: {
          fr: "2 mois offerts · entreprises locales",
          en: "2 months free · local businesses",
          vi: "Tặng 2 tháng · doanh nghiệp địa phương",
        },
        eur: 1700,
        period: "year",
        features: [
          {
            fr: "100 articles SEO optimisés",
            en: "100 optimised SEO articles",
            vi: "100 bài viết SEO tối ưu",
          },
          {
            fr: "Google Business Profile optimisé",
            en: "Optimised Google Business Profile",
            vi: "Tối ưu Google Business Profile",
          },
          { fr: "Citations locales", en: "Local citations", vi: "Trích dẫn địa phương" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
          { fr: "Support par e-mail", en: "Email support", vi: "Hỗ trợ qua e-mail" },
        ],
      },
      {
        name: {
          fr: "Empire National — annuel",
          en: "National Empire — yearly",
          vi: "Gói Toàn quốc — theo năm",
        },
        audience: {
          fr: "Saturation sectorielle complète",
          en: "Complete sector saturation",
          vi: "Bao phủ toàn ngành",
        },
        eur: 3300,
        period: "year",
        features: [
          { fr: "600+ articles SEO", en: "600+ SEO articles", vi: "Hơn 600 bài viết SEO" },
          {
            fr: "Stratégie nationale complète",
            en: "Complete national strategy",
            vi: "Chiến lược toàn quốc đầy đủ",
          },
          {
            fr: "Netlinking premium",
            en: "Premium link building",
            vi: "Xây dựng liên kết cao cấp",
          },
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
      {
        fr: "90 % des clics vont au TOP 3",
        en: "90% of clicks go to the TOP 3",
        vi: "90% lượt nhấp thuộc về TOP 3",
      },
      {
        fr: "+340 % d'appels en moyenne",
        en: "+340% calls on average",
        vi: "Trung bình +340% cuộc gọi",
      },
      {
        fr: "+500 % de demandes d'itinéraire",
        en: "+500% direction requests",
        vi: "+500% yêu cầu chỉ đường",
      },
      { fr: "Garantie TOP 3", en: "TOP 3 guarantee", vi: "Cam kết TOP 3" },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Audit Local & Périmètre",
          en: "Local Audit & Radius",
          vi: "Kiểm toán Địa phương & Bán kính",
        },
        desc: {
          fr: "Analyse précise de la zone de chalandise, des concurrents immédiats et des catégories sémantiques ciblées.",
          en: "Precise analysis of business catchment area, direct competitors and high-intent semantic categories.",
          vi: "Phân tích khu vực kinh doanh, đối thủ cạnh tranh trực tiếp và nhóm từ khóa trọng điểm.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Optimisation de la Fiche Google",
          en: "Google Profile Optimisation",
          vi: "Tối ưu Hồ sơ Google",
        },
        desc: {
          fr: "Remplissage exhaustif, géotagging des visuels HD, structuration des services et mot-clés d'ancrage local.",
          en: "Exhaustive profile setup, HD photo geotagging, service structure and local anchor keywords.",
          vi: "Thiết lập hồ sơ toàn diện, gắn thẻ vị trí ảnh HD, cấu trúc dịch vụ và từ khóa địa phương.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Citations & Réputation",
          en: "Citations & Reputation",
          vi: "Trích dẫn & Uy tín thương hiệu",
        },
        desc: {
          fr: "Inscription sur annuaires locaux de premier plan, uniformisation NAP et protocole de collecte d'avis 5 étoiles.",
          en: "Listing on tier-one local directories, NAP consistency and 5-star review acquisition protocol.",
          vi: "Đăng ký danh bạ địa phương uy tín, đồng bộ NAP và quy trình thu thập đánh giá 5 sao.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Entrée dans le TOP 3 Garanti",
          en: "Guaranteed TOP 3 Entry",
          vi: "Vào TOP 3 Cam kết",
        },
        desc: {
          fr: "Validation conjointe du classement TOP 3 en navigation privée et activation du contrat de suivi d'un an.",
          en: "Joint confirmation of TOP 3 rankings in incognito browsing and activation of 1-year monitoring.",
          vi: "Xác nhận thứ hạng TOP 3 ở chế độ duyệt ẩn danh và kích hoạt dịch vụ theo dõi 1 năm.",
        },
      },
    ],
    metrics: [
      {
        metric: "TOP 3",
        label: { fr: "Positionnement garanti", en: "Guaranteed ranking", vi: "Vị trí cam kết" },
        desc: {
          fr: "Contrat activé uniquement au résultat réel.",
          en: "Contract only starts once results are delivered.",
          vi: "Hợp đồng chỉ tính khi đạt kết quả thực tế.",
        },
      },
      {
        metric: "+340%",
        label: { fr: "Appels téléphoniques", en: "Inbound calls", vi: "Cuộc gọi đến" },
        desc: {
          fr: "Augmentation des appels directs depuis Google.",
          en: "Surge in direct calls from mobile Google Maps.",
          vi: "Tăng trưởng cuộc gọi trực tiếp từ Google Maps.",
        },
      },
      {
        metric: "90%",
        label: { fr: "Part de clics captés", en: "Clicks captured", vi: "Thị phần lượt nhấp" },
        desc: {
          fr: "Concentration des clics sur les 3 premiers résultats.",
          en: "Concentration of user clicks on the first 3 results.",
          vi: "Tập trung lượt nhấp vào 3 vị trí đầu tiên.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Garantie de résultat", en: "Outcome guarantee", vi: "Cam kết kết quả" },
        us: {
          fr: "Période d'un an comptabilisée dès le TOP 3 atteint",
          en: "1-year period starts only upon reaching TOP 3",
          vi: "Thời hạn 1 năm chỉ bắt đầu khi đạt TOP 3",
        },
        them: {
          fr: "Facturation mensuelle sans engagement de place",
          en: "Monthly billing with zero ranking commitment",
          vi: "Thu phí hàng tháng không cam kết thứ hạng",
        },
      },
      {
        feature: { fr: "Couverture géographique", en: "Geo Coverage", vi: "Bao phủ địa lý" },
        us: {
          fr: "Optimisation de l'ensemble de votre rayon de chalandise",
          en: "Optimisation across your entire catchment radius",
          vi: "Tối ưu toàn bộ bán kính khách hàng tiềm năng",
        },
        them: {
          fr: "Visibilité limitée à quelques mètres autour du local",
          en: "Visibility limited to a few meters from door",
          vi: "Tầm nhìn hạn chế chỉ gần cửa hàng",
        },
      },
      {
        feature: { fr: "Gestion des avis", en: "Review Strategy", vi: "Chiến lược đánh giá" },
        us: {
          fr: "Système proactif pour générer des avis authentiques",
          en: "Proactive system for authentic positive reviews",
          vi: "Quy trình chủ động nhận đánh giá tích cực thật",
        },
        them: {
          fr: "Aucun conseil ni suivi de la réputation",
          en: "Zero reputation monitoring or assistance",
          vi: "Không có hỗ trợ hay theo dõi danh tiếng",
        },
      },
    ],
    plans: [
      {
        name: {
          fr: "Google Maps TOP 3 Garanti",
          en: "Google Maps TOP 3 Guaranteed",
          vi: "Google Maps TOP 3 Cam kết",
        },
        audience: {
          fr: "Prix selon secteur, ville et concurrence — devis sous 24 h",
          en: "Price based on sector, city and competition — quote within 24h",
          vi: "Giá theo ngành, thành phố và mức cạnh tranh — báo giá trong 24 giờ",
        },
        eur: 999,
        period: "year",
        popular: true,
        features: [
          {
            fr: "Positionnement TOP 3 garanti",
            en: "Guaranteed TOP 3 positioning",
            vi: "Cam kết vị trí TOP 3",
          },
          {
            fr: "Optimisation complète de la fiche",
            en: "Complete profile optimisation",
            vi: "Tối ưu hồ sơ toàn diện",
          },
          {
            fr: "Gestion des avis clients",
            en: "Customer review management",
            vi: "Quản lý đánh giá khách hàng",
          },
          {
            fr: "Photos professionnelles optimisées",
            en: "Optimised professional photos",
            vi: "Hình ảnh chuyên nghiệp được tối ưu",
          },
          {
            fr: "Reporting mensuel détaillé",
            en: "Detailed monthly reporting",
            vi: "Báo cáo chi tiết hàng tháng",
          },
          {
            fr: "Sans engagement après 1 an",
            en: "No commitment after 1 year",
            vi: "Không ràng buộc sau 1 năm",
          },
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
      {
        fr: "+250 % d'engagement moyen",
        en: "+250% average engagement",
        vi: "Trung bình +250% tương tác",
      },
      {
        fr: "+180 % de portée organique",
        en: "+180% organic reach",
        vi: "+180% phạm vi tiếp cận tự nhiên",
      },
      { fr: "+85 % de nouveaux abonnés", en: "+85% new followers", vi: "+85% người theo dõi mới" },
      {
        fr: "Calendrier validé à l'avance",
        en: "Calendar approved in advance",
        vi: "Lịch nội dung được duyệt trước",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Stratégie & Piliers de Contenu",
          en: "Strategy & Content Pillars",
          vi: "Chiến lược & Trụ cột nội dung",
        },
        desc: {
          fr: "Définition de la ligne éditoriale, du ton de marque et de l'univers visuel pour capter votre audience idéale.",
          en: "Editorial line definition, brand tone and visual aesthetics tailored to capture your dream audience.",
          vi: "Định hình phong cách biên tập, giọng điệu thương hiệu và thẩm mỹ để thu hút đúng đối tượng.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Production Visuelle & Rédaction",
          en: "Visual Production & Copywriting",
          vi: "Sản xuất Hình ảnh & Nội dung",
        },
        desc: {
          fr: "Création de publications esthétiques haute résolution, carrousels éducatifs et scripts de formats courts.",
          en: "Crafting high-resolution visual posts, educational carousels and high-converting short-form scripts.",
          vi: "Sáng tạo bài đăng hình ảnh chất lượng cao, carousels hữu ích và kịch bản video ngắn.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Validation & Programmation",
          en: "Validation & Scheduling",
          vi: "Duyệt nội dung & Lên lịch",
        },
        desc: {
          fr: "Partage du calendrier mensuel à l'avance pour validation sereine et diffusion aux heures d'engagement maximal.",
          en: "Sharing the monthly calendar in advance for smooth approval and posting at peak engagement times.",
          vi: "Chia sẻ lịch tháng trước để bạn duyệt dễ dàng và đăng tải vào khung giờ tương tác cao nhất.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Modération & Analyse ROI",
          en: "Moderation & Analytics",
          vi: "Kiểm duyệt & Phân tích ROI",
        },
        desc: {
          fr: "Gestion des commentaires, interaction avec votre communauté et analyse détaillée des performances.",
          en: "Managing comments, building community affinity and providing in-depth performance reports.",
          vi: "Xử lý bình luận, tương tác cộng đồng và báo cáo hiệu quả chi tiết.",
        },
      },
    ],
    metrics: [
      {
        metric: "+250%",
        label: { fr: "Taux d'engagement", en: "Engagement rate", vi: "Tỷ lệ tương tác" },
        desc: {
          fr: "Multiplication des interactions et partages.",
          en: "Boosted interactions, saves and shares.",
          vi: "Gia tăng mạnh mẽ tương tác và chia sẻ.",
        },
      },
      {
        metric: "100%",
        label: { fr: "Validation préalable", en: "Advance approval", vi: "Duyệt trước 100%" },
        desc: {
          fr: "Zéro publication sans votre accord express.",
          en: "Zero posts published without your approval.",
          vi: "Không đăng tải khi chưa có sự đồng ý của bạn.",
        },
      },
      {
        metric: "3+",
        label: { fr: "Réseaux couverts", en: "Networks supported", vi: "Mạng xã hội hỗ trợ" },
        desc: {
          fr: "Instagram, LinkedIn, TikTok, Facebook.",
          en: "Instagram, LinkedIn, TikTok, Facebook.",
          vi: "Instagram, LinkedIn, TikTok, Facebook.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Direction artistique", en: "Art Direction", vi: "Chỉ đạo nghệ thuật" },
        us: {
          fr: "Design cinématique sur-mesure et soigné",
          en: "Bespoke cinematic aesthetics & copywriting",
          vi: "Thiết kế cinématique riêng biệt & trau chuốt",
        },
        them: {
          fr: "Visuels génériques sans valeur perçue",
          en: "Generic Canva templates without soul",
          vi: "Hình ảnh đại trà thiếu bản sắc",
        },
      },
      {
        feature: { fr: "Régularité", en: "Consistency", vi: "Độ đều đặn" },
        us: {
          fr: "Planification rigoureuse et zéro oubli",
          en: "Rigorous planning with zero missed slots",
          vi: "Lên kế hoạch chuẩn chỉ không bỏ sót lịch",
        },
        them: {
          fr: "Publications aléatoires de dernière minute",
          en: "Random last-minute inconsistent posts",
          vi: "Đăng bài tùy hứng và thất thường",
        },
      },
      {
        feature: { fr: "Écoute communauté", en: "Community care", vi: "Chăm sóc cộng đồng" },
        us: {
          fr: "Modération active et réponses bienveillantes",
          en: "Active moderation and prompt responses",
          vi: "Kiểm duyệt chủ động và phản hồi thân thiện",
        },
        them: {
          fr: "Commentaires laissés sans réponse",
          en: "Comments ignored and unmoderated",
          vi: "Bình luận bị bỏ quên không ai trả lời",
        },
      },
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
          {
            fr: "Modération des commentaires",
            en: "Comment moderation",
            vi: "Kiểm duyệt bình luận",
          },
          {
            fr: "Reporting bimensuel",
            en: "Bi-monthly reporting",
            vi: "Báo cáo hai lần mỗi tháng",
          },
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
          {
            fr: "3 réseaux sociaux et plus",
            en: "3+ social networks",
            vi: "Từ 3 mạng xã hội trở lên",
          },
          {
            fr: "Vidéos courtes (Reels / TikTok)",
            en: "Short videos (Reels / TikTok)",
            vi: "Video ngắn (Reels / TikTok)",
          },
          { fr: "Gestion des publicités", en: "Paid ads management", vi: "Quản lý quảng cáo" },
          {
            fr: "Partenariats influenceurs",
            en: "Influencer partnerships",
            vi: "Hợp tác người ảnh hưởng",
          },
          {
            fr: "Account manager dédié",
            en: "Dedicated account manager",
            vi: "Quản lý tài khoản riêng",
          },
          {
            fr: "Appel stratégique mensuel",
            en: "Monthly strategy call",
            vi: "Cuộc gọi chiến lược hàng tháng",
          },
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
      {
        fr: "Intervention en moins de 4 h",
        en: "Response in under 4h",
        vi: "Can thiệp trong dưới 4 giờ",
      },
      {
        fr: "Engagement annuel = 2 mois offerts",
        en: "Yearly commitment = 2 months free",
        vi: "Cam kết theo năm = tặng 2 tháng",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Audit & Sécurisation Initiale",
          en: "Audit & Hardening",
          vi: "Kiểm toán & Gia cố bảo mật",
        },
        desc: {
          fr: "Vérification des vulnérabilités, mise en place des certificats SSL et configuration des pare-feux.",
          en: "Vulnerability scanning, SSL certificate deployment and firewall hardening.",
          vi: "Quét lỗ hổng, triển khai chứng chỉ SSL và cấu hình tường lửa.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Surveillance Active 24/7",
          en: "24/7 Active Monitoring",
          vi: "Giám sát Chủ động 24/7",
        },
        desc: {
          fr: "Sondes temps réel pour détecter immédiatement toute indisponibilité, anomalie ou tentative d'intrusion.",
          en: "Real-time probes to instantly detect downtime, performance drops or intrusion attempts.",
          vi: "Bộ cảm biến theo thời gian thực để phát hiện ngay sự cố gián đoạn hay xâm nhập.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Sauvegardes & Mises à Jour",
          en: "Backups & Routine Updates",
          vi: "Sao lưu & Cập nhật định kỳ",
        },
        desc: {
          fr: "Snapshots réguliers stockés sur serveurs sécurisés hors-site et application contrôlée des patchs.",
          en: "Regular off-site encrypted snapshots and controlled security patch rollouts.",
          vi: "Bản sao lưu mã hóa định kỳ lưu trên máy chủ an toàn và cập nhật bản vá bảo mật.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Assistance & Évolution",
          en: "Assistance & Content Edits",
          vi: "Hỗ trợ & Nâng cấp nội dung",
        },
        desc: {
          fr: "Prise en charge de vos modifications de textes, images et ajustements techniques avec un SLA prioritaire.",
          en: "Handling your text edits, images and technical upgrades under strict priority SLAs.",
          vi: "Hỗ trợ thay đổi nội dung, hình ảnh và kỹ thuật theo cam kết thời gian nhanh nhất.",
        },
      },
    ],
    metrics: [
      {
        metric: "99.9%",
        label: { fr: "Disponibilité serveur", en: "Server uptime", vi: "Thời gian hoạt động" },
        desc: {
          fr: "Infrastructure cloud haute résilience.",
          en: "High-resilience cloud infrastructure.",
          vi: "Hạ tầng đám mây độ tin cậy cao.",
        },
      },
      {
        metric: "< 4h",
        label: { fr: "Délai d'intervention", en: "Response time", vi: "Thời gian phản hồi" },
        desc: {
          fr: "Prise en charge rapide pour les forfaits Pro.",
          en: "Fast emergency turnaround for Pro tiers.",
          vi: "Xử lý khẩn cấp nhanh chóng cho gói Pro.",
        },
      },
      {
        metric: "100%",
        label: {
          fr: "Sauvegardes automatiques",
          en: "Automated backups",
          vi: "Sao lưu tự động 100%",
        },
        desc: {
          fr: "Restauration en un clic en cas d'incident.",
          en: "One-click rollback in case of any incident.",
          vi: "Khôi phục một chạm khi có bất kỳ sự cố nào.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Temps de réaction", en: "Reaction time", vi: "Thời gian xử lý" },
        us: {
          fr: "Intervention sous 4h à 24h avec SLA clair",
          en: "Turnaround in under 4h to 24h with clear SLA",
          vi: "Xử lý trong 4h đến 24h với cam kết rõ ràng",
        },
        them: {
          fr: "Délais incertains de plusieurs jours",
          en: "Uncertain delays lasting several days",
          vi: "Thời gian chậm trễ kéo dài nhiều ngày",
        },
      },
      {
        feature: { fr: "Sauvegardes", en: "Backups", vi: "Sao lưu" },
        us: {
          fr: "Sauvegardes quotidiennes externalisées",
          en: "Daily isolated off-site backups",
          vi: "Sao lưu tự động hàng ngày độc lập",
        },
        them: {
          fr: "Aucune sauvegarde ou hébergée au même endroit",
          en: "No backups or stored on the same broken server",
          vi: "Không có sao lưu hoặc lưu cùng máy chủ hỏng",
        },
      },
      {
        feature: { fr: "Inclus", en: "Inclusions", vi: "Quyền lợi bao gồm" },
        us: {
          fr: "Modifications de contenu et support inclus",
          en: "Content updates and continuous support included",
          vi: "Bao gồm chỉnh sửa nội dung và hỗ trợ liên tục",
        },
        them: {
          fr: "Facturation au tarif horaire à chaque demande",
          en: "High hourly rate billed for every small request",
          vi: "Thu phí theo giờ cho từng yêu cầu nhỏ",
        },
      },
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
          {
            fr: "+1 article SEO par mois",
            en: "+1 SEO article per month",
            vi: "+1 bài viết SEO mỗi tháng",
          },
          { fr: "SLA prioritaire", en: "Priority SLA", vi: "SLA ưu tiên" },
        ],
      },
      {
        name: {
          fr: "Infrastructure annuelle",
          en: "Yearly Infrastructure",
          vi: "Hạ tầng theo năm",
        },
        audience: {
          fr: "Hébergement + domaine + SSL + e-mails",
          en: "Hosting + domain + SSL + emails",
          vi: "Lưu trữ + tên miền + SSL + e-mail",
        },
        eur: 79,
        period: "year",
        features: [
          {
            fr: "Hébergement haute performance",
            en: "High-performance hosting",
            vi: "Lưu trữ hiệu suất cao",
          },
          { fr: "Nom de domaine inclus", en: "Domain name included", vi: "Bao gồm tên miền" },
          {
            fr: "Certificat SSL (HTTPS)",
            en: "SSL certificate (HTTPS)",
            vi: "Chứng chỉ SSL (HTTPS)",
          },
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
      {
        fr: "90 % des questions résolues",
        en: "90% of questions resolved",
        vi: "Giải quyết 90% câu hỏi",
      },
      { fr: "Réponse en moins de 3 s", en: "Response in under 3s", vi: "Phản hồi dưới 3 giây" },
      {
        fr: "Site, WhatsApp, Messenger, Instagram",
        en: "Website, WhatsApp, Messenger, Instagram",
        vi: "Website, WhatsApp, Messenger, Instagram",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Cartographie & Base de Connaissances",
          en: "Knowledge Base Mapping",
          vi: "Khảo sát & Cơ sở tri thức",
        },
        desc: {
          fr: "Collecte de vos FAQ, tarifs, règles commerciales et spécificités métiers pour alimenter le modèle d'IA.",
          en: "Collecting FAQs, service rates, business rules and tone of voice to train the custom AI model.",
          vi: "Thu thập FAQ, bảng giá, quy tắc kinh doanh để huấn luyện mô hình AI riêng.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Entraînement & Personnalisation",
          en: "Training & Tailoring",
          vi: "Huấn luyện & Tùy chỉnh",
        },
        desc: {
          fr: "Configuration du ton de marque, des garde-fous de sécurité et des scénarios de qualification de leads.",
          en: "Setting brand persona, security guardrails and high-converting lead qualification workflows.",
          vi: "Thiết lập giọng điệu thương hiệu, rào chắn an toàn và kịch bản thu thập khách hàng tiềm năng.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Intégration Omnicanale & CRM",
          en: "Omnichannel & CRM Connection",
          vi: "Tích hợp Đa kênh & CRM",
        },
        desc: {
          fr: "Déploiement sur votre site, WhatsApp, Messenger, Instagram et synchronisation calendrier/CRM.",
          en: "Deployment across website, WhatsApp, Messenger, Instagram and calendar/CRM synchronization.",
          vi: "Triển khai lên website, WhatsApp, Messenger, Instagram và đồng bộ lịch hẹn/CRM.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Optimisation & Supervision",
          en: "Optimization & Supervision",
          vi: "Tối ưu hóa & Giám sát",
        },
        desc: {
          fr: "Analyse des conversations, amélioration continue des réponses et supervision humaine des cas complexes.",
          en: "Conversation auditing, continuous prompt enhancement and human handover for edge cases.",
          vi: "Phân tích hội thoại, liên tục hoàn thiện câu trả lời và chuyển tiếp người thật cho ca khó.",
        },
      },
    ],
    metrics: [
      {
        metric: "24/7",
        label: {
          fr: "Disponibilité continue",
          en: "24/7 Availability",
          vi: "Hoạt động liên tục 24/7",
        },
        desc: {
          fr: "Zéro prospect perdu hors des heures de bureau.",
          en: "Zero lost leads outside standard business hours.",
          vi: "Không bỏ lỡ khách hàng ngoài giờ hành chính.",
        },
      },
      {
        metric: "< 3s",
        label: { fr: "Temps de réponse", en: "Response speed", vi: "Tốc độ phản hồi" },
        desc: {
          fr: "Réponses immédiates et fluides.",
          en: "Instant, natural, fluid responses.",
          vi: "Phản hồi tức thì, tự nhiên và chuẩn xác.",
        },
      },
      {
        metric: "90%",
        label: { fr: "Demandes résolues", en: "Resolution rate", vi: "Tỷ lệ xử lý tự động" },
        desc: {
          fr: "Traitement autonome des questions récurrentes.",
          en: "Autonomous resolution of standard questions.",
          vi: "Tự động giải quyết các câu hỏi phổ biến.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Technologie", en: "Technology", vi: "Công nghệ" },
        us: {
          fr: "IA générative moderne & raisonnement contextuel",
          en: "Modern generative AI with deep context awareness",
          vi: "AI tạo sinh hiện đại có khả năng hiểu ngữ cảnh",
        },
        them: {
          fr: "Chatbot par boutons rigide et frustrant",
          en: "Rigid button-based chatbot that loops endlessly",
          vi: "Chatbot dạng nút bấm cứng nhắc và gây bực bội",
        },
      },
      {
        feature: { fr: "Connectivité", en: "Connectivity", vi: "Kết nối" },
        us: {
          fr: "Intégration directe WhatsApp, CRM et Calendrier",
          en: "Direct WhatsApp, CRM and calendar integration",
          vi: "Kết nối trực tiếp WhatsApp, CRM và lịch hẹn",
        },
        them: {
          fr: "Widget isolé sans synchronisation de données",
          en: "Isolated widget with zero lead syncing",
          vi: "Widget đơn lẻ không đồng bộ dữ liệu",
        },
      },
      {
        feature: { fr: "Multilingue", en: "Multilingual", vi: "Đa ngôn ngữ" },
        us: {
          fr: "Traduction et dialogue instantanés (FR, EN, VI...)",
          en: "Instant fluent multilingual dialogue (FR, EN, VI...)",
          vi: "Hội thoại đa ngôn ngữ tự nhiên tức thì (FR, EN, VI...)",
        },
        them: {
          fr: "Limité à une seule langue prédéfinie",
          en: "Restricted to a single preset language",
          vi: "Hạn chế chỉ trong một ngôn ngữ định sẵn",
        },
      },
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
        name: {
          fr: "IA Assistance Avancée",
          en: "Advanced AI Assistance",
          vi: "Trợ lý AI Nâng cao",
        },
        eur: 999,
        period: "month",
        popular: true,
        features: [
          {
            fr: "IA conversationnelle avancée",
            en: "Advanced conversational AI",
            vi: "AI hội thoại nâng cao",
          },
          {
            fr: "Multilingue automatique",
            en: "Automatic multilingual support",
            vi: "Đa ngôn ngữ tự động",
          },
          { fr: "Intégration CRM", en: "CRM integration", vi: "Tích hợp CRM" },
          { fr: "Prise de rendez-vous", en: "Appointment booking", vi: "Đặt lịch hẹn" },
          { fr: "Analytics détaillés", en: "Detailed analytics", vi: "Phân tích chi tiết" },
          {
            fr: "WhatsApp et Messenger",
            en: "WhatsApp and Messenger",
            vi: "WhatsApp và Messenger",
          },
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
    image: pf01,
  },
  {
    plate: "02",
    name: "Villa Azur",
    sector: {
      fr: "Hôtel boutique · Nice",
      en: "Boutique hotel · Nice",
      vi: "Khách sạn boutique · Nice",
    },
    result: { fr: "+240 % en direct", en: "+240% direct", vi: "+240% đặt trực tiếp" },
    tags: ["Website", "SEO Pro", "Branding"],
    image: pf02,
  },
  {
    plate: "03",
    name: "Noir & Or",
    sector: {
      fr: "Retail de luxe · Global",
      en: "Luxury retail · Global",
      vi: "Bán lẻ xa xỉ · Toàn cầu",
    },
    result: { fr: "6 chiffres au T1", en: "6 figures in Q1", vi: "Doanh thu 6 chữ số quý I" },
    tags: ["E-commerce", "SEO", "Ads"],
    image: pf03,
  },
  {
    plate: "04",
    name: "Cabinet Mercier",
    sector: {
      fr: "Cabinet d'avocats · Paris",
      en: "Law firm · Paris",
      vi: "Văn phòng luật · Paris",
    },
    result: { fr: "TOP 1 SEO", en: "TOP 1 SEO", vi: "TOP 1 SEO" },
    tags: ["Website", "Branding", "SEO"],
    image: pf04,
  },
  {
    plate: "05",
    name: "Élan Studio",
    sector: {
      fr: "Studio créatif · Berlin",
      en: "Creative studio · Berlin",
      vi: "Studio sáng tạo · Berlin",
    },
    result: { fr: "Awwwards", en: "Awwwards", vi: "Awwwards" },
    tags: ["Brand identity", "Website"],
    image: pf05,
  },
  {
    plate: "06",
    name: "Zen Retreat",
    sector: { fr: "Hôtel spa · Bali", en: "Spa hotel · Bali", vi: "Khách sạn spa · Bali" },
    result: { fr: "Conciergerie IA 24/7", en: "24/7 AI concierge", vi: "Lễ tân AI 24/7" },
    tags: ["Website", "AI"],
    image: pf06,
  },
  {
    plate: "07",
    name: "Lumina Digital",
    sector: {
      fr: "Tech & SaaS · Lisbonne",
      en: "Tech & SaaS · Lisbon",
      vi: "Công nghệ & SaaS · Lisbon",
    },
    result: { fr: "+320 % de leads", en: "+320% leads", vi: "+320% khách hàng tiềm năng" },
    tags: ["Website", "SEO", "AI"],
    image: pf07,
  },
  {
    plate: "08",
    name: "Neo Gear",
    sector: {
      fr: "E-commerce · Dubaï",
      en: "E-commerce · Dubai",
      vi: "Thương mại điện tử · Dubai",
    },
    result: {
      fr: "×2,4 sur le panier moyen",
      en: "2.4× average basket",
      vi: "Giá trị giỏ hàng ×2,4",
    },
    tags: ["E-commerce", "Branding", "Ads"],
    image: pf08,
  },
  {
    plate: "09",
    name: "Synth OS",
    sector: {
      fr: "Studio produit · Berlin",
      en: "Product studio · Berlin",
      vi: "Studio sản phẩm · Berlin",
    },
    result: {
      fr: "Identité complète en 6 semaines",
      en: "Full identity in 6 weeks",
      vi: "Bộ nhận diện hoàn chỉnh trong 6 tuần",
    },
    tags: ["Brand identity", "Website", "Social"],
    image: pf09,
  },
];

export const TESTIMONIALS = [
  {
    num: "01",
    rating: 5,
    city: "Torino, IT",
    date: { fr: "Mars 2025", en: "March 2025", vi: "Tháng 3/2025" },
    brand: "Pininfarina",
    field: {
      fr: "Ingénierie & Performance",
      en: "Engineering & Performance",
      vi: "Kỹ thuật & Hiệu năng",
    },
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
    rating: 5,
    city: "Singapore, SG",
    date: { fr: "Janvier 2025", en: "January 2025", vi: "Tháng 1/2025" },
    brand: "Aman Resorts",
    field: {
      fr: "Expérience & Réservation",
      en: "Experience & Booking",
      vi: "Trải nghiệm & Đặt phòng",
    },
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
    rating: 5,
    city: "Montreux, CH",
    date: { fr: "Février 2025", en: "February 2025", vi: "Tháng 2/2025" },
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
    rating: 5,
    city: "New York, US",
    date: { fr: "Avril 2025", en: "April 2025", vi: "Tháng 4/2025" },
    brand: "Bespoke Real Estate",
    field: {
      fr: "Immobilier ultra-luxe",
      en: "Ultra-luxury real estate",
      vi: "Bất động sản siêu sang",
    },
    quote: {
      fr: "« Notre marque reflète enfin l'exclusivité des biens que nous représentons. »",
      en: "“Our brand finally reflects the exclusivity of the properties we represent.”",
      vi: "“Thương hiệu của chúng tôi cuối cùng đã phản ánh đúng sự độc quyền của các bất động sản mà chúng tôi đại diện.”",
    },
    author: "James Wellington",
    role: { fr: "Fondateur & CEO", en: "Founder & CEO", vi: "Nhà sáng lập & CEO" },
  },
  {
    num: "05",
    rating: 5,
    city: "Đà Nẵng, VN",
    date: { fr: "Mai 2025", en: "May 2025", vi: "Tháng 5/2025" },
    brand: "Maison Lumière",
    field: {
      fr: "Gastronomie & Réservation",
      en: "Fine dining & Booking",
      vi: "Ẩm thực & Đặt bàn",
    },
    quote: {
      fr: "« Trois semaines après la mise en ligne, nous étions complets tous les week-ends. Le TOP 3 Google Maps a tout changé. »",
      en: "“Three weeks after launch we were fully booked every weekend. The Google Maps TOP 3 changed everything.”",
      vi: "“Ba tuần sau khi ra mắt, chúng tôi kín chỗ mỗi cuối tuần. TOP 3 Google Maps đã thay đổi tất cả.”",
    },
    author: "Élodie Renaud",
    role: { fr: "Propriétaire", en: "Owner", vi: "Chủ nhà hàng" },
  },
  {
    num: "06",
    rating: 5,
    city: "Dubaï, AE",
    date: { fr: "Juin 2025", en: "June 2025", vi: "Tháng 6/2025" },
    brand: "Neo Gear",
    field: {
      fr: "E-commerce & Conversion",
      en: "E-commerce & Conversion",
      vi: "Thương mại điện tử & Chuyển đổi",
    },
    quote: {
      fr: "« Panier moyen multiplié par 2,4 en un trimestre. L'équipe livre vite, propre, sans jamais rogner sur le détail. »",
      en: "“Average basket 2.4× in a single quarter. The team ships fast, clean, and never cuts corners on detail.”",
      vi: "“Giá trị giỏ hàng tăng 2,4 lần chỉ trong một quý. Đội ngũ bàn giao nhanh, sạch sẽ và không bao giờ cắt xén chi tiết.”",
    },
    author: "Karim Haddad",
    role: {
      fr: "Directeur e-commerce",
      en: "E-commerce Director",
      vi: "Giám đốc Thương mại điện tử",
    },
  },
];
