import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";

export const productsService = async (req: Request) => {
  try {
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const parseUrlPath = parsePath(environment.PRODUCTS_MS_PATH, {
      queryString
    });
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}`;

    const { data } = await axios.get(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });
    
    return data || [];
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  };
}