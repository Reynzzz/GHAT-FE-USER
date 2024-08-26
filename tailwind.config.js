import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // Disable dark mode
  theme: {
    extend: {
      backgroundImage: {
        "back-mobile": "url('./src/assets/images/Back_mobile.svg')",
        "bg-log": "url('./src/assets/images/bg_log.jpg')",
      },
    },
    screens: {
      xs: "300px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1236px",
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: false, // Disable DaisyUI's dark mode themes
  },
};
