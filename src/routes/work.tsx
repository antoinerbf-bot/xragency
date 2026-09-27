import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, ChevronDown, ExternalLink, X, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Parallax, Reveal } from "@/components/site/primitives";
import { Contact } from "@/components/site/Contact";
import { PORTFOLIO_REFERENCES, PORTFOLIO_SECTORS } from "@/lib/portfolioReferences";
import { SERVICES } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — XR Agency" },
      { name: "description", content: "Sélection de références digitales, interfaces et directions créatives explorées par XR Agency." },
      { property: "og:title", content: "Nos réalisations — XR Agency" },
      { property: "og:description", content: "Explorez des univers digitaux par secteur, discipline et direction créative." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/realisations" }],
  }),
  component: WorkPage,
});

const copy = {
  fr: { kicker:"XR AGENCY · SELECTED WORK", title:"Des interfaces qui donnent envie", accent:"d’aller plus loin.", intro:"Une sélection de directions digitales, références publiques et projets explorés par univers. Ouvrez chaque carte pour voir l’interface en grand et accéder au site.", search:"Rechercher une marque, un secteur…", all:"Toutes les prestations", industries:"Tous les secteurs", refs:"références", public:"Référence publique", xr:"Projet XR Agency", open:"Ouvrir le site", details:"Voir le projet", close:"Fermer", note:"Les références publiques sont présentées comme inspirations de direction et d’expérience." },
  en: { kicker:"XR AGENCY · SELECTED WORK", title:"Interfaces made to", accent:"make you go further.", intro:"A curated selection of digital directions, public references and explored projects. Open each card to view the interface larger and visit the site.", search:"Search a brand or sector…", all:"All services", industries:"All industries", refs:"references", public:"Public reference", xr:"XR Agency project", open:"Open website", details:"View project", close:"Close", note:"Public references are shown as inspiration for digital direction and experience." },
  vi: { kicker:"XR AGENCY · DỰ ÁN TUYỂN CHỌN", title:"Những giao diện khiến bạn muốn", accent:"đi xa hơn.", intro:"Bộ sưu tập định hướng số, tham chiếu công khai và dự án theo từng lĩnh vực. Mở từng thẻ để xem giao diện lớn hơn và truy cập website.", search:"Tìm thương hiệu hoặc lĩnh vực…", all:"Tất cả dịch vụ", industries:"Tất cả lĩnh vực", refs:"tham chiếu", public:"Tham chiếu công khai", xr:"Dự án XR Agency", open:"Mở website", details:"Xem dự án", close:"Đóng", note:"Các tham chiếu công khai được trình bày như nguồn cảm hứng về định hướng số và trải nghiệm." },
  ar: { kicker:"XR AGENCY · أعمال مختارة", title:"واجهات رقمية تدفعك", accent:"إلى الأمام.", intro:"مجموعة منتقاة من الاتجاهات الرقمية والمراجع العامة والمشاريع حسب المجال. افتح كل بطاقة لمشاهدة الواجهة والوصول إلى الموقع.", search:"ابحث عن علامة أو قطاع…", all:"جميع الخدمات", industries:"جميع القطاعات", refs:"مراجع", public:"مرجع عام", xr:"مشروع XR Agency", open:"فتح الموقع", details:"عرض المشروع", close:"إغلاق", note:"تُعرض المراجع العامة كمصادر إلهام للاتجاه الرقمي والتجربة." },
  ru: { kicker:"XR AGENCY · ИЗБРАННЫЕ РАБОТЫ", title:"Интерфейсы, которые хочется", accent:"рассматривать дальше.", intro:"Подборка цифровых направлений, публичных референсов и проектов по отраслям. Откройте карточку, чтобы увидеть интерфейс крупнее и перейти на сайт.", search:"Найти бренд или отрасль…", all:"Все услуги", industries:"Все отрасли", refs:"референсов", public:"Публичный референс", xr:"Проект XR Agency", open:"Открыть сайт", details:"Посмотреть", close:"Закрыть", note:"Публичные референсы показаны как источник вдохновения для цифрового направления и опыта." },
} as const;

