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
        red: "#e50000",
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
        'credit': {
          100: '#1E3445',
          200: '#EAB118',
          300: '#FFFFFF',
          400: '#00499C',
          500: '#0079FC'
        },
        'prototype': {
          100: '#c1edee',
          200: '#e1e1e1',
          300: '#cecece',
          400: '#748ca7',
          500: '#687e96'
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