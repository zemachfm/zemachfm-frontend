

module.exports = {
  theme:{
    colors:{ 
      'th-primary': '#FFDE59',
      green: '#28A745',
    },

    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },

  // Removes unused css in production
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
