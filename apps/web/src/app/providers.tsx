"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth/AuthContext";
import { ApolloWrapper } from "@/providers/apollo/ApolloWrapper";
import ThemeRegistry from "@/providers/theme/ThemeRegistry";
import { SnackbarProvider } from "@/providers/snackbar/SnackbarContext";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ApolloWrapper>
        <ThemeRegistry>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeRegistry>
      </ApolloWrapper>
    </AuthProvider>
  );
}
