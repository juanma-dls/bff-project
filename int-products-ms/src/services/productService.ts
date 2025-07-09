import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";

export const productService = async (req: Request) => {

  try {

    const { query, sortField, sortOrder, limit, offset } = req.query as Record<string, string>;

    const params: Record<string, any> = {};

    if (query) params.q = query;
    if (limit) params.limit = Number(limit);
    if (offset) params.skip = Number(offset);
    if (sortField) params.sortBy = sortField;
    if (sortOrder) params.order = sortOrder;
  
    const url = `${environment.PRODUCTS_MS_URL}${environment.PRODUCTS_MS_PATH}`;
    
    const { data } = await axios.get(url, {
      params,
      timeout: environment.TIMEOUT,
    });

    if (data.products && data.products.length > 0) {
      return { products: data.products, total: data.total, skip: data.skip, limit: data.limit };
    } else {
      throw new CustomError("Products not found", 404);
    }

  } catch (error: any) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

      throw new CustomError(message, status);
  }
};
