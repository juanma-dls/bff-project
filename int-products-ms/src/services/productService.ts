import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helper/parseError";

export const productService = async (req: Request) => {

  try {
    const parseUrlPath = parsePath(environment.PRODUCTS_MS_PATH, {req: req.query});
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}`;
    const { data } = await axios.get(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });
    
    const products = data.products;

    if (products && products.length > 0) {
      return products;
    } else {
      throw new CustomError("Products not found", 404);
    }

  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
}