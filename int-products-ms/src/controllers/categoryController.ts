import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await categoryService(req);
    if (!products || products.length === 0) {
      res.status(404).json({ error: "No products found" });
      return;
    }

    res.status(200).json({products, limit: req.query.limit, offset: req.query.offset });

  } catch (error) {
    next(error);
  }
}