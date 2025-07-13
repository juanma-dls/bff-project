import { Request, Response, NextFunction } from "express";
import { environment } from "../config/environment";
import CustomError from "./errors/customError";

declare module "express" {
  interface Request {
    isMock?: boolean;
  }
}

export const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers["x-auth-token"] as string) || "";

  if (token === environment.TOKEN_ALTERNATIVO) {
    req.isMock = true;
    return next();
  }

  if (token !== environment.TOKEN_VALIDO) {
    throw new CustomError("Unauthorized", 401);
  }
  next();
};
