import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { eyebrow: string; title: string; accent: string; body: string; note: string; countries: string[]; cta: string; storyCta: string }> = {
  fr: { eyebrow: "COLLABORATION INTERNATIONALE", title: "Une équipe distribuée.", accent: "Une même exigence.", body: "Des talents qui collaborent à distance pour concevoir, produire et accompagner des projets digitaux adaptés à chaque marché.", note: "Une organisation internationale — pas une promesse de bureaux dans chaque ville.", countries: ["France", "Vietnam", "Inde", "Pakistan", "Madagascar", "Maroc"], cta: "Fonctionnement international", storyCta: "Notre histoire" },
  en: { eyebrow: "INTERNATIONAL COLLABORATION", title: "One distributed team.", accent: "One shared standard.", body: "People working across borders to design, build and support digital projects adapted to each market.", note: "An international team structure — not a claim of offices in every city.", countries: ["France", "Vietnam", "India", "Pakistan", "Madagascar", "Morocco"], cta: "International delivery", storyCta: "Our story" },
  vi: { eyebrow: "HỢP TÁC QUỐC TẾ", title: "Một đội ngũ phân tán.", accent: "Một tiêu chuẩn chung.", body: "Các thành viên phối hợp xuyên biên giới để thiết kế, triển khai và đồng hành cùng những dự án số phù hợp với từng thị trường.", note: "Đội ngũ quốc tế, không có nghĩa là tuyên bố có văn phòng tại mọi thành phố.", countries: ["Pháp", "Việt Nam", "Ấn Độ", "Pakistan", "Madagascar", "Ma-rốc"], cta: "Hợp tác quốc tế", storyCta: "Câu chuyện agency" },
  ar: { eyebrow: "تعاون دولي", title: "فريق يعمل عبر الحدود.", accent: "ومعيار واحد للجودة.", body: "يتعاون أعضاء الفريق عن بُعد لتصميم المشاريع الرقمية وتنفيذها ومتابعتها بما يناسب كل سوق.", note: "فريق دولي موزع، وليس ادعاءً بوجود مكاتب في كل مدينة.", countries: ["فرنسا", "فيتنام", "الهند", "باكستان", "مدغشقر", "المغرب"], cta: "التعاون الدولي", storyCta: "قصتنا" },
  ru: { eyebrow: "МЕЖДУНАРОДНОЕ СОТРУДНИЧЕСТВО", title: "Распределённая команда.", accent: "Единый стандарт.", body: "Специалисты из разных стран вместе проектируют, создают и сопровождают цифровые решения с учётом особенностей каждого рынка.", note: "Международная команда — не заявление о наличии офисов в каждом городе.", countries: ["Франция", "Вьетнам", "Индия", "Пакистан", "Мадагаскар", "Марокко"], cta: "Международная работа", storyCta: "Об агентстве" },
};

export function InternationalSection() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  return (
    <section id="international" dir={lang === "ar" ? "rtl" : "ltr"} className="overflow-hidden bg-[#24231F] py-20 text-[#F7F4EE] sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:px-12">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[#D8BC94]"><Globe2 className="h-4 w-4" /><span className="text-[9px] font-semibold uppercase tracking-[.22em]">{c.eyebrow}</span></div>
          <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[.95] tracking-[-.055em]">{c.title}<br/><span className="font-serif font-normal italic text-[#D8BC94]">{c.accent}</span></h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/72 sm:text-base">{c.body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-6">
            <Link to="/international" className="inline-flex min-h-11 items-center gap-2 border-b border-[#D8BC94] pb-1 text-[10px] font-semibold uppercase tracking-[.15em] text-white transition-colors hover:text-[#D8BC94]">{c.cta}<ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/notre-histoire" className="inline-flex min-h-11 items-center gap-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[.15em] text-white/70 transition-colors hover:text-[#D8BC94]">{c.storyCta}<ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 border-l border-t border-white/20 sm:grid-cols-3">
            {c.countries.map((country, index) => <div key={country} className="flex min-h-[94px] items-center gap-3 border-b border-r border-white/20 px-4 py-5 sm:min-h-[112px] sm:px-5"><span className="font-serif text-sm italic text-[#D8BC94]">0{index + 1}</span><span className="text-sm font-medium tracking-wide">{country}</span></div>)}
          </div>
          <p className="mt-4 text-[10px] leading-5 text-white/45">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
