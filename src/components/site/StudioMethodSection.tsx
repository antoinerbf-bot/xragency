import { ArrowUpRight, Compass, Layers3, PenTool, RefreshCw } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const COPY: Record<Lang, { eyebrow: string; title: string; accent: string; intro: string; steps: { title: string; body: string }[]; cta: string }> = {
  fr: { eyebrow: "NOTRE MÉTHODE", title: "De la réflexion", accent: "à la mise en œuvre.", intro: "Un cadre de travail lisible, des décisions partagées et une exécution structurée à chaque étape.", steps: [
    { title: "Comprendre", body: "Nous clarifions votre activité, vos clients, vos priorités et les contraintes du projet." },
    { title: "Définir la stratégie", body: "Nous sélectionnons les leviers adaptés et cadrons le périmètre, les livrables et les objectifs." },
    { title: "Concevoir & réaliser", body: "Nous construisons une solution cohérente, testée sur les usages réels et les supports ciblés." },
    { title: "Suivre & améliorer", body: "Nous organisons le suivi, les ajustements et les prochaines actions selon les besoins convenus." },
  ], cta: "Parler de votre projet" },
  en: { eyebrow: "OUR APPROACH", title: "From clear thinking", accent: "to considered execution.", intro: "A transparent process, shared decisions and structured delivery at every stage.", steps: [
    { title: "Understand", body: "We clarify your business, customers, priorities and project constraints." },
    { title: "Set the strategy", body: "We select the right levers and define scope, deliverables and objectives." },
    { title: "Design & deliver", body: "We build a coherent solution, tested against real use cases and target devices." },
    { title: "Review & improve", body: "We organise follow-up, refinements and next steps around agreed needs." },
  ], cta: "Discuss your project" },
  vi: { eyebrow: "QUY TRÌNH", title: "Từ tư duy rõ ràng", accent: "đến triển khai chỉn chu.", intro: "Quy trình minh bạch, quyết định thống nhất và triển khai có cấu trúc ở từng giai đoạn.", steps: [
    { title: "Thấu hiểu", body: "Làm rõ hoạt động, khách hàng, ưu tiên và các giới hạn của dự án." },
    { title: "Xây dựng chiến lược", body: "Chọn giải pháp phù hợp và xác định phạm vi, bàn giao và mục tiêu." },
    { title: "Thiết kế & triển khai", body: "Xây dựng giải pháp đồng bộ, kiểm thử theo nhu cầu thực tế và thiết bị mục tiêu." },
    { title: "Theo dõi & cải thiện", body: "Tổ chức theo dõi, điều chỉnh và các bước tiếp theo theo nhu cầu đã thống nhất." },
  ], cta: "Trao đổi dự án" },
  ar: { eyebrow: "منهجيتنا", title: "من التفكير الواضح", accent: "إلى التنفيذ المتقن.", intro: "عملية شفافة وقرارات مشتركة وتنفيذ منظم في كل مرحلة.", steps: [
    { title: "الفهم", body: "نحدد نشاطك وعملاءك وأولوياتك وقيود المشروع." },
    { title: "تحديد الاستراتيجية", body: "نختار الأدوات المناسبة ونحدد النطاق والمخرجات والأهداف." },
    { title: "التصميم والتنفيذ", body: "نبني حلاً متكاملاً ونختبره وفق الاستخدام الفعلي والأجهزة المستهدفة." },
    { title: "المتابعة والتحسين", body: "ننظم المتابعة والتعديلات والخطوات التالية وفق الاحتياجات المتفق عليها." },
  ], cta: "ناقش مشروعك" },
  ru: { eyebrow: "НАШ ПОДХОД", title: "От ясной стратегии", accent: "к продуманной реализации.", intro: "Прозрачный процесс, совместные решения и последовательная работа на каждом этапе.", steps: [
    { title: "Понять задачу", body: "Разбираемся в бизнесе, клиентах, приоритетах и ограничениях проекта." },
    { title: "Определить стратегию", body: "Выбираем подходящие инструменты, объём работ, результаты и цели." },
    { title: "Спроектировать и создать", body: "Создаём целостное решение и проверяем его на реальных сценариях и устройствах." },
    { title: "Сопровождать и улучшать", body: "Организуем поддержку, доработки и следующие шаги в рамках согласованных задач." },
  ], cta: "Обсудить проект" },
};

const ICONS = [Compass, Layers3, PenTool, RefreshCw];

export function StudioMethodSection() {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.fr;
  return (
    <section id="methode" className="bg-[#EEE9E0] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-[#28251F]/15 pb-9 lg:grid-cols-[1.1fr_.9fr] lg:items-end sm:pb-12">
          <div>
            <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-[#B99A73]" /><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B7051]">{copy.eyebrow}</span></div>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4.8vw,4.5rem)] font-medium leading-[.98] tracking-[-.055em] text-[#1B1A17]">{copy.title} <span className="font-serif italic font-normal text-[#A88A65]">{copy.accent}</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#625E56] sm:text-base">{copy.intro}</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#28251F]/12 bg-[#28251F]/12 sm:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => {
            const Icon = ICONS[index];
            return <article key={step.title} className="group min-h-[235px] bg-[#F7F4EE] p-6 transition-colors hover:bg-white sm:p-7">
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] tracking-[.18em] text-[#9A805E]">0{index + 1}</span><Icon className="h-5 w-5 text-[#9A805E] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
              <h3 className="mt-12 text-xl font-medium tracking-[-.03em] text-[#211F1A]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#625E56]">{step.body}</p>
            </article>;
          })}
        </div>
        <a href="#contact" className="group mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#292720] transition hover:text-[#9E805B]">{copy.cta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
      </div>
    </section>
  );
}
