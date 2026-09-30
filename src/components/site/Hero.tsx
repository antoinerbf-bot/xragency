import { ArrowRight, FileImage, Sparkles, Layers3, Search, Palette, MapPinned } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";

const heroPanels = [
  { icon: Layers3, code: "01", label: { fr: "SITE WEB", en: "WEBSITE", vi: "WEBSITE", ar: "موقع", ru: "САЙТ" }, metric: { fr: "UX · UI · CONVERSION", en: "UX · UI · CONVERSION", vi: "UX · UI · CHUYỂN ĐỔI", ar: "UX · UI · تحويل", ru: "UX · UI · КОНВЕРСИЯ" } },
  { icon: Palette, code: "02", label: { fr: "IDENTITÉ", en: "IDENTITY", vi: "NHẬN DIỆN", ar: "هوية", ru: "АЙДЕНТИКА" }, metric: { fr: "POSITIONNEMENT · SYSTÈME", en: "POSITIONING · SYSTEM", vi: "ĐỊNH VỊ · HỆ THỐNG", ar: "تموضع · نظام", ru: "ПОЗИЦИОНИРОВАНИЕ · СИСТЕМА" } },
  { icon: Search, code: "03", label: { fr: "SEO", en: "SEO", vi: "SEO", ar: "SEO", ru: "SEO" }, metric: { fr: "VISIBILITÉ · DEMANDE", en: "VISIBILITY · DEMAND", vi: "HIỂN THỊ · NHU CẦU", ar: "ظهور · طلب", ru: "ВИДИМОСТЬ · СПРОС" } },
  { icon: MapPinned, code: "04", label: { fr: "LOCAL", en: "LOCAL", vi: "ĐỊA PHƯƠNG", ar: "محلي", ru: "ЛОКАЛЬНЫЙ" }, metric: { fr: "GOOGLE · ZONE · AVIS", en: "GOOGLE · AREA · REVIEWS", vi: "GOOGLE · KHU VỰC · ĐÁNH GIÁ", ar: "GOOGLE · منطقة · تقييمات", ru: "GOOGLE · ЗОНА · ОТЗЫВЫ" } },
];

