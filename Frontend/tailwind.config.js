module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    mode: 'all',
    content: ['./public/index.html', './src/**/*.svelte'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      dark: {
        500: '#000000',
        400: '#000022',
        300: '#000044',
        200: '#000066',
        100: '#000099',
      },
      white: {
        300: '#21243f',
        200: '#ff0',
        100: '#fff',
      },
      notifier: {
        'danger': '#ff0000',
        'success': '#00ff0d',
        'info': '#ff0'
      }
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

     '3xl': '0 35px 60px -15px rgba(255, 255, 255, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
