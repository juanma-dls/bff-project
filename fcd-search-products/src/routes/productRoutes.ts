import { Router } from "express";
import { searchProductController } from "../controllers/searchProductController";
import { setHeaders } from "../utils/middlewares"

const router = Router();

router.get("/products-search", setHeaders ,searchProductController);

export default router;