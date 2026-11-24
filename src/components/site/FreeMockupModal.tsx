import { useState } from "react";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShoppingBag,
  RotateCcw,
  MapPin,
  Palette,
  MessageCircle,
  Building2,
  Utensils,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

interface FreeMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullQuote?: () => void;
}

const SECTORS = [
  { id: "restaurant", icon: Utensils, label: { fr: "Restauration & Hôtellerie", en: "Hospitality & Dining", vi: "Nhà hàng & Khách sạn", ar: "المطاعم والضيافة", ru: "Рестораны и отели" } },
  { id: "artisan", icon: Wrench, label: { fr: "Artisans & Services BTP", en: "Trades & Local Services", vi: "Dịch vụ & Kỹ thuật", ar: "الحرف والخدمات", ru: "Локальный сервис" } },
  { id: "ecommerce", icon: ShoppingBag, label: { fr: "E-Commerce & Boutique", en: "E-Commerce & Retail", vi: "Thương mại điện tử", ar: "التجارة الإلكترونية", ru: "E-commerce и бутики" } },
  { id: "immo", icon: Building2, label: { fr: "Immobilier & Cliniques", en: "Real Estate & Clinics", vi: "Bất động sản & Y tế", ar: "العقارات والعيادات", ru: "Недвижимость и клиники" } },
  { id: "other", icon: Sparkles, label: { fr: "Autre projet sur-mesure", en: "Custom Digital Project", vi: "Dự án may đo khác", ar: "مشروع مخصص آخر", ru: "Другой проект" } },
];

const PROJECT_TYPES = [
  { id: "website", label: { fr: "Nouveau Site Web", en: "New Website", vi: "Website Mới", ar: "موقع جديد", ru: "Новый сайт" }, detail: "Dès 499 €" },
  { id: "refonte", label: { fr: "Refonte & Modernisation", en: "Redesign & Upgrade", vi: "Làm mới Website", ar: "تطوير موقع قائم", ru: "Редизайн" }, detail: "Sur devis" },
  { id: "maps", label: { fr: "Domination Google Maps", en: "Google Maps Domination", vi: "Google Maps Top 3", ar: "خرائط Google", ru: "Google Maps" }, detail: "999 €/an" },
  { id: "branding", label: { fr: "Identité de Marque & Logo", en: "Brand Identity & Logo", vi: "Bộ Nhận Diện Thương Hiệu", ar: "الهوية البصرية", ru: "Брендинг" }, detail: "Dès 199 €" },
];

