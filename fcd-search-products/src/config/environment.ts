import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT || 3000,
  PRODUCTS_MS_URL: process.env.PRODUCTS_MS_URL || "",
  PRODUCTS_MS_PATH: process.env.PRODUCTS_MS_PATH || "",
  FREE_SHIPPING_MS_PATH: process.env.FREE_SHIPPING_MS_PATH || "",
  CATEGORIES_MS_URL: process.env.CATEGORIES_MS_URL || "",
  CATEGORIES_MS_PATH: process.env.CATEGORIES_MS_PATH || "",
  TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 20000,
};
