import { useI18n } from '../i18n'

const features = [
  {
    icon: '⚡',
    title: 'Instant Response',
    desc: 'Average reply time: < 2 hours'
  },
  {
    icon: '🎯',
    title: 'Personalized Audit',
    desc: 'Free initial analysis of your business'
  },
  {
    icon: '📈',
    title: 'Proven Results',
    desc: 'Average client growth: +250%'
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    desc: 'Direct access to strategy experts'
  },
]

export default function Contact() {
  const { t, translations: tr } = useI18n()

  const whatsappNumber = '+33767566783'
  const defaultMessage = "Bonjour! Je souhaite explorer les opportunités de croissance digitale pour mon entreprise. Pouvez-vous m'envoyer une analyse gratuite?"

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal text-center mb-16">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {t(tr.contact.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t(tr.contact.title)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Ready to transform your digital presence? Let's chat with our experts via WhatsApp.")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="p-5 rounded-lg border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all duration-300">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Main CTA Section - VERY PROMINENT */}
        <div className="reveal max-w-3xl mx-auto">
          <div className="p-10 md:p-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground border-2 border-primary/80 space-y-8 shadow-2xl">
            {/* Headline */}
            <div className="text-center space-y-4">
              <div className="text-5xl md:text-6xl mb-4">💬</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                {t('Reserve Your Digital Consultation')}
              </h3>
              <p className="text-primary-foreground/90 text-base">
                {t("Connect directly with our strategists on WhatsApp. Free audit included.")}
              </p>
            </div>

            {/* Phone Number Display */}
            <div className="text-center">
              <p className="text-sm text-primary-foreground/80 mb-2">{t('Direct WhatsApp:')}</p>
              <a
                href={`tel:${whatsappNumber.replace(/\s/g, '')}`}
                className="text-3xl md:text-4xl font-mono font-bold hover:opacity-80 transition-opacity"
              >
                {whatsappNumber}
              </a>
              <p className="text-xs text-primary-foreground/70 mt-2">🌍 Paris • Dubai • Tokyo • New York</p>
            </div>

            {/* Main CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl text-lg font-bold hover:bg-muted transition-all duration-300 hover:shadow-lg hover:-translate-y-1 btn-glow"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.741 5.413 2.147 7.748l-2.257 6.351 6.558-2.113c2.201 1.126 4.612 1.72 7.119 1.72h.006c5.424 0 9.85-4.427 9.85-9.851 0-2.632-.674-5.194-1.953-7.44-1.279-2.245-3.142-4.21-5.48-5.48C15.356 2.764 12.774 2.089 10.051 2.089" />
                </svg>
                {t('Chat on WhatsApp')}
              </a>
              <a
                href="mailto:contact.xragency@gmail.com"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('Email Us')}
              </a>
            </div>

            {/* Testimonial */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-sm text-primary-foreground/80 text-center italic">
                ✨ "The team's expertise and responsiveness transformed our digital presence completely. Highly recommended!" - Alexandra, CEO
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="reveal mt-12 text-center space-y-3 text-sm text-muted-foreground">
          <p>✓ No commitment required • ✓ Free initial consultation</p>
          <p>Response typically within 1-2 hours during business hours</p>
        </div>
      </div>
    </section>
  )
}
