/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['roboto-regular'],
        oswald: ['oswald-regular'],
      }
    },
  },
  plugins: [
    import('@tailwindcss/aspect-ratio'),
    import('@tailwindcss/forms'),
    import('@tailwindcss/typography'),
  ],
};
