import { Request, Response, NextFunction } from "express";
import { handleParsing } from "../../middlewares";

describe("handleParsing middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 400 with a 'Invalid JSON payload' message for SyntaxError", () => {
    const syntaxError = new SyntaxError("Unexpected token < in JSON");

    handleParsing(syntaxError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid JSON payload",
      details: syntaxError.message,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 with a 'Malformed URL parameter' message for URIError", () => {
    const uriError = new URIError("URI malformed");

    handleParsing(uriError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Malformed URL parameter",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() with the error for any other error type", () => {
    const genericError = new Error("Some other error");

    handleParsing(genericError, req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(genericError);
  });
});
