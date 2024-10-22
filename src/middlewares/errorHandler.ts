import { Request, Response, NextFunction } from "express";
import { DataNotFoundError, NoFilterParametersError } from "../errors";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    error instanceof DataNotFoundError ||
    error instanceof NoFilterParametersError
  ) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
  });
  return;
};
