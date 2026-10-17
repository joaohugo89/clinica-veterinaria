import { Reveal, RevealItem } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { serviceIcons } from '../components/icons'
import { site } from '../data/site'

const { services } = site

export function Services() {
  return (
    <section id="servicos" className="section-top" style={{ backgroundColor: 'var(--c-brand-deep)' }}>
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <span className="badge border border-gold/25 bg-gold/15 text-goldSoft">{services.badge}</span>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-5 text-3xl leading-tight text-onBrand lg:text-[2.7rem]">
              {services.titleStart}
              <br />
              <span className="italic text-goldSoft">{services.titleAccent}</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-onBrand/70">{services.subtitle}</p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((service) => {
            const Icon = serviceIcons[service.icon]
            return (
              <RevealItem
                as="article"
                key={service.title}
                className={`card relative flex flex-col p-6 ${
                  // O card em destaque muda de verdade: fundo creme, borda dourada e leve elevação
                  service.highlight
                    ? 'border-gold/60 bg-sand2 ring-1 ring-gold/30 lg:-translate-y-3 lg:scale-[1.03]'
                    : ''
                }`}
              >
                {service.highlight && (
                  <span className="badge absolute -top-3 right-5 bg-gold text-[.68rem] text-ink shadow-soft">
                    {service.highlight}
                  </span>
                )}

                {/* Ícone em círculo com anel — mais leve que o quadrado opaco */}
                <span
                  className={`grid h-14 w-14 place-items-center rounded-full text-brand ring-1 ${
                    service.highlight ? 'bg-gold/25 ring-gold/40' : 'bg-gold/10 ring-brand/10'
                  }`}
                >
                  <Icon width={24} height={24} />
                </span>

                <h3 className="mt-5 text-xl">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-inkSoft">{service.description}</p>

                <p className="mt-5 font-display text-2xl text-brand">
                  {service.price}
                  <span className="font-sans text-sm text-inkSoft">{service.priceNote}</span>
                </p>
                <a
                  href="#agendar"
                  className={`btn mt-4 justify-center text-sm ${service.highlight ? 'btn-gold' : 'btn-dark'}`}
                >
                  Agendar
                </a>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>

      {/* 🌊 Serviços (marrom) → Depoimentos (creme) */}
      <Wave from="var(--c-brand-deep)" to="var(--c-sand-2)" offset={2} className="section-gap" />
    </section>
  )
}
