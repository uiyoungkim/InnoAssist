/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'text': {
        50: '#f2f2f2',
        100: '#e6e6e6',
        200: '#cccccc',
        300: '#b3b3b3',
        400: '#999999',
        500: '#808080',
        600: '#666666',
        700: '#4d4d4d',
        800: '#333333',
        900: '#1a1a1a',
        950: '#0d0d0d',
      },
      'background': {
        50: '#edf0f7',
        100: '#dce2ef',
        200: '#b8c5e0',
        300: '#95a8d0',
        400: '#718ac1',
        500: '#4e6db1',
        600: '#3e578e',
        700: '#2f426a',
        800: '#1f2c47',
        900: '#101623',
        950: '#080b12',
      },
      'primary': {
        50: '#eee6fe',
        100: '#ddcefd',
        200: '#bb9dfb',
        300: '#986bfa',
        400: '#763af8',
        500: '#5409f6',
        600: '#4307c5',
        700: '#320594',
        800: '#220462',
        900: '#110231',
        950: '#080119',
      },
      'secondary': {
        50: '#f2f0f4',
        100: '#e4e2e9',
        200: '#c9c5d3',
        300: '#afa8bd',
        400: '#948ba7',
        500: '#796e91',
        600: '#615874',
        700: '#494257',
        800: '#302c3a',
        900: '#18161d',
        950: '#0c0b0f',
      },
      'accent': {
        50: '#f1f0f5',
        100: '#e4e1ea',
        200: '#c9c3d5',
        300: '#aea5c0',
        400: '#9387ab',
        500: '#786996',
        600: '#605478',
        700: '#483f5a',
        800: '#302a3c',
        900: '#18151e',
        950: '#0c0a0f',
      },

    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
