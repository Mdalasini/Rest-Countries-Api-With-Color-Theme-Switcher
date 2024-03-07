module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      'sm': '430px',
      // => @media (min-width: 430px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    colors : {
      'dark-mode': {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue': 'hsl(207, 26%, 17%)',
      },
      'light-mode': {
        'dark-blue': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light-gray': 'hsl(0, 0%, 98%)'
      },
      'neutral': {
        'white': 'hsl(0, 0%, 100%)'
      }
    },
    fontFamily: {
      sans: ['"Nunito Sans"', 'sans-serif']
    },
    fontWeight: {
      'light': '300',
      'normal': '600',
      'bold': '800'
    },
    extend: {
      
    },
  },
  plugins: [],
}
