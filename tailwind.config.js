/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/*.handlebars','./*/*/*.handlebars' ],
  theme: {
    extend: {},

  plugins: [
    require('@tailwindcss/forms'),
  ],
  
}}
