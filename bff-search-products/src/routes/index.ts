import express, { NextFunction, Request, Response } from "express";
import searchProductRoutes from "./searchProductRoutes";
import errorHandler from "../utils/middlewares/errorHandler";
import NotFoundError from "../utils/errors/notFoundError";

const app = express();

app.use("/api", searchProductRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({ status: "BFF status OK" });
});

app.all("*", (req: Request) => {
  throw new NotFoundError(req.path)
})

app.use(errorHandler);

export default app;