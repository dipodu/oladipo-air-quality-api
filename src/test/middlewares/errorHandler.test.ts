import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../middlewares";
import { DataNotFoundError, NoFilterParametersError } from "../../errors";

const mockRequest = (): Partial<Request> => ({});
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = (): NextFunction => jest.fn();

describe("errorHandler", () => {
  it("should handle DataNotFoundError and return 404", () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = mockNext();
    const error = new DataNotFoundError();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Data with the provided ID was not found",
    });
  });

  it("should handle NoFilterParametersError and return 400", () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = mockNext();
    const error = new NoFilterParametersError();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "No valid filter parameters provided. Please provide at least one of the following: 'year', 'lat', or 'long'.",
    });
  });

  it("should handle an unknown error and return 500", () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = mockNext();
    const error = new Error("Unknown error");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred. Please try again later.",
    });
  });
});
