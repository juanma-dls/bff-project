import { Router } from "express";
import { productController } from "../controllers/productController";
import { freeShippingController } from "../controllers/freeShippingController";

const router = Router();

router.get("/search", productController);

router.get("/free_shipping", freeShippingController);

export default router;