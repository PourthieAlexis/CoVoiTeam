/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      boxShadow: {
        shadowLoginForm: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        shadowLoginInput: "6px 6px 13px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        inter: ["Inter", "sans"],
        ArchivoNarrow: ["Archivo Narrow"],
      },
      colors: {
        primary: {
          light: "#4da6ff",
          DEFAULT: "#018383",
          dark: "#0066cc",
        },
        secondary: {
          light: "#f39e58",
          DEFAULT: "#E9B824",
          dark: "#bf5d0d",
        },
        green: {
          DEFAULT: "#018383",
        },
        background: {
          DEFAULT: "#0C2156",
        },
        textcard: {
          DEFAULT: "#BBBBBB",
        },
        backgroundcard: {
          DEFAULT: "rgba(242, 242, 242, 0.8)",
        },
        yellow: {
          DEFAULT: "#E9B824",
        },
        blue: {
          DEFAULT: "#0C2156",
        },
        gray: {
          DEFAULT: "rgba(242, 242, 242, 0.8)",
          dark: "#5d5d5d",
        },
        shadow: {
          DEFAULT: "rgba(0, 0, 0, 0.25)",
        },
        navbar: "#0C2156",
        navbarGreen: "#49B170",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
