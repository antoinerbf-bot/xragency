import { Check, MessageCircle, ArrowRight, Instagram, Linkedin, Video } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const COPY = {
  fr: {
    eyebrow: "Social Management",
    title: "Vous n'achetez pas des posts. Vous achetez une présence sociale gérée de A à Z.",
    intro: "Chaque forfait définit précisément le volume de contenu, les réseaux couverts, la gestion de communauté et le niveau d'accompagnement. Pas de forfait flou.",
    pillars: [
      ["01", "Stratégie", "Positionnement éditorial, calendrier mensuel, angles de contenu et formats adaptés à votre activité."],
      ["02", "Production", "Création des visuels, carrousels, légendes et vidéos courtes selon le forfait choisi."],
      ["03", "Publication", "Programmation et publication sur les comptes définis dans votre forfait."],
      ["04", "Gestion", "Commentaires, messages privés et animation de communauté selon le niveau de gestion choisi."],
    ],
    included: "Ce qui est compris",
    content: "Contenu / mois",
    networks: "Réseaux",
    community: "Gestion de communauté",
    stories: "Stories / mois",
    reels: "Reels / TikTok / mois",
    reporting: "Reporting",
    language: "Langue incluse",
    extraLanguage: "+100 € / langue supplémentaire",
    essential: "Présence Essentielle",
    active: "Croissance Active",
    authority: "Social Authority",
    essentialAudience: "Pour une marque qui veut une présence régulière et professionnelle.",
    activeAudience: "Pour une marque qui veut accélérer sa production et son engagement.",
    authorityAudience: "Pour les marques qui veulent déléguer leur présence sociale presque intégralement.",
    plans: [
      {
        price: 299,
        name: "Présence Essentielle",
        audience: "Pour une marque qui veut une présence régulière et professionnelle.",
        posts: "12 publications",
        stories: "8 Stories",
        reels: "2 vidéos courtes",
        networks: "2 réseaux",
        community: "Réponse aux commentaires 3 jours / semaine",
        dm: "Messages privés : non inclus",
        reporting: "1 reporting mensuel",
        features: ["Calendrier éditorial mensuel", "Direction artistique & ligne éditoriale", "12 posts / carrousels", "8 Stories", "2 Reels / vidéos courtes", "Programmation & publication", "Réponse aux commentaires 3 jours / semaine", "1 reporting mensuel"],
      },
      {
        price: 499,
        name: "Croissance Active",
        audience: "Pour une marque qui veut accélérer sa production et son engagement.",
        posts: "20 publications",
        stories: "12 Stories",
        reels: "4 vidéos courtes",
        networks: "3 réseaux",
        community: "Commentaires + messages privés, 5 jours / semaine",
        dm: "DM inclus",
        reporting: "2 reportings mensuels",
        features: ["Tout le niveau Essentiel", "20 posts / carrousels", "12 Stories", "4 Reels / vidéos courtes", "Publication sur 3 réseaux", "Réponse aux commentaires 5 jours / semaine", "Gestion des messages privés 5 jours / semaine", "2 reportings mensuels", "Ajustements éditoriaux mensuels"],
      },
      {
        price: 799,
        name: "Social Authority",
        audience: "Pour les marques qui veulent déléguer leur présence sociale presque intégralement.",
        posts: "30 publications",
        stories: "20 Stories",
        reels: "8 vidéos courtes",
        networks: "4 réseaux",
        community: "Commentaires + messages privés 6 jours / semaine",
        dm: "DM inclus",
        reporting: "Reporting mensuel + synthèse stratégique",
        features: ["Tout le niveau Croissance Active", "30 posts / carrousels", "20 Stories", "8 Reels / vidéos courtes", "Publication sur 4 réseaux", "Réponse aux commentaires 6 jours / semaine", "Gestion des messages privés 6 jours / semaine", "Animation : sondages, questions, CTA", "Reporting + recommandations stratégiques mensuelles"],
      },
    ],
    note: "Les volumes correspondent à un mois de gestion. Les contenus nécessitant une production sur site (shooting photo/vidéo, déplacement, mannequin, studio, etc.) font l'objet d'un devis séparé. Les campagnes publicitaires payantes ne sont pas incluses.",
    cta: "Choisir mon forfait",
  },
  en: {
    eyebrow: "Social Management",
    title: "You are not buying posts. You are buying a fully managed social presence.",
    intro: "Every plan defines content volume, networks, community management and support level. No vague package.",
    pillars: [["01", "Strategy", "Editorial positioning, monthly calendar, content angles and formats."], ["02", "Production", "Visuals, carousels, captions and short-form video according to the plan."], ["03", "Publishing", "Scheduling and publishing on the networks included in your plan."], ["04", "Management", "Comments, DMs and community activation according to your management level."]],
    included: "What is included", content: "Content / month", networks: "Networks", community: "Community management", stories: "Stories / month", reels: "Reels / TikTok / month", reporting: "Reporting", language: "Included language", extraLanguage: "+€100 / additional language", essential: "Essential Presence", active: "Active Growth", authority: "Social Authority", essentialAudience: "For a brand that wants a consistent professional presence.", activeAudience: "For a brand that wants to accelerate production and engagement.", authorityAudience: "For brands that want to almost fully delegate their social presence.", plans: [], note: "Volumes are monthly. On-site production (photo/video shoots, travel, models, studio, etc.) is quoted separately. Paid advertising campaigns are not included.", cta: "Choose my plan",
  },
  vi: {
    eyebrow: "Social Management",
    title: "Bạn không mua số lượng bài đăng. Bạn mua một hệ thống quản trị mạng xã hội hoàn chỉnh.",
    intro: "Mỗi gói xác định rõ số lượng nội dung, nền tảng, quản trị cộng đồng và mức độ hỗ trợ.",
    pillars: [["01", "Chiến lược", "Định vị nội dung, lịch biên tập, góc nội dung và định dạng phù hợp."], ["02", "Sản xuất", "Hình ảnh, carousel, caption và video ngắn theo từng gói."], ["03", "Đăng tải", "Lên lịch và đăng nội dung trên các nền tảng trong gói."], ["04", "Quản trị", "Bình luận, tin nhắn riêng và hoạt động cộng đồng theo cấp độ."]],
    included: "Bao gồm", content: "Nội dung / tháng", networks: "Nền tảng", community: "Quản trị cộng đồng", stories: "Stories / tháng", reels: "Reels / TikTok / tháng", reporting: "Báo cáo", language: "Ngôn ngữ", extraLanguage: "+100 € / ngôn ngữ thêm", essential: "Hiện diện Cơ bản", active: "Tăng trưởng Tích cực", authority: "Social Authority", essentialAudience: "Cho thương hiệu cần hiện diện chuyên nghiệp và đều đặn.", activeAudience: "Cho thương hiệu muốn tăng tốc sản xuất và tương tác.", authorityAudience: "Cho thương hiệu muốn gần như giao toàn bộ mạng xã hội.", plans: [], note: "Số lượng tính theo tháng. Sản xuất tại địa điểm (chụp ảnh/video, di chuyển, studio...) báo giá riêng. Không bao gồm quảng cáo trả phí.", cta: "Chọn gói của tôi",
  },
} as const;

const ICONS = [Instagram, Video, Linkedin];

type Plan = { price: number; name: string; audience: string; posts: string; stories: string; reels: string; networks: string; community: string; dm: string; reporting: string; features: string[] };

export function SocialManagementExperience() {
  const { lang } = useLang();
  const base = COPY[lang];
  const plans: Plan[] = lang === "fr" ? base.plans as Plan[] : [
    { price: 299, name: lang === "en" ? base.essential : "Hiện diện Cơ bản", audience: lang === "en" ? base.essentialAudience : "Cho thương hiệu cần hiện diện chuyên nghiệp và đều đặn.", posts: "12 publications", stories: "8 Stories", reels: "2 short videos", networks: "2 networks", community: "Comments 3 days/week", dm: "DMs not included", reporting: "1 monthly report", features: ["Monthly editorial calendar", "Art direction & editorial line", "12 posts / carousels", "8 Stories", "2 short videos", "Scheduling & publishing", "Comments 3 days/week", "1 monthly report"] },
    { price: 499, name: lang === "en" ? base.active : "Tăng trưởng Tích cực", audience: lang === "en" ? base.activeAudience : "Cho thương hiệu muốn tăng tốc sản xuất và tương tác.", posts: "20 publications", stories: "12 Stories", reels: "4 short videos", networks: "3 networks", community: "Comments + DMs, 5 days/week", dm: "DMs included", reporting: "2 monthly reports", features: ["Everything in Essential", "20 posts / carousels", "12 Stories", "4 short videos", "3 networks", "Comments 5 days/week", "DM management 5 days/week", "2 monthly reports"] },
    { price: 799, name: lang === "en" ? base.authority : "Social Authority", audience: lang === "en" ? base.authorityAudience : "Cho thương hiệu muốn gần như giao toàn bộ mạng xã hội.", posts: "30 publications", stories: "20 Stories", reels: "8 short videos", networks: "4 networks", community: "Comments + DMs, 6 days/week", dm: "DMs included", reporting: "Monthly report + strategy", features: ["Everything in Active Growth", "30 posts / carousels", "20 Stories", "8 short videos", "4 networks", "Comments 6 days/week", "DM management 6 days/week", "Polls, questions and CTAs", "Monthly strategic recommendations"] },
  ];

  return <section className="border-y border-border/60 bg-card/20 py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-5xl">
        <p className="label-mono text-xs uppercase tracking-widest text-primary">{base.eyebrow}</p>
        <h2 className="display-serif mt-4 text-4xl leading-tight sm:text-6xl">{base.title}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{base.intro}</p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-4">
        {base.pillars.map(([num, title, desc], i) => { const Icon = ICONS[i % ICONS.length]; return <div key={num} className="bg-background p-7"><div className="flex items-center justify-between"><span className="label-mono text-xs text-primary">{num}</span><Icon className="h-4 w-4 text-muted-foreground" /></div><h3 className="display-serif mt-8 text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p></div>; })}
      </div>

      <div className="mt-20"><p className="label-mono text-xs uppercase tracking-widest text-primary">{base.included}</p><div className="mt-8 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => <article key={plan.price} className={`relative rounded-[2rem] border p-7 sm:p-8 ${index === 1 ? "border-primary bg-primary/[0.06] shadow-xl" : "border-border bg-background/70"}`}>
          {index === 1 && <span className="absolute right-6 top-6 label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">RECOMMANDÉ</span>}
          <p className="label-mono text-xs text-primary">0{index + 1} / 03</p>
          <h3 className="display-serif mt-5 pr-12 text-3xl">{plan.name}</h3>
          <p className="mt-3 min-h-12 text-sm text-muted-foreground">{plan.audience}</p>
          <div className="mt-6 flex items-end gap-2 border-y border-border/60 py-5"><span className="display-serif text-5xl text-primary">{plan.price} €</span><span className="label-mono mb-1 text-xs text-muted-foreground">/ mois</span></div>
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">{base.content}</span><strong>{plan.posts}</strong></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">{base.stories}</span><strong>{plan.stories}</strong></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">{base.reels}</span><strong>{plan.reels}</strong></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">{base.networks}</span><strong>{plan.networks}</strong></div>
          </div>
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-4"><p className="label-mono text-[10px] uppercase text-primary">{base.community}</p><p className="mt-2 text-sm leading-relaxed">{plan.community}</p><p className="mt-2 text-xs text-muted-foreground">{plan.dm}</p></div>
          <ul className="mt-6 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{feature}</span></li>)}</ul>
          <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite choisir le forfait Social « ${plan.name} » à ${plan.price} €/mois.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">{base.cta}<ArrowRight className="h-4 w-4" /></a>
        </article>)}
      </div></div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/60 p-5"><p className="label-mono text-[10px] uppercase tracking-widest text-primary">{base.language}</p><p className="mt-2 text-sm">1 langue incluse · {base.extraLanguage}</p></div>
        <div className="rounded-2xl border border-border bg-background/60 p-5"><p className="label-mono text-[10px] uppercase tracking-widest text-primary">{base.reporting}</p><p className="mt-2 text-sm">{plans[1]?.reporting}</p></div>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{base.note}</p>
    </div>
  </section>;
}
