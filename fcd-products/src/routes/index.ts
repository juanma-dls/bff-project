import express, { NextFunction, Request, Response } from "express";
import productRoutes from "./productRoutes";
import productsCategoryRoutes from "./productsByCategoryRoutes"
import deleteProductsByCategoryRotes from "./deleteProductsByCategoryRoutes"
import errorHandler from "../utils/middlewares/errorHandler";

const app = express();

app.use("/api/products", productRoutes);
app.use("/api/products/category", productsCategoryRoutes);
app.use("/api/products/category", deleteProductsByCategoryRotes);

app.use("/health", (req, res) => {
  res.status(200).json({ status: "FCD status OK" });
});

app.use(errorHandler);

export default app;