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