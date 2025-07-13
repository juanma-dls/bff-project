import CustomError from "./customError";

export default class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(path: string) {
    super(`Route not found: ${path}`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: `Route not found` }];
  }
}
