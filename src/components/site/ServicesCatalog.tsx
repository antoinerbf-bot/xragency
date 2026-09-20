import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, ShoppingBag, Sparkles, Target, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";
import aiImg from "@/assets/svc-ai.jpg";
import brandingImg from "@/assets/svc-branding.jpg";
import maintenanceImg from "@/assets/svc-maintenance.jpg";
import mapsImg from "@/assets/svc-maps.jpg";
import seoImg from "@/assets/svc-seo.jpg";
import socialImg from "@/assets/svc-social.jpg";

const CATALOG_IDS = ["websites","branding","seo","maps","social","maintenance","ecommerce"] as const;
const HREF: Record<string,string> = {
  websites:"/services/websites", branding:"/services/branding", seo:"/services/seo", maps:"/services/maps",
  social:"/services/social", maintenance:"/services/webcare", ecommerce:"/services/ecommerce",
};
const IMAGES: Record<string,string> = {
  websites: aiImg, branding: brandingImg, seo: seoImg, maps: mapsImg, social: socialImg,
  maintenance: maintenanceImg, ecommerce: aiImg,
};
const TINT: Record<string,string> = {
  websites:"--service-amber", branding:"--service-champagne", seo:"--service-blue", maps:"--service-green",
  social:"--service-magenta", maintenance:"--service-cobalt", ecommerce:"--service-gold",
};
const RELEVANCE: Record<string,string[]> = {
  restaurant:["websites","maps","social","seo","maintenance"], hospitality:["websites","maps","seo","social"],
  realestate:["websites","branding","seo","maps"], automotive:["websites","maps","seo","maintenance"],
  fashion:["branding","websites","social","seo"], jewelry:["branding","websites","seo"],
};

