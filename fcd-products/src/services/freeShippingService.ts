
import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";

export const freeShippingService = async (req: Request) => {
  try {
    const url = `${environment.PRODUCTS_MS_URL}${environment.FREE_SHIPPING_MS_PATH}`;

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