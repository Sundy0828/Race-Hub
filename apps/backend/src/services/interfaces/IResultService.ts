import { Context } from "../../context";
import { result as Result } from "@prisma/client";
import { IBaseService } from "./IBaseService";

export interface IResultService extends IBaseService<Result> {
  getByRaceId(raceId: number, context: Context): Promise<Result[]>;
}
