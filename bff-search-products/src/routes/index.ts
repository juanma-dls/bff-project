import express, { NextFunction, Request, Response } from "express";
import searchProductRoutes from "./searchProductRoutes";

const app = express();

app.use("/api", searchProductRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/health", (req, res) => {
  res.status(200).json({ status: "BFF status OK" });
});

export default app;