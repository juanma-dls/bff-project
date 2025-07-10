import { Router } from "express";
import { searchByCategoryController } from "../controllers/searchByCategoryController";
import { validateHeaders } from "../utils/middlewares/validateHeaders";

const router = Router();

router.get("/:category", validateHeaders, searchByCategoryController);

export default router;