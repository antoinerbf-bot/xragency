import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Search, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EmberButton, Reveal } from "@/components/site/primitives";

const SEO_COPY = {
  fr: {
    kicker: "SEO DOMINATION · 06",
    title: "Référencement naturel",
    lead: "Le SEO n'est pas une ligne sur un devis : c'est un accompagnement continu pour construire une visibilité rentable, une autorité durable et une acquisition organique qui progresse dans le temps.",
    back: "Catalogue des prestations",
    wa: "Parler à un expert",
    plansLabel: "Trois niveaux d'accompagnement",
    plansTitle: "Choisissez votre trajectoire de croissance.",
    annual: "Engagement annuel disponible sur mesure",
    note: "Aucune garantie artificielle de positionnement. Nous travaillons les leviers qui influencent réellement la visibilité : technique, sémantique, contenu, autorité et optimisation continue.",
    plans: [
      {
        name: "SEO Local",
        price: "299 €",
        period: "/ mois",
        tagline: "Construire une présence locale solide.",
        audience: "Pour commerces, indépendants, restaurants, cabinets et entreprises locales.",
        features: ["Audit technique & sémantique initial", "Recherche de mots-clés locaux & intentions", "Optimisation des pages stratégiques", "Structure et maillage interne", "Plan éditorial local", "Suivi des performances", "Rapport mensuel & recommandations"],
      },
      {
        name: "SEO Boost",
        price: "499 €",
        period: "/ mois",
        tagline: "Accélérer la visibilité et le trafic qualifié.",
        audience: "Pour entreprises qui veulent produire, optimiser et renforcer leur couverture sémantique.",
        popular: true,
        features: ["Tout le SEO Local", "Stratégie sémantique approfondie", "Production & optimisation de contenus", "Optimisation technique continue", "Maillage interne avancé", "Analyse concurrentielle régulière", "Suivi des positions, trafic & conversions", "Rapport mensuel stratégique"],
      },
      {
        name: "SEO Pro",
        price: "799 €",
        period: "/ mois",
        tagline: "Déployer une véritable stratégie de domination organique.",
        audience: "Pour marques ambitieuses, marchés concurrentiels et entreprises nationales.",
        features: ["Tout le SEO Boost", "Stratégie SEO complète multi-intentions", "Production éditoriale renforcée", "Optimisations techniques prioritaires", "Stratégie d'autorité & netlinking", "Analyse concurrentielle avancée", "Pilotage des opportunités de croissance", "Reporting et recommandations de direction"],
      },
    ],
    pillars: [
      ["01", "Technique", "Indexation, architecture, performances, données, maillage et fondations nécessaires à une croissance saine."],
      ["02", "Sémantique & contenu", "Nous construisons une couverture de recherche autour des intentions réellement utiles à votre activité."],
      ["03", "Autorité", "Popularité, pertinence, concurrence et signaux externes : nous renforçons progressivement votre positionnement."],
    ],
    results: [["Visibilité", "Plus de requêtes stratégiques couvertes"], ["Trafic qualifié", "Des visiteurs avec une intention commerciale réelle"], ["Croissance", "Un actif digital qui continue de produire dans le temps"]],
  },
  en: {
    kicker: "SEO DOMINATION · 06",
    title: "Organic Search",
    lead: "SEO is not a line on a quote. It is continuous growth work designed to build profitable visibility, durable authority and compounding organic acquisition.",
    back: "Services catalogue",
    wa: "Talk to an expert",
    plansLabel: "Three growth tracks",
    plansTitle: "Choose your growth trajectory.",
    annual: "Annual engagement available on a bespoke basis",
    note: "No artificial ranking guarantees. We work on the levers that genuinely influence visibility: technical foundations, semantics, content, authority and continuous optimisation.",
    plans: [
      { name: "Local SEO", price: "€299", period: "/ month", tagline: "Build a strong local presence.", audience: "For local businesses, independent professionals, restaurants and practices.", features: ["Initial technical & semantic audit", "Local keyword & intent research", "Strategic page optimisation", "Site structure & internal linking", "Local editorial plan", "Performance monitoring", "Monthly reporting & recommendations"] },
      { name: "SEO Boost", price: "€499", period: "/ month", tagline: "Accelerate visibility and qualified traffic.", audience: "For businesses ready to expand their semantic coverage and content engine.", popular: true, features: ["Everything in Local SEO", "Advanced semantic strategy", "Content production & optimisation", "Continuous technical optimisation", "Advanced internal linking", "Regular competitor analysis", "Rankings, traffic & conversion tracking", "Strategic monthly reporting"] },
      { name: "SEO Pro", price: "€799", period: "/ month", tagline: "Deploy a true organic growth strategy.", audience: "For ambitious brands, competitive markets and national businesses.", features: ["Everything in SEO Boost", "Full multi-intent SEO strategy", "Expanded editorial production", "Priority technical optimisation", "Authority & link strategy", "Advanced competitor analysis", "Growth opportunity management", "Executive reporting & recommendations"] },
    ],
    pillars: [["01", "Technical", "Indexation, architecture, performance, data, internal linking and the foundations required for healthy growth."], ["02", "Semantics & content", "We build search coverage around the intents that actually matter to your business."], ["03", "Authority", "Relevance, competition and external signals are strengthened progressively to support durable visibility."]],
    results: [["Visibility", "More strategic search queries covered"], ["Qualified traffic", "Visitors with genuine commercial intent"], ["Growth", "A digital asset that keeps producing over time"]],
  },
  vi: {
    kicker: "SEO DOMINATION · 06",
    title: "SEO tự nhiên",
    lead: "SEO không chỉ là một dòng trong báo giá: đó là quá trình đồng hành liên tục để xây dựng khả năng hiển thị, uy tín và tăng trưởng tự nhiên bền vững.",
    back: "Danh mục dịch vụ",
    wa: "Trao đổi với chuyên gia",
    plansLabel: "Ba cấp độ đồng hành",
    plansTitle: "Chọn lộ trình tăng trưởng của bạn.",
    annual: "Có gói cam kết hàng năm theo nhu cầu",
    note: "Không đưa ra cam kết thứ hạng giả tạo. Chúng tôi tập trung vào kỹ thuật, ngữ nghĩa, nội dung, uy tín và tối ưu liên tục.",
    plans: [
      { name: "SEO Local", price: "299 €", period: "/ tháng", tagline: "Xây dựng sự hiện diện địa phương vững chắc.", audience: "Cho doanh nghiệp địa phương, nhà hàng, chuyên gia và cửa hàng.", features: ["Audit kỹ thuật & ngữ nghĩa", "Nghiên cứu từ khóa địa phương", "Tối ưu các trang chiến lược", "Cấu trúc & liên kết nội bộ", "Kế hoạch nội dung địa phương", "Theo dõi hiệu suất", "Báo cáo hàng tháng"] },
      { name: "SEO Boost", price: "499 €", period: "/ tháng", tagline: "Tăng tốc khả năng hiển thị và traffic chất lượng.", audience: "Cho doanh nghiệp muốn mở rộng phạm vi nội dung và từ khóa.", popular: true, features: ["Toàn bộ SEO Local", "Chiến lược ngữ nghĩa nâng cao", "Sản xuất & tối ưu nội dung", "Tối ưu kỹ thuật liên tục", "Liên kết nội bộ nâng cao", "Phân tích đối thủ", "Theo dõi thứ hạng, traffic & chuyển đổi", "Báo cáo chiến lược hàng tháng"] },
      { name: "SEO Pro", price: "799 €", period: "/ tháng", tagline: "Triển khai chiến lược tăng trưởng tự nhiên toàn diện.", audience: "Cho thương hiệu tham vọng và thị trường cạnh tranh cao.", features: ["Toàn bộ SEO Boost", "Chiến lược SEO đa ý định", "Sản xuất nội dung mở rộng", "Tối ưu kỹ thuật ưu tiên", "Chiến lược uy tín & liên kết", "Phân tích đối thủ nâng cao", "Quản lý cơ hội tăng trưởng", "Báo cáo & đề xuất cấp quản lý"] },
    ],
    pillars: [["01", "Kỹ thuật", "Lập chỉ mục, kiến trúc, hiệu suất, dữ liệu và liên kết nội bộ."], ["02", "Ngữ nghĩa & nội dung", "Xây dựng độ phủ tìm kiếm dựa trên nhu cầu thực tế của khách hàng."], ["03", "Uy tín", "Từng bước củng cố mức độ liên quan, cạnh tranh và tín hiệu bên ngoài."]],
    results: [["Hiển thị", "Phủ nhiều truy vấn chiến lược hơn"], ["Traffic chất lượng", "Thu hút khách có nhu cầu thương mại thực sự"], ["Tăng trưởng", "Tài sản số tiếp tục tạo giá trị theo thời gian"]],
  },
} as const;

