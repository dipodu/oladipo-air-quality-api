import { Pm25DataModel, AirQualityRecord } from "../models";

export const serializeAirQualityRecord = ({
  lat,
  lon,
  year,
  GWRPM25,
}: AirQualityRecord): Pm25DataModel => {
  return {
    Latitude: lat,
    Longitude: lon,
    Year: year,
    PM25Level: GWRPM25,
  };
};
