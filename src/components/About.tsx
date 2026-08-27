import { useI18n } from '../i18n'

const teamBadges = ['XR', 'DA', 'DEV', 'IA']

export default function About() {
  const { t, translations: tr } = useI18n()
  const stats = [
    { label: tr.about.stats.projects, value: '450+' },
    { label: tr.about.stats.years, value: '7+' },
    { label: tr.about.stats.satisfaction, value: '82%' },
    { label: tr.about.stats.responseTime, value: '2h' },
  ]

  const valueProps = [
    { title: tr.about.valueProps.speed.title, desc: tr.about.valueProps.speed.desc, icon: '⚡' },
    { title: tr.about.valueProps.senior.title, desc: tr.about.valueProps.senior.desc, icon: '◆' },
    { title: tr.about.valueProps.results.title, desc: tr.about.valueProps.results.desc, icon: '✓' },
    { title: tr.about.valueProps.roi.title, desc: tr.about.valueProps.roi.desc, icon: '↑' },
  ]

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Stats bar */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 rounded-2xl border border-border bg-white">
          {stats.map((stat) => (
            <div key={t(stat.label)} className="text-center">
              <p className="text-3xl md:text-4xl font-serif mb-1">{stat.value}</p>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="reveal overflow-hidden mb-20 border-y border-border py-4">
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-sm font-mono tracking-[0.2em] text-muted-foreground mx-4">
                {t(tr.about.marquee)}
              </span>
            ))}
          </div>
        </div>

        {/* Main about */}
        <div className="reveal mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-8 max-w-3xl">
            {t(tr.about.title)}
          </h2>
          <div className="flex gap-3 mb-12">
            {teamBadges.map((badge) => (
              <span
                key={badge}
                className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center text-xs font-mono font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="reveal mb-20">
          <h3 className="text-lg font-medium mb-8">
            {t(tr.about.comparison.title)}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* In-House */}
            <div className="p-8 rounded-2xl border border-border bg-white">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                {t(tr.about.comparison.inHouse)}
              </p>
              <p className="text-3xl font-serif mb-2">
                {t(tr.about.comparison.inHousePrice)}
                <span className="text-base text-muted-foreground">{t(tr.about.comparison.inHousePeriod)}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[tr.about.comparison.inHouse1, tr.about.comparison.inHouse2, tr.about.comparison.inHouse3, tr.about.comparison.inHouse4].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            {/* XR Agency */}
            <div className="p-8 rounded-2xl border-2 border-primary bg-primary text-primary-foreground">
              <p className="text-xs font-mono text-primary-foreground/70 uppercase tracking-wider mb-4">
                {t(tr.about.comparison.xrAgency)}
              </p>
              <p className="text-3xl font-serif mb-2">
                {t(tr.about.comparison.xrPrice)}
                <span className="text-base text-primary-foreground/70">{t(tr.about.comparison.xrPeriod)}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[tr.about.comparison.xr1, tr.about.comparison.xr2, tr.about.comparison.xr3, tr.about.comparison.xr4].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6">
          {valueProps.map((prop) => (
            <div key={t(prop.title)} className="p-6 rounded-xl border border-border bg-white text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl mb-3 block">{prop.icon}</span>
              <p className="text-sm font-semibold mb-1">{t(prop.title)}</p>
              <p className="text-xs text-muted-foreground">{t(prop.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
