import { query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import CustomError from "../../errors/customError";

export const validateSearchQuery = [
  query("q").optional().isString(),
  query("minPrice").optional().isNumeric(),
  query("maxPrice").optional().isNumeric(),
  query("limit").optional().isNumeric(),
  query("offset").optional().isNumeric(),
  query("sortBy").optional().isString(),
  query("order").optional().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(errors.array().map(e => e.msg).join(", "), 400);
    }

    const allowedParams = ["q", "minPrice", "maxPrice", "limit", "offset", "sortBy", "order"];
    const extraParams = Object.keys(req.query).filter(key => !allowedParams.includes(key));

    if (extraParams.length > 0) {
      throw new CustomError(`Unexpected query parameters: ${extraParams.join(", ")}`, 400);
    }

    next();
  }
];