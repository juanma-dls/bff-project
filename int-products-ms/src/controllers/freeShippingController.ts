import { Request, Response, NextFunction } from "express";
import { freeShippingService } from "../services/freeShippingService";

export const freeShippingController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const freeShippingIds = await freeShippingService(req);
    if (!freeShippingIds || freeShippingIds.size === 0) {
      res.status(404).json({ error: "No free shipping products found" });
      return;
    }

    res.status(200).json(Array.from(freeShippingIds));
  } catch (error) {
    next(error);
  }
}