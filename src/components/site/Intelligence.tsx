import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Globe2,
  MapPinned,
  MousePointerClick,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

type Surface = "maps" | "seo" | "ads";
type PlanId = "local" | "growth" | "authority";

const copy = {
  fr: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Comprenez où Google peut vous rendre visible.",
    intro: "Trois surfaces. Trois logiques. Découvrez ce que vous achetez réellement — et pourquoi.",
    searchLabel: "Simulation de recherche",
    search: "restaurant français à Da Nang",
    sponsored: "Sponsorisé",
    organic: "Résultats naturels",
    maps: "Google Maps",
    mapsShort: "MAPS",
    seo: "SEO",
    ads: "Google Ads",
    adsUnavailable: "Non proposé par XRAGENCY",
    mapsTitle: "Être trouvé localement",
    mapsText: "Google Maps répond aux recherches où la proximité et l'intention locale comptent. Votre fiche, votre pertinence, votre distance et votre réputation influencent votre présence locale.",
    seoTitle: "Être trouvé sur les recherches organiques",
    seoText: "Le SEO travaille votre site et son autorité pour que Google puisse comprendre vos pages, les relier aux bonnes recherches et les faire progresser naturellement.",
    adsTitle: "Payer pour apparaître immédiatement",
    adsText: "Google Ads est une publicité payante. L'annonceur choisit notamment son ciblage et son budget. XRAGENCY ne vend pas cette prestation.",
    why: "Pourquoi ces résultats apparaissent-ils ?",
    mapsSignals: ["Pertinence de la fiche", "Distance / zone locale", "Réputation & avis", "Qualité des informations"],
    seoSignals: ["Pertinence des pages", "Structure technique", "Contenu utile", "Autorité & liens", "Concurrence"],
    adsSignals: ["Budget publicitaire", "Ciblage", "Enchères", "Pertinence de l'annonce"],
    journey: "Le SEO se construit",
    journeyText: "Une position n'est pas un bouton ON/OFF. On travaille, mesure, apprend et optimise dans le temps. Aucune position n'est garantie.",
    level: "Choisissez votre niveau d'accompagnement",
    levelText: "La différence de prix correspond au périmètre de travail, à la profondeur stratégique et au niveau de développement de votre visibilité.",
    local: "LOCAL",
    localSub: "Être visible dans votre zone",
    localPrice: "299 € / mois",
    localWhy: "Pour une entreprise dont l'objectif principal est la visibilité locale.",
    localItems: ["SEO local", "Optimisation des pages stratégiques", "Google Business Profile lorsque pertinent", "Suivi de visibilité", "Recommandations mensuelles"],
    growth: "GROWTH",
    growthSub: "Développer votre marché",
    growthPrice: "499 € / mois",
    growthWhy: "Pour développer votre couverture organique au-delà de quelques recherches locales.",
    growthItems: ["Tout le niveau Local", "Recherche de mots-clés approfondie", "Optimisation continue", "Stratégie et optimisation de contenus", "Analyse concurrentielle", "Maillage interne", "Reporting de progression"],
    authority: "AUTHORITY",
    authoritySub: "Construire une présence forte",
    authorityPrice: "799 € / mois",
    authorityWhy: "Pour les marchés concurrentiels où il faut travailler le SEO comme un véritable actif de croissance.",
    authorityItems: ["Tout le niveau Growth", "Audit technique approfondi", "Stratégie éditoriale", "Production / optimisation de contenus", "Analyse concurrentielle avancée", "Travail d'autorité", "Optimisation continue & reporting stratégique"],
    recommended: "Le plus complet",
    included: "Ce que vous achetez",
    compare: "Maps + SEO : pourquoi les deux ?",
    compareText: "Maps travaille votre visibilité locale. Le SEO travaille vos résultats organiques. Les deux surfaces répondent à des intentions différentes et peuvent se renforcer mutuellement.",
    mapsNeed: "Vous voulez être trouvé près de vous ?",
    seoNeed: "Vous voulez être trouvé sur vos services ?",
    both: "Les deux peuvent être complémentaires.",
    cta: "Recevoir mon analyse gratuite",
    ctaText: "Nous identifions les principales opportunités de visibilité de votre entreprise avant de vous proposer quoi que ce soit.",
    reset: "Réinitialiser",
    step: "Surface sélectionnée",
  },
  en: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Understand where Google can make you visible.",
    intro: "Three surfaces. Three mechanics. See what you are actually buying — and why.",
    searchLabel: "Search simulation",
    search: "best French restaurant in Da Nang",
    sponsored: "Sponsored",
    organic: "Organic results",
    maps: "Google Maps",
    mapsShort: "MAPS",
    seo: "SEO",
    ads: "Google Ads",
    adsUnavailable: "Not offered by XRAGENCY",
    mapsTitle: "Be found locally",
    mapsText: "Google Maps serves searches where proximity and local intent matter. Your profile, relevance, distance and reputation influence local visibility.",
    seoTitle: "Be found in organic search",
    seoText: "SEO works on your website and its authority so Google can understand your pages, match them to relevant searches and improve their organic visibility over time.",
    adsTitle: "Pay to appear immediately",
    adsText: "Google Ads is paid advertising. Advertisers control targeting and budget among other factors. XRAGENCY does not offer this service.",
    why: "Why do these results appear?",
    mapsSignals: ["Profile relevance", "Distance / local area", "Reputation & reviews", "Information quality"],
    seoSignals: ["Page relevance", "Technical structure", "Useful content", "Authority & links", "Competition"],
    adsSignals: ["Ad budget", "Targeting", "Bids", "Ad relevance"],
    journey: "SEO is built over time",
    journeyText: "A ranking is not an ON/OFF switch. We work, measure, learn and optimise over time. No position is guaranteed.",
    level: "Choose your level of support",
    levelText: "The price difference reflects the scope of work, strategic depth and level of visibility development.",
    local: "LOCAL",
    localSub: "Be visible in your area",
    localPrice: "€299 / month",
    localWhy: "For businesses whose primary goal is local visibility.",
    localItems: ["Local SEO", "Strategic page optimisation", "Google Business Profile when relevant", "Visibility tracking", "Monthly recommendations"],
    growth: "GROWTH",
    growthSub: "Develop your market",
    growthPrice: "€499 / month",
    growthWhy: "For businesses that want to expand organic coverage beyond a few local searches.",
    growthItems: ["Everything in Local", "Deeper keyword research", "Ongoing optimisation", "Content strategy & optimisation", "Competitor analysis", "Internal linking", "Progress reporting"],
    authority: "AUTHORITY",
    authoritySub: "Build a strong presence",
    authorityPrice: "€799 / month",
    authorityWhy: "For competitive markets where SEO needs to be treated as a genuine growth asset.",
    authorityItems: ["Everything in Growth", "Deep technical audit", "Editorial strategy", "Content production / optimisation", "Advanced competitor analysis", "Authority building", "Ongoing optimisation & strategic reporting"],
    recommended: "Most complete",
    included: "What you are buying",
    compare: "Maps + SEO: why both?",
    compareText: "Maps works on local visibility. SEO works on organic search results. They answer different search intents and can reinforce each other.",
    mapsNeed: "Want to be found nearby?",
    seoNeed: "Want to be found for your services?",
    both: "Both can work together.",
    cta: "Get my free visibility analysis",
    ctaText: "We identify the main visibility opportunities for your business before proposing anything.",
    reset: "Reset",
    step: "Selected surface",
  },
  vi: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Hiểu Google có thể giúp bạn xuất hiện ở đâu.",
    intro: "Ba vị trí. Ba cơ chế. Hiểu chính xác bạn đang mua gì — và vì sao.",
    searchLabel: "Mô phỏng tìm kiếm",
    search: "nhà hàng Pháp ngon ở Đà Nẵng",
    sponsored: "Được tài trợ",
    organic: "Kết quả tự nhiên",
    maps: "Google Maps",
    mapsShort: "MAPS",
    seo: "SEO",
    ads: "Google Ads",
    adsUnavailable: "XRAGENCY không cung cấp",
    mapsTitle: "Được tìm thấy tại địa phương",
    mapsText: "Google Maps phục vụ các tìm kiếm có yếu tố vị trí và nhu cầu địa phương. Hồ sơ, mức độ liên quan, khoảng cách và uy tín ảnh hưởng đến khả năng hiển thị.",
    seoTitle: "Được tìm thấy trong kết quả tự nhiên",
    seoText: "SEO tối ưu website và độ uy tín để Google hiểu nội dung, kết nối với các tìm kiếm phù hợp và cải thiện khả năng hiển thị tự nhiên theo thời gian.",
    adsTitle: "Trả tiền để xuất hiện ngay",
    adsText: "Google Ads là quảng cáo trả phí. Nhà quảng cáo kiểm soát mục tiêu và ngân sách cùng nhiều yếu tố khác. XRAGENCY không cung cấp dịch vụ này.",
    why: "Vì sao các kết quả này xuất hiện?",
    mapsSignals: ["Mức độ liên quan của hồ sơ", "Khoảng cách / khu vực", "Uy tín & đánh giá", "Chất lượng thông tin"],
    seoSignals: ["Mức độ liên quan của trang", "Cấu trúc kỹ thuật", "Nội dung hữu ích", "Uy tín & liên kết", "Cạnh tranh"],
    adsSignals: ["Ngân sách quảng cáo", "Nhắm mục tiêu", "Đấu giá", "Mức độ liên quan của quảng cáo"],
    journey: "SEO được xây dựng theo thời gian",
    journeyText: "Thứ hạng không phải công tắc bật/tắt. Chúng tôi làm việc, đo lường, học hỏi và tối ưu liên tục. Không có vị trí nào được đảm bảo.",
    level: "Chọn mức đồng hành",
    levelText: "Chênh lệch giá phản ánh phạm vi công việc, chiều sâu chiến lược và mức độ phát triển khả năng hiển thị.",
    local: "LOCAL",
    localSub: "Hiển thị trong khu vực",
    localPrice: "299 € / tháng",
    localWhy: "Cho doanh nghiệp ưu tiên khả năng hiển thị tại địa phương.",
    localItems: ["SEO địa phương", "Tối ưu các trang chiến lược", "Google Business Profile khi phù hợp", "Theo dõi khả năng hiển thị", "Đề xuất hàng tháng"],
    growth: "GROWTH",
    growthSub: "Phát triển thị trường",
    growthPrice: "499 € / tháng",
    growthWhy: "Cho doanh nghiệp muốn mở rộng phạm vi tìm kiếm tự nhiên vượt ra ngoài vài từ khóa địa phương.",
    growthItems: ["Tất cả Local", "Nghiên cứu từ khóa sâu hơn", "Tối ưu liên tục", "Chiến lược & tối ưu nội dung", "Phân tích đối thủ", "Liên kết nội bộ", "Báo cáo tiến độ"],
    authority: "AUTHORITY",
    authoritySub: "Xây dựng vị thế mạnh",
    authorityPrice: "799 € / tháng",
    authorityWhy: "Cho thị trường cạnh tranh, nơi SEO cần được xem như một tài sản tăng trưởng thực sự.",
    authorityItems: ["Tất cả Growth", "Audit kỹ thuật chuyên sâu", "Chiến lược biên tập", "Sản xuất / tối ưu nội dung", "Phân tích đối thủ nâng cao", "Xây dựng uy tín", "Tối ưu liên tục & báo cáo chiến lược"],
    recommended: "Đầy đủ nhất",
    included: "Bạn đang mua gì",
    compare: "Maps + SEO: vì sao nên kết hợp?",
    compareText: "Maps tập trung vào khả năng hiển thị địa phương. SEO tập trung vào kết quả tìm kiếm tự nhiên. Hai bề mặt phục vụ các ý định tìm kiếm khác nhau và có thể bổ trợ nhau.",
    mapsNeed: "Muốn được tìm thấy gần khách hàng?",
    seoNeed: "Muốn được tìm thấy với dịch vụ của mình?",
    both: "Hai dịch vụ có thể bổ trợ cho nhau.",
    cta: "Nhận phân tích miễn phí",
    ctaText: "Chúng tôi xác định các cơ hội hiển thị chính trước khi đề xuất bất kỳ dịch vụ nào.",
    reset: "Đặt lại",
    step: "Bề mặt đã chọn",
  },
} as const;

