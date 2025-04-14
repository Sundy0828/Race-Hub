import * as RaceDomain from "../domain/raceDomain";
import { Context } from "../context";

export class RaceService {
  async getAllRaces(context: Context) {
    return RaceDomain.getAllRaces(context);
  }

  async getAllRacesByYear(year: string, context: Context) {
    return RaceDomain.getAllRacesByYear(year, context);
  }

  async getRaceById(id: string, context: Context) {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      throw new Error("Invalid race ID");
    }
    return RaceDomain.getRaceById(parsedId, context);
  }

  async createRace(
    args: { name: string; date: string; location: string },
    context: Context
  ) {
    if (!args.name || !args.date || !args.location) {
      throw new Error("Missing required fields");
    }
    return RaceDomain.createRace(args, context);
  }
}
