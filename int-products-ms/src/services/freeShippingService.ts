
import axios from "axios";
import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helper/parseError";

export const freeShippingService = async () => {
  try {
    const url = `${environment.FREE_SHIPPING_MS_URL}${environment.FREE_SHIPPING_MS_PATH}`;

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
    const { status, message } = parseError(error, "Error while fetching free shipping products", 500);
    throw new CustomError(message, status);
  }
}