import { useState } from "react";
import { ArrowRight, Check, Globe2, MapPinned, MousePointerClick, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

type Surface = "maps" | "seo" | "ads";

const copy = {
  fr: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Avant de choisir une prestation, comprenez votre visibilité.",
    intro: "Une simulation simple pour comprendre où vos clients peuvent vous trouver sur Google — et ce que XRAGENCY peut réellement travailler.",
    searchLabel: "Simulation de recherche",
    search: "restaurant français à Da Nang",
    maps: "Google Maps",
    seo: "SEO",
    ads: "Google Ads",
    mapsShort: "Visibilité locale",
    organic: "Résultats naturels",
    sponsored: "Publicité payante",
    mapsTitle: "Être trouvé localement",
    mapsText: "Maps répond aux recherches où la localisation compte. La pertinence de votre fiche, la distance, la réputation et la qualité de vos informations influencent votre visibilité.",
    seoTitle: "Être trouvé sur vos recherches stratégiques",
    seoText: "Le SEO travaille votre site, ses contenus et sa structure pour aider Google à comprendre vos pages et à les associer aux recherches pertinentes. C'est un travail progressif.",
    adsTitle: "Acheter de la visibilité immédiate",
    adsText: "Google Ads repose sur la publicité payante, avec notamment du ciblage, un budget et des enchères. XRAGENCY ne propose pas la gestion de campagnes Ads.",
    why: "Ce qui compte",
    mapsSignals: ["Pertinence de la fiche", "Distance et zone locale", "Avis et réputation", "Qualité des informations"],
    seoSignals: ["Pertinence des pages", "Structure technique", "Contenu utile", "Autorité et liens", "Concurrence"],
    adsSignals: ["Budget", "Ciblage", "Enchères", "Pertinence de l'annonce"],
    objective: "Deux leviers, deux intentions",
    objectiveText: "Maps et SEO ne remplacent pas l'un l'autre. Ils répondent à des moments différents du parcours de recherche et peuvent être travaillés ensemble.",
    local: "LOCAL",
    localText: "Votre priorité est d'être trouvé par les clients autour de vous.",
    organicLabel: "ORGANIQUE",
    organicText: "Votre priorité est d'être trouvé sur vos services, offres ou expertises.",
    combined: "COMBINÉ",
    combinedText: "Vous voulez construire une présence locale et organique cohérente.",
    adsUnavailable: "Non proposé par XRAGENCY",
    cta: "Recevoir mon analyse gratuite",
    ctaText: "Nous identifions les principales opportunités de visibilité de votre entreprise avant de vous proposer quoi que ce soit.",
    seoLink: "Découvrir le SEO",
    mapsLink: "Découvrir Google Maps",
    reset: "Réinitialiser",
  },
  en: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Before choosing a service, understand your visibility.",
    intro: "A simple simulation to understand where customers can find you on Google — and what XRAGENCY can actually work on.",
    searchLabel: "Search simulation",
    search: "best French restaurant in Da Nang",
    maps: "Google Maps",
    seo: "SEO",
    ads: "Google Ads",
    mapsShort: "Local visibility",
    organic: "Organic results",
    sponsored: "Paid advertising",
    mapsTitle: "Be found locally",
    mapsText: "Maps serves searches where location matters. Profile relevance, distance, reputation and information quality influence local visibility.",
    seoTitle: "Be found for strategic searches",
    seoText: "SEO works on your website, content and structure so Google can understand your pages and match them to relevant searches. It is progressive work.",
    adsTitle: "Buy immediate visibility",
    adsText: "Google Ads relies on paid advertising, including targeting, budget and bidding. XRAGENCY does not manage Ads campaigns.",
    why: "What matters",
    mapsSignals: ["Profile relevance", "Distance and local area", "Reviews and reputation", "Information quality"],
    seoSignals: ["Page relevance", "Technical structure", "Useful content", "Authority and links", "Competition"],
    adsSignals: ["Budget", "Targeting", "Bids", "Ad relevance"],
    objective: "Two levers, two intents",
    objectiveText: "Maps and SEO do not replace each other. They answer different moments in the search journey and can be developed together.",
    local: "LOCAL",
    localText: "Your priority is being found by customers around you.",
    organicLabel: "ORGANIC",
    organicText: "Your priority is being found for your services, offers or expertise.",
    combined: "COMBINED",
    combinedText: "You want a coherent local and organic presence.",
    adsUnavailable: "Not offered by XRAGENCY",
    cta: "Get my free visibility analysis",
    ctaText: "We identify the main visibility opportunities for your business before proposing anything.",
    seoLink: "Discover SEO",
    mapsLink: "Discover Google Maps",
    reset: "Reset",
  },
  vi: {
    eyebrow: "XR INTELLIGENCE / GOOGLE VISIBILITY",
    title: "Trước khi chọn dịch vụ, hãy hiểu khả năng hiển thị của bạn.",
    intro: "Mô phỏng đơn giản giúp bạn hiểu khách hàng có thể tìm thấy bạn ở đâu trên Google — và XRAGENCY có thể thực sự tối ưu điều gì.",
    searchLabel: "Mô phỏng tìm kiếm",
    search: "nhà hàng Pháp ngon ở Đà Nẵng",
    maps: "Google Maps",
    seo: "SEO",
    ads: "Google Ads",
    mapsShort: "Hiển thị địa phương",
    organic: "Kết quả tự nhiên",
    sponsored: "Quảng cáo trả phí",
    mapsTitle: "Được tìm thấy tại địa phương",
    mapsText: "Maps phục vụ các tìm kiếm có yếu tố vị trí. Mức độ liên quan của hồ sơ, khoảng cách, uy tín và chất lượng thông tin ảnh hưởng đến khả năng hiển thị.",
    seoTitle: "Được tìm thấy với các tìm kiếm chiến lược",
    seoText: "SEO tối ưu website, nội dung và cấu trúc để Google hiểu các trang của bạn và kết nối với tìm kiếm phù hợp. Đây là quá trình dài hạn.",
    adsTitle: "Mua khả năng hiển thị ngay lập tức",
    adsText: "Google Ads là quảng cáo trả phí, bao gồm nhắm mục tiêu, ngân sách và đấu giá. XRAGENCY không quản lý chiến dịch Ads.",
    why: "Điều quan trọng",
    mapsSignals: ["Mức độ liên quan của hồ sơ", "Khoảng cách và khu vực", "Đánh giá và uy tín", "Chất lượng thông tin"],
    seoSignals: ["Mức độ liên quan của trang", "Cấu trúc kỹ thuật", "Nội dung hữu ích", "Uy tín và liên kết", "Cạnh tranh"],
    adsSignals: ["Ngân sách", "Nhắm mục tiêu", "Đấu giá", "Mức độ liên quan của quảng cáo"],
    objective: "Hai đòn bẩy, hai mục tiêu",
    objectiveText: "Maps và SEO không thay thế nhau. Chúng phục vụ những thời điểm khác nhau trong hành trình tìm kiếm và có thể được phát triển cùng nhau.",
    local: "LOCAL",
    localText: "Ưu tiên của bạn là được khách hàng gần khu vực tìm thấy.",
    organicLabel: "TỰ NHIÊN",
    organicText: "Ưu tiên của bạn là được tìm thấy với dịch vụ, sản phẩm hoặc chuyên môn.",
    combined: "KẾT HỢP",
    combinedText: "Bạn muốn xây dựng hiện diện địa phương và tự nhiên nhất quán.",
    adsUnavailable: "XRAGENCY không cung cấp",
    cta: "Nhận phân tích miễn phí",
    ctaText: "Chúng tôi xác định các cơ hội hiển thị chính trước khi đề xuất bất kỳ dịch vụ nào.",
    seoLink: "Khám phá SEO",
    mapsLink: "Khám phá Google Maps",
    reset: "Đặt lại",
  },
} as const;

