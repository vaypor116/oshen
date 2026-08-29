/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1720",
        ink2: "#16212B",
        ink3: "#1E2E3A",
        ink4: "#26394A",
        line: "#2B3F4D",
        lineSoft: "#22323E",
        teal: "#2FB8A6",
        teal2: "#5ED4C4",
        tealDim: "#153631",
        gold: "#D4A94F",
        gold2: "#E8C77A",
        goldDim: "#3A2F16",
        verified: "#5FAE7C",
        verifiedDim: "#1E3A2A",
        danger: "#D96A6A",
        dangerDim: "#3A2222",
        bone: "#EAF2F0",
        boneDim: "#93A6A2",
        boneFaint: "#5E706C",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "none" },
        },
      },
      animation: {
        riseIn: "riseIn .25s ease both",
      },
    },
  },
  plugins: [],
};
