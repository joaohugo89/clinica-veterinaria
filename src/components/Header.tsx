import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'
import { CloseIcon, MenuIcon, PawIcon } from './icons'

/** Cabeçalho fixo: fica transparente no topo e ganha fundo ao rolar. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brandDeep/95 shadow-soft backdrop-blur' : ''
      }`}
    >
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          {/* ⚙️ Logo */}
          <a href="#hero" className="flex items-center gap-2.5 text-onBrand">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink">
              <PawIcon />
            </span>
            <span className="font-display text-xl tracking-tight">{site.brand.name}</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium text-onBrand/90 lg:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#agendar" className="btn btn-gold hidden text-sm sm:inline-flex">
              Agendar Consulta
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-onBrand/30 text-onBrand lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-onBrand/10 bg-brandDeep/95 backdrop-blur lg:hidden"
          >
            <ul className="space-y-4 px-6 py-5 text-onBrand">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block" onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#agendar"
                  onClick={() => setOpen(false)}
                  className="btn btn-gold w-full justify-center sm:hidden"
                >
                  Agendar Consulta
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
