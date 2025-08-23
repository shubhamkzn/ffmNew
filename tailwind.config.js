/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      screens: {
        'customDesktop': '1024px',
         '3xl': '2560px',
        '4xl': '3840px',
      },
    },
    
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

