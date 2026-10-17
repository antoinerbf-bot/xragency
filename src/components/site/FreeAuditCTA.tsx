import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const COPY = {
  fr:{kicker:"XR AGENCY · OFFERT",title:"Votre présence digitale mérite mieux.",text:"Demandez votre analyse et audit personnalisé gratuitement. Nous identifions les points qui freinent votre visibilité, votre image et votre conversion.",value:"Valeur : +200 €",free:"100 % offert",noCommitment:"Sans engagement",cta:"Recevoir mon audit gratuit",expert:"Parler à un expert",message:"Bonjour XR Agency, je souhaite recevoir mon analyse et audit digital personnalisé gratuitement (valeur +200 €). Voici mon activité :"},
  en:{kicker:"XR AGENCY · COMPLIMENTARY",title:"Your digital presence deserves better.",text:"Request a free personalised analysis and audit. We identify what is holding back your visibility, brand image and conversions.",value:"Value: €200+",free:"100% free",noCommitment:"No obligation",cta:"Get my free audit",expert:"Talk to an expert",message:"Hello XR Agency, I'd like to receive my personalised digital analysis and audit for free (worth €200+). Here is my business:"},
  vi:{kicker:"XR AGENCY · MIỄN PHÍ",title:"Sự hiện diện số của bạn xứng đáng tốt hơn.",text:"Yêu cầu phân tích và kiểm tra cá nhân hóa miễn phí. Chúng tôi xác định những điểm đang hạn chế khả năng hiển thị, hình ảnh thương hiệu và chuyển đổi của bạn.",value:"Trị giá: hơn 200 €",free:"Miễn phí 100%",noCommitment:"Không ràng buộc",cta:"Nhận kiểm tra miễn phí",expert:"Trao đổi với chuyên gia",message:"Xin chào XR Agency, tôi muốn nhận phân tích và kiểm tra kỹ thuật số cá nhân hóa miễn phí (trị giá hơn 200 €). Đây là thông tin doanh nghiệp của tôi:"},
  ar:{kicker:"XR AGENCY · مجاناً",title:"حضورك الرقمي يستحق الأفضل.",text:"اطلب تحليلاً وتدقيقاً مخصصاً مجانياً. نحدد العوامل التي تحدّ من ظهورك وصورة علامتك التجارية ومعدلات التحويل.",value:"القيمة: أكثر من 200 يورو",free:"مجاني 100%",noCommitment:"دون التزام",cta:"احصل على التدقيق المجاني",expert:"تحدث إلى خبير",message:"مرحباً XR Agency، أود الحصول مجاناً على تحليل وتدقيق رقمي مخصص (بقيمة تتجاوز 200 يورو). إليك معلومات نشاطي:"},
  ru:{kicker:"XR AGENCY · БЕСПЛАТНО",title:"Ваше цифровое присутствие заслуживает большего.",text:"Закажите бесплатный персональный анализ и аудит. Мы определим, что мешает вашей видимости, образу бренда и конверсии.",value:"Стоимость: более 200 €",free:"Полностью бесплатно",noCommitment:"Без обязательств",cta:"Получить бесплатный аудит",expert:"Поговорить с экспертом",message:"Здравствуйте, XR Agency! Хочу бесплатно получить персональный цифровой анализ и аудит (стоимостью более 200 €). Информация о моей компании:"},
} as const;

export function FreeAuditCTA() {
  const {lang}=useLang();
  const c=COPY[lang]??COPY.fr;
  const message=encodeURIComponent(c.message);
  return <section className="px-4 py-8 sm:px-8 lg:px-12 lg:py-12"><div className="mx-auto max-w-[1500px]"><div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-6 sm:p-10 lg:p-14">
    <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"/>
    <div className="relative max-w-4xl"><div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4"/><span className="label-mono text-[9px] uppercase tracking-[0.25em]">{c.kicker}</span></div>
      <h2 className="display-serif mt-4 text-4xl leading-[.95] sm:text-6xl lg:text-7xl">{c.title}</h2><p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{c.text}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 label-mono text-[9px] text-primary">{c.value}</span><span className="rounded-full border border-border bg-background/60 px-3 py-1.5 label-mono text-[9px] text-muted-foreground">{c.free}</span><span className="rounded-full border border-border bg-background/60 px-3 py-1.5 label-mono text-[9px] text-muted-foreground">{c.noCommitment}</span></div>
      <div className="mt-7 flex flex-wrap gap-3"><a href={`${CONTACT.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">{c.cta}<ArrowRight className="h-4 w-4"/></a><a href="#contact" className="inline-flex items-center rounded-full border border-border bg-background/60 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider">{c.expert}</a></div>
    </div></div></div></section>;
}
