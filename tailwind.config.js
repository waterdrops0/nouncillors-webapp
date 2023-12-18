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
      },
      fontFamily: {
        "crimson-pro": ["CrimsonPro"], 
      },
    },
  },
  plugins: [],
  };