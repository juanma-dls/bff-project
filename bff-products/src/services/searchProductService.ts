import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const searchProductService = async (req: Request ) => {
  try {
    const url = `${environment.FCD_SEARCH_PRODUCTS_URL}${environment.FCD_SEARCH_PRODUCTS_PATH}`;
    const headers = req.headers

    const { data } = await axios.get(url, {
      headers,
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    if (data.items && data.items.length > 0) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }
    
  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
}