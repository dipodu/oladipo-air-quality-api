export type Pm25DataModel = {
  Latitude: number;
  Longitude: number;
  Year: number;
  PM25Level: number;
};

export type Pm25Data = Pm25DataModel & {
  id: number;
};

export type AirQualityDB = Map<number, Pm25DataModel>;

export type NewDataRequest = {
  lat: string;
  long: string;
  year: string;
  pm25Level: string;
};

export type SerializedFilterQuery = {
  year?: number;
  lat?: number;
  long?: number;
};

export type FilterQuery = {
  year?: string;
  lat?: string;
  long?: string;
};
