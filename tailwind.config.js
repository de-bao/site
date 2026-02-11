/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1772d0',
        secondary: '#f09228',
      },
      fontFamily: {
        sans: ['Titillium Web', 'Verdana', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
