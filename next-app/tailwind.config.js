/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'aqua': '#e7f4ff',
        'blue': '#2567f9',
        'light-green-200': '#2cccc4',
        'light-green-100': '#94E888',
      },
      boxShadow: {
        '3xl': '2px 2px 40px 0 rgba(26,26,26,0.4)',
      },
      sepia: {
        5: '.05',
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
  },
  plugins: [],
}

