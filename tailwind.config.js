/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "white",
        beige: "#FAFAE3",
        black: "#322C23",
        red: "#E20010",
        maroon: "#C3000E",
        'lumber': {
          100: '#6B3F39',
          200: '#5A423F',
          300: '#7D635E',
          400: '#6B3F39',
          500: '#D0AEA9'
        },
        'cotton': {
          100: '#F9E8DD',
          200: '#F9F4E6',
          300: '#D7D3CD',
          400: '#CFC2AB',
          500: '#CBC1BC'
        },
      },
      fontFamily: {
        "crimson-pro": ["CrimsonPro"], 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
     require('tailwindcss-image-rendering')(),
  ],
  };