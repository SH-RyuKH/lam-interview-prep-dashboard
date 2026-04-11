/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'flip-forward': 'flipForward 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        'flip-backward': 'flipBackward 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
      },
      keyframes: {
        flipForward: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        flipBackward: {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
