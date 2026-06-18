/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#FAF8F5',
        customCard: '#FFFFFF',
        customText: '#2F3437',
        customPrimary: '#4F6D5D',
        customPrimaryHover: '#3d5548',
        customBorder: '#DDD6C8',
        customSoftRed: '#FEE2E2',
        customDarkRed: '#991B1B'
      }
    },
  },
  plugins: [],
}
