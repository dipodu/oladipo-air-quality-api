import request from "supertest";
import app from "../../app";
import * as dataService from "../../services";
import { AirQualityDB, Pm25DataModel } from "../../models";
import { DataNotFoundError } from "../../errors";

jest.mock("../../services");

const mockDB: AirQualityDB = new Map<number, Pm25DataModel>([
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
]);

describe("API Routes", () => {
  const mockData = [
    {
      id: "1",
      year: 2020,
      latitude: 40.7128,
      longitude: -74.006,
      pm25Level: 10.5,
    },
    {
      id: "2",
      year: 2021,
      latitude: 34.0522,
      longitude: -118.2437,
      pm25Level: 12.3,
    },
  ];

  describe("GET /", () => {
    it("should return all data", async () => {
      (dataService.getAllDataFromDB as jest.Mock).mockReturnValue(mockData);

      const response = await request(app).get("/data");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });
  });

  describe("GET /:id", () => {
    it("should return data for a specific id", async () => {
      (dataService.getDataById as jest.Mock).mockReturnValue(mockData[0]);

      const response = await request(app).get("/data/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData[0]);
    });

    it("should return 404 for non-existent id", async () => {
      (dataService.getDataById as jest.Mock).mockReturnValue(undefined);

      const response = await request(app).get("/data/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Data with the provided ID was not found",
      });
    });
  });

  describe("GET /data/filter", () => {
    it("should filter data based on query parameters", async () => {
      const filteredData = [mockData[0]];
      (dataService.filterAirQualityData as jest.Mock).mockReturnValue(
        filteredData
      );

      const response = await request(app)
        .get("/data/filter")
        .query({ year: 2020, lat: 40.7128, long: -74.006 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(filteredData);
    });

    it("should return 400 for queries with no parameters", async () => {
      const response = await request(app).get("/data/filter").query({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          "No valid filter parameters provided. Please provide at least one of the following: 'year', 'lat', or 'long'.",
      });
    });
  });

  describe("GET /data/stats", () => {
    it("should return statistics", async () => {
      const stats = {
        count: 2,
        averagePM25: 11.4,
        minPM25: 10.5,
        maxPM25: 12.3,
      };
      (dataService.getStats as jest.Mock).mockReturnValue(stats);

      const response = await request(app).get("/data/stats");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(stats);
    });
  });

  describe("POST /data", () => {
    it("should add new data", async () => {
      const addedData = {
        id: "5",
        Year: 2022,
        Latitude: 51.5074,
        Longitude: -0.1278,
        PM25Level: 8.7,
      };
      (dataService.addData as jest.Mock).mockReturnValue(addedData);
      (dataService.retrieveDB as jest.Mock).mockReturnValue(mockDB);

      const response = await request(app).post("/data").send({
        year: 2022,
        lat: 51.5074,
        long: -0.1278,
        pm25Level: 8.7,
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(addedData);
    });
  });

  describe("PUT /data/:id", () => {
    it("should update existing data", async () => {
      const updatedData = { ...mockData[0], pm25Level: 11.2 };
      (dataService.updateData as jest.Mock).mockReturnValue(updatedData);

      const response = await request(app).put("/data/1").send({
        lat: 40.712776,
        long: -74.005974,
        year: 2021,
        pm25Level: 11.2,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: updatedData,
        message: "Data updated successfully",
      });
    });

    it("should return 404 for non-existent id", async () => {
      (dataService.updateData as jest.Mock).mockImplementationOnce(
        jest.fn(() => {
          throw new DataNotFoundError();
        })
      );

      const response = await request(app).put("/data/332").send({
        lat: 40.712776,
        long: -74.005974,
        year: 2021,
        pm25Level: 11.2,
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Data with the provided ID was not found",
      });
    });
  });

  describe("DELETE /data/:id", () => {
    it("should delete existing data", async () => {
      (dataService.deleteData as jest.Mock).mockReturnValue(true);

      const response = await request(app).delete("/data/1");

      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent id", async () => {
      (dataService.deleteData as jest.Mock).mockReturnValue(false);

      const response = await request(app).delete("/data/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Data with the provided ID was not found",
      });
    });
  });
});
