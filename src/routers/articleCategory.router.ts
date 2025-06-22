import { Router } from "express";
import { addArticleCategory, getArticleCategory } from "../controllers/articleCategory.controller";

const router = Router();

router.post("/", addArticleCategory)
router.get("/", getArticleCategory)

export default router;