import { NextFunction, Request, Response } from "express";
import { searchByCategoryService } from "../services/searchByCategoryService";

export const searchByCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await searchByCategoryService(req);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
