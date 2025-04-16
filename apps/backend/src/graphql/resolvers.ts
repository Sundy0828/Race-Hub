import { Context } from "../context";

export const resolvers = {
  Query: {
    races: async (_parent: any, _args: any, context: Context) => {
      return context.raceService.getAll();
    },
    race: async (_parent: any, args: { id: string }, context: Context) => {
      return context.raceService.getById(Number(args.id));
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
    result: async (_parent: any, args: { id: string }, context: Context) => {
      return context.resultService.getById(Number(args.id));
    },
    resultByRaceId: async (
      _parent: any,
      args: { id: string },
      context: Context
    ) => {
      return context.resultService.getByRaceId(Number(args.id));
    },
  },
  Mutation: {
    createRace: async (
      _parent: any,
      args: { name: string; date: string; location: string },
      context: Context
    ) => {
      return context.raceService.create({
        ...args,
        date: new Date(args.date),
      });
    },
    updateRace: async (
      _parent: any,
      args: { id: string; name?: string; date?: string; location?: string },
      context: Context
    ) => {
      const { id, ...rest } = args;

      return context.raceService.update(Number(id), {
        ...rest,
        date: rest.date ? new Date(rest.date) : undefined, // convert date string to Date
      });
    },
    deleteRace: async (
      _parent: any,
      args: { id: string },
      context: Context
    ) => {
      return context.raceService.delete(Number(args.id));
    },
    createResult: async (
      _parent: any,
      args: { raceId: string; participant: string; time: number },
      context: Context
    ) => {
      return context.resultService.create({
        ...args,
        raceId: Number(args.raceId),
      });
    },
    updateResult: async (
      _parent: any,
      args: { id: string; participant?: string; time?: number },
      context: Context
    ) => {
      const { id, ...rest } = args;

      return context.resultService.update(Number(id), rest);
    },
    deleteResult: async (
      _parent: any,
      args: { id: string },
      context: Context
    ) => {
      return context.resultService.delete(Number(args.id));
    },
  },
  Race: {
    results: async (parent: { id: string }, _args: any, context: Context) => {
      return context.resultService.getByRaceId(Number(parent.id));
    },
  },
  Result: {
    race: async (parent: { raceId: string }, _args: any, context: Context) => {
      return context.raceService.getById(Number(parent.raceId));
    },
  },
};
