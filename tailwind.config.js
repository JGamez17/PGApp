/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};