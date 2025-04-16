import { IResultDao } from "./interfaces/IResultDao";
import { PrismaClient, result as Result } from "@prisma/client";
import { Logger } from "../utils/Logger";

export class ResultDao implements IResultDao {
  private context: PrismaClient;
  private logger: Logger;

  constructor(context: PrismaClient, logger: Logger) {
    this.context = context;
    this.logger = logger;
  }

  async getAll(): Promise<Result[]> {
    return this.context.result.findMany();
  }

  async getByRaceId(raceId: number): Promise<Result[]> {
    return this.context.result.findMany({ where: { raceId } });
  }

  async getById(id: number): Promise<Result | null> {
    return this.context.result.findUnique({ where: { id } });
  }

  create(data: Omit<Result, "id">): Promise<Result> {
    return this.context.result.create({ data });
  }

  async update(id: number, data: Partial<Result>): Promise<Result> {
    return this.context.result.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.context.result.delete({ where: { id } });
  }
}
