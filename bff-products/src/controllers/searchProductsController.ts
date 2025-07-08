import { NextFunction, Request, Response } from "express";
import { searchProductService } from "../services/searchProductService";

export const searchProductsController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await searchProductService(req);

    res.status(200).json(products);

  } catch (error) {
    next(error);
  }
}