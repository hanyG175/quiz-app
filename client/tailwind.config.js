/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your component files
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-light': 'bounce-light 1s infinite',
      },
    },
  },
  plugins: [],
};
