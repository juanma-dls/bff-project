import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errors/customError";
import { categoriesService } from "../services/categoriesService";
import { productByCategoryService } from "../services/productsByCategoryService";
import { freeShippingService } from "../services/freeShippingService";
import { SearchResponse } from "../interface/searchResponseInterface";
import { Products } from "../interface/productInterface";
import { generateCategoryMockProducts } from "../helpers/mockProductsHelper";


export const productsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isMock) {
      const mockResponse = generateCategoryMockProducts()
      return res.status(200).json(mockResponse);
    }
    
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
      category: {
        name: categoryParam
      }
      ,
      items: products.products.map((product: Products) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        picture: product.thumbnail,
        price_discount: Number((product.price * product.discountPercentage / 100).toFixed(2)),
        rating: product.rating,
        freeShipping: freeShippingSet.has(product.id),
      }))
    };
    
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};