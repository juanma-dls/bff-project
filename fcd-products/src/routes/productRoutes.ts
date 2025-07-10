import { Router } from "express";
import { searchProductController } from "../controllers/searchProductController";
import { setHeaders } from "../utils/middlewares"
import { validateHeaders } from "../utils/middlewares/validations/validateHeaders";
import { validateSearchQuery } from "../utils/middlewares/validations/validateSearchQuery";

const router = Router();

router.get("/search", validateHeaders, validateSearchQuery, setHeaders ,searchProductController);

export default router;