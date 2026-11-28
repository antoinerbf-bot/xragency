import {
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Sparkles,
  Building2,
  Lock,
  Award,
  HeartHandshake,
} from "lucide-react";
import { Parallax, Reveal } from "./primitives";
import { useLang, type Lang } from "@/lib/i18n";
import { FUNNEL_UI } from "@/lib/funnel-i18n";

export function ProofAndGuarantees() {
  const { lang } = useLang();
  const currentLang = (lang in FUNNEL_UI.guarantees.title ? lang : "fr") as Lang;
  const t = FUNNEL_UI.guarantees;

  const ICONS = [ShieldCheck, CheckCircle2, KeyRound, Sparkles];

  return (
    <section className="xr-section relative overflow-hidden border-b xr-line py-20 sm:py-28 lg:py-36 bg-[var(--xr-bg)]">
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.02}>
          <Reveal>
            <div className="sec-head max-w-4xl">
              <div className="sec-head-line">
                <div className="sec-head-dash" />
                <span className="mono-nex text-white/70">
                  <b className="text-[#c5a880] font-bold">06</b> / GARANTIES CONTRACTUELLES &
                  STATUTS
                </span>
              </div>
              <h2 className="h-nex text-3xl sm:text-5xl lg:text-[3.6rem] text-white">
                {t.title[currentLang] ?? t.title.fr}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                {t.subtitle[currentLang] ?? t.subtitle.fr}
              </p>
            </div>
          </Reveal>
        </Parallax>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, idx) => {
            const Icon = ICONS[idx] || ShieldCheck;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <div className="xr-depth-card flex h-full flex-col justify-between rounded-[2rem] border xr-line bg-[var(--xr-surface)] p-6 sm:p-7 backdrop-blur-xl transition hover:-translate-y-1">
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--xr-accent)]/20 bg-[var(--xr-accent)]/10 text-[var(--xr-accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mt-6 block font-mono text-[8px] font-semibold tracking-wider text-[var(--xr-muted-2)]">
                      ENGAGEMENT 0{idx + 1}
                    </span>
                    <h3 className="mt-2 text-base font-bold leading-snug text-[var(--xr-ink)]">
                      {item.title[currentLang] ?? item.title.fr}
                    </h3>
                    <p className="mt-3 text-xs leading-6 xr-muted">
                      {item.desc[currentLang] ?? item.desc.fr}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t xr-line flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="label-mono text-[7px] text-emerald-400 font-medium">
                      GARANTI CONTRACTUELLEMENT
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Legal & Security Trust Strip */}
        <div className="mt-12 rounded-[2rem] border xr-line bg-[var(--xr-surface-strong)]/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid gap-6 sm:grid-cols-3 sm:items-center text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x xr-line">
            <div className="sm:px-6 first:pl-0">
              <span className="label-mono text-[7px] xr-muted-2 block mb-1.5 flex items-center gap-1.5 justify-center sm:justify-start">
                <Building2 className="h-3 w-3" />
                CONTACT XR AGENCY
              </span>
              <p className="text-xs font-semibold">XR Agency</p>
              <p className="text-[10px] xr-muted mt-0.5">contact.xragency@gmail.com</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="label-mono text-[7px] xr-muted-2 block mb-1.5 flex items-center gap-1.5 justify-center sm:justify-start">
                <Lock className="h-3 w-3" />
                PAIEMENTS & SÉCURITÉ
              </span>
              <p className="text-xs font-semibold">
                Paiement selon les modalités validées au devis
              </p>
              <p className="text-[10px] xr-muted mt-0.5">
                Documents et échéances précisés contractuellement
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="label-mono text-[7px] xr-muted-2 block mb-1.5 flex items-center gap-1.5 justify-center sm:justify-start">
                <HeartHandshake className="h-3 w-3" />
                ACCOMPAGNEMENT DÉDIÉ
              </span>
              <p className="text-xs font-semibold">Équipe XR Agency</p>
              <p className="text-[10px] xr-muted mt-0.5">
                +33 7 67 56 67 83 · contact.xragency@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
