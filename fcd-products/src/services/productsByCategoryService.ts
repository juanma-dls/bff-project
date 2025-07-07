import { Request } from "express";
import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import { parsePath } from "../utils/functions";
import axios from "axios";

export const productByCategoryService = async (req: Request) => {
  try {
    const { category } = req.params
    const parseUrlPath = parsePath(environment.CATEGORY_PRODUCT_MS_PATH, {
      category
    });
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}${category}`;

    const { data } = await axios.get(url, {
      timeout: environment.TIMEOUT,
    });
    
    return data || [];
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  }
}
