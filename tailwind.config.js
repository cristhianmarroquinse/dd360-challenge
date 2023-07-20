/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'modal-wrapper': '#F3F3F3E3',
        'modal-bg': '#F3F3F3',
        'wordle-green': '#66A060',
        'wordle-yellow': '#CEB02C',
        'wordle-gray': '#939B9F',
        'wordle-gray-light': '#939D9F4D',
        'light-bg': '#F9F9F9',
        'dark-bg': '#262b3ce3',
        'dark-solid-bg': '#262B3C',
        'keyboard-bg': '#dadce04d',
        'keyboard-bg-dark': '#dadce008',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
