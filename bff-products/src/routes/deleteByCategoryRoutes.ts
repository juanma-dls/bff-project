import { Router } from "express";
import { deleteByCategoryController } from "../controllers/deleteByCategoryController";
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.delete("/:category", validateRequest, deleteByCategoryController);

export default router;