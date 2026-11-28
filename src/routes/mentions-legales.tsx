import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ServerCog, Mail, Building2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Parallax, Reveal } from "@/components/site/primitives";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales & RGPD — XR Agency" },
      {
        name: "description",
        content: "Informations légales, hébergement et protection des données de XR Agency.",
      },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const { t, lang } = useLang();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-[#F7F4EE] text-[#171613]">
      <Nav />
      <main className="pt-28">
        <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,hsl(var(--primary)/.14),transparent_36%)]" />
          <div className="relative mx-auto max-w-5xl px-5 lg:px-10">
            <Parallax speed={-0.03}>
              <p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">
                XR AGENCY · LEGAL
              </p>
              <h1 className="display-serif mt-5 text-[clamp(3rem,8vw,7rem)] leading-[.86]">
                {t(UI.legalTitle)}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t({
                  fr: "Informations légales, hébergement et protection des données.",
                  en: "Legal information, hosting and data protection.",
                  vi: "Thông tin pháp lý, lưu trữ và bảo vệ dữ liệu.",
                  ar: "المعلومات القانونية والاستضافة وحماية البيانات.",
                  ru: "Юридическая информация, хостинг и защита данных.",
                })}
              </p>
            </Parallax>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                [Building2, "XR Agency"],
                [
                  ServerCog,
                  t({
                    fr: "Hébergement à confirmer",
                    en: "Hosting to be confirmed",
                    vi: "Lưu trữ đang xác nhận",
                    ar: "الاستضافة قيد التأكيد",
                    ru: "Хостинг уточняется",
                  }),
                ],
                [
                  ShieldCheck,
                  t({
                    fr: "Données & confidentialité",
                    en: "Data & privacy",
                    vi: "Dữ liệu & bảo mật",
                    ar: "البيانات والخصوصية",
                    ru: "Данные и конфиденциальность",
                  }),
                ],
              ].map(([Icon, label], i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[#171613]/10 bg-white p-4"
                >
                  <Icon className="h-4 w-4 text-[#9E7F5A]" />
                  <span className="font-mono text-[10px] uppercase tracking-[.14em] text-[#57534B]">
                    {String(label)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 lg:px-10">
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="rounded-3xl border border-border bg-card/60 p-7">
                  <p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">
                    {t(UI.legalCompany)}
                  </p>
                  <h2 className="display-serif mt-4 text-3xl">XR Agency</h2>
                  <div className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
                    <p>
                      {t({
                        fr: "Les coordonnées de l’entité juridique éditrice, son immatriculation et son adresse doivent être confirmées avant publication de cette page.",
                        en: "The publishing legal entity, registration details and address must be confirmed before this page is published.",
                        vi: "Pháp nhân xuất bản, thông tin đăng ký và địa chỉ cần được xác nhận trước khi công bố trang này.",
                        ar: "يجب تأكيد الكيان القانوني الناشر وبيانات التسجيل والعنوان قبل نشر هذه الصفحة.",
                        ru: "Юридическое лицо, регистрационные данные и адрес необходимо подтвердить до публикации этой страницы.",
                      })}
                    </p>
                    <p>
                      <strong className="text-foreground">{t(UI.legalPrivacy)} :</strong>{" "}
                      contact.xragency@gmail.com
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="rounded-3xl border border-primary/25 bg-primary/[.045] p-7 shadow-[0_25px_70px_-45px_hsl(var(--primary)/.35)]">
                  <div className="flex items-center gap-3">
                    <ServerCog className="h-5 w-5 text-primary" />
                    <p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">
                      {t(UI.legalHosting)}
                    </p>
                  </div>
                  <h2 className="display-serif mt-4 text-3xl">
                    {t({
                      fr: "À confirmer",
                      en: "To be confirmed",
                      vi: "Đang xác nhận",
                      ar: "قيد التأكيد",
                      ru: "Уточняется",
                    })}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {t({
                      fr: "Le prestataire et la localisation de l’hébergement doivent être confirmés avant publication.",
                      en: "The hosting provider and hosting location must be confirmed before publication.",
                      vi: "Cần xác nhận nhà cung cấp và vị trí máy chủ trước khi công bố.",
                      ar: "يجب تأكيد مزود الاستضافة وموقعها قبل النشر.",
                      ru: "Поставщика и местоположение хостинга необходимо подтвердить до публикации.",
                    })}
                  </p>
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-xs leading-5 text-muted-foreground">
                      {t({
                        fr: "Les modalités d’hébergement et de traitement des données doivent être documentées et validées avant publication.",
                        en: "The hosting provider and hosting location must be confirmed before publication. Data processing details will be documented once confirmed.",
                        vi: "Nhà cung cấp và vị trí lưu trữ cần được xác nhận trước khi công bố. Việc xử lý dữ liệu sẽ được ghi rõ sau khi xác nhận.",
                        ar: "يجب تأكيد مزود الاستضافة وموقعها قبل النشر، كما يجب توثيق تفاصيل معالجة البيانات بعد التحقق منها.",
                        ru: "Поставщика и местоположение хостинга необходимо подтвердить до публикации. Обработка данных будет описана после проверки.",
                      })}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="mt-5 rounded-3xl border border-border bg-card/60 p-7">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">
                    {t(UI.legalPrivacy)}
                  </p>
                </div>
                <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
                  {t(UI.legalPrivacyText)}
                </p>
                <a
                  href="mailto:contact.xragency@gmail.com"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs text-primary hover:bg-primary/10"
                >
                  contact.xragency@gmail.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Contact showFooter={false} />
    </div>
  );
}
