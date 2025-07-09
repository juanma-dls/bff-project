import { Request, Response, NextFunction } from "express";
import { freeShippingService } from "../services/freeShippingService";

export const freeShippingController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const freeShippingIds = await freeShippingService();

    res.status(200).json(Array.from(freeShippingIds));
  } catch (error) {
    next(error);
  }
}