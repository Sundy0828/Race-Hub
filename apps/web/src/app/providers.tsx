"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth/AuthContext";
import { ApolloWrapper } from "@/providers/apollo/ApolloWrapper";
import ThemeRegistry from "@/providers/theme/ThemeRegistry";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ApolloWrapper>
        <ThemeRegistry>{children}</ThemeRegistry>
      </ApolloWrapper>
    </AuthProvider>
  );
}
