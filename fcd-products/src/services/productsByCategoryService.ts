import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import axios from "axios";
import { parseError } from "../helpers/parseError";

export const productByCategoryService = async (category: string) => {
  try {
    const url = `${environment.PRODUCTS_MS_URL}${environment.CATEGORY_PRODUCT_MS_PATH}${category}`;

    const { data } = await axios.get(url, {
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
