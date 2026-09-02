import { useEffect } from 'react'
import { ServiceCartProvider } from './context/ServiceCartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Pricing from './components/Pricing'
import MapsSimulator from './components/MapsSimulator'
import Inspirations from './components/Inspirations'
import Intelligence from './components/Intelligence'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    // Smooth scroll for anchor links (BUG #4 fix)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Update URL without scrolling
        window.history.pushState(null, '', `#${id}`)
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Scroll reveal with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )

    const observeReveal = (el: Element) => {
      if (!el.classList.contains('visible')) {
        observer.observe(el)
      }
    }

    document.querySelectorAll('.reveal').forEach(observeReveal)

    // Re-observe when DOM changes (filter toggles, accordion, etc.)
    const mutationObs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.classList.contains('reveal')) observeReveal(node)
            node.querySelectorAll?.('.reveal').forEach(observeReveal)
          }
        })
      })
    })
    mutationObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObs.disconnect()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <ServiceCartProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Pricing />
          <MapsSimulator />
          <Inspirations />
          <Intelligence />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ServiceCartProvider>
  )
}

export default App
