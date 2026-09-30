import { useMemo, useState } from "react";
import { ArrowUpRight, Search, ChevronDown, ExternalLink, X, Sparkles, FileImage } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Parallax, Reveal } from "@/components/site/primitives";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { SERVICES } from "@/lib/content";
import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — XRAGENCY" },
      { name: "description", content: "Réalisations XRAGENCY, projets digitaux et références publiques sélectionnées par secteur." },
      { property: "og:title", content: "Nos réalisations — XRAGENCY" },
      { property: "og:description", content: "Découvrez les projets XRAGENCY et une sélection de références digitales par secteur." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/realisations" }],
  }),
  component: WorkPage,
});

const copy = {
  fr: { kicker:"XRAGENCY · RÉALISATIONS", title:"Des projets conçus pour", accent:"être utilisés, pas seulement regardés.", intro:"Projets réalisés par XRAGENCY et références publiques utilisées pour explorer des directions digitales. Les deux catégories sont clairement séparées.", search:"Rechercher une marque, un secteur…", all:"Toutes les prestations", industries:"Tous les secteurs", refs:"résultats", public:"Référence publique", xr:"Projet XRAGENCY", open:"Ouvrir le site", details:"Voir le projet", close:"Fermer", reset:"Réinitialiser", mockup:"Demander une maquette gratuite", mockupSub:"Une première direction visuelle, sans engagement." },
  en: { kicker:"XRAGENCY · SELECTED WORK", title:"Digital work designed to", accent:"be used, not just admired.", intro:"XRAGENCY projects and selected public references, clearly separated so you know what is an agency project and what is an external reference.", search:"Search a brand or sector…", all:"All services", industries:"All industries", refs:"results", public:"Public reference", xr:"XRAGENCY project", open:"Open website", details:"View project", close:"Close", reset:"Reset", mockup:"Request a free mockup", mockupSub:"A first visual direction, with no commitment." },
  vi: { kicker:"XRAGENCY · DỰ ÁN", title:"Những dự án được thiết kế để", accent:"được sử dụng, không chỉ để ngắm.", intro:"Các dự án của XRAGENCY và những tham chiếu công khai được chọn lọc, luôn được phân biệt rõ ràng.", search:"Tìm thương hiệu hoặc lĩnh vực…", all:"Tất cả dịch vụ", industries:"Tất cả lĩnh vực", refs:"kết quả", public:"Tham chiếu công khai", xr:"Dự án XRAGENCY", open:"Mở website", details:"Xem dự án", close:"Đóng", reset:"Đặt lại", mockup:"Yêu cầu mockup miễn phí", mockupSub:"Định hướng hình ảnh ban đầu, không cam kết." },
  ar: { kicker:"XRAGENCY · أعمال مختارة", title:"مشاريع رقمية مصممة", accent:"لتُستخدم، لا لتُعرض فقط.", intro:"مشاريع XRAGENCY ومراجع عامة مختارة، مع فصل واضح بين أعمال الوكالة والمراجع الخارجية.", search:"ابحث عن علامة أو قطاع…", all:"جميع الخدمات", industries:"جميع القطاعات", refs:"نتائج", public:"مرجع عام", xr:"مشروع XRAGENCY", open:"فتح الموقع", details:"عرض المشروع", close:"إغلاق", reset:"إعادة ضبط", mockup:"اطلب نموذجًا مجانيًا", mockupSub:"اتجاه بصري أولي، بدون التزام." },
  ru: { kicker:"XRAGENCY · ПРОЕКТЫ", title:"Цифровые проекты, созданные", accent:"для работы, а не только для просмотра.", intro:"Проекты XRAGENCY и отобранные публичные референсы с чётким разделением между работами агентства и внешними примерами.", search:"Найти бренд или отрасль…", all:"Все услуги", industries:"Все отрасли", refs:"результатов", public:"Публичный референс", xr:"Проект XRAGENCY", open:"Открыть сайт", details:"Открыть проект", close:"Закрыть", reset:"Сбросить", mockup:"Запросить бесплатный макет", mockupSub:"Первое визуальное направление, без обязательств." },
} as const;

