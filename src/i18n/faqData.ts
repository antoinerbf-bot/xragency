import type { Lang } from './translations'

export interface FAQItem {
  category: string
  question: Record<Lang, string>
  answer: Record<Lang, string>
}

export const faqData: FAQItem[] = [
  // ─── TIMELINES (5) ──────────────────
  {
    category: 'timelines',
    question: {
      fr: 'Combien de temps faut-il pour construire mon site web ?',
      en: 'How long does it take to build my website?',
      vi: 'Mất bao lâu để xây dựng website của tôi?',
    },
    answer: {
      fr: 'Selon la formule : Site Vitrine Pro en 7 jours, Site Business en 14 jours, E-commerce en 21 jours. Ce sont des délais de livraison garantis à partir du lancement du projet.',
      en: 'Depending on the formula: Site Vitrine Pro in 7 days, Business Site in 14 days, E-commerce in 21 days. These are guaranteed delivery timelines from project kickoff.',
      vi: 'Tùy theo gói: Website Giới Thiệu Pro trong 7 ngày, Website Doanh Nghiệp trong 14 ngày, TMĐT trong 21 ngày. Đây là thời gian giao hàng đảm bảo từ khi khởi động dự án.',
    },
  },
  {
    category: 'timelines',
    question: {
      fr: 'Quand les résultats SEO seront-ils visibles ?',
      en: 'How long before SEO results appear?',
      vi: 'Bao lâu thì thấy kết quả SEO?',
    },
    answer: {
      fr: 'Les premières améliorations sont visibles en 4-6 semaines. Une croissance significative du trafic et des classements se produit dans les 3-6 mois, selon la concurrence et la difficulté des mots-clés.',
      en: 'Initial improvements are typically visible within 4-6 weeks. Significant ranking improvements and traffic growth occur within 3-6 months, depending on competition and keyword difficulty.',
      vi: 'Cải thiện ban đầu thường thấy trong 4-6 tuần. Tăng trưởng xếp hạng và traffic đáng kể xảy ra trong 3-6 tháng, tùy thuộc vào cạnh tranh và độ khó từ khóa.',
    },
  },
  {
    category: 'timelines',
    question: {
      fr: 'Quel est le délai de mise en ligne d\'une refonte ?',
      en: 'How long for a website redesign to go live?',
      vi: 'Mất bao lâu để thiết kế lại website?',
    },
    answer: {
      fr: 'Une refonte complète prend généralement 14-21 jours, incluant l\'audit UX, le redesign, les tests et le déploiement. Les délais varient selon la complexité du site existant.',
      en: 'A complete redesign typically takes 14-21 days, including UX audit, redesign, testing, and deployment. Timelines vary based on the existing site\'s complexity.',
      vi: 'Thiết kế lại hoàn toàn thường mất 14-21 ngày, bao gồm kiểm toán UX, thiết kế lại, kiểm thử và triển khai. Thời gian thay đổi tùy theo độ phức tạp của website hiện tại.',
    },
  },
  {
    category: 'timelines',
    question: {
      fr: 'Combien de temps pour voir des résultats Google Maps ?',
      en: 'How long to see Google Maps results?',
      vi: 'Bao lâu để thấy kết quả Google Maps?',
    },
    answer: {
      fr: 'Les premiers mouvements dans le classement apparaissent en 2-4 semaines. L\'objectif Top 3 est généralement atteint en 8-12 semaines, selon le niveau de concurrence local.',
      en: 'Initial ranking movements appear in 2-4 weeks. The Top 3 goal is typically achieved in 8-12 weeks, depending on local competition levels.',
      vi: 'Thay đổi xếp hạng ban đầu xuất hiện trong 2-4 tuần. Mục tiêu Top 3 thường đạt được trong 8-12 tuần, tùy thuộc vào mức độ cạnh tranh địa phương.',
    },
  },
  {
    category: 'timelines',
    question: {
      fr: 'Êtes-vous opérationnel immédiatement après la signature ?',
      en: 'Are you operational immediately after signing?',
      vi: 'Có hoạt động ngay sau khi ký không?',
    },
    answer: {
      fr: 'Oui. Notre collectif senior est opérationnel en 48h après validation du brief. Le kickoff meeting a lieu dans les 24h et le travail commence immédiatement après.',
      en: 'Yes. Our senior collective is operational within 48h after brief validation. The kickoff meeting happens within 24h and work starts immediately after.',
      vi: 'Có. Tập thể senior của chúng tôi hoạt động trong 48h sau khi xác nhận brief. Cuộc họp kickoff diễn ra trong 24h và công việc bắt đầu ngay sau đó.',
    },
  },

  // ─── WEBSITES (5) ───────────────────
  {
    category: 'websites',
    question: {
      fr: 'Puis-je modifier mon site web moi-même ?',
      en: 'Can I edit my website myself?',
      vi: 'Tôi có thể tự chỉnh sửa website không?',
    },
    answer: {
      fr: 'Oui ! Tous nos sites web intègrent un CMS. Nous fournissons une formation et une documentation pour que vous puissiez mettre à jour le contenu, les articles de blog et les images en toute autonomie.',
      en: 'Yes! All our websites come with a CMS integration. We provide training and documentation so you can update content, blog posts, and images independently.',
      vi: 'Có! Tất cả website đều tích hợp CMS. Chúng tôi cung cấp đào tạo và tài liệu để bạn tự cập nhật nội dung, bài viết blog và hình ảnh.',
    },
  },
  {
    category: 'websites',
    question: {
      fr: 'Mes sites seront-ils optimisés pour le mobile ?',
      en: 'Will my websites be mobile-optimized?',
      vi: 'Website có tối ưu cho mobile không?',
    },
    answer: {
      fr: 'Absolument. Tous nos sites sont 100% responsive et testés sur iPhone, Android et tablettes. Nous visons un score PageSpeed de 90+ sur mobile et desktop.',
      en: 'Absolutely. All our sites are 100% responsive and tested on iPhone, Android, and tablets. We target a PageSpeed score of 90+ on both mobile and desktop.',
      vi: 'Chắc chắn. Tất cả website đều 100% responsive và được kiểm tra trên iPhone, Android và tablet. Chúng tôi nhắm điểm PageSpeed 90+ trên cả mobile và desktop.',
    },
  },
  {
    category: 'websites',
    question: {
      fr: 'Proposez-vous des sites multilingues ?',
      en: 'Do you offer multilingual websites?',
      vi: 'Có hỗ trợ website đa ngôn ngữ không?',
    },
    answer: {
      fr: 'Oui. Nous proposons des sites en français, anglais et vietnamien. Chaque langue supplémentaire coûte 100 €. Le contenu est traduit professionnellement et optimisé SEO pour chaque marché.',
      en: 'Yes. We offer websites in French, English, and Vietnamese. Each additional language costs €100. Content is professionally translated and SEO-optimized for each market.',
      vi: 'Có. Chúng tôi cung cấp website bằng tiếng Pháp, tiếng Anh và tiếng Việt. Mỗi ngôn ngữ bổ sung phí €100. Nội dung được dịch chuyên nghiệp và tối ưu SEO cho từng thị trường.',
    },
  },
  {
    category: 'websites',
    question: {
      fr: 'Quel CMS utilisez-vous ?',
      en: 'What CMS do you use?',
      vi: 'Bạn sử dụng CMS nào?',
    },
    answer: {
      fr: 'Nous utilisons WordPress, Webflow, ou des solutions headless (Next.js + Sanity/Strapi) selon vos besoins. Le choix est fait lors du brief stratégique pour garantir la meilleure adéquation.',
      en: 'We use WordPress, Webflow, or headless solutions (Next.js + Sanity/Strapi) depending on your needs. The choice is made during the strategic brief to ensure the best fit.',
      vi: 'Chúng tôi sử dụng WordPress, Webflow, hoặc giải pháp headless (Next.js + Sanity/Strapi) tùy theo nhu cầu. Lựa chọn được đưa ra trong brief chiến lược để đảm bảo phù hợp nhất.',
    },
  },
  {
    category: 'websites',
    question: {
      fr: 'Mon site sera-t-il sécurisé (HTTPS) ?',
      en: 'Will my site be secure (HTTPS)?',
      vi: 'Website có bảo mật (HTTPS) không?',
    },
    answer: {
      fr: 'Oui. Tous nos sites incluent un certificat SSL gratuit, le protocole HTTPS, des sauvegardes automatiques quotidiennes et une protection contre les attaques DDoS.',
      en: 'Yes. All our sites include a free SSL certificate, HTTPS protocol, daily automatic backups, and DDoS attack protection.',
      vi: 'Có. Tất cả website đều bao gồm chứng chỉ SSL miễn phí, giao thức HTTPS, sao lưu tự động hàng ngày và bảo vệ tấn công DDoS.',
    },
  },

  // ─── SEO & VISIBILITY (6) ──────────
  {
    category: 'seo',
    question: {
      fr: 'Quelle est la différence entre SEO et Google Maps ?',
      en: 'What is the difference between SEO and Google Maps?',
      vi: 'Sự khác biệt giữa SEO và Google Maps là gì?',
    },
    answer: {
      fr: 'Le SEO cible les résultats de recherche organiques sur Google. L\'optimisation Google Maps (SEO local) cible spécifiquement le pack local — les 3 entreprises affichées sur la carte lors d\'une recherche locale.',
      en: 'SEO targets organic search results on Google. Google Maps optimization (Local SEO) specifically targets the local map pack — the 3 businesses shown on the map when someone searches locally.',
      vi: 'SEO nhắm đến kết quả tìm kiếm hữu cơ trên Google. Tối ưu Google Maps (SEO local) nhắm cụ thể vào gói bản đồ địa phương — 3 doanh nghiệp hiển thị trên bản đồ khi tìm kiếm địa phương.',
    },
  },
  {
    category: 'seo',
    question: {
      fr: 'Garantissez-vous la première position Google ?',
      en: 'Do you guarantee the #1 Google position?',
      vi: 'Có đảm bảo vị trí #1 Google không?',
    },
    answer: {
      fr: 'Nous garantissons le Top 3 pour Google Maps (pack local). Pour le SEO organique, nous visons la première page — aucun professionnel honnête ne peut garantir la position #1 car l\'algorithme Google évolue constamment.',
      en: 'We guarantee Top 3 for Google Maps (local pack). For organic SEO, we target the first page — no honest professional can guarantee #1 position as Google\'s algorithm constantly evolves.',
      vi: 'Chúng tôi đảm bảo Top 3 cho Google Maps (gói địa phương). Với SEO hữu cơ, chúng tôi nhắm trang đầu — không chuyên gia trung thực nào có thể đảm bảo vị trí #1 vì thuật toán Google liên tục thay đổi.',
    },
  },
  {
    category: 'seo',
    question: {
      fr: 'Comment mesurez-vous les résultats SEO ?',
      en: 'How do you measure SEO results?',
      vi: 'Bạn đo lường kết quả SEO như thế nào?',
    },
    answer: {
      fr: 'Nous fournissons des rapports mensuels avec : positions des mots-clés, trafic organique, taux de conversion, taux de clics, et impressions. Accès complet à Google Analytics et Search Console.',
      en: 'We provide monthly reports with: keyword positions, organic traffic, conversion rates, click-through rates, and impressions. Full access to Google Analytics and Search Console.',
      vi: 'Chúng tôi cung cấp báo cáo hàng tháng: vị trí từ khóa, traffic hữu cơ, tỷ lệ chuyển đổi, tỷ lệ nhấp và lượt hiển thị. Truy cập đầy đủ Google Analytics và Search Console.',
    },
  },
  {
    category: 'seo',
    question: {
      fr: 'Faites-vous du SEO pour les e-commerces ?',
      en: 'Do you do SEO for e-commerce?',
      vi: 'Có làm SEO cho thương mại điện tử không?',
    },
    answer: {
      fr: 'Oui. Nous proposons un SEO e-commerce spécialisé : optimisation des fiches produits, structure des catégories, schema markup, et stratégie de contenu orientée conversion.',
      en: 'Yes. We offer specialized e-commerce SEO: product page optimization, category structure, schema markup, and conversion-oriented content strategy.',
      vi: 'Có. Chúng tôi cung cấp SEO thương mại điện tử chuyên biệt: tối ưu trang sản phẩm, cấu trúc danh mục, schema markup và chiến lược nội dung hướng chuyển đổi.',
    },
  },
  {
    category: 'seo',
    question: {
      fr: 'Combien de mots-clés ciblez-vous ?',
      en: 'How many keywords do you target?',
      vi: 'Bạn nhắm bao nhiêu từ khóa?',
    },
    answer: {
      fr: 'Notre système de domination SEO cible 20-50 mots-clés stratégiques selon votre secteur et votre zone géographique. Chaque mot-clé est choisi pour son potentiel de conversion, pas seulement son volume.',
      en: 'Our SEO domination system targets 20-50 strategic keywords based on your sector and geographic area. Each keyword is chosen for its conversion potential, not just its volume.',
      vi: 'Hệ thống thống trị SEO nhắm 20-50 từ khóa chiến lược dựa trên lĩnh vực và khu vực địa lý. Mỗi từ khóa được chọn vì tiềm năng chuyển đổi, không chỉ lượng tìm kiếm.',
    },
  },
  {
    category: 'seo',
    question: {
      fr: 'Le SEO local est-il important pour mon business ?',
      en: 'Is local SEO important for my business?',
      vi: 'SEO local có quan trọng cho doanh nghiệp không?',
    },
    answer: {
      fr: 'Crucial. 46% des recherches Google ont une intention locale. Si vous avez un établissement physique ou servez une zone géographique, le SEO local est votre canal #1 d\'acquisition.',
      en: 'Crucial. 46% of Google searches have local intent. If you have a physical location or serve a geographic area, local SEO is your #1 acquisition channel.',
      vi: 'Rất quan trọng. 46% lượt tìm kiếm Google có ý định địa phương. Nếu bạn có địa điểm vật lý hoặc phục vụ khu vực địa lý, SEO local là kênh thu hút #1.',
    },
  },

  // ─── AI (5) ─────────────────────────
  {
    category: 'ai',
    question: {
      fr: 'Comment fonctionne l\'assistant IA ?',
      en: 'How does the AI assistant work?',
      vi: 'Trợ lý AI hoạt động như thế nào?',
    },
    answer: {
      fr: 'Nos assistants IA sont entraînés sur vos données métier, FAQ et services. Ils gèrent les demandes clients 24/7, qualifient les leads, prennent des rendez-vous et escaladent les cas complexes à votre équipe.',
      en: 'Our AI assistants are custom-trained on your business data, FAQ, and services. They handle customer inquiries 24/7, qualify leads, book appointments, and escalate complex issues to your team.',
      vi: 'Trợ lý AI được huấn luyện trên dữ liệu doanh nghiệp, FAQ và dịch vụ. Chúng xử lý yêu cầu khách hàng 24/7, đánh giá lead, đặt lịch hẹn và chuyển vấn đề phức tạp cho đội của bạn.',
    },
  },
  {
    category: 'ai',
    question: {
      fr: 'L\'IA peut-elle remplacer mon service client ?',
      en: 'Can AI replace my customer service?',
      vi: 'AI có thể thay thế dịch vụ khách hàng không?',
    },
    answer: {
      fr: 'L\'IA gère 80% des demandes courantes (FAQ, prise de RDV, informations). Les 20% restants (cas complexes, réclamations) sont automatiquement transférés à votre équipe humaine avec tout le contexte.',
      en: 'AI handles 80% of common inquiries (FAQ, appointments, information). The remaining 20% (complex cases, complaints) are automatically transferred to your human team with full context.',
      vi: 'AI xử lý 80% yêu cầu thông thường (FAQ, đặt lịch, thông tin). 20% còn lại (trường hợp phức tạp, khiếu nại) được tự động chuyển cho đội nhân viên với đầy đủ ngữ cảnh.',
    },
  },
  {
    category: 'ai',
    question: {
      fr: 'Combien coûte un assistant IA personnalisé ?',
      en: 'How much does a custom AI assistant cost?',
      vi: 'Trợ lý AI tùy chỉnh giá bao nhiêu?',
    },
    answer: {
      fr: 'À partir de 500 €/mois. Ce tarif inclut l\'entraînement initial, l\'hébergement, les mises à jour continues et le monitoring des performances. Réduction de 80% des coûts de support en moyenne.',
      en: 'Starting from €500/month. This includes initial training, hosting, continuous updates, and performance monitoring. Average 80% reduction in support costs.',
      vi: 'Từ €500/tháng. Bao gồm huấn luyện ban đầu, hosting, cập nhật liên tục và giám sát hiệu suất. Giảm trung bình 80% chi phí hỗ trợ.',
    },
  },
  {
    category: 'ai',
    question: {
      fr: 'L\'IA parle-t-elle plusieurs langues ?',
      en: 'Does the AI speak multiple languages?',
      vi: 'AI có nói được nhiều ngôn ngữ không?',
    },
    answer: {
      fr: 'Oui. Nos assistants IA sont nativement multilingues : français, anglais, vietnamien, et d\'autres langues sur demande. Ils détectent automatiquement la langue du visiteur.',
      en: 'Yes. Our AI assistants are natively multilingual: French, English, Vietnamese, and other languages on request. They automatically detect the visitor\'s language.',
      vi: 'Có. Trợ lý AI đa ngôn ngữ: tiếng Pháp, tiếng Anh, tiếng Việt và các ngôn ngữ khác theo yêu cầu. Chúng tự động phát hiện ngôn ngữ của khách truy cập.',
    },
  },
  {
    category: 'ai',
    question: {
      fr: 'Puis-je personnaliser les réponses de l\'IA ?',
      en: 'Can I customize the AI\'s responses?',
      vi: 'Tôi có thể tùy chỉnh phản hồi của AI không?',
    },
    answer: {
      fr: 'Absolument. Vous contrôlez le ton, le style, les informations partagées et les limites. Un dashboard vous permet d\'ajuster les réponses en temps réel et de consulter l\'historique des conversations.',
      en: 'Absolutely. You control the tone, style, shared information, and limits. A dashboard lets you adjust responses in real-time and review conversation history.',
      vi: 'Chắc chắn. Bạn kiểm soát giọng điệu, phong cách, thông tin chia sẻ và giới hạn. Dashboard cho phép điều chỉnh phản hồi thời gian thực và xem lịch sử hội thoại.',
    },
  },

  // ─── PRICING & SUPPORT (6) ──────────
  {
    category: 'pricing',
    question: {
      fr: 'Que couvre l\'hébergement inclus ?',
      en: 'What does the included hosting cover?',
      vi: 'Hosting bao gồm những gì?',
    },
    answer: {
      fr: '1 an d\'hébergement premium sur Vercel avec certificat SSL, sauvegardes automatiques, garantie 99,9% uptime, distribution CDN et support technique inclus dans toutes les formules.',
      en: '1 year of premium hosting on Vercel with SSL certificate, automatic backups, 99.9% uptime guarantee, CDN distribution, and technical support included in all plans.',
      vi: '1 năm hosting cao cấp trên Vercel với chứng chỉ SSL, sao lưu tự động, đảm bảo 99,9% uptime, phân phối CDN và hỗ trợ kỹ thuật bao gồm trong tất cả gói.',
    },
  },
  {
    category: 'pricing',
    question: {
      fr: 'Quels moyens de paiement acceptez-vous ?',
      en: 'What payment methods do you accept?',
      vi: 'Bạn chấp nhận phương thức thanh toán nào?',
    },
    answer: {
      fr: 'Nous acceptons les virements bancaires, cartes de crédit et PayPal. Pour les projets, nous demandons généralement 50% à la commande et 50% à la livraison.',
      en: 'We accept bank transfers, credit cards, and PayPal. For projects, we typically require 50% upfront and 50% upon delivery.',
      vi: 'Chúng tôi chấp nhận chuyển khoản ngân hàng, thẻ tín dụng và PayPal. Với dự án, thường yêu cầu 50% khi đặt hàng và 50% khi giao hàng.',
    },
  },
  {
    category: 'pricing',
    question: {
      fr: 'Y a-t-il des frais cachés ?',
      en: 'Are there any hidden fees?',
      vi: 'Có phí ẩn không?',
    },
    answer: {
      fr: 'Aucun. Nos tarifs sont transparents et tout-inclus. Les seuls coûts supplémentaires possibles sont les langues additionnelles (+100 €/langue) et les fonctionnalités sur devis personnalisé.',
      en: 'None. Our pricing is transparent and all-inclusive. The only possible extra costs are additional languages (+€100/language) and custom feature quotes.',
      vi: 'Không. Giá của chúng tôi minh bạch và trọn gói. Chi phí bổ sung duy nhất có thể là ngôn ngữ thêm (+€100/ngôn ngữ) và tính năng tùy chỉnh theo báo giá.',
    },
  },
  {
    category: 'pricing',
    question: {
      fr: 'Proposez-vous des facilités de paiement ?',
      en: 'Do you offer payment plans?',
      vi: 'Có hỗ trợ trả góp không?',
    },
    answer: {
      fr: 'Oui. Pour les projets de plus de 1 000 €, nous proposons un paiement en 2 ou 3 fois sans frais. Pour les abonnements mensuels, le paiement est mensuel et résiliable à tout moment.',
      en: 'Yes. For projects over €1,000, we offer 2 or 3 installments at no extra cost. For monthly subscriptions, payment is monthly and cancellable at any time.',
      vi: 'Có. Với dự án trên €1,000, chúng tôi hỗ trợ trả 2-3 đợt không lãi suất. Với đăng ký hàng tháng, thanh toán hàng tháng và có thể hủy bất cứ lúc nào.',
    },
  },
  {
    category: 'pricing',
    question: {
      fr: 'Que se passe-t-il après la période d\'hébergement d\'1 an ?',
      en: 'What happens after the 1-year hosting period?',
      vi: 'Điều gì xảy ra sau 1 năm hosting?',
    },
    answer: {
      fr: 'Le renouvellement coûte environ 50-100 €/an selon la formule. Vous pouvez aussi transférer le site sur votre propre hébergement. Nous vous accompagnons dans les deux cas.',
      en: 'Renewal costs approximately €50-100/year depending on the plan. You can also transfer the site to your own hosting. We assist you in both cases.',
      vi: 'Gia hạn khoảng €50-100/năm tùy gói. Bạn cũng có thể chuyển website sang hosting riêng. Chúng tôi hỗ trợ trong cả hai trường hợp.',
    },
  },
  {
    category: 'pricing',
    question: {
      fr: 'Comment fonctionne le support après livraison ?',
      en: 'How does post-delivery support work?',
      vi: 'Hỗ trợ sau giao hàng hoạt động thế nào?',
    },
    answer: {
      fr: '30 jours de support gratuit inclus après livraison (corrections de bugs, ajustements mineurs). Au-delà, notre formule WebCare à 29 €/mois prend le relais pour maintenance et support continu.',
      en: '30 days of free support included after delivery (bug fixes, minor adjustments). Beyond that, our WebCare plan at €29/month takes over for ongoing maintenance and support.',
      vi: '30 ngày hỗ trợ miễn phí sau giao hàng (sửa lỗi, điều chỉnh nhỏ). Sau đó, gói WebCare €29/tháng tiếp quản bảo trì và hỗ trợ liên tục.',
    },
  },

  // ─── GENERAL (5) ────────────────────
  {
    category: 'general',
    question: {
      fr: 'Travaillez-vous avec des clients internationaux ?',
      en: 'Do you work with international clients?',
      vi: 'Bạn có làm việc với khách hàng quốc tế không?',
    },
    answer: {
      fr: 'Absolument. Nous opérons depuis Paris, Dubaï, Tokyo et New York. Nous travaillons en français, anglais et vietnamien, et servons des clients dans le monde entier.',
      en: 'Absolutely. We operate from Paris, Dubai, Tokyo, and New York. We work in French, English, and Vietnamese, and serve clients worldwide.',
      vi: 'Chắc chắn. Chúng tôi hoạt động từ Paris, Dubai, Tokyo và New York. Làm việc bằng tiếng Pháp, Anh và Việt, phục vụ khách hàng trên toàn thế giới.',
    },
  },
  {
    category: 'general',
    question: {
      fr: 'Qui possède les droits de mon site web ?',
      en: 'Who owns the rights to my website?',
      vi: 'Ai sở hữu quyền website của tôi?',
    },
    answer: {
      fr: 'Vous. À la livraison et au paiement complet, vous êtes propriétaire à 100% de votre site, de son code source, de son design et de tout son contenu. Aucun droit de licence récurrent.',
      en: 'You do. Upon delivery and full payment, you own 100% of your website, its source code, design, and all content. No recurring license fees.',
      vi: 'Bạn. Khi giao hàng và thanh toán đầy đủ, bạn sở hữu 100% website, mã nguồn, thiết kế và toàn bộ nội dung. Không có phí bản quyền định kỳ.',
    },
  },
  {
    category: 'general',
    question: {
      fr: 'Comment se déroule un projet typique ?',
      en: 'How does a typical project unfold?',
      vi: 'Một dự án điển hình diễn ra như thế nào?',
    },
    answer: {
      fr: 'Brief stratégique → Validation du devis → Kickoff meeting → Design & développement → Révisions (2 tours inclus) → Tests & QA → Mise en ligne → Formation & documentation → Support 30 jours.',
      en: 'Strategic brief → Quote validation → Kickoff meeting → Design & development → Revisions (2 rounds included) → Testing & QA → Go-live → Training & documentation → 30-day support.',
      vi: 'Brief chiến lược → Xác nhận báo giá → Họp kickoff → Thiết kế & phát triển → Chỉnh sửa (2 vòng bao gồm) → Kiểm thử & QA → Lên sóng → Đào tạo & tài liệu → Hỗ trợ 30 ngày.',
    },
  },
  {
    category: 'general',
    question: {
      fr: 'Puis-je annuler un abonnement mensuel ?',
      en: 'Can I cancel a monthly subscription?',
      vi: 'Tôi có thể hủy đăng ký hàng tháng không?',
    },
    answer: {
      fr: 'Oui. Tous nos abonnements mensuels (SEO, Community Management, WebCare, IA) sont sans engagement et résiliables à tout moment avec un préavis de 30 jours.',
      en: 'Yes. All our monthly subscriptions (SEO, Community Management, WebCare, AI) are commitment-free and cancellable at any time with 30 days\' notice.',
      vi: 'Có. Tất cả đăng ký hàng tháng (SEO, Quản lý cộng đồng, WebCare, AI) đều không cam kết và có thể hủy bất cứ lúc nào với thông báo 30 ngày.',
    },
  },
  {
    category: 'general',
    question: {
      fr: 'Proposez-vous une garantie satisfait ou remboursé ?',
      en: 'Do you offer a satisfaction guarantee?',
      vi: 'Có đảm bảo hài lòng hoặc hoàn tiền không?',
    },
    answer: {
      fr: 'Nous proposons 2 tours de révisions inclus dans chaque projet. Si le résultat final ne correspond pas au brief validé, nous retravaillons gratuitement jusqu\'à votre satisfaction.',
      en: 'We include 2 revision rounds in every project. If the final result doesn\'t match the validated brief, we rework for free until you\'re satisfied.',
      vi: 'Chúng tôi bao gồm 2 vòng chỉnh sửa trong mọi dự án. Nếu kết quả cuối không khớp với brief đã xác nhận, chúng tôi làm lại miễn phí cho đến khi bạn hài lòng.',
    },
  },
]
