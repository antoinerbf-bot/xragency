import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Reveal } from "@/components/site/primitives";
import { LocalVisibilityExperience } from "@/components/site/LocalVisibilityExperience";
import { SocialManagementExperience } from "@/components/site/SocialManagementExperience";

type L = { fr: string; en: string; vi: string };
type PlanLike = { name: L; audience?: L; eur: number; period: "once" | "month" | "year"; features: L[]; popular?: boolean };
type ServiceLike = {
  id: string; num: string; title: L; short: L; description: L; fromEur: number; fromPeriod: "once" | "month" | "year";
  highlights: L[]; plans: PlanLike[]; steps?: { num: string; title: L; desc: L }[]; serviceFaqs?: { q: L; a: L }[];
};

const WEBSITE_SERVICE: ServiceLike = {
  id: "websites", num: "01",
  title: { fr: "Création de sites web", en: "Website Creation", vi: "Thiết kế website" },
  short: { fr: "Des sites conçus pour convaincre, convertir et évoluer.", en: "Websites designed to convince, convert and evolve.", vi: "Website được thiết kế để thuyết phục, chuyển đổi và phát triển." },
  description: { fr: "Du site vitrine premium au e-commerce avec paiement et réservation : une création sur mesure, responsive et pensée autour de votre activité.", en: "From premium showcase sites to e-commerce with payments and booking: bespoke, responsive and built around your business.", vi: "Từ website giới thiệu cao cấp đến thương mại điện tử có thanh toán và đặt chỗ: thiết kế riêng, responsive và phù hợp với doanh nghiệp." },
  fromEur: 499, fromPeriod: "once",
  highlights: [
    { fr: "Design sur-mesure", en: "Bespoke design", vi: "Thiết kế riêng" },
    { fr: "Responsive mobile & desktop", en: "Mobile & desktop responsive", vi: "Responsive mobile & desktop" },
    { fr: "SEO technique de base", en: "Technical SEO foundation", vi: "Nền tảng SEO kỹ thuật" },
    { fr: "E-commerce & réservation selon projet", en: "E-commerce & booking when required", vi: "Thương mại điện tử & đặt chỗ theo dự án" },
  ],
  plans: [
    { name: { fr: "Site Vitrine Pro", en: "Pro Showcase Site", vi: "Website Giới thiệu Pro" }, audience: { fr: "Jusqu'à 3 pages · idéal pour lancer ou professionnaliser votre présence", en: "Up to 3 pages · ideal to launch or professionalise your presence", vi: "Tối đa 3 trang · phù hợp để ra mắt hoặc nâng cấp hình ảnh" }, eur: 499, period: "once", features: [
      { fr: "Jusqu'à 3 pages", en: "Up to 3 pages", vi: "Tối đa 3 trang" }, { fr: "Design responsive premium", en: "Premium responsive design", vi: "Thiết kế responsive cao cấp" }, { fr: "Formulaire de contact / WhatsApp", en: "Contact form / WhatsApp", vi: "Biểu mẫu liên hệ / WhatsApp" }, { fr: "SEO technique de base", en: "Technical SEO foundation", vi: "SEO kỹ thuật cơ bản" }, { fr: "Analytics et mise en ligne", en: "Analytics and launch", vi: "Analytics và triển khai" }, { fr: "Hébergement 1 an inclus", en: "1 year hosting included", vi: "Bao gồm 1 năm lưu trữ" }, { fr: "Livraison : 7 jours pour ce format", en: "Delivery: 7 days for this format", vi: "Bàn giao: 7 ngày cho gói này" }, { fr: "Langue supplémentaire : +100 € / langue", en: "Extra language: +100 € / language", vi: "Thêm ngôn ngữ: +100 € / ngôn ngữ" }, ] },
    { name: { fr: "Site Business", en: "Business Site", vi: "Website Doanh nghiệp" }, audience: { fr: "Jusqu'à 5 pages · selon notre calendrier et la complexité du projet", en: "Up to 5 pages · according to our schedule and project complexity", vi: "Tối đa 5 trang · tùy lịch triển khai và độ phức tạp dự án" }, eur: 799, period: "once", popular: true, features: [
      { fr: "Jusqu'à 5 pages", en: "Up to 5 pages", vi: "Tối đa 5 trang" }, { fr: "Tout le Vitrine Pro", en: "Everything in Pro Showcase", vi: "Toàn bộ gói Giới thiệu Pro" }, { fr: "Sections commerciales avancées", en: "Advanced commercial sections", vi: "Các phần thương mại nâng cao" }, { fr: "Formulaires et intégrations", en: "Forms and integrations", vi: "Biểu mẫu và tích hợp" }, { fr: "Galerie photos / vidéos", en: "Photo / video gallery", vi: "Thư viện ảnh / video" }, { fr: "Analytics avancés", en: "Advanced analytics", vi: "Analytics nâng cao" }, { fr: "Délai indicatif : à partir de 14 jours selon disponibilités", en: "Indicative timing: from 14 days subject to availability", vi: "Thời gian dự kiến: từ 14 ngày tùy lịch triển khai" }, { fr: "Langue supplémentaire : +100 € / langue", en: "Extra language: +100 € / language", vi: "Thêm ngôn ngữ: +100 € / ngôn ngữ" }, ] },
    { name: { fr: "E-commerce & Réservation", en: "E-commerce & Booking", vi: "Thương mại điện tử & Đặt chỗ" }, audience: { fr: "À partir de 1 490 € · selon les fonctionnalités et intégrations", en: "From €1,490 · depending on features and integrations", vi: "Từ 1.490 € · tùy tính năng và tích hợp" }, eur: 1490, period: "once", features: [
      { fr: "Catalogue produits / services", en: "Product / service catalogue", vi: "Danh mục sản phẩm / dịch vụ" }, { fr: "Paiement en ligne sécurisé", en: "Secure online payments", vi: "Thanh toán trực tuyến an toàn" }, { fr: "Gestion des commandes", en: "Order management", vi: "Quản lý đơn hàng" }, { fr: "Réservation en ligne selon besoin", en: "Online booking when required", vi: "Đặt chỗ trực tuyến khi cần" }, { fr: "Formulaires et automatisations", en: "Forms and automations", vi: "Biểu mẫu và tự động hóa" }, { fr: "Plugins et intégrations nécessaires au projet", en: "Required plugins and project integrations", vi: "Plugin và tích hợp cần thiết cho dự án" }, { fr: "SEO technique, analytics et mise en ligne", en: "Technical SEO, analytics and launch", vi: "SEO kỹ thuật, analytics và triển khai" }, { fr: "Délai indicatif : à partir de 21 jours selon disponibilités", en: "Indicative timing: from 21 days subject to availability", vi: "Thời gian dự kiến: từ 21 ngày tùy lịch triển khai" }, { fr: "Langue supplémentaire : +100 € / langue", en: "Extra language: +100 € / language", vi: "Thêm ngôn ngữ: +100 € / ngôn ngữ" }, ] },
  ],
};

