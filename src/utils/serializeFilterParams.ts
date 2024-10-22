import { FilterQuery, SerializedFilterQuery } from "../models";

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