export function FreeMockupModal({ isOpen, onClose, onOpenFullQuote }: FreeMockupModalProps) {
  const { lang } = useLang();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSector, setSelectedSector] = useState<string>("restaurant");
  const [selectedType, setSelectedType] = useState<string>("website");
  const [brandName, setBrandName] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [contactValue, setContactValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSectorObj = SECTORS.find((s) => s.id === selectedSector);
  const currentTypeObj = PROJECT_TYPES.find((p) => p.id === selectedType);

  const handleSendViaWhatsApp = () => {
    const sectorLabel = currentSectorObj?.label.fr ?? selectedSector;
    const typeLabel = currentTypeObj?.label.fr ?? selectedType;
    const brand = brandName.trim() || "Projet Confidentiel";
    const existing = currentUrl.trim() ? ` · Site existant : ${currentUrl.trim()}` : " · Création de zéro";
    const contact = contactValue.trim() ? ` · Contact : ${contactValue.trim()}` : "";

    const text = encodeURIComponent(
      `Bonjour XR Agency, je souhaite recevoir ma maquette offerte sous 48h.\n\n` +
      `• Marque / Entreprise : ${brand}\n` +
      `• Secteur : ${sectorLabel}\n` +
      `• Type de projet : ${typeLabel}\n` +
      `${existing}${contact}\n\n` +
      `Merci de me contacter pour valider les éléments graphiques.`
    );

    window.open(`https://wa.me/33767566783?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-[#EBE5DC] bg-white text-[#1A1815] shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#F0EBE3] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A1815] text-[#E5C696]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67C40]">
                ATELIER MAQUETTE OFFERTE · 48H CHRONO
              </span>
              <h3 className="font-serif text-lg font-medium text-[#1A1815]">
                Concevons le futur de votre présence en ligne
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBE5DC] text-[#5C554B] transition hover:bg-[#FAF8F5] hover:text-[#1A1815]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-3 border-b border-[#F0EBE3] bg-[#FAF8F5] text-center font-mono text-[11px] font-semibold text-[#8C8274]">
          <div className={cn("py-2.5 border-r border-[#F0EBE3]", step >= 1 && "bg-white text-[#A67C40]")}>
            1. Secteur & Besoin
          </div>
          <div className={cn("py-2.5 border-r border-[#F0EBE3]", step >= 2 && "bg-white text-[#A67C40]")}>
            2. Votre Marque
          </div>
          <div className={cn("py-2.5", step >= 3 && "bg-white text-[#A67C40]")}>
            3. Réception 48h
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#A67C40]">
                      Quel est votre secteur d'activité ?
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {SECTORS.map((sec) => {
                        const Icon = sec.icon;
                        const isSelected = selectedSector === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => setSelectedSector(sec.id)}
                            className={cn(
                              "flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition",
                              isSelected
                                ? "border-[#A67C40] bg-[#FAF8F5] text-[#1A1815] shadow-sm font-semibold"
                                : "border-[#EBE5DC] bg-white text-[#5C554B] hover:border-[#D1B07A]"
                            )}
                          >
                            <Icon className={cn("h-5 w-5", isSelected ? "text-[#A67C40]" : "text-[#8C8274]")} />
                            <span className="text-xs">{sec.label[lang] ?? sec.label.fr}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#A67C40]">
                      Quel type de réalisation envisagez-vous ?
                    </label>
                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {PROJECT_TYPES.map((pt) => {
                        const isSelected = selectedType === pt.id;
                        return (
                          <button
                            key={pt.id}
                            type="button"
                            onClick={() => setSelectedType(pt.id)}
                            className={cn(
                              "flex items-center justify-between rounded-xl border p-3.5 text-left transition",
                              isSelected
                                ? "border-[#A67C40] bg-[#FAF8F5] text-[#1A1815] shadow-sm font-semibold"
                                : "border-[#EBE5DC] bg-white text-[#5C554B] hover:border-[#D1B07A]"
                            )}
                          >
                            <span className="text-xs">{pt.label[lang] ?? pt.label.fr}</span>
                            <span className="font-mono text-[11px] text-[#A67C40]">{pt.detail}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1A1815] px-6 text-xs font-semibold text-white shadow-md transition hover:bg-[#332F2B]"
                    >
                      <span>Continuer vers l'étape 2</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#A67C40]">
                      Nom de votre établissement / marque :
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="Ex: Maison Dior, Pok-N Ball, Dr. Martin..."
                      className="mt-2.5 w-full rounded-2xl border border-[#EBE5DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1A1815] outline-none transition focus:border-[#A67C40] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#A67C40]">
                      Site web existant ou fiche Google Maps (optionnel) :
                    </label>
                    <input
                      type="text"
                      value={currentUrl}
                      onChange={(e) => setCurrentUrl(e.target.value)}
                      placeholder="https://... (ou laissez vide si création à partir de zéro)"
                      className="mt-2.5 w-full rounded-2xl border border-[#EBE5DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1A1815] outline-none transition focus:border-[#A67C40] focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-[#8C8274] hover:text-[#1A1815]"
                    >
                      ← Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1A1815] px-6 text-xs font-semibold text-white shadow-md transition hover:bg-[#332F2B]"
                    >
                      <span>Passer à la livraison</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#E5C696]" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#E7DFC6] bg-[#FAF8F5] p-4 text-xs text-[#5C554B]">
                    <span className="font-semibold text-[#1A1815]">Récapitulatif de votre demande :</span>
                    <ul className="mt-2 space-y-1">
                      <li>• Secteur : <strong>{currentSectorObj?.label.fr}</strong></li>
                      <li>• Format : <strong>{currentTypeObj?.label.fr}</strong></li>
                      {brandName && <li>• Marque : <strong>{brandName}</strong></li>}
                    </ul>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#A67C40]">
                      Où souhaitez-vous recevoir votre maquette sous 48h ?
                    </label>
                    <input
                      type="text"
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder="Votre numéro WhatsApp ou adresse e-mail"
                      className="mt-2.5 w-full rounded-2xl border border-[#EBE5DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1A1815] outline-none transition focus:border-[#A67C40] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-105 active:scale-[0.99]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Envoyer & Valider ma maquette offerte via WhatsApp</span>
                    </button>

                    <p className="text-center text-[11px] text-[#8C8274]">
                      100% gratuit · Sans aucun engagement · Échange direct avec notre directeur de création.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#F0EBE3] pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-semibold text-[#8C8274] hover:text-[#1A1815]"
                    >
                      ← Retour
                    </button>
                    {onOpenFullQuote && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenFullQuote();
                        }}
                        className="text-xs font-semibold text-[#A67C40] underline hover:text-[#1A1815]"
                      >
                        Ou configurer mon devis chiffré complet →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-2xl font-normal text-[#1A1815]">
                Demande transmise avec succès !
              </h4>
              <p className="mx-auto max-w-md text-sm text-[#5C554B]">
                Notre directeur artistique a bien reçu votre demande. Votre cadrage et votre maquette personnalisée sont en cours de préparation pour une livraison sous 48h.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1A1815] px-6 text-xs font-semibold text-white transition hover:bg-[#332F2B]"
                >
                  <span>Retourner au site</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
