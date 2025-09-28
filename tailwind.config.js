/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#FFB870",
        accent: "#FFD6A5",
      },
      fontFamily: {
        sans: ["Mochiy Pop One", "sans-serif"],
      },
    },
  },
  plugins: [],
};