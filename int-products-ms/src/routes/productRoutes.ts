import { Router } from "express";
import { productController } from "../controllers/productController";
import { freeShippingController } from "../controllers/freeShippingController";

const router = Router();

router.get("/products/search", productController);

router.get("/products/free_shipping", freeShippingController);

export default router;