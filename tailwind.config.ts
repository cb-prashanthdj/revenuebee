import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "shade-teal": {
          50: "#e6f4f7", // Lightest
          100: "#cce8ef",
          200: "#99d1de",
          300: "#66bacd",
          400: "#33a3bd",
          500: "#012A38", // Default (Base Color without Opacity)
          600: "#012430", // Slightly darker
          700: "#011d28",
          800: "#011720",
          900: "#000f18", // Darkest
        },
        "shade-red": {
          50: "#ffe8e4", // Lightest
          100: "#ffd1c9",
          200: "#ffa595",
          300: "#ff7a61",
          400: "#ff4e2d",
          500: "#e93406", // Default
          600: "#c52e05",
          700: "#a12805",
          800: "#831d04", // Darkest
          900: "#5e1503",
        },
        "shade-neutral": {
          50: "#f5f7f8", // Lightest
          100: "#e6ebee",
          200: "#d6dde2",
          300: "#c7d0d5",
          400: "#aeb8be",
          500: "#97a0a6", // Default
          600: "#828a8f",
          700: "#6c7478",
          800: "#585f61", // Darkest
          900: "#42484b",
        },
        "shade-lime": {
          50: "#f4ffd4", // Lightest
          100: "#e9ffab",
          200: "#d7ff80",
          300: "#c5ff55",
          400: "#b5f930",
          500: "#bff90b", // Default
          600: "#a6d009",
          700: "#8ea807",
          800: "#748105", // Darkest
          900: "#595f03",
        },
        "shade-aqua": {
          50: "#f1f7f8", // Very light, nearly white with a hint of cyan
          100: "#d3e4e6", // Soft light cyan (lighter than the base)
          200: "#a2c1c4", // Base color (light grayish cyan)
          300: "#7fa6a8", // Slightly darker, more saturated cyan
          400: "#5c8a8d", // More intense cyan
          500: "#417075", // Deeper cyan, still muted
          600: "#315c5f", // Darker cyan with a hint of blue
          700: "#234848", // Deep muted teal
          800: "#173939", // Almost dark teal with muted tones
          900: "#0f2a2b", // Very dark, desaturated cyan (almost black)
        },
      },
      animation: {
        slide: "slide 2s ease-in-out infinite", // Animation duration and infinite loop
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" }, // Start off-screen to the left
          "100%": { transform: "translateX(200%)" }, // Move 200% to the right (beyond the right edge)
        },
      },
      height: {
        xsmall: "1.25rem",
        small: "1.75rem",
        regular: "2.25rem",
        large: "2.5rem",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "monospace"],
      },
    },
  },

  plugins: [
    require("cb-sting"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".mask-custom": {
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          "-webkit-mask":
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          "mask-composite": "exclude",
          "-webkit-mask-composite": "destination-out",
        },
        ".scrollbar-hide": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
export default config;
