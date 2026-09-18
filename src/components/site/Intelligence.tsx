import { useState } from "react";
import { Check, MapPinned, MousePointerClick, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

type Surface = "maps" | "seo" | "ads";

const copy = {
  fr: {
    eyebrow: "ÉTAPE 02 · GOOGLE SIMULATION",
    title: "Voyez maintenant comment vos clients vous trouvent.",
    intro: "Une simulation simple pour comprendre Google Maps, le SEO et Google Ads — avant de choisir votre stratégie.",
    searchLabel: "Simulation de recherche",
    search: "cabinet d'architectes de luxe à Paris",
    maps: "Google Maps", seo: "SEO", ads: "Google Ads",
    mapsShort: "Visibilité locale", organic: "Résultats naturels", sponsored: "Publicité payante",
    mapsTitle: "Google Maps · être trouvé localement",
    mapsText: "Maps répond aux recherches avec une intention locale. La pertinence de la fiche, la distance, les avis et la qualité des informations participent à la visibilité.",
    seoTitle: "SEO · être trouvé naturellement",
    seoText: "Le SEO travaille votre site, ses contenus et sa structure pour aider Google à comprendre vos pages et les faire apparaître sur les recherches pertinentes.",
    adsTitle: "Google Ads · acheter de la visibilité",
    adsText: "Ads correspond à des annonces payantes. Le budget, le ciblage et les enchères jouent notamment sur la diffusion. XRAGENCY ne vend pas cette prestation.",
    why: "Ce qui influence cette surface",
    mapsSignals: ["Pertinence de la fiche", "Zone et distance", "Avis & réputation", "Qualité des informations"],
    seoSignals: ["Pertinence des pages", "Structure technique", "Contenu utile", "Autorité & concurrence"],
    adsSignals: ["Budget", "Ciblage", "Enchères", "Pertinence de l'annonce"],
    bridge: "Vous savez maintenant où votre visibilité se joue.",
    bridgeText: "Votre devis vous a montré les expertises dont votre entreprise peut avoir besoin. Cette simulation vous montre comment elles travaillent ensemble.",
    next: "Explorer les expertises XRAGENCY", unavailable: "Cette prestation n'est pas proposée par XRAGENCY.",
  },
  en: {
    eyebrow: "STEP 02 · GOOGLE SIMULATION",
    title: "Now see how your customers find you.",
    intro: "A simple simulation to understand Google Maps, SEO and Google Ads — before choosing your strategy.",
    searchLabel: "Search simulation",
    search: "luxury architects in London",
    maps: "Google Maps", seo: "SEO", ads: "Google Ads",
    mapsShort: "Local visibility", organic: "Organic results", sponsored: "Paid advertising",
    mapsTitle: "Google Maps · be found locally",
    mapsText: "Maps serves searches with local intent. Profile relevance, distance, reviews and information quality contribute to local visibility.",
    seoTitle: "SEO · be found organically",
    seoText: "SEO works on your website, content and structure so Google can understand your pages and surface them for relevant searches.",
    adsTitle: "Google Ads · buy visibility",
    adsText: "Ads uses paid placements. Budget, targeting and bidding affect delivery. XRAGENCY does not offer this service.",
    why: "What influences this surface",
    mapsSignals: ["Profile relevance", "Area and distance", "Reviews & reputation", "Information quality"],
    seoSignals: ["Page relevance", "Technical structure", "Useful content", "Authority & competition"],
    adsSignals: ["Budget", "Targeting", "Bidding", "Ad relevance"],
    bridge: "You now know where your visibility is built.",
    bridgeText: "Your quote showed which expertise your business may need. This simulation shows how those disciplines work together.",
    next: "Explore XRAGENCY expertise", unavailable: "This service is not offered by XRAGENCY.",
  },
  vi: {
    eyebrow: "BƯỚC 02 · GOOGLE SIMULATION",
    title: "Bây giờ hãy xem khách hàng tìm thấy bạn như thế nào.",
    intro: "Mô phỏng đơn giản giúp bạn hiểu Google Maps, SEO và Google Ads trước khi chọn chiến lược.",
    searchLabel: "Mô phỏng tìm kiếm",
    search: "kiến trúc sư cao cấp tại TP. Hồ Chí Minh",
    maps: "Google Maps", seo: "SEO", ads: "Google Ads",
    mapsShort: "Hiển thị địa phương", organic: "Kết quả tự nhiên", sponsored: "Quảng cáo trả phí",
    mapsTitle: "Google Maps · được tìm thấy tại địa phương",
    mapsText: "Maps phục vụ các tìm kiếm có ý định địa phương. Mức độ liên quan, khoảng cách, đánh giá và chất lượng thông tin ảnh hưởng đến khả năng hiển thị.",
    seoTitle: "SEO · được tìm thấy tự nhiên",
    seoText: "SEO tối ưu website, nội dung và cấu trúc để Google hiểu các trang và hiển thị chúng cho những tìm kiếm phù hợp.",
    adsTitle: "Google Ads · mua khả năng hiển thị",
    adsText: "Ads sử dụng vị trí quảng cáo trả phí. Ngân sách, nhắm mục tiêu và đấu giá ảnh hưởng đến việc phân phối. XRAGENCY không cung cấp dịch vụ này.",
    why: "Điều gì ảnh hưởng đến bề mặt này",
    mapsSignals: ["Mức độ liên quan hồ sơ", "Khu vực và khoảng cách", "Đánh giá & uy tín", "Chất lượng thông tin"],
    seoSignals: ["Mức độ liên quan trang", "Cấu trúc kỹ thuật", "Nội dung hữu ích", "Uy tín & cạnh tranh"],
    adsSignals: ["Ngân sách", "Nhắm mục tiêu", "Đấu giá", "Mức độ liên quan quảng cáo"],
    bridge: "Bạn đã hiểu nơi khả năng hiển thị được xây dựng.",
    bridgeText: "Báo giá cho biết doanh nghiệp có thể cần chuyên môn nào. Mô phỏng này cho thấy các chuyên môn đó kết hợp ra sao.",
    next: "Khám phá chuyên môn XRAGENCY", unavailable: "XRAGENCY không cung cấp dịch vụ này.",
  },
} as const;

export function Intelligence() {
  const { lang } = useLang();
  const t = copy[lang] ?? copy.fr;
  const [surface, setSurface] = useState<Surface>("seo");
  const data = {
    maps: { title: t.mapsTitle, text: t.mapsText, icon: MapPinned, signals: t.mapsSignals, accent: "border-sky-400/30" },
    seo: { title: t.seoTitle, text: t.seoText, icon: Search, signals: t.seoSignals, accent: "border-foreground/20" },
    ads: { title: t.adsTitle, text: t.adsText, icon: MousePointerClick, signals: t.adsSignals, accent: "border-amber-400/30" },
  }[surface];
  const Icon = data.icon;

  return (
    <section id="google-simulation" className="relative border-b border-border/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-7 max-w-4xl md:mb-9">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground"><Sparkles className="h-3.5 w-3.5" /> {t.eyebrow}</div>
            <h2 className="text-3xl font-medium tracking-[-0.05em] md:text-5xl">{t.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{t.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-[0_30px_80px_-55px_rgba(0,0,0,.8)]">
            <div className="border-b border-border p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between gap-4"><span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.searchLabel}</span><span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold text-[#4285F4] shadow-sm">G</span> Google · simulation</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 font-medium shadow-sm"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#4285F4] shadow-sm">G</span><Search className="h-4 w-4 text-muted-foreground" /><span className="truncate">{t.search}</span><span className="ml-auto hidden rounded-full bg-primary/10 px-2.5 py-1 text-[8px] uppercase tracking-[.14em] text-primary sm:block">Live demo</span></div>
            </div>
            <div className="grid border-b border-border md:grid-cols-3">
              {(["maps", "seo", "ads"] as Surface[]).map((id) => {
                const TabIcon = id === "maps" ? MapPinned : id === "seo" ? Search : MousePointerClick;
                const label = id === "maps" ? t.maps : id === "seo" ? t.seo : t.ads;
                const sub = id === "maps" ? t.mapsShort : id === "seo" ? t.organic : t.sponsored;
                const active = surface === id;
                return <button key={id} type="button" onClick={() => setSurface(id)} className={cn("flex min-h-20 items-center gap-4 border-b border-border px-5 text-left transition md:border-b-0 md:border-r last:md:border-r-0 md:px-7", active ? "bg-foreground/[0.055]" : "hover:bg-muted/25")}><span className={cn("rounded-xl border p-3", active ? "border-foreground/30" : "border-border")}><TabIcon className="h-5 w-5" /></span><span><span className="block font-medium">{label}</span><span className="mt-1 block text-xs text-muted-foreground">{sub}</span></span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground" />}</button>;
              })}
            </div>
            <div className="grid gap-3 bg-muted/[0.12] p-3 md:grid-cols-[1.08fr_.92fr] md:p-4">
              <div className={cn("rounded-2xl border p-4 md:p-5", data.accent)}>
                <div className="flex items-start justify-between gap-6"><div><div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{surface === "ads" ? t.sponsored : surface === "maps" ? t.mapsShort : t.organic}</div><h3 className="text-2xl font-medium tracking-tight md:text-3xl">{data.title}</h3></div><Icon className="h-6 w-6 shrink-0 text-muted-foreground" /></div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{data.text}</p>
                <div className="mt-5 border-t border-border pt-4"><div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t.why}</div><div className="grid gap-1.5 sm:grid-cols-2">{data.signals.map((signal) => <div key={signal} className="flex items-center gap-2 rounded-xl bg-muted/35 px-3 py-2.5 text-xs"><Check className="h-4 w-4 shrink-0 text-muted-foreground" />{signal}</div>)}</div></div>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-muted/15 p-4 md:p-5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary"><TrendingUp className="h-4 w-4" /></span><div><div className="text-[9px] uppercase tracking-[.18em] text-primary">XR visibility layer</div><div className="font-medium">{t.bridge}</div></div></div><p className="mt-3 text-xs leading-5 text-muted-foreground">{t.bridgeText}</p>{surface === "ads" && <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-muted-foreground"><X className="h-4 w-4" />{t.unavailable}</div>}</div>
            </div>
          </div>
        </Reveal>
        <div className="mt-4 flex justify-end"><a href="#homepage-services" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90">{t.next} <span aria-hidden>↓</span></a></div>
      </div>
    </section>
  );
}
