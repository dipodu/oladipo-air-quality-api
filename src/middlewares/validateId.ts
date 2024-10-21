import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = idSchema.validate(req.params);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};
