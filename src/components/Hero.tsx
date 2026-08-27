import { useI18n } from '../i18n'

export default function Hero() {
  const { t, translations: tr } = useI18n()

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center pt-16 noise-overlay overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-20">
        {/* Top badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white/80 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t(tr.hero.strategistOnline)}
          </span>
          <span className="px-3 py-1 rounded-full border border-border bg-white/80 text-xs font-mono">
            {t(tr.hero.locations)}
          </span>
        </div>

        <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground mb-4 uppercase">
          {t(tr.hero.edition)}
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6 max-w-4xl whitespace-pre-line">
          {t(tr.hero.title)}
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          {t(tr.hero.subtitle)}
        </p>

        <p className="text-sm text-muted-foreground mb-10">{t(tr.hero.appointment)}</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <a
            href="#intelligence"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {t(tr.hero.ctaAnalysis)}
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-4 border border-border text-sm font-medium rounded-lg hover:bg-muted hover:shadow-sm transition-all duration-300"
          >
            {t(tr.hero.ctaContinue)}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground font-mono">
          <span>{t(tr.hero.duration)}</span>
          <span>·</span>
          <span>{t(tr.hero.reply)}</span>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
