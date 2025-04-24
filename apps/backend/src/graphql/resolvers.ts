import { Context } from "../context";

export const resolvers = {
  Query: {
    races: async (_parent: any, _args: any, context: Context) => {
      return context.raceService.getAll();
    },
    race: async (_parent: any, args: { id: number }, context: Context) => {
      return context.raceService.getById(args.id);
    },
    racesByYear: async (
      _parent: any,
      args: { year: string },
      context: Context
    ) => {
      return context.raceService.getAllByYear(args.year);
    },
    results: async (_parent: any, _args: any, context: Context) => {
      return context.resultService.getAll();
    },
    result: async (_parent: any, args: { id: number }, context: Context) => {
      return context.resultService.getById(args.id);
    },
    resultByRaceId: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.resultService.getByRaceId(args.id);
    },
  },
  Mutation: {
    createRace: async (
      _parent: any,
      args: { input: { name: string; date: string; location: string } },
      context: Context
    ) => {
      const { input } = args;
      return context.raceService.create({
        ...input,
        date: new Date(input.date),
      });
    },
    updateRace: async (
      _parent: any,
      args: {
        id: number;
        input: { name?: string; date?: string; location?: string };
      },
      context: Context
    ) => {
      const { id, input } = args;
      return context.raceService.update(id, {
        ...input,
        date: input.date ? new Date(input.date) : undefined,
      });
    },
    deleteRace: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      context.raceService.delete(args.id);
      return true;
    },
    createResult: async (
      _parent: any,
      args: { input: { raceId: number; participant: string; time: number } },
      context: Context
    ) => {
      return context.resultService.create(args.input);
    },
    updateResult: async (
      _parent: any,
      args: { id: number; input: { participant?: string; time?: number } },
      context: Context
    ) => {
      return context.resultService.update(args.id, args.input);
    },
    deleteResult: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      context.resultService.delete(args.id);
      return true;
    },
  },
  Race: {
    results: async (parent: { id: number }, _args: any, context: Context) => {
      return context.resultService.getByRaceId(parent.id);
    },
  },
  Result: {
    race: async (parent: { raceId: number }, _args: any, context: Context) => {
      return context.raceService.getById(parent.raceId);
    },
  },
};
