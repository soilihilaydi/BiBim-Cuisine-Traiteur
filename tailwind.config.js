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
        primary: "#3A5A40",
        secondary: "#A3B18A",
        accent: "#F2E863",
      },
      fontFamily: {
        sans: ["Mochiy Pop One", "sans-serif"],
      },
    },
  },
  plugins: [],
};