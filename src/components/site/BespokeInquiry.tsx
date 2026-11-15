import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Send, Clock, Phone, MessageSquare } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { audioEngine } from "@/lib/audioExperience";

const DISCIPLINES = [
  { id: "websites", label: { fr: "Site Web & E-Commerce", en: "Website & E-Commerce", vi: "Website & E-Commerce", ar: "موقع ويب ومتجر", ru: "Веб-сайт и E-Commerce" }, price: "Dès 499 €" },
  { id: "maps", label: { fr: "Google Maps Top 3", en: "Google Maps Top 3", vi: "Google Maps Top 3", ar: "صدارة خرائط Google", ru: "Google Maps Топ-3" }, price: "Dès 550 € / 99 €/m" },
  { id: "social", label: { fr: "Direction Réseaux Sociaux", en: "Social Media Direction", vi: "Chỉ đạo Mạng Xã Hội", ar: "إدارة التواصل الاجتماعي", ru: "SMM и видеомонтаж" }, price: "Dès 349 €/m" },
  { id: "branding", label: { fr: "Identité Visuelle & Luxe", en: "Brand Identity & Luxe", vi: "Nhận diện thương hiệu", ar: "هوية بصرية فاخرة", ru: "Брендинг и Brand Book" }, price: "Dès 199 €" },
  { id: "seo", label: { fr: "SEO & Autorité Google", en: "SEO & Authority", vi: "SEO & Vị thế Google", ar: "السيو والظهور الأول", ru: "SEO продвижение" }, price: "Dès 299 €/m" },
  { id: "webcare", label: { fr: "WebCare Cloud 24/7", en: "WebCare Cloud 24/7", vi: "WebCare Bảo Trì 24/7", ar: "صيانة سحابية 24/7", ru: "WebCare поддержка" }, price: "Dès 79 €/an" },
  { id: "robotics", label: { fr: "Systèmes IA & CRM", en: "AI Systems & CRM", vi: "Hệ thống AI & CRM", ar: "أنظمة الذكاء وCRM", ru: "ИИ-системы и CRM" }, price: "Dès 999 €" },
];

const BUDGETS = ["< 1 000 €", "1 000 € - 3 000 €", "3 000 € - 10 000 €", "10 000 € + (Sur mesure)"];
const TIMELINES = [
  { id: "urgent", label: "Démarrage prioritaire (à confirmer)" },
  { id: "month", label: "Sous 1 mois" },
  { id: "flexible", label: "Flexible / Échelonné" },
];

