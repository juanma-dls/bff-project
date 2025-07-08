import axios from "axios";
import { environment } from "../config/environment";
import { Request } from "express";
import { parsePath } from "../utils/functions";
import CustomError from "../utils/errors/customError";

export const deleteProductServices = async (req: Request) => {
  try {
    const { id } = req.params
    const parseUrlPath = parsePath(environment.DELETE_PRODUCTS_MS_PATH, {id});
    const url = `${environment.PRODUCTS_MS_URL}${parseUrlPath}${id}`;
    const { data } = await axios.delete(url, {
      params: req.query,
      timeout: environment.TIMEOUT,
    });

    if ( data ) {
      return data;
    } else {
      throw new CustomError("Products not found", 404)
    }
    
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.errors?.[0]?.message || error.message || 'Error';

    throw new CustomError(message, status);
  };
}