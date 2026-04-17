/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        tertiary: '#657786',
        quaternary: '#AAB8C2',
      },
      fontFamily: {
        'chirp-regular': ['Chirp-Regular', 'sans-serif'],
        'chirp-medium': ['Chirp-Medium', 'sans-serif'],
        'chirp-bold': ['Chirp-Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}