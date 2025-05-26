/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        custom900: "900px", // 👈 This must exist
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
// tailwind.config.js