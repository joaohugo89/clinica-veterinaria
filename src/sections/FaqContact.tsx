import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, RevealItem } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { PawIcon, PhoneIcon, StethoscopeIcon, UserIcon } from '../components/icons'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

const { faq, form } = site

interface FormState {
  nome: string
  pet: string
  telefone: string
  servico: string
  mensagem: string
}

const emptyForm: FormState = {
  nome: '',
  pet: '',
  telefone: '',
  servico: form.serviceOptions[0],
  mensagem: '',
}

export function FaqContact() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [values, setValues] = useState<FormState>(emptyForm)

  const update = (field: keyof FormState) => (event: { target: { value: string } }) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }))

  /**
   * Não há backend: a mensagem é montada e aberta no WhatsApp da clínica.
   * Para usar e-mail, troque este handler por um POST (Formspree, Netlify Forms…).
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Olá! Gostaria de agendar uma consulta para o meu pet.',
      `*Tutor(a):* ${values.nome}`,
      `*Pet:* ${values.pet}`,
      `*WhatsApp:* ${values.telefone}`,
      `*Atendimento:* ${values.servico}`,
      values.mensagem ? `*Mensagem:* ${values.mensagem}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(message), '_blank', 'noopener')
  }

  return (
    <section id="faq" className="section-top" style={{ backgroundColor: 'var(--c-sand)' }}>
      <div className="mx-auto grid max-w-content gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        {/* Accordion */}
        <Reveal>
          <RevealItem>
            <span className="badge bg-brand/10 text-brand">{faq.badge}</span>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-5 text-3xl leading-tight lg:text-[2.4rem]">
              {faq.titleStart}
              <br />
              <span className="italic text-brand">{faq.titleAccent}</span>
            </h2>
          </RevealItem>

          <div className="mt-8 space-y-3.5">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <RevealItem key={item.question} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-medium">{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl leading-none text-brand"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-inkSoft">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </RevealItem>
              )
            })}
          </div>
        </Reveal>

        {/* Formulário */}
        <Reveal direction="right" id="agendar" className="self-start lg:sticky lg:top-28">
          <form onSubmit={handleSubmit} className="card bg-white p-7">
            <h3 className="text-2xl">{form.title}</h3>
            <p className="mt-1.5 text-sm text-inkSoft">{form.subtitle}</p>

            <div className="mt-6 space-y-3.5">
              <div>
                <label className="label" htmlFor="nome">
                  Seu nome
                </label>
                <div className="relative">
                  <UserIcon className="field-icon" />
                  <input
                    id="nome"
                    required
                    value={values.nome}
                    onChange={update('nome')}
                    placeholder="Como podemos te chamar?"
                    className="field field-with-icon"
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="pet">
                  Nome e espécie do pet
                </label>
                <div className="relative">
                  <PawIcon width={16} height={16} className="field-icon" />
                  <input
                    id="pet"
                    required
                    value={values.pet}
                    onChange={update('pet')}
                    placeholder="Ex.: Mel, cadela de 4 anos"
                    className="field field-with-icon"
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="telefone">
                  WhatsApp
                </label>
                <div className="relative">
                  <PhoneIcon className="field-icon" />
                  <input
                    id="telefone"
                    required
                    type="tel"
                    inputMode="tel"
                    value={values.telefone}
                    onChange={update('telefone')}
                    placeholder="(11) 90000-0000"
                    className="field field-with-icon"
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="servico">
                  Tipo de atendimento
                </label>
                <div className="relative">
                  <StethoscopeIcon className="field-icon" />
                  <select
                    id="servico"
                    value={values.servico}
                    onChange={update('servico')}
                    className="field field-with-icon"
                  >
                    {form.serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label" htmlFor="mensagem">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  rows={3}
                  value={values.mensagem}
                  onChange={update('mensagem')}
                  placeholder="Conte o que está acontecendo com o seu pet"
                  className="field resize-none"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-gold mt-6 w-full justify-center">
              {form.submit}
            </button>
            <p className="mt-3 text-center text-[.7rem] text-inkSoft">{form.footnote}</p>
          </form>
        </Reveal>
      </div>

      {/* 🌊 FAQ (areia) → Rodapé (marrom escuro) */}
      <Wave from="var(--c-sand)" to="var(--c-brand-dark)" offset={4} className="section-gap" />
    </section>
  )
}
