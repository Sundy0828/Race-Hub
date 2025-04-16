import { IRaceDomain } from "./interfaces/IRaceDomain";
import { race as Race } from "@prisma/client";
import { Logger } from "../utils/Logger";
import { IRaceDao } from "../dao/interfaces/IRaceDao";

export class RaceDomain implements IRaceDomain {
  private raceDao: IRaceDao;
  private logger: Logger;

  constructor(raceDao: IRaceDao, logger: Logger) {
    this.raceDao = raceDao;
    this.logger = logger;
  }

  async getAll(): Promise<Race[]> {
    this.logger.log("Fetching all races");
    return this.raceDao.getAll();
  }

  async getAllByYear(year: string): Promise<Race[]> {
    this.logger.log(`Fetching races for year: ${year}`);
    return this.raceDao.getAllByYear(year);
  }

  async getById(id: number): Promise<Race | null> {
    this.logger.log(`Fetching race with id: ${id}`);
    return this.raceDao.getById(id);
  }

  async create(data: Omit<Race, "id">): Promise<Race> {
    this.logger.log("Creating a new race", data);
    return this.raceDao.create(data);
  }

  async update(id: number, data: Partial<Race>): Promise<Race> {
    this.logger.log(`Updating race with id: ${id}`, data);
    return this.raceDao.update(id, data);
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting race with id: ${id}`);
    return this.raceDao.delete(id);
  }
}
