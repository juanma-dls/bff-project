import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const { limit, offset } = req.query
    const products = await categoryService(req);

    res.status(200).json({products, limit, offset });

  } catch (error) {
    next(error);
  }
}