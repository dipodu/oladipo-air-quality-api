import { NewDataRequest, Pm25DataModel } from "../models";

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
