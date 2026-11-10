import { useRef, useState } from "react";
import {
  ArrowRight,
  AudioLines,
  BarChart3,
  Check,
  ExternalLink,
  FileText,
  Globe2,
  Laptop,
  MapPin,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { CONTACT } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

type AuditType = "design" | "seo" | "security" | "conversion" | "technical";
type Finding = { label: string; detail: string; status?: boolean };
type Recommendation = { service: string; reason: string };

const TYPES: Record<AuditType, { label: Record<string, string>; detail: Record<string, string>; icon: typeof Palette }> = {
  design: {
    label: { fr: "Design & UX", en: "Design & UX", vi: "Thiết kế & UX", ar: "التصميم وتجربة المستخدم", ru: "Дизайн и UX" },
    detail: { fr: "Interface, mobile, hiérarchie, qualité perçue", en: "Interface, mobile, hierarchy, perceived quality", vi: "Giao diện, mobile, cấu trúc, cảm nhận", ar: "الواجهة والجوال والتسلسل والجودة", ru: "Интерфейс, mobile, иерархия, качество" },
    icon: Palette,
  },
  seo: {
    label: { fr: "SEO & visibilité", en: "SEO & visibility", vi: "SEO & hiển thị", ar: "SEO والظهور", ru: "SEO и видимость" },
    detail: { fr: "Structure, contenu, indexation, local", en: "Structure, content, indexing, local", vi: "Cấu trúc, nội dung, index, local", ar: "البنية والمحتوى والفهرسة والمحلي", ru: "Структура, контент, индексация, local" },
    icon: Search,
  },
  security: {
    label: { fr: "Sécurité", en: "Security", vi: "Bảo mật", ar: "الأمان", ru: "Безопасность" },
    detail: { fr: "HTTPS, headers, exposition, bonnes pratiques", en: "HTTPS, headers, exposure, best practices", vi: "HTTPS, headers, bảo mật, thực hành tốt", ar: "HTTPS والرؤوس وأسطح التعرض والممارسات الجيدة", ru: "HTTPS, заголовки, поверхность атаки, практики" },
    icon: ShieldCheck,
  },
  conversion: {
    label: { fr: "Conversion", en: "Conversion", vi: "Chuyển đổi", ar: "التحويل", ru: "Конверсия" },
    detail: { fr: "CTA, confiance, parcours, friction", en: "CTA, trust, journey, friction", vi: "CTA, tin cậy, hành trình, ma sát", ar: "CTA والثقة والمسار ونقاط الاحتكاك", ru: "CTA, доверие, путь, трение" },
    icon: Zap,
  },
  technical: {
    label: { fr: "Technique", en: "Technical", vi: "Kỹ thuật", ar: "تقني", ru: "Технический" },
    detail: { fr: "Performance, responsive, accessibilité", en: "Performance, responsive, accessibility", vi: "Hiệu năng, responsive, khả năng tiếp cận", ar: "الأداء والاستجابة وإمكانية الوصول", ru: "Производительность, responsive, доступность" },
    icon: Smartphone,
  },
};

const UI = {
  fr: {
    eyebrow: "AGENT XR · DIAGNOSTIC OFFERT",
    greeting1: "Bonjour, je suis votre",
    greetingAccent: "Agent XR.",
    intro: "J'analyse votre présence digitale et vous propose des actions concrètes pour accélérer votre croissance.",
    online: "En ligne",
    askPrompt: "Que souhaitez-vous analyser ?",
    optSiteTitle: "Mon site internet",
    optSiteDesc: "Performance, SEO, conversions",
    optMapsTitle: "Ma fiche Google Maps",
    optMapsDesc: "Visibilité locale, avis, positionnement",
    optFullTitle: "Audit complet",
    optFullDesc: "Site, Maps, réseaux sociaux et recommandations",
    inputPlaceholder: "Entrez l'URL de votre site (ex : monentreprise.fr)...",
    url: "URL de votre site",
    run: "Lancer mon audit gratuit",
    running: "Analyse en cours…",
    score: "Score indicatif",
    pdf: "Télécharger le rapport PDF",
    wa: "Échanger sur WhatsApp",
    retry: "Nouvelle analyse",
    sectorOther: "Secteur · autre",
    sectorResto: "Restaurant",
    sectorHosp: "Hôtellerie / Tourisme",
    sectorRealestate: "Immobilier",
    sectorCommerce: "Commerce",
    sectorService: "Service",
    signalsPublic: "Analyse instantanée des signaux publics · 100% gratuit",
    readingSite: "DIAGNOSTIC DU SITE",
    noTitle: "Titre non détecté",
    noDesc: "Aucune meta description détectée.",
    openSite: "Ouvrir",
    waPrefill: "Bonjour XR Agency, j'ai terminé mon audit digital. Site : ",
    pdfReport: "RAPPORT",
    pdfSiteAudited: "Site audité",
    pdfScore: "Score",
    pdfDetected: "Éléments détectés",
    pdfTitle: "Titre",
    pdfMeta: "Meta description",
    pdfNotDetected: "Non détecté",
    pdfFindings: "Constats",
    pdfToImprove: "À améliorer · ",
    pdfPositive: "Signal positif · ",
    pdfRecommendations: "Recommandations",
  },
  en: {
    eyebrow: "XR AGENT · FREE DIAGNOSTIC",
    greeting1: "Hello, I am your",
    greetingAccent: "XR Agent.",
    intro: "I analyze your digital presence and suggest concrete actions to accelerate your growth.",
    online: "Online",
    askPrompt: "What would you like to analyze?",
    optSiteTitle: "My website",
    optSiteDesc: "Performance, SEO, conversions",
    optMapsTitle: "My Google Maps listing",
    optMapsDesc: "Local visibility, reviews, ranking",
    optFullTitle: "Complete audit",
    optFullDesc: "Website, Maps, social media & roadmap",
    inputPlaceholder: "Enter your website URL (e.g. mycompany.com)...",
    url: "Your website URL",
    run: "Start free audit",
    running: "Analysing…",
    score: "Indicative score",
    pdf: "Download report PDF",
    wa: "Continue to WhatsApp",
    retry: "Run another audit",
    sectorOther: "Industry · other",
    sectorResto: "Restaurant / Bar",
    sectorHosp: "Hospitality / Tourism",
    sectorRealestate: "Real Estate",
    sectorCommerce: "Commerce / Retail",
    sectorService: "Services",
    signalsPublic: "Instant analysis of accessible public signals · Free",
    readingSite: "WEBSITE DIAGNOSTIC",
    noTitle: "Title not detected",
    noDesc: "No meta description detected.",
    openSite: "Open",
    waPrefill: "Hello XR Agency, I have completed my digital audit. Website: ",
    pdfReport: "REPORT",
    pdfSiteAudited: "Audited Website",
    pdfScore: "Score",
    pdfDetected: "Detected Elements",
    pdfTitle: "Title",
    pdfMeta: "Meta description",
    pdfNotDetected: "Not detected",
    pdfFindings: "Key Findings",
    pdfToImprove: "To improve · ",
    pdfPositive: "Positive signal · ",
    pdfRecommendations: "Recommendations",
  },
  vi: {
    eyebrow: "TRỢ LÝ XR · PHÂN TÍCH MIỄN PHÍ",
    greeting1: "Xin chào, tôi là",
    greetingAccent: "Agent XR.",
    intro: "Tôi phân tích hiện diện số và đề xuất hành động cụ thể để tăng tốc tăng trưởng cho bạn.",
    online: "Trực tuyến",
    askPrompt: "Bạn muốn phân tích hạng mục nào?",
    optSiteTitle: "Website của tôi",
    optSiteDesc: "Hiệu năng, SEO, tỷ lệ chuyển đổi",
    optMapsTitle: "Hồ sơ Google Maps",
    optMapsDesc: "Hiển thị địa phương, đánh giá, thứ hạng",
    optFullTitle: "Kiểm toán toàn diện",
    optFullDesc: "Website, Maps, mạng xã hội & đề xuất",
    inputPlaceholder: "Nhập URL website của bạn...",
    url: "URL website",
    run: "Bắt đầu audit miễn phí",
    running: "Đang phân tích…",
    score: "Điểm tham khảo",
    pdf: "Tải báo cáo PDF",
    wa: "Tiếp tục qua WhatsApp",
    retry: "Phân tích lại",
    sectorOther: "Lĩnh vực · khác",
    sectorResto: "Nhà hàng / Bar",
    sectorHosp: "Khách sạn / Du lịch",
    sectorRealestate: "Bất động sản",
    sectorCommerce: "Thương mại",
    sectorService: "Dịch vụ",
    signalsPublic: "Phân tích tức thì tín hiệu công khai · Miễn phí",
    readingSite: "PHÂN TÍCH WEBSITE",
    noTitle: "Không phát hiện tiêu đề",
    noDesc: "Không phát hiện mô tả meta.",
    openSite: "Mở",
    waPrefill: "Xin chào XR Agency, tôi vừa hoàn thành audit kỹ thuật số. Website: ",
    pdfReport: "BÁO CÁO",
    pdfSiteAudited: "Website được kiểm toán",
    pdfScore: "Điểm",
    pdfDetected: "Thành phần phát hiện",
    pdfTitle: "Tiêu đề",
    pdfMeta: "Mô tả meta",
    pdfNotDetected: "Không phát hiện",
    pdfFindings: "Các phát hiện",
    pdfToImprove: "Cần cải thiện · ",
    pdfPositive: "Tín hiệu tốt · ",
    pdfRecommendations: "Khuyến nghị",
  },
  ar: {
    eyebrow: "المستشار الذكي XR · تحليل مجاني",
    greeting1: "مرحباً، أنا مستشارك",
    greetingAccent: "Agent XR.",
    intro: "أقوم بتحليل حضورك الرقمي واقتراح خطوات عملية لتسريع نمو أعمالك.",
    online: "متصل الآن",
    askPrompt: "ما الذي ترغب في تحليله؟",
    optSiteTitle: "موقعي الإلكتروني",
    optSiteDesc: "الأداء، SEO ومعدلات التحويل",
    optMapsTitle: "ملفي على Google Maps",
    optMapsDesc: "الظهور المحلي، التقييمات والترتيب",
    optFullTitle: "تدقيق رقمي شامل",
    optFullDesc: "الموقع، الخرائط، الشبكات الاجتماعية والتوصيات",
    inputPlaceholder: "أدخل رابط موقعك الإلكتروني...",
    url: "رابط الموقع",
    run: "ابدأ التدقيق المجاني",
    running: "جارٍ التحليل…",
    score: "نتيجة إرشادية",
    pdf: "تحميل تقرير PDF",
    wa: "المتابعة عبر WhatsApp",
    retry: "تحليل جديد",
    sectorOther: "القطاع · آخر",
    sectorResto: "مطعم / مقهى",
    sectorHosp: "فندقة / سياحة",
    sectorRealestate: "عقارات",
    sectorCommerce: "تجارة",
    sectorService: "خدمات",
    signalsPublic: "تحليل فوري للإشارات العامة المتاحة · مجاناً",
    readingSite: "تقرير الموقع",
    noTitle: "لم يتم رصد العنوان",
    noDesc: "لم يتم رصد الوصف التعريفي.",
    openSite: "فتح",
    waPrefill: "مرحبًا XR Agency، أنهيت التدقيق الرقمي لموقعي: ",
    pdfReport: "تقرير",
    pdfSiteAudited: "الموقع المفحوص",
    pdfScore: "الدرجة",
    pdfDetected: "العناصر المرصودة",
    pdfTitle: "العنوان",
    pdfMeta: "الوصف التعريفي",
    pdfNotDetected: "غير مكتشف",
    pdfFindings: "النتائج والملاحظات",
    pdfToImprove: "بحاجة لتحسين · ",
    pdfPositive: "إشارة إيجابية · ",
    pdfRecommendations: "التوصيات",
  },
  ru: {
    eyebrow: "AGENT XR · БЕСПЛАТНЫЙ АУДИТ",
    greeting1: "Здравствуйте, я ваш",
    greetingAccent: "Agent XR.",
    intro: "Я проанализирую ваше цифровое присутствие и предложу конкретные шаги для роста продаж.",
    online: "Онлайн",
    askPrompt: "Что вы хотите проанализировать?",
    optSiteTitle: "Мой веб-сайт",
    optSiteDesc: "Скорость, SEO и конверсия",
    optMapsTitle: "Карточка Google Maps",
    optMapsDesc: "Локальная видимость, отзывы, позиции",
    optFullTitle: "Полный аудит",
    optFullDesc: "Сайт, Карты, соцсети и план действий",
    inputPlaceholder: "Введите URL вашего сайта...",
    url: "URL сайта",
    run: "Запустить бесплатный аудит",
    running: "Анализ…",
    score: "Ориентировочный балл",
    pdf: "Скачать PDF-отчёт",
    wa: "Продолжить в WhatsApp",
    retry: "Новый аудит",
    sectorOther: "Отрасль · другое",
    sectorResto: "Ресторан / бар",
    sectorHosp: "Отели / туризм",
    sectorRealestate: "Недвижимость",
    sectorCommerce: "Торговля",
    sectorService: "Услуги",
    signalsPublic: "Мгновенный анализ открытых сигналов · Бесплатно",
    readingSite: "ДИАГНОСТИКА САЙТА",
    noTitle: "Заголовок не обнаружен",
    noDesc: "Мета-описание не обнаружено.",
    openSite: "Открыть",
    waPrefill: "Здравствуйте, XR Agency! Я завершил цифровой аудит сайта: ",
    pdfReport: "ОТЧЁТ",
    pdfSiteAudited: "Проверенный сайт",
    pdfScore: "Оценка",
    pdfDetected: "Обнаруженные элементы",
    pdfTitle: "Заголовок",
    pdfMeta: "Мета-описание",
    pdfNotDetected: "Не обнаружено",
    pdfFindings: "Выводы",
    pdfToImprove: "Требует улучшения · ",
    pdfPositive: "Положительный сигнал · ",
    pdfRecommendations: "Рекомендации",
  },
} as const;

export function DigitalAudit() {
  const { lang } = useLang();
  const currentLang = (lang in UI ? lang : "fr") as Lang;
  const t = UI[currentLang] ?? UI.fr;

  const inputRef = useRef<HTMLInputElement>(null);
  const [focusMode, setFocusMode] = useState<"site" | "maps" | "full">("site");
  const [url, setUrl] = useState("");
  const [sector, setSector] = useState("restaurant");
  const [budget] = useState("1000_2500");
  const [types, setTypes] = useState<AuditType[]>(["design", "seo", "conversion", "technical"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    score: number;
    url: string;
    title: string;
    description: string;
    status: number;
    types: AuditType[];
    findings: Finding[];
    recommendations: Recommendation[];
  } | null>(null);

  const toggle = (id: AuditType) => setTypes((v) => (v.includes(id) ? (v.length > 1 ? v.filter((x) => x !== id) : v) : [...v, id]));

  const run = async (overrideTypes?: AuditType[]) => {
    const activeTypes = overrideTypes ?? types;
    if (!url.trim() || !activeTypes.length) {
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim(), types: activeTypes, sector, budget }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit unavailable");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit unavailable");
    } finally {
      setLoading(false);
    }
  };

  const selectQuickMode = (mode: "site" | "maps" | "full") => {
    setFocusMode(mode);
    if (mode === "maps") {
      const el = document.getElementById("maps");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    const nextTypes: AuditType[] =
      mode === "full"
        ? ["design", "seo", "security", "conversion", "technical"]
        : ["design", "seo", "conversion", "technical"];
    setTypes(nextTypes);
    if (url.trim()) {
      void run(nextTypes);
    } else {
      inputRef.current?.focus();
    }
  };

  const makePdf = () => {
    if (!result) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 14, R = 196;
    const ink = [18, 22, 29] as const;
    const blue = [180, 143, 90] as const;
    const muted = [92, 100, 112] as const;
    const soft = [242, 244, 247] as const;
    const line = [220, 224, 230] as const;
    const date = new Date().toLocaleDateString(
      currentLang === "fr" ? "fr-FR" : currentLang === "vi" ? "vi-VN" : currentLang === "ru" ? "ru-RU" : "en-US",
      { day: "2-digit", month: "2-digit", year: "numeric" }
    );
    const number = "XR-AUDIT-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);
    doc.setFillColor(...ink);
    doc.rect(0, 0, W, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("XRAGENCY", M, 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("AGENT XR · DIGITAL AUDIT REPORT", M, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(t.pdfReport, R, 12, { align: "right" });
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.text(number, R, 18, { align: "right" });
    doc.text(date, R, 23, { align: "right" });
    let y = 40;
    const section = (s: string) => {
      doc.setFillColor(...soft);
      doc.roundedRect(M, y - 4, W - 2 * M, 8, 1.5, 1.5, "F");
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(s.toUpperCase(), M + 3, y + 1);
      y += 12;
    };
    section(t.pdfSiteAudited);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(result.url, M, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.setFontSize(6.5);
    doc.text("HTTP " + result.status + " · " + result.types.join(" · "), M, y);
    y += 8;
    section(t.pdfScore);
    doc.setTextColor(...blue);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(result.score + "/100", M, y);
    y += 12;
    section(t.pdfDetected);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(t.pdfTitle, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize(result.title || t.pdfNotDetected, 140), M + 25, y);
    y += 7;
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.text(t.pdfMeta, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize(result.description || t.pdfNotDetected, 140), M + 25, y);
    y += 12;
    section(t.pdfFindings);
    result.findings.forEach((f, i) => {
      if (y > 268) {
        doc.addPage();
        y = 22;
      }
      doc.setTextColor(...ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(String(i + 1).padStart(2, "0") + " · " + f.label, M, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      doc.text(doc.splitTextToSize((f.status === false ? t.pdfToImprove : t.pdfPositive) + f.detail, 160), M + 12, y + 4);
      y += 12;
    });
    if (result.recommendations.length) {
      y += 2;
      section(t.pdfRecommendations);
      result.recommendations.forEach((x, i) => {
        if (y > 268) {
          doc.addPage();
          y = 22;
        }
        doc.setTextColor(...ink);
        doc.setFont("helvetica", "bold");
        doc.text(String(i + 1).padStart(2, "0") + " · " + x.service, M, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(x.reason, 160), M + 12, y + 4);
        y += 12;
      });
    }
    doc.setDrawColor(...line);
    doc.line(M, 282, R, 282);
    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.text("KARMA SASU · XRAGENCY", M, 288);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris", M, 293);
    doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com", M, 298);
    doc.save("XRAGENCY-Digital-Audit-" + number + ".pdf");
  };

  const wa = CONTACT.whatsapp + "?text=" + encodeURIComponent(t.waPrefill + (url || "xragencyai.com"));

  return (
    <section id="audit" className="relative overflow-hidden border-y border-[#101114]/10 bg-[#f8f6f0] py-12 sm:py-16 lg:py-20 text-[#141312]">
      <div className="relative mx-auto max-w-[1320px] px-3.5 sm:px-6 lg:px-8">
        {/* Desktop split / Mobile stacked obsidian portrait + cream sheet (Screen 2) */}
        <div className="overflow-hidden rounded-[2rem] border border-[#141312]/15 bg-[#11100f] shadow-[0_35px_100px_-30px_rgba(16,14,10,0.45)] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
          {/* Obsidian Left/Top Concierge Portrait Panel */}
          <div className="relative flex min-h-[340px] sm:min-h-[380px] lg:min-h-[540px] flex-col justify-between overflow-hidden px-5 pt-6 pb-10 sm:px-8 sm:pt-8 lg:p-10 text-white">
            <img
              src={agentXrPortrait}
              alt="Agent XR"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_18%] contrast-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,15,0.65)_0%,rgba(17,16,15,0.18)_42%,rgba(17,16,15,0.92)_85%,#11100f_100%)]" />

            {/* Top HUD Row matching Screen 2 */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="label-mono text-[8.5px] font-bold tracking-[.26em] text-white/90">
                X R A G E N C Y
              </span>

              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-xl">
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#c5a880]/40 bg-[#1a1713] font-serif text-[11px] font-bold text-[#e5c99b]">
                  AX
                </span>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white">Agent XR</span>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 text-[9.5px] text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {loading ? t.running : t.online}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Greeting */}
            <div className="relative z-10 mt-auto pt-24 lg:pt-32">
              <span className="label-mono text-[7px] font-bold tracking-[.22em] text-[#c5a880] uppercase">
                {t.eyebrow}
              </span>
              <h2 className="display-serif mt-2 text-[clamp(1.85rem,3.4vw,2.9rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                {t.greeting1}{" "}
                <span className="block font-serif italic font-light text-[#d4b686]">{t.greetingAccent}</span>
              </h2>
              <p className="mt-2.5 max-w-md text-xs sm:text-sm text-white/80 leading-relaxed">
                {t.intro}
              </p>
            </div>
          </div>

          {/* Warm Cream Interactive Sheet (Right on Desktop / Sliding Over Bottom on Mobile) */}
          <div className="-mt-6 lg:mt-0 relative z-20 flex flex-col justify-between rounded-t-[1.85rem] lg:rounded-t-none bg-[#f7f4ed] px-4 py-6 sm:px-8 sm:py-8 lg:p-10 text-[#141312]">
            {!result ? (
              <div className="flex flex-col h-full justify-between space-y-5">
                <div>
                  <h3 className="text-center lg:text-left text-base sm:text-lg font-bold tracking-tight text-[#141312]">
                    {t.askPrompt}
                  </h3>

                  {/* 3 Interactive Quick Analysis Options matching Screen 2 */}
                  <div className="mt-4 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => selectQuickMode("site")}
                      className={
                        "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all " +
                        (focusMode === "site"
                          ? "border-[#b48f5a] bg-white shadow-[0_12px_30px_-10px_rgba(180,143,90,0.28)] ring-1 ring-[#b48f5a]/40"
                          : "border-[#e3ddd2] bg-white/85 hover:border-[#b48f5a]/70 hover:bg-white")
                      }
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1ece1] text-[#141312] group-hover:bg-[#141312] group-hover:text-[#e5c99b] transition-colors">
                          <Laptop className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-[#141312]">{t.optSiteTitle}</span>
                          <span className="block text-[11px] text-[#6b655c] truncate">{t.optSiteDesc}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#6b655c] transition-transform group-hover:translate-x-1 group-hover:text-[#141312]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => selectQuickMode("maps")}
                      className={
                        "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all " +
                        (focusMode === "maps"
                          ? "border-[#b48f5a] bg-white shadow-[0_12px_30px_-10px_rgba(180,143,90,0.28)] ring-1 ring-[#b48f5a]/40"
                          : "border-[#e3ddd2] bg-white/85 hover:border-[#b48f5a]/70 hover:bg-white")
                      }
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1ece1] text-[#141312] group-hover:bg-[#141312] group-hover:text-[#e5c99b] transition-colors">
                          <MapPin className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-[#141312]">{t.optMapsTitle}</span>
                          <span className="block text-[11px] text-[#6b655c] truncate">{t.optMapsDesc}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#6b655c] transition-transform group-hover:translate-x-1 group-hover:text-[#141312]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => selectQuickMode("full")}
                      className={
                        "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all " +
                        (focusMode === "full"
                          ? "border-[#b48f5a] bg-white shadow-[0_12px_30px_-10px_rgba(180,143,90,0.28)] ring-1 ring-[#b48f5a]/40"
                          : "border-[#e3ddd2] bg-white/85 hover:border-[#b48f5a]/70 hover:bg-white")
                      }
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1ece1] text-[#141312] group-hover:bg-[#141312] group-hover:text-[#e5c99b] transition-colors">
                          <BarChart3 className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-[#141312]">{t.optFullTitle}</span>
                          <span className="block text-[11px] text-[#6b655c] truncate">{t.optFullDesc}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#6b655c] transition-transform group-hover:translate-x-1 group-hover:text-[#141312]" />
                    </button>
                  </div>

                  {/* Compact Sector & Axes refinement strip */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <select
                      aria-label="Secteur"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="rounded-full border border-[#dfd8ca] bg-white px-3 py-1.5 text-[10.5px] font-semibold text-[#141312] outline-none"
                    >
                      <option value="restaurant">{t.sectorResto}</option>
                      <option value="hospitality">{t.sectorHosp}</option>
                      <option value="realestate">{t.sectorRealestate}</option>
                      <option value="commerce">{t.sectorCommerce}</option>
                      <option value="service">{t.sectorService}</option>
                      <option value="other">{t.sectorOther}</option>
                    </select>

                    {(Object.entries(TYPES) as [AuditType, typeof TYPES[AuditType]][]).map(([id, item]) => {
                      const active = types.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggle(id)}
                          className={
                            "rounded-full border px-2.5 py-1 text-[10px] font-semibold transition " +
                            (active
                              ? "border-[#b48f5a] bg-[#141312] text-[#e5c99b]"
                              : "border-[#dfd8ca] bg-white/75 text-[#6b655c] hover:text-[#141312]")
                          }
                        >
                          {item.label[currentLang] ?? item.label.fr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Screen 2 Conversational Bottom Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void run();
                  }}
                  className="pt-2"
                >
                  <div className="flex items-center gap-2 rounded-full border border-[#d6cfc1] bg-white p-1.5 pl-2.5 shadow-[0_10px_30px_-10px_rgba(16,14,10,0.12)] focus-within:border-[#b48f5a]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#efeae0] text-[#5c554a]">
                      <AudioLines className="h-4 w-4" />
                    </span>
                    <input
                      ref={inputRef}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={t.inputPlaceholder}
                      className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm font-medium text-[#141312] placeholder:text-[#8c8478] outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label={t.run}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#141312] px-4 text-xs font-bold text-white transition hover:bg-[#2c2823] disabled:opacity-40"
                    >
                      {loading ? <span className="text-[11px]">{t.running}</span> : <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-[#787062]">{t.signalsPublic}</p>
                  {error && (
                    <div className="mt-3 rounded-xl border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* Completed Audit Diagnostic Results in Screen 2 / Screen 3 Unified Style */
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e3ddd2] bg-white p-4">
                  <div className="min-w-0">
                    <span className="label-mono text-[6.5px] font-bold text-[#8b704f] uppercase">{t.readingSite}</span>
                    <h3 className="mt-0.5 text-sm sm:text-base font-bold text-[#141312] truncate">{result.title || t.noTitle}</h3>
                    <p className="text-[11px] text-[#6b655c] line-clamp-1">{result.description || result.url}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative grid h-16 w-16 place-items-center rounded-full border-[5px] border-[#b48f5a]/25 bg-[#f7f4ed]">
                      <span className="text-base font-black text-[#141312]">{result.score}<span className="text-[10px] font-normal">/100</span></span>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.openSite}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#dfd8ca] text-[#5c554a] hover:border-[#141312] hover:text-[#141312]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {result.findings.slice(0, 4).map((f, i) => (
                    <div key={f.label + i} className="rounded-2xl border border-[#e3ddd2] bg-white p-3.5">
                      <div className="flex items-center gap-2">
                        <span className={"grid h-5 w-5 shrink-0 place-items-center rounded-full text-white " + (f.status === false ? "bg-amber-500" : "bg-emerald-600")}>
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </span>
                        <span className="text-xs font-bold text-[#141312] truncate">{f.label}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-[#6b655c]">{f.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#e3ddd2]">
                  <button
                    type="button"
                    onClick={makePdf}
                    className="inline-flex items-center gap-2 rounded-full bg-[#141312] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#2a2723]"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {t.pdf}
                  </button>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#b48f5a] bg-[#efe9dc] px-5 py-2.5 text-xs font-bold text-[#141312] hover:bg-[#141312] hover:text-white transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {t.wa}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setError("");
                    }}
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b655c] hover:text-[#141312]"
                  >
                    <Globe2 className="h-3.5 w-3.5" />
                    {t.retry}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
