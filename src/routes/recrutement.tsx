import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Trophy, Flame, Crown, CheckCircle2, ArrowUpRight, Sparkles, Send } from "lucide-react";
import { RPG_RANKS, RPG_XP_REWARDS } from "@/lib/rpg-engine";
import { useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/recrutement")({
  head: () => ({
    meta: [
      {
        title: "Recrutement Closers d'Élite — Rejoignez l'Arène CRM RPG | XR Agency",
      },
      {
        name: "description",
        content:
          "Vous êtes un closer B2B ? Rejoignez l’équipe XR Agency et suivez votre activité commerciale dans un CRM interne gamifié.",
      },
    ],
  }),
  component: RecrutementClosersRpgPage,
});

const COPY: Record<Lang, Record<string, string>> = {
  fr: {
    kicker: "ÉQUIPE COMMERCIALE B2B · CRM INTERNE", affiliate: "Vous apportez des opportunités ? Voir le programme partenaires",
    title: "Développez votre expertise commerciale.", accent: "Avec des outils conçus pour le terrain.", intro: "Les closers XR Agency disposent d’un CRM interne pour suivre les prospects, les étapes commerciales, les audits et les propositions. Les outils disponibles et les modalités de collaboration sont présentés pendant le processus de sélection.",
    call: "Appel qualifié", audit: "Diagnostic 5 piliers", meeting: "Rendez-vous découverte", deal: "Projet signé", simulator: "SIMULATEUR INDICATIF", simulatorTitle: "Projetez un scénario d’activité", disclaimer: "Simulation indicative basée sur les hypothèses choisies. Le volume d’affaires n’est ni un revenu personnel ni une promesse de rémunération. Les commissions et modalités sont définies par contrat.", deals: "Projets signés par mois", basket: "Valeur moyenne du projet signé", volume: "Volume d’affaires simulé", xp: "XP associés aux signatures simulées",
    ranks: "PROGRESSION INTERNE", ranksTitle: "Les cinq rangs du CRM", rankPrefix: "RANG", perMonth: "/ mois", dealsUnit: "projets / mois", eurUnit: "€", from: "À partir de", points: "XP", crm: "Découvrir l’interface CRM interne", formKicker: "CANDIDATURE COMMERCIALE", formTitle: "Présenter votre candidature", success: "Candidature reçue. L’équipe XR Agency pourra revenir vers vous après examen de votre profil.", name: "Prénom et nom *", phone: "Téléphone *", company: "Entreprise (facultatif)", email: "Email professionnel *", specialty: "Expertise commerciale (sites web, SEO, Google Maps, robotique…) *", send: "Envoyer ma candidature", sending: "Envoi en cours…", error: "Impossible d’envoyer votre candidature. Veuillez réessayer.",
  },
  en: {
    kicker: "B2B SALES TEAM · INTERNAL CRM", affiliate: "Have referral opportunities? View the partner programme",
    title: "Build your sales expertise.", accent: "With tools designed for real work.", intro: "XR Agency closers use an internal CRM to manage prospects, sales stages, audits and proposals. Available tools and collaboration terms are explained during the selection process.",
    call: "Qualified call", audit: "Five-pillar assessment", meeting: "Discovery meeting", deal: "Project signed", simulator: "ILLUSTRATIVE CALCULATOR", simulatorTitle: "Explore an activity scenario", disclaimer: "Illustrative simulation based on selected assumptions. Business volume is not personal income or a compensation promise. Any commissions and terms are defined by contract.", deals: "Projects signed per month", basket: "Average signed project value", volume: "Illustrative business volume", xp: "XP linked to simulated signatures",
    ranks: "INTERNAL PROGRESSION", ranksTitle: "The five CRM ranks", rankPrefix: "RANK", perMonth: "/ mo", dealsUnit: "projects / mo", eurUnit: "€", from: "From", points: "XP", crm: "Explore the internal CRM interface", formKicker: "SALES APPLICATION", formTitle: "Submit your application", success: "Application received. The XR Agency team may contact you after reviewing your profile.", name: "First and last name *", phone: "Phone *", company: "Company (optional)", email: "Professional email *", specialty: "Sales specialism (websites, SEO, Google Maps, robotics…) *", send: "Send my application", sending: "Sending…", error: "Unable to send your application. Please try again.",
  },
  vi: {
    kicker: "ĐỘI NGŨ KINH DOANH B2B · CRM NỘI BỘ", affiliate: "Bạn có cơ hội giới thiệu khách hàng? Xem chương trình đối tác",
    title: "Phát triển năng lực kinh doanh.", accent: "Với công cụ dành cho công việc thực tế.", intro: "Đội ngũ kinh doanh XR Agency sử dụng CRM nội bộ để theo dõi khách hàng tiềm năng, quy trình bán hàng, đánh giá và đề xuất. Công cụ và điều kiện hợp tác sẽ được trao đổi trong quá trình tuyển chọn.",
    call: "Cuộc gọi đủ điều kiện", audit: "Đánh giá 5 trụ cột", meeting: "Cuộc hẹn khám phá", deal: "Dự án ký kết", simulator: "CÔNG CỤ MÔ PHỎNG", simulatorTitle: "Khám phá kịch bản hoạt động", disclaimer: "Mô phỏng dựa trên giả định đã chọn. Doanh số không phải thu nhập cá nhân hay cam kết thù lao. Hoa hồng và điều kiện được quy định trong hợp đồng.", deals: "Dự án ký mỗi tháng", basket: "Giá trị trung bình dự án", volume: "Doanh số mô phỏng", xp: "XP từ số dự án mô phỏng",
    ranks: "TIẾN TRÌNH NỘI BỘ", ranksTitle: "Năm cấp bậc CRM", rankPrefix: "HẠNG", perMonth: "/ tháng", dealsUnit: "dự án / tháng", eurUnit: "€", from: "Từ", points: "XP", crm: "Khám phá giao diện CRM nội bộ", formKicker: "ỨNG TUYỂN KINH DOANH", formTitle: "Gửi hồ sơ ứng tuyển", success: "Đã nhận hồ sơ. Đội ngũ XR Agency có thể liên hệ sau khi xem xét thông tin của bạn.", name: "Họ và tên *", phone: "Điện thoại *", company: "Công ty (không bắt buộc)", email: "Email công việc *", specialty: "Chuyên môn kinh doanh (website, SEO, Google Maps, robot…) *", send: "Gửi hồ sơ", sending: "Đang gửi…", error: "Không thể gửi hồ sơ. Vui lòng thử lại.",
  },
  ar: {
    kicker: "فريق مبيعات الشركات · نظام CRM داخلي", affiliate: "لديك فرص إحالة؟ اطّلع على برنامج الشركاء",
    title: "طوّر خبرتك في المبيعات.", accent: "بأدوات مصممة للعمل الفعلي.", intro: "يستخدم فريق المبيعات في XR Agency نظام CRM داخلياً لمتابعة العملاء المحتملين ومراحل البيع والتقييمات والعروض. يتم شرح الأدوات المتاحة وشروط التعاون خلال عملية الاختيار.",
    call: "مكالمة مؤهلة", audit: "تشخيص من خمسة محاور", meeting: "اجتماع استكشافي", deal: "مشروع موقّع", simulator: "حاسبة توضيحية", simulatorTitle: "استكشف سيناريو للنشاط", disclaimer: "محاكاة إرشادية مبنية على الافتراضات المختارة. حجم الأعمال ليس دخلاً شخصياً ولا وعداً بالتعويض. تحدد العقود أي عمولات وشروط.", deals: "المشاريع الموقعة شهرياً", basket: "متوسط قيمة المشروع", volume: "حجم أعمال افتراضي", xp: "نقاط XP للتوقيعات الافتراضية",
    ranks: "التقدم الداخلي", ranksTitle: "رتب CRM الخمس", rankPrefix: "الرتبة", perMonth: "/ شهر", dealsUnit: "مشاريع / شهر", eurUnit: "€", from: "ابتداءً من", points: "XP", crm: "استكشف واجهة CRM الداخلية", formKicker: "طلب الانضمام إلى فريق المبيعات", formTitle: "إرسال طلب ترشح", success: "تم استلام طلبك. قد يتواصل معك فريق XR Agency بعد مراجعة ملفك.", name: "الاسم الكامل *", phone: "الهاتف *", company: "الشركة (اختياري)", email: "البريد المهني *", specialty: "التخصص التجاري (المواقع، SEO، خرائط Google، الروبوتات…) *", send: "إرسال الطلب", sending: "جارٍ الإرسال…", error: "تعذر إرسال الطلب. يرجى المحاولة مجدداً.",
  },
  ru: {
    kicker: "КОМАНДА B2B-ПРОДАЖ · ВНУТРЕННЯЯ CRM", affiliate: "Есть рекомендации клиентов? Партнёрская программа",
    title: "Развивайте навыки продаж.", accent: "С инструментами для реальной работы.", intro: "Специалисты по продажам XR Agency используют внутреннюю CRM для работы с лидами, этапами сделок, аудитами и предложениями. Инструменты и условия сотрудничества объясняются в процессе отбора.",
    call: "Квалифицированный звонок", audit: "Диагностика по пяти направлениям", meeting: "Встреча-знакомство", deal: "Подписанный проект", simulator: "ИЛЛЮСТРАТИВНЫЙ КАЛЬКУЛЯТОР", simulatorTitle: "Изучите сценарий активности", disclaimer: "Примерный расчёт на основе выбранных предположений. Оборот не является личным доходом или обещанием вознаграждения. Комиссии и условия определяются договором.", deals: "Подписанные проекты в месяц", basket: "Средняя стоимость проекта", volume: "Условный оборот", xp: "XP за условные подписания",
    ranks: "ВНУТРЕННИЙ ПРОГРЕСС", ranksTitle: "Пять рангов CRM", rankPrefix: "РАНГ", perMonth: "/ мес", dealsUnit: "проектов / мес", eurUnit: "€", from: "От", points: "XP", crm: "Посмотреть интерфейс внутренней CRM", formKicker: "ЗАЯВКА В ОТДЕЛ ПРОДАЖ", formTitle: "Отправить заявку", success: "Заявка получена. Команда XR Agency может связаться с вами после рассмотрения профиля.", name: "Имя и фамилия *", phone: "Телефон *", company: "Компания (необязательно)", email: "Рабочая почта *", specialty: "Специализация (сайты, SEO, Google Maps, робототехника…) *", send: "Отправить заявку", sending: "Отправка…", error: "Не удалось отправить заявку. Попробуйте ещё раз.",
  },
};

