import { NextFunction, Request, Response } from "express";
import { deleteByCategoryService } from "../services/deleteByCategoryService";

export const deleteByCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await deleteByCategoryService(req);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
