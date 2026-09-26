/** @type {import('tailwindcss').Config} */
// Same theme as the former Play CDN config in index.html (Tailwind v3), now compiled at build time.
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './constants.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#1e266e',
        accent: { DEFAULT: '#2BB6C6', 400: '#2BB6C6', 500: '#2BB6C6' },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        scanline: 'scanline 10s linear infinite',
        flicker: 'flicker 0.2s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
