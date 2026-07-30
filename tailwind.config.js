import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 🟢 ۱. تعریف تمام Keyframeها در یک سطح
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

      // 🟢 ۲. تعریف تمام Animationهای Tailwind در یک سطح
      animation: {
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'border-beam': 'borderBeam 3s linear infinite', // 👈 کلاس animate-border-beam
        draw: 'draw 0.4s ease-in-out 0.15s forwards',
        ripple: 'ripple 1s ease-out infinite',
      },

      fontFamily: {
        'nexaBold': 'nexa bold',
        'nexa': 'nexa light',
        'jazoor': 'jazoor',
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    }),
  ],
};