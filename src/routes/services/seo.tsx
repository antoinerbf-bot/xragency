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
    lead: "Une stratégie SEO construite pour rendre votre marque visible sur Google, capter une demande qualifiée et construire une croissance organique durable.",
    price: "299 €",
    period: "/ mois",
    cta: "Démarrer mon audit SEO",
    wa: "Parler à un expert",
    back: "Catalogue des prestations",
    intro: "Nous travaillons le fond, la technique et l'autorité de votre site — pas seulement quelques mots-clés.",
    pillars: [
      ["01", "Audit & stratégie", "Analyse technique, sémantique, concurrence et potentiel commercial pour définir les priorités qui comptent."],
      ["02", "SEO technique & contenu", "Architecture, indexation, performances, maillage interne et contenus conçus autour de l'intention de recherche."],
      ["03", "Autorité & suivi", "Netlinking, suivi des positions, Search Console, analyse des opportunités et ajustements continus."],
    ],
    results: [
      ["Visibilité", "Plus de requêtes stratégiques couvertes"],
      ["Trafic qualifié", "Des visiteurs avec une véritable intention d'achat"],
      ["Croissance", "Un actif digital qui continue de travailler dans le temps"],
    ],
    included: [
      "Audit SEO technique et sémantique",
      "Recherche de mots-clés et intentions de recherche",
      "Plan d'action priorisé",
      "Optimisations on-page et architecture",
      "Stratégie éditoriale et contenus",
      "Suivi des positions et des performances",
      "Rapport mensuel clair et recommandations",
    ],
  },
  en: {
    kicker: "SEO DOMINATION · 06",
    title: "Organic Search",
    lead: "An SEO strategy built to make your brand visible on Google, capture qualified demand and create durable organic growth.",
    price: "€299",
    period: "/ month",
    cta: "Start my SEO audit",
    wa: "Talk to an expert",
    back: "Services catalogue",
    intro: "We work on the substance, technical foundations and authority of your website — not just a list of keywords.",
    pillars: [
      ["01", "Audit & strategy", "Technical, semantic, competitive and commercial analysis to identify the priorities that matter."],
      ["02", "Technical SEO & content", "Architecture, indexing, performance, internal linking and content built around search intent."],
      ["03", "Authority & monitoring", "Link strategy, ranking monitoring, Search Console, opportunity analysis and continuous optimisation."],
    ],
    results: [
      ["Visibility", "More strategic search queries covered"],
      ["Qualified traffic", "Visitors with genuine buying intent"],
      ["Growth", "A digital asset that keeps working over time"],
    ],
    included: [
      "Technical and semantic SEO audit",
      "Keyword and search-intent research",
      "Prioritised action plan",
      "On-page and architecture optimisation",
      "Editorial and content strategy",
      "Ranking and performance monitoring",
      "Clear monthly reporting and recommendations",
    ],
  },
  vi: {
    kicker: "SEO DOMINATION · 06",
    title: "SEO tự nhiên",
    lead: "Chiến lược SEO giúp thương hiệu nổi bật trên Google, thu hút nhu cầu chất lượng và xây dựng tăng trưởng tự nhiên bền vững.",
    price: "299 €",
    period: "/ tháng",
    cta: "Bắt đầu audit SEO",
    wa: "Trao đổi với chuyên gia",
    back: "Danh mục dịch vụ",
    intro: "Chúng tôi tối ưu nền tảng, kỹ thuật và độ uy tín của website — không chỉ tập trung vào vài từ khóa.",
    pillars: [
      ["01", "Audit & chiến lược", "Phân tích kỹ thuật, ngữ nghĩa, đối thủ và tiềm năng thương mại để xác định ưu tiên."],
      ["02", "SEO kỹ thuật & nội dung", "Kiến trúc, lập chỉ mục, hiệu suất, liên kết nội bộ và nội dung theo ý định tìm kiếm."],
      ["03", "Uy tín & theo dõi", "Chiến lược liên kết, theo dõi thứ hạng, Search Console và tối ưu liên tục."],
    ],
    results: [
      ["Hiển thị", "Phủ nhiều truy vấn tìm kiếm chiến lược hơn"],
      ["Traffic chất lượng", "Thu hút khách có nhu cầu thực sự"],
      ["Tăng trưởng", "Tài sản số tiếp tục tạo giá trị theo thời gian"],
    ],
    included: [
      "Audit SEO kỹ thuật và ngữ nghĩa",
      "Nghiên cứu từ khóa và ý định tìm kiếm",
      "Kế hoạch hành động ưu tiên",
      "Tối ưu on-page và kiến trúc",
      "Chiến lược nội dung",
      "Theo dõi thứ hạng và hiệu suất",
      "Báo cáo hàng tháng và đề xuất rõ ràng",
    ],
  },
} as const;

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO Domination — Référencement naturel | XR Agency" },
      { name: "description", content: "Stratégie SEO premium : audit technique, contenu, autorité et suivi pour développer votre visibilité Google et votre trafic qualifié." },
      { property: "og:title", content: "SEO Domination — XR Agency" },
      { property: "og:description", content: "Une stratégie SEO premium conçue pour la visibilité, l'acquisition et la croissance organique." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  const { lang } = useLang();
  const c = SEO_COPY[lang];
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XR Agency, je souhaite un audit SEO pour mon entreprise.")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} />
      <Nav />
      <main className="relative z-10 pt-28">
        <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> {c.back}
            </Link>
            <span className="label-mono text-xs text-muted-foreground">Accueil / Services / SEO</span>
          </div>
        </div>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="label-mono text-xs uppercase tracking-widest">{c.kicker}</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="display-serif mt-6 text-[clamp(2.7rem,7vw,6rem)] leading-[0.98] tracking-tight">{c.title}</h1>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{c.lead}</p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <EmberButton href="#plans">{c.cta}</EmberButton>
                    <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-xs uppercase tracking-widest transition-all hover:border-primary hover:text-primary">
                      <MessageCircle className="h-4 w-4" /> {c.wa}
                    </a>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={180} className="lg:col-span-4">
                <div className="surface-plate rounded-3xl border border-border p-8 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border pb-5"><Search className="h-7 w-7 text-primary" /><span className="label-mono text-xs text-muted-foreground">XRAGENCY · SEO</span></div>
                  <div className="mt-7 flex items-baseline gap-2"><span className="display-serif text-5xl text-primary">{c.price}</span><span className="label-mono text-xs text-muted-foreground">{c.period}</span></div>
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Stratégie sur-mesure</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-accent/20 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal><p className="label-mono text-xs uppercase tracking-widest text-primary">SEO · 3 piliers</p><h2 className="display-serif mt-4 max-w-3xl text-3xl sm:text-5xl">{c.intro}</h2></Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {c.pillars.map(([num, title, text]) => <Reveal key={num}><article className="surface-plate rounded-2xl border border-border/60 p-7"><span className="label-mono text-xs text-primary">{num}</span><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5"><p className="label-mono text-xs uppercase tracking-widest text-primary">Pourquoi le SEO</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Une visibilité qui se construit.</h2><p className="mt-5 leading-relaxed text-muted-foreground">Pas de promesse magique ni de méthode générique. Chaque action est reliée à votre marché, vos concurrents et vos objectifs commerciaux.</p></div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">{c.results.map(([title, text], i) => <div key={title} className="rounded-2xl border border-border/60 bg-card/60 p-6"><TrendingUp className="h-5 w-5 text-primary" /><div className="mt-5 font-semibold">{title}</div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section id="plans" className="border-y border-border/60 bg-card/50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5"><p className="label-mono text-xs uppercase tracking-widest text-primary">Ce qui est inclus</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Une base SEO complète.</h2></div>
              <div className="lg:col-span-7 rounded-3xl border border-border bg-background p-7 sm:p-9">{c.included.map((item) => <div key={item} className="flex items-start gap-3 border-b border-border/60 py-3.5 last:border-0"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-sm">{item}</span></div>)}<div className="mt-7 flex flex-wrap gap-3"><EmberButton href={wa}>{c.cta}</EmberButton><Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs hover:border-primary hover:text-primary">Tous les services <ArrowRight className="h-3.5 w-3.5" /></Link></div></div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
