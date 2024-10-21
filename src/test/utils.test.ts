import { calulatePMDataStats } from "../../src/utils";
import { serializeFilterParams } from "../../src/utils";
import { Pm25Data } from "../../src/models";

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

import { FilterQuery, SerializedFilterQuery } from "../models";

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
