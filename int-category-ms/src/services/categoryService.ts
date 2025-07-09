import axios from "axios";
import { environment } from "../config/environment";
import CustomError from "../utils/errors/customError";
import { parseError } from "../helper/parseError";

export const categoryService = async () => {
  try {
  const url = `${environment.CATEGORIES_MS_URL}${environment.CATEGORIES_MS_PATH}`;
  
  const { data } = await axios.get(url, {
    timeout: environment.TIMEOUT,
  });
  
  if ( data ) {
    return data;
  } else {
    throw new CustomError("Products not found", 404)
  }

  } catch (error: unknown) {
    const { status, message } = parseError(error, "Error while fetching products", 500);
    throw new CustomError(message, status);
  }
  
}