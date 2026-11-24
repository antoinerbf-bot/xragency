import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Send,
  ArrowRight,
  ShieldCheck,
  Clock,
  Lock,
  Award,
  Sparkles,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang, type L } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { Logo } from "./primitives";

const WA_DIRECT = `https://wa.me/33767566783`;
const l = (fr: string, en: string, vi: string, ar: string, ru: string): L => ({
  fr,
  en,
  vi,
  ar,
  ru,
});

const CONTACT_COPY = {
  fr: {
    eyebrow: "CONTACT & ÉTUDE DE PROJET",
    title: "Concrétisons votre vision avec rigueur.",
    whatsappDescription:
      "Chaque collaboration débute par un cadrage technique précis. Remplissez le formulaire ci-dessous pour recevoir un retour détaillé de nos stratèges sous 24h ouvrées.",
    book: "Échanger avec un expert",
    noCommitment: "Sans engagement",
    success: "Demande transmise avec succès",
    successText:
      "Merci pour votre confiance. Nos spécialistes étudient votre projet et reviennent vers vous sous 24h ouvrées avec une analyse personnalisée.",
    chat: "Retour à l'accueil",
    another: "Envoyer un autre message",
    error:
      "Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous contacter par e-mail.",
    project: "Présentez brièvement votre établissement, vos objectifs et vos délais...",
    sending: "Transmission en cours...",
    submitBtn: "Transmettre ma demande d'étude",
    footer:
      "XR AGENCY · Studio d'Ingénierie & de Haute Performance Digitale — Création de sites web d'exception, identité de marque, SEO & IA, Google Maps, réseaux sociaux et automatisation.",
    legal: "Mentions légales & Confidentialité RGPD",
    rights: "Tous droits réservés.",
    hosting: "Hébergement certifié haute sécurité CDN mondial 300+ PoPs",
    cities: "Paris, France · Dubaï, EAU · Da Nang, Vietnam · Genève, Suisse",
  },
  en: {
    eyebrow: "CONTACT & PROJECT SCOPING",
    title: "Bringing your vision to life with precision.",
    whatsappDescription:
      "Every engagement starts with rigorous scoping. Complete the form below to receive a detailed technical review from our team within 24 working hours.",
    book: "Talk to a specialist",
    noCommitment: "No obligation",
    success: "Enquiry submitted successfully",
    successText:
      "Thank you for reaching out. Our specialists will review your project and return with tailored recommendations within 24h.",
    chat: "Back to Home",
    another: "Send another message",
    error:
      "Something went wrong while sending your request. Please try again or reach out by email.",
    project: "Briefly outline your business, goals, and anticipated timeline...",
    sending: "Submitting...",
    submitBtn: "Submit Project Enquiry",
    footer:
      "XR AGENCY · Digital Engineering & High Performance Studio — Bespoke web engineering, brand art direction, AI & SEO, Google Maps, social media and cloud automation.",
    legal: "Legal notice & GDPR Compliance",
    rights: "All rights reserved.",
    hosting: "Enterprise global CDN hosting across 300+ PoPs",
    cities: "Paris, France · Dubai, UAE · Da Nang, Vietnam · Geneva, Switzerland",
  },
  vi: {
    eyebrow: "LIÊN HỆ & TƯ VẤN DỰ ÁN",
    title: "Hiện thực hóa tầm nhìn số chuẩn xác.",
    whatsappDescription:
      "Mọi hợp tác bắt đầu bằng việc xác định rõ mục tiêu kỹ thuật. Điền thông tin bên dưới để nhận phân tích chi tiết trong 24 giờ làm việc.",
    book: "Trao đổi với chuyên gia",
    noCommitment: "Không ràng buộc",
    success: "Gửi yêu cầu thành công",
    successText:
      "Cảm ơn sự tin tưởng của bạn. Chuyên gia của chúng tôi sẽ phản hồi kèm đề xuất phù hợp trong vòng 24 giờ.",
    chat: "Về trang chủ",
    another: "Gửi yêu cầu khác",
    error:
      "Đã xảy ra lỗi khi gửi. Vui lòng thử lại hoặc gửi email cho chúng tôi.",
    project: "Mô tả cơ sở kinh doanh, mục tiêu và thời hạn dự kiến...",
    sending: "Đang gửi...",
    submitBtn: "Gửi yêu cầu tư vấn",
    footer:
      "XR AGENCY · Studio Kỹ thuật & Hiệu năng Số — Thiết kế website cao cấp, bộ nhận diện thương hiệu, SEO & AI, Google Maps, truyền thông xã hội và tự động hóa.",
    legal: "Pháp lý & Quy chuẩn GDPR",
    rights: "Đã đăng ký bản quyền.",
    hosting: "Lưu trữ CDN toàn cầu bảo mật cao trên 300+ cụm máy chủ",
    cities: "Paris, Pháp · Dubai, UAE · Đà Nẵng, Việt Nam · Geneva, Thụy Sĩ",
  },
  ar: {
    eyebrow: "التواصل ودراسة المشروع",
    title: "تجسيد رؤيتك الرقمية بدقة متناهية.",
    whatsappDescription:
      "يبدأ كل مشروع ناجح بدراسة تقنية دقيقة. املأ النموذج أدناه لتستلم تقريراً مخصصاً من خبرائنا خلال 24 ساعة عمل.",
    book: "تحدث مع خبير",
    noCommitment: "دون التزام",
    success: "تم إرسال الطلب بنجاح",
    successText: "شكراً لثقتكم. يقوم خبراؤنا بدراسة مشروعكم وسنتواصل معكم بخطة عمل دقيقة خلال 24 ساعة.",
    chat: "العودة للرئيسية",
    another: "إرسال طلب جديد",
    error: "حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً أو مراسلتنا بالبريد الإلكتروني.",
    project: "صف نشاطك التجاري وأهدافك والجدول الزمني المتوقع...",
    sending: "جارٍ الإرسال...",
    submitBtn: "إرسال طلب الاستشارة",
    footer:
      "XR AGENCY · استوديو الهندسة الرقمية والأداء العالي — تطوير المواقع الفاخرة، الهوية البصرية، السيو والذكاء الاصطناعي، خرائط جوجل، والأتمتة السحابية.",
    legal: "الإشعارات القانونية وحماية البيانات GDPR",
    rights: "جميع الحقوق محفوظة.",
    hosting: "استضافة شبكة CDN عالمية عالية الأمان عبر أكثر من 300 نقطة توزيع",
    cities: "باريس، فرنسا · دبي، الإمارات · دا نانغ، فيتنام · جنيف، سويسرا",
  },
  ru: {
    eyebrow: "КОНТАКТЫ И АНАЛИЗ ПРОЕКТА",
    title: "Воплощаем ваши цели с безупречной точностью.",
    whatsappDescription:
      "Каждое сотрудничество начинается с чёткого технического задания. Заполните форму ниже, чтобы получить подробную оценку в течение 24 рабочих часов.",
    book: "Консультация эксперта",
    noCommitment: "Без обязательств",
    success: "Заявка успешно отправлена",
    successText:
      "Благодарим за обращение. Наши эксперты подготовят для вас индивидуальный план в течение 24 часов.",
    chat: "На главную",
    another: "Отправить ещё одно сообщение",
    error:
      "Произошла ошибка при отправке. Пожалуйста, попробуйте снова или напишите на email.",
    project: "Расскажите о вашей компании, задачах и желаемых сроках...",
    sending: "Отправка...",
    submitBtn: "Отправить заявку на аудит",
    footer:
      "XR AGENCY · Студия цифровой инженерии и высокой эффективности — разработка сайтов под ключ, брендинг, SEO и ИИ, Google Maps, соцсети и облачная автоматизация.",
    legal: "Правовая информация и GDPR",
    rights: "Все права защищены.",
    hosting: "Глобальный CDN-хостинг на 300+ узлах с максимальной защитой",
    cities: "Париж, Франция · Дубай, ОАЭ · Дананг, Вьетнам · Женева, Швейцария",
  },
} as const;

