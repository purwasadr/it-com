module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        monumentExtended: ["Monument Extended", "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
        'general-sans': ['General Sans', 'sans-serif']
      },
      fontMetrics: {
        'general-sans': {
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
