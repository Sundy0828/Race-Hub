import { IBaseDao } from "./IBaseDao";
import { result as Result } from "@prisma/client";

export interface IResultDao extends IBaseDao<Result> {
  getByRaceId(raceId: number): Promise<Result[]>;
}
