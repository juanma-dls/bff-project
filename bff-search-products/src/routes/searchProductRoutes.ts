import { Router } from "express";
import { searchProductController } from "../controllers/productController";
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.get("/searchProdcuts", validateRequest, searchProductController);

export default router;