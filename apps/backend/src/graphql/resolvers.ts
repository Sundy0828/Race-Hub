import { Context } from "../context";
import { RaceService } from "../services/raceService";
import { ResultService } from "../services/resultService";

const raceService = new RaceService();
const resultService = new ResultService();

export const resolvers = {
  Query: {
    races: async (_parent: any, _args: any, context: Context) => {
      return raceService.getAllRaces(context);
    },
    race: async (_parent: any, args: { id: string }, context: Context) => {
      return raceService.getRaceById(args.id, context);
    },
  },
  Mutation: {
    createRace: async (
      _parent: any,
      args: { name: string; date: string; location: string },
      context: Context
    ) => {
      return raceService.createRace(args, context);
    },
    addResult: async (
      _parent: any,
      args: { raceId: string; participant: string; time: number },
      context: Context
    ) => {
      return resultService.addResult(args, context);
    },
  },
  Race: {
    results: async (parent: { id: string }, _args: any, context: Context) => {
      return resultService.getResultsByRaceId(parent.id, context);
    },
  },
  Result: {
    race: async (parent: { raceId: string }, _args: any, context: Context) => {
      return raceService.getRaceById(parent.raceId, context);
    },
  },
};
