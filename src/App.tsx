import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ServicesShowcase } from './components/ServicesShowcase'
import { useEntranceAnimations } from './lib/useEntranceAnimations'

function App() {
  const entranceRef = useEntranceAnimations()
  return (
    <div ref={entranceRef} className="flex min-h-screen flex-col bg-background text-grey-800">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-subtle focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-subtle"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ServicesShowcase />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
