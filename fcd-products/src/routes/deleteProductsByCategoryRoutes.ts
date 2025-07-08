import { Router } from "express";
import { deleteProductsByCategoryController } from "../controllers/deleteProductsByCategoryController";
import { setHeaders } from "../utils/middlewares"
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.delete("/:category", validateRequest, setHeaders ,deleteProductsByCategoryController);

export default router;