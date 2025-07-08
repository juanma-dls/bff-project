import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const productsService = async (req: Request) => {
  try {
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const parseUrlPath = parsePath(environment.PRODUCTS_MS_PATH, {
      queryString
    });
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}`;
    console.log("url", url);
    const { data } = await axios.get(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    if (data.products.length > 0) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }

  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
}