import { NextFunction, Request, Response } from "express";
import { productsService } from "../services/productsService";
import { freeShippingService } from "../services/freeShippingService";
import { SearchResponse } from "../interface/searchResponseInterface";
import parseSearchParams from "../helpers/searchParamsHelper";
import { Products } from "../interface/productInterface";
import { generateSearchMockProducts } from "../helpers/mockProductsHelper";

export const searchProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.isMock) {
      const mockResponse = generateSearchMockProducts();
      return res.status(200).json(mockResponse);
    }

    const productsResponse = await productsService(req);
    const freeShippingProducts = await freeShippingService();
    const freeShippingSet = new Set(
      freeShippingProducts.map((product: Products) => product.id),
    );

    const { minPrice, maxPrice } = parseSearchParams(req.query);

    const filteredProducts = productsResponse.products.filter(
      (product: Products) => {
        if (minPrice && product.price < Number(minPrice)) return false;
        if (maxPrice && product.price > Number(maxPrice)) return false;
        return true;
      },
    );

    const categoriesSet = Array.from(
      new Set(filteredProducts.map((product: Products) => product.category)),
    );

    const result: SearchResponse = {
      paging: {
        total: filteredProducts.length,
        offset: productsResponse.skip || 0,
        limit: productsResponse.limit || 10,
      },
      categories: categoriesSet,
      items: filteredProducts.map((product: Products) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        picture: product.thumbnail,
        price_with_discount: Number(
          (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
        ),
        rating: product.rating,
        free_shipping: freeShippingSet.has(product.id),
      })),
    };

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
