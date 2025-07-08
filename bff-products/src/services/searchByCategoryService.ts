import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";


export const searchByCategoryService = async (req: Request ) => {
  try {
    const { category } = req.params
    const url = `${environment.FCD_SEARCH_PRODUCTS_URL}${environment.FCD_PRODUCTS_CATEGORY_PATH}${category}`;
    const headers = req.headers

    const { data } = await axios.get(url, {
      headers,
      timeout: environment.TIMEOUT,
    });

    const products = data.items

    if (data && products.length > 0) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }
    
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  }
}