const MAINTENANCE_SERVICE: ServiceLike = {
  id: "maintenance", num: "06", title: { fr: "WebCare Maintenance", en: "WebCare Maintenance", vi: "WebCare Maintenance" },
  short: { fr: "Votre site évolue. Nous nous en occupons.", en: "Your website evolves. We take care of it.", vi: "Website của bạn phát triển. Chúng tôi chăm sóc nó." },
  description: { fr: "Un abonnement clair pour les petites modifications, corrections et évolutions courantes. Les demandes plus importantes font l'objet d'un devis séparé.", en: "A clear subscription for small edits, fixes and everyday improvements. Larger work is quoted separately.", vi: "Gói đăng ký rõ ràng cho các chỉnh sửa nhỏ, sửa lỗi và cải tiến thường xuyên. Hạng mục lớn được báo giá riêng." },
  fromEur: 29, fromPeriod: "month",
  highlights: [
    { fr: "2 modifications / mois — Essentiel", en: "2 edits / month — Essential", vi: "2 chỉnh sửa / tháng — Essential" },
    { fr: "5 modifications / mois — Business", en: "5 edits / month — Business", vi: "5 chỉnh sửa / tháng — Business" },
    { fr: "Modifications illimitées — Unlimited", en: "Unlimited edits — Unlimited", vi: "Chỉnh sửa không giới hạn — Unlimited" },
    { fr: "Sauvegardes & suivi technique", en: "Backups & technical monitoring", vi: "Sao lưu & giám sát kỹ thuật" },
  ],
  plans: [
    { name: { fr: "Essentiel", en: "Essential", vi: "Essential" }, eur: 29, period: "month", features: [
      { fr: "2 petites modifications / mois", en: "2 small edits / month", vi: "2 chỉnh sửa nhỏ / tháng" }, { fr: "Corrections de contenu et visuels", en: "Content and visual fixes", vi: "Sửa nội dung và hình ảnh" }, { fr: "1 intervention technique / mois", en: "1 technical intervention / month", vi: "1 can thiệp kỹ thuật / tháng" }, { fr: "Sauvegarde mensuelle", en: "Monthly backup", vi: "Sao lưu hàng tháng" }, { fr: "Délai de traitement standard", en: "Standard turnaround", vi: "Thời gian xử lý tiêu chuẩn" }, ] },
    { name: { fr: "Business", en: "Business", vi: "Business" }, eur: 59, period: "month", popular: true, features: [
      { fr: "5 petites modifications / mois", en: "5 small edits / month", vi: "5 chỉnh sửa nhỏ / tháng" }, { fr: "Corrections de contenu et visuels", en: "Content and visual fixes", vi: "Sửa nội dung và hình ảnh" }, { fr: "2 interventions techniques / mois", en: "2 technical interventions / month", vi: "2 can thiệp kỹ thuật / tháng" }, { fr: "Sauvegardes mensuelles", en: "Monthly backups", vi: "Sao lưu hàng tháng" }, { fr: "Priorité de traitement", en: "Priority turnaround", vi: "Ưu tiên xử lý" }, { fr: "Conseils d'évolution courante", en: "Everyday improvement advice", vi: "Tư vấn cải tiến thường xuyên" }, ] },
    { name: { fr: "Unlimited", en: "Unlimited", vi: "Unlimited" }, eur: 99, period: "month", features: [
      { fr: "Modifications illimitées dans le périmètre courant", en: "Unlimited edits within the regular scope", vi: "Chỉnh sửa không giới hạn trong phạm vi thông thường" }, { fr: "Corrections de contenu, visuels et sections", en: "Content, visual and section updates", vi: "Cập nhật nội dung, hình ảnh và section" }, { fr: "Suivi technique prioritaire", en: "Priority technical support", vi: "Hỗ trợ kỹ thuật ưu tiên" }, { fr: "Sauvegardes et surveillance", en: "Backups and monitoring", vi: "Sao lưu và giám sát" }, { fr: "Petites évolutions incluses", en: "Small improvements included", vi: "Bao gồm cải tiến nhỏ" }, { fr: "Les refontes, nouvelles fonctionnalités majeures et développements spécifiques sont sur devis", en: "Redesigns, major features and custom development are quoted separately", vi: "Thiết kế lại, tính năng lớn và phát triển riêng được báo giá riêng" }, ] },
  ],
};

