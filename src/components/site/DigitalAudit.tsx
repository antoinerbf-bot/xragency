import { useState } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Globe2,
  Mail,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Zap,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { CONTACT } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import { Reveal } from "./primitives";

type AuditType = "design" | "seo" | "security" | "conversion" | "technical";
type Finding = { label: string; detail: string; status?: boolean };
type Recommendation = { service: string; reason: string };

interface AuditResult {
  score: number;
  pillarScores?: Record<string, number>;
  url: string;
  title: string;
  description: string;
  status: number;
  types: AuditType[];
  findings: Finding[];
  recommendations: Recommendation[];
}

const PILLARS: Record<
  AuditType,
  { label: Record<Lang, string>; detail: Record<Lang, string>; icon: typeof Palette }
> = {
  design: {
    label: {
      fr: "Design & UX",
      en: "Design & UX",
      vi: "Thiết kế & UX",
      ar: "التصميم وتجربة المستخدم",
      ru: "Дизайн и UX",
    },
    detail: {
      fr: "Hiérarchie, lisibilité, mobile",
      en: "Hierarchy, readability, mobile",
      vi: "Cấu trúc, khả năng đọc, di động",
      ar: "التسلسل والوضوح والجوال",
      ru: "Иерархия, читабельность, mobile",
    },
    icon: Palette,
  },
  seo: {
    label: {
      fr: "SEO & visibilité",
      en: "SEO & visibility",
      vi: "SEO & hiển thị",
      ar: "SEO والظهور",
      ru: "SEO и видимость",
    },
    detail: {
      fr: "Balises, structure Hn, canonical",
      en: "Tags, headings, canonical",
      vi: "Thẻ tiêu đề, Hn, canonical",
      ar: "العناوين والبيانات الوصفية",
      ru: "Теги, заголовки, canonical",
    },
    icon: Search,
  },
  security: {
    label: {
      fr: "Sécurité",
      en: "Security",
      vi: "Bảo mật",
      ar: "الأمان",
      ru: "Безопасность",
    },
    detail: {
      fr: "HTTPS, headers HTTP, bonnes pratiques",
      en: "HTTPS, HTTP headers, best practices",
      vi: "HTTPS, HTTP headers, tiêu chuẩn",
      ar: "HTTPS ورؤوس الأمان",
      ru: "HTTPS, заголовки безопасности",
    },
    icon: ShieldCheck,
  },
  conversion: {
    label: {
      fr: "Conversion",
      en: "Conversion",
      vi: "Chuyển đổi",
      ar: "التحويل",
      ru: "Конверсия",
    },
    detail: {
      fr: "Appels à l’action, parcours contact",
      en: "Calls to action, contact path",
      vi: "Nút hành động, luồng liên hệ",
      ar: "دعوات الإجراء ومسار التواصل",
      ru: "CTA и путь к обращению",
    },
    icon: Zap,
  },
  technical: {
    label: {
      fr: "Technique",
      en: "Technical",
      vi: "Kỹ thuật",
      ar: "تقني",
      ru: "Техническая база",
    },
    detail: {
      fr: "Poids HTML, cache, responsive",
      en: "HTML weight, cache, responsive",
      vi: "Dung lượng HTML, cache, responsive",
      ar: "وزن الصفحة والتخزين المؤقت",
      ru: "Вес HTML, кэш, адаптивность",
    },
    icon: Smartphone,
  },
};

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    urlLabel: string;
    urlPlaceholder: string;
    sectorLabel: string;
    budgetLabel: string;
    axesLabel: string;
    run: string;
    running: string;
    publicNote: string;
    awaitingTitle: string;
    awaitingNote: string;
    statusReady: string;
    statusScanning: string;
    scoreLabel: string;
    strengths: string;
    improvements: string;
    recommendations: string;
    readingSite: string;
    noTitle: string;
    noDesc: string;
    openSite: string;
    pdfBtn: string;
    waBtn: string;
    retryBtn: string;
    emailTitle: string;
    emailName: string;
    emailAddr: string;
    emailSend: string;
    emailSent: string;
    waPrefill: string;
    sectors: Record<string, string>;
    pdfReport: string;
    pdfSite: string;
    pdfScore: string;
    pdfPillars: string;
    pdfFindings: string;
    pdfRecs: string;
    pdfFooterNote: string;
  }