const RANK_PERKS: Record<Lang, string[]> = {
  fr: ["Accès au pipeline entrant et aux scripts de qualification", "Accès aux leads Google Maps et aux diagnostics", "Priorité sur les demandes entrantes et bonus contractuels éventuels", "Gestion des comptes stratégiques et projets complexes", "Parcours expert et responsabilités avancées selon l’organisation"],
  en: ["Access to inbound pipeline and qualification scripts", "Access to Google Maps leads and assessments", "Priority on inbound requests and any contractually defined bonuses", "Strategic accounts and complex projects", "Expert track and advanced responsibilities subject to the organisation"],
  vi: ["Truy cập pipeline khách hàng mới và kịch bản đánh giá", "Tiếp cận lead Google Maps và các đánh giá", "Ưu tiên yêu cầu mới và thưởng nếu được quy định trong hợp đồng", "Quản lý khách hàng chiến lược và dự án phức tạp", "Lộ trình chuyên gia và trách nhiệm nâng cao theo tổ chức"],
  ar: ["الوصول إلى مسار العملاء الواردين ونصوص التأهيل", "الوصول إلى فرص Google Maps والتقييمات", "أولوية الطلبات الواردة وأي مكافآت منصوص عليها تعاقدياً", "الحسابات الاستراتيجية والمشاريع المعقدة", "مسار الخبراء والمسؤوليات المتقدمة وفق التنظيم"],
  ru: ["Доступ к входящим лидам и сценариям квалификации", "Доступ к лидам Google Maps и диагностике", "Приоритет входящих запросов и бонусы, если они предусмотрены договором", "Стратегические клиенты и сложные проекты", "Экспертный трек и расширенные обязанности согласно структуре"],
};