export function Hero() {
  const { t } = useLang();
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite.");

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#08090b] text-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(214,164,93,.18),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(93,111,214,.14),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[52%] top-[8%] h-[560px] w-[560px] rounded-full border border-white/[.06]" />
        <div className="absolute left-[58%] top-[17%] h-[380px] w-[380px] rounded-full border border-primary/15" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid min-h-[calc(100dvh-5rem)] items-center gap-12 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-24">
          <Parallax speed={-0.018}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-white/[.04] px-3.5 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="label-mono text-[9px] font-semibold tracking-[.2em] text-primary">{t(UI.heroKicker)}</span>
              </div>
              <h1 className="display-serif mt-7 text-[clamp(3.5rem,7vw,7.5rem)] leading-[.82] tracking-[-.055em]">
                {t({ fr: "Une présence digitale", en: "A digital presence", vi: "Một hiện diện số", ar: "حضور رقمي", ru: "Цифровое присутствие" })}
                <br /><em className="text-primary">{t({ fr: "qui mérite", en: "that deserves", vi: "xứng đáng với", ar: "يستحق", ru: "достойное" })}</em>
                <br />{t({ fr: "votre ambition.", en: "your ambition.", vi: "tham vọng của bạn.", ar: "طموحكم.", ru: "ваших амбиций." })}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                {t({ fr: "XRAGENCY conçoit des sites, identités et systèmes de visibilité qui donnent une vraie raison de vous choisir.", en: "XRAGENCY creates websites, identities and visibility systems that give people a real reason to choose you.", vi: "XRAGENCY xây dựng website, nhận diện và hệ thống hiển thị giúp khách hàng có lý do rõ ràng để chọn bạn.", ar: "تصمم XRAGENCY المواقع والهويات وأنظمة الظهور التي تمنح العملاء سببًا واضحًا لاختيارك.", ru: "XRAGENCY создаёт сайты, айдентику и системы видимости, которые дают клиентам реальную причину выбрать вас." })}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <EmberButton href="#quote" className="justify-center rounded-full px-7 py-4 shadow-[0_15px_50px_rgba(214,164,93,.18)]">{t({ fr: "Construire mon projet", en: "Build my project", vi: "Xây dựng dự án", ar: "ابدأ مشروعي", ru: "Создать проект" })}<ArrowRight className="h-4 w-4" /></EmberButton>
                <a href={mockupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-primary transition hover:-translate-y-0.5">
                  <FileImage className="h-3.5 w-3.5" />{t({ fr: "Demander une maquette gratuite", en: "Request a free mockup", vi: "Yêu cầu mockup miễn phí", ar: "اطلب نموذجًا مجانيًا", ru: "Запросить бесплатный макет" })}
                </a>
                <a href="#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-7 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-white/80 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/30">
                  <Search className="h-3.5 w-3.5 text-primary" />{t({ fr: "Analyser mon site", en: "Audit my website", vi: "Phân tích website", ar: "حلل موقعي", ru: "Аудит сайта" })}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-white/45">
                <span className="label-mono text-[8px] tracking-[.18em]">WEB · BRAND · SEO · LOCAL · SOCIAL · WEBCARE</span><span className="h-px w-8 bg-white/20" />
                <div className="flex gap-1.5">{LANGS.map(l => <span key={l.code} title={l.label} className="text-sm">{l.flag}</span>)}</div>
              </div>
            </div>
          </Parallax>

          <Parallax speed={0.035}>
            <div className="relative mx-auto w-full max-w-[720px]">
              <div className="absolute -inset-10 rounded-[4rem] bg-primary/[.07] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1014] p-3 shadow-[0_50px_140px_-55px_rgba(0,0,0,.95)]">
                <div className="rounded-[2rem] border border-white/10 bg-[#11151a] p-5 sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div><span className="label-mono text-[8px] tracking-[.24em] text-primary">XRAGENCY · DIGITAL SYSTEM</span><p className="mt-2 display-serif text-2xl sm:text-3xl">De la stratégie à la mise en ligne.</p></div>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {heroPanels.map(({ icon: Icon, code, label, metric }, index) => (
                      <div key={code} className="group rounded-[1.4rem] border border-white/10 bg-white/[.035] p-5 transition duration-500 hover:-translate-y-1 hover:border-primary/35">
                        <div className="flex items-center justify-between"><span className="label-mono text-[8px] tracking-[.2em] text-white/35">{code}</span><Icon className="h-4 w-4 text-primary" /></div>
                        <p className="mt-10 text-sm font-semibold text-white">{t(label)}</p><p className="mt-2 text-[9px] leading-4 tracking-[.08em] text-white/40">{t(metric)}</p>
                        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: (58 + index * 11) + "%" }} /></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-[1.4rem] border border-primary/20 bg-primary/[.07] px-5 py-4">
                    <span className="label-mono text-[8px] tracking-[.18em] text-primary">{t({ fr: "UNE DIRECTION · UN SYSTÈME", en: "ONE DIRECTION · ONE SYSTEM", vi: "MỘT ĐỊNH HƯỚNG · MỘT HỆ THỐNG", ar: "اتجاه واحد · نظام واحد", ru: "ОДНО НАПРАВЛЕНИЕ · ОДНА СИСТЕМА" })}</span><ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
              <a href={mockupUrl} target="_blank" rel="noreferrer" className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-primary/30 bg-[#0b0d10]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
                <FileImage className="h-4 w-4 text-primary" /><span><b className="block text-[9px] uppercase tracking-[.12em]">{t({ fr: "Maquette gratuite", en: "Free mockup", vi: "Mockup miễn phí", ar: "نموذج مجاني", ru: "Бесплатный макет" })}</b><small className="text-[8px] text-white/45">{t({ fr: "Sans engagement", en: "No commitment", vi: "Không cam kết", ar: "بدون التزام", ru: "Без обязательств" })}</small></span>
              </a>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