export function WorkPage() {
  const { lang, t } = useLang();
  const tx = copy[lang] ?? copy.fr;
  const [query,setQuery]=useState("");
  const [sector,setSector]=useState("all");
  const [service,setService]=useState("Tous");
  const [active,setActive]=useState<(typeof PORTFOLIO_REFERENCES)[number] | null>(null);

  const serviceOptions=[{id:"Tous",label:tx.all},...SERVICES.map(x=>({id:x.id,label:t(x.title)}))];
  const filtered=useMemo(()=>PORTFOLIO_REFERENCES.filter(item=>{
    const q=query.toLowerCase().trim();
    return (!q || [item.name,item.sector,item.type].join(" ").toLowerCase().includes(q))
      && (sector==="all" || item.sector===sector)
      && (service==="Tous" || item.services.includes(service));
  }),[query,sector,service]);

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav/>
    <main className="pt-20 sm:pt-24">
      <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,hsl(var(--primary)/.15),transparent_30%),radial-gradient(circle_at_10%_80%,hsl(var(--foreground)/.05),transparent_30%)]"/>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Parallax speed={-0.025}>
            <p className="label-mono text-[9px] tracking-[.28em] text-primary">{tx.kicker}</p>
            <h1 className="display-serif mt-5 max-w-6xl text-[clamp(3.2rem,8vw,7.8rem)] leading-[.84] tracking-[-.045em]">{tx.title}<br/><em className="not-italic italic text-primary">{tx.accent}</em></h1>
            <p className="mt-7 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{tx.intro}</p>
          </Parallax>
          <div className="mt-10 grid gap-3 rounded-[1.75rem] border border-border bg-card/65 p-3 shadow-2xl backdrop-blur-xl lg:grid-cols-[1fr_.32fr_.32fr_auto]">
            <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx.search} className="w-full rounded-2xl border border-border bg-background/80 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-primary"/></div>
            <label className="relative"><select value={sector} onChange={e=>setSector(e.target.value)} className="w-full appearance-none rounded-2xl border border-border bg-background/80 px-4 py-3.5 pr-9 text-xs outline-none focus:border-primary"><option value="all">{tx.industries}</option>{PORTFOLIO_SECTORS.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"/></label>
            <label className="relative"><select value={service} onChange={e=>setService(e.target.value)} className="w-full appearance-none rounded-2xl border border-border bg-background/80 px-4 py-3.5 pr-9 text-xs outline-none focus:border-primary"><option value="Tous">{tx.all}</option>{serviceOptions.slice(1).map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"/></label>
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/60 px-4 py-3 text-[9px] uppercase tracking-[.14em] text-muted-foreground"><SlidersHorizontal className="h-3.5 w-3.5 text-primary"/>{filtered.length} {tx.refs}</div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-8 flex items-center justify-between gap-4"><p className="text-xs text-muted-foreground">{tx.note}</p><span className="hidden label-mono text-[8px] tracking-[.18em] text-muted-foreground/50 sm:block">01 — {String(filtered.length).padStart(2,"0")}</span></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {filtered.map((item,index)=>{
              const feature=index===0 || index%7===0;
              return <Reveal key={item.name+item.url} delay={Math.min(index,8)*35} className={feature?"sm:col-span-2 lg:col-span-7":"lg:col-span-5"}>
                <button type="button" onClick={()=>setActive(item)} className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-card text-left transition duration-700 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_35px_90px_-45px_rgba(0,0,0,.7)]">
                  <div className={`relative overflow-hidden bg-[#0b0e12] ${feature?"aspect-[16/10]":"aspect-[16/11]"}`}>
                    <img src={item.image} alt={item.name+" — "+item.sector} loading={index<4?"eager":"lazy"} decoding="async" onError={e=>{e.currentTarget.style.opacity="0"}} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.035]"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"/>
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2"><span className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 label-mono text-[8px] tracking-[.14em] text-white backdrop-blur">{item.name}</span><span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 label-mono text-[8px] tracking-[.14em] text-white/70 backdrop-blur">{item.type}</span></div>
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white"><p className="label-mono text-[8px] tracking-[.2em] text-white/50">{item.sector} · {item.origin==="XR Agency"?tx.xr:tx.public}</p><div className="mt-2 flex items-end justify-between gap-4"><h2 className={feature?"display-serif text-4xl sm:text-5xl":"display-serif text-3xl"}>{item.name}</h2><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 transition group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4"/></span></div></div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4 sm:px-6"><span className="text-xs text-muted-foreground">{item.services.slice(0,3).join(" · ")}</span><span className="label-mono text-[8px] tracking-[.14em] text-primary">{tx.details} <ArrowUpRight className="ml-1 inline h-3 w-3"/></span></div>
                </button>
              </Reveal>;
            })}
          </div>
          {!filtered.length && <div className="py-20 text-center"><p className="display-serif text-3xl">Aucune référence pour cette sélection.</p><button onClick={()=>{setQuery("");setSector("all");setService("Tous")}} className="mt-4 text-xs text-primary">Réinitialiser</button></div>}
        </div>
      </section>
    </main>

    {active && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={active.name}>
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/15 bg-background shadow-2xl">
        <button type="button" onClick={()=>setActive(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl"><X className="h-4 w-4"/></button>
        <div className="grid lg:grid-cols-[1.2fr_.8fr]">
          <div className="min-h-[360px] bg-[#0b0e12]"><img src={active.image} alt={active.name} className="h-full min-h-[360px] w-full object-cover"/></div>
          <div className="p-7 sm:p-10">
            <span className="label-mono text-[9px] tracking-[.24em] text-primary">XR AGENCY · {active.sector.toUpperCase()}</span>
            <h2 className="display-serif mt-4 text-4xl leading-[.9] sm:text-5xl">{active.name}</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{active.origin==="XR Agency"?tx.xr:tx.public} · {active.type}</p>
            <div className="mt-6 flex flex-wrap gap-2">{active.services.map(s=><span key={s} className="rounded-full border border-border px-3 py-1.5 text-[9px] text-muted-foreground">{s}</span>)}</div>
            <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/[.04] p-4"><div className="flex items-center gap-2 text-xs font-medium"><Sparkles className="h-4 w-4 text-primary"/>Direction digitale</div><p className="mt-2 text-[10px] leading-5 text-muted-foreground">{tx.note}</p></div>
            <a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-semibold text-background">{tx.open}<ExternalLink className="h-3.5 w-3.5"/></a>
          </div>
        </div>
      </div>
    </div>}

    <Contact/>
  </div>;
}