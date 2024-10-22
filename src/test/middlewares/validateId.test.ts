import { Request, Response, NextFunction } from "express";
import { validateId } from "../../middlewares";

describe("validateId Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() when ID is valid", () => {
    req.params = { id: "123" };

    validateId(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 when ID is not a number", () => {
    req.params = { id: "abc" };

    validateId(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringContaining('"id" must be a number'),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 when ID is missing", () => {
    req.params = {};

    validateId(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringContaining('"id" is required'),
    });
    expect(next).not.toHaveBeenCalled();
  });
});
