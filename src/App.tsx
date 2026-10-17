import { Header } from './components/Header'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { FaqContact } from './sections/FaqContact'
import { Footer } from './sections/Footer'

/**
 * Ordem das seções da landing page.
 * Cada seção já inclui o seu divisor em onda no rodapé (<Wave from=… to=… />),
 * então basta reordenar os componentes aqui e ajustar as cores do Wave.
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <FaqContact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
