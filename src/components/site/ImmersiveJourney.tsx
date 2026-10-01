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
    <section id="journey" className="relative overflow-hidden border-b border-white/10 bg-[#080a0e] py-20 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0">
        <img src={XR_JOURNEY_PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.08] grayscale" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#080a0e_5%,rgba(8,10,14,.78)_42%,#080a0e_100%)]" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full border border-white/[.06] animate-slow-spin" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.018}>
          <div className="max-w-4xl">
            <span className="label-mono text-[9px] tracking-[.3em] text-white/42">XRAGENCY · START HERE</span>
            <h2 className="display-serif mt-5 max-w-4xl text-[clamp(3rem,5.4vw,5.7rem)] leading-[.84] tracking-[-.055em]">
              {lang === "fr" ? "Dites-nous où vous en êtes." : lang === "vi" ? "Bạn đang ở đâu?" : lang === "ar" ? "أين أنت اليوم؟" : lang === "ru" ? "Где вы сейчас?" : "Tell us where you are."}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
              {lang === "fr" ? "Pas besoin de connaître le marketing. Choisissez simplement votre situation : nous vous montrons le parcours le plus logique." : lang === "vi" ? "Bạn không cần biết marketing. Chỉ cần chọn tình huống của bạn." : lang === "ar" ? "لا تحتاج إلى معرفة التسويق. اختر وضعك وسنعرض المسار الأنسب." : lang === "ru" ? "Не нужно разбираться в маркетинге. Выберите ситуацию — мы покажем логичный путь." : "You don't need to know marketing. Choose your situation and we'll show the logical path."}
            </p>
          </div>
        </Parallax>

        <div className="mt-10 grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
          <Reveal>
            <div className="relative rounded-[2rem] border border-white/10 bg-black/25 p-3 backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between px-3 py-2">
                <span className="label-mono text-[7px] tracking-[.22em] text-white/30">01 — SITUATION</span>
                <span className="label-mono text-[7px] text-white/25">CHOISISSEZ UN POINT DE DÉPART</span>
              </div>
              <div className="grid gap-2">
                {OPTIONS.map((item,index) => {
                  const I = item.icon;
                  const selected = active === item.id;
                  return (
                    <button key={item.id} type="button" onClick={() => setActive(item.id)} className={"group relative flex w-full items-start gap-4 overflow-hidden rounded-[1.4rem] border p-4 text-left transition duration-400 " + (selected ? "border-white/28 bg-white/[.09] translate-x-1" : "border-white/8 bg-white/[.018] hover:-translate-y-0.5 hover:border-white/18")}>
                      <span className={"grid h-11 w-11 shrink-0 place-items-center rounded-[1rem] border " + (selected ? "border-white/24 bg-white text-black" : "border-white/10 bg-black/25 text-white/50")}><I className="h-4 w-4"/></span>
                      <span className="min-w-0 flex-1"><span className="label-mono text-[7px] tracking-[.18em] text-white/28">0{index + 1}</span><span className="mt-1 block text-sm font-semibold text-white/92">{item.label[lang as keyof typeof item.label] ?? item.label.fr}</span><span className="mt-1 block text-[10px] leading-4 text-white/42">{item.text[lang as keyof typeof item.text] ?? item.text.fr}</span></span>
                      {selected ? <Check className="mt-1 h-4 w-4 shrink-0 text-white/78"/> : <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/20 transition group-hover:translate-x-1 group-hover:text-white/55"/>}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="relative min-h-[470px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0b0e13] shadow-[0_60px_150px_-70px_rgba(0,0,0,.95)] sm:min-h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(126,151,255,.12),transparent_24%),linear-gradient(145deg,#0c1016,#07090d)]" />
              <div className="absolute right-[-6%] top-[-8%] h-48 w-48 rounded-full border border-white/8 animate-slow-spin" />
              <Parallax speed={0.028} direction="both">
                <div className="absolute right-[7%] top-[7%] h-[86%] w-[60%] overflow-hidden rounded-[2rem] border border-white/12">
                  <img src={XR_JOURNEY_PHOTO} alt="" className="h-full w-full object-cover grayscale-[.35] brightness-[.58]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/45" />
                </div>
              </Parallax>

              <div className="relative z-10 p-7 sm:p-10">
                <div className="flex items-center justify-between"><span className="label-mono text-[8px] tracking-[.24em] text-white/35">02 — PATH / {active.toUpperCase()}</span><Sparkles className="h-4 w-4 text-white/55"/></div>
                <div className="mt-11 max-w-[62%] sm:mt-16">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/[.06] text-white/80 backdrop-blur-xl"><Icon className="h-6 w-6"/></div>
                  <h3 className="display-serif mt-6 text-4xl leading-[.88] sm:text-6xl">{label}</h3>
                  <p className="mt-5 text-sm leading-6 text-white/45">{text}</p>
                </div>

                <div className="absolute bottom-8 left-7 right-7 z-10 grid gap-4 sm:left-10 sm:right-10 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {option.stack.map((x,i)=><span key={x} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/55 px-3 py-2 label-mono text-[7px] tracking-[.14em] text-white/68"><span className="text-white/35">0{i+1}</span>{x}</span>)}
                    </div>
                    <div className="mt-4 flex items-center gap-2"><span className="h-px w-10 bg-white/30"/><span className="label-mono text-[7px] text-white/30">SITUATION → PRIORITÉ → SYSTÈME</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/#quote" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-black">Construire ce parcours <ArrowRight className="h-4 w-4"/></Link>
                    <a href="#homepage-services" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-5 py-3.5 label-mono text-[9px] tracking-[.12em] text-white/65">Voir les expertises</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
