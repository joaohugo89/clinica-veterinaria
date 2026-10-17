import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Counter } from '../components/Counter'
import { Reveal, RevealItem } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { CheckIcon, PawIcon, WhatsAppIcon, serviceIcons } from '../components/icons'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

const { hero, testimonials } = site

/* --------------------------------------------------------------------------
   Trilha de patinhas: um pet "atravessa" o hero em diagonal.
   As pegadas acendem uma após a outra (passo), somem juntas e recomeçam.
   ⚙️ Para mudar o caminho, edite as posições abaixo; `PAW_CYCLE` é o tempo
   total do ciclo e `PAW_STEP` o intervalo entre uma pegada e a seguinte.
   -------------------------------------------------------------------------- */
const PAW_STEP = 0.42 // intervalo entre uma pegada e a próxima (o "passo")
const PAW_CYCLE = 9 // duração de cada pegada acesa, em segundos

interface Paw {
  /** posição em % da seção */
  x: number
  y: number
  size: number
  rotate: number
}

interface PawTrail {
  /** atraso inicial da trilha inteira, em segundos */
  delay: number
  /** opacidade máxima (trilhas de fundo ficam mais discretas) */
  opacity: number
  paws: Paw[]
}

/* --------------------------------------------------------------------------
   ⚙️ Caminhos das patinhas. Cada trilha é um pet atravessando a seção por um
   trajeto diferente; `x`/`y` são porcentagens, então acompanham qualquer tela.
   Gere o zigue-zague alternando o eixo perpendicular ao movimento e mantenha
   `rotate` apontando para a direção da caminhada.
   -------------------------------------------------------------------------- */
const pawTrails: PawTrail[] = [
  // 1. Rodapé, da esquerda para a direita (em direção ao pet)
  {
    delay: 0,
    opacity: 0.55,
    paws: [
      { x: 3, y: 90, size: 42, rotate: 62 },
      { x: 10, y: 84, size: 41, rotate: 70 },
      { x: 17, y: 90, size: 39, rotate: 62 },
      { x: 24, y: 84, size: 38, rotate: 72 },
      { x: 31, y: 89, size: 36, rotate: 64 },
      { x: 38, y: 83, size: 35, rotate: 74 },
      { x: 45, y: 88, size: 33, rotate: 66 },
    ],
  },
  // 2. Diagonal subindo pela esquerda, atrás do texto
  {
    delay: 3.2,
    opacity: 0.3,
    paws: [
      { x: -1, y: 62, size: 34, rotate: 28 },
      { x: 5, y: 52, size: 33, rotate: 36 },
      { x: 10, y: 41, size: 31, rotate: 28 },
      { x: 16, y: 31, size: 30, rotate: 38 },
      { x: 21, y: 20, size: 28, rotate: 30 },
      { x: 27, y: 10, size: 27, rotate: 40 },
    ],
  },
  // 3. Topo, da direita para a esquerda, descendo
  {
    delay: 6,
    opacity: 0.35,
    paws: [
      { x: 95, y: 8, size: 32, rotate: -118, },
      { x: 88, y: 14, size: 31, rotate: -110 },
      { x: 81, y: 20, size: 29, rotate: -118 },
      { x: 74, y: 26, size: 28, rotate: -110 },
      { x: 67, y: 32, size: 26, rotate: -118 },
      { x: 60, y: 38, size: 25, rotate: -110 },
    ],
  },
]

