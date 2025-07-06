import express, { NextFunction, Request, Response } from "express";
import productRoutes from "./productRoutes";
import errorHandler from "../utils/middlewares/errorHandler";

const app = express();

app.use("/api", productRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({ status: "FCD status OK" });
});

app.use(errorHandler);

export default app;