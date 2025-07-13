import { Request, NextFunction } from "express";
import CustomError from "../../errors/customError";

const validationResult = (req: Request, next: NextFunction) => {
  const allowedParams = [
    "q",
    "minPrice",
    "maxPrice",
    "limit",
    "offset",
    "sortBy",
    "order",
  ];
  const extraParams = Object.keys(req.query).filter(
    (key) => !allowedParams.includes(key),
  );

  if (extraParams.length > 0) {
    throw new CustomError(
      `Unexpected query parameters: ${extraParams.join(", ")}`,
      400,
    );
  }
};

export default validationResult;
