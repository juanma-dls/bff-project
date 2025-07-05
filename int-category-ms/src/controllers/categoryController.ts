import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const categories = await categoryService(req);
    if (!categories || categories.length === 0) {
      res.status(404).json({ error: "No categories found" });
      return;
    }

    res.status(200).json(categories);

  } catch (error) {
    next(error);
  }
}