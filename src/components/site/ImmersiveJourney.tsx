import { useState } from "react";
import { ArrowRight, Bot, Check, Globe2, Search, Sparkles, Target, Wand2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Parallax, Reveal } from "./primitives";
import { XR_JOURNEY_PHOTO } from "@/lib/photography";

const OPTIONS = [
  { id:"start", icon:Wand2, label:{fr:"Je pars de zéro",en:"I'm starting from zero",vi:"Tôi bắt đầu từ con số 0",ar:"أبدأ من الصفر",ru:"Начинаю с нуля"}, text:{fr:"Construire une base solide : identité + site + visibilité.",en:"Build the foundation: identity + website + visibility.",vi:"Xây nền tảng: nhận diện + website + hiển thị.",ar:"بناء الأساس: الهوية + الموقع + الظهور.",ru:"Основа: айдентика + сайт + видимость."}, stack:["Branding","Site web","SEO"]},
  { id:"site", icon:Globe2, label:{fr:"Mon site ne me ressemble pas",en:"My website isn't right",vi:"Website chưa phù hợp",ar:"موقعي لا يعكسني",ru:"Сайт меня не отражает"}, text:{fr:"Refonte de l'expérience, du message et du parcours de conversion.",en:"Rework the experience, message and conversion journey.",vi:"Thiết kế lại trải nghiệm, thông điệp và chuyển đổi.",ar:"إعادة بناء التجربة والرسالة ومسار التحويل.",ru:"Пересобрать опыт, сообщение и конверсию."}, stack:["Refonte","Conversion","WebCare"]},
  { id:"visibility", icon:Search, label:{fr:"Je manque de visibilité",en:"I lack visibility",vi:"Tôi thiếu khả năng hiển thị",ar:"أفتقد الظهور",ru:"Мне не хватает видимости"}, text:{fr:"Faire remonter votre activité là où vos clients cherchent déjà.",en:"Show up where customers are already searching.",vi:"Xuất hiện nơi khách hàng đang tìm kiếm.",ar:"الظهور حيث يبحث العملاء بالفعل.",ru:"Быть там, где клиенты уже ищут."}, stack:["SEO","Google Maps","Ads"]},
  { id:"growth", icon:Target, label:{fr:"Je veux plus de clients",en:"I want more clients",vi:"Tôi muốn nhiều khách hơn",ar:"أريد عملاء أكثر",ru:"Хочу больше клиентов"}, text:{fr:"Un parcours complet : attirer → convaincre → convertir.",en:"A complete path: attract → convince → convert.",vi:"Hành trình đầy đủ: thu hút → thuyết phục → chuyển đổi.",ar:"مسار كامل: جذب ← إقناع ← تحويل.",ru:"Полный путь: привлечь → убедить → конвертировать."}, stack:["Strategy","Conversion","Growth"]},
];

export function ImmersiveJourney() {
  const { lang } = useLang();
  const [active, setActive] = useState("start");
  const option = OPTIONS.find(x => x.id === active) ?? OPTIONS[0];
  const Icon = option.icon;
  const label = option.label[lang as keyof typeof option.label] ?? option.label.fr;
  const text = option.text[lang as keyof typeof option.text] ?? option.text.fr;

  return (
    <section id="journey" className="relative overflow-hidden border-y border-border/60 bg-background py-20 sm:py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,hsl(var(--primary)/.12),transparent_28%),radial-gradient(circle_at_5%_90%,hsl(var(--primary)/.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.02}>
          <div className="max-w-4xl">
            <span className="label-mono text-[9px] tracking-[.3em] text-primary">XRAGENCY · START HERE</span>
            <h2 className="display-serif mt-5 text-[clamp(3rem,7vw,6.8rem)] leading-[.84] tracking-[-.05em]">
              {lang === "fr" ? "Dites-nous où vous en êtes." : lang === "vi" ? "Bạn đang ở đâu?" : lang === "ar" ? "أين أنت اليوم؟" : lang === "ru" ? "Где вы сейчас?" : "Tell us where you are."}
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {lang === "fr" ? "Pas besoin de connaître le marketing. Choisissez simplement votre situation : XRAGENCY construit ensuite le parcours le plus logique." : lang === "vi" ? "Bạn không cần biết marketing. Chỉ cần chọn tình huống của bạn." : lang === "ar" ? "لا تحتاج إلى معرفة التسويق. اختر وضعك وسنبني المسار المناسب." : lang === "ru" ? "Не нужно разбираться в маркетинге. Выберите ситуацию — мы покажем логичный путь." : "You don't need to know marketing. Choose your situation and we'll show the logical path."}
            </p>
          </div>
        </Parallax>
        <div className="mt-10 grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {OPTIONS.map((item,index) => {
              const I = item.icon;
              const selected = active === item.id;
              return (
                <Reveal key={item.id} delay={index * 60}>
                  <button type="button" onClick={() => setActive(item.id)} className={"group flex w-full items-start gap-4 rounded-[1.5rem] border p-5 text-left transition duration-300 " + (selected ? "border-primary/45 bg-primary/[.08] shadow-[0_25px_70px_-45px_hsl(var(--primary)/.45)]" : "border-border/70 bg-card/55 hover:-translate-y-0.5 hover:border-primary/25")}>
                    <span className={"grid h-11 w-11 shrink-0 place-items-center rounded-xl border " + (selected ? "border-primary/35 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground")}><I className="h-4 w-4"/></span>
                    <span className="min-w-0 flex-1"><span className="label-mono text-[8px] tracking-[.18em] text-muted-foreground">0{index + 1}</span><span className="mt-1 block text-sm font-semibold">{item.label[lang as keyof typeof item.label] ?? item.label.fr}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.text[lang as keyof typeof item.text] ?? item.text.fr}</span></span>
                    {selected && <Check className="mt-1 h-4 w-4 shrink-0 text-primary"/>}
                  </button>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[#080a0d] p-6 text-white shadow-[0_35px_100px_-60px_rgba(0,0,0,.9)] sm:p-9 lg:min-h-[500px]">
              <div aria-hidden className="absolute right-[-10%] top-[-20%] h-72 w-72 rounded-full bg-primary/15 blur-3xl"/>
              <div className="relative">
                <div className="flex items-center justify-between"><span className="label-mono text-[8px] tracking-[.24em] text-white/38">XR PATH · {active.toUpperCase()}</span><Sparkles className="h-4 w-4 text-primary"/></div>
                <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary"><Icon className="h-7 w-7"/></div>
                <h3 className="display-serif mt-6 text-4xl leading-[.9] sm:text-6xl">{label}</h3>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/55">{text}</p>
                <div className="mt-8 flex flex-wrap items-center gap-2">{option.stack.map((x,i)=><span key={x} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.05] px-3 py-2 label-mono text-[8px] tracking-[.14em] text-white/70"><span className="text-primary">0{i+1}</span>{x}</span>)}</div>
                <div className="mt-10 flex flex-wrap gap-3"><Link to="/#quote" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Construire ce parcours <ArrowRight className="h-4 w-4"/></Link><a href="#homepage-services" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 label-mono text-[9px] tracking-[.12em] text-white/65">Voir les expertises</a></div>
              </div>
              <div className="pointer-events-none absolute bottom-7 right-7 hidden lg:block"><Bot className="h-28 w-28 text-white/[.035]"/></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
