import { NextFunction, Request, Response } from "express";
import { deleteData } from "../services";
import { DataNotFoundError } from "../utils";

export const deleteDataController = (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(params.id);
  const deletedData = deleteData(id);

  if (!deletedData) {
    next(new DataNotFoundError());
    return;
  }
  res.status(204).send();
  return;
};
