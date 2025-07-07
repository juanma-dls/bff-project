import { Router } from "express";
import { productsByCategoryController } from "../controllers/productsByCategoryController";
import { setHeaders } from "../utils/middlewares"
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.get("/:category", validateRequest, setHeaders ,productsByCategoryController);

export default router;