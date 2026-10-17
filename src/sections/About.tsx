import { Reveal, RevealItem } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { site } from '../data/site'

const { about } = site

export function About() {
  return (
    <section id="sobre" className="section-top" style={{ backgroundColor: 'var(--c-sand)' }}>
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Foto */}
          <Reveal direction="left" className="relative order-2 lg:order-1">
            <img
              src={about.photo}
              alt={about.photoAlt}
              className="aspect-[5/4] w-full rounded-[32px] object-cover shadow-lift"
              loading="lazy"
            />
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-brand px-5 py-4 text-onBrand shadow-lift">
              <p className="font-display text-2xl text-goldSoft">{about.stamp.value}</p>
              <p className="text-xs text-onBrand/70">{about.stamp.label}</p>
            </div>
          </Reveal>

          {/* Texto */}
          <Reveal className="order-1 lg:order-2">
            <RevealItem>
              <span className="badge bg-brand/10 text-brand">{about.badge}</span>
            </RevealItem>

            <RevealItem>
              <h2 className="mt-5 text-3xl leading-tight lg:text-[2.7rem]">
                {about.titleStart}
                <br />
                <span className="italic text-brand">{about.titleAccent}</span>
              </h2>
            </RevealItem>

            {about.paragraphs.map((text, i) => (
              <RevealItem key={i}>
                <p className={`${i === 0 ? 'mt-5' : 'mt-4'} leading-relaxed text-inkSoft`}>{text}</p>
              </RevealItem>
            ))}

            <ul className="mt-8 space-y-3">
              {about.pillars.map((pillar, i) => (
                <RevealItem
                  as="li"
                  key={pillar.title}
                  className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-white/70 p-4"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/25 text-sm font-bold text-brand">
                    {i + 1}
                  </span>
                  <p className="text-sm">
                    <strong className="font-semibold">{pillar.title}</strong> — {pillar.text}
                  </p>
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* 🌊 A Clínica (areia) → Serviços (marrom) */}
      <Wave from="var(--c-sand)" to="var(--c-brand-deep)" offset={1} className="section-gap" />
    </section>
  )
}
