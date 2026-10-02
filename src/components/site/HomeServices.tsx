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
 fr:{eyebrow:"NOS 07 SERVICES · CONÇUS POUR TRAVAILLER ENSEMBLE",title:"Pas une liste de prestations.",accent:"Un écosystème qui avance.",lead:"Chaque expertise XRAGENCY répond à un moment précis du parcours client. Découvrez, comprenez, choisissez — puis assemblez votre dispositif.",from:"À partir de",open:"Voir le service",add:"Construire mon dispositif",next:"Service suivant"},
 en:{eyebrow:"07 SERVICES · BUILT TO WORK TOGETHER",title:"Not a service list.",accent:"An ecosystem that moves.",lead:"Each XRAGENCY discipline answers a specific moment in the customer journey. Discover, understand, choose — then build your system.",from:"From",open:"View service",add:"Build my system",next:"Next service"},
 vi:{eyebrow:"07 DỊCH VỤ · THIẾT KẾ ĐỂ KẾT NỐI",title:"Không phải danh sách dịch vụ.",accent:"Một hệ sinh thái cùng tiến lên.",lead:"Mỗi chuyên môn giải quyết một bước trong hành trình khách hàng. Khám phá, hiểu, chọn — rồi xây hệ thống.",from:"Từ",open:"Xem dịch vụ",add:"Xây hệ thống",next:"Dịch vụ tiếp theo"},
 ar:{eyebrow:"07 خدمات · مصممة للعمل معاً",title:"ليست مجرد قائمة خدمات.",accent:"منظومة تتحرك معاً.",lead:"كل تخصص يعالج مرحلة محددة من رحلة العميل. اكتشف، افهم، اختر — ثم ابنِ منظومتك.",from:"ابتداءً من",open:"عرض الخدمة",add:"ابنِ منظومتك",next:"الخدمة التالية"},
 ru:{eyebrow:"07 УСЛУГ · СОЗДАНЫ ДЛЯ РАБОТЫ ВМЕСТЕ",title:"Не список услуг.",accent:"Единая система, которая растёт.",lead:"Каждое направление XRAGENCY отвечает за конкретный этап пути клиента. Изучите, выберите — и соберите свою систему.",from:"От",open:"Открыть",add:"Собрать систему",next:"Следующая услуга"},
} as const;

