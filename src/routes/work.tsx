import { useMemo, useState } from "react";
import { ArrowUpRight, Search, ChevronDown, ExternalLink, X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/primitives";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { SERVICES } from "@/lib/content";
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
  fr: { kicker:"XRAGENCY · WORK", title:"Des univers digitaux", accent:"pensés pour être vécus.", intro:"Sites, identités et expériences : une seule collection, sans cloisonner nos projets et nos références de direction.", search:"Rechercher…", all:"Toutes les prestations", industries:"Tous les secteurs", open:"Ouvrir le site", close:"Fermer", reset:"Réinitialiser", catalogue:"Catalogue créatif", index:"projets sélectionnés" },
  en: { kicker:"XRAGENCY · WORK", title:"Digital worlds", accent:"designed to be experienced.", intro:"Websites, identities and experiences: one collection, without separating agency projects from creative references.", search:"Search…", all:"All services", industries:"All industries", open:"Open website", close:"Close", reset:"Reset", catalogue:"Creative catalogue", index:"selected projects" },
  vi: { kicker:"XRAGENCY · WORK", title:"Những thế giới số", accent:"được thiết kế để trải nghiệm.", intro:"Website, nhận diện và trải nghiệm: một bộ sưu tập thống nhất.", search:"Tìm kiếm…", all:"Tất cả dịch vụ", industries:"Tất cả lĩnh vực", open:"Mở website", close:"Đóng", reset:"Đặt lại", catalogue:"Bộ sưu tập sáng tạo", index:"dự án được chọn" },
  ar: { kicker:"XRAGENCY · WORK", title:"عوالم رقمية", accent:"مصممة لتُعاش.", intro:"مواقع وهويات وتجارب رقمية ضمن مجموعة واحدة.", search:"بحث…", all:"جميع الخدمات", industries:"جميع القطاعات", open:"فتح الموقع", close:"إغلاق", reset:"إعادة ضبط", catalogue:"المجموعة الإبداعية", index:"مشاريع مختارة" },
  ru: { kicker:"XRAGENCY · WORK", title:"Цифровые миры", accent:"созданные для опыта.", intro:"Сайты, айдентика и цифровые впечатления в одной коллекции.", search:"Поиск…", all:"Все услуги", industries:"Все отрасли", open:"Открыть сайт", close:"Закрыть", reset:"Сбросить", catalogue:"Креативная коллекция", index:"выбранных проектов" },
} as const;

