/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:["./src/**/*.vue"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
