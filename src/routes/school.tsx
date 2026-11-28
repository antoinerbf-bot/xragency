import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Compass, Layers3 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/school")({
  head: () => ({
    meta: [
      { title: "XR Agency School — Formation & transmission" },
      { name: "description", content: "Échangez avec XR Agency au sujet de vos besoins de formation et de montée en compétences dans les métiers du digital." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: XrSchoolPage,
});

const COPY: Record<Lang, { kicker: string; title: string; accent: string; intro: string; note: string; cards: [string, string][]; cta: string; details: string }> = {
  fr: { kicker: "XR AGENCY · TRANSMISSION & COMPÉTENCES", title: "Faire grandir les compétences", accent: "au rythme des projets.", intro: "XR Agency School est l’espace de contact dédié aux demandes de formation et de montée en compétences autour des métiers du digital. Le contenu, le format, la durée et les modalités sont définis selon le besoin réel.", note: "Les programmes, disponibilités et tarifs ne sont pas publiés tant qu’ils ne sont pas confirmés. Contactez-nous pour présenter votre objectif.", cards: [["Stratégie digitale", "Comprendre les leviers de présence, de visibilité et de développement d’une activité."],["Outils & production", "Échanger autour des sites web, du contenu, des outils numériques et des automatisations."],["Organisation commerciale", "Structurer les méthodes de qualification, de suivi et de relation client adaptées à votre activité."]], cta: "Parler de mon besoin", details: "Chaque demande est étudiée individuellement. Aucun résultat, revenu, volume de prospects ou délai n’est garanti." },
  en: { kicker: "XR AGENCY · KNOWLEDGE & SKILLS", title: "Develop skills", accent: "through real projects.", intro: "XR Agency School is the contact point for training and skills-development enquiries across digital disciplines. Content, format, duration and terms are defined around the actual need.", note: "Programmes, availability and prices are not published until confirmed. Contact us to explain your goals.", cards: [["Digital strategy", "Understand the levers behind digital presence, visibility and business development."],["Tools & production", "Discuss websites, content, digital tools and workflow automation."],["Sales organisation", "Structure qualification, follow-up and client relationship practices for your business."]], cta: "Discuss my needs", details: "Each enquiry is reviewed individually. No result, income, lead volume or timeline is guaranteed." },
  vi: { kicker: "XR AGENCY · CHIA SẺ KIẾN THỨC & KỸ NĂNG", title: "Phát triển năng lực", accent: "qua dự án thực tế.", intro: "XR Agency School là đầu mối tiếp nhận nhu cầu đào tạo và nâng cao kỹ năng trong các lĩnh vực kỹ thuật số. Nội dung, hình thức, thời lượng và điều kiện được xác định theo nhu cầu thực tế.", note: "Chương trình, lịch và học phí chỉ được công bố sau khi xác nhận. Hãy liên hệ và chia sẻ mục tiêu của bạn.", cards: [["Chiến lược số", "Hiểu các yếu tố về hiện diện số, khả năng hiển thị và phát triển kinh doanh."],["Công cụ & triển khai", "Trao đổi về website, nội dung, công cụ số và tự động hóa quy trình."],["Tổ chức kinh doanh", "Xây dựng phương pháp đánh giá nhu cầu, theo dõi và chăm sóc khách hàng phù hợp." ]], cta: "Trao đổi nhu cầu", details: "Mỗi yêu cầu được xem xét riêng. Không cam kết kết quả, thu nhập, số lượng khách hàng tiềm năng hay thời hạn." },
  ar: { kicker: "XR AGENCY · المعرفة والمهارات", title: "تطوير المهارات", accent: "من خلال المشاريع.", intro: "XR Agency School هي نقطة التواصل لطلبات التدريب وتطوير المهارات في مجالات العمل الرقمي. يتم تحديد المحتوى والشكل والمدة والشروط وفق الاحتياج الفعلي.", note: "لا تُنشر البرامج أو المواعيد أو الأسعار قبل تأكيدها. تواصل معنا لشرح أهدافك.", cards: [["الاستراتيجية الرقمية", "فهم عناصر الحضور الرقمي والظهور وتطوير الأعمال."],["الأدوات والإنتاج", "مناقشة المواقع والمحتوى والأدوات الرقمية وأتمتة سير العمل."],["تنظيم المبيعات", "تنظيم التأهيل والمتابعة وعلاقات العملاء بما يناسب نشاطك."]], cta: "ناقش احتياجاتي", details: "تتم مراجعة كل طلب بشكل فردي. لا يوجد ضمان للنتائج أو الدخل أو عدد العملاء المحتملين أو المدة." },
  ru: { kicker: "XR AGENCY · ЗНАНИЯ И НАВЫКИ", title: "Развивайте компетенции", accent: "на реальных проектах.", intro: "XR Agency School принимает запросы на обучение и развитие навыков в цифровых направлениях. Содержание, формат, продолжительность и условия определяются исходя из реальной задачи.", note: "Программы, доступность и цены не публикуются до подтверждения. Свяжитесь с нами и расскажите о цели.", cards: [["Цифровая стратегия", "Понимание инструментов цифрового присутствия, видимости и развития бизнеса."],["Инструменты и производство", "Обсуждение сайтов, контента, цифровых инструментов и автоматизации процессов."],["Организация продаж", "Структурирование квалификации, сопровождения и отношений с клиентами."]], cta: "Обсудить задачу", details: "Каждый запрос рассматривается индивидуально. Результаты, доход, количество лидов и сроки не гарантируются." },
};

function XrSchoolPage() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#24231F]">
      <Nav />
      <main className="pt-28">
        <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-12 lg:py-32">
          <div>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-9 bg-[#A88A65]"/><span className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#806747]">{c.kicker}</span></div>
            <h1 className="max-w-4xl text-[clamp(3rem,6.5vw,6.7rem)] font-medium leading-[.93] tracking-[-.06em]">{c.title}<br/><span className="font-serif italic font-normal text-[#A88A65]">{c.accent}</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#625E56]">{c.intro}</p>
            <a href="#contact" className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#24231F] px-7 py-3 text-xs font-semibold uppercase tracking-[.13em] text-white transition-colors hover:bg-[#806747]">{c.cta}<ArrowUpRight className="h-4 w-4"/></a>
          </div>
          <div className="border-y border-[#211F1A]/15 py-7">
            <p className="text-sm leading-7 text-[#5D584F]">{c.note}</p>
            <div className="mt-8 space-y-5">
              {c.cards.map(([title,desc],i)=>{const Icon=[Compass,Layers3,BookOpen][i];return <article key={title} className="grid grid-cols-[32px_1fr] gap-4 border-t border-[#211F1A]/12 pt-5"><Icon className="mt-1 h-5 w-5 text-[#A88A65]"/><div><h2 className="text-sm font-semibold">{title}</h2><p className="mt-1 text-xs leading-6 text-[#777166]">{desc}</p></div></article>})}
            </div>
            <p className="mt-7 text-[10px] leading-5 text-[#8A8378]">{c.details}</p>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
