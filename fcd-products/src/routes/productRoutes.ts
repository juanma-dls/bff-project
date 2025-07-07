import { Router } from "express";
import { searchProductController } from "../controllers/searchProductController";
import { setHeaders } from "../utils/middlewares"
import validateRequest from "../utils/middlewares/validateRequest";

const router = Router();

router.get("/search", validateRequest, setHeaders ,searchProductController);

export default router;