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

  input CreateRaceInput {
    name: String!
    date: String!
    location: String!
  }

  input UpdateRaceInput {
    name: String
    date: String
    location: String
  }

  input CreateResultInput {
    raceId: Int!
    participant: String!
    time: Int!
  }

  input UpdateResultInput {
    participant: String
    time: Int
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
    createRace(input: CreateRaceInput!): Race!
    updateRace(id: Int!, input: UpdateRaceInput!): Race!
    deleteRace(id: Int!): Boolean!
    createResult(input: CreateResultInput!): Result!
    updateResult(id: Int!, input: UpdateResultInput!): Result!
    deleteResult(id: Int!): Boolean!
  }
`;
