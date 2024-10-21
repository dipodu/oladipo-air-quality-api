import { Request, Response, NextFunction } from "express";

export const handleParsing = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({
      message: "Invalid JSON payload",
      details: error.message,
    });
    return;
  }

  if (error instanceof URIError) {
    res.status(400).json({ message: "Malformed URL parameter" });
    return;
  }

  next(error);
};
