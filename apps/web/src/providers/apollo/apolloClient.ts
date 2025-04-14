import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createApolloClient } from "./createApolloClient";

export const getClient = (
  token?: string
): ApolloClient<NormalizedCacheObject> => {
  return createApolloClient(token);
};