function DecorPaws({ reduced }: { reduced: boolean | null }) {
  // No mobile as pegadas ficam mais discretas, para não disputar com o texto
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 lg:opacity-100">
      {pawTrails.map((trail, t) =>
        trail.paws.map((paw, i) => (
          <motion.div
            key={`${t}-${i}`}
            // Dourado com leve brilho: visível sobre o marrom sem roubar a cena
            className="absolute text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,.3)]"
            style={{
              left: `${paw.x}%`,
              top: `${paw.y}%`,
              rotate: paw.rotate,
              opacity: reduced ? trail.opacity * 0.7 : 0,
            }}
            animate={
              reduced
                ? undefined
                : {
                    // acende → segura → apaga, em loop
                    opacity: [0, trail.opacity, trail.opacity, 0],
                    scale: [0.6, 1, 1, 0.95],
                  }
            }
            transition={{
              duration: PAW_CYCLE,
              times: [0, 0.08, 0.72, 0.9],
              repeat: Infinity,
              repeatDelay: 2.4,
              delay: trail.delay + i * PAW_STEP,
              ease: 'easeOut',
            }}
          >
            <PawIcon width={paw.size} height={paw.size} />
          </motion.div>
        )),
      )}
    </div>
  )
}

/* Quebra o título em palavras e marca as que são destaque (itálico dourado),
   sublinhando a última delas. */
const titleWords = [
  ...hero.titleStart.split(' ').map((text) => ({ text, accent: false, underline: false })),
  ...hero.titleAccent.split(' ').map((text, i, arr) => ({
    text,
    accent: true,
    underline: i === arr.length - 1,
  })),
  ...hero.titleEnd.split(' ').map((text) => ({ text, accent: false, underline: false })),
]

