import { DataNotFoundError } from "../errors";
import { Pm25Data, AirQualityDB, Pm25DataModel } from "../models";
import { calulatePMDataStats } from "../utils";
import { airQualityDataStore } from "../utils/loadData";

export const retrieveDB = (): AirQualityDB => airQualityDataStore;

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

export const getDataById = (id: number): Pm25Data | undefined => {
  const retrievedData = retrieveDB().get(id);
  if (!retrievedData) {
    return;
  }
  return { id, ...retrievedData };
};

export const deleteData = (id: number): boolean => {
  return retrieveDB().delete(id);
};

export const updateData = (newData: Pm25Data) => {
  const existingData = getDataById(newData.id);

  if (!existingData) {
    throw new DataNotFoundError();
  }

  retrieveDB().set(newData.id, {
    ...newData,
  });

  return getDataById(newData.id);
};
