import { Context } from "../context";

// Add result to a race
export const addResult = async (
  args: { raceId: string; participant: string; time: number },
  context: Context
) => {
  return context.prisma.result.create({
    data: {
      raceId: parseInt(args.raceId),
      participant: args.participant,
      time: args.time,
    },
  });
};

// Get results by race ID
export const getResultsByRaceId = async (raceId: number, context: Context) => {
  return context.prisma.result.findMany({
    where: { raceId },
  });
};
