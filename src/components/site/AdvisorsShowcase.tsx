import React from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageSquare,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Camera,
  ShieldCheck,
} from "lucide-react";
import {
  XR_ADVISORS,
  type XRAdvisor,
  buildAdvisorWhatsAppUrl,
} from "../../lib/xr-advisors";

interface AdvisorContextualBannerProps {
  advisor: XRAdvisor;
  serviceContextLabel?: string;
}

export function AdvisorContextualBanner({
  advisor,
  serviceContextLabel,
}: AdvisorContextualBannerProps) {
  return (
    <div
      className="rounded-3xl bg-[#0F172A] border border-[#D4AF37]/40 p-6 sm:p-8 text-[#F8FAFC] shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative overflow-hidden"
      data-testid={`advisor-banner-${advisor.id}`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* 85mm Studio Natural Light Portrait with subtle film grain */}
          <div className="relative w-24 h-28 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 bg-[#080B10] shrink-0 shadow-xl">
            <img
              src={advisor.portraitUrl}
              alt={`${advisor.firstName} — ${advisor.role} XR Agency`}
              className="w-full h-full object-cover object-top"
              style={{ filter: advisor.studioFilter }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-1.5 left-2 text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] bg-[#080B10]/90 px-1.5 py-0.5 rounded">
              85mm f/1.4
            </span>
          </div>

          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40">
                INTERLOCUTEUR DÉDIÉ • {advisor.firstName.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                {advisor.kpiHighlight}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {advisor.firstName} —{" "}
              <span className="text-[#D4AF37]">{advisor.role}</span>
            </h3>

            <p className="text-sm text-slate-200 italic leading-relaxed">
              « {advisor.punchline} »
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              {advisor.specialtyDetail}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full lg:w-auto">
          <a
            href={buildAdvisorWhatsAppUrl(advisor, serviceContextLabel)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#14d496] transition shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            <MessageSquare className="w-4 h-4" />
            Parler à {advisor.firstName} sur WhatsApp
          </a>
          <Link
            to="/contact"
            className="px-5 py-3 rounded-xl bg-[#080B10] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#080B10] transition"
          >
            Planifier un point avec {advisor.firstName}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdvisorsShowcase() {
  return (
    <section
      id="equipe-commerciale"
      className="py-24 bg-[#080B10] text-[#F8FAFC] border-t border-white/10"
      data-testid="advisors-showcase-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#D4AF37]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              <Camera className="w-3.5 h-3.5" />
              PRÉSENCE HUMAINE & RÉASSURANCE • STUDIO 85MM LUMIÈRE NATURELLE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Vos 7 experts dédiés chez{" "}
              <span className="text-[#D4AF37]">XR Agency</span>.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Zéro avatar 3D lissé, zéro centre d'appel anonyme. Chaque pôle de
              performance est dirigé par un spécialiste identifié qui signe ses
              engagements, pilote votre ROI et répond en direct.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#10B981] shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">
                Attribution Contextuelle Directe
              </div>
              <div className="text-slate-400">
                Martin • Romain • Hugo • Julie • Christelle • Damien • Edgar
              </div>
            </div>
          </div>
        </div>

        {/* 7 Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {XR_ADVISORS.map((advisor) => (
            <article
              key={advisor.id}
              data-testid={`advisor-card-${advisor.id}`}
              className="group rounded-2xl bg-[#0F172A] border border-white/10 hover:border-[#D4AF37]/70 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
            >
              <div>
                {/* Studio 85mm Portrait Header */}
                <div className="relative h-64 bg-[#080B10] overflow-hidden border-b border-white/10">
                  <img
                    src={advisor.portraitUrl}
                    alt={`${advisor.firstName} — ${advisor.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: advisor.studioFilter }}
                  />
                  {/* Dark textured studio vignette + film grain */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#080B10]/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#080B10]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      {advisor.LensSpec.split("•")[0]}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-bold">
                      {advisor.rpgRank}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                      {advisor.specialtyShort}
                    </div>
                    <h3 className="text-xl font-bold text-white flex items-center justify-between">
                      <span>{advisor.firstName}</span>
                      <span className="text-xs font-mono font-normal text-[#10B981]">
                        {advisor.kpiHighlight}
                      </span>
                    </h3>
                    <div className="text-xs text-slate-300">{advisor.role}</div>
                  </div>
                </div>

                {/* Punchline & Specialty Detail */}
                <div className="p-5 space-y-3">
                  <blockquote className="text-xs text-slate-200 italic border-l-2 border-[#D4AF37] pl-3 leading-relaxed">
                    « {advisor.punchline} »
                  </blockquote>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {advisor.specialtyDetail}
                  </p>
                </div>
              </div>

              {/* Direct Contextual Attribution CTAs */}
              <div className="p-5 pt-0 space-y-2">
                <a
                  href={buildAdvisorWhatsAppUrl(advisor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981] text-[#10B981] hover:text-[#080B10] border border-[#10B981]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Contacter {advisor.firstName} en direct
                </a>
                <Link
                  to={advisor.primaryRoute as any}
                  className="w-full py-2 px-3 rounded-xl bg-[#080B10] hover:bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AF37] text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  Voir le pôle de {advisor.firstName}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AdvisorsShowcase;
