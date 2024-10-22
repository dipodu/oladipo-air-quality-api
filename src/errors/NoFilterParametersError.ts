import { CustomError } from "./CustomError";

export class NoFilterParametersError extends CustomError {
  constructor(
    message = "No valid filter parameters provided. Please provide at least one of the following: 'year', 'lat', or 'long'."
  ) {
    super("NoFilterParametersError", message, 400);
  }
}
