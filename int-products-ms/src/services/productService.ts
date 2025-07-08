import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helper/parseError";

export const productService = async (req: Request) => {
  try {
    const { offset, ...otherQueryParams } = req.query;

    const queryParams = {
      ...otherQueryParams,
      skip: offset, // DummyJSON usa "skip"
    };

    const url = `${environment.PRODUCTS_MS_URL}${environment.PRODUCTS_MS_PATH}`;

    const { data } = await axios.get(url, {
      params: queryParams,
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
};