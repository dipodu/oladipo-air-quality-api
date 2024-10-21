import { Request, Response, NextFunction } from "express";
import { DataNotFoundError } from "../models";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DataNotFoundError) {
    res.status(404).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
  });
  return;
};
