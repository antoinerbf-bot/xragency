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

  const surfaceMeta = {
    maps: { eyebrow: "LOCAL PACK", title: "Google Maps", color: "text-primary" },
    organic: { eyebrow: "ORGANIC SEARCH", title: "SEO", color: "text-primary" },
    ads: { eyebrow: "PAID SEARCH", title: "Google Ads", color: "text-muted-foreground" },
  }[surface];

  return (
    <section className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-5xl">
          <p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.kicker}</p>
          <h2 className="display-serif mt-4 text-4xl leading-[.92] sm:text-6xl">Comprenez Google <em className="text-primary not-italic italic">visuellement.</em></h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{copy.intro}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_35px_100px_-60px_rgba(0,0,0,.9)]">
          <div className="flex flex-col gap-4 border-b border-border/70 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3">
              <Search className="h-4 w-4 text-primary" />
              <span className="text-sm">{copy.query}</span>
              <span className="ml-auto hidden rounded-full bg-muted px-2 py-1 label-mono text-[8px] text-muted-foreground sm:block">SIMULATION</span>
            </div>
            <div className="flex gap-1 rounded-full border border-border/70 bg-card/70 p-1">
              {(["maps", "organic", "ads"] as const).map((key) => (
                <button key={key} type="button" onClick={() => setSurface(key)} className={`rounded-full px-4 py-2 label-mono text-[9px] uppercase tracking-[.12em] transition ${surface === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {key === "maps" ? "Maps" : key === "organic" ? "SEO" : "AdWords"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="border-b border-border/70 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <p className="label-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">Ce que vous regardez</p>
              <div className="mt-5 space-y-2">
                {(["maps", "organic", "ads"] as const).map((key) => {
                  const item = surfaceContentFor(key, copy);
                  const active = surface === key;
                  return (
                    <button key={key} type="button" onClick={() => setSurface(key)} className={`group w-full rounded-2xl border p-4 text-left transition-all ${active ? "border-primary/40 bg-primary/[.07] shadow-sm" : "border-border/70 hover:border-primary/30"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5"><span className={`h-2 w-2 rounded-full ${key === "ads" ? "bg-muted-foreground/50" : "bg-primary"}`} /><span className="font-medium">{item.title}</span></div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${active ? "translate-x-1 text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border/70 bg-card/50 p-4">
                <p className="label-mono text-[9px] uppercase tracking-[.16em] text-primary">À retenir</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{surface === "maps" ? "Maps = visibilité locale et appels / itinéraires." : surface === "organic" ? "SEO = visibilité naturelle sur vos pages et vos services." : "AdWords = publicité payante. Ce service n'est pas proposé par XRAGENCY."}</p>
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div><p className={`label-mono text-[9px] uppercase tracking-[.18em] ${surfaceMeta.color}`}>{surfaceMeta.eyebrow}</p><h3 className="display-serif mt-1 text-3xl sm:text-4xl">{surfaceMeta.title}</h3></div>
                {surface === "ads" ? <span className="rounded-full border border-border bg-muted px-3 py-1 label-mono text-[8px] text-muted-foreground">NON PROPOSÉ</span> : <span className="rounded-full border border-primary/20 bg-primary/[.06] px-3 py-1 label-mono text-[8px] text-primary">SERVICE XRAGENCY</span>}
              </div>

              {/* Application-like screen: deliberately built as UI, not a decorative stock image. */}
              <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-[#f7f7f5] text-[#202124] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-2 flex-1 rounded-lg border border-black/10 bg-[#f3f3f3] px-3 py-1.5 text-[9px] text-[#666]">google.com/search?q={copy.query}</div>
                </div>

                {surface === "maps" && <div className="grid min-h-[330px] sm:grid-cols-[.85fr_1.15fr]">
                  <div className="border-b border-black/10 bg-white p-4 sm:border-b-0 sm:border-r">
                    <div className="flex items-center gap-2 text-[10px] font-semibold"><MapPin className="h-3.5 w-3.5 text-[#4285f4]" /> Maps</div>
                    {[1,2,3].map((n) => <div key={n} className={`mt-3 rounded-xl border p-3 ${n === 1 ? "border-[#4285f4]/40 bg-[#f7fbff]" : "border-black/8"}`}><div className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#4285f4] text-[8px] text-white">{n}</span><div><p className="text-[10px] font-semibold">{n === 1 ? "Votre établissement" : `Concurrent local ${n}`}</p><p className="mt-0.5 text-[8px] text-[#777]">4.{n + 2} ★ · {120 + n * 74} avis</p></div></div><div className="mt-2 h-1.5 rounded-full bg-black/5"><div className="h-full rounded-full bg-[#4285f4]" style={{width:`${78-n*14}%`}} /></div></div>)}
                  </div>
                  <div className="relative min-h-[300px] overflow-hidden bg-[#dfe8d8]"><div className="absolute inset-0 opacity-60" style={{backgroundImage:"linear-gradient(30deg,transparent 45%,#fff 46%,#fff 49%,transparent 50%),linear-gradient(120deg,transparent 45%,#fff 46%,#fff 49%,transparent 50%)",backgroundSize:"90px 90px"}} /><div className="absolute left-[27%] top-[35%] grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#4285f4] text-white shadow-lg"><MapPin className="h-4 w-4" /></div><div className="absolute left-[58%] top-[52%] grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#ea4335] text-white shadow"><MapPin className="h-3 w-3" /></div><div className="absolute bottom-4 left-4 rounded-xl bg-white/95 p-3 shadow-lg"><p className="text-[8px] text-[#777]">RECHERCHE LOCALE</p><p className="mt-1 text-[11px] font-semibold">restaurant français à Da Nang</p><p className="mt-1 text-[8px] text-[#4285f4]">Votre visibilité dans le Local Pack</p></div></div>
                </div>}

                {surface === "organic" && <div className="min-h-[330px] bg-white p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-2 text-[10px]"><span className="font-bold text-[#4285f4]">Google</span><span className="rounded-full border border-black/10 px-2 py-1 text-[8px] text-[#777]">Résultats</span></div>
                  {[["XRAGENCY — Studio digital premium", "xragency.vercel.app", "Site premium, SEO, visibilité locale et expériences digitales sur mesure."],["Google SEO pour votre activité", "example.com/seo", "Comprendre comment vos clients recherchent vos services et construire votre visibilité."],["Agence digitale premium", "example.com/agence", "Une présence digitale pensée pour la conversion et l'image de marque."]].map(([title,url,desc],i)=><div key={title} className="mb-5 max-w-2xl"><p className="text-[8px] text-[#188038]">{url}</p><p className="mt-1 text-[13px] font-medium text-[#1a0dab]">{title}</p><p className="mt-1 text-[9px] leading-4 text-[#4d5156]">{desc}</p><span className="mt-2 inline-block rounded-full bg-[#f1f3f4] px-2 py-1 text-[7px] text-[#5f6368]">{i === 0 ? "Position organique" : "Résultat naturel"}</span></div>)}
                </div>}

                {surface === "ads" && <div className="min-h-[330px] bg-white p-6 sm:p-8"><div className="rounded-2xl border border-dashed border-black/15 bg-[#fafafa] p-6 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f1f3f4]"><Search className="h-5 w-5 text-[#777]" /></div><p className="mt-4 text-[12px] font-semibold">Google Ads / AdWords</p><p className="mx-auto mt-2 max-w-md text-[9px] leading-4 text-[#666]">Cette simulation montre à quoi correspond la publicité payante dans Google. XRAGENCY ne vend pas ce service : aucun bouton de devis n'est affiché.</p><span className="mt-4 inline-flex rounded-full border border-black/10 px-3 py-1.5 text-[8px] font-semibold text-[#666]">INFORMATION UNIQUEMENT</span></div></div>}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-sm font-medium">{surfaceContent.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{surfaceContent.desc}</p></div>
                {surface === "maps" && <a href="/services/maps" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 label-mono text-[9px] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Voir notre service <ChevronRight className="h-3.5 w-3.5" /></a>}
                {surface === "organic" && <a href="/services/seo" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 label-mono text-[9px] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Voir notre service <ChevronRight className="h-3.5 w-3.5" /></a>}
                {surface === "ads" && <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-border px-4 py-2.5 label-mono text-[9px] uppercase tracking-wider text-muted-foreground">Service non proposé</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-background p-7 sm:p-9">
            <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.work}</p></div>
            <div className="mt-8 space-y-5">{copy.factors.map(([title, desc]) => <div key={title} className="flex gap-4"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p></div></div>)}</div>
          </div>
          <div className="rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:p-9">
            <p className="label-mono text-xs uppercase tracking-widest text-primary">Maps + SEO</p>
            <h3 className="display-serif mt-4 text-4xl">{copy.bridge}</h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{copy.bridgeDesc}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">MAPS</span><p className="mt-2 text-sm">{copy.mapsDesc}</p><a href="/services/maps" className="mt-4 inline-flex items-center gap-1 label-mono text-[9px] uppercase tracking-wider text-primary">Voir notre service <ChevronRight className="h-3 w-3" /></a></div><div className="rounded-2xl border border-border/70 bg-background/60 p-5"><span className="label-mono text-[10px] text-primary">SEO</span><p className="mt-2 text-sm">{copy.organicDesc}</p><a href="/services/seo" className="mt-4 inline-flex items-center gap-1 label-mono text-[9px] uppercase tracking-wider text-primary">Voir notre service <ChevronRight className="h-3 w-3" /></a></div></div>
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl"><p className="label-mono text-xs uppercase tracking-widest text-primary">Local Visibility</p><h3 className="display-serif mt-4 text-4xl sm:text-5xl">{copy.pricing}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy.pricingDesc}</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">{PLANS.map((item,index)=>{const active=plan===index;return <button key={item.key} type="button" onClick={()=>setPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all ${active ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}><span className="label-mono text-[10px] text-primary">0{index+1} / 03</span><h4 className="display-serif mt-4 text-3xl">{item.title[lang]}</h4><div className="mt-5 flex items-end gap-2"><span className="display-serif text-4xl text-primary">{item.price} €</span><span className="label-mono mb-1 text-xs text-muted-foreground">{index===0 ? "one-time" : "/ month"}</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc[lang]}</p><ul className="mt-6 space-y-3">{item.features[lang].map(feature=><li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul></button>})}</div>
          <div className="mt-6 rounded-2xl border border-border/70 bg-background p-5 sm:flex sm:items-center sm:justify-between sm:gap-5"><div><p className="label-mono text-[10px] text-primary">{selected.title[lang]}</p><p className="mt-1 text-sm text-muted-foreground">{selected.desc[lang]}</p></div><a href="https://wa.me/33767566783" target="_blank" rel="noreferrer" className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground sm:mt-0">{copy.cta}</a></div>
        </div>
      </div>
    </section>
  );
}
