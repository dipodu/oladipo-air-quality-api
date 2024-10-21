import { Request, Response } from "express";
import { getStats } from "../services";

export const statsController = (req: Request, res: Response) => {
  res.json(getStats());
  return;
};
