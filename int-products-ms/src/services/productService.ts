import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";

export const productService = async (req: Request) => {
  const parseUrlPath = parsePath(environment.PRODUCTS_MS_PATH, {
    req
  });
  const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}`;
  
  const { data } = await axios.get(url, {
    params: req.query,
    timeout: environment.TIMEOUT,
  });
  return data.products || [];
}