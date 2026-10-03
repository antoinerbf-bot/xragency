import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, Globe2, Mail, Sparkles, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

const COPY = {
  eyebrow:{fr:"XR / RECRUTEMENT",en:"XR / CAREERS",vi:"XR / TUYỂN DỤNG"},
  title:{fr:"Construisons la suite.",en:"Let's build what comes next.",vi:"Cùng xây dựng điều tiếp theo."},
  intro:{fr:"XR Agency réunit des talents créatifs, commerciaux et techniques pour construire des expériences digitales et des projets d'automatisation pour des clients internationaux.",en:"XR Agency brings together creative, commercial and technical talent to build digital experiences and automation projects for international clients.",vi:"XR Agency kết nối các tài năng sáng tạo, kinh doanh và kỹ thuật để xây dựng trải nghiệm số và dự án tự động hóa cho khách hàng quốc tế."},
  spontaneous:{fr:"Candidature spontanée",en:"Spontaneous application",vi:"Ứng tuyển tự do"},
  send:{fr:"Envoyer ma candidature",en:"Send my application",vi:"Gửi hồ sơ"},
  remote:{fr:"Travail à distance",en:"Remote work",vi:"Làm việc từ xa"},
  international:{fr:"Projets internationaux",en:"International projects",vi:"Dự án quốc tế"},
  flexible:{fr:"Missions flexibles",en:"Flexible missions",vi:"Công việc linh hoạt"},
};

const ROLES = [
  { icon:Sparkles, title:{fr:"Création & design",en:"Creative & design",vi:"Sáng tạo & thiết kế"}, desc:{fr:"UI/UX, direction artistique, branding, motion et création de contenus.",en:"UI/UX, art direction, branding, motion and content creation.",vi:"UI/UX, art direction, branding, motion và sáng tạo nội dung."}},
  { icon:Globe2, title:{fr:"Marketing & croissance",en:"Marketing & growth",vi:"Marketing & tăng trưởng"}, desc:{fr:"SEO, Google Maps, Ads, social media, stratégie et acquisition.",en:"SEO, Google Maps, Ads, social media, strategy and acquisition.",vi:"SEO, Google Maps, Ads, social media, chiến lược và acquisition."}},
  { icon:Users, title:{fr:"Commercial & conseil",en:"Sales & consulting",vi:"Kinh doanh & tư vấn"}, desc:{fr:"Prospection, qualification, relation client et développement de comptes.",en:"Prospecting, qualification, client relationships and account growth.",vi:"Tìm kiếm khách hàng, qualification, quan hệ khách hàng và phát triển tài khoản."}},
  { icon:BriefcaseBusiness, title:{fr:"Tech & automatisation",en:"Tech & automation",vi:"Tech & tự động hóa"}, desc:{fr:"Développement web, IA, automatisation, intégrations et outils internes.",en:"Web development, AI, automation, integrations and internal tools.",vi:"Phát triển web, AI, tự động hóa, tích hợp và công cụ nội bộ."}},
];

export const Route = createFileRoute("/recrutement")({
  head: () => ({
    meta: [
      { title:"Recrutement — XR Agency" },
      { name:"description", content:"Rejoindre XR Agency : profils créatifs, marketing, commerciaux et techniques pour des projets internationaux." },
      { name:"robots", content:"index,follow,max-image-preview:large" },
    ],
    links:[{rel:"canonical",href:"https://xragencyai.com/recrutement"}],
  }),
  component: RecruitmentPage,
});

