import { PrismaClient } from "@prisma/client";
import { RaceDao } from "./dao/raceDao";
import { ResultDao } from "./dao/resultDao";
import { RaceDomain } from "./domain/raceDomain";
import { ResultDomain } from "./domain/resultDomain";
import { RaceService } from "./services/raceService";
import { ResultService } from "./services/resultService";
import { Logger } from "./utils/Logger";

const prisma = new PrismaClient();
const logger = new Logger();

// Constructing everything manually here
const raceDao = new RaceDao(prisma, logger);
const resultDao = new ResultDao(prisma, logger);

const raceDomain = new RaceDomain(raceDao, logger);
const resultDomain = new ResultDomain(resultDao, logger);

const raceService = new RaceService(raceDomain, logger);
const resultService = new ResultService(resultDomain, logger);

export type Context = {
  prisma: PrismaClient;
  logger: Logger;
  raceService: RaceService;
  resultService: ResultService;
};

export const createContext = (): Context => ({
  prisma,
  logger,
  raceService,
  resultService,
});
