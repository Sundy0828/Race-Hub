import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  //   path: "/graphql",
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`);
});
