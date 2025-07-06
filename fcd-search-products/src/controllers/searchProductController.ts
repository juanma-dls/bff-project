import { NextFunction, Request, Response } from "express";
import { productService } from "../services/productService";
import { freeShippingService } from "../services/freeShippingService";
import { categoryService } from "../services/categoryService";
import { SearchResponse } from "../interface/searchInterface";
import CustomError from "../utils/errors/customError";

export const searchProductController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await productService(req);
    if (!products || products.length === 0) {
      throw new CustomError('Products not found', 404);
    };

    const freeShippingIds = await freeShippingService(req);
    if (!freeShippingIds || freeShippingIds.size === 0) {
      throw new CustomError('Free Shipping Ids not found', 404);
    };

    const categories = await categoryService(req);
    if (!categories || categories.length === 0) {
      throw new CustomError('Categories not found', 404);
    };

    const productWhithFreeShipping = (id: string) => {
      const find_product = freeShippingIds.filter((product: any) => product.id === id);
      return find_product[0].free_shipping;
    };

    const categoriesSet = Array.from(new Set(products.map((product: any) => product.category)));

    const restult: SearchResponse = {
      paging: {
        total: products.length,
        offset: 0,
        limit: 10
      },
      categories: categoriesSet,
      items: products.map((product: any) => { // Definir tipo de producto
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          picture: product.picture,
          price_with_discount: product.price_with_discount,
          rating: product.rating,
          freeShipping: productWhithFreeShipping(product.id)
        };
      })  
    }

    res.status(200).json(restult);

  } catch (error) {
    next(error);
  }
}