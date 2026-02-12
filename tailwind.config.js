import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {


    extend: {

    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    }),
  ],
};
