// /js/tailwind-config.js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        dark: "var(--dark)",
        grayish: "var(--grayish)",
        redish: "var(--redish)",
        yellowish: "var(--yellowish)",
        pinkish: "var(--pinkish)",
        ink: "var(--ink)",
        ink2: "var(--ink2)",
      },
      boxShadow: {
        retro: "6px 8px 0 var(--ink2)",
        'retro-lg': "8px 10px 0 var(--ink2)",
        'retro-sm': "3px 4px 0 var(--ink2)",
      },
      borderRadius: {
        retro: "18px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.2,.9,.2,1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
      },
    },
  },
  plugins: [],
};