export const Route = createFileRoute("/services/seo")({
  head: () => ({ meta: [{ title: "SEO Domination — Référencement naturel | XR Agency" }, { name: "description", content: "SEO Local, SEO Boost et SEO Pro : une stratégie de référencement construite autour de la technique, du contenu et de l'autorité." }] }),
  component: SeoPage,
});

function SeoPage() {
  const { lang } = useLang();
  const c = SEO_COPY[lang];
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XR Agency, je souhaite parler de mon accompagnement SEO.")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10 pt-28">
        <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4"><Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> {c.back}</Link><span className="label-mono text-xs text-muted-foreground">Accueil / Services / SEO</span></div></div>

        <section className="py-16 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-12 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-8"><Reveal><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary"><Sparkles className="h-3.5 w-3.5" /><span className="label-mono text-xs uppercase tracking-widest">{c.kicker}</span></div></Reveal><Reveal delay={80}><h1 className="display-serif mt-6 text-[clamp(2.7rem,7vw,6rem)] leading-[0.98] tracking-tight">{c.title}</h1></Reveal><Reveal delay={160}><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{c.lead}</p></Reveal><Reveal delay={240}><div className="mt-9 flex flex-wrap gap-4"><EmberButton href="#plans">{c.plansLabel}</EmberButton><a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-xs uppercase tracking-widest hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" /> {c.wa}</a></div></Reveal></div><Reveal delay={180} className="lg:col-span-4"><div className="surface-plate rounded-3xl border border-border p-8 shadow-2xl"><div className="flex items-center justify-between border-b border-border pb-5"><Search className="h-7 w-7 text-primary" /><span className="label-mono text-xs text-muted-foreground">XRAGENCY · SEO</span></div><div className="mt-7 text-4xl leading-none"><span className="display-serif text-primary">299 → 799 €</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Trois niveaux d'accompagnement selon votre marché, votre maturité et votre ambition.</p><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Sans promesse de classement artificielle</div></div></Reveal></div></div></section>

        <section id="plans" className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><Reveal><p className="label-mono text-xs uppercase tracking-widest text-primary">{c.plansLabel}</p><h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">{c.plansTitle}</h2><p className="mt-5 max-w-3xl text-muted-foreground">{c.note}</p></Reveal><div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-8">{c.plans.map((plan, i) => <Reveal key={plan.name} delay={i * 100} className="min-w-[88vw] snap-center sm:min-w-[70vw] lg:min-w-[calc((100%-4rem)/3)]"><article className={`group relative h-full overflow-hidden rounded-[2rem] border p-7 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl sm:p-9 ${plan.popular ? "border-primary/60 bg-primary/[0.06]" : "border-border bg-card/80"}`}><div className="absolute inset-x-0 top-0 h-1 bg-primary opacity-80" /><div className="flex items-start justify-between gap-4"><div><span className="label-mono text-xs text-primary">0{i + 1}</span><h3 className="display-serif mt-4 text-3xl sm:text-4xl">{plan.name}</h3></div>{plan.popular && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] text-primary">RECOMMANDÉ</span>}</div><p className="mt-5 text-base font-medium">{plan.tagline}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p><div className="mt-8 flex items-end gap-2 border-y border-border/60 py-6"><span className="display-serif text-5xl text-primary">{plan.price}</span><span className="label-mono mb-1 text-xs text-muted-foreground">{plan.period}</span></div><div className="space-y-3">{plan.features.map((feature) => <div key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{feature}</span></div>)}</div><div className="mt-8"><EmberButton href={wa}>{c.wa}</EmberButton></div></article></Reveal>)}</div><p className="mt-5 text-center label-mono text-[11px] text-muted-foreground">{c.annual}</p></div></section>

        <section className="border-b border-border/60 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><Reveal><p className="label-mono text-xs uppercase tracking-widest text-primary">SEO · 3 piliers</p><h2 className="display-serif mt-4 max-w-3xl text-4xl sm:text-5xl">Une stratégie qui travaille sur plusieurs fronts.</h2></Reveal><div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{c.pillars.map(([num, title, text]) => <Reveal key={num} className="min-w-[82vw] snap-center sm:min-w-[55vw] lg:min-w-0 lg:flex-1"><article className="surface-plate h-full rounded-3xl border border-border/60 p-8 sm:p-10"><span className="label-mono text-xs text-primary">{num}</span><h3 className="mt-6 text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p></article></Reveal>)}</div></div></section>

        <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-5"><p className="label-mono text-xs uppercase tracking-widest text-primary">Ce que l'on construit</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Une visibilité qui se construit, pas une promesse.</h2></div><div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">{c.results.map(([title, text]) => <div key={title} className="rounded-2xl border border-border/60 bg-card/60 p-6"><TrendingUp className="h-5 w-5 text-primary" /><div className="mt-5 font-semibold">{title}</div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></div></div></section>
        <Contact />
      </main>
    </div>
  );
}
