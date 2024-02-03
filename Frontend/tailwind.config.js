/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        black1: "#00040f",
        textwhite: "rgba(255, 255, 255, 0.7)",
        textblue: "rgba(9, 151, 124, 0.1)",

        brightgreen: '#7FFFD4',
        brightblue: '#00f6ff',

        coral1: '#FFC3B7',
        coral2: '#FFAA9C',
        coral3: '#E0705B',
        coral4: '#FF7F50',

        yellow1: '#FFD700',
        yellow2: '#FFD68C',
        yellow3: '#FFEEAD',
        
        blue1: '#0058CC',
        blue2: '#0077FF',
        blue3: '#3399FF',
        blue4: '#66BBFF',
        blue5: '#99DDFF',
        blue6: '#CCEEFF',

        coral: '#AEEEEE',
        coral2: '#40E0D0',
        coral3: '#00CED1',
        
        grey1: '#F5F5F5',
        grey2: '#E0E0E0',
        grey3: '#CCCCCC',
        grey4: '#999999',
        grey5: '#666666',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'fira-code': ['Fira Code', 'monospace']
      },
      fontSize: {
        '12px': '0.75rem',
        '14px': '0.875rem',
        '16px': '1rem',
        '18px': '1.125rem',
        '20px': '1.25rem',
        '24px': '1.5rem',
        '32px': '2rem',
        // Add more custom font sizes as needed
      },

    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}