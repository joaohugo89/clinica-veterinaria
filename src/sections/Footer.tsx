import { Reveal, RevealItem } from '../components/Reveal'
import { PawIcon, socialIcons } from '../components/icons'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

const { footer, contact, nav, brand } = site

export function Footer() {
  return (
    <footer className="pb-8 pt-14 text-onBrand" style={{ backgroundColor: 'var(--c-brand-dark)' }}>
      <div className="mx-auto max-w-content px-5 lg:px-8">
        {/* Faixa de CTA */}
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-[28px] bg-brand px-7 py-9 lg:flex-row lg:px-12 lg:py-11">
          <RevealItem>
            <h3 className="text-2xl leading-tight lg:text-3xl">
              {footer.ctaTitleStart}
              <br className="hidden lg:block" />{' '}
              <span className="italic text-goldSoft">{footer.ctaTitleAccent}</span>
            </h3>
            <p className="mt-2 text-sm text-onBrand/70">{footer.ctaSubtitle}</p>
          </RevealItem>
          <RevealItem>
            <a href="#agendar" className="btn btn-gold shrink-0">
              {footer.ctaButton}
            </a>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca + redes */}
          <RevealItem>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink">
                <PawIcon />
              </span>
              <span className="font-display text-xl">{brand.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-onBrand/60">{footer.about}</p>
            <div className="mt-5 flex gap-2.5">
              {contact.socials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-onBrand/20 transition hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </RevealItem>

          {/* Navegação */}
          <RevealItem>
            <h4 className="font-display text-lg">Navegação</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-onBrand/60">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Horários */}
          <RevealItem>
            <h4 className="font-display text-lg">Atendimento</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-onBrand/60">
              {contact.hours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </RevealItem>

          {/* Contato */}
          <RevealItem>
            <h4 className="font-display text-lg">Contato</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-onBrand/60">
              <li>
                <a href={whatsappLink()} className="transition hover:text-gold">
                  {contact.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition hover:text-gold">
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
            </ul>
          </RevealItem>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-onBrand/10 pt-6 text-xs text-onBrand/45 sm:flex-row">
          <p>{footer.legal}</p>
          <p>{footer.credit}</p>
        </div>
      </div>
    </footer>
  )
}
