import { ArrowRight, FileImage, Search, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const COPY = {
  fr: { start:"Commencer", entry:"Choisissez votre entrée.", analysis:"Lancer mon analyse", intelligence:"XR Intelligence · Julie", strategy:"Votre stratégie, en quelques étapes.", mockup:"Maquette gratuite", value:"Valeur 200 € · offerte", direction:"Une première direction créative.", audit:"Audit digital gratuit", gift:"Offert · sans engagement", visibility:"Voyez ce qui freine votre présence.", mockupMessage:"Bonjour XR Agency, je souhaite demander ma maquette gratuite (valeur 200 €).", auditMessage:"Bonjour XR Agency, je souhaite demander mon audit digital gratuit personnalisé." },
  en: { start:"Get started", entry:"Choose where to begin.", analysis:"Start my analysis", intelligence:"XR Intelligence · Julie", strategy:"Your strategy, in a few steps.", mockup:"Free mockup", value:"Worth €200 · free", direction:"A first creative direction.", audit:"Free digital audit", gift:"Complimentary · no obligation", visibility:"Find out what's holding your presence back.", mockupMessage:"Hello XR Agency, I'd like to request my free mockup (worth €200).", auditMessage:"Hello XR Agency, I'd like to request my personalised free digital audit." },
  vi: { start:"Bắt đầu", entry:"Chọn cách bắt đầu.", analysis:"Bắt đầu phân tích", intelligence:"XR Intelligence · Julie", strategy:"Chiến lược của bạn qua vài bước.", mockup:"Bản thiết kế miễn phí", value:"Trị giá 200 € · miễn phí", direction:"Định hướng sáng tạo ban đầu.", audit:"Kiểm tra kỹ thuật số miễn phí", gift:"Miễn phí · không ràng buộc", visibility:"Tìm hiểu điều đang hạn chế sự hiện diện trực tuyến.", mockupMessage:"Xin chào XR Agency, tôi muốn nhận bản thiết kế miễn phí (trị giá 200 €).", auditMessage:"Xin chào XR Agency, tôi muốn nhận bản kiểm tra kỹ thuật số miễn phí được cá nhân hóa." },
  ar: { start:"ابدأ الآن", entry:"اختر نقطة البداية.", analysis:"ابدأ التحليل", intelligence:"XR Intelligence · Julie", strategy:"استراتيجيتك في خطوات قليلة.", mockup:"نموذج تصميم مجاني", value:"بقيمة 200 يورو · مجاناً", direction:"تصور إبداعي أولي.", audit:"تدقيق رقمي مجاني", gift:"مجاني · دون التزام", visibility:"اكتشف ما يحدّ من حضورك الرقمي.", mockupMessage:"مرحباً XR Agency، أود طلب نموذج التصميم المجاني (بقيمة 200 يورو).", auditMessage:"مرحباً XR Agency، أود طلب التدقيق الرقمي المجاني والمخصص." },
  ru: { start:"Начать", entry:"Выберите, с чего начать.", analysis:"Запустить анализ", intelligence:"XR Intelligence · Julie", strategy:"Ваша стратегия — всего за несколько шагов.", mockup:"Бесплатный макет", value:"Стоимость 200 € · бесплатно", direction:"Первое творческое направление.", audit:"Бесплатный цифровой аудит", gift:"Бесплатно · без обязательств", visibility:"Узнайте, что мешает вашему цифровому присутствию.", mockupMessage:"Здравствуйте, XR Agency! Хочу заказать бесплатный макет (стоимостью 200 €).", auditMessage:"Здравствуйте, XR Agency! Хочу заказать персональный бесплатный цифровой аудит." },
} as const;

export function ConversionHub() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const actions = [
    { id:"analysis", label:c.analysis, kicker:c.intelligence, text:c.strategy, icon:Search, href:"/#quote", primary:true },
    { id:"mockup", label:c.mockup, kicker:c.value, text:c.direction, icon:FileImage, href:`${CONTACT.whatsapp}?text=${encodeURIComponent(c.mockupMessage)}`, primary:false },
    { id:"audit", label:c.audit, kicker:c.gift, text:c.visibility, icon:Sparkles, href:`${CONTACT.whatsapp}?text=${encodeURIComponent(c.auditMessage)}`, primary:false },
  ];
  return <section id="conversion" className="relative scroll-mt-20 border-b border-border/60 bg-background py-5 sm:py-7">
    <div className="mx-auto max-w-[1380px] px-5 md:px-8"><div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      <div className="hidden shrink-0 items-center gap-3 px-1 lg:flex lg:w-[210px]"><span className="grid h-8 w-8 place-items-center rounded-full border border-primary/25 bg-primary/[0.06] text-primary"><Sparkles className="h-3.5 w-3.5" /></span><div><div className="label-mono text-[8px] uppercase tracking-[.2em] text-primary">{c.start}</div><div className="mt-1 text-xs text-muted-foreground">{c.entry}</div></div></div>
      <div className="grid flex-1 gap-2 sm:grid-cols-3">{actions.map(({id,label,kicker,text,icon:Icon,href,primary})=><a key={id} href={href} target={id==="analysis"?undefined:"_blank"} rel={id==="analysis"?undefined:"noreferrer"} className={`group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-[1.35rem] border px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[126px] sm:px-5 ${primary?"border-primary/35 bg-primary/[.055] hover:border-primary/60":"border-border bg-card/60 hover:border-primary/30"}`}>
        {primary&&<span aria-hidden className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/15 blur-3xl transition group-hover:scale-125"/>}
        <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border ${primary?"border-primary/25 bg-primary/10 text-primary":"border-border bg-background text-muted-foreground group-hover:text-primary"}`}><Icon className="h-4 w-4"/></span>
        <span className="relative min-w-0 flex-1"><span className={`label-mono block text-[7px] uppercase tracking-[.17em] ${primary?"text-primary":"text-muted-foreground"}`}>{kicker}</span><span className="mt-1 block text-sm font-semibold tracking-[-.02em] sm:text-[15px]">{label}</span><span className="mt-1 block truncate text-[10px] text-muted-foreground">{text}</span></span><ArrowRight className="relative h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"/>
      </a>)}</div>
    </div></div>
  </section>;
}
