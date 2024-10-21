import { NextFunction, Request, Response } from "express";
import { addData } from "../services";
import { serilazeNewDataParams } from "../utils";

export const addDataController = (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  const newData = serilazeNewDataParams(body);

  try {
    const addedData = addData(newData);
    res.status(201).json(addedData);
    return;
  } catch (error) {
    next(error);
  }
};
