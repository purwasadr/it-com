const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': colors.blue[700],
      },
      fontFamily: {
        monumentExtended: ["Monument Extended", "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
        'primary': ['General Sans', 'sans-serif']
      },
      fontMetrics: {
        'primary': {
            capHeight: 718,
            ascent: 1010,
            descent: -240,
            lineGap: 100,
            unitsPerEm: 1000,
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-capsize')
  ],
}
