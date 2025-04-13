import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";

export const createApolloClient = (
  token?: string | null
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql/query",
    fetch, // Required for SSR compatibility
  });

  const authLink = setContext((_, { headers }) => {
    if (!token) return { headers };
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const retryLink = new RetryLink({
    attempts: {
      max: 3,
      retryIf: (error) => !!error,
    },
    delay: {
      initial: 200,
      max: 1000,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(retryLink).concat(httpLink),
    credentials: "include",
  });
};
