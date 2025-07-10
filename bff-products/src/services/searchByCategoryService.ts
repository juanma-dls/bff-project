import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";


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
    
    } catch (error: unknown) {
      const { status, message } = parseError(error, "Error while fetching free shipping products", 500);
      throw new CustomError(message, status);
    }
}