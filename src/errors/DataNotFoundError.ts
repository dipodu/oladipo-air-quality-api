import { CustomError } from "./CustomError";

export class DataNotFoundError extends CustomError {
  constructor(message = "Data with the provided ID was not found") {
    super("DataNotFoundError", message, 404);
  }
}
