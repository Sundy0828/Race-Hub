import * as RaceDao from "../dao/raceDao";
import { Context } from "../context";

export const getAllRaces = async (context: Context) => {
  return RaceDao.getAllRaces(context);
};

export const getRaceById = async (id: number, context: Context) => {
  return RaceDao.getRaceById(id, context);
};

export const createRace = async (
  args: { name: string; date: string; location: string },
  context: Context
) => {
  return RaceDao.createRace(args, context);
};
