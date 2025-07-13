import { NextFunction, Request, Response } from "express";
import { productService } from "../services/productService";

export const productController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService(req);

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
