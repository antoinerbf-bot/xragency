import { useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe2, MapPinned, Palette, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";

const IDS=["websites","branding","seo","maps","social","maintenance","robotics"] as const;
const ICONS={websites:Globe2,branding:Palette,seo:BarChart3,maps:MapPinned,social:Users,maintenance:ShieldCheck,robotics:Bot};
const PRICES:Record<string,number>={websites:499,branding:179,seo:299,maps:990,social:299,maintenance:29,robotics:499};

const COPY={
  fr:{eyebrow:"NOS 07 SERVICES · UN SYSTÈME, PAS UN CATALOGUE",title:"Les briques qui font avancer votre marque.",accent:"Choisissez une entrée. Voyez tout le dispositif.",lead:"Chaque service a une fonction précise. Le parcours reste lisible, visuel et orienté vers l'action.",from:"À partir de",open:"Découvrir",add:"Ajouter au projet",next:"Suivant"},
  en:{eyebrow:"07 SERVICES · ONE SYSTEM, NOT A CATALOGUE",title:"The building blocks that move your brand.",accent:"Choose an entry. See the whole system.",lead:"Each service has a precise role. The journey stays visual, clear and action-oriented.",from:"From",open:"Discover",add:"Add to project",next:"Next"},
  vi:{eyebrow:"07 DỊCH VỤ · MỘT HỆ THỐNG, KHÔNG PHẢI DANH MỤC",title:"Những mảnh ghép giúp thương hiệu tiến lên.",accent:"Chọn một điểm bắt đầu. Xem toàn hệ thống.",lead:"Mỗi dịch vụ có một vai trò rõ ràng. Hành trình luôn trực quan và hướng tới hành động.",from:"Từ",open:"Khám phá",add:"Thêm vào dự án",next:"Tiếp theo"},
  ar:{eyebrow:"07 خدمات · منظومة واحدة وليست قائمة",title:"الركائز التي تدفع علامتك إلى الأمام.",accent:"اختر نقطة دخول. شاهد المنظومة كاملة.",lead:"لكل خدمة وظيفة دقيقة. الرحلة واضحة ومرئية وموجهة نحو الإجراء.",from:"ابتداءً من",open:"اكتشف",add:"أضف للمشروع",next:"التالي"},
  ru:{eyebrow:"07 УСЛУГ · ЕДИНАЯ СИСТЕМА, НЕ КАТАЛОГ",title:"Блоки, которые двигают ваш бренд.",accent:"Выберите точку входа — увидите всю систему.",lead:"У каждой услуги своя роль. Путь остаётся наглядным, понятным и ориентированным на действие.",from:"От",open:"Открыть",add:"Добавить в проект",next:"Далее"},
} as const;

export function HomeServices(){
  const {t,price,lang}=useLang();
  const copy=COPY[lang as keyof typeof COPY]??COPY.fr;
  const [active,setActive]=useState<(typeof IDS)[number]>("websites");
  const index=IDS.indexOf(active);
  const service=SERVICES.find(s=>s.id===active)??SERVICES[0];
  const Icon=ICONS[active];
  const next=IDS[(index+1)%IDS.length];

  return <section id="homepage-services" className="xr-section xr-noise relative overflow-hidden border-y xr-line py-18 sm:py-22 lg:py-28">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,var(--xr-accent-soft),transparent_24%),radial-gradient(circle_at_90%_90%,rgba(20,20,24,.06),transparent_28%)]"/>
    <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
      <Parallax speed={-0.02}><Reveal><div className="flex flex-col gap-6 border-b xr-line pb-8 lg:flex-row lg:items-end lg:justify-between"><div><span className="label-mono text-[8px] tracking-[.28em] xr-accent">{copy.eyebrow}</span><h2 className="display-serif mt-4 max-w-5xl text-[clamp(2.8rem,5.4vw,6rem)] leading-[.84] tracking-[-.065em]">{copy.title}<br/><em className="not-italic opacity-45">{copy.accent}</em></h2></div><p className="max-w-md text-sm leading-6 xr-muted">{copy.lead}</p></div></Reveal></Parallax>

      <Reveal delay={70}><div className="xr-rail mt-6 flex gap-2 overflow-x-auto pb-2">
        {IDS.map((id,i)=>{
          const S=SERVICES.find(s=>s.id===id); const I=ICONS[id]; const selected=active===id;
          return <button key={id} type="button" onClick={()=>setActive(id)} className={"group relative flex min-w-[168px] flex-1 flex-col overflow-hidden rounded-[1.6rem] border p-4 text-left transition duration-500 sm:min-w-0 "+(selected?"border-transparent bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-[var(--xr-shadow)]":"xr-line bg-[var(--xr-surface)] hover:-translate-y-1")}>
            <div className="flex items-center justify-between"><span className={"label-mono text-[6px] "+(selected?"text-white/45":"xr-muted-2")}>0{i+1}</span><span className={"grid h-8 w-8 place-items-center rounded-full border "+(selected?"border-white/15 bg-white/10":"xr-line")}><I className="h-3.5 w-3.5"/></span></div>
            <span className="mt-8 block truncate text-[11px] font-semibold">{t(S?.title??{fr:id,en:id,vi:id,ar:id,ru:id})}</span>
            <span className={"mt-2 block label-mono text-[6px] "+(selected?"text-white/45":"xr-muted-2")}>{copy.from} {price(PRICES[id])}</span>
            {selected?<span className="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--xr-accent)]"/>:null}
          </button>;
        })}
      </div></Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.42fr_.58fr]">
        <Reveal><div className="xr-depth-card overflow-hidden rounded-[2.35rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-2 sm:p-3"><ServiceIllustration service={active} title={t(service.title)}/></div>
            <Parallax speed={0.02} direction="y"><div className="flex h-full min-h-[410px] flex-col justify-between border-t xr-line p-7 sm:p-9 lg:border-l lg:border-t-0">
              <div><div className="flex items-center justify-between"><span className="label-mono text-[6px] tracking-[.22em] xr-muted-2">CHAPTER {String(index+1).padStart(2,"0")} / 07</span><span className="grid h-10 w-10 place-items-center rounded-xl xr-accent-bg"><Icon className="h-4 w-4 xr-accent"/></span></div><h3 className="display-serif mt-10 text-5xl leading-[.86] tracking-[-.045em] sm:text-6xl">{t(service.title)}</h3><p className="mt-5 max-w-lg text-sm leading-6 xr-muted">{t(service.description)}</p></div>
              <div><div className="flex items-end justify-between border-y xr-line py-5"><div><span className="label-mono text-[6px] xr-muted-2">{copy.from}</span><p className="mt-1 text-3xl font-semibold tracking-[-.04em]">{price(PRICES[active])}</p></div><span className="label-mono text-[6px] xr-muted-2">{service.fromPeriod==="month"?"/ MOIS":service.fromPeriod==="year"?"/ AN":""}</span></div>
                <div className="mt-5 flex flex-wrap gap-2"><Link to={active==="maintenance"?"/services/webcare":active==="robotics"?"/services/robotique":"/services/"+active} className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)]">{copy.open}<ArrowUpRight className="h-4 w-4"/></Link><a href="#quote" className="inline-flex items-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[8px] xr-muted hover:bg-[var(--xr-surface-strong)]">{copy.add}<ArrowRight className="h-3.5 w-3.5"/></a></div>
              </div>
            </div></Parallax>
          </div>
        </div></Reveal>

        <Reveal delay={90}><aside className="rounded-[2.35rem] border xr-line bg-[var(--xr-surface)] p-6 sm:p-8">
          <div className="flex items-end justify-between gap-3 border-b xr-line pb-4"><div><span className="label-mono text-[6px] xr-muted-2">CE QUE ÇA ACTIVE</span><h4 className="display-serif mt-2 text-3xl">Dans votre écosystème.</h4></div><span className="label-mono text-[7px] xr-accent">{String(index+1).padStart(2,"0")} / 07</span></div>
          <div className="mt-5 space-y-2.5">{(service.highlights??[]).slice(0,4).map((x,i)=><div key={i} className="flex items-start gap-3 rounded-2xl border xr-line bg-[var(--xr-bg)] p-3.5"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full xr-accent-bg label-mono text-[6px] xr-accent">{String(i+1).padStart(2,"0")}</span><span className="text-[10px] leading-4">{t(x)}</span></div>)}</div>
          <div className="mt-6 border-t xr-line pt-5"><button type="button" onClick={()=>setActive(next)} className="flex w-full items-center justify-between rounded-2xl border xr-line bg-[var(--xr-bg)] px-4 py-3.5 text-left transition hover:-translate-y-0.5"><span><span className="label-mono block text-[6px] xr-muted-2">{copy.next}</span><span className="mt-1 block text-[10px] font-semibold">{t(SERVICES.find(s=>s.id===next)?.title??{fr:next,en:next,vi:next,ar:next,ru:next})}</span></span><ArrowRight className="h-4 w-4 xr-muted-2"/></button></div>
        </aside></Reveal>
      </div>
    </div>
  </section>;
}
