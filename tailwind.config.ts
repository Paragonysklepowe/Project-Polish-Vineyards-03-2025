import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        wine: {
          primary: '#6B2737',
          secondary: '#A64253',
          accent: '#E8C547',
          background: '#F5F5F5',
          text: '#2C2C2C',
          light: '#F8E9D0',
          dark: '#3D1E1E'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
