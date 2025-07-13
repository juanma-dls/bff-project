import { Router } from "express";
import { searchProductsController } from "../controllers/searchProductsController";
import { validateHeaders } from "../utils/middlewares/validateHeaders";

const router = Router();

router.get("/search", validateHeaders, searchProductsController);

export default router;
