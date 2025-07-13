import { Router } from "express";
import { categoryController } from "../controllers/categoryController";

const router = Router();

router.get("/:category", categoryController);

export default router;
