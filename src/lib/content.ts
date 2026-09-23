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
  cities: "France · Asie · International",
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
        fr: "Architecture optimisée et suivi des performances",
        en: "Architecture optimisée PageSpeed score",
        vi: "Điểm PageSpeed Architecture optimisée",
      },
      { fr: "Optimisation des performances et des médias", en: "Under 2s load time", vi: "Tải trang dưới 2 giây" },
      { fr: "Expérience multi-secteurs", en: "Multi-projets websites delivered", vi: "Hơn 200 website đã bàn giao" },
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
          fr: "Intégration d'architectures ultra-rapides, animations fluides et score Google PageSpeed Architecture optimisée.",
          en: "Ultra-fast architecture engineering, smooth animations and Architecture optimisée Google PageSpeed score.",
          vi: "Lập trình kiến trúc siêu nhanh, hiệu ứng mượt mà và đạt điểm Google PageSpeed Architecture optimisée.",
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
        metric: "Architecture optimisée",
        label: { fr: "Score PageSpeed", en: "PageSpeed Score", vi: "Điểm PageSpeed" },
        desc: {
          fr: "Chargement ultra-rapide sur mobile et desktop.",
          en: "Ultra-fast loading on mobile and desktop.",
          vi: "Tải trang siêu tốc trên di động và máy tính.",
        },
      },
      {
        metric: "Selon environnement et contenu",
        label: { fr: "Temps d'affichage", en: "Display speed", vi: "Tốc độ hiển thị" },
        desc: {
          fr: "Zéro latence pour maximiser la rétention utilisateur.",
          en: "Zero latency to maximize visitor retention.",
          vi: "Không độ trễ để tối đa hóa giữ chân khách.",
        },
      },
      {
        metric: "Objectif de conversion à définir",
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
            en: "Extra language: +$130 / language",
            vi: "Thêm ngôn ngữ: +2.200.000 ₫ / ngôn ngữ",
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
            en: "Extra language: +$130 / language",
            vi: "Thêm ngôn ngữ: +2.200.000 ₫ / ngôn ngữ",
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
          fr: "À partir de 1 499 € — selon le nombre de produits",
          en: "From $1,943 — depending on the number of products",
          vi: "Từ 32.978.000 ₫ — tùy theo số lượng sản phẩm",
        },
        eur: 1499,
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
            en: "Option: multilingual +$130 / language",
            vi: "Tùy chọn: đa ngôn ngữ +2.200.000 ₫ / ngôn ngữ",
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
      fr: "Référencement SEO",
      en: "SEO Optimization",
      vi: "Tối ưu hóa SEO",
    },
    short: {
      fr: "Visibilité durable sur Google pour attirer vos clients.",
      en: "Sustainable Google visibility to attract your clients.",
      vi: "Hiển thị bền vững trên Google để thu hút khách hàng.",
    },
    description: {
      fr: "Une stratégie SEO pédagogique et transparente. Nous ne parlons pas technique, nous travaillons votre visibilité sur le long terme pour que les bonnes personnes vous trouvent au bon moment sur Google.",
      en: "An educational and transparent SEO strategy. We don't use technical jargon, we build your long-term visibility so the right people find you at the right time.",
      vi: "Chiến lược SEO minh bạch, dễ hiểu. Tập trung vào sự hiển thị dài hạn để khách hàng lý tưởng tìm thấy bạn đúng lúc.",
    },
    fromEur: 299,
    fromPeriod: "month",
    highlights: [
      {
        fr: "Acquisition organique à développer",
        en: "Organic acquisition to develop",
        vi: "Phát triển lưu lượng tự nhiên",
      },
      { fr: "Objectif de positionnement", en: "Positioning objective", vi: "Mục tiêu định vị" },
      {
        fr: "Contenus SEO ciblés",
        en: "Targeted SEO content",
        vi: "Nội dung SEO mục tiêu",
      },
      {
        fr: "Suivi technique selon formule",
        en: "Technical monitoring according to plan",
        vi: "Giám sát kỹ thuật theo gói",
      },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Audit & Mots-clés (Fondations)",
          en: "Audit & Keywords (Foundations)",
          vi: "Kiểm toán & Từ khóa (Nền tảng)",
        },
        desc: {
          fr: "CE QUE NOUS FAISONS : Analyse de votre site et sélection des termes recherchés par vos clients. POURQUOI : Pour construire sur des bases saines. CE QUE CELA APPORTE : Vous ciblez exactement ce que les gens tapent sur Google.",
          en: "WHAT WE DO: Site analysis and keyword selection based on client searches. WHY: To build on a solid foundation. THE BENEFIT: You target exactly what people are typing into Google.",
          vi: "CHÚNG TÔI LÀM GÌ: Phân tích trang và chọn từ khóa khách hàng tìm kiếm. TẠI SAO: Xây dựng nền tảng vững chắc. LỢI ÍCH: Nhắm trúng những gì mọi người thực sự gõ trên Google.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Optimisation de votre site",
          en: "Website Optimization",
          vi: "Tối ưu hóa Website",
        },
        desc: {
          fr: "CE QUE NOUS FAISONS : Amélioration des textes, des titres et de la structure des pages. POURQUOI : Google doit comprendre de quoi parle votre site. CE QUE CELA APPORTE : Un site qui plait à Google et qui convertit mieux vos visiteurs.",
          en: "WHAT WE DO: Improving texts, titles, and page structure. WHY: Google needs to understand what your site is about. THE BENEFIT: A site that Google likes and that converts visitors better.",
          vi: "CHÚNG TÔI LÀM GÌ: Cải thiện văn bản, tiêu đề và cấu trúc trang. TẠI SAO: Giúp Google hiểu trang web của bạn. LỢI ÍCH: Một trang web được Google ưu ái và chuyển đổi tốt hơn.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Création d'Autorité (Liens)",
          en: "Building Authority (Links)",
          vi: "Xây dựng Thẩm quyền (Liên kết)",
        },
        desc: {
          fr: "CE QUE NOUS FAISONS : Obtention de liens depuis d'autres sites vers le vôtre. POURQUOI : C'est comme des votes de confiance pour Google. CE QUE CELA APPORTE : Votre site gagne en crédibilité et remonte dans les résultats de recherche.",
          en: "WHAT WE DO: Earning links from other sites to yours. WHY: They act as votes of confidence for Google. THE BENEFIT: Your site gains credibility and climbs higher in search results.",
          vi: "CHÚNG TÔI LÀM GÌ: Lấy liên kết từ các trang khác về trang của bạn. TẠI SAO: Chúng như những lá phiếu tín nhiệm. LỢI ÍCH: Trang web tăng uy tín và vươn lên cao hơn trong kết quả tìm kiếm.",
        },
      },
      {
        num: "04",
        title: {
          fr: "Suivi Continu & Ajustements",
          en: "Continuous Tracking & Tweaks",
          vi: "Theo dõi Liên tục & Điều chỉnh",
        },
        desc: {
          fr: "CE QUE NOUS FAISONS : Rapports réguliers et évolution de la stratégie selon les résultats. POURQUOI : Le SEO est une course de fond, pas un sprint. CE QUE CELA APPORTE : Une croissance organique sécurisée sur le long terme.",
          en: "WHAT WE DO: Regular reports and strategy evolution based on data. WHY: SEO is a marathon, not a sprint. THE BENEFIT: Secure, long-term organic growth.",
          vi: "CHÚNG TÔI LÀM GÌ: Báo cáo định kỳ và điều chỉnh chiến lược. TẠI SAO: SEO là cuộc chạy marathon, không phải chạy nước rút. LỢI ÍCH: Tăng trưởng tự nhiên, an toàn và dài hạn.",
        },
      },
    ],
    metrics: [
      {
        metric: "Selon objectifs",
        label: { fr: "Trafic organique", en: "Organic traffic", vi: "Lưu lượng tự nhiên" },
        desc: {
          fr: "Croissance moyenne constatée sur 6 mois.",
          en: "Average growth recorded over 6 months.",
          vi: "Tăng trưởng trung bình ghi nhận trong 6 tháng.",
        },
      },
      {
        metric: "Objectif de positionnement",
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
        eur: 389,
        period: "month",
        features: [
          { fr: "Amélioration de la visibilité auprès des clients proches", en: "Better visibility with nearby clients", vi: "Cải thiện hiển thị với khách hàng gần" },
          { fr: "Optimisation du référencement pour votre ville/région", en: "SEO optimization for your city/region", vi: "Tối ưu hóa SEO cho thành phố/khu vực" },
          { fr: "Travail sur les mots-clés de proximité", en: "Work on proximity keywords", vi: "Nhắm từ khóa dựa trên vị trí" },
          { fr: "Optimisation des pages de votre site", en: "On-site page optimization", vi: "Tối ưu hóa các trang trên website" },
          { fr: "Suivi de votre présence sur Google", en: "Tracking your Google presence", vi: "Theo dõi hiển thị trên Google" },
          { fr: "Reporting mensuel simplifié", en: "Simplified monthly reporting", vi: "Báo cáo hàng tháng dễ hiểu" },
        ],
      },
      {
        name: { fr: "SEO Boost", en: "SEO Boost", vi: "SEO Tăng tốc" },
        eur: 649,
        period: "month",
        popular: true,
        features: [
          { fr: "Idéal pour cibler un marché plus large (national/régional)", en: "Ideal for a broader market (national/regional)", vi: "Tuyệt vời để tiếp cận thị trường rộng lớn hơn" },
          { fr: "Tout ce qui est inclus dans SEO Local", en: "Everything included in Local SEO", vi: "Mọi thứ trong gói SEO Địa phương" },
          { fr: "Création de contenus optimisés réguliers", en: "Creation of regular optimized content", vi: "Tạo nội dung tối ưu hóa thường xuyên" },
          { fr: "Acquisition de liens (Autorité)", en: "Link acquisition (Authority building)", vi: "Xây dựng liên kết (Tăng thẩm quyền)" },
          { fr: "Analyse des concurrents principaux", en: "Main competitors analysis", vi: "Phân tích đối thủ chính" },
          { fr: "Ajustement stratégique continu", en: "Continuous strategic adjustment", vi: "Điều chỉnh chiến lược liên tục" },
        ],
      },
      {
        name: { fr: "SEO Pro", en: "SEO Pro", vi: "SEO Pro" },
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
    title: { fr: "Google Maps Top 3", en: "Google Maps Top 3", vi: "Google Maps Top 3" },
    short: { fr: "Visibilité locale, Google Business Profile, avis et signaux territoriaux.", en: "Local visibility, Google Business Profile, reviews and local signals.", vi: "Hiển thị địa phương, Google Business Profile, đánh giá và tín hiệu địa phương." },
    description: { fr: "Nous accompagnons votre établissement pour viser le Top 3 Google Maps. La stratégie est construite sur mesure selon votre positionnement actuel, votre zone, la concurrence et les mots-clés ciblés.", en: "A custom local visibility strategy built around your current position, area, competition and target keywords.", vi: "Chiến lược hiển thị địa phương được thiết kế theo vị trí hiện tại, khu vực, cạnh tranh và từ khóa mục tiêu." },
    fromEur: 990,
    fromPeriod: "year",
    premium: true,
    highlights: [
      { fr: "À partir de 990 € / an", en: "From €990 / year", vi: "Từ 990 € / năm" },
      { fr: "Tarification sur mesure", en: "Custom pricing", vi: "Báo giá theo nhu cầu" },
      { fr: "Mots-clés et zone ciblés", en: "Targeted keywords and area", vi: "Từ khóa và khu vực mục tiêu" },
      { fr: "Objectif Top 3 · sans garantie de position", en: "Top 3 objective · no position guarantee", vi: "Mục tiêu Top 3 · không đảm bảo vị trí" },
    ],
    steps: [
      { num: "01", title: { fr: "Audit local & positionnement", en: "Local audit & positioning", vi: "Audit địa phương & định vị" }, desc: { fr: "Analyse de votre position actuelle, zone de chalandise, catégories et concurrence.", en: "Analysis of your current position, area, categories and competition.", vi: "Phân tích vị trí hiện tại, khu vực, danh mục và cạnh tranh." } },
      { num: "02", title: { fr: "Google Business Profile", en: "Google Business Profile", vi: "Google Business Profile" }, desc: { fr: "Optimisation des catégories, services, description, informations et signaux locaux.", en: "Optimisation of categories, services, description, business information and local signals.", vi: "Tối ưu danh mục, dịch vụ, mô tả, thông tin và tín hiệu địa phương." } },
      { num: "03", title: { fr: "Mots-clés & réputation", en: "Keywords & reputation", vi: "Từ khóa & uy tín" }, desc: { fr: "Cartographie des requêtes prioritaires et accompagnement sur une stratégie d'avis authentiques.", en: "Priority keyword mapping and guidance for an authentic review strategy.", vi: "Lập bản đồ từ khóa ưu tiên và hướng dẫn chiến lược đánh giá xác thực." } },
      { num: "04", title: { fr: "Suivi & ajustements", en: "Monitoring & adjustments", vi: "Theo dõi & điều chỉnh" }, desc: { fr: "Suivi du positionnement et ajustements selon l'évolution de la concurrence et de la zone.", en: "Position monitoring and adjustments as competition and local conditions evolve.", vi: "Theo dõi vị trí và điều chỉnh theo cạnh tranh và điều kiện địa phương." } },
    ],
    plans: [{
      name: { fr: "Google Maps Top 3 · Sur mesure", en: "Google Maps Top 3 · Custom", vi: "Google Maps Top 3 · Theo nhu cầu" },
      audience: { fr: "À partir de 990 € / an · devis personnalisé", en: "From €990 / year · custom quote", vi: "Từ 990 € / năm · báo giá riêng" },
      eur: 990,
      period: "year",
      popular: true,
      features: [
        { fr: "Audit initial de la présence locale", en: "Initial local presence audit", vi: "Audit hiện diện địa phương ban đầu" },
        { fr: "Optimisation Google Business Profile", en: "Google Business Profile optimisation", vi: "Tối ưu Google Business Profile" },
        { fr: "Mapping des mots-clés et zones", en: "Keyword and area mapping", vi: "Lập bản đồ từ khóa và khu vực" },
        { fr: "Conseils de stratégie d'avis authentiques", en: "Authentic review strategy guidance", vi: "Hướng dẫn chiến lược đánh giá xác thực" },
        { fr: "Suivi et ajustements selon la formule", en: "Monitoring and adjustments according to plan", vi: "Theo dõi và điều chỉnh theo gói" },
        { fr: "Prix final défini après analyse du positionnement et de la concurrence", en: "Final price defined after analysing positioning and competition", vi: "Giá cuối cùng xác định sau khi phân tích vị trí và cạnh tranh" },
      ],
    }],
    serviceFaqs: [{
      q: { fr: "Le Top 3 est-il garanti ?", en: "Is Top 3 guaranteed?", vi: "Có đảm bảo Top 3 không?" },
      a: { fr: "Non. Google Maps dépend notamment de la zone, de la requête, de la concurrence et de signaux que Google contrôle. XR Agency vend un accompagnement et un objectif de visibilité, pas une garantie de position.", en: "No. Google Maps rankings depend on the area, query, competition and signals controlled by Google. XR Agency provides an optimisation service and visibility objective, not a position guarantee.", vi: "Không. Thứ hạng Google Maps phụ thuộc khu vực, truy vấn, cạnh tranh và các tín hiệu do Google kiểm soát. XR Agency cung cấp dịch vụ tối ưu và mục tiêu hiển thị, không đảm bảo vị trí." },
    }],
  },
  {
    id: "social",
    num: "05",
    title: { fr: "Community Management", en: "Community Management", vi: "Quản trị Mạng xã hội" },
    short: {
      fr: "Une présence sociale construite, publiée et animée avec méthode.",
      en: "A social presence built, published and managed with discipline.",
      vi: "Hiện diện mạng xã hội được xây dựng, xuất bản và vận hành có phương pháp.",
    },
    description: {
      fr: "Nous construisons votre présence sociale de A à Z : direction éditoriale, création des visuels, rédaction, programmation, formats courts et modération selon la formule choisie. Chaque contenu est préparé pour votre validation avant publication.",
      en: "We build your social presence from A to Z: editorial direction, visual creation, copywriting, scheduling, short-form content and moderation according to your plan. Every content piece is prepared for your approval before publishing.",
      vi: "Chúng tôi xây dựng hiện diện mạng xã hội từ A đến Z: định hướng nội dung, thiết kế hình ảnh, viết bài, lên lịch, định dạng ngắn và kiểm duyệt theo gói đã chọn. Mọi nội dung đều được chuẩn bị để bạn duyệt trước khi đăng.",
    },
    fromEur: 299,
    fromPeriod: "month",
    highlights: [
      { fr: "8 à 30 publications / mois", en: "8 to 30 posts / month", vi: "8 đến 30 bài / tháng" },
      { fr: "Création visuelle & rédaction", en: "Visual creation & copywriting", vi: "Thiết kế & viết nội dung" },
      { fr: "Validation avant publication", en: "Approval before publishing", vi: "Duyệt trước khi đăng" },
      { fr: "Modération selon la formule", en: "Moderation by plan", vi: "Kiểm duyệt theo gói" },
    ],
    plans: [
      {
        name: { fr: "Présence Essentielle", en: "Essential Presence", vi: "Hiện diện Cơ bản" },
        audience: { fr: "1 réseau · 8 publications / mois", en: "1 network · 8 posts / month", vi: "1 mạng · 8 bài / tháng" },
        eur: 299,
        period: "month",
        features: [
          { fr: "1 réseau social au choix", en: "1 social network of your choice", vi: "1 mạng xã hội tùy chọn" },
          { fr: "8 publications / mois", en: "8 posts / month", vi: "8 bài / tháng" },
          { fr: "Création des visuels et textes", en: "Visual and copy creation", vi: "Thiết kế hình ảnh và nội dung" },
          { fr: "Planification des publications", en: "Content scheduling", vi: "Lên lịch nội dung" },
          { fr: "Modération légère des commentaires", en: "Light comment moderation", vi: "Kiểm duyệt bình luận cơ bản" },
        ],
      },
      {
        name: { fr: "Croissance Active", en: "Active Growth", vi: "Tăng trưởng Chủ động" },
        audience: { fr: "2 réseaux · 20 publications / mois", en: "2 networks · 20 posts / month", vi: "2 mạng · 20 bài / tháng" },
        eur: 499,
        period: "month",
        popular: true,
        features: [
          { fr: "2 réseaux sociaux au choix", en: "2 social networks of your choice", vi: "2 mạng xã hội tùy chọn" },
          { fr: "20 publications / mois", en: "20 posts / month", vi: "20 bài / tháng" },
          { fr: "Création visuelle et rédaction", en: "Visual creation and copywriting", vi: "Thiết kế và viết nội dung" },
          { fr: "Stories et formats courts selon calendrier", en: "Stories and short formats according to schedule", vi: "Story và định dạng ngắn theo lịch" },
          { fr: "Modération + réponses courantes", en: "Moderation + routine replies", vi: "Kiểm duyệt + trả lời thường quy" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
        ],
      },
      {
        name: { fr: "Domination Sociale", en: "Social Domination", vi: "Thống trị Mạng xã hội" },
        audience: { fr: "3 réseaux · 30 publications / mois", en: "3 networks · 30 posts / month", vi: "3 mạng · 30 bài / tháng" },
        eur: 699,
        period: "month",
        features: [
          { fr: "3 réseaux sociaux au choix", en: "3 social networks of your choice", vi: "3 mạng xã hội tùy chọn" },
          { fr: "30 publications / mois", en: "30 posts / month", vi: "30 bài / tháng" },
          { fr: "Création, rédaction et planification", en: "Creation, copywriting and scheduling", vi: "Sáng tạo, viết và lên lịch" },
          { fr: "Stories et formats courts selon calendrier", en: "Stories and short formats according to schedule", vi: "Story và định dạng ngắn theo lịch" },
          { fr: "Modération renforcée des commentaires et messages courants", en: "Enhanced moderation of comments and routine messages", vi: "Kiểm duyệt nâng cao bình luận và tin nhắn thường quy" },
          { fr: "Veille de communauté et reporting mensuel", en: "Community monitoring and monthly reporting", vi: "Theo dõi cộng đồng và báo cáo hàng tháng" },
        ],
      },
    ],
    steps: [
      {
        num: "01",
        title: { fr: "Direction éditoriale", en: "Editorial Direction", vi: "Định hướng nội dung" },
        desc: {
          fr: "Définition des sujets, angles, rythme de publication et ligne visuelle adaptés à votre activité.",
          en: "Defining topics, angles, publishing rhythm and visual direction adapted to your business.",
          vi: "Xác định chủ đề, góc nội dung, nhịp đăng và định hướng hình ảnh phù hợp với doanh nghiệp.",
        },
      },
      {
        num: "02",
        title: { fr: "Création & rédaction", en: "Creation & Copywriting", vi: "Sáng tạo & Viết nội dung" },
        desc: {
          fr: "Production des visuels, carrousels, légendes et formats courts prévus dans votre formule.",
          en: "Production of visuals, carousels, captions and short-form content included in your plan.",
          vi: "Sản xuất hình ảnh, carousel, chú thích và nội dung ngắn theo gói dịch vụ.",
        },
      },
      {
        num: "03",
        title: { fr: "Validation & programmation", en: "Approval & Scheduling", vi: "Duyệt & Lên lịch" },
        desc: {
          fr: "Un calendrier est préparé en amont pour validation, puis les contenus approuvés sont programmés.",
          en: "A calendar is prepared in advance for approval, then approved content is scheduled.",
          vi: "Lịch nội dung được chuẩn bị trước để duyệt, sau đó nội dung đã duyệt được lên lịch.",
        },
      },
      {
        num: "04",
        title: { fr: "Publication & communauté", en: "Publishing & Community", vi: "Đăng tải & Cộng đồng" },
        desc: {
          fr: "Publication et modération selon le périmètre de votre formule, avec suivi mensuel des résultats.",
          en: "Publishing and moderation within your plan scope, with monthly performance tracking.",
          vi: "Đăng tải và kiểm duyệt theo phạm vi gói, kèm theo dõi hiệu quả hàng tháng.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Production", en: "Production", vi: "Sản xuất" },
        us: { fr: "Contenus créés pour votre marque", en: "Content created for your brand", vi: "Nội dung được tạo riêng cho thương hiệu" },
        them: { fr: "Templates génériques", en: "Generic templates", vi: "Mẫu nội dung đại trà" },
      },
      {
        feature: { fr: "Organisation", en: "Organisation", vi: "Tổ chức" },
        us: { fr: "Calendrier préparé et validé à l'avance", en: "Calendar prepared and approved in advance", vi: "Lịch được chuẩn bị và duyệt trước" },
        them: { fr: "Publications improvisées", en: "Improvised publishing", vi: "Đăng bài thiếu kế hoạch" },
      },
      {
        feature: { fr: "Suivi", en: "Monitoring", vi: "Theo dõi" },
        us: { fr: "Reporting adapté à la formule", en: "Reporting adapted to the plan", vi: "Báo cáo theo gói" },
        them: { fr: "Peu de visibilité sur les actions", en: "Limited visibility on actions", vi: "Khó theo dõi hoạt động" },
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
      fr: "Gardez un site rapide, sécurisé et à jour grâce à une maintenance proactive : mises à jour, sauvegardes, monitoring selon formule et interventions rapides.",
      en: "Keep your site fast, secure and up to date with proactive maintenance: updates, backups, selon formule monitoring and fast interventions.",
      vi: "Giữ website nhanh, an toàn và luôn cập nhật với bảo trì chủ động: cập nhật, sao lưu, giám sát selon formule và xử lý nhanh.",
    },
    fromEur: 29,
    fromPeriod: "month",
    highlights: [
      { fr: "Surveillance et maintenance selon formule", en: "Availability monitoring according to plan", vi: "Theo dõi khả dụng theo gói" },
      { fr: "Suivi technique selon formule", en: "Monitoring according to plan", vi: "Giám sát theo gói" },
      {
        fr: "Priorité d'intervention selon formule",
        en: "Response in under 4h",
        vi: "Can thiệp trong dưới 4 giờ",
      },
      {
        fr: "Infrastructure annuelle disponible séparément",
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
          fr: "Surveillance Active selon formule",
          en: "selon formule Active Monitoring",
          vi: "Giám sát Chủ động selon formule",
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
      { metric: "79 € / an", label: { fr: "Infrastructure", en: "Infrastructure", vi: "Hạ tầng" }, desc: { fr: "Hébergement + domaine + sécurité.", en: "Hosting + domain + security.", vi: "Hosting + tên miền + bảo mật." } },
      { metric: "29 € / mois", label: { fr: "4 modifications", en: "4 edits", vi: "4 chỉnh sửa" }, desc: { fr: "Maintenance courante du site.", en: "Routine website maintenance.", vi: "Bảo trì website thường xuyên." } },
      { metric: "49 € / mois", label: { fr: "10 modifications", en: "10 edits", vi: "10 chỉnh sửa" }, desc: { fr: "Pour les besoins de contenu plus fréquents.", en: "For more frequent content needs.", vi: "Cho nhu cầu nội dung thường xuyên hơn." } },
    ],
    comparisons: [
      { feature: { fr: "Infrastructure", en: "Infrastructure", vi: "Hạ tầng" }, us: { fr: "79 € / an · hébergement + domaine + sécurité", en: "€79 / year · hosting + domain + security", vi: "79 € / năm · hosting + tên miền + bảo mật" }, them: { fr: "Facturée séparément selon le fournisseur", en: "Billed separately depending on provider", vi: "Tính riêng tùy nhà cung cấp" } },
      { feature: { fr: "Modifications", en: "Edits", vi: "Chỉnh sửa" }, us: { fr: "4, 10 ou illimité selon la formule", en: "4, 10 or unlimited according to plan", vi: "4, 10 hoặc không giới hạn theo gói" }, them: { fr: "Interventions ponctuelles", en: "Ad-hoc interventions", vi: "Can thiệp từng lần" } },
      { feature: { fr: "Continuité", en: "Continuity", vi: "Liên tục" }, us: { fr: "Sécurité, sauvegardes et suivi selon formule", en: "Security, backups and monitoring according to plan", vi: "Bảo mật, sao lưu và giám sát theo gói" }, them: { fr: "Maintenance non structurée", en: "Unstructured maintenance", vi: "Bảo trì không có cấu trúc" } },
    ],
    plans: [
      { name: { fr: "WebCare · 4 modifications", en: "WebCare · 4 edits", vi: "WebCare · 4 chỉnh sửa" }, audience: { fr: "Maintenance courante", en: "Routine maintenance", vi: "Bảo trì thường xuyên" }, eur: 29, period: "month", features: [
        { fr: "4 modifications de contenu / mois", en: "4 content edits / month", vi: "4 chỉnh sửa nội dung / tháng" },
        { fr: "Mises à jour et maintenance courante", en: "Updates and routine maintenance", vi: "Cập nhật và bảo trì thường xuyên" },
        { fr: "Sauvegardes et surveillance selon périmètre", en: "Backups and monitoring within scope", vi: "Sao lưu và giám sát theo phạm vi" },
      ] },
      { name: { fr: "WebCare · 10 modifications", en: "WebCare · 10 edits", vi: "WebCare · 10 chỉnh sửa" }, audience: { fr: "Accompagnement renforcé", en: "Enhanced support", vi: "Hỗ trợ tăng cường" }, eur: 49, period: "month", popular: true, features: [
        { fr: "10 modifications de contenu / mois", en: "10 content edits / month", vi: "10 chỉnh sửa nội dung / tháng" },
        { fr: "Maintenance et mises à jour", en: "Maintenance and updates", vi: "Bảo trì và cập nhật" },
        { fr: "Support prioritaire", en: "Priority support", vi: "Hỗ trợ ưu tiên" },
      ] },
      { name: { fr: "WebCare · Illimité", en: "WebCare · Unlimited", vi: "WebCare · Không giới hạn" }, audience: { fr: "Modifications sans quota", en: "No edit quota", vi: "Không giới hạn chỉnh sửa" }, eur: 99, period: "month", features: [
        { fr: "Modifications de contenu illimitées", en: "Unlimited content edits", vi: "Chỉnh sửa nội dung không giới hạn" },
        { fr: "Maintenance et mises à jour", en: "Maintenance and updates", vi: "Bảo trì và cập nhật" },
        { fr: "Support prioritaire selon périmètre", en: "Priority support within scope", vi: "Hỗ trợ ưu tiên theo phạm vi" },
      ] },
      { name: { fr: "Infrastructure annuelle", en: "Annual Infrastructure", vi: "Hạ tầng hàng năm" }, audience: { fr: "Hébergement + domaine + sécurité", en: "Hosting + domain + security", vi: "Hosting + tên miền + bảo mật" }, eur: 79, period: "year", features: [
        { fr: "Hébergement", en: "Hosting", vi: "Hosting" },
        { fr: "Nom de domaine", en: "Domain name", vi: "Tên miền" },
        { fr: "Sécurité HTTPS / SSL", en: "HTTPS / SSL security", vi: "Bảo mật HTTPS / SSL" },
      ] },
    ],
    serviceFaqs: [
      {
        q: {
          fr: "Quelle plateforme utilisez-vous ?",
          en: "Which platform do you use?",
          vi: "Bạn sử dụng nền tảng nào?",
        },
        a: {
          fr: "Shopify, WooCommerce ou solutions headless selon vos besoins.",
          en: "Shopify, WooCommerce or headless solutions depending on your needs.",
          vi: "Shopify, WooCommerce hoặc giải pháp headless tùy nhu cầu.",
        },
      },
      {
        q: {
          fr: "Pouvez-vous migrer mon site existant ?",
          en: "Can you migrate my existing site?",
          vi: "Bạn có thể chuyển đổi website hiện tại không?",
        },
        a: {
          fr: "Oui, nous gérons la migration complète sans perte de SEO ni de données.",
          en: "Yes, we handle full migration with zero SEO or data loss.",
          vi: "Có, chúng tôi xử lý chuyển đổi toàn bộ không mất SEO hay dữ liệu.",
        },
      },
    ],
  },
  /* ── 09 · Refonte ── */
  {
    id: "refonte",
    num: "09",
    title: { fr: "Refonte de site internet", en: "Website Redesign", vi: "Thiết kế lại website" },
    short: {
      fr: "Moderniser votre site pour booster image et conversion.",
      en: "Modernise your site to boost image and conversion.",
      vi: "Hiện đại hóa website để tăng hình ảnh và chuyển đổi.",
    },
    description: {
      fr: "Nous transformons votre site existant en une expérience digitale premium : audit UX complet, redesign sur-mesure, migration sans perte SEO et performance accrue.",
      en: "We transform your existing website into a premium digital experience: full UX audit, bespoke redesign, zero-loss SEO migration and increased performance.",
      vi: "Chúng tôi biến website hiện tại thành trải nghiệm số cao cấp: kiểm tra UX toàn diện, thiết kế riêng, chuyển đổi không mất SEO và tăng hiệu suất.",
    },
    fromEur: 499,
    fromPeriod: "once",
    highlights: [
      { fr: "Audit UX complet", en: "Full UX audit", vi: "Kiểm tra UX toàn diện" },
      {
        fr: "Migration sans perte SEO",
        en: "Zero-loss SEO migration",
        vi: "Chuyển đổi không mất SEO",
      },
      { fr: "Design system moderne", en: "Modern design system", vi: "Hệ thống thiết kế hiện đại" },
      { fr: "Performance à mesurer", en: "Performance to be measured", vi: "Hiệu suất cần đo lường" },
    ],
    steps: [
      {
        num: "01",
        title: { fr: "Audit & Diagnostic", en: "Audit & Diagnostic", vi: "Kiểm tra & Chẩn đoán" },
        desc: {
          fr: "Analyse complète de l'existant : UX, performance, SEO, accessibilité et parcours utilisateur.",
          en: "Full analysis of the current site: UX, performance, SEO, accessibility and user journeys.",
          vi: "Phân tích toàn diện: UX, hiệu suất, SEO, khả năng truy cập và hành trình người dùng.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Stratégie & Wireframes",
          en: "Strategy & Wireframes",
          vi: "Chiến lược & Wireframe",
        },
        desc: {
          fr: "Définition de la nouvelle architecture, des parcours clés et des objectifs de conversion.",
          en: "New information architecture, key user journeys and conversion goal setting.",
          vi: "Xác định kiến trúc mới, hành trình chính và mục tiêu chuyển đổi.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Design & Développement",
          en: "Design & Development",
          vi: "Thiết kế & Phát triển",
        },
        desc: {
          fr: "Refonte visuelle complète et développement avec les technologies les plus performantes.",
          en: "Complete visual overhaul and development with the most performant technologies.",
          vi: "Làm mới toàn bộ giao diện và phát triển với công nghệ hiệu suất cao nhất.",
        },
      },
      {
        num: "04",
        title: { fr: "Migration & Lancement", en: "Migration & Launch", vi: "Di chuyển & Ra mắt" },
        desc: {
          fr: "Migration technique sans downtime, redirections SEO et lancement optimisé.",
          en: "Zero-downtime technical migration, SEO redirects and optimized launch.",
          vi: "Di chuyển kỹ thuật không gián đoạn, chuyển hướng SEO và ra mắt tối ưu.",
        },
      },
    ],
    metrics: [
      {
        metric: "Parcours optimisé",
        label: {
          fr: "Amélioration conversion",
          en: "Conversion improvement",
          vi: "Cải thiện chuyển đổi",
        },
        desc: {
          fr: "Parcours optimisés pour la conversion.",
          en: "Journeys optimized for conversion.",
          vi: "Hành trình tối ưu cho chuyển đổi.",
        },
      },
      {
        metric: "Selon environnement",
        label: { fr: "Performance", en: "Performance boost", vi: "Tăng hiệu suất" },
        desc: {
          fr: "Vitesse de chargement multipliée par 2,5.",
          en: "Load speed multiplied by 2.5x.",
          vi: "Tốc độ tải tăng gấp 2,5 lần.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Approche", en: "Approach", vi: "Phương pháp" },
        us: {
          fr: "Refonte stratégique data-driven",
          en: "Strategic data-driven redesign",
          vi: "Thiết kế lại chiến lược dựa trên dữ liệu",
        },
        them: { fr: "Coup de peinture cosmétique", en: "Cosmetic paint job", vi: "Sơn lại bề mặt" },
      },
      {
        feature: { fr: "SEO", en: "SEO", vi: "SEO" },
        us: {
          fr: "Zéro perte de référencement",
          en: "Zero ranking loss",
          vi: "Không mất thứ hạng",
        },
        them: {
          fr: "Chute de trafic post-refonte",
          en: "Post-redesign traffic drop",
          vi: "Sụt giảm traffic sau thiết kế lại",
        },
      },
    ],
    plans: [
      {
        name: { fr: "Audit", en: "Audit", vi: "Kiểm tra" },
        audience: { fr: "Diagnostic initial", en: "Initial diagnostic", vi: "Chẩn đoán ban đầu" },
        eur: 499,
        period: "once",
        features: [
          { fr: "Audit UX complet", en: "Full UX audit", vi: "Kiểm tra UX toàn diện" },
          { fr: "Rapport performance", en: "Performance report", vi: "Báo cáo hiệu suất" },
          { fr: "Analyse SEO", en: "SEO analysis", vi: "Phân tích SEO" },
          {
            fr: "Recommandations prioritaires",
            en: "Priority recommendations",
            vi: "Khuyến nghị ưu tiên",
          },
        ],
      },
      {
        name: { fr: "Refonte", en: "Redesign", vi: "Thiết kế lại" },
        audience: { fr: "PME & startups", en: "SMEs & startups", vi: "Doanh nghiệp vừa & startup" },
        eur: 1499,
        period: "once",
        popular: true,
        features: [
          { fr: "Tout Audit +", en: "Everything in Audit +", vi: "Tất cả Kiểm tra +" },
          {
            fr: "Design system complet",
            en: "Complete design system",
            vi: "Hệ thống thiết kế đầy đủ",
          },
          { fr: "Développement sur-mesure", en: "Custom development", vi: "Phát triển riêng biệt" },
          { fr: "Migration SEO", en: "SEO migration", vi: "Di chuyển SEO" },
          { fr: "Tests cross-browser", en: "Cross-browser testing", vi: "Kiểm tra đa trình duyệt" },
          { fr: "Formation CMS", en: "CMS training", vi: "Đào tạo CMS" },
        ],
      },
      {
        name: { fr: "Premium", en: "Premium", vi: "Cao cấp" },
        audience: { fr: "Grandes entreprises", en: "Large enterprises", vi: "Doanh nghiệp lớn" },
        eur: 2999,
        period: "once",
        features: [
          { fr: "Tout Refonte +", en: "Everything in Redesign +", vi: "Tất cả Thiết kế lại +" },
          { fr: "Architecture sur-mesure", en: "Bespoke architecture", vi: "Kiến trúc riêng biệt" },
          { fr: "Animations avancées", en: "Advanced animations", vi: "Hoạt ảnh nâng cao" },
          { fr: "Intégrations API", en: "API integrations", vi: "Tích hợp API" },
          { fr: "Support 12 mois", en: "12-month support", vi: "Hỗ trợ 12 tháng" },
        ],
      },
    ],
  },
  /* ── 10 · Publicité digitale ── */
  {
    id: "ads",
    num: "10",
    title: { fr: "Publicité digitale", en: "Digital Advertising", vi: "Quảng cáo số" },
    short: {
      fr: "Campagnes d'acquisition orientées ROAS et conversion.",
      en: "Acquisition campaigns focused on ROAS and conversion.",
      vi: "Chiến dịch thu hút tập trung ROAS và chuyển đổi.",
    },
    description: {
      fr: "Nous pilotons vos campagnes Google Ads, Meta Ads et display pour maximiser votre retour sur investissement publicitaire : ciblage précis, A/B testing continu et optimisation du ROAS.",
      en: "We manage your Google Ads, Meta Ads and display campaigns to maximise your advertising ROI: precise targeting, continuous A/B testing and ROAS optimization.",
      vi: "Chúng tôi quản lý chiến dịch Google Ads, Meta Ads và hiển thị để tối đa ROI quảng cáo: nhắm mục tiêu chính xác, thử nghiệm A/B liên tục và tối ưu ROAS.",
    },
    fromEur: 499,
    fromPeriod: "month",
    highlights: [
      { fr: "Google Ads & Meta Ads", en: "Google Ads & Meta Ads", vi: "Google Ads & Meta Ads" },
      { fr: "A/B testing continu", en: "Continuous A/B testing", vi: "Thử nghiệm A/B liên tục" },
      { fr: "Pilotage orienté ROI", en: "ROI-focused management", vi: "Quản lý tập trung vào ROI" },
      { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Stratégie & Ciblage",
          en: "Strategy & Targeting",
          vi: "Chiến lược & Nhắm mục tiêu",
        },
        desc: {
          fr: "Analyse du marché, définition des personas et stratégie d'enchères.",
          en: "Market analysis, persona definition and bidding strategy.",
          vi: "Phân tích thị trường, xác định chân dung khách hàng và chiến lược đấu thầu.",
        },
      },
      {
        num: "02",
        title: { fr: "Création & Lancement", en: "Creation & Launch", vi: "Tạo & Ra mắt" },
        desc: {
          fr: "Conception des annonces, landing pages et mise en production des campagnes.",
          en: "Ad creative, landing pages and campaign deployment.",
          vi: "Thiết kế quảng cáo, trang đích và triển khai chiến dịch.",
        },
      },
      {
        num: "03",
        title: {
          fr: "Optimisation & Scaling",
          en: "Optimization & Scaling",
          vi: "Tối ưu & Mở rộng",
        },
        desc: {
          fr: "Ajustements quotidiens, scaling des gagnants et arrêt des sous-performants.",
          en: "Daily adjustments, scaling winners and pausing underperformers.",
          vi: "Điều chỉnh hàng ngày, mở rộng quảng cáo hiệu quả và dừng quảng cáo kém.",
        },
      },
      {
        num: "04",
        title: { fr: "Reporting & Analyse", en: "Reporting & Analysis", vi: "Báo cáo & Phân tích" },
        desc: {
          fr: "Rapports détaillés, analyse ROI et recommandations pour le mois suivant.",
          en: "Detailed reports, ROI analysis and recommendations for the next month.",
          vi: "Báo cáo chi tiết, phân tích ROI và khuyến nghị cho tháng tiếp theo.",
        },
      },
    ],
    metrics: [
      {
        metric: "> 4x",
        label: { fr: "ROAS moyen", en: "Average ROAS", vi: "ROAS trung bình" },
        desc: {
          fr: "Retour sur investissement publicitaire.",
          en: "Return on advertising spend.",
          vi: "Hoàn vốn chi phí quảng cáo.",
        },
      },
      {
        metric: "-35%",
        label: { fr: "Coût par lead", en: "Cost per lead", vi: "Chi phí mỗi lead" },
        desc: {
          fr: "Réduction du coût d'acquisition.",
          en: "Lower acquisition cost.",
          vi: "Giảm chi phí thu hút.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Gestion", en: "Management", vi: "Quản lý" },
        us: {
          fr: "Optimisation quotidienne par des experts",
          en: "Daily optimization by experts",
          vi: "Tối ưu hàng ngày bởi chuyên gia",
        },
        them: {
          fr: "Configuration initiale puis abandon",
          en: "Setup and forget",
          vi: "Thiết lập rồi bỏ quên",
        },
      },
      {
        feature: { fr: "Transparence", en: "Transparency", vi: "Minh bạch" },
        us: {
          fr: "Reporting complet et accessible",
          en: "Full accessible reporting",
          vi: "Báo cáo đầy đủ và dễ truy cập",
        },
        them: {
          fr: "Tableaux de bord opaques",
          en: "Opaque dashboards",
          vi: "Bảng điều khiển mờ nhạt",
        },
      },
    ],
    plans: [
      {
        name: { fr: "Launch", en: "Launch", vi: "Ra mắt" },
        audience: {
          fr: "Démarrage publicitaire",
          en: "Advertising startup",
          vi: "Bắt đầu quảng cáo",
        },
        eur: 499,
        period: "month",
        features: [
          {
            fr: "1 plateforme (Google ou Meta)",
            en: "1 platform (Google or Meta)",
            vi: "1 nền tảng (Google hoặc Meta)",
          },
          { fr: "Stratégie initiale", en: "Initial strategy", vi: "Chiến lược ban đầu" },
          { fr: "Création des annonces", en: "Ad creation", vi: "Tạo quảng cáo" },
          { fr: "Optimisation hebdomadaire", en: "Weekly optimization", vi: "Tối ưu hàng tuần" },
          { fr: "Reporting mensuel", en: "Monthly reporting", vi: "Báo cáo hàng tháng" },
        ],
      },
      {
        name: { fr: "Scale", en: "Scale", vi: "Mở rộng" },
        audience: { fr: "Croissance accélérée", en: "Accelerated growth", vi: "Tăng tốc mở rộng" },
        eur: 999,
        period: "month",
        popular: true,
        features: [
          { fr: "Tout Launch +", en: "Everything in Launch +", vi: "Tất cả Ra mắt +" },
          { fr: "Multi-plateforme", en: "Multi-platform", vi: "Đa nền tảng" },
          { fr: "A/B testing avancé", en: "Advanced A/B testing", vi: "Thử nghiệm A/B nâng cao" },
          { fr: "Landing pages incluses", en: "Landing pages included", vi: "Trang đích bao gồm" },
          { fr: "Optimisation quotidienne", en: "Daily optimization", vi: "Tối ưu hàng ngày" },
          { fr: "Account manager", en: "Account manager", vi: "Quản lý tài khoản" },
        ],
      },
      {
        name: { fr: "Premium", en: "Premium", vi: "Cao cấp" },
        audience: {
          fr: "Marques établies",
          en: "Established brands",
          vi: "Thương hiệu đã khẳng định",
        },
        eur: 1999,
        period: "month",
        features: [
          { fr: "Tout Scale +", en: "Everything in Scale +", vi: "Tất cả Mở rộng +" },
          { fr: "Stratégie omnicanale", en: "Omnichannel strategy", vi: "Chiến lược đa kênh" },
          { fr: "Retargeting avancé", en: "Advanced retargeting", vi: "Retargeting nâng cao" },
          {
            fr: "Creative studio inclus",
            en: "Creative studio included",
            vi: "Studio sáng tạo bao gồm",
          },
          {
            fr: "SLA performance garanti",
            en: "Performance SLA according to plan",
            vi: "SLA hiệu suất đảm bảo",
          },
        ],
      },
    ],
  },
  /* ── 11 · Stratégie digitale ── */
  {
    id: "strategy",
    num: "11",
    title: { fr: "Stratégie digitale", en: "Digital Strategy", vi: "Chiến lược số" },
    short: {
      fr: "Audit, positionnement et feuille de route pour dominer votre marché.",
      en: "Audit, positioning and roadmap to dominate your market.",
      vi: "Kiểm tra, định vị và lộ trình để thống lĩnh thị trường.",
    },
    description: {
      fr: "Nous définissons votre feuille de route digitale : analyse de marché, positionnement de marque, stratégie d'acquisition et framework KPI pour une croissance mesurable et durable.",
      en: "We define your digital roadmap: market analysis, brand positioning, acquisition strategy and KPI framework for measurable, sustainable growth.",
      vi: "Chúng tôi xác định lộ trình số của bạn: phân tích thị trường, định vị thương hiệu, chiến lược thu hút và khung KPI để tăng trưởng đo lường được và bền vững.",
    },
    fromEur: 799,
    fromPeriod: "once",
    highlights: [
      { fr: "Analyse de marché", en: "Market analysis", vi: "Phân tích thị trường" },
      { fr: "Positionnement de marque", en: "Brand positioning", vi: "Định vị thương hiệu" },
      { fr: "Stratégie d'acquisition", en: "Acquisition strategy", vi: "Chiến lược thu hút" },
      { fr: "Framework KPI", en: "KPI framework", vi: "Khung KPI" },
    ],
    steps: [
      {
        num: "01",
        title: {
          fr: "Immersion & Diagnostic",
          en: "Immersion & Diagnostic",
          vi: "Tìm hiểu & Chẩn đoán",
        },
        desc: {
          fr: "Analyse approfondie de votre marché, concurrents, forces et opportunités digitales.",
          en: "In-depth analysis of your market, competitors, strengths and digital opportunities.",
          vi: "Phân tích chuyên sâu thị trường, đối thủ, điểm mạnh và cơ hội số.",
        },
      },
      {
        num: "02",
        title: {
          fr: "Positionnement & Architecture",
          en: "Positioning & Architecture",
          vi: "Định vị & Kiến trúc",
        },
        desc: {
          fr: "Définition du positionnement unique, de la proposition de valeur et de l'architecture digitale.",
          en: "Defining unique positioning, value proposition and digital architecture.",
          vi: "Xác định định vị độc nhất, đề xuất giá trị và kiến trúc số.",
        },
      },
      {
        num: "03",
        title: { fr: "Feuille de Route", en: "Roadmap", vi: "Lộ trình" },
        desc: {
          fr: "Plan d'action priorisé sur 6-12 mois avec objectifs KPI et budget estimé.",
          en: "Prioritized 6-12 month action plan with KPI targets and estimated budget.",
          vi: "Kế hoạch hành động ưu tiên 6-12 tháng với mục tiêu KPI và ngân sách ước tính.",
        },
      },
      {
        num: "04",
        title: { fr: "Accompagnement", en: "Support", vi: "Đồng hành" },
        desc: {
          fr: "Suivi mensuel, ajustements stratégiques et optimisation continue des performances.",
          en: "Monthly tracking, strategic adjustments and continuous performance optimization.",
          vi: "Theo dõi hàng tháng, điều chỉnh chiến lược và tối ưu hiệu suất liên tục.",
        },
      },
    ],
    metrics: [
      {
        metric: "+3,2x",
        label: { fr: "ROI moyen", en: "Average ROI", vi: "ROI trung bình" },
        desc: {
          fr: "Retour sur investissement mesurable.",
          en: "Measurable return on investment.",
          vi: "Hoàn vốn đầu tư đo lường được.",
        },
      },
      {
        metric: "6 mois",
        label: { fr: "Horizon stratégique", en: "Strategic horizon", vi: "Tầm nhìn chiến lược" },
        desc: {
          fr: "Plan d'action structuré et réaliste.",
          en: "Structured and realistic action plan.",
          vi: "Kế hoạch hành động có cấu trúc và thực tế.",
        },
      },
    ],
    comparisons: [
      {
        feature: { fr: "Vision", en: "Vision", vi: "Tầm nhìn" },
        us: {
          fr: "Stratégie 360° data-driven",
          en: "360° data-driven strategy",
          vi: "Chiến lược 360° dựa trên dữ liệu",
        },
        them: {
          fr: "Recommandations génériques",
          en: "Generic recommendations",
          vi: "Khuyến nghị chung chung",
        },
      },
      {
        feature: { fr: "Suivi", en: "Tracking", vi: "Theo dõi" },
        us: {
          fr: "KPIs mesurables et reporting",
          en: "Measurable KPIs and reporting",
          vi: "KPI đo lường được và báo cáo",
        },
        them: {
          fr: "Pas de suivi structuré",
          en: "No structured tracking",
          vi: "Không theo dõi có cấu trúc",
        },
      },
    ],
    plans: [
      {
        name: { fr: "Audit", en: "Audit", vi: "Kiểm tra" },
        audience: {
          fr: "Diagnostic stratégique",
          en: "Strategic diagnostic",
          vi: "Chẩn đoán chiến lược",
        },
        eur: 799,
        period: "once",
        features: [
          { fr: "Audit digital complet", en: "Full digital audit", vi: "Kiểm tra số toàn diện" },
          { fr: "Analyse concurrentielle", en: "Competitive analysis", vi: "Phân tích đối thủ" },
          {
            fr: "Recommandations prioritaires",
            en: "Priority recommendations",
            vi: "Khuyến nghị ưu tiên",
          },
          { fr: "Rapport exécutif", en: "Executive report", vi: "Báo cáo điều hành" },
        ],
      },
      {
        name: { fr: "Roadmap", en: "Roadmap", vi: "Lộ trình" },
        audience: { fr: "PME ambitieuses", en: "Ambitious SMEs", vi: "Doanh nghiệp vừa tham vọng" },
        eur: 1999,
        period: "once",
        popular: true,
        features: [
          { fr: "Tout Audit +", en: "Everything in Audit +", vi: "Tất cả Kiểm tra +" },
          { fr: "Feuille de route 12 mois", en: "12-month roadmap", vi: "Lộ trình 12 tháng" },
          { fr: "Positionnement de marque", en: "Brand positioning", vi: "Định vị thương hiệu" },
          { fr: "Stratégie d'acquisition", en: "Acquisition strategy", vi: "Chiến lược thu hút" },
          { fr: "Framework KPI", en: "KPI framework", vi: "Khung KPI" },
          {
            fr: "2 sessions de présentation",
            en: "2 presentation sessions",
            vi: "2 buổi trình bày",
          },
        ],
      },
      {
        name: { fr: "Accompagnement", en: "Support", vi: "Đồng hành" },
        audience: {
          fr: "Croissance continue",
          en: "Continuous growth",
          vi: "Tăng trưởng liên tục",
        },
        eur: 2499,
        period: "month",
        features: [
          { fr: "Tout Roadmap +", en: "Everything in Roadmap +", vi: "Tất cả Lộ trình +" },
          {
            fr: "Suivi mensuel stratégique",
            en: "Monthly strategic tracking",
            vi: "Theo dõi chiến lược hàng tháng",
          },
          { fr: "Ajustements en continu", en: "Continuous adjustments", vi: "Điều chỉnh liên tục" },
          { fr: "Comités trimestriels", en: "Quarterly reviews", vi: "Đánh giá hàng quý" },
          {
            fr: "Account director dédié",
            en: "Dedicated account director",
            vi: "Giám đốc tài khoản riêng",
          },
        ],
      },
    ],
  },
];

export type FaqCategory = "sites" | "seo" | "ads" | "ia" | "tarifs" | "delais" | "general";

export const FAQ: { q: L; a: L; category: FaqCategory }[] = [
  {
    category: "delais",
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
    category: "sites",
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
    category: "sites",
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
    category: "seo",
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
    category: "seo",
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
    category: "seo",
    q: {
      fr: "Comment fonctionne l’accompagnement Google Maps Top 3 ?",
      en: "How does the Google Maps Top 3 service work?",
      vi: "Cam kết Google Maps TOP 3 hoạt động như thế nào?",
    },
    a: {
      fr: "Le contrat d'un an ne démarre que lorsque vous êtes réellement positionné dans le TOP 3. La vérification se fait ensemble, sur plusieurs appareils, en navigation neutre.",
      en: "The one-year contract only starts once you are genuinely ranked in the TOP 3. Verification is done together, on several devices, in neutral browsing.",
      vi: "Hợp đồng một năm chỉ bắt đầu khi bạn thực sự nằm trong TOP 3. Việc kiểm tra được thực hiện cùng nhau, trên nhiều thiết bị, ở chế độ duyệt trung lập.",
    },
  },
  {
    category: "seo",
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
    category: "general",
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
    category: "general",
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
    category: "ia",
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
    category: "ia",
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
    category: "sites",
    q: {
      fr: "Que se passe-t-il si mon site tombe en panne ?",
      en: "What happens if my website goes down?",
      vi: "Điều gì xảy ra nếu website của tôi gặp sự cố?",
    },
    a: {
      fr: "Le monitoring selon formule détecte l'incident en temps réel. Selon votre forfait, nous intervenons sous 4 h à 48 h, et les sauvegardes permettent une restauration rapide.",
      en: "selon formule monitoring detects the incident in real time. Depending on your plan we intervene within 4 to 48 hours, and backups allow a fast restore.",
      vi: "Giám sát selon formule phát hiện sự cố theo thời gian thực. Tùy gói, chúng tôi xử lý trong 4 đến 48 giờ, và bản sao lưu cho phép khôi phục nhanh.",
    },
  },
  {
    category: "tarifs",
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
    category: "general",
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

const CORE_SHOWCASE = [
  {
    id: "maison-lumiere",
    name: "Maison Lumière",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorLuxe",
    services: ["website", "branding"],
    type: { fr: "Site vitrine luxe", en: "Luxury showcase", vi: "Website giới thiệu xa xỉ" },
    desc: {
      fr: "Identité visuelle raffinée, galerie immersive, navigation éditoriale pour cette joaillerie indépendante parisienne.",
      en: "Refined visual identity, immersive gallery, editorial navigation for this independent Parisian jeweler.",
      vi: "Nhận diện tinh tế, phòng trưng bày nhập vai, điều hướng biên tập cho tiệm trang sức độc lập Paris.",
    },
    metric: "+320% demandes de RDV",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67222fae?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "villa-azur",
    name: "Villa Azur",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website", "booking"],
    type: {
      fr: "Site vitrine + réservation",
      en: "Showcase + booking",
      vi: "Giới thiệu + đặt phòng",
    },
    desc: {
      fr: "Photographie grand format, système de réservation intégré, design épuré pour ce boutique-hôtel en Côte d'Azur.",
      en: "Large-format photography, integrated booking system, clean design for this Côte d'Azur boutique hotel.",
      vi: "Nhiếp ảnh khổ lớn, hệ thống đặt phòng tích hợp, thiết kế tinh tế cho khách sạn boutique Côte d'Azur.",
    },
    metric: "+280% réservations directes",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "le-novara",
    name: "Le Novara",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website", "booking"],
    type: {
      fr: "Site vitrine + réservation",
      en: "Showcase + booking",
      vi: "Giới thiệu + đặt bàn",
    },
    desc: {
      fr: "Menu interactif, ambiance éditoriale sombre, réservation en ligne. Restaurant gastronomique 1 étoile.",
      en: "Interactive menu, dark editorial ambiance, online booking. 1-star gastronomic restaurant.",
      vi: "Thực đơn tương tác, không gian biên tập tối, đặt bàn trực tuyến. Nhà hàng ẩm thực 1 sao.",
    },
    metric: "Suivi des réservations",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "prestige-auto",
    name: "Prestige Auto 75",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorAuto",
    services: ["website", "branding"],
    type: {
      fr: "Site vitrine + configurateur",
      en: "Showcase + configurator",
      vi: "Website + cấu hình",
    },
    desc: {
      fr: "Showroom digital premium, configurateur véhicule, galerie immersive pour ce préparateur automobile de luxe.",
      en: "Premium digital showroom, vehicle configurator, immersive gallery for this luxury auto preparer.",
      vi: "Phòng trưng bày số cao cấp, cấu hình xe, phòng trưng bày nhập vai cho đơn vị độ xe sang.",
    },
    metric: "+150% demandes d'essai",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "groupe-mercier",
    name: "Groupe Mercier",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website", "seo"],
    type: { fr: "Portail immobilier", en: "Real estate portal", vi: "Cổng thông tin BĐS" },
    desc: {
      fr: "Portail immobilier haut de gamme, visites virtuelles 3D, filtres avancés. Agence premium parisienne.",
      en: "High-end property portal, 3D virtual tours, advanced filters. Premium Parisian agency.",
      vi: "Cổng BĐS cao cấp, tham quan ảo 3D, bộ lọc nâng cao. Công ty môi giới cao cấp Paris.",
    },
    metric: "+220% contacts qualifiés",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "cabinet-bellaire",
    name: "Cabinet Belaire",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website", "booking"],
    type: { fr: "Site vitrine médical", en: "Medical showcase", vi: "Website y tế" },
    desc: {
      fr: "Design médical premium, prise de rendez-vous en ligne, parcours patient fluide. Clinique esthétique privée.",
      en: "Premium medical design, online booking, seamless patient journey. Private aesthetic clinic.",
      vi: "Thiết kế y tế cao cấp, đặt lịch trực tuyến, hành trình bệnh nhân mượt mà. Phòng khám thẩm mỹ tư nhân.",
    },
    metric: "+260% prises de RDV",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "atelier-sauge",
    name: "Atelier Sauge",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorBeaute",
    services: ["ecommerce", "branding"],
    type: { fr: "E-commerce beauté", en: "Beauty e-commerce", vi: "TMĐT làm đẹp" },
    desc: {
      fr: "E-commerce artisanal, fiches produit sensorielles, univers de marque cohérent. Cosmétiques naturels haut de gamme.",
      en: "Artisanal e-commerce, sensory product pages, cohesive brand universe. Premium natural cosmetics.",
      vi: "TMĐT thủ công, trang sản phẩm cảm quan, vũ trụ thương hiệu nhất quán. Mỹ phẩm tự nhiên cao cấp.",
    },
    metric: "Conversions à mesurer",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403398?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "duchesne-architectes",
    name: "Duchesne Architectes",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArchitecture",
    services: ["website", "branding"],
    type: {
      fr: "Portfolio architectural",
      en: "Architecture portfolio",
      vi: "Portfolio kiến trúc",
    },
    desc: {
      fr: "Portfolio immersif plein écran, transitions cinématiques, narration projet par projet. Studio d'architecture contemporain.",
      en: "Full-screen immersive portfolio, cinematic transitions, project-by-project storytelling. Contemporary architecture studio.",
      vi: "Portfolio nhập vai toàn màn hình, chuyển cảnh điện ảnh, kể chuyện theo dự án. Studio kiến trúc đương đại.",
    },
    metric: "Selon objectifs",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "nordeen",
    name: "Nordeen",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website", "ai"],
    type: { fr: "Web App SaaS", en: "SaaS Web App", vi: "Ứng dụng web SaaS" },
    desc: {
      fr: "Dashboard SaaS complet, landing page conversion, onboarding utilisateur. Startup B2B scandinave.",
      en: "Complete SaaS dashboard, conversion landing page, user onboarding. Scandinavian B2B startup.",
      vi: "Dashboard SaaS hoàn chỉnh, trang chuyển đổi, hướng dẫn người dùng. Startup B2B Scandinavia.",
    },
    metric: "+420% inscriptions",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "coach-renaud",
    name: "Coach Renaud Delacroix",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website", "strategy"],
    type: { fr: "Site vitrine + vente", en: "Showcase + sales", vi: "Giới thiệu + bán hàng" },
    desc: {
      fr: "Tunnel de conversion, inscription événements, vente de programmes en ligne. Coach en leadership exécutif.",
      en: "Conversion funnel, event registration, online program sales. Executive leadership coaching.",
      vi: "Phễu chuyển đổi, đăng ký sự kiện, bán chương trình trực tuyến. Huấn luyện lãnh đạo điều hành.",
    },
    metric: "Suivi des ventes",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "parfums-de-noir",
    name: "Parfums de Noir",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArtisanat",
    services: ["ecommerce", "branding"],
    type: { fr: "E-commerce artisanal", en: "Artisanal e-commerce", vi: "TMĐT thủ công" },
    desc: {
      fr: "Boutique en ligne immersive, storytelling olfactif, packaging digital premium. Parfumeur artisan independent.",
      en: "Immersive online shop, olfactory storytelling, premium digital packaging. Independent artisan perfumer.",
      vi: "Cửa hàng trực tuyến nhập vai, kể chuyện mùi hương, đóng gói số cao cấp. Thợ nước hoa độc lập.",
    },
    metric: "+290% panier moyen",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=85&w=1200",
  },
  {
    id: "noir-or",
    name: "Noir & Or Manufacture",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorMode",
    services: ["ecommerce", "branding"],
    type: { fr: "E-commerce mode", en: "Fashion e-commerce", vi: "TMĐT thời trang" },
    desc: {
      fr: "Direction artistique digitale, lookbook interactif, e-commerce haute couture. Marque de mode émergente.",
      en: "Digital art direction, interactive lookbook, haute couture e-commerce. Emerging fashion brand.",
      vi: "Chỉ đạo nghệ thuật số, lookbook tương tác, TMĐT haute couture. Thương hiệu thời trang mới nổi.",
    },
    metric: "+310% ventes en ligne",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1200",
  },
];

/** Extended portfolio references — a broad cross-sector selection for the portfolio filters */
const ADDITIONAL_SHOWCASE = [
  {
    id: "reference-1",
    name: "Maison Aurelia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorLuxe",
    services: ["website","branding","maps"],
    type: { fr: "site luxe", en: "site luxe", vi: "site luxe" },
    desc: {
      fr: "Refonte digitale sur-mesure pour site luxe : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for site luxe: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho site luxe: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 11 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1605100804763-247f67222fae?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-2",
    name: "Atelier Riviera",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website","booking"],
    type: { fr: "hôtel boutique", en: "hôtel boutique", vi: "hôtel boutique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour hôtel boutique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for hôtel boutique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho hôtel boutique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 12 · WEBSITE + BOOKING",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-3",
    name: "Maison Sépia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website","maps","ecommerce"],
    type: { fr: "restaurant gastronomique", en: "restaurant gastronomique", vi: "restaurant gastronomique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour restaurant gastronomique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for restaurant gastronomique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho restaurant gastronomique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 13 · WEBSITE + MAPS",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-4",
    name: "Atelier Nocturne",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorMode",
    services: ["ecommerce","branding","social"],
    type: { fr: "marque de mode", en: "marque de mode", vi: "marque de mode" },
    desc: {
      fr: "Refonte digitale sur-mesure pour marque de mode : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for marque de mode: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho marque de mode: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 14 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-5",
    name: "Studio Éclat",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorBeaute",
    services: ["website","social","strategy"],
    type: { fr: "institut beauté", en: "institut beauté", vi: "institut beauté" },
    desc: {
      fr: "Refonte digitale sur-mesure pour institut beauté : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for institut beauté: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho institut beauté: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 15 · WEBSITE + SOCIAL",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403398?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-6",
    name: "Véloréa Motors",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorAuto",
    services: ["website","conversion","ai"],
    type: { fr: "concession automobile", en: "concession automobile", vi: "concession automobile" },
    desc: {
      fr: "Refonte digitale sur-mesure pour concession automobile : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for concession automobile: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho concession automobile: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 16 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-7",
    name: "Forma Atelier",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArchitecture",
    services: ["website","branding","conversion"],
    type: { fr: "cabinet d’architecture", en: "cabinet d’architecture", vi: "cabinet d’architecture" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet d’architecture : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet d’architecture: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet d’architecture: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 17 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-8",
    name: "Rive & Pierre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website","seo"],
    type: { fr: "agence immobilière", en: "agence immobilière", vi: "agence immobilière" },
    desc: {
      fr: "Refonte digitale sur-mesure pour agence immobilière : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for agence immobilière: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho agence immobilière: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 18 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-9",
    name: "Northstar Executive",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","conversion","branding"],
    type: { fr: "cabinet de coaching", en: "cabinet de coaching", vi: "cabinet de coaching" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet de coaching : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet de coaching: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet de coaching: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 19 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-10",
    name: "Maison Terre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArtisanat",
    services: ["ecommerce","branding","seo"],
    type: { fr: "atelier artisanal", en: "atelier artisanal", vi: "atelier artisanal" },
    desc: {
      fr: "Refonte digitale sur-mesure pour atelier artisanal : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for atelier artisanal: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho atelier artisanal: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 20 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-11",
    name: "Clinique Horizon",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website","seo","maps"],
    type: { fr: "clinique privée", en: "clinique privée", vi: "clinique privée" },
    desc: {
      fr: "Refonte digitale sur-mesure pour clinique privée : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for clinique privée: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho clinique privée: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 21 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-12",
    name: "Kinetik Cloud",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","ai","booking"],
    type: { fr: "SaaS B2B", en: "SaaS B2B", vi: "SaaS B2B" },
    desc: {
      fr: "Refonte digitale sur-mesure pour SaaS B2B : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for SaaS B2B: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho SaaS B2B: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 22 · WEBSITE + AI",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-13",
    name: "Ardent Capital",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","seo","ecommerce"],
    type: { fr: "cabinet financier", en: "cabinet financier", vi: "cabinet financier" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet financier : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet financier: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet financier: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 23 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-14",
    name: "Oasis Escapes",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website","booking","social"],
    type: { fr: "agence de voyage", en: "agence de voyage", vi: "agence de voyage" },
    desc: {
      fr: "Refonte digitale sur-mesure pour agence de voyage : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for agence de voyage: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho agence de voyage: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 24 · WEBSITE + BOOKING",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-15",
    name: "Cabinet Valmont",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","seo","strategy"],
    type: { fr: "cabinet juridique", en: "cabinet juridique", vi: "cabinet juridique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet juridique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet juridique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet juridique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 25 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-16",
    name: "Institut Atlas",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","conversion","ai"],
    type: { fr: "école privée", en: "école privée", vi: "école privée" },
    desc: {
      fr: "Refonte digitale sur-mesure pour école privée : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for école privée: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho école privée: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 26 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-17",
    name: "Pulse Athletics",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website","social","conversion"],
    type: { fr: "club sportif", en: "club sportif", vi: "club sportif" },
    desc: {
      fr: "Refonte digitale sur-mesure pour club sportif : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for club sportif: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho club sportif: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 27 · WEBSITE + SOCIAL",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-18",
    name: "Villa North",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website","branding"],
    type: { fr: "promoteur immobilier", en: "promoteur immobilier", vi: "promoteur immobilier" },
    desc: {
      fr: "Refonte digitale sur-mesure pour promoteur immobilier : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for promoteur immobilier: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho promoteur immobilier: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 28 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-19",
    name: "Braise 21",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website","maps","branding"],
    type: { fr: "restaurant contemporain", en: "restaurant contemporain", vi: "restaurant contemporain" },
    desc: {
      fr: "Refonte digitale sur-mesure pour restaurant contemporain : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for restaurant contemporain: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho restaurant contemporain: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 29 · WEBSITE + MAPS",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-20",
    name: "Nexa Conseil",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","branding","seo"],
    type: { fr: "société de conseil", en: "société de conseil", vi: "société de conseil" },
    desc: {
      fr: "Refonte digitale sur-mesure pour société de conseil : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for société de conseil: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho société de conseil: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 30 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-21",
    name: "Maison Aurelia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorLuxe",
    services: ["website","branding","maps"],
    type: { fr: "site luxe", en: "site luxe", vi: "site luxe" },
    desc: {
      fr: "Refonte digitale sur-mesure pour site luxe : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for site luxe: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho site luxe: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 31 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1605100804763-247f67222fae?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-22",
    name: "Atelier Riviera",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website","booking"],
    type: { fr: "hôtel boutique", en: "hôtel boutique", vi: "hôtel boutique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour hôtel boutique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for hôtel boutique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho hôtel boutique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 32 · WEBSITE + BOOKING",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-23",
    name: "Maison Sépia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website","maps","ecommerce"],
    type: { fr: "restaurant gastronomique", en: "restaurant gastronomique", vi: "restaurant gastronomique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour restaurant gastronomique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for restaurant gastronomique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho restaurant gastronomique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 33 · WEBSITE + MAPS",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-24",
    name: "Atelier Nocturne",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorMode",
    services: ["ecommerce","branding","social"],
    type: { fr: "marque de mode", en: "marque de mode", vi: "marque de mode" },
    desc: {
      fr: "Refonte digitale sur-mesure pour marque de mode : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for marque de mode: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho marque de mode: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 34 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-25",
    name: "Studio Éclat",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorBeaute",
    services: ["website","social","strategy"],
    type: { fr: "institut beauté", en: "institut beauté", vi: "institut beauté" },
    desc: {
      fr: "Refonte digitale sur-mesure pour institut beauté : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for institut beauté: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho institut beauté: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 35 · WEBSITE + SOCIAL",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403398?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-26",
    name: "Véloréa Motors",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorAuto",
    services: ["website","conversion","ai"],
    type: { fr: "concession automobile", en: "concession automobile", vi: "concession automobile" },
    desc: {
      fr: "Refonte digitale sur-mesure pour concession automobile : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for concession automobile: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho concession automobile: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 36 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-27",
    name: "Forma Atelier",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArchitecture",
    services: ["website","branding","conversion"],
    type: { fr: "cabinet d’architecture", en: "cabinet d’architecture", vi: "cabinet d’architecture" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet d’architecture : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet d’architecture: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet d’architecture: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 37 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-28",
    name: "Rive & Pierre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website","seo"],
    type: { fr: "agence immobilière", en: "agence immobilière", vi: "agence immobilière" },
    desc: {
      fr: "Refonte digitale sur-mesure pour agence immobilière : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for agence immobilière: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho agence immobilière: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 38 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-29",
    name: "Northstar Executive",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","conversion","branding"],
    type: { fr: "cabinet de coaching", en: "cabinet de coaching", vi: "cabinet de coaching" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet de coaching : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet de coaching: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet de coaching: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 39 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-30",
    name: "Maison Terre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArtisanat",
    services: ["ecommerce","branding","seo"],
    type: { fr: "atelier artisanal", en: "atelier artisanal", vi: "atelier artisanal" },
    desc: {
      fr: "Refonte digitale sur-mesure pour atelier artisanal : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for atelier artisanal: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho atelier artisanal: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 40 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-31",
    name: "Clinique Horizon",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website","seo","maps"],
    type: { fr: "clinique privée", en: "clinique privée", vi: "clinique privée" },
    desc: {
      fr: "Refonte digitale sur-mesure pour clinique privée : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for clinique privée: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho clinique privée: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 41 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-32",
    name: "Kinetik Cloud",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","ai","booking"],
    type: { fr: "SaaS B2B", en: "SaaS B2B", vi: "SaaS B2B" },
    desc: {
      fr: "Refonte digitale sur-mesure pour SaaS B2B : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for SaaS B2B: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho SaaS B2B: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 42 · WEBSITE + AI",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-33",
    name: "Ardent Capital",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","seo","ecommerce"],
    type: { fr: "cabinet financier", en: "cabinet financier", vi: "cabinet financier" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet financier : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet financier: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet financier: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 43 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-34",
    name: "Oasis Escapes",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website","booking","social"],
    type: { fr: "agence de voyage", en: "agence de voyage", vi: "agence de voyage" },
    desc: {
      fr: "Refonte digitale sur-mesure pour agence de voyage : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for agence de voyage: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho agence de voyage: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 44 · WEBSITE + BOOKING",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-35",
    name: "Cabinet Valmont",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","seo","strategy"],
    type: { fr: "cabinet juridique", en: "cabinet juridique", vi: "cabinet juridique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet juridique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet juridique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet juridique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 45 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-36",
    name: "Institut Atlas",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","conversion","ai"],
    type: { fr: "école privée", en: "école privée", vi: "école privée" },
    desc: {
      fr: "Refonte digitale sur-mesure pour école privée : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for école privée: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho école privée: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 46 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-37",
    name: "Pulse Athletics",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorSante",
    services: ["website","social","conversion"],
    type: { fr: "club sportif", en: "club sportif", vi: "club sportif" },
    desc: {
      fr: "Refonte digitale sur-mesure pour club sportif : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for club sportif: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho club sportif: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 47 · WEBSITE + SOCIAL",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-38",
    name: "Villa North",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website","branding"],
    type: { fr: "promoteur immobilier", en: "promoteur immobilier", vi: "promoteur immobilier" },
    desc: {
      fr: "Refonte digitale sur-mesure pour promoteur immobilier : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for promoteur immobilier: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho promoteur immobilier: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 48 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-39",
    name: "Braise 21",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website","maps","branding"],
    type: { fr: "restaurant contemporain", en: "restaurant contemporain", vi: "restaurant contemporain" },
    desc: {
      fr: "Refonte digitale sur-mesure pour restaurant contemporain : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for restaurant contemporain: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho restaurant contemporain: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 49 · WEBSITE + MAPS",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-40",
    name: "Nexa Conseil",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorTech",
    services: ["website","branding","seo"],
    type: { fr: "société de conseil", en: "société de conseil", vi: "société de conseil" },
    desc: {
      fr: "Refonte digitale sur-mesure pour société de conseil : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for société de conseil: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho société de conseil: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 50 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-41",
    name: "Maison Aurelia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorLuxe",
    services: ["website","branding","maps"],
    type: { fr: "site luxe", en: "site luxe", vi: "site luxe" },
    desc: {
      fr: "Refonte digitale sur-mesure pour site luxe : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for site luxe: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho site luxe: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 51 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1605100804763-247f67222fae?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-42",
    name: "Atelier Riviera",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorHotellerie",
    services: ["website","booking"],
    type: { fr: "hôtel boutique", en: "hôtel boutique", vi: "hôtel boutique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour hôtel boutique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for hôtel boutique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho hôtel boutique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 52 · WEBSITE + BOOKING",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-43",
    name: "Maison Sépia",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorGastronomie",
    services: ["website","maps","ecommerce"],
    type: { fr: "restaurant gastronomique", en: "restaurant gastronomique", vi: "restaurant gastronomique" },
    desc: {
      fr: "Refonte digitale sur-mesure pour restaurant gastronomique : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for restaurant gastronomique: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho restaurant gastronomique: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 53 · WEBSITE + MAPS",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-44",
    name: "Atelier Nocturne",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorMode",
    services: ["ecommerce","branding","social"],
    type: { fr: "marque de mode", en: "marque de mode", vi: "marque de mode" },
    desc: {
      fr: "Refonte digitale sur-mesure pour marque de mode : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for marque de mode: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho marque de mode: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 54 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-45",
    name: "Studio Éclat",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorBeaute",
    services: ["website","social","strategy"],
    type: { fr: "institut beauté", en: "institut beauté", vi: "institut beauté" },
    desc: {
      fr: "Refonte digitale sur-mesure pour institut beauté : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for institut beauté: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho institut beauté: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 55 · WEBSITE + SOCIAL",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403398?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-46",
    name: "Véloréa Motors",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorAuto",
    services: ["website","conversion","ai"],
    type: { fr: "concession automobile", en: "concession automobile", vi: "concession automobile" },
    desc: {
      fr: "Refonte digitale sur-mesure pour concession automobile : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for concession automobile: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho concession automobile: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 56 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-47",
    name: "Forma Atelier",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArchitecture",
    services: ["website","branding","conversion"],
    type: { fr: "cabinet d’architecture", en: "cabinet d’architecture", vi: "cabinet d’architecture" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet d’architecture : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet d’architecture: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet d’architecture: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 57 · WEBSITE + BRANDING",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-48",
    name: "Rive & Pierre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorImmobilier",
    services: ["website","seo"],
    type: { fr: "agence immobilière", en: "agence immobilière", vi: "agence immobilière" },
    desc: {
      fr: "Refonte digitale sur-mesure pour agence immobilière : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for agence immobilière: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho agence immobilière: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 58 · WEBSITE + SEO",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-49",
    name: "Northstar Executive",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorCoaching",
    services: ["website","conversion","branding"],
    type: { fr: "cabinet de coaching", en: "cabinet de coaching", vi: "cabinet de coaching" },
    desc: {
      fr: "Refonte digitale sur-mesure pour cabinet de coaching : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for cabinet de coaching: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho cabinet de coaching: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 59 · WEBSITE + CONVERSION",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200"
  },
  {
    id: "reference-50",
    name: "Maison Terre",
    url: "https://xragency.vercel.app",
    sectorKey: "sectorArtisanat",
    services: ["ecommerce","branding","seo"],
    type: { fr: "atelier artisanal", en: "atelier artisanal", vi: "atelier artisanal" },
    desc: {
      fr: "Refonte digitale sur-mesure pour atelier artisanal : direction artistique, parcours mobile et architecture orientée conversion.",
      en: "Bespoke digital redesign for atelier artisanal: art direction, mobile journey and conversion-focused architecture.",
      vi: "Thiết kế lại số riêng cho atelier artisanal: định hướng nghệ thuật, hành trình mobile và kiến trúc tối ưu chuyển đổi."
    },
    metric: "REF 60 · ECOMMERCE + BRANDING",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=85&w=1200"
  }
];

export const SHOWCASE = [
  { id: "xr-pok-n-ball", name: "Pok-N Ball", url: "https://pokebowlfresh.vercel.app/", sectorKey: "sectorGastronomie", services: ["website","ecommerce"], type: { fr: "site restaurant / commande", en: "restaurant / ordering site", vi: "website nhà hàng / đặt món" }, desc: { fr: "Projet XR Agency : expérience digitale orientée commande et conversion.", en: "XR Agency project focused on ordering and conversion.", vi: "Dự án XR Agency tập trung vào đặt món và chuyển đổi." }, metric: "XR AGENCY · WEBSITE + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://pokebowlfresh.vercel.app/" },
  { id: "xr-french-paradise", name: "French Paradise", url: "https://frenchparadise.vn/", sectorKey: "sectorGastronomie", services: ["website","branding","ecommerce"], type: { fr: "site food & restauration", en: "food & restaurant site", vi: "website ẩm thực & nhà hàng" }, desc: { fr: "Projet XR Agency : identité digitale et parcours de commande pour une marque food premium.", en: "XR Agency project: digital identity and ordering journey for a premium food brand.", vi: "Dự án XR Agency: nhận diện số và hành trình đặt món cho thương hiệu food cao cấp." }, metric: "XR AGENCY · FOOD + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://frenchparadise.vn/" },
];

/** Legacy alias — keep PORTFOLIO pointing to showcase for backward compatibility */
export const PORTFOLIO = SHOWCASE.map((s, i) => ({
  plate: String(i + 1).padStart(2, "0"),
  name: s.name,
  sector: s.type,
  result: { fr: s.metric, en: s.metric, vi: s.metric },
  tags: [s.type.en],
  image: s.image,
}));

export const TESTIMONIALS = [];
