// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#004225',
          50:  '#e9f1ed',
          100: '#d2e3db',
          200: '#a6c7b7',
          300: '#79ab93',
          400: '#4c8f6f',
          500: '#227352',
          600: '#14553d',
          700: '#0e3f2e',
          800: '#0a2f23',
          900: '#051c14'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
