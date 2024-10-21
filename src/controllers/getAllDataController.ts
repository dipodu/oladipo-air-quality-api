import { Request, Response } from "express";
import { getAllDataFromDB } from "../services";

export const getAllDataController = (req: Request, res: Response) => {
  res.json(getAllDataFromDB());
  return;
};
