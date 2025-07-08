import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";

export const categoriesService = async () => {
  const url = `${environment.CATEGORIES_MS_URL}${environment.CATEGORIES_MS_PATH}`;

  const { data } = await axios.get(url, {
    timeout: environment.TIMEOUT,
  });
  
  return data || [];
}