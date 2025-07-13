import express from "express";
import categoryRoutes from "./categoryRoutes";
import errorHandler from "../utils/middlewares/errorHandler";

const app = express();

app.use("/api", categoryRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({ status: "INT-CATEGORY-MS status OK" });
});

app.use(errorHandler);

export default app;
