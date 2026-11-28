import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Handshake, Send } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/affiliation")({
  head: () => ({
    meta: [
      { title: "Partenariat & affiliation — XR Agency" },
      { name: "description", content: "Présentez XR Agency à votre réseau professionnel. Les éventuelles commissions, services éligibles et conditions sont définis par convention écrite." },
    ],
  }),
  component: AffiliationPortalPage,
});

const COPY: Record<Lang, Record<string, string>> = {
  fr: { kicker: "PROGRAMME PARTENAIRES", title: "Développons des relations", accent: "professionnelles durables.", intro: "Vous accompagnez des entreprises et identifiez un besoin qui correspond à nos expertises ? Présentez-nous le projet. Chaque mise en relation est étudiée et les conditions éventuelles sont confirmées par écrit avant toute collaboration.", recruiter: "Vous souhaitez rejoindre l’équipe commerciale ? Voir le recrutement", steps: "COMMENT FONCTIONNE UNE MISE EN RELATION", step1: "Présentez le besoin", step1d: "Partagez le contexte de l’entreprise et le besoin identifié.", step2: "Étude du projet", step2d: "XR Agency vérifie l’adéquation entre la demande et les prestations proposées.", step3: "Conditions écrites", step3d: "Toute éventuelle rémunération, son déclencheur et sa durée sont définis dans une convention signée avant engagement.", formKicker: "PREMIER CONTACT", formTitle: "Présenter une demande de partenariat", success: "Votre demande a bien été transmise. L’équipe XR Agency l’examinera et vous communiquera les éventuelles conditions avant tout engagement.", name: "Votre nom *", email: "Email professionnel *", company: "Entreprise ou activité (facultatif)", phone: "Téléphone de contact *", send: "Envoyer ma demande", sending: "Envoi en cours…", error: "Impossible d’envoyer la demande. Réessayez." },
  en: { kicker: "PARTNER PROGRAMME", title: "Build lasting", accent: "professional relationships.", intro: "Do you advise businesses and identify a need that matches our expertise? Introduce the project to us. Each referral is reviewed and any applicable terms are confirmed in writing before collaboration begins.", recruiter: "Interested in joining the sales team? View recruitment", steps: "HOW AN INTRODUCTION WORKS", step1: "Share the need", step1d: "Tell us about the business and the need you have identified.", step2: "Project review", step2d: "XR Agency checks whether the request matches the services we provide.", step3: "Written terms", step3d: "Any compensation, trigger and duration are defined in a signed agreement before commitment.", formKicker: "INITIAL CONTACT", formTitle: "Submit a partnership enquiry", success: "Your enquiry has been sent. The XR Agency team will review it and share any applicable terms before you make a commitment.", name: "Your name *", email: "Professional email *", company: "Company or activity (optional)", phone: "Contact phone *", send: "Send my enquiry", sending: "Sending…", error: "Unable to send your enquiry. Please try again." },
  vi: { kicker: "CHƯƠNG TRÌNH ĐỐI TÁC", title: "Xây dựng mối quan hệ", accent: "hợp tác lâu dài.", intro: "Bạn tư vấn doanh nghiệp và nhận thấy nhu cầu phù hợp với chuyên môn của chúng tôi? Hãy giới thiệu dự án. Mỗi kết nối sẽ được xem xét và mọi điều kiện hợp tác sẽ được xác nhận bằng văn bản trước khi bắt đầu.", recruiter: "Muốn tham gia đội ngũ kinh doanh? Xem tuyển dụng", steps: "QUY TRÌNH GIỚI THIỆU", step1: "Chia sẻ nhu cầu", step1d: "Giới thiệu doanh nghiệp và nhu cầu bạn đã xác định.", step2: "Xem xét dự án", step2d: "XR Agency kiểm tra mức độ phù hợp với các dịch vụ đang cung cấp.", step3: "Thỏa thuận bằng văn bản", step3d: "Mọi khoản thù lao, điều kiện thanh toán và thời hạn (nếu có) được quy định trong thỏa thuận đã ký.", formKicker: "LIÊN HỆ BAN ĐẦU", formTitle: "Gửi yêu cầu hợp tác", success: "Yêu cầu đã được gửi. Đội ngũ XR Agency sẽ xem xét và thông báo các điều kiện trước khi bạn cam kết.", name: "Họ tên *", email: "Email công việc *", company: "Công ty hoặc lĩnh vực (không bắt buộc)", phone: "Số điện thoại liên hệ *", send: "Gửi yêu cầu", sending: "Đang gửi…", error: "Không thể gửi yêu cầu. Vui lòng thử lại." },
  ar: { kicker: "برنامج الشركاء", title: "نبني علاقات", accent: "مهنية طويلة الأمد.", intro: "هل تقدم المشورة للشركات وتتعرف على احتياج يناسب خبراتنا؟ عرّفنا بالمشروع. تتم مراجعة كل إحالة وتأكيد أي شروط تعاون كتابياً قبل البدء.", recruiter: "هل ترغب بالانضمام إلى فريق المبيعات؟ اطّلع على الوظائف", steps: "كيف تتم الإحالة", step1: "شارك الاحتياج", step1d: "عرّفنا بالشركة والاحتياج الذي حددته.", step2: "مراجعة المشروع", step2d: "تتحقق XR Agency من توافق الطلب مع الخدمات التي تقدمها.", step3: "شروط مكتوبة", step3d: "يتم تحديد أي مقابل وشروط استحقاقه ومدته في اتفاقية موقعة قبل الالتزام.", formKicker: "تواصل أولي", formTitle: "إرسال طلب شراكة", success: "تم إرسال طلبك. سيراجعه فريق XR Agency وسيبلغك بأي شروط قبل الالتزام.", name: "الاسم الكامل *", email: "البريد المهني *", company: "الشركة أو النشاط (اختياري)", phone: "رقم للتواصل *", send: "إرسال الطلب", sending: "جارٍ الإرسال…", error: "تعذر إرسال الطلب. يرجى المحاولة مجدداً." },
  ru: { kicker: "ПАРТНЁРСКАЯ ПРОГРАММА", title: "Выстраиваем долгосрочные", accent: "профессиональные отношения.", intro: "Вы консультируете компании и видите потребность, соответствующую нашей экспертизе? Представьте нам проект. Каждая рекомендация рассматривается отдельно, а возможные условия сотрудничества подтверждаются письменно до начала работы.", recruiter: "Хотите присоединиться к отделу продаж? Вакансии", steps: "КАК РАБОТАЕТ РЕКОМЕНДАЦИЯ", step1: "Опишите потребность", step1d: "Расскажите о компании и выявленной задаче.", step2: "Оценка проекта", step2d: "XR Agency проверяет соответствие запроса предлагаемым услугам.", step3: "Письменные условия", step3d: "Любое вознаграждение, основание выплаты и срок действия фиксируются в подписанном соглашении.", formKicker: "ПЕРВИЧНЫЙ КОНТАКТ", formTitle: "Отправить запрос о партнёрстве", success: "Запрос отправлен. Команда XR Agency рассмотрит его и сообщит возможные условия до принятия обязательств.", name: "Ваше имя *", email: "Рабочая почта *", company: "Компания или деятельность (необязательно)", phone: "Контактный телефон *", send: "Отправить запрос", sending: "Отправка…", error: "Не удалось отправить запрос. Попробуйте ещё раз." },
};

