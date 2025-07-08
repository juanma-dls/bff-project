import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errors/customError";
import { categoriesService } from "../services/categoriesService";
import { productByCategoryService } from "../services/productsByCategoryService";
import { freeShippingService } from "../services/freeShippingService";
import { SearchResponse } from "../interface/searchInterface";
import { Products } from "../interface/productInterface";

export const productsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService();

    const categoryParam = req.params.category;
    const validCategory = categories.includes(categoryParam);
    if (!validCategory) {
      throw new CustomError("Category is not valid", 400);
    }

    const products = await productByCategoryService(categoryParam);

    const freeShippingProducts = await freeShippingService();

    const freeShippingSet = new Set(freeShippingProducts.map((product: Products) => product.id));

    const response: SearchResponse = {
      paging: {
        total: products.products.length,
        offset: req.query.offset ? +(req.query.offset as string, 10) : 0,
        limit: req.query.limit ? +(req.query.limit as string, 10) : 10
      },
      items: products.products.map((product: Products) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        picture: product.picture,
        price_with_discount: product.price_with_discount,
        rating: product.rating,
        freeShipping: freeShippingSet.has(product.id),
      }))
    };
    console.log("response", response);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};