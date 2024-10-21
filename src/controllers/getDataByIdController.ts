import { NextFunction, Request, Response } from "express";
import { getDataById } from "../services";
import { DataNotFoundError } from "../models";

export const getDataByIdController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = getDataById(parseInt(req.params.id));

  if (!data) {
    next(new DataNotFoundError());
    return;
  }
  res.json(data);
  return;
};
