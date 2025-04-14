// src/theme/ThemeRegistry.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

const mode: "light" | "dark" = "light"; // Change to 'dark' to test dark mode

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
