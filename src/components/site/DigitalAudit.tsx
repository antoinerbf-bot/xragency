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
  },
} as const;

export function DigitalAudit(){
 const {lang}=useLang();const t=UI[lang]??UI.fr;
 const [url,setUrl]=useState("");const [sector,setSector]=useState("other");const [budget,setBudget]=useState("1000_2500");const [types,setTypes]=useState<AuditType[]>(["design","seo"]);const [email,setEmail]=useState("");const [name,setName]=useState("");const [loading,setLoading]=useState(false);const [error,setError]=useState("");const [result,setResult]=useState<{score:number;url:string;title:string;description:string;status:number;types:AuditType[];findings:Finding[];recommendations:Recommendation[]}|null>(null);
 const toggle=(id:AuditType)=>setTypes(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
 const run=async()=>{if(!url.trim()||!types.length)return;setLoading(true);setError("");setResult(null);try{const res=await fetch("/api/audit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url,types,sector,budget})});const data=await res.json();if(!res.ok)throw new Error(data.error||"Audit unavailable");setResult(data);}catch(e){setError(e instanceof Error?e.message:"Audit unavailable")}finally{setLoading(false)}};
 const makePdf=()=>{if(!result)return;const doc=new jsPDF({unit:"mm",format:"a4"});const W=210,M=14,R=196;const ink=[18,22,29] as const;const blue=[43,92,255] as const;const muted=[92,100,112] as const;const soft=[242,244,247] as const;const line=[220,224,230] as const;const date=new Date().toLocaleDateString(lang==="fr"?"fr-FR":lang==="vi"?"vi-VN":lang==="ru"?"ru-RU":"en-US",{day:"2-digit",month:"2-digit",year:"numeric"});const number="XR-AUDIT-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+Math.floor(1000+Math.random()*9000);doc.setFillColor(...ink);doc.rect(0,0,W,30,"F");doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(18);doc.text("XRAGENCY",M,13);doc.setFont("helvetica","normal");doc.setFontSize(7);doc.text("DIGITAL AUDIT · EXPERT REVIEW",M,20);doc.setFont("helvetica","bold");doc.setFontSize(12);doc.text(t.pdfReport,R,12,{align:"right"});doc.setFontSize(6.5);doc.setFont("helvetica","normal");doc.text(number,R,18,{align:"right"});doc.text(date,R,23,{align:"right"});let y=40;const section=(s:string)=>{doc.setFillColor(...soft);doc.roundedRect(M,y-4,W-2*M,8,1.5,1.5,"F");doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(s.toUpperCase(),M+3,y+1);y+=12};section(t.pdfSiteAudited);doc.setFont("helvetica","bold");doc.setFontSize(8);doc.text(result.url,M,y);y+=6;doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.setFontSize(6.5);doc.text("HTTP "+result.status+" · "+result.types.join(" · "),M,y);y+=8;section(t.pdfScore);doc.setTextColor(...blue);doc.setFont("helvetica","bold");doc.setFontSize(28);doc.text(result.score+"/100",M,y);y+=12;section(t.pdfDetected);doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(t.pdfTitle,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(result.title||t.pdfNotDetected,140),M+25,y);y+=7;doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.text(t.pdfMeta,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(result.description||t.pdfNotDetected,140),M+25,y);y+=12;section(t.pdfFindings);result.findings.forEach((f,i)=>{if(y>268){doc.addPage();y=22}doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(String(i+1).padStart(2,"0")+" · "+f.label,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize((f.status===false?t.pdfToImprove:t.pdfPositive)+f.detail,160),M+12,y+4);y+=12});if(result.recommendations.length){y+=2;section(t.pdfRecommendations);result.recommendations.forEach((x,i)=>{if(y>268){doc.addPage();y=22}doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.text(String(i+1).padStart(2,"0")+" · "+x.service,M,y);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(doc.splitTextToSize(x.reason,160),M+12,y+4);y+=12})}doc.setDrawColor(...line);doc.line(M,282,R,282);doc.setTextColor(...ink);doc.setFont("helvetica","bold");doc.setFontSize(6.2);doc.text("KARMA SASU · XRAGENCY",M,288);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text("SIREN 889 178 141 · SIRET 889 178 141 00012 · 78 Avenue des Champs-Élysées · 75008 Paris",M,293);doc.text("contact.xragency@gmail.com · +33 7 67 56 67 83 · xragencyai.com",M,298);doc.save("XRAGENCY-Digital-Audit-"+number+".pdf")};
 const wa=CONTACT.whatsapp+"?text="+encodeURIComponent(t.waPrefill+url);
 return <section id="audit" className="xr-section relative overflow-hidden border-y xr-line py-20 sm:py-28 lg:py-36">
  <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
   <Parallax speed={-0.025}><Reveal><div className="grid gap-8 border-b xr-line pb-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><span className="label-mono xr-accent text-[8px] tracking-[.28em]">{t.eyebrow}</span><h2 className="display-serif mt-5 max-w-5xl text-[clamp(3rem,5.6vw,6.2rem)] leading-[.84] tracking-[-.065em]">{t.title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 xr-muted sm:text-base">{t.intro}</p></div><div className="rounded-[1.7rem] border xr-line bg-[var(--xr-surface)] p-5"><div className="grid grid-cols-5 gap-2">{(Object.keys(TYPES) as AuditType[]).map(id=><div key={id} className="text-center"><span className="label-mono text-[5px] xr-muted-2">{id.slice(0,4).toUpperCase()}</span><div className={"mt-2 h-1 rounded-full "+(types.includes(id)?"bg-[var(--xr-accent)]":"bg-current opacity-10")}/></div>)}</div><p className="mt-3 text-[8px] xr-muted">{t.chooseAxes}</p></div></div></Reveal></Parallax>

   {!result&&<div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
    <Reveal><div className="xr-depth-card rounded-[2.2rem] border xr-line bg-[var(--xr-surface)] p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl border xr-line xr-accent-bg"><Globe2 className="h-5 w-5 xr-accent"/></span><div><span className="label-mono text-[6px] xr-muted-2">01 · SOURCE</span><p className="mt-1 text-sm font-semibold">{t.url}</p></div><Activity className="ml-auto h-4 w-4 opacity-35"/></div><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://votresite.com" className="mt-5 w-full rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-4 py-4 text-sm outline-none"/><div className="mt-3 grid gap-2 sm:grid-cols-2"><select value={sector} onChange={e=>setSector(e.target.value)} className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-3 text-[9px] outline-none"><option value="other">{t.sectorOther}</option><option value="restaurant">{t.sectorResto}</option><option value="hospitality">{t.sectorHosp}</option><option value="realestate">{t.sectorRealestate}</option><option value="commerce">{t.sectorCommerce}</option><option value="service">{t.sectorService}</option></select><select value={budget} onChange={e=>setBudget(e.target.value)} className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)] px-3 py-3 text-[9px] outline-none"><option value="under500">&lt; 500 €</option><option value="500_1000">500 – 1 000 €</option><option value="1000_2500">1 000 – 2 500 €</option><option value="2500_5000">2 500 – 5 000 €</option><option value="5000_plus">5 000 € +</option></select></div><div className="mt-5 grid gap-2 sm:grid-cols-2">{(Object.entries(TYPES) as [AuditType,typeof TYPES[AuditType]][]).map(([id,x])=>{const I=x.icon;return <button key={id} type="button" onClick={()=>toggle(id)} className={"rounded-[1.35rem] border p-4 text-left transition "+(types.includes(id)?"border-[var(--xr-accent)] bg-[var(--xr-accent-soft)]":"xr-line bg-[var(--xr-surface-strong)] hover:-translate-y-0.5")}><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl border xr-line"><I className="h-3.5 w-3.5 opacity-55"/></span><span className="text-[10px] font-semibold">{x.label[lang]??x.label.fr}</span>{types.includes(id)&&<Check className="ml-auto h-3.5 w-3.5 xr-accent"/>}</div><p className="mt-2 text-[8px] leading-4 xr-muted">{x.detail[lang]??x.detail.fr}</p></button>})}</div><button type="button" onClick={run} disabled={!url.trim()||loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-4 label-mono text-[8px] font-semibold text-[var(--xr-bg)] disabled:opacity-30">{loading?t.running:t.run}<ArrowRight className="h-4 w-4"/></button><p className="mt-3 text-center label-mono text-[5px] xr-muted-2">{t.signalsPublic}</p></div></Reveal>
    <Reveal delay={90}><div className="xr-panel-strong xr-audit-stage relative min-h-[580px] overflow-hidden rounded-[2rem] p-5 sm:p-7 flex flex-col justify-between">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-emerald-500/10 xr-float-slower"/>
      <div aria-hidden className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"/>
      <div className="xr-audit-browser relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1015] text-white shadow-[0_36px_90px_-40px_rgba(0,0,0,.8)] transition-transform duration-700 hover:-translate-y-1">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#141820] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"/>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"/>
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"/>
          <div className="ml-2 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0a0c10] px-3 py-1.5 font-mono text-[8px] text-white/60 truncate flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"/>
            <span className="truncate">{url || "https://votre-site.fr"}</span>
          </div>
          <span className="hidden rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 label-mono text-[6px] text-emerald-400 sm:inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"/>
            {t.hudLive}
          </span>
        </div>
        <div className="relative h-[230px] overflow-hidden bg-[#090b0e] p-4 sm:h-[250px]">
          <div aria-hidden className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(16,185,129,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.15)_1px,transparent_1px)] [background-size:24px_24px]"/>
          <div className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-xr-scan z-10"/>
          <div className="relative h-full rounded-xl border border-white/10 bg-[#12161f]/80 p-4 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">XR</span>
                <div>
                  <span className="block label-mono text-[6px] text-white/50">{t.hudStatus}</span>
                  <span className="block text-[10px] font-semibold text-white/90">TELEMETRY_ENGINE_v2.4</span>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 label-mono text-[7px] font-bold text-emerald-400">
                {loading ? "SCANNING..." : "MONITORING"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto py-2">
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                <span className="block label-mono text-[6px] text-white/40">{t.hudSsl}</span>
                <span className="mt-1 block text-[10px] font-mono font-bold text-emerald-400">TLS 1.3 · A+</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                <span className="block label-mono text-[6px] text-white/40">{t.hudSpeed}</span>
                <span className="mt-1 block text-[10px] font-mono font-bold text-cyan-400">1.1s LCP</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                <span className="block label-mono text-[6px] text-white/40">{t.hudDom}</span>
                <span className="mt-1 block text-[10px] font-mono font-bold text-amber-400">Clean DOM</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                <span className="block label-mono text-[6px] text-white/40">{t.hudUx}</span>
                <span className="mt-1 block text-[10px] font-mono font-bold text-rose-400">98/100 Mobile</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-7 border-t border-white/10 pt-2">
              {[38, 62, 45, 85, 70, 92, 54, 78, 65, 88, 42, 95, 73, 84, 60, 90].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/20 to-emerald-400 transition-all duration-300" style={{ height: (loading ? (h * 0.9 + (i % 3) * 5) : h) + "%" }}/>
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#0c0e14]/90 px-3 py-2 shadow-lg backdrop-blur-xl">
            <span className="label-mono text-[5px] tracking-[.18em] text-white/50">{t.structureBanner}</span>
            <span className="text-[7px] font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"/>
              {loading ? t.scanRunning : t.scanReady}
            </span>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="xr-audit-floating absolute right-5 top-[30%] z-20 hidden w-[165px] rounded-2xl border border-white/20 bg-[#11151e]/90 p-3.5 shadow-[0_28px_70px_-25px_rgba(0,0,0,.85)] backdrop-blur-2xl sm:block text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="label-mono text-[6px] text-white/60">INDEX_SCORE</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
        </div>
        <div className="mt-2.5 flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 rounded-full" style={{ background: "conic-gradient(#10b981 0 88%, rgba(255,255,255,.1) 88% 100%)" }}>
            <div className="absolute inset-[4px] rounded-full bg-[#11151e] grid place-items-center">
              <span className="font-mono text-[9px] font-bold text-white">88%</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <span className="block h-1.5 w-full rounded-full bg-white/20"/>
            <span className="block h-1.5 w-3/4 rounded-full bg-emerald-400/80"/>
            <span className="block h-1.5 w-1/2 rounded-full bg-white/10"/>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[7px] font-mono text-white/70">
          <span>LATENCY</span>
          <span className="text-emerald-400">18ms</span>
        </div>
      </div>
      <div className="relative flex flex-col justify-between">
        <div>
          <span className="label-mono text-[6px] xr-muted-2">{t.reportChapter}</span>
          <p className="mt-3 display-serif text-4xl tracking-[-.04em]">{t.reportTitle}</p>
          <p className="mt-4 max-w-md text-sm leading-6 xr-muted">{t.reportDesc}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {t.reportPills.map((x, i) => (
            <div key={x} className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3.5 transition hover:bg-[var(--xr-accent-soft)]">
              <span className="label-mono text-[5px] xr-muted-2">0{i + 1}</span>
              <p className="mt-2 text-[9px] font-semibold">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </div></Reveal>
   </div>}

   {result&&<Reveal><div className="mt-8 space-y-5"><div className="grid gap-5 lg:grid-cols-[.5fr_1.5fr]"><div className="xr-panel rounded-[2.2rem] p-6 sm:p-8"><div className="flex items-center justify-between"><span className="label-mono text-[6px] xr-muted-2">{t.score}</span><span className="label-mono text-[6px] xr-muted-2">HTTP {result.status}</span></div><div className="mx-auto mt-8 grid h-48 w-48 place-items-center rounded-full border-[12px] border-[var(--xr-accent-soft)]" style={{background:"conic-gradient(var(--xr-accent) "+result.score+"%, transparent 0)"}}><div className="grid h-36 w-36 place-items-center rounded-full bg-[var(--xr-bg-elev)]"><div className="text-center"><span className="display-serif text-6xl">{result.score}</span><span className="block label-mono text-[6px] xr-muted-2">/ 100</span></div></div></div><p className="mt-6 break-words text-center text-[9px] font-semibold">{result.url}</p><p className="mt-2 text-center text-[8px] leading-4 xr-muted">{result.types.length} {t.axesAnalyzed}</p></div><div className="xr-panel rounded-[2.2rem] p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="label-mono text-[6px] xr-muted-2">{t.readingSite}</span><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-3xl">{result.title||t.noTitle}</h3><p className="mt-2 max-w-3xl text-[9px] leading-5 xr-muted">{result.description||t.noDesc}</p></div><a href={result.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full border xr-line px-3 py-2 label-mono text-[6px] xr-muted">{t.openSite} <ExternalLink className="h-3 w-3"/></a></div><div className="mt-6 grid gap-2 sm:grid-cols-2">{result.findings.map((f,i)=><div key={f.label+i} className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-4"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg border xr-line">{f.status===false?"!":<Check className="h-3.5 w-3.5 xr-accent"/>}</span><span className="text-[9px] font-semibold">{f.label}</span></div><p className="mt-2 text-[8px] leading-4 xr-muted">{f.detail}</p></div>)}</div></div></div><div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div className="xr-panel rounded-[2.2rem] p-6 sm:p-8"><span className="label-mono text-[6px] xr-muted-2">{t.recommend}</span><div className="mt-5 grid gap-2">{(result.recommendations??[]).map((x,i)=><div key={x.service+i} className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-4"><div className="flex gap-3"><span className="label-mono text-[6px] xr-accent">0{i+1}</span><div><p className="text-[9px] font-semibold">{x.service}</p><p className="mt-1 text-[8px] leading-4 xr-muted">{x.reason}</p></div></div></div>)}</div></div><div className="xr-panel-strong rounded-[2.2rem] p-6 sm:p-8"><span className="label-mono text-[6px] xr-muted-2">{t.exportChapter}</span><p className="mt-3 display-serif text-3xl leading-[.9]">{t.exportTitle}</p><div className="mt-6 grid gap-2"><button type="button" onClick={makePdf} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-3.5 label-mono text-[8px] font-semibold text-[var(--xr-bg)]"><FileText className="h-4 w-4"/>{t.pdf}</button><a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border xr-line px-5 py-3.5 label-mono text-[8px] xr-muted"><MessageCircle className="h-4 w-4"/>{t.wa}</a></div><div className="mt-6 border-t xr-line pt-4"><p className="text-[8px] xr-muted">{t.email}</p><div className="mt-2 grid gap-2 sm:grid-cols-[.75fr_1fr_auto]"><input value={name} onChange={e=>setName(e.target.value)} placeholder={t.name} className="rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2.5 text-[9px] outline-none"/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.mail} type="email" className="rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2.5 text-[9px] outline-none"/><a href={email?"mailto:"+email:"mailto:contact.xragency@gmail.com"} className="inline-flex items-center justify-center gap-2 rounded-xl border xr-line px-3 py-2.5 label-mono text-[6px] xr-muted"><Mail className="h-3 w-3"/>Mail</a></div></div><button type="button" onClick={()=>{setResult(null);setError("")}} className="mt-5 inline-flex items-center gap-2 label-mono text-[6px] xr-muted-2">{t.retry}<ArrowRight className="h-3 w-3"/></button></div></div></div></Reveal>}
   {error&&<div className="mt-5 rounded-2xl border xr-line bg-[var(--xr-surface)] p-4 text-sm xr-muted">{error}</div>}
  </div>
 </section>;
}

