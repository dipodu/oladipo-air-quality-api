import { NextFunction, Request, Response } from "express";
import { getDataById } from "../services";
import { DataNotFoundError } from "../errors";

export const getDataByIdController = (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  const data = getDataById(parseInt(params.id));

  if (!data) {
    next(new DataNotFoundError());
    return;
  }
  res.json(data);
  return;
};
