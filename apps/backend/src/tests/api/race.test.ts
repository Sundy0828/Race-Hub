import request from "supertest";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

let httpServer: any;

beforeAll(async () => {
  const { url } = await server.listen({ port: 0 });
  httpServer = url;
});

afterAll(async () => {
  await server.stop();
});

test("can create a race via GraphQL", async () => {
  const response = await request(httpServer)
    .post("/")
    .send({
      query: `
        mutation {
          createRace(name: "Test 10K", date: "2025-05-01T08:00:00Z", location: "PA") {
            id
            name
            location
          }
        }
      `,
    });

  expect(response.body.data.createRace.name).toBe("Test 10K");
});
