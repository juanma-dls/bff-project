import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";

export const categoryService = async (req: Request) => {
  try {
  const parseUrlPath = parsePath(environment.CATEGORY_MS_PATH, {
    req
  });
  console.log("parseUrlPath --->", parseUrlPath);
  const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}`;
  console.log("url --->", url);
  const { data } = await axios.get(url, {
    params: req.query,
    timeout: environment.TIMEOUT,
  });
  console.log("data --->", data);
  return data.products || [];
} catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  };
}