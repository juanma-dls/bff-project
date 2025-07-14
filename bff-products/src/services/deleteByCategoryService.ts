import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const deleteByCategoryService = async (req: Request) => {
  try {
    const { category } = req.params;
    const url = `${environment.FCD_SEARCH_PRODUCTS_URL}${environment.FCD_PRODUCTS_CATEGORY_PATH}${category}`;
    const headers = req.headers;

    const { data } = await axios.delete(url, {
      headers,
      timeout: environment.TIMEOUT,
    });
    if (data) {
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
