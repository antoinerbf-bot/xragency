import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  MessageCircle,
  Palette,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import storySchoolMentor from "@/assets/story-school-mentor.jpg";
import svcWebEditorial from "@/assets/svc-web-editorial.jpg";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

export const Route = createFileRoute("/school")({
  head: () => ({
    meta: [
      { title: "XR School · Lancez votre agence digitale rentable en 90 jours (4 000 €) — XR Agency" },
      {
        name: "description",
        content:
          "Formation vente 90 jours, site web + identité de marque complète, ligne téléphonique pro, leads fournis dans notre CRM interne, recrutement ou sous-traitance XR Agency. 4 000 € avec accompagnement autonomie financière.",
      },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/school" }],
  }),
  component: XrSchoolPage,
});

const VIDEO_CHAPTERS = [
  { id: "c1", num: "01", label: "Vision 90j & Garantie", time: 0 },
  { id: "c2", num: "02", label: "Site, Marque & Ligne", time: 6.92 },
  { id: "c3", num: "03", label: "Leads & CRM Équipe", time: 15.24 },
  { id: "c4", num: "04", label: "Recruter ou Sous-Traiter", time: 23.72 },
  { id: "c5", num: "05", label: "Intégrer (4 000 €)", time: 31.96 },
];

const SIX_PILLARS = [
  {
    icon: Palette,
    badge: "01 · IDENTITÉ & SITE",
    title: "Votre site web + Image de marque complète",
    desc: "Nos designers et développeurs créent votre propre site haute couture, votre logo, votre Brand Book et vos tunnels de devis prêts à encaisser sous votre marque.",
  },
  {
    icon: PhoneCall,
    badge: "02 · INFRASTRUCTURE APPELS",
    title: "Ligne téléphonique professionnelle fournie",
    desc: "Vous démarrez avec votre ligne pro dédiée, vos scripts d'ouverture validés sur le terrain et vos séquences de relance WhatsApp/SMS.",
  },
  {
    icon: Sparkles,
    badge: "03 · ACQUISITION DIRECTE",
    title: "Leads qualifiés envoyés dans votre CRM",
    desc: "Nous vous ouvrons un accès membre sur notre CRM interne (/crm) et vous dispatchons directement des prospects qualifiés prêts à être appelés.",
  },
  {
    icon: GraduationCap,
    badge: "04 · FORMATION 90 JOURS",
    title: "Vidéos closing, vente & maîtrise d'offres",
    desc: "90 jours de formation vidéo pratique : gestion des objections, argumentation Sites / Google Maps / Branding et debriefings hebdomadaires sur vos appels.",
  },
  {
    icon: Users,
    badge: "05 · SCALING ÉQUIPE",
    title: "Suivi & formation pour recruter vos vendeurs",
    desc: "Apprenez à sourcer, former et piloter vos propres commerciaux directement dans votre CRM avec tableaux de bord de performance et commissions.",
  },
  {
    icon: Wrench,
    badge: "06 · SOUS-TRAITANCE LIBRE",
    title: "Déléguez-nous le travail quand vous voulez",
    desc: "Selon vos envies, vos besoins et votre capacité, sous-traitez la production technique (sites, Maps, SEO, branding) à XR Agency et gardez la marge.",
  },
];

const WEEKLY_CURRICULUM = [
  {
    weeks: "Semaines 1 – 2",
    title: "Fondations, Marque & Site Agence Clés-en-Main",
    deliverable: "Site d'agence livré + Brand Book + Ligne pro active",
    modules: [
      "Création par notre studio de votre identité visuelle (logo, charte, typographies) et de votre site web d'agence avec tunnel de devis.",
      "Ouverture et configuration de votre ligne téléphonique professionnelle dédiée et de votre accès membre sur le CRM interne (/crm).",
      "Positionnement commercial : structurer vos offres Sites Web, Google Maps Top 3, Gestion mensuelle GBP et Social Media.",
    ],
  },
  {
    weeks: "Semaines 3 – 4",
    title: "Méthode de Vente, Scripts & Réponse aux Objections",
    deliverable: "Playbook d'appel + Simulations validées",
    modules: [
      "Scripts d'ouverture à froid et sur leads entrants : capter l'attention d'un dirigeant en moins de 20 secondes.",
      "Démonstration commerciale : utiliser l'audit Google Maps et le configurateur pour chiffrer un projet en direct.",
      "Traitement des 12 objections classiques (« J'ai déjà un site », « C'est trop cher », « Je dois réfléchir »).",
    ],
  },
  {
    weeks: "Semaines 5 – 8",
    title: "Leads Fournis dans le CRM & Premiers Closings",
    deliverable: "Flux de leads attribués + Debriefings d'appels",
    modules: [
      "Réception de vos leads qualifiés directement dans votre espace CRM interne avec fiches secteurs et priorités.",
      "Sessions d'appels accompagnées et écoute commentée pour affiner votre posture et votre taux de signature.",
      "Envoi de devis, relances structurées WhatsApp/e-mail et encaissement de vos premiers acomptes clients.",
    ],
  },
  {
    weeks: "Semaines 9 – 12",
    title: "Sous-Traitance à XR ou Recrutement de votre Équipe",
    deliverable: "Organisation autonome & scaling commercial",
    modules: [
      "Voie A — Sous-traitance : transférez vos dossiers signés en 1 clic à XR Agency depuis le CRM et conservez votre marge commerciale.",
      "Voie B — Recrutement : sourcer, former et intégrer vos propres closers avec suivi des commissions dans le CRM.",
      "Bilan des 90 jours et plan de croissance trimestriel pour consolider votre autonomie financière.",
    ],
  },
];

function XrSchoolPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Interactive profitability projection state
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [avgContract, setAvgContract] = useState(1800);
  const monthlyGross = clientsPerMonth * avgContract;
  const breakEvenDays = Math.max(12, Math.min(90, Math.round((4000 / Math.max(1, monthlyGross)) * 30)));
  const [activeWeekBlock, setActiveWeekBlock] = useState<number>(0);

  // Checkout enrollment state
  const [paymentPlan, setPaymentPlan] = useState<"full" | "split">("full");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const playVideoAt = (idx: number, t: number) => {
    setActiveChapter(idx);
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.currentTime = t;
    v.play().catch(() => {});
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;
    for (let i = VIDEO_CHAPTERS.length - 1; i >= 0; i--) {
      if (t >= VIDEO_CHAPTERS[i].time - 0.3) {
        setActiveChapter(i);
        break;
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setCheckoutBusy(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "checkout",
          currency: "eur",
          selectedServices: [paymentPlan === "full" ? "school_academy" : "school_installment"],
          client: {
            email: email.trim(),
            name: fullName.trim() || "Élève XR School",
            whatsapp: phone.trim(),
            company: "XR School 90j",
          },
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Paiement Stripe indisponible actuellement — finalisez votre inscription sur WhatsApp.");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Erreur paiement.");
    } finally {
      setCheckoutBusy(false);
    }
  };

  const waEnrollment = encodeURIComponent(
    `Bonjour XR Agency, je souhaite rejoindre XR School (Programme 90 jours Clés-en-Main à 4 000 €).\n\nNom : ${fullName || "À compléter"}\nTéléphone : ${phone || "À compléter"}\nOption souhaitée : ${paymentPlan === "full" ? "4 000 € comptant" : "Paiement échelonné 3x"}\n\nPouvons-nous planifier l'appel de validation ?`
  );

  return (
    <div className="min-h-screen bg-[#030406] text-white">
      <Nav />

      {/* ── 1. CINEMATIC HERO + 90-DAY EXPLAINER VIDEO ── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030406] pt-28 pb-16 sm:pt-32 sm:pb-20 text-white">
        <img
          src={storySchoolMentor}
          alt="XR School Paris · Formation & Création d'Agence"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-15"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030406]/90 via-[#030406]/80 to-[#030406]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-white transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Retour à l&apos;agence
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3.5 py-1.5 font-mono text-[8.5px] font-bold text-[#d4af37] shadow-sm">
              <GraduationCap className="h-3.5 w-3.5" /> XR SCHOOL · PROGRAMME FONDATEUR 90 JOURS
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.04] tracking-tight text-white">
              Bâtissez votre <em className="italic font-light text-[#d4af37]">agence de com rentable</em> en 90 jours.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#94a3b8]">
              Ne partez pas de zéro : nous créons votre site + marque complète, fournissons votre ligne pro et vos leads dans notre CRM interne, et vous formons au closing, au recrutement — ou prenons en charge la sous-traitance technique.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#school-checkout"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[.1em] text-black shadow-lg hover:bg-[#d4af37] hover:scale-105 transition"
              >
                Rejoindre XR School · 4 000 € <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/crm"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 font-mono text-xs font-semibold text-white shadow-sm hover:border-[#d4af37] hover:text-[#d4af37] transition"
              >
                <Briefcase className="h-4 w-4 text-[#d4af37]" /> Aperçu du CRM Interne
              </Link>
            </div>
          </div>

          {/* 90-Day Video Presentation Player (Titanium Frame) */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#090b10] shadow-[0_28px_75px_-30px_rgba(0,0,0,0.95)]">
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/videos/xr-school-90j.mp4"
                poster="/videos/school-poster.jpg"
                controls={playing}
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                className="h-full w-full object-cover"
              >
                <source src="/videos/xr-school-90j.mp4" type="video/mp4" />
              </video>

              {!playing && (
                <button
                  type="button"
                  onClick={() => playVideoAt(0, 0)}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 sm:pb-7 bg-gradient-to-t from-black/80 via-transparent to-transparent cursor-pointer"
                >
                  <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/20 bg-white/15 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl hover:scale-105 hover:bg-white hover:text-black transition">
                    <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-[#d4af37] text-black">
                      <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current ml-0.5" />
                    </span>
                    <span className="sm:hidden font-mono uppercase text-xs">Lancer la vidéo 90 jours</span>
                    <span className="hidden sm:inline font-mono uppercase text-xs">Voir l&apos;explication complète du programme 90 jours</span>
                  </div>
                </button>
              )}
            </div>

            <div className="border-t border-white/10 bg-[#06070a] p-3">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {VIDEO_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => playVideoAt(idx, ch.time)}
                    className={cn(
                      "rounded-xl border px-2.5 py-2 text-left transition",
                      activeChapter === idx
                        ? "border-[#d4af37] bg-[#0c0e18] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        : "border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/25 hover:text-white"
                    )}
                  >
                    <span className={cn("font-mono text-[7px] block", activeChapter === idx ? "text-[#d4af37]" : "text-white/60")}>{ch.num}</span>
                    <span className="text-[10.5px] font-semibold line-clamp-1">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SIX PILLARS PROVIDED ── */}
      <section className="py-14 sm:py-20 border-b border-white/10 bg-[#040508]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-[.2em]">
              CE QUE VOUS RECEVEZ DÈS VOTRE ENTRÉE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white mt-2">
              Une agence complète, armée pour signer — <em className="italic font-light text-[#d4af37]">même sans expérience technique.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SIX_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-[#090b10] p-6 shadow-xl space-y-3 hover:border-white/25 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8.5px] font-bold text-[#d4af37] uppercase">{item.badge}</span>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[#d4af37] border border-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#94a3b8]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ROADMAP 90 JOURS + GUARANTEE ── */}
      <section className="py-12 sm:py-16 border-b border-white/10 bg-[#030406]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-3xl border border-[#d4af37]/35 bg-[#090b10] p-6 sm:p-9 text-white grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center shadow-2xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-1 font-mono text-[8px] font-bold text-[#d4af37]">
                <Award className="h-3.5 w-3.5" /> GARANTIE D&apos;AUTONOMIE FINANCIÈRE SUR 90 JOURS
              </div>
              <h3 className="text-2xl sm:text-3xl leading-tight font-extrabold uppercase text-white">
                Nous restons à vos côtés jusqu&apos;à ce que votre agence génère ses revenus de façon autonome.
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                En combinant votre propre identité digitale, notre CRM interne alimenté en leads, notre méthode de closing et l&apos;option sous-traitance totale vers notre studio, vous éliminez les 6 mois d&apos;errance technique pour encaisser dès le premier trimestre.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e18] p-4 flex items-center gap-4 shadow-xl">
              <img src={agentXrPortrait} alt="Direction XR School" className="h-16 w-16 rounded-2xl object-cover object-top border border-[#d4af37]/40" />
              <div>
                <p className="text-xs font-bold text-[#d4af37] font-mono">Protocole XR School · Engagement Résultat</p>
                <p className="mt-1 text-[11px] text-[#cbd5e1] leading-snug">
                  Suivi hebdo, attribution directe de leads et accès prioritaire à nos tarifs partenaires de sous-traitance.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                period: "JOURS 1 À 30",
                title: "Création de votre agence & maîtrise vente",
                points: [
                  "Livraison de votre site vitrine + Brand Book + logo",
                  "Activation de votre ligne téléphonique dédiée",
                  "Assimilation des vidéos vente & closing haute valeur",
                ],
              },
              {
                period: "JOURS 31 À 60",
                title: "Leads envoyés & Premiers encaissements",
                points: [
                  "Réception de vos leads dans l'espace CRM (/crm)",
                  "Appels accompagnés & debriefing de vos closings",
                  "Option : délégation de vos premiers chantiers à XR",
                ],
              },
              {
                period: "JOURS 61 À 90",
                title: "Autonomie, Recrutement ou Sous-traitance",
                points: [
                  "Recrutement & onboarding de vos propres commerciaux",
                  "Tableaux de stats et pilotage commissions dans le CRM",
                  "Modèle 100% libre selon vos envies & capacité",
                ],
              },
            ].map((phase) => (
              <div key={phase.period} className="rounded-3xl border border-white/10 bg-[#090b10] p-6 space-y-3">
                <span className="inline-block rounded-full bg-[#d4af37] px-3 py-1 font-mono text-[8px] font-extrabold text-black uppercase">
                  {phase.period}
                </span>
                <h4 className="text-xl font-bold text-white font-serif">{phase.title}</h4>
                <ul className="space-y-2 text-xs text-[#94a3b8]">
                  {phase.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interactive 12-Week Curriculum Explorer */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="font-mono text-[8.5px] font-bold text-[#d4af37] uppercase tracking-[.18em]">
                  PROGRAMME DÉTAILLÉ SEMAINE PAR SEMAINE
                </span>
                <h4 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white">
                  Les 12 semaines de votre lancement d&apos;agence
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {WEEKLY_CURRICULUM.map((block, idx) => (
                  <button
                    key={block.weeks}
                    type="button"
                    onClick={() => setActiveWeekBlock(idx)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 font-mono text-xs font-bold transition",
                      activeWeekBlock === idx
                        ? "border-[#d4af37] bg-[#d4af37] text-black shadow-md"
                        : "border-white/12 bg-white/5 text-white hover:border-[#d4af37]"
                    )}
                  >
                    {block.weeks}
                  </button>
                ))}
              </div>
            </div>

            {WEEKLY_CURRICULUM[activeWeekBlock] && (
              <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-6 items-start">
                <div className="rounded-2xl border border-[#d4af37]/30 bg-[#0c0e18] p-5 space-y-3">
                  <span className="inline-block rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37]">
                    {WEEKLY_CURRICULUM[activeWeekBlock].weeks}
                  </span>
                  <h5 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    {WEEKLY_CURRICULUM[activeWeekBlock].title}
                  </h5>
                  <div className="pt-2 border-t border-white/10">
                    <span className="font-mono text-[7.5px] font-bold text-[#d4af37] block uppercase">
                      LIVRABLE CLÉ DE CETTE ÉTAPE
                    </span>
                    <p className="mt-1 text-xs font-semibold text-white">
                      {WEEKLY_CURRICULUM[activeWeekBlock].deliverable}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {WEEKLY_CURRICULUM[activeWeekBlock].modules.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#06070a] p-4 text-xs sm:text-sm text-[#cbd5e1]"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d4af37] font-mono text-[10px] font-bold text-black">
                        0{mIdx + 1}
                      </span>
                      <p className="leading-relaxed">{mod}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. ROI SIMULATOR + 4 000 € ENROLLMENT CHECKOUT ── */}
      <section id="school-checkout" className="py-14 sm:py-20 bg-[#030406]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* ROI Simulation Card */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#d4af37] uppercase">RENTABILITÉ ESTIMÉE</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
                Combien rapporte votre agence dès 90 jours ?
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#94a3b8]">Clients signés par mois</span>
                  <span className="text-[#d4af37] font-mono">{clientsPerMonth} client(s) / mois</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={clientsPerMonth}
                  onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#94a3b8]">Panier moyen client (Site / Maps / SEO)</span>
                  <span className="text-[#d4af37] font-mono">{avgContract.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={3500}
                  step={100}
                  value={avgContract}
                  onChange={(e) => setAvgContract(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-5 text-white grid grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[8px] font-bold text-[#d4af37] uppercase block">CA Mensuel Projeté</span>
                <p className="mt-1 text-3xl font-extrabold text-white font-serif">
                  {monthlyGross.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div>
                <span className="font-mono text-[8px] text-[#94a3b8] uppercase block">Amortissement 4 000 €</span>
                <p className="mt-1 text-3xl font-extrabold text-[#d4af37] font-serif">
                  ~{breakEvenDays} jours
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src={svcWebEditorial} alt="Exemple de site livré pour votre agence" className="h-44 w-full object-cover" />
            </div>
          </div>

          {/* Checkout Card 4 000 € */}
          <div className="rounded-3xl border-2 border-[#d4af37] bg-[#090b10] p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(212,175,55,0.18)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[9px] font-bold text-[#d4af37] uppercase">OFFRE INTÉGRALE 90 JOURS</span>
                <h3 className="mt-1 text-3xl font-extrabold text-white font-serif">XR School Clés-en-Main</h3>
              </div>
              <div className="text-right">
                <span className="text-4xl font-extrabold text-white font-serif">4 000 €</span>
                <span className="block font-mono text-[10px] text-[#94a3b8]">Tout inclus · Site &amp; Leads compris</span>
              </div>
            </div>

            {/* Mode selector */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentPlan("full")}
                className={cn(
                  "rounded-2xl border p-3.5 text-left transition",
                  paymentPlan === "full"
                    ? "border-[#d4af37] bg-[#0c0e18] text-white ring-1 ring-[#d4af37]"
                    : "border-white/15 bg-white/5 text-[#94a3b8] hover:border-white/30"
                )}
              >
                <span className="text-xs font-bold block text-white font-mono">Comptant · 4 000 €</span>
                <span className={cn("text-[10px]", paymentPlan === "full" ? "text-[#d4af37]" : "text-[#94a3b8]")}>Accès immédiat complet</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentPlan("split")}
                className={cn(
                  "rounded-2xl border p-3.5 text-left transition",
                  paymentPlan === "split"
                    ? "border-[#d4af37] bg-[#0c0e18] text-white ring-1 ring-[#d4af37]"
                    : "border-white/15 bg-white/5 text-[#94a3b8] hover:border-white/30"
                )}
              >
                <span className="text-xs font-bold block text-white font-mono">Échelonné · 3× 1 350 €</span>
                <span className={cn("text-[10px]", paymentPlan === "split" ? "text-[#d4af37]" : "text-[#94a3b8]")}>1er versement aujourd&apos;hui</span>
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom et Prénom *"
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#d4af37] focus:outline-none"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail professionnel *"
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#d4af37] focus:outline-none"
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Téléphone / WhatsApp *"
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              {checkoutError && (
                <div className="rounded-xl border border-red-500/40 bg-red-950/20 px-3.5 py-2.5 text-xs text-red-400">
                  {checkoutError}
                </div>
              )}

              <button
                type="submit"
                disabled={checkoutBusy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-[.1em] text-black shadow-lg hover:bg-[#d4af37] hover:scale-105 transition disabled:opacity-50"
              >
                <CreditCard className="h-4 w-4" />
                {checkoutBusy
                  ? "Redirection Stripe..."
                  : paymentPlan === "full"
                    ? "Payer 4 000 € & Démarrer mes 90 jours"
                    : "Régler 1ère échéance (1 350 €) via Stripe"}
              </button>
            </form>

            <a
              href={`${CONTACT.whatsapp}?text=${waEnrollment}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-mono text-xs font-semibold text-white hover:border-[#25D366] transition"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Poser une question sur WhatsApp avant de démarrer
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-[10.5px] text-[#94a3b8]">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" /> Site &amp; Marque livrés</span>
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-[#d4af37]" /> Ligne + Leads inclus</span>
              <span className="inline-flex items-center gap-1"><Wrench className="h-3.5 w-3.5 text-[#d4af37]" /> Option sous-traitance XR</span>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

