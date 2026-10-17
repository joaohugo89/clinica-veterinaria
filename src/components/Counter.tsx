import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export interface CounterProps {
  /** Valor final */
  to: number
  /** Divisor para exibir decimais: to=49, divide=10 → "4,9" */
  divide?: number
  suffix?: string
  className?: string
}

const format = (value: number, divide: number, suffix: string) => {
  const n = value / divide
  const text = divide > 1 ? n.toFixed(1).replace('.', ',') : Math.round(n).toLocaleString('pt-BR')
  return text + suffix
}

/** Número que conta de 0 até `to` quando entra na viewport. */
export function Counter({ to, divide = 1, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest),
    })
    return () => controls.stop()
  }, [inView, reduced, to])

  return (
    <p ref={ref} className={className}>
      {format(value, divide, suffix)}
    </p>
  )
}
