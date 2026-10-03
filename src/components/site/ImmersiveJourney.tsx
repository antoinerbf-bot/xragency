import { useState } from "react";
import { ArrowRight, Check, Globe2, Search, Target, Wand2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Parallax, Reveal } from "./primitives";
import { XR_JOURNEY_PHOTO } from "@/lib/photography";

const OPTIONS=[
  {id:"start",icon:Wand2,label:{fr:"Je pars de zéro",en:"I'm starting from zero",vi:"Tôi bắt đầu từ số 0",ar:"أبدأ من الصفر",ru:"Начинаю с нуля"},text:{fr:"Créer le socle : identité, site et visibilité.",en:"Build the foundation: identity, website and visibility.",vi:"Xây nền tảng: nhận diện, website và khả năng hiển thị.",ar:"بناء الأساس: الهوية والموقع والظهور.",ru:"Основа: айдентика, сайт и видимость."},stack:["Branding","Site web","SEO"]},
  {id:"site",icon:Globe2,label:{fr:"Mon site ne me ressemble pas",en:"My website isn't right",vi:"Website chưa phù hợp",ar:"موقعي لا يعكسني",ru:"Сайт меня не отражает"},text:{fr:"Refondre l'expérience et le parcours de conversion.",en:"Rework the experience and conversion journey.",vi:"Thiết kế lại trải nghiệm và chuyển đổi.",ar:"إعادة بناء التجربة ومسار التحويل.",ru:"Пересобрать опыт и конверсию."},stack:["Refonte","Conversion","WebCare"]},
  {id:"visibility",icon:Search,label:{fr:"Je manque de visibilité",en:"I lack visibility",vi:"Tôi thiếu khả năng hiển thị",ar:"أفتقد الظهور",ru:"Мне не хватает видимости"},text:{fr:"Vous rendre visible là où vos clients cherchent déjà.",en:"Show up where customers are already searching.",vi:"Xuất hiện nơi khách hàng đang tìm kiếm.",ar:"الظهور حيث يبحث العملاء.",ru:"Быть там, где клиенты уже ищут."},stack:["SEO","Google Maps","Ads"]},
  {id:"growth",icon:Target,label:{fr:"Je veux plus de clients",en:"I want more clients",vi:"Tôi muốn nhiều khách hơn",ar:"أريد المزيد من العملاء",ru:"Хочу больше клиентов"},text:{fr:"Construire le parcours : attirer → convaincre → convertir.",en:"Build the path: attract → convince → convert.",vi:"Xây hành trình: thu hút → thuyết phục → chuyển đổi.",ar:"بناء المسار: جذب ← إقناع ← تحويل.",ru:"Путь: привлечь → убедить → конвертировать."},stack:["Strategy","Conversion","Social"]},
];