const ECOMMERCE_SERVICE: ServiceLike = {
  id: "ecommerce", num: "WEB", title: { fr: "E-commerce & Réservation", en: "E-commerce & Booking", vi: "Thương mại điện tử & Đặt chỗ" },
  short: { fr: "Vendez, encaissez et recevez des réservations en ligne.", en: "Sell, take payments and receive bookings online.", vi: "Bán hàng, nhận thanh toán và đặt chỗ trực tuyến." },
  description: { fr: "Une expérience commerciale complète : catalogue, paiement sécurisé, réservation, gestion des commandes et intégrations adaptées à votre activité.", en: "A complete commercial experience: catalogue, secure payments, booking, order management and integrations adapted to your business.", vi: "Trải nghiệm thương mại hoàn chỉnh: danh mục, thanh toán an toàn, đặt chỗ, quản lý đơn hàng và tích hợp phù hợp." },
  fromEur: 1490, fromPeriod: "once",
  highlights: [
    { fr: "À partir de 1 490 €", en: "From €1,490", vi: "Từ 1.490 €" }, { fr: "Paiement en ligne", en: "Online payments", vi: "Thanh toán trực tuyến" }, { fr: "Réservation possible", en: "Booking available", vi: "Có thể đặt chỗ" }, { fr: "Catalogue & gestion des commandes", en: "Catalogue & order management", vi: "Danh mục & quản lý đơn hàng" },
  ],
  plans: [
    { name: { fr: "E-commerce Essentiel", en: "Essential E-commerce", vi: "E-commerce Essential" }, eur: 1490, period: "once", features: [
      { fr: "Design sur-mesure", en: "Bespoke design", vi: "Thiết kế riêng" }, { fr: "Catalogue produits / services", en: "Product / service catalogue", vi: "Danh mục sản phẩm / dịch vụ" }, { fr: "Paiement en ligne sécurisé", en: "Secure online payments", vi: "Thanh toán trực tuyến an toàn" }, { fr: "Gestion des commandes", en: "Order management", vi: "Quản lý đơn hàng" }, { fr: "Formulaire de contact et WhatsApp", en: "Contact form and WhatsApp", vi: "Biểu mẫu liên hệ và WhatsApp" }, { fr: "SEO technique & analytics", en: "Technical SEO & analytics", vi: "SEO kỹ thuật & analytics" }, { fr: "Mise en ligne et formation", en: "Launch and training", vi: "Triển khai và đào tạo" }, { fr: "À partir de 21 jours selon disponibilités", en: "From 21 days subject to availability", vi: "Từ 21 ngày tùy lịch triển khai" }, ] },
    { name: { fr: "E-commerce Pro", en: "Pro E-commerce", vi: "E-commerce Pro" }, eur: 1990, period: "once", popular: true, features: [
      { fr: "Tout l'Essentiel", en: "Everything in Essential", vi: "Toàn bộ Essential" }, { fr: "Réservation en ligne", en: "Online booking", vi: "Đặt chỗ trực tuyến" }, { fr: "Automatisations et intégrations avancées", en: "Advanced automations and integrations", vi: "Tự động hóa và tích hợp nâng cao" }, { fr: "Filtres, variantes et parcours sur mesure", en: "Filters, variants and bespoke flows", vi: "Bộ lọc, biến thể và luồng riêng" }, { fr: "Optimisation de conversion", en: "Conversion optimisation", vi: "Tối ưu chuyển đổi" }, { fr: "À partir de 21 jours selon disponibilités", en: "From 21 days subject to availability", vi: "Từ 21 ngày tùy lịch triển khai" }, ] },
    { name: { fr: "Premium sur mesure", en: "Custom Premium", vi: "Premium tùy chỉnh" }, eur: 2990, period: "once", features: [
      { fr: "Architecture commerciale sur mesure", en: "Bespoke commerce architecture", vi: "Kiến trúc thương mại riêng" }, { fr: "Fonctionnalités spécifiques", en: "Custom functionality", vi: "Tính năng riêng" }, { fr: "Connecteurs et automatisations métier", en: "Business connectors and automations", vi: "Kết nối và tự động hóa nghiệp vụ" }, { fr: "Parcours multilingue et international", en: "Multilingual and international flows", vi: "Luồng đa ngôn ngữ và quốc tế" }, { fr: "Accompagnement stratégique au lancement", en: "Strategic launch support", vi: "Hỗ trợ chiến lược khi ra mắt" }, { fr: "Délai défini selon le périmètre", en: "Timeline defined by scope", vi: "Thời gian xác định theo phạm vi" }, ] },
  ],
};

