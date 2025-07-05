import { Router } from "express";
import { searchProductController } from "../controllers/productController";

const router = Router();

router.get("/searchProdcuts", searchProductController);


export default router;