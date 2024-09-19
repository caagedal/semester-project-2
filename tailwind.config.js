/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,mjs}","./index.html","./listings/index.html"],
  theme: {
    extend: {
      fontFamily: {
        marcellus: [`Marcellus`, `serif`],
        "pt-serif": [`PT Serif`, `serif`],
      },
      colors: {
        "custom-green": `#303636`,
        "custom-orange": `#E17042`,
      }
    },
  },
  plugins: [],
}

