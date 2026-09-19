import { useState } from "react";
import { Check, MapPinned, MousePointerClick, Search, Sparkles, TrendingUp, X, ArrowUpRight } from "lucide-react";
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

  const resultRows = {
    maps: [
      { name: "Maison Atelier", meta: "4,9 ★ · 128 avis · Ouvert", tag: "Local 01" },
      { name: "Studio Architecture", meta: "4,8 ★ · 94 avis · Ouvert", tag: "Local 02" },
      { name: "Atelier Signature", meta: "4,7 ★ · 71 avis · Ouvert", tag: "Local 03" },
    ],
    seo: [
      { name: "Studio Architecture · Site officiel", meta: "www.studio-architecture.fr", tag: "Résultat 01" },
      { name: "Architecture contemporaine à Paris", meta: "Guide · projets · expertise", tag: "Résultat 02" },
      { name: "Architectes premium · Paris", meta: "Magazine · sélection", tag: "Résultat 03" },
    ],
    ads: [
      { name: "Studio Architecture — Architecture premium", meta: "Site officiel · Devis en ligne", tag: "ANNONCE" },
      { name: "Architecture sur mesure — Paris", meta: "Consultation · Projet · Contact", tag: "ANNONCE" },
      { name: "Atelier Signature — Architecte", meta: "Prenez rendez-vous · Paris", tag: "ANNONCE" },
    ],
  }[surface];

  return (
    <section id="google-simulation" className="relative border-b border-border/50 py-10 md:py-14">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <Reveal>
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.22em] text-muted-foreground"><Sparkles className="h-3 w-3" /> {t.eyebrow}</div>
              <h2 className="text-2xl font-medium tracking-[-.05em] md:text-4xl">{t.title}</h2>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground md:text-sm">{t.intro}</p>
            </div>
            <div className="rounded-full border border-primary/15 bg-primary/[.04] px-3 py-1.5 text-[8px] uppercase tracking-[.16em] text-primary">3 surfaces · 1 recherche</div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="overflow-hidden rounded-[1.4rem] border border-border/80 bg-card/70 shadow-[0_30px_90px_-55px_rgba(0,0,0,.9)] backdrop-blur-xl">
            <div className="border-b border-border/70 bg-background/70 p-3 md:p-4"><div className="mb-3 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.7)]"/><span className="text-[8px] font-medium uppercase tracking-[.14em] text-muted-foreground">Interface de recherche · simulation réaliste</span><span className="ml-auto rounded-full border border-border px-2 py-1 text-[7px] uppercase tracking-[.12em] text-muted-foreground">Pas un résultat réel</span></div>
              <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[.16em] text-muted-foreground"><span>{t.searchLabel}</span><span>Google · simulation</span></div>
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2.5 text-xs shadow-sm md:text-sm">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-[#4285F4]">G</span>
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{t.search}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-border/70">
              {(["maps","seo","ads"] as Surface[]).map(id => {
                const TabIcon = id === "maps" ? MapPinned : id === "seo" ? Search : MousePointerClick;
                const label = id === "maps" ? t.maps : id === "seo" ? t.seo : t.ads;
                const sub = id === "maps" ? t.mapsShort : id === "seo" ? t.organic : t.sponsored;
                const active = surface === id;
                return <button key={id} type="button" onClick={() => setSurface(id)} className={cn("relative flex min-h-[64px] items-center gap-2 border-r border-border/70 px-3 text-left last:border-r-0 md:px-5", active ? "bg-primary/[.07]" : "hover:bg-muted/30")}><span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg border", active ? "border-primary/35 bg-primary/10 text-primary" : "border-border text-muted-foreground")}><TabIcon className="h-4 w-4"/></span><span className="min-w-0"><span className="block truncate text-[10px] font-medium md:text-xs">{label}</span><span className="mt-0.5 hidden truncate text-[8px] text-muted-foreground sm:block">{sub}</span></span>{active&&<span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"/>}</button>;
              })}
            </div>

            <div className="grid gap-3 p-3 md:grid-cols-[1.05fr_.95fr] md:p-4">
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                {surface === "maps" && <div className="relative h-[190px] overflow-hidden bg-[#e8eee8]">
                  <div className="absolute inset-0 opacity-70" style={{backgroundImage:"linear-gradient(35deg,transparent 47%,rgba(70,90,70,.22) 48%,rgba(70,90,70,.22) 50%,transparent 51%),linear-gradient(110deg,transparent 47%,rgba(70,90,70,.16) 48%,rgba(70,90,70,.16) 50%,transparent 51%)",backgroundSize:"76px 76px"}}/>
                  <div className="absolute left-[24%] top-[30%] h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15"/><div className="absolute left-[53%] top-[48%] h-3 w-3 rounded-full bg-foreground ring-4 ring-foreground/10"/><div className="absolute left-[72%] top-[26%] h-3 w-3 rounded-full bg-foreground ring-4 ring-foreground/10"/>
                  <div className="absolute bottom-3 left-3 rounded-lg border border-white/70 bg-white/90 px-2 py-1 text-[7px] uppercase tracking-[.14em] text-slate-700 shadow-sm">Google Maps · recherche locale</div>
                </div>}
                {surface !== "maps" && <div className="border-b border-border bg-background px-3 py-2 text-[8px] uppercase tracking-[.14em] text-muted-foreground">google.com · page de résultats</div>}
                <div className="divide-y divide-border/70">
                  {resultRows.map((row,i) => <div key={row.name} className="flex items-center gap-2.5 px-3 py-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted text-[8px] font-semibold">{i+1}</div>
                    <div className="min-w-0 flex-1"><div className="truncate text-[10px] font-medium md:text-xs">{row.name}</div><div className="mt-0.5 truncate text-[8px] text-muted-foreground">{row.meta}</div></div>
                    <span className={cn("shrink-0 rounded-full px-1.5 py-1 text-[7px] uppercase tracking-[.1em]", surface === "ads" ? "bg-amber-500/10 text-amber-700" : "bg-muted text-muted-foreground")}>{row.tag}</span>
                  </div>)}
                </div>
              </div>

              <div className="rounded-xl border border-primary/15 bg-primary/[.035] p-4">
                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.16em] text-primary"><TrendingUp className="h-3.5 w-3.5"/> {surface === "maps" ? "Google Maps" : surface === "seo" ? "SEO classique" : "Google Ads"}</div>
                <h3 className="mt-2 text-lg font-medium tracking-tight md:text-xl">{data.title}</h3>
                <p className="mt-2 text-[10px] leading-4.5 text-muted-foreground md:text-xs">{data.text}</p>
                <div className="mt-3 rounded-lg border border-primary/15 bg-background/70 p-3 text-[9px] leading-4.5 text-muted-foreground">
                  {surface === "maps" && <><strong className="text-foreground">Pourquoi c'est important :</strong> la recherche locale capte une grande partie de l'intention immédiate. La fiche, la distance, les avis et les informations comptent.</>}
                  {surface === "seo" && <><strong className="text-foreground">À comprendre :</strong> ces résultats ne sont pas des annonces. Ils apparaissent grâce au travail de pertinence, contenu et structure du site.</>}
                  {surface === "ads" && <><strong className="text-foreground">À comprendre :</strong> les trois lignes du haut sont des annonces payantes. Elles sont identifiées comme « ANNONCE ».</>}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5">{data.signals.map(signal => <div key={signal} className="rounded-lg bg-muted/35 px-2 py-2 text-[8px] leading-3.5"><Check className="mr-1 inline h-3 w-3 text-primary"/>{signal}</div>)}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[8px] uppercase tracking-[.16em] text-muted-foreground">Simulez · comprenez · voyez où la visibilité se gagne</span>
          <a href="#homepage-services" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[10px] font-medium text-background transition hover:-translate-y-0.5">{t.next} <ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
      </div>
    </section>
  );
}
