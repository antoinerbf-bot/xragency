import { useEffect, useMemo, useState } from "react";
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
  fr: { kicker:"XRAGENCY · WORK", title:"Des univers digitaux", accent:"pensés pour être vécus.", intro:"Sites, identités et expériences : une seule collection, avec les homepages visibles avant même d’ouvrir chaque référence.", search:"Rechercher…", all:"Toutes les prestations", industries:"Tous les secteurs", open:"Ouvrir le site", close:"Fermer", reset:"Réinitialiser", catalogue:"Catalogue créatif", index:"projets sélectionnés", reel:"REEL HOMEPAGES", showcase:"Voir les univers en situation", reference:"Référence", agency:"XR Agency", homepage:"HOMEPAGE", visit:"VISITER" },
  en: { kicker:"XRAGENCY · WORK", title:"Digital worlds", accent:"designed to be experienced.", intro:"Websites, identities and experiences: one collection, with homepage previews visible before opening each reference.", search:"Search…", all:"All services", industries:"All industries", open:"Open website", close:"Close", reset:"Reset", catalogue:"Creative catalogue", index:"selected projects", reel:"HOMEPAGE REEL", showcase:"See the work in context", reference:"Reference", agency:"XR Agency", homepage:"HOMEPAGE", visit:"VISIT" },
  vi: { kicker:"XRAGENCY · WORK", title:"Những thế giới số", accent:"được thiết kế để trải nghiệm.", intro:"Website, nhận diện và trải nghiệm: một bộ sưu tập thống nhất, với bản xem trước homepage.", search:"Tìm kiếm…", all:"Tất cả dịch vụ", industries:"Tất cả lĩnh vực", open:"Mở website", close:"Đóng", reset:"Đặt lại", catalogue:"Bộ sưu tập sáng tạo", index:"dự án được chọn", reel:"REEL HOMEPAGE", showcase:"Xem các universes thực tế", reference:"Tham khảo", agency:"XR Agency", homepage:"HOMEPAGE", visit:"MỞ" },
  ar: { kicker:"XRAGENCY · WORK", title:"عوالم رقمية", accent:"مصممة لتُعاش.", intro:"مواقع وهويات وتجارب رقمية ضمن مجموعة واحدة، مع معاينات للصفحات الرئيسية.", search:"بحث…", all:"جميع الخدمات", industries:"جميع القطاعات", open:"فتح الموقع", close:"إغلاق", reset:"إعادة ضبط", catalogue:"المجموعة الإبداعية", index:"مشاريع مختارة", reel:"REEL HOMEPAGES", showcase:"شاهد العمل في سياقه", reference:"مرجع", agency:"XR Agency", homepage:"HOMEPAGE", visit:"زيارة" },
  ru: { kicker:"XRAGENCY · WORK", title:"Цифровые миры", accent:"созданные для опыта.", intro:"Сайты, айдентика и цифровые впечатления в одной коллекции с видимыми превью главных страниц.", search:"Поиск…", all:"Все услуги", industries:"Все отрасли", open:"Открыть сайт", close:"Закрыть", reset:"Сбросить", catalogue:"Креативная коллекция", index:"выбранных проектов", reel:"REEL HOMEPAGES", showcase:"Смотреть проекты в контексте", reference:"Референс", agency:"XR Agency", homepage:"HOMEPAGE", visit:"ОТКРЫТЬ" },
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

const FEATURED_NAMES = ["Pok-N Ball", "Le Gramme", "AYANA", "Raycast", "Audo Copenhagen", "Typology"] as const;

