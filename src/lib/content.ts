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
  isQuoteOnly?: boolean;
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
      fr: "Le calendrier est défini après validation du périmètre, des contenus nécessaires et des éventuelles intégrations. Il est précisé dans le devis avant le démarrage.",
      en: "The schedule is set after the scope, required content and integrations have been confirmed. It is stated in the quote before work begins.",
      vi: "Lịch thực hiện được xác định sau khi thống nhất phạm vi, nội dung cần thiết và các tích hợp. Thời gian được ghi rõ trong báo giá trước khi bắt đầu.",
      ar: "يُحدد الجدول الزمني بعد اعتماد نطاق العمل والمحتوى المطلوب والتكاملات، ويُذكر في عرض السعر قبل بدء التنفيذ.",
      ru: "Сроки определяются после согласования объёма, необходимых материалов и интеграций и указываются в смете до начала работ.",
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
      ar: "هل تعملون عن بُعد وعلى المستوى الدولي؟",
      ru: "Вы работаете удалённо и с международными клиентами?",
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
      ar: "هل تشمل الخدمة حقوق استخدام الهوية البصرية؟",
      ru: "Включены ли права на использование фирменного стиля?",
    },
    a: {
      fr: "Les droits d’utilisation, les fichiers sources et les éléments tiers sont précisés dans le devis et le contrat selon le périmètre de la prestation.",
      en: "Usage rights, source files and third-party assets are specified in the quote and contract according to the agreed scope.",
      vi: "Quyền sử dụng, tệp nguồn và tài sản của bên thứ ba được nêu rõ trong báo giá và hợp đồng theo phạm vi dịch vụ.",
      ar: "تُحدد حقوق الاستخدام والملفات المصدرية والعناصر التابعة لأطراف ثالثة في عرض السعر والعقد وفق نطاق الخدمة.",
      ru: "Права использования, исходные файлы и сторонние материалы указываются в смете и договоре в соответствии с согласованным объёмом.",
    },
  },
];

export const SHOWCASE = [
  { id: "xr-pok-n-ball", name: "Pok-N Ball", url: "https://pokebowlfresh.vercel.app/", sectorKey: "sectorGastronomie", services: ["websites"], type: { fr: "site restaurant / commande", en: "restaurant / ordering site", vi: "website nhà hàng / đặt món", ar: "موقع مطعم وطلبات", ru: "Сайт ресторана и заказов" }, desc: { fr: "Projet XR Agency : expérience digitale orientée commande et conversion.", en: "XR Agency project focused on ordering and conversion.", vi: "Dự án XR Agency tập trung vào đặt món và chuyển đổi.", ar: "مشروع XR Agency يركز على الطلبات والتحويل الرقمي.", ru: "Проект XR Agency с акцентом на заказы и конверсию." }, metric: "XR AGENCY · WEBSITE + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://pokebowlfresh.vercel.app/" },
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
