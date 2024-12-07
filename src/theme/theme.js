// Design color tokens
export const token = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "hsl(209, 23%, 22%)",
          200: "hsl(0, 0%, 100%)",
        },
        secondary: {
          100: "hsl(207, 26%, 17%)",
          200: "hsl(0, 0%, 98%)",
        },
        txt: {
          100: "hsl(0, 0%, 100%)",
          200: "hsl(200, 15%, 8%)",
        },
      }
    : {
        primary: {
          100: "hsl(0, 0%, 100%)",
          200: "hsl(209, 23%, 22%)",
        },
        secondary: {
          100: "hsl(0, 0%, 98%)",
          200: "hsl(207, 26%, 17%)",
        },
        txt: {
          100: "hsl(200, 15%, 8%)",
          200: "hsl(0, 0%, 100%)",
        },
      }),
});

// MUI theme settings
export const themeSettings = (mode) => {
  const colors = token(mode);

  return {
    palette: {
      mode,
      primary: {
        main: colors.primary[100],
      },
      secondary: {
        main: colors.secondary[100],
      },
      txt: {
        main: colors.txt[100],
      },
      background: {
        default: colors.secondary[100],
      },
    },
    typography: {
      fontFamily: ["regular", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["semi", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};