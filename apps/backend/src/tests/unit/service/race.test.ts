import { PrismaClient } from "@prisma/client";
import { RaceService } from "../../../services/raceService";

const mockFindMany = jest.fn();
const mockCreate = jest.fn();

const mockPrisma = {
  race: {
    findMany: mockFindMany,
    create: mockCreate,
  },
} as unknown as PrismaClient;

const service = new RaceService();

describe("RaceService (mocked Prisma)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all races (mocked)", async () => {
    mockFindMany.mockResolvedValue([
      { id: 1, name: "5K", date: new Date(), location: "NYC", results: [] },
    ]);

    const result = await service.getAllRaces({ prisma: mockPrisma });

    expect(mockFindMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("5K");
  });

  it("should create a race (mocked)", async () => {
    const fakeRace = {
      id: 1,
      name: "10K",
      date: new Date(),
      location: "Boston",
    };

    mockCreate.mockResolvedValue(fakeRace);

    const result = await service.createRace(
      {
        name: "10K",
        date: new Date().toISOString(),
        location: "Boston",
      },
      { prisma: mockPrisma }
    );

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: "10K",
        date: expect.any(Date),
        location: "Boston",
      },
    });

    expect(result.name).toBe("10K");
  });
});
