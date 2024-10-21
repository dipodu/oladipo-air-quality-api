import { NextFunction, Request, Response } from "express";
import { SerializedFilterQuery } from "../models";
import { filterAirQualityData } from "../services";
import {
  areAllValuesUndefined,
  NoFilterParametersError,
  serializeFilterParams,
} from "../utils";

export const filterDataController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: SerializedFilterQuery = serializeFilterParams(req.query);

    if (areAllValuesUndefined(query)) {
      next(new NoFilterParametersError());
      return;
    }

    res.json(filterAirQualityData(query));
    return;
  } catch (error) {
    next(error);
  }
};
