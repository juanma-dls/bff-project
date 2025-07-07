import { ValidationError } from "express-validator"
import CustomError from './customError';

export default class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      const e = error as any;
      return { message: e.msg, field: e.param };
    });
  }
}