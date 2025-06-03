/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        custom900: "900px", // 👈 This must exist
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateX(200px) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(200px) rotate(-360deg)',
          },
        },
      },
      animation: {
        orbit: 'orbit 10s linear infinite',
      },
    },
    
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],

 module.exports = {
  theme: {
    extend: {
      animation: {
        slideInRight: 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        slideInRight: {
          'from': { 
            transform: 'translateX(100%)',
            opacity: '0',
          },
          'to': { 
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
}
  
};
// tailwind.config.js