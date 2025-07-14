import axios from "axios";
import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const freeShippingService = async () => {
  try {
    const url = `${environment.PRODUCTS_MS_URL}${environment.FREE_SHIPPING_MS_PATH}`;

    const { data } = await axios.get(url, {
      timeout: environment.TIMEOUT,
    });

    if (data.length > 0) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw error;
    }

    const { status, message } = parseError(
      error,
      "Error while fetching products",
      500,
    );

    throw new CustomError(message, status);
  }
};
