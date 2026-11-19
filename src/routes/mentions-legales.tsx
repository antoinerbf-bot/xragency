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
      { name: "description", content: "Informations légales, hébergement et protection des données de XR Agency." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const { t } = useLang();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main className="pt-28">
        <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,hsl(var(--primary)/.14),transparent_36%)]" />
          <div className="relative mx-auto max-w-5xl px-5 lg:px-10">
            <Parallax speed={-0.03}>
              <p className="label-mono text-[10px] uppercase tracking-[.25em] text-primary">XR AGENCY · LEGAL</p>
              <h1 className="display-serif mt-5 text-[clamp(3rem,8vw,7rem)] leading-[.86]">{t(UI.legalTitle)}</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t({ fr: "Informations légales, hébergement et protection des données.", en: "Legal information, hosting and data protection.", vi: "Thông tin pháp lý, lưu trữ và bảo vệ dữ liệu.", ar: "المعلومات القانونية والاستضافة وحماية البيانات.", ru: "Юридическая информация, хостинг и защита данных." })}
              </p>
            </Parallax>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                [Building2, "XR Agency · entité contractante à confirmer"],
                [ServerCog, "Vercel · Supabase"],
                [ShieldCheck, "RGPD · France"],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="label-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">{String(label)}</span>
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
                  <p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">{t(UI.legalCompany)}</p>
                  <h2 className="display-serif mt-4 text-3xl">XR Agency</h2>
                  <div className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                    <p>XR Agency est la marque commerciale présentée sur ce site. L'identité juridique de l'entité qui contracte, son adresse et ses numéros d'immatriculation doivent être confirmés avant toute commande.</p>
                    <p>Le devis et la facture définitifs doivent désigner le prestataire contractant et indiquer son régime fiscal applicable.</p>
                    <p><strong className="text-foreground">Contact :</strong> contact.xragency@gmail.com · +33 7 67 56 67 83</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="rounded-3xl border border-primary/25 bg-primary/[.045] p-7 shadow-[0_25px_70px_-45px_hsl(var(--primary)/.35)]">
                  <div className="flex items-center gap-3"><ServerCog className="h-5 w-5 text-primary" /><p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">{t(UI.legalHosting)}</p></div>
                  <h2 className="display-serif mt-4 text-3xl">Vercel & Supabase</h2>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{t(UI.legalHostingProvider)}</p>
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><p className="text-xs leading-5 text-muted-foreground">{t({ fr: "Le site public est servi par Vercel et les données CRM sont stockées dans Supabase. Les régions de traitement et les sous-traitants applicables dépendent de la configuration des comptes.", en: "The public website is served by Vercel and CRM data is stored in Supabase. Processing regions and applicable subprocessors depend on account configuration.", vi: "Website công khai được phục vụ bởi Vercel và dữ liệu CRM được lưu trữ trong Supabase. Khu vực xử lý và nhà cung cấp phụ thuộc vào cấu hình tài khoản.", ar: "يتم تقديم الموقع عبر Vercel وتخزين بيانات CRM في Supabase. تعتمد مناطق المعالجة والجهات الفرعية على إعدادات الحساب.", ru: "Публичный сайт обслуживается Vercel, данные CRM хранятся в Supabase. Регионы обработки и субподрядчики зависят от настроек аккаунтов." })}</p></div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="mt-5 rounded-3xl border border-border bg-card/60 p-7">
                <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><p className="label-mono text-[9px] uppercase tracking-[.2em] text-primary">{t(UI.legalPrivacy)}</p></div>
                <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{t(UI.legalPrivacyText)}</p>
                <a href="mailto:contact.xragency@gmail.com" className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs text-primary hover:bg-primary/10">contact.xragency@gmail.com</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Contact showFooter={false} />
    </div>
  );
}

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]