import { useState } from "react";
import { ArrowRight, Check, Film, Heart, MessageCircle, PenLine, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

const COPY = {
  fr: {
    kicker: "Social Media · Content System",
    title: "Du contenu pensé pour votre marque. Pas pour remplir un calendrier.",
    intro: "Nous construisons une présence sociale cohérente : une direction visuelle reconnaissable, des sujets éditoriaux pertinents et des formats adaptés à vos objectifs.",
    objectives: "Choisissez votre objectif",
    objectivesData: [
      ["awareness", "Notoriété", "Construire une présence visuelle cohérente et mémorable."],
      ["leads", "Acquisition", "Transformer le contenu en intérêt, demandes et conversations."],
      ["authority", "Autorité", "Installer une expertise et une présence forte dans votre secteur."],
    ],
    what: "Ce que vous achetez réellement",
    pillars: [
      ["Direction artistique", "Une ligne visuelle cohérente pour éviter l'effet catalogue ou template."],
      ["Stratégie éditoriale", "Des sujets, formats et angles choisis selon votre objectif business."],
      ["Production", "Posts, carrousels, stories et formats courts selon le niveau choisi."],
      ["Publication & engagement", "Calendrier, programmation, modération et interaction selon le forfait."],
    ],
    offers: "Trois niveaux. Un périmètre clair.",
    offerIntro: "Le prix évolue avec le volume de production, les formats et le niveau d'animation de la communauté — pas avec des promesses de likes ou d'abonnés.",
    cta: "Discuter de ce forfait",
    language: "1 langue incluse · +100 € / langue supplémentaire",
    platform: "Plateformes",
    platformData: [
      ["Instagram", "Image, carrousel, Reels, Stories"],
      ["TikTok", "Formats courts et narration verticale"],
      ["LinkedIn", "Expertise, marque employeur, B2B"],
      ["Facebook", "Communauté, relais et présence locale"],
    ],
  },
  en: {
    kicker: "Social Media · Content System",
    title: "Content built for your brand. Not just to fill a calendar.",
    intro: "We build a coherent social presence: a recognisable visual direction, relevant editorial topics and formats aligned with your objectives.",
    objectives: "Choose your objective",
    objectivesData: [["awareness", "Awareness", "Build a coherent and memorable visual presence."], ["leads", "Acquisition", "Turn content into interest, enquiries and conversations."], ["authority", "Authority", "Build expertise and a strong position in your sector."]],
    what: "What you are actually buying",
    pillars: [["Art direction", "A coherent visual line that avoids generic templates."], ["Editorial strategy", "Topics, formats and angles selected around your business objective."], ["Production", "Posts, carousels, stories and short-form content depending on the plan."], ["Publishing & engagement", "Calendar, scheduling, moderation and interaction depending on the plan."]],
    offers: "Three levels. A clear scope.",
    offerIntro: "Pricing changes with production volume, formats and community management — not with promises of likes or followers.",
    cta: "Discuss this plan",
    language: "1 language included · +€100 / additional language",
    platform: "Platforms",
    platformData: [["Instagram", "Images, carousels, Reels, Stories"], ["TikTok", "Short-form vertical storytelling"], ["LinkedIn", "Expertise, employer brand, B2B"], ["Facebook", "Community, distribution and local presence"]],
  },
  vi: {
    kicker: "Social Media · Content System",
    title: "Nội dung dành cho thương hiệu của bạn, không chỉ để lấp đầy lịch đăng.",
    intro: "XRAGENCY biến mạng xã hội thành một hệ thống nội dung: định hướng hình ảnh, nội dung, lịch đăng, xuất bản và tương tác — với mức hỗ trợ phù hợp với mục tiêu của bạn.",
    objectives: "Chọn mục tiêu",
    objectivesData: [["awareness", "Nhận diện", "Xây dựng hình ảnh nhất quán và dễ ghi nhớ."], ["leads", "Khách hàng", "Biến nội dung thành sự quan tâm và cuộc trò chuyện."], ["authority", "Uy tín", "Xây dựng chuyên môn và vị thế mạnh trong lĩnh vực."]],
    what: "Bạn thực sự đang mua gì",
    pillars: [["Định hướng hình ảnh", "Hệ thống hình ảnh nhất quán, tránh giao diện mẫu đại trà."], ["Chiến lược nội dung", "Chủ đề, định dạng và góc tiếp cận theo mục tiêu kinh doanh."], ["Sản xuất", "Bài đăng, carousel, story và video ngắn tùy gói."], ["Đăng & tương tác", "Lịch đăng, lên lịch, kiểm duyệt và tương tác tùy gói."]],
    offers: "Ba cấp độ. Phạm vi rõ ràng.",
    offerIntro: "Giá thay đổi theo khối lượng sản xuất, định dạng và mức độ quản trị cộng đồng — không dựa trên lời hứa về lượt thích hay người theo dõi.",
    cta: "Trao đổi về gói này",
    language: "1 ngôn ngữ · +100 € / ngôn ngữ thêm",
    platform: "Nền tảng",
    platformData: [["Instagram", "Hình ảnh, carousel, Reels, Stories"], ["TikTok", "Video ngắn dạng dọc"], ["LinkedIn", "Chuyên môn, thương hiệu tuyển dụng, B2B"], ["Facebook", "Cộng đồng, phân phối và hiện diện địa phương"]],
  },
} as const;

const PLANS = [
  {
    name: { fr: "Présence Essentielle", en: "Essential Presence", vi: "Hiện diện Cơ bản" }, price: 349,
    desc: { fr: "Pour une présence sociale régulière et professionnelle.", en: "For a regular, professional social presence.", vi: "Cho hiện diện mạng xã hội đều đặn và chuyên nghiệp." },
    features: { fr: ["16 publications / mois", "Posts & carrousels", "Stratégie éditoriale et visuelle", "Rédaction ciblée", "Calendrier pour validation", "Reporting mensuel"], en: ["16 publications / month", "Posts & carousels", "Editorial and visual strategy", "Targeted copywriting", "Calendar for approval", "Monthly reporting"], vi: ["16 bài đăng / tháng", "Post & carousel", "Chiến lược nội dung và hình ảnh", "Nội dung theo mục tiêu", "Lịch duyệt bài", "Báo cáo hàng tháng"] },
  },
  {
    name: { fr: "Croissance Active", en: "Active Growth", vi: "Tăng trưởng Tích cực" }, price: 499,
    desc: { fr: "Pour développer le contenu, les formats et l'interaction.", en: "For stronger content, formats and engagement.", vi: "Cho nội dung, định dạng và tương tác mạnh hơn." },
    features: { fr: ["Tout Présence Essentielle", "20 publications / mois", "Reels / TikTok", "3 Stories / semaine", "Interaction proactive", "Reporting renforcé"], en: ["Everything in Essential Presence", "20 publications / month", "Reels / TikTok", "3 Stories / week", "Proactive engagement", "Enhanced reporting"], vi: ["Toàn bộ gói Cơ bản", "20 bài đăng / tháng", "Reels / TikTok", "3 Story / tuần", "Tương tác chủ động", "Báo cáo nâng cao"] }, popular: true,
  },
  {
    name: { fr: "Social Authority", en: "Social Authority", vi: "Social Authority" }, price: 799,
    desc: { fr: "Pour une présence éditoriale forte avec animation de communauté.", en: "For a stronger editorial presence with community management.", vi: "Cho hiện diện nội dung mạnh cùng quản trị cộng đồng." },
    features: { fr: ["Production de contenu en continu", "Stories quotidiennes", "Modération des commentaires", "Gestion des messages privés", "Sondages & FAQ", "Reporting stratégique"], en: ["Continuous content production", "Daily Stories", "Comment moderation", "Direct message management", "Polls & Q&A", "Strategic reporting"], vi: ["Sản xuất nội dung liên tục", "Story hàng ngày", "Kiểm duyệt bình luận", "Quản lý tin nhắn riêng", "Khảo sát & Q&A", "Báo cáo chiến lược"] },
  },
];

export function SocialContentExperience() {
  const { lang } = useLang();
  const displayLang: "fr" | "en" | "vi" = lang === "ar" || lang === "ru" ? "en" : lang;
  const copy = COPY[displayLang];
  const [objective, setObjective] = useState(0);
  const [plan, setPlan] = useState(1);
  const selected = PLANS[plan];
  const objectiveItem = copy.objectivesData[objective];
  const selectedMessage = encodeURIComponent(`Bonjour XR Agency, je souhaite échanger au sujet du forfait "${selected.name[displayLang]}" (${selected.price} € / mois).`);

  return (
    <section className="border-y border-border/60 bg-card/20 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="max-w-4xl">
          <p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.kicker}</p>
          <h2 className="display-serif mt-4 max-w-4xl text-4xl leading-[.98] sm:text-5xl lg:text-7xl">{copy.title}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-border bg-background p-7 sm:p-9">
            <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.objectives}</p></div>
            <div className="mt-7 space-y-3">
              {copy.objectivesData.map(([key, title, desc], index) => <button key={key} type="button" onClick={() => setObjective(index)} className={`w-full rounded-2xl border p-4 text-left transition-all ${objective === index ? "border-primary bg-primary/[0.07]" : "border-border/70 hover:border-primary/40"}`}><span className="label-mono text-[10px] text-primary">0{index + 1}</span><p className="mt-2 font-medium">{title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p></button>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:p-9">
            <p className="label-mono text-xs uppercase tracking-widest text-primary">{objectiveItem[1]}</p>
            <h3 className="display-serif mt-4 text-4xl sm:text-5xl">{objectiveItem[2]}</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[Film, PenLine, Heart, MessageCircle].map((Icon, index) => <div key={index} className="rounded-2xl border border-border/70 bg-background/60 p-5"><Icon className="h-4 w-4 text-primary" /><p className="mt-3 text-sm font-medium">{copy.pillars[index][0]}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy.pillars[index][1]}</p></div>)}
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="max-w-3xl">
            <p className="label-mono text-xs uppercase tracking-widest text-primary">{displayLang === "fr" ? "Une ligne éditoriale, plusieurs formats" : displayLang === "en" ? "One editorial direction, multiple formats" : "Một định hướng nội dung, nhiều định dạng"}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{displayLang === "fr" ? "Des exemples de formats qui peuvent composer votre calendrier, selon le forfait et les contenus validés." : displayLang === "en" ? "Examples of formats that can shape your calendar, depending on the plan and approved content." : "Ví dụ về các định dạng có thể xuất hiện trong lịch đăng, tùy theo gói và nội dung đã duyệt."}</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { label: displayLang === "fr" ? "Publication" : displayLang === "en" ? "Post" : "Bài đăng", icon: PenLine, style: "from-amber-100 via-orange-50 to-rose-100", mark: "01" },
              { label: displayLang === "fr" ? "Carrousel" : displayLang === "en" ? "Carousel" : "Carousel", icon: Film, style: "from-sky-100 via-cyan-50 to-indigo-100", mark: "02" },
              { label: "Stories", icon: Heart, style: "from-fuchsia-100 via-pink-50 to-orange-100", mark: "03" },
              { label: displayLang === "fr" ? "Vidéo courte" : displayLang === "en" ? "Short video" : "Video ngắn", icon: MessageCircle, style: "from-lime-100 via-emerald-50 to-teal-100", mark: "04" },
            ].map(({ label, icon: Icon, style, mark }) => (
              <div key={label} className="group overflow-hidden rounded-2xl border border-border bg-background">
                <div className={"relative aspect-[4/5] overflow-hidden bg-gradient-to-br " + style + " p-4 sm:p-5"}>
                  <div className="absolute -right-8 top-8 h-28 w-28 rounded-full border-[18px] border-white/50 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute bottom-5 left-4 right-4 sm:bottom-6 sm:left-5 sm:right-5">
                    <div className="h-1.5 w-1/3 rounded-full bg-slate-900/65" />
                    <div className="mt-2 h-1.5 w-2/3 rounded-full bg-slate-900/25" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-900/70">{mark} / XR</span>
                      <Icon className="h-4 w-4 text-slate-900/70" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16"><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.what}</p><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{copy.pillars.map(([title, desc], index) => <div key={title} className="rounded-2xl border border-border bg-background p-6"><span className="label-mono text-[10px] text-primary">0{index + 1}</span><h3 className="mt-4 font-medium">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p></div>)}</div></div>

        <div className="mt-16"><div className="max-w-3xl"><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.offers}</p><p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy.offerIntro}</p></div><div className="mt-8 grid gap-5 lg:grid-cols-3">{PLANS.map((item, index) => { const active = index === plan; return <button key={item.price} type="button" onClick={() => setPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all ${active ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}><div className="flex items-start justify-between gap-3"><span className="label-mono text-[10px] text-primary">0{index + 1} / 03</span>{index === 1 && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">RECOMMANDÉ</span>}</div><h3 className="display-serif mt-5 text-3xl">{item.name[displayLang]}</h3><div className="mt-5 flex items-end gap-2"><span className="display-serif text-4xl text-primary">{item.price} €</span><span className="label-mono mb-1 text-xs text-muted-foreground">/ month</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc[displayLang]}</p><ul className="mt-6 space-y-3">{item.features[displayLang].map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul></button>})}</div><div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">{selected.name[displayLang]}</p><p className="mt-1 text-xs text-muted-foreground">{copy.language}</p></div><a href={`https://wa.me/33767566783?text=${selectedMessage}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]">{copy.cta}<ArrowRight className="h-4 w-4" /></a></div></div>

        <div className="mt-16"><p className="label-mono text-xs uppercase tracking-widest text-primary">{copy.platform}</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{copy.platformData.map(([platform, desc]) => <div key={platform} className="rounded-2xl border border-border bg-background p-6"><p className="font-medium">{platform}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p></div>)}</div></div>
      </div>
    </section>
  );
}
