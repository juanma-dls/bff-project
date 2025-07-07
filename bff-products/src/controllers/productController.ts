import { NextFunction, Request, Response } from "express";
import { searchProductService } from "../services/searchProductService";

export const searchProductController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await searchProductService(req);
    if (!products || products.length === 0) {
      res.status(404).json({ error: "No products found" });
      return;
    }

    res.status(200).json(products);

  } catch (error) {
    next(error);
  }
}