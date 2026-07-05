/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F7F4',
        surface: '#FFFFFF',
        surfaceSoft: '#F1F2F8',
        text: '#151714',
        muted: '#5F6673',
        primary: '#5A4EFF',
        primaryDark: '#253A82',
        primarySoft: '#E8E7FF',
        accent: '#5A4EFF',
        accentSoft: '#E2F4A6',
        accentLime: '#E2F4A6',
        accentPink: '#EEA0FF',
        accentBlueSoft: '#C6E6FF',
        border: '#DDE2EA',
        warning: '#D97706',
        error: '#DC2626',
        success: '#147D64',
        ink: '#151714',
        mist: '#F7F7F4',
        coral: '#5A4EFF',
        leaf: '#147D64',
        sky: '#C6E6FF',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(37, 58, 130, 0.10)',
        card: '0 18px 46px rgba(90, 78, 255, 0.10)',
      },
      fontFamily: {
        sans: ['Rubik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Rubik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
