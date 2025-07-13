import { Router } from "express";
import { deleteProductsByCategoryController } from "../controllers/deleteProductsByCategoryController";
import { setHeaders } from "../utils/middlewares";
import { validateHeaders } from "../utils/middlewares/validations/validateHeaders";

const router = Router();

router.delete(
  "/:category",
  validateHeaders,
  setHeaders,
  deleteProductsByCategoryController,
);

export default router;
