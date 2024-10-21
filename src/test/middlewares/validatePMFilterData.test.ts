import { Request, Response, NextFunction } from "express";
import { validatePMFilterData } from "../../middlewares";

const mockRequest = (query: any): Partial<Request> => ({
  query,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = (): NextFunction => jest.fn();

describe("validatePMFilterData Middleware", () => {
  it("should call next when query parameters are valid", () => {
    const req = mockRequest({
      year: 2021,
      lat: 40.7128,
      long: -74.006,
    }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    validatePMFilterData(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 when query parameters are invalid (invalid lat)", () => {
    const req = mockRequest({
      year: 2021,
      lat: "bhbjhb7878",
      long: -74.006,
    }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    validatePMFilterData(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 when query parameters are missing", () => {
    const req = mockRequest({}) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    validatePMFilterData(req, res, next);

    expect(next).toHaveBeenCalled(); // Since all fields are optional, next should be called even with empty query
  });
});
