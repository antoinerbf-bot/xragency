import { useState } from 'react'
import { useI18n } from '../i18n'

const projects = [
  { name: 'Maison Lumière', sector: 'Luxury & Jewelry', type: 'showcase', metric: '+320%', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&q=85' },
  { name: 'Villa Azur', sector: 'Hospitality & Travel', type: 'showcase', metric: '+280%', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&q=85' },
  { name: 'Le Novara', sector: 'Fine Dining', type: 'showcase', metric: '+180%', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&q=85' },
  { name: 'Prestige Auto 75', sector: 'Automotive', type: 'showcase', metric: '+150%', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&q=85' },
  { name: 'Groupe Mercier', sector: 'Real Estate', type: 'showcase', metric: '+220%', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&q=85' },
  { name: 'Cabinet Belaire', sector: 'Health & Wellness', type: 'showcase', metric: '+260%', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&q=85' },
  { name: 'Atelier Sauge', sector: 'Beauty & Cosmetics', type: 'ecommerce', metric: '+190%', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&q=85' },
  { name: 'Duchesne Architectes', sector: 'Architecture', type: 'showcase', metric: '+340%', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&q=85' },
  { name: 'Nordeen', sector: 'Tech & Innovation', type: 'showcase', metric: '+420%', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&q=85' },
  { name: 'Coach Renaud', sector: 'Coaching', type: 'showcase', metric: '+180%', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&q=85' },
  { name: 'Parfums de Noir', sector: 'Crafts', type: 'ecommerce', metric: '+290%', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&q=85' },
  { name: 'Noir & Or', sector: 'Fashion', type: 'ecommerce', metric: '+310%', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&q=85' },
]

export default function Inspirations() {
  const { t, translations: tr } = useI18n()
  const [filter, setFilter] = useState('all')

  const filterOptions = [
    { key: 'all', label: tr.inspirations.filterAll },
    { key: 'showcase', label: tr.inspirations.filterShowcase },
    { key: 'ecommerce', label: tr.inspirations.filterEcommerce },
    { key: 'ai', label: tr.inspirations.filterAI },
  ]

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter)

  return (
    <section id="work" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.inspirations.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-8 whitespace-pre-line">
            {t(tr.inspirations.title)}
          </h2>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button key={opt.key} onClick={() => setFilter(opt.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  filter === opt.key ? 'bg-primary text-primary-foreground shadow-sm' : 'border border-border text-muted-foreground hover:bg-muted'
                }`}>
                {t(opt.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.name}
              className="group relative rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={project.img} alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-mono text-muted-foreground">{project.sector}</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground">
                    {project.type === 'showcase' ? t(tr.inspirations.filterShowcase) : t(tr.inspirations.filterEcommerce)}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.metric}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-xs text-muted-foreground text-center font-mono">
          {t(tr.inspirations.disclaimer)}
        </p>
      </div>
    </section>
  )
}
