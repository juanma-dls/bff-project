import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const categoryService = async (req: Request) => {
  try {
    const { category } = req.params;
    const url = `${environment.PRODUCTS_MS_URL}${environment.CATEGORY_MS_PATH}${category}`;

    const { data } = await axios.get(url, {
      timeout: environment.TIMEOUT,
    });

    const products = data.products;

    if (products && products.length > 0) {
      return products;
    } else {
      throw new CustomError("Products not found", 404);
    }
  } catch (error: unknown) {
    const { status, message } = parseError(
      error,
      "Error while fetching categories",
      500,
    );
    throw new CustomError(message, status);
  }
};
