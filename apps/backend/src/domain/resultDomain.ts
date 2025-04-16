// domain/resultDomain.ts
import { result as Result } from "@prisma/client";
import { IResultDomain } from "./interfaces/IResultDomain";
import { Logger } from "../utils/Logger";
import { IResultDao } from "../dao/interfaces/IResultDao";

export class ResultDomain implements IResultDomain {
  private resultDao: IResultDao;
  private logger: Logger;

  constructor(resultDao: IResultDao, logger: Logger) {
    this.resultDao = resultDao;
    this.logger = logger;
  }

  async getAll(): Promise<Result[]> {
    this.logger.log("Fetching all results");
    return this.resultDao.getAll();
  }

  async getById(id: number): Promise<Result | null> {
    this.logger.log(`Fetching result by ID: ${id}`);
    return this.resultDao.getById(id);
  }

  async create(data: Omit<Result, "id">): Promise<Result> {
    this.logger.log("Creating a new result", data);
    return this.resultDao.create(data);
  }

  async update(id: number, data: Partial<Result>): Promise<Result> {
    this.logger.log(`Updating result ID ${id}`, data);
    return this.resultDao.update(id, data);
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting result ID ${id}`);
    return this.resultDao.delete(id);
  }

  async getByRaceId(raceId: number): Promise<Result[]> {
    this.logger.log(`Fetching results for race ID ${raceId}`);
    return this.resultDao.getByRaceId(raceId);
  }
}
