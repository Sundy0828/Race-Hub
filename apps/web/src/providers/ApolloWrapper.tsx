// src/providers/ApolloWrapper.tsx
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useFirebaseAuth } from "./AuthContext";
import { createApolloClient } from "./createApolloClient";

interface Props {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: Props): React.ReactElement {
  const auth = useFirebaseAuth();
  const client = createApolloClient(auth?.token);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
