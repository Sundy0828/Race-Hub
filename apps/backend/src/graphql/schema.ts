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
    racesByYear(year: String!): [Race!]!
    results: [Result!]!
    result(id: Int!): Result
    resultByRaceId(id: Int!): [Result!]!
  }

  type Mutation {
    createRace(name: String!, date: String!, location: String!): Race!
    updateRace(id: Int!, name: String, date: String, location: String): Race!
    deleteRace(id: Int!): Boolean!
    createResult(raceId: Int!, participant: String!, time: Int!): Result!
    updateResult(id: Int!, participant: String, time: Int): Result!
    deleteResult(id: Int!): Boolean!
  }
`;
