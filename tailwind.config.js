/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unused-modules */
const colors = require('tailwindcss/colors');

module.exports = {
  // Removes unused css in production
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 3s linear infinite',
        marquee2: 'marquee2 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      colors: {
        primary: colors.emerald,
        secondary: colors.yellow,
        accent: colors.white,
      },
    },

    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active', 'dark', 'hover', 'focus', 'responsive'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
