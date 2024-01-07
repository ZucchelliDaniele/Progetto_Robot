/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'black': '#0d0d0d',
      'sky' : '#004dc9',
      'white-sky': '#ecfeff',
      'gray': '#a59e92',
      'white-gray' : '#dfdcd8',
      'black-gray' : '#1c1c1c',
      'red': '#ff0000',
    },
  },
  plugins: [],
  darkMode: 'class',
}