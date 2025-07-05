import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";

export const searchProductService = async (req: Request) => {
  const parseUrlPath = parsePath(environment.FCD_SEARCH_PRODUCTS_PATH, {
    req
  });
  const url = `${environment.FCD_SEARCH_PRODUCTS_URL}${parseUrlPath}`;
  
  const { data } = await axios.get(url, {
    params: req.query,
    timeout: environment.TIMEOUT,
  });
  return data || [];
}