export function Intelligence() {
  const { lang } = useLang();
  const t = copy[lang] ?? copy.fr;
  const [surface, setSurface] = useState<Surface>("seo");

  const surfaceData = {
    maps: { title: t.mapsTitle, text: t.mapsText, icon: MapPinned, signals: t.mapsSignals, accent: "border-sky-400/30" },
    seo: { title: t.seoTitle, text: t.seoText, icon: Search, signals: t.seoSignals, accent: "border-border" },
    ads: { title: t.adsTitle, text: t.adsText, icon: MousePointerClick, signals: t.adsSignals, accent: "border-amber-400/30" },
  }[surface];
  const SurfaceIcon = surfaceData.icon;

  const waText = encodeURIComponent("Bonjour XRAGENCY, je souhaite recevoir une analyse gratuite de ma visibilité Google.");
  const whatsapp = CONTACT.whatsapp.replace(/\D/g, "");

  return (
    <section id="intelligence" className="relative overflow-hidden border-y border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-4xl md:mb-14">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> {t.eyebrow}
            </div>
            <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] md:text-6xl">{t.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{t.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-background/75 shadow-2xl">
            <div className="border-b border-border p-5 md:p-7">
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.searchLabel}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Google / simulation</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/25 px-4 py-4 text-sm font-medium md:text-base">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{t.search}</span>
              </div>
            </div>

            <div className="grid border-b border-border md:grid-cols-3">
              {(["maps", "seo", "ads"] as Surface[]).map((id) => {
                const Icon = id === "maps" ? MapPinned : id === "seo" ? Search : MousePointerClick;
                const label = id === "maps" ? t.maps : id === "seo" ? t.seo : t.ads;
                const sub = id === "maps" ? t.mapsShort : id === "seo" ? t.organic : t.sponsored;
                const active = surface === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSurface(id)}
                    className={cn("group flex min-h-20 items-center gap-4 border-b border-border px-5 text-left transition md:border-b-0 md:border-r last:md:border-r-0 md:px-7", active ? "bg-foreground/[0.055]" : "hover:bg-muted/25")}
                  >
                    <div className={cn("rounded-xl border p-3 transition", active ? "border-foreground/30" : "border-border")}><Icon className="h-5 w-5" /></div>
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
                    </div>
                    {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground" />}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-[1.08fr_.92fr] md:p-6">
              <div className={cn("rounded-2xl border p-6 md:p-7", surfaceData.accent)}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{surface === "ads" ? t.sponsored : surface === "maps" ? t.mapsShort : t.organic}</div>
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{surfaceData.title}</h3>
                  </div>
                  <SurfaceIcon className="h-6 w-6 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{surfaceData.text}</p>
                <div className="mt-7 border-t border-border pt-6">
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t.why}</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {surfaceData.signals.map((signal) => (
                      <div key={signal} className="flex items-center gap-2 rounded-xl bg-muted/35 px-3 py-3 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-muted-foreground" />{signal}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/15 p-6 md:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />
                  <div className="font-medium">{t.objective}</div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{t.objectiveText}</p>
                <div className="mt-6 space-y-2">
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">{t.local}</div>
                    <p className="mt-2 text-sm leading-6">{t.localText}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">{t.organicLabel}</div>
                    <p className="mt-2 text-sm leading-6">{t.organicText}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">{t.combined}</div>
                    <p className="mt-2 text-sm leading-6">{t.combinedText}</p>
                  </div>
                </div>
                {surface === "ads" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-muted-foreground">
                    <X className="h-4 w-4" /> {t.adsUnavailable}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services/seo" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted">{t.seoLink}<ArrowRight className="h-4 w-4" /></Link>
            <Link to="/services/maps" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted">{t.mapsLink}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-foreground text-background">
            <div className="grid gap-7 p-7 md:grid-cols-[1fr_auto] md:items-end md:p-10">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-60"><Globe2 className="h-4 w-4" /> XRAGENCY</div>
                <h3 className="max-w-2xl text-2xl font-medium tracking-[-0.03em] md:text-4xl">{t.cta}</h3>
                <p className="mt-3 max-w-2xl leading-7 opacity-70">{t.ctaText}</p>
              </div>
              <a href={`https://wa.me/${whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90">{t.cta}<ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 flex justify-end">
          <button type="button" onClick={() => setSurface("seo")} className="text-xs text-muted-foreground transition hover:text-foreground">{t.reset}</button>
        </div>
      </div>
    </section>
  );
}
