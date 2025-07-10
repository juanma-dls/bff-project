import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const productService = async (req: Request) => {

  try {

    const url = `${environment.PRODUCTS_MS_URL}${environment.PRODUCTS_MS_PATH}`;

    const { data } = await axios.get(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    if (data.products && data.products.length > 0) {
      return { products: data.products, total: data.total, skip: data.skip, limit: data.limit };
    } else {
      throw new CustomError("Products not found", 404);
    }

  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching free shipping products", 500);
    throw new CustomError(message, status);
  }
};
