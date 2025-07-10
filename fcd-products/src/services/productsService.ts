import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

const ALLOWED_SORT_FIELDS = ["price", "rating"];
const DEFAULT_SORT_ORDER = "asc";

export const productsService = async (req: Request) => {
  try {
    const url = `${environment.PRODUCTS_MS_URL}${environment.PRODUCTS_MS_PATH}`;

    const { data } = await axios.get(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    const productsData = data.products;

    if (productsData && productsData.products.length > 0) {
      return productsData;
    } else {
      throw new CustomError("Products not found", 404);
    }

  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
};
