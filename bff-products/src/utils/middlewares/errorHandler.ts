import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/customError";
import { logger } from "../logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  res.status(400).send({
    errors: [{ message: `Something went corrupte` }],
  });
  next(err);
};

export default errorHandler;
