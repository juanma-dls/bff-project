import { Request, Response, NextFunction } from "express";
import { environment } from "../config/environment";
import CustomError from "./errors/customError";

export const setHeaders = ( req: Request ,res: Response, next: NextFunction) => {
  const token = req.headers['x-auth-token'] || '';
  if (!token || (token !== environment.TOKEN_VALIDO)) {
    throw new CustomError("Unauthorized", 401)
  }
  next();
}