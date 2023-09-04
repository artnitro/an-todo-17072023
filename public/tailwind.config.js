/** @type {import('tailwindcss').Config} */

/**
* TODO: 
* He puesto de forma general una imagen de fondo.
* La propuesta inicial es que el usuario pueda establecer 
* una imagen de fondo a su gusto, ya sea, subirla a la aplicación y establecer 
* dicha imagen o de un grupo de imágenes que haya subido previamente.
*/

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'anDesktopImage': "url('src/assets/img/bg-desktop.jpg')"
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/typography')
],
};
