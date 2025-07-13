import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryService();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
