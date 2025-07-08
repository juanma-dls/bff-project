import { Router } from "express";
import { searchByCategoryController } from "../controllers/searchByCategoryController";
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.get("/:category", validateRequest, searchByCategoryController);

export default router;