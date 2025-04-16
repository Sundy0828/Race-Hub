import { IBaseDomain } from "./IBaseDomain";
import { result as Result } from "@prisma/client";

export interface IResultDomain extends IBaseDomain<Result> {
  getByRaceId(raceId: number): Promise<Result[]>;
}
