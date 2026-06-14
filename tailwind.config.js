/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F8FB',
        surface: '#FFFFFF',
        surfaceSoft: '#EEF3F8',
        text: '#111827',
        muted: '#5B6472',
        primary: '#1E40AF',
        primaryDark: '#172554',
        primarySoft: '#DBEAFE',
        accent: '#14B8A6',
        accentSoft: '#CCFBF1',
        border: '#D9E1EC',
        warning: '#F59E0B',
        error: '#DC2626',
        success: '#059669',
        ink: '#111827',
        mist: '#F7F8FB',
        coral: '#1E40AF',
        leaf: '#059669',
        sky: '#14B8A6',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(17, 24, 39, 0.08)',
        card: '0 16px 42px rgba(30, 64, 175, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