export function Contact({ showFooter = true }: { showFooter?: boolean }) {
  const { t, lang } = useLang();
  const c = CONTACT_COPY[lang] ?? CONTACT_COPY.fr;
  const [need, setNeed] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const NEED_OPTIONS = [
    UI.contactFormNeedSite,
    UI.contactFormNeedRedesign,
    UI.contactFormNeedSeo,
    UI.contactFormNeedAi,
    UI.contactFormNeedStrategy,
    UI.contactFormNeedOther,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      website: fd.get("website") as string,
      need: fd.get("need") as string,
      message: fd.get("message") as string,
      hp: fd.get("hp") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || c.error);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : c.error);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#FAF9F5] py-16 text-[#171613] sm:py-24 border-t border-[#E8E6E0]"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* 2-Column Editorial Contact Split */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Studio Quality Guarantees & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#1A73E8]">
                {c.eyebrow}
              </p>
              <h2 className="mt-2.5 font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-tight text-[#171613]">
                {c.title}
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-[#5C574F] sm:text-sm">
                {c.whatsappDescription}
              </p>
            </div>

            {/* 4 Concrete Commitments */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#171613]">Cession de Propriété 100%</h4>
                  <p className="mt-0.5 text-[11px] text-[#5C574F]">Code source, nom de domaine et design vous appartiennent intégralement. Zéro dépendance captive.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#171613]">Engagements de Délais Fermes</h4>
                  <p className="mt-0.5 text-[11px] text-[#5C574F]">Calendrier de livraison garanti par contrat (7 à 30 jours ouvrés selon la formule retenue).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#171613]">Confidentialité & Sécurité RGPD</h4>
                  <p className="mt-0.5 text-[11px] text-[#5C574F]">Accords de confidentialité (NDA) signés sur demande. Conformité européenne stricte.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm">
                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5]" />
                <div>
                  <h4 className="text-xs font-semibold text-[#171613]">4 Hubs Internationaux Réactifs</h4>
                  <p className="mt-0.5 text-[11px] text-[#5C574F]">Équipes actives et synchronisées à Paris, Dubaï, Da Nang et Genève avec support 6j/7.</p>
                </div>
              </div>
            </div>

            {/* Direct Professional Channels */}
            <div className="pt-2 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex flex-1 items-center gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm transition hover:border-[#12110E]"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F0F5FF] text-[#1A73E8]">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[9.5px] uppercase tracking-wider text-[#5C574F]">Email Studio</span>
                  <strong className="block truncate text-xs font-semibold text-[#171613]">{CONTACT.email}</strong>
                </div>
              </a>

              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#E5E5E0] bg-white p-3.5 shadow-sm">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F0FDF4] text-[#16A34A]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[9.5px] uppercase tracking-wider text-[#5C574F]">Siège & Hubs</span>
                  <strong className="block truncate text-xs font-semibold text-[#171613]">Paris · Dubaï · Da Nang · Genève</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Elevated White Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E5E5E0] bg-white p-6 shadow-xl sm:p-8">
              {status === "success" ? (
                <div className="py-10 text-center space-y-3 animate-fade-in">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#16A34A] text-white text-2xl shadow-lg">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#171613]">{c.success}</h3>
                  <p className="mx-auto max-w-md text-xs leading-relaxed text-[#5C574F]">{c.successText}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 rounded-full border border-[#D5D5CF] px-5 py-2.5 text-xs font-semibold text-[#171613] hover:bg-[#FAF9F5]"
                    >
                      {c.another}
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-full bg-[#12110E] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2B2925]"
                    >
                      {c.chat}
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                    aria-hidden="true"
                  />
                  {status === "error" && (
                    <div className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-700">
                      {errorMessage || c.error}
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#2B2925]">
                      {t(UI.contactFormName)} *
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3.5 py-3 text-xs text-[#171613] outline-none transition focus:border-[#12110E] focus:bg-white"
                      placeholder={
                        lang === "fr"
                          ? "Jean Dupont"
                          : lang === "vi"
                            ? "Nguyễn Văn An"
                            : lang === "ru"
                              ? "Иван Иванов"
                              : lang === "ar"
                                ? "الاسم الكامل"
                                : "John Doe"
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#2B2925]">
                      {t(UI.contactFormEmail)} *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3.5 py-3 text-xs text-[#171613] outline-none transition focus:border-[#12110E] focus:bg-white"
                      placeholder="contact@entreprise.com"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#2B2925]">
                      {t(UI.contactFormCompany)}
                    </label>
                    <input
                      name="company"
                      className="w-full rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3.5 py-3 text-xs text-[#171613] outline-none transition focus:border-[#12110E] focus:bg-white"
                      placeholder="Entreprise / Établissement"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#2B2925]">
                      {t(UI.contactFormNeed)}
                    </label>
                    <select
                      name="need"
                      value={need}
                      onChange={(e) => setNeed(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3.5 py-3 text-xs text-[#171613] outline-none transition focus:border-[#12110E] focus:bg-white"
                    >
                      <option value="">— {t(l("Sélectionnez votre besoin", "Select your requirement", "Chọn nhu cầu", "اختر احتياجك", "Выберите задачу"))} —</option>
                      {NEED_OPTIONS.map((key, i) => (
                        <option key={i} value={t(key)}>
                          {t(key)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#2B2925]">
                      {t(UI.contactFormMessage)} *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full resize-none rounded-xl border border-[#D5D5CF] bg-[#FAF9F5] px-3.5 py-3 text-xs text-[#171613] outline-none transition focus:border-[#12110E] focus:bg-white"
                      placeholder={c.project}
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#12110E] px-7 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#2B2925] hover:scale-[1.005] disabled:opacity-50"
                    >
                      <span>{status === "loading" ? c.sending : c.submitBtn}</span>
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            GLOBAL ELEVATED FOOTER : 4 HUBS, NETWORK PULSE & ECOSYSTEM PILLS
           ════════════════════════════════════════════════════════════════════ */}
        {showFooter ? (
          <footer className="mt-20 border-t border-[#12110E]/12 pt-14 text-[#171613]">
            {/* Top Brand & Live Pulse Banner */}
            <div className="flex flex-col gap-6 border-b border-[#12110E]/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Logo />
                  <div className="flex items-center gap-1.5 pl-2 border-l border-[#12110E]/20">
                    <span className="h-2 w-2 rounded-full bg-[#1A73E8]" />
                    <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                    <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  </div>
                </div>
                <p className="mt-3 max-w-xl text-xs text-[#5C574F] leading-relaxed">
                  {c.footer}
                </p>
              </div>

              {/* Studio Direct Contact & Accreditation */}
              <div className="rounded-2xl border border-[#12110E]/15 bg-white p-4.5 shadow-sm shrink-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <span className="font-mono text-[10.5px] font-bold text-[#171613] tracking-wider">
                    STUDIO PERMANENCE & RELATIONS CLIENTS
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#5C574F]">
                    <span className="font-semibold text-[#171613]">WhatsApp Direct :</span>
                    <a href={WA_DIRECT} target="_blank" rel="noreferrer" className="font-mono text-[#16A34A] hover:underline font-bold">
                      +33 7 67 56 67 83
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#5C574F]">
                    <span className="font-semibold text-[#171613]">E-mail Studio :</span>
                    <a href={`mailto:${CONTACT.email}`} className="font-mono text-[#171613] hover:underline">
                      {CONTACT.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <a
                      href={CONTACT.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#5C574F] hover:text-[#171613] transition"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      <span>@xragency_</span>
                    </a>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#5C574F] hover:text-[#171613] transition"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Worldwide Hubs Grid with Human Warmth & Charm */}
            <div className="mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#A67C40]">
                  {t(l("LES 4 HUBS XR AGENCY EN SYNCHRONISATION PERMANENTE", "THE 4 XR AGENCY HUBS IN CONSTANT SYNC", "4 TRUNG TÂM XR AGENCY TRÊN TOÀN CẦU", "مراكز XR AGENCY الأربعة في مزامنة دائمة", "4 МЕЖДУНАРОДНЫХ ХАБА XR AGENCY"))}
                </span>
                <span className="text-xs text-[#5C574F]">
                  {t(l("Une équipe humaine, réactive et sans sous-traitance opaque.", "A genuine, responsive team with zero opaque outsourcing.", "Đội ngũ chuyên nghiệp, hỗ trợ tận tâm không trung gian.", "فريق عمل حقيقي ومباشر دون وسطاء.", "Реальная команда экспертов без непрозрачного аутсорсинга."))}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    city: "Paris",
                    flag: "🇫🇷",
                    district: "Triangle d'Or · 8e arr.",
                    role: "Direction artistique & Stratégie",
                    charm: "Cadrage stratégique, identité visuelle et développement haute couture. Rendez-vous sur Paris ou session visio privée.",
                    schedule: "Lun – Ven · 9h00 – 19h00 (CET)",
                  },
                  {
                    city: "Dubaï",
                    flag: "🇦🇪",
                    district: "DIFC · Downtown",
                    role: "Expansion & Hospitality",
                    charm: "Déploiement pour marques d'exception, hôtellerie et projets du Golfe. Support bilingue FR / EN / AR multi-devises.",
                    schedule: "Dim – Jeu · 10h00 – 19h00 (GST)",
                  },
                  {
                    city: "Da Nang",
                    flag: "🇻🇳",
                    district: "An Thuong Coastal Lab",
                    role: "Ingénierie & Vidéo 24/7",
                    charm: "Notre pôle d'ingénieurs web et de monteurs vidéo pour une exécution ultra-rapide et un suivi continu sans rupture.",
                    schedule: "Opérations actives 24h/24 · 7j/7",
                  },
                  {
                    city: "Genève",
                    flag: "🇨🇭",
                    district: "Rue du Rhône · Rive Gauche",
                    role: "Clientèle Privée & Finance",
                    charm: "Confidentialité absolue et rigueur suisse pour family offices, maisons de luxe et professions réglementées.",
                    schedule: "Lun – Ven · 8h30 – 18h30 (CET)",
                  },
                ].map((hub, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#E5E5E0] bg-white p-5 transition hover:border-[#A67C40] hover:shadow-md shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{hub.flag}</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#A67C40] font-semibold">{hub.district}</span>
                      </div>
                      <h4 className="mt-2.5 font-serif text-lg font-medium text-[#171613]">{hub.city}</h4>
                      <p className="font-mono text-[10px] font-semibold text-[#8C8274] uppercase tracking-wide mt-0.5">{hub.role}</p>
                      <p className="mt-2 text-xs text-[#5C574F] leading-relaxed">{hub.charm}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[10px] font-mono text-[#8C8274]">
                      <span>{hub.schedule}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Agency Trust, Legal & Guarantees */}
            <div className="mt-10 rounded-2xl border border-[#E5E5E0] bg-[#FAF8F5] p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#171613]">
                    Propriété & Code
                  </h5>
                  <p className="mt-1 text-xs text-[#5C574F] leading-relaxed">
                    100 % propriétaire de votre site, de votre nom de domaine et de vos données. Aucun abonnement caché ni verrou technique.
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#171613]">
                    Engagement SLA 24h
                  </h5>
                  <p className="mt-1 text-xs text-[#5C574F] leading-relaxed">
                    Devis personnalisé et diagnostic technique remis sous 24h ouvrées. Suivi direct avec votre chef de projet dédié.
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#171613]">
                    Conformité RGPD & Sécurité
                  </h5>
                  <p className="mt-1 text-xs text-[#5C574F] leading-relaxed">
                    Architecture respectant strictement le RGPD européen. Certificats SSL/TLS automatiques, sauvegardes quotidiennes.
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#171613]">
                    Hébergement Edge Mondial
                  </h5>
                  <p className="mt-1 text-xs text-[#5C574F] leading-relaxed">
                    Réseau haute disponibilité Vercel & AWS réparti sur 300+ PoPs à travers l'Europe, l'Asie et le Moyen-Orient.
                  </p>
                </div>
              </div>
            </div>

            {/* Ecosystem Navigation Pills */}
            <div className="mt-10 border-t border-[#12110E]/10 pt-8">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5C574F]">
                {t(l("EXPLORER L'ÉCOSYSTÈME XR AGENCY", "EXPLORE XR AGENCY SERVICES", "KHÁM PHÁ DỊCH VỤ XR AGENCY", "استكشف خدمات XR AGENCY الأخرى", "ДРУГИЕ НАПРАВЛЕНИЯ XR AGENCY"))}
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {[
                  { name: l("Création de Sites Web & Refonte", "Websites & Redesign", "Thiết kế Website", "تصميم المواقع", "Создание сайтов"), path: "/services/websites" },
                  { name: l("Branding & Direction Artistique", "Branding & Art Direction", "Bộ nhận diện Thương hiệu", "الهوية البصرية", "Брендинг"), path: "/services/branding" },
                  { name: l("SEO & Intelligence Artificielle", "SEO & AI Search", "SEO & Trí tuệ Nhân tạo", "السيو والذكاء الاصطناعي", "SEO и ИИ"), path: "/services/seo" },
                  { name: l("Google Maps & Pack Local", "Google Maps & Local Pack", "Google Maps & Địa phương", "خرائط جوجل والظهور المحلي", "Google Maps и Local Pack"), path: "/services/maps" },
                  { name: l("Réseaux Sociaux & Vidéo", "Social Media & Video", "Mạng xã hội & Video", "وسائل التواصل والفيديو", "Соцсети и видео"), path: "/services/social" },
                  { name: l("Webcare & Maintenance 24/7", "Webcare & Maintenance", "Bảo trì & Vận hành", "الصيانة والدعم الفني", "Поддержка сайтов"), path: "/services/webcare" },
                  { name: l("CRM Sur-Mesure & Logiciels", "Custom CRM & Software", "CRM & Phần mềm", "أنظمة CRM والبرمجيات", "CRM и заказной софт"), path: "/services/crm" },
                  { name: l("Robotique Autonome Korben", "Autonomous Robotics", "Robot Tự hành", "الروبوتات الذاتية", "Робототехника"), path: "/services/robotique" },
                  { name: l("Notre Histoire & Méthode", "Our Story & Method", "Về chúng tôi & Phương pháp", "قصتنا والمنهجية", "О нас и методология"), path: "/notre-histoire" },
                ].map((s, idx) => (
                  <Link
                    key={idx}
                    to={s.path}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D5CF] bg-white px-4 py-2 text-xs font-medium text-[#171613] transition hover:border-[#12110E] hover:bg-[#FAF9F5] shadow-sm"
                  >
                    <span>{t(s.name)}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Legal & Back to Top */}
            <div className="mt-10 flex flex-col gap-4 border-t border-[#12110E]/10 pt-6 pb-20 sm:pb-12 text-xs text-[#5C574F] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p>
                  <strong className="font-sans font-black tracking-wider uppercase text-black">XRAGENCY</strong> · © {new Date().getFullYear()} {c.rights}
                </p>
                <p className="mt-1 text-[10px] text-[#5C574F]/70">{c.hosting}</p>
              </div>

              <div className="flex items-center gap-4 sm:pr-24">
                <Link to="/mentions-legales" className="hover:text-[#171613] transition">
                  {c.legal}
                </Link>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D5CF] bg-white px-3 py-1 text-[11px] font-mono text-[#171613] hover:border-[#12110E] shadow-sm transition"
                >
                  <span className="font-mono text-[9px]">RETOUR HAUT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </footer>
        ) : null}
      </div>
    </section>
  );
}
