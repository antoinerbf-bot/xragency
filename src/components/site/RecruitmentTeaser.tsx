import { ArrowRight, Globe2, Sparkles, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

const COPY = {
  fr:{eyebrow:"XR / AFFILIATION & RECRUTEMENT",title:"10 % à 20 % de commission. Recrutement mondial.",text:"Recommandez nos services et gagnez 10 % (jusqu'à 20 % sur les grands comptes) du chiffre d'affaires généré, en réduction ou en paiement direct. Nous recrutons également des commerciaux indépendants multilingues dans le monde entier.",cta:"Découvrir le programme & postuler",remote:"À distance",international:"International",creative:"Création",design:"Design · contenu",growth:"Développement",sales:"Vente · stratégie"},
  en:{eyebrow:"XR / AFFILIATES & CAREERS",title:"10% to 20% commission. Global recruitment.",text:"Refer our services and earn 10% commission (up to 20% for major accounts), as a discount or direct payment. We also recruit multilingual independent sales partners worldwide.",cta:"Explore the program & apply",remote:"Remote",international:"International",creative:"Creative",design:"Design · content",growth:"Growth",sales:"Sales · strategy"},
  vi:{eyebrow:"XR / ĐỐI TÁC & TUYỂN DỤNG",title:"Hoa hồng 10–20%. Tuyển dụng toàn cầu.",text:"Giới thiệu dịch vụ và nhận hoa hồng 10% (lên đến 20% với khách hàng lớn), dưới dạng giảm giá hoặc thanh toán trực tiếp. Chúng tôi cũng tuyển cộng tác viên kinh doanh đa ngôn ngữ trên toàn thế giới.",cta:"Tìm hiểu chương trình & ứng tuyển",remote:"Từ xa",international:"Quốc tế",creative:"Sáng tạo",design:"Thiết kế · nội dung",growth:"Phát triển",sales:"Bán hàng · chiến lược"},
  ar:{eyebrow:"XR / الشراكات والتوظيف",title:"عمولة من 10% إلى 20%. توظيف عالمي.",text:"رشّح خدماتنا واحصل على عمولة 10% (تصل إلى 20% للحسابات الكبرى)، كخصم أو دفعة مباشرة. كما نستقطب شركاء مبيعات مستقلين متعددي اللغات حول العالم.",cta:"اكتشف البرنامج وقدّم طلبك",remote:"عن بُعد",international:"دولي",creative:"إبداع",design:"تصميم · محتوى",growth:"نمو",sales:"مبيعات · استراتيجية"},
  ru:{eyebrow:"XR / ПАРТНЁРСТВО И ВАКАНСИИ",title:"Комиссия 10–20%. Набор по всему миру.",text:"Рекомендуйте наши услуги и получайте комиссию 10% (до 20% для крупных клиентов) в виде скидки или прямой выплаты. Мы также ищем независимых многоязычных партнёров по продажам по всему миру.",cta:"Узнать о программе и подать заявку",remote:"Удалённо",international:"Международно",creative:"Креатив",design:"Дизайн · контент",growth:"Развитие",sales:"Продажи · стратегия"},
} as const;

export function RecruitmentTeaser() {
  const {lang}=useLang();
  const c=COPY[lang]??COPY.fr;
  return <section className="relative overflow-hidden border-y border-border/70 bg-foreground text-background">
    <div className="absolute inset-0 opacity-40" style={{background:"radial-gradient(circle at 78% 20%, rgba(255,255,255,.14), transparent 28%), radial-gradient(circle at 12% 80%, rgba(255,255,255,.08), transparent 30%)"}}/>
    <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_.85fr] lg:px-12 lg:items-end" dir={lang==="ar"?"rtl":"ltr"}>
      <div><span className="label-mono text-[8px] tracking-[.32em] opacity-45">{c.eyebrow}</span><h2 className="display-serif mt-5 max-w-4xl text-[clamp(3.4rem,7vw,7rem)] leading-[.8] tracking-[-.06em]">{c.title}</h2><p className="mt-7 max-w-2xl text-sm leading-6 opacity-60 sm:text-base">{c.text}</p></div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {[[Globe2,c.remote,c.international],[Sparkles,c.creative,c.design],[Users,c.growth,c.sales]].map(([Icon,a,b],i)=>{const I=Icon as typeof Globe2;return <div key={i} className="flex items-center gap-4 rounded-2xl border border-background/15 bg-background/[.06] p-4 backdrop-blur-xl"><I className="h-4 w-4 opacity-65"/><div><span className="block text-sm font-semibold">{a as string}</span><span className="label-mono text-[7px] tracking-[.16em] opacity-40">{b as string}</span></div></div>})}
      </div>
      <Link to="/recrutement" className="group inline-flex w-fit items-center gap-3 rounded-full bg-background px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground">{c.cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></Link>
    </div>
  </section>;
}
