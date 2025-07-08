import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helpers/parseError";
import { SearchParams } from "../types/searchTypes";

export const productService = async (req: Request) => {
  try {
    // Extraemos y parseamos los parámetros esperados
    const {
      query,
      sortField,
      sortOrder,
      limit,
      offset,
    } = req.query as Partial<Record<keyof SearchParams, string>>;

    const params: Record<string, any> = {};

    if (query) params.q = query;
    if (limit) params.limit = Number(limit);
    if (offset) params.skip = Number(offset);  // offset → skip en DummyJSON

    if (sortField && (sortField === "price" || sortField === "rating")) {
      params.sortBy = sortField;
    }
    if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
      params.order = sortOrder;
    }

    const url = `${environment.PRODUCTS_MS_URL}${environment.PRODUCTS_MS_PATH}`;

    const { data } = await axios.get(url, {
      params,
      timeout: environment.TIMEOUT,
    });

    if (data.products && data.products.length > 0) {
      return data;
    } else {
      throw new CustomError("Products not found", 404);
    }
  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
};
