// tailwind.config.js
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1ed760',
          'green-hover': '#1fdf64',
          'green-dark': '#1db954',
          base: '#121212',
          surface: '#181818',
          elevated: '#242424',
          highlight: '#2a2a2a',
          muted: '#a7a7a7',
          subtext: '#b3b3b3',
        },
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        borderBeam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        draw: {
          'to': { strokeDashoffset: '0' },
        },
        ripple: {
          '0%': { width: '0', height: '0', opacity: '1' },
          '100%': { width: '100%', height: '100%', opacity: '0' },
        },
      },
      animation: {
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'border-beam': 'borderBeam 3s linear infinite',
        draw: 'draw 0.4s ease-in-out 0.15s forwards',
        ripple: 'ripple 1s ease-out infinite',
      },
      fontFamily: {
        nexaBold: 'nexa bold',
        nexa: 'nexa light',
        jazoor: 'jazoor',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }),
  ],
};