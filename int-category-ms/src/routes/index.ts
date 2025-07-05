import express, { NextFunction, Request, Response } from "express";
import categoryRoutes from "./categoryRoutes";

const app = express();

app.use("/api", categoryRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

export default app;