import { Counter } from '../components/Counter'
import { Reveal, RevealItem } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { site } from '../data/site'
import { asset } from '../lib/asset'

const { testimonials } = site

export function Testimonials() {
  return (
    <section id="depoimentos" className="section-top" style={{ backgroundColor: 'var(--c-sand-2)' }}>
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <RevealItem>
            <span className="badge bg-brand/10 text-brand">{testimonials.badge}</span>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-5 text-3xl leading-tight lg:text-[2.7rem]">
              {testimonials.titleStart}
              <br />
              <span className="italic text-brand">{testimonials.titleAccent}</span>
            </h2>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <RevealItem as="figure" key={item.name} className="card p-7">
              <div className="text-lg tracking-wide text-gold">★★★★★</div>
              <blockquote className="mt-4 text-sm leading-relaxed text-inkSoft">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={asset(item.photo)} alt="" className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-inkSoft">{item.role}</p>
                </div>
              </figcaption>
            </RevealItem>
          ))}
        </Reveal>

        {/* Métricas com contador animado */}
        <Reveal className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {testimonials.metrics.map((metric) => (
            <RevealItem key={metric.label} className="rounded-2xl bg-brand p-6 text-center text-onBrand">
              <Counter
                to={metric.to}
                suffix={metric.suffix}
                divide={metric.divide}
                className="font-display text-3xl text-goldSoft"
              />
              <p className="mt-1 text-xs text-onBrand/70">{metric.label}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* 🌊 Depoimentos (creme) → FAQ (areia) */}
      <Wave from="var(--c-sand-2)" to="var(--c-sand)" offset={3} className="section-gap" />
    </section>
  )
}
