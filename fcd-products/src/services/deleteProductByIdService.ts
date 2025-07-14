import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import axios from "axios";
import { parseError } from "../helpers/parseError";

export const deleteProductByIdService = async (productId: string) => {
  try {
    const url = `${environment.PRODUCTS_MS_URL}${environment.DELETE_PRODUCTS_MS_PATH}${productId}`;

    const { data } = await axios.delete(url, {
      timeout: environment.TIMEOUT,
    });

    if (data.product) {
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
