import { Pm25Data, AirQualityDB, Pm25DataModel } from "../models";
import { calulatePMDataStats } from "../utils";

export let airQualityDB: AirQualityDB = new Map([
  [
    1,
    {
      Latitude: -54.994998931884766,
      Longitude: -71.29499816894531,
      Year: 2000,
      PM25Level: 7.199999809265137,
    },
  ],
  [
    2,
    {
      Latitude: -54.994998931884766,
      Longitude: -71.28500366210938,
      Year: 2000,
      PM25Level: 7.199999809265137,
    },
  ],
  [
    3,
    {
      Latitude: -54.994998931884766,
      Longitude: -71.2750015258789,
      Year: 2000,
      PM25Level: 7.300000190734863,
    },
  ],
  [
    4,
    {
      Latitude: -54.994998931884766,
      Longitude: -71.26499938964844,
      Year: 2000,
      PM25Level: 7.300000190734863,
    },
  ],
  [
    5,
    {
      Latitude: -54.994998931884766,
      Longitude: -71.25499725341797,
      Year: 2000,
      PM25Level: 7.300000190734863,
    },
  ],
]);

export const retrieveDB = (): AirQualityDB => airQualityDB;

export const getAllDataFromDB = (): Pm25Data[] => {
  return Array.from(retrieveDB().entries()).map(([id, pm25Data]) => ({
    id,
    ...pm25Data,
  }));
};

export const getStats = () => calulatePMDataStats(getAllDataFromDB());

export const addData = (pm25Data: Pm25DataModel): Pm25Data => {
  let db = retrieveDB();
  const newId = db.size > 0 ? Math.max(...Array.from(db.keys())) + 1 : 1;

  db.set(newId, pm25Data);

  return { id: newId, ...pm25Data };
};

export const filterAirQualityData = ({
  year,
  lat,
  long,
}: {
  year?: number;
  lat?: number;
  long?: number;
}): Pm25Data[] => {
  const db: Pm25Data[] = getAllDataFromDB();

  return db.filter((pm25Data) => {
    if (year !== undefined && pm25Data.Year !== year) {
      return false;
    }
    if (lat !== undefined && pm25Data.Latitude !== lat) {
      return false;
    }
    if (long !== undefined && pm25Data.Longitude !== long) {
      return false;
    }
    return true;
  });
};
