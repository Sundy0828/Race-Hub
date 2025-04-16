import { Context } from "../context";
import { IResultService } from "./interfaces/IResultService";
import { result as Result } from "@prisma/client";
import { IResultDomain } from "../domain/interfaces/IResultDomain";
import { Logger } from "../utils/Logger";
import { Guard } from "../utils/Guard";
export class ResultService implements IResultService {
  private resultDomain: IResultDomain;
  private logger: Logger;

  constructor(resultDomain: IResultDomain, logger: Logger) {
    this.resultDomain = resultDomain;
    this.logger = logger;
  }

  async getAll(): Promise<Result[]> {
    try {
      return await this.resultDomain.getAll();
    } catch (error) {
      this.logger.error("ResultService - getAll", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Result | null> {
    try {
      return await this.resultDomain.getById(id);
    } catch (error) {
      this.logger.error(`ResultService - getById (${id})`, error);
      throw error;
    }
  }

  async create(data: Partial<Result>): Promise<Result> {
    try {
      Guard.againstNull(data, "data");
      Guard.againstNegativeNumber(data.raceId, "raceId");
      Guard.againstNullOrWhitespace(data.participant, "participant");
      Guard.againstNegativeNumber(data.time, "time");

      const safeData = {
        raceId: data.raceId!,
        participant: data.participant!,
        time: data.time!,
      };

      return await this.resultDomain.create(safeData);
    } catch (error) {
      this.logger.error("ResultService - create", error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Result>): Promise<Result> {
    try {
      return await this.resultDomain.update(id, data);
    } catch (error) {
      this.logger.error(`ResultService - update (${id})`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.resultDomain.delete(id);
    } catch (error) {
      this.logger.error(`ResultService - delete (${id})`, error);
      throw error;
    }
  }

  async getByRaceId(raceId: number): Promise<Result[]> {
    try {
      return await this.resultDomain.getByRaceId(raceId);
    } catch (error) {
      this.logger.error(`ResultService - getByRaceId (${raceId})`, error);
      throw error;
    }
  }
}
