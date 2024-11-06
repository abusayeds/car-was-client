/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodyfont: ["Poppins", "sans-serif"],
        titlefont: ["Montserrat", "sans-serif"],
      },
      colors: {
        bodyColor: "#212428",
        lightText: "#c4cfde",
        boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
        deleteColor: "#ff014f",
        designColor: "#1a7bc7",
      },
      scrollbar: {
        hide: {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&": {
            "-ms-overflow-style": "none",
          },
        },
        DEFAULT: {
          width: "4px",
          "background-color": "#f1f1f1",
        },
        thumb: {
          "background-color": "blue",
          borderRadius: "4px",
        },
      },
    },
  },
  variants: {
    scrollbar: ["rounded-md"],
  },
  plugins: [
    require("tailwind-scrollbar"),

    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#9ca3af #e5e7eb", // Thumb and Track colors
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          background: "#e5e7eb", // Track color
          borderRadius: "10px", // Rounded track
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          backgroundColor: "#9ca3af", // Thumb color
          borderRadius: "10px", // Rounded thumb
        },
      };

      // Add the new utilities for the thin scrollbar
      addUtilities(newUtilities);

      // Add the hide scrollbar utilities
      addUtilities({
        ".hide-scrollbar": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
