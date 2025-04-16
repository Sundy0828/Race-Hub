import { IRaceDao } from "./interfaces/IRaceDao";
import { PrismaClient, race as Race } from "@prisma/client";
import { Logger } from "../utils/Logger";

export class RaceDao implements IRaceDao {
  private context: PrismaClient;
  private logger: Logger;

  constructor(context: PrismaClient, logger: Logger) {
    this.context = context;
    this.logger = logger;
  }

  async getAll(): Promise<Race[]> {
    return this.context.race.findMany();
  }

  async getAllByYear(year: string): Promise<Race[]> {
    return this.context.race.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });
  }

  async getById(id: number): Promise<Race | null> {
    return this.context.race.findUnique({ where: { id } });
  }

  create(data: Omit<Race, "id">): Promise<Race> {
    return this.context.race.create({ data });
  }

  update(id: number, data: Partial<Race>): Promise<Race> {
    return this.context.race.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.context.race.delete({ where: { id } });
  }
}
