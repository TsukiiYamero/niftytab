/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      'font-size-small': 'var(--font-size-small)'
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui({
    defaultTheme: 'dark',
    defaultExtendTheme: 'dark'
  })]
};
