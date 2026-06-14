/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#15151f',
        mist: '#f6f7fb',
        coral: '#ff6b5f',
        leaf: '#2fa66a',
        sky: '#58a9ff',
      },
      boxShadow: {
        soft: '0 20px 70px rgba(21, 21, 31, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
