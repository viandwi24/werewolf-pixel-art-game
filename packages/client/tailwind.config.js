const myColors = {
  purple: {
    DEFAULT: '#7042FD',
    '50': '#F9F8FF',
    '100': '#EAE3FF',
    '200': '#CCBBFE',
    '300': '#AD93FE',
    '400': '#8F6AFD',
    '500': '#7042FD',
    '600': '#460AFC',
    '700': '#3402CD',
    '800': '#260295',
    '900': '#18015E'
  },
  pink: {
    DEFAULT: '#FC6399',
    '50': '#FFFFFF',
    '100': '#FFFFFF',
    '200': '#FEDBE8',
    '300': '#FEB3CD',
    '400': '#FD8BB3',
    '500': '#FC6399',
    '600': '#FB2C75',
    '700': '#EA0556',
    '800': '#B30341',
    '900': '#7C022D'
  },
  blue: {
    DEFAULT: '#4576C5',
    '50': '#D1DDF1',
    '100': '#C1D2EC',
    '200': '#A2BBE2',
    '300': '#83A4D8',
    '400': '#648DCF',
    '500': '#4576C5',
    '600': '#325CA0',
    '700': '#254375',
    '800': '#172B4A',
    '900': '#0A1220'
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': myColors.purple,
        'purple': myColors.purple,
        'pink': myColors.pink,
        'blue': myColors.blue
      }
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(purple|pink|primary|blue)-(100|200|300|400|500|600|700|800|900)/
  }]
}
