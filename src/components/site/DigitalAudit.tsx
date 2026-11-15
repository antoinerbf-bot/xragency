import { useState } from "react";
import { Activity, ArrowRight, Check, ExternalLink, FileText, Globe2, Mail, MessageCircle, Palette, Search, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { jsPDF } from "jspdf";
import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { Parallax, Reveal } from "./primitives";

type AuditType="design"|"seo"|"security"|"conversion"|"technical";
type Finding={label:string;detail:string;status?:boolean};
type Recommendation={service:string;reason:string};
const TYPES:Record<AuditType,{label:Record<string,string>;detail:Record<string,string>;icon:any}>={
 design:{label:{fr:"Design & UX",en:"Design & UX",vi:"Thiết kế & UX",ar:"التصميم وتجربة المستخدم",ru:"Дизайн и UX"},detail:{fr:"Interface, mobile, hiérarchie, qualité perçue",en:"Interface, mobile, hierarchy, perceived quality",vi:"Giao diện, mobile, cấu trúc, cảm nhận",ar:"الواجهة والجوال والتسلسل والجودة",ru:"Интерфейс, mobile, иерархия, качество"},icon:Palette},
 seo:{label:{fr:"SEO & visibilité",en:"SEO & visibility",vi:"SEO & hiển thị",ar:"SEO والظهور",ru:"SEO и видимость"},detail:{fr:"Structure, contenu, indexation, local",en:"Structure, content, indexing, local",vi:"Cấu trúc, nội dung, index, local",ar:"البنية والمحتوى والفهرسة والمحلي",ru:"Структура, контент, индексация, local"},icon:Search},
 security:{label:{fr:"Sécurité",en:"Security",vi:"Bảo mật",ar:"الأمان",ru:"Безопасность"},detail:{fr:"HTTPS, headers, exposition, bonnes pratiques",en:"HTTPS, headers, exposure, best practices",vi:"HTTPS, headers, bảo mật, thực hành tốt",ar:"HTTPS والرؤوس وأسطح التعرض والممارسات الجيدة",ru:"HTTPS, заголовки, поверхность атаки, практики"},icon:ShieldCheck},
 conversion:{label:{fr:"Conversion",en:"Conversion",vi:"Chuyển đổi",ar:"التحويل",ru:"Конверсия"},detail:{fr:"CTA, confiance, parcours, friction",en:"CTA, trust, journey, friction",vi:"CTA, tin cậy, hành trình, ma sát",ar:"CTA والثقة والمسار ونقاط الاحتكاك",ru:"CTA, доверие, путь, трение"},icon:Zap},
 technical:{label:{fr:"Technique",en:"Technical",vi:"Kỹ thuật",ar:"تقني",ru:"Технический"},detail:{fr:"Performance, responsive, accessibilité",en:"Performance, responsive, accessibility",vi:"Hiệu năng, responsive, khả năng tiếp cận",ar:"الأداء والاستجابة وإمكانية الوصول",ru:"Производительность, responsive, доступность"},icon:Smartphone},
};
const UI = {
  fr: {
    eyebrow: "AUDIT DIGITAL · OFFERT", title: "Avant de refaire, comprenons.",
    intro: "Entrez votre URL. Nous analysons les signaux publics accessibles et les transformons en une lecture claire, puis en actions concrètes.",
    url: "URL de votre site", sector: "Secteur", budget: "Budget envisagé", run: "Lancer mon audit gratuit", running: "Analyse en cours…",
    score: "Score indicatif", recommend: "Plan d'action détecté", email: "Recevoir le rapport par e-mail", name: "Votre nom", mail: "Votre e-mail",
    pdf: "Télécharger le rapport PDF", wa: "Continuer sur WhatsApp", retry: "Nouvelle analyse",
    chooseAxes: "Choisissez les axes qui comptent pour votre activité.",
    sectorOther: "Secteur · autre", sectorResto: "Restaurant", sectorHosp: "Hôtellerie / Tourisme", sectorRealestate: "Immobilier", sectorCommerce: "Commerce", sectorService: "Service",
    signalsPublic: "ANALYSE DES SIGNAUX PUBLICS ACCESSIBLES", structureBanner: "STRUCTURE · UX · SEO · TECHNIQUE",
    scanRunning: "SCAN EN COURS…", scanReady: "PRÊT À ANALYSER",
    reportChapter: "02 · RAPPORT", reportTitle: "Un diagnostic que vous pouvez vraiment utiliser.",
    reportDesc: "Score, constats, éléments détectés et recommandations — présentés sans jargon.",
    reportPills: ["Score global", "Constats", "Signaux techniques", "Recommandations", "PDF professionnel", "WhatsApp"],
    axesAnalyzed: "axe(s) analysé(s)", readingSite: "LECTURE DU SITE", noTitle: "Titre non détecté", noDesc: "Aucune meta description détectée.",
    openSite: "Ouvrir", exportChapter: "EXPORT / NEXT STEP", exportTitle: "Gardez le diagnostic. Puis agissez.",
    waPrefill: "Bonjour XR Agency, j'ai terminé mon audit digital. Site : ",
    pdfReport: "RAPPORT", pdfSiteAudited: "Site audité", pdfScore: "Score", pdfDetected: "Éléments détectés", pdfTitle: "Titre", pdfMeta: "Meta description", pdfNotDetected: "Non détecté", pdfFindings: "Constats", pdfToImprove: "À améliorer · ", pdfPositive: "Signal positif · ", pdfRecommendations: "Recommandations",
    hudStatus: "SCANNER HUD DIGITAL", hudLive: "ANALYSE EN TEMPS RÉEL", hudSsl: "SÉCURITÉ SSL/TLS", hudDom: "STRUCTURE DOM", hudSpeed: "CORE WEB VITALS", hudUx: "EXPÉRIENCE MOBILE", hudLaser: "BALAYAGE RADAR XR ACTIF",
    hudAwaiting: "EN ATTENTE", hudAwaitingBadge: "DÉMONSTRATION · EN ATTENTE", hudPending: "En attente de scan", hudBenchmarkSample: "Aperçu de diagnostic",
  },
  en: {
    eyebrow: "DIGITAL AUDIT · FREE", title: "Before rebuilding, understand.",
    intro: "Enter your URL. We analyse accessible public signals and turn them into a clear reading and concrete next actions.",
    url: "Your website URL", sector: "Industry", budget: "Planned budget", run: "Start free audit", running: "Analysing…",
    score: "Indicative score", recommend: "Detected action plan", email: "Receive the report by email", name: "Your name", mail: "Your email",
    pdf: "Download report PDF", wa: "Continue to WhatsApp", retry: "Run another audit",
    chooseAxes: "Choose the areas that matter for your business.",
    sectorOther: "Industry · other", sectorResto: "Restaurant / Bar", sectorHosp: "Hospitality / Tourism", sectorRealestate: "Real Estate", sectorCommerce: "Commerce / Retail", sectorService: "Services",
    signalsPublic: "ANALYSIS OF PUBLIC ACCESSIBLE SIGNALS", structureBanner: "STRUCTURE · UX · SEO · TECHNICAL",
    scanRunning: "SCAN IN PROGRESS…", scanReady: "READY TO ANALYSE",
    reportChapter: "02 · REPORT", reportTitle: "A diagnostic you can genuinely take action on.",
    reportDesc: "Score, findings, detected signals and recommendations — without jargon.",
    reportPills: ["Overall score", "Key findings", "Technical signals", "Recommendations", "Pro PDF report", "WhatsApp"],
    axesAnalyzed: "area(s) analysed", readingSite: "WEBSITE READING", noTitle: "Title not detected", noDesc: "No meta description detected.",
    openSite: "Open", exportChapter: "EXPORT / NEXT STEP", exportTitle: "Keep the diagnostic. Take action.",
    waPrefill: "Hello XR Agency, I have completed my digital audit. Website: ",
    pdfReport: "REPORT", pdfSiteAudited: "Audited Website", pdfScore: "Score", pdfDetected: "Detected Elements", pdfTitle: "Title", pdfMeta: "Meta description", pdfNotDetected: "Not detected", pdfFindings: "Key Findings", pdfToImprove: "To improve · ", pdfPositive: "Positive signal · ", pdfRecommendations: "Recommendations",
    hudStatus: "DIGITAL HUD SCANNER", hudLive: "REAL-TIME TELEMETRY", hudSsl: "SSL/TLS SECURITY", hudDom: "DOM STRUCTURE", hudSpeed: "CORE WEB VITALS", hudUx: "MOBILE UX", hudLaser: "XR RADAR SCAN ACTIVE",
    hudAwaiting: "STANDBY", hudAwaitingBadge: "DEMO PREVIEW · STANDBY", hudPending: "Awaiting scan", hudBenchmarkSample: "Diagnostic preview",
  },
  vi: {
    eyebrow: "AUDIT KỸ THUẬT SỐ · MIỄN PHÍ", title: "Hiểu trước khi làm lại.",
    intro: "Nhập URL. Chúng tôi đọc các tín hiệu công khai có thể truy cập và chuyển chúng thành phân tích rõ ràng cùng hành động cụ thể.",
    url: "URL website", sector: "Lĩnh vực", budget: "Ngân sách", run: "Bắt đầu audit miễn phí", running: "Đang phân tích…",
    score: "Điểm tham khảo", recommend: "Kế hoạch hành động", email: "Nhận báo cáo qua email", name: "Tên của bạn", mail: "Email của bạn",
    pdf: "Tải báo cáo PDF", wa: "Tiếp tục qua WhatsApp", retry: "Phân tích lại",
    chooseAxes: "Chọn các tiêu chí quan trọng cho hoạt động của bạn.",
    sectorOther: "Lĩnh vực · khác", sectorResto: "Nhà hàng / Bar", sectorHosp: "Khách sạn / Du lịch", sectorRealestate: "Bất động sản", sectorCommerce: "Thương mại", sectorService: "Dịch vụ",
    signalsPublic: "PHÂN TÍCH CÁC TÍN HIỆU CÔNG KHAI CÓ THỂ TRUY CẬP", structureBanner: "CẤU TRÚC · UX · SEO · KỸ THUẬT",
    scanRunning: "ĐANG QUÉT…", scanReady: "SẴN SÀNG PHÂN TÍCH",
    reportChapter: "02 · BÁO CÁO", reportTitle: "Chẩn đoán rõ ràng, hành động ngay.",
    reportDesc: "Điểm số, phát hiện, tín hiệu kỹ thuật và khuyến nghị — hoàn toàn dễ hiểu.",
    reportPills: ["Điểm tổng thể", "Phát hiện", "Tín hiệu kỹ thuật", "Khuyến nghị", "PDF chuyên nghiệp", "WhatsApp"],
    axesAnalyzed: "tiêu chí được phân tích", readingSite: "PHÂN TÍCH WEBSITE", noTitle: "Không phát hiện tiêu đề", noDesc: "Không phát hiện thẻ meta description.",
    openSite: "Mở", exportChapter: "XUẤT BÁO CÁO / BƯỚC TIẾP THEO", exportTitle: "Lưu giữ chẩn đoán. Hành động ngay.",
    waPrefill: "Xin chào XR Agency, tôi vừa hoàn thành audit kỹ thuật số. Website: ",
    pdfReport: "BÁO CÁO", pdfSiteAudited: "Website được kiểm toán", pdfScore: "Điểm", pdfDetected: "Thành phần phát hiện", pdfTitle: "Tiêu đề", pdfMeta: "Mô tả meta", pdfNotDetected: "Không phát hiện", pdfFindings: "Các phát hiện", pdfToImprove: "Cần cải thiện · ", pdfPositive: "Tín hiệu tốt · ", pdfRecommendations: "Khuyến nghị",
    hudStatus: "MÁY QUÉT HUD KỸ THUẬT SỐ", hudLive: "PHÂN TÍCH THỜI GIAN THỰC", hudSsl: "BẢO MẬT SSL/TLS", hudDom: "CẤU TRÚC DOM", hudSpeed: "CORE WEB VITALS", hudUx: "TRẢI NGHIỆM DI ĐỘNG", hudLaser: "TIA QUÉT RADAR XR HOẠT ĐỘNG",
    hudAwaiting: "CHỜ QUÉT", hudAwaitingBadge: "XEM TRƯỚC DEMO · CHỜ QUÉT", hudPending: "Chờ bắt đầu quét", hudBenchmarkSample: "Mẫu chẩn đoán",
  },
  ar: {
    eyebrow: "تدقيق رقمي · مجاني", title: "افهم أولاً، ثم أعد البناء.",
    intro: "أدخل رابط موقعك. نحوّل الإشارات العامة المتاحة إلى قراءة واضحة وخطوات عملية.",
    url: "رابط الموقع", sector: "القطاع", budget: "الميزانية", run: "ابدأ التدقيق المجاني", running: "جارٍ التحليل…",
    score: "نتيجة إرشادية", recommend: "خطة العمل المكتشفة", email: "استلام التقرير عبر البريد", name: "الاسم", mail: "البريد الإلكتروني",
    pdf: "تحميل تقرير PDF", wa: "المتابعة عبر WhatsApp", retry: "تحليل جديد",
    chooseAxes: "اختر المحاور الأكثر أهمية لنشاطك.",
    sectorOther: "القطاع · آخر", sectorResto: "مطعم / مقهى", sectorHosp: "فندقة / سياحة", sectorRealestate: "عقارات", sectorCommerce: "تجارة", sectorService: "خدمات",
    signalsPublic: "تحليل الإشارات العامة المتاحة", structureBanner: "البنية · تجربة المستخدم · SEO · الجوانب التقنية",
    scanRunning: "جارٍ الفحص…", scanReady: "جاهز للتحليل",
    reportChapter: "02 · التقرير", reportTitle: "تشخيص عملي يمكنك الاستفادة منه فوراً.",
    reportDesc: "الدرجة والملاحظات والعناصر المكتشفة والتوصيات — دون مصطلحات معقدة.",
    reportPills: ["الدرجة العامة", "الملاحظات", "الإشارات التقنية", "التوصيات", "تقرير PDF احترافي", "WhatsApp"],
    axesAnalyzed: "محاور تم تحليلها", readingSite: "قراءة الموقع", noTitle: "لم يتم رصد العنوان", noDesc: "لم يتم رصد الوصف التعريفي.",
    openSite: "فتح", exportChapter: "تصدير / الخطوة التالية", exportTitle: "احتفظ بالتشخيص، ثم باشر العمل.",
    waPrefill: "مرحبًا XR Agency، أنهيت التدقيق الرقمي لموقعي: ",
    pdfReport: "تقرير", pdfSiteAudited: "الموقع المفحوص", pdfScore: "الدرجة", pdfDetected: "العناصر المرصودة", pdfTitle: "العنوان", pdfMeta: "الوصف التعريفي", pdfNotDetected: "غير مكتشف", pdfFindings: "النتائج والملاحظات", pdfToImprove: "بحاجة لتحسين · ", pdfPositive: "إشارة إيجابية · ", pdfRecommendations: "التوصيات",
    hudStatus: "ماسح HUD الرقمي", hudLive: "تحليل فوري ومباشر", hudSsl: "أمان SSL/TLS", hudDom: "بنية DOM", hudSpeed: "مؤشرات الويب الأساسية", hudUx: "تجربة الجوال", hudLaser: "مسح رادار XR نشط",
    hudAwaiting: "جاهز", hudAwaitingBadge: "معاينة توضيحية · بانتظار الفحص", hudPending: "بانتظار الفحص", hudBenchmarkSample: "نموذج تشخيص",
  },
  ru: {
    eyebrow: "DIGITAL AUDIT · БЕСПЛАТНО", title: "Сначала понять, потом переделывать.",
    intro: "Введите URL. Мы анализируем доступные публичные сигналы и превращаем их в понятный план действий.",
    url: "URL сайта", sector: "Отрасль", budget: "Бюджет", run: "Запустить бесплатный аудит", running: "Анализ…",
    score: "Ориентировочный балл", recommend: "План действий", email: "Получить отчёт по e-mail", name: "Ваше имя", mail: "Ваш email",
    pdf: "Скачать PDF-отчёт", wa: "Продолжить в WhatsApp", retry: "Новый аудит",
    chooseAxes: "Выберите направления, важные для вашего бизнеса.",
    sectorOther: "Отрасль · другое", sectorResto: "Ресторан / бар", sectorHosp: "Отели / туризм", sectorRealestate: "Недвижимость", sectorCommerce: "Торговля", sectorService: "Услуги",
    signalsPublic: "АНАЛИЗ ДОСТУПНЫХ ПУБЛИЧНЫХ СИГНАЛОВ", structureBanner: "СТРУКТУРА · UX · SEO · ТЕХНИЧЕСКИЕ ДАННЫЕ",
    scanRunning: "СКАН ИДЁТ…", scanReady: "ГОТОВ К АНАЛИЗУ",
    reportChapter: "02 · ОТЧЁТ", reportTitle: "Диагностика, которую легко применить на практике.",
    reportDesc: "Баллы, выводы, технические сигналы и рекомендации — понятным языком.",
    reportPills: ["Общий балл", "Выводы", "Технические сигналы", "Рекомендации", "Профессиональный PDF", "WhatsApp"],
    axesAnalyzed: "направлений проанализировано", readingSite: "АНАЛИЗ САЙТА", noTitle: "Заголовок не обнаружен", noDesc: "Мета-описание не обнаружено.",
    openSite: "Открыть", exportChapter: "ЭКСПОРТ / СЛЕДУЮЩИЙ ШАГ", exportTitle: "Сохраните диагностику. Действуйте.",
    waPrefill: "Здравствуйте, XR Agency! Я завершил цифровой аудит сайта: ",
    pdfReport: "ОТЧЁТ", pdfSiteAudited: "Проверенный сайт", pdfScore: "Оценка", pdfDetected: "Обнаруженные элементы", pdfTitle: "Заголовок", pdfMeta: "Мета-описание", pdfNotDetected: "Не обнаружено", pdfFindings: "Выводы", pdfToImprove: "Требует улучшения · ", pdfPositive: "Положительный сигнал · ", pdfRecommendations: "Рекомендации",
    hudStatus: "ЦИФРОВОЙ HUD-СКАНЕР", hudLive: "АНАЛИЗ В РЕАЛЬНОМ ВРЕМЕНИ", hudSsl: "БЕЗОПАСНОСТЬ SSL/TLS", hudDom: "СТРУКТУРА DOM", hudSpeed: "CORE WEB VITALS", hudUx: "МОБИЛЬНЫЙ UX", hudLaser: "АКТИВЕН XR-РАДАРНЫЙ СКАНЕР",
    hudAwaiting: "ОЖИДАНИЕ", hudAwaitingBadge: "ДЕМО-ПРЕДПРОСМОТР · ОЖИДАНИЕ", hudPending: "Ожидание сканирования", hudBenchmarkSample: "Пример диагностики",
  },
} as const;

export function DigitalAudit(){
 const {lang}=useLang();const t=UI[lang]??UI.fr;
 const [url,setUrl]=useState("");const [sector,setSector]=useState("other");const [budget,setBudget]=useState("1000_2500");const [types,setTypes]=useState<AuditType[]>(["design","seo"]);const [email,setEmail]=useState("");const [name,setName]=useState("");const [loading,setLoading]=useState(false);const [error,setError]=useState("");const [result,setResult]=useState<{score:number;url:string;title:string;description:string;status:number;types:AuditType[];findings:Finding[];recommendations:Recommendation[]}|null>(null);
 const toggle=(id:AuditType)=>setTypes(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
 const run=async()=>{if(!url.trim()||!types.length)return;setLoading(true);setError("");setResult(null);try{const res=await fetch("/api/audit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url,types,sector,budget})});const data=await res.json();if(!res.ok)throw new Error(data.error||"Audit unavailable");setResult(data);}catch(e){setError(e instanceof Error?e.message:"Audit unavailable")}finally{setLoading(false)}};
 const makePdf=()=>{if(!result)return;const doc=new jsPDF({unit:"mm",format:"a4"});const W=210,M=14,R=196;const ink=[18,22,29] as const;const blue=[43,92,255] as const;const muted=[92,100,112] as const;const soft=[242,244,247] as const;const line=[220,224,230] as const;const date=new Date().toLocaleDateString(lang==="fr"?"fr-FR":lang==="vi"?"vi-VN":lang==="ru"?"ru-RU":"en-US",{day:"2-digit",month:"2-digit",year:"numeric"});const number="XR-AUDIT-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+Math.floor(1000+Math.random()*9000);doc.setFillColor(...ink);doc.rect(0,0,W,30,"F");doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(18);doc.text("XRAGENCY",M,13);doc.setFont("helvetica","normal");doc.setFontSize(7);doc.text("DIGITAL AUDIT · EXPERT REVIEW",M,20);doc.setFont("helvetica","bold");doc.setFontSize(12);doc.text(t.pdfReport,R,12,{align:"right"});doc.setFontSize(6.5);doc.setFont("helvetica","normal");doc.text(number,R,18,{align:"right"});doc.text(date,R,23,{align:"right"});let y=40;const section=(s:string)=>{doc.setFillColor(...soft);doc.roundedRect(M,y-4,W-2*M,8,1.5,1.5,"F");doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(s.toUpperCase(),M+3,y+1);y+=12};section(t.pdfSiteAudited);doc.setFont("helvetica","bold");doc.setFontSize(8);doc.text(result.url,M,y);y+=6;doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.setFontSize(6.5);doc.text("HTTP "+result.status+" · "+result.types.join(" · "),M,y);y+=8;section(t.pdfScore);doc.setTextColor(...blue);doc.setFont("helvetica","bold");doc.setFontSize(28);doc.text(result.score+"/100",M,y);y+=12;section(t.pdfDetected);doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(t.pdfTitle,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(result.title||t.pdfNotDetected,140),M+25,y);y+=7;doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.text(t.pdfMeta,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(result.description||t.pdfNotDetected,140),M+25,y);y+=12;section(t.pdfFindings);result.findings.forEach((f,i)=>{if(y>268){doc.addPage();y=22}doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(String(i+1).padStart(2,"0")+" · "+f.label,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize((f.status===false?t.pdfToImprove:t.pdfPositive)+f.detail,160),M+12,y+4);y+=12});if(result.recommendations.length){y+=2;section(t.pdfRecommendations);result.recommendations.forEach((x,i)=>{if(y>268){doc.addPage();y=22}doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.text(String(i+1).padStart(2,"0")+" · "+x.service,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(x.reason,160),M+12,y+4);y+=12})}doc.setDrawColor(...line);doc.line(M,282,R,282);doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(6.2);doc.text("KARMA SASU · XRAGENCY",M,288);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris",M,293);doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com",M,298);doc.save("XRAGENCY-Digital-Audit-"+number+".pdf")};
 const wa=CONTACT.whatsapp+"?text="+encodeURIComponent(t.waPrefill+url);
 return (
    <section id="audit" className="xr-section relative overflow-hidden border-y xr-line py-10 sm:py-14 lg:py-16">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Compact, Luxury Header */}
        <Reveal>
          <div className="flex flex-col gap-4 border-b xr-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label-mono xr-accent text-[8px] tracking-[.24em] uppercase">{t.eyebrow}</span>
              <h2 className="display-serif mt-2 max-w-4xl text-[clamp(1.85rem,3.2vw,3.2rem)] leading-[1.05] tracking-[-.04em] text-[var(--xr-ink)]">
                {t.title}
              </h2>
              <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed xr-muted">{t.intro}</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border xr-line bg-[var(--xr-surface)] px-4 py-2.5 shadow-sm shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="label-mono text-[7px] text-[var(--xr-ink)] font-bold tracking-wider">
                {loading ? t.scanRunning : t.scanReady}
              </span>
            </div>
          </div>
        </Reveal>

        {!result && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
            {/* Left: Refined Studio Search & Config Bar */}
            <Reveal>
              <div className="flex flex-col justify-between h-full rounded-2xl border xr-line bg-[var(--xr-surface)] p-5 sm:p-6 shadow-md backdrop-blur-xl">
                <div>
                  <div className="flex items-center justify-between border-b xr-line pb-3">
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-[var(--xr-ink)]">{t.url}</span>
                    </div>
                    <span className="label-mono text-[6.5px] xr-muted uppercase">ANALYSE EN TEMPS RÉEL</span>
                  </div>

                  {/* Main Input Bar */}
                  <div className="mt-3.5 relative">
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://votresite.com"
                      className="w-full rounded-xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-3 text-xs outline-none focus:border-emerald-500/60 transition shadow-inner font-mono text-[var(--xr-ink)]"
                    />
                  </div>

                  {/* Sector & Budget Selectors */}
                  <div className="mt-2.5 grid grid-cols-2 gap-2">
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="rounded-xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 text-[10px] outline-none font-medium text-[var(--xr-ink)]"
                    >
                      <option value="other">{t.sectorOther}</option>
                      <option value="restaurant">{t.sectorResto}</option>
                      <option value="hospitality">{t.sectorHosp}</option>
                      <option value="realestate">{t.sectorRealestate}</option>
                      <option value="commerce">{t.sectorCommerce}</option>
                      <option value="service">{t.sectorService}</option>
                    </select>

                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="rounded-xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-2 text-[10px] outline-none font-medium text-[var(--xr-ink)]"
                    >
                      <option value="under500">&lt; 500 €</option>
                      <option value="500_1000">500 – 1 000 €</option>
                      <option value="1000_2500">1 000 – 2 500 €</option>
                      <option value="2500_5000">2 500 – 5 000 €</option>
                      <option value="5000_plus">5 000 € +</option>
                    </select>
                  </div>

                  {/* Compact Audit Axes Selector Chips */}
                  <div className="mt-4">
                    <span className="label-mono text-[6.5px] xr-muted uppercase block mb-2">
                      CHOISISSEZ VOS AXES PRIORITAIRES :
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(Object.entries(TYPES) as [AuditType, typeof TYPES[AuditType]][]).map(([id, x]) => {
                        const I = x.icon;
                        const active = types.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggle(id)}
                            className={
                              "flex items-center gap-2 rounded-xl border p-2 text-left transition " +
                              (active
                                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400 font-semibold"
                                : "border-white/10 bg-[var(--xr-surface-strong)] text-[var(--xr-ink)] hover:border-white/20")
                            }
                          >
                            <I className="h-3 w-3 shrink-0" />
                            <span className="text-[10px] truncate">{x.label[lang] ?? x.label.fr}</span>
                            {active && <Check className="ml-auto h-3 w-3 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t xr-line">
                  <button
                    type="button"
                    onClick={run}
                    disabled={!url.trim() || loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3 label-mono text-[8px] font-semibold text-[var(--xr-bg)] disabled:opacity-30 hover:opacity-90 transition shadow-md"
                  >
                    {loading ? t.running : t.run}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <p className="mt-2 text-center label-mono text-[5.5px] xr-muted-2">{t.signalsPublic}</p>
                </div>
              </div>
            </Reveal>

            {/* Right: Sleek, Compact Live Telemetry HUD */}
            <Reveal delay={80}>
              <div className="flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#0d1016] text-white p-5 shadow-lg relative overflow-hidden">
                <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

                {/* HUD Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[9px] text-white/60 truncate max-w-[180px]">
                      {url.trim() ? url : "https://votre-site.com"}
                    </span>
                  </div>
                  <span className="label-mono text-[6.5px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2 py-0.5 font-bold">
                    {loading ? t.hudLive : "SCANNER ACTIF"}
                  </span>
                </div>

                {/* HUD Live Grid Indicators */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="block label-mono text-[6.5px] text-white/50">{t.hudSsl}</span>
                    <span className="mt-1 block text-sm font-mono font-bold text-emerald-400">
                      {loading ? "SCAN EN COURS…" : "TLS 1.3 · A+"}
                    </span>
                    <span className="text-[7.5px] text-white/40 block mt-0.5">Certificat & chiffrement</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="block label-mono text-[6.5px] text-white/50">{t.hudSpeed}</span>
                    <span className="mt-1 block text-sm font-mono font-bold text-cyan-400">
                      {loading ? "TEST LATENCE…" : "< 1.2s LCP"}
                    </span>
                    <span className="text-[7.5px] text-white/40 block mt-0.5">Vitesse & Core Web Vitals</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="block label-mono text-[6.5px] text-white/50">{t.hudDom}</span>
                    <span className="mt-1 block text-sm font-mono font-bold text-amber-300">
                      {loading ? "ANALYSE DOM…" : "Sémantique OK"}
                    </span>
                    <span className="text-[7.5px] text-white/40 block mt-0.5">Structure & Balisage Hn</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="block label-mono text-[6.5px] text-white/50">{t.hudUx}</span>
                    <span className="mt-1 block text-sm font-mono font-bold text-rose-400">
                      {loading ? "TEST MOBILE…" : "Responsive 100%"}
                    </span>
                    <span className="text-[7.5px] text-white/40 block mt-0.5">Ergonomie & Lisibilité</span>
                  </div>
                </div>

                {/* Bottom Spectrum Analyzer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="label-mono text-[6.5px] text-white/60">RADAR XR EN ATTENTE D'URL</span>
                  </div>
                  <span className="label-mono text-[6.5px] text-emerald-400 font-bold">100% GRATUIT & SANS ENGAGEMENT</span>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* Scan Results View */}
        {result && (
          <Reveal>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5 text-center flex flex-col justify-between items-center shadow-md">
                  <span className="label-mono text-[6.5px] xr-muted-2 uppercase">{t.score}</span>
                  <div className="my-3 grid h-28 w-28 place-items-center rounded-full border-[8px] border-emerald-500/20 bg-emerald-500/10">
                    <span className="display-serif text-3xl font-bold text-emerald-400">{result.score}/100</span>
                  </div>
                  <span className="text-[9px] font-semibold text-[var(--xr-ink)] truncate max-w-full">{result.url}</span>
                </div>

                <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-5 shadow-md">
                  <div className="flex items-start justify-between gap-3 border-b xr-line pb-3">
                    <div>
                      <span className="label-mono text-[6px] xr-muted-2 uppercase">{t.readingSite}</span>
                      <h3 className="text-base font-bold text-[var(--xr-ink)] mt-0.5">{result.title || t.noTitle}</h3>
                      <p className="text-[10px] xr-muted line-clamp-2">{result.description || t.noDesc}</p>
                    </div>
                    <a href={result.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border xr-line px-3 py-1 label-mono text-[6.5px] xr-muted hover:text-[var(--xr-ink)] shrink-0">
                      {t.openSite} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {result.findings.slice(0, 4).map((f, i) => (
                      <div key={f.label + i} className="rounded-xl border xr-line bg-[var(--xr-surface-strong)] p-2.5">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                          <span className="text-[10px] font-bold text-[var(--xr-ink)]">{f.label}</span>
                        </div>
                        <p className="mt-0.5 text-[8.5px] xr-muted leading-tight">{f.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t xr-line flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={makePdf} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--xr-ink)] text-[var(--xr-bg)] px-4 py-2 label-mono text-[7.5px] font-bold shadow-md">
                      <FileText className="h-3.5 w-3.5" />
                      {t.pdf}
                    </button>
                    <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 px-4 py-2 label-mono text-[7.5px] font-bold">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {t.wa}
                    </a>
                    <button type="button" onClick={() => { setResult(null); setError(""); }} className="label-mono text-[7px] xr-muted-2 hover:text-[var(--xr-ink)] ml-auto">
                      ↺ {t.retry}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {error && <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">{error}</div>}
      </div>
    </section>
  );
}
