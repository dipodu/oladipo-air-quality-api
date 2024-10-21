import {
  NewDataRequest,
  Pm25DataModel,
  Pm25Data,
  FilterQuery,
  SerializedFilterQuery,
} from "../models";

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

const isValidNumber = (value: string | number): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};

export const serializeFilterParams = (
  query: FilterQuery
): SerializedFilterQuery => {
  const serialize = (
    value: string | number | undefined,
    parser: (v: string) => number
  ) =>
    value !== undefined && isValidNumber(value)
      ? parser(value.toString())
      : undefined;

  return {
    year: serialize(query.year, Number),
    lat: serialize(query.lat, parseFloat),
    long: serialize(query.long, parseFloat),
  };
};

export const areAllValuesUndefined = (obj: Record<string, any>): boolean =>
  Object.values(obj).every((value) => value === undefined);

class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export class DataNotFoundError extends CustomError {
  constructor(message = "Data with the provided ID was not found") {
    super("DataNotFoundError", message);
  }
}

export class NoFilterParametersError extends CustomError {
  constructor(message = "No valid filter parameters were provided") {
    super("NoFilterParametersError", message);
  }
}
