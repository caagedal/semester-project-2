/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,mjs}","./index.html"],
  theme: {
    extend: {
      fontFamily: {
        marcellus: [`Marcellus`, `serif`],
        "pt-serif": [`PT Serif`, `serif`]
      }
    },
  },
  plugins: [],
}

