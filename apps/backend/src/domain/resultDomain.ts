import * as ResultDao from "../dao/resultDao";
import { Context } from "../context";

export const addResult = async (
  args: { raceId: string; participant: string; time: number },
  context: Context
) => {
  return ResultDao.addResult(args, context);
};

export const getResultsByRaceId = async (raceId: number, context: Context) => {
  return ResultDao.getResultsByRaceId(raceId, context);
};
