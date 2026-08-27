import { useState } from 'react'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t, translations: tr } = useI18n()
  const [formData, setFormData] = useState({ name: '', email: '', company: '', website: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const serviceOptionKeys = ['website', 'redesign', 'seo', 'maps', 'ads', 'ai', 'strategy', 'other'] as const

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="reveal mb-12">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {t(tr.contact.label)}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-8">
            {t(tr.contact.title)}
          </h2>
          <div className="flex flex-wrap gap-6 mb-12 text-sm">
            <a href="mailto:contact.xragency@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              contact.xragency@gmail.com
            </a>
            <a href="https://wa.me/33767566783" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +33 7 67 56 67 83
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Paris · Dubai · Tokyo · New York
            </span>
          </div>
        </div>

        <div className="reveal max-w-2xl">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-border bg-white text-center">
              <p className="text-2xl font-serif mb-2">{t(tr.contact.thankYou)}</p>
              <p className="text-sm text-muted-foreground">{t(tr.contact.thankYouMsg)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder={t(tr.contact.nameLabel)} required
                  className="px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder={t(tr.contact.emailLabel)} required
                  className="px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="company" value={formData.company} onChange={handleChange}
                  placeholder={t(tr.contact.companyLabel)}
                  className="px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="url" name="website" value={formData.website} onChange={handleChange}
                  placeholder={t(tr.contact.websiteLabel)}
                  className="px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <select name="service" value={formData.service} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-muted-foreground">
                <option value="">{t(tr.contact.selectService)}</option>
                {serviceOptionKeys.map((key) => (
                  <option key={key} value={key}>{t(tr.contact.serviceOptions[key])}</option>
                ))}
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder={t(tr.contact.messageLabel)} required rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              <button type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {t(tr.contact.submit)}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
