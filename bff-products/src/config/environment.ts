import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT || 3000,
  FCD_SEARCH_PRODUCTS_URL: process.env.FCD_SEARCH_PRODUCTS_URL || "",
  FCD_SEARCH_PRODUCTS_PATH: process.env.FCD_SEARCH_PRODUCTS_PATH || "",
  FCD_PRODUCTS_CATEGORY_PATH: process.env.FCD_PRODUCTS_CATEGORY_PATH || "",
  TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 20000,
  TOKEN_VALIDO: process.env.TOKEN_VALIDO || "",
  TOKEN_ALTERNATIVO: process.env.TOKEN_ALTERNATIVO || "",
};
