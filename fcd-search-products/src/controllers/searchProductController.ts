import { NextFunction, Request, Response } from "express";
import { productService } from "../services/productService";
import { freeShippingService } from "../services/freeShippingService";
import { categoryService } from "../services/categoryService";
import { SearchResponse } from "../interface/searchInterface";

export const searchProductController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await productService(req);
    if (!products || products.length === 0) {
      res.status(404).json({ error: "No products found" });
      return;
    };

    const freeShippingIds = await freeShippingService(req);
    if (!freeShippingIds || freeShippingIds.size === 0) {
      res.status(404).json({ error: "No free shipping products found" });
      return;
    };

    const categories = await categoryService(req);
    if (!categories || categories.length === 0) {
      res.status(404).json({ error: "No categories found" });
      return;
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