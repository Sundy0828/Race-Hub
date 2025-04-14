import { gql } from "apollo-server";

export const typeDefs = gql`
  type Race {
    id: Int!
    name: String!
    date: String!
    location: String!
    results: [Result]
  }

  type Result {
    id: Int!
    participant: String!
    time: Int!
    race: Race!
  }

  type Query {
    races: [Race!]!
    race(id: Int!): Race
    racesByYear(year: Int!): [Race!]!
  }

  type Mutation {
    createRace(name: String!, date: String!, location: String!): Race!
    addResult(raceId: Int!, participant: String!, time: Int!): Result!
  }
`;