function RecrutementClosersRpgPage() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const rankPerks = RANK_PERKS[lang] ?? RANK_PERKS.fr;
  const [dealsPerMonth, setDealsPerMonth] = useState(6);
  const [avgBasket, setAvgBasket] = useState(2490);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const estimatedMonthlyBusinessVolume = Math.round(dealsPerMonth * avgBasket);
  const estimatedMonthlyXp = dealsPerMonth * RPG_XP_REWARDS.deal_closed;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F7F4EE] text-[#24231F]"
      data-testid="recrutement-closers-rpg-page"
    >
      <Nav />

      <main className="pt-28 pb-24 space-y-20">
        {/* HERO: CLOSERS D'ÉLITE & CRM GAMIFIÉ RPG */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#A88A65]/50 text-xs font-mono uppercase tracking-[0.2em] text-[#806747]">
              <Trophy className="w-4 h-4" />
              {c.kicker}
            </div>

            <Link
              to="/affiliation"
              className="px-4 py-2 rounded-sm bg-white border border-[#A88A65]/40 text-xs font-mono text-[#A88A65] hover:bg-[#A88A65] hover:text-white transition flex items-center gap-1.5"
            >
              {c.affiliate}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#24231f] leading-[1.05]">
                {c.title} <span className="font-serif italic text-[#A88A65]">{c.accent}</span>
              </h1>
              <p className="text-base sm:text-lg text-[#5f5a51] leading-relaxed">
                {c.intro}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-sm bg-white border border-[#ded8cc]">
                  <div className="text-xs font-mono text-[#746d62]">{c.call}</div>
                  <div className="text-xl font-mono font-bold text-[#806747] mt-1">
                    +{RPG_XP_REWARDS.call} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-sm bg-white border border-[#ded8cc]">
                  <div className="text-xs font-mono text-[#746d62]">{c.audit}</div>
                  <div className="text-xl font-mono font-bold text-[#806747] mt-1">
                    +{RPG_XP_REWARDS.audit} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-sm bg-white border border-[#ded8cc]">
                  <div className="text-xs font-mono text-[#746d62]">{c.meeting}</div>
                  <div className="text-xl font-mono font-bold text-[#806747] mt-1">
                    +{RPG_XP_REWARDS.meeting} XP
                  </div>
                </div>
                <div className="p-3.5 rounded-sm bg-[#A88A65]/15 border border-[#A88A65]/50">
                  <div className="text-xs font-mono text-[#A88A65]">{c.deal}</div>
                  <div className="text-xl font-mono font-bold text-[#A88A65] mt-1">
                    +{RPG_XP_REWARDS.deal_closed} XP
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Closer Earnings & XP Estimator */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-none bg-white border border-[#ded8cc] space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#806747]">
                  {c.simulator}
                </span>
                <Flame className="w-5 h-5 text-[#806747]" />
              </div>

              <p className="text-xs leading-5 text-[#746d62]">
                {c.disclaimer}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#5f5a51]">{c.deals}</span>
                    <span className="font-mono font-bold text-[#806747]">
                      {dealsPerMonth} {c.dealsUnit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={dealsPerMonth}
                    onChange={(e) => setDealsPerMonth(Number(e.target.value))}
                    className="w-full accent-[#A88A65]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#5f5a51]">{c.basket}</span>
                    <span className="font-mono font-bold text-[#24231f]">
                      {avgBasket.toLocaleString("fr-FR")} {c.eurUnit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={990}
                    max={4900}
                    step={250}
                    value={avgBasket}
                    onChange={(e) => setAvgBasket(Number(e.target.value))}
                    className="w-full accent-[#A88A65]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#f1ece2] border border-[#A88A65]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#746d62]">{c.volume}</span>
                  <span
                    className="text-2xl font-mono font-bold text-[#A88A65]"
                    data-testid="closer-sim-commission"
                  >
                    {estimatedMonthlyBusinessVolume.toLocaleString("fr-FR")} {c.eurUnit} {c.perMonth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#806747]">
                  <span>{c.xp}</span>
                  <span>+{estimatedMonthlyXp.toLocaleString("fr-FR")} XP</span>
                </div>
              </div>

              <Link
                to="/crm"
                className="w-full py-3 px-4 rounded-sm bg-[#A88A65] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#9a784e] transition"
              >
                <Sparkles className="w-4 h-4" />
                {c.crm}
              </Link>
            </div>
          </div>
        </section>

        {/* THE 5 RPG RANKS LADDER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#806747]">
              {c.ranks}
            </span>
            <h2 className="text-3xl font-bold text-[#24231f]">
              {c.ranksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {RPG_RANKS.map((rank) => (
              <div
                key={rank.level}
                className="p-5 rounded-sm bg-white border border-[#ded8cc] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: rank.badgeColor }}>
                    {c.rankPrefix} 0{rank.level}
                  </span>
                  <Crown className="w-4 h-4" style={{ color: rank.badgeColor }} />
                </div>
                <h3 className="text-lg font-bold text-[#24231f]">{rank.title}</h3>
                <div className="text-xs font-mono text-[#806747]">
                  {c.from} {rank.minXp.toLocaleString(lang === "vi" ? "vi-VN" : lang === "ar" ? "ar" : lang === "ru" ? "ru-RU" : "fr-FR")} {c.points}
                </div>
                <p className="text-xs text-[#746d62] leading-relaxed">{rankPerks[rank.level - 1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSER APPLICATION FORM */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-none bg-white border border-[#A88A65]/40 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#806747]">
                {c.formKicker}
              </span>
              <h2 className="text-2xl font-bold text-[#24231f] mt-1">
                {c.formTitle}
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-sm bg-[#A88A65]/15 border border-[#A88A65] text-sm text-[#A88A65] flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>
                  {c.success}
                </span>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setSubmitError("");
                  const form = new FormData(e.currentTarget);
                  const payload = {
                    name: String(form.get("name") || "").trim(),
                    email: String(form.get("email") || "").trim(),
                    phone: String(form.get("phone") || "").trim(),
                    company: String(form.get("company") || "").trim(),
                    need: "Candidature closer B2B",
                    message: `Spécialité : ${String(form.get("specialty") || "Non précisée").trim()}`,
                  };
                  try {
                    const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    if (!response.ok)
                      throw new Error(data.error || c.error);
                    setSubmitted(true);
                  } catch (error) {
                    setSubmitError(
                      error instanceof Error ? error.message : c.error,
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={c.name}
                    className="px-4 py-3 rounded-sm bg-[#f1ece2] border border-white/15 text-sm text-[#24231f]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={c.phone}
                    className="px-4 py-3 rounded-sm bg-[#f1ece2] border border-white/15 text-sm text-[#24231f]"
                  />
                </div>
                <input
                  type="text"
                  name="company"
                  placeholder={c.company}
                  className="w-full px-4 py-3 rounded-sm bg-[#f1ece2] border border-white/15 text-sm text-[#24231f]"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={c.email}
                  className="w-full px-4 py-3 rounded-sm bg-[#f1ece2] border border-white/15 text-sm text-[#24231f]"
                />
                <input
                  type="text"
                  name="specialty"
                  required
                  placeholder={c.specialty}
                  className="w-full px-4 py-3 rounded-sm bg-[#f1ece2] border border-white/15 text-sm text-[#24231f]"
                />
                {submitError ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-sm bg-[#A88A65] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#9a784e] transition"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? c.sending : c.send}
                </button>
              </form>
            )}
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