const sectorLabels: Record<string, Record<string,string>> = {
  luxe:{fr:"Luxe",en:"Luxury",vi:"Cao cấp",ar:"فاخر",ru:"Люкс"}, hotel:{fr:"Hôtellerie",en:"Hospitality",vi:"Khách sạn",ar:"ضيافة",ru:"Отели"},
  restaurant:{fr:"Restauration",en:"Restaurant",vi:"Nhà hàng",ar:"مطاعم",ru:"Рестораны"}, immobilier:{fr:"Immobilier",en:"Real Estate",vi:"Bất động sản",ar:"عقارات",ru:"Недвижимость"},
  auto:{fr:"Automobile",en:"Automotive",vi:"Ô tô",ar:"سيارات",ru:"Авто"}, architecture:{fr:"Architecture",en:"Architecture",vi:"Kiến trúc",ar:"عمارة",ru:"Архитектура"},
  mode:{fr:"Mode",en:"Fashion",vi:"Thời trang",ar:"أزياء",ru:"Мода"}, beaute:{fr:"Beauté",en:"Beauty",vi:"Làm đẹp",ar:"جمال",ru:"Красота"},
  sante:{fr:"Santé",en:"Health",vi:"Sức khỏe",ar:"صحة",ru:"Здоровье"}, droit:{fr:"Droit",en:"Legal",vi:"Pháp lý",ar:"قانون",ru:"Jurisprudence"},
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

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav/>
    <main className="pt-20 sm:pt-24">
      <section className="relative min-h-[72vh] overflow-hidden bg-[#050608] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(255,255,255,.10),transparent_26%),linear-gradient(120deg,#050608,#0b1117_55%,#050608)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,255,255,.05),transparent_28%)]"/>
        <div className="relative mx-auto flex min-h-[72vh] max-w-[1500px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="label-mono text-[9px] tracking-[.32em] text-white/42">{tx.kicker}</p>
          <h1 className="display-serif mt-5 max-w-6xl text-[clamp(4rem,9vw,9rem)] leading-[.76] tracking-[-.075em]">{tx.title}<br/><em className="not-italic text-white/35">{tx.accent}</em></h1>
          <p className="mt-7 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">{tx.intro}</p>
          <div className="mt-12 grid gap-2 rounded-[1.6rem] border border-white/10 bg-black/45 p-2 backdrop-blur-2xl lg:grid-cols-[1fr_.28fr_.28fr_auto]">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search} className="w-full rounded-xl border border-white/10 bg-white/[.035] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/30"/></div>
            <label className="relative"><select value={sector} onChange={e=>setSector(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all">{tx.industries}</option>{PORTFOLIO_SECTORS.map(([id,label])=><option key={id} value={id} className="text-black">{sectorLabels[id]?.[lang] ?? label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"/></label>
            <label className="relative"><select value={service} onChange={e=>setService(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all">{tx.all}</option>{serviceOptions.slice(1).map(x=><option key={x.id} value={x.id} className="text-black">{x.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"/></label>
            <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 label-mono text-[8px] text-white/45">{filtered.length} {tx.index}</div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex items-end justify-between gap-4"><div><p className="label-mono text-[9px] tracking-[.28em] text-primary">01 / {tx.catalogue}</p><h2 className="display-serif mt-3 text-4xl sm:text-6xl">Tout le travail, <em className="not-italic text-muted-foreground">au même endroit.</em></h2></div><button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="hidden rounded-full border border-border px-4 py-2 label-mono text-[8px] text-muted-foreground hover:border-primary/40 sm:block">{tx.reset}</button></div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
            {filtered.map((item,index)=>{
              const featured=index<2;
              return <Reveal key={item.name+item.url} delay={Math.min(index,10)*30}>
                <button type="button" onClick={()=>setActive(item)} className={"group relative block w-full overflow-hidden rounded-[2rem] border border-border bg-card text-left transition duration-700 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl " + (featured?"xl:col-span-6":"xl:col-span-4")}>
                  <div className={"relative overflow-hidden bg-[#080b0f] "+(featured?"aspect-[16/10]":"aspect-[4/3]")}>
                    <img src={item.image} alt={item.name+" homepage"} loading={index<6?"eager":"lazy"} className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.045]"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent"/>
                    <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/55 backdrop-blur">HOMEPAGE / {String(index+1).padStart(2,"0")}</div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7"><p className="label-mono text-[7px] tracking-[.18em] text-white/42">{sectorLabels[item.sector]?.[lang] ?? item.sector} · {item.type}</p><div className="mt-2 flex items-end justify-between gap-4 text-white"><h3 className={"display-serif leading-[.86] "+(featured?"text-5xl sm:text-6xl":"text-3xl sm:text-4xl")}>{item.name}</h3><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-4 w-4"/></span></div></div>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-5 py-4"><span className="text-xs text-muted-foreground">{item.services.map(s=>s==="ecommerce"?"E-commerce":s).join(" · ")}</span><span className="label-mono text-[8px] text-primary">EXPLORE →</span></div>
                </button>
              </Reveal>;
            })}
          </div>
        </div>
      </section>
    </main>
    {active && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/15 bg-background shadow-2xl">
        <button type="button" onClick={()=>setActive(null)} aria-label={tx.close} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/65 text-white"><X className="h-4 w-4"/></button>
        <div className="grid lg:grid-cols-[1.35fr_.65fr]"><div className="min-h-[420px] bg-[#080b0f]"><img src={active.image} alt={active.name+" homepage"} className="h-full min-h-[420px] w-full object-cover"/></div><div className="p-7 sm:p-10"><span className="label-mono text-[8px] tracking-[.24em] text-primary">{sectorLabels[active.sector]?.[lang] ?? active.sector} · {active.type}</span><h2 className="display-serif mt-4 text-5xl leading-[.86]">{active.name}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Aperçu de la homepage actuelle. Chaque référence ouvre son site dans un nouvel onglet.</p><div className="mt-6 flex flex-wrap gap-2">{active.services.map(s=><span key={s} className="rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground">{s==="ecommerce"?"E-commerce":s}</span>)}</div><a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-background">{tx.open}<ExternalLink className="h-3.5 w-3.5"/></a></div></div>
      </div>
    </div>}
    <Contact/>
  </div>;
}
