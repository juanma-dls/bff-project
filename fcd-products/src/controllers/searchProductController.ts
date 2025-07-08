import { NextFunction, Request, Response } from "express";
import { productsService } from "../services/productsService";
import { freeShippingService } from "../services/freeShippingService";
import { SearchResponse } from "../interface/searchInterface";
import parseSearchParams from "../helpers/searchParamsHelper";
import { Products } from "../interface/productInterface";

export const searchProductController = async (req: Request, res: Response, next: NextFunction ) => {

  try {
    const products = await productsService(req);

    const freeShippingIds = await freeShippingService();

    const productWhithFreeShipping = (id: string) => {
      const find_product = freeShippingIds.filter((product: any) => product.id === id);
      return find_product[0].free_shipping;
    };

    const { minPrice, maxPrice, title } = parseSearchParams(req.query);

    let filteredProducts = products.products.filter((product: Products) => {
      if (minPrice && product.price < Number(minPrice)) return false;
      if (maxPrice && product.price > Number(maxPrice)) return false;
      if (title && !product.title.toLowerCase().includes(title.toLowerCase())) return false;
      return true
    })

    const restult: SearchResponse = {
      paging: {
        total: filteredProducts.length,
        offset: products.offset || 0,
        limit: products.limit || 10
      },
      items: filteredProducts.map((product: Products) => {
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
    };

    res.status(200).json(restult);

  } catch (error) {
    next();
  };
}