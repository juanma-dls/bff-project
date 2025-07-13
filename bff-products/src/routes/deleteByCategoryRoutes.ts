import { Router } from "express";
import { deleteByCategoryController } from "../controllers/deleteByCategoryController";
import { validateHeaders } from "../utils/middlewares/validateHeaders";

const router = Router();

router.delete("/:category", validateHeaders, deleteByCategoryController);

export default router;