const sectorLabels: Record<string, Record<string,string>> = {
  luxe:{fr:"Luxe",en:"Luxury",vi:"Cao cấp",ar:"فاخر",ru:"Люкс"}, hotel:{fr:"Hôtellerie",en:"Hospitality",vi:"Khách sạn",ar:"ضيافة",ru:"Отели"},
  restaurant:{fr:"Restauration",en:"Restaurant",vi:"Nhà hàng",ar:"مطاعم",ru:"Рестораны"}, immobilier:{fr:"Immobilier",en:"Real Estate",vi:"Bất động sản",ar:"عقارات",ru:"Недвижимость"},
  auto:{fr:"Automobile",en:"Automotive",vi:"Ô tô",ar:"سيارات",ru:"Авто"}, architecture:{fr:"Architecture",en:"Architecture",vi:"Kiến trúc",ar:"عمارة",ru:"Архитектура"},
  mode:{fr:"Mode",en:"Fashion",vi:"Thời trang",ar:"أزياء",ru:"Мода"}, beaute:{fr:"Beauté",en:"Beauty",vi:"Làm đẹp",ar:"جمال",ru:"Красота"},
  sante:{fr:"Santé",en:"Health",vi:"Sức khỏe",ar:"صحة",ru:"Здоровье"}, droit:{fr:"Droit",en:"Legal",vi:"Pháp lý",ar:"قانون",ru:"Юриспруденция"},
  finance:{fr:"Finance",en:"Finance",vi:"Tài chính",ar:"مالية",ru:"Финансы"}, tech:{fr:"Tech / SaaS",en:"Tech / SaaS",vi:"Công nghệ / SaaS",ar:"تقنية / SaaS",ru:"Tech / SaaS"},
  education:{fr:"Éducation",en:"Education",vi:"Giáo dục",ar:"تعليم",ru:"Образование"}, sport:{fr:"Sport",en:"Sports",vi:"Thể thao",ar:"رياضة",ru:"Спорт"},
  voyage:{fr:"Voyage",en:"Travel",vi:"Du lịch",ar:"سفر",ru:"Путешествия"}, maison:{fr:"Maison / Design",en:"Home / Design",vi:"Nhà / Thiết kế",ar:"منزل / تصميم",ru:"Дом / Дизайн"},
  joaillerie:{fr:"Joaillerie",en:"Jewellery",vi:"Trang sức",ar:"مجوهرات",ru:"Ювелирные изделия"}, food:{fr:"Food",en:"Food",vi:"Ẩm thực",ar:"أغذية",ru:"Food"},
  spa:{fr:"Spa / Wellness",en:"Spa / Wellness",vi:"Spa / Wellness",ar:"سبا / عافية",ru:"Spa / Wellness"}, construction:{fr:"Construction",en:"Construction",vi:"Xây dựng",ar:"إنشاءات",ru:"Строительство"},
};

