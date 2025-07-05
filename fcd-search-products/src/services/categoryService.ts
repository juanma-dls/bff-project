import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";

export const categoryService = async (req: Request) => {
  const parseUrlPath = parsePath(environment.CATEGORIES_MS_PATH, {
    req
  });
  const url = `${environment.CATEGORIES_MS_URL}${parseUrlPath}`;

  const { data } = await axios.get(url, {
    params: req.query,
    timeout: environment.TIMEOUT,
  });
  
  return data || [];
}