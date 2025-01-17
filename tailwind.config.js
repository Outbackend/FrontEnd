/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      zIndex: {
        "99": "99",
        "88": "88",
      },
      opacity: {
        "55": ".55"
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(300px, 300px))',
      },
    },
  },
  plugins: [],
}

