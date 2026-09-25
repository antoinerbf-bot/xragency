import type { L } from "./i18n";
import { SERVICES_PART1 } from "./content-services-a";
import { SERVICES_PART2 } from "./content-services-b";

export const CONTACT = {
  email: "contact.xragency@gmail.com",
  whatsapp: "https://wa.me/33767566783",
  phone: "+33 7 67 56 67 83",
  instagram: "https://www.instagram.com/xragency_",
  linkedin: "https://linkedin.com/company/xragency",
  facebook: "",
  tiktok: "",
  cities: "France · Dubaï · Asie · International",
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
  once: { fr: "paiement unique", en: "one-time payment", vi: "thanh toán một lần", ar: "دفعة واحدة", ru: "разовый платёж" },
  month: { fr: "/ mois", en: "/ month", vi: "/ tháng", ar: "/ شهر", ru: "/ месяц" },
  year: { fr: "/ an", en: "/ year", vi: "/ năm", ar: "/ سنة", ru: "/ год" },
};

export const SERVICES: Service[] = [...SERVICES_PART1, ...SERVICES_PART2] as Service[];

export type FaqCategory = "sites" | "seo" | "ads" | "ia" | "tarifs" | "delais" | "general";

export const FAQ: { q: L; a: L; category: FaqCategory }[] = [
  {
    category: "delais",
    q: {
      fr: "Combien de temps faut-il pour créer mon site ?",
      en: "How long does it take to build my website?",
      vi: "Mất bao lâu để hoàn thành website của tôi?",
      ar: "كم من الوقت يستغرق إنشاء موقعي؟",
      ru: "Сколько времени занимает создание сайта?",
    },
    a: {
      fr: "Selon la formule choisie : 7 jours pour un Site Vitrine, 14 jours pour un Site Business et 21 jours pour un E-commerce. Ces délais incluent la conception et les révisions.",
      en: "Depending on the plan: 7 days for a Showcase Site, 14 days for a Business Site and 21 days for an E-commerce site. These timeframes include design and revisions.",
      vi: "Tùy theo gói: 7 ngày cho website giới thiệu, 14 ngày cho website doanh nghiệp và 21 ngày cho thương mại điện tử. Thời gian này đã bao gồm thiết kế và chỉnh sửa.",
      ar: "بحسب الباقة: 7 أيام للموقع التعريفي، و14 يومًا لموقع الأعمال، و21 يومًا لمتجر إلكتروني. تشمل هذه المدد التصميم والمراجعات.",
      ru: "В зависимости от пакета: 7 дней для презентационного сайта, 14 дней для бизнес-сайта и 21 день для интернет-магазина. Сроки включают дизайн и правки.",
    },
  },
  {
    category: "tarifs",
    q: {
      fr: "Les prix affichés sont-ils définitifs ?",
      en: "Are the displayed prices final?",
      vi: "Giá hiển thị có phải là giá cuối cùng không?",
      ar: "هل الأسعار المعروضة نهائية؟",
      ru: "Окончательные ли указанные цены?",
    },
    a: {
      fr: "Les tarifs indiqués sont des prix de départ. Le devis final dépend du périmètre exact (pages, langues, intégrations). Aucun frais caché n'est ajouté après validation du devis.",
      en: "Listed rates are starting prices. The final quote depends on the exact scope (pages, languages, integrations). No hidden fees are added after quote approval.",
      vi: "Mức giá niêm yết là giá khởi điểm. Báo giá cuối phụ thuộc phạm vi cụ thể (trang, ngôn ngữ, tích hợp). Không có phí ẩn sau khi duyệt báo giá.",
      ar: "الأسعار المنشورة هي أسعار بدء. يعتمد العرض النهائي على النطاق الفعلي من صفحات ولغات وتكاملات. لا تتم إضافة رسوم مخفية بعد اعتماد العرض.",
      ru: "Опубликованные цены являются стартовыми. Финальная смета зависит от точного объёма: страниц, языков и интеграций. После согласования сметы скрытые сборы не добавляются.",
    },
  },
  {
    category: "general",
    q: {
      fr: "Travaillez-vous à distance et à l'international ?",
      en: "Do you work remotely and internationally?",
      vi: "Bạn có làm việc từ xa và quốc tế không?",
    },
    a: {
      fr: "Oui. XR Agency accompagne des clients en France, en Asie et à l'international, entièrement à distance, avec des points de suivi réguliers.",
      en: "Yes. XR Agency works with clients in France, Asia and internationally, fully remotely, with regular check-ins.",
      vi: "Có. XR Agency đồng hành với khách hàng tại Pháp, Châu Á và quốc tế, hoàn toàn từ xa, với các buổi cập nhật định kỳ.",
      ar: "نعم. تعمل XR Agency مع عملاء في فرنسا وآسيا ودوليًا عن بُعد بالكامل، مع نقاط متابعة منتظمة.",
      ru: "Да. XR Agency работает с клиентами во Франции, Азии и на международном уровне полностью удалённо, с регулярными точками контроля.",
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
      ar: "نعم. تصبح الهوية البصرية ملكًا لكم، مع نقل حقوق الاستخدام التجاري عند التسليم.",
      ru: "Да. Вы владеете своей визуальной айдентикой, а коммерческие права передаются при сдаче проекта.",
    },
  },
];

export const SHOWCASE = [
  { id: "xr-pok-n-ball", name: "Pok-N Ball", url: "https://pokebowlfresh.vercel.app/", sectorKey: "sectorGastronomie", services: ["websites","ecommerce"], type: { fr: "site restaurant / commande", en: "restaurant / ordering site", vi: "website nhà hàng / đặt món" }, desc: { fr: "Projet XR Agency : expérience digitale orientée commande et conversion.", en: "XR Agency project focused on ordering and conversion.", vi: "Dự án XR Agency tập trung vào đặt món và chuyển đổi." }, metric: "XR AGENCY · WEBSITE + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://pokebowlfresh.vercel.app/" },
  { id: "xr-french-paradise", name: "French Paradise", url: "https://frenchparadise.vn/", sectorKey: "sectorGastronomie", services: ["websites","branding","ecommerce"], type: { fr: "site food & restauration", en: "food & restaurant site", vi: "website ẩm thực & nhà hàng" }, desc: { fr: "Projet XR Agency : identité digitale et parcours de commande pour une marque food premium.", en: "XR Agency project: digital identity and ordering journey for a premium food brand.", vi: "Dự án XR Agency: nhận diện số và hành trình đặt món cho thương hiệu food cao cấp." }, metric: "XR AGENCY · FOOD + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://frenchparadise.vn/" },
];

export const PORTFOLIO = SHOWCASE.map((s, i) => ({
  plate: String(i + 1).padStart(2, "0"),
  name: s.name,
  sector: s.type,
  result: { fr: s.metric, en: s.metric, vi: s.metric },
  tags: [s.type.en],
  image: s.image,
}));

export const TESTIMONIALS = [];