export function WorkPage() {
  const { lang } = useLang();
  const tx = copy[lang] ?? copy.fr;
  const [query,setQuery]=useState("");
  const [sector,setSector]=useState("all");
  const [service,setService]=useState("all");
  const [active,setActive]=useState<(typeof PORTFOLIO_REFERENCES)[number] | null>(null);
  const featured = useMemo(() => FEATURED_NAMES.map(name => PORTFOLIO_REFERENCES.find(item => item.name === name)).filter(Boolean) as (typeof PORTFOLIO_REFERENCES[number])[], []);
  const [reelIndex,setReelIndex]=useState(0);

  useEffect(() => {
    if (!featured.length) return;
    const timer = window.setInterval(() => setReelIndex(i => (i + 1) % featured.length), 4200);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const reelItem = featured[reelIndex] ?? featured[0];

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
        <div className="absolute inset-0 bg-[#050608]"><img key={reelItem?.url} src={reelItem?.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale contrast-[1.05] brightness-[.42] transition-opacity duration-1000" /><div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,6,8,.98),rgba(5,6,8,.58)_54%,rgba(5,6,8,.88))]" /></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(255,255,255,.12),transparent_26%),linear-gradient(120deg,rgba(5,6,8,.96),rgba(11,17,23,.72)_55%,rgba(5,6,8,.94))]"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,255,255,.07),transparent_28%)]"/>
        <div aria-hidden className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,.08)_50%,transparent_100%)]"/>
        <div className="relative mx-auto flex min-h-[72vh] max-w-[1500px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="label-mono text-[9px] tracking-[.32em] text-white/42">{tx.kicker}</p>
          <h1 className="display-serif mt-5 max-w-6xl text-[clamp(4rem,9vw,9rem)] leading-[.76] tracking-[-.075em]">{tx.title}<br/><em className="not-italic text-white/35">{tx.accent}</em></h1>
          <p className="mt-7 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">{tx.intro}</p>\n          {reelItem && <div className="mt-7 flex flex-wrap items-center gap-3"><div className="rounded-full border border-white/12 bg-white/[.045] px-4 py-2 backdrop-blur-xl"><span className="label-mono text-[8px] tracking-[.18em] text-white/55">{tx.reel} · {String(reelIndex + 1).padStart(2,"0")}/{String(featured.length).padStart(2,"0")}</span></div><div className="rounded-full border border-white/12 bg-black/45 px-4 py-2 backdrop-blur-xl"><span className="text-xs text-white/70">{reelItem.name}</span><span className="ml-2 text-[10px] text-white/35">{sectorLabels[reelItem.sector]?.[lang] ?? reelItem.sector}</span></div></div>}
          <div className="mt-12 grid gap-2 rounded-[1.6rem] border border-white/10 bg-black/45 p-2 backdrop-blur-2xl lg:grid-cols-[1fr_.28fr_.28fr_auto]">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search} className="w-full rounded-xl border border-white/10 bg-white/[.035] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/30"/></div>
            <label className="relative"><select value={sector} onChange={e=>setSector(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all">{tx.industries}</option>{PORTFOLIO_SECTORS.map(([id,label])=><option key={id} value={id} className="text-black">{sectorLabels[id]?.[lang] ?? label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"/></label>
            <label className="relative"><select value={service} onChange={e=>setService(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 pr-9 text-xs text-white outline-none"><option value="all">{tx.all}</option>{serviceOptions.slice(1).map(x=><option key={x.id} value={x.id} className="text-black">{x.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"/></label>
            <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 label-mono text-[8px] text-white/45">{filtered.length} {tx.index}</div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-[#080b0f] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div><p className="label-mono text-[9px] tracking-[.28em] text-white/45">{tx.reel}</p><h2 className="display-serif mt-3 max-w-4xl text-4xl leading-[.9] sm:text-6xl">{tx.showcase}</h2></div>
            <div className="hidden items-center gap-1 sm:flex">{featured.slice(0,6).map((item,i)=><button key={item.url} type="button" onClick={()=>setReelIndex(i)} className={"h-1.5 rounded-full transition-all duration-500 "+(i===reelIndex?"w-10 bg-white":"w-3 bg-white/20 hover:bg-white/40")} aria-label={item.name}/>)}</div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
            <button type="button" onClick={()=>reelItem && setActive(reelItem)} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black text-left">
              <div className="aspect-[16/9] overflow-hidden bg-[#0d1116]">
                <img key={reelItem?.url} src={reelItem?.image} alt={reelItem?.name+" homepage"} className="h-full w-full object-cover transition duration-[1600ms] group-hover:scale-[1.025]"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/5"/>
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between"><span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/55 backdrop-blur-xl">{tx.homepage} / {String(reelIndex+1).padStart(2,"0")}</span><span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 label-mono text-[7px] text-white/55 backdrop-blur-xl">{reelItem?.origin === "XR Agency" ? tx.agency : tx.reference}</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"><p className="label-mono text-[8px] tracking-[.18em] text-white/38">{sectorLabels[reelItem?.sector ?? ""]?.[lang] ?? reelItem?.sector} · {reelItem?.type}</p><div className="mt-2 flex items-end justify-between gap-4"><h3 className="display-serif text-5xl leading-[.86] sm:text-7xl">{reelItem?.name}</h3><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="h-4 w-4"/></span></div></div>
              </div>
            </button>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featured.slice(1,4).map((item,i)=><button key={item.url} type="button" onClick={()=>{setReelIndex(i+1);setActive(item)}} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.025] text-left">
                <div className="aspect-[16/9] overflow-hidden bg-[#0d1116] sm:aspect-[16/7] lg:aspect-[16/7]"><img src={item.image} alt={item.name+" homepage"} loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-100"/><div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent"/><div className="absolute inset-y-0 left-4 flex items-center"><div><p className="label-mono text-[7px] tracking-[.18em] text-white/35">{item.origin === "XR Agency" ? tx.agency : tx.reference} · {tx.homepage}</p><h3 className="display-serif mt-1 text-2xl">{item.name}</h3></div></div></div>
              </button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-mono text-[9px] tracking-[.28em] text-primary">01 / {tx.catalogue}</p>
              <h2 className="display-serif mt-3 max-w-5xl text-4xl leading-[.86] sm:text-6xl">Chaque référence, <em className="not-italic text-muted-foreground">en image.</em></h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Les références sont présentées avec leur homepage comme première matière visuelle : structure, rythme, direction artistique et expérience.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-border px-3 py-2 label-mono text-[8px] text-muted-foreground">{filtered.length} {tx.index}</span>
              <button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="rounded-full border border-border px-4 py-2 label-mono text-[8px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground">{tx.reset}</button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item,index)=>(
              <Reveal key={item.name+item.url} delay={Math.min(index,12)*25}>
                <button
                  type="button"
                  onClick={()=>setActive(item)}
                  className="group block w-full overflow-hidden rounded-[1.8rem] border border-border bg-card text-left transition duration-700 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080b0f]">
                    <img
                      src={item.image}
                      alt={item.name+" homepage"}
                      loading={index<9?"eager":"lazy"}
                      className="h-full w-full object-cover object-top transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/60 backdrop-blur-xl">{tx.homepage} / {String(index+1).padStart(2,"0")}</span>
                      <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.12em] text-white/55 backdrop-blur-xl">{item.origin === "XR Agency" ? tx.agency : tx.reference}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="label-mono text-[7px] tracking-[.18em] text-white/42">{sectorLabels[item.sector]?.[lang] ?? item.sector} · {item.type}</p>
                      <div className="mt-2 flex items-end justify-between gap-4 text-white">
                        <h3 className="display-serif text-4xl leading-[.86] sm:text-5xl">{item.name}</h3>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition duration-500 group-hover:bg-white group-hover:text-black">
                          <ArrowUpRight className="h-4 w-4"/>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-h-[62px] items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted-foreground">{item.services.map(s=>s==="ecommerce"?"E-commerce":s).join(" · ")}</p>
                      <p className="mt-1 label-mono text-[7px] tracking-[.15em] text-muted-foreground/50">{item.url.replace(/^https?:\/\//,"").replace(/\/$/,"")}</p>
                    </div>
                    <span className="shrink-0 label-mono text-[8px] text-primary opacity-70 transition group-hover:opacity-100">{tx.visit} →</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {!filtered.length && (
            <div className="rounded-[1.8rem] border border-dashed border-border px-6 py-16 text-center">
              <p className="display-serif text-3xl">Aucune référence ne correspond à ces filtres.</p>
              <button type="button" onClick={()=>{setQuery("");setSector("all");setService("all")}} className="mt-5 rounded-full border border-border px-4 py-2 label-mono text-[8px] text-muted-foreground hover:border-primary/40">{tx.reset}</button>
            </div>
          )}
        </div>
      </section>
    </main>
    {active && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/15 bg-background shadow-2xl">
        <button type="button" onClick={()=>setActive(null)} aria-label={tx.close} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/65 text-white"><X className="h-4 w-4"/></button>
        <div className="grid lg:grid-cols-[1.4fr_.6fr]"><div className="min-h-[420px] bg-[#080b0f]"><div className="relative h-full min-h-[420px] overflow-hidden"><img src={active.image} alt={active.name+" homepage"} className="h-full min-h-[420px] w-full object-cover"/><div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 label-mono text-[7px] tracking-[.16em] text-white/55 backdrop-blur-xl">{tx.homepage}</div></div></div><div className="p-7 sm:p-10"><span className="label-mono text-[8px] tracking-[.24em] text-primary">{sectorLabels[active.sector]?.[lang] ?? active.sector} · {active.type}</span><h2 className="display-serif mt-4 text-5xl leading-[.86]">{active.name}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Capture visuelle de la homepage publique. Le bouton ouvre le site réel dans un nouvel onglet.</p><div className="mt-6 flex flex-wrap gap-2">{active.services.map(s=><span key={s} className="rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground">{s==="ecommerce"?"E-commerce":s}</span>)}</div><a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-background">{tx.open}<ExternalLink className="h-3.5 w-3.5"/></a></div></div>
      </div>
    </div>}
    <Contact/>
  </div>;
}
