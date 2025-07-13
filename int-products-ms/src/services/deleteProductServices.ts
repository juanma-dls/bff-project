import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";

export const deleteProductServices = async (req: Request) => {
  try {
    const { id } = req.params;
    const url = `${environment.PRODUCTS_MS_URL}${environment.DELETE_PRODUCTS_MS_PATH}${id}`;
    const { data } = await axios.delete(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    if (data) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }
  } catch (error: unknown) {
    const { status, message } = parseError(
      error,
      "Error while fetching products",
      500,
    );
    throw new CustomError(message, status);
  }
};