const plans: Record<PlanId, { price: keyof typeof copy.fr; title: keyof typeof copy.fr; sub: keyof typeof copy.fr; why: keyof typeof copy.fr; items: keyof typeof copy.fr }> = {
  local: { price: "localPrice", title: "local", sub: "localSub", why: "localWhy", items: "localItems" },
  growth: { price: "growthPrice", title: "growth", sub: "growthSub", why: "growthWhy", items: "growthItems" },
  authority: { price: "authorityPrice", title: "authority", sub: "authoritySub", why: "authorityWhy", items: "authorityItems" },
};

export function Intelligence() {
  const { lang } = useLang();
  const t = copy[lang] ?? copy.fr;
  const [surface, setSurface] = useState<Surface>("seo");
  const [plan, setPlan] = useState<PlanId>("growth");

  const surfaceData = {
    maps: { title: t.mapsTitle, text: t.mapsText, icon: MapPinned, signals: t.mapsSignals, accent: "border-sky-400/30" },
    seo: { title: t.seoTitle, text: t.seoText, icon: Search, signals: t.seoSignals, accent: "border-white/20" },
    ads: { title: t.adsTitle, text: t.adsText, icon: MousePointerClick, signals: t.adsSignals, accent: "border-amber-400/30" },
  }[surface];
  const SurfaceIcon = surfaceData.icon;
  const selectedPlan = plans[plan];
  const items = t[selectedPlan.items] as readonly string[];

  return (
    <section id="intelligence" className="relative overflow-hidden border-y border-border/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-4xl">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> {t.eyebrow}
            </div>
            <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">{t.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{t.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-3xl border border-border bg-background/70 shadow-2xl">
            <div className="border-b border-border px-5 py-5 md:px-8">
              <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.searchLabel}</div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3 font-medium">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span>{t.search}</span>
              </div>
            </div>

            <div className="grid border-b border-border md:grid-cols-3">
              {(["maps", "seo", "ads"] as Surface[]).map((id) => {
                const Icon = id === "maps" ? MapPinned : id === "seo" ? Search : MousePointerClick;
                const label = id === "maps" ? t.maps : id === "seo" ? t.seo : t.ads;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSurface(id)}
                    className={cn(
                      "group flex min-h-24 items-center gap-4 border-b border-border px-5 text-left transition md:border-b-0 md:border-r last:md:border-r-0 md:px-7",
                      surface === id ? "bg-foreground/[0.06]" : "hover:bg-muted/30",
                    )}
                  >
                    <div className="rounded-xl border border-border p-3"><Icon className="h-5 w-5" /></div>
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{id === "ads" ? t.sponsored : id === "maps" ? t.mapsShort : t.organic}</div>
                    </div>
                    {surface === id && <div className="ml-auto h-2 w-2 rounded-full bg-foreground" />}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-8 p-5 md:grid-cols-[1.05fr_.95fr] md:p-8">
              <div className={cn("rounded-2xl border p-6", surfaceData.accent)}>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.step}</div>
                    <h3 className="text-2xl font-medium">{surfaceData.title}</h3>
                  </div>
                  <SurfaceIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="leading-7 text-muted-foreground">{surfaceData.text}</p>
                <div className="mt-8">
                  <div className="mb-4 text-xs font-medium uppercase tracking-[0.16em]">{t.why}</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {surfaceData.signals.map((signal) => (
                      <div key={signal} className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-3 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-muted-foreground" />{signal}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/20 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <Target className="h-5 w-5" />
                  <div className="font-medium">{t.journey}</div>
                </div>
                <div className="space-y-4">
                  {["48", "31", "17", "9"].map((value, index) => (
                    <div key={value} className="flex items-center gap-3">
                      <span className="w-10 font-mono text-xs text-muted-foreground">#{value}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                        <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: `${25 + index * 20}%` }} />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{index === 3 ? "Goal" : "Work"}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-7 text-sm leading-6 text-muted-foreground">{t.journeyText}</p>
                {surface === "ads" && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-muted-foreground">
                    <X className="h-4 w-4" /> {t.adsUnavailable}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 mb-8 max-w-3xl">
            <h3 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">{t.level}</h3>
            <p className="mt-3 text-muted-foreground leading-7">{t.levelText}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {(Object.keys(plans) as PlanId[]).map((id) => {
            const p = plans[id];
            const active = plan === id;
            const planItems = t[p.items] as readonly string[];
            return (
              <Reveal key={id} delay={id === "local" ? 0 : id === "growth" ? 60 : 120}>
                <button
                  type="button"
                  onClick={() => setPlan(id)}
                  className={cn("h-full w-full rounded-3xl border p-6 text-left transition duration-300", active ? "border-foreground bg-foreground/[0.05] shadow-xl" : "border-border hover:border-foreground/30")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">{t[p.title]}</div>
                      <div className="mt-2 text-xl font-medium">{t[p.sub]}</div>
                    </div>
                    {active && <div className="rounded-full bg-foreground p-1 text-background"><Check className="h-3 w-3" /></div>}
                  </div>
                  <div className="mt-7 text-3xl font-medium tracking-tight">{t[p.price]}</div>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{t[p.why]}</p>
                  <div className="mt-6 border-t border-border pt-5">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.included}</div>
                    <ul className="space-y-2">
                      {planItems.map((item) => <li key={item} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />{item}</li>)}
                    </ul>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-6 rounded-3xl border border-border p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <div className="flex items-center gap-3 text-sm font-medium"><MapPinned className="h-4 w-4" /> {t.compare}</div>
              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{t.compareText}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-muted/40 p-4"><MapPinned className="h-4 w-4" /><div className="mt-3 text-sm font-medium">{t.maps}</div><div className="mt-1 text-xs text-muted-foreground">{t.mapsNeed}</div></div>
                <div className="rounded-2xl bg-muted/40 p-4"><Search className="h-4 w-4" /><div className="mt-3 text-sm font-medium">{t.seo}</div><div className="mt-1 text-xs text-muted-foreground">{t.seoNeed}</div></div>
                <div className="rounded-2xl bg-muted/40 p-4"><TrendingUp className="h-4 w-4" /><div className="mt-3 text-sm font-medium">Maps + SEO</div><div className="mt-1 text-xs text-muted-foreground">{t.both}</div></div>
              </div>
            </div>
            <div className="flex items-end">
              <Link to="/services/seo" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted">Voir l'offre SEO <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 rounded-3xl border border-border bg-foreground p-7 text-background md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-60"><Globe2 className="h-4 w-4" /> XRAGENCY</div>
                <h3 className="max-w-2xl text-3xl font-medium tracking-[-0.03em] md:text-4xl">{t.cta}</h3>
                <p className="mt-3 max-w-2xl leading-7 opacity-70">{t.ctaText}</p>
              </div>
              <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour XRAGENCY, je souhaite recevoir une analyse gratuite de ma visibilité Google.")}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90">{t.cta} <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex justify-end">
          <button type="button" onClick={() => { setSurface("seo"); setPlan("growth"); }} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><CircleDollarSign className="h-3.5 w-3.5" /> {t.reset}</button>
        </div>
      </div>
    </section>
  );
}