export function WorkPage() {
  const { lang } = useLang();
  const tx = copy[lang] ?? copy.fr;
  const [query,setQuery]=useState("");
  const [sector,setSector]=useState("all");
  const [service,setService]=useState("all");
  const [active,setActive]=useState<(typeof PORTFOLIO_REFERENCES)[number] | null>(null);

  const serviceOptions=[{id:"all",label:tx.all},...SERVICES.filter(x=>x.id!=="ecommerce").map(x=>({id:x.id,label:x.title[lang] ?? x.title.en ?? x.title.fr}))];
  const filtered=useMemo(()=>PORTFOLIO_REFERENCES.filter(item=>{
    const q=query.toLowerCase().trim();
    return (!q || [item.name,item.sector,item.type].join(" ").toLowerCase().includes(q))
      && (sector==="all" || item.sector===sector)
      && (service==="all" || item.services.includes(service));
  }),[query,sector,service]);

  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite une maquette gratuite.");

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav/>
    <main className="pt-20 sm:pt-24">
      <section className="relative overflow-hidden border-b border-border bg-[#08090b] py-20 text-white sm:py-28 lg:py-36">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(214,164,93,.16),transparent_28%),linear-gradient(135deg,#08090b,#11151a_55%,#08090b)]"/>
        <div aria-hidden className="absolute inset-0 opacity-[.13] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:64px_64px]"/>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Parallax speed={-0.02}>
            <p className="label-mono text-[9px] tracking-[.28em] text-primary">{tx.kicker}</p>
            <h1 className="display-serif mt-5 max-w-6xl text-[clamp(3.2rem,8vw,7.8rem)] leading-[.84] tracking-[-.045em]">{tx.title}<br/><em className="not-italic text-primary">{tx.accent}</em></h1>
            <p className="mt-7 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">{tx.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-primary-foreground hover:-translate-y-0.5"><FileImage className="h-4 w-4"/>{tx.mockup}</a>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[.04] px-4 py-3 label-mono text-[8px] tracking-[.14em] text-white/55">{tx.mockupSub}</span>
            </div>
          </Parallax>
          <div className="mt-12 grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[.04] p-3 backdrop-blur-xl lg:grid-cols-[1fr_.32fr_.32fr_auto]">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search} className="w-full rounded-2xl border border-white/10 bg-black/25 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary"/></div>
            <label className="relative"><select value={sector} onChange={e=>setSector(e.target.value)} className="w-full appearance-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 pr-9 text-xs text-white outline-none focus:border-primary"><option value="all">{tx.industries}</option>{PORTFOLIO_SECTORS.map(([id])=><option key={id} value={id} className="text-black">{sectorLabels[id]?.[lang] ?? id}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"/></label>
            <label className="relative"><select value={service} onChange={e=>setService(e.target.value)} className="w-full appearance-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 pr-9 text-xs text-white outline-none focus:border-primary"><option value="all">{tx.all}</option>{serviceOptions.slice(1).map(x=><option key={x.id} value={x.id} className="text-black">{x.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"/></label>
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-4 py-3 label-mono text-[9px] text-white/55">{filtered.length} {tx.refs}</div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="label-mono text-[9px] tracking-[.22em] text-primary">{tx.xr}</p><h2 className="display-serif mt-2 text-3xl sm:text-4xl">XRAGENCY · Projects</h2></div><span className="hidden label-mono text-[8px] text-muted-foreground sm:block">{PORTFOLIO_REFERENCES.filter(x=>x.origin==="XR Agency").length} projects</span></div>
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.filter(x=>x.origin==="XR Agency").map((item,index)=>(
              <Reveal key={item.name+item.url} delay={index*70}>
                <button type="button" onClick={()=>setActive(item)} className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-border bg-card text-left transition duration-700 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0e12]"><img src={item.image} alt={item.name} loading="eager" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"/><div className="absolute left-5 top-5 rounded-full border border-primary/35 bg-black/55 px-3 py-1.5 label-mono text-[8px] text-primary backdrop-blur">{tx.xr}</div><div className="absolute bottom-0 inset-x-0 p-6 text-white"><p className="label-mono text-[8px] text-white/45">{sectorLabels[item.sector]?.[lang] ?? item.sector} · {item.type}</p><div className="mt-2 flex items-end justify-between"><h3 className="display-serif text-4xl">{item.name}</h3><span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10"><ArrowUpRight className="h-4 w-4"/></span></div></div></div>
                  <div className="flex items-center justify-between px-5 py-4"><span className="text-xs text-muted-foreground">{item.services.map(s=>s==="ecommerce"?"Web":s).join(" · ")}</span><span className="label-mono text-[8px] text-primary">{tx.details} →</span></div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/35 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="label-mono text-[9px] tracking-[.22em] text-primary">{tx.public}</p><h2 className="display-serif mt-2 text-3xl sm:text-4xl">Références de direction</h2></div><span className="hidden label-mono text-[8px] text-muted-foreground sm:block">{filtered.filter(x=>x.origin==="Référence").length} références</span></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.filter(x=>x.origin==="Référence").map((item,index)=>(
              <Reveal key={item.name+item.url} delay={Math.min(index,8)*25}>
                <button type="button" onClick={()=>setActive(item)} className="group block w-full overflow-hidden rounded-[1.5rem] border border-border bg-card text-left transition duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted"><img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute bottom-0 p-5 text-white"><p className="label-mono text-[8px] text-white/45">{sectorLabels[item.sector]?.[lang] ?? item.sector}</p><h3 className="display-serif mt-1 text-3xl">{item.name}</h3></div></div>
                  <div className="flex items-center justify-between px-5 py-4"><span className="text-xs text-muted-foreground">{item.type}</span><ArrowUpRight className="h-4 w-4 text-primary"/></div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="rounded-full border border-border bg-card px-5 py-3 label-mono text-[9px] text-muted-foreground hover:border-primary/40 hover:text-foreground">{tx.reset}</button></div>
        </div>
      </section>
    </main>

    {active && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={active.name}>
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/15 bg-background shadow-2xl">
        <button type="button" onClick={()=>setActive(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white"><X className="h-4 w-4"/></button>
        <div className="grid lg:grid-cols-[1.2fr_.8fr]"><div className="min-h-[360px] bg-[#0b0e12]"><img src={active.image} alt={active.name} className="h-full min-h-[360px] w-full object-cover"/></div><div className="p-7 sm:p-10"><span className="label-mono text-[9px] tracking-[.24em] text-primary">{active.origin==="XR Agency"?tx.xr:tx.public} · {sectorLabels[active.sector]?.[lang] ?? active.sector}</span><h2 className="display-serif mt-4 text-4xl leading-[.9] sm:text-5xl">{active.name}</h2><p className="mt-4 text-sm text-muted-foreground">{active.type}</p><div className="mt-6 flex flex-wrap gap-2">{active.services.map(s=><span key={s} className="rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground">{s==="ecommerce"?"Web":s}</span>)}</div><a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-background">{tx.open}<ExternalLink className="h-3.5 w-3.5"/></a></div></div>
      </div>
    </div>}
    <Contact/>
  </div>;
}