export function HomeServices(){
 const {t,price,lang}=useLang();
 const copy=COPY[lang as keyof typeof COPY]??COPY.fr;
 const [active,setActive]=useState<(typeof IDS)[number]>("websites");
 const index=IDS.indexOf(active);
 const service=SERVICES.find(s=>s.id===active)??SERVICES[0];
 const Icon=ICONS[active];
 const next=IDS[(index+1)%IDS.length];
 return <section id="homepage-services" className="xr-section xr-noise relative overflow-hidden border-y xr-line py-20 sm:py-28 lg:py-36">
   <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,var(--xr-accent-soft),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(120,120,140,.08),transparent_26%)]"/>
   <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
     <Parallax speed={-0.025}><Reveal><div className="grid gap-8 border-b xr-line pb-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
       <div><span className="label-mono xr-accent text-[9px] tracking-[.28em]">{copy.eyebrow}</span><h2 className="display-serif mt-5 max-w-5xl text-[clamp(3.1rem,5.8vw,6.2rem)] leading-[.86] tracking-[-.065em]">{copy.title}<br/><em className="not-italic opacity-45">{copy.accent}</em></h2></div>
       <p className="max-w-xl text-sm leading-7 xr-muted lg:pb-1 sm:text-base">{copy.lead}</p>
     </div></Reveal></Parallax>

     <Reveal delay={80}><div className="mt-7 flex gap-2 overflow-x-auto border-b xr-line pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
       {IDS.map((id,i)=>{const S=SERVICES.find(s=>s.id===id);const I=ICONS[id];return <button key={id} type="button" onClick={()=>setActive(id)} className={"group flex min-w-[154px] flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-left transition duration-300 "+(active===id?"bg-[var(--xr-ink)] text-[var(--xr-bg)] shadow-xl":"hover:bg-[var(--xr-surface)]")}><span className={"grid h-9 w-9 shrink-0 place-items-center rounded-xl border "+(active===id?"border-transparent bg-[var(--xr-bg)] text-[var(--xr-ink)]":"xr-line xr-muted")}><I className="h-4 w-4"/></span><span className="min-w-0"><span className="label-mono text-[6px] opacity-45">0{i+1}</span><span className="mt-1 block truncate text-[9px] font-semibold">{t(S?.title??{fr:id,en:id,vi:id,ar:id,ru:id})}</span></span></button>})}
     </div></Reveal>

     <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
       <Reveal><div className="xr-depth-card overflow-hidden rounded-[2.4rem] border xr-line bg-[var(--xr-surface)]">
         <div className="grid lg:grid-cols-[1.18fr_.82fr]">
           <div className="min-h-[460px] p-2 sm:min-h-[560px] sm:p-3"><ServiceIllustration service={active} title={t(service.title)}/></div>
           <Parallax speed={0.018} direction="both"><div className="flex h-full flex-col justify-between border-t xr-line p-7 sm:p-9 lg:border-l lg:border-t-0">
             <div><div className="flex items-center justify-between"><span className="label-mono text-[7px] xr-muted-2">XR / {String(index+1).padStart(2,"0")} · 07</span><span className="grid h-10 w-10 place-items-center rounded-xl border xr-line xr-accent-bg"><Icon className="h-4 w-4 xr-accent"/></span></div><h3 className="display-serif mt-10 text-5xl leading-[.88] tracking-[-.045em] sm:text-6xl">{t(service.title)}</h3><p className="mt-5 text-sm leading-6 xr-muted">{t(service.description)}</p></div>
             <div className="mt-10"><div className="flex items-end justify-between gap-4 border-y xr-line py-5"><div><span className="label-mono text-[6px] xr-muted-2">{copy.from}</span><p className="mt-1 text-3xl font-semibold tracking-[-.04em]">{price(PRICES[active])}</p></div><span className="label-mono text-[6px] xr-muted-2">{service.fromPeriod==="month"?"/ MOIS":service.fromPeriod==="year"?"/ AN":""}</span></div>
             <div className="mt-5 flex flex-wrap gap-2"><Link to={active==="maintenance"?"/services/webcare":active==="robotics"?"/services/robotique":"/services/"+active} className="inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)]">{copy.open}<ArrowUpRight className="h-4 w-4"/></Link><a href="#quote" className="inline-flex items-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[8px] xr-muted hover:bg-[var(--xr-surface-strong)]">{copy.add}<ArrowRight className="h-3.5 w-3.5"/></a></div></div>
           </div></Parallax>
         </div>
       </div></Reveal>

       <Reveal delay={120}><aside className="flex flex-col justify-between rounded-[2.4rem] border xr-line bg-[var(--xr-bg-elev)] p-6 sm:p-8">
         <div><span className="label-mono text-[7px] xr-muted-2">CE QUE VOUS OBTENEZ</span><div className="mt-5 space-y-2.5">{(service.highlights??[]).slice(0,5).map((x,i)=><div key={i} className="flex items-start gap-3 rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5"><span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full xr-accent-bg text-[7px] xr-accent">{String(i+1).padStart(2,"0")}</span><span className="text-[10px] leading-4">{t(x)}</span></div>)}</div></div>
         <div className="mt-8"><div className="flex items-center justify-between border-t xr-line pt-5"><span className="label-mono text-[6px] xr-muted-2">{copy.next}</span><button type="button" onClick={()=>setActive(next)} className="inline-flex items-center gap-2 rounded-full border xr-line px-4 py-2.5 text-[9px] hover:bg-[var(--xr-surface)]"><span>{t(SERVICES.find(s=>s.id===next)?.title??{fr:next,en:next,vi:next,ar:next,ru:next})}</span><ArrowRight className="h-3.5 w-3.5"/></button></div></div>
       </aside></Reveal>
     </div>
   </div>
 </section>;
}
