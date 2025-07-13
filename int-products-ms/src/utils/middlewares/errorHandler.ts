import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/customError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
    return;
  }

  res.status(500).json({
    errors: [{ message: "Internal Server Error" }],
  });
  next(err);
};

export default errorHandler;
