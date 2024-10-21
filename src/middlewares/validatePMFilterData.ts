import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const filterSchema = Joi.object({
  year: Joi.number().optional(),
  lat: Joi.number().optional(),
  long: Joi.number().optional(),
});

export const validatePMFilterData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = filterSchema.validate(req.query);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};
