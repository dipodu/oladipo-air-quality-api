import { NextFunction, Request, Response } from "express";
import { SerializedFilterQuery } from "../models";
import { filterAirQualityData } from "../services";
import { serilazeFilterParams } from "../utils";

export const filterDataController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: SerializedFilterQuery = serilazeFilterParams(req.query);

    res.json(filterAirQualityData(query));
    return;
  } catch (error) {
    next(error);
  }
};
