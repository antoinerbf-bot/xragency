import { ArrowUpRight, BarChart3, Bot, Brush, Globe2, Layers3, MapPinned, Megaphone, Sparkles, Users, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Props = { service: string; title?: string };

const meta: Record<string, { label: string; icon: typeof Globe2; metric: Record<string,string>; bars: number[] }> = {
  websites: { label: "WEB DESIGN", icon: Globe2, metric: { fr:"STRUCTURE · UX · UI", en:"STRUCTURE · UX · UI", vi:"CẤU TRÚC · UX · UI", ar:"هيكلة · UX · UI", ru:"СТРУКТУРА · UX · UI" }, bars:[72,88,64] },
  branding: { label: "BRAND SYSTEM", icon: Brush, metric: { fr:"IDENTITÉ · SYSTÈME", en:"IDENTITY · SYSTEM", vi:"NHẬN DIỆN · HỆ THỐNG", ar:"هوية · نظام", ru:"АЙДЕНТИКА · СИСТЕМА" }, bars:[86,64,92] },
  seo: { label: "SEO", icon: BarChart3, metric: { fr:"VISIBILITÉ · CONTENU", en:"VISIBILITY · CONTENT", vi:"HIỂN THỊ · NỘI DUNG", ar:"ظهور · محتوى", ru:"ВИДИМОСТЬ · КОНТЕНТ" }, bars:[58,76,91] },
  maps: { label: "LOCAL SEARCH", icon: MapPinned, metric: { fr:"GOOGLE · LOCAL", en:"GOOGLE · LOCAL", vi:"GOOGLE · ĐỊA PHƯƠNG", ar:"GOOGLE · محلي", ru:"GOOGLE · ЛОКАЛЬНЫЙ" }, bars:[64,84,78] },
  social: { label: "SOCIAL", icon: Users, metric: { fr:"CONTENU · RYTHME", en:"CONTENT · RHYTHM", vi:"NỘI DUNG · NHỊP", ar:"محتوى · إيقاع", ru:"КОНТЕНТ · РИТМ" }, bars:[78,66,88] },
  maintenance: { label: "WEBCARE", icon: Wrench, metric: { fr:"SÉCURITÉ · SUIVI", en:"SECURITY · CARE", vi:"BẢO MẬT · THEO DÕI", ar:"أمان · متابعة", ru:"БЕЗОПАСНОСТЬ · ПОДДЕРЖКА" }, bars:[92,74,83] },
  ai: { label: "AI", icon: Bot, metric: { fr:"AUTOMATION · IA", en:"AUTOMATION · AI", vi:"TỰ ĐỘNG · AI", ar:"أتمتة · ذكاء اصطناعي", ru:"АВТОМАТИЗАЦИЯ · AI" }, bars:[80,92,70] },
  ads: { label: "CAMPAIGNS", icon: Megaphone, metric: { fr:"ACQUISITION · DATA", en:"ACQUISITION · DATA", vi:"TIẾP CẬN · DỮ LIỆU", ar:"اكتساب · بيانات", ru:"ПРИВЛЕЧЕНИЕ · ДАННЫЕ" }, bars:[74,86,90] },
  strategy: { label: "STRATEGY", icon: Sparkles, metric: { fr:"POSITIONNEMENT · PLAN", en:"POSITIONING · PLAN", vi:"ĐỊNH VỊ · KẾ HOẠCH", ar:"تموضع · خطة", ru:"ПОЗИЦИОНИРОВАНИЕ · ПЛАН" }, bars:[88,72,94] },
  refonte: { label: "REDESIGN", icon: Layers3, metric: { fr:"UX · PERFORMANCE", en:"UX · PERFORMANCE", vi:"UX · HIỆU NĂNG", ar:"UX · أداء", ru:"UX · ПРОИЗВОДИТЕЛЬНОСТЬ" }, bars:[82,76,90] },
};

export function ServiceIllustration({ service, title }: Props) {
  const { t } = useLang();
  const info = meta[service] ?? meta.websites;
  const Icon = info.icon;
  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0e12] shadow-[0_40px_100px_-45px_rgba(0,0,0,.8)]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(214,164,93,.18),transparent_30%),linear-gradient(135deg,#10141a,#080a0d_60%,#11151b)]" />
      <div aria-hidden className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 backdrop-blur-xl"><Icon className="h-3.5 w-3.5 text-primary" /><span className="label-mono text-[8px] tracking-[.2em] text-white/70">{info.label}</span></div>
      <div className="absolute right-6 top-6 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right backdrop-blur-xl"><span className="label-mono text-[7px] text-white/35">XR SYSTEM</span><p className="mt-1 text-xs font-semibold text-white">{t(info.metric)}</p></div>
      <div className="absolute inset-x-6 top-[34%]">
        <div className="flex items-end gap-3">
          {info.bars.map((height, index) => <div key={index} className="flex-1 rounded-t-xl border border-white/10 bg-white/[.035]" style={{ height: Math.max(62,height/1.45) + "px" }}><div className="h-full rounded-t-xl bg-primary/70 transition-all duration-700 group-hover:bg-primary" style={{ transformOrigin:"bottom", transform:"scaleY(.72)", transitionDelay: (index * 80) + "ms" }} /></div>)}
        </div>
        <div className="mt-3 flex items-center gap-2"><div className="h-px flex-1 bg-white/10" /><Sparkles className="h-3 w-3 text-primary" /><div className="h-px flex-1 bg-white/10" /></div>
      </div>
      <div className="absolute inset-x-6 bottom-6 rounded-[1.25rem] border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-end justify-between gap-4"><div><span className="label-mono text-[8px] tracking-[.22em] text-primary">{t({fr:"DIRECTION · PRODUCTION · MESURE",en:"DIRECTION · PRODUCTION · MEASURE",vi:"ĐỊNH HƯỚNG · TRIỂN KHAI · ĐO LƯỜNG",ar:"اتجاه · تنفيذ · قياس",ru:"НАПРАВЛЕНИЕ · ПРОДАКШН · ИЗМЕРЕНИЕ"})}</span><h3 className="mt-2 text-lg font-semibold text-white">{title ?? info.label}</h3></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white"><ArrowUpRight className="h-4 w-4" /></span></div>
        <div className="mt-4 h-px bg-white/10"><div className="h-px w-2/3 bg-primary transition-all duration-700 group-hover:w-full" /></div>
      </div>
    </figure>
  );
}
