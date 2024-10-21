import { AirQualityDB, Pm25Data, Pm25DataModel } from "../models";
import { addData, getAllDataFromDB } from "../services";

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

let mockDB: AirQualityDB;
beforeEach(() => {
  mockDB = new Map(initialMockDB);
  jest.spyOn(require("../services"), "retrieveDB").mockReturnValue(mockDB);
});

describe("Air Quality DB Service", () => {
  describe("getAllDataFromDB()", () => {
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

  describe("addData()", () => {
    it("should add new data to the database and return the added data", () => {
      const newPm25Data: Pm25DataModel = {
        Latitude: 51.507351,
        Longitude: -0.127758,
        Year: 2022,
        PM25Level: 8.7,
      };

      const expectedData: Pm25Data = {
        id: 3,
        Latitude: 51.507351,
        Longitude: -0.127758,
        Year: 2022,
        PM25Level: 8.7,
      };

      const result = addData(newPm25Data);

      expect(result).toEqual(expectedData);
      expect(mockDB.size).toBe(3);
      expect(mockDB.get(3)).toEqual(newPm25Data);
    });

    it("should add the first data to the database if the database is empty", () => {
      mockDB.clear();

      const newPm25Data: Pm25DataModel = {
        Latitude: 37.774929,
        Longitude: -122.419418,
        Year: 2023,
        PM25Level: 6.5,
      };

      const expectedData: Pm25Data = {
        id: 1, // New id is expected to be 1 since the DB is empty
        Latitude: 37.774929,
        Longitude: -122.419418,
        Year: 2023,
        PM25Level: 6.5,
      };

      const result = addData(newPm25Data);

      expect(result).toEqual(expectedData);
      expect(mockDB.size).toBe(1);
      expect(mockDB.get(1)).toEqual(newPm25Data);
    });
  });
});
