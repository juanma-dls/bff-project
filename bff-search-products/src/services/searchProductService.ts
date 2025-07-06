import axios, { AxiosError } from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";

export const searchProductService = async (req: Request ) => {
  try {
    const parseUrlPath = parsePath(environment.FCD_SEARCH_PRODUCTS_PATH, {
      req
    });
    const url = `${environment.FCD_SEARCH_PRODUCTS_URL}${parseUrlPath}`;
    const headers = req.headers

    const { data } = await axios.get(url, {
      headers,
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