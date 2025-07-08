import { Router } from "express";
import { productController } from "../controllers/productController";
import { freeShippingController } from "../controllers/freeShippingController";
import { deleteProductController } from "../controllers/deleteProductsController";

const router = Router();

router.get("/search", productController);

router.get("/free_shipping", freeShippingController);

router.delete("/:id", deleteProductController);

export default router;