import { useState } from 'react'
import { useI18n } from '../i18n'

const projects = [
  { name: 'Maison Lumière', sector: 'Luxury & Jewelry', type: 'showcase', metric: '+320%', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&q=85', url: 'https://example-maisonlumiere.fr', review: '⭐⭐⭐⭐⭐ "Incroyable transformation"' },
  { name: 'Villa Azur', sector: 'Hospitality & Travel', type: 'showcase', metric: '+280%', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&q=85', url: 'https://example-villaazur.fr', review: '⭐⭐⭐⭐⭐ "Les réservations ont doublé"' },
  { name: 'Le Novara', sector: 'Fine Dining', type: 'showcase', metric: '+180%', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&q=85', url: 'https://example-novara.fr', review: '⭐⭐⭐⭐⭐ "Plus de clients, meilleure image"' },
  { name: 'Prestige Auto 75', sector: 'Automotive', type: 'showcase', metric: '+150%', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&q=85', url: 'https://example-prestigeauto.fr', review: '⭐⭐⭐⭐⭐ "Ventes accrues de 150%"' },
  { name: 'Groupe Mercier', sector: 'Real Estate', type: 'showcase', metric: '+220%', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&q=85', url: 'https://example-groupemercier.fr', review: '⭐⭐⭐⭐⭐ "Excellente stratégie digitale"' },
  { name: 'Cabinet Belaire', sector: 'Health & Wellness', type: 'showcase', metric: '+260%', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&q=85', url: 'https://example-belaire.fr', review: '⭐⭐⭐⭐⭐ "Plus de patients qualifiés"' },
  { name: 'Atelier Sauge', sector: 'Beauty & Cosmetics', type: 'ecommerce', metric: '+190%', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&q=85', url: 'https://example-sauge.fr', review: '⭐⭐⭐⭐⭐ "Augmentation CA +190%"' },
  { name: 'Duchesne Architectes', sector: 'Architecture', type: 'showcase', metric: '+340%', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&q=85', url: 'https://example-duchesne.fr', review: '⭐⭐⭐⭐⭐ "Meilleure visibilité Google"' },
  { name: 'Nordeen', sector: 'Tech & Innovation', type: 'showcase', metric: '+420%', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&q=85', url: 'https://example-nordeen.fr', review: '⭐⭐⭐⭐⭐ "Leadership dans le secteur"' },
  { name: 'Coach Renaud', sector: 'Coaching', type: 'showcase', metric: '+180%', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&q=85', url: 'https://example-coachrenaud.fr', review: '⭐⭐⭐⭐⭐ "Clients B2B de qualité"' },
  { name: 'Parfums de Noir', sector: 'Luxury & Jewelry', type: 'ecommerce', metric: '+290%', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&q=85', url: 'https://example-noirparfums.fr', review: '⭐⭐⭐⭐⭐ "Performance exceptionnelle"' },
  { name: 'Noir & Or', sector: 'Fashion', type: 'ecommerce', metric: '+310%', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&q=85', url: 'https://example-noiror.fr', review: '⭐⭐⭐⭐⭐ "E-commerce optimisé"' },
  { name: 'Prime Consulting', sector: 'Coaching', type: 'showcase', metric: '+285%', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&q=85', url: 'https://example-primeconsulting.fr', review: '⭐⭐⭐⭐⭐ "Stratégie gagnante"' },
  { name: 'Luxe Events', sector: 'Hospitality & Travel', type: 'showcase', metric: '+320%', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&q=85', url: 'https://example-luxeevents.fr', review: '⭐⭐⭐⭐⭐ "Réservations record"' },
]

export default function Inspirations() {
  const { t, translations: tr } = useI18n()
  const [filter, setFilter] = useState('all')

  // Get unique sectors for filtering
  const uniqueSectors = ['all', ...new Set(projects.map(p => p.sector))]
  const filterOptions = uniqueSectors.map(sector => ({
    key: sector,
    label: sector === 'all' ? t(tr.inspirations.filterAll) : sector
  }))

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.sector === filter)

  return (
    <section id="work" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.inspirations.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 whitespace-pre-line">
            {t(tr.inspirations.title)}
          </h2>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  filter === opt.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((project) => (
            <div
              key={project.name}
              className="group portfolio-card relative rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Elegant Overlay */}
                <div className="portfolio-overlay">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold text-sm hover:bg-muted transition-all duration-300 hover:shadow-lg"
                  >
                    <span>{t('View Site')}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-mono text-muted-foreground">{project.sector}</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground">
                    {project.type === 'showcase' ? t(tr.inspirations.filterShowcase) : t(tr.inspirations.filterEcommerce)}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-1">{project.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-primary font-bold">{project.metric}</p>
                  </div>
                </div>

                {/* Review */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic">{project.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('No projects found')}</p>
          </div>
        )}

        <p className="reveal text-xs text-muted-foreground text-center font-mono">
          {t(tr.inspirations.disclaimer)}
        </p>
      </div>
    </section>
  )
}
