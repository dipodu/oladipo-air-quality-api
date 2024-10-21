import { NewDataRequest, Pm25DataModel, Pm25Data } from "../models";

export const serilazeNewDataParams = ({
  lat,
  long,
  year,
  pm25Level,
}: NewDataRequest): Pm25DataModel => {
  return {
    Latitude: Number(lat),
    Longitude: Number(long),
    Year: Number(year),
    PM25Level: Number(pm25Level),
  };
};

export const calulatePMDataStats = (pm25Data: Pm25Data[]) => {
  const pm25Levels = pm25Data.map((item) => item.PM25Level);
  const totalPM25 = pm25Data.reduce((sum, item) => sum + item.PM25Level, 0);
  const mean = totalPM25 / pm25Levels.length;
  const count = pm25Levels.length;
  const min = Math.min(...pm25Levels);
  const max = Math.max(...pm25Levels);

  return {
    count,
    average: mean,
    min,
    max,
  };
};
