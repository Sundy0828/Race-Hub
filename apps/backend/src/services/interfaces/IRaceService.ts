import { Context } from "../../context";
import { race as Race } from "@prisma/client";
import { IBaseService } from "./IBaseService";

export interface IRaceService extends IBaseService<Race> {
  getAllByYear(year: string, context: Context): Promise<Race[]>;
}
