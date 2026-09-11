import { useMemo, useState } from "react";
import { Check, ChevronRight, MapPin, Search, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PLANS = [
  {
    key: "presence",
    price: 199,
    title: { fr: "Local Presence", en: "Local Presence", vi: "Local Presence" },
    desc: {
      fr: "Pour construire une présence locale solide et comprendre où vous perdez de la visibilité.",
      en: "Build a strong local presence and understand where visibility is being lost.",
      vi: "Xây dựng hiện diện địa phương vững chắc và hiểu nơi bạn đang mất khả năng hiển thị.",
    },
    features: {
      fr: ["Audit Google Business Profile", "Optimisation des informations et catégories", "Analyse locale initiale", "Recommandations d'avis et de contenu"],
      en: ["Google Business Profile audit", "Information and category optimisation", "Initial local analysis", "Review and content recommendations"],
      vi: ["Kiểm tra Google Business Profile", "Tối ưu thông tin và danh mục", "Phân tích địa phương ban đầu", "Đề xuất đánh giá và nội dung"],
    },
  },
  {
    key: "growth",
    price: 399,
    title: { fr: "Local Growth", en: "Local Growth", vi: "Local Growth" },
    desc: {
      fr: "Pour travailler activement votre visibilité locale mois après mois.",
      en: "Actively develop your local visibility month after month.",
      vi: "Phát triển khả năng hiển thị địa phương một cách chủ động theo từng tháng.",
    },
    features: {
      fr: ["Tout Local Presence", "Optimisation continue de la fiche", "Stratégie de réputation", "Suivi des recherches locales", "Reporting mensuel clair"],
      en: ["Everything in Local Presence", "Ongoing profile optimisation", "Reputation strategy", "Local search monitoring", "Clear monthly reporting"],
      vi: ["Toàn bộ Local Presence", "Tối ưu hồ sơ liên tục", "Chiến lược danh tiếng", "Theo dõi tìm kiếm địa phương", "Báo cáo hàng tháng rõ ràng"],
    },
  },
  {
    key: "multi",
    price: 699,
    title: { fr: "Local Authority", en: "Local Authority", vi: "Local Authority" },
    desc: {
      fr: "Pour les marchés concurrentiels, établissements premium et réseaux multi-sites.",
      en: "For competitive markets, premium venues and multi-location businesses.",
      vi: "Dành cho thị trường cạnh tranh, thương hiệu cao cấp và doanh nghiệp nhiều địa điểm.",
    },
    features: {
      fr: ["Tout Local Growth", "Stratégie locale avancée", "Travail multi-zone / multi-site", "Analyse concurrentielle approfondie", "Accompagnement stratégique"],
      en: ["Everything in Local Growth", "Advanced local strategy", "Multi-area / multi-location work", "Deep competitor analysis", "Strategic support"],
      vi: ["Toàn bộ Local Growth", "Chiến lược địa phương nâng cao", "Triển khai nhiều khu vực / địa điểm", "Phân tích đối thủ chuyên sâu", "Đồng hành chiến lược"],
    },
  },
];

const COPY = {
  fr: {
    kicker: "Google Maps · Local Visibility",
    title: "Votre client vous cherche. Google décide où vous placer.",
    intro: "Découvrez visuellement ce que Google regarde, ce que XRAGENCY travaille et pourquoi une optimisation locale n'est pas une simple modification de votre fiche.",
    query: "restaurant français à Da Nang",
    maps: "Google Maps",
    organic: "SEO",
    ads: "Google Ads",
    mapsDesc: "Être visible lorsqu'un client cherche une entreprise près de lui.",
    organicDesc: "Être visible dans les résultats naturels pour vos services et vos sujets.",
    adsDesc: "Acheter de la visibilité publicitaire immédiate. Non proposé par XRAGENCY.",
    why: "Pourquoi Google vous place ici ?",
    factors: [
      ["Pertinence", "Votre fiche doit correspondre à la recherche."],
      ["Distance", "Google tient compte de la proximité avec la recherche locale."],
      ["Prominence", "Réputation, notoriété et signaux publics comptent."],
      ["Qualité du profil", "Catégories, services, informations, photos et activité doivent être cohérents."],
    ],
    work: "Ce que XRAGENCY travaille",
    bridge: "Maps et SEO ne font pas la même chose.",
    bridgeDesc: "Maps travaille votre présence locale. Le SEO travaille votre visibilité dans les résultats organiques. Les deux peuvent se renforcer.",
    pricing: "Pourquoi 199 €, 399 € ou 699 € ?",
    pricingDesc: "Le prix correspond à la profondeur du travail, au niveau de concurrence et au périmètre géographique. Nous ne vendons pas une position garantie : nous vendons un travail mesurable sur votre présence locale.",
    cta: "Recevoir mon analyse locale",
  },
  en: {
    kicker: "Google Maps · Local Visibility",
    title: "Your customer searches. Google decides where to place you.",
    intro: "See what Google looks at, what XRAGENCY works on and why local optimisation is more than editing a business profile.",
    query: "French restaurant in Da Nang",
    maps: "Google Maps",
    organic: "SEO",
    ads: "Google Ads",
    mapsDesc: "Be visible when a customer searches for a business nearby.",
    organicDesc: "Be visible in organic results for your services and topics.",
    adsDesc: "Buy immediate paid visibility. Not offered by XRAGENCY.",
    why: "Why does Google place you here?",
    factors: [["Relevance", "Your profile needs to match the local search."], ["Distance", "Google considers proximity for local searches."], ["Prominence", "Reputation, awareness and public signals matter."], ["Profile quality", "Categories, services, information, photos and activity should be consistent."]],
    work: "What XRAGENCY works on",
    bridge: "Maps and SEO do different jobs.",
    bridgeDesc: "Maps works on local presence. SEO works on organic search visibility. The two can reinforce each other.",
    pricing: "Why €199, €399 or €699?",
    pricingDesc: "Pricing reflects the depth of work, competitive pressure and geographic scope. We do not sell a guaranteed position; we sell measurable work on your local presence.",
    cta: "Get my local analysis",
  },
  vi: {
    kicker: "Google Maps · Local Visibility",
    title: "Khách hàng đang tìm kiếm. Google quyết định vị trí của bạn.",
    intro: "Xem Google đánh giá điều gì, XRAGENCY làm gì và vì sao tối ưu địa phương không chỉ là sửa hồ sơ doanh nghiệp.",
    query: "nhà hàng Pháp tại Đà Nẵng",
    maps: "Google Maps",
    organic: "SEO",
    ads: "Google Ads",
    mapsDesc: "Xuất hiện khi khách hàng tìm doanh nghiệp gần họ.",
    organicDesc: "Xuất hiện trong kết quả tự nhiên cho dịch vụ và chủ đề của bạn.",
    adsDesc: "Mua khả năng hiển thị trả phí ngay lập tức. XRAGENCY không cung cấp dịch vụ này.",
    why: "Vì sao Google đặt bạn ở đây?",
    factors: [["Mức độ liên quan", "Hồ sơ phải phù hợp với tìm kiếm địa phương."], ["Khoảng cách", "Google xem xét khoảng cách trong tìm kiếm địa phương."], ["Độ nổi bật", "Uy tín, nhận diện và các tín hiệu công khai đều quan trọng."], ["Chất lượng hồ sơ", "Danh mục, dịch vụ, thông tin, hình ảnh và hoạt động cần nhất quán."]],
    work: "XRAGENCY làm gì",
    bridge: "Maps và SEO làm hai nhiệm vụ khác nhau.",
    bridgeDesc: "Maps tập trung vào hiện diện địa phương. SEO tập trung vào khả năng hiển thị tự nhiên. Hai dịch vụ có thể hỗ trợ lẫn nhau.",
    pricing: "Vì sao 199 €, 399 € hoặc 699 €?",
    pricingDesc: "Giá phản ánh độ sâu công việc, mức độ cạnh tranh và phạm vi địa lý. Chúng tôi không bán vị trí được đảm bảo; chúng tôi bán công việc có thể đo lường trên hiện diện địa phương.",
    cta: "Nhận phân tích địa phương",
  },
} as const;

export function LocalVisibilityExperience() {
  const { lang } = useLang();
  const copy = COPY[lang];
  const [surface, setSurface] = useState<"maps" | "organic" | "ads">("maps");
  const [plan, setPlan] = useState(1);
  const selected = PLANS[plan];

  const surfaceContent = useMemo(() => ({
    maps: { title: copy.maps, desc: copy.mapsDesc },
    organic: { title: copy.organic, desc: copy.organicDesc },
    ads: { title: copy.ads, desc: copy.adsDesc },
  })[surface], [copy, surface]);

  return (
    <section className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl">
          <p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.kicker}</p>
          <h2 className="display-serif mt-4 text-4xl leading-[.98] sm:text-6xl">{copy.title}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-background">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 p-5 sm:p-6">
            <div className="flex items-center gap-3 text-sm"><Search className="h-4 w-4 text-primary" /><span>{copy.query}</span></div>
            <span className="label-mono text-[10px] text-muted-foreground">GOOGLE SEARCH SIMULATION</span>
          </div>

          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="border-b border-border/70 p-5 lg:border-b-0 lg:border-r sm:p-7">
              <p className="label-mono text-[10px] uppercase tracking-widest text-muted-foreground">{copy.why}</p>
              <div className="mt-5 space-y-3">
                {(["maps", "organic", "ads"] as const).map((key) => {
                  const active = surface === key;
                  const item = surfaceContentFor(key, copy);
                  return (
                    <button key={key} type="button" onClick={() => setSurface(key)} className={`w-full rounded-2xl border p-4 text-left transition-all ${active ? "border-primary bg-primary/[0.07]" : "border-border/70 hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">{item.title}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform ${active ? "translate-x-1 text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <div className="rounded-3xl border border-border/70 bg-card/50 p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {surface === "maps" ? <MapPin className="h-5 w-5 text-primary" /> : <Search className="h-5 w-5 text-primary" />}
                    <span className="font-medium">{surfaceContent.title}</span>
                  </div>
                  {surface === "ads" && <span className="label-mono text-[9px] text-muted-foreground">NOT OFFERED</span>}
                </div>
                <p className="mt-5 text-2xl leading-tight sm:text-3xl">{surfaceContent.desc}</p>
                {surface === "maps" && (
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {["Local relevance", "Distance", "Prominence"].map((item, i) => <div key={item} className="rounded-2xl border border-border/60 p-4"><span className="label-mono text-[9px] text-primary">0{i + 1}</span><p className="mt-2 text-sm">{item}</p></div>)}
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.factors.map(([title, desc], index) => (
                  <div key={title} className="rounded-2xl border border-border/60 p-5">
                    <span className="label-mono text-[10px] text-primary">0{index + 1}</span>
                    <h3 className="mt-3 font-medium">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-background p-7 sm:p-9">
            <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.work}</p></div>
            <div className="mt-8 space-y-5">
              {copy.factors.map(([title, desc]) => <div key={title} className="flex gap-4"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p></div></div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:p-9">
            <p className="label-mono text-xs uppercase tracking-widest text-primary">Maps + SEO</p>
            <h3 className="display-serif mt-4 text-4xl">{copy.bridge}</h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{copy.bridgeDesc}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">MAPS</span><p className="mt-2 text-sm">{copy.mapsDesc}</p></div><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">SEO</span><p className="mt-2 text-sm">{copy.organicDesc}</p></div></div>
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl"><p className="label-mono text-xs uppercase tracking-widest text-primary">Local Visibility</p><h3 className="display-serif mt-4 text-4xl sm:text-5xl">{copy.pricing}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy.pricingDesc}</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {PLANS.map((item, index) => {
              const active = plan === index;
              return <button key={item.key} type="button" onClick={() => setPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all ${active ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}>
                <span className="label-mono text-[10px] text-primary">0{index + 1} / 03</span>
                <h4 className="display-serif mt-4 text-3xl">{item.title[lang]}</h4>
                <div className="mt-5 flex items-end gap-2"><span className="display-serif text-4xl text-primary">{item.price} €</span><span className="label-mono mb-1 text-xs text-muted-foreground">{index === 0 ? "one-time" : "/ month"}</span></div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc[lang]}</p>
                <ul className="mt-6 space-y-3">{item.features[lang].map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul>
              </button>;
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-border/70 bg-background p-5 sm:flex sm:items-center sm:justify-between sm:gap-5"><div><p className="label-mono text-[10px] text-primary">{selected.title[lang]}</p><p className="mt-1 text-sm text-muted-foreground">{selected.desc[lang]}</p></div><a href="https://wa.me/33767566783" target="_blank" rel="noreferrer" className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground sm:mt-0">{copy.cta}</a></div>
        </div>
      </div>
    </section>
  );
}

function surfaceContentFor(key: "maps" | "organic" | "ads", copy: (typeof COPY)["fr"]) {
  return {
    maps: { title: copy.maps, desc: copy.mapsDesc },
    organic: { title: copy.organic, desc: copy.organicDesc },
    ads: { title: copy.ads, desc: copy.adsDesc },
  }[key];
}
