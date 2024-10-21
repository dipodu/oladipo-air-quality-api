import { NextFunction, Request, Response } from "express";
import { updateData } from "../services/";
import { serilazeNewDataParams } from "../utils";

export const updateDataController = (
  { body, params }: Request,
  res: Response,
  next: NextFunction
) => {
  const { Latitude, Longitude, Year, PM25Level } = serilazeNewDataParams(body);

  try {
    const updatedData = updateData({
      id: parseInt(params.id),
      Latitude,
      Longitude,
      Year,
      PM25Level,
    });

    res.status(200).json({
      message: "Data updated successfully",
      data: updatedData,
    });
    return;
  } catch (error) {
    next(error);
  }
};
