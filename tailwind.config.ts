import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: 'rgb(var(--color-red-rgb) / <alpha-value>)',
        navy: 'rgb(var(--color-navy-rgb) / <alpha-value>)',
        blue: 'rgb(var(--color-blue-rgb) / <alpha-value>)',
        white: 'rgb(var(--color-white-rgb) / <alpha-value>)',
        'grey-100': 'rgb(var(--color-grey-100-rgb) / <alpha-value>)',
        'grey-150': 'rgb(var(--color-grey-150-rgb) / <alpha-value>)',
        'grey-400': 'rgb(var(--color-grey-400-rgb) / <alpha-value>)',
        'grey-600': 'rgb(var(--color-grey-600-rgb) / <alpha-value>)',
        'grey-800': 'rgb(var(--color-grey-800-rgb) / <alpha-value>)',
        background: 'rgb(var(--color-background-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 4px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        subtle: '4px',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        'in-out-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
