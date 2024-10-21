import { AirQualityDB, Pm25Data, Pm25DataModel } from "../models";
import { getAllDataFromDB } from "../services";

const initialMockDB: AirQualityDB = new Map<number, Pm25DataModel>([
  [
    1,
    {
      Latitude: 40.712776,
      Longitude: -74.005974,
      Year: 2021,
      PM25Level: 5.5,
    },
  ],
  [
    2,
    {
      Latitude: 34.052235,
      Longitude: -118.243683,
      Year: 2020,
      PM25Level: 10.2,
    },
  ],
]);

beforeEach(() => {
  const mockDB = new Map(initialMockDB);
  jest.spyOn(require("../services"), "retrieveDB").mockReturnValue(mockDB);
});

describe("getAllDataFromDB", () => {
  it("should return all data from the database", () => {
    const expectedData: Pm25Data[] = [
      {
        id: 1,
        Latitude: 40.712776,
        Longitude: -74.005974,
        Year: 2021,
        PM25Level: 5.5,
      },
      {
        id: 2,
        Latitude: 34.052235,
        Longitude: -118.243683,
        Year: 2020,
        PM25Level: 10.2,
      },
    ];

    const result = getAllDataFromDB();

    expect(result).toEqual(expectedData);
  });
});
