import { Router } from "express";
import { searchProductsController } from "../controllers/searchProductsController";
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.get("/search", validateRequest, searchProductsController);

export default router;