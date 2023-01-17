/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/*.{html,js}", "./src/js/*.js"],
  theme: {
    fontFamily: {
      Roboto: "Roboto Condensed, sans-serif",
      iranSans: "iranSans",
    },
    container: {
      center: true,
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "973px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
