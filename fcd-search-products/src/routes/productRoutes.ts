import { Router } from "express";
import { searchProductController } from "../controllers/searchProductController";

const router = Router();

router.get("/products-search", searchProductController);


export default router;