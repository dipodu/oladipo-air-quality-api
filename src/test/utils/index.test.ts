import { calulatePMDataStats, serializeFilterParams } from "../../../src/utils";
import { AirQualityRecord, Pm25Data, Pm25DataModel } from "../../../src/models";
import { FilterQuery, SerializedFilterQuery } from "../../models";
import { serializeAirQualityRecord } from "../../utils/serializeAirQualityRecord";

describe("calculatePMDataStats", () => {
  it("should correctly calculate the statistics for PM25 data", () => {
    const sampleData: Pm25Data[] = [
      {
        id: 1,
        Latitude: -54.99,
        Longitude: -71.29,
        Year: 2000,
        PM25Level: 7.2,
      },
      {
        id: 2,
        Latitude: -54.99,
        Longitude: -71.28,
        Year: 2000,
        PM25Level: 7.2,
      },
      {
        id: 3,
        Latitude: -54.99,
        Longitude: -71.27,
        Year: 2000,
        PM25Level: 7.3,
      },
      {
        id: 4,
        Latitude: -54.99,
        Longitude: -71.26,
        Year: 2000,
        PM25Level: 7.3,
      },
      {
        id: 5,
        Latitude: -54.99,
        Longitude: -71.25,
        Year: 2000,
        PM25Level: 7.4,
      },
    ];

    const expectedStats = {
      count: 5,
      average: 7.28,
      min: 7.2,
      max: 7.4,
    };

    const stats = calulatePMDataStats(sampleData);

    expect(stats.count).toBe(expectedStats.count);
    expect(stats.average).toBeCloseTo(expectedStats.average, 2);
    expect(stats.min).toBe(expectedStats.min);
    expect(stats.max).toBe(expectedStats.max);
  });
});

describe("serializeFilterParams", () => {
  it("should serialize filter parameters correctly", () => {
    const filterQuery: FilterQuery = {
      year: "2023",
      lat: "40.730610",
      long: "-73.935242",
    };

    const expectedSerializedQuery: SerializedFilterQuery = {
      year: 2023,
      lat: 40.73061,
      long: -73.935242,
    };

    const result = serializeFilterParams(filterQuery);
    expect(result).toEqual(expectedSerializedQuery);
  });

  it("should handle undefined filter parameters", () => {
    const filterQuery: FilterQuery = {
      year: undefined,
      lat: undefined,
      long: undefined,
    };

    const expectedSerializedQuery: SerializedFilterQuery = {
      year: undefined,
      lat: undefined,
      long: undefined,
    };

    const result = serializeFilterParams(filterQuery);
    expect(result).toEqual(expectedSerializedQuery);
  });

  it("should handle non-numeric filter parameters", () => {
    const filterQuery: FilterQuery = {
      year: "abc",
      lat: "def",
      long: "ghi",
    };

    const expectedSerializedQuery: SerializedFilterQuery = {
      year: undefined,
      lat: undefined,
      long: undefined,
    };

    const result = serializeFilterParams(filterQuery);
    expect(result).toEqual(expectedSerializedQuery);
  });
});

describe("serializeAirQualityRecord", () => {
  it("should correctly convert AirQualityRecord to Pm25DataModel", () => {
    const airQualityRecord: AirQualityRecord = {
      lat: -54.994998931884766,
      lon: -71.29499816894531,
      year: 2000,
      GWRPM25: 7.199999809265137,
    };

    const expectedResult: Pm25DataModel = {
      Latitude: -54.994998931884766,
      Longitude: -71.29499816894531,
      Year: 2000,
      PM25Level: 7.199999809265137,
    };

    const result = serializeAirQualityRecord(airQualityRecord);

    expect(result).toEqual(expectedResult);
  });

  it("should handle different values correctly", () => {
    const airQualityRecord: AirQualityRecord = {
      lat: 34.052235,
      lon: -118.243683,
      year: 2021,
      GWRPM25: 12.5,
    };

    const expectedResult: Pm25DataModel = {
      Latitude: 34.052235,
      Longitude: -118.243683,
      Year: 2021,
      PM25Level: 12.5,
    };

    const result = serializeAirQualityRecord(airQualityRecord);

    expect(result).toEqual(expectedResult);
  });
});
