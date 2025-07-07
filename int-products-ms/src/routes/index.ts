import express from "express";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes"
import errorHandler from "../utils/middlewares/errorHandler";

const app = express();

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({ status: "INT-PRODUCTS-MS status OK" });
});

app.use(errorHandler);

export default app;