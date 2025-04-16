import { race as Race } from "@prisma/client";
import { IBaseDao } from "./IBaseDao";

export interface IRaceDao extends IBaseDao<Race> {
  getAllByYear(year: string): Promise<Race[]>;
}
