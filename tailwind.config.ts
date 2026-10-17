import type { Config } from 'tailwindcss'

/**
 * As cores apontam para as variáveis CSS declaradas em `src/styles/theme.css`.
 * Para trocar a paleta do template, edite SOMENTE aquele arquivo.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // `<alpha-value>` é o que permite usar bg-brand/10, text-onBrand/70 etc.
        brand: 'rgb(var(--c-brand-rgb) / <alpha-value>)',
        brandDeep: 'rgb(var(--c-brand-deep-rgb) / <alpha-value>)',
        brandDark: 'rgb(var(--c-brand-dark-rgb) / <alpha-value>)',
        sand: 'rgb(var(--c-sand-rgb) / <alpha-value>)',
        sand2: 'rgb(var(--c-sand-2-rgb) / <alpha-value>)',
        gold: 'rgb(var(--c-gold-rgb) / <alpha-value>)',
        goldSoft: 'rgb(var(--c-gold-soft-rgb) / <alpha-value>)',
        ink: 'rgb(var(--c-ink-rgb) / <alpha-value>)',
        inkSoft: 'rgb(var(--c-ink-soft-rgb) / <alpha-value>)',
        onBrand: 'rgb(var(--c-on-brand-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1180px' },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
      },
    },
  },
  plugins: [],
} satisfies Config
