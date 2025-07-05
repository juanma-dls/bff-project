import { Router } from "express";
import { categoryController } from "../controllers/categoryController";

const router = Router();

router.get("/categories", categoryController);

export default router;