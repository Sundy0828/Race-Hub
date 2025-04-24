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

const darkThemeOptions: ThemeOptions = {
  ...commonThemeOptions,
  palette: {
    ...commonThemeOptions.palette,
    background: {
      paper: "#232a31",
      default: "#101417",
    },
    mode: "dark",
  },
};

const lightThemeOptions: ThemeOptions = {
  ...commonThemeOptions,
  palette: {
    ...commonThemeOptions.palette,
    background: {
      paper: "#edf0f2",
      default: "#ffffff",
    },
    mode: "light",
  },
};

export const getTheme = (mode: "light" | "dark") =>
  createTheme(mode === "light" ? lightThemeOptions : darkThemeOptions);