function AffiliationPortalPage() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#F7F4EE] text-[#24231F]" data-testid="affiliation-portal-page">
      <Nav />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#211F1A]/15 pb-5">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#806747]"><Handshake className="h-4 w-4" />{c.kicker}</span>
            <Link to="/recrutement" className="inline-flex items-center gap-2 text-xs text-[#806747] hover:text-[#24231F]">{c.recruiter}<ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-10 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:py-20">
            <div>
              <h1 className="max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[.95] tracking-[-.06em]">{c.title} <span className="font-serif italic text-[#A88A65]">{c.accent}</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#625E56]">{c.intro}</p>
            </div>
            <div className="grid gap-4 border-l border-[#A88A65]/60 pl-6 sm:grid-cols-3 lg:pl-8">
              {[{n:"01",t:c.step1,d:c.step1d},{n:"02",t:c.step2,d:c.step2d},{n:"03",t:c.step3,d:c.step3d}].map((item)=><div key={item.n} className="border-t border-[#211F1A]/15 pt-4"><span className="font-serif text-xl italic text-[#A88A65]">{item.n}</span><h2 className="mt-3 text-sm font-semibold">{item.t}</h2><p className="mt-2 text-xs leading-6 text-[#777166]">{item.d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="border-y border-[#211F1A]/15 py-8 sm:py-10">
            <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#806747]">{c.formKicker}</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{c.formTitle}</h2>
            {submitted ? (
              <div className="mt-7 flex items-start gap-3 border border-[#A88A65]/45 bg-[#EEE9E0] p-5 text-sm leading-6 text-[#4F493F]" role="status"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#806747]" />{c.success}</div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault(); setSubmitting(true); setSubmitError("");
                const form = new FormData(e.currentTarget);
                const payload = { name: String(form.get("name") || "").trim(), email: String(form.get("email") || "").trim(), phone: String(form.get("phone") || "").trim(), company: String(form.get("company") || "").trim(), need: "Demande de partenariat / apporteur d’affaires", message: "Demande d’informations sur le programme partenaire et ses conditions." };
                try { const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || c.error); setSubmitted(true); }
                catch (error) { setSubmitError(error instanceof Error ? error.message : c.error); }
                finally { setSubmitting(false); }
              }} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2"><input name="name" required placeholder={c.name} aria-label={c.name} className="min-h-12 border border-[#211F1A]/20 bg-white px-4 text-sm outline-none focus:border-[#A88A65]"/><input name="email" type="email" required placeholder={c.email} aria-label={c.email} className="min-h-12 border border-[#211F1A]/20 bg-white px-4 text-sm outline-none focus:border-[#A88A65]"/></div>
                <input name="company" placeholder={c.company} aria-label={c.company} className="min-h-12 w-full border border-[#211F1A]/20 bg-white px-4 text-sm outline-none focus:border-[#A88A65]"/>
                <input name="phone" type="tel" required placeholder={c.phone} aria-label={c.phone} className="min-h-12 w-full border border-[#211F1A]/20 bg-white px-4 text-sm outline-none focus:border-[#A88A65]"/>
                {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
                <button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#24231F] px-6 py-3 text-xs font-semibold uppercase tracking-[.14em] text-white transition-colors hover:bg-[#806747] disabled:opacity-50"><Send className="h-4 w-4"/>{submitting ? c.sending : c.send}</button>
              </form>
            )}
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
