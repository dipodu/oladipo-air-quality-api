import { NextFunction, Request, Response } from "express";
import { addData } from "../services";
import { serilazeNewDataParams } from "../utils";

export const addDataController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newData = serilazeNewDataParams(req.body);

  try {
    const addedData = addData(newData);
    res.status(201).json(addedData);
    return;
  } catch (error) {
    next(error);
  }
};
