// src/theme/theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#59A1D0",
    },
    secondary: {
      main: "#D05959",
    },
    info: {
      main: "#59A1D0",
    },
    success: {
      main: "#59D0A1",
    },
    warning: {
      main: "#D0D059",
    },
    error: {
      main: "#D05959",
    },
  },
  spacing: 8,
};

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    ...commonThemeOptions,
    palette: {
      ...commonThemeOptions.palette,
      mode,
    },
  });