export function ImmersiveJourney(){
  const {lang}=useLang();
  const [active,setActive]=useState("start");
  const option=OPTIONS.find(x=>x.id===active)??OPTIONS[0];
  const Icon=option.icon;
  const label=option.label[lang as keyof typeof option.label]??option.label.fr;
  const copy=option.text[lang as keyof typeof option.text]??option.text.fr;
  return <section id="journey" className="xr-section-elevated xr-noise relative overflow-hidden border-b xr-line py-16 sm:py-20 lg:py-24">
    <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
      <Parallax speed={-0.02}><Reveal><div className="flex flex-col gap-6 border-b xr-line pb-8 lg:flex-row lg:items-end lg:justify-between"><div><span className="label-mono xr-accent text-[8px] tracking-[.28em]">01 · IDENTIFIER LE BESOIN</span><h2 className="display-serif mt-4 max-w-4xl text-[clamp(2.7rem,5vw,5.3rem)] leading-[.86] tracking-[-.06em]">{lang==="fr"?"On ne vous fait pas choisir un service. On commence par le problème.":lang==="vi"?"Chúng tôi không bắt bạn chọn dịch vụ. Chúng tôi bắt đầu từ vấn đề.":lang==="ar"?"لن نطلب منك اختيار خدمة. نبدأ بالمشكلة.":lang==="ru"?"Мы не заставляем вас выбирать услугу. Начинаем с проблемы.":"We don't ask you to pick a service. We start with the problem."}</h2></div><p className="max-w-md text-sm leading-6 xr-muted">{lang==="fr"?"Choisissez votre situation. XR transforme ensuite ce besoin en priorités, en dispositif et en prochaine étape.":"Choose your situation. XR then turns that need into priorities, a system and a next step."}</p></div></Reveal></Parallax>

      <div className="mt-7 overflow-hidden rounded-[2.4rem] border xr-line bg-[var(--xr-bg)] shadow-[var(--xr-shadow)]">
        <div className="xr-rail flex gap-2 overflow-x-auto border-b xr-line p-2 sm:p-3">
          {OPTIONS.map((item,i)=>{
            const I=item.icon;
            const selected=item.id===active;
            const itemLabel=item.label[lang as keyof typeof item.label]??item.label.fr;
            return <button key={item.id} type="button" onClick={()=>setActive(item.id)} className={"flex min-w-[220px] flex-1 items-center gap-3 rounded-[1.35rem] px-4 py-3 text-left transition duration-400 sm:min-w-0 "+(selected?"bg-[var(--xr-ink)] text-[var(--xr-bg)]":"hover:bg-[var(--xr-surface)]")}>
              <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-xl border "+(selected?"border-transparent bg-[var(--xr-bg)] text-[var(--xr-ink)]":"xr-line xr-muted")}><I className="h-4 w-4"/></span>
              <span className="min-w-0"><span className="label-mono text-[5px] opacity-45">0{i+1}</span><span className="mt-1 block truncate text-[10px] font-semibold">{itemLabel}</span></span>
            </button>;
          })}
        </div>
        <div className="grid min-h-[360px] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative overflow-hidden p-6 sm:p-9 lg:p-11">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[var(--xr-accent-soft)] blur-3xl"/>
            <Parallax speed={0.02} direction="x" className="relative z-10 max-w-2xl">
              <span className="label-mono text-[6px] tracking-[.2em] xr-muted-2">01 · SITUATION IDENTIFIÉE</span>
              <h3 className="display-serif mt-4 text-[clamp(2.5rem,5vw,5rem)] leading-[.83] tracking-[-.055em]">{label}</h3>
              <p className="mt-5 max-w-xl text-sm leading-6 xr-muted">{copy}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {option.stack.map((x,i)=><span key={x} className="rounded-full border xr-line bg-[var(--xr-surface)] px-3 py-2 label-mono text-[6px] backdrop-blur-xl"><span className="mr-2 xr-accent">0{i+1}</span>{x}</span>)}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/#quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)] transition hover:-translate-y-0.5">Construire mon projet <ArrowRight className="h-4 w-4"/></a>
                <a href="#homepage-services" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-4 py-3.5 label-mono text-[7px] xr-muted transition hover:-translate-y-0.5">Explorer les 7 expertises</a>
              </div>
              <div className="mt-8 grid gap-2 sm:grid-cols-3">
                {[["DIRECTION","Une priorité claire"],["DISPOSITIF","Les expertises utiles"],["ACTION","La prochaine étape"]].map(([label,value])=><div key={label} className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5"><span className="label-mono text-[6px] tracking-[.16em] xr-muted-2">{label}</span><span className="mt-2 block text-[9px] font-semibold">{value}</span></div>)}
              </div>
            </Parallax>
          </div>
          <div className="relative min-h-[260px] overflow-hidden border-t xr-line lg:border-l lg:border-t-0">
            <Parallax speed={0.035} direction="y" className="absolute inset-0">
              <img src={XR_JOURNEY_PHOTO} alt="" className="h-full w-full object-cover opacity-65 transition-transform duration-[1400ms] hover:scale-[1.035]"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--xr-bg)]/95 via-[var(--xr-bg)]/25 to-transparent"/>
            </Parallax>
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)] p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">02 · VOTRE DIRECTION</span><span className="grid h-8 w-8 place-items-center rounded-full xr-accent-bg"><Icon className="h-3.5 w-3.5 xr-accent"/></span></div>
              <div className="mt-4 flex flex-wrap gap-2">{option.stack.map((x,i)=><span key={x} className="inline-flex items-center gap-2 rounded-full border xr-line bg-[var(--xr-bg)] px-3 py-2 text-[7px]"><Check className="h-3 w-3 xr-accent"/>{x}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
