import { ArrowUpRight, Sparkles, FileImage } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { Parallax, Reveal } from "./primitives";
import { ServiceIllustration } from "./ServiceIllustration";
import { CONTACT } from "@/lib/content";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance"];
const DISPLAY_NUM: Record<string, string> = { websites:"01", branding:"02", seo:"03", maps:"04", social:"05", maintenance:"06" };
const DISPLAY_PRICE: Record<string, number | null> = { websites:499, branding:179, seo:299, maps:990, social:299, maintenance:29 };

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = {
    fr: { expertise:"06 EXPERTISES", title:"Six expertises.", titleAccent:"Un seul système digital.", lead:"Création, identité, visibilité et suivi : chaque expertise est conçue pour fonctionner avec les autres.", discover:"Découvrir", from:"À partir de", scroll:"DIRECTION · PRODUCTION · MESURE", kicker:"XRAGENCY · SUR MESURE", cta:"Parlons de votre projet", ctaSub:"Décrivez votre besoin. Nous revenons vers vous avec une première direction.", mockup:"Demander une maquette gratuite" },
    en: { expertise:"06 DISCIPLINES", title:"Six disciplines.", titleAccent:"One digital system.", lead:"Creation, identity, visibility and care — each discipline is designed to work with the others.", discover:"Explore", from:"From", scroll:"DIRECTION · PRODUCTION · MEASURE", kicker:"XRAGENCY · BESPOKE", cta:"Let's discuss your project", ctaSub:"Tell us what you need. We'll come back with a first direction.", mockup:"Request a free mockup" },
    vi: { expertise:"06 CHUYÊN MÔN", title:"Sáu chuyên môn.", titleAccent:"Một hệ thống số.", lead:"Sáng tạo, nhận diện, hiển thị và vận hành — mỗi chuyên môn được thiết kế để kết hợp cùng nhau.", discover:"Khám phá", from:"Từ", scroll:"ĐỊNH HƯỚNG · TRIỂN KHAI · ĐO LƯỜNG", kicker:"XRAGENCY · THEO YÊU CẦU", cta:"Trao đổi về dự án", ctaSub:"Hãy mô tả nhu cầu. Chúng tôi sẽ gửi định hướng ban đầu.", mockup:"Yêu cầu mockup miễn phí" },
    ar: { expertise:"06 تخصصات", title:"ستة تخصصات.", titleAccent:"نظام رقمي واحد.", lead:"إنشاء وهوية وظهور ومتابعة — كل تخصص مصمم ليعمل مع الآخر.", discover:"اكتشف", from:"ابتداءً من", scroll:"اتجاه · تنفيذ · قياس", kicker:"XRAGENCY · مخصص", cta:"لنتحدث عن مشروعك", ctaSub:"صف احتياجك وسنعود إليك باتجاه أولي واضح.", mockup:"اطلب نموذجًا مجانيًا" },
    ru: { expertise:"06 НАПРАВЛЕНИЙ", title:"Шесть направлений.", titleAccent:"Одна цифровая система.", lead:"Создание, айдентика, видимость и поддержка — каждое направление работает вместе с остальными.", discover:"Открыть", from:"От", scroll:"НАПРАВЛЕНИЕ · ПРОДАКШН · ИЗМЕРЕНИЕ", kicker:"XRAGENCY · ИНДИВИДУАЛЬНО", cta:"Обсудить проект", ctaSub:"Опишите задачу — мы вернёмся с первым направлением.", mockup:"Запросить бесплатный макет" },
  }[lang] ?? undefined;
  const copySafe = copy ?? { expertise:"06 DISCIPLINES", title:"Six disciplines.", titleAccent:"One digital system.", lead:"Creation, identity, visibility and care.", discover:"Explore", from:"From", scroll:"DIRECTION · PRODUCTION · MEASURE", kicker:"XRAGENCY · BESPOKE", cta:"Let's discuss your project", ctaSub:"Tell us what you need.", mockup:"Request a free mockup" };
  const featured = FEATURED_IDS.map(id => SERVICES.find(service => service.id === id)).filter(Boolean) as typeof SERVICES;
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite une maquette gratuite.");

  const periodLabel = (period: string) => period === "month" ? (lang === "fr" ? " / mois" : lang === "en" ? " / month" : lang === "vi" ? " / tháng" : lang === "ar" ? " / شهر" : " / месяц") : period === "year" ? (lang === "fr" ? " / an" : lang === "en" ? " / year" : lang === "vi" ? " / năm" : lang === "ar" ? " / سنة" : " / год") : "";

  return (
    <section id="homepage-services" aria-label={copySafe.expertise} className="relative overflow-hidden bg-[#08090b] py-20 text-white sm:py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.025}>
          <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[.32em] text-primary">XRAGENCY · {copySafe.expertise}</span>
              <h2 className="display-serif mt-4 max-w-4xl text-5xl leading-[.88] sm:text-7xl lg:text-[6.4rem]">{copySafe.title}<br/><em className="text-primary">{copySafe.titleAccent}</em></h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55 lg:pb-2">{copySafe.lead}</p>
          </div>
        </Parallax>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {featured.map((service,index)=>{
            const startingPrice=DISPLAY_PRICE[service.id];
            return <Reveal key={service.id} delay={index*60}>
              <article className="group relative isolate min-h-[500px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1014] shadow-[0_30px_90px_-45px_rgba(0,0,0,.95)] sm:min-h-[550px]">
                <div className="absolute inset-0 p-3 sm:p-5"><ServiceIllustration service={service.id} title={t(service.title)}/></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"/>
                <div className="relative z-10 flex min-h-[500px] flex-col justify-between p-6 sm:min-h-[550px] sm:p-9 lg:p-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 label-mono text-[9px] tracking-[.22em] text-white/45"><span className="text-white">{DISPLAY_NUM[service.id]}</span><span className="h-px w-8 bg-white/20"/><span>XRAGENCY</span></div>
                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2 label-mono text-[8px] tracking-[.15em] text-white/50 backdrop-blur-md">{String(index+1).padStart(2,"0")} / 06</span>
                  </div>
                  <Parallax speed={-0.02}>
                    <div className="max-w-2xl">
                      <div className="mb-4 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary"/><span className="label-mono text-[8px] tracking-[.2em] text-white/55">{t(service.short)}</span></div>
                      <h3 className="display-serif text-4xl leading-[.9] text-white sm:text-6xl lg:text-[5rem]">{t(service.title)}</h3>
                      <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-[15px]">{t(service.description)}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-2.5">
                        <Link to={service.id==="maintenance"?"/services/webcare":"/services/$serviceId"} params={service.id==="maintenance"?undefined:{serviceId:service.id}} className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-black transition hover:-translate-y-0.5">{copySafe.discover}<ArrowUpRight className="h-4 w-4"/></Link>
                        {startingPrice && <span className="rounded-full border border-white/15 bg-black/25 px-4 py-3 label-mono text-[9px] tracking-[.12em] text-white/65 backdrop-blur-md">{copySafe.from} {price(startingPrice)}{periodLabel(service.fromPeriod)}</span>}
                      </div>
                    </div>
                  </Parallax>
                  <div className="flex items-center justify-between border-t border-white/15 pt-4"><div className="flex gap-1.5">{featured.map((_,dot)=><span key={dot} className={`h-1 rounded-full transition-all ${dot===index?"w-10 bg-white":"w-2 bg-white/25"}`}/>)}</div><span className="label-mono text-[8px] tracking-[.18em] text-white/35">{copySafe.scroll}</span></div>
                </div>
              </article>
            </Reveal>;
          })}
        </div>

        <Parallax speed={0.035} className="mt-16 sm:mt-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10141a] p-7 sm:p-10 lg:p-14">
            <div aria-hidden className="absolute right-[-8%] top-[-60%] h-[520px] w-[520px] rounded-full border border-primary/10 bg-primary/[.04]"/>
            <div aria-hidden className="absolute left-[-10%] bottom-[-70%] h-[480px] w-[480px] rounded-full border border-white/[.05]"/>
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl"><span className="label-mono text-[9px] tracking-[.3em] text-primary">{copySafe.kicker}</span><h3 className="display-serif mt-4 text-4xl leading-[.88] sm:text-6xl">{copySafe.cta}</h3><p className="mt-5 max-w-xl text-sm leading-6 text-white/55">{copySafe.ctaSub}</p></div>
              <div className="flex flex-wrap gap-3"><a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 label-mono text-[9px] font-semibold text-primary hover:bg-primary/15"><FileImage className="h-4 w-4"/>{copySafe.mockup}</a><Link to="/#quote" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold text-black hover:-translate-y-0.5">{copySafe.cta}<ArrowUpRight className="h-4 w-4"/></Link></div>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
