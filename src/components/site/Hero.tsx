
import { useEffect, useRef, useState } from "react";
import { Sparkles, ShieldCheck, FileImage, Search, ArrowUpRight } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { EmberButton, Parallax } from "./primitives";
import { XR_HERO_PHOTO } from "@/lib/photography";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1600, startDelay = 500) {
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    setValue(0);
    const timeout = setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);

  return value;
}

/* ── Stat card with animated counter ── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const count = useCountUp(value, 1600, delay);
  return (
    <div
      className="bg-card/75 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:bg-accent/40 hover:-translate-y-0.5 cursor-default"
      style={{ animation: `ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}
    >
      <dt className="display-serif text-2xl text-primary sm:text-3xl font-bold tracking-tight">
        {count}
        {suffix ?? ""}
      </dt>
      <dd className="label-mono mt-1 text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="grain relative min-h-[92dvh] overflow-hidden bg-background pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,hsl(var(--primary)/.18),transparent_30%),linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--card))_52%,hsl(var(--background))_100%)]" />
        <div className="absolute inset-0 opacity-[.22] [background-image:linear-gradient(hsl(var(--foreground)/.07)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -right-32 top-[-10%] h-[560px] w-[560px] rounded-full border border-primary/15 bg-primary/[.04] shadow-[0_0_180px_hsl(var(--primary)/.10)]" />
        <div className="absolute right-[8%] top-[17%] h-2 w-2 rounded-full bg-primary shadow-[0_0_35px_hsl(var(--primary)/.9)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(92dvh-4.75rem)] max-w-7xl flex-col justify-between px-6 lg:px-10">
        <div className="grid items-center gap-7 py-5 lg:grid-cols-12 lg:py-7">
          <Parallax speed={-0.03} className="relative z-10 lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5"
              style={{ animation: "ember-rise 0.75s cubic-bezier(0.16,1,0.3,1) 120ms both" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="label-mono text-xs text-primary font-medium">
                {t(UI.heroKicker)}
              </span>
            </div>

            <h1
              className="display-serif mt-5 text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.96] tracking-tight"
              style={{ animation: "kinetic-in 0.95s cubic-bezier(0.16,1,0.3,1) 160ms both" }}
            >
              {t(UI.heroTitle1)}
              <br />
              <em className="not-italic italic text-primary">{t(UI.heroTitleAccent)}</em>{" "}
              {t(UI.heroTitle2)}
            </h1>

            <div
              className="mt-6 max-w-xl"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.heroLead)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80 font-mono">
                {t(UI.heroMeta)}
              </p>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 400ms both" }}
            >
              <div className="grid w-full max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3 [perspective:900px]">
                <div className="group sm:-translate-y-1 sm:hover:-translate-y-2 transition-transform duration-500">
                  <EmberButton href="#quote" className="relative w-full justify-center overflow-hidden rounded-2xl py-3.5 shadow-[0_18px_45px_-24px_rgba(0,0,0,.8)]">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">{t({ fr: "Faire mon devis gratuit", en: "Get my free quote", vi: "Nhận báo giá miễn phí", ar: "احصل على عرض سعر مجاني", ru: "Получить бесплатный расчёт" })} <ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </EmberButton>
                </div>
                <a href={CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €). Je vais vous envoyer mon logo, les éléments que j'ai déjà et le lien de mon site si j'en ai un. Merci de me dire où les envoyer.")} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-card/60 px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-2">
                  <span className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-primary/15 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2"><FileImage className="h-4 w-4 text-primary" /><span><b className="block text-[10px] uppercase tracking-[.12em]">{t({ fr: "Maquette gratuite", en: "Free mockup", vi: "Mockup miễn phí", ar: "نموذج مجاني", ru: "Бесплатный макет" })}</b><small className="mt-0.5 block text-[9px] text-muted-foreground">{t({ fr: "Valeur 200 € · sans engagement", en: "€200 value · no commitment", vi: "Giá trị 200 € · không ràng buộc", ar: "بقيمة 200 € · دون التزام", ru: "Ценность 200 € · без обязательств" })}</small></span></span>
                </a>
                <a href="#audit" className="group relative overflow-hidden rounded-2xl border border-primary/45 bg-primary/[.07] px-4 py-3 text-left backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary hover:bg-primary/[.11] hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,.7)] sm:translate-y-1">
                  <span className="absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-primary/10 blur-xl transition group-hover:scale-150" />
                  <span className="relative flex items-center gap-2"><Search className="h-4 w-4 text-primary" /><span><b className="block text-[10px] uppercase tracking-[.12em]">{t({ fr: "Lancer mon analyse personnalisée", en: "Start my tailored analysis", vi: "Bắt đầu phân tích cá nhân hóa", ar: "ابدأ تحليلي المخصص", ru: "Запустить персональный анализ" })}</b><small className="mt-0.5 block text-[9px] text-muted-foreground">{t({ fr: "Instantanée · PDF + recommandations", en: "Instant · PDF + recommendations", vi: "Tức thì · PDF + đề xuất", ar: "فوري · PDF + توصيات", ru: "Мгновенно · PDF + рекомендации" })}</small></span></span>
                </a>
              </div>
              <span className="label-mono hidden text-xs text-muted-foreground/80 sm:inline">{t(UI.intelDuration)}</span>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
              style={{ animation: "ember-rise 0.85s cubic-bezier(0.16,1,0.3,1) 500ms both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <p className="label-mono text-[11px] text-muted-foreground/70">
                {t(UI.ctaReassurance)}
              </p>
            </div>
          </Parallax>

          <div className="relative mt-8 block lg:col-span-5 lg:mt-0" aria-hidden="true">
            <Parallax speed={-0.045}>
              <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-border/80 bg-card/75 p-3 shadow-[0_35px_100px_-45px_rgba(0,0,0,.28)] backdrop-blur-xl">
                <div className="relative aspect-[16/12] overflow-hidden rounded-[1.5rem] bg-[#0b0e12]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(214,164,93,.25),transparent_30%),linear-gradient(135deg,#171b22,#080a0d)]"/>
                  <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]"/>
                  <div className="absolute left-[8%] top-[13%] w-[84%] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                    <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-[#f5f5f3] px-3"><i className="h-2 w-2 rounded-full bg-black/15"/><i className="h-2 w-2 rounded-full bg-black/15"/><i className="h-2 w-2 rounded-full bg-black/15"/><span className="ml-2 h-2 w-32 rounded-full bg-black/8"/></div>
                    <div className="grid min-h-[220px] grid-cols-[1.1fr_.9fr] gap-4 p-5">
                      <div className="flex flex-col justify-center"><span className="text-[8px] font-semibold tracking-[.25em] text-[#a2763d]">XR / DIGITAL CRAFT</span><h3 className="mt-3 text-3xl font-serif leading-none text-black">L’Art du<br/><em className="text-[#a2763d]">Digital</em></h3><p className="mt-3 max-w-[180px] text-[8px] leading-4 text-black/45">Identity · Web · Visibility · Growth</p><div className="mt-5 h-7 w-24 rounded-full bg-black"/></div>
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#d8cfc1] via-[#b7c0c6] to-[#747d84]"><div className="absolute inset-5 rounded-lg border border-white/50"/><div className="absolute bottom-5 left-5 h-2 w-20 rounded-full bg-white/80"/></div>
                    </div>
                  </div>
                  <div className="absolute bottom-[8%] left-[8%] rounded-xl border border-white/15 bg-black/65 px-4 py-3 backdrop-blur-xl">
                    <span className="label-mono text-[8px] tracking-[.22em] text-white/45">XR AGENCY · MMXXVI</span>
                    <p className="mt-1 text-sm font-medium text-white">Digital sur mesure</p>
                  </div>
                  <div className="absolute right-[9%] bottom-[9%] h-20 w-20 rounded-full border border-[#d6a45d]/45"/>
                  <div className="absolute right-[14%] bottom-[14%] h-2 w-2 rounded-full bg-[#d6a45d] shadow-[0_0_25px_rgba(214,164,93,.9)]"/>
                </div>
              </div>
            </Parallax>
          </div>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4 shadow-sm">
            <AnimatedStat value={500} suffix="+" label={t(UI.statProjects)} delay={550} />
            <AnimatedStat value={8} suffix="" label={t(UI.statYears)} delay={630} />
            <AnimatedStat value={90} suffix="%" label={t(UI.statSatisfaction)} delay={710} />
            <AnimatedStat value={5} suffix="" label={t(UI.statResponse)} delay={790} />
          </dl>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/60 pt-4"><span className="label-mono text-[9px] text-muted-foreground/60">{t({ fr: "Langues de service", en: "Service languages", vi: "Ngôn ngữ dịch vụ", ar: "لغات الخدمة", ru: "Языки обслуживания" })}</span><div className="flex items-center gap-1.5" aria-label="Français, anglais, vietnamien, arabe et russe">{LANGS.map((l) => <span key={l.code} title={l.label} className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card/70 text-sm shadow-sm">{l.flag}</span>)}</div></div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/60 py-4">
            <span className="label-mono text-xs text-muted-foreground/70">{t({ fr: "XR Intelligence · Analyse digitale · Devis sur mesure", en: "XR Intelligence · Digital analysis · Tailored quote", vi: "XR Intelligence · Phân tích số · Báo giá riêng", ar: "XR Intelligence · تحليل رقمي · عرض مخصص", ru: "XR Intelligence · Цифровой анализ · Индивидуальный расчёт" })}</span>
            <span className="label-mono text-xs text-primary">01 · Analyse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
