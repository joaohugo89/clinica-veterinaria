import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealDirection = 'up' | 'left' | 'right'
export type RevealTag = 'div' | 'section' | 'ul' | 'li' | 'article' | 'figure' | 'p' | 'span'

/* Os componentes motion são criados uma única vez, fora do render. */
const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
  article: motion.article,
  figure: motion.figure,
  p: motion.p,
  span: motion.span,
} as const

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 48 },
  left: { x: -48 },
  right: { x: 48 },
}

export interface RevealProps {
  children: ReactNode
  /** Direção do deslocamento de entrada. Padrão: 'up' */
  direction?: RevealDirection
  /** Atraso antes de iniciar, em segundos */
  delay?: number
  /** Intervalo entre os filhos <RevealItem>. Padrão: 0.09s */
  stagger?: number
  className?: string
  id?: string
  as?: RevealTag
}

/**
 * Bloco que revela ao entrar na viewport (fade + deslocamento) e orquestra a
 * cascata dos <RevealItem> filhos. Dispara uma única vez (`viewport.once`).
 *
 * Para mudar o ritmo das animações de toda a página, ajuste `duration` e
 * `stagger` aqui — é o único lugar que define isso.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  stagger = 0.09,
  className,
  id,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = tags[as]

  const variants: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, ...offsets[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay + 0.25,
      },
    },
  }

  return (
    <Tag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Tag>
  )
}

/** Filho de <Reveal> que entra em cascata. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: RevealTag
}) {
  const reduced = useReducedMotion()
  const Tag = tags[as]

  const variants: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.65, ease: 'easeOut' } },
  }

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  )
}