export function ServicesCatalog() {
  const { t, price, lang } = useLang();
  const [universe,setUniverse] = useState<string>("");
  const catalog = useMemo(() => CATALOG_IDS.map(id => SERVICES.find(s => s.id === id)).filter(Boolean) as typeof SERVICES, []);
  const copy = {
    fr:{eyebrow:"EXPERTISES · 07",title1:"Plusieurs expertises.",title2:"Un seul système.",lead:"Sites, identité, SEO, Maps, réseaux, soin et e-commerce : chaque scène répond à un besoin précis, puis s’assemble dans votre présence digitale.",enter:"Entrer dans l’expérience",compose:"Composer cette offre",from:"À partir de",indecision:"Pas sûr par où commencer ?",indecisionLead:"Trois portes simples pour trouver la bonne scène sans passer par un deuxième questionnaire.",site:"J’ai besoin d’un site / d’une boutique",visibility:"On ne me trouve pas (Google / Maps)",recurring:"Je veux que ça tourne (social / maintenance)",quote:"Faire mon devis gratuit",reassurance:"Sans engagement · 30 min",showAll:"Voir toutes les expertises",sticky:"Faire mon devis",relevant:"pertinent pour",},
    en:{eyebrow:"EXPERTISES · 07",title1:"Multiple disciplines.",title2:"One system.",lead:"Websites, identity, SEO, Maps, social, care and e-commerce: each scene solves a specific need, then fits into one digital presence.",enter:"Enter the experience",compose:"Compose this offer",from:"From",indecision:"Not sure where to start?",indecisionLead:"Three simple doors to find the right scene without another long questionnaire.",site:"I need a website / online store",visibility:"People can't find me (Google / Maps)",recurring:"I want it to run (social / maintenance)",quote:"Make my free quote",reassurance:"No commitment · 30 min",showAll:"See all expertise",sticky:"Make my quote",relevant:"relevant for",},
    vi:{eyebrow:"CHUYÊN MÔN · 07",title1:"Nhiều chuyên môn.",title2:"Một hệ thống.",lead:"Website, nhận diện, SEO, Maps, mạng xã hội, chăm sóc và thương mại điện tử: mỗi cảnh giải quyết một nhu cầu cụ thể rồi kết nối thành một hiện diện số.",enter:"Bước vào trải nghiệm",compose:"Chọn dịch vụ này",from:"Từ",indecision:"Chưa chắc bắt đầu từ đâu?",indecisionLead:"Ba cánh cửa đơn giản để chọn đúng dịch vụ mà không cần thêm một bảng câu hỏi dài.",site:"Tôi cần website / cửa hàng online",visibility:"Khách hàng không tìm thấy tôi (Google / Maps)",recurring:"Tôi muốn mọi thứ vận hành (social / bảo trì)",quote:"Nhận báo giá miễn phí",reassurance:"Không cam kết · 30 phút",showAll:"Xem toàn bộ chuyên môn",sticky:"Nhận báo giá",relevant:"phù hợp với",},
  }[lang];

  const period = (p:string) => p === "month" ? (lang==="fr"?" / mois":lang==="vi"?" / tháng":" / month") : p === "year" ? (lang==="fr"?" / an":lang==="vi"?" / năm":" / year") : "";
  const relevant = RELEVANCE[universe] ?? [];
  const selectService = (id:string) => {
    const target = id === "ecommerce" ? "ecommerce" : id;
    window.location.href = `/#quote?service=${encodeURIComponent(target)}`;
  };
  const doors = [
    {icon:ShoppingBag,label:copy.site,ids:["websites","ecommerce"]},
    {icon:Target,label:copy.visibility,ids:["seo","maps"]},
    {icon:Wrench,label:copy.recurring,ids:["social","maintenance"]},
  ];

  return <section className="relative overflow-hidden bg-background">
    <style>{`:root{--service-amber:#cf9d4e;--service-champagne:#d8c4a0;--service-blue:#5da7df;--service-green:#72b98b;--service-magenta:#c65a9c;--service-cobalt:#5276c7;--service-gold:#e0b85d}@keyframes xr-kenburns{from{transform:scale(1)}to{transform:scale(1.045)}}@media(prefers-reduced-motion:reduce){.xr-kenburns{animation:none!important}}`}</style>

    <div className="relative min-h-[80svh] overflow-hidden border-b border-border/40 sm:min-h-[70svh]">
      <img src={IMAGES.websites} alt="" className="xr-kenburns absolute inset-0 h-full w-full object-cover opacity-75 motion-safe:animate-[xr-kenburns_20s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,.96)_0%,rgba(5,6,7,.78)_45%,rgba(5,6,7,.45)_100%)]"/>
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,.95)_0%,transparent_55%,rgba(5,6,7,.45)_100%)]"/>
      <div className="grain absolute inset-0 opacity-50"/>
      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-[1500px] flex-col justify-end px-5 pb-10 pt-28 sm:min-h-[70svh] sm:px-8 sm:pb-14 lg:px-12 lg:pb-20">
        <p className="label-mono text-xs uppercase tracking-[.28em] text-primary">{copy.eyebrow}</p>
        <h1 className="display-serif mt-5 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] leading-[.9] tracking-[-.045em] text-white">{copy.title1}<br/><em className="not-italic italic text-primary">{copy.title2}</em></h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{copy.lead}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {[["restaurant","Gastronomie"],["hospitality","Hôtellerie"],["realestate","Immobilier"],["automotive","Automobile"],["fashion","Mode"],["jewelry","Joaillerie"]].map(([id,label]) =>
            <button key={id} type="button" onClick={()=>setUniverse(universe===id?"":id)} aria-pressed={universe===id} className={cn("min-h-11 rounded-full border px-4 text-sm backdrop-blur-xl transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary", universe===id?"border-primary bg-primary/15 text-white":"border-white/15 bg-black/25 text-white/75")}>{label}</button>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-white/50"><Sparkles className="h-3.5 w-3.5 text-primary"/>{universe ? `${copy.relevant} ${["Gastronomie","Hôtellerie","Immobilier","Automobile","Mode","Joaillerie"][["restaurant","hospitality","realestate","automotive","fashion","jewelry"].indexOf(universe)]}` : copy.showAll}</div>
      </div>
    </div>

    <div id="services-scenes" className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
      <div className="mb-8 flex items-end justify-between gap-4"><div><p className="label-mono text-xs uppercase tracking-[.2em] text-primary">01 — SCÈNES</p><p className="mt-3 max-w-2xl text-base leading-6 text-muted-foreground">{copy.lead}</p></div><ArrowDown className="hidden h-5 w-5 text-primary sm:block"/></div>
      <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
        {catalog.map((service,index)=>{
          const id=service.id, isFlagship=id==="websites", isRelevant=!universe || relevant.includes(id), tint=TINT[id];
          return <article id={`scene-${id}`} key={id} className={cn("group relative overflow-hidden rounded-[1.5rem] border bg-card/50 transition duration-300 hover:-translate-y-1",isFlagship?"lg:col-span-2":"",isRelevant?"opacity-100":"opacity-45")} style={{borderColor:`color-mix(in srgb, var(${tint}) 28%, var(--border))`}}>
            <div className={cn("relative overflow-hidden",isFlagship?"h-[260px] sm:h-[330px]":"h-[210px] sm:h-[235px]")}>
              <img src={IMAGES[id]} alt={t(service.title)} loading={index<2?"eager":"lazy"} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5"/>
              <div className="absolute left-4 top-4 flex items-center gap-2"><span className="font-mono text-sm text-primary">{String(index+1).padStart(2,"0")}</span>{isRelevant&&universe&&<span className="rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[11px] text-white/70">{copy.relevant}</span>}</div>
              <div className="absolute bottom-4 left-4 right-4"><h2 className={cn("display-serif text-3xl text-white",isFlagship?"sm:text-5xl":"sm:text-4xl")}>{t(service.title)}</h2></div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="max-w-xl text-base leading-6 text-muted-foreground">{t(service.short)}</p>
              <div className="mt-4 flex flex-wrap gap-2">{service.highlights.slice(0,3).map((h,i)=><span key={i} className="rounded-full border px-2.5 py-1.5 text-xs text-muted-foreground" style={{borderColor:`color-mix(in srgb, var(${tint}) 35%, var(--border))`}}>{t(h)}</span>)}</div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base text-muted-foreground">{copy.from} <strong className="text-xl text-foreground">{price(service.fromEur)}</strong><span>{period(service.fromPeriod)}</span></p>
                <div className="flex flex-wrap gap-2">
                  <a href={HREF[id]} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{copy.enter}<ArrowUpRight className="h-4 w-4"/></a>
                  <button type="button" onClick={()=>selectService(id)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-foreground transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{copy.compose}</button>
                </div>
              </div>
            </div>
          </article>;
        })}
      </div>

      <div className="mt-16 rounded-[2rem] border border-primary/20 bg-primary/[.035] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl"><p className="label-mono text-xs uppercase tracking-[.2em] text-primary">02 — CHOISIR SANS SE PERDRE</p><h2 className="display-serif mt-3 text-3xl sm:text-5xl">{copy.indecision}</h2><p className="mt-3 text-base leading-6 text-muted-foreground">{copy.indecisionLead}</p></div>
        <div className="mt-7 grid gap-3 md:grid-cols-3">{doors.map(({icon:Icon,label,ids})=><button key={label} type="button" onClick={()=>{setUniverse(""); document.getElementById(`scene-${ids[0]}`)?.scrollIntoView({behavior:"smooth",block:"center"});}} className="group min-h-[150px] rounded-2xl border border-border bg-background/65 p-5 text-left transition hover:-translate-y-1 hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><Icon className="h-5 w-5 text-primary"/><span className="mt-5 block text-base font-semibold">{label}</span><span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">{copy.showAll}<ArrowUpRight className="h-3.5 w-3.5"/></span></button>)}</div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-muted-foreground">{copy.reassurance}</p><a href="/#quote" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{copy.quote}<ArrowUpRight className="h-4 w-4"/></a></div>
      </div>
    </div>
    <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden"><a href="/#quote" className="flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl">{copy.sticky}</a></div>
  </section>;
}
