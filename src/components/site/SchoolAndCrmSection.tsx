import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CheckCircle2, GraduationCap, PhoneCall, Users, Wrench } from "lucide-react";
import { Reveal } from "./primitives";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

export function SchoolAndCrmSection() {
  return (
    <section id="school-crm" className="relative py-12 sm:py-16 lg:py-20 border-t xr-line bg-[#f7f4ed] text-[#141312]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-[#121110] text-[#f7f4ed] border border-[#c5a880]/25 shadow-[0_32px_90px_-36px_rgba(20,19,18,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: XR School 4 000 € / 90 Days */}
              <div className="p-6 sm:p-9 lg:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1 label-mono text-[8.5px] font-bold text-[#e8cfa6]">
                    <GraduationCap className="h-3.5 w-3.5" /> XR SCHOOL · PROGRAMME 90 JOURS
                  </span>
                  <span className="display-serif text-2xl font-bold text-[#e8cfa6]">4 000 €</span>
                </div>

                <h2 className="display-serif text-3xl sm:text-4xl leading-[1.06]">
                  Créez votre propre <em className="italic font-normal text-[#c5a880]">agence digitale rentable</em> en 90 jours.
                </h2>

                <p className="text-xs sm:text-sm text-[#d7d1c6] leading-relaxed">
                  Autonomie financière accompagnée : nous construisons votre site web et votre image de marque, activons votre ligne téléphonique pro, envoyons vos leads et vous formons au closing &amp; recrutement — avec liberté de nous sous-traiter la production technique.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    { icon: CheckCircle2, label: "Site web + Image de marque complète" },
                    { icon: PhoneCall, label: "Ligne téléphonique pro & scripts" },
                    { icon: Briefcase, label: "Leads fournis dans notre CRM" },
                    { icon: Users, label: "Formation closing + recrutement" },
                    { icon: Wrench, label: "Sous-traitance XR selon capacité" },
                    { icon: CheckCircle2, label: "Vidéos explicatives sur 90 jours" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#c5a880]" />
                      <span className="font-medium text-[#f7f4ed]">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    to="/school"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e7cfa8] to-[#c5a880] px-6 py-3.5 text-xs font-bold text-[#141312] hover:brightness-105 transition"
                  >
                    Découvrir XR School (Vidéo 90j) <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Internal Team CRM Portal Card */}
              <div className="p-6 sm:p-9 lg:p-10 bg-[#0c0e18] text-white border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[8.5px] font-bold text-[#d4af37] uppercase tracking-[.18em]">
                      OUTIL INTERNE XR AGENCY
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[7.5px] font-bold text-black uppercase">
                      ACCÈS ÉQUIPE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl text-white font-extrabold leading-tight">
                    CRM Équipe &amp; Distribution de Leads en direct.
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    Vos commerciaux, collaborateurs et élèves XR School se connectent à leur espace dédié pour recevoir les leads chauds, enregistrer leurs appels, suivre leurs statistiques de closing et déléguer les projets à la production.
                  </p>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 flex items-center gap-3.5 shadow-md">
                    <img
                      src={agentXrPortrait}
                      alt="Portail Équipe CRM XR Agency"
                      className="h-12 w-12 rounded-xl object-cover object-top border border-[#d4af37]/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">Pilotage Direction &amp; Suivi Individuel</p>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">
                        Dispatch leads · Statistiques closing · Sous-traitance intégrée
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/crm"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-mono text-xs font-bold text-black uppercase shadow-lg hover:bg-[#d4af37] transition"
                >
                  Connexion Espace Équipe (/crm) <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

