import { NextFunction, Request, Response } from "express";
import { deleteProductServices } from "../services/deleteProductServices";

export const deleteProductController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const product = await deleteProductServices(req);

    res.status(200).json({product});

  } catch (error) {
    next(error);
  }
}