/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{
    'ssm':'512px',
    // => @media (min-width: 480px) { ... }
    'sm': '640px',
    // => @media (min-width: 640px) { ... }
    'smd':'700px',
    // => @media (min-width: 700px) { ... }
    'md': '768px',
    // => @media (min-width: 768px) { ... }
    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }
    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }
    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
    '3xl':'1782px',
    // => @media (min-width: 1782px) { ... }
  },
    extend: {},
  },
  plugins: [],
}

