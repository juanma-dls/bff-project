import { Request } from "express";
import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import { parsePath } from "../utils/functions";
import axios from "axios";

export const deleteProductByIdService = async (productId: string) => {
  try {
    const parseUrlPath = parsePath(environment.DELETE_PRODUCTS_MS_PATH, { productId });
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}${productId}`;

    const { data } = await axios.delete(url, {
      timeout: environment.TIMEOUT,
    });
    
    return data;

  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  }
}
