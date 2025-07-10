import { Router } from "express";
import { productsByCategoryController } from "../controllers/productsByCategoryController";
import { setHeaders } from "../utils/middlewares"
import { validateHeaders } from "../utils/middlewares/validations/validateHeaders";

const router = Router();

router.get("/:category", validateHeaders, setHeaders ,productsByCategoryController);

export default router;