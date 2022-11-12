/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        100: "26rem",
        110: "29rem",
        120: "31rem",
        150: "39rem",
        160: "41rem",
        200: "52rem",
      },
    },
  },
  plugins: [],
};