> = {
  fr: {
    eyebrow: "DIAGNOSTIC DIGITAL · 5 PILIERS",
    title: "Avant de refaire,",
    accent: "mesurons l’existant.",
    intro:
      "Indiquez l’URL de votre site. Nous analysons en direct les signaux publics accessibles sur 5 piliers (Design & UX, SEO, Sécurité, Conversion, Technique) et générons un rapport PDF exploitable.",
    urlLabel: "URL de votre site web",
    urlPlaceholder: "https://votresite.com",
    sectorLabel: "Secteur d’activité",
    budgetLabel: "Budget envisagé",
    axesLabel: "Piliers à évaluer",
    run: "Lancer le diagnostic",
    running: "Analyse en cours…",
    publicNote: "Analyse réelle des signaux HTML et en-têtes publics accessibles — aucune donnée inventée.",
    awaitingTitle: "5 piliers évalués en direct",
    awaitingNote: "Les jauges se calculent uniquement à partir des données collectées après lancement de l’analyse.",
    statusReady: "Prêt à analyser",
    statusScanning: "Analyse en cours",
    scoreLabel: "Score global indicatif",
    strengths: "Points forts détectés",
    improvements: "Points d’amélioration",
    recommendations: "Recommandations prioritaires",
    readingSite: "Lecture publique détectée",
    noTitle: "Balise titre non détectée",
    noDesc: "Aucune meta description détectée.",
    openSite: "Ouvrir",
    pdfBtn: "Exporter le diagnostic en PDF",
    waBtn: "Échanger sur WhatsApp",
    retryBtn: "Nouvelle analyse",
    emailTitle: "Recevoir une étude approfondie par e-mail",
    emailName: "Votre nom",
    emailAddr: "Votre e-mail",
    emailSend: "Transmettre mon diagnostic",
    emailSent: "Diagnostic transmis à notre équipe.",
    waPrefill: "Bonjour XR Agency, je viens de réaliser le diagnostic 5 piliers pour mon site : ",
    sectors: {
      other: "Secteur · autre",
      restaurant: "Restauration",
      hospitality: "Hôtellerie / Tourisme",
      realestate: "Immobilier",
      commerce: "Commerce / E-commerce",
      service: "Services / Conseil",
    },
    pdfReport: "RAPPORT DE DIAGNOSTIC 5 PILIERS",
    pdfSite: "Site analysé",
    pdfScore: "Score global",
    pdfPillars: "Scores par pilier",
    pdfFindings: "Constats relevés",
    pdfRecs: "Recommandations",
    pdfFooterNote: "Diagnostic indicatif basé sur les signaux publics accessibles.",
  },
  en: {
    eyebrow: "DIGITAL ASSESSMENT · 5 PILLARS",
    title: "Before rebuilding,",
    accent: "measure what exists.",
    intro:
      "Enter your website URL. We inspect accessible public signals across 5 pillars (Design & UX, SEO, Security, Conversion, Technical) and generate an actionable PDF report.",
    urlLabel: "Your website URL",
    urlPlaceholder: "https://yourwebsite.com",
    sectorLabel: "Industry",
    budgetLabel: "Planned budget",
    axesLabel: "Pillars to evaluate",
    run: "Run the assessment",
    running: "Analysing…",
    publicNote: "Real inspection of accessible HTML and public HTTP headers — no fabricated scores.",
    awaitingTitle: "5 live pillars",
    awaitingNote: "Gauges are computed strictly from collected data once the analysis runs.",
    statusReady: "Ready to scan",
    statusScanning: "Scanning",
    scoreLabel: "Indicative overall score",
    strengths: "Detected strengths",
    improvements: "Areas to improve",
    recommendations: "Priority recommendations",
    readingSite: "Detected public metadata",
    noTitle: "Title tag not detected",
    noDesc: "No meta description detected.",
    openSite: "Open",
    pdfBtn: "Export PDF report",
    waBtn: "Discuss on WhatsApp",
    retryBtn: "Run another scan",
    emailTitle: "Request a deeper review by email",
    emailName: "Your name",
    emailAddr: "Your email",
    emailSend: "Send my assessment",
    emailSent: "Assessment shared with our team.",
    waPrefill: "Hello XR Agency, I completed the 5-pillar digital assessment for my website: ",
    sectors: {
      other: "Industry · other",
      restaurant: "Restaurant / Bar",
      hospitality: "Hospitality / Travel",
      realestate: "Real Estate",
      commerce: "Retail / E-commerce",
      service: "Services / Advisory",
    },
    pdfReport: "5-PILLAR DIGITAL ASSESSMENT",
    pdfSite: "Audited website",
    pdfScore: "Overall score",
    pdfPillars: "Pillar scores",
    pdfFindings: "Findings",
    pdfRecs: "Recommendations",
    pdfFooterNote: "Indicative assessment based on accessible public web signals.",
  },
  vi: {
    eyebrow: "ĐÁNH GIÁ KỸ THUẬT SỐ · 5 TRỤ CỘT",
    title: "Trước khi làm lại,",
    accent: "hãy đo lường hiện trạng.",
    intro:
      "Nhập URL website của bạn. Chúng tôi phân tích trực tiếp các tín hiệu công khai trên 5 trụ cột và tạo báo cáo PDF chi tiết.",
    urlLabel: "URL website của bạn",
    urlPlaceholder: "https://websitecuaban.com",
    sectorLabel: "Lĩnh vực",
    budgetLabel: "Ngân sách dự kiến",
    axesLabel: "Các trụ cột cần đánh giá",
    run: "Chạy đánh giá",
    running: "Đang phân tích…",
    publicNote: "Phân tích thực tế các tín hiệu HTML và HTTP công khai — không dùng số liệu giả.",
    awaitingTitle: "5 trụ cột đo trực tiếp",
    awaitingNote: "Chỉ số chỉ hiển thị sau khi thu thập dữ liệu thực tế từ website.",
    statusReady: "Sẵn sàng",
    statusScanning: "Đang quét",
    scoreLabel: "Điểm tổng thể tham khảo",
    strengths: "Điểm mạnh phát hiện",
    improvements: "Điểm cần cải thiện",
    recommendations: "Khuyến nghị ưu tiên",
    readingSite: "Dữ liệu công khai phát hiện",
    noTitle: "Không thấy thẻ tiêu đề",
    noDesc: "Không phát hiện meta description.",
    openSite: "Mở trang",
    pdfBtn: "Xuất báo cáo PDF",
    waBtn: "Trao đổi qua WhatsApp",
    retryBtn: "Phân tích lại",
    emailTitle: "Nhận tư vấn chuyên sâu qua email",
    emailName: "Họ tên",
    emailAddr: "Email của bạn",
    emailSend: "Gửi kết quả đánh giá",
    emailSent: "Đã gửi kết quả tới đội ngũ XR Agency.",
    waPrefill: "Xin chào XR Agency, tôi vừa thực hiện đánh giá 5 trụ cột cho website: ",
    sectors: {
      other: "Lĩnh vực · khác",
      restaurant: "Nhà hàng",
      hospitality: "Khách sạn / Du lịch",
      realestate: "Bất động sản",
      commerce: "Thương mại",
      service: "Dịch vụ",
    },
    pdfReport: "BÁO CÁO ĐÁNH GIÁ 5 TRỤ CỘT",
    pdfSite: "Website phân tích",
    pdfScore: "Điểm tổng thể",
    pdfPillars: "Điểm từng trụ cột",
    pdfFindings: "Phát hiện",
    pdfRecs: "Khuyến nghị",
    pdfFooterNote: "Đánh giá tham khảo dựa trên tín hiệu công khai có thể truy cập.",
  },
  ar: {
    eyebrow: "التشخيص الرقمي · 5 محاور",
    title: "قبل إعادة البناء،",
    accent: "لنقم بقياس الواقع.",
    intro:
      "أدخل رابط موقعك. نقوم بفحص الإشارات العامة المتاحة عبر 5 محاور (التصميم، SEO، الأمان، التحويل، التقنية) وننشئ تقرير PDF عملي.",
    urlLabel: "رابط موقعك الإلكتروني",
    urlPlaceholder: "https://yourwebsite.com",
    sectorLabel: "القطاع",
    budgetLabel: "الميزانية المتوقعة",
    axesLabel: "المحاور المطلوب تقييمها",
    run: "بدء التشخيص",
    running: "جارٍ التحليل…",
    publicNote: "فحص حقيقي لإشارات HTML ورؤوس HTTP العامة — دون أي أرقام مخترعة.",
    awaitingTitle: "5 محاور تُقاس مباشرة",
    awaitingNote: "تُحسب المؤشرات فقط بناءً على البيانات الفعلية بعد تشغيل الفحص.",
    statusReady: "جاهز للفحص",
    statusScanning: "جارٍ الفحص",
    scoreLabel: "الدرجة الإرشادية العامة",
    strengths: "نقاط القوة المرصودة",
    improvements: "نقاط التحسين",
    recommendations: "التوصيات ذات الأولوية",
    readingSite: "البيانات العامة المرصودة",
    noTitle: "لم يتم رصد العنوان",
    noDesc: "لم يتم رصد الوصف التعريفي.",
    openSite: "فتح",
    pdfBtn: "تصدير التقرير بصيغة PDF",
    waBtn: "المناقشة عبر واتساب",
    retryBtn: "تحليل جديد",
    emailTitle: "طلب مراجعة أعمق عبر البريد",
    emailName: "الاسم",
    emailAddr: "البريد الإلكتروني",
    emailSend: "إرسال التشخيص",
    emailSent: "تم إرسال التشخيص إلى فريقنا.",
    waPrefill: "مرحباً XR Agency، أجريت التشخيص الرقمي ذو 5 محاور لموقعي: ",
    sectors: {
      other: "القطاع · آخر",
      restaurant: "مطاعم",
      hospitality: "فندقة وسياحة",
      realestate: "عقارات",
      commerce: "تجارة",
      service: "خدمات",
    },
    pdfReport: "تقرير التشخيص الرقمي",
    pdfSite: "الموقع المفحوص",
    pdfScore: "الدرجة العامة",
    pdfPillars: "نتائج المحاور",
    pdfFindings: "الملاحظات",
    pdfRecs: "التوصيات",
    pdfFooterNote: "تقييم إرشادي مبني على الإشارات العامة المتاحة.",
  },
  ru: {
    eyebrow: "ЦИФРОВАЯ ДИАГНОСТИКА · 5 ОПОР",
    title: "Прежде чем обновлять,",
    accent: "измерим текущее состояние.",
    intro:
      "Введите URL вашего сайта. Мы анализируем доступные публичные сигналы по 5 направлениям (Дизайн и UX, SEO, Безопасность, Конверсия, Техническая база) и формируем PDF-отчёт.",
    urlLabel: "URL вашего сайта",
    urlPlaceholder: "https://yoursite.com",
    sectorLabel: "Отрасль",
    budgetLabel: "Планируемый бюджет",
    axesLabel: "Направления оценки",
    run: "Запустить диагностику",
    running: "Идёт анализ…",
    publicNote: "Реальная проверка HTML и публичных HTTP-заголовков — без выдуманных оценок.",
    awaitingTitle: "5 направлений в реальном времени",
    awaitingNote: "Шкалы рассчитываются строго на основе собранных данных после запуска проверки.",
    statusReady: "Готово к проверке",
    statusScanning: "Сканирование",
    scoreLabel: "Общий ориентировочный балл",
    strengths: "Выявленные сильные стороны",
    improvements: "Зоны для улучшения",
    recommendations: "Приоритетные рекомендации",
    readingSite: "Публичные метаданные",
    noTitle: "Тег title не найден",
    noDesc: "Meta description не обнаружен.",
    openSite: "Открыть",
    pdfBtn: "Скачать отчёт PDF",
    waBtn: "Обсудить в WhatsApp",
    retryBtn: "Новая проверка",
    emailTitle: "Запросить подробный разбор по e-mail",
    emailName: "Ваше имя",
    emailAddr: "Ваш e-mail",
    emailSend: "Отправить диагностику",
    emailSent: "Диагностика отправлена нашей команде.",
    waPrefill: "Здравствуйте, XR Agency! Я прошёл цифровую диагностику по 5 направлениям для сайта: ",
    sectors: {
      other: "Отрасль · другое",
      restaurant: "Рестораны",
      hospitality: "Отели и туризм",
      realestate: "Недвижимость",
      commerce: "Коммерция",
      service: "Услуги",
    },
    pdfReport: "ОТЧЁТ ЦИФРОВОЙ ДИАГНОСТИКИ",
    pdfSite: "Проверенный сайт",
    pdfScore: "Общий балл",
    pdfPillars: "Оценки по направлениям",
    pdfFindings: "Выводы",
    pdfRecs: "Рекомендации",
    pdfFooterNote: "Ориентировочная оценка на основе публично доступных веб-сигналов.",
  },
};