export function BespokeInquiry() {
  const { lang } = useLang();
  const currentLang = (lang || "fr") as Lang;

  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(["websites"]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGETS[1]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0].id);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleDiscipline = (id: string) => {
    audioEngine.playChime(528, 0.02, 0.3);
    setSelectedDisciplines((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((d) => d !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    audioEngine.playChime(660, 0.03, 0.5);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          message: `[DEMANDE DE DEVIS SUR MESURE XR]\nDisciplines: ${selectedDisciplines.join(", ")}\nBudget: ${selectedBudget}\nTimeline: ${selectedTimeline}\nBrief: ${message}`,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setErrorMessage(result.error || "Votre demande n'a pas pu être envoyée. Réessayez ou contactez-nous via WhatsApp.");
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorMessage("Connexion indisponible. Vérifiez votre réseau ou contactez-nous via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote"
      className="relative border-t border-white/10 bg-[#040508] py-28 sm:py-36 text-white overflow-hidden"
    >
      <span id="audit" aria-hidden="true" className="pointer-events-none absolute -top-28 left-0" />

      {/* Atmospheric Ambient Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[90%] max-w-[1200px] rounded-full bg-[#d4af37]/[0.025] blur-[180px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[8.5px] font-mono font-bold tracking-[.26em] text-[#d4af37] uppercase mb-4 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span>04 · PROJET SUR MESURE & ÉTUDE PRIVÉE</span>
          </div>
          <h2 className="text-[clamp(2.5rem,5.2vw,5.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] text-white [text-wrap:balance]">
            Donnez une autorité{" "}
            <span className="font-serif italic font-normal text-[#d4af37] tracking-normal block sm:inline">
              absolue à votre marque.
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#94a3b8] leading-relaxed font-normal">
            Sélectionnez vos disciplines cibles et indiquez vos ambitions pour recevoir une proposition chiffrée, adaptée au périmètre et au calendrier de votre projet.
          </p>
        </div>

        {/* The Studio Inquiry Card */}
        <div className="relative mx-auto max-w-5xl rounded-[2.2rem] border border-white/12 bg-[#080a11]/90 p-6 sm:p-10 lg:p-14 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white">
                Brief Transmis à la Direction XR
              </h3>
              <p className="max-w-xl mx-auto text-sm text-[#cbd5e1] leading-relaxed">
                Merci {name}. Votre cadrage de projet a été transmis directement à Antoine et à l'équipe de production. Nous revenons vers vous avec une étude stratégique sur mesure.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`${CONTACT.whatsapp}?text=Bonjour%20XR%20Agency%2C%20je%20viens%20de%20d%C3%A9poser%20mon%20brief%20sur%20le%20site%20au%20nom%20de%20${encodeURIComponent(name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:scale-105 transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Échanger en direct sur WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition"
                >
                  Modifier mon brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Step 1: Disciplines */}
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37] mb-4">
                  01 · Sélectionnez vos disciplines cibles
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {DISCIPLINES.map((d) => {
                    const active = selectedDisciplines.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleDiscipline(d.id)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition duration-300 ${
                          active
                            ? "border-[#d4af37] bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>
                          <p className={`text-xs sm:text-sm font-bold ${active ? "text-white" : "text-[#cbd5e1]"}`}>
                            {d.label[currentLang] ?? d.label.fr}
                          </p>
                          <p className="font-mono text-[9px] text-[#d4af37] mt-0.5">{d.price}</p>
                        </div>
                        <div
                          className={`grid h-5 w-5 place-items-center rounded-full border transition ${
                            active ? "border-[#d4af37] bg-[#d4af37] text-black" : "border-white/20"
                          }`}
                        >
                          {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37] mb-3">
                    02 · Enveloppe budgétaire estimée
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setSelectedBudget(b);
                          audioEngine.playChime(580, 0.02, 0.2);
                        }}
                        className={`rounded-xl border py-3 px-3.5 text-center font-mono text-[10px] font-bold uppercase tracking-wider transition ${
                          selectedBudget === b
                            ? "border-white bg-white text-black shadow-md"
                            : "border-white/10 bg-white/[0.02] text-[#94a3b8] hover:text-white hover:border-white/20"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37] mb-3">
                    03 · Cadence de livraison souhaitée
                  </label>
                  <div className="space-y-2">
                    {TIMELINES.map((tl) => (
                      <button
                        key={tl.id}
                        type="button"
                        onClick={() => {
                          setSelectedTimeline(tl.id);
                          audioEngine.playChime(620, 0.02, 0.2);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl border py-2.5 px-4 text-left transition ${
                          selectedTimeline === tl.id
                            ? "border-[#d4af37] bg-[#d4af37]/15 text-white"
                            : "border-white/10 bg-white/[0.02] text-[#94a3b8] hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-semibold">{tl.label}</span>
                        {selectedTimeline === tl.id && <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Coordinates */}
              <div className="border-t border-white/10 pt-8 space-y-4">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                  04 · Vos coordonnées de prestige
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Votre Nom & Prénom *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#d4af37] focus:outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="Nom de votre Marque / Entreprise"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#d4af37] focus:outline-none transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Adresse Email Professionnelle *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#d4af37] focus:outline-none transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Téléphone / WhatsApp direct *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#d4af37] focus:outline-none transition"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Décrivez votre projet, vos ambitions ou vos enjeux en quelques lignes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-black/40 p-4 text-xs text-white placeholder-white/40 focus:border-[#d4af37] focus:outline-none transition"
                />
              </div>

              {errorMessage && (
                <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </p>
              )}

              {/* Submit & Contractual Reassurance */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 text-left">
                  <ShieldCheck className="h-6 w-6 text-[#d4af37] shrink-0" />
                  <p className="text-[11px] text-[#94a3b8] leading-tight max-w-sm">
                    Délais confirmés selon la formule et le périmètre · Cession des actifs selon contrat · Étude après réception du brief.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-white px-9 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#050608] shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] disabled:opacity-50"
                >
                  <span>{loading ? "Transmission..." : "Transmettre mon brief au Studio"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