const SERVICE_ALIASES: Record<string, string> = {
  "seo-domination": "seo", "seo-domination-system": "seo", "seo": "seo", "referencement-naturel": "seo",
  "websites": "websites", "site-web": "websites", "creation-site-web": "websites", "creation-de-sites-web": "websites",
  "branding": "branding", "identite-visuelle": "branding", "maps": "maps", "google-maps": "maps", "google-maps-top-3": "maps",
  "social": "social", "community-management": "social", "community-management-social": "social", "social-media": "social", "social-media-management": "social",
  "maintenance": "maintenance", "webcare": "maintenance", "webcare-maintenance": "maintenance", "maintenance-cloud": "maintenance",
  "ecommerce": "ecommerce", "e-commerce": "ecommerce", "e-commerce-reservation": "ecommerce", "boutique-en-ligne": "ecommerce",
};

function resolveService(raw: string): ServiceLike | null {
  const id = SERVICE_ALIASES[raw] ?? raw;
  if (id === "websites") return WEBSITE_SERVICE;
  if (id === "maintenance") return MAINTENANCE_SERVICE;
  if (id === "ecommerce") return ECOMMERCE_SERVICE;
  const service = SERVICES.find((item) => item.id === id);
  return service ? (service as ServiceLike) : null;
}

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const raw = params.serviceId.toLowerCase();
    const service = resolveService(raw);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [{ title: "Service — XR Agency" }] };
    return { meta: [{ title: `${service.title.fr} — XR Agency` }, { name: "description", content: service.description.fr }, { property: "og:title", content: `${service.title.fr} — XR Agency` }, { property: "og:description", content: service.description.fr }, { property: "og:type", content: "website" }] };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const { t, lang, price } = useLang();
  const [selectedPlan, setSelectedPlan] = useState(Math.max(service.plans.findIndex((plan) => plan.popular), 0));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isSpecial = service.id === "maps" || service.id === "social";
  const waUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler du service « ${service.title[lang]} »${service.plans[selectedPlan] ? ` et du forfait « ${service.plans[selectedPlan].name[lang]} »` : ""}.`)}`;

  return <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground"><div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} /><Nav /><main className="relative z-10 pt-28">
    <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4"><Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />Catalogue des prestations</Link><div className="label-mono text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Accueil</Link> / Services / {t(service.title)}</div></div></div>
    <section className="py-14 lg:py-22"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-10"><div><Reveal><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary"><Sparkles className="h-3.5 w-3.5" /><span className="label-mono text-xs uppercase tracking-widest">XR AGENCY · {service.num}</span></div></Reveal><Reveal delay={80}><h1 className="display-serif mt-6 text-[clamp(2.8rem,7vw,6.4rem)] leading-[.95]">{t(service.title)}</h1></Reveal><Reveal delay={160}><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t(service.description)}</p></Reveal><Reveal delay={240}><div className="mt-8 flex flex-wrap gap-3"><a href={isSpecial ? "#contact" : "#plans"} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Voir les offres <ArrowRight className="h-4 w-4" /></a><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" />WhatsApp</a></div></Reveal></div><Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-border/70 bg-card"><img src={service.id === "ecommerce" ? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85" : service.id === "maintenance" ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85" : "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=85"} alt={t(service.title)} className="aspect-[4/3] w-full object-cover" loading="eager" /></Reveal></div></section>
    {!isSpecial && service.highlights.length > 0 && <section className="border-y border-border/60 bg-card/25 py-10"><div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">{service.highlights.slice(0, 4).map((item, index) => <div key={index} className="rounded-2xl border border-border/70 bg-background/50 p-5"><span className="label-mono text-[10px] text-primary">0{index + 1}</span><p className="mt-3 text-sm font-medium leading-relaxed">{t(item)}</p></div>)}</div></section>}
    {service.id === "maps" && <LocalVisibilityExperience />}{service.id === "social" && <SocialManagementExperience />}
    {!isSpecial && <section id="plans" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><Reveal><p className="label-mono text-xs uppercase tracking-widest text-primary">Les offres</p><h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">Une formule claire, adaptée au niveau de votre projet.</h2></Reveal><div className="mt-12 grid gap-6 lg:grid-cols-3">{service.plans.map((item, index) => <button key={index} type="button" onClick={() => setSelectedPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all sm:p-8 ${index === selectedPlan ? "border-primary bg-primary/[0.06] shadow-xl" : "border-border bg-card/70 hover:border-primary/40"}`}><div className="flex items-start justify-between gap-4"><span className="label-mono text-xs text-primary">0{index + 1} / {String(service.plans.length).padStart(2, "0")}</span>{item.popular && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">RECOMMANDÉ</span>}</div><h3 className="display-serif mt-5 text-3xl">{t(item.name)}</h3>{item.audience && <p className="mt-3 text-sm text-muted-foreground">{t(item.audience)}</p>}<div className="mt-7 flex items-end gap-2 border-y border-border/60 py-5"><span className="display-serif text-4xl text-primary">{price(item.eur)}</span><span className="label-mono mb-1 text-xs text-muted-foreground">{t(PERIOD_LABEL[item.period])}</span></div><ul className="mt-6 space-y-3">{item.features.map((feature, featureIndex) => <li key={featureIndex} className="flex gap-3 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{t(feature)}</span></li>)}</ul></button>)}</div><div className="mt-8 flex flex-col gap-5 rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"><div><p className="label-mono text-xs uppercase tracking-widest text-primary">Votre sélection</p><p className="mt-2 text-lg font-medium">{t(service.plans[selectedPlan].name)} · {price(service.plans[selectedPlan].eur)}</p></div><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Démarrer mon projet <ArrowRight className="h-4 w-4" /></a></div></div></section>}
    {service.steps?.length ? <section className="border-y border-border/60 bg-card/25 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><p className="label-mono text-xs uppercase tracking-widest text-primary">Process</p><div className="mt-8 divide-y divide-border/60 border-y border-border/60">{service.steps.map((step) => <div key={step.num} className="grid gap-4 py-7 md:grid-cols-[100px_260px_1fr]"><span className="label-mono text-xs text-primary">{step.num}</span><h3 className="display-serif text-2xl">{t(step.title)}</h3><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(step.desc)}</p></div>)}</div></div></section> : null}
    {service.serviceFaqs?.length ? <section className="py-20 lg:py-28"><div className="mx-auto max-w-5xl px-6 lg:px-10"><p className="label-mono text-xs uppercase tracking-widest text-primary">FAQ</p><div className="mt-8 divide-y divide-border/60 border-y border-border/60">{service.serviceFaqs.map((faq, index) => { const open = openFaq === index; return <button key={index} type="button" onClick={() => setOpenFaq(open ? null : index)} className="block w-full py-6 text-left"><div className="flex items-center justify-between gap-6"><h3 className="text-base font-medium sm:text-lg">{t(faq.q)}</h3><span className="label-mono text-xs text-primary">{open ? "−" : "+"}</span></div>{open && <p className="mt-4 max-w-3xl pr-8 text-sm leading-relaxed text-muted-foreground">{t(faq.a)}</p>}</button>; })}</div></div></section> : null}
    <section id="contact" className="border-t border-border/60 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="rounded-[2rem] border border-border bg-card/70 p-8 sm:p-12 lg:p-16"><p className="label-mono text-xs uppercase tracking-widest text-primary">XRAGENCY</p><h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">Un projet à construire ? Parlons-en.</h2><div className="mt-8"><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground">WhatsApp <ArrowRight className="h-4 w-4" /></a></div></div></div></section><Contact />
  </main></div>;
}
