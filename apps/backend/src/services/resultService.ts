import * as ResultDomain from "../domain/resultDomain";
import { Context } from "../context";

export class ResultService {
  async addResult(
    args: { raceId: string; participant: string; time: number },
    context: Context
  ) {
    const parsedRaceId = parseInt(args.raceId);
    if (isNaN(parsedRaceId)) {
      throw new Error("Invalid race ID");
    }
    if (!args.participant || !args.time) {
      throw new Error("Missing participant or time");
    }
    return ResultDomain.addResult(args, context);
  }

  async getResultsByRaceId(raceId: string, context: Context) {
    const parsedId = parseInt(raceId);
    if (isNaN(parsedId)) {
      throw new Error("Invalid race ID");
    }
    return ResultDomain.getResultsByRaceId(parsedId, context);
  }
}
