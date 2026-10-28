/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B1020',
          surface: '#111A2E',
          card: '#162038',
          cardHover: '#1B2744',
          border: '#233254',
          muted: '#8E9BB5',
          subtle: '#1C2844',
        },
        electric: {
          300: '#8FB4FF',
          400: '#5B8CFF',
          500: '#3E73F0',
          600: '#265BD8',
          700: '#1C46AC',
        },
        violetAccent: {
          300: '#B49BFC',
          400: '#9D76F8',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        brand: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#C7DAFE',
          300: '#9DBEFC',
          400: '#5B8CFF',
          500: '#3E73F0',
          600: '#265BD8',
          700: '#1C46AC',
          800: '#173685',
          900: '#142B66',
          950: '#0B1020',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -4px rgba(91, 140, 255, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'dark-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'dark-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px -2px rgba(91, 140, 255, 0.2)',
      },
      animation: {
        'gradient-slow': 'gradientShift 15s ease infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(20px) scale(0.95)' },
        },
      }
    },
  },
  plugins: [],
}
