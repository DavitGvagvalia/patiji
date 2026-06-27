export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          navy: '#14213d',
          gold: '#fca311',
          soft: '#e5e5e5',
          white: '#ffffff'
        }
      },
      fontFamily: {
        script: ['League Script', 'cursive'],
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
