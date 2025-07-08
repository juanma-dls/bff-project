import express, { NextFunction, Request, Response } from "express";
import searchProductRoutes from "./searchProductRoutes";
import searchByCategoryRoutes from "./searchByCategoryRoutes";
import deleteByCategoryRoutes from "./deleteByCategoryRoutes";
import errorHandler from "../utils/middlewares/errorHandler";
import NotFoundError from "../utils/errors/notFoundError";

const app = express();

app.use("/api/products", searchProductRoutes);
app.use("/api/products/category/", searchByCategoryRoutes);
app.use("/api/products/category/", deleteByCategoryRoutes)

app.use("/health", (req, res) => {
  res.status(200).json({ status: "BFF status OK" });
});

app.all("*", (req: Request) => {
  throw new NotFoundError(req.path)
})

app.use(errorHandler);

export default app;