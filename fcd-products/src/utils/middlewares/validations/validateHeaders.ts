import { header, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import CustomError from "../../errors/customError";

export const validateHeaders = [
  header("x-auth-token")
    .exists()
    .withMessage("x-auth-token is required")
    .isString(),
  header("site")
    .exists()
    .withMessage("site is required")
    .isIn(["MLA", "MLB", "MLM"]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(
        errors
          .array()
          .map((e) => e.msg)
          .join(", "),
        400,
      );
    }
    next();
  },
];
