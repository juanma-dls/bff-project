import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/customError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {

  console.log(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  res.status(400).send({
    errors: [{ message: `Something went corrupte` }]
  });
  next(err);
}

export default errorHandler;