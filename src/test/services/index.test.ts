import { DataNotFoundError } from "../../errors";
import { AirQualityDB, Pm25Data, Pm25DataModel } from "../../models";
import {
  addData,
  filterAirQualityData,
  getAllDataFromDB,
  updateData,
} from "../../services";

const initialMockDB: AirQualityDB = new Map<number, Pm25DataModel>([
  [
    1,
    {
      Latitude: 40.712776,
      Longitude: -74.005974,
      Year: 2021,
      PM25Level: 5.523232323232,
    },
  ],
  [
    2,
    {
      Latitude: 34.052235,
      Longitude: -118.243683,
      Year: 2020,
      PM25Level: 10.232233,
    },
  ],
  [
    3,
    {
      Latitude: 34.052235,
      Longitude: -118.243683,
      Year: 2020,
      PM25Level: 10.2232323,
    },
  ],
  [
    4,
    {
      Latitude: 34.052235,
      Longitude: -18.243683,
      Year: 2029,
      PM25Level: 10.23232323232,
    },
  ],
]);

let mockDB: AirQualityDB;
beforeEach(() => {
  mockDB = new Map(initialMockDB);
  jest.spyOn(require("../../services"), "retrieveDB").mockReturnValue(mockDB);
});

describe("Air Quality DB Service", () => {
  describe("getAllDataFromDB()", () => {
    it("should return all data from the database", () => {
      const result = getAllDataFromDB();

      expect(result).toEqual([
        {
          id: 1,
          Latitude: 40.712776,
          Longitude: -74.005974,
          Year: 2021,
          PM25Level: 5.523232323232,
        },
        {
          id: 2,
          Latitude: 34.052235,
          Longitude: -118.243683,
          Year: 2020,
          PM25Level: 10.232233,
        },
        {
          id: 3,
          Latitude: 34.052235,
          Longitude: -118.243683,
          Year: 2020,
          PM25Level: 10.2232323,
        },

        {
          id: 4,
          Latitude: 34.052235,
          Longitude: -18.243683,
          Year: 2029,
          PM25Level: 10.23232323232,
        },
      ]);
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
        id: 5,
        Latitude: 51.507351,
        Longitude: -0.127758,
        Year: 2022,
        PM25Level: 8.7,
      };

      const result = addData(newPm25Data);

      expect(result).toEqual(expectedData);
      expect(mockDB.size).toBe(5);
      expect(mockDB.get(5)).toEqual(newPm25Data);
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

  describe("filterAirQualityData()", () => {
    it("should filter data by year", () => {
      const filteredData = filterAirQualityData({ year: 2029 });

      expect(filteredData.length).toBe(1);
      expect(filteredData[0]).toEqual({
        id: 4,
        Latitude: 34.052235,
        Longitude: -18.243683,
        Year: 2029,
        PM25Level: 10.23232323232,
      });
    });

    it("should filter data by latitude", () => {
      const filteredData = filterAirQualityData({ lat: 34.052235 });

      expect(filteredData.length).toBe(3);
      expect(filteredData[0]).toEqual({
        id: 2,
        Latitude: 34.052235,
        Longitude: -118.243683,
        Year: 2020,
        PM25Level: 10.232233,
      });
    });

    it("should filter data by longitude", () => {
      const filteredData = filterAirQualityData({ long: -74.005974 });

      expect(filteredData.length).toBe(1);
      expect(filteredData[0]).toEqual({
        id: 1,
        Latitude: 40.712776,
        Longitude: -74.005974,
        Year: 2021,
        PM25Level: 5.523232323232,
      });
    });

    it("should filter data by multiple criteria", () => {
      const filteredData = filterAirQualityData({
        year: 2020,
        lat: 34.052235,
        long: -118.243683,
      });
      expect(filteredData.length).toBe(2);
    });

    it("should return an empty array if no data matches the filter criteria", () => {
      const filteredData = filterAirQualityData({
        year: 2023,
        lat: 0,
        long: 0,
      });

      expect(filteredData.length).toBe(0);
    });
  });

  describe("updateData()", () => {
    it("should update existing data in the database and return the updated data", () => {
      const updatedData: Pm25Data = {
        id: 2,
        Latitude: 34.052235,
        Longitude: -118.243683,
        Year: 9000,
        PM25Level: 10.232233,
      };

      const result = updateData(updatedData);

      expect(result).toEqual(updatedData);
      expect(mockDB.get(2)).toEqual({
        id: 2,
        Latitude: 34.052235,
        Longitude: -118.243683,
        Year: 9000,
        PM25Level: 10.232233,
      });
    });

    it("should throw a DataNotFoundError if the data to be updated does not exist", () => {
      const nonExistentData: Pm25Data = {
        id: 999,
        Latitude: 0,
        Longitude: 0,
        Year: 2023,
        PM25Level: 7.5,
      };

      try {
        updateData(nonExistentData);
        fail("updateData should have thrown a DataNotFoundError");
      } catch (error) {
        expect(error).toBeInstanceOf(DataNotFoundError);
      }
    });
  });
});
