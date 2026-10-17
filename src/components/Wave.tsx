import type { CSSProperties } from 'react'
import { useId } from 'react'

export interface WaveProps {
  /** Cor da seção ATUAL — fundo do divisor. Ex.: 'var(--c-brand)' */
  from: string
  /** Cor da PRÓXIMA seção — preenchimento das ondas. Ex.: 'var(--c-sand)' */
  to: string
  /** Defasagem em segundos, para que dois divisores nunca fiquem sincronizados */
  offset?: number
  className?: string
}

/**
 * Divisor em onda animado (3 camadas em parallax).
 *
 * O `<path>` é um tile de 1200px usado duas vezes por camada (x=0 e x=1200),
 * formando 2400px contínuos; a animação translada -1200px e volta ao ponto
 * inicial, então o loop não tem emenda. `preserveAspectRatio="none"` faz a
 * onda esticar em qualquer largura de tela — daí ser responsiva sem media query.
 *
 * Velocidade e altura: variáveis `--wave-*` em src/styles/theme.css.
 */
export function Wave({ from, to, offset = 0, className = '' }: WaveProps) {
  // useId garante um id único por instância — sem isto o 2º SVG da página
  // reaproveitaria o <path> do 1º.
  const tileId = `wave-tile-${useId().replace(/:/g, '')}`

  const delay = (i: number) => ({ animationDelay: `${-(offset * 2.7 + i * 1.3)}s` })

  return (
    <div
      className={`wave ${className}`}
      style={{ backgroundColor: from, '--wave-fill': to } as CSSProperties}
    >
      <svg className="wave__svg" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden focusable="false">
        <defs>
          <path id={tileId} d="M0,70 C150,15 450,15 600,70 C750,125 1050,125 1200,70 L1200,140 L0,140 Z" />
        </defs>

        {/* Camada de trás — lenta e translúcida */}
        <g className="wave__bob" style={delay(0)}>
          <g className="wave__layer wave__layer--back" fill="var(--wave-fill)" style={delay(1)}>
            <use href={`#${tileId}`} x="0" y="12" />
            <use href={`#${tileId}`} x="1200" y="12" />
          </g>
        </g>

        {/* Camada do meio — sentido invertido, cruza as curvas */}
        <g>
          <g className="wave__layer wave__layer--mid" fill="var(--wave-fill)" style={delay(2)}>
            <use href={`#${tileId}`} x="0" y="6" />
            <use href={`#${tileId}`} x="1200" y="6" />
          </g>
        </g>

        {/* Camada da frente — rápida e opaca, é ela que "fecha" a seção */}
        <g className="wave__bob wave__bob--alt" style={delay(3)}>
          <g className="wave__layer wave__layer--front" fill="var(--wave-fill)" style={delay(4)}>
            <use href={`#${tileId}`} x="0" />
            <use href={`#${tileId}`} x="1200" />
          </g>
        </g>
      </svg>
    </div>
  )
}
