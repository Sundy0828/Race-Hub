import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { useFirebaseAuth } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: Props): React.ReactElement {
  const token = useFirebaseAuth(); // Get the Firebase ID token

  const httpLink = new HttpLink({
    uri: token
      ? `http://localhost:4000/graphql/query` // Authenticated endpoint
      : `http://localhost:4000/graphql/query`, // Unauthenticated endpoint
  });

  // Add the Firebase token to the Authorization header
  const authLink = setContext((_, { headers, ...context }) => {
    if (!token) {
      return { headers, ...context };
    }
    return {
      ...context,
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const retryLink = new RetryLink({
    attempts: {
      max: 3,
      retryIf: (error) => {
        if (error.networkError) {
          // Retry network errors, but only if they are not due to CORS or an HTTP status code >= 500
          return (
            error.networkError &&
            error.networkError.name !== "ServerError" &&
            error.networkError.statusCode < 500
          );
        }
        // Retry all other errors
        return !!error;
      },
    },
    delay: {
      initial: 200,
      max: 1000,
    },
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(retryLink).concat(httpLink),
    credentials: "include",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
