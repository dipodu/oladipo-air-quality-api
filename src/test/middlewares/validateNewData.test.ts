import { validateNewData } from "../../middlewares";
import { Request, Response, NextFunction } from "express";

const mockRequest = (body: any): Partial<Request> => ({
  body,
});
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = (): NextFunction => jest.fn();

describe("validateNewData Middleware", () => {
  it("should call next when input is valid", () => {
    const req = mockRequest({
      lat: 40.712776,
      long: -74.005974,
      year: 2021,
      pm25Level: 5.5,
    }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    validateNewData(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 with an error message when input is invalid", () => {
    const invalidRequest = mockRequest({
      lat: 40.712776,
      year: 2021,
    }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    validateNewData(invalidRequest, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
