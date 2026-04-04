/** @type {import('tailwindcss').Config} */

function c(v) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgba(var(${v}), ${opacityValue})`
      : `rgb(var(${v}))`;
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: c('--c-bg'), card: c('--c-bg-card'), elevated: c('--c-bg-elevated') },
        border: { DEFAULT: c('--c-border'), hover: c('--c-border-hover') },
        content: { primary: c('--c-text-primary'), secondary: c('--c-text-secondary'), muted: c('--c-text-muted') },
        accent: { DEFAULT: c('--c-accent'), hover: c('--c-accent-hover') },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Inter"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
