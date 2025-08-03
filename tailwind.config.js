/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        'shadows-into-light': ['Shadows Into Light', 'cursive'],
      },
      keyframes: {
        // Animación para las pequeñas "piezas" que vuelan hacia el centro (EXISTENTE)
        pieceFlyIn: {
          '0%': { transform: 'translate(var(--tw-translate-x-start, 0), var(--tw-translate-y-start, 0)) rotate(var(--tw-rotate-start, 0deg)) scale(var(--tw-scale-start, 1))', opacity: '0' },
          '70%': { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { opacity: '0' },
        },
        // Animación para la estrella principal: crece y luego pulsa (EXISTENTE)
        starPulseGrow: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Animación de pulso continuo (EXISTENTE)
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // Animación para que el texto aparezca como si se estuviera escribiendo (EXISTENTE)
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        // NOTA: 'pencil-draw' keyframe ha sido eliminado
      },
      animation: {
        'piece-fly-in': 'pieceFlyIn 1s ease-out forwards',
        'star-pulse-grow': 'starPulseGrow 0.5s ease-out forwards, pulse 1.5s infinite 0.5s',
        // Duración de la escritura del lema (se ajusta dinámicamente en el componente) (EXISTENTE)
        typing: 'typing var(--typing-duration) steps(var(--typing-steps), end) forwards',
        // NOTA: 'pencil-draw-animation' ha sido eliminado
      },
    },
  },
  plugins: [],
}
