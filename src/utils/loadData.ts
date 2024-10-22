import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { AirQualityDB, AirQualityRecord } from "../models";
import { serializeAirQualityRecord } from "./serializeAirQualityRecord";

dotenv.config();

const airQualityDataPath =
  process.env.AIR_QUALITY_DATA_PATH || "./air_quality_data.json";

export let airQualityDataStore: AirQualityDB = new Map();

export const loadData = async (): Promise<void> => {
  try {
    const jsonData = await fs.readFileSync(
      path.resolve(airQualityDataPath),
      "utf-8"
    );
    const parsedData: AirQualityRecord[] = JSON.parse(jsonData);

    parsedData.forEach((item, index) => {
      airQualityDataStore.set(index + 1, serializeAirQualityRecord(item));
    });
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    throw error;
  }
};
