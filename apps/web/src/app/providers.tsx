"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthContext";
import { ApolloWrapper } from "@/providers/ApolloWrapper";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </AuthProvider>
  );
}
