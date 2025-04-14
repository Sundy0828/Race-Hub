import { Context } from "../context";

// Get all races
export const getAllRaces = async (context: Context) => {
  return context.prisma.race.findMany();
};

export const getAllRacesByYear = async (year: string, context: Context) => {
  return context.prisma.race.findMany({
    where: {
      date: {
        gte: new Date(`${year}-01-01T00:00:00.000Z`),
        lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
      },
    },
  });
};

// Get a race by ID
export const getRaceById = async (id: number, context: Context) => {
  return context.prisma.race.findUnique({
    where: { id },
  });
};

// Create a new race
export const createRace = async (
  args: { name: string; date: string; location: string },
  context: Context
) => {
  return context.prisma.race.create({
    data: {
      name: args.name,
      date: new Date(args.date),
      location: args.location,
    },
  });
};
