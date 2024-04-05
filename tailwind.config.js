/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  themes: {
    fontSize: {
      'font-size-small': 'var(--font-size-small)'
    },
    light: {
      colors: {
        primary: {
          foreground: '#ba68c8'
        }
      }
    },
    dark: {
      colors: {
        primary: {
          foreground: '#ba68c8'
        }
      }
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui({
    defaultTheme: 'dark',
    defaultExtendTheme: 'dark'
  })]
};