function RecruitmentPage(){
  const {t}=useLang();
  const mailSubject=encodeURIComponent("Candidature — XR Agency");
  const mailBody=encodeURIComponent("Bonjour XR Agency,\n\nJe souhaite vous proposer ma candidature.\n\nProfil :\nDisponibilité :\nPortfolio / LinkedIn :\nVille / fuseau horaire :\n\nMerci,");
  const mailto=`mailto:${CONTACT.email}?subject=${mailSubject}&body=${mailBody}`;

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <Nav />
    <main className="pt-28">
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="absolute inset-0" style={{background:"radial-gradient(circle at 76% 24%, rgba(255,255,255,.08), transparent 25%), radial-gradient(circle at 12% 70%, rgba(255,255,255,.05), transparent 30%)"}} />
        <div className="relative mx-auto grid min-h-[78vh] max-w-[1500px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-12">
          <div>
            <Link to="/" className="label-mono inline-flex items-center gap-2 text-[8px] tracking-[.18em] text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5"/> Accueil</Link>
            <span className="mt-10 block label-mono text-[9px] tracking-[.32em] text-primary">{t(COPY.eyebrow)}</span>
            <h1 className="display-serif mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] leading-[.76] tracking-[-.075em]">{t(COPY.title)}</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{t(COPY.intro)}</p>
            <a href={mailto} className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-background">{t(COPY.send)} <ArrowRight className="h-4 w-4"/></a>
          </div>
          <div className="group relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-border/70 bg-[#08090b]">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=90" alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] brightness-[.58] transition duration-[1400ms] group-hover:scale-[1.04] group-hover:brightness-[.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,.18),transparent_25%)]" />
            <div className="absolute left-[9%] top-[12%] h-[62%] w-px bg-white/15" />
            <div className="absolute left-[9%] top-[12%] h-px w-[32%] bg-white/15" />
            <div className="absolute right-[10%] top-[15%] h-40 w-40 rounded-full border border-white/15 transition duration-1000 group-hover:scale-125" />
            <div className="absolute inset-x-7 bottom-7 rounded-[1.5rem] border border-white/12 bg-black/65 p-6 backdrop-blur-xl">
              <span className="label-mono text-[8px] tracking-[.25em] text-white/35">XR AGENCY / TEAM / 2026</span>
              <p className="display-serif mt-3 text-3xl text-white sm:text-4xl">Des talents partout.<br/><span className="text-white/35">Une même direction.</span></p>
              <div className="mt-5 flex flex-wrap gap-2">{["DESIGN","GROWTH","SALES","TECH","AI"].map(x=><span key={x} className="rounded-full border border-white/12 bg-white/[.05] px-2.5 py-1.5 label-mono text-[7px] text-white/55">{x}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[[Globe2,COPY.remote,"France · Asie · international"],[Users,COPY.international,"Clients et projets internationaux"],[Sparkles,COPY.flexible,"Freelance · mission · collaboration"]].map(([Icon,label,sub])=>{const I=Icon as typeof Globe2; return <div key={String(label)} className="rounded-[1.7rem] border border-border/70 bg-card/40 p-6"><I className="h-5 w-5 text-primary"/><h2 className="mt-6 text-lg font-semibold">{t(label as any)}</h2><p className="mt-2 text-xs leading-5 text-muted-foreground">{sub as string}</p></div>})}
        </div>

        <div className="mt-24">
          <span className="label-mono text-[8px] tracking-[.28em] text-muted-foreground">01 / PROFILS</span>
          <h2 className="display-serif mt-4 text-5xl sm:text-7xl">Ce que nous cherchons.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ROLES.map(({icon:Icon,title,desc},i)=><article key={i} className="group rounded-[1.8rem] border border-border/70 bg-card/35 p-7 transition duration-500 hover:-translate-y-1 hover:border-primary/35 sm:p-9"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background"><Icon className="h-4 w-4"/></span><span className="label-mono text-[8px] text-muted-foreground">0{i+1}</span></div><h3 className="display-serif mt-10 text-3xl">{t(title)}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{t(desc)}</p></article>)}
          </div>
        </div>

        <div className="mt-24 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border/70 bg-card/40 p-7 sm:p-10"><span className="label-mono text-[8px] tracking-[.25em] text-muted-foreground">02 / PROCESS</span><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Simple et direct.</h2></div>
          <div className="grid gap-3">
            {[["01","Présentez-vous","Profil, expérience, portfolio et disponibilité."],["02","Échangeons","Un échange court pour comprendre votre façon de travailler."],["03","Testons","Selon le rôle, une petite mission ou un cas pratique peut être proposé."],["04","Construisons","Si le fit est bon, nous définissons le format de collaboration."]].map(([n,a,b])=><div key={n} className="flex gap-5 rounded-2xl border border-border/70 bg-card/25 p-5"><span className="label-mono pt-1 text-[8px] text-primary">{n}</span><div><h3 className="text-sm font-semibold">{a}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{b}</p></div></div>)}
          </div>
        </div>

        <div className="mt-24 overflow-hidden rounded-[2.4rem] bg-foreground p-8 text-background sm:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><Mail className="h-5 w-5 opacity-60"/><h2 className="display-serif mt-5 max-w-3xl text-5xl leading-[.85] sm:text-7xl">{t(COPY.spontaneous)}</h2><p className="mt-5 max-w-2xl text-sm leading-6 opacity-60">{CONTACT.email}</p></div>
            <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground">{t(COPY.send)} <ArrowRight className="h-4 w-4"/></a>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  </div>;
}
