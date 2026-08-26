import { useState } from "react";
import {
  Sparkles,
  Compass,
  TrendingUp,
  Palette,
  Cpu,
  Bot,
  BarChart3,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT } from "@/lib/content";
import { Parallax, Reveal, EmberButton } from "./primitives";
import { cn } from "@/lib/utils";

// Real, authentic, high-end photography of creative direction & workshops
const GALLERY: { src: string; caption: typeof UI.galleryCaption1; speed: number }[] = [
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=85",
    caption: UI.galleryCaption1,
    speed: 0.04,
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
    caption: UI.galleryCaption2,
    speed: -0.03,
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85",
    caption: UI.galleryCaption3,
    speed: 0.04,
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
    caption: UI.galleryCaption4,
    speed: -0.03,
  },
];

const ADVANTAGES = [
  {
    icon: Zap,
    title: {
      fr: "Vitesse d'Exécution Record",
      en: "Record Speed of Execution",
      vi: "Tốc độ triển khai kỷ lục",
    },
    desc: {
      fr: "Votre projet opérationnel en 7 à 14 jours, sans délais d'attente ni réunions superflues.",
      en: "Your project live in 7 to 14 days, with zero onboarding delays or endless meetings.",
      vi: "Dự án vận hành trong 7 đến 14 ngày, không chậm trễ hay họp hành rườm rà.",
    },
    tag: "7 à 14 jours",
  },
  {
    icon: Layers,
    title: {
      fr: "Collectif Senior 4-en-1",
      en: "Senior 4-in-1 Collective",
      vi: "Đội ngũ Cấp cao 4-trong-1",
    },
    desc: {
      fr: "Directeur Artistique, Développeur Cloud, Expert SEO et Ingénieur IA dédiés à votre réussite.",
      en: "Art Director, Cloud Developer, SEO Specialist and AI Engineer dedicated to your success.",
      vi: "Chỉ đạo nghệ thuật, Lập trình viên Cloud, Chuyên gia SEO và Kỹ sư AI đồng hành cùng bạn.",
    },
    tag: "DA · DEV · SEO · IA",
  },
  {
    icon: ShieldCheck,
    title: {
      fr: "Garantie de Résultat & Rigueur",
      en: "Guaranteed Results & Rigor",
      vi: "Cam kết kết quả & Chuẩn mực",
    },
    desc: {
      fr: "Engagements contractuels fermes, Google Maps TOP 3 garanti et PageSpeed 100/100.",
      en: "Strict contractual commitments, guaranteed Google Maps TOP 3 and 100/100 PageSpeed.",
      vi: "Cam kết hợp đồng rõ ràng, đảm bảo TOP 3 Google Maps và PageSpeed 100/100.",
    },
    tag: "100% Garanti",
  },
  {
    icon: BarChart3,
    title: {
      fr: "Rentabilité & Zéro Charge",
      en: "Max ROI & Zero Payroll Tax",
      vi: "Tối đa ROI & Không gánh nặng",
    },
    desc: {
      fr: "Une formule agile sans engagement lourd : vous n'investissez que dans la croissance réelle.",
      en: "Agile, flexible engagement model: you only invest in tangible business growth.",
      vi: "Mô hình linh hoạt không ràng buộc: bạn chỉ đầu tư vào sự tăng trưởng thực chất.",
    },
    tag: "+3,2x ROI moyen",
  },
];

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Subtle ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="label-mono text-xs uppercase tracking-widest">
                  {t(UI.aboutKicker)}
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="display-serif mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                {t(UI.aboutHeading)}{" "}
                <em className="italic text-primary">{t(UI.aboutHeadingAccent)}</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t(UI.aboutLead)}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6 flex items-center gap-4 border-t border-border/70 pt-6">
                <div className="flex -space-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-xs font-bold text-primary">
                    XR
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-semibold text-foreground">
                    DA
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-semibold text-foreground">
                    DEV
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground">
                    IA
                  </div>
                </div>
                <p className="label-mono text-xs text-muted-foreground">
                  {t(UI.aboutTeamLabel)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 1. Comparison: Équipe Salariée Interne vs Hub Externe XR Agency */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <div className="rounded-3xl border border-border/80 bg-accent/15 p-5 sm:p-10 shadow-xl">
              <div className="text-center">
                <span className="label-mono text-xs uppercase tracking-widest text-primary">
                  {t(UI.aboutChoiceKicker)}
                </span>
                <h3 className="display-serif mt-3 text-3xl sm:text-4xl text-foreground">
                  {t(UI.aboutChoiceTitle)}
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                  {t(UI.aboutChoiceLead)}
                </p>
              </div>

              <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 md:grid-cols-2">
                {/* Option Interne */}
                <div className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8 opacity-85 transition-opacity hover:opacity-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-border/60 pb-4">
                      <span className="label-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {t(UI.aboutTraditional)}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">{t(UI.aboutInHouse)}</span>
                    </div>
                    <h4 className="display-serif mt-5 text-2xl text-foreground">
                      {t(UI.aboutRecruitTitle)}
                    </h4>
                    <p className="display-serif mt-3 text-3xl text-muted-foreground/80">
                      ~18 500 € <span className="label-mono text-xs">{t(UI.aboutRecruitCost)}</span>
                    </p>
                    <ul className="mt-6 space-y-3.5 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold shrink-0">✕</span> {t(UI.aboutCon1)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold shrink-0">✕</span> {t(UI.aboutCon2)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold shrink-0">✕</span> {t(UI.aboutCon3)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold shrink-0">✕</span> {t(UI.aboutCon4)}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border/40">
                    <span className="label-mono text-[11px] text-muted-foreground/60">
                      Inertie managériale & coûts fixes élevés
                    </span>
                  </div>
                </div>

                {/* Option XR Agency */}
                <div className="relative rounded-3xl border-2 border-primary bg-card p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
                  <span className="label-mono absolute -top-3.5 right-8 rounded-full bg-primary px-3.5 py-1 text-xs text-primary-foreground font-semibold shadow-md">
                    {t(UI.aboutRecommended)}
                  </span>
                  <div>
                    <div className="flex items-center justify-between border-b border-border/60 pb-4">
                      <span className="label-mono text-xs text-primary font-semibold uppercase tracking-wider">
                        {t(UI.aboutExternalFormula)}
                      </span>
                      <span className="label-mono text-xs text-primary">{t(UI.aboutXrLabel)}</span>
                    </div>
                    <h4 className="display-serif mt-5 text-2xl text-foreground">
                      {t(UI.aboutDigitalTitle)}
                    </h4>
                    <p className="display-serif mt-3 text-3xl text-primary">
                      Dès 499 €{" "}
                      <span className="label-mono text-xs text-muted-foreground font-normal">
                        {t(UI.aboutFromLabel)}
                      </span>
                    </p>
                    <ul className="mt-6 space-y-3.5 text-xs text-foreground">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {t(UI.aboutPro1)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {t(UI.aboutPro2)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {t(UI.aboutPro3)}
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {t(UI.aboutPro4)}
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <EmberButton href="#services" className="w-full justify-center">
                      {t({
                        fr: "Explorer nos solutions & tarifs",
                        en: "Explore our solutions & pricing",
                        vi: "Khám phá giải pháp & bảng giá",
                      })}
                    </EmberButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. 4 Direct Advantages Grid */}
        <div className="mt-14 sm:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((adv, idx) => {
            const IconComp = adv.icon;
            return (
              <Reveal key={idx} delay={idx * 70}>
                <div className="surface-plate h-full rounded-3xl border border-border bg-card/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:bg-card">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="label-mono text-[10px] rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                        {adv.tag}
                      </span>
                    </div>
                    <h4 className="display-serif mt-5 text-lg text-foreground">
                      {t(adv.title)}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {t(adv.desc)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 3. Authentic Photo Gallery (Craft, Workshops & High-End Design) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 items-end gap-4 sm:gap-6 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <Parallax speed={g.speed}>
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                  <img
                    src={g.src}
                    alt={t(g.caption)}
                    loading="lazy"
                    className="h-[13rem] sm:h-[17rem] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent p-4">
                    <p className="label-mono text-[11px] text-foreground font-medium">
                      {t(g.caption)}
                    </p>
                  </div>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
