import { ArrowRight, BriefcaseBusiness, Globe2, Sparkles, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const COPY = {
  eyebrow: { fr: "XR / AFFILIATION & RECRUTEMENT", en: "XR / AFFILIATES & CAREERS", vi: "XR / ĐỐI TÁC & TUYỂN DỤNG" },
  title: { fr: "10% à 20% de commission. Recrutement mondial.", en: "10% to 20% commission. Global recruitment.", vi: "Hoa hồng 10% đến 20%. Tuyển dụng toàn cầu." },
  text: {
    fr: "Recommandez nos services et gagnez 10% (jusqu'à 20% sur grands comptes) du CA généré, déductible sur vos offres ou versé immédiatement. Nous recrutons également des commerciaux indépendants multilingues dans le monde entier.",
    en: "Refer our services and earn 10% (up to 20% on enterprise) commission, deductible or paid directly. We also hire multilingual independent sales partners worldwide.",
    vi: "Giới thiệu dịch vụ và nhận hoa hồng 10% đến 20%. Chúng tôi cũng đang tuyển dụng nhân viên kinh doanh đa ngôn ngữ trên toàn thế giới.",
  },
  cta: { fr: "Découvrir le programme & Postuler", en: "Explore program & Apply", vi: "Khám phá chương trình & Ứng tuyển" },
};

export function RecruitmentTeaser() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden border-y border-border/70 bg-foreground text-background">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 78% 20%, rgba(255,255,255,.14), transparent 28%), radial-gradient(circle at 12% 80%, rgba(255,255,255,.08), transparent 30%)" }} />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_.85fr] lg:px-12 lg:items-end">
        <div>
          <span className="label-mono text-[8px] tracking-[.32em] opacity-45">{t(COPY.eyebrow)}</span>
          <h2 className="display-serif mt-5 max-w-4xl text-[clamp(3.4rem,7vw,7rem)] leading-[.8] tracking-[-.06em]">{t(COPY.title)}</h2>
          <p className="mt-7 max-w-2xl text-sm leading-6 opacity-60 sm:text-base">{t(COPY.text)}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [Globe2, "Remote", "International"],
            [Sparkles, "Creative", "Design · content"],
            [Users, "Growth", "Sales · strategy"],
          ].map(([Icon, a, b]) => {
            const I = Icon as typeof Globe2;
            return <div key={a as string} className="flex items-center gap-4 rounded-2xl border border-background/15 bg-background/[.06] p-4 backdrop-blur-xl"><I className="h-4 w-4 opacity-65" /><div><span className="block text-sm font-semibold">{a as string}</span><span className="label-mono text-[7px] tracking-[.16em] opacity-40">{b as string}</span></div></div>;
          })}
        </div>
        <Link to="/recrutement" className="group inline-flex w-fit items-center gap-3 rounded-full bg-background px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground">
          {t(COPY.cta)} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export const RECRUITMENT_EMAIL = CONTACT.email;