export function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax: o pet sobe mais devagar que a página e vai sumindo
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const petY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60])
  const petOpacity = useTransform(scrollYProgress, [0, 0.9], [1, reduced ? 1 : 0.25])

  /* Parallax do ponteiro: o palco do pet acompanha o mouse de leve.
     ⚙️ Aumente o multiplicador (18) para um movimento mais pronunciado. */
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const stageX = useSpring(pointerX, { stiffness: 60, damping: 18 })
  const stageY = useSpring(pointerY, { stiffness: 60, damping: 18 })

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 18)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 18)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative flex flex-col overflow-hidden pt-24 sm:pt-28 lg:min-h-[94vh] lg:pt-32"
      style={{ backgroundColor: 'var(--c-brand)' }}
    >
      {/* Camada 1 — textura de pontos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Camada 2 — clarão quente do lado do pet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 60% at 78% 55%, rgb(var(--c-gold-rgb) / .22), transparent 70%)',
        }}
      />
      {/* Camada 3 — patinhas */}
      <DecorPaws reduced={reduced} />

      {/* ---------------- Palco do pet (desktop) ----------------
           bottom = altura da onda menos a sobreposição, para o pet "pisar" nela */}
      <motion.div
        style={{ y: petY, opacity: petOpacity, bottom: 'calc(var(--wave-height) - 46px)' }}
        className="absolute inset-x-0 z-10 hidden h-[76%] max-h-[700px] lg:block"
      >
        {/* Mesmo container do conteúdo: o pet fica dentro da grade, e não colado
            no canto da tela, com folga à direita em telas largas. */}
        <div className="mx-auto flex h-full max-w-content justify-end px-5 lg:px-8">
          <motion.div
            style={{ x: stageX, y: stageY }}
            className="relative flex h-full w-[46%] items-end justify-center xl:mr-[4%] xl:w-[44%]"
          >
          {/* Disco de luz: dá base ao recorte, como um palco */}
          <div
            aria-hidden
            className="absolute bottom-[6%] left-1/2 aspect-square w-[86%] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgb(var(--c-gold-rgb) / .34), rgb(var(--c-gold-rgb) / .06) 70%, transparent)',
            }}
          />
          {/* Anel tracejado externo girando */}
          <motion.div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full border border-dashed border-gold/30"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          {/* Anel interno sólido, girando ao contrário */}
          <motion.div
            aria-hidden
            className="absolute bottom-[14%] left-1/2 aspect-square w-[72%] -translate-x-1/2 rounded-full border border-gold/15"
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          >
            {/* Ponto correndo sobre o anel */}
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px_rgb(var(--c-gold-rgb)/.6)]" />
          </motion.div>
          {/* Sombra no chão */}
          <div
            aria-hidden
            className="absolute bottom-[3%] left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-[50%] bg-brandDark/45 blur-xl"
          />

          <motion.img
            src={hero.photo}
            alt={hero.photoAlt}
            initial={reduced ? false : { opacity: 0, scale: 0.92, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_55px_rgba(43,20,9,.5)]"
            loading="eager"
          />

          {/* Cards de destaque orbitando o pet */}
          {hero.highlights.map((item, i) => {
            const Icon = serviceIcons[item.icon]
            // posições: topo-esquerda, meio-esquerda baixo, direita
            const place = [
              'left-[-4%] top-[12%]',
              'bottom-[24%] left-[-10%]',
              'right-[1%] top-[40%]',
            ][i]
            return (
              <motion.div
                key={item.title}
                className={`absolute ${place} flex items-center gap-2.5 rounded-2xl border border-white/15 bg-brandDark/55 px-3.5 py-2.5 backdrop-blur-md`}
                initial={reduced ? false : { opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 + i * 0.18 }}
              >
                <motion.span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/20 text-goldSoft"
                  animate={reduced ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                >
                  <Icon width={18} height={18} />
                </motion.span>
                <div className="leading-tight">
                  <p className="text-[.82rem] font-semibold text-onBrand">{item.title}</p>
                  <p className="text-[.68rem] text-onBrand/60">{item.text}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-content flex-1 flex-col px-5 lg:justify-center lg:px-8 lg:pb-10">
        <div className="lg:max-w-[56%]">
          <Reveal>
            <RevealItem>
              <span className="badge border border-gold/25 bg-gold/15 text-goldSoft">
                {/* Ponto pulsante: sinaliza "aberto agora" */}
                <span className="relative flex h-1.5 w-1.5">
                  {!reduced && (
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-gold"
                      animate={{ scale: [1, 2.6, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {hero.badge}
              </span>
            </RevealItem>

            <RevealItem>
              <h1 className="mt-5 text-[2.15rem] leading-[1.08] sm:text-[2.6rem] sm:leading-[1.05] text-onBrand sm:text-5xl lg:text-[4.1rem]">
                {/* Cada palavra entra separadamente, de baixo para cima */}
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`${word.text}-${i}`}
                    className={`mr-[.28em] inline-block ${
                      word.accent ? 'relative italic text-goldSoft' : ''
                    }`}
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.07 }}
                  >
                    {word.text}
                    {/* Traço dourado sob a última palavra em destaque */}
                    {word.underline && !reduced && (
                      <motion.span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gold/70"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 1.1 }}
                      />
                    )}
                  </motion.span>
                ))}
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mt-4 max-w-md text-[.9rem] leading-[1.7] text-onBrand/65 sm:mt-5 sm:text-[.95rem]">{hero.subtitle}</p>
            </RevealItem>

            <RevealItem>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                {/* CTA primário com anel pulsante */}
                <span className="relative inline-flex">
                  {!reduced && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-gold/35"
                      animate={{ scale: [1, 1.18], opacity: [0.5, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <a
                    href={whatsappLink('Olá! Gostaria de agendar uma consulta para o meu pet.')}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-gold relative px-7 py-4 text-base"
                  >
                    <WhatsAppIcon />
                    {hero.ctaPrimary}
                  </a>
                </span>
                <a href="#servicos" className="btn btn-ghost">
                  {hero.ctaSecondary}
                </a>
              </div>
            </RevealItem>

            {/* Credencial + prova social: ancoradas ao conteúdo, não flutuando soltas */}
            <RevealItem>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6">
                <div className="flex items-center gap-2.5 rounded-full border border-onBrand/15 bg-onBrand/5 py-2 pl-2 pr-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-ink">
                    <CheckIcon width={15} height={15} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-onBrand">{hero.credential.title}</p>
                    <p className="text-[.7rem] text-onBrand/55">{hero.credential.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {testimonials.items.map((item) => (
                      <img
                        key={item.name}
                        src={item.photo}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-brand object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="leading-tight">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-onBrand">
                      {hero.rating.score}
                      <span className="text-gold">★★★★★</span>
                    </p>
                    <p className="text-[.7rem] text-onBrand/55">{hero.rating.label}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          </Reveal>
        </div>

        {/* ---------------- Pet no mobile/tablet ----------------
             Mesmo palco do desktop, em escala reduzida: disco de luz, anel e sombra. */}
        <div className="relative mx-auto mt-8 flex h-[300px] w-full max-w-[380px] items-end justify-center sm:h-[360px] lg:hidden">
          <div
            aria-hidden
            className="absolute bottom-[6%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgb(var(--c-gold-rgb) / .32), rgb(var(--c-gold-rgb) / .05) 70%, transparent)',
            }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[9%] left-1/2 aspect-square w-[82%] -translate-x-1/2 rounded-full border border-dashed border-gold/25"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          <div
            aria-hidden
            className="absolute bottom-[4%] left-1/2 h-7 w-[46%] -translate-x-1/2 rounded-[50%] bg-brandDark/45 blur-lg"
          />
          <motion.img
            src={hero.photo}
            alt=""
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
            className="relative h-full w-auto object-contain object-bottom drop-shadow-[0_26px_38px_rgba(43,20,9,.5)]"
          />
        </div>

        {/* No mobile os destaques viram uma linha de chips abaixo do pet */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
          {hero.highlights.map((item) => {
            const Icon = serviceIcons[item.icon]
            return (
              <span
                key={item.title}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-brandDark/45 px-3 py-2 backdrop-blur-md"
              >
                <Icon width={15} height={15} className="text-goldSoft" />
                <span className="text-[.75rem] font-medium text-onBrand/85">{item.title}</span>
              </span>
            )
          })}
        </div>

        {/* Métricas — limitadas à coluna de texto, para o pet ocupar o resto */}
        <Reveal className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 divide-onBrand/10 border-t border-onBrand/15 pt-7 sm:divide-x lg:mt-14 lg:max-w-[56%] lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-onBrand/15">
          {hero.metrics.map((metric) => (
            <RevealItem key={metric.label} className="sm:px-4 sm:first:pl-0 lg:px-5 lg:first:pl-0">
              <Counter
                to={metric.to}
                suffix={metric.suffix}
                className="font-display text-[1.7rem] text-goldSoft sm:text-3xl lg:text-[2.1rem]"
              />
              <p className="mt-1 text-[.8rem] leading-snug text-onBrand/60">{metric.label}</p>
            </RevealItem>
          ))}
        </Reveal>

        {/* Indicador de rolagem */}
        <motion.a
          href="#sobre"
          aria-label="Rolar para a próxima seção"
          className="mt-10 hidden items-center gap-3 text-[.7rem] uppercase tracking-[.2em] text-onBrand/45 transition hover:text-gold lg:inline-flex"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="h-9 w-px bg-onBrand/25" />
          Role para conhecer a clínica
        </motion.a>
      </div>

      {/* ---------------- Faixa rolante ---------------- */}
      <div
        aria-hidden
        className="relative z-10 mt-8 flex overflow-hidden border-y border-onBrand/10 bg-brandDark/25 py-2.5 sm:mt-10 sm:py-3"
      >
        {/* Duas cópias iguais: quando a primeira sai, a segunda já está no lugar */}
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10"
            animate={reduced ? undefined : { x: ['0%', '-100%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          >
            {hero.ticker.map((word) => (
              <span
                key={word}
                className="flex shrink-0 items-center gap-10 text-[.72rem] uppercase tracking-[.25em] text-onBrand/45"
              >
                {word}
                <PawIcon width={13} height={13} className="text-gold/60" />
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* 🌊 Hero (marrom) → A Clínica (areia) */}
      <Wave from="var(--c-brand)" to="var(--c-sand)" offset={0} className="section-gap relative z-0 mt-auto" />
    </section>
  )
}
