import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const newDataSchema = Joi.object({
  lat: Joi.number().required(),
  long: Joi.number().required(),
  year: Joi.number().required(),
  pm25Level: Joi.number().required(),
});

export const validateNewData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = newDataSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};
