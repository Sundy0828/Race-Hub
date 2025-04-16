import { IRaceService } from "./interfaces/IRaceService";
import { IRaceDomain } from "../domain/interfaces/IRaceDomain";
import { race as Race } from "@prisma/client";
import { Logger } from "../utils/Logger";
import { Guard } from "../utils/Guard";

export class RaceService implements IRaceService {
  constructor(
    private readonly raceDomain: IRaceDomain,
    private readonly logger: Logger
  ) {}

  async getAll(): Promise<Race[]> {
    try {
      return await this.raceDomain.getAll();
    } catch (error) {
      this.logger.error("RaceService - getAll", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Race | null> {
    try {
      return await this.raceDomain.getById(id);
    } catch (error) {
      this.logger.error(`RaceService - getById (${id})`, error);
      throw error;
    }
  }

  async create(data: Partial<Race>): Promise<Race> {
    try {
      Guard.againstNull(data, "data");
      Guard.againstNullOrWhitespace(data.name, "name");
      Guard.againstInvalidDate(data.date, "date");
      Guard.againstNullOrWhitespace(data.location, "location");

      const safeData = {
        name: data.name!,
        date: data.date!,
        location: data.location!,
      };

      return await this.raceDomain.create(safeData);
    } catch (error) {
      this.logger.error("RaceService - create", error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Race>): Promise<Race> {
    try {
      return await this.raceDomain.update(id, data);
    } catch (error) {
      this.logger.error(`RaceService - update (${id})`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.raceDomain.delete(id);
    } catch (error) {
      this.logger.error(`RaceService - delete (${id})`, error);
      throw error;
    }
  }

  async getAllByYear(year: string): Promise<Race[]> {
    try {
      return await this.raceDomain.getAllByYear(year);
    } catch (error) {
      this.logger.error(`RaceService - getAllByYear (${year})`, error);
      throw error;
    }
  }
}
