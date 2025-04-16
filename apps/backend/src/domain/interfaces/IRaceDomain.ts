import { IBaseDomain } from "./IBaseDomain";
import { race as Race } from "@prisma/client";

export interface IRaceDomain extends IBaseDomain<Race> {
  getAllByYear(year: string): Promise<Race[]>;
}
