/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Mona Sans"', 'sans-serif'],
      },
      colors: {
        // Official System Colors
        fundo: '#F7F1E6',
        'vermelho-destaque': '#990000',
        'vermelho-escuro': '#761D19',
        preto: '#262626',

        ile: {
          bg: '#090506',
          surface: '#130C0E',
          card: '#1B1114',
          border: '#2E191E',
          'border-gold': '#574328',
          crimson: '#761D19',
          'crimson-dark': '#38070F',
          gold: '#E3C184',
          'gold-bright': '#F9E2B3',
          amber: '#D97706',
          accent: '#990000',
          cream: '#F7F1E6',
          muted: '#A3999B',
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(118, 29, 25, 0.35) 0%, rgba(27, 17, 20, 0.8) 50%, rgba(9, 5, 6, 1) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F9E2B3 0%, #E3C184 50%, #B88B42 100%)',
        'crimson-gradient': 'linear-gradient(180deg, rgba(118, 29, 25, 0.4) 0%, rgba(19, 12, 14, 0.95) 100%)',
        'curtain-pattern': 'radial-gradient(ellipse at top, rgba(153, 0, 0, 0.25) 0%, rgba(9, 5, 6, 0.9) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee-left': 'marquee-left 45s linear infinite',
        'marquee-right': 'marquee-right 45s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
