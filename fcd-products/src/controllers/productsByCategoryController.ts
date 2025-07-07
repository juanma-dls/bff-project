import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errors/customError";
import { categoriesService } from "../services/categoriesService";
import { productByCategoryService } from "../services/productsByCategoryService";
import { freeShippingService } from "../services/freeShippingService";
import { SearchResponse } from "../interface/searchInterface";
import { Products } from "../interface/productInterface";

export const productsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService(req);
    if (!categories || categories.length === 0) {
      throw new CustomError('Categories not found', 404);
    }

    const categoryParam = req.params.category;
    const validCategory = categories.includes(categoryParam);
    if (!validCategory) {
      throw new CustomError("Category is not valid", 400);
    }

    const products = await productByCategoryService(req);
    if (!products || products.products.length === 0) {
      throw new CustomError('Products not found', 404);
    }

    const freeShippingProducts = await freeShippingService(req);
    if (!freeShippingProducts || freeShippingProducts.length === 0) {
      throw new CustomError('Free Shipping Ids not found', 404);
    }

    const freeShippingSet = new Set(freeShippingProducts.map((product: any) => product.id));

    const response: SearchResponse = {
      paging: {
        total: products.products.length,
        offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10
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

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};