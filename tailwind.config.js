/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 🟣 LAVENDER (guardado para después)
        // lavender: { 50: '#f8f6fb', 100: '#efeaf5', 200: '#d9cee8', 300: '#c8afda', 400: '#b08cc7', 500: '#7B2D8E', 600: '#6a2579', 700: '#581d66', 800: '#471754', 900: '#361243' },
        lavender: { 50: '#faf5f4', 100: '#f5ecea', 200: '#ebd9d5', 300: '#e1c6c0', 400: '#d8c3bf', 500: '#c4a69f', 600: '#b08980', 700: '#9c6c61', 800: '#885046', 900: '#6e3d35' },
        gold: { 300: '#E8D5A5', 400: '#D4AF37', 500: '#C5A01E' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