function SvgGauge({ value, label, size = 84 }: { value: number | null; label: string; size?: number }) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = value === null ? 0 : Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={value === null ? "rgba(255,255,255,0.2)" : (value >= 80 ? "#16A34A" : value >= 50 ? "#3B82F6" : "#EF4444")}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-[#F7F4EE]">
          {value === null ? "—" : `${clamped}`}
        </div>
      </div>
      <span className="text-[11px] font-medium text-white/75">{label}</span>
    </div>
  );
}

export function DigitalAudit() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;

  const [url, setUrl] = useState("");
  const [sector, setSector] = useState("other");
  const [budget, setBudget] = useState("1000_2500");
  const [types, setTypes] = useState<AuditType[]>([
    "design",
    "seo",
    "security",
    "conversion",
    "technical",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const toggle = (id: AuditType) =>
    setTypes((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const run = async () => {
    if (!url.trim() || !types.length) return;
    setLoading(true);
    setError("");
    setResult(null);
    setEmailSent(false);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, types, sector, budget }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit unavailable");
      setResult(data as AuditResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit unavailable");
    } finally {
      setLoading(false);
    }
  };

  const sendAuditByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !leadName.trim() || !leadEmail.trim()) return;
    setEmailSending(true);
    try {
      const summaryLines = [
        `URL: ${result.url}`,
        `Score global: ${result.score}/100`,
        ...(result.pillarScores
          ? Object.entries(result.pillarScores).map(([k, v]) => `- ${k}: ${v}/100`)
          : []),
        `Constats: ${result.findings.map((f) => `${f.label}: ${f.detail}`).join(" | ")}`,
      ].join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          website: result.url,
          need: "Diagnostic Digital 5 Piliers",
          message: summaryLines,
        }),
      });
      if (res.ok) setEmailSent(true);
    } finally {
      setEmailSending(false);
    }
  };

  const makePdf = () => {
    if (!result) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const M = 16;
    const R = W - M;
    const charcoal: [number, number, number] = [23, 22, 19];
    const bronze: [number, number, number] = [158, 127, 90];
    const muted: [number, number, number] = [92, 87, 79];
    const cream: [number, number, number] = [247, 244, 238];

    const dateStr = new Date().toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR");
    const ref = "XR-DIAG-" + new Date().toISOString().slice(0, 10).replace(/-/g, "");

    // Header
    doc.setFillColor(...charcoal);
    doc.rect(0, 0, W, 32, "F");
    doc.setTextColor(247, 244, 238);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("XR AGENCY", M, 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...bronze);
    doc.text(c.pdfReport, M, 22);
    doc.setTextColor(247, 244, 238);
    doc.text(`${ref} · ${dateStr}`, R, 18, { align: "right" });

    let y = 44;
    const heading = (label: string) => {
      doc.setFillColor(...cream);
      doc.rect(M, y - 5, W - 2 * M, 8, "F");
      doc.setTextColor(...charcoal);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(label.toUpperCase(), M + 3, y);
      y += 10;
    };

    heading(c.pdfSite);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(result.url, M, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(`HTTP ${result.status} · ${result.title || c.noTitle}`, M, y);
    y += 10;

    heading(c.pdfScore);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(...bronze);
    doc.text(`${result.score} / 100`, M, y + 3);
    y += 13;

    if (result.pillarScores) {
      heading(c.pdfPillars);
      doc.setFontSize(8.5);
      (Object.keys(PILLARS) as AuditType[]).forEach((k) => {
        const val = result.pillarScores?.[k];
        if (typeof val === "number") {
          doc.setTextColor(...charcoal);
          doc.setFont("helvetica", "bold");
          doc.text(`${PILLARS[k].label[lang]}:`, M, y);
          doc.setTextColor(...bronze);
          doc.text(`${val}/100`, M + 52, y);
          y += 6;
        }
      });
      y += 4;
    }

    heading(c.pdfFindings);
    result.findings.forEach((f, i) => {
      if (y > 264) {
        doc.addPage();
        y = 22;
      }
      doc.setTextColor(...charcoal);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(`${String(i + 1).padStart(2, "0")} · ${f.label}`, M, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...muted);
      const lines = doc.splitTextToSize(f.detail, W - 2 * M - 6);
      doc.text(lines, M + 6, y + 4.5);
      y += 6 + lines.length * 4;
    });

    if (result.recommendations.length) {
      y += 4;
      if (y > 250) {
        doc.addPage();
        y = 22;
      }
      heading(c.pdfRecs);
      result.recommendations.forEach((rec, i) => {
        if (y > 264) {
          doc.addPage();
          y = 22;
        }
        doc.setTextColor(...charcoal);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(`${String(i + 1).padStart(2, "0")} · ${rec.service}`, M, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...muted);
        const lines = doc.splitTextToSize(rec.reason, W - 2 * M - 6);
        doc.text(lines, M + 6, y + 4.5);
        y += 6 + lines.length * 4;
      });
    }

    doc.setDrawColor(215, 208, 196);
    doc.line(M, 280, R, 280);
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text(`${c.pdfFooterNote} · contact.xragency@gmail.com · +33 7 67 56 67 83`, M, 286);
    doc.save(`XR-Agency-Diagnostic-${ref}.pdf`);
  };

  const strengths = result?.findings.filter((f) => f.status !== false) ?? [];
  const improvements = result?.findings.filter((f) => f.status === false) ?? [];
  const waHref = `${CONTACT.whatsapp}?text=${encodeURIComponent(c.waPrefill + (result?.url || url))}`;

  return (
    <section
      id="audit"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative border-y border-[#171613]/12 bg-[#EEE9E0] py-20 text-[#171613] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-[#171613]/12 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#9E7F5A]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7D6344]">
                  {c.eyebrow}
                </span>
              </div>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#171613]">
                {c.title}{" "}
                <span className="font-serif font-normal italic text-[#9E7F5A]">{c.accent}</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C574F] sm:text-[15px]">
                {c.intro}
              </p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#171613]/15 bg-white px-4 py-2 text-xs font-medium text-[#171613] lg:self-auto">
              <span
                className={`h-2 w-2 rounded-full ${loading ? "bg-[#9E7F5A] animate-pulse" : "bg-[#171613]"}`}
              />
              <span>{loading ? c.statusScanning : c.statusReady}</span>
            </div>
          </div>
        </Reveal>

        {!result && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            {/* Left form */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#171613]/12 bg-white p-6 shadow-sm sm:p-7">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="xr-audit-url"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#171613]"
                  >
                    <Globe2 className="h-4 w-4 text-[#8A6D49]" />
                    {c.urlLabel}
                  </label>
                  <input
                    id="xr-audit-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={c.urlPlaceholder}
                    className="min-h-12 w-full rounded-xl border border-[#171613]/18 bg-[#FAF8F4] px-4 font-mono text-sm text-[#171613] outline-none transition focus:border-[#9E7F5A] focus:bg-white"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="xr-audit-sector"
                      className="mb-1.5 block text-xs font-medium text-[#5C574F]"
                    >
                      {c.sectorLabel}
                    </label>
                    <select
                      id="xr-audit-sector"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-[#171613]/18 bg-[#FAF8F4] px-3 text-xs font-medium text-[#171613] outline-none focus:border-[#9E7F5A]"
                    >
                      {Object.entries(c.sectors).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="xr-audit-budget"
                      className="mb-1.5 block text-xs font-medium text-[#5C574F]"
                    >
                      {c.budgetLabel}
                    </label>
                    <select
                      id="xr-audit-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-[#171613]/18 bg-[#FAF8F4] px-3 text-xs font-medium text-[#171613] outline-none focus:border-[#9E7F5A]"
                    >
                      <option value="under500">&lt; 500 €</option>
                      <option value="500_1000">500 – 1 000 €</option>
                      <option value="1000_2500">1 000 – 2 500 €</option>
                      <option value="2500_5000">2 500 – 5 000 €</option>
                      <option value="5000_plus">5 000 € +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-xs font-semibold text-[#171613]">
                    {c.axesLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(Object.entries(PILLARS) as [AuditType, (typeof PILLARS)[AuditType]][]).map(
                      ([id, meta]) => {
                        const Icon = meta.icon;
                        const active = types.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(id)}
                            className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-start text-xs transition ${
                              active
                                ? "border-[#171613] bg-[#171613] font-semibold text-[#F7F4EE]"
                                : "border-[#171613]/15 bg-[#FAF8F4] text-[#4E4A42] hover:border-[#9E7F5A]"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{meta.label[lang]}</span>
                            {active && <Check className="ms-auto h-3.5 w-3.5 shrink-0 text-emerald-600" />}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-[#171613]/10 pt-5">
                <button
                  type="button"
                  onClick={run}
                  disabled={!url.trim() || !types.length || loading}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171613] px-6 py-3 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2C2A24] disabled:opacity-40"
                >
                  <span>{loading ? c.running : c.run}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
                <p className="mt-2.5 text-center text-[11px] text-[#6E685F]">{c.publicNote}</p>
              </div>
            </div>

            {/* Right: 5-pillar SVG gauge board (neutral standby until real scan) */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#171613]/15 bg-[#171613] p-6 text-[#F7F4EE] sm:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-white/12 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
                    {c.awaitingTitle}
                  </span>
                  <span className="font-mono text-[11px] text-white/55 truncate max-w-[200px]">
                    {url.trim() || c.urlPlaceholder}
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {(Object.keys(PILLARS) as AuditType[]).map((key) => (
                    <SvgGauge key={key} value={null} label={PILLARS[key].label[lang]} />
                  ))}
                </div>
              </div>

              <p className="mt-7 border-t border-white/12 pt-4 text-xs leading-6 text-white/65">
                {c.awaitingNote}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-700/25 bg-red-50 px-4 py-3 text-xs font-medium text-red-900"
          >
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {/* Top Score + 5 SVG Gauges */}
            <div className="grid gap-6 rounded-2xl border border-[#171613]/15 bg-[#171613] p-6 text-[#F7F4EE] lg:grid-cols-[240px_1fr] lg:items-center sm:p-8">
              <div className="flex flex-col items-center border-b border-white/12 pb-6 lg:border-b-0 lg:border-e lg:pb-0 lg:pe-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                  {c.scoreLabel}
                </span>
                <div className="mt-3">
                  <SvgGauge value={result.score} label={result.url.replace(/^https?:\/\//, "")} size={112} />
                </div>
              </div>

              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                      {c.readingSite}
                    </span>
                    <h3 className="mt-1 font-serif text-xl text-white">
                      {result.title || c.noTitle}
                    </h3>
                    <p className="mt-1 text-xs text-white/65">{result.description || c.noDesc}</p>
                  </div>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 px-3.5 text-xs text-white/85 hover:border-white hover:text-white"
                  >
                    {c.openSite}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {(Object.keys(PILLARS) as AuditType[]).map((key) => (
                    <SvgGauge
                      key={key}
                      value={result.pillarScores?.[key] ?? null}
                      label={PILLARS[key].label[lang]}
                      size={74}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths / Improvements / Recommendations */}
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#171613]/12 bg-white p-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-[#171613]">
                  <CheckCircle2 className="h-4 w-4 text-[#8A6D49]" />
                  {c.strengths}
                </h4>
                <ul className="mt-4 space-y-3">
                  {strengths.length ? (
                    strengths.map((f, i) => (
                      <li key={i} className="rounded-xl bg-[#FAF8F4] p-3 text-xs">
                        <strong className="block text-[#171613]">{f.label}</strong>
                        <span className="mt-0.5 block text-[#5C574F]">{f.detail}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[#6E685F]">—</li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#171613]/12 bg-white p-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-[#171613]">
                  <AlertTriangle className="h-4 w-4 text-[#9E7F5A]" />
                  {c.improvements}
                </h4>
                <ul className="mt-4 space-y-3">
                  {improvements.length ? (
                    improvements.map((f, i) => (
                      <li key={i} className="rounded-xl bg-[#FAF8F4] p-3 text-xs">
                        <strong className="block text-[#171613]">{f.label}</strong>
                        <span className="mt-0.5 block text-[#5C574F]">{f.detail}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[#6E685F]">—</li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#171613]/12 bg-white p-6">
                <h4 className="text-sm font-semibold text-[#171613]">{c.recommendations}</h4>
                <ul className="mt-4 space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="rounded-xl bg-[#FAF8F4] p-3 text-xs">
                      <strong className="block text-[#8A6D49]">{rec.service}</strong>
                      <span className="mt-0.5 block text-[#5C574F]">{rec.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions: Export PDF + Email handoff to CRM + WhatsApp */}
            <div className="grid gap-5 rounded-2xl border border-[#171613]/12 bg-white p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={makePdf}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171613] px-5 py-2.5 text-xs font-semibold text-[#F7F4EE] transition hover:bg-[#2C2A24]"
                >
                  <FileText className="h-4 w-4" />
                  {c.pdfBtn}
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#171613]/20 bg-[#FAF8F4] px-5 py-2.5 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A]"
                >
                  <MessageCircle className="h-4 w-4 text-[#8A6D49]" />
                  {c.waBtn}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setError("");
                  }}
                  className="min-h-10 px-3 text-xs font-medium text-[#6E685F] underline hover:text-[#171613]"
                >
                  {c.retryBtn}
                </button>
              </div>

              {emailSent ? (
                <p role="status" className="text-xs font-semibold text-[#7D6344]">
                  ✓ {c.emailSent}
                </p>
              ) : (
                <form onSubmit={sendAuditByEmail} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder={c.emailName}
                    aria-label={c.emailName}
                    className="min-h-10 flex-1 rounded-xl border border-[#171613]/18 bg-[#FAF8F4] px-3 text-xs text-[#171613] outline-none focus:border-[#9E7F5A]"
                  />
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder={c.emailAddr}
                    aria-label={c.emailAddr}
                    className="min-h-10 flex-1 rounded-xl border border-[#171613]/18 bg-[#FAF8F4] px-3 text-xs text-[#171613] outline-none focus:border-[#9E7F5A]"
                  />
                  <button
                    type="submit"
                    disabled={emailSending}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#9E7F5A] px-4 text-xs font-semibold text-white transition hover:bg-[#826644] disabled:opacity-50"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {c.emailSend}